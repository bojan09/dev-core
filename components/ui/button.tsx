"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

/* ─── Variants ───────────────────────────────────────────────────────────── */
const buttonVariants = cva(
  // Base
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-medium text-sm tracking-wide",
    "rounded-xl border transition-all duration-200 ease-out",
    "select-none cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
    "disabled:pointer-events-none disabled:opacity-40",
    "active:scale-[0.97]",
  ],
  {
    variants: {
      variant: {
        /** Primary CTA — accent purple fill */
        primary: [
          "bg-brand-accent text-white border-brand-accent",
          "hover:bg-brand-accent-light hover:border-brand-accent-light",
          "hover:shadow-glow-accent",
          "after:absolute after:inset-0 after:rounded-xl after:opacity-0",
          "after:bg-gradient-to-b after:from-white/10 after:to-transparent",
          "hover:after:opacity-100 after:transition-opacity after:duration-200",
        ],

        /** Secondary — surface elevated with border */
        secondary: [
          "bg-surface-elevated text-text-primary border-surface-border",
          "hover:bg-surface-overlay hover:border-surface-border-light",
          "hover:text-white",
        ],

        /** Ghost — no background */
        ghost: [
          "bg-transparent text-text-secondary border-transparent",
          "hover:bg-surface-elevated hover:text-text-primary hover:border-surface-border",
        ],

        /** Outline — accent outline */
        outline: [
          "bg-transparent text-brand-accent border-brand-accent/40",
          "hover:bg-brand-accent/10 hover:border-brand-accent",
        ],

        /** Cyan accent */
        cyan: [
          "bg-brand-cyan text-brand-primary border-brand-cyan font-semibold",
          "hover:bg-brand-cyan-light hover:border-brand-cyan-light",
          "hover:shadow-glow-cyan",
        ],

        /** Danger */
        danger: [
          "bg-red-500/10 text-red-400 border-red-500/30",
          "hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300",
        ],

        /** Glass — frosted glass */
        glass: [
          "glass-card text-text-primary border-white/10",
          "hover:border-white/20 hover:bg-white/10",
        ],

        /** Track-specific — inherits --track-color CSS var from parent */
        track: [
          "text-white border-[color:var(--track-color,#7B61FF)]",
          "bg-[color:var(--track-color,#7B61FF)]/20",
          "hover:bg-[color:var(--track-color,#7B61FF)]/30",
          "hover:border-[color:var(--track-color,#7B61FF)]",
        ],
      },

      size: {
        xs:  "h-7  px-2.5 text-xs gap-1.5",
        sm:  "h-8  px-3   text-xs",
        md:  "h-10 px-4   text-sm",
        lg:  "h-11 px-5   text-sm",
        xl:  "h-12 px-6   text-base",
        icon: "h-9 w-9 p-0",
        "icon-sm": "h-7 w-7 p-0",
        "icon-lg": "h-11 w-11 p-0",
      },

      fullWidth: {
        true:  "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant:   "primary",
      size:      "md",
      fullWidth: false,
    },
  }
);

/* ─── Props ──────────────────────────────────────────────────────────────── */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?:   boolean;
  loading?:   boolean;
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        {...props}
      >
        {/* Loading spinner */}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin shrink-0" />
        ) : (
          leftIcon && (
            <span className="shrink-0 inline-flex">{leftIcon}</span>
          )
        )}

        {children && (
          <span className={cn(loading && "opacity-70")}>{children}</span>
        )}

        {!loading && rightIcon && (
          <span className="shrink-0 inline-flex">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
