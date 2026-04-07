"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, Search, Bell,
  LayoutDashboard, BookOpen, TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserMenu } from "./UserMenu";

interface NavbarProps {
  onMenuClick?:      () => void;
  sidebarOpen?:      boolean;
  /** px width of the sidebar — navbar left edge matches this exactly */
  sidebarWidth?:     number;
}

const NAV_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tracks",    href: "/tracks",     icon: BookOpen },
  { label: "Progress",  href: "/progress",   icon: TrendingUp },
];

// Sidebar widths in px — must match sidebar.tsx w-64 / w-16
const SIDEBAR_EXPANDED  = 256; // 16rem = w-64
const SIDEBAR_COLLAPSED = 64;  // 4rem  = w-16

export function Navbar({ onMenuClick, sidebarOpen, sidebarWidth }: NavbarProps) {
  const pathname  = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detect desktop breakpoint (lg = 1024px)
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // On desktop: push navbar left edge to exactly match sidebar right edge
  // On mobile: navbar spans full width (left: 0)
  // Use inline style — NOT dynamic Tailwind classes (JIT can't detect runtime values)
  const leftOffset = isDesktop ? (sidebarWidth ?? SIDEBAR_EXPANDED) : 0;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-40 h-16",
        "flex items-center gap-3 px-4",
        "transition-[left,background-color,border-color] duration-300",
        scrolled
          ? "bg-[#0D1117]/92 backdrop-blur-md border-b border-white/[0.06]"
          : "bg-transparent"
      )}
      style={{ left: leftOffset }}
      suppressHydrationWarning
    >
      {/* ── Mobile: hamburger + logo ── */}
      <button
        onClick={onMenuClick}
        aria-label="Toggle sidebar"
        className="flex lg:hidden items-center justify-center w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#8B9BB4] hover:text-[#F0F6FF] hover:bg-white/[0.08] transition-all duration-150 shrink-0"
      >
        {sidebarOpen ? <X size={15} /> : <Menu size={15} />}
      </button>

      {/* Mobile logo — sidebar is hidden on mobile so show it here */}
      <Link
        href="/dashboard"
        className="flex lg:hidden items-center gap-2 shrink-0"
      >
        <LogoMark size={26} />
        <span className="text-[#F0F6FF] font-semibold text-sm tracking-tight">
          Code<span className="text-[#7B61FF]">Dev</span>
        </span>
      </Link>

      {/* ── Desktop: nav links (sidebar already shows logo) ── */}
      <nav className="hidden lg:flex items-center gap-0.5 flex-1">
        {NAV_LINKS.map(({ label, href, icon: Icon }) => {
          const active =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                "text-sm font-medium transition-all duration-150 whitespace-nowrap",
                active
                  ? "bg-[#7B61FF]/10 text-[#A895FF]"
                  : "text-[#8B9BB4] hover:text-[#F0F6FF] hover:bg-white/[0.05]"
              )}
            >
              <Icon size={14} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* ── Right actions ── */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#4B5563] hover:text-[#8B9BB4] text-xs transition-all duration-150 w-44">
          <Search size={12} />
          <span>Search lessons...</span>
          <kbd className="ml-auto font-mono text-[10px] bg-white/[0.06] px-1.5 py-0.5 rounded-md">
            ⌘K
          </kbd>
        </button>

        <button
          aria-label="Notifications"
          className="relative flex items-center justify-center w-9 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#8B9BB4] hover:text-[#F0F6FF] hover:bg-white/[0.08] transition-all duration-150"
        >
          <Bell size={14} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#7B61FF]" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
}

function LogoMark({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#7B61FF" fillOpacity="0.14" />
      <rect width="32" height="32" rx="8" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M10 11L6 16L10 21" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 11L26 16L22 21" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 9L13 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.65" />
    </svg>
  );
}
