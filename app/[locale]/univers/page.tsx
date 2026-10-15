import type { Metadata } from "next";
import { UniversesClientView } from "@/components/UniversesClientView";
import { buildCanonicalMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildCanonicalMetadata({
    locale,
    path: "/univers",
    title: locale === "en" ? "Our Universes — Bespoke In & Outdoor Textile Creations | Kansotex" : "Nos Univers — Étoffes & Confection d'Exception In & Outdoor | Kansotex",
    description: locale === "en" ? "Indoor, outdoor, bed linen, bath linen, table linen and luxury fabrics in Marrakech." : "Indoor, outdoor, linge de lit, linge de bain, linge de table et tissus haut de gamme confectionnés à Marrakech. Découvrez les univers textiles Kansotex.",
  });
}

export default function UniversPage() {
  return <UniversesClientView />;
}
