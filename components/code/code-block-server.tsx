import React from "react";
import { highlightCode, LANGUAGE_MAP } from "@/lib/shiki";
import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";
import { Terminal, FileCode2 } from "lucide-react";

const LANGUAGE_LABELS: Record<string, string> = {
  python: "Python", py: "Python",
  rust:   "Rust",   rs: "Rust",
  go:     "Go",     golang: "Go",
  lua:    "Lua",
  bash:   "Bash",   sh: "Bash", shell: "Bash",
  toml:   "TOML",
  json:   "JSON",
  ts:     "TypeScript", typescript: "TypeScript",
  js:     "JavaScript", javascript: "JavaScript",
  text:   "Text",
};

const LANGUAGE_COLORS: Record<string, string> = {
  python: "#3B82F6",  rust:   "#F97316",
  go:     "#06B6D4",  lua:    "#8B5CF6",
  bash:   "#10B981",  sh:     "#10B981",
  toml:   "#F59E0B",  json:   "#8B9BB4",
  ts:     "#3B82F6",  typescript: "#3B82F6",
  js:     "#F59E0B",  javascript: "#F59E0B",
};

interface CodeBlockServerProps {
  code:            string;
  language:        string;
  filename?:       string;
  title?:          string;
  notes?:          string;
  showLineNumbers?: boolean;
  highlightLines?:  number[];
  className?:      string;
}

export async function CodeBlockServer({
  code,
  language,
  filename,
  title,
  notes,
  showLineNumbers = true,
  highlightLines,
  className,
}: CodeBlockServerProps) {
  const { html, lines } = await highlightCode(code, language, { highlightLines });
  const langColor = LANGUAGE_COLORS[language] ?? "#8B9BB4";
  const langLabel = LANGUAGE_LABELS[language] ?? language.toUpperCase();
  const isTerminal = language === "bash" || language === "sh" || filename === "terminal";

  return (
    <div
      className={cn(
        "rounded-2xl overflow-hidden border border-surface-border",
        "bg-[#0D1117]",
        className
      )}
    >
      {/* ── Window chrome ── */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-surface-elevated border-b border-surface-border">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:opacity-80 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:opacity-80 transition-opacity" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:opacity-80 transition-opacity" />
        </div>

        {/* File icon + name */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {isTerminal
            ? <Terminal size={12} className="text-text-muted shrink-0" />
            : <FileCode2 size={12} className="text-text-muted shrink-0" />
          }
          {(filename || title) && (
            <span className="text-xs font-mono text-text-muted truncate">
              {filename ?? title}
            </span>
          )}
        </div>

        {/* Line count */}
        {showLineNumbers && lines > 1 && (
          <span className="hidden sm:block text-[10px] font-mono text-text-muted shrink-0">
            {lines} lines
          </span>
        )}

        {/* Language badge */}
        <div
          className="shrink-0 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
          style={{
            color:       langColor,
            background:  `${langColor}18`,
            borderColor: `${langColor}30`,
          }}
        >
          {langLabel}
        </div>

        {/* Copy button (client component) */}
        <CopyButton code={code} />
      </div>

      {/* ── Code area ── */}
      <div className="relative overflow-x-auto">
        <div
          className="shiki-wrapper text-[13px] leading-[1.75]"
          style={{
            fontFamily: "var(--font-mono, 'IBM Plex Mono', ui-monospace, monospace)",
            fontFeatureSettings: '"liga" 1, "calt" 1',
          }}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: injectLineNumbers(html, showLineNumbers, highlightLines) }}
        />
      </div>

      {/* ── Notes ── */}
      {notes && (
        <div className="px-5 py-3 bg-surface-elevated border-t border-surface-border">
          <p className="text-xs text-text-muted leading-relaxed">
            <span className="text-text-secondary font-medium">Note: </span>
            {notes}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─── Inject line numbers and highlight markers into Shiki HTML ─────────── */
function injectLineNumbers(
  html:         string,
  showNumbers:  boolean,
  highlighted?: number[]
): string {
  if (!showNumbers && !highlighted?.length) return html;

  // Shiki wraps each line in a <span class="line">
  let lineIdx = 0;
  return html.replace(/<span class="line">/g, () => {
    lineIdx++;
    const isHighlighted = highlighted?.includes(lineIdx);
    const numSpan = showNumbers
      ? `<span class="line-number" aria-hidden="true">${lineIdx}</span>`
      : "";
    const hlAttr = isHighlighted ? ' data-highlighted="true"' : "";
    return `<span class="line"${hlAttr}>${numSpan}`;
  });
}
