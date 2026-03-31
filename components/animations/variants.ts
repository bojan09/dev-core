import type { Variants } from "framer-motion";

/* ─── Timing presets ─────────────────────────────────────────────────────── */
export const EASING = {
  smooth:    [0.4, 0, 0.2, 1] as const,
  spring:    [0.34, 1.56, 0.64, 1] as const,
  decelerate:[0, 0, 0.2, 1] as const,
  accelerate:[0.4, 0, 1, 1] as const,
};

export const DURATION = {
  fast:   0.15,
  normal: 0.25,
  slow:   0.4,
  slower: 0.6,
};

/* ─── Fade variants ──────────────────────────────────────────────────────── */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.normal, ease: EASING.smooth } },
};

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: DURATION.slow, ease: EASING.decelerate },
  },
};

export const fadeDown: Variants = {
  hidden:  { opacity: 0, y: -16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: DURATION.normal, ease: EASING.decelerate },
  },
};

export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -20 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: DURATION.slow, ease: EASING.decelerate },
  },
};

export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 20 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: DURATION.slow, ease: EASING.decelerate },
  },
};

/* ─── Scale variants ─────────────────────────────────────────────────────── */
export const scaleIn: Variants = {
  hidden:  { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: DURATION.normal, ease: EASING.spring },
  },
};

export const popIn: Variants = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1, scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

/* ─── Stagger container ──────────────────────────────────────────────────── */
export function staggerContainer(staggerChildren = 0.07, delayChildren = 0): Variants {
  return {
    hidden:  {},
    visible: {
      transition: { staggerChildren, delayChildren },
    },
  };
}

export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: DURATION.slow, ease: EASING.decelerate },
  },
};

/* ─── Slide variants ─────────────────────────────────────────────────────── */
export const slideInFromBottom: Variants = {
  hidden:  { opacity: 0, y: "100%" },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: DURATION.slow, ease: EASING.decelerate },
  },
  exit: {
    opacity: 0, y: "100%",
    transition: { duration: DURATION.normal, ease: EASING.accelerate },
  },
};

export const slideInFromLeft: Variants = {
  hidden:  { opacity: 0, x: "-100%" },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: DURATION.slow, ease: EASING.decelerate },
  },
  exit: {
    opacity: 0, x: "-100%",
    transition: { duration: DURATION.normal, ease: EASING.accelerate },
  },
};

/* ─── Page transition ────────────────────────────────────────────────────── */
export const pageTransition: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: DURATION.slow, ease: EASING.decelerate },
  },
  exit: {
    opacity: 0, y: -8,
    transition: { duration: DURATION.fast, ease: EASING.accelerate },
  },
};

/* ─── Card hover ─────────────────────────────────────────────────────────── */
export const cardHover = {
  rest:  { y: 0,  scale: 1, transition: { duration: DURATION.normal, ease: EASING.smooth } },
  hover: { y: -4, scale: 1.01, transition: { duration: DURATION.normal, ease: EASING.spring } },
};

/* ─── Progress fill ──────────────────────────────────────────────────────── */
export function progressFill(percentage: number): Variants {
  return {
    hidden:  { scaleX: 0, originX: 0 },
    visible: {
      scaleX: percentage / 100,
      originX: 0,
      transition: { duration: DURATION.slower * 1.2, ease: EASING.decelerate, delay: 0.2 },
    },
  };
}

/* ─── Number counter ─────────────────────────────────────────────────────── */
export const counterVariant: Variants = {
  hidden:  { opacity: 0, scale: 0.7 },
  visible: {
    opacity: 1, scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

/* ─── Pulse glow ─────────────────────────────────────────────────────────── */
export const pulseGlow = {
  initial: { opacity: 0.4 },
  animate: {
    opacity: [0.4, 0.8, 0.4],
    transition: { duration: 2.5, ease: "easeInOut", repeat: Infinity },
  },
};

/* ─── Typing cursor ──────────────────────────────────────────────────────── */
export const typingCursor = {
  animate: {
    opacity: [1, 0, 1],
    transition: { duration: 0.8, repeat: Infinity, ease: "steps(1)" },
  },
};

/* ─── Shimmer wave ───────────────────────────────────────────────────────── */
export const shimmerVariant = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
  },
};
