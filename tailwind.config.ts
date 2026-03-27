import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        brand: {
          primary:   "#0A2540",
          accent:    "#7B61FF",
          cyan:      "#00C2FF",
          "accent-light": "#A895FF",
          "cyan-light":   "#4DD9FF",
        },
        // Semantic surface colors
        surface: {
          DEFAULT:   "#0D1117",
          elevated:  "#161B22",
          overlay:   "#1C2333",
          border:    "#2A3441",
          "border-light": "#374151",
        },
        // Text hierarchy
        text: {
          primary:   "#F0F6FF",
          secondary: "#8B9BB4",
          muted:     "#4B5563",
          inverse:   "#0A2540",
        },
        // Track-specific accent colors
        track: {
          python:     "#3B82F6",   // Python blue
          sysadmin:   "#10B981",   // SysAdmin green
          rust:       "#F97316",   // Rust orange
          lua:        "#8B5CF6",   // Lua purple
          go:         "#06B6D4",   // Go cyan
        },
      },
      fontFamily: {
        sans:  ["var(--font-geist-sans)", "sans-serif"],
        mono:  ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-cal-sans)", "sans-serif"],
      },
      borderRadius: {
        "2xl":  "1rem",
        "3xl":  "1.5rem",
        "4xl":  "2rem",
      },
      boxShadow: {
        "glow-accent": "0 0 20px rgba(123, 97, 255, 0.3)",
        "glow-cyan":   "0 0 20px rgba(0, 194, 255, 0.3)",
        "card":        "0 4px 24px rgba(0, 0, 0, 0.4)",
        "card-hover":  "0 8px 40px rgba(0, 0, 0, 0.6)",
        "glass":       "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)",
      },
      backgroundImage: {
        "grid-pattern":   "url('/grid.svg')",
        "noise":          "url('/noise.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow":       "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(123,97,255,0.15), transparent)",
        "card-gradient":   "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      },
      animation: {
        "fade-up":       "fadeUp 0.6s ease-out forwards",
        "fade-in":       "fadeIn 0.4s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "pulse-slow":    "pulse 3s cubic-bezier(0.4,0,0.6,1) infinite",
        "glow-pulse":    "glowPulse 2s ease-in-out infinite",
        "shimmer":       "shimmer 2s linear infinite",
        "float":         "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%":   { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 10px rgba(123,97,255,0.3)" },
          "50%":       { boxShadow: "0 0 25px rgba(123,97,255,0.6)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-10px)" },
        },
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "sidebar": "16rem",
        "sidebar-collapsed": "4rem",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
