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
    path: "/confidentialite",
    title: locale === "en" ? "Privacy Policy — Kanso Business SARL | Kansotex" : "Politique de Confidentialité — Kanso Business SARL | Kansotex",
    description: "Engagement de confidentialité et respect de la vie privée (Loi n° 09-08) par Kanso Business SARL et les ateliers Kansotex à Marrakech.",
  });
}

export default function ConfidentialitePage() {
  return <MentionsLegalesClientView initialTab="confidentialite" />;
}
