"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryMenuOverlay } from "@/components/LuxuryMenuOverlay";
import { NavbarRightActions } from "@/components/NavbarRightActions";
import { brand } from "@/lib/content";
import { useTranslations } from "next-intl";
import { removeAccents } from "@/lib/text";

/* ─────────────────────────────────────────────── */
/* Data Definitions                                */
/* ─────────────────────────────────────────────── */

interface ReelItem {
  id: string;
  title: string;
  description: string;
  poster: string;
  videoSrc?: string;
  instagramUrl: string;
  category: string;
  duration: string;
  views: string;
}

interface PinItem {
  id: string;
  title: string;
  board: string;
  image: string;
  pinUrl: string;
  category: string;
}

const REELS_DATA: ReelItem[] = [
  {
    id: "reel-1",
    title: "Voilages sur-mesure & Lin naturel — Villa Amelkis",
    description: "Mise en lumière et confection de voilages aériens sur double hauteur.",
    poster: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp",
    videoSrc: "/video-rideau-villa_kansotex.mp4",
    instagramUrl: "https://www.instagram.com/kansotex.maroc/",
    category: "Rideaux Sur-Mesure",
    duration: "0:35",
    views: "18.2K",
  },
  {
    id: "reel-2",
    title: "Confection & Savoir-faire Textile — Notre Atelier",
    description: "Chaque métrage est inspecté, découpé et assemblé avec minutie à Marrakech.",
    poster: "/gallery/accompagnement-equipe-kansotex.webp",
    instagramUrl: "https://www.instagram.com/kansotex.maroc/",
    category: "Atelier Marrakech",
    duration: "0:48",
    views: "14.5K",
  },
  {
    id: "reel-3",
    title: "Tissus Outdoor Déperlants — Rooftop & Terrasses",
    description: "Résistance aux UV et intempéries sans compromis sur l'élégance du toucher.",
    poster: "/gallery/Kansotex-outdoor-terasse-rooftop.webp",
    instagramUrl: "https://www.instagram.com/kansotex.maroc/",
    category: "Outdoor Luxe",
    duration: "0:28",
    views: "22.9K",
  },
  {
    id: "reel-4",
    title: "Salon Médina & Velours Ciselé — Riad Privé",
    description: "Association de velours soyeux et de passementerie traditionnelle marocaine.",
    poster: "/gallery/Kansotex-indoor-living-room-pinterest.webp",
    instagramUrl: "https://www.instagram.com/kansotex.maroc/",
    category: "Indoor Privé",
    duration: "0:42",
    views: "16.1K",
  },
  {
    id: "reel-5",
    title: "Linge de lit en satin de coton & lin lavé",
    description: "Confort 5 étoiles et douceur pour résidences de prestige et suites hôtelières.",
    poster: "/gallery/linge-de-lite-villa-marrakech-kansotex.webp",
    instagramUrl: "https://www.instagram.com/kansotex.maroc/",
    category: "Linge de Lit",
    duration: "0:31",
    views: "11.7K",
  },
  {
    id: "reel-6",
    title: "Matières Nobles & Textures Jacquard",
    description: "Détails de tissages précieux et tombés souples sous la lumière de Marrakech.",
    poster: "/gallery/linen_fabric_closeup_1791052926029.jpg",
    instagramUrl: "https://www.instagram.com/kansotex.maroc/",
    category: "Matières & Étoffes",
    duration: "0:25",
    views: "19.8K",
  },
];

