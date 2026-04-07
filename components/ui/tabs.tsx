"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────────── */
export interface Tab {
  id:       string;
  label:    string;
  icon?:    React.ReactNode;
  badge?:   string | number;
  disabled?: boolean;
}

interface TabsProps {
  tabs:           Tab[];
  activeTab?:     string;
  defaultTab?:    string;
  onChange?:      (id: string) => void;
  variant?:       "underline" | "pill" | "card";
  size?:          "sm" | "md" | "lg";
  accentColor?:   string;
  className?:     string;
  children?:      React.ReactNode;  // Tab panels
}

interface TabPanelProps {
  id:         string;
  activeTab:  string;
  children:   React.ReactNode;
  className?: string;
}

/* ─── Tabs component ─────────────────────────────────────────────────────── */
export function Tabs({
  tabs,
  activeTab: controlledActive,
  defaultTab,
  onChange,
  variant      = "underline",
  size         = "md",
  accentColor  = "#7B61FF",
  className,
  children,
}: TabsProps) {
  const [internalActive, setInternalActive] = useState(
    defaultTab ?? tabs[0]?.id ?? ""
  );
  const active    = controlledActive ?? internalActive;
  const listRef   = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const handleChange = (id: string) => {
    if (!controlledActive) setInternalActive(id);
    onChange?.(id);
  };

  // Update underline indicator position
  useEffect(() => {
    if (variant !== "underline") return;
    const list = listRef.current;
    if (!list) return;
    const activeEl = list.querySelector(`[data-tab="${active}"]`) as HTMLElement;
    if (activeEl) {
      setIndicatorStyle({
        left:  activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [active, variant]);

  const sizeClasses = {
    sm: "text-xs gap-0.5",
    md: "text-sm gap-1",
    lg: "text-base gap-1.5",
  };

  const paddingClasses = {
    sm: "px-2.5 py-1.5",
    md: "px-3 py-2",
    lg: "px-4 py-2.5",
  };

  return (
    <div className={className}>
      {/* Tab list */}
      <div
        ref={listRef}
        role="tablist"
        className={cn(
          "relative flex items-center",
          variant === "underline" && "border-b border-white/[0.07]",
          variant === "pill"      && "bg-[#161B22] rounded-xl p-1 gap-1",
          variant === "card"      && "gap-2",
          sizeClasses[size]
        )}
      >
        {tabs.map((tab) => {
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              data-tab={tab.id}
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && handleChange(tab.id)}
              className={cn(
                "relative flex items-center gap-1.5 font-medium transition-all duration-150 whitespace-nowrap select-none outline-none",
                "focus-visible:ring-2 focus-visible:ring-[#7B61FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D1117] rounded-lg",
                paddingClasses[size],
                tab.disabled && "opacity-40 cursor-not-allowed",

                // Underline variant
                variant === "underline" && [
                  "rounded-none pb-2.5",
                  isActive ? "text-[#F0F6FF]" : "text-[#4B5563] hover:text-[#8B9BB4]",
                ],

                // Pill variant
                variant === "pill" && [
                  "rounded-lg",
                  isActive
                    ? "bg-white/[0.08] text-[#F0F6FF] shadow-sm"
                    : "text-[#4B5563] hover:text-[#8B9BB4] hover:bg-white/[0.04]",
                ],

                // Card variant
                variant === "card" && [
                  "rounded-xl border",
                  isActive
                    ? "border-white/[0.12] bg-white/[0.06] text-[#F0F6FF]"
                    : "border-white/[0.05] bg-transparent text-[#4B5563] hover:text-[#8B9BB4] hover:border-white/[0.08]",
                ]
              )}
            >
              {tab.icon && (
                <span className={cn("shrink-0", isActive ? "text-[#F0F6FF]" : "text-[#4B5563]")}>
                  {tab.icon}
                </span>
              )}
              {tab.label}
              {tab.badge !== undefined && (
                <span
                  className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{
                    background: isActive ? `${accentColor}20` : "rgba(255,255,255,0.06)",
                    color:      isActive ? accentColor : "#4B5563",
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Animated underline indicator */}
        {variant === "underline" && (
          <motion.div
            className="absolute bottom-0 h-0.5 rounded-full pointer-events-none"
            style={{ backgroundColor: accentColor }}
            animate={indicatorStyle}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          />
        )}
      </div>

      {/* Tab panels */}
      {children}
    </div>
  );
}

/* ─── TabPanel — only renders when active ────────────────────────────────── */
export function TabPanel({ id, activeTab, children, className }: TabPanelProps) {
  if (id !== activeTab) return null;
  return (
    <motion.div
      key={id}
      role="tabpanel"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Controlled Tabs helper ─────────────────────────────────────────────── */
export function useTabs(defaultTab: string) {
  const [active, setActive] = useState(defaultTab);
  return { active, setActive };
}
