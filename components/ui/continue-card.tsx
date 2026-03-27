import React from "react";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContinueCardProps {
  trackName:    string;
  trackColor:   string;
  trackIcon:    string;
  lessonTitle:  string;
  lessonSlug:   string;
  trackSlug:    string;
  progress:     number;
  className?:   string;
}

export function ContinueCard({
  trackName,
  trackColor,
  trackIcon,
  lessonTitle,
  lessonSlug,
  trackSlug,
  progress,
  className,
}: ContinueCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-5",
        "border border-white/[0.07]",
        "bg-gradient-to-br from-white/[0.06] to-white/[0.02]",
        className
      )}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 0% 50%, ${trackColor}, transparent)`,
        }}
      />

      <div className="relative flex items-center gap-4">
        {/* Play button */}
        <Link
          href={`/learn/${trackSlug}/${lessonSlug}`}
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            "transition-all duration-200 hover:scale-105"
          )}
          style={{ background: `${trackColor}25`, border: `1px solid ${trackColor}40` }}
        >
          <Play size={18} style={{ color: trackColor }} fill={trackColor} />
        </Link>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-base leading-none">{trackIcon}</span>
            <span className="text-xs font-medium" style={{ color: trackColor }}>
              {trackName}
            </span>
          </div>
          <p className="text-sm font-semibold text-[#F0F6FF] truncate">
            {lessonTitle}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${trackColor}, ${trackColor}80)`,
                }}
              />
            </div>
            <span className="text-[10px] text-[#4B5563] shrink-0">{progress}%</span>
          </div>
        </div>

        {/* Arrow */}
        <Link
          href={`/learn/${trackSlug}/${lessonSlug}`}
          className="shrink-0 text-[#4B5563] hover:text-[#F0F6FF] transition-colors"
        >
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
