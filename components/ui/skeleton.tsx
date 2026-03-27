import * as React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?:    string | number;
  height?:   string | number;
  rounded?:  "sm" | "md" | "lg" | "full";
}

const roundedMap = {
  sm:   "rounded",
  md:   "rounded-lg",
  lg:   "rounded-xl",
  full: "rounded-full",
};

export function Skeleton({
  className,
  width,
  height,
  rounded = "md",
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn("shimmer", roundedMap[rounded], className)}
      style={{ width, height, ...style }}
      aria-hidden="true"
      {...props}
    />
  );
}

/** Preset skeletons for common UI patterns */
export function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton width={40} height={40} rounded="lg" />
        <div className="flex-1 space-y-2">
          <Skeleton height={16} width="60%" />
          <Skeleton height={12} width="40%" />
        </div>
      </div>
      <Skeleton height={12} />
      <Skeleton height={12} width="80%" />
      <div className="flex gap-2 pt-2">
        <Skeleton height={24} width={60} rounded="full" />
        <Skeleton height={24} width={72} rounded="full" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          height={14}
          width={i === lines - 1 ? "65%" : "100%"}
        />
      ))}
    </div>
  );
}
