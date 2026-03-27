"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const TooltipRoot = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 max-w-xs rounded-lg px-3 py-1.5",
      "text-xs text-text-primary font-medium leading-snug",
      "bg-surface-overlay border border-surface-border",
      "shadow-card",
      "animate-fade-in",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

/** Convenience wrapper */
interface TooltipProps {
  children:  React.ReactNode;
  content:   React.ReactNode;
  side?:     "top" | "bottom" | "left" | "right";
  delayMs?:  number;
}

export function Tooltip({
  children,
  content,
  side = "top",
  delayMs = 300,
}: TooltipProps) {
  return (
    <TooltipProvider delayDuration={delayMs}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </TooltipRoot>
    </TooltipProvider>
  );
}

export { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent };
