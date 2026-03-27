"use client";

import React, { useState } from "react";
import { Copy, Check, Terminal, FileCode2 } from "lucide-react";
import { cn } from "@/lib/utils";

const LANGUAGE_COLORS: Record<string, string> = {
  python: "#3B82F6",
  rust:   "#F97316",
  go:     "#06B6D4",
  lua:    "#8B5CF6",
  bash:   "#10B981",
  toml:   "#F59E0B",
  json:   "#8B9BB4",
  ts:     "#3B82F6",
  js:     "#F59E0B",
};

const LANGUAGE_LABELS: Record<string, string> = {
  python: "Python",
  rust:   "Rust",
  go:     "Go",
  lua:    "Lua",
  bash:   "Bash",
  toml:   "TOML",
  json:   "JSON",
  ts:     "TypeScript",
  js:     "JavaScript",
};

interface CodeBlockProps {
  code:       string;
  language:   string;
  filename?:  string;
  title?:     string;
  notes?:     string;
  className?: string;
}

export function CodeBlock({
  code, language, filename, title, notes, className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback — select all text
    }
  };

  const langColor = LANGUAGE_COLORS[language] ?? "#8B9BB4";
  const langLabel = LANGUAGE_LABELS[language] ?? language.toUpperCase();
  const isTerminal = language === "bash" || filename === "terminal";

  return (
    <div className={cn("rounded-2xl overflow-hidden border border-surface-border bg-[#0D1117]", className)}>
      {/* Header bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-surface-elevated border-b border-surface-border">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>

        {/* Filename / title */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
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

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className={cn(
            "shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all duration-150",
            copied
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
              : "bg-surface-overlay text-text-muted hover:text-text-secondary border border-surface-border hover:border-surface-border-light"
          )}
        >
          {copied
            ? <><Check size={11} /> Copied!</>
            : <><Copy size={11} /> Copy</>
          }
        </button>
      </div>

      {/* Code area */}
      <div className="relative overflow-x-auto">
        <pre className={cn(
          "text-[13px] leading-[1.75] p-5 font-mono overflow-x-auto",
          "text-[#E6EDF3]",
          "selection:bg-brand-accent/25"
        )}>
          <code className={`language-${language}`}>
            {/* Simple syntax highlighting via CSS */}
            {highlightCode(code, language)}
          </code>
        </pre>
      </div>

      {/* Notes */}
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

/* ─── Very lightweight syntax highlighter via regex spans ────────────────── */
function highlightCode(code: string, lang: string): React.ReactNode {
  // For MVP we render plain with color-coded tokens using simple regex
  // Phase 7 will add full Shiki/Prism integration
  const lines = code.split("\n");

  return lines.map((line, i) => (
    <span key={i}>
      {tokenizeLine(line, lang)}
      {i < lines.length - 1 && "\n"}
    </span>
  ));
}

function tokenizeLine(line: string, lang: string): React.ReactNode {
  // Comment detection
  const commentChar = lang === "lua" ? "--" : "#";
  const slashComment = ["rust", "go", "ts", "js"].includes(lang);

  if (
    line.trimStart().startsWith(commentChar) ||
    (slashComment && line.trimStart().startsWith("//"))
  ) {
    return <span style={{ color: "#6B7280", fontStyle: "italic" }}>{line}</span>;
  }

  // Keyword sets per language
  const keywords: Record<string, string[]> = {
    python: ["def", "class", "import", "from", "return", "if", "elif", "else", "for", "while", "in", "not", "and", "or", "True", "False", "None", "with", "as", "try", "except", "finally", "raise", "lambda", "yield", "async", "await", "pass", "break", "continue", "print"],
    rust:   ["fn", "let", "mut", "pub", "use", "struct", "enum", "impl", "trait", "type", "match", "if", "else", "for", "while", "loop", "return", "self", "Self", "super", "crate", "mod", "where", "move", "ref", "in", "as", "const", "static", "unsafe", "async", "await"],
    go:     ["func", "var", "const", "type", "struct", "interface", "map", "chan", "go", "defer", "return", "if", "else", "for", "range", "switch", "case", "default", "select", "package", "import", "make", "new", "nil", "true", "false", "len", "cap", "append", "close"],
    lua:    ["function", "local", "return", "if", "then", "else", "elseif", "end", "for", "while", "do", "repeat", "until", "in", "not", "and", "or", "true", "false", "nil", "self"],
    bash:   ["if", "then", "else", "fi", "for", "do", "done", "while", "function", "echo", "export", "source", "return", "exit"],
  };

  const kws = keywords[lang] ?? [];
  // Simple: split on word boundaries and colorize keywords
  const parts = line.split(/(\b\w+\b|"[^"]*"|'[^']*'|`[^`]*`)/g);

  return parts.map((part, i) => {
    if (kws.includes(part)) {
      return <span key={i} style={{ color: "#79C0FF" }}>{part}</span>;
    }
    if (/^["'`]/.test(part)) {
      return <span key={i} style={{ color: "#A5D6FF" }}>{part}</span>;
    }
    if (/^\d+$/.test(part)) {
      return <span key={i} style={{ color: "#F2CC60" }}>{part}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}
