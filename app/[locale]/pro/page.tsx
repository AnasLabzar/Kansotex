import type { Metadata } from "next";
import { ProClientView } from "@/components/ProClientView";
import { buildCanonicalMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildCanonicalMetadata({
    locale,
    path: "/pro",
    title: locale === "en" ? "B2B Trade Portal — Architects, Designers & Hospitality | Kansotex" : "Espace Professionnel — Architectes, Décorateurs & Hôtellerie | Kansotex",
    description: locale === "en" ? "Trade portal for interior architects, decorators and luxury hospitality in Marrakech. Preferential pricing and bespoke tailoring." : "Espace réservé aux architectes d'intérieur, décorateurs et professionnels de l'hôtellerie. Tarifs préférentiels, nuanciers et confection sur-mesure à Marrakech.",
  });
}

export default function ProPage() {
  return <ProClientView />;
}

