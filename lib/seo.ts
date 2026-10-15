import { Metadata } from "next";

export const SITE_URL = "https://kansotex.com";

export interface CanonicalMetadataOptions {
  locale: string;
  path?: string; // e.g. "/products" or "/contact" (starting with "/")
  title?: string;
  description?: string;
  image?: string;
}

/**
 * Builds complete, standards-compliant canonical and hreflang metadata for Next.js App Router.
 * Solves Google Search Console "Duplicate without user-selected canonical" error.
 */
export function buildCanonicalMetadata({
  locale,
  path = "",
  title,
  description,
  image,
}: CanonicalMetadataOptions): Metadata {
  const cleanPath = path.startsWith("/") ? path : path ? `/${path}` : "";
  const validLocale = locale === "en" ? "en" : "fr";
  const canonicalUrl = `${SITE_URL}/${validLocale}${cleanPath}`;
  const frUrl = `${SITE_URL}/fr${cleanPath}`;
  const enUrl = `${SITE_URL}/en${cleanPath}`;

  const ogImages = image
    ? [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? "" : "/"}${image}`,
          width: 1200,
          height: 630,
          alt: title || "Kansotex Marrakech",
        },
      ]
    : [
        {
          url: `${SITE_URL}/KANSOTEX-marque-Black.png`,
          width: 1200,
          height: 630,
          alt: "Kansotex Marrakech",
        },
      ];

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        fr: frUrl,
        en: enUrl,
        "x-default": frUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Kansotex",
      locale: validLocale === "en" ? "en_US" : "fr_FR",
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
  };
}
