"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Footer } from "./footer";

interface DashboardShellProps {
  children:    React.ReactNode;
  showFooter?: boolean;
}

export function DashboardShell({ children, showFooter = true }: DashboardShellProps) {
  const [sidebarOpen,      setSidebarOpen]      = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const closeSidebar   = () => setSidebarOpen(false);
  const toggleSidebar  = () => setSidebarOpen((v) => !v);
  const toggleCollapse = () => setSidebarCollapsed((v) => !v);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") closeSidebar(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Sidebar is always visible on lg+; open/close only on mobile
  const mainMargin = sidebarCollapsed ? "lg:pl-16" : "lg:pl-64";

  return (
    <div className="min-h-dvh flex flex-col bg-surface">

      {/* ── Navbar — fixed top ── */}
      <Navbar onMenuClick={toggleSidebar} sidebarOpen={sidebarOpen} />

      {/* ── Sidebar — fixed left ── */}
      <Sidebar
        open={sidebarOpen}
        collapsed={sidebarCollapsed}
        onCollapse={toggleCollapse}
        onClose={closeSidebar}
      />

      {/* ── Main content — offset by sidebar on desktop ── */}
      <div
        className={cn(
          "flex flex-col flex-1 min-w-0",
          "pt-16",                         // navbar height
          "transition-[padding] duration-250 ease-in-out",
          mainMargin
        )}
      >
        <main className="flex-1 min-h-0">
          {children}
        </main>

        {showFooter && <Footer />}
      </div>
    </div>
  );
}
