import type { Metadata } from "next";
import { GalleryClientView } from "@/components/GalleryClientView";
import { buildCanonicalMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildCanonicalMetadata({
    locale,
    path: "/gallery",
    title: locale === "en" ? "Gallery & Inspirations — Pinterest & Instagram | Kansotex" : "Galerie & Inspirations — Pinterest & Instagram | Kansotex",
    description: locale === "en" ? "Explore Kansotex gallery: luxury indoor & outdoor textile inspirations, moodboards and Instagram reels in Marrakech." : "Explorez la galerie Kansotex : inspirations textiles haut de gamme, indoor & outdoor, tableaux Pinterest et reels Instagram à Marrakech.",
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp",
  });
}

export default function GalleryPage() {
  return <GalleryClientView />;
}
