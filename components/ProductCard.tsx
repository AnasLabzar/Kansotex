"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toTermina } from "@/lib/text";
import { useCurrency } from "@/lib/CurrencyContext";

export interface ProductCardItem {
  id: string;
  slug: string;
  nameFr: string;
  nameEn?: string | null;
  basePrice: number;
  type?: string;
  image?: string | null;
  categoryId?: string | null;
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

interface ProductCardProps {
  product: ProductCardItem;
  locale?: string;
  isPro?: boolean;
  discount?: number;
  priority?: boolean;
}

export function ProductCard({
  product,
  locale = "fr",
  isPro = false,
  discount = 0,
  priority = false,
}: ProductCardProps) {
  const isEn = locale === "en";
  const { formatPrice } = useCurrency();

  const isItemFabric = product.type === "FABRIC_BY_METER";
  const displayName = isEn ? product.nameEn || product.nameFr : product.nameFr;
  const imageSrc = product.image || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp";

  // Derive Category Name
  const getCategoryName = () => {
    if (product.category) {
      return isEn ? product.category.nameEn || product.category.nameFr : product.category.nameFr;
    }
    const catId = product.categoryId || "";
    const slug = (product.slug || "").toLowerCase();
    if (catId === "cat-1" || slug.includes("lit") || slug.includes("parure") || slug.includes("couette")) {
      return isEn ? "Bed Linen" : "Linge de Lit";
    }
    if (catId === "cat-2" || slug.includes("bain") || slug.includes("peignoir") || slug.includes("serviette")) {
      return isEn ? "Bath Linen" : "Linge de Bain";
    }
    if (catId === "cat-3" || slug.includes("table") || slug.includes("nappe")) {
      return isEn ? "Table Linen" : "Linge de Table";
    }
    if (catId === "cat-4" || slug.includes("velours") || slug.includes("lin") || slug.includes("ameublement")) {
      return isEn ? "Upholstery Fabrics" : "Tissus d'Ameublement";
    }
    if (catId === "cat-5" || slug.includes("outdoor") || slug.includes("toile")) {
      return isEn ? "Outdoor Fabrics" : "Tissus Outdoor";
    }
    return isItemFabric ? (isEn ? "Fine Fabrics" : "Étoffes d'Édition") : (isEn ? "Home Linen" : "Linge de Maison");
  };

  const categoryName = getCategoryName() || "Haute Décoration";

  // Derive Rich Composition & Texture Detail
  const getProductDetail = () => {
    if (product.metadata?.composition) return product.metadata.composition;
    const slug = (product.slug || "").toLowerCase();
    if (slug.includes("peignoir")) return "100% Coton Peigné 450g/m² · Col Châle";
    if (slug.includes("serviette") || slug.includes("spa")) return "100% Coton Égyptien 600g/m² · Bouclette Riad";
    if (slug.includes("satin")) return "100% Satin de Coton · Tissage 500 Fils";
    if (slug.includes("lin")) return "100% Pur Lin Français Lavé · Finition Frangée";
    if (slug.includes("percale")) return "100% Percale de Coton · 300 Fils Fraîcheur";
    if (slug.includes("nappe")) return "Lin & Coton d'Atlas · Ourlet Piqué Main";
    if (slug.includes("outdoor")) return "100% Acrylique Teint Masse · Traitement Téflon";
    if (isItemFabric) return "Tissage artisanal noble · Grande largeur 140-300cm";
    return "Confection atelier sur-mesure · Manufacture Marrakech";
  };

  // Technical Badge
  const getTechnicalBadge = () => {
    if (product.metadata?.weight) return `${product.metadata.weight} g/m²`;
    if (product.metadata?.martindale) return `${product.metadata.martindale.toLocaleString()} Tours`;
    return isItemFabric ? "Usage Siège & Rideaux" : "Haute Confection Atelier";
  };

  // Calculate Price
  const effectivePrice = isPro && discount > 0 ? product.basePrice * (1 - discount) : product.basePrice;
  const priceObj = formatPrice(effectivePrice);

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      className="group relative flex flex-col bg-transparent transition-all duration-300"
    >
      {/* Product Visual Container (No white card container) */}
      <div className="aspect-[4/5] relative overflow-hidden bg-[#e8e4db] rounded-[18px] sm:rounded-[22px] mb-3.5 border border-[#ded6c7]/80 group-hover:border-[#c5a880]/70 transition-all duration-500 shadow-2xs group-hover:shadow-md">
        <Image
          src={imageSrc}
          alt={displayName}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-106"
        />

        {/* Subtle Ambient Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Refined Type Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="backdrop-blur-md bg-[#faf8f5]/90 text-[#1c1b19] border border-[#1c1b19]/10 text-[8px] sm:text-[8.5px] font-bold px-2.5 py-1 rounded-full shadow-2xs flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] shrink-0" />
            <span className="font-termina uppercase tracking-[0.2em]">
              {toTermina(isItemFabric ? (isEn ? "Au Mètre" : "Au Mètre") : (isEn ? "Pièce" : "Pièce"))}
            </span>
          </span>
        </div>

        {/* Quick Action Pill on Hover */}
        <div className="absolute bottom-3 inset-x-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
          <div className="bg-[#1c1b19]/90 backdrop-blur-md text-[#faf8f5] text-[9px] font-termina uppercase tracking-[0.22em] font-medium py-2 rounded-full text-center flex items-center justify-center gap-1.5 shadow-md">
            <span>{isEn ? "Découvrir la pièce" : "Découvrir la pièce"}</span>
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </div>
        </div>
      </div>

      {/* Product Metadata & Price */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-[9px] font-semibold mb-1">
            <span className="font-termina uppercase tracking-[0.24em] text-[#938573] truncate">
              {toTermina(categoryName)}
            </span>
            <span className="text-[8.5px] font-sans uppercase tracking-widest text-[#a89d8d] shrink-0 font-medium">
              {isItemFabric ? "Édition B2B" : "Manufacture"}
            </span>
          </div>

          <h3 className="font-sans text-[14px] sm:text-[15px] font-semibold text-[#1c1b19] group-hover:text-[#8c7352] transition-colors line-clamp-1 leading-snug">
            {displayName}
          </h3>

          <p className="text-[11.5px] sm:text-[12px] font-sans text-[#787168] font-light line-clamp-1 mt-1">
            {getProductDetail()}
          </p>

          {/* Technical Spec Badge */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            <span className="inline-flex items-center text-[9.5px] font-sans text-[#7a7266] bg-[#eae4d8]/60 px-2 py-0.5 rounded-md border border-[#ded6c7]">
              {getTechnicalBadge()}
            </span>
            <span className="inline-flex items-center text-[9.5px] font-sans text-[#7a7266] bg-[#eae4d8]/60 px-2 py-0.5 rounded-md border border-[#ded6c7]">
              Marrakech
            </span>
          </div>
        </div>

        <div className="mt-3.5 pt-2.5 border-t border-[#ded6c7] flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="font-sans text-[15px] sm:text-[16px] font-bold text-[#1c1b19] tracking-tight">
              {priceObj.value}
            </span>
            <span className="font-sans text-[11px] font-semibold text-[#1c1b19]/80 uppercase">
              {priceObj.symbol}
            </span>
            {isPro && (
              <span className="text-[10px] text-[#938573] font-sans ml-1 font-medium">HT</span>
            )}
          </div>
          <div className="text-[9.5px] tracking-wider text-[#938573] font-semibold flex items-baseline gap-1">
            <span className="font-sans">/</span>
            <span className="font-termina uppercase">
              {toTermina(isItemFabric ? (isEn ? "m" : "m") : (isEn ? "pièce" : "pièce"))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
