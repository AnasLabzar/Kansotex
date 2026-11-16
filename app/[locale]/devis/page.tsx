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
      ? "Bespoke Curtains & Custom Linen Quote Marrakech"
      : "Devis Confection Rideaux & Linge Sur Mesure Marrakech",
    description: isEn
      ? "Request a custom quotation for bespoke curtains, indoor & outdoor upholstery fabrics, hotel bedding, and atelier tailoring in Marrakech. Fast 24h estimate."
      : "Demandez votre devis sur-mesure pour rideaux grande hauteur, voilages, tissus d'ameublement in & outdoor et literie de riad à Marrakech. Chiffrage sous 24h.",
    category: "ameublement",
  });
}

export default function DevisPage() {
  return <DevisClientView />;
}
