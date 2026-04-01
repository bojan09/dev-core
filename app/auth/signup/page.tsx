"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Mail, User, Loader2, ArrowRight, Github } from "lucide-react";

export default function SignupPage() {
  const supabase = createClient();
  const [email,       setEmail]      = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading,     setLoading]    = useState(false);
  const [error,       setError]      = useState<string | null>(null);
  const [sent,        setSent]       = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
        data: { full_name: displayName },
      },
    });

    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  const handleGitHub = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=/dashboard` },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface">
      <div
        className="fixed inset-x-0 top-0 h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(123,97,255,0.1), transparent)" }}
      />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#7B61FF" fillOpacity="0.14"/>
              <rect width="32" height="32" rx="8" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.4"/>
              <path d="M10 11L6 16L10 21" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 11L26 16L22 21" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 9L13 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.65"/>
            </svg>
            <span className="text-text-primary font-semibold text-lg">
              Code<span className="text-brand-accent">Dev</span>
            </span>
          </Link>
          <h1 className="text-xl font-semibold text-text-primary">Start learning for free</h1>
          <p className="text-sm text-text-secondary mt-1">No credit card required</p>
        </div>

        <div className="glass-card rounded-2xl p-6 space-y-5">
          <button
            onClick={handleGitHub}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 h-10 rounded-xl bg-surface-overlay border border-surface-border text-sm font-medium text-text-primary hover:bg-surface-elevated hover:border-surface-border-light transition-all disabled:opacity-50"
          >
            <Github size={16} />
            Continue with GitHub
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-surface-border" />
            <span className="text-[11px] text-text-muted">or use email</span>
            <div className="flex-1 h-px bg-surface-border" />
          </div>

          {sent ? (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-4 text-center space-y-1">
              <p className="text-sm font-semibold text-emerald-400">Account created!</p>
              <p className="text-xs text-text-secondary">
                Check <strong>{email}</strong> for your sign-in link.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-3">
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="text"
                  placeholder="Display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-overlay border border-surface-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent/40 transition-all"
                />
              </div>

              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-overlay border border-surface-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent/40 transition-all"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full h-10 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
                style={{ background: "linear-gradient(135deg, #7B61FF, #6050e0)" }}
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : (
                  <><ArrowRight size={14} /> Create account</>
                )}
              </button>
            </form>
          )}

          <p className="text-[10px] text-text-muted text-center leading-relaxed">
            By continuing you agree to our{" "}
            <Link href="/terms" className="text-text-secondary hover:text-text-primary">Terms</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-text-secondary hover:text-text-primary">Privacy Policy</Link>.
          </p>
        </div>

        <p className="text-center text-xs text-text-muted mt-5">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-accent-light hover:text-brand-accent transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
