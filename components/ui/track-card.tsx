"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen, Star, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TrackDefinition } from "@/lib/constants";

interface TrackCardProps {
  track:       TrackDefinition;
  progress?:   number;   // 0–100
  lessonsCompleted?: number;
  isNew?:      boolean;
  isLocked?:   boolean;
  className?:  string;
}

const TRACK_ICONS: Record<string, string> = {
  python:   "🐍",
  sysadmin: "⚙️",
  rust:     "🦀",
  lua:      "🌙",
  go:       "🐹",
};

export function TrackCard({
  track,
  progress = 0,
  lessonsCompleted = 0,
  isNew = false,
  isLocked = false,
  className,
}: TrackCardProps) {
  const started = progress > 0;
  const completed = progress >= 100;

  return (
    <Link
      href={isLocked ? "#" : `/learn/${track.slug}`}
      className={cn(
        "group relative flex flex-col rounded-2xl overflow-hidden",
        "border transition-all duration-300",
        "bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)]",
        isLocked
          ? "border-white/[0.04] opacity-60 cursor-not-allowed"
          : "border-white/[0.07] hover:border-white/[0.15] hover:-translate-y-1",
        !isLocked && "hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]",
        className
      )}
      style={{
        // Subtle ambient glow matching track color on hover
        "--track-glow": `${track.color}20`,
      } as React.CSSProperties}
      aria-disabled={isLocked}
    >
      {/* ── Top accent stripe ── */}
      <div
        className="h-[2px] w-full shrink-0 transition-all duration-300"
        style={{
          background: started
            ? `linear-gradient(90deg, ${track.color}, ${track.color}44)`
            : `linear-gradient(90deg, ${track.color}44, transparent)`,
        }}
      />

      {/* ── Ambient glow overlay (hover) ── */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${track.color}10, transparent)`,
        }}
      />

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-5 gap-4">

        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{ background: `${track.color}18`, border: `1px solid ${track.color}30` }}
          >
            {TRACK_ICONS[track.slug]}
          </div>

          {/* Badges */}
          <div className="flex flex-col items-end gap-1.5">
            {isNew && (
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{
                  background: `${track.color}20`,
                  color: track.color,
                  border: `1px solid ${track.color}35`,
                }}
              >
                New
              </span>
            )}
            {isLocked && (
              <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.06] text-[#4B5563] border border-white/[0.08] flex items-center gap-1">
                <Lock size={8} /> Soon
              </span>
            )}
            {completed && (
              <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                ✓ Done
              </span>
            )}
            {started && !completed && (
              <span
                className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{
                  background: `${track.color}12`,
                  color: track.color,
                  border: `1px solid ${track.color}25`,
                }}
              >
                {Math.round(progress)}%
              </span>
            )}
          </div>
        </div>

        {/* Title + subtitle */}
        <div>
          <h3 className="text-base font-semibold text-[#F0F6FF] leading-tight mb-0.5">
            {track.title}
          </h3>
          <p className="text-xs font-medium" style={{ color: track.color }}>
            {track.subtitle}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-[#8B9BB4] leading-relaxed flex-1 line-clamp-3">
          {track.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {track.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-[#4B5563] border border-white/[0.06]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-[11px] text-[#4B5563]">
          <span className="flex items-center gap-1.5">
            <BookOpen size={11} />
            {track.totalLessons} lessons
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} />
            {track.estimatedHours}h
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={11} />
            {track.level === "all" ? "All levels" : track.level}
          </span>
        </div>

        {/* Progress bar */}
        {started && (
          <div className="space-y-1">
            <div className="flex justify-between text-[10px]">
              <span className="text-[#4B5563]">
                {lessonsCompleted}/{track.totalLessons} lessons
              </span>
              <span style={{ color: track.color }}>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${track.color}, ${track.color}99)`,
                }}
              />
            </div>
          </div>
        )}

        {/* CTA */}
        {!isLocked && (
          <div
            className="flex items-center gap-2 text-xs font-medium transition-all duration-200 group-hover:gap-3"
            style={{ color: track.color }}
          >
            {completed
              ? "Review track"
              : started
              ? "Continue learning"
              : "Start learning"}
            <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </div>
        )}
      </div>
    </Link>
  );
}
