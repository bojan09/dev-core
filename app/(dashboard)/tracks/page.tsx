import type { Metadata } from "next";
import { BookOpen, Clock, BarChart2 } from "lucide-react";
import { TRACKS } from "@/lib/constants";
import { TrackCard } from "@/components/ui/track-card";
import { ScrollReveal, StaggerGroup } from "@/components/animations";

export const metadata: Metadata = { title: "All Tracks" };

const LEVELS = ["All", "Beginner-friendly", "Systems", "Scripting", "DevOps"] as const;

const TRACK_TAGS: Record<string, string[]> = {
  All:               [],
  "Beginner-friendly": ["python", "lua"],
  Systems:           ["rust", "go"],
  Scripting:         ["python", "lua"],
  DevOps:            ["sysadmin", "go"],
};

export default function TracksPage() {
  const total   = TRACKS.reduce((s, t) => s + t.totalLessons, 0);
  const hours   = TRACKS.reduce((s, t) => s + t.estimatedHours, 0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative px-6 lg:px-8 pt-10 pb-8 border-b border-white/[0.05]">
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 70% at 20% 0%, rgba(0,194,255,0.07), transparent)" }}
        />
        <div className="relative max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-[#8B9BB4]">
                <BookOpen size={11} className="text-[#00C2FF]" />
                {TRACKS.length} tracks available
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-[#8B9BB4]">
                <BarChart2 size={11} className="text-[#7B61FF]" />
                {total} total lessons
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-[#8B9BB4]">
                <Clock size={11} className="text-[#10B981]" />
                {hours}+ hours of content
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.05}>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#F0F6FF] mb-2">
              All learning tracks
            </h1>
            <p className="text-sm text-[#8B9BB4] max-w-xl">
              Five specialized courses — from complete beginner to production-ready developer.
              Each track is structured, visual, and packed with real-world examples.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Tracks grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <StaggerGroup
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          staggerDelay={0.07}
        >
          {TRACKS.map((track) => (
            <ScrollReveal key={track.slug} direction="stagger-item">
              <TrackCard
                track={track}
                progress={0}
                lessonsCompleted={0}
                isNew={track.slug === "sysadmin"}
                className="h-full"
              />
            </ScrollReveal>
          ))}
        </StaggerGroup>

        {/* Track comparison table */}
        <ScrollReveal direction="up" className="mt-14">
          <h2 className="text-base font-semibold text-[#F0F6FF] mb-5">Track comparison</h2>
          <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.07] bg-white/[0.02]">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#4B5563]">Track</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#4B5563]">Level</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#4B5563]">Lessons</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#4B5563]">Hours</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#4B5563] hidden sm:table-cell">Best for</th>
                </tr>
              </thead>
              <tbody>
                {TRACKS.map((track, i) => (
                  <tr
                    key={track.slug}
                    className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center text-sm"
                          style={{ background: `${track.color}18` }}
                        >
                          {["🐍","⚙️","🦀","🌙","🐹"][i]}
                        </div>
                        <span className="font-medium text-[#F0F6FF]">{track.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: `${track.color}15`, color: track.color }}
                      >
                        {track.level === "all" ? "All levels" : track.level}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-[#8B9BB4] font-mono text-xs">{track.totalLessons}</td>
                    <td className="px-5 py-3.5 text-[#8B9BB4] font-mono text-xs">{track.estimatedHours}h</td>
                    <td className="px-5 py-3.5 text-[#4B5563] text-xs hidden sm:table-cell">
                      {track.tags.slice(0, 2).join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
