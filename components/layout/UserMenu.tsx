"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LogOut, Settings, User, ChevronDown, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { cn }      from "@/lib/utils";

export function UserMenu() {
  const { user, profile, loading, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  if (loading) {
    return (
      <div className="w-9 h-9 rounded-xl bg-surface-elevated border border-surface-border animate-pulse" />
    );
  }

  if (!user) {
    return (
      <Link
        href="/auth/login"
        className="flex items-center gap-2 px-3 h-9 rounded-xl bg-brand-accent text-white text-xs font-semibold hover:bg-brand-accent-light transition-all duration-150"
      >
        Sign in
      </Link>
    );
  }

  const initials = profile?.display_name
    ? profile.display_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.slice(0, 2).toUpperCase() ?? "??";

  const displayName = profile?.display_name ?? user.email?.split("@")[0] ?? "User";

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 pl-1 pr-2 h-9 rounded-xl bg-surface-elevated border border-surface-border hover:border-surface-border-light transition-all duration-150"
        aria-expanded={open}
      >
        {/* Avatar */}
        {profile?.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.avatar_url}
            alt={displayName}
            className="w-7 h-7 rounded-lg object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-accent to-brand-cyan flex items-center justify-center text-[11px] font-bold text-white">
            {initials}
          </div>
        )}
        <span className="hidden sm:block text-xs font-medium text-text-secondary max-w-[80px] truncate">
          {displayName}
        </span>
        <ChevronDown
          size={12}
          className={cn("text-text-muted transition-transform duration-150", open && "rotate-180")}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />

          <div className="absolute right-0 top-full mt-2 w-52 z-50 rounded-2xl border border-surface-border bg-surface-elevated shadow-card overflow-hidden">
            {/* User info */}
            <div className="px-4 py-3 border-b border-surface-border">
              <p className="text-xs font-semibold text-text-primary truncate">{displayName}</p>
              <p className="text-[10px] text-text-muted truncate mt-0.5">{user.email}</p>
            </div>

            {/* Links */}
            <div className="py-1.5">
              {[
                { label: "Dashboard",  href: "/dashboard",  icon: BookOpen },
                { label: "Bookmarks",  href: "/bookmarks",  icon: User },
                { label: "Settings",   href: "/settings",   icon: Settings },
              ].map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-colors"
                >
                  <Icon size={13} className="text-text-muted" />
                  {label}
                </Link>
              ))}
            </div>

            {/* Sign out */}
            <div className="border-t border-surface-border py-1.5">
              <button
                onClick={() => { setOpen(false); signOut(); }}
                className="w-full flex items-center gap-3 px-4 py-2 text-xs text-red-400 hover:bg-red-500/8 transition-colors"
              >
                <LogOut size={13} />
                Sign out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Sidebar user chip (uses same auth hook) ────────────────────────────── */
export function SidebarUserChip({ collapsed }: { collapsed: boolean }) {
  const { user, profile, loading, signOut } = useAuth();

  if (loading || !user) return null;

  const initials = profile?.display_name
    ? profile.display_name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email?.slice(0, 2).toUpperCase() ?? "?";

  const displayName = profile?.display_name ?? user.email?.split("@")[0] ?? "User";

  if (collapsed) {
    return (
      <div
        className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-brand-cyan flex items-center justify-center text-[11px] font-bold text-white mx-auto cursor-pointer"
        title={displayName}
      />
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-overlay border border-surface-border">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-brand-cyan flex items-center justify-center text-[11px] font-bold text-white shrink-0">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-text-primary truncate">{displayName}</p>
        <p className="text-[10px] text-text-muted truncate">{user.email}</p>
      </div>
      <button
        onClick={signOut}
        title="Sign out"
        className="shrink-0 text-text-muted hover:text-red-400 transition-colors"
      >
        <LogOut size={12} />
      </button>
    </div>
  );
}
