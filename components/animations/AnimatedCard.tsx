"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children:    React.ReactNode;
  className?:  string;
  glowColor?:  string;
  tilt?:       boolean;   // 3D tilt on mousemove
  lift?:       boolean;   // Lift on hover
  onClick?:    () => void;
}

export function AnimatedCard({
  children,
  className,
  glowColor,
  tilt    = false,
  lift    = true,
  onClick,
}: AnimatedCardProps) {
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduced) {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("relative", className)}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : {}}
      whileHover={lift ? { y: -4, transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] } } : {}}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Glow effect */}
      {glowColor && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${glowColor}25, transparent)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
}

/* ─── Simple hover scale button wrapper ─────────────────────────────────── */
export function AnimatedButton({
  children,
  className,
  onClick,
  disabled,
}: {
  children:  React.ReactNode;
  className?: string;
  onClick?:   () => void;
  disabled?:  boolean;
}) {
  const reduced = useReducedMotion();

  if (reduced || disabled) {
    return (
      <div className={className} onClick={!disabled ? onClick : undefined}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
