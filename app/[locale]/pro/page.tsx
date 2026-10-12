import type { Metadata } from "next";
import { ProClientView } from "@/components/ProClientView";

export const metadata: Metadata = {
  title: "Espace Professionnel — Architectes, Décorateurs & Hôtellerie | Kansotex",
  description:
    "Espace réservé aux architectes d'intérieur, décorateurs et professionnels de l'hôtellerie. Tarifs préférentiels jusqu'à -30%, nuanciers offerts et confection sur-mesure à Marrakech.",
};

export default function ProPage() {
  return <ProClientView />;
}

