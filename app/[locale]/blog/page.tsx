import type { Metadata } from "next";
import { BlogIndexView } from "@/components/BlogIndexView";
import { getAutomatedPublishingSchedule } from "@/lib/blog-automation";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const isEn = params.locale === "en";

  const title = isEn
    ? "The Textile Gazette & Architecture Journal | Kansotex Marrakech"
    : "Le Journal Textile & Architecture — Guides d'Étoffes In & Outdoor | Kansotex Marrakech";

  const description = isEn
    ? "Discover expert insights, bespoke curtain yardage formulas, outdoor fabric UV standards, and luxury riad design inspirations from our Marrakech manufacture."
    : "Explorez nos dossiers experts : calcul du métrage de rideaux, toiles outdoor résistantes aux UV de Marrakech, pur lin d'Atlas et velours peigné pour riads et hôtels.";

  const baseUrl = "https://kansotex.com";
  const canonicalUrl = `${baseUrl}/${params.locale}/blog`;

  return {
    title,
    description,
    keywords: [
      "journal textile marrakech",
      "blog tissu ameublement maroc",
      "guide tissu outdoor marrakech",
      "rideaux sur mesure marrakech",
      "decoration riad marrakech",
      "lin atlas lave",
      "velours gueliz",
      "conseil tapissier marrakech",
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: `${baseUrl}/fr/blog`,
        en: `${baseUrl}/en/blog`,
        "x-default": `${baseUrl}/fr/blog`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Kansotex — Maison d'Étoffes Marrakech",
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: `${baseUrl}/gallery/Kansotex-outdoor-terasse-rooftop.webp`,
          width: 1200,
          height: 630,
          alt: "Le Journal Kansotex — Carnet d'Étoffes In & Outdoor",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/gallery/Kansotex-outdoor-terasse-rooftop.webp`],
    },
  };
}

export default async function BlogPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  const posts = getAutomatedPublishingSchedule();

  return <BlogIndexView initialPosts={posts} locale={params.locale} />;
}
