import type { Metadata } from "next";
import { SavoirFaireClientView } from "@/components/SavoirFaireClientView";

export const metadata: Metadata = {
  title: "Notre Savoir-Faire — Atelier de Confection & Etoffes Nobles a Marrakech",
  description:
    "Decouvrez les piliers du savoir-faire textile Kansotex a Marrakech : selection des fibres nobles, tissage haute densite, confection sur-mesure et accompagnement pro.",
};

export default function SavoirFairePage() {
  return <SavoirFaireClientView />;
}
