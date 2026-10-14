import { NextResponse } from "next/server";
import { BLOG_POSTS } from "@/lib/blog-data";
import { UPCOMING_TOPIC_PIPELINE, getAutomatedPublishingSchedule } from "@/lib/blog-automation";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const expectedSecret = process.env.BLOG_CRON_SECRET || "kansotex_editorial_cron_2026";

  const allPublished = getAutomatedPublishingSchedule();

  return NextResponse.json({
    status: "active",
    cadence: "Publication planifiée tous les 2 à 4 jours",
    totalPublishedArticles: allPublished.length,
    totalUpcomingInPipeline: UPCOMING_TOPIC_PIPELINE.length,
    activeArticles: allPublished.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      publishedAt: p.publishedAt,
      readingTime: p.readingTime,
    })),
    upcomingPipeline: UPCOMING_TOPIC_PIPELINE.map((u) => ({
      slug: u.slug,
      title: u.title,
      category: u.category,
      author: u.author.name,
    })),
    seoMetrics: {
      schemaEnabled: ["BlogPosting", "BreadcrumbList", "FAQPage"],
      indexingStatus: "Inclus dans sitemap.xml avec priorité 0.8",
      internalLinking: "Cross-selling dynamique vers /products et /pro",
    },
  });
}
