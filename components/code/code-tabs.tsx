"use client";

import React, { useState } from "react";
import { FileCode2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

export interface CodeTab {
  filename:  string;
  language:  string;
  code:      string;
  notes?:    string;
}

interface CodeTabsProps {
  tabs:       CodeTab[];
  className?: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  python: "#3B82F6", rust: "#F97316", go: "#06B6D4",
  lua:    "#8B5CF6", bash: "#10B981", sh: "#10B981",
  toml:   "#F59E0B", json: "#8B9BB4",
};

const LANGUAGE_LABELS: Record<string, string> = {
  python: "Python", rust: "Rust", go: "Go", lua: "Lua",
  bash:   "Bash",   sh:   "Bash", toml: "TOML", json: "JSON",
  typescript: "TS", javascript: "JS",
};

// Minimal client-side highlighter for tabs (server Shiki used in page components)
function highlight(code: string, lang: string): string {
  const keywords: Record<string, string[]> = {
    python: ["def","class","import","from","return","if","elif","else","for","while","in","not","and","or","True","False","None","with","as","try","except","finally","raise","lambda","yield","async","await","pass"],
    rust:   ["fn","let","mut","pub","use","struct","enum","impl","trait","match","if","else","for","while","loop","return","self","mod","where","move","ref","in","as","const","static","unsafe","async","await"],
    go:     ["func","var","const","type","struct","interface","map","chan","go","defer","return","if","else","for","range","switch","case","default","select","package","import","make","new","nil","true","false"],
    lua:    ["function","local","return","if","then","else","elseif","end","for","while","do","repeat","until","in","not","and","or","true","false","nil","self"],
    bash:   ["if","then","else","fi","for","do","done","while","function","echo","export","source","return","exit"],
  };

  const kws = new Set(keywords[lang] ?? []);

  return code
    .split("\n")
    .map((line) => {
      // Comments
      const isComment =
        (lang === "lua" && line.trimStart().startsWith("--")) ||
        (["bash","sh"].includes(lang) && line.trimStart().startsWith("#")) ||
        (["rust","go"].includes(lang) && line.trimStart().startsWith("//")) ||
        (lang === "python" && line.trimStart().startsWith("#"));

      if (isComment) {
        return `<span style="color:#5C6370;font-style:italic">${escHtml(line)}</span>`;
      }

      return line
        .split(/(\b\w+\b|"[^"]*"|'[^']*'|`[^`]*`)/g)
        .map((part) => {
          if (kws.has(part))           return `<span style="color:#79C0FF">${escHtml(part)}</span>`;
          if (/^["'`]/.test(part))     return `<span style="color:#A5D6FF">${escHtml(part)}</span>`;
          if (/^\d+$/.test(part))      return `<span style="color:#F2CC60">${escHtml(part)}</span>`;
          return escHtml(part);
        })
        .join("");
    })
    .join("\n");
}

function escHtml(s: string) {
  return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

export function CodeTabs({ tabs, className }: CodeTabsProps) {
  const [active, setActive] = useState(0);
  const tab = tabs[active];
  const isTerminal = tab.language === "bash" || tab.language === "sh" || tab.filename === "terminal";
  const langColor = LANGUAGE_COLORS[tab.language] ?? "#8B9BB4";

  return (
    <div className={cn("rounded-2xl overflow-hidden border border-surface-border bg-[#0D1117]", className)}>
      {/* Chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-surface-elevated border-b border-surface-border">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>

        {/* File tabs */}
        <div className="flex items-center gap-0.5 flex-1 overflow-x-auto no-scrollbar">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all duration-150 shrink-0",
                active === i
                  ? "bg-surface-overlay text-text-secondary"
                  : "text-text-muted hover:text-text-secondary hover:bg-surface-overlay/50"
              )}
            >
              {t.language === "bash" || t.filename === "terminal"
                ? <Terminal size={10} />
                : <FileCode2 size={10} />
              }
              {t.filename}
            </button>
          ))}
        </div>

        {/* Lang badge + copy */}
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
            style={{ color: langColor, background: `${langColor}18`, borderColor: `${langColor}30` }}
          >
            {LANGUAGE_LABELS[tab.language] ?? tab.language}
          </div>
          <CopyButton code={tab.code} />
        </div>
      </div>

      {/* Code */}
      <div className="relative overflow-x-auto">
        <pre
          className="text-[13px] leading-[1.75] p-5 font-mono overflow-x-auto"
          style={{ fontFamily: "var(--font-mono,'IBM Plex Mono',ui-monospace,monospace)" }}
        >
          <code
            dangerouslySetInnerHTML={{ __html: highlight(tab.code, tab.language) }}
          />
        </pre>
      </div>

      {/* Notes */}
      {tab.notes && (
        <div className="px-5 py-3 bg-surface-elevated border-t border-surface-border">
          <p className="text-xs text-text-muted leading-relaxed">
            <span className="text-text-secondary font-medium">Note: </span>
            {tab.notes}
          </p>
        </div>
      )}
    </div>
  );
}
