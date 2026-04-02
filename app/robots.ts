import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://codedev.io";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:     "/",
        disallow:  [
          "/api/",
          "/auth/callback",
          "/dashboard",  // Private — no crawling user-specific pages
          "/settings",
          "/bookmarks",
          "/progress",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
