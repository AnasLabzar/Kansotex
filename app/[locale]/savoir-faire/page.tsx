import type { Metadata } from "next";
import { SavoirFaireClientView } from "@/components/SavoirFaireClientView";
import { buildCanonicalMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildCanonicalMetadata({
    locale,
    path: "/savoir-faire",
    title: locale === "en" ? "Our Craftsmanship — Textile Manufacture & Bespoke Tailoring | Kansotex" : "Notre Savoir-Faire — Atelier de Confection & Étoffes Nobles | Kansotex",
    description: locale === "en" ? "Discover Kansotex craftsmanship in Marrakech: noble fibres, high-density weaving, bespoke tailoring and professional support." : "Découvrez les piliers du savoir-faire textile Kansotex à Marrakech : sélection des fibres nobles, tissage haute densité, confection sur-mesure et accompagnement pro.",
  });
}

export default function SavoirFairePage() {
  return <SavoirFaireClientView />;
}
