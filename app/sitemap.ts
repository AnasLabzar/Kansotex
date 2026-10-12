import { MetadataRoute } from "next";
import { universes } from "@/lib/content"; // Wait, I need to make sure this is exported correctly

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kansotex.com";

  // Base routes
  const routes = [
    "",
    "/univers",
    "/savoir-faire",
    "/a-propos",
    "/contact",
    "/faq",
    "/livraison",
    "/echantillons",
    "/guide",
    "/projets",
    "/sur-mesure"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Add dynamic universe routes
  const universeRoutes = [
    "indoor",
    "outdoor",
    "hospitality",
    "architecture",
    "decoration"
  ].map((slug) => ({
    url: `${baseUrl}/univers/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...routes, ...universeRoutes];
}
