"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Card Variants ──────────────────────────────────────────────────────── */
const cardVariants = cva(
  [
    "relative rounded-2xl border transition-all duration-300",
    "overflow-hidden",
  ],
  {
    variants: {
      variant: {
        /** Default glass card */
        default: [
          "glass-card",
          "border-white/[0.06]",
        ],

        /** Elevated — slightly more visible surface */
        elevated: [
          "bg-surface-elevated border-surface-border",
          "shadow-card",
        ],

        /** Outlined — minimal, just a border */
        outlined: [
          "bg-transparent border-surface-border",
          "hover:border-surface-border-light",
        ],

        /** Filled — solid surface color */
        filled: [
          "bg-surface-overlay border-surface-border",
        ],

        /** Track — colored accent based on CSS var */
        track: [
          "bg-surface-elevated border-[color:var(--track-color,#7B61FF)]/20",
          "hover:border-[color:var(--track-color,#7B61FF)]/50",
          "shadow-card",
        ],

        /** Feature card — accent glow on hover */
        feature: [
          "glass-card border-white/[0.06]",
          "hover:border-brand-accent/30",
          "hover:shadow-glow-accent",
        ],
      },

      padding: {
        none: "",
        sm:   "p-4",
        md:   "p-5",
        lg:   "p-6",
        xl:   "p-8",
      },

      interactive: {
        true:  "cursor-pointer hover:scale-[1.01] active:scale-[0.99]",
        false: "",
      },
    },
    defaultVariants: {
      variant:     "default",
      padding:     "lg",
      interactive: false,
    },
  }
);

/* ─── Card Root ──────────────────────────────────────────────────────────── */
export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /** Decorative gradient glow at the top */
  glowColor?: string;
  /** Decorative track color stripe at top */
  trackAccent?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      padding,
      interactive,
      glowColor,
      trackAccent,
      children,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, interactive, className }))}
        style={style}
        {...props}
      >
        {/* Track accent stripe */}
        {trackAccent && (
          <div
            className="absolute inset-x-0 top-0 h-[2px] opacity-80"
            style={{
              background:
                "linear-gradient(90deg, var(--track-color, #7B61FF), transparent)",
            }}
          />
        )}

        {/* Ambient glow overlay */}
        {glowColor && (
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${glowColor}, transparent)`,
            }}
          />
        )}

        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

/* ─── CardHeader ─────────────────────────────────────────────────────────── */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/* ─── CardTitle ──────────────────────────────────────────────────────────── */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement> & { as?: "h1"|"h2"|"h3"|"h4" }
>(({ className, as: Comp = "h3", ...props }, ref) => (
  <Comp
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-tight text-text-primary tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/* ─── CardDescription ────────────────────────────────────────────────────── */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-text-secondary leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* ─── CardContent ────────────────────────────────────────────────────────── */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

/* ─── CardFooter ─────────────────────────────────────────────────────────── */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mt-5 pt-4 border-t border-surface-border flex items-center gap-3",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

/* ─── CardBadge ──────────────────────────────────────────────────────────── */
interface CardBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: string;
}
const CardBadge = React.forwardRef<HTMLSpanElement, CardBadgeProps>(
  ({ className, color, style, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        "tag text-[10px] font-semibold uppercase tracking-widest",
        className
      )}
      style={{
        backgroundColor: color ? `${color}18` : "rgba(123,97,255,0.12)",
        color:           color ?? "#A895FF",
        border:          `1px solid ${color ? `${color}30` : "rgba(123,97,255,0.2)"}`,
        ...style,
      }}
      {...props}
    />
  )
);
CardBadge.displayName = "CardBadge";

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardBadge,
  cardVariants,
};
