/**
 * Supabase Client — Phase 9
 *
 * This file will be fully implemented in Phase 9 with:
 * - createBrowserClient (client components)
 * - createServerClient (server components / route handlers)
 * - Typed database schema
 *
 * For now we export placeholder functions so imports don't break.
 */

export function createSupabaseClient() {
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Supabase client not yet configured. Complete Phase 9 setup."
    );
  }
  // Dev stub
  return null;
}

export type Database = {
  public: {
    Tables: {
      profiles:  { Row: Record<string, unknown> };
      progress:  { Row: Record<string, unknown> };
      bookmarks: { Row: Record<string, unknown> };
    };
  };
};
