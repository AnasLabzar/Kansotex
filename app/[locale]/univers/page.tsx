import type { Metadata } from "next";
import { UniversesClientView } from "@/components/UniversesClientView";

export const metadata: Metadata = {
  title: "Nos Univers — Étoffes & Confection d'Exception In & Outdoor",
  description:
    "Indoor, outdoor, linge de lit, linge de bain, linge de table et tissus haut de gamme confectionnés à Marrakech. Découvrez les univers textiles Kansotex.",
};

export default function UniversPage() {
  return <UniversesClientView />;
}
