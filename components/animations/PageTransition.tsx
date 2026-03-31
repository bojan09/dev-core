"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { pageTransition } from "./variants";

interface PageTransitionProps {
  children:   React.ReactNode;
  className?: string;
  /** Key changes trigger re-animation (use pathname) */
  motionKey?: string;
}

export function PageTransition({ children, className, motionKey }: PageTransitionProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={motionKey}
        className={className}
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Section reveal with motion ─────────────────────────────────────────── */
export function MotionSection({
  children,
  className,
  delay = 0,
}: {
  children:   React.ReactNode;
  className?: string;
  delay?:     number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <section className={className}>{children}</section>;

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, ease: [0, 0, 0.2, 1], delay }}
    >
      {children}
    </motion.section>
  );
}
