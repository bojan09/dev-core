/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* ── Fonts ─────────────────────────────────────────────────────── */
      fontFamily: {
        sans:    ["var(--font-sans)", "system-ui", "sans-serif"],
        mono:    ["var(--font-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
      },

      /* ── Brand colors ──────────────────────────────────────────────── */
      colors: {
        brand: {
          primary:       "#0A2540",
          accent:        "#7B61FF",
          "accent-light":"#A895FF",
          cyan:          "#00C2FF",
          "cyan-light":  "#4DD9FF",
        },

        /* Surface hierarchy */
        surface: {
          DEFAULT:       "#0D1117",
          elevated:      "#161B22",
          overlay:       "#1C2333",
          border:        "#2A3441",
          "border-light":"#374151",
        },

        /* Text hierarchy */
        text: {
          primary:   "#F0F6FF",
          secondary: "#8B9BB4",
          muted:     "#4B5563",
          inverse:   "#0A2540",
        },

        /* Track accent colors */
        track: {
          python:   "#3B82F6",
          sysadmin: "#10B981",
          rust:     "#F97316",
          lua:      "#8B5CF6",
          go:       "#06B6D4",
        },
      },

      /* ── Border radius ─────────────────────────────────────────────── */
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },

      /* ── Shadows ───────────────────────────────────────────────────── */
      boxShadow: {
        "glow-accent": "0 0 24px rgba(123,97,255,0.35)",
        "glow-cyan":   "0 0 24px rgba(0,194,255,0.35)",
        card:          "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover":  "0 8px 48px rgba(0,0,0,0.6)",
        glass:         "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)",
      },

      /* ── Spacing extras ────────────────────────────────────────────── */
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "sidebar":           "16rem",
        "sidebar-collapsed": "4rem",
        "navbar":            "4rem",
      },

      /* ── Animations ────────────────────────────────────────────────── */
      animation: {
        "fade-up":    "fadeUp 0.5s ease-out forwards",
        "fade-in":    "fadeIn 0.4s ease-out forwards",
        "slide-left": "slideLeft 0.4s ease-out forwards",
        "shimmer":    "shimmer 1.5s linear infinite",
        "float":      "float 5s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%":   { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-300% 0" },
          "100%": { backgroundPosition:  "300% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-8px)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
      },

      /* ── Backdrop blur ─────────────────────────────────────────────── */
      backdropBlur: { xs: "2px" },
    },
  },

  safelist: [
    { pattern: /bg-brand-(accent|cyan)\/(10|15|20|25|30|40|50)/ },
    { pattern: /border-brand-(accent|cyan)\/(10|15|20|25|30|40)/ },
    { pattern: /text-brand-(accent|cyan|accent-light|cyan-light)/ },
    { pattern: /bg-surface-(elevated|overlay)/ },
    { pattern: /border-surface-(border|border-light)/ },
    { pattern: /text-text-(primary|secondary|muted)/ },
    { pattern: /text-track-(python|sysadmin|rust|lua|go)/ },
    { pattern: /bg-track-(python|sysadmin|rust|lua|go)/ },
  ],
  plugins: [],
};

module.exports = config;