const PINS_DATA: PinItem[] = [
  {
    id: "pin-1",
    title: "Salon Riad & Tissus d'Ameublement",
    board: "Inspirations Riad & Salons",
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.webp",
    pinUrl: "https://www.pinterest.com/kansotex/",
    category: "Indoor",
  },
  {
    id: "pin-2",
    title: "Terrasse Outdoor & Coussins Déperlants",
    board: "Outdoor & Terrasses Marrakech",
    image: "/gallery/Kansotex-outdoor-terasse-rooftop-2.webp",
    pinUrl: "https://www.pinterest.com/kansotex/",
    category: "Outdoor",
  },
  {
    id: "pin-3",
    title: "Linge de Lit & Jeté de Chambre Raffiné",
    board: "Linge de Maison & Hôtellerie",
    image: "/gallery/bedroom_lifestyle_1791052936092.jpg",
    pinUrl: "https://www.pinterest.com/kansotex/",
    category: "Linge",
  },
  {
    id: "pin-4",
    title: "Tissus Haut de Gamme & Rouleaux Atelier",
    board: "Étoffes & Matières d'Exception",
    image: "/gallery/tissus-haut-de-gamme.webp",
    pinUrl: "https://www.pinterest.com/kansotex/",
    category: "Étoffes",
  },
  {
    id: "pin-5",
    title: "Matières & Textures Outdoor Résistantes",
    board: "Collections Solaires In & Out",
    image: "/gallery/Kansotex-outdoor-tissus-pinterest.webp",
    pinUrl: "https://www.pinterest.com/kansotex/",
    category: "Outdoor",
  },
  {
    id: "pin-6",
    title: "Art de la Table & Nappes en Lin Jacquard",
    board: "Linge de Table & Réceptions",
    image: "/gallery/linge-de-maison-indoor-villa-kansotex.webp",
    pinUrl: "https://www.pinterest.com/kansotex/",
    category: "Linge",
  },
  {
    id: "pin-7",
    title: "Voilages & Tombé Parfait — Riad Médina",
    board: "Rideaux & Confection Sur-Mesure",
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest.webp",
    pinUrl: "https://www.pinterest.com/kansotex/",
    category: "Rideaux",
  },
  {
    id: "pin-8",
    title: "Tapisserie & Tapis Berbères Artisanaux",
    board: "Matières & Artisanat Marocain",
    image: "/gallery/rug_beniouarain_1791049165733.jpg",
    pinUrl: "https://www.pinterest.com/kansotex/",
    category: "Artisanat",
  },
];

/* ─────────────────────────────────────────────── */
/* Component                                       */
/* ─────────────────────────────────────────────── */

