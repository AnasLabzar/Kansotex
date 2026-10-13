import { MetadataRoute } from "next";

/**
 * Optimized, high-performance Robots.txt configuration for Kansotex.
 * 
 * Features:
 * - Full indexation of public collections, fabrics, universes, and B2B portal
 * - Explicit GEO (Generative Engine Optimization) permissions for AI search engines (ChatGPT, Perplexity, Claude, Apple, Google)
 * - Strict disallow of sensitive transactional, admin, and internal API paths
 * - Unblocking of luxury fabric photo galleries for image search engines
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://kansotex.com";

  return {
    rules: [
      // Standard Web Crawlers (Googlebot, Bingbot, etc.)
      {
        userAgent: "*",
        allow: [
          "/",
          "/fr/",
          "/en/",
          "/products",
          "/products/*",
          "/pro",
          "/univers",
          "/univers/*",
          "/savoir-faire",
          "/a-propos",
          "/contact",
          "/mentions-legales",
          "/cgv",
          "/confidentialite",
          "/gallery/*",
          "/icon.png",
          "/icon.svg",
        ],
        disallow: [
          "/api/",
          "/checkout",
          "/checkout/*",
          "/*/checkout",
          "/*/checkout/*",
          "/admin",
          "/admin/*",
          "/*/admin",
          "/*/admin/*",
          "/_next/",
          "/*.json$",
        ],
      },
      // Generative AI & Conversational Search Crawlers (ChatGPT Shopping, Perplexity, Claude, Apple Intelligence, Google AI Overviews)
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "cohere-ai",
        ],
        allow: [
          "/",
          "/fr/",
          "/en/",
          "/products",
          "/products/*",
          "/pro",
          "/univers",
          "/univers/*",
          "/savoir-faire",
          "/a-propos",
          "/contact",
        ],
        disallow: [
          "/api/",
          "/checkout",
          "/*/checkout",
          "/admin",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
