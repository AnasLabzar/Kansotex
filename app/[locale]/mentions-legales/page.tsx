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
    path: "/mentions-legales",
    title: locale === "en" ? "Legal Notice — Kanso Business SARL | Kansotex Marrakech" : "Mentions Légales — Kanso Business SARL | Kansotex Marrakech",
    description: "Mentions légales et cadre réglementaire de Kanso Business SARL (Kansotex), fabricant d'étoffes nobles in & outdoor à Marrakech.",
  });
}

export default function MentionsLegalesPage() {
  return <MentionsLegalesClientView initialTab="mentions" />;
}
