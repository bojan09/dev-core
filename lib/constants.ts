/** ─── Track Definitions ─────────────────────────────────────────────────── */
export type TrackSlug = "python" | "sysadmin" | "rust" | "lua" | "go";

export interface TrackDefinition {
  slug:        TrackSlug;
  title:       string;
  subtitle:    string;
  description: string;
  icon:        string;         // Emoji fallback; replaced by SVG icon in components
  color:       string;         // Hex accent
  level:       "beginner" | "intermediate" | "advanced" | "all";
  totalLessons: number;
  estimatedHours: number;
  tags:        string[];
}

export const TRACKS: TrackDefinition[] = [
  {
    slug:           "python",
    title:          "Python",
    subtitle:       "Beginner → Advanced",
    description:    "Master Python from the ground up — variables, OOP, file handling, APIs, automation, and real-world projects.",
    icon:           "🐍",
    color:          "#3B82F6",
    level:          "all",
    totalLessons:   42,
    estimatedHours: 30,
    tags:           ["beginner-friendly", "versatile", "automation", "data"],
  },
  {
    slug:           "sysadmin",
    title:          "Python for SysAdmins",
    subtitle:       "Specialized Track",
    description:    "Linux automation, log parsing, file system scripting, server monitoring, and network automation using Python.",
    icon:           "⚙️",
    color:          "#10B981",
    level:          "intermediate",
    totalLessons:   28,
    estimatedHours: 20,
    tags:           ["linux", "automation", "devops", "servers"],
  },
  {
    slug:           "rust",
    title:          "Rust",
    subtitle:       "Beginner → Advanced",
    description:    "Deep-dive into ownership, borrowing, memory safety, CLI tools, and high-performance system programming.",
    icon:           "🦀",
    color:          "#F97316",
    level:          "all",
    totalLessons:   38,
    estimatedHours: 35,
    tags:           ["systems", "memory-safe", "performance", "cli"],
  },
  {
    slug:           "lua",
    title:          "Lua",
    subtitle:       "Beginner → Advanced",
    description:    "Learn Lua scripting, game development integration, tables, functions, and embedding Lua in real applications.",
    icon:           "🌙",
    color:          "#8B5CF6",
    level:          "all",
    totalLessons:   24,
    estimatedHours: 18,
    tags:           ["scripting", "game-dev", "embedded", "lightweight"],
  },
  {
    slug:           "go",
    title:          "Golang",
    subtitle:       "Beginner → Advanced",
    description:    "Build production-ready services with Go — concurrency, goroutines, APIs, CLI tools, and backend systems.",
    icon:           "🐹",
    color:          "#06B6D4",
    level:          "all",
    totalLessons:   36,
    estimatedHours: 28,
    tags:           ["backend", "concurrency", "apis", "cloud"],
  },
];

/** ─── Navigation ─────────────────────────────────────────────────────────── */
export interface NavItem {
  label:    string;
  href:     string;
  icon?:    string;
  badge?:   string;
  children?: NavItem[];
}

export const MAIN_NAV: NavItem[] = [
  { label: "Dashboard",   href: "/dashboard",       icon: "LayoutDashboard" },
  { label: "Tracks",      href: "/tracks",           icon: "BookOpen" },
  { label: "Bookmarks",   href: "/bookmarks",        icon: "Bookmark" },
  { label: "Progress",    href: "/progress",         icon: "TrendingUp" },
  { label: "Settings",    href: "/settings",         icon: "Settings" },
];

/** ─── Site Config ────────────────────────────────────────────────────────── */
export const SITE_CONFIG = {
  name:        "CodeDev",
  tagline:     "Learn Programming the Right Way",
  description: "Infographic-driven programming education for serious developers.",
  url:         "https://codedev.io",
  version:     "1.0.0",
} as const;

/** ─── Breakpoints (mirrors Tailwind defaults) ───────────────────────────── */
export const BREAKPOINTS = {
  sm:  640,
  md:  768,
  lg:  1024,
  xl:  1280,
  "2xl": 1536,
} as const;
