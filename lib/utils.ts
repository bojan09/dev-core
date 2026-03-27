import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Capitalise first letter */
export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/** Slugify a string */
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
}

/** Format duration in minutes */
export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/** Clamp a number between min and max */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Get track color by slug */
export const trackColors: Record<string, string> = {
  python:    "#3B82F6",
  sysadmin:  "#10B981",
  rust:      "#F97316",
  lua:       "#8B5CF6",
  go:        "#06B6D4",
};

/** Get track display name */
export const trackNames: Record<string, string> = {
  python:   "Python",
  sysadmin: "Python for SysAdmins",
  rust:     "Rust",
  lua:      "Lua",
  go:       "Golang",
};
