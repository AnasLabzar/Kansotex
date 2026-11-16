import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { CataloguesIndexView } from "@/components/CataloguesIndexView";
import { buildCanonicalMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  return buildCanonicalMetadata({
    locale,
    path: "/catalogues",
    title: isEn
      ? "Signature Textile Catalogues — Hotel & Luxury Bedding"
      : "Catalogues d'Exception — Linge Hôtelier, Couettes & Matières Nobles",
    description: isEn
      ? "Discover Kansotex specialized catalogues: 5-Star Hotel Linen for Riads & Airbnb, Anti-Dust Mite Winter Duvets, Private Collection Noble Sateen & 600g Bath Linen."
      : "Découvrez les catalogues d'exception Kansotex : Linge hôtelier pour riads & Airbnb, couettes grand confort hiver, collection privée matières nobles et linge de bain 600g.",
    category: "lit",
    keywords: [
      "catalogue linge hotelier marrakech",
      "fournisseur linge riad maroc",
      "couette hiver anti acariens marrakech",
      "linge de lit matieres nobles maroc",
      "linge de bain 600g hotel maroc",
      "devis linge hotelier maroc",
    ],
  });
}

export default async function CataloguesPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <Header overlay={false} />
      <CataloguesIndexView locale={locale} />
    </main>
  );
}
