"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

interface DiffLine {
  type:    "add" | "remove" | "context";
  content: string;
  lineNo?: number;
}

interface DiffBlockProps {
  before:    string;
  after:     string;
  language:  string;
  filename?: string;
  className?: string;
}

function parseDiff(before: string, after: string): DiffLine[] {
  const beforeLines = before.split("\n");
  const afterLines  = after.split("\n");
  const result: DiffLine[] = [];
  let bi = 0, ai = 0;

  // Very simple LCS-based diff
  while (bi < beforeLines.length || ai < afterLines.length) {
    if (bi >= beforeLines.length) {
      result.push({ type: "add",    content: afterLines[ai++] });
    } else if (ai >= afterLines.length) {
      result.push({ type: "remove", content: beforeLines[bi++] });
    } else if (beforeLines[bi] === afterLines[ai]) {
      result.push({ type: "context", content: beforeLines[bi++] }); ai++;
    } else {
      result.push({ type: "remove", content: beforeLines[bi++] });
      result.push({ type: "add",    content: afterLines[ai++] });
    }
  }
  return result;
}

const LINE_STYLES: Record<DiffLine["type"], { bg: string; prefix: string; color: string }> = {
  add:     { bg: "rgba(16,185,129,0.1)",  prefix: "+", color: "#34d399" },
  remove:  { bg: "rgba(239,68,68,0.1)",   prefix: "−", color: "#f87171" },
  context: { bg: "transparent",           prefix: " ", color: "#E6EDF3" },
};

export function DiffBlock({ before, after, language, filename, className }: DiffBlockProps) {
  const [view, setView] = useState<"diff" | "before" | "after">("diff");
  const lines = parseDiff(before, after);

  const added   = lines.filter((l) => l.type === "add").length;
  const removed = lines.filter((l) => l.type === "remove").length;

  return (
    <div className={cn("rounded-2xl overflow-hidden border border-surface-border bg-[#0D1117]", className)}>
      {/* Chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-surface-elevated border-b border-surface-border">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>

        {filename && (
          <span className="text-xs font-mono text-text-muted">{filename}</span>
        )}

        {/* Diff stats */}
        <div className="flex items-center gap-2 ml-1">
          <span className="text-[11px] font-mono font-medium text-emerald-400">+{added}</span>
          <span className="text-[11px] font-mono font-medium text-red-400">−{removed}</span>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-0.5 ml-auto bg-surface-overlay rounded-lg p-0.5">
          {(["diff", "before", "after"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "px-2.5 py-1 rounded-md text-[10px] font-semibold capitalize transition-all duration-150",
                view === v
                  ? "bg-surface-border text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <CopyButton code={view === "before" ? before : after} />
      </div>

      {/* Diff lines */}
      <div className="overflow-x-auto">
        <pre
          className="text-[13px] leading-[1.75] font-mono"
          style={{ fontFamily: "var(--font-mono,'IBM Plex Mono',ui-monospace,monospace)" }}
        >
          {view === "diff" && lines.map((line, i) => {
            const s = LINE_STYLES[line.type];
            return (
              <div
                key={i}
                className="flex items-start px-5 py-0"
                style={{ background: s.bg }}
              >
                <span
                  className="w-4 shrink-0 select-none mr-3"
                  style={{ color: s.color, opacity: 0.7 }}
                >
                  {s.prefix}
                </span>
                <span style={{ color: s.color === "#E6EDF3" ? "#E6EDF3" : s.color }}>
                  {line.content}
                </span>
              </div>
            );
          })}

          {view === "before" && (
            <div className="px-5 py-5 text-[#E6EDF3]">{before}</div>
          )}
          {view === "after" && (
            <div className="px-5 py-5 text-[#E6EDF3]">{after}</div>
          )}
        </pre>
      </div>
    </div>
  );
}
