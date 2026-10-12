import type { Metadata } from "next";
import { MentionsLegalesClientView } from "@/components/MentionsLegalesClientView";

export const metadata: Metadata = {
  title: "Mentions Légales — Kanso Business SARL | Kansotex Marrakech",
  description:
    "Mentions légales, informations d'entreprise et cadre réglementaire de Kanso Business SARL (Kansotex), fabricant et éditeur d'étoffes nobles in & outdoor à Marrakech depuis 2012.",
};

export default function MentionsLegalesPage() {
  return <MentionsLegalesClientView initialTab="mentions" />;
}
