"use client";

import React, {
  useState, useEffect, useRef, useCallback, useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ArrowRight, Clock, BookOpen, Hash,
  LayoutDashboard, TrendingUp, Bookmark, X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TRACKS } from "@/lib/constants";
import { TRACK_LESSONS } from "@/lib/lessons";

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface SearchResult {
  id:       string;
  type:     "track" | "lesson" | "page";
  title:    string;
  subtitle: string;
  href:     string;
  icon:     React.ReactNode;
  accent?:  string;
  tags?:    string[];
}

/* ─── Static page results ────────────────────────────────────────────────── */
const PAGES: SearchResult[] = [
  { id: "p-dash",      type: "page", title: "Dashboard",   subtitle: "Your learning overview",  href: "/dashboard",  icon: <LayoutDashboard size={14} />, accent: "#7B61FF" },
  { id: "p-tracks",    type: "page", title: "All Tracks",  subtitle: "Browse every course",      href: "/tracks",     icon: <BookOpen size={14} />,        accent: "#00C2FF" },
  { id: "p-progress",  type: "page", title: "Progress",    subtitle: "Track your learning",      href: "/progress",   icon: <TrendingUp size={14} />,      accent: "#10B981" },
  { id: "p-bookmarks", type: "page", title: "Bookmarks",   subtitle: "Saved lessons",            href: "/bookmarks",  icon: <Bookmark size={14} />,        accent: "#F59E0B" },
];

const TRACK_ICONS: Record<string, string> = {
  python: "🐍", sysadmin: "⚙️", rust: "🦀", lua: "🌙", go: "🐹",
};

/* ─── Build full search index ────────────────────────────────────────────── */
function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [...PAGES];

  // Add tracks
  for (const track of TRACKS) {
    results.push({
      id:       `track-${track.slug}`,
      type:     "track",
      title:    track.title,
      subtitle: track.subtitle,
      href:     `/learn/${track.slug}`,
      icon:     <span style={{ fontSize: 14 }}>{TRACK_ICONS[track.slug]}</span>,
      accent:   track.color,
      tags:     track.tags,
    });
  }

  // Add lessons for each track
  for (const track of TRACKS) {
    const lessons = TRACK_LESSONS[track.slug] ?? [];
    for (const lesson of lessons) {
      results.push({
        id:       `lesson-${track.slug}-${lesson.slug}`,
        type:     "lesson",
        title:    lesson.title,
        subtitle: `${track.title} · ${lesson.level}`,
        href:     `/learn/${track.slug}/${lesson.slug}`,
        icon:     <Hash size={13} />,
        accent:   track.color,
        tags:     lesson.tags,
      });
    }
  }

  return results;
}

/* ─── Fuzzy search ───────────────────────────────────────────────────────── */
function search(index: SearchResult[], query: string): SearchResult[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();

  return index
    .map((item) => {
      const titleMatch   = item.title.toLowerCase().indexOf(q);
      const subMatch     = item.subtitle.toLowerCase().indexOf(q);
      const tagMatch     = item.tags?.some((t) => t.includes(q)) ? 1 : 0;
      const score =
        (titleMatch === 0  ? 100 : titleMatch > 0  ? 60 : 0) +
        (subMatch   === 0  ?  40 : subMatch   > 0  ? 20 : 0) +
        (tagMatch * 10);

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ item }) => item);
}

/* ─── Recent searches (localStorage) ────────────────────────────────────── */
const RECENT_KEY = "codedev:recent-searches";
function getRecent(): string[] {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"); }
  catch { return []; }
}
function addRecent(query: string) {
  try {
    const prev = getRecent().filter((q) => q !== query);
    localStorage.setItem(RECENT_KEY, JSON.stringify([query, ...prev].slice(0, 5)));
  } catch { /* ignore */ }
}

