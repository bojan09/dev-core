"use client";

import React from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useAuth }      from "@/hooks/useAuth";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { TrackSlug } from "@/lib/constants";
import { cn }           from "@/lib/utils";

interface BookmarkButtonProps {
  trackSlug:  TrackSlug;
  lessonSlug: string;
  className?: string;
  showLabel?: boolean;
}

export function BookmarkButton({
  trackSlug,
  lessonSlug,
  className,
  showLabel = true,
}: BookmarkButtonProps) {
  const { user }              = useAuth();
  const { isBookmarked, toggle } = useBookmarks(user?.id);

  const bookmarked = isBookmarked(trackSlug, lessonSlug);

  const handleClick = async () => {
    if (!user) return;
    await toggle(trackSlug, lessonSlug);
  };

  return (
    <button
      onClick={handleClick}
      disabled={!user}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark lesson"}
      className={cn(
        "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150",
        bookmarked
          ? "bg-brand-accent/12 text-brand-accent-light border border-brand-accent/25"
          : "bg-surface-elevated border border-surface-border text-text-secondary hover:text-text-primary hover:border-surface-border-light",
        !user && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      {bookmarked
        ? <BookmarkCheck size={12} />
        : <Bookmark size={12} />
      }
      {showLabel && (bookmarked ? "Bookmarked" : "Bookmark")}
    </button>
  );
}
