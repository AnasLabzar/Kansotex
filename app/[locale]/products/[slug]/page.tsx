import { db } from "@/prisma/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import AddToCartForm from "./AddToCartForm";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/session";
import ImageGallery from "./ImageGallery";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const product = await db.orm.public.Product.where({ slug: params.slug }).first();
  if (!product) {
    return { title: "Produit Introuvable | Kansotex" };
  }
  return {
    title: `${params.locale === 'en' ? (product.nameEn || product.nameFr) : product.nameFr} - Kansotex`,
    description: (params.locale === 'en' ? (product.descriptionEn || product.descriptionFr) : product.descriptionFr) || `Découvrez ${product.nameFr} chez Kansotex.`,
  };
}

import { getTranslations } from "next-intl/server";

export default async function ProductPage(props: { params: Promise<{ locale: string, slug: string }> }) {
  const params = await props.params;
  const t = await getTranslations("Products");
  const product = await db.orm.public.Product.where({ slug: params.slug })
    .include("variants", (v) => v.include("dyeLots"))
    .include("metadata")
    .include("category")
    .first();

  if (!product) {
    notFound();
  }

  const session = await getSession();
  const isPro = session?.isPro;
  const discount = session?.tradeDiscount || 0;
  
  // Calcul du prix (HT si Pro)
  const isPromo = !isPro && product.type === "FINISHED_GOOD"; // Simulate a promo for normal users on finished goods
  const promoDiscount = isPromo ? 0.15 : 0; // 15% promo
  
  const discountAmount = isPro ? discount : promoDiscount;
  const finalPrice = product.basePrice * (1 - discountAmount);

  return (
    <main className="min-h-screen bg-cream text-ink selection:bg-ink selection:text-cream">
      <Header overlay={false} />
      
      {/* pt-[70px] to clear the minimal header height */}
      <div className="flex flex-col lg:flex-row min-h-screen pt-[70px]">
        
        {/* Left Side: Image Presentation (Edge-to-Edge) */}
        <div className="w-full lg:w-[55%] relative h-[60vh] lg:h-[calc(100vh-70px)] lg:sticky lg:top-[70px]">
          
          <ImageGallery 
            mainImage={product.image || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png"}
            gallery={[...(product.gallery || [])]}
            productName={params.locale === 'en' ? (product.nameEn || product.nameFr) : product.nameFr}
          />
        </div>

        {/* Right Side: High Density Data Interface */}
        <div className="w-full lg:w-[45%] px-6 pb-24 pt-8 lg:px-16 lg:pt-12 lg:pb-24 overflow-y-auto">
          <div className="max-w-xl mx-auto lg:mx-0 flex flex-col">
            
            {/* Breadcrumb */}
            <nav className="text-[9px] uppercase tracking-[0.3em] text-muted font-termina mb-6 flex items-center space-x-3">
              <a href="/products" className="hover:text-ink transition-colors">{t("collection")}</a>
              <span className="w-4 h-[1px] bg-muted/30"></span>
              <span className="text-ink">{(params.locale === 'en' ? (product.category?.nameEn || product.category?.nameFr) : product.category?.nameFr) || "Produit"}</span>
            </nav>

            <div className="flex justify-between items-start mb-6">
              <div>
                {/* Title */}
                <h1 className="font-termina uppercase font-bold text-2xl lg:text-3xl text-ink mb-2 leading-[1.2] tracking-wider">
                  {params.locale === 'en' ? (product.nameEn || product.nameFr) : product.nameFr}
                </h1>
                {/* Reference */}
                <p className="font-termina text-[9px] tracking-[0.2em] text-olive uppercase">
                  {t("ref")} {product.slug}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted font-sans font-light leading-relaxed mb-10 whitespace-pre-wrap">
              {(params.locale === 'en' ? (product.descriptionEn || product.descriptionFr) : product.descriptionFr) || t("notFound")}
            </p>

            {/* Compact Specs Grid (Max Data UI) */}
            <div className="mb-10 bg-white/30 p-6 border border-ink/5">
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-xs font-sans">
                {/* Catégorie */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{t("category")}</span>
                  <span className="text-ink font-light">{(params.locale === 'en' ? (product.category?.nameEn || product.category?.nameFr) : product.category?.nameFr) || "Général"}</span>
                </div>
                {/* Unité */}
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{t("saleUnit")}</span>
                  <span className="text-ink font-light">{product.type === "FABRIC_BY_METER" ? t("linearMeter") : t("unit")}</span>
                </div>
                {/* Dimensions */}
                {product.metadata?.laize && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{t("width")}</span>
                    <span className="text-ink font-light">{product.metadata.laize} cm</span>
                  </div>
                )}
                {/* Poids */}
                {product.metadata?.weight && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{t("weight")}</span>
                    <span className="text-ink font-light">{product.metadata.weight} g/m²</span>
                  </div>
                )}
                {/* Raccord */}
                {(product.metadata?.raccordV! > 0 || product.metadata?.raccordH! > 0) && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{t("repeat")}</span>
                    <span className="text-ink font-light">
                      {product.metadata?.raccordV ? `V: ${product.metadata.raccordV}cm ` : ""}
                      {product.metadata?.raccordH ? `H: ${product.metadata.raccordH}cm` : ""}
                    </span>
                  </div>
                )}
                {/* Martindale */}
                {product.metadata?.martindale && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-termina text-muted tracking-wider uppercase">Martindale</span>
                    <span className="text-ink font-light">{product.metadata.martindale.toLocaleString()} T</span>
                  </div>
                )}
                {/* Composition */}
                {product.metadata?.composition && (
                  <div className="flex flex-col gap-1 col-span-2 mt-2 pt-4 border-t border-ink/5">
                    <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{t("composition")}</span>
                    <span className="text-ink font-light">{product.metadata.composition}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Add To Cart Form with Embedded Price */}
            <div className="w-full">
              <AddToCartForm 
                product={{...product, basePrice: finalPrice}} 
                originalPrice={product.basePrice}
                isPro={isPro ?? false}
                isPromo={isPromo}
                discountAmount={discountAmount}
              />
            </div>

            {/* Care Instructions - Pro Layout */}
            <div className="mt-12 pt-8 border-t border-ink/10">
              <h4 className="text-[10px] font-termina uppercase tracking-widest text-ink mb-6">{t("care")}</h4>
              <div className="flex flex-wrap gap-8">
                
                {/* Lavage 30 */}
                <div className="flex flex-col items-center gap-3 group">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-ink/70 group-hover:text-ink transition-colors">
                    <path d="M4.5 7h15l-2 11h-11z" />
                    <path d="M5.5 11h13" />
                    <text x="12" y="15.5" fontSize="4.5" textAnchor="middle" strokeWidth="0" fill="currentColor" fontFamily="sans-serif">30</text>
                  </svg>
                  <span className="text-[8px] font-termina uppercase tracking-widest text-ink/50 group-hover:text-ink transition-colors text-center w-20">{t("careWash")} 30</span>
                </div>

                {/* Pas de blanchiment */}
                <div className="flex flex-col items-center gap-3 group">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-ink/70 group-hover:text-ink transition-colors">
                    <polygon points="12 4 21 19 3 19" />
                    <path d="M7 8l10 10" />
                    <path d="M17 8l-10 10" />
                  </svg>
                  <span className="text-[8px] font-termina uppercase tracking-widest text-ink/50 group-hover:text-ink transition-colors text-center w-20">{t("careBleach")}</span>
                </div>

                {/* Séchage machine */}
                <div className="flex flex-col items-center gap-3 group">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-ink/70 group-hover:text-ink transition-colors">
                    <rect x="5" y="5" width="14" height="14" rx="1.5" />
                    <circle cx="12" cy="12" r="4.5" />
                  </svg>
                  <span className="text-[8px] font-termina uppercase tracking-widest text-ink/50 group-hover:text-ink transition-colors text-center w-20">{t("careDry")}</span>
                </div>

                {/* Nettoyage à sec */}
                <div className="flex flex-col items-center gap-3 group">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-ink/70 group-hover:text-ink transition-colors">
                    <circle cx="12" cy="12" r="7.5" />
                    <text x="12" y="14.2" fontSize="6.5" textAnchor="middle" strokeWidth="0" fill="currentColor" fontFamily="sans-serif">P</text>
                  </svg>
                  <span className="text-[8px] font-termina uppercase tracking-widest text-ink/50 group-hover:text-ink transition-colors text-center w-20">{t("careDryClean")}</span>
                </div>

              </div>
            </div>
            
          </div>
        </div>

      </div>
    </main>
  );
}
