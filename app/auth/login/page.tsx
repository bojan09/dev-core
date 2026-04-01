"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Mail, Lock, Loader2, ArrowRight, Github } from "lucide-react";

export default function LoginPage() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const redirectTo   = searchParams.get("redirectTo") ?? "/dashboard";
  const supabase     = createClient();

  const [mode,    setMode]    = useState<"password" | "magic">("magic");
  const [email,   setEmail]   = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [sent,     setSent]     = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}` },
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  };

  const handlePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
    else router.push(redirectTo);
  };

  const handleGitHub = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}` },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-surface">
      {/* Ambient glow */}
      <div
        className="fixed inset-x-0 top-0 h-96 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(123,97,255,0.1), transparent)" }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#7B61FF" fillOpacity="0.14" />
              <rect width="32" height="32" rx="8" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.4" />
              <path d="M10 11L6 16L10 21" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 11L26 16L22 21" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 9L13 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.65"/>
            </svg>
            <span className="text-text-primary font-semibold text-lg">
              Code<span className="text-brand-accent">Dev</span>
            </span>
          </Link>
          <h1 className="text-xl font-semibold text-text-primary">Welcome back</h1>
          <p className="text-sm text-text-secondary mt-1">Sign in to continue learning</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-6 space-y-5">

          {/* GitHub OAuth */}
          <button
            onClick={handleGitHub}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 h-10 rounded-xl bg-surface-overlay border border-surface-border text-sm font-medium text-text-primary hover:bg-surface-elevated hover:border-surface-border-light transition-all disabled:opacity-50"
          >
            <Github size={16} />
            Continue with GitHub
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-surface-border" />
            <span className="text-[11px] text-text-muted">or</span>
            <div className="flex-1 h-px bg-surface-border" />
          </div>

          {/* Mode toggle */}
          <div className="flex rounded-xl bg-surface-overlay border border-surface-border p-1 gap-1">
            {(["magic", "password"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); setSent(false); }}
                className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background: mode === m ? "#7B61FF18" : "transparent",
                  color:      mode === m ? "#A895FF" : "#4B5563",
                }}
              >
                {m === "magic" ? "Magic link" : "Password"}
              </button>
            ))}
          </div>

          {/* Magic link sent */}
          {sent ? (
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-4 text-center space-y-1">
              <p className="text-sm font-semibold text-emerald-400">Check your email</p>
              <p className="text-xs text-text-secondary">
                We sent a sign-in link to <strong>{email}</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={mode === "magic" ? handleMagicLink : handlePassword} className="space-y-3">
              {/* Email */}
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

              {/* Password field (only in password mode) */}
              {mode === "password" && (
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-10 pl-9 pr-4 rounded-xl bg-surface-overlay border border-surface-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-accent/40 focus:border-brand-accent/40 transition-all"
                  />
                </div>
              )}

              {/* Error */}
              {error && (
                <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full h-10 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:translate-y-0"
                style={{ background: "linear-gradient(135deg, #7B61FF, #6050e0)" }}
              >
                {loading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <>
                    {mode === "magic" ? "Send magic link" : "Sign in"}
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Sign up link */}
        <p className="text-center text-xs text-text-muted mt-5">
          No account?{" "}
          <Link href="/auth/signup" className="text-brand-accent-light hover:text-brand-accent transition-colors">
            Create one for free
          </Link>
        </p>
      </div>
    </div>
  );
}
