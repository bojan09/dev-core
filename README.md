# CodeDev Platform

> **A production-grade SaaS learning platform for serious developers.**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E)](https://supabase.com)

---

## 🎯 About

CodeDev is a modern, infographic-driven programming education platform that teaches:

| Track | Level | Hours |
|-------|-------|-------|
| 🐍 Python | Beginner → Advanced | ~30h |
| ⚙️ Python for SysAdmins | Specialized | ~20h |
| 🦀 Rust | Beginner → Advanced | ~35h |
| 🌙 Lua | Beginner → Advanced | ~18h |
| 🐹 Golang | Beginner → Advanced | ~28h |

---

## 🧱 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Framer Motion, ShadCN UI
- **Backend**: Supabase (Auth + PostgreSQL + RLS)
- **State**: TanStack Query, Context API

---

## 📁 Structure

```
/app
  /(dashboard)       Dashboard route group
  /learn/[topic]     Dynamic lesson pages

/components
  /ui                Reusable primitives (Button, Card, etc.)
  /layout            Navbar, Sidebar, Footer
  /infographics      Animated learning diagrams
  /code              Code block system
  /animations        Motion components

/lib                 Utils, types, constants, Supabase client
/hooks               Custom React hooks
/styles              Global CSS
/public              Static assets, fonts
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Copy env template
cp .env.example .env.local
# Fill in your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🗺️ Build Phases

| Phase | Status | Description |
|-------|--------|-------------|
| 1 | ✅ Complete | Project foundation, config, global styles |
| 2 | 🔲 Pending | Design system (Button, Card, Container) |
| 3 | 🔲 Pending | Layout system (Navbar, Sidebar, Footer) |
| 4 | 🔲 Pending | Dashboard page |
| 5 | 🔲 Pending | Learning page system |
| 6 | 🔲 Pending | Infographic engine |
| 7 | 🔲 Pending | Code block system |
| 8 | 🔲 Pending | Animation system |
| 9 | 🔲 Pending | Supabase integration |
| 10+ | 🔲 Pending | Content, features, polish |

---

## 🎨 Design Tokens

| Token | Value |
|-------|-------|
| Primary | `#0A2540` |
| Accent | `#7B61FF` |
| Cyan | `#00C2FF` |
| Surface | `#0D1117` |

---

## 📄 License

MIT — built as an open portfolio project.
