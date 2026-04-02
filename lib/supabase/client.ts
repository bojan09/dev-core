"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

/**
 * Browser-side Supabase client.
 * Use this in Client Components ("use client").
 *
 * Reads from environment variables — add to .env.local:
 *   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
