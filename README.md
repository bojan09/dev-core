# CodeDev Platform

> **A production-grade SaaS learning platform for serious developers.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth+DB-3ECF8E)](https://supabase.com)
[![Framer Motion](https://img.shields.io/badge/Framer-Motion-FF0055)](https://www.framer.com/motion/)

---

## 🎯 What is CodeDev?

CodeDev is a production-ready programming education platform with 5 structured learning tracks, interactive infographics, Shiki syntax highlighting, Framer Motion animations, and Supabase-backed authentication and progress tracking.

| Track | Level | Lessons | Hours |
|-------|-------|---------|-------|
| 🐍 Python | Beginner → Advanced | 18 | ~30h |
| ⚙️ Python for SysAdmins | Specialized | 10 | ~20h |
| 🦀 Rust | Beginner → Advanced | 13 | ~35h |
| 🌙 Lua | Beginner → Advanced | 11 | ~18h |
| 🐹 Golang | Beginner → Advanced | 13 | ~28h |

---

## 🚀 Quick Start

```bash
# 1. Clone and install
git clone https://github.com/you/codedev-platform
cd codedev-platform
npm install

# 2. Set up environment
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

# 3. Set up database
# Open Supabase Dashboard → SQL Editor
# Paste and run: supabase/migrations/001_initial_schema.sql

# 4. Run locally
npm run dev
# Open http://localhost:3000
```

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| Animations | Framer Motion 11 |
| Code highlighting | Shiki v1 (custom theme) |
| Backend | Supabase (Auth + PostgreSQL + RLS) |
| State | TanStack Query + React hooks |
| Fonts | IBM Plex Sans + IBM Plex Mono |

---

## 📁 Project Structure

```
/app
  /(dashboard)/dashboard/   Main dashboard
  /learn/[topic]/           Track index pages
  /learn/[topic]/[lesson]/  Individual lesson pages
  /auth/                    Login, signup, callback, error
  /sitemap.ts               Auto-generated sitemap
  /robots.ts                robots.txt

/components
  /ui                       Button, Card, Badge, Progress...
  /layout                   Navbar, Sidebar, Footer, LessonHero...
  /infographics             Interactive SVG learning diagrams
  /code                     CodeBlock, CodeTabs, DiffBlock...
  /animations               ScrollReveal, AnimatedCard, TypewriterText...

/lib
  /supabase/                client.ts, server.ts, middleware.ts
  constants.ts              Track definitions
  lessons.ts                Lesson catalog + content
  lessons-expanded.ts       Full lesson content (Phase 10)
  database.types.ts         Auto-generated Supabase types
  shiki.ts                  Syntax highlighter config

/hooks
  useAuth.ts                Current user + signOut
  useProgress.ts            Lesson/track progress + markComplete
  useBookmarks.ts           Bookmark toggle
  useInView.ts              IntersectionObserver scroll trigger
  useReducedMotion.ts       Accessibility preference

/supabase
  migrations/001_...sql     Full database schema + RLS
  config.toml               Supabase CLI config

/styles
  globals.css               Design tokens, glassmorphism, utilities
  shiki.css                 Code block line numbers + highlighting
```

---

## 🔐 Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Copy URL and anon key to `.env.local`
3. Run `supabase/migrations/001_initial_schema.sql` in SQL Editor
4. (Optional) Enable GitHub OAuth: Authentication → Providers → GitHub

---

## 🎨 Design System

| Token | Value | Use |
|-------|-------|-----|
| `--accent` | `#7B61FF` | Primary CTA, active states |
| `--cyan` | `#00C2FF` | Secondary accent |
| `--surface` | `#0D1117` | Page background |
| `--surface-el` | `#161B22` | Cards, navbar |
| `--surface-ov` | `#1C2333` | Overlays, inputs |
| `--text-1` | `#F0F6FF` | Primary text |
| `--text-2` | `#8B9BB4` | Secondary text |
| `--text-3` | `#4B5563` | Muted/placeholder |

Track colors: Python `#3B82F6` · SysAdmin `#10B981` · Rust `#F97316` · Lua `#8B5CF6` · Go `#06B6D4`

---

## 📊 Build Phases

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Project foundation, config, structure | ✅ |
| 2 | Design system (Button, Card, Badge...) | ✅ |
| 3 | Layout system (Navbar, Sidebar, Footer) | ✅ |
| 4 | Dashboard page | ✅ |
| 5 | Learning page system | ✅ |
| 6 | Infographic engine (5 interactive diagrams) | ✅ |
| 7 | Code block system (Shiki, tabs, diff) | ✅ |
| 8 | Animation system (Framer Motion) | ✅ |
| 9 | Supabase integration (auth, DB, RLS) | ✅ |
| 10 | Full content, SEO, performance | ✅ |

---

## 📄 License

MIT — built as an open portfolio project.
