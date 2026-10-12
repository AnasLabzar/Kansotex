import type { Metadata } from "next";
import { MentionsLegalesClientView } from "@/components/MentionsLegalesClientView";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente (CGV) — Kanso Business SARL | Kansotex",
  description:
    "Conditions générales de vente de tissus au mètre et de confection textile sur-mesure de la maison Kansotex (Kanso Business SARL) à Marrakech.",
};

export default function CGVPage() {
  return <MentionsLegalesClientView initialTab="cgv" />;
}
