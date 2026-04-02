import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─── Container Variants ─────────────────────────────────────────────────── */
const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      xs: "max-w-screen-sm", // 640px
      sm: "max-w-screen-md", // 768px
      md: "max-w-screen-lg", // 1024px
      lg: "max-w-screen-xl", // 1280px
      xl: "max-w-screen-2xl", // 1536px
      full: "max-w-none",
    },
    padding: {
      none: "",
      sm: "px-4",
      md: "px-4 sm:px-6",
      lg: "px-4 sm:px-6 lg:px-8",
      xl: "px-4 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: {
    size: "lg",
    padding: "lg",
  },
});

export interface ContainerProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(containerVariants({ size, padding, className }))}
      {...props}
    />
  ),
);
Container.displayName = "Container";

/* ─── Section ────────────────────────────────────────────────────────────── */
const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "py-8",
      md: "py-12",
      lg: "py-16 md:py-20",
      xl: "py-20 md:py-28",
    },
  },
  defaultVariants: {
    spacing: "lg",
  },
});

export interface SectionProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: "section" | "div" | "main" | "article";
}

// Fixed: Use a more flexible approach for the ref
const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, as: Comp = "section", ...props }, ref) => {
    // Create a type-safe ref that works with any HTML element
    const elementRef = ref as React.Ref<HTMLElement>;
    return (
      <Comp
        ref={elementRef}
        className={cn(sectionVariants({ spacing, className }))}
        {...props}
      />
    );
  },
);
Section.displayName = "Section";

/* ─── Stack ──────────────────────────────────────────────────────────────── */
const stackVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse",
    },
    gap: {
      0: "gap-0",
      1: "gap-1",
      2: "gap-2",
      3: "gap-3",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
      10: "gap-10",
      12: "gap-12",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    direction: "col",
    gap: 4,
    align: "start",
    justify: "start",
    wrap: false,
  },
});

export interface StackProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stackVariants> {}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ className, direction, gap, align, justify, wrap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        stackVariants({ direction, gap, align, justify, wrap, className }),
      )}
      {...props}
    />
  ),
);
Stack.displayName = "Stack";

/* ─── Grid ───────────────────────────────────────────────────────────────── */
const gridVariants = cva("grid", {
  variants: {
    cols: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
      auto: "grid-cols-[repeat(auto-fill,minmax(280px,1fr))]",
    },
    gap: {
      0: "gap-0",
      2: "gap-2",
      4: "gap-4",
      5: "gap-5",
      6: "gap-6",
      8: "gap-8",
    },
  },
  defaultVariants: {
    cols: 3,
    gap: 6,
  },
});

export interface GridProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(gridVariants({ cols, gap, className }))}
      {...props}
    />
  ),
);
Grid.displayName = "Grid";

/* ─── Divider ────────────────────────────────────────────────────────────── */
const Divider = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement> & {
    orientation?: "horizontal" | "vertical";
  }
>(({ className, orientation = "horizontal", ...props }, ref) => (
  <hr
    ref={ref}
    className={cn(
      "border-surface-border",
      orientation === "horizontal" ? "w-full border-t" : "h-full border-l",
      className,
    )}
    {...props}
  />
));
Divider.displayName = "Divider";

/* ─── Spacer ─────────────────────────────────────────────────────────────── */
const Spacer = ({ size = 4 }: { size?: number }) => (
  <div style={{ height: `${size * 0.25}rem`, width: "100%" }} />
);

export {
  Container,
  Section,
  Stack,
  Grid,
  Divider,
  Spacer,
  containerVariants,
  sectionVariants,
  stackVariants,
  gridVariants,
};
