"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Bell, LayoutDashboard, BookOpen, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onMenuClick?: () => void;
  sidebarOpen?: boolean;
}

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tracks",    href: "/tracks",     icon: BookOpen },
  { label: "Progress",  href: "/progress",   icon: TrendingUp },
];

export function Navbar({ onMenuClick, sidebarOpen }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 h-16",
        "flex items-center gap-3 px-4 lg:px-5",
        "transition-all duration-300",
        scrolled
          ? "bg-surface/90 backdrop-blur-md border-b border-surface-border/60"
          : "bg-transparent"
      )}
    >
      {/* Hamburger */}
      <button
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
        className="flex items-center justify-center w-9 h-9 rounded-xl border border-surface-border bg-surface-elevated text-text-muted hover:text-text-primary hover:bg-surface-overlay transition-all duration-150 shrink-0 lg:hidden"
      >
        {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
      </button>

      {/* Logo — shown on mobile (hidden on desktop since sidebar has it) */}
      <Link href="/dashboard" className="flex items-center gap-2 mr-3 shrink-0 lg:hidden">
        <LogoMark size={28} />
        <span className="text-text-primary font-semibold text-sm tracking-tight">
          Code<span className="text-brand-accent">Dev</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-0.5 flex-1">
        {NAV_LINKS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "bg-brand-accent/10 text-brand-accent-light"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
              )}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Search */}
        <button className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl border border-surface-border bg-surface-elevated text-text-muted hover:text-text-secondary hover:border-surface-border-light text-xs transition-all duration-150 w-44 font-sans">
          <Search size={12} />
          <span>Search lessons...</span>
          <span className="ml-auto font-mono text-[10px] bg-surface-overlay px-1.5 py-0.5 rounded-md">⌘K</span>
        </button>

        {/* Bell */}
        <button
          aria-label="Notifications"
          className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-surface-border bg-surface-elevated text-text-secondary hover:text-text-primary hover:bg-surface-overlay transition-all duration-150"
        >
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent" />
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-semibold text-white bg-gradient-to-br from-brand-accent to-brand-cyan hover:ring-2 hover:ring-brand-accent/40 hover:ring-offset-2 hover:ring-offset-surface transition-all duration-150 cursor-pointer select-none">
          CD
        </div>
      </div>
    </header>
  );
}

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="#7B61FF" fillOpacity="0.14" />
      <rect width="32" height="32" rx="8" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M10 11L6 16L10 21" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 11L26 16L22 21" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 9L13 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.65"/>
    </svg>
  );
}
