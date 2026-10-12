import type { Metadata } from "next";
import { ContactClientView } from "@/components/ContactClientView";

export const metadata: Metadata = {
  title: "Contactez-Nous — Manufacture Textile & Atelier | Kansotex",
  description:
    "Prenez contact avec la Maison Kansotex à Marrakech. Échangez avec notre atelier pour vos projets d'étoffes, confections sur-mesure et aménagements in & outdoor.",
};

export default function ContactPage() {
  return <ContactClientView />;
}
