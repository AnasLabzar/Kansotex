"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import { SearchBar } from "@/components/SearchBar";
import { toTermina } from "@/lib/text";

const ROTATING_CTA_FR = ["Devis", "Concierge", "Contact"];
const ROTATING_CTA_EN = ["Quote", "Concierge", "Contact"];

export function MobileAppBottomNav() {
  const pathname = usePathname();
  let rawLocale = "fr";
  try {
    rawLocale = useLocale();
  } catch {
    rawLocale = pathname?.startsWith("/en") ? "en" : "fr";
  }
  const isEn = rawLocale === "en" || pathname?.startsWith("/en");
  const locale = isEn ? "en" : "fr";

  const { cartCount, openCart } = useCart();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [ctaIndex, setCtaIndex] = useState(0);

  const rotatingLabels = isEn ? ROTATING_CTA_EN : ROTATING_CTA_FR;

  // Rotate the mobile CTA label
  useEffect(() => {
    const timer = setInterval(() => {
      setCtaIndex((prev) => (prev + 1) % rotatingLabels.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [rotatingLabels.length]);

  // Close search sheet when route changes
  useEffect(() => {
    setSearchModalOpen(false);
  }, [pathname]);

  const isHome = pathname === `/${locale}` || pathname === "/" || pathname === `/${locale}/`;
  const isProducts = pathname?.includes("/products") || pathname?.includes("/univers");
  const isBlog = pathname?.includes("/blog");

  // If on checkout, hide bottom nav to avoid cart distraction
  if (pathname?.includes("/checkout")) {
    return null;
  }

  return (
    <>
      {/* ============================================================ */}
      {/* 1. ULTRA-LUXURY GLASS FLOATING MOBILE APP BAR                */}
      {/* ============================================================ */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#181614]/94 backdrop-blur-2xl border-t border-white/10 text-[#f3eee6] shadow-[0_-8px_32px_rgba(0,0,0,0.5)] transition-all"
        style={{
          paddingBottom: "max(0.6rem, env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="max-w-md mx-auto px-3 pt-2 pb-1 flex items-center justify-between gap-1">
          
          {/* TAB 1: HOME */}
          <Link
            href={`/${locale}`}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
              isHome ? "text-[#B8860B]" : "text-white/65 hover:text-white"
            }`}
          >
            <div className="relative">
              <svg
                className="w-5 h-5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={isHome ? "2" : "1.6"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {isHome && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B8860B]" />
              )}
            </div>
            <span className="text-[9.5px] font-sans font-medium tracking-wide mt-1">
              {isEn ? "Home" : "Accueil"}
            </span>
          </Link>

          {/* TAB 2: FABRICS / CATALOG */}
          <Link
            href={`/${locale}/products`}
            className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
              isProducts ? "text-[#B8860B]" : "text-white/65 hover:text-white"
            }`}
          >
            <div className="relative">
              <svg
                className="w-5 h-5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={isProducts ? "2" : "1.6"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              {isProducts && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#B8860B]" />
              )}
            </div>
            <span className="text-[9.5px] font-sans font-medium tracking-wide mt-1">
              {isEn ? "Fabrics" : "Tissus"}
            </span>
          </Link>

          {/* TAB 3: SEARCH (Triggers Bottom Sheet Modal) */}
          <button
            type="button"
            onClick={() => setSearchModalOpen(true)}
            className="flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-white/65 hover:text-white transition-all cursor-pointer outline-none"
            aria-label={isEn ? "Search catalog" : "Rechercher un tissu"}
          >
            <div className="relative">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <span className="text-[9.5px] font-sans font-medium tracking-wide mt-1">
              {isEn ? "Search" : "Recherche"}
            </span>
          </button>

          {/* TAB 4: CART (With Reactive Counter Badge) */}
          <button
            type="button"
            onClick={openCart}
            className="relative flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl text-white/65 hover:text-white transition-all cursor-pointer outline-none"
            aria-label={isEn ? "Shopping Bag" : "Panier"}
          >
            <div className="relative">
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 min-w-[17px] h-[17px] px-1 rounded-full bg-[#B8860B] text-[#141413] text-[9.5px] font-bold flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[9.5px] font-sans font-medium tracking-wide mt-1">
              {isEn ? "Cart" : "Panier"}
            </span>
          </button>

          {/* TAB 5: DYNAMIC ROTATING ACTION CTA (CONCIERGERIE / DEVIS) */}
          <Link
            href={`/${locale}/contact`}
            className="flex-1 max-w-[85px] py-1.5 px-2 rounded-full bg-gradient-to-r from-[#B8860B] to-[#cf9e2e] text-[#141413] flex flex-col items-center justify-center shadow-md active:scale-95 transition-all text-center"
            title={isEn ? "Request a bespoke quote or concierge" : "Demander un devis ou conciergerie"}
          >
            <span className="w-1 h-1 rounded-full bg-[#141413] mb-0.5 animate-pulse" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={rotatingLabels[ctaIndex]}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -3 }}
                transition={{ duration: 0.2 }}
                className="text-[9px] font-sans font-bold uppercase tracking-wider truncate w-full"
              >
                {rotatingLabels[ctaIndex]}
              </motion.span>
            </AnimatePresence>
          </Link>

        </div>
      </nav>

      {/* ============================================================ */}
      {/* 2. QUICK SEARCH BOTTOM SHEET MODAL (SLIDE UP)                */}
      {/* ============================================================ */}
      <AnimatePresence>
        {searchModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setSearchModalOpen(false)}
            />

            {/* Slide-Up Search Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-[28px] bg-[#FBF9F5] text-[#1c1b19] border-t border-[#1c1b19]/10 p-5 shadow-2xl md:hidden max-h-[85vh] flex flex-col"
              style={{
                paddingBottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
              }}
            >
              {/* Drawer Handle */}
              <div className="w-12 h-1 rounded-full bg-[#1c1b19]/20 mx-auto mb-4" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#1c1b19]/10">
                <span className="text-[10px] font-termina font-bold uppercase tracking-[0.2em] text-[#B8860B]">
                  {isEn ? "QUICK SEARCH · CATALOGUE" : "RECHERCHE RAPIDE · CATALOGUE"}
                </span>
                <button
                  type="button"
                  onClick={() => setSearchModalOpen(false)}
                  className="h-7 w-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs font-semibold"
                >
                  ✕
                </button>
              </div>

              {/* Search Bar Input */}
              <div className="py-2">
                <SearchBar autoFocus={true} absoluteResults={false} />
              </div>

              {/* Quick Inspiration Shortcuts */}
              <div className="mt-4 pt-3 border-t border-[#1c1b19]/10">
                <span className="text-[10px] uppercase tracking-wider text-[#1c1b19]/50 font-semibold block mb-2">
                  {isEn ? "Popular Categories:" : "Catégories Populaires :"}
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href={`/${locale}/products`}
                    onClick={() => setSearchModalOpen(false)}
                    className="rounded-full bg-white px-3 py-1.5 border border-[#1c1b19]/10 text-[11px] font-medium text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-colors"
                  >
                    {isEn ? "Outdoor & Sunbrella" : "Outdoor & Toiles"}
                  </Link>
                  <Link
                    href={`/${locale}/products`}
                    onClick={() => setSearchModalOpen(false)}
                    className="rounded-full bg-white px-3 py-1.5 border border-[#1c1b19]/10 text-[11px] font-medium text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-colors"
                  >
                    {isEn ? "Atlas Washed Linen" : "Lin Lavé d'Atlas"}
                  </Link>
                  <Link
                    href={`/${locale}/products`}
                    onClick={() => setSearchModalOpen(false)}
                    className="rounded-full bg-white px-3 py-1.5 border border-[#1c1b19]/10 text-[11px] font-medium text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-colors"
                  >
                    {isEn ? "Cotton Velvet" : "Velours de Coton"}
                  </Link>
                  <Link
                    href={`/${locale}/blog`}
                    onClick={() => setSearchModalOpen(false)}
                    className="rounded-full bg-white px-3 py-1.5 border border-[#1c1b19]/10 text-[11px] font-medium text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-colors"
                  >
                    {isEn ? "Curtain Guides" : "Guides Rideaux"}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
