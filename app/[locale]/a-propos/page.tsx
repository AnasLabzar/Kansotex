import type { Metadata } from "next";
import { AProposClientView } from "@/components/AProposClientView";

export const metadata: Metadata = {
  title: "À Propos de Nous — Maison d'Étoffes In & Outdoor | Kansotex",
  description:
    "Kansotex, maison de textile in & outdoor à Marrakech. Sélection de fibres nobles, tissus haut de gamme, atelier de confection sur-mesure pour professionnels et particuliers.",
};

export default function AProposPage() {
  return <AProposClientView />;
}
