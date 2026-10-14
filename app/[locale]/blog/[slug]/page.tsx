import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticleView } from "@/components/BlogArticleView";
import { getBlogPostBySlug, getRelatedBlogPosts, BLOG_POSTS } from "@/lib/blog-data";
import { getAutomatedPublishingSchedule } from "@/lib/blog-automation";

export async function generateStaticParams() {
  const posts = getAutomatedPublishingSchedule();
  const locales = ["fr", "en"];

  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return { title: "Article Introuvable | Kansotex" };
  }

  const isEn = params.locale === "en";
  const title = isEn
    ? `${post.titleEn} — Kansotex Journal`
    : `${post.title} — Le Journal Kansotex Marrakech`;

  const description = isEn ? post.metaDescriptionEn : post.metaDescription;

  const baseUrl = "https://kansotex.com";
  const canonicalUrl = `${baseUrl}/${params.locale}/blog/${params.slug}`;

  const primaryImage = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${baseUrl}${post.coverImage.startsWith("/") ? "" : "/"}${post.coverImage}`;

  return {
    title,
    description,
    keywords: post.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "fr-MA": `${baseUrl}/fr/blog/${params.slug}`,
        "en-US": `${baseUrl}/en/blog/${params.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Kansotex — Maison d'Étoffes In & Outdoor Marrakech",
      locale: isEn ? "en_US" : "fr_FR",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.seoKeywords,
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: post.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [primaryImage],
    },
  };
}

export default async function BlogPostPage(props: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);

  return (
    <BlogArticleView
      post={post}
      relatedPosts={relatedPosts}
      locale={params.locale}
    />
  );
}