/* ─── Component ──────────────────────────────────────────────────────────── */
export function CommandPalette() {
  const router                        = useRouter();
  const [open,      setOpen]          = useState(false);
  const [query,     setQuery]         = useState("");
  const [cursor,    setCursor]        = useState(0);
  const [recent,    setRecent]        = useState<string[]>([]);
  const inputRef                      = useRef<HTMLInputElement>(null);
  const listRef                       = useRef<HTMLDivElement>(null);

  const index   = useMemo(() => buildIndex(), []);
  const results = useMemo(() => search(index, query), [index, query]);

  const openPalette  = useCallback(() => {
    setOpen(true);
    setQuery("");
    setCursor(0);
    setRecent(getRecent());
  }, []);
  const closePalette = useCallback(() => setOpen(false), []);

  // ⌘K / Ctrl+K global shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        if (!open) { setQuery(""); setCursor(0); setRecent(getRecent()); }
      }
      if (e.key === "Escape") closePalette();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, closePalette]);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Keyboard navigation through results
  const navigate = useCallback((e: React.KeyboardEvent) => {
    const total = results.length;
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => (c + 1) % total); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setCursor((c) => (c - 1 + total) % total); }
    if (e.key === "Enter" && results[cursor]) {
      addRecent(query);
      router.push(results[cursor].href);
      closePalette();
    }
  }, [results, cursor, query, router, closePalette]);

  const handleSelect = (result: SearchResult) => {
    if (query.trim()) addRecent(query);
    router.push(result.href);
    closePalette();
  };

  return (
    <>
      {/* Trigger button (wired into Navbar) */}
      <button
        onClick={openPalette}
        className="hidden sm:flex items-center gap-2 px-3 h-9 rounded-xl border border-white/[0.08] bg-white/[0.04] text-[#4B5563] hover:text-[#8B9BB4] hover:border-white/[0.12] text-xs transition-all duration-150 w-44"
        aria-label="Open command palette"
      >
        <Search size={12} />
        <span>Search lessons...</span>
        <kbd className="ml-auto font-mono text-[10px] bg-white/[0.06] px-1.5 py-0.5 rounded-md">
          ⌘K
        </kbd>
      </button>

      {/* Palette overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={closePalette}
            />

            {/* Panel */}
            <motion.div
              className="fixed top-[12%] left-1/2 z-50 w-full max-w-xl -translate-x-1/2"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1 }}
              exit={{ opacity: 0,   y: -8,   scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="mx-4 rounded-2xl border border-white/[0.10] bg-[#161B22] shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden">

                {/* Search input */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
                  <Search size={16} className="text-[#4B5563] shrink-0" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
                    onKeyDown={navigate}
                    placeholder="Search tracks, lessons, pages..."
                    className="flex-1 bg-transparent text-sm text-[#F0F6FF] placeholder:text-[#4B5563] outline-none"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  {query && (
                    <button onClick={() => setQuery("")} className="text-[#4B5563] hover:text-[#8B9BB4] transition-colors">
                      <X size={14} />
                    </button>
                  )}
                  <kbd className="shrink-0 font-mono text-[10px] text-[#4B5563] bg-white/[0.05] border border-white/[0.08] px-1.5 py-0.5 rounded-md">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[400px] overflow-y-auto py-2">
                  {query.trim() === "" ? (
                    <>
                      {/* Recent */}
                      {recent.length > 0 && (
                        <ResultGroup label="Recent searches">
                          {recent.map((r, i) => (
                            <button
                              key={i}
                              onClick={() => setQuery(r)}
                              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#8B9BB4] hover:bg-white/[0.04] transition-colors text-left"
                            >
                              <Clock size={13} className="text-[#4B5563] shrink-0" />
                              {r}
                            </button>
                          ))}
                        </ResultGroup>
                      )}
                      {/* Quick nav */}
                      <ResultGroup label="Quick navigation">
                        {PAGES.map((p, i) => (
                          <ResultRow
                            key={p.id}
                            result={p}
                            active={false}
                            onClick={() => handleSelect(p)}
                          />
                        ))}
                      </ResultGroup>
                    </>
                  ) : results.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <Search size={24} className="text-[#2A3441] mb-3" />
                      <p className="text-sm font-medium text-[#4B5563]">No results for "{query}"</p>
                      <p className="text-xs text-[#2A3441] mt-1">Try a track name, lesson title, or topic</p>
                    </div>
                  ) : (
                    <>
                      {/* Group by type */}
                      {(["page", "track", "lesson"] as const).map((type) => {
                        const group = results.filter((r) => r.type === type);
                        if (!group.length) return null;
                        const labels = { page: "Pages", track: "Tracks", lesson: "Lessons" };
                        return (
                          <ResultGroup key={type} label={labels[type]}>
                            {group.map((r, i) => {
                              const idx = results.indexOf(r);
                              return (
                                <ResultRow
                                  key={r.id}
                                  result={r}
                                  active={cursor === idx}
                                  onClick={() => handleSelect(r)}
                                />
                              );
                            })}
                          </ResultGroup>
                        );
                      })}
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.05] bg-white/[0.02]">
                  <div className="flex items-center gap-4 text-[10px] text-[#4B5563]">
                    <span className="flex items-center gap-1"><kbd className="font-mono bg-white/[0.05] border border-white/[0.08] px-1 py-0.5 rounded text-[9px]">↑↓</kbd> navigate</span>
                    <span className="flex items-center gap-1"><kbd className="font-mono bg-white/[0.05] border border-white/[0.08] px-1 py-0.5 rounded text-[9px]">↵</kbd> open</span>
                    <span className="flex items-center gap-1"><kbd className="font-mono bg-white/[0.05] border border-white/[0.08] px-1 py-0.5 rounded text-[9px]">ESC</kbd> close</span>
                  </div>
                  <span className="text-[10px] text-[#2A3441]">{results.length} result{results.length !== 1 ? "s" : ""}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function ResultGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#4B5563]">
        {label}
      </p>
      {children}
    </div>
  );
}

function ResultRow({ result, active, onClick }: {
  result: SearchResult; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2.5 transition-colors duration-100 text-left group",
        active ? "bg-white/[0.06]" : "hover:bg-white/[0.04]"
      )}
    >
      {/* Icon */}
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{
          background:  result.accent ? `${result.accent}18` : "rgba(255,255,255,0.05)",
          color:       result.accent ?? "#8B9BB4",
        }}
      >
        {result.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#F0F6FF] truncate">{result.title}</p>
        <p className="text-xs text-[#4B5563] truncate">{result.subtitle}</p>
      </div>

      {/* Arrow */}
      <ArrowRight
        size={13}
        className={cn(
          "shrink-0 transition-all duration-150",
          active ? "text-[#8B9BB4] translate-x-0.5" : "text-[#2A3441] group-hover:text-[#4B5563]"
        )}
      />
    </button>
  );
}

/* ─── Hook for external trigger ─────────────────────────────────────────── */
export function useCommandPalette() {
  const open = useCallback(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
  }, []);
  return { open };
}
