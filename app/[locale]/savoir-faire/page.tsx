import type { Metadata } from "next";
import { SavoirFaireClientView } from "@/components/SavoirFaireClientView";
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
    path: "/savoir-faire",
    title: isEn
      ? "Craftsmanship & Textile Tailoring Workshop Marrakech"
      : "Atelier de Confection & Savoir-Faire Textile Marrakech",
    description: isEn
      ? "Discover Kansotex textile craftsmanship in Marrakech: noble fibres, high-density weaving, bespoke tailoring and professional hospitality support."
      : "Découvrez le savoir-faire textile Kansotex à Marrakech : sélection de fibres nobles, lin lavé, velours d'exception et confection artisanale sur-mesure.",
    category: "ameublement",
  });
}

export default function SavoirFairePage() {
  return <SavoirFaireClientView />;
}
