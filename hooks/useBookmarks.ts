"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Bookmark } from "@/lib/database.types";
import type { Database } from "@/lib/database.types";

type BookmarkInsert = Database["public"]["Tables"]["bookmarks"]["Insert"];

export function useBookmarks(userId: string | null | undefined) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    if (!userId) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setBookmarks((data as Bookmark[]) ?? []);
        setLoading(false);
      });
  }, [userId]);

  const isBookmarked = useCallback(
    (trackSlug: string, lessonSlug: string) =>
      bookmarks.some(
        (b) => b.track_slug === trackSlug && b.lesson_slug === lessonSlug
      ),
    [bookmarks]
  );

  const toggle = useCallback(
    async (trackSlug: string, lessonSlug: string) => {
      if (!userId) return;
      const supabase = createClient();
      const exists   = isBookmarked(trackSlug, lessonSlug);

      if (exists) {
        const { error } = await supabase
          .from("bookmarks")
          .delete()
          .eq("user_id", userId)
          .eq("track_slug", trackSlug)
          .eq("lesson_slug", lessonSlug);

        if (!error) {
          setBookmarks((prev) =>
            prev.filter(
              (b) =>
                !(b.track_slug === trackSlug && b.lesson_slug === lessonSlug)
            )
          );
        }
      } else {
        // Explicitly typed insert payload — resolves Supabase generic inference issue
        const payload: BookmarkInsert = {
          user_id:    userId,
          track_slug: trackSlug,
          lesson_slug: lessonSlug,
        };

        const { data, error } = await supabase
          .from("bookmarks")
          .insert(payload)
          .select()
          .single();

        if (!error && data) {
          setBookmarks((prev) => [data as Bookmark, ...prev]);
        }
      }
    },
    [userId, isBookmarked]
  );

  return { bookmarks, loading, isBookmarked, toggle };
}
