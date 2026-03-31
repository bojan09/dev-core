import React from "react";
import { cn } from "@/lib/utils";

interface InlineCodeProps {
  children:   React.ReactNode;
  className?: string;
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 rounded-md",
        "font-mono text-[0.85em]",
        "bg-surface-overlay border border-surface-border",
        "text-brand-accent-light",
        className
      )}
    >
      {children}
    </code>
  );
}
