import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, BookOpen, TrendingUp } from "lucide-react";
import { TRACKS } from "@/lib/constants";
import { TrackCard } from "@/components/ui/track-card";
import { DashboardStatsLive } from "@/components/ui/DashboardClient";
import { ActivityFeed } from "@/components/ui/activity-feed";
import { ScrollReveal, StaggerGroup } from "@/components/animations";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  const totalLessons = TRACKS.reduce((sum, t) => sum + t.totalLessons, 0);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative px-6 lg:px-8 pt-10 pb-6 border-b border-surface-border/50 overflow-hidden">
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 80% at 30% 0%, rgba(123,97,255,0.08), transparent)" }}
        />
        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal direction="fade">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-elevated border border-surface-border text-xs text-text-secondary mb-4">
              <Sparkles size={11} className="text-brand-accent" />
              {TRACKS.length} tracks · {totalLessons} lessons
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.05}>
            <h1 className="text-2xl sm:text-3xl font-semibold text-text-primary mb-1.5 leading-tight">
              Welcome to{" "}
              <span style={{ background: "linear-gradient(135deg,#7B61FF,#00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                CodeDev
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1}>
            <p className="text-sm text-text-secondary max-w-lg">
              Pick a track below to start learning. Your progress saves automatically once you sign in.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-10">
        {/* Stats */}
        <ScrollReveal direction="up" delay={0.05}>
          <DashboardStatsLive />
        </ScrollReveal>

        {/* Empty state */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScrollReveal direction="left" className="lg:col-span-2 space-y-4">
            <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
              <TrendingUp size={16} className="text-brand-accent" />
              Continue learning
            </h2>
            <div className="rounded-2xl border border-surface-border/60 bg-surface-elevated/40 p-8 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-surface-overlay border border-surface-border flex items-center justify-center">
                <BookOpen size={20} className="text-text-muted" />
              </div>
              <p className="text-sm font-medium text-text-secondary">No lessons started yet</p>
              <p className="text-xs text-text-muted max-w-xs">
                Choose a track below and start your first lesson.
              </p>
              <Link
                href="/learn/python"
                className="mt-1 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:-translate-y-0.5"
                style={{ background: "#7B61FF" }}
              >
                Start with Python <ArrowRight size={12} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" className="space-y-4">
            <h2 className="text-base font-semibold text-text-primary flex items-center gap-2">
              <BookOpen size={16} className="text-brand-cyan" />
              Recent activity
            </h2>
            <div className="rounded-2xl border border-surface-border/60 bg-surface-elevated/40 p-2">
              <ActivityFeed items={[]} />
            </div>
          </ScrollReveal>
        </div>

        {/* Track cards — staggered */}
        <div className="space-y-5">
          <ScrollReveal direction="up">
            <div>
              <h2 className="text-base font-semibold text-text-primary">All learning tracks</h2>
              <p className="text-xs text-text-muted mt-0.5">
                {TRACKS.length} specialized courses — from beginner to production-ready
              </p>
            </div>
          </ScrollReveal>

          <StaggerGroup
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
            staggerDelay={0.06}
            initialDelay={0.1}
          >
            {TRACKS.map((track) => (
              <ScrollReveal key={track.slug} direction="stagger-item">
                <TrackCard track={track} progress={0} lessonsCompleted={0} isNew={track.slug === "sysadmin"} />
              </ScrollReveal>
            ))}
          </StaggerGroup>
        </div>

        {/* Quick links */}
        <StaggerGroup className="grid grid-cols-2 sm:grid-cols-4 gap-3 pb-4" staggerDelay={0.05}>
          {[
            { label: "Python Basics",  href: "/learn/python/introduction", emoji: "🐍", color: "#3B82F6" },
            { label: "Rust Ownership", href: "/learn/rust/ownership",      emoji: "🦀", color: "#F97316" },
            { label: "Go Goroutines",  href: "/learn/go/goroutines",       emoji: "🐹", color: "#06B6D4" },
            { label: "Lua Tables",     href: "/learn/lua/tables",          emoji: "🌙", color: "#8B5CF6" },
          ].map(({ label, href, emoji, color }) => (
            <ScrollReveal key={href} direction="stagger-item">
              <Link
                href={href}
                className="flex items-center gap-3 p-3.5 rounded-xl border border-surface-border/60 bg-surface-elevated/30 hover:border-surface-border hover:bg-surface-elevated transition-all duration-200 group"
              >
                <span className="text-xl leading-none">{emoji}</span>
                <span className="text-xs font-medium text-text-secondary group-hover:text-text-primary transition-colors">{label}</span>
                <ArrowRight size={12} className="ml-auto text-text-muted group-hover:text-text-secondary group-hover:translate-x-0.5 transition-all duration-200" />
              </Link>
            </ScrollReveal>
          ))}
        </StaggerGroup>
      </div>
    </div>
  );
}
