import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?:     string;
  alt?:     string;
  name?:    string;   // Fallback initials source
  size?:    "xs" | "sm" | "md" | "lg" | "xl";
  ring?:    boolean;
}

const sizeMap = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Deterministic color from name */
function getAvatarColor(name: string): string {
  const colors = [
    "#7B61FF", "#00C2FF", "#10B981",
    "#F97316", "#8B5CF6", "#06B6D4",
    "#3B82F6", "#EC4899",
  ];
  const idx = name
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  return colors[idx];
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = "md", ring = false, ...props }, ref) => {
    const color = name ? getAvatarColor(name) : "#7B61FF";

    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full shrink-0 overflow-hidden",
          sizeMap[size],
          ring && "ring-2 ring-brand-accent ring-offset-2 ring-offset-surface",
          className
        )}
        {...props}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt ?? name ?? "Avatar"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="h-full w-full flex items-center justify-center font-semibold text-white"
            style={{ backgroundColor: color }}
          >
            {name ? getInitials(name) : "?"}
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";
