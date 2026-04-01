-- ============================================================
-- CodeDev Platform — Full Database Schema
-- Run this in your Supabase SQL editor or via CLI:
--   supabase db push
-- ============================================================

-- Enable UUID extension (already on in Supabase by default)
create extension if not exists "uuid-ossp";

-- ────────────────────────────────────────────────────────────
-- 1. PROFILES
--    Mirror of auth.users — stores public user data.
--    Auto-created by trigger on signup.
-- ────────────────────────────────────────────────────────────
create table if not exists public.profiles (
  id            uuid        primary key references auth.users(id) on delete cascade,
  email         text        not null,
  display_name  text,
  avatar_url    text,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Trigger: create profile when user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, display_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger: update updated_at on profile changes
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- 2. LESSON PROGRESS
--    One row per user+track+lesson. Upserted on visit/completion.
-- ────────────────────────────────────────────────────────────
create table if not exists public.lesson_progress (
  id            uuid        primary key default uuid_generate_v4(),
  user_id       uuid        not null references public.profiles(id) on delete cascade,
  track_slug    text        not null,
  lesson_slug   text        not null,
  completed     boolean     not null default false,
  started_at    timestamptz not null default now(),
  completed_at  timestamptz,
  updated_at    timestamptz not null default now(),

  unique (user_id, track_slug, lesson_slug)
);

create index if not exists lesson_progress_user_id_idx
  on public.lesson_progress (user_id);
create index if not exists lesson_progress_track_idx
  on public.lesson_progress (user_id, track_slug);

create trigger lesson_progress_updated_at
  before update on public.lesson_progress
  for each row execute procedure public.set_updated_at();

-- ────────────────────────────────────────────────────────────
-- 3. TRACK PROGRESS SUMMARY
--    Denormalised summary updated by trigger for fast dashboard reads.
-- ────────────────────────────────────────────────────────────
create table if not exists public.track_progress (
  id                  uuid        primary key default uuid_generate_v4(),
  user_id             uuid        not null references public.profiles(id) on delete cascade,
  track_slug          text        not null,
  lessons_completed   integer     not null default 0,
  last_lesson_slug    text,
  last_studied_at     timestamptz,
  updated_at          timestamptz not null default now(),

  unique (user_id, track_slug)
);

create index if not exists track_progress_user_id_idx
  on public.track_progress (user_id);

-- Trigger: refresh track_progress when lesson_progress changes
create or replace function public.refresh_track_progress()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_count integer;
  v_last  text;
begin
  -- Recount completions for this user+track
  select
    count(*) filter (where completed = true),
    (array_agg(lesson_slug order by updated_at desc))[1]
  into v_count, v_last
  from public.lesson_progress
  where user_id = coalesce(new.user_id, old.user_id)
    and track_slug = coalesce(new.track_slug, old.track_slug);

  insert into public.track_progress (user_id, track_slug, lessons_completed, last_lesson_slug, last_studied_at)
  values (
    coalesce(new.user_id, old.user_id),
    coalesce(new.track_slug, old.track_slug),
    v_count,
    v_last,
    now()
  )
  on conflict (user_id, track_slug) do update set
    lessons_completed = excluded.lessons_completed,
    last_lesson_slug  = excluded.last_lesson_slug,
    last_studied_at   = excluded.last_studied_at,
    updated_at        = now();

  return coalesce(new, old);
end;
$$;

drop trigger if exists refresh_track_progress_trigger on public.lesson_progress;
create trigger refresh_track_progress_trigger
  after insert or update or delete on public.lesson_progress
  for each row execute procedure public.refresh_track_progress();

-- ────────────────────────────────────────────────────────────
-- 4. BOOKMARKS
-- ────────────────────────────────────────────────────────────
create table if not exists public.bookmarks (
  id           uuid        primary key default uuid_generate_v4(),
  user_id      uuid        not null references public.profiles(id) on delete cascade,
  track_slug   text        not null,
  lesson_slug  text        not null,
  created_at   timestamptz not null default now(),

  unique (user_id, track_slug, lesson_slug)
);

create index if not exists bookmarks_user_id_idx
  on public.bookmarks (user_id);

-- ────────────────────────────────────────────────────────────
-- 5. USER STATS VIEW
--    Fast single-query summary for dashboard stats card.
-- ────────────────────────────────────────────────────────────
create or replace view public.user_stats as
select
  p.id                                                  as user_id,
  coalesce(sum(tp.lessons_completed), 0)::integer       as total_completed,
  count(distinct lp.track_slug)::integer                as total_started,
  coalesce(
    extract(day from now() - max(tp.last_studied_at))::integer,
    0
  )                                                     as days_since_last,
  round(coalesce(sum(tp.lessons_completed), 0) * 0.35)  as hours_learned,
  max(tp.last_studied_at)                               as last_activity_at
from public.profiles p
left join public.track_progress   tp on tp.user_id = p.id
left join public.lesson_progress  lp on lp.user_id = p.id and lp.completed = true
group by p.id;

-- ────────────────────────────────────────────────────────────
-- 6. STREAK FUNCTION
--    Counts consecutive days with at least one completed lesson.
-- ────────────────────────────────────────────────────────────
create or replace function public.get_user_streak(p_user_id uuid)
returns integer
language plpgsql
stable
security definer set search_path = public
as $$
declare
  v_streak  integer := 0;
  v_date    date    := current_date;
  v_exists  boolean;
begin
  loop
    select exists(
      select 1 from public.lesson_progress
      where user_id   = p_user_id
        and completed = true
        and completed_at::date = v_date
    ) into v_exists;

    exit when not v_exists;

    v_streak := v_streak + 1;
    v_date   := v_date - 1;
  end loop;

  return v_streak;
end;
$$;

-- ────────────────────────────────────────────────────────────
-- 7. MARK LESSON COMPLETE (atomic upsert)
-- ────────────────────────────────────────────────────────────
create or replace function public.mark_lesson_complete(
  p_user_id    uuid,
  p_track_slug text,
  p_lesson_slug text
)
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.lesson_progress (user_id, track_slug, lesson_slug, completed, completed_at)
  values (p_user_id, p_track_slug, p_lesson_slug, true, now())
  on conflict (user_id, track_slug, lesson_slug) do update set
    completed    = true,
    completed_at = coalesce(lesson_progress.completed_at, now()),
    updated_at   = now();
end;
$$;

-- ────────────────────────────────────────────────────────────
-- 8. ROW LEVEL SECURITY (RLS)
--    Users can only see and modify their OWN data.
-- ────────────────────────────────────────────────────────────

-- profiles
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- lesson_progress
alter table public.lesson_progress enable row level security;

create policy "Users can view own lesson progress"
  on public.lesson_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own lesson progress"
  on public.lesson_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own lesson progress"
  on public.lesson_progress for update
  using (auth.uid() = user_id);

-- track_progress
alter table public.track_progress enable row level security;

create policy "Users can view own track progress"
  on public.track_progress for select
  using (auth.uid() = user_id);

-- bookmarks
alter table public.bookmarks enable row level security;

create policy "Users can view own bookmarks"
  on public.bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.bookmarks for delete
  using (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────
-- 9. REALTIME (optional — enable for live progress updates)
-- ────────────────────────────────────────────────────────────
-- alter publication supabase_realtime add table public.lesson_progress;
-- alter publication supabase_realtime add table public.track_progress;

-- ============================================================
-- DONE — Schema ready.
-- Next steps:
--   1. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
--   2. npm run dev
-- ============================================================
