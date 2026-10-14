"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toTermina } from "@/lib/text";
import { useCurrency } from "@/lib/CurrencyContext";
import { ProductCard } from "@/components/ProductCard";

interface ProductItem {
  id: string;
  slug: string;
  nameFr: string;
  nameEn?: string | null;
  basePrice: number;
  type: string;
  image?: string | null;
  category?: {
    id?: string;
    slug?: string;
    nameFr?: string;
    nameEn?: string | null;
  } | null;
  metadata?: {
    composition?: string | null;
    martindale?: number | null;
    weight?: number | null;
  } | null;
}

interface PDPCrossSellingProps {
  currentProduct: ProductItem;
  allProducts: ProductItem[];
  locale?: string;
  isPro?: boolean;
}

export function PDPCrossSelling({
  currentProduct,
  allProducts,
  locale = "fr",
  isPro = false,
}: PDPCrossSellingProps) {
  const isEn = locale === "en";
  const { formatPrice } = useCurrency();
  const currentCatSlug = currentProduct.category?.slug?.toLowerCase() || "";

  // Smart algorithmic pairing: filter out current product and rugs/tapis
  const candidateProducts = allProducts.filter((p) => {
    if (p.id === currentProduct.id || p.slug === currentProduct.slug) return false;
    const cat = p.category?.slug?.toLowerCase() || "";
    const name = p.nameFr?.toLowerCase() || "";
    if (cat.includes("tapis") || name.includes("tapis")) return false;
    return true;
  });

  // Pairing logic:
  // 1. If Bed Linen -> Recommend Bath Linen, Table Linen, and alternative Bed Linen
  // 2. If Bath Linen -> Recommend Bathrobes/Towels and Bed Linen
  // 3. If Outdoor Fabric -> Recommend Indoor upholstery, Table linen, and cushions
  // 4. If Indoor Fabric -> Recommend Outdoor fabric, Bed sets, and accessories
  let pairedProducts: ProductItem[] = [];

  if (currentCatSlug.includes("linge-de-lit")) {
    const bath = candidateProducts.filter((p) => p.category?.slug?.includes("linge-de-bain"));
    const otherBed = candidateProducts.filter((p) => p.category?.slug?.includes("linge-de-lit"));
    const table = candidateProducts.filter((p) => p.category?.slug?.includes("linge-de-table"));
    pairedProducts = [...otherBed.slice(0, 2), ...bath.slice(0, 1), ...table.slice(0, 1)];
  } else if (currentCatSlug.includes("linge-de-bain")) {
    const otherBath = candidateProducts.filter((p) => p.category?.slug?.includes("linge-de-bain"));
    const bed = candidateProducts.filter((p) => p.category?.slug?.includes("linge-de-lit"));
    pairedProducts = [...otherBath.slice(0, 2), ...bed.slice(0, 2)];
  } else if (currentCatSlug.includes("outdoor")) {
    const indoor = candidateProducts.filter((p) => p.category?.slug?.includes("tissus-ameublement"));
    const otherOutdoor = candidateProducts.filter((p) => p.category?.slug?.includes("outdoor"));
    const table = candidateProducts.filter((p) => p.category?.slug?.includes("linge-de-table"));
    pairedProducts = [...otherOutdoor.slice(0, 2), ...indoor.slice(0, 1), ...table.slice(0, 1)];
  } else {
    // General / Indoor Fabric
    const outdoor = candidateProducts.filter((p) => p.category?.slug?.includes("outdoor"));
    const otherIndoor = candidateProducts.filter((p) => p.category?.slug?.includes("tissus-ameublement"));
    const bed = candidateProducts.filter((p) => p.category?.slug?.includes("linge-de-lit"));
    pairedProducts = [...otherIndoor.slice(0, 2), ...outdoor.slice(0, 1), ...bed.slice(0, 1)];
  }

  // If we don't have 4 yet, backfill with top candidates
  if (pairedProducts.length < 4) {
    for (const cand of candidateProducts) {
      if (!pairedProducts.some((p) => p.id === cand.id)) {
        pairedProducts.push(cand);
        if (pairedProducts.length >= 4) break;
      }
    }
  }

  const items = pairedProducts.slice(0, 4);
  if (items.length === 0) return null;

  // Curated Thematic Collections for bottom architectural exploration
  const collections = [
    {
      href: `/${locale}/univers/outdoor`,
      title: isEn ? "Outdoor & Terrace Fabrics" : "Tissus Outdoor & Terrasses",
      subtitle: isEn ? "Water-repellent fabrics & sunny riad banquettes" : "Toiles déperlantes, banquettes & salons d'été",
      tag: isEn ? "TERRACES & POOL" : "TERRASSES & RIADS",
      isProHighlight: false,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="4" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      ),
    },
    {
      href: `/${locale}/univers/indoor`,
      title: isEn ? "Indoor Fabrics, Linen & Velvet" : "Tissus d'Intérieur, Lin & Velours",
      subtitle: isEn ? "Heavy drapery, corduroy & Atlas upholstery" : "Draperies lourdes, velours côtelé & sièges",
      tag: isEn ? "LIVING & CURTAINS" : "AMEUBLEMENT & RIDEAUX",
      isProHighlight: false,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 18v3h16v-3M3 14a3 3 0 013-3h12a3 3 0 013 3v3H3zM6 11V6a2 2 0 012-2h8a2 2 0 012 2v5" />
        </svg>
      ),
    },
    {
      href: `/${locale}/univers/linge-de-lit`,
      title: isEn ? "Grand Luxury Hotel Bed Linen" : "Linge de Lit Hôtelier Grand Luxe",
      subtitle: isEn ? "Egyptian cotton percale & washed pure linen" : "Percale d'Égypte 400 fils & pur lin lavé",
      tag: isEn ? "SUITES & BEDROOMS" : "SUITES & GRAND HÔTEL",
      isProHighlight: false,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 19h20M2 15h20M4 15V7a2 2 0 012-2h12a2 2 0 012 2v8M6 9h4v2H6zm8 0h4v2h-4z" />
        </svg>
      ),
    },
    {
      href: `/${locale}/univers/linge-de-bain`,
      title: isEn ? "Spa & Wellness Bath Linen" : "Linge de Bain Spa & Wellness",
      subtitle: isEn ? "Combed cotton 600g/m² & luxury waffle bathrobes" : "Éponge peignée 600g/m² & peignoirs de riad",
      tag: isEn ? "BATH & WELLNESS" : "SPA & NID D'ABEILLE",
      isProHighlight: false,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6h6a3 3 0 013 3v8a2 2 0 01-2 2H8a2 2 0 01-2-2V9a3 3 0 013-3zM9 3v3m6-3v3" />
        </svg>
      ),
    },
    {
      href: `/${locale}/savoir-faire`,
      title: isEn ? "Marrakech Manufacture & Workshops" : "Manufacture & Ateliers Marrakech",
      subtitle: isEn ? "Straight-grain cutting, weighted hems & bespoke craft" : "Coupe au fil droit & confection sur-mesure",
      tag: isEn ? "ATELIER CRAFT" : "ATELIER SUR-MESURE",
      isProHighlight: false,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
        </svg>
      ),
    },
    {
      href: `/${locale}/pro`,
      title: isEn ? "Hospitality & Trade Portal" : "Portail Hôtellerie & Prescripteurs",
      subtitle: isEn ? "Trade discounts, 48h swatch box & express quotes" : "Remises éditeur directes & échantillons 48h",
      tag: isEn ? "PRO ACCESS" : "ESPACE ARCHITECTES B2B",
      isProHighlight: true,
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
        </svg>
      ),
    },
  ];

  return (
    <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#e8e2d5]">
      {/* ------------------------------------------------------------------ */}
      {/* 1. SECTION HEADER */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
            <span className="text-[9px] sm:text-[10px] font-termina tracking-[0.3em] uppercase text-[#938573] font-bold">
              {toTermina(isEn ? "Harmonious Combinations" : "Associations & Ventes Croisées")}
            </span>
          </div>
          <h3 className="font-termina uppercase text-xl sm:text-2xl md:text-3xl font-bold text-[#1c1b19] tracking-wide leading-tight">
            {toTermina(isEn ? "Complete the Ensemble" : "Compléter Votre Sélection")}
          </h3>
          <p className="text-xs sm:text-sm text-[#736b60] font-sans font-light mt-1.5 max-w-xl">
            {isEn
              ? "Recommended complementary textures, fabrics and linens curated by our interior stylists."
              : "Étoffes coordonnées, coussins et pièces de linge pensés pour dialoguer parfaitement ensemble."}
          </p>
        </div>

        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-[#1c1b19]/25 hover:border-[#1c1b19] bg-transparent text-[#1c1b19] hover:bg-[#1c1b19] hover:text-[#faf8f5] transition-all duration-300 text-[9.5px] sm:text-[10px] font-termina uppercase tracking-[0.2em] font-semibold group/btn shrink-0"
        >
          <span>{toTermina(isEn ? "View Complete Catalog" : "Voir Tout le Catalogue")}</span>
          <span className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
        </Link>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. REFINED LUXURY CARDS GRID (NO BACKGROUND, PRO & DETAILS)        */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-7">
        {items.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            locale={locale}
            isPro={isPro}
          />
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. ARCHITECTURAL DISCOVERY SECTION                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-[#e8e2d5]">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]" />
            <span className="text-[9px] font-termina uppercase tracking-[0.3em] text-[#938573] font-bold">
              {toTermina(isEn ? "Thematic Exploration & Universes" : "Exploration Thématique & Univers")}
            </span>
          </div>
          <h4 className="font-termina uppercase text-base sm:text-xl font-bold text-[#1c1b19] tracking-wide">
            {toTermina(isEn ? "Kansotex Textile House Collections" : "Les Grandes Collections de la Maison")}
          </h4>
          <p className="text-xs sm:text-sm text-[#736b60] font-sans font-light mt-1 max-w-2xl">
            {isEn
              ? "Navigate our editorial textile curations, from solar outdoor upholstery to grand hotel percale suites."
              : "Parcourez nos éditoriaux de matières, des toiles solaires d'extérieur aux parures de lit grand hôtel."}
          </p>
        </div>

        {/* 6 Luxury Universe Capsules Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {collections.map((col) => (
            <Link
              key={col.href}
              href={col.href}
              className={`group flex items-center justify-between p-3.5 sm:p-4 rounded-[16px] bg-transparent hover:bg-white/70 border transition-all duration-300 hover:shadow-xs hover:-translate-y-0.5 ${
                col.isProHighlight
                  ? "border-[#c5a880]/60 hover:border-[#1c1b19] bg-gradient-to-br from-[#c5a880]/10 to-transparent"
                  : "border-[#dfd8cc] hover:border-[#1c1b19]"
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                {/* Micro-Icon Box */}
                <div className={`w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
                  col.isProHighlight
                    ? "bg-[#c5a880]/15 text-[#8c7352] group-hover:bg-[#1c1b19] group-hover:text-[#faf8f5]"
                    : "bg-[#f4efe6] text-[#8c7a65] group-hover:bg-[#1c1b19] group-hover:text-[#faf8f5]"
                }`}>
                  {col.icon}
                </div>

                <div className="min-w-0">
                  <span className={`text-[8px] font-termina uppercase tracking-[0.2em] font-semibold block mb-0.5 truncate ${
                    col.isProHighlight ? "text-[#9d7d4f]" : "text-[#9c8e7c]"
                  }`}>
                    {toTermina(col.tag)}
                  </span>
                  <h5 className="font-termina uppercase text-[10px] sm:text-[11px] font-bold text-[#1c1b19] group-hover:text-[#8c7a65] transition-colors tracking-wide leading-tight truncate">
                    {toTermina(col.title)}
                  </h5>
                  <p className="text-[11px] font-sans text-[#787168] font-light mt-0.5 line-clamp-1">
                    {col.subtitle}
                  </p>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="w-6 h-6 rounded-full border border-[#ded6c7] group-hover:border-[#1c1b19] group-hover:bg-[#1c1b19] group-hover:text-white transition-all duration-300 flex items-center justify-center text-[#1c1b19] text-[10px] shrink-0 ml-2">
                <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PDPCrossSelling;
