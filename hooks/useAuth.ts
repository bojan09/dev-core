"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";
import type { Profile } from "@/lib/database.types";

interface AuthState {
  user:     User    | null;
  profile:  Profile | null;
  loading:  boolean;
}

export function useAuth() {
  const supabase = createClient();
  const router   = useRouter();

  const [state, setState] = useState<AuthState>({
    user:    null,
    profile: null,
    loading: true,
  });

  useEffect(() => {
    // Get initial session
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        setState({ user, profile, loading: false });
      } else {
        setState({ user: null, profile: null, loading: false });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setState({ user: session.user, profile, loading: false });
        } else {
          setState({ user: null, profile: null, loading: false });
        }

        if (event === "SIGNED_OUT") {
          router.push("/auth/login");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  return { ...state, signOut };
}
