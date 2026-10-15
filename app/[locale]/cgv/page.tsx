import type { Metadata } from "next";
import { MentionsLegalesClientView } from "@/components/MentionsLegalesClientView";
import { buildCanonicalMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildCanonicalMetadata({
    locale,
    path: "/cgv",
    title: locale === "en" ? "Terms & Conditions (CGV) — Kanso Business SARL | Kansotex" : "Conditions Générales de Vente (CGV) — Kanso Business SARL | Kansotex",
    description: "Conditions générales de vente de tissus au mètre et de confection textile sur-mesure de la maison Kansotex à Marrakech.",
  });
}

export default function CGVPage() {
  return <MentionsLegalesClientView initialTab="cgv" />;
}
