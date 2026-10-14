import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache for 1 hour

export interface LivePin {
  id: string;
  title: string;
  description: string;
  image: string;
  pinUrl: string;
  category: string;
  publishedAt: string;
}

export async function GET() {
  try {
    // 1. Fetch public RSS feed from official Kansotex Pinterest account
    const rssRes = await fetch("https://www.pinterest.com/kansotex/feed.rss", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) KansotexBot/1.0",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      next: { revalidate: 3600 },
    });

    if (!rssRes.ok) {
      throw new Error(`Pinterest RSS responded with status ${rssRes.status}`);
    }

    const xml = await rssRes.text();

    // 2. Parse RSS items
    const rawItems = xml.split("<item>").slice(1);
    const pins: LivePin[] = [];

    for (let i = 0; i < rawItems.length; i++) {
      const item = rawItems[i];

      const linkMatch = item.match(/<link>(.*?)<\/link>/);
      const pinUrl = linkMatch ? linkMatch[1].trim() : "https://www.pinterest.com/kansotex/";

      // Extract unique pin ID from URL
      const idMatch = pinUrl.match(/pin\/(\d+)/);
      const id = idMatch ? `pin-${idMatch[1]}` : `pin-${i + 1}`;

      // Decode and clean title
      const titleMatch = item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
      let rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : "";
      rawTitle = rawTitle
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, "&")
        .replace(/\s+/g, " ")
        .trim();

      const title = rawTitle.length > 70 ? rawTitle.slice(0, 67) + "..." : rawTitle || "Inspiration Textile Kansotex";

      // Extract high-resolution image URL from anywhere in the item or description
      const imgMatch = item.match(/https:\/\/i\.pinimg\.com\/[^\s"&<>]+\.(?:jpg|jpeg|png|webp)/i);
      let image = "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp"; // fallback

      if (imgMatch && imgMatch[0]) {
        // Pinterest default RSS uses 236x thumbnail. Upgrade to 736x for crystal-clear luxury retina resolution!
        image = imgMatch[0].replace(/\/236x\//, "/736x/");
      }

      // Extract clean description text (without embedded <img> or <a>)
      const descMatch = item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/);
      let cleanDesc = rawTitle;
      if (descMatch) {
        let text = descMatch[1]
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/&apos;/g, "'")
          .replace(/&amp;/g, "&")
          .replace(/<[^>]+>/g, "")
          .replace(/\s+/g, " ")
          .trim();
        if (text) {
          cleanDesc = text.length > 140 ? text.slice(0, 137) + "..." : text;
        }
      }

      // Extract publication date
      const dateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
      const publishedAt = dateMatch ? dateMatch[1].trim() : new Date().toISOString();

      pins.push({
        id,
        title,
        description: cleanDesc,
        image,
        pinUrl,
        category: "Pinterest",
        publishedAt,
      });
    }

    return NextResponse.json({
      success: true,
      source: "live_pinterest_rss",
      account: "kansotex",
      count: pins.length,
      pins,
    });
  } catch (error: any) {
    console.error("[Pinterest API Error]:", error);
    // Graceful fallback response
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch Pinterest feed",
        source: "fallback",
        pins: [],
      },
      { status: 500 }
    );
  }
}
