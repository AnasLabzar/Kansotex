"use client";

import Link from "next/link";
import type { CatalogueDefinition } from "@/lib/catalogues-data";

export interface CatalogueHeroProps {
  catalogue: CatalogueDefinition;
  locale: string;
  whatsappUrl: string;
  onOpenDevis: () => void;
}

export interface HeroMood {
  image: string;
  proof: string;
}

export interface HeroData {
  isEn: boolean;
  title: string;
  headline: string;
  kicker: string;
  delivery: string;
  badges: CatalogueDefinition["badgesFr"];
  price: string;
  accent: string;
  mood: HeroMood;
}

const MOODS: Record<
  string,
  {
    image: string;
    proofFr: string;
    proofEn: string;
  }
> = {
  "linge-hotelier": {
    image: "/gallery/post-airbnb-kansotex.jpg",
    proofFr: "450+ Riads & Hôtels",
    proofEn: "450+ Riads & Hotels",
  },
  "collection-hiver": {
    image: "/gallery/post-hiver-couette-kansotex.jpg",
    proofFr: "192+ nuits au chaud",
    proofEn: "192+ cosy nights",
  },
  "collection-privee": {
    image: "/gallery/post-linge-lit-couette-kansotex.jpg",
    proofFr: "80+ Villas de Maître",
    proofEn: "80+ Master Villas",
  },
  "linge-de-bain": {
    image: "/gallery/post-airbnb-bain-kansotex.jpg",
    proofFr: "35 000+ serviettes livrées",
    proofEn: "35,000+ towels delivered",
  },
};

export function getHeroData(
  catalogue: CatalogueDefinition,
  locale: string,
  formattedPrice: string,
): HeroData {
  const isEn = locale === "en";
  const mood = MOODS[catalogue.slug] ?? MOODS["linge-de-bain"];

  return {
    isEn,
    title: isEn ? catalogue.titleEn : catalogue.titleFr,
    headline: isEn ? catalogue.headlineEn : catalogue.headlineFr,
    kicker: isEn ? catalogue.heroKickerEn : catalogue.heroKickerFr,
    delivery: isEn ? catalogue.deliveryPromiseEn : catalogue.deliveryPromiseFr,
    badges: isEn ? catalogue.badgesEn : catalogue.badgesFr,
    price: formattedPrice,
    accent: catalogue.accentColor || "#C26D43",
    mood: {
      image: mood.image,
      proof: isEn ? mood.proofEn : mood.proofFr,
    },
  };
}

export function HeroBreadcrumb({
  locale,
  title,
  tone = "ink",
}: {
  locale: string;
  title: string;
  tone?: "ink" | "light";
}) {
  const isEn = locale === "en";
  const muted = tone === "light" ? "text-white/50" : "text-[#1c1b19]/45";
  const separator = tone === "light" ? "text-white/25" : "text-[#1c1b19]/25";
  const strong = tone === "light" ? "text-white/80" : "text-[#1c1b19]/80";
  const hover = tone === "light" ? "hover:text-white" : "hover:text-[#1c1b19]";

  return (
    <nav
      aria-label={isEn ? "Breadcrumb" : "Fil d'Ariane"}
      className={`mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[10px] font-medium uppercase tracking-[0.18em] sm:mb-4 ${muted}`}
    >
      <Link href={`/${locale}`} className={`shrink-0 transition-colors ${hover}`}>
        {isEn ? "Home" : "Accueil"}
      </Link>
      <span className={`shrink-0 ${separator}`}>/</span>
      <Link href={`/${locale}/catalogues`} className={`shrink-0 transition-colors ${hover}`}>
        {isEn ? "Catalogues" : "Catalogues"}
      </Link>
      <span className={`shrink-0 ${separator}`}>/</span>
      <span className={strong}>{title}</span>
    </nav>
  );
}

export function Stars({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={className}>
      ★★★★★
    </span>
  );
}

export function ArrowGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function WhatsAppGlyph({ className = "" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
    </svg>
  );
}

