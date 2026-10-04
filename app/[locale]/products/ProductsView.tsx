"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { useCurrency } from "@/lib/CurrencyContext";
import { useTranslations, useLocale } from "next-intl";

type Product = any; // We'll pass the fetched product data

export function ProductsView({ products, isPro, discount }: { products: Product[], isPro: boolean, discount: number }) {
  const [activeCategory, setActiveCategory] = useState("TOUT");
  const [activeView, setActiveView] = useState("COLLECTION");
  const [columns, setColumns] = useState(3);
  const [filterOpen, setFilterOpen] = useState(false);
  const { formatPrice } = useCurrency();
  const t = useTranslations("ProductsView");
  const locale = useLocale();

  // Derive filtered products
  const filteredProducts = products.filter(p => {
    if (activeCategory === "TOUT") return true;
    if (activeCategory === "TISSU") return p.type === "FABRIC_BY_METER";
    if (activeCategory === "TAPIS") return p.categoryId === "cat-6";
    if (activeCategory === "LINGE DE LIT") return p.categoryId === "cat-1";
    if (activeCategory === "LINGE DE BAIN") return p.categoryId === "cat-2";
    if (activeCategory === "LINGE DE TABLE") return p.categoryId === "cat-3";
    return true;
  }).sort((a, b) => {
    if (activeView === "DESSIN") return a.nameFr.localeCompare(b.nameFr);
    return 0; // Default order
  });

  // For visual parity, we don't truncate arrays anymore for a specific category unless asked
  const finalProducts = filteredProducts;

  const getHeroContent = () => {
    switch(activeCategory) {
      case "LINGE DE LIT": return { title: t("bedLinen"), image: "/gallery/bed_set_percale_1791048617304.jpg" };
      case "LINGE DE BAIN": return { title: t("bathLinen"), image: "/gallery/bathrobe_velour_1791048626440.jpg" };
      case "LINGE DE TABLE": return { title: t("tableLinen"), image: "/gallery/tablecloth_linen_1791048647057.jpg" };
      case "TAPIS": return { title: t("rugs"), image: "/gallery/rug_beniouarain_1791049165733.jpg" };
      case "TISSU": return { title: t("fabric"), image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png" };
      case "TOUT": 
      default: 
        return { title: t("all"), image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png" };
    }
  }
  const heroContent = getHeroContent();

  return (
    <>
      {/* 1. Dynamic Hero Header Section */}
      <div className="w-full h-[40vh] md:h-[55vh] relative overflow-hidden bg-[#2a3c24]">
        <motion.img 
          key={heroContent.image}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 1 }}
          src={heroContent.image} 
          alt={heroContent.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.h1 
            key={heroContent.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-termina text-[8vw] sm:text-4xl md:text-6xl lg:text-7xl text-white tracking-[0.2em] uppercase text-center px-4 drop-shadow-xl"
          >
            {heroContent.title}
          </motion.h1>
        </div>
      </div>

      <div className="border-b border-ink/10 relative z-10 bg-cream">
        <div className="px-6 md:px-12 py-5 flex items-center gap-8 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {["TOUT", "TISSU", "TAPIS", "LINGE DE LIT", "LINGE DE BAIN", "LINGE DE TABLE"].map((cat) => {
            let label = t("all");
            if (cat === "TISSU") label = t("fabric");
            if (cat === "TAPIS") label = t("rugs");
            if (cat === "LINGE DE LIT") label = t("bedLinen");
            if (cat === "LINGE DE BAIN") label = t("bathLinen");
            if (cat === "LINGE DE TABLE") label = t("tableLinen");
            
            return (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-termina tracking-[0.2em] uppercase whitespace-nowrap transition-colors relative ${
                  activeCategory === cat ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {label}
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeCategory"
                  className="absolute bottom-[-22px] left-0 w-full h-[1px] bg-ink"
                />
              )}
            </button>
            );
          })}
        </div>
      </div>

      {/* 3. Action / Filter Bar */}
      <div className="px-6 md:px-12 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cream sticky top-[70px] z-30 border-b border-ink/5">
        {/* Left: Afficher Par */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-termina tracking-[0.2em] uppercase">
          <span className="text-ink">{t("sortBy")}</span>
          <button 
            onClick={() => setActiveView("COLLECTION")}
            className={activeView === "COLLECTION" ? "text-ink" : "text-[#c19a86] hover:text-ink transition-colors"}
          >
            {t("collection")}
          </button>
          <span className="text-ink/30">|</span>
          <button 
            onClick={() => setActiveView("DESSIN")}
            className={activeView === "DESSIN" ? "text-ink" : "text-[#c19a86] hover:text-ink transition-colors"}
          >
            {t("design")}
          </button>
        </div>

        {/* Right: View Toggles & Filter */}
        <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-ink/5">
          <div className="hidden sm:flex items-center gap-4 border-r border-ink/10 pr-6 mr-2">
            <div className="w-64">
              <SearchBar placeholder={t("search")} />
            </div>
          </div>
          
          <div className="hidden sm:flex items-center gap-3">
            {/* 2x2 Grid Icon */}
            <button 
              onClick={() => setColumns(2)}
              className={columns === 2 ? "text-[#c19a86]" : "text-ink/40 hover:text-ink transition-colors"}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="0" y="0" width="6" height="6" />
                <rect x="8" y="0" width="6" height="6" />
                <rect x="0" y="8" width="6" height="6" />
                <rect x="8" y="8" width="6" height="6" />
              </svg>
            </button>
            {/* 3x3 Grid Icon */}
            <button 
              onClick={() => setColumns(3)}
              className={columns === 3 ? "text-[#c19a86]" : "text-ink/40 hover:text-ink transition-colors"}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                <rect x="0" y="0" width="4" height="4" />
                <rect x="5" y="0" width="4" height="4" />
                <rect x="10" y="0" width="4" height="4" />
                <rect x="0" y="5" width="4" height="4" />
                <rect x="5" y="5" width="4" height="4" />
                <rect x="10" y="5" width="4" height="4" />
                <rect x="0" y="10" width="4" height="4" />
                <rect x="5" y="10" width="4" height="4" />
                <rect x="10" y="10" width="4" height="4" />
              </svg>
            </button>
          </div>
          
          <span className="hidden sm:block text-ink/20">|</span>

          <button 
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 text-[10px] font-termina tracking-[0.2em] uppercase text-[#47607c] hover:text-ink transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6" />
            </svg>
            {t("filter")}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar (Only visible on small screens) */}
      <div className="sm:hidden px-4 py-4 bg-[#f8f5f0] border-b border-ink/5">
        <SearchBar placeholder={t("searchProduct")} />
      </div>

      {/* 4. Product Grid */}
      <div className="px-4 sm:px-6 md:px-12 py-8 sm:py-10 pb-32">
        <div 
          className={`grid gap-x-4 sm:gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16 transition-all duration-500 grid-cols-1 sm:grid-cols-2 ${
            columns === 2 ? 'lg:grid-cols-2' : columns === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {finalProducts.map((product: any) => (
              <motion.div 
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                <Link 
                  href={`/products/${product.slug}`}
                  className="group block"
                >
                  <div className="aspect-[4/5] sm:aspect-square relative overflow-hidden bg-[#e8e4db] mb-4">
                    <img 
                      src={product.image || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png"}
                      alt={product.nameFr}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-sans text-lg text-ink font-normal truncate pr-4">
                        {locale === 'en' ? (product.nameEn || product.nameFr) : product.nameFr}
                      </h3>
                      <span className="font-sans text-sm text-ink font-light flex items-baseline gap-1 shrink-0">
                        {isPro ? (
                          <>
                            {formatPrice(product.basePrice * (1 - discount)).value} 
                            <span className="font-sans text-xs font-medium">{formatPrice(product.basePrice).symbol}</span>
                            <span className="text-[10px] text-muted ml-1">HT</span>
                          </>
                        ) : (
                          <>
                            {formatPrice(product.basePrice).value}
                            <span className="font-sans text-xs font-medium">{formatPrice(product.basePrice).symbol}</span>
                          </>
                        )}
                      </span>
                    </div>
                    <p className="text-[11px] font-termina tracking-widest uppercase text-muted">
                      REF. {product.slug}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {finalProducts.length === 0 && (
          <div className="text-center py-32">
            <h2 className="text-2xl font-light text-muted">{t("noProducts")}</h2>
          </div>
        )}
      </div>

      {/* FILTER SLIDE-OVER DRAWER */}
      <AnimatePresence>
        {filterOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-[70]"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-[400px] bg-cream shadow-2xl z-[80] flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-ink/10">
                <h3 className="font-termina text-[11px] uppercase tracking-widest text-ink font-bold">{t("filters")}</h3>
                <button onClick={() => setFilterOpen(false)} className="text-ink/50 hover:text-ink">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-8 font-sans text-sm font-light">
                {/* Mock Filters to show professionalism */}
                <div>
                  <h4 className="font-termina text-[10px] uppercase tracking-widest text-ink mb-4">{t("colorFamily")}</h4>
                  <div className="flex gap-3 flex-wrap">
                    {["#e8e4db", "#1c1b19", "#8B4513", "#2a3c24", "#4A5D23"].map((color, i) => (
                      <button key={i} className="w-8 h-8 rounded-full border border-ink/20 hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>
                <div className="border-t border-ink/10 pt-8">
                  <h4 className="font-termina text-[10px] uppercase tracking-widest text-ink mb-4">{t("use")}</h4>
                  <div className="space-y-3 text-ink/70">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-ink">
                      <input type="checkbox" className="accent-ink" /> {t("curtain")}
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-ink">
                      <input type="checkbox" className="accent-ink" /> {t("seating")}
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-ink">
                      <input type="checkbox" className="accent-ink" /> {t("outdoor")}
                    </label>
                  </div>
                </div>
                <div className="border-t border-ink/10 pt-8">
                  <h4 className="font-termina text-[10px] uppercase tracking-widest text-ink mb-4">{t("properties")}</h4>
                  <div className="space-y-3 text-ink/70">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-ink">
                      <input type="checkbox" className="accent-ink" /> {t("fireRetardant")}
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-ink">
                      <input type="checkbox" className="accent-ink" /> {t("waterRepellent")}
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-ink/10">
                <button onClick={() => setFilterOpen(false)} className="w-full bg-ink text-cream py-4 font-termina text-[10px] uppercase tracking-[0.2em] hover:bg-olive transition-colors">
                  {t("applyFilters")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
