"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { fadeUp, fadeLeft, fadeRight, fadeIn, scaleIn, staggerItem } from "./variants";

type RevealDirection = "up" | "left" | "right" | "fade" | "scale" | "stagger-item";

const VARIANT_MAP: Record<RevealDirection, Variants> = {
  up:           fadeUp,
  left:         fadeLeft,
  right:        fadeRight,
  fade:         fadeIn,
  scale:        scaleIn,
  "stagger-item": staggerItem,
};

interface ScrollRevealProps {
  children:    React.ReactNode;
  direction?:  RevealDirection;
  delay?:      number;
  duration?:   number;
  className?:  string;
  threshold?:  number;
  once?:       boolean;
  as?:         keyof JSX.IntrinsicElements;
}

export function ScrollReveal({
  children,
  direction  = "up",
  delay      = 0,
  duration,
  className,
  threshold  = 0.1,
  once       = true,
  as         = "div",
}: ScrollRevealProps) {
  const reduced  = useReducedMotion();
  const variants = VARIANT_MAP[direction];

  // If reduced motion, render without animation
  if (reduced) {
    const Tag = as as keyof JSX.IntrinsicElements;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as as "div"] ?? motion.div;

  const customVariants: Variants = duration
    ? {
        hidden:  variants.hidden,
        visible: {
          ...(variants.visible as object),
          transition: { ...(variants.visible as { transition?: object }).transition, duration, delay },
        },
      }
    : delay
    ? {
        hidden:  variants.hidden,
        visible: {
          ...(variants.visible as object),
          transition: { ...(variants.visible as { transition?: object }).transition, delay },
        },
      }
    : variants;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={customVariants}
    >
      {children}
    </MotionTag>
  );
}

/* ─── Stagger container wrapper ──────────────────────────────────────────── */
interface StaggerGroupProps {
  children:       React.ReactNode;
  className?:     string;
  staggerDelay?:  number;
  initialDelay?:  number;
  threshold?:     number;
  once?:          boolean;
}

export function StaggerGroup({
  children,
  className,
  staggerDelay  = 0.08,
  initialDelay  = 0,
  threshold     = 0.1,
  once          = true,
}: StaggerGroupProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={{
        hidden:  {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren:   initialDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
