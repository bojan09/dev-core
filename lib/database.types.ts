/**
 * Database types for CodeDev platform.
 *
 * In a real project these are generated via:
 *   npx supabase gen types typescript --project-id <id> > lib/database.types.ts
 *
 * Keep this in sync with the SQL schema in supabase/migrations/
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      /* ── profiles ──────────────────────────────────────────────── */
      profiles: {
        Row: {
          id:           string;          // uuid, FK → auth.users.id
          email:        string;
          display_name: string | null;
          avatar_url:   string | null;
          created_at:   string;          // timestamptz
          updated_at:   string;
        };
        Insert: {
          id:           string;
          email:        string;
          display_name?: string | null;
          avatar_url?:  string | null;
          created_at?:  string;
          updated_at?:  string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };

      /* ── lesson_progress ───────────────────────────────────────── */
      lesson_progress: {
        Row: {
          id:           string;          // uuid
          user_id:      string;          // FK → auth.users.id
          track_slug:   string;          // e.g. "python"
          lesson_slug:  string;          // e.g. "variables"
          completed:    boolean;
          started_at:   string;          // timestamptz
          completed_at: string | null;
          updated_at:   string;
        };
        Insert: {
          id?:          string;
          user_id:      string;
          track_slug:   string;
          lesson_slug:  string;
          completed?:   boolean;
          started_at?:  string;
          completed_at?: string | null;
          updated_at?:  string;
        };
        Update: Partial<Database["public"]["Tables"]["lesson_progress"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "lesson_progress_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };

      /* ── bookmarks ─────────────────────────────────────────────── */
      bookmarks: {
        Row: {
          id:          string;           // uuid
          user_id:     string;           // FK → auth.users.id
          track_slug:  string;
          lesson_slug: string;
          created_at:  string;
        };
        Insert: {
          id?:         string;
          user_id:     string;
          track_slug:  string;
          lesson_slug: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bookmarks"]["Insert"]>;
        Relationships: [
          {
            foreignKeyName: "bookmarks_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };

      /* ── track_progress (computed summary per track) ────────────── */
      track_progress: {
        Row: {
          id:                  string;
          user_id:             string;
          track_slug:          string;
          lessons_completed:   number;
          last_lesson_slug:    string | null;
          last_studied_at:     string | null;
          updated_at:          string;
        };
        Insert: {
          id?:                 string;
          user_id:             string;
          track_slug:          string;
          lessons_completed?:  number;
          last_lesson_slug?:   string | null;
          last_studied_at?:    string | null;
          updated_at?:         string;
        };
        Update: Partial<Database["public"]["Tables"]["track_progress"]["Insert"]>;
      };
    };

    Views: {
      user_stats: {
        Row: {
          user_id:           string;
          total_completed:   number;
          total_started:     number;
          streak_days:       number;
          hours_learned:     number;
          last_activity_at:  string | null;
        };
      };
    };

    Functions: {
      get_user_streak: {
        Args:    { p_user_id: string };
        Returns: number;
      };
      mark_lesson_complete: {
        Args:    { p_user_id: string; p_track_slug: string; p_lesson_slug: string };
        Returns: void;
      };
    };

    Enums: Record<string, never>;
  };
}

/* ── Convenience row types ──────────────────────────────────────────────── */
export type Profile        = Database["public"]["Tables"]["profiles"]["Row"];
export type LessonProgress = Database["public"]["Tables"]["lesson_progress"]["Row"];
export type Bookmark       = Database["public"]["Tables"]["bookmarks"]["Row"];
export type TrackProgress  = Database["public"]["Tables"]["track_progress"]["Row"];
export type UserStats      = Database["public"]["Views"]["user_stats"]["Row"];
