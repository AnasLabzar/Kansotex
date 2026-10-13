import type { Metadata } from "next";
import { GalleryClientView } from "@/components/GalleryClientView";

export const metadata: Metadata = {
  title: "Galerie & Inspirations — Pinterest & Instagram | Kansotex",
  description:
    "Explorez la galerie Kansotex : inspirations textiles haut de gamme, indoor & outdoor. Retrouvez-nous sur Pinterest et Instagram pour des idees deco et tissus d'exception.",
  openGraph: {
    title: "Galerie & Inspirations — Kansotex",
    description: "Inspirations textiles, ambiances et projets Kansotex. Suivez-nous sur Pinterest et Instagram.",
    images: [
      {
        url: "https://kansotex.com/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp",
        width: 1200,
        height: 630,
        alt: "Kansotex Gallery — Inspirations textiles",
      },
    ],
  },
};

export default function GalleryPage() {
  return <GalleryClientView />;
}
