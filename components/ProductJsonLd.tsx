import React from "react";
import { buildProductJsonLd, ProductSchemaData } from "@/lib/schema/productSchema";

interface ProductJsonLdProps {
  product: ProductSchemaData;
  finalPrice?: number;
  locale?: string;
  baseUrl?: string;
}

/**
 * Server component that embeds the structured JSON-LD schema into the product page.
 * Supports Google Search Rich Snippets, Merchant Center Free Listings, and AI Shopping Crawlers.
 */
export function ProductJsonLd({
  product,
  finalPrice,
  locale = "fr",
  baseUrl = "https://kansotex.com",
}: ProductJsonLdProps) {
  const jsonLd = buildProductJsonLd({
    product,
    finalPrice,
    locale,
    baseUrl,
  });

  return (
    <script
      id={`jsonld-product-${product.slug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd, null, process.env.NODE_ENV === "development" ? 2 : 0),
      }}
    />
  );
}

export default ProductJsonLd;
