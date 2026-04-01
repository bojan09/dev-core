import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Supabase Auth callback route.
 * Handles:
 *   - Magic link sign-ins (type=magiclink)
 *   - OAuth redirects (GitHub, Google)
 *   - Email confirmation (type=signup)
 *
 * URL pattern from Supabase:
 *   /auth/callback?code=xxx&next=/dashboard
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code     = searchParams.get("code");
  const next     = searchParams.get("next") ?? "/dashboard";
  const errorMsg = searchParams.get("error_description");

  // Handle OAuth/PKCE code exchange
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv    = process.env.NODE_ENV === "development";

      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // Error or no code — redirect to error page
  return NextResponse.redirect(
    `${origin}/auth/error?message=${encodeURIComponent(
      errorMsg ?? "Authentication failed. Please try again."
    )}`
  );
}
