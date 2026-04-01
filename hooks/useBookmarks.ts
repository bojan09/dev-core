"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Bookmark } from "@/lib/database.types";

export function useBookmarks(userId: string | null | undefined) {
  const supabase  = createClient();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    if (!userId) { setBookmarks([]); setLoading(false); return; }

    supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setBookmarks(data ?? []);
        setLoading(false);
      });
  }, [userId]);

  const isBookmarked = useCallback(
    (trackSlug: string, lessonSlug: string) =>
      bookmarks.some((b) => b.track_slug === trackSlug && b.lesson_slug === lessonSlug),
    [bookmarks]
  );

  const toggle = useCallback(
    async (trackSlug: string, lessonSlug: string) => {
      if (!userId) return;

      const exists = isBookmarked(trackSlug, lessonSlug);

      if (exists) {
        // Remove
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("track_slug", trackSlug)
          .eq("lesson_slug", lessonSlug);

        if (!error) {
          setBookmarks((prev) =>
            prev.filter(
              (b) => !(b.track_slug === trackSlug && b.lesson_slug === lessonSlug)
            )
          );
        }
      } else {
        // Add
        const { data, error } = await supabase
          .from("bookmarks")
          .insert({ user_id: userId, track_slug: trackSlug, lesson_slug: lessonSlug })
          .select()
          .single();

        if (!error && data) {
          setBookmarks((prev) => [data, ...prev]);
        }
      }
    },
    [userId, isBookmarked, supabase]
  );

  return { bookmarks, loading, isBookmarked, toggle };
}
