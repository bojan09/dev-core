// Use the right client for the right context:
//   Server Components / Actions → import from "@/lib/supabase/server"
//   Client Components           → import from "@/lib/supabase/client"
export { createClient as createServerClient } from "./server";
export { createClient as createBrowserClient } from "./client";
