"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useAuth }         from "@/hooks/useAuth";
import { useLessonProgress } from "@/hooks/useProgress";
import type { TrackSlug }  from "@/lib/constants";
import { cn }              from "@/lib/utils";

interface LessonCompleteButtonProps {
  trackSlug:  TrackSlug;
  lessonSlug: string;
  className?: string;
}

export function LessonCompleteButton({
  trackSlug,
  lessonSlug,
  className,
}: LessonCompleteButtonProps) {
  const { user }            = useAuth();
  const { isCompleted, markComplete, markStarted } = useLessonProgress(user?.id, trackSlug);
  const [saving, setSaving] = useState(false);

  const completed = isCompleted(lessonSlug);

  const handleClick = async () => {
    if (!user || completed) return;
    setSaving(true);
    await markComplete(lessonSlug);
    setSaving(false);
  };

  if (!user) return null;

  return (
    <button
      onClick={handleClick}
      disabled={completed || saving}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
        completed
          ? "bg-emerald-500/12 text-emerald-400 border border-emerald-500/25 cursor-default"
          : "bg-brand-accent text-white hover:-translate-y-0.5 hover:shadow-glow-accent",
        className
      )}
    >
      {saving ? (
        <Loader2 size={15} className="animate-spin" />
      ) : (
        <CheckCircle2 size={15} />
      )}
      {completed ? "Completed" : "Mark as complete"}
    </button>
  );
}
