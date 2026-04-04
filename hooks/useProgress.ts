"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { TrackSlug } from "@/lib/constants";
import type {
  LessonProgress,
  TrackProgress,
  UserStats,
} from "@/lib/database.types";
import type { Database } from "@/lib/database.types";

type LessonProgressInsert =
  Database["public"]["Tables"]["lesson_progress"]["Insert"];

/* ─── Per-track progress ─────────────────────────────────────────────────── */
export function useTrackProgress(userId: string | null | undefined) {
  const [progress, setProgress] = useState<TrackProgress[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!userId) { setProgress([]); setLoading(false); return; }
    const supabase = createClient();
    supabase
      .from("track_progress")
      .select("*")
      .eq("user_id", userId)
      .then(({ data }) => {
        setProgress((data as TrackProgress[]) ?? []);
        setLoading(false);
      });
  }, [userId]);

  const getTrack = useCallback(
    (slug: TrackSlug) => progress.find((p) => p.track_slug === slug),
    [progress]
  );

  return { progress, loading, getTrack };
}

/* ─── Per-lesson progress ────────────────────────────────────────────────── */
export function useLessonProgress(
  userId:    string | null | undefined,
  trackSlug: TrackSlug
) {
  const [lessons, setLessons]  = useState<LessonProgress[]>([]);
  const [loading, setLoading]  = useState(true);

  useEffect(() => {
    if (!userId) { setLessons([]); setLoading(false); return; }
    const supabase = createClient();
    supabase
      .from("lesson_progress")
      .select("*")
      .eq("user_id", userId)
      .eq("track_slug", trackSlug)
      .then(({ data }) => {
        setLessons((data as LessonProgress[]) ?? []);
        setLoading(false);
      });
  }, [userId, trackSlug]);

  const isCompleted = useCallback(
    (lessonSlug: string) =>
      lessons.some((l) => l.lesson_slug === lessonSlug && l.completed),
    [lessons]
  );

  const isStarted = useCallback(
    (lessonSlug: string) =>
      lessons.some((l) => l.lesson_slug === lessonSlug),
    [lessons]
  );

  const markStarted = useCallback(
    async (lessonSlug: string) => {
      if (!userId) return;
      const supabase = createClient();
      const payload: LessonProgressInsert = {
        user_id:     userId,
        track_slug:  trackSlug,
        lesson_slug: lessonSlug,
        completed:   false,
      };
      await supabase
        .from("lesson_progress")
        .upsert(payload, {
          onConflict:      "user_id,track_slug,lesson_slug",
          ignoreDuplicates: true,
        });
    },
    [userId, trackSlug]
  );

  const markComplete = useCallback(
    async (lessonSlug: string) => {
      if (!userId) return;
      const supabase = createClient();
      const { data, error } = await supabase.rpc("mark_lesson_complete", {
        p_user_id:     userId,
        p_track_slug:  trackSlug,
        p_lesson_slug: lessonSlug,
      });
      if (!error) {
        setLessons((prev) =>
          prev.map((l) =>
            l.lesson_slug === lessonSlug
              ? { ...l, completed: true, completed_at: new Date().toISOString() }
              : l
          )
        );
      }
      return { data, error };
    },
    [userId, trackSlug]
  );

  return { lessons, loading, isCompleted, isStarted, markStarted, markComplete };
}

// Re-export as useProgress for backward compat
export { useLessonProgress as useProgress };

/* ─── Dashboard stats ────────────────────────────────────────────────────── */
export function useUserStats(userId: string | null | undefined) {
  const [stats,   setStats]   = useState<UserStats | null>(null);
  const [streak,  setStreak]  = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) { setStats(null); setLoading(false); return; }
    const supabase = createClient();
    Promise.all([
      supabase
        .from("user_stats")
        .select("*")
        .eq("user_id", userId)
        .single(),
      supabase.rpc("get_user_streak", { p_user_id: userId }),
    ]).then(([{ data: statsData }, { data: streakData }]) => {
      setStats(statsData as UserStats | null);
      setStreak((streakData as number) ?? 0);
      setLoading(false);
    });
  }, [userId]);

  return { stats, streak, loading };
}
