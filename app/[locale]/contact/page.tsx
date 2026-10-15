import type { Metadata } from "next";
import { ContactClientView } from "@/components/ContactClientView";
import { buildCanonicalMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildCanonicalMetadata({
    locale,
    path: "/contact",
    title: locale === "en" ? "Contact Us — Textile Workshop & Showroom | Kansotex" : "Contactez-Nous — Manufacture Textile & Atelier | Kansotex",
    description: locale === "en" ? "Get in touch with Kansotex textile workshop in Marrakech for your bespoke upholstery and hospitality projects." : "Prenez contact avec la Maison Kansotex à Marrakech. Échangez avec notre atelier pour vos projets d'étoffes, confections sur-mesure et aménagements in & outdoor.",
  });
}

export default function ContactPage() {
  return <ContactClientView />;
}
