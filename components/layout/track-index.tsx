import React from "react";
import Link from "next/link";
import { Clock, BarChart2, ChevronRight, BookOpen, CheckCircle2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrackSlug } from "@/lib/constants";
import { TRACKS } from "@/lib/constants";
import { getTrackLessons } from "@/lib/lessons";

const TRACK_ICONS: Record<string, string> = {
  python: "🐍", sysadmin: "⚙️", rust: "🦀", lua: "🌙", go: "🐹",
};

const LEVEL_COLORS = {
  beginner:     "#10B981",
  intermediate: "#F59E0B",
  advanced:     "#EF4444",
};

// Mock progress — Phase 9 replaces with Supabase
const MOCK_DONE = new Set(["introduction", "variables", "control-flow"]);

interface TrackIndexProps {
  trackSlug: TrackSlug;
}

export function TrackIndexPage({ trackSlug }: TrackIndexProps) {
  const track   = TRACKS.find((t) => t.slug === trackSlug)!;
  const lessons = getTrackLessons(trackSlug);
  const done    = lessons.filter((l) => MOCK_DONE.has(l.slug)).length;
  const pct     = Math.round((done / lessons.length) * 100);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <div
        className="relative border-b border-surface-border/50 pb-8"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% -5%, ${track.color}12, transparent 60%)`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${track.color}50, transparent)` }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="flex items-start gap-5">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 border"
              style={{ background: `${track.color}15`, borderColor: `${track.color}30` }}
            >
              {TRACK_ICONS[trackSlug]}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div
                className="inline-flex text-xs font-semibold px-2.5 py-1 rounded-full mb-3 border"
                style={{ background: `${track.color}12`, color: track.color, borderColor: `${track.color}25` }}
              >
                {track.subtitle}
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">{track.title}</h1>
              <p className="text-text-secondary text-[15px] leading-relaxed max-w-xl">{track.description}</p>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-text-muted">
                <span className="flex items-center gap-1.5"><BookOpen size={12} />{lessons.length} lessons</span>
                <span className="flex items-center gap-1.5"><Clock size={12} />{track.estimatedHours}h total</span>
                <span className="flex items-center gap-1.5"><BarChart2 size={12} />All levels</span>
              </div>
            </div>

            {/* Progress ring */}
            <div className="hidden sm:flex flex-col items-center gap-1.5 shrink-0">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="#1C2333" strokeWidth="6" />
                  <circle
                    cx="32" cy="32" r="26" fill="none"
                    stroke={track.color} strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    strokeDashoffset={`${2 * Math.PI * 26 * (1 - pct / 100)}`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.7s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-text-primary">{pct}%</span>
                </div>
              </div>
              <span className="text-[10px] text-text-muted">{done}/{lessons.length} done</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%`, background: track.color }} />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5">
            <Link
              href={`/learn/${trackSlug}/${done > 0 ? lessons[done]?.slug ?? lessons[0].slug : lessons[0].slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 hover:-translate-y-0.5"
              style={{ background: track.color, color: "#fff" }}
            >
              {done > 0 ? "Continue learning" : "Start track"}
              <ChevronRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Lesson list ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-base font-semibold text-text-primary mb-5 flex items-center gap-2">
          <BookOpen size={15} style={{ color: track.color }} />
          All {lessons.length} lessons
        </h2>

        <div className="space-y-2">
          {lessons.map((lesson, idx) => {
            const isDone  = MOCK_DONE.has(lesson.slug);
            const isCurrent = idx === done;

            return (
              <Link
                key={lesson.slug}
                href={`/learn/${trackSlug}/${lesson.slug}`}
                className={cn(
                  "group flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200",
                  isDone
                    ? "bg-surface-elevated/60 border-surface-border/60"
                    : isCurrent
                    ? "bg-surface-elevated border-surface-border hover:border-white/15"
                    : "bg-surface-elevated/40 border-surface-border/40 hover:bg-surface-elevated hover:border-surface-border"
                )}
              >
                {/* Order / status */}
                <div
                  className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold",
                    isDone ? "bg-emerald-500/15 text-emerald-400" : "bg-surface-overlay text-text-muted"
                  )}
                  style={isCurrent && !isDone ? { background: `${track.color}18`, color: track.color } : {}}
                >
                  {isDone ? <CheckCircle2 size={16} /> : idx + 1}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={cn(
                      "text-sm font-semibold truncate transition-colors",
                      isDone ? "text-text-secondary" : "text-text-primary group-hover:text-text-primary"
                    )}>
                      {lesson.title}
                    </p>
                    {isCurrent && (
                      <span
                        className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full shrink-0"
                        style={{ background: `${track.color}18`, color: track.color }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted truncate">{lesson.description}</p>
                </div>

                {/* Right meta */}
                <div className="hidden sm:flex items-center gap-3 shrink-0">
                  <div className="flex flex-wrap gap-1">
                    {lesson.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-surface-overlay text-text-muted border border-surface-border">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                    style={{
                      color:       LEVEL_COLORS[lesson.level],
                      background:  `${LEVEL_COLORS[lesson.level]}12`,
                      borderColor: `${LEVEL_COLORS[lesson.level]}25`,
                    }}
                  >
                    {lesson.level}
                  </span>
                  <span className="text-xs text-text-muted font-mono">{lesson.duration}m</span>
                </div>

                <ChevronRight
                  size={14}
                  className="shrink-0 text-text-muted group-hover:text-text-secondary group-hover:translate-x-0.5 transition-all duration-150"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
