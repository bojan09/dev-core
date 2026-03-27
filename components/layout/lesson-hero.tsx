"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Clock, BarChart2, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrackSlug } from "@/lib/constants";
import { TRACKS } from "@/lib/constants";

const TRACK_ICONS: Record<string, string> = {
  python: "🐍", sysadmin: "⚙️", rust: "🦀", lua: "🌙", go: "🐹",
};

const LEVEL_LABELS = {
  beginner:     { label: "Beginner",     color: "#10B981" },
  intermediate: { label: "Intermediate", color: "#F59E0B" },
  advanced:     { label: "Advanced",     color: "#EF4444" },
};

interface LessonHeroProps {
  trackSlug:   TrackSlug;
  title:       string;
  tagline:     string;
  summary:     string;
  level:       "beginner" | "intermediate" | "advanced";
  duration:    number;
  lessonSlug:  string;
  prevLesson?: string;
  nextLesson?: string;
}

export function LessonHero({
  trackSlug, title, tagline, summary, level,
  duration, lessonSlug, prevLesson, nextLesson,
}: LessonHeroProps) {
  const track = TRACKS.find((t) => t.slug === trackSlug)!;
  const lvl   = LEVEL_LABELS[level];

  return (
    <div className="relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${track.color}18, transparent 65%)`,
        }}
      />

      {/* Horizontal accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: `linear-gradient(90deg, transparent, ${track.color}60, transparent)` }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-10">

        {/* Breadcrumb nav */}
        <div className="flex items-center gap-2 text-xs text-text-muted mb-6 font-mono">
          <Link href="/dashboard" className="hover:text-text-secondary transition-colors">Dashboard</Link>
          <ChevronRight size={12} />
          <Link href={`/learn/${trackSlug}`} className="hover:text-text-secondary transition-colors flex items-center gap-1">
            <span>{TRACK_ICONS[trackSlug]}</span>
            {track.title}
          </Link>
          <ChevronRight size={12} />
          <span className="text-text-secondary">{title}</span>
        </div>

        {/* Track pill */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
            style={{
              background: `${track.color}15`,
              color:       track.color,
              borderColor: `${track.color}30`,
            }}
          >
            <span className="text-base leading-none">{TRACK_ICONS[trackSlug]}</span>
            {track.title}
          </div>

          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
            style={{
              background: `${lvl.color}12`,
              color:       lvl.color,
              borderColor: `${lvl.color}28`,
            }}
          >
            <BarChart2 size={10} />
            {lvl.label}
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-surface-elevated border border-surface-border text-text-muted">
            <Clock size={10} />
            {duration} min
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3 leading-tight text-balance">
          {title}
        </h1>

        {/* Tagline */}
        <p
          className="text-base font-medium mb-4"
          style={{ color: track.color }}
        >
          {tagline}
        </p>

        {/* Summary */}
        <p className="text-text-secondary leading-relaxed max-w-2xl text-[15px]">
          {summary}
        </p>

        {/* Prev / Next nav */}
        <div className="flex items-center gap-3 mt-8 pt-6 border-t border-surface-border/50">
          {prevLesson ? (
            <Link
              href={`/learn/${trackSlug}/${prevLesson}`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-elevated border border-surface-border hover:border-surface-border-light text-xs font-medium text-text-secondary hover:text-text-primary transition-all duration-150"
            >
              <ChevronLeft size={13} /> Previous
            </Link>
          ) : <div />}

          <div className="flex-1" />

          {/* Bookmark button */}
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-elevated border border-surface-border hover:border-surface-border-light text-xs font-medium text-text-secondary hover:text-text-primary transition-all duration-150">
            <Bookmark size={12} />
            Bookmark
          </button>

          {nextLesson && (
            <Link
              href={`/learn/${trackSlug}/${nextLesson}`}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
              style={{
                background:   `${track.color}18`,
                color:         track.color,
                border:       `1px solid ${track.color}30`,
              }}
            >
              Next lesson <ChevronRight size={13} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
