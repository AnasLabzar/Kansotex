import { db } from "@/prisma/db";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import AddToCartForm from "./AddToCartForm";
import { Header } from "@/components/Header";
import { getSession } from "@/lib/session";
import ImageGallery from "./ImageGallery";
import { ProductJsonLd } from "@/components/ProductJsonLd";
import { getTranslations } from "next-intl/server";
import { PDPTechnicalBadges } from "@/components/PDPTechnicalBadges";
import { PDPB2BBanner } from "@/components/PDPB2BBanner";
import { PDPAtelierBanner } from "@/components/PDPAtelierBanner";
import { PDPCrossSelling } from "@/components/PDPCrossSelling";
import { toTermina } from "@/lib/text";

export async function generateMetadata(props: { params: Promise<{ locale: string, slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  let product: any = null;
  try {
    product = await db.orm.public.Product.where({ slug: params.slug })
      .include("category")
      .include("metadata")
      .first();
  } catch (err: any) {
    try {
      const { fakeProducts } = await import("@/prisma/fakeData");
      product = fakeProducts.find((p) => p.slug === params.slug) || null;
    } catch {}
  }

  if (!product) {
    return { title: "Produit Introuvable | Kansotex" };
  }

  const isEn = params.locale === "en";
  const productName = isEn ? (product.nameEn || product.nameFr) : product.nameFr;
  const title = `${productName} — Kansotex In & Outdoor`;
  const description =
    (isEn ? (product.descriptionEn || product.descriptionFr) : product.descriptionFr) ||
    `Découvrez ${product.nameFr} chez Kansotex Marrakech. Étoffes haut de gamme et confection sur mesure.`;
  const categoryName = product.category
    ? (isEn ? product.category.nameEn || product.category.nameFr : product.category.nameFr)
    : "Tissus & Linge";

  const baseUrl = "https://kansotex.com";
  const canonicalUrl = `${baseUrl}/${params.locale}/products/${params.slug}`;

  const primaryImage = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `${baseUrl}${product.image.startsWith("/") ? "" : "/"}${product.image}`
    : `${baseUrl}/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png`;

  const keywords = [
    product.nameFr,
    categoryName,
    product.metadata?.composition || "Textile d'exception",
    "Kansotex Marrakech",
    "textile in and outdoor maroc",
    "ameublement hôtel riad",
    "confection sur mesure marrakech",
    "tissu au mètre",
  ];

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "fr-MA": `${baseUrl}/fr/products/${params.slug}`,
        "en-US": `${baseUrl}/en/products/${params.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Kansotex — In & Outdoor",
      locale: isEn ? "en_US" : "fr_FR",
      type: "website",
      images: [
        {
          url: primaryImage,
          width: 1200,
          height: 630,
          alt: title,
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

export default async function ProductPage(props: { params: Promise<{ locale: string, slug: string }> }) {
  const params = await props.params;
  const t = await getTranslations("Products");
  let product: any = null;
  try {
    product = await db.orm.public.Product.where({ slug: params.slug })
      .include("variants", (v) => v.include("dyeLots"))
      .include("metadata")
      .include("category")
      .first();
  } catch (err: any) {
    console.warn("ProductPage: Live DB unavailable, using local catalog fallback:", err?.message || err);
    try {
      const { fakeProducts } = await import("@/prisma/fakeData");
      product = fakeProducts.find((p) => p.slug === params.slug) || null;
    } catch {}
  }

  if (!product) {
    notFound();
  }

  let allProducts: any[] = [];
  try {
    allProducts = await db.orm.public.Product.where({ isActive: true })
      .include("category")
      .include("metadata")
      .all();
  } catch (err) {
    try {
      const { fakeProducts } = await import("@/prisma/fakeData");
      allProducts = fakeProducts;
    } catch {}
  }

  const session = await getSession();
  const isPro = session?.isPro;
  const discount = session?.tradeDiscount || 0;
  
  // Calcul du prix (HT si Pro)
  const isPromo = !isPro && product.type === "FINISHED_GOOD"; // Simulate a promo for normal users on finished goods
  const promoDiscount = isPromo ? 0.15 : 0; // 15% promo
  
  const discountAmount = isPro ? discount : promoDiscount;
  const finalPrice = product.basePrice * (1 - discountAmount);

  const productName = params.locale === 'en' ? (product.nameEn || product.nameFr) : product.nameFr;
  const categoryName = (params.locale === 'en' ? (product.category?.nameEn || product.category?.nameFr) : product.category?.nameFr) || "Produit";

  return (
    <main className="min-h-screen bg-cream text-ink selection:bg-ink selection:text-cream">
      {/* Schema.org Advanced Dynamic JSON-LD (Product & Offers & Specs & Breadcrumbs) */}
      <ProductJsonLd product={product as any} finalPrice={finalPrice} locale={params.locale} />

      {/* Navigation Header aligned with max-w-7xl container */}
      <Header overlay={false} />
      
      {/* Top Hero Section: ONLY the Left Product Image breaks out edge-to-edge */}
      <div className="flex flex-col lg:flex-row min-h-screen pt-[70px]">
        
        {/* Left Side: Product Image (Edge-to-Edge full bleed) */}
        <div className="w-full lg:w-[50%] xl:w-[52%] relative h-[60vh] lg:h-[calc(100vh-70px)] lg:sticky lg:top-[70px]">
          <ImageGallery 
            mainImage={product.image || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png"}
            gallery={[...(product.gallery || [])]}
            productName={productName}
          />
        </div>

        {/* Right Side: Purchase Buy Box (Price, Variants & Add to Cart visible above the fold!) */}
        <div className="w-full lg:w-[50%] xl:w-[48%] px-6 sm:px-10 lg:px-14 pb-20 pt-8 lg:pt-10 overflow-y-auto">
          <div className="max-w-xl mx-auto lg:mx-0 flex flex-col">
            
            {/* Breadcrumb */}
            <nav className="text-[9px] uppercase tracking-[0.25em] text-muted font-termina mb-5 flex items-center space-x-2.5">
              <a href="/products" className="hover:text-ink transition-colors">{toTermina(t("collection"))}</a>
              <span className="w-3.5 h-[1px] bg-muted/30"></span>
              <span className="text-ink">{toTermina(categoryName)}</span>
            </nav>

            {/* Title & Ref */}
            <div className="mb-4">
              <h1 className="font-termina uppercase font-bold text-2xl sm:text-3xl text-ink mb-1.5 leading-[1.2] tracking-wider">
                {toTermina(productName)}
              </h1>
              <p className="font-termina text-[9px] tracking-[0.2em] text-olive uppercase">
                {toTermina(t("ref"))} {toTermina(product.slug)}
              </p>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-muted font-sans font-light leading-relaxed mb-6 whitespace-pre-wrap">
              {(params.locale === 'en' ? (product.descriptionEn || product.descriptionFr) : product.descriptionFr) || t("notFound")}
            </p>

            {/* Add To Cart Form (Price is immediately at the top of this box!) */}
            <div className="w-full">
              <AddToCartForm 
                product={{...product, basePrice: finalPrice}} 
                originalPrice={product.basePrice}
                isPro={isPro ?? false}
                isPromo={isPromo}
                discountAmount={discountAmount}
              />
            </div>

            {/* Compact Specs Grid (Positioned cleanly below AddToCartForm so it doesn't push the price down!) */}
            <div className="mt-8 bg-white/40 p-5 border border-ink/10 rounded-xs shadow-xs">
              <h4 className="text-[9px] font-termina uppercase tracking-[0.25em] text-ink mb-3.5 font-bold">
                {toTermina("Caracteristiques & Matiere")}
              </h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs font-sans">
                {/* Catégorie */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{toTermina(t("category"))}</span>
                  <span className="text-ink font-light">{categoryName}</span>
                </div>
                {/* Unité */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{toTermina(t("saleUnit"))}</span>
                  <span className="text-ink font-light">{product.type === "FABRIC_BY_METER" ? t("linearMeter") : t("unit")}</span>
                </div>
                {/* Dimensions / Laize */}
                {product.metadata?.laize && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{toTermina(t("width"))}</span>
                    <span className="text-ink font-light">{product.metadata.laize} cm</span>
                  </div>
                )}
                {/* Poids */}
                {product.metadata?.weight && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{toTermina(t("weight"))}</span>
                    <span className="text-ink font-light">{product.metadata.weight} g/m²</span>
                  </div>
                )}
                {/* Martindale */}
                {product.metadata?.martindale && (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{toTermina("Martindale")}</span>
                    <span className="text-ink font-light">{product.metadata.martindale.toLocaleString()} Tours</span>
                  </div>
                )}
                {/* Composition */}
                {product.metadata?.composition && (
                  <div className="flex flex-col gap-0.5 col-span-2 pt-2 border-t border-ink/5">
                    <span className="text-[9px] font-termina text-muted tracking-wider uppercase">{toTermina(t("composition"))}</span>
                    <span className="text-ink font-light">{product.metadata.composition}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Care Icons */}
            <div className="mt-8 pt-6 border-t border-ink/10">
              <h4 className="text-[9px] font-termina uppercase tracking-widest text-ink mb-4 font-bold">
                {toTermina(t("care"))}
              </h4>
              <div className="flex flex-wrap gap-6 sm:gap-8">
                
                {/* Lavage 30 */}
                <div className="flex flex-col items-center gap-2 group">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-ink/70 group-hover:text-ink transition-colors">
                    <path d="M4.5 7h15l-2 11h-11z" />
                    <path d="M5.5 11h13" />
                    <text x="12" y="15.5" fontSize="4.5" textAnchor="middle" strokeWidth="0" fill="currentColor" fontFamily="sans-serif">30</text>
                  </svg>
                  <span className="text-[8px] font-termina uppercase tracking-wider text-ink/60 group-hover:text-ink transition-colors text-center">
                    {toTermina(t("careWash"))} 30°
                  </span>
                </div>

                {/* Pas de blanchiment */}
                <div className="flex flex-col items-center gap-2 group">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-ink/70 group-hover:text-ink transition-colors">
                    <polygon points="12 4 21 19 3 19" />
                    <path d="M7 8l10 10" />
                    <path d="M17 8l-10 10" />
                  </svg>
                  <span className="text-[8px] font-termina uppercase tracking-wider text-ink/60 group-hover:text-ink transition-colors text-center">
                    {toTermina(t("careBleach"))}
                  </span>
                </div>

                {/* Séchage machine */}
                <div className="flex flex-col items-center gap-2 group">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-ink/70 group-hover:text-ink transition-colors">
                    <rect x="5" y="5" width="14" height="14" rx="1.5" />
                    <circle cx="12" cy="12" r="4.5" />
                  </svg>
                  <span className="text-[8px] font-termina uppercase tracking-wider text-ink/60 group-hover:text-ink transition-colors text-center">
                    {toTermina(t("careDry"))}
                  </span>
                </div>

                {/* Nettoyage à sec */}
                <div className="flex flex-col items-center gap-2 group">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 text-ink/70 group-hover:text-ink transition-colors">
                    <circle cx="12" cy="12" r="7.5" />
                    <text x="12" y="14.2" fontSize="6.5" textAnchor="middle" strokeWidth="0" fill="currentColor" fontFamily="sans-serif">P</text>
                  </svg>
                  <span className="text-[8px] font-termina uppercase tracking-wider text-ink/60 group-hover:text-ink transition-colors text-center">
                    {toTermina(t("careDryClean"))}
                  </span>
                </div>

              </div>
            </div>
            
          </div>
        </div>

      </div>

      {/* ---------------------------------------------------------------------------------- */}
      {/* BELOW THE FOLD EDITORIAL SECTIONS (Inside standard max-w-7xl container)            */}
      {/* 1. Technical Badges (UV, Martindale, Lavage 90°C, Fibres nobles)                   */}
      {/* 2. Atelier & Manufacture Marrakech (Confection sur-mesure)                         */}
      {/* 3. B2B Trade Banner (Riads, Hôtels & Architectes)                                  */}
      {/* 4. Cross-Selling & Semantic SEO Internal Linking                                   */}
      {/* ---------------------------------------------------------------------------------- */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        
        {/* Section 1: Technical Performance & Standards Badges */}
        <PDPTechnicalBadges product={product as any} locale={params.locale} />

        {/* Section 2: Manufacture & Atelier Marrakech Reassurance */}
        <PDPAtelierBanner locale={params.locale} />

        {/* Section 3: B2B Hospitality Hub (Riads, Hôtels & Architectes) */}
        <PDPB2BBanner
          productName={productName}
          productSlug={product.slug}
          locale={params.locale}
          isFabric={product.type === "FABRIC_BY_METER"}
        />

        {/* Section 4: Smart Cross-Selling & Semantic SEO Internal Linking */}
        <PDPCrossSelling
          currentProduct={product as any}
          allProducts={allProducts as any}
          locale={params.locale}
          isPro={Boolean(isPro)}
        />
      </div>
    </main>
  );
}
