import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { Database } from "@/lib/database.types"; // ← Make sure this path is correct

/**
 * Updates the Supabase session in middleware.
 * This keeps auth tokens refreshed and handles cookies properly.
 */
export async function updateSession(request: NextRequest) {
  // Safety check - prevent cryptic errors if env vars are missing
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error(
      "❌ Missing Supabase environment variables in middleware.\n" +
        "Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local",
    );
    // Return early without crashing the whole app (you can customize this behavior)
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        // Update request cookies for the current request
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });

        // Recreate response to attach cookies
        supabaseResponse = NextResponse.next({ request });

        // Set cookies on the outgoing response
        cookiesToSet.forEach(({ name, value, options }) => {
          supabaseResponse.cookies.set(name, value, options);
        });
      },
    },
  });

  // Refresh the session — this must happen before any redirects
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect your routes (customize these paths as needed)
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
