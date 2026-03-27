import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, TrendingUp } from "lucide-react";
import { TRACKS } from "@/lib/constants";
import { TrackCard } from "@/components/ui/track-card";
import { DashboardStats } from "@/components/ui/stats-bar";
import { ContinueCard } from "@/components/ui/continue-card";
import { ActivityFeed } from "@/components/ui/activity-feed";

export const metadata: Metadata = {
  title: "Dashboard",
};

/* ── Mock data (replaced by Supabase in Phase 9) ──────────────────────── */
const MOCK_PROGRESS: Record<string, number> = {
  python:   68,
  rust:     32,
  go:       14,
  sysadmin: 0,
  lua:      0,
};

const MOCK_COMPLETED: Record<string, number> = {
  python:   28,
  rust:     12,
  go:       5,
  sysadmin: 0,
  lua:      0,
};

const MOCK_ACTIVITY = [
  {
    trackName: "Python",
    trackColor: "#3B82F6",
    trackIcon: "🐍",
    lessonTitle: "OOP: Classes and Inheritance",
    completed: true,
    timeAgo: "2h ago",
  },
  {
    trackName: "Rust",
    trackColor: "#F97316",
    trackIcon: "🦀",
    lessonTitle: "Ownership and Borrowing Rules",
    completed: true,
    timeAgo: "1d ago",
  },
  {
    trackName: "Python",
    trackColor: "#3B82F6",
    trackIcon: "🐍",
    lessonTitle: "File Handling and I/O",
    completed: false,
    timeAgo: "1d ago",
  },
  {
    trackName: "Golang",
    trackColor: "#06B6D4",
    trackIcon: "🐹",
    lessonTitle: "Go Fundamentals: Variables",
    completed: true,
    timeAgo: "3d ago",
  },
  {
    trackName: "Rust",
    trackColor: "#F97316",
    trackIcon: "🦀",
    lessonTitle: "Rust Fundamentals",
    completed: true,
    timeAgo: "4d ago",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const totalLessons = TRACKS.reduce((sum, t) => sum + t.totalLessons, 0);
  const completedLessons = Object.values(MOCK_COMPLETED).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen">

      {/* ── Hero greeting ── */}
      <section className="relative px-6 lg:px-8 pt-10 pb-6 border-b border-white/[0.05]">
        {/* Ambient glow */}
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 30% 0%, rgba(123,97,255,0.08), transparent)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-[#8B9BB4] mb-4">
            <Sparkles size={11} className="text-[#7B61FF]" />
            5 tracks · 168 lessons · 131 hours of content
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#F0F6FF] mb-1.5 leading-tight">
            Welcome back,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #7B61FF, #00C2FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Developer
            </span>{" "}
            👋
          </h1>
          <p className="text-sm text-[#8B9BB4] max-w-lg">
            You have 3 tracks in progress. Keep the momentum going — consistency beats intensity.
          </p>
        </div>
      </section>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-10">

        {/* Stats */}
        <DashboardStats
          totalLessons={totalLessons}
          completedLessons={completedLessons}
          hoursLearned={24}
          streak={7}
        />

        {/* Continue learning + activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Continue learning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#F0F6FF] flex items-center gap-2">
                <TrendingUp size={16} className="text-[#7B61FF]" />
                Continue learning
              </h2>
              <Link
                href="/progress"
                className="text-xs text-[#8B9BB4] hover:text-[#F0F6FF] flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight size={11} />
              </Link>
            </div>

            <div className="space-y-3">
              <ContinueCard
                trackName="Python"
                trackColor="#3B82F6"
                trackIcon="🐍"
                trackSlug="python"
                lessonSlug="file-handling"
                lessonTitle="File Handling and I/O Operations"
                progress={68}
              />
              <ContinueCard
                trackName="Rust"
                trackColor="#F97316"
                trackIcon="🦀"
                trackSlug="rust"
                lessonSlug="ownership"
                lessonTitle="Ownership and Borrowing Rules"
                progress={32}
              />
              <ContinueCard
                trackName="Golang"
                trackColor="#06B6D4"
                trackIcon="🐹"
                trackSlug="go"
                lessonSlug="variables"
                lessonTitle="Go Fundamentals: Variables & Types"
                progress={14}
              />
            </div>
          </div>

          {/* Activity feed */}
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-[#F0F6FF] flex items-center gap-2">
              <BookOpen size={16} className="text-[#00C2FF]" />
              Recent activity
            </h2>
            <div className="rounded-2xl border border-white/[0.07] bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-2">
              <ActivityFeed items={MOCK_ACTIVITY} />
            </div>
          </div>
        </div>

        {/* All tracks */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#F0F6FF]">
                All learning tracks
              </h2>
              <p className="text-xs text-[#4B5563] mt-0.5">
                5 specialized courses — from beginner to production-ready
              </p>
            </div>
            <Link
              href="/tracks"
              className="text-xs text-[#8B9BB4] hover:text-[#F0F6FF] flex items-center gap-1 transition-colors"
            >
              Browse all <ArrowRight size={11} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {TRACKS.map((track) => (
              <TrackCard
                key={track.slug}
                track={track}
                progress={MOCK_PROGRESS[track.slug] ?? 0}
                lessonsCompleted={MOCK_COMPLETED[track.slug] ?? 0}
                isNew={track.slug === "sysadmin"}
              />
            ))}
          </div>
        </div>

        {/* Quick links strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-4">
          {[
            { label: "Python Basics",      href: "/learn/python/basics",            emoji: "🐍", color: "#3B82F6" },
            { label: "Rust Ownership",     href: "/learn/rust/ownership",           emoji: "🦀", color: "#F97316" },
            { label: "Go Goroutines",      href: "/learn/go/goroutines",            emoji: "🐹", color: "#06B6D4" },
            { label: "Lua Scripting",      href: "/learn/lua/scripting",            emoji: "🌙", color: "#8B5CF6" },
          ].map(({ label, href, emoji, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-200 group"
            >
              <span className="text-xl leading-none">{emoji}</span>
              <span className="text-xs font-medium text-[#8B9BB4] group-hover:text-[#F0F6FF] transition-colors">
                {label}
              </span>
              <ArrowRight
                size={12}
                className="ml-auto text-[#4B5563] group-hover:text-[#8B9BB4] transition-all duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
