"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPost, BLOG_CATEGORIES, getBlogCategoryLabel } from "@/lib/blog-data";
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
    if (filteredPosts.length > 1) {
      return filteredPosts.slice(1, 5);
    }
    return initialPosts.slice(0, 4);
  }, [filteredPosts, initialPosts]);

  // Founders corner / Atelier collection posts (for the lower 3-column slider)
  const foundersCornerPosts = useMemo(() => {
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
        month: "long",
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

      {/* Main Container with refined breathable padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-24">

        {/* TOP EDITORIAL BRAND HEADER */}
        <header className="mb-10 sm:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#1c1b19]/10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/30 bg-[#B8860B]/8 px-3.5 py-1 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B8860B] animate-pulse" />
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#B8860B]">
                  {isEn ? "EDITORIAL GAZETTE & ARCHITECTURE" : "LE JOURNAL KANSOTEX · HAUTE FACTURE"}
                </span>
              </div>
              <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-[0.06em] sm:tracking-[0.1em] text-[#1c1b19] leading-tight">
                {isEn ? "The Textile Gazette" : "Carnet d'Étoffes & Savoir-Faire"}
              </h1>
              <p className="mt-2 text-xs sm:text-sm font-light text-[#1c1b19]/70 max-w-2xl leading-relaxed">
                {isEn
                  ? "Bespoke curtain formulas, UV resistance standards, and architectural riad textiles from our Marrakech manufacture."
                  : "Guides de métrage sur-mesure, résistance UV zénithale, mousses alvéolaires et inspirations architecturales de notre manufacture à Marrakech."}
              </p>
            </div>

            {/* Quick Stats or Pro Link */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href={`/${locale}/pro`}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1c1b19]/80 hover:text-[#B8860B] transition-colors"
              >
                <span>{isEn ? "B2B Pro Portal" : "Espace Pro B2B"}</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* SECONDARY CONTROLS BAR: CATEGORIES + SEARCH + PRO TOOLS BUTTON */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c1b19]/10 pb-6">
            
            {/* Category Filter Pills */}
            <div 
              className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 flex-1 min-w-0 md:flex-wrap md:overflow-visible"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {BLOG_CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      setFoundersPage(0);
                    }}
                    className={`shrink-0 rounded-full px-4 py-2 text-xs tracking-wide transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-[#1c1b19] text-[#FBF9F5] font-medium shadow-xs"
                        : "bg-white text-[#1c1b19]/70 border border-[#1c1b19]/10 hover:border-[#1c1b19]/30 hover:text-[#1c1b19]"
                    }`}
                  >
                    {isEn ? (cat.nameEn || cat.name) : cat.name}
                  </button>
                );
              })}
            </div>

            {/* Right: Search Input + Outils Pro Button */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Search input with modern subtle glass finish */}
              <div className="relative w-full sm:w-60">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isEn ? "Search an article..." : "Rechercher un guide..."}
                  className="w-full rounded-full border border-[#1c1b19]/15 bg-white/95 px-4 py-2 pl-9 text-xs tracking-wide text-[#1c1b19] placeholder:text-[#1c1b19]/45 focus:border-[#1c1b19] focus:outline-none focus:ring-1 focus:ring-[#1c1b19]/20 shadow-xs transition-all"
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
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all shadow-xs cursor-pointer border ${
                  showProTools
                    ? "bg-[#B8860B] border-[#B8860B] text-white shadow-md"
                    : "bg-[#141413] border-white/10 text-[#FBF9F5] hover:bg-[#B8860B] hover:border-[#B8860B]"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{isEn ? "AI Pro Suite" : "Outils Pro (3 Bots)"}</span>
                <span className="text-[9px] transition-transform">{showProTools ? "▲" : "▼"}</span>
              </button>
            </div>
          </div>

          {/* ADVANCED PRO DASHBOARD (COLLAPSIBLE MULTI-AGENTS CONSOLE) */}
          <AnimatePresence>
            {showProTools && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -8 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-6"
              >
                <div className="rounded-[28px] bg-[#141413] text-[#faf8f5] p-6 sm:p-9 border border-[#B8860B]/30 shadow-2xl relative">
                  {/* Top Bar inside Pro Console */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                    <div>
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-3 py-1 mb-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400">
                          {isEn ? "ACTIVE EDITORIAL COCKPIT · 3 COORDINATED BOTS" : "COCKPIT ÉDITORIAL ACTIF · 3 BOTS COORDONNÉS"}
                        </span>
                      </div>
                      <h3 className="font-sans text-base sm:text-xl font-bold uppercase tracking-wide text-white">
                        {isEn ? "Editorial Strategy & Intelligence Console" : "Console de Stratégie & Intelligence Éditoriale"}
                      </h3>
                      <p className="text-xs text-white/60 font-light mt-0.5">
                        {isEn
                          ? "Pipeline oversight: Competitor radar, 100% human-grade luxury writer & 8K visual curation."
                          : "Supervision du pipeline : Radar concurrentiel, plume artisanale 100% humaine et curation visuelle 8K."}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/${locale}/blog/studio`}
                        className="inline-flex items-center gap-2 rounded-full bg-[#B8860B] text-[#141413] px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-md shrink-0 cursor-pointer"
                      >
                        <span>{isEn ? "Full Studio Cockpit" : "Cockpit Studio Complet"}</span>
                        <span>→</span>
                      </Link>
                      <Link
                        href={`/${locale}/pro`}
                        className="inline-flex items-center gap-2 rounded-full bg-white/10 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-white/20 transition-all border border-white/10"
                      >
                        <span>{isEn ? "B2B Quote Area" : "Espace Devis B2B"}</span>
                      </Link>
                    </div>
                  </div>

                  {/* Agent Tabs */}
                  <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto no-scrollbar">
                    <button
                      onClick={() => setActiveAgentTab("bot1")}
                      className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                        activeAgentTab === "bot1"
                          ? "bg-[#B8860B] text-[#141413] font-semibold"
                          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>🎯</span>
                      <span>{isEn ? "BOT 1 : Strategy & Radar Director" : "BOT 1 : Directrice Stratégie & Radar"}</span>
                    </button>
                    <button
                      onClick={() => setActiveAgentTab("bot2")}
                      className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                        activeAgentTab === "bot2"
                          ? "bg-[#B8860B] text-[#141413] font-semibold"
                          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>🧵</span>
                      <span>{isEn ? "BOT 2 : Master Hassan (100% Human Writer)" : "BOT 2 : Maître Hassan (Rédacteur 100% Humain)"}</span>
                    </button>
                    <button
                      onClick={() => setActiveAgentTab("bot3")}
                      className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                        activeAgentTab === "bot3"
                          ? "bg-[#B8860B] text-[#141413] font-semibold"
                          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <span>⚙️</span>
                      <span>{isEn ? "BOT 3 : Project Manager & Visual Curation" : "BOT 3 : Chef de Projet & Curation Visuelle"}</span>
                    </button>
                  </div>

                  {/* Tab Panels */}
                  <div className="text-xs">
                    {activeAgentTab === "bot1" && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-white text-[11px] uppercase">Transat.ma</span>
                              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Attaqué</span>
                            </div>
                            <p className="text-white/60 text-[10.5px] font-light mb-2">Faille : Toiles chiliennes ordinaires qui décolorent.</p>
                            <Link href={`/${locale}/blog/toiles-remplacement-chiliennes-transats-marrakech`} className="text-[#B8860B] text-[11px] hover:underline font-medium line-clamp-1">
                              → Toiles Acryliques 320g/m²
                            </Link>
                          </div>
                          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-white text-[11px] uppercase">AMA Group</span>
                              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Attaqué</span>
                            </div>
                            <p className="text-white/60 text-[10.5px] font-light mb-2">Faille : Mobilier sans mousse drainante alvéolaire.</p>
                            <Link href={`/${locale}/blog/mousse-dryfeel-tissus-outdoor-piscine-marrakech`} className="text-[#B8860B] text-[11px] hover:underline font-medium line-clamp-1">
                              → Mousse Dryfeel Alvéolaire
                            </Link>
                          </div>
                          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-white text-[11px] uppercase">Mozaieq.com</span>
                              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Attaqué</span>
                            </div>
                            <p className="text-white/60 text-[10.5px] font-light mb-2">Faille : Textes sans métriques de laboratoire certifiées.</p>
                            <Link href={`/${locale}/blog/guide-tissus-outdoor-marrakech-riads-rooftops`} className="text-[#B8860B] text-[11px] hover:underline font-medium line-clamp-1">
                              → Normes Martindale 60k & UV 8
                            </Link>
                          </div>
                          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-bold text-white text-[11px] uppercase">Easy Linge Kech</span>
                              <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Attaqué</span>
                            </div>
                            <p className="text-white/60 text-[10.5px] font-light mb-2">Faille : Polycoton 140 fils basique sans classement non-feu.</p>
                            <Link href={`/${locale}/blog/amenagement-textile-b2b-renover-riad-hotel-luxe`} className="text-[#B8860B] text-[11px] hover:underline font-medium line-clamp-1">
                              → Percale 300 Fils & Norme M1
                            </Link>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70 font-light">
                          <div className="flex items-center gap-2">
                            <span className="text-[#B8860B] font-semibold uppercase text-[11px]">Cibles Backlinks & Digital PR :</span>
                            <span>Shoelifer · A+E Magazine (Architecture) · Maisons du Maroc · Guides Médina</span>
                          </div>
                          <span className="text-emerald-400 font-medium">Veille Opérationnelle ✓</span>
                        </div>
                      </div>
                    )}

                    {activeAgentTab === "bot2" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                          <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Voix d'Atelier Authentique</span>
                          <h4 className="text-sm font-bold text-white mb-2">Maître Hassan (25 ans de métier)</h4>
                          <p className="text-xs text-white/70 font-light leading-relaxed">
                            Chaque guide est rédigé dans le langage du métier : calculs de retraits après lavage, plombage invisible et résistance au vent du Chergui.
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                          <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Filtre Anti-Cliché IA</span>
                          <h4 className="text-sm font-bold text-white mb-2">100% Langage de Tapissier</h4>
                          <p className="text-xs text-white/70 font-light leading-relaxed">
                            Élimination des formules génériques d'IA. Remplacement par des formules réelles (ampleur 1.8x à 2.2x), coefficients acoustiques NRC et fiches de labo.
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                          <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Ancrage Climat Marrakech</span>
                          <h4 className="text-sm font-bold text-white mb-2">Climat de l'Atlas & Médina</h4>
                          <p className="text-xs text-white/70 font-light leading-relaxed">
                            Solutions pensées pour les 300 jours de soleil direct, la poussière siliceuse du désert et les amplitudes thermiques des riads.
                          </p>
                        </div>
                      </div>
                    )}

                    {activeAgentTab === "bot3" && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                          <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Direction Artistique & Curation</span>
                          <h4 className="text-sm font-bold text-white mb-2">Photographies Réelles 8K</h4>
                          <p className="text-xs text-white/70 font-light leading-relaxed">
                            Zéro image stock générique. Chaque photo est sélectionnée avec un rôle éditorial explicite (patio riad, découpe table, macro déperlance).
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                          <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Schemas Google Rich Snippets</span>
                          <h4 className="text-sm font-bold text-white mb-2">BlogPosting, FAQPage & Breadcrumb</h4>
                          <p className="text-xs text-white/70 font-light leading-relaxed">
                            Structuration JSON-LD conforme aux exigences SEO pour l'indexation dans Google Search et les moteurs génératifs (Perplexity, SGE).
                          </p>
                        </div>
                        <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                          <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Cadence Automatisée</span>
                          <h4 className="text-sm font-bold text-white mb-2">Intervalle de 2 à 4 Jours</h4>
                          <p className="text-xs text-white/70 font-light leading-relaxed">
                            Publication continue programmée dans le Sitemap XML pour un crawl naturel et une prise d'autorité rapide sur le marché marocain.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

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
          <section className="mb-20 sm:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* LEFT COLUMN: Featured Large Lead Post Card */}
              {leadPost && (
                <div className="lg:col-span-7 flex flex-col">
                  <Link
                    href={`/${locale}/blog/${leadPost.slug}`}
                    className="group relative flex-1 min-h-[400px] sm:min-h-[480px] lg:min-h-[520px] rounded-[32px] overflow-hidden border border-[#1c1b19]/10 shadow-[0_8px_30px_rgba(28,27,25,0.06)] hover:shadow-[0_20px_48px_rgba(28,27,25,0.14)] transition-all duration-700 flex flex-col justify-end"
                  >
                    {/* Background Master Architectural Image */}
                    <Image
                      src={leadPost.coverImage}
                      alt={leadPost.coverAlt}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                    />

                    {/* Subtle Frosted Dark Vignette at Bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                    {/* Content on Bottom Overlay */}
                    <div className="relative z-10 p-7 sm:p-9 md:p-10">
                      {/* Category Pill with Dot */}
                      <div className="mb-3.5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1 text-[11px] font-medium text-[#1c1b19] shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-[#B8860B]" />
                          {getBlogCategoryLabel(leadPost.category, isEn)}
                        </span>
                      </div>

                      {/* Headline in Natural Editorial Case (Readable, Luxury Typography) */}
                      <h2 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-white leading-snug tracking-tight font-sans group-hover:text-[#F3EEE6] transition-colors line-clamp-3">
                        {isEn ? leadPost.titleEn : leadPost.title}
                      </h2>

                      {/* Meta line: Date • Reading time • Author */}
                      <div className="mt-3.5 flex items-center gap-2 text-xs text-white/75 font-light">
                        <span>{formatDate(leadPost.publishedAt)}</span>
                        <span>•</span>
                        <span>{leadPost.readingTime} {isEn ? "read" : "de lecture"}</span>
                        <span>•</span>
                        <span className="text-white/60">{leadPost.author.name}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              {/* RIGHT COLUMN: "Latest post" List Stack (Matching Reference Layout) */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  {/* Section Title */}
                  <div className="flex items-center justify-between mb-5 px-1">
                    <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-[#1c1b19] tracking-tight">
                      {isEn ? "Latest post" : "Derniers articles"}
                    </h2>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B8860B]">
                      {latestPosts.length} {isEn ? "recent guides" : "dossiers récents"}
                    </span>
                  </div>

                  {/* 4 Clean Airy Rows */}
                  <div className="space-y-3.5">
                    {latestPosts.map((post) => (
                      <Link
                        key={post.slug}
                        href={`/${locale}/blog/${post.slug}`}
                        className="group flex items-center gap-4 p-2.5 rounded-2xl hover:bg-white hover:shadow-xs border border-transparent hover:border-[#1c1b19]/8 transition-all duration-300"
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
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8860B] block mb-1">
                            {getBlogCategoryLabel(post.category, isEn)}
                          </span>
                          <h3 className="text-xs sm:text-[13.5px] font-semibold text-[#1c1b19] group-hover:text-[#B8860B] transition-colors line-clamp-2 leading-snug font-sans">
                            {isEn ? post.titleEn : post.title}
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
          <section className="mb-20 sm:mb-24">
            {/* Header with Title on Left, Navigation Arrows on Right */}
            <div className="flex items-center justify-between mb-8 sm:mb-10 px-1">
              <div>
                <h2 className="font-sans text-xl sm:text-2xl font-extrabold text-[#1c1b19] tracking-tight">
                  {isEn ? "Founders corner" : "Carnet d'Atelier & Savoir-Faire"}
                </h2>
                <p className="text-xs sm:text-sm text-[#1c1b19]/60 font-light mt-1">
                  {isEn
                    ? "Master artisan techniques, measuring formulas and technical metrics."
                    : "Transmission de métier, formules de métrage de rideaux et ingénierie textile in & outdoor."}
                </p>
              </div>

              {/* Slider Arrows (Circle Outlined) */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevFounders}
                  className="w-10 h-10 rounded-full border border-[#1c1b19]/20 bg-white flex items-center justify-center text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all shadow-xs cursor-pointer"
                  aria-label="Previous articles"
                >
                  ←
                </button>
                <button
                  onClick={handleNextFounders}
                  className="w-10 h-10 rounded-full border border-[#1c1b19]/20 bg-white flex items-center justify-center text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all shadow-xs cursor-pointer"
                  aria-label="Next articles"
                >
                  →
                </button>
              </div>
            </div>

            {/* 3 Columns of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
              {displayedFoundersPosts.map((post, idx) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="group rounded-[28px] bg-white p-6 sm:p-7 border border-[#1c1b19]/10 shadow-[0_4px_24px_rgba(28,27,25,0.03)] hover:shadow-[0_16px_40px_rgba(28,27,25,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Rounded Image Thumbnail */}
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="block relative aspect-[16/10] rounded-2xl overflow-hidden mb-5 border border-[#1c1b19]/10 bg-[#f0ece5]"
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
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[10.5px] font-semibold tracking-wider uppercase text-[#1c1b19]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                        {getBlogCategoryLabel(post.category, isEn)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-sans text-base sm:text-lg font-bold text-[#1c1b19] group-hover:text-[#B8860B] transition-colors line-clamp-2 leading-snug">
                      <Link href={`/${locale}/blog/${post.slug}`}>
                        {isEn ? post.titleEn : post.title}
                      </Link>
                    </h3>

                    {/* Excerpt Description */}
                    <p className="mt-2.5 text-xs font-light text-[#1c1b19]/70 line-clamp-3 leading-relaxed">
                      {isEn ? post.excerptEn : post.excerpt}
                    </p>
                  </div>

                  {/* Footer Meta */}
                  <div className="mt-6 pt-4 border-t border-[#1c1b19]/10 flex items-center justify-between text-[11px] text-[#1c1b19]/60 font-light">
                    <div className="flex items-center gap-1.5">
                      <span>{formatDateShort(post.publishedAt)}</span>
                      <span>•</span>
                      <span>{post.readingTime}</span>
                    </div>
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="font-medium text-[#1c1b19] group-hover:text-[#B8860B] transition-colors flex items-center gap-1"
                    >
                      {isEn ? "Read guide" : "Lire"} →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Bottom Minimal Pagination (Matching the Screenshot: ← 1 2 3 →) */}
            <div className="mt-16 flex items-center justify-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  setActivePaginationPage((p) => Math.max(1, p - 1));
                  handlePrevFounders();
                }}
                disabled={activePaginationPage === 1}
                className="w-9 h-9 rounded-full border border-[#1c1b19]/20 bg-white flex items-center justify-center text-xs text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#1c1b19] cursor-pointer"
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
                    className={`w-9 h-9 rounded-full text-xs font-medium flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#1c1b19] text-white shadow-xs"
                        : "bg-white text-[#1c1b19]/70 border border-[#1c1b19]/10 hover:border-[#1c1b19]/30 hover:text-[#1c1b19]"
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
                className="w-9 h-9 rounded-full border border-[#1c1b19]/20 bg-white flex items-center justify-center text-xs text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-[#1c1b19] cursor-pointer"
                aria-label="Next page"
              >
                →
              </button>
            </div>
          </section>
        )}

        {/* Editorial Dispatch & Pro Consultation Block */}
        <section className="rounded-[32px] bg-[#141413] text-[#faf8f5] p-8 sm:p-14 relative overflow-hidden shadow-xl">
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-15 w-80 h-80">
            <Image
              src="/icon-light.png"
              alt="Kansotex Watermark"
              fill
              className="object-contain"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#B8860B] block mb-2.5">
              {isEn ? "THE KANSOTEX DISPATCH & B2B" : "LE CARNET D'ÉTOFFES · PRESCRIPTION"}
            </span>
            <h3 className="font-sans text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight leading-snug">
              {isEn
                ? "Bespoke Fabric Trends & Architecture Dossiers"
                : "Dossiers de Matière, Normes Textiles & Inspirations"}
            </h3>
            <p className="mt-3 text-xs sm:text-sm font-light text-[#faf8f5]/70 leading-relaxed">
              {isEn
                ? "Every two weeks: master artisan secrets, curtain yardage guides, UV protection insights and Moroccan architectural showcases."
                : "Recevez les secrets de coupe de notre atelier de Marrakech, les guides de métrage sur-mesure et l'accès prioritaire à nos stocks professionnels."}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={isEn ? "Your professional email..." : "Votre adresse email professionnelle..."}
                className="rounded-full bg-white/10 border border-white/20 px-6 py-3.5 text-xs text-white placeholder:text-white/40 focus:border-white focus:outline-none flex-1"
              />
              <button className="rounded-full bg-white text-[#141413] px-8 py-3.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#faf8f5] transition-all shrink-0 cursor-pointer">
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
