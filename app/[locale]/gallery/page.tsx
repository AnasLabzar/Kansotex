import type { Metadata } from "next";
import { GalleryClientView } from "@/components/GalleryClientView";
import { buildCanonicalMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return buildCanonicalMetadata({
    locale,
    path: "/gallery",
    title: isEn
      ? "Textile Gallery & Pinterest Inspirations Marrakech"
      : "Galerie Textiles & Inspirations Pinterest Marrakech",
    description: isEn
      ? "Explore Kansotex gallery: luxury indoor & outdoor textile inspirations, Pinterest moodboards, and Instagram reels crafted in Marrakech."
      : "Explorez la galerie Kansotex : inspirations textiles haut de gamme, indoor & outdoor, tableaux Pinterest et confections de riads à Marrakech.",
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp",
    category: "outdoor",
  });
}

export default function GalleryPage() {
  return <GalleryClientView />;
}
