import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { CatalogueDetailView } from "@/components/CatalogueDetailView";
import { getAllCatalogues, getCatalogueBySlug } from "@/lib/catalogues-data";
import { buildCanonicalMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const catalogues = getAllCatalogues();
  return catalogues.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const isEn = locale === "en";
  const catalogue = getCatalogueBySlug(slug);

  if (!catalogue) {
    return { title: "Catalogue Introuvable | Kansotex" };
  }

  const title = isEn ? catalogue.metaTitleEn : catalogue.metaTitleFr;
  const description = isEn ? catalogue.metaDescEn : catalogue.metaDescFr;

  return buildCanonicalMetadata({
    locale,
    path: `/catalogues/${slug}`,
    title,
    description,
    image: catalogue.posterImage,
    category: catalogue.seoCategory,
    keywords: catalogue.keywords,
  });
}

export default async function CatalogueDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const catalogue = getCatalogueBySlug(slug);

  if (!catalogue) {
    notFound();
  }

  // Generate Structured Data (Product & Breadcrumb JSON-LD)
  const isEn = locale === "en";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: isEn ? catalogue.starPack.titleEn : catalogue.starPack.titleFr,
    image: `https://kansotex.com${catalogue.posterImage}`,
    description: isEn ? catalogue.starPack.descriptionEn : catalogue.starPack.descriptionFr,
    brand: {
      "@type": "Brand",
      name: "Kansotex",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: catalogue.starPack.basePriceEur * 0.75, // With volume discount
      highPrice: catalogue.starPack.basePriceEur + 50,
      offerCount: catalogue.starPack.dimensionOptions.length,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Kansotex Marrakech",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: catalogue.averageRating.toString(),
      reviewCount: catalogue.totalReviews.toString(),
    },
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      {/* Product JSON-LD for Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header overlay={false} />
      <CatalogueDetailView catalogue={catalogue} locale={locale} />
    </main>
  );
}
