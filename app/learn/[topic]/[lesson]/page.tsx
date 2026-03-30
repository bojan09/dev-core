import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TRACKS, type TrackSlug } from "@/lib/constants";
import { getLessonContent, getTrackLessons } from "@/lib/lessons";
import { LessonHero } from "@/components/layout/lesson-hero";
import { LessonSection, LessonProse, MistakeItem, SummaryList } from "@/components/layout/lesson-section";
import { CodeBlock } from "@/components/code/code-block";
import {
  PythonFlowInfographic, RustOwnershipInfographic,
  GoRoutinesInfographic, SysAdminFlowInfographic, LuaScriptingInfographic,
} from "@/components/infographics";

const INFOGRAPHICS: Record<string, React.ComponentType> = {
  python:   PythonFlowInfographic,
  sysadmin: SysAdminFlowInfographic,
  rust:     RustOwnershipInfographic,
  lua:      LuaScriptingInfographic,
  go:       GoRoutinesInfographic,
};

interface Props { params: { topic: string; lesson: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const content = getLessonContent(params.topic as TrackSlug, params.lesson);
  if (!content) return { title: "Lesson Not Found" };
  return { title: `${content.title} — ${params.topic}` };
}

export async function generateStaticParams() {
  const paths: { topic: string; lesson: string }[] = [];
  for (const track of TRACKS) {
    const lessons = getTrackLessons(track.slug);
    for (const lesson of lessons) {
      paths.push({ topic: track.slug, lesson: lesson.slug });
    }
  }
  return paths;
}

export default function LessonPage({ params }: Props) {
  const trackSlug = params.topic as TrackSlug;
  const track     = TRACKS.find((t) => t.slug === trackSlug);
  if (!track) notFound();

  const content = getLessonContent(trackSlug, params.lesson);
  if (!content) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <LessonHero
        trackSlug={trackSlug}
        title={content.title}
        tagline={content.hero.tagline}
        summary={content.hero.summary}
        level={content.level}
        duration={content.duration}
        lessonSlug={params.lesson}
        prevLesson={content.prevLesson}
        nextLesson={content.nextLesson}
      />

      {/* Lesson body */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Beginner Explanation */}
        <LessonSection type="beginner">
          <LessonProse>
            {content.beginnerExplanation.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </LessonProse>
        </LessonSection>

        {/* Deep Explanation */}
        <LessonSection type="deep-dive">
          <LessonProse>
            {content.deepExplanation.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </LessonProse>
        </LessonSection>

        {/* Track Infographic */}
        {(() => {
          const InfographicComp = INFOGRAPHICS[trackSlug];
          if (!InfographicComp) return null;
          return (
            <LessonSection type="deep-dive">
              <InfographicComp />
            </LessonSection>
          );
        })()}

        {/* Code Examples */}
        {content.codeExamples.length > 0 && (
          <LessonSection type="code">
            <div className="space-y-6">
              {content.codeExamples.map((ex, i) => (
                <div key={i} className="space-y-2">
                  {ex.title && (
                    <p className="text-sm font-semibold text-text-primary">{ex.title}</p>
                  )}
                  <CodeBlock
                    code={ex.code}
                    language={ex.language}
                    filename={ex.filename}
                    notes={ex.notes}
                  />
                </div>
              ))}
            </div>
          </LessonSection>
        )}

        {/* Real-World Example */}
        <LessonSection type="real-world">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">
                {content.realWorldExample.title}
              </p>
              <p className="text-sm text-text-secondary leading-relaxed">
                {content.realWorldExample.context}
              </p>
            </div>
            <CodeBlock
              code={content.realWorldExample.code}
              language={trackSlug === "sysadmin" ? "python" : trackSlug}
              filename={`real_world.${trackSlug === "go" ? "go" : trackSlug === "rust" ? "rs" : "py"}`}
            />
          </div>
        </LessonSection>

        {/* Common Mistakes */}
        {content.commonMistakes.length > 0 && (
          <LessonSection type="mistakes">
            <div className="space-y-3">
              {content.commonMistakes.map((m, i) => (
                <MistakeItem key={i} mistake={m.mistake} why={m.why} fix={m.fix} />
              ))}
            </div>
          </LessonSection>
        )}

        {/* Summary */}
        <LessonSection type="summary">
          <SummaryList items={content.summary} />
        </LessonSection>

        {/* Bottom nav */}
        <div className="pt-6 border-t border-surface-border/50 flex items-center justify-between gap-4">
          {content.prevLesson ? (
            <a
              href={`/learn/${trackSlug}/${content.prevLesson}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-elevated border border-surface-border hover:border-surface-border-light text-sm font-medium text-text-secondary hover:text-text-primary transition-all"
            >
              ← Previous
            </a>
          ) : <div />}
          {content.nextLesson && (
            <a
              href={`/learn/${trackSlug}/${content.nextLesson}`}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
              style={{ background: track.color, color: "#fff" }}
            >
              Next lesson →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
