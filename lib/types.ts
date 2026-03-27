/** ─── User / Auth ──────────────────────────────────────────────────────── */
export interface User {
  id:          string;
  email:       string;
  displayName: string | null;
  avatarUrl:   string | null;
  createdAt:   string;
}

/** ─── Course Progress ───────────────────────────────────────────────────── */
export interface LessonProgress {
  userId:    string;
  trackSlug: string;
  lessonId:  string;
  completed: boolean;
  updatedAt: string;
}

export interface TrackProgress {
  trackSlug:    string;
  completed:    number;
  total:        number;
  percentage:   number;
  lastLesson?:  string;
  lastStudied?: string;
}

/** ─── Lesson Content ────────────────────────────────────────────────────── */
export interface CodeExample {
  language:    string;
  filename?:   string;
  code:        string;
  highlight?:  number[];   // Line numbers to highlight
}

export interface LessonSection {
  id:      string;
  title:   string;
  content: string;       // Markdown / Rich text
  type:    "intro" | "beginner" | "deep-dive" | "infographic" |
           "code" | "real-world" | "mistakes" | "summary";
  code?:   CodeExample[];
}

export interface Lesson {
  id:          string;
  trackSlug:   string;
  slug:        string;
  title:       string;
  description: string;
  level:       "beginner" | "intermediate" | "advanced";
  order:       number;
  duration:    number;   // Minutes
  sections:    LessonSection[];
  tags:        string[];
  prerequisites?: string[];
}

/** ─── Bookmarks ─────────────────────────────────────────────────────────── */
export interface Bookmark {
  id:        string;
  userId:    string;
  trackSlug: string;
  lessonId:  string;
  createdAt: string;
}

/** ─── UI State ───────────────────────────────────────────────────────────── */
export interface SidebarState {
  isOpen:     boolean;
  isCollapsed: boolean;
}

/** ─── API Responses ─────────────────────────────────────────────────────── */
export interface ApiResponse<T> {
  data:    T | null;
  error:   string | null;
  status:  number;
}
