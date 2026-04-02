import type { MetadataRoute } from "next";
import { TRACKS }           from "@/lib/constants";
import { getTrackLessons }  from "@/lib/lessons";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://codedev.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url:              BASE_URL,
      lastModified:     now,
      changeFrequency:  "weekly",
      priority:         1,
    },
    {
      url:              `${BASE_URL}/dashboard`,
      lastModified:     now,
      changeFrequency:  "weekly",
      priority:         0.9,
    },
    {
      url:              `${BASE_URL}/tracks`,
      lastModified:     now,
      changeFrequency:  "weekly",
      priority:         0.8,
    },
  ];

  // Track index pages
  const trackPages: MetadataRoute.Sitemap = TRACKS.map((track) => ({
    url:              `${BASE_URL}/learn/${track.slug}`,
    lastModified:     now,
    changeFrequency:  "weekly" as const,
    priority:         0.8,
  }));

  // Individual lesson pages
  const lessonPages: MetadataRoute.Sitemap = TRACKS.flatMap((track) =>
    getTrackLessons(track.slug).map((lesson) => ({
      url:              `${BASE_URL}/learn/${track.slug}/${lesson.slug}`,
      lastModified:     now,
      changeFrequency:  "monthly" as const,
      priority:         0.7,
    }))
  );

  return [...staticPages, ...trackPages, ...lessonPages];
}
