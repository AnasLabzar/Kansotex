"use client";

import Link from "next/link";
import { useCurrency } from "@/lib/CurrencyContext";
import { useTranslations, useLocale } from "next-intl";
import { UnderlineLink } from "@/components/UnderlineLink";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";

export function PopularProductsCarousel({ products, isPro, discount }: { products: any[], isPro: boolean, discount: number }) {
  const { formatPrice } = useCurrency();
  const t = useTranslations("Home");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

  const next = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const prev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="bg-[#f8f5f0] px-6 py-20 md:px-12 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="editorial text-4xl leading-tight md:text-5xl">
              {t("popularSalesTitle") || "Popular Sales"}
            </h2>
            <p className="mt-4 text-sm text-muted max-w-md">
              {t("popularSalesText") || "Discover our most requested fabrics and linens."}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={prev} className="p-3 rounded-full border border-ink/20 hover:bg-ink hover:text-cream transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button onClick={next} className="p-3 rounded-full border border-ink/20 hover:bg-ink hover:text-cream transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full">
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {products.map((product) => (
              <div key={product.id} className="min-w-[280px] md:min-w-[320px] w-[70vw] md:w-[320px] snap-start shrink-0">
                <Link href={`/products/${product.slug}`} className="group block">
                  <div className="aspect-[4/5] relative overflow-hidden bg-[#e8e4db] mb-4">
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
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <UnderlineLink href="/products" className="font-termina text-[11px] font-bold uppercase tracking-widest text-[#1c1b19]">
            {t("allProductsBtn") || "ALL PRODUCTS · DISCOVER"}
          </UnderlineLink>
        </div>
      </div>
    </section>
  );
}