export function GalleryClientView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "reels" | "pins">("all");
  
  // State for "En savoir plus" pagination
  const INITIAL_REELS = 4;
  const INITIAL_PINS = 4;
  const [visibleReelsCount, setVisibleReelsCount] = useState(INITIAL_REELS);
  const [visiblePinsCount, setVisiblePinsCount] = useState(INITIAL_PINS);

  // Video Modal State
  const [activeModalReel, setActiveModalReel] = useState<ReelItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const t = useTranslations("Gallery");

  // Lock body scroll when menu or video modal is open
  useEffect(() => {
    if (menuOpen || activeModalReel) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen, activeModalReel]);

  // Handle escape key to close video modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModalReel) {
        setActiveModalReel(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModalReel]);

  // Load Pinterest widget script lightly
  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).PinUtils) {
      const script = document.createElement("script");
      script.src = "https://assets.pinterest.com/js/pinit.js";
      script.async = true;
      script.defer = true;
      script.setAttribute("data-pin-build", "doBuild");
      document.body.appendChild(script);
      script.onload = () => {
        if ((window as any).doBuild) {
          (window as any).doBuild();
        }
      };
    } else if ((window as any).PinUtils) {
      (window as any).PinUtils.build();
    }
  }, []);

  const visibleReels = REELS_DATA.slice(0, visibleReelsCount);
  const hasMoreReels = visibleReelsCount < REELS_DATA.length;

  const visiblePins = PINS_DATA.slice(0, visiblePinsCount);
  const hasMorePins = visiblePinsCount < PINS_DATA.length;

  const handleOpenReel = (reel: ReelItem) => {
    if (reel.videoSrc) {
      setActiveModalReel(reel);
      setIsPlaying(true);
    } else {
      window.open(reel.instagramUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-cream text-[#1c1b19] font-sans antialiased selection:bg-[#1c1b19] selection:text-white pb-28">
      {/* Menu Overlay */}
      <LuxuryMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ============================================================ */}
      {/* NAVIGATION BAR                                               */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-[#e9e5dd] py-3.5 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative flex items-center justify-between min-h-[48px]">
          <div className="flex items-center z-10">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="relative z-20 flex h-6 w-6 flex-col items-center justify-center gap-1.5 cursor-pointer hover:opacity-65 transition-opacity"
              aria-label="Ouvrir le menu"
            >
              <span className="block h-[1px] w-5 bg-[#1c1b19] transition-all duration-300" />
              <span className="block h-[1px] w-5 bg-[#1c1b19] transition-all duration-300" />
              <span className="block h-[1px] w-5 bg-[#1c1b19] transition-all duration-300" />
            </button>
          </div>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <Link href="/" aria-label="Kansotex" className="pointer-events-auto shrink-0 flex items-center justify-center">
              <Image
                src="/KANSOTEX-marque-Black.png"
                alt="Kansotex"
                width={500}
                height={120}
                className="w-[140px] sm:w-[170px] h-auto object-contain"
                priority
              />
            </Link>
          </div>
          <NavbarRightActions />
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO SECTION                                                 */}
      {/* ============================================================ */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 space-y-16 sm:space-y-24">
        
        {/* Title & Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="font-termina text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.35em] text-[#a49a8d] mb-4">
            {removeAccents(t("kicker"))}
          </p>
          <h1 className="font-termina text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.1em] text-[#1c1b19] mb-5">
            {removeAccents(t("title"))}
          </h1>
          <p className="font-sans text-[13px] sm:text-sm font-light leading-[1.8] text-[#1c1b19]/65 max-w-lg mx-auto">
            {t("heroDescription")}
          </p>

          {/* Quick Filter Tabs */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#ebe6dc] border border-[#ded8cb]">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 sm:px-5 py-2 rounded-full font-termina text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeTab === "all"
                  ? "bg-[#1c1b19] text-white shadow-sm"
                  : "text-[#1c1b19]/60 hover:text-[#1c1b19]"
              }`}
            >
              {removeAccents(t("tabAll"))}
            </button>
            <button
              onClick={() => setActiveTab("reels")}
              className={`px-4 sm:px-5 py-2 rounded-full font-termina text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeTab === "reels"
                  ? "bg-[#1c1b19] text-white shadow-sm"
                  : "text-[#1c1b19]/60 hover:text-[#1c1b19]"
              }`}
            >
              {removeAccents(t("tabReels"))}
            </button>
            <button
              onClick={() => setActiveTab("pins")}
              className={`px-4 sm:px-5 py-2 rounded-full font-termina text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                activeTab === "pins"
                  ? "bg-[#1c1b19] text-white shadow-sm"
                  : "text-[#1c1b19]/60 hover:text-[#1c1b19]"
              }`}
            >
              {removeAccents(t("tabPins"))}
            </button>
          </div>
        </motion.section>

        {/* ============================================================ */}
        {/* SECTION 1: INSTAGRAM REELS & VIDEOS                          */}
        {/* ============================================================ */}
        {(activeTab === "all" || activeTab === "reels") && (
          <motion.section
            id="reels"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ded8cb]">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#405DE6] via-[#C13584] to-[#FD1D1D] flex items-center justify-center shrink-0 shadow-md shadow-[#C13584]/20">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="font-termina text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.15em] text-[#1c1b19]">
                    {removeAccents(t("reelsTitle"))}
                  </h2>
                  <p className="font-sans text-[11px] sm:text-xs text-[#1c1b19]/55 mt-0.5">
                    {t("reelsSubtitle")} · <span className="font-medium text-[#1c1b19]/80">@kansotex.maroc</span>
                  </p>
                </div>
              </div>

              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1c1b19]/20 font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all duration-300"
              >
                <span>{removeAccents(t("reelsFollow"))}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            {/* Reels Grid (Vertical 9:16 Cards) */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence>
                {visibleReels.map((reel, index) => (
                  <motion.div
                    key={reel.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => handleOpenReel(reel)}
                    className="group relative cursor-pointer rounded-2xl overflow-hidden bg-[#24201c] aspect-[9/16] shadow-sm hover:shadow-xl transition-all duration-500 border border-[#ded8cb]/60 flex flex-col justify-end"
                  >
                    {/* Background Poster Image */}
                    <Image
                      src={reel.poster}
                      alt={reel.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.9] group-hover:brightness-[0.98]"
                      loading={index < 4 ? "eager" : "lazy"}
                    />

                    {/* Dark Gradient Overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 group-hover:from-black/90 transition-colors" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 pointer-events-none">
                      <span className="px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-[9px] font-termina font-bold uppercase tracking-wider text-white/90 border border-white/10">
                        {reel.category}
                      </span>
                      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-[10px] font-sans text-white/80">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        <span>{reel.duration}</span>
                      </div>
                    </div>

                    {/* Play Button Indicator (Center on hover) */}
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center transform scale-90 opacity-75 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white text-white group-hover:text-black">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom Content info */}
                    <div className="relative z-10 p-3.5 sm:p-4 text-white space-y-1.5">
                      <p className="font-termina text-[11px] sm:text-xs font-bold leading-snug line-clamp-2 uppercase tracking-wide group-hover:text-cream transition-colors">
                        {reel.title}
                      </p>
                      <p className="font-sans text-[11px] text-white/70 line-clamp-1 font-light hidden sm:block">
                        {reel.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between border-t border-white/15 text-[10px] text-white/60">
                        <span className="flex items-center gap-1 font-sans">
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          {reel.views}
                        </span>
                        <span className="font-termina text-[8px] uppercase tracking-wider text-white/90 group-hover:underline">
                          {reel.videoSrc ? removeAccents(t("reelsWatch")) : removeAccents(t("reelsOpenInsta"))}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* "En savoir plus" / Load More Reels Controls */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              {hasMoreReels ? (
                <button
                  type="button"
                  onClick={() => setVisibleReelsCount((prev) => Math.min(prev + 4, REELS_DATA.length))}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1c1b19] text-white font-termina text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#34322e] transition-all shadow-sm cursor-pointer"
                >
                  <span>{removeAccents(t("loadMoreReels"))}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              ) : (
                visibleReelsCount > INITIAL_REELS && (
                  <button
                    type="button"
                    onClick={() => setVisibleReelsCount(INITIAL_REELS)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#1c1b19]/25 text-[#1c1b19] font-termina text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#1c1b19] hover:text-white transition-all cursor-pointer"
                  >
                    <span>{removeAccents(t("showLess"))}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </button>
                )
              )}

              <a
                href={brand.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-[#1c1b19]/20 text-[#1c1b19] font-termina text-[10px] font-bold uppercase tracking-[0.15em] hover:border-[#C13584] hover:text-[#C13584] transition-all duration-300"
              >
                <span>{removeAccents(t("exploreMoreInsta"))}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </motion.section>
        )}

        {/* Separator Divider */}
        {activeTab === "all" && (
          <div className="w-full max-w-sm mx-auto border-t border-[#ded8cb]" />
        )}

        {/* ============================================================ */}
        {/* SECTION 2: PINTEREST PINS & INSPIRATIONS                     */}
        {/* ============================================================ */}
        {(activeTab === "all" || activeTab === "pins") && (
          <motion.section
            id="pinterest"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#ded8cb]">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-[#E60023] flex items-center justify-center shrink-0 shadow-md shadow-[#E60023]/20">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="font-termina text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.15em] text-[#1c1b19]">
                    {removeAccents(t("pinsTitle"))}
                  </h2>
                  <p className="font-sans text-[11px] sm:text-xs text-[#1c1b19]/55 mt-0.5">
                    {t("pinsSubtitle")} · <span className="font-medium text-[#1c1b19]/80">@kansotex</span>
                  </p>
                </div>
              </div>

              <a
                href={brand.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1c1b19]/20 font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#1c1b19] hover:bg-[#E60023] hover:border-[#E60023] hover:text-white transition-all duration-300"
              >
                <span>{removeAccents(t("pinsFollow"))}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>

            {/* Pins Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence>
                {visiblePins.map((pin, index) => (
                  <motion.div
                    key={pin.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative rounded-2xl overflow-hidden bg-[#e8e4db] border border-[#ded8cb]/80 flex flex-col shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#ded8cb]">
                      <Image
                        src={pin.image}
                        alt={pin.title}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        loading={index < 4 ? "eager" : "lazy"}
                      />

                      {/* Top Pin Tag */}
                      <div className="absolute top-3 left-3 z-10">
                        <span className="px-2.5 py-0.5 rounded-full bg-cream/90 backdrop-blur-md text-[9px] font-termina font-bold uppercase tracking-wider text-[#1c1b19] border border-[#ded8cb]">
                          {pin.category}
                        </span>
                      </div>

                      {/* Hover Save on Pinterest Button */}
                      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <a
                          href={pin.pinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E60023] text-white text-[10px] font-termina font-bold uppercase tracking-wider shadow-md hover:bg-[#ad081b] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
                          </svg>
                          <span>{removeAccents(t("pinsSave"))}</span>
                        </a>
                      </div>
                    </div>

                    {/* Pin Card Footer Info */}
                    <div className="p-3.5 space-y-1">
                      <p className="font-termina text-[11px] font-bold text-[#1c1b19] line-clamp-1 uppercase tracking-wide">
                        {pin.title}
                      </p>
                      <p className="font-sans text-[11px] text-[#1c1b19]/60 line-clamp-1">
                        {pin.board}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* "En savoir plus" / Load More Pins Controls */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              {hasMorePins ? (
                <button
                  type="button"
                  onClick={() => setVisiblePinsCount((prev) => Math.min(prev + 4, PINS_DATA.length))}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1c1b19] text-white font-termina text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#34322e] transition-all shadow-sm cursor-pointer"
                >
                  <span>{removeAccents(t("loadMorePins"))}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              ) : (
                visiblePinsCount > INITIAL_PINS && (
                  <button
                    type="button"
                    onClick={() => setVisiblePinsCount(INITIAL_PINS)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#1c1b19]/25 text-[#1c1b19] font-termina text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#1c1b19] hover:text-white transition-all cursor-pointer"
                  >
                    <span>{removeAccents(t("showLess"))}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18 15 12 9 6 15" />
                    </svg>
                  </button>
                )
              )}

              <a
                href={brand.pinterest}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full border border-[#1c1b19]/20 text-[#1c1b19] font-termina text-[10px] font-bold uppercase tracking-[0.15em] hover:border-[#E60023] hover:text-[#E60023] transition-all duration-300"
              >
                <span>{removeAccents(t("exploreMorePinterest"))}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </motion.section>
        )}

      </main>

      {/* ============================================================ */}
      {/* VIDEO MODAL (REEL VIEWER)                                    */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeModalReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setActiveModalReel(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-sm sm:max-w-md aspect-[9/16] max-h-[88vh] rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveModalReel(null)}
                className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                aria-label="Fermer la vidéo"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Video Element */}
              <div className="absolute inset-0 z-0">
                <video
                  ref={modalVideoRef}
                  src={activeModalReel.videoSrc}
                  poster={activeModalReel.poster}
                  playsInline
                  autoPlay
                  loop
                  muted={isMuted}
                  className="w-full h-full object-cover"
                  onClick={() => {
                    if (modalVideoRef.current) {
                      if (isPlaying) {
                        modalVideoRef.current.pause();
                        setIsPlaying(false);
                      } else {
                        modalVideoRef.current.play();
                        setIsPlaying(true);
                      }
                    }
                  }}
                />
              </div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 pointer-events-none" />

              {/* Top Controls */}
              <div className="relative z-10 p-5 flex items-center justify-between text-white pointer-events-auto">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#405DE6] via-[#C13584] to-[#FD1D1D] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </div>
                  <span className="font-termina text-[10px] font-bold uppercase tracking-wider">@kansotex.maroc</span>
                </div>

                <div className="flex items-center gap-2 mr-12">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors"
                  >
                    {isMuted ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="1" y1="1" x2="23" y2="23" />
                        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Bottom Details & Direct Link to Instagram */}
              <div className="relative z-10 p-5 space-y-3 text-white">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-termina font-bold uppercase tracking-wider text-white mb-2">
                    {activeModalReel.category}
                  </span>
                  <h3 className="font-termina text-xs sm:text-sm font-bold uppercase tracking-wide leading-snug">
                    {activeModalReel.title}
                  </h3>
                  <p className="font-sans text-xs text-white/80 mt-1 font-light leading-relaxed">
                    {activeModalReel.description}
                  </p>
                </div>

                <a
                  href={activeModalReel.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-[#405DE6] via-[#C13584] to-[#FD1D1D] text-white font-termina text-[10px] font-bold uppercase tracking-[0.15em] shadow-lg hover:opacity-90 transition-opacity"
                >
                  <span>{removeAccents(t("reelsOpenInsta"))}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
