import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Input ──────────────────────────────────────────────────────────────── */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?:  React.ReactNode;
  rightIcon?: React.ReactNode;
  error?:     string;
  label?:     string;
  hint?:      string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, error, label, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-xl border bg-surface-overlay",
              "text-sm text-text-primary placeholder:text-text-muted",
              "px-4 py-2.5 h-10",
              "border-surface-border",
              "focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50",
              "transition-colors duration-150",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              leftIcon  && "pl-9",
              rightIcon && "pr-9",
              error && "border-red-500/50 focus:ring-red-500/30",
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>

        {(error || hint) && (
          <p className={cn(
            "text-xs",
            error ? "text-red-400" : "text-text-muted"
          )}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

/* ─── Textarea ───────────────────────────────────────────────────────────── */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?:  string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-secondary"
          >
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-xl border bg-surface-overlay",
            "text-sm text-text-primary placeholder:text-text-muted",
            "px-4 py-3 min-h-[100px] resize-y",
            "border-surface-border",
            "focus:outline-none focus:ring-2 focus:ring-brand-accent/50 focus:border-brand-accent/50",
            "transition-colors duration-150",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500/50 focus:ring-red-500/30",
            className
          )}
          {...props}
        />

        {(error || hint) && (
          <p className={cn("text-xs", error ? "text-red-400" : "text-text-muted")}>
            {error ?? hint}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
