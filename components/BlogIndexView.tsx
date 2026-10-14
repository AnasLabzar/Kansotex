"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPost, BLOG_CATEGORIES } from "@/lib/blog-data";
import { removeAccents } from "@/lib/text";

interface BlogIndexViewProps {
  initialPosts: BlogPost[];
  locale: string;
}

export function BlogIndexView({ initialPosts, locale }: BlogIndexViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showProTools, setShowProTools] = useState<boolean>(false);
  const [activeAgentTab, setActiveAgentTab] = useState<"bot1" | "bot2" | "bot3">("bot1");
  const [foundersPage, setFoundersPage] = useState<number>(0);
  const [activePaginationPage, setActivePaginationPage] = useState<number>(1);

  const isEn = locale === "en";

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.categorySlug === selectedCategory;

      const titleMatch = (post.title + " " + post.titleEn)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const excerptMatch = (post.excerpt + " " + post.excerptEn)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const tagMatch = post.seoKeywords.some((k) =>
        k.toLowerCase().includes(searchQuery.toLowerCase())
      );

      return matchesCategory && (titleMatch || excerptMatch || tagMatch);
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Lead featured post (Left side of top grid)
  const leadPost = filteredPosts[0] || initialPosts[0];

  // Latest 4 posts (Right side of top grid)
  const latestPosts = useMemo(() => {
    // If we have more than 1 post, display subsequent posts; fallback to others
    if (filteredPosts.length > 1) {
      return filteredPosts.slice(1, 5);
    }
    return initialPosts.slice(0, 4);
  }, [filteredPosts, initialPosts]);

  // Founders corner / Atelier collection posts (for the lower 3-column slider)
  const foundersCornerPosts = useMemo(() => {
    // Show remaining posts or all posts for carousel
    if (filteredPosts.length > 3) {
      return filteredPosts;
    }
    return initialPosts;
  }, [filteredPosts, initialPosts]);

  const cardsPerPage = 3;
  const maxFoundersPages = Math.ceil(foundersCornerPosts.length / cardsPerPage);

  const displayedFoundersPosts = useMemo(() => {
    const startIndex = (foundersPage % maxFoundersPages) * cardsPerPage;
    return foundersCornerPosts.slice(startIndex, startIndex + cardsPerPage);
  }, [foundersCornerPosts, foundersPage, maxFoundersPages]);

  const handlePrevFounders = () => {
    setFoundersPage((prev) => (prev > 0 ? prev - 1 : maxFoundersPages - 1));
  };

  const handleNextFounders = () => {
    setFoundersPage((prev) => (prev < maxFoundersPages - 1 ? prev + 1 : 0));
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat(isEn ? "en-US" : "fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(date);
    } catch {
      return isoString;
    }
  };

  const formatDateShort = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return new Intl.DateTimeFormat(isEn ? "en-US" : "fr-FR", {
        day: "numeric",
        month: "short",
        timeZone: "UTC",
      }).format(date);
    } catch {
      return isoString;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1c1b19] selection:bg-[#1c1b19] selection:text-[#FBF9F5]">
      <Header overlay={false} />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20">

        {/* Top Control Bar: Search + Category Pills + Outils Pro Button */}
        <section className="mb-8 sm:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1c1b19]/10">
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {BLOG_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setFoundersPage(0);
                    }}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs tracking-wide transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#1c1b19] text-[#FBF9F5] font-medium shadow-xs"
                        : "bg-white/80 text-[#1c1b19]/70 border border-[#1c1b19]/10 hover:bg-white hover:text-[#1c1b19]"
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Pro Controls: Search & Multi-Agent Pro Cockpit Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEn ? "Search articles..." : "Rechercher..."}
                  className="w-full rounded-full border border-[#1c1b19]/15 bg-white px-4 py-2 pl-9 text-xs tracking-wide text-[#1c1b19] placeholder:text-[#1c1b19]/40 focus:border-[#1c1b19] focus:outline-none shadow-xs"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1c1b19]/50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#1c1b19]/50 hover:text-[#1c1b19]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Outils Pro Cockpit Toggle Button */}
              <button
                onClick={() => setShowProTools((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all shadow-xs cursor-pointer ${
                  showProTools
                    ? "bg-[#B8860B] text-white"
                    : "bg-[#141413] text-[#FBF9F5] hover:bg-[#B8860B]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isEn ? "Pro Tools" : "Outils Pro"}</span>
                <span className="text-[10px]">{showProTools ? "▲" : "▼"}</span>
              </button>
            </div>
          </div>

          {/* Collapsible Outils Pro Panel (Multi-Agent Editorial Intelligence) */}
          <AnimatePresence>
            {showProTools && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <div className="rounded-3xl bg-[#141413] text-[#faf8f5] p-6 sm:p-8 border border-white/10 shadow-xl relative">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/30 bg-[#B8860B]/10 px-3 py-1 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#B8860B] animate-pulse" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8860B]">
                          ÉCOSYSTÈME MULTI-AGENTS KANSOTEX · 3 BOTS OPÉRATIONNELS
                        </span>
                      </div>
                      <h3 className="font-termina text-base sm:text-xl font-bold uppercase text-white">
                        {removeAccents("Console & Outils Professionnels d'Édition")}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/${locale}/blog/studio`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#B8860B] text-[#141413] px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-md shrink-0"
                      >
                        <span>Ouvrir Cockpit IA</span>
                        <span>→</span>
                      </Link>
                      <Link
                        href={`/${locale}/pro`}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-all border border-white/10"
                      >
                        <span>Espace B2B Devis</span>
                      </Link>
                    </div>
                  </div>

                  {/* Agent Tabs */}
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setActiveAgentTab("bot1")}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                        activeAgentTab === "bot1"
                          ? "bg-[#B8860B] text-[#141413]"
                          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>🎯</span>
                      <span>BOT 1 : Directeur Marketing & Radar</span>
                    </button>
                    <button
                      onClick={() => setActiveAgentTab("bot2")}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                        activeAgentTab === "bot2"
                          ? "bg-[#B8860B] text-[#141413]"
                          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>🧵</span>
                      <span>BOT 2 : Maître Hassan (Rédacteur 100% Humain)</span>
                    </button>
                    <button
                      onClick={() => setActiveAgentTab("bot3")}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                        activeAgentTab === "bot3"
                          ? "bg-[#B8860B] text-[#141413]"
                          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>⚙️</span>
                      <span>BOT 3 : Chef de Projet & Curation</span>
                    </button>
                  </div>

                  {/* Tab Panels */}
                  <div className="text-xs">
                    {activeAgentTab === "bot1" && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                          <span className="font-bold text-white text-[11px] block mb-1">Transat.ma</span>
                          <p className="text-white/60 text-[10.5px] font-light mb-2">Faille : Toiles chiliennes basiques décolorées.</p>
                          <Link href={`/${locale}/blog/toiles-remplacement-chiliennes-transats-marrakech`} className="text-[#B8860B] text-[10.5px] hover:underline font-medium line-clamp-1">
                            → Toiles Acryliques 320g/m²
                          </Link>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                          <span className="font-bold text-white text-[11px] block mb-1">AMA Group</span>
                          <p className="text-white/60 text-[10.5px] font-light mb-2">Faille : Mobilier sans mousse drainante.</p>
                          <Link href={`/${locale}/blog/mousse-dryfeel-tissus-outdoor-piscine-marrakech`} className="text-[#B8860B] text-[10.5px] hover:underline font-medium line-clamp-1">
                            → Mousse Dryfeel Alvéolaire
                          </Link>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                          <span className="font-bold text-white text-[11px] block mb-1">Mozaieq.com</span>
                          <p className="text-white/60 text-[10.5px] font-light mb-2">Faille : Absence de tests de laboratoire.</p>
                          <Link href={`/${locale}/blog/guide-tissus-outdoor-marrakech-riads-rooftops`} className="text-[#B8860B] text-[10.5px] hover:underline font-medium line-clamp-1">
                            → Normes Martindale 60k & UV 8
                          </Link>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-3.5">
                          <span className="font-bold text-white text-[11px] block mb-1">Easy Linge Kech</span>
                          <p className="text-white/60 text-[10.5px] font-light mb-2">Faille : Polycoton 140 fils basique.</p>
                          <Link href={`/${locale}/blog/amenagement-textile-b2b-renover-riad-hotel-luxe`} className="text-[#B8860B] text-[10.5px] hover:underline font-medium line-clamp-1">
                            → Percale 300 Fils & Norme M1
                          </Link>
                        </div>
                      </div>
                    )}

                    {activeAgentTab === "bot2" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                          <span className="text-[#B8860B] font-semibold text-[10px] uppercase block mb-1">Voix d'Atelier</span>
                          <p className="text-white/80 text-[11px] font-light">Maître Hassan (25 ans d'expérience). Style 100% humain certifié sans cliché d'intelligence artificielle.</p>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                          <span className="text-[#B8860B] font-semibold text-[10px] uppercase block mb-1">Métriques Précises</span>
                          <p className="text-white/80 text-[11px] font-light">Formules de métrage au millimètre, coefficient de fronce 1.8x à 2.2x et tombé plombé 10 cm.</p>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                          <span className="text-[#B8860B] font-semibold text-[10px] uppercase block mb-1">Climat de Marrakech</span>
                          <p className="text-white/80 text-[11px] font-light">Confection adaptée au vent du Chergui, à la réverbération ocre et aux amplitudes thermiques de l'Atlas.</p>
                        </div>
                      </div>
                    )}

                    {activeAgentTab === "bot3" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                          <span className="text-[#B8860B] font-semibold text-[10px] uppercase block mb-1">Curation Visuelle</span>
                          <p className="text-white/80 text-[11px] font-light">Sélection et validation des photos réelles haute facture avec rôle et cadre éditorial documenté.</p>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                          <span className="text-[#B8860B] font-semibold text-[10px] uppercase block mb-1">Schemas Google Rich</span>
                          <p className="text-white/80 text-[11px] font-light">Injection BlogPosting, FAQPage et BreadcrumbList pour le référencement IA & Google SGE.</p>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                          <span className="text-[#B8860B] font-semibold text-[10px] uppercase block mb-1">Cadence Automatisée</span>
                          <p className="text-white/80 text-[11px] font-light">Publication tous les 2 à 4 jours synchronisée avec le Sitemap XML et Google Search Console.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* SECTION 1: HERO TOP GRID (MATCHING USER SCREENSHOT) */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#1c1b19]/10 p-10 shadow-xs">
            <p className="text-base font-light text-[#1c1b19]/70 mb-4">
              {isEn ? "No articles match your search." : "Aucun article ne correspond à votre recherche."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs uppercase tracking-widest text-[#B8860B] font-semibold underline hover:opacity-80 cursor-pointer"
            >
              {isEn ? "Reset all filters" : "Réinitialiser tous les filtres"}
            </button>
          </div>
        ) : (
          <section className="mb-16 sm:mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              
              {/* LEFT COLUMN: Featured Large Lead Post Card */}
              {leadPost && (
                <div className="lg:col-span-7 flex flex-col">
                  <Link
                    href={`/${locale}/blog/${leadPost.slug}`}
                    className="group relative flex-1 min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] rounded-[28px] overflow-hidden border border-[#1c1b19]/10 shadow-[0_4px_24px_rgba(28,27,25,0.05)] hover:shadow-[0_12px_36px_rgba(28,27,25,0.12)] transition-all duration-500 flex flex-col justify-end"
                  >
                    {/* Background Master Image */}
                    <Image
                      src={leadPost.coverImage}
                      alt={leadPost.coverAlt}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />

                    {/* Dark Vignette / Gradient Overlay at Bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

                    {/* Content on Bottom Overlay */}
                    <div className="relative z-10 p-6 sm:p-8 md:p-10">
                      {/* Category Pill with Dot */}
                      <div className="mb-3.5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-[#1c1b19] shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                          {leadPost.category}
                        </span>
                      </div>

                      {/* Headline */}
                      <h2 className="font-termina text-lg sm:text-2xl md:text-3xl font-bold uppercase text-white leading-snug tracking-tight group-hover:text-[#B8860B] transition-colors line-clamp-3">
                        {removeAccents(isEn ? leadPost.titleEn : leadPost.title)}
                      </h2>

                      {/* Meta line: Date • Reading time */}
                      <div className="mt-3.5 flex items-center gap-2 text-xs text-white/75 font-light">
                        <span>{formatDate(leadPost.publishedAt)}</span>
                        <span>•</span>
                        <span>{leadPost.readingTime} {isEn ? "read" : "de lecture"}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* RIGHT COLUMN: "Latest post" List Stack */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  {/* Section Title */}
                  <div className="flex items-center justify-between mb-4 sm:mb-5 px-1">
                    <h2 className="font-termina text-xl sm:text-2xl font-bold text-[#1c1b19] tracking-tight">
                      {isEn ? "Latest post" : "Derniers articles"}
                    </h2>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8860B]">
                      {latestPosts.length} {isEn ? "items" : "guides"}
                    </span>
                  </div>

                  {/* 4 Stacked Rows */}
                  <div className="space-y-3">
                    {latestPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/${locale}/blog/${post.slug}`}
                        className="group flex items-center gap-4 p-2.5 sm:p-3 rounded-2xl bg-white/60 hover:bg-white border border-transparent hover:border-[#1c1b19]/10 shadow-[0_2px_8px_rgba(28,27,25,0.02)] hover:shadow-[0_8px_20px_rgba(28,27,25,0.06)] transition-all duration-300"
                      >
                        {/* Square Rounded Thumbnail */}
                        <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 border border-[#1c1b19]/10 bg-[#e8e4dc]">
                          <Image
                            src={post.coverImage}
                            alt={post.coverAlt}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="80px"
                          />
                        </div>

                        {/* Title & Meta Info */}
                        <div className="flex-1 min-w-0 pr-1">
                          <h3 className="text-xs sm:text-[13px] font-semibold text-[#1c1b19] group-hover:text-[#B8860B] transition-colors line-clamp-2 leading-snug">
                            {removeAccents(isEn ? post.titleEn : post.title)}
                          </h3>
                          <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-[#1c1b19]/55 font-light">
                            <span>{formatDateShort(post.publishedAt)}</span>
                            <span>•</span>
                            <span>{post.readingTime}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* SECTION 2: "Founders corner" / CARNET D'ATELIER (MATCHING USER SCREENSHOT) */}
        {filteredPosts.length > 0 && (
          <section className="mb-16 sm:mb-20">
            {/* Header with Title on Left, Navigation Arrows on Right */}
            <div className="flex items-center justify-between mb-6 sm:mb-8 px-1">
              <div>
                <h2 className="font-termina text-xl sm:text-2xl font-bold text-[#1c1b19] tracking-tight">
                  {isEn ? "Founders corner" : "Carnet d'Atelier & Savoir-Faire"}
                </h2>
                <p className="text-xs text-[#1c1b19]/60 font-light mt-0.5">
                  {isEn ? "Master artisan techniques, measuring formulas and technical metrics." : "Transmission de savoir-faire, formules de métrage et fiches techniques."}
                </p>
              </div>

              {/* Slider Arrows (Circle Outlined) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevFounders}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1c1b19]/20 bg-white flex items-center justify-center text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all shadow-xs cursor-pointer"
                  aria-label="Previous articles"
                >
                  ←
                </button>
                <button
                  onClick={handleNextFounders}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#1c1b19]/20 bg-white flex items-center justify-center text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all shadow-xs cursor-pointer"
                  aria-label="Next articles"
                >
                  →
                </button>
              </div>
            </div>

            {/* 3 Columns of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {displayedFoundersPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="group rounded-[24px] bg-white p-5 sm:p-6 border border-[#1c1b19]/10 shadow-[0_4px_20px_rgba(28,27,25,0.03)] hover:shadow-[0_12px_32px_rgba(28,27,25,0.08)] hover:border-[#1c1b19]/20 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Rounded Image Thumbnail */}
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="block relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-[#1c1b19]/10 bg-[#f0ece5]"
                    >
                      <Image
                        src={post.coverImage}
                        alt={post.coverAlt}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </Link>

                    {/* Category Pill with Dot */}
                    <div className="mb-2.5">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase text-[#1c1b19]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                        {post.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-termina text-sm sm:text-base font-bold text-[#1c1b19] group-hover:text-[#B8860B] transition-colors line-clamp-2 leading-snug">
                      <Link href={`/${locale}/blog/${post.slug}`}>
                        {removeAccents(isEn ? post.titleEn : post.title)}
                      </Link>
                    </h3>

                    {/* Excerpt Description */}
                    <p className="mt-2.5 text-xs font-light text-[#1c1b19]/70 line-clamp-3 leading-relaxed">
                      {isEn ? post.excerptEn : post.excerpt}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="mt-5 pt-3.5 border-t border-[#1c1b19]/10 flex items-center justify-between text-[11px] text-[#1c1b19]/55 font-light">
                    <div className="flex items-center gap-1.5">
                      <span>{formatDateShort(post.publishedAt)}</span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="font-medium text-[#1c1b19] group-hover:text-[#B8860B] transition-colors"
                    >
                      {isEn ? "Read" : "Lire"} →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Bottom Minimal Pagination (Matching the Screenshot: ← 1 2 3 →) */}
            <div className="mt-14 flex items-center justify-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setActivePaginationPage((p) => Math.max(1, p - 1));
                  handlePrevFounders();
                }}
                disabled={activePaginationPage === 1}
                className="w-8 h-8 rounded-full border border-[#1c1b19]/20 bg-white flex items-center justify-center text-xs text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#1c1b19] cursor-pointer"
                aria-label="Previous page"
              >
                ←
              </button>

              {[1, 2, 3].map((num) => {
                const isActive = activePaginationPage === num;
                return (
                  <button
                    key={num}
                    onClick={() => {
                      setActivePaginationPage(num);
                      setFoundersPage(num - 1);
                    }}
                    className={`w-8 h-8 rounded-full text-xs font-medium flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#1c1b19] text-white shadow-xs"
                        : "bg-white/60 text-[#1c1b19]/70 border border-[#1c1b19]/10 hover:bg-white hover:text-[#1c1b19]"
                    }`}
                  >
                    {num}
                  </button>
                );
              })}

              <button
                onClick={() => {
                  setActivePaginationPage((p) => Math.min(3, p + 1));
                  handleNextFounders();
                }}
                disabled={activePaginationPage === 3}
                className="w-8 h-8 rounded-full border border-[#1c1b19]/20 bg-white flex items-center justify-center text-xs text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#1c1b19] cursor-pointer"
                aria-label="Next page"
              >
                →
              </button>
            </div>
          </section>
        )}

        {/* Editorial Dispatch & Pro Consultation Block */}
        <section className="rounded-3xl bg-[#141413] text-[#faf8f5] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-15 w-72 h-72">
            <Image
              src="/icon-light.png"
              alt="Kansotex Watermark"
              fill
              className="object-contain"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#B8860B] block mb-2">
              {isEn ? "THE KANSOTEX DISPATCH & B2B" : "LE CARNET D'ÉTOFFES · PRESCRIPTION"}
            </span>
            <h3 className="font-termina text-xl sm:text-2xl font-bold uppercase tracking-tight leading-snug">
              {removeAccents(
                isEn
                  ? "Bespoke Fabric Trends & Architecture Dossiers"
                  : "Dossiers de Matière, Normes Textiles & Inspirations"
              )}
            </h3>
            <p className="mt-3 text-xs sm:text-sm font-light text-[#faf8f5]/70 leading-relaxed">
              {isEn
                ? "Every two weeks: master artisan secrets, curtain yardage guides, UV protection insights and Moroccan architectural showcases."
                : "Recevez les secrets de coupe de notre atelier de Marrakech, les guides de métrage sur-mesure et l'accès prioritaire à nos stocks professionnels."}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={isEn ? "Your email..." : "Votre adresse email..."}
                className="rounded-full bg-white/10 border border-white/20 px-5 py-3 text-xs text-white placeholder:text-white/40 focus:border-white focus:outline-none flex-1"
              />
              <button className="rounded-full bg-white text-[#141413] px-7 py-3 text-xs font-semibold uppercase tracking-wider hover:bg-[#faf8f5] transition-all shrink-0 cursor-pointer">
                {isEn ? "Subscribe" : "S'abonner"}
              </button>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
