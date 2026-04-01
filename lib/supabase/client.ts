import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/lib/database.types";

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "❌ Missing Supabase environment variables.\n" +
        "1. Create a .env.local file in the ROOT of your project\n" +
        "2. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY\n" +
        "3. Restart your dev server with: npm run dev",
    );
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
