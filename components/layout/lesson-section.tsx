import React from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen, Cpu, Lightbulb, AlertTriangle, CheckCircle2, Code2,
} from "lucide-react";

type SectionType =
  | "beginner"
  | "deep-dive"
  | "code"
  | "real-world"
  | "mistakes"
  | "summary";

interface SectionConfig {
  icon:       React.ReactNode;
  label:      string;
  accentClass: string;
  bgClass:    string;
}

const SECTION_CONFIG: Record<SectionType, SectionConfig> = {
  "beginner": {
    icon:        <BookOpen size={15} />,
    label:       "Beginner Explanation",
    accentClass: "text-brand-cyan border-brand-cyan/30 bg-brand-cyan/8",
    bgClass:     "border-l-2 border-brand-cyan/40",
  },
  "deep-dive": {
    icon:        <Cpu size={15} />,
    label:       "Deep Technical Explanation",
    accentClass: "text-brand-accent-light border-brand-accent/30 bg-brand-accent/8",
    bgClass:     "border-l-2 border-brand-accent/40",
  },
  "code": {
    icon:        <Code2 size={15} />,
    label:       "Code Examples",
    accentClass: "text-emerald-400 border-emerald-500/30 bg-emerald-500/8",
    bgClass:     "border-l-2 border-emerald-500/40",
  },
  "real-world": {
    icon:        <Lightbulb size={15} />,
    label:       "Real-World Example",
    accentClass: "text-amber-400 border-amber-500/30 bg-amber-500/8",
    bgClass:     "border-l-2 border-amber-500/40",
  },
  "mistakes": {
    icon:        <AlertTriangle size={15} />,
    label:       "Common Mistakes",
    accentClass: "text-red-400 border-red-500/30 bg-red-500/8",
    bgClass:     "border-l-2 border-red-500/40",
  },
  "summary": {
    icon:        <CheckCircle2 size={15} />,
    label:       "Summary",
    accentClass: "text-emerald-400 border-emerald-500/30 bg-emerald-500/8",
    bgClass:     "border-l-2 border-emerald-500/40",
  },
};

interface LessonSectionProps {
  type:      SectionType;
  children:  React.ReactNode;
  className?: string;
}

export function LessonSection({ type, children, className }: LessonSectionProps) {
  const cfg = SECTION_CONFIG[type];

  return (
    <section className={cn("space-y-4", className)}>
      {/* Section header */}
      <div className="flex items-center gap-2.5">
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border",
          cfg.accentClass
        )}>
          {cfg.icon}
          {cfg.label}
        </div>
      </div>

      {/* Content */}
      <div className={cn(
        "pl-4 prose-lesson",
        cfg.bgClass
      )}>
        {children}
      </div>
    </section>
  );
}

/* ─── Prose text block ───────────────────────────────────────────────────── */
export function LessonProse({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-text-secondary leading-relaxed text-[15px] space-y-3 text-pretty">
      {children}
    </div>
  );
}

/* ─── Mistake item ───────────────────────────────────────────────────────── */
export function MistakeItem({
  mistake, why, fix,
}: {
  mistake: string; why: string; fix: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-surface-elevated border border-surface-border space-y-2">
      <div className="flex items-start gap-2">
        <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
        <p className="text-sm font-semibold text-text-primary">{mistake}</p>
      </div>
      <p className="text-xs text-text-muted leading-relaxed pl-5">
        <span className="text-text-secondary font-medium">Why: </span>{why}
      </p>
      <p className="text-xs text-emerald-400 leading-relaxed pl-5">
        <span className="font-medium">Fix: </span>{fix}
      </p>
    </div>
  );
}

/* ─── Summary bullet list ────────────────────────────────────────────────── */
export function SummaryList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-[14px] text-text-secondary">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
