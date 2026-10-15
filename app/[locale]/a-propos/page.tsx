import type { Metadata } from "next";
import { AProposClientView } from "@/components/AProposClientView";
import { buildCanonicalMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildCanonicalMetadata({
    locale,
    path: "/a-propos",
    title: locale === "en" ? "About Us — Luxury In & Outdoor Textile House | Kansotex" : "À Propos de Nous — Maison d'Étoffes In & Outdoor | Kansotex",
    description: locale === "en" ? "Kansotex, luxury in & outdoor textile house in Marrakech. Noble fibres, bespoke craftsmanship for residences and luxury hospitality." : "Kansotex, maison de textile in & outdoor à Marrakech. Sélection de fibres nobles, tissus haut de gamme, atelier de confection sur-mesure pour professionnels et particuliers.",
  });
}

export default function AProposPage() {
  return <AProposClientView />;
}
