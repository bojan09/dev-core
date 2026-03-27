import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";

/* ─── Fonts ───────────────────────────────────────────────────────────────── */
// IBM Plex Sans — technical, clean, purpose-built for developer tools
const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

// IBM Plex Mono — the canonical programmer mono; pairs perfectly with Plex Sans
const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

/* ─── Metadata ────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "CodeDev — Learn Programming the Right Way",
    template: "%s · CodeDev",
  },
  description:
    "A production-grade SaaS learning platform for Python, Rust, Lua, Go, and Python for System Admins.",
  metadataBase: new URL("https://codedev.io"),
  openGraph: {
    type:     "website",
    locale:   "en_US",
    url:      "https://codedev.io",
    siteName: "CodeDev",
    title:    "CodeDev — Learn Programming the Right Way",
    description: "Infographic-driven programming education.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor:   "#0D1117",
  colorScheme:  "dark",
  width:        "device-width",
  initialScale: 1,
};

/* ─── Root Layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {/* Decorative background grid */}
        <div className="bg-grid-overlay" aria-hidden="true" />
        {/* Hero ambient glow */}
        <div className="hero-glow-overlay" aria-hidden="true" />
        {/* App shell */}
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
