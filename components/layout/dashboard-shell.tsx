"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";

// Mirror of sidebar.tsx: w-64 = 256px expanded, w-16 = 64px collapsed
const SIDEBAR_W_EXPANDED  = 256;
const SIDEBAR_W_COLLAPSED = 64;

interface DashboardShellProps {
  children:    React.ReactNode;
  showFooter?: boolean;
}

export function DashboardShell({ children, showFooter = true }: DashboardShellProps) {
  const [sidebarOpen,      setSidebarOpen]      = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDesktop,        setIsDesktop]        = useState(false);

  // Detect lg breakpoint — runs only on client, so no hydration mismatch
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // The actual pixel offset shared between Navbar and content area
  const sidebarPx = isDesktop
    ? (sidebarCollapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W_EXPANDED)
    : 0;

  return (
    <div className="min-h-dvh bg-[#0D1117]">

      {/* Sidebar — fixed, z-30 */}
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed((v) => !v)}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Navbar — fixed, z-40.
          left offset = sidebarPx so it starts right after the sidebar.
          Inline style avoids Tailwind JIT missing dynamic class names. */}
      <Navbar
        onMenuClick={() => setSidebarOpen((v) => !v)}
        sidebarOpen={sidebarOpen}
        sidebarWidth={sidebarPx}
      />

      {/* Main content area.
          paddingTop = navbar height (64px = h-16).
          paddingLeft = sidebar width on desktop, 0 on mobile.
          Both via inline style — no dynamic Tailwind class. */}
      <div
        className="flex flex-col min-h-dvh"
        suppressHydrationWarning
        style={{
          paddingTop:  "4rem",       // h-16 = 64px
          paddingLeft: `${sidebarPx}px`,
          transition:  "padding-left 250ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <main className="flex-1 min-h-0">
          {children}
        </main>
        {showFooter && <Footer />}
      </div>

    </div>
  );
}
