import type { Metadata } from "next";
import { MentionsLegalesClientView } from "@/components/MentionsLegalesClientView";

export const metadata: Metadata = {
  title: "Politique de Confidentialité — Kanso Business SARL | Kansotex",
  description:
    "Engagement de confidentialité et respect de la vie privée (Loi n° 09-08) par Kanso Business SARL et les ateliers Kansotex à Marrakech.",
};

export default function ConfidentialitePage() {
  return <MentionsLegalesClientView initialTab="confidentialite" />;
}
