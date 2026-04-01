"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, BookOpen, TrendingUp, Bookmark,
  Settings, ChevronLeft, ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SidebarUserChip } from "./UserMenu";
import { TRACKS } from "@/lib/constants";

interface SidebarProps {
  open:       boolean;
  collapsed:  boolean;
  onCollapse: () => void;
  onClose:    () => void;
}

const MAIN_NAV = [
  { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
  { label: "All Tracks", href: "/tracks",      icon: BookOpen },
  { label: "Progress",   href: "/progress",    icon: TrendingUp },
  { label: "Bookmarks",  href: "/bookmarks",   icon: Bookmark },
];

const TRACK_ICONS: Record<string, string> = {
  python: "🐍", sysadmin: "⚙️", rust: "🦀", lua: "🌙", go: "🐹",
};

export function Sidebar({ open, collapsed, onCollapse, onClose }: SidebarProps) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 z-30 flex flex-col",
          "bg-surface/[0.97] backdrop-blur-xl",
          "border-r border-surface-border/60",
          "sidebar-transition",
          collapsed ? "w-16" : "w-64",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center h-16 shrink-0 px-4 border-b border-surface-border/60",
          collapsed ? "justify-center" : "justify-between"
        )}>
          {!collapsed && (
            <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2.5">
              <LogoMark />
              <span className="text-text-primary font-semibold text-sm tracking-tight">
                Code<span className="text-brand-accent">Dev</span>
              </span>
            </Link>
          )}
          {collapsed && <LogoMark />}

          <button
            onClick={onCollapse}
            className="hidden lg:flex items-center justify-center w-6 h-6 rounded-lg text-text-muted hover:text-text-secondary hover:bg-surface-elevated transition-all duration-150"
            aria-label={collapsed ? "Expand" : "Collapse"}
          >
            {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          </button>
        </div>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto no-scrollbar py-3">
          <NavSection label="Menu" collapsed={collapsed}>
            {MAIN_NAV.map(({ label, href, icon: Icon }) => (
              <NavItem key={href} href={href} label={label} icon={<Icon size={15} />}
                active={isActive(href)} collapsed={collapsed} onClick={onClose} />
            ))}
          </NavSection>

          <NavSection label="Tracks" collapsed={collapsed} className="mt-5">
            {TRACKS.map((track) => (
              <NavItem
                key={track.slug}
                href={`/learn/${track.slug}`}
                label={track.title}
                icon={<span style={{ fontSize: 15, lineHeight: 1 }}>{TRACK_ICONS[track.slug]}</span>}
                active={isActive(`/learn/${track.slug}`)}
                collapsed={collapsed}
                onClick={onClose}
                accentColor={track.color}
                badge={track.slug === "sysadmin" ? "New" : undefined}
              />
            ))}
          </NavSection>
        </div>

        {/* Bottom */}
        <div className="shrink-0 border-t border-surface-border/60 p-2 space-y-1">
          <NavItem href="/settings" label="Settings" icon={<Settings size={15} />}
            active={isActive("/settings")} collapsed={collapsed} onClick={onClose} />

          <SidebarUserChip collapsed={collapsed} />
        </div>
      </aside>
    </>
  );
}

/* ── Sub-components ────────────────────────────────────────────────────── */
function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <rect width="32" height="32" rx="8" fill="#7B61FF" fillOpacity="0.14" />
      <rect width="32" height="32" rx="8" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.4" />
      <path d="M10 11L6 16L10 21" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 11L26 16L22 21" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 9L13 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.65"/>
    </svg>
  );
}

function NavSection({ label, collapsed, children, className }: {
  label: string; collapsed: boolean; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn("px-2", className)}>
      {!collapsed && (
        <p className="px-2 mb-1 text-[9.5px] font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </p>
      )}
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function NavItem({ href, label, icon, active, collapsed, onClick, accentColor, badge }: {
  href: string; label: string; icon: React.ReactNode; active: boolean;
  collapsed: boolean; onClick?: () => void; accentColor?: string; badge?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={cn(
        "group relative flex items-center gap-2.5 px-2 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 select-none",
        collapsed ? "justify-center" : "",
        active
          ? "bg-brand-accent/10 text-brand-accent-light"
          : "text-text-secondary hover:text-text-primary hover:bg-surface-elevated"
      )}
    >
      {/* Active bar */}
      {active && (
        <span
          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
          style={{ backgroundColor: accentColor ?? "#7B61FF" }}
        />
      )}

      <span className={cn("shrink-0", active ? "text-brand-accent-light" : "text-text-muted group-hover:text-text-secondary")}>
        {icon}
      </span>

      {!collapsed && (
        <>
          <span className="truncate flex-1">{label}</span>
          {badge && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-brand-accent/15 text-brand-accent-light border border-brand-accent/20">
              {badge}
            </span>
          )}
        </>
      )}

      {/* Tooltip on collapsed */}
      {collapsed && (
        <span className="absolute left-full ml-2.5 px-2.5 py-1.5 rounded-lg bg-surface-overlay border border-surface-border text-xs font-medium text-text-primary whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-50 shadow-card">
          {label}
        </span>
      )}
    </Link>
  );
}
