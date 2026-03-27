import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-medium border transition-colors",
  {
    variants: {
      variant: {
        default:  "bg-surface-overlay text-text-secondary border-surface-border",
        accent:   "bg-brand-accent/15 text-brand-accent-light border-brand-accent/25",
        cyan:     "bg-brand-cyan/10 text-brand-cyan-light border-brand-cyan/20",
        success:  "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        warning:  "bg-amber-500/10 text-amber-400 border-amber-500/20",
        danger:   "bg-red-500/10 text-red-400 border-red-500/20",
        python:   "bg-blue-500/10 text-blue-400 border-blue-500/20",
        sysadmin: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        rust:     "bg-orange-500/10 text-orange-400 border-orange-500/20",
        lua:      "bg-purple-500/10 text-purple-400 border-purple-500/20",
        go:       "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      },
      size: {
        sm: "px-2 py-0.5 text-[10px] tracking-wider uppercase",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1.5 text-sm",
      },
      dot: {
        true:  "",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size:    "md",
      dot:     false,
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant, size, dot, className }))}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: "currentColor" }}
        />
      )}
      {children}
    </span>
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
