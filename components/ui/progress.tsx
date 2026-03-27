"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value:     number;     // 0–100
  max?:      number;
  label?:    string;
  showValue?: boolean;
  size?:     "xs" | "sm" | "md" | "lg";
  color?:    string;     // Hex color for custom track
  animated?: boolean;
}

const sizeMap = {
  xs: "h-1",
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      label,
      showValue = false,
      size = "sm",
      color,
      animated = true,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
      <div ref={ref} className={cn("w-full space-y-1.5", className)} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="text-xs text-text-secondary">{label}</span>
            )}
            {showValue && (
              <span className="text-xs font-medium text-text-primary tabular-nums">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        {/* Track */}
        <div
          className={cn(
            "w-full rounded-full overflow-hidden bg-surface-overlay",
            sizeMap[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          {/* Fill */}
          <div
            className={cn(
              "h-full rounded-full",
              animated && "transition-all duration-700 ease-out"
            )}
            style={{
              width: `${percentage}%`,
              background: color
                ? `linear-gradient(90deg, ${color}, ${color}cc)`
                : "linear-gradient(90deg, #7B61FF, #00C2FF)",
            }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";
