import type { Metadata } from "next";
import { UniversesClientView } from "@/components/UniversesClientView";
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
    path: "/univers",
    title: isEn
      ? "Our Textile Universes — Bed, Bath & Outdoor Linen"
      : "Nos Univers Textiles — Linge de Maison, Lit, Bain & Outdoor",
    description: isEn
      ? "Explore Kansotex collections in Marrakech: washed linen & sateen bedding, 600g bath linen, table linen and weather-resistant outdoor upholstery."
      : "Explorez les univers textiles Kansotex : linge de lit lin lavé et satin, serviettes éponge pour spa, linge de table et toiles in & outdoor à Marrakech.",
    category: "home",
  });
}

export default function UniversPage() {
  return <UniversesClientView />;
}
