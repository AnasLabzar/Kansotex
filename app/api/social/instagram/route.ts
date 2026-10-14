import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache for 1 hour

export interface LiveReel {
  id: string;
  title: string;
  description: string;
  poster: string;
  videoSrc?: string;
  instagramUrl: string;
  category: string;
  duration?: string;
  views?: string;
  publishedAt?: string;
}

// High-end curated Kansotex Reels fallback
const CURATED_REELS: LiveReel[] = [
  {
    id: "reel-1",
    title: "Voilages sur-mesure & Lin naturel — Villa Amelkis",
    description: "Mise en lumière et confection de voilages aériens sur double hauteur.",
    poster: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp",
    videoSrc: "/video-rideau-villa_kansotex.mp4",
    instagramUrl: "https://www.instagram.com/kansotex/",
    category: "Rideaux Sur-Mesure",
    duration: "0:35",
    views: "18.2K",
  },
  {
    id: "reel-2",
    title: "Confection & Savoir-faire Textile — Notre Atelier",
    description: "Chaque métrage est inspecté, découpé et assemblé avec minutie à Marrakech.",
    poster: "/gallery/accompagnement-equipe-kansotex.webp",
    instagramUrl: "https://www.instagram.com/kansotex/",
    category: "Atelier Marrakech",
    duration: "0:48",
    views: "14.5K",
  },
  {
    id: "reel-3",
    title: "Tissus Outdoor Déperlants — Rooftop & Terrasses",
    description: "Résistance aux UV et intempéries sans compromis sur l'élégance du toucher.",
    poster: "/gallery/Kansotex-outdoor-terasse-rooftop.webp",
    instagramUrl: "https://www.instagram.com/kansotex/",
    category: "Outdoor Luxe",
    duration: "0:28",
    views: "22.9K",
  },
  {
    id: "reel-4",
    title: "Salon Médina & Velours Ciselé — Riad Privé",
    description: "Association de velours soyeux et de passementerie traditionnelle marocaine.",
    poster: "/gallery/Kansotex-indoor-living-room-pinterest.webp",
    instagramUrl: "https://www.instagram.com/kansotex/",
    category: "Indoor Privé",
    duration: "0:42",
    views: "16.1K",
  },
  {
    id: "reel-5",
    title: "Linge de lit en satin de coton & lin lavé",
    description: "Confort 5 étoiles et douceur pour résidences de prestige et suites hôtelières.",
    poster: "/gallery/linge-de-lite-villa-marrakech-kansotex.webp",
    instagramUrl: "https://www.instagram.com/kansotex/",
    category: "Linge de Lit",
    duration: "0:31",
    views: "11.7K",
  },
  {
    id: "reel-6",
    title: "Matières Nobles & Textures Jacquard",
    description: "Détails de tissages précieux et tombés souples sous la lumière de Marrakech.",
    poster: "/gallery/linen_fabric_closeup_1791052926029.jpg",
    instagramUrl: "https://www.instagram.com/kansotex/",
    category: "Matières & Étoffes",
    duration: "0:25",
    views: "19.8K",
  },
];

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const feedUrl = process.env.INSTAGRAM_FEED_URL?.trim();

  // Option A: Direct Meta Instagram Graph API
  if (token) {
    try {
      const graphUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=12&access_token=${encodeURIComponent(
        token
      )}`;

      const res = await fetch(graphUrl, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.data) && data.data.length > 0) {
          const reels: LiveReel[] = data.data.map((item: any, idx: number) => {
            const caption = item.caption || "Kansotex Marrakech — Création textile d'exception";
            const firstLine = caption.split("\n")[0].trim();
            const cleanTitle = firstLine.length > 70 ? firstLine.slice(0, 67) + "..." : firstLine;
            const isVideo = item.media_type === "VIDEO";

            // Extract hashtag category if available
            const hashtagMatch = caption.match(/#(\w+)/);
            const category = hashtagMatch ? `#${hashtagMatch[1]}` : isVideo ? "Reels" : "Instagram";

            return {
              id: item.id ? `ig-${item.id}` : `ig-${idx + 1}`,
              title: cleanTitle || "Kansotex Marrakech",
              description: caption.length > 150 ? caption.slice(0, 147) + "..." : caption,
              poster: item.thumbnail_url || item.media_url || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp",
              videoSrc: isVideo ? item.media_url : undefined,
              instagramUrl: item.permalink || "https://www.instagram.com/kansotex/",
              category,
              duration: isVideo ? "Reel" : "Post",
              views: "Kansotex",
              publishedAt: item.timestamp,
            };
          });

          return NextResponse.json({
            success: true,
            isLive: true,
            source: "meta_graph_api",
            account: "kansotex",
            count: reels.length,
            reels,
          });
        }
      }
    } catch (err: any) {
      console.warn("[Instagram Graph API Fetch Warning]:", err?.message || err);
    }
  }

  // Option B: Aggregator Feed URL (Behold.so, Curator.io, etc.)
  if (feedUrl) {
    try {
      const res = await fetch(feedUrl, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        const feedData = await res.json();
        // Support common feed structures (e.g., Behold array or Curator posts)
        const items = Array.isArray(feedData) ? feedData : feedData?.posts || feedData?.data || [];
        if (Array.isArray(items) && items.length > 0) {
          const reels: LiveReel[] = items.slice(0, 12).map((item: any, idx: number) => {
            const caption = item.caption || item.text || "Kansotex Marrakech";
            const firstLine = caption.split("\n")[0].trim();
            const cleanTitle = firstLine.length > 70 ? firstLine.slice(0, 67) + "..." : firstLine;
            const isVideo = item.mediaType === "VIDEO" || item.is_video || item.videoUrl || item.video_url;

            return {
              id: item.id ? `feed-${item.id}` : `feed-${idx + 1}`,
              title: cleanTitle || "Kansotex Marrakech",
              description: caption.length > 150 ? caption.slice(0, 147) + "..." : caption,
              poster: item.thumbnailUrl || item.mediaUrl || item.image || item.poster || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp",
              videoSrc: item.videoUrl || item.video_url || undefined,
              instagramUrl: item.permalink || item.url || "https://www.instagram.com/kansotex/",
              category: "Instagram",
              duration: isVideo ? "Reel" : "Post",
              views: "Kansotex",
              publishedAt: item.timestamp || item.created_at,
            };
          });

          return NextResponse.json({
            success: true,
            isLive: true,
            source: "feed_url",
            account: "kansotex",
            count: reels.length,
            reels,
          });
        }
      }
    } catch (err: any) {
      console.warn("[Instagram Feed URL Warning]:", err?.message || err);
    }
  }

  // Fallback: Return curated Kansotex HD reels
  return NextResponse.json({
    success: true,
    isLive: false,
    source: "curated_fallback",
    account: "kansotex",
    count: CURATED_REELS.length,
    reels: CURATED_REELS,
    note: "To display live reels automatically from Meta, define INSTAGRAM_ACCESS_TOKEN or INSTAGRAM_FEED_URL in .env",
  });
}
