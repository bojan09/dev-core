"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface AnimatedCounterProps {
  value:      number;
  duration?:  number;   // ms
  suffix?:    string;
  prefix?:    string;
  decimals?:  number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration  = 1200,
  suffix    = "",
  prefix    = "",
  decimals  = 0,
  className,
}: AnimatedCounterProps) {
  const reduced         = useReducedMotion();
  const [ref, inView]   = useInView<HTMLSpanElement>({ once: true });
  const [current, setCurrent] = useState(reduced ? value : 0);
  const frameRef        = useRef<number>();
  const startTimeRef    = useRef<number>();

  useEffect(() => {
    if (!inView || reduced) {
      setCurrent(value);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed  = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCurrent(eased * value);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [inView, value, duration, reduced]);

  const display = current.toFixed(decimals);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

/* ─── Animated progress bar ──────────────────────────────────────────────── */
interface AnimatedProgressProps {
  value:      number;   // 0–100
  color?:     string;
  duration?:  number;
  delay?:     number;
  className?: string;
}

export function AnimatedProgress({
  value,
  color     = "linear-gradient(90deg, #7B61FF, #00C2FF)",
  duration  = 800,
  delay     = 200,
  className,
}: AnimatedProgressProps) {
  const reduced       = useReducedMotion();
  const [ref, inView] = useInView<HTMLDivElement>({ once: true });
  const [width, setWidth] = useState(reduced ? value : 0);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setWidth(value), delay);
    return () => clearTimeout(timer);
  }, [inView, value, delay]);

  return (
    <div
      ref={ref}
      className={`h-1.5 rounded-full overflow-hidden bg-surface-overlay ${className ?? ""}`}
    >
      <div
        className="h-full rounded-full"
        style={{
          width:      `${width}%`,
          background: typeof color === "string" && color.startsWith("#") || color.startsWith("rgb")
            ? `linear-gradient(90deg, ${color}, ${color}aa)`
            : color,
          transition: reduced
            ? "none"
            : `width ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      />
    </div>
  );
}
