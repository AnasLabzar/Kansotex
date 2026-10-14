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
  const [activeAgentTab, setActiveAgentTab] = useState<"bot1" | "bot2" | "bot3">("bot1");
  const [showAgentShowcase, setShowAgentShowcase] = useState(true);

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

  // Lead story is the latest article
  const leadPost = filteredPosts[0] || initialPosts[0];
  const gridPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : filteredPosts;

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

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1c1b19] selection:bg-[#1c1b19] selection:text-[#FBF9F5]">
      <Header overlay={false} />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-[#1c1b19]/10">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#1c1b19_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1c1b19]/15 bg-[#1c1b19]/[0.03] px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B8860B] animate-pulse" />
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#1c1b19]/70">
              {isEn ? "EDITORIAL JOURNAL & EXPERTISE" : "LE JOURNAL KANSOTEX · HAUTE FACTURE"}
            </span>
          </div>

          <h1 className="font-termina text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#1c1b19] max-w-4xl mx-auto leading-[1.15]">
            {removeAccents(
              isEn
                ? "The Textile Gazette & Architecture"
                : "Carnet d'Étoffes, Architecture & Savoir-Faire"
            )}
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg font-light text-[#1c1b19]/75 max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? "In-depth insights, master artisan advice, technical textile standards, and architectural inspirations from our Marrakech manufacture."
              : "Analyses de matière, conseils de maîtres tisseurs, normes techniques in & outdoor et inspirations architecturales depuis notre manufacture de Marrakech."}
          </p>

          {/* Search Input */}
          <div className="mt-10 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? "Search an article, technique, linen..." : "Rechercher un guide, lin, velours, outdoor..."}
              className="w-full rounded-full border border-[#1c1b19]/20 bg-white/90 px-6 py-3.5 pl-12 text-xs sm:text-sm tracking-wide text-[#1c1b19] placeholder:text-[#1c1b19]/40 focus:border-[#1c1b19] focus:outline-none focus:ring-1 focus:ring-[#1c1b19] shadow-sm transition-all"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1c1b19]/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#1c1b19]/50 hover:text-[#1c1b19]"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category Pills Navigation */}
      <section className="sticky top-[70px] z-30 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#1c1b19]/10 py-3.5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`shrink-0 rounded-full px-4 py-2 text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-[#1c1b19] text-[#FBF9F5] shadow-sm font-medium"
                    : "bg-[#1c1b19]/5 text-[#1c1b19]/70 hover:bg-[#1c1b19]/10 hover:text-[#1c1b19]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* Multi-Agent Editorial Intelligence Engine (3 Collaborative Bots) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-8 sm:pt-10">
        <div className="rounded-3xl bg-[#141413] text-[#faf8f5] p-6 sm:p-10 border border-white/10 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(184,134,11,0.15),transparent_70%)] pointer-events-none" />

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/30 bg-[#B8860B]/10 px-3.5 py-1 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#B8860B] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8860B]">
                  ÉCOSYSTÈME MULTI-AGENTS KANSOTEX · 3 BOTS OPÉRATIONNELS
                </span>
              </div>
              <h2 className="font-termina text-lg sm:text-2xl font-bold uppercase tracking-tight text-white">
                {removeAccents("Comment Nos 3 Bots Travaillent Pour Dominer le Marché")}
              </h2>
              <p className="text-xs sm:text-sm font-light text-white/70 mt-1 max-w-2xl">
                {isEn
                  ? "Discover how our 3 collaborative AI personas analyze competitor loopholes, write 100% human-grade master weaver guides, and automate publishing."
                  : "Consultez en direct les actions concrètes menées par nos 3 bots d'intelligence : radar des concurrents, rédaction d'artisan sans cliché IA et cadence de publication."}
              </p>
            </div>

            <Link
              href={`/${locale}/blog/studio`}
              className="inline-flex items-center gap-2 rounded-full bg-[#B8860B] text-[#141413] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-white transition-all shadow-md shrink-0 cursor-pointer"
            >
              <span>Ouvrir le Studio Cockpit IA</span>
              <span>→</span>
            </Link>
          </div>

          {/* Agent Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 mb-6 overflow-x-auto no-scrollbar relative z-10">
            <button
              onClick={() => setActiveAgentTab("bot1")}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
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
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
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
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeAgentTab === "bot3"
                  ? "bg-[#B8860B] text-[#141413]"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span>⚙️</span>
              <span>BOT 3 : Chef de Projet & Automatisation</span>
            </button>
          </div>

          {/* Tab Panels */}
          <div className="relative z-10 text-xs sm:text-sm">
            {activeAgentTab === "bot1" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white uppercase text-[11px]">Transat.ma</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Attaqué</span>
                    </div>
                    <p className="text-[11px] text-white/60 mb-2 font-light">
                      <strong className="text-white/80">Faille :</strong> Toiles chiliennes basiques qui décolorent.
                    </p>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-[10px] text-[#B8860B] font-semibold block uppercase">Article Déployé :</span>
                      <Link href={`/${locale}/blog/toiles-remplacement-chiliennes-transats-marrakech`} className="text-white text-[11px] hover:underline font-medium line-clamp-1">
                        Toiles de Remplacement Chiliennes (Acrylique 320g/m²)
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white uppercase text-[11px]">AMA Group</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Attaqué</span>
                    </div>
                    <p className="text-[11px] text-white/60 mb-2 font-light">
                      <strong className="text-white/80">Faille :</strong> Mobilier lourd sans expertise textile ni mousse drainante.
                    </p>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-[10px] text-[#B8860B] font-semibold block uppercase">Article Déployé :</span>
                      <Link href={`/${locale}/blog/mousse-dryfeel-tissus-outdoor-piscine-marrakech`} className="text-white text-[11px] hover:underline font-medium line-clamp-1">
                        Mousse Dryfeel Réticulée & Tissus Imperméables
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white uppercase text-[11px]">Mozaieq.com</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Attaqué</span>
                    </div>
                    <p className="text-[11px] text-white/60 mb-2 font-light">
                      <strong className="text-white/80">Faille :</strong> Textes descriptifs sans chiffres certifiés de labo.
                    </p>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-[10px] text-[#B8860B] font-semibold block uppercase">Article Déployé :</span>
                      <Link href={`/${locale}/blog/guide-tissus-outdoor-marrakech-riads-rooftops`} className="text-white text-[11px] hover:underline font-medium line-clamp-1">
                        Guide Tissus Outdoor (Martindale 60k & UV Grade 8/8)
                      </Link>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-white uppercase text-[11px]">Easy Linge Kech</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">Attaqué</span>
                    </div>
                    <p className="text-[11px] text-white/60 mb-2 font-light">
                      <strong className="text-white/80">Faille :</strong> Dominé par le polycoton 140 fils basique.
                    </p>
                    <div className="pt-2 border-t border-white/10">
                      <span className="text-[10px] text-[#B8860B] font-semibold block uppercase">Article Déployé :</span>
                      <Link href={`/${locale}/blog/amenagement-textile-b2b-renover-riad-hotel-luxe`} className="text-white text-[11px] hover:underline font-medium line-clamp-1">
                        Linge Hôtelier & Normes Non-Feu M1 Riads
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs text-white/70 font-light">
                  <div className="flex items-center gap-2">
                    <span className="text-[#B8860B] font-semibold uppercase text-[11px]">Cibles Backlinks & RP Actives :</span>
                    <span>Shoelifer · A+E Magazine (Architecture) · Maisons du Maroc · Guides Sidi Ghanem</span>
                  </div>
                  <span className="text-emerald-400 font-medium">Radar de Marché : Opérationnel ✓</span>
                </div>
              </div>
            )}

            {activeAgentTab === "bot2" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Voix d'Atelier Authentique</span>
                  <h4 className="text-sm font-bold text-white mb-2">Maître Hassan (Chef d'Atelier)</h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Chaque guide est rédigé dans le langage du métier avec plus de 25 ans d'expérience du tissage à Marrakech : respect des retraits après lavage, calculs de plombage et résistance au vent du Chergui.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Garantie Anti-Cliché IA</span>
                  <h4 className="text-sm font-bold text-white mb-2">Filtre Humain & Technique</h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Zéro phrases génériques comme "dans cet article nous allons explorer". Remplacement systématique par des calculs réels de métrage (ampleur 1.8x à 2.2x), des coefficients acoustiques et des fiches de tests.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Ancrage Architectural</span>
                  <h4 className="text-sm font-bold text-white mb-2">Climat de Marrakech & Atlas</h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Dialogue direct avec l'environnement : toits-terrasses de Guéliz, patios ombragés de la Médina, villas de la Palmeraie et contraintes d'ensoleillement de 300 jours par an.
                  </p>
                </div>
              </div>
            )}

            {activeAgentTab === "bot3" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Cadence de Publication</span>
                  <h4 className="text-sm font-bold text-white mb-2">Tous les 2 à 4 Jours</h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Un algorithme chronologique intelligent espace automatiquement la parution des dossiers techniques pour stimuler en continu le crawl de Googlebot sans pic artificiel.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Google AI Overviews</span>
                  <h4 className="text-sm font-bold text-white mb-2">Schemas JSON-LD Avancés</h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Génération automatique des balises Schema.org/BlogPosting, FAQPage et BreadcrumbList permettant aux moteurs génératifs (Perplexity, ChatGPT, SGE) d'extraire les réponses Kansotex.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                  <span className="text-[#B8860B] font-semibold text-xs uppercase block mb-1">Commerce Connecté</span>
                  <h4 className="text-sm font-bold text-white mb-2">Cross-Selling Contextuel</h4>
                  <p className="text-xs text-white/70 font-light leading-relaxed">
                    Chaque article intègre automatiquement les fiches produits associées (ex: Toile Outdoor Atlas, Velours Guéliz) avec boutons de redirection directe vers les matières.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-20">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white/60 rounded-2xl border border-[#1c1b19]/10 p-10">
            <p className="text-lg font-light text-[#1c1b19]/70 mb-4">
              {isEn ? "No articles match your search." : "Aucun article ne correspond à votre recherche."}
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="text-xs uppercase tracking-widest text-[#B8860B] underline hover:opacity-80"
            >
              {isEn ? "Reset all filters" : "Réinitialiser tous les filtres"}
            </button>
          </div>
        ) : (
          <>
            {/* Featured Lead Story (Hero Card) - Only when "all" is active and no search query */}
            {selectedCategory === "all" && !searchQuery && leadPost && (
              <div className="mb-16 sm:mb-24">
                <Link
                  href={`/${locale}/blog/${leadPost.slug}`}
                  className="group block relative overflow-hidden rounded-2xl bg-white border border-[#1c1b19]/10 shadow-[0_10px_30px_rgba(28,27,25,0.04)] hover:shadow-[0_20px_40px_rgba(28,27,25,0.08)] transition-all duration-500"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Visual Cover */}
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:col-span-7 overflow-hidden min-h-[300px] sm:min-h-[420px]">
                      <Image
                        src={leadPost.coverImage}
                        alt={leadPost.coverAlt}
                        fill
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-5 left-5 z-10">
                        <span className="rounded-full bg-[#1c1b19]/90 text-white backdrop-blur-sm px-3.5 py-1.5 text-[10px] font-medium tracking-[0.15em] uppercase">
                          {leadPost.category}
                        </span>
                      </div>
                    </div>

                    {/* Editorial Content */}
                    <div className="lg:col-span-5 p-7 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
                      <div>
                        <div className="flex items-center gap-3 text-xs text-[#1c1b19]/60 font-light mb-4">
                          <span>{formatDate(leadPost.publishedAt)}</span>
                          <span>·</span>
                          <span>{leadPost.readingTime} de lecture</span>
                        </div>

                        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#B8860B] block mb-2">
                          {leadPost.kicker}
                        </span>

                        <h2 className="font-termina text-xl sm:text-2xl lg:text-3xl font-bold uppercase leading-snug tracking-tight text-[#1c1b19] group-hover:text-[#B8860B] transition-colors">
                          {removeAccents(isEn ? leadPost.titleEn : leadPost.title)}
                        </h2>

                        <p className="mt-4 text-xs sm:text-sm font-light text-[#1c1b19]/75 leading-relaxed line-clamp-4">
                          {isEn ? leadPost.excerptEn : leadPost.excerpt}
                        </p>
                      </div>

                      {/* Author & CTA */}
                      <div className="mt-8 pt-6 border-t border-[#1c1b19]/10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative h-9 w-9 rounded-full overflow-hidden border border-[#1c1b19]/20">
                            <Image
                              src={leadPost.author.avatar}
                              alt={leadPost.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-[#1c1b19]">{leadPost.author.name}</p>
                            <p className="text-[10px] text-[#1c1b19]/60">{leadPost.author.role}</p>
                          </div>
                        </div>

                        <span className="text-xs font-semibold uppercase tracking-wider text-[#1c1b19] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          {isEn ? "Read article" : "Lire l'article"} →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Grid of Other Articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {(selectedCategory === "all" && !searchQuery ? gridPosts : filteredPosts).map(
                (post, idx) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#1c1b19]/10 shadow-[0_4px_20px_rgba(28,27,25,0.03)] hover:shadow-[0_12px_30px_rgba(28,27,25,0.08)] transition-all duration-300"
                  >
                    <Link href={`/${locale}/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.coverAlt}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute top-4 left-4 z-10">
                        <span className="rounded-full bg-white/95 backdrop-blur-sm px-3 py-1 text-[10px] font-medium tracking-[0.15em] uppercase text-[#1c1b19] shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </Link>

                    <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-2 text-[11px] text-[#1c1b19]/60 font-light mb-2.5">
                          <span>{formatDate(post.publishedAt)}</span>
                          <span>·</span>
                          <span>{post.readingTime}</span>
                        </div>

                        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#B8860B] block mb-1.5">
                          {post.kicker}
                        </span>

                        <h3 className="font-termina text-base sm:text-lg font-bold uppercase leading-snug tracking-tight text-[#1c1b19] group-hover:text-[#B8860B] transition-colors line-clamp-2">
                          <Link href={`/${locale}/blog/${post.slug}`}>
                            {removeAccents(isEn ? post.titleEn : post.title)}
                          </Link>
                        </h3>

                        <p className="mt-3 text-xs font-light text-[#1c1b19]/70 leading-relaxed line-clamp-3">
                          {isEn ? post.excerptEn : post.excerpt}
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-[#1c1b19]/10 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="relative h-7 w-7 rounded-full overflow-hidden border border-[#1c1b19]/20">
                            <Image
                              src={post.author.avatar}
                              alt={post.author.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-[11px] font-medium text-[#1c1b19]/80 truncate max-w-[130px]">
                            {post.author.name}
                          </span>
                        </div>

                        <Link
                          href={`/${locale}/blog/${post.slug}`}
                          className="text-[11px] font-semibold uppercase tracking-wider text-[#1c1b19] group-hover:translate-x-1 transition-transform"
                        >
                          {isEn ? "Read" : "Lire"} →
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                )
              )}
            </div>
          </>
        )}

        {/* Editorial Newsletter & Consultation Block */}
        <div className="mt-24 rounded-3xl bg-[#141413] text-[#faf8f5] p-8 sm:p-14 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-15 w-80 h-80">
            <Image
              src="/icon-light.png"
              alt="Kansotex Watermark"
              fill
              className="object-contain"
            />
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#B8860B] block mb-3">
              {isEn ? "THE KANSOTEX DISPATCH" : "LE CARNET D'ÉTOFFES"}
            </span>
            <h3 className="font-termina text-xl sm:text-3xl font-bold uppercase tracking-tight leading-snug">
              {removeAccents(
                isEn
                  ? "Receive our bespoke fabric trends & technical dossiers"
                  : "Recevez nos dossiers de matière, normes textiles & inspirations"
              )}
            </h3>
            <p className="mt-4 text-xs sm:text-sm font-light text-[#faf8f5]/70 leading-relaxed">
              {isEn
                ? "Every two weeks: master artisan secrets, curtain yardage guides, UV protection insights and Moroccan architectural showcases."
                : "Tous les quinze jours : secrets de confection de notre atelier de Marrakech, fiches techniques in & outdoor et visites exclusives de riads habillés par notre maison."}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder={isEn ? "Your professional email..." : "Votre adresse email..."}
                className="rounded-full bg-white/10 border border-white/20 px-6 py-3.5 text-xs text-white placeholder:text-white/40 focus:border-white focus:outline-none focus:ring-1 focus:ring-white flex-1"
              />
              <button className="rounded-full bg-white text-[#141413] px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-[#faf8f5] transition-all shrink-0">
                {isEn ? "Subscribe" : "S'abonner"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
