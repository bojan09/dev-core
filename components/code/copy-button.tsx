"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  code:       string;
  className?: string;
}

export function CopyButton({ code, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = code;
      el.style.position = "absolute";
      el.style.left = "-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? "Copied!" : "Copy code"}
      className={cn(
        "shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg",
        "text-[11px] font-medium transition-all duration-150",
        copied
          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
          : "bg-surface-overlay text-text-muted hover:text-text-secondary border border-surface-border hover:border-surface-border-light",
        className
      )}
    >
      {copied ? (
        <>
          <Check size={11} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={11} />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
