import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/pro/", "/admin/", "/checkout/"],
    },
    sitemap: "https://kansotex.com/sitemap.xml",
  };
}
