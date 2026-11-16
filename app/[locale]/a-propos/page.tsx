import type { Metadata } from "next";
import { AProposClientView } from "@/components/AProposClientView";
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
    path: "/a-propos",
    title: isEn
      ? "About Kansotex — Luxury Textile House Marrakech"
      : "À Propos de la Maison Kansotex Marrakech",
    description: isEn
      ? "Kansotex, luxury in & outdoor textile house in Marrakech since 2012. Noble fibres, bespoke craftsmanship for residences and luxury hospitality."
      : "Kansotex, maison de textile in & outdoor à Marrakech depuis 2012. Tissus d'ameublement haut de gamme, confection sur-mesure pour villas et riads de luxe.",
    category: "home",
  });
}

export default function AProposPage() {
  return <AProposClientView />;
}
