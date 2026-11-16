import type { Metadata } from "next";
import { ContactClientView } from "@/components/ContactClientView";
import { buildCanonicalMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return buildCanonicalMetadata({
    locale,
    path: "/contact",
    title: isEn
      ? "Textile Workshop & Showroom Marrakech | Contact"
      : "Showroom & Atelier Textile Marrakech | Contact",
    description: isEn
      ? "Get in touch with Kansotex textile workshop in Marrakech (Al Massar, Rte de Safi). Fabric samples, bespoke quotations and showroom visits."
      : "Prenez contact avec la manufacture Kansotex à Marrakech (Al Massar, Rte de Safi). Échantillons d'étoffes, confections sur-mesure et showroom.",
    category: "home",
  });
}

export default function ContactPage() {
  return <ContactClientView />;
}
