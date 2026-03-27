import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TRACKS, type TrackSlug } from "@/lib/constants";
import { TrackIndexPage } from "@/components/layout/track-index";

interface Props { params: { topic: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const track = TRACKS.find((t) => t.slug === params.topic);
  if (!track) return { title: "Track Not Found" };
  return { title: `${track.title} — Learn`, description: track.description };
}

export async function generateStaticParams() {
  return TRACKS.map((t) => ({ topic: t.slug }));
}

export default function TrackPage({ params }: Props) {
  const track = TRACKS.find((t) => t.slug === params.topic as TrackSlug);
  if (!track) notFound();
  return <TrackIndexPage trackSlug={track.slug} />;
}
