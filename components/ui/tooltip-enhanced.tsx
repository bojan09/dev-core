"use client";

import React, {
  useState, useRef, useEffect, useCallback, useId,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─── Types ──────────────────────────────────────────────────────────────── */
type TooltipSide    = "top" | "bottom" | "left" | "right";
type TooltipVariant = "default" | "info" | "success" | "warning" | "error";

interface TooltipProps {
  children:      React.ReactElement;
  content:       React.ReactNode;
  side?:         TooltipSide;
  delayMs?:      number;
  variant?:      TooltipVariant;
  maxWidth?:     number;
  disabled?:     boolean;
  shortcut?:     string;       // e.g. "⌘K" — shown right-aligned
  className?:    string;
}

const VARIANT_STYLES: Record<TooltipVariant, string> = {
  default: "bg-[#1C2333] border-white/[0.10] text-[#F0F6FF]",
  info:    "bg-[#0C1A2E] border-[#3B82F6]/30 text-[#93C5FD]",
  success: "bg-[#0A1F1A] border-[#10B981]/30 text-[#6EE7B7]",
  warning: "bg-[#1F1700] border-[#F59E0B]/30 text-[#FCD34D]",
  error:   "bg-[#1F0A0A] border-[#EF4444]/30 text-[#FCA5A5]",
};

const SIDE_ORIGIN: Record<TooltipSide, string> = {
  top:    "bottom center",
  bottom: "top center",
  left:   "right center",
  right:  "left center",
};

const SIDE_ANIMATION: Record<TooltipSide, { initial: object; animate: object }> = {
  top:    { initial: { opacity: 0, y: 4, scale: 0.95 },  animate: { opacity: 1, y: 0,  scale: 1 } },
  bottom: { initial: { opacity: 0, y: -4, scale: 0.95 }, animate: { opacity: 1, y: 0,  scale: 1 } },
  left:   { initial: { opacity: 0, x: 4, scale: 0.95 },  animate: { opacity: 1, x: 0,  scale: 1 } },
  right:  { initial: { opacity: 0, x: -4, scale: 0.95 }, animate: { opacity: 1, x: 0,  scale: 1 } },
};

/* ─── Tooltip ────────────────────────────────────────────────────────────── */
export function Tooltip({
  children,
  content,
  side     = "top",
  delayMs  = 400,
  variant  = "default",
  maxWidth = 220,
  disabled = false,
  shortcut,
  className,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id                    = useId();
  const showTimer             = useRef<ReturnType<typeof setTimeout>>();
  const hideTimer             = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(() => {
    clearTimeout(hideTimer.current);
    showTimer.current = setTimeout(() => setVisible(true), delayMs);
  }, [delayMs]);

  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    hideTimer.current = setTimeout(() => setVisible(false), 100);
  }, []);

  useEffect(() => () => {
    clearTimeout(showTimer.current);
    clearTimeout(hideTimer.current);
  }, []);

  if (disabled || !content) return children;

  const anim = SIDE_ANIMATION[side];

  // Compute tooltip offset based on side
  const posStyle: React.CSSProperties = {
    position:  "absolute",
    zIndex:    9999,
    maxWidth,
    whiteSpace: maxWidth ? "normal" : "nowrap",
  };

  const GAP = 8;
  if (side === "top")    { posStyle.bottom = "100%"; posStyle.left = "50%"; posStyle.transform = `translateX(-50%) translateY(-${GAP}px)`; }
  if (side === "bottom") { posStyle.top    = "100%"; posStyle.left = "50%"; posStyle.transform = `translateX(-50%) translateY(${GAP}px)`; }
  if (side === "left")   { posStyle.right  = "100%"; posStyle.top  = "50%"; posStyle.transform = `translateY(-50%) translateX(-${GAP}px)`; }
  if (side === "right")  { posStyle.left   = "100%"; posStyle.top  = "50%"; posStyle.transform = `translateY(-50%) translateX(${GAP}px)`; }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      aria-describedby={id}
    >
      {children}

      <AnimatePresence>
        {visible && (
          <motion.div
            id={id}
            role="tooltip"
            className={cn(
              "pointer-events-none px-3 py-1.5 rounded-xl border text-xs font-medium",
              "shadow-[0_8px_32px_rgba(0,0,0,0.5)]",
              VARIANT_STYLES[variant],
              className
            )}
            style={{ ...posStyle, transformOrigin: SIDE_ORIGIN[side] }}
            initial={anim.initial}
            animate={anim.animate}
            exit={anim.initial}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="flex items-center gap-2">
              <span>{content}</span>
              {shortcut && (
                <kbd className="font-mono text-[10px] bg-white/[0.08] px-1.5 py-0.5 rounded-md opacity-80 shrink-0">
                  {shortcut}
                </kbd>
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

/* ─── IconTooltip — wraps an icon button with a label tooltip ───────────── */
export function IconTooltip({
  icon,
  label,
  side   = "bottom",
  onClick,
  className,
}: {
  icon:       React.ReactNode;
  label:      string;
  side?:      TooltipSide;
  onClick?:   () => void;
  className?: string;
}) {
  return (
    <Tooltip content={label} side={side} delayMs={300}>
      <button
        onClick={onClick}
        aria-label={label}
        className={cn(
          "flex items-center justify-center w-9 h-9 rounded-xl",
          "border border-white/[0.08] bg-white/[0.04]",
          "text-[#8B9BB4] hover:text-[#F0F6FF] hover:bg-white/[0.08]",
          "transition-all duration-150",
          className
        )}
      >
        {icon}
      </button>
    </Tooltip>
  );
}
