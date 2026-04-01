import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

/**
 * Server-side Supabase client.
 * Use this in Server Components, Server Actions, and Route Handlers.
 *
 * Reads the session from HTTP-only cookies — fully secure.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Ignore: setAll called from a Server Component (read-only context)
            // The middleware handles session refreshing
          }
        },
      },
    }
  );
}

/**
 * Admin client — bypasses RLS. Use only in trusted server contexts.
 * Requires SUPABASE_SERVICE_ROLE_KEY in environment.
 */
export async function createAdminClient() {
  const { createClient: createSupabaseClient } = await import("@supabase/supabase-js");

  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken:  false,
        persistSession:    false,
      },
    }
  );
}
