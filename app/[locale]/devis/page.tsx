import type { Metadata } from "next";
import { DevisClientView } from "@/components/DevisClientView";
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
    path: "/devis",
    title: isEn
      ? "Request a Bespoke Quote — Textile Workshop & Tailoring | Kansotex"
      : "Demande de Devis Sur-Mesure — Manufacture Textile & Confection | Kansotex",
    description: isEn
      ? "Request a custom quotation for bespoke curtains, indoor & outdoor upholstery fabrics, hotel bedding, and atelier tailoring in Marrakech. Fast 24h technical estimate."
      : "Demandez votre devis sur-mesure pour vos rideaux grande hauteur, tissus d'ameublement in & outdoor, banquettes de riad et literie hôtelière à Marrakech. Chiffrage précis sous 24h.",
  });
}

export default function DevisPage() {
  return <DevisClientView />;
}
