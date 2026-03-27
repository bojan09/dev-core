import React from "react";
import Link from "next/link";

const FOOTER_LINKS = {
  Platform: [
    { label: "Dashboard",  href: "/dashboard" },
    { label: "All Tracks", href: "/tracks" },
    { label: "Progress",   href: "/progress" },
    { label: "Bookmarks",  href: "/bookmarks" },
  ],
  Tracks: [
    { label: "Python",          href: "/learn/python" },
    { label: "Python SysAdmin", href: "/learn/sysadmin" },
    { label: "Rust",            href: "/learn/rust" },
    { label: "Lua",             href: "/learn/lua" },
    { label: "Golang",          href: "/learn/go" },
  ],
  Company: [
    { label: "About",   href: "/about" },
    { label: "Blog",    href: "/blog" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms",   href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-surface-border/60 bg-surface/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/dashboard" className="flex items-center gap-2 w-fit">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#7B61FF" fillOpacity="0.14" />
                <rect width="32" height="32" rx="8" stroke="#7B61FF" strokeWidth="1" strokeOpacity="0.4" />
                <path d="M10 11L6 16L10 21" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 11L26 16L22 21" stroke="#00C2FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 9L13 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.65"/>
              </svg>
              <span className="text-text-primary font-semibold text-sm">
                Code<span className="text-brand-accent">Dev</span>
              </span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed max-w-[180px]">
              Learn programming the right way. Structured, visual, practical.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              <span className="text-[10px] text-text-muted font-mono">All systems operational</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-4">
                {section}
              </h3>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-150 link-underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-surface-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-mono">
            © {new Date().getFullYear()} CodeDev — open portfolio project
          </p>
          <div className="flex items-center gap-4">
            {["Python", "Rust", "Lua", "Go"].map((lang) => (
              <span key={lang} className="text-[10px] text-text-muted font-mono">{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
