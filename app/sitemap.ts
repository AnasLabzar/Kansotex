import { MetadataRoute } from "next";
import { db } from "@/prisma/db";
import { universes } from "@/lib/content";

const BASE_URL = "https://kansotex.com";
const LOCALES = ["fr", "en"] as const;

/**
 * Normalizes relative image paths to absolute public URLs and escapes XML entities for sitemap compliance.
 */
function toAbsoluteImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  let fullUrl = path.trim();
  if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
    const cleanPath = fullUrl.startsWith("/") ? fullUrl : `/${fullUrl}`;
    fullUrl = `${BASE_URL}${cleanPath}`;
  }
  // Strictly XML-escape special characters according to sitemap protocol
  return fullUrl
    .replace(/&amp;/g, "&")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Advanced, Dynamic & Multilingual Sitemap Generator for Kansotex.
 * 
 * Features:
 * - Dynamic generation from Prisma/Postgres database (Products, Categories)
 * - Seamless catalog fallback ensuring 100% build reliability & zero downtime
 * - Complete multilingual hreflang (fr/en) alternates mapping
 * - Google Image Sitemap integration for luxury fabrics & collections
 * - High-precision priorities & update frequencies per route type
 * - Explicit exclusion of irrelevant categories (Zero focus on rugs/tapis)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  // ---------------------------------------------------------------------------
  // 1. Core Static Brand Pages (with multilingual alternates)
  // ---------------------------------------------------------------------------
  interface StaticRouteDef {
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
    image?: string;
  }

  const staticRoutes: StaticRouteDef[] = [
    {
      path: "",
      priority: 1.0,
      changeFrequency: "daily",
      image: `${BASE_URL}/KANSOTEX-marque-Black.png`,
    },
    {
      path: "/products",
      priority: 0.95,
      changeFrequency: "daily",
      image: `${BASE_URL}/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png`,
    },
    {
      path: "/pro",
      priority: 0.95,
      changeFrequency: "weekly",
      image: `${BASE_URL}/gallery/Kansotex-logistique-shipping.jpg`,
    },
    {
      path: "/univers",
      priority: 0.90,
      changeFrequency: "weekly",
      image: `${BASE_URL}/gallery/Kansotex-indoor-living-room-pinterest.png`,
    },
    {
      path: "/savoir-faire",
      priority: 0.85,
      changeFrequency: "monthly",
      image: `${BASE_URL}/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png`,
    },
    {
      path: "/a-propos",
      priority: 0.80,
      changeFrequency: "monthly",
      image: `${BASE_URL}/gallery/matiere-tissus-outdoor-rooftop.jpg`,
    },
    {
      path: "/contact",
      priority: 0.80,
      changeFrequency: "monthly",
      image: `${BASE_URL}/gallery/accompagnement-equipe-kansotex.jpg`,
    },
    {
      path: "/devis",
      priority: 0.85,
      changeFrequency: "weekly",
      image: `${BASE_URL}/gallery/accompagnement-equipe-kansotex.jpg`,
    },
    {
      path: "/gallery",
      priority: 0.80,
      changeFrequency: "weekly",
      image: `${BASE_URL}/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp`,
    },
    {
      path: "/blog",
      priority: 0.90,
      changeFrequency: "daily",
      image: `${BASE_URL}/gallery/Kansotex-outdoor-terasse-rooftop.webp`,
    },
    {
      path: "/mentions-legales",
      priority: 0.30,
      changeFrequency: "yearly",
    },
    {
      path: "/cgv",
      priority: 0.30,
      changeFrequency: "yearly",
    },
    {
      path: "/confidentialite",
      priority: 0.30,
      changeFrequency: "yearly",
    },
  ];

  for (const route of staticRoutes) {
    const images = route.image ? [route.image] : undefined;

    for (const locale of LOCALES) {
      const url = `${BASE_URL}/${locale}${route.path}`;
      entries.push({
        url,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        images,
        alternates: {
          languages: {
            fr: `${BASE_URL}/fr${route.path}`,
            en: `${BASE_URL}/en${route.path}`,
            "x-default": `${BASE_URL}/fr${route.path}`,
          },
        },
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Dynamic Universes (/univers/[slug])
  // ---------------------------------------------------------------------------
  for (const u of universes) {
    const universeImg = toAbsoluteImageUrl(u.image);
    const images = universeImg ? [universeImg] : undefined;
    const path = `/univers/${u.slug}`;

    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.90,
        images,
        alternates: {
          languages: {
            fr: `${BASE_URL}/fr${path}`,
            en: `${BASE_URL}/en${path}`,
            "x-default": `${BASE_URL}/fr${path}`,
          },
        },
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 3. Dynamic Products from Database (with Images & Hreflang)
  // ---------------------------------------------------------------------------
  let products: any[] = [];

  try {
    products = await db.orm.public.Product.where({ isActive: true })
      .include("category")
      .all();
  } catch (error) {
    console.warn("Sitemap: Live DB query unavailable, switching to local catalog fallback:", error);
  }

  // Fallback if DB is disconnected or empty during compilation
  if (!products || products.length === 0) {
    try {
      const { fakeProducts, fakeCategories } = await import("@/prisma/fakeData");
      const categoryMap = new Map(fakeCategories.map((c) => [c.id, c]));
      products = fakeProducts.map((p) => ({
        ...p,
        category: categoryMap.get(p.categoryId),
        updatedAt: now.toISOString(),
      }));
    } catch {}
  }

  for (const p of products) {
    // User constraint: ZERO focus on tapis (rugs)
    const catSlug = p.category?.slug?.toLowerCase() || "";
    const prodSlug = p.slug?.toLowerCase() || "";
    if (catSlug.includes("tapis") || prodSlug.includes("tapis")) {
      continue;
    }

    // Collect high-res product photos for Google Image search
    const productImages: string[] = [];
    const mainImg = toAbsoluteImageUrl(p.image);
    if (mainImg) productImages.push(mainImg);

    if (Array.isArray(p.gallery)) {
      for (const g of p.gallery) {
        const galleryImg = toAbsoluteImageUrl(g);
        if (galleryImg && !productImages.includes(galleryImg)) {
          productImages.push(galleryImg);
        }
      }
    }

    const lastModifiedDate = p.updatedAt ? new Date(p.updatedAt) : now;
    const path = `/products/${p.slug}`;

    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${path}`,
        lastModified: lastModifiedDate,
        changeFrequency: "weekly",
        priority: 0.85,
        images: productImages.length > 0 ? productImages : undefined,
        alternates: {
          languages: {
            fr: `${BASE_URL}/fr${path}`,
            en: `${BASE_URL}/en${path}`,
            "x-default": `${BASE_URL}/fr${path}`,
          },
        },
      });
    }
  }

  // ---------------------------------------------------------------------------
  // 4. Dynamic Blog & Editorial Articles
  // ---------------------------------------------------------------------------
  try {
    const { getAutomatedPublishingSchedule } = await import("@/lib/blog-automation");
    const blogPosts = getAutomatedPublishingSchedule();
    for (const post of blogPosts) {
      const path = `/blog/${post.slug}`;
      const imgUrl = toAbsoluteImageUrl(post.coverImage);

      for (const locale of LOCALES) {
        entries.push({
          url: `${BASE_URL}/${locale}${path}`,
          lastModified: new Date(post.publishedAt),
          changeFrequency: "weekly",
          priority: 0.85,
          images: imgUrl ? [imgUrl] : undefined,
          alternates: {
            languages: {
              fr: `${BASE_URL}/fr${path}`,
              en: `${BASE_URL}/en${path}`,
              "x-default": `${BASE_URL}/fr${path}`,
            },
          },
        });
      }
    }
  } catch (err) {
    console.warn("Sitemap: Could not load blog posts:", err);
  }

  return entries;
}
