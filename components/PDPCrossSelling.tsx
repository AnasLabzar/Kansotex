import React from "react";
import Link from "next/link";
import Image from "next/image";

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

  return (
    <section className="mt-20 pt-16 border-t border-ink/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <span className="text-[9px] font-termina tracking-[0.3em] uppercase text-olive font-bold block mb-1">
            {isEn ? "Harmonious Combinations" : "Associations & Ventes Croisées"}
          </span>
          <h3 className="font-termina uppercase text-2xl font-bold text-ink tracking-wide">
            {isEn ? "Complete the Ensemble" : "Compléter Votre Sélection"}
          </h3>
          <p className="text-xs text-muted font-sans font-light mt-1">
            {isEn
              ? "Recommended complementary textures, fabrics and linens curated by our interior stylists."
              : "Étoffes coordonnées, coussins et pièces de linge pensés pour dialoguer parfaitement ensemble."}
          </p>
        </div>

        <Link
          href={`/${locale}/products`}
          className="text-[9px] font-termina uppercase tracking-widest text-ink font-bold underline underline-offset-4 hover:text-olive transition-colors shrink-0"
        >
          {isEn ? "View Complete Catalog →" : "Voir Tout le Catalogue →"}
        </Link>
      </div>

      {/* Grid of Recommended Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {items.map((item) => {
          const itemName = isEn ? item.nameEn || item.nameFr : item.nameFr;
          const categoryName = item.category
            ? isEn ? item.category.nameEn || item.category.nameFr : item.category.nameFr
            : "";
          const isItemFabric = item.type === "FABRIC_BY_METER";
          const imageSrc = item.image || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp";

          return (
            <Link
              key={item.id}
              href={`/${locale}/products/${item.slug}`}
              className="group flex flex-col bg-white/40 border border-ink/5 p-3 rounded-xs hover:border-ink/20 transition-all hover:shadow-sm"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-[#e8e4db] mb-3 rounded-xs">
                <Image
                  src={imageSrc}
                  alt={itemName}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 text-[8px] font-termina uppercase tracking-wider bg-cream/90 text-ink px-1.5 py-0.5 rounded-xs backdrop-blur-xs">
                  {isItemFabric ? (isEn ? "By Meter" : "Au Mètre") : (isEn ? "Finished" : "Pièce")}
                </span>
              </div>

              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <span className="text-[8px] font-termina uppercase tracking-wider text-muted block mb-0.5 truncate">
                    {categoryName}
                  </span>
                  <h4 className="font-sans text-sm font-medium text-ink group-hover:text-olive transition-colors line-clamp-1">
                    {itemName}
                  </h4>
                  {item.metadata?.composition && (
                    <p className="text-[10px] text-muted font-sans font-light truncate mt-0.5">
                      {item.metadata.composition}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-ink/5 flex items-baseline justify-between">
                  <span className="font-sans text-xs font-semibold text-ink">
                    {item.basePrice.toLocaleString(isEn ? "en-US" : "fr-FR", { minimumFractionDigits: 2 })} MAD
                  </span>
                  <span className="text-[9px] font-termina uppercase text-muted">
                    {isItemFabric ? (isEn ? "/ meter" : "/ m") : (isEn ? "/ unit" : "/ unité")}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* Maillage Interne Sémantique (SEO Contextual Links to Universes) */}
      {/* --------------------------------------------------------------------- */}
      <div className="mt-12 pt-8 border-t border-ink/5 bg-cream/50 p-6 rounded-xs">
        <span className="text-[9px] font-termina uppercase tracking-[0.25em] text-muted font-bold block mb-3">
          {isEn ? "Explore Kansotex Universes & Collections" : "Explorer les Univers & Matières Kansotex"}
        </span>
        <div className="flex flex-wrap gap-2.5">
          <Link
            href={`/${locale}/univers/outdoor`}
            className="text-[9px] font-termina uppercase tracking-wider bg-white/70 border border-ink/10 px-3 py-1.5 rounded-xs text-ink hover:bg-ink hover:text-cream transition-colors"
          >
            {isEn ? "Outdoor Fabrics & Riads Terraces" : "Tissus Outdoor & Terrasses de Riad"}
          </Link>
          <Link
            href={`/${locale}/univers/indoor`}
            className="text-[9px] font-termina uppercase tracking-wider bg-white/70 border border-ink/10 px-3 py-1.5 rounded-xs text-ink hover:bg-ink hover:text-cream transition-colors"
          >
            {isEn ? "Indoor Upholstery & Velvet" : "Tissus d'Intérieur, Lin & Velours"}
          </Link>
          <Link
            href={`/${locale}/univers/linge-de-lit`}
            className="text-[9px] font-termina uppercase tracking-wider bg-white/70 border border-ink/10 px-3 py-1.5 rounded-xs text-ink hover:bg-ink hover:text-cream transition-colors"
          >
            {isEn ? "Luxury Bed Linen (Percale & Satin)" : "Linge de Lit Hôtelier (Lin & Percale)"}
          </Link>
          <Link
            href={`/${locale}/univers/linge-de-bain`}
            className="text-[9px] font-termina uppercase tracking-wider bg-white/70 border border-ink/10 px-3 py-1.5 rounded-xs text-ink hover:bg-ink hover:text-cream transition-colors"
          >
            {isEn ? "Resort Bath & Spa Linens 600g/m²" : "Linge de Bain Spa 600g/m²"}
          </Link>
          <Link
            href={`/${locale}/savoir-faire`}
            className="text-[9px] font-termina uppercase tracking-wider bg-white/70 border border-ink/10 px-3 py-1.5 rounded-xs text-ink hover:bg-ink hover:text-cream transition-colors"
          >
            {isEn ? "Marrakech Confection Atelier" : "Manufacture & Atelier Marrakech"}
          </Link>
          <Link
            href={`/${locale}/pro`}
            className="text-[9px] font-termina uppercase tracking-wider bg-olive/10 border border-olive/30 px-3 py-1.5 rounded-xs text-olive font-bold hover:bg-olive hover:text-cream transition-colors"
          >
            {isEn ? "Trade & Hospitality B2B" : "Portail Hôtellerie & Riads B2B"}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PDPCrossSelling;
