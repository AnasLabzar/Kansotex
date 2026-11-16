import { Metadata } from "next";
import { getKeywordsForCategory } from "./seoKeywords";

export const SITE_URL = "https://kansotex.com";

export interface CanonicalMetadataOptions {
  locale: string;
  path?: string; // e.g. "/products" or "/contact" (starting with "/")
  title?: string;
  isAbsoluteTitle?: boolean; // When true, prevents template suffix appending
  description?: string;
  image?: string;
  category?: string; // Used to auto-select keyword clusters
  keywords?: string[];
}

/**
 * Normalizes title string by stripping redundant brand suffixes
 * so Next.js `%s | Kansotex` template doesn't duplicate them.
 */
function cleanTitle(title?: string): string {
  if (!title) return "";
  return title
    .replace(/\s*\|\s*Kansotex.*$/i, "")
    .replace(/\s*—\s*Kansotex.*$/i, "")
    .replace(/\s*-\s*Kansotex.*$/i, "")
    .trim();
}

/**
 * Builds complete, standards-compliant canonical, hreflang, OpenGraph and keywords metadata.
 * Solves Google Search Console duplicate canonical errors and guarantees optimal SERP display length.
 */
export function buildCanonicalMetadata({
  locale,
  path = "",
  title,
  isAbsoluteTitle = false,
  description,
  image,
  category = "home",
  keywords,
}: CanonicalMetadataOptions): Metadata {
  const cleanPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const validLocale = locale === "en" ? "en" : "fr";
  const canonicalUrl = `${SITE_URL}/${validLocale}${cleanPath}`;
  const frUrl = `${SITE_URL}/fr${cleanPath}`;
  const enUrl = `${SITE_URL}/en${cleanPath}`;

  // Smart title handling
  let processedTitle: any = title;
  const cleaned = cleanTitle(title);

  if (isAbsoluteTitle && title) {
    processedTitle = {
      absolute: title,
    };
  } else if (cleaned) {
    processedTitle = cleaned;
  }

  const effectiveKeywords = keywords && keywords.length > 0
    ? keywords
    : getKeywordsForCategory(category, validLocale === "en");

  const ogImages = image
    ? [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`,
          width: 1200,
          height: 630,
          alt: title || "Kansotex Marrakech — Maison de Textile Haut de Gamme",
        },
      ]
    : [
        {
          url: `${SITE_URL}/KANSOTEX-marque-Black.png`,
          width: 1200,
          height: 630,
          alt: "Kansotex Marrakech — Linge de Maison & Tissus In & Outdoor",
        },
      ];

  const fullDisplayTitle = isAbsoluteTitle && title ? title : cleaned ? `${cleaned} | Kansotex` : "Kansotex";

  return {
    metadataBase: new URL(SITE_URL),
    title: processedTitle,
    description,
    keywords: effectiveKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: frUrl,
        en: enUrl,
        "x-default": frUrl,
      },
    },
    openGraph: {
      title: fullDisplayTitle,
      description,
      url: canonicalUrl,
      siteName: "Kansotex — In & Outdoor",
      locale: validLocale === "en" ? "en_US" : "fr_FR",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: fullDisplayTitle,
      description,
      images: ogImages.map((img) => img.url),
    },
  };
}
