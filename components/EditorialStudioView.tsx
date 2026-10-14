"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BLOG_POSTS } from "@/lib/blog-data";
import { UPCOMING_TOPIC_PIPELINE } from "@/lib/blog-automation";
import { MarketingDirectorBot, ContentWriterBot, ProjectManagerBot, MarketIntelligenceBrief } from "@/lib/editorial-agents";
import { removeAccents } from "@/lib/text";

interface EditorialStudioViewProps {
  locale: string;
}

export function EditorialStudioView({ locale }: EditorialStudioViewProps) {
  const [activeTab, setActiveTab] = useState<"bots" | "competitors" | "schedule" | "backlinks">("bots");
  const [simulating, setSimulating] = useState(false);

  const marketingBot = new MarketingDirectorBot();
  const writerBot = new ContentWriterBot();
  const pmBot = new ProjectManagerBot();

  const briefs = marketingBot.getStrategicOpportunities();
  const [simulatedBrief, setSimulatedBrief] = useState<MarketIntelligenceBrief | null>(briefs[0] || null);

  const handleSimulatePipeline = (brief: MarketIntelligenceBrief) => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      setSimulatedBrief(brief);
    }, 1200);
  };

  const isEn = locale === "en";

  return (
    <div className="min-h-screen bg-[#141413] text-[#faf8f5] selection:bg-[#B8860B] selection:text-white">
      <Header overlay={false} />

      {/* Studio Header */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(#faf8f5_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/30 bg-[#B8860B]/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-[#B8860B] animate-pulse" />
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#B8860B]">
                MULTI-AGENT EDITORIAL INTELLIGENCE SYSTEM
              </span>
            </div>

            <Link
              href={`/${locale}/blog`}
              className="text-xs uppercase tracking-wider text-white/70 hover:text-white transition-colors"
            >
              ← {isEn ? "View Public Journal" : "Voir le Journal Public"}
            </Link>
          </div>

          <h1 className="font-termina text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white max-w-4xl leading-[1.15]">
            {removeAccents(
              isEn
                ? "Autonomous Editorial Studio & Market Radar"
                : "Studio Éditorial Autonome & Radar Concurrentiel"
            )}
          </h1>

          <p className="mt-4 text-sm sm:text-base font-light text-white/70 max-w-3xl leading-relaxed">
            {isEn
              ? "Coordination of 3 specialized AI agents: Market Intelligence Director (trends & competitor flaws), Human-Grade Luxury Writer (master weaver tone & technical textile specs), and Project Manager (architecture, rich schemas & scheduled publishing)."
              : "Coordination de 3 agents spécialisés : Direction Stratégie & Veille (failles concurrentes et intentions d'achat), Plume Haute Facture (ton artisan, normes techniques ISO/Martindale) et Chef de Projet Éditorial (architecture, balises Schema.org et calendrier automatisé 2-4 jours)."}
          </p>

          {/* Tab Navigation */}
          <div className="mt-10 flex flex-wrap gap-2 border-b border-white/10 pb-4">
            <button
              onClick={() => setActiveTab("bots")}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "bots"
                  ? "bg-[#B8860B] text-white shadow-lg"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              🤖 Les 3 Bots Collaboratifs
            </button>
            <button
              onClick={() => setActiveTab("competitors")}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "competitors"
                  ? "bg-[#B8860B] text-white shadow-lg"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              🎯 Failles Concurrentes (SEO Radar)
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "schedule"
                  ? "bg-[#B8860B] text-white shadow-lg"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              📅 Calendrier 2-4 Jours ({BLOG_POSTS.length} Publiés)
            </button>
            <button
              onClick={() => setActiveTab("backlinks")}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all ${
                activeTab === "backlinks"
                  ? "bg-[#B8860B] text-white shadow-lg"
                  : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              🔗 Backlinks & Digital PR (Shoelifer, A+E)
            </button>
          </div>
        </div>
      </section>

      {/* Tab 1: The 3 Bots Live Pipeline */}
      {activeTab === "bots" && (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* BOT 1 */}
            <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-7 sm:p-8 flex flex-col justify-between hover:border-[#B8860B]/50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-[#B8860B]/20 text-[#B8860B] px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    BOT 1 · STRATÉGIE
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <h3 className="font-termina text-lg font-bold text-white mb-2">
                  Marketing Director
                </h3>
                <p className="text-xs text-white/60 font-light mb-6">
                  Veille des tendances internationales (Etoffe.com, Sunbrella, Pierre Frey) et locales (Sidi Ghanem, Hôtellerie Marrakech).
                </p>

                <div className="space-y-3 border-t border-white/10 pt-5 text-xs font-light text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="text-[#B8860B] font-bold">✓</span>
                    <span>Analyse des failles : Transat.ma, Mozaieq, AMA Group, ASD.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#B8860B] font-bold">✓</span>
                    <span>Mapping des intentions transactionnelles & B2B hôtelier.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#B8860B] font-bold">✓</span>
                    <span>Identification des opportunités de backlinks (Digital PR).</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">
                  Dernier Briefing Émis :
                </span>
                <p className="text-xs text-[#B8860B] font-medium line-clamp-1">
                  Toiles de Remplacement Chiliennes & Mousse Dryfeel
                </p>
              </div>
            </div>

            {/* BOT 2 */}
            <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-7 sm:p-8 flex flex-col justify-between hover:border-[#B8860B]/50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-amber-500/20 text-amber-300 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    BOT 2 · PLUME ÉLITE
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <h3 className="font-termina text-lg font-bold text-white mb-2">
                  Content Writer (Maître Tisseur)
                </h3>
                <p className="text-xs text-white/60 font-light mb-6">
                  Rédaction humaine haute facture. Élimination totale des clichés IA. Intégration de métriques réelles et ancrage marocain.
                </p>

                <div className="space-y-3 border-t border-white/10 pt-5 text-xs font-light text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Normes techniques réelles : Martindale 60k, ISO 105-B02, M1.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Storytelling d'artisan : Route de Safi, Médina, Guéliz, Chergui.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>Conseils pratiques : formules de métrage, tombé plombé 10cm.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">
                  Voix de Référence :
                </span>
                <p className="text-xs text-amber-300 font-medium">
                  Maître Hassan (25 ans d'atelier tapisserie)
                </p>
              </div>
            </div>

            {/* BOT 3 */}
            <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-7 sm:p-8 flex flex-col justify-between hover:border-[#B8860B]/50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="rounded-full bg-blue-500/20 text-blue-300 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                    BOT 3 · CHEF DE PROJET
                  </span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <h3 className="font-termina text-lg font-bold text-white mb-2">
                  Project Manager & SEO Engine
                </h3>
                <p className="text-xs text-white/60 font-light mb-6">
                  Architecture documentaire H1-H3, intégration Schema.org JSON-LD, curation d'images et maillage interne produit.
                </p>

                <div className="space-y-3 border-t border-white/10 pt-5 text-xs font-light text-white/80">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span>Schemas Google Rich Snippets : BlogPosting, FAQPage, Breadcrumb.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span>Cross-selling automatique vers fiches produits (/products/[slug]).</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span>Cadence automatisée tous les 2 à 4 jours sans intervention.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10">
                <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-2">
                  Synchronisation :
                </span>
                <p className="text-xs text-blue-300 font-medium">
                  Sitemap XML dynamique + Indexation continue
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Console */}
          <div className="mt-16 rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B8860B] block mb-1">
                  CENTRE DE COMMANDE ÉDITORIAL
                </span>
                <h3 className="font-termina text-xl sm:text-2xl font-bold uppercase text-white">
                  {removeAccents("Déclencher le Pipeline des 3 Bots")}
                </h3>
                <p className="text-xs font-light text-white/60 mt-1">
                  Sélectionnez une opportunité stratégique identifiée par le Marketing Director pour activer la plume de l'atelier.
                </p>
              </div>

              {simulating && (
                <div className="flex items-center gap-2 text-xs text-[#B8860B]">
                  <span className="animate-spin text-base">⚙</span>
                  <span>Coordination des 3 bots en cours...</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {briefs.map((brief) => (
                <div
                  key={brief.id}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col justify-between hover:bg-white/10 transition-all"
                >
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#B8860B] font-bold block mb-2">
                      Cible : {brief.competitorGapTargeted.competitor}
                    </span>
                    <h4 className="text-xs font-semibold text-white leading-snug mb-3">
                      {brief.topicTitle}
                    </h4>
                    <p className="text-[11px] font-light text-white/70 line-clamp-2 mb-4">
                      {brief.competitorGapTargeted.kansotexWinningAngle}
                    </p>
                  </div>

                  <button
                    onClick={() => handleSimulatePipeline(brief)}
                    disabled={simulating}
                    className="w-full rounded-full bg-white text-[#141413] py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-[#B8860B] hover:text-white transition-all disabled:opacity-50"
                  >
                    Activer la Génération →
                  </button>
                </div>
              ))}
            </div>

            {simulatedBrief && (
              <div className="mt-10 rounded-3xl bg-white/[0.04] border border-white/15 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 text-emerald-300 px-3 py-1 text-[10px] font-bold tracking-widest uppercase mb-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      PIPELINE VALIDÉE PAR LES 3 BOTS IA
                    </div>
                    <h4 className="font-termina text-base sm:text-xl font-bold text-white">
                      {simulatedBrief.topicTitle}
                    </h4>
                    <p className="text-xs text-white/60 font-light mt-1">
                      Catégorie : <span className="text-[#B8860B] font-medium">{simulatedBrief.category}</span> · Cible : {simulatedBrief.targetAudience}
                    </p>
                  </div>

                  <Link
                    href={`/${locale}/blog`}
                    className="rounded-full bg-[#B8860B] text-[#141413] px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shadow-md shrink-0 cursor-pointer"
                  >
                    Voir dans le Journal →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Bot 1 Output */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🎯</span>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        BOT 1 : DIRECTEUR MARKETING
                      </span>
                    </div>
                    <div className="space-y-2.5 text-xs text-white/80 font-light">
                      <p>
                        <strong className="text-white">Concurrent Attaqué :</strong>{" "}
                        <span className="text-rose-400 font-semibold">{simulatedBrief.competitorGapTargeted.competitor}</span>
                      </p>
                      <p className="text-white/60 italic text-[11px]">
                        "{simulatedBrief.competitorGapTargeted.competitorWeakness}"
                      </p>
                      <p>
                        <strong className="text-white">Angle Stratégique Kansotex :</strong>{" "}
                        <span className="text-amber-300">{simulatedBrief.competitorGapTargeted.kansotexWinningAngle}</span>
                      </p>
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-[10px] uppercase text-white/50 block font-medium mb-1">Mots-clés ciblés :</span>
                        <div className="flex flex-wrap gap-1">
                          {simulatedBrief.primaryKeywords.slice(0, 4).map((kw, i) => (
                            <span key={i} className="text-[10px] bg-white/10 rounded px-2 py-0.5 text-white/90">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-1">
                        <span className="text-[10px] uppercase text-white/50 block font-medium">Cibles RP / Backlinks :</span>
                        <p className="text-[11px] text-emerald-400 font-light">
                          {simulatedBrief.backlinkOutreachAngles.join(" · ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bot 2 Output */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🧵</span>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        BOT 2 : MAÎTRE HASSAN
                      </span>
                    </div>
                    <div className="space-y-2.5 text-xs text-white/80 font-light">
                      <p>
                        <strong className="text-white">Voix d'Artisan :</strong> Maître Hassan (Direction d'Atelier, 25 ans d'expérience tapisserie Marrakech).
                      </p>
                      <div className="p-2.5 rounded-lg bg-amber-500/[0.08] border border-amber-500/20 text-amber-200 text-[11px] italic leading-relaxed">
                        « Travailler la matière à Marrakech, c'est apprendre à dialoguer avec le soleil sans jamais tenter de tricher avec lui. »
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-[10px] uppercase text-white/50 block font-medium mb-1">Normes Techniques Validées :</span>
                        <ul className="space-y-1 text-[11px] text-white/90">
                          {simulatedBrief.technicalSpecsRequired.map((spec, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="text-[#B8860B]">✓</span>
                              <span>{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium pt-1">
                        ✓ Filtre anti-cliché IA : 100% de langage de métier réel
                      </p>
                    </div>
                  </div>

                  {/* Bot 3 Output */}
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">⚙️</span>
                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                          BOT 3 : CHEF DE PROJET
                        </span>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#B8860B] bg-[#B8860B]/20 px-2 py-0.5 rounded-full">
                        Direction Artistique
                      </span>
                    </div>
                    <div className="space-y-2.5 text-xs text-white/80 font-light">
                      <p>
                        <strong className="text-white">Structure :</strong> Sommaire dynamique, encadrés d'atelier, tableau comparatif et FAQ.
                      </p>
                      <p>
                        <strong className="text-white">Schemas Validés :</strong>{" "}
                        <span className="text-blue-300 font-mono text-[10px]">BlogPosting · FAQPage · BreadcrumbList</span>
                      </p>
                      <p>
                        <strong className="text-white">Maillage Interne :</strong> Recommandations automatiques vers les tissus d'ameublement du catalogue.
                      </p>
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-[10px] uppercase text-[#B8860B] block font-semibold mb-1">
                          Curation Visuelle Chef de Projet (Photos Réelles) :
                        </span>
                        <div className="space-y-1 text-[11px] text-white/90">
                          {simulatedBrief.recommendedImagery.map((img, i) => (
                            <div key={i} className="flex items-center gap-2 text-white/70">
                              <span className="text-[#B8860B]">📷</span>
                              <span className="font-mono text-[10px] text-white/90">{img}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-white/10">
                        <span className="text-[10px] uppercase text-white/50 block font-medium mb-1">Automatisation & Cadence :</span>
                        <p className="text-[11px] text-[#B8860B] font-medium">
                          Programmé dans le calendrier continu (intervalle 2 à 4 jours)
                        </p>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-medium pt-1">
                        ✓ Synchronisé avec Google Search Console & Sitemap
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Tab 2: Competitor Gaps Radar */}
      {activeTab === "competitors" && (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
          <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-10 overflow-hidden">
            <h3 className="font-termina text-xl font-bold uppercase text-white mb-6">
              {removeAccents("Matrice d'Attaque Concurrentielle (D'après le Rapport SEO)")}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/15 text-[10px] uppercase tracking-wider text-white/50">
                    <th className="pb-3 pr-4 font-semibold">Concurrent Ciblé</th>
                    <th className="pb-3 px-4 font-semibold">Spécialité & Forces</th>
                    <th className="pb-3 px-4 font-semibold text-rose-400">Faille Détectée</th>
                    <th className="pb-3 pl-4 font-semibold text-[#B8860B]">Stratégie d'Attaque Kansotex</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 font-light">
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-4 pr-4 font-semibold text-white">Transat.ma</td>
                    <td className="py-4 px-4 text-white/70">Mobilier outdoor, chiliennes bois pas cher (599 DH).</td>
                    <td className="py-4 px-4 text-rose-300">Toile polyester basique qui décolore rapidement sous UV.</td>
                    <td className="py-4 pl-4 text-[#B8860B]">
                      Cibler le mot-clé <strong>« toile de remplacement chilienne luxe »</strong> avec toiles acryliques garanties 8 ans.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-4 pr-4 font-semibold text-white">AMA Group (Amagroup.ma)</td>
                    <td className="py-4 px-4 text-white/70">Mobilier outdoor & stores sur-mesure (Casa, Kech, Tanger).</td>
                    <td className="py-4 px-4 text-rose-300">Très axé mobilier dur, très faible en contenu textile et mousse.</td>
                    <td className="py-4 pl-4 text-[#B8860B]">
                      Dominer la niche sémantique <strong>« tissu d'ameublement outdoor »</strong> et <strong>« mousse Dryfeel »</strong>.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-4 pr-4 font-semibold text-white">Mozaieq.com</td>
                    <td className="py-4 px-4 text-white/70">Textile studio lab de luxe, rideaux blackout, pergolas.</td>
                    <td className="py-4 px-4 text-rose-300">Design raffiné mais fiches manquant de données techniques scientifiques.</td>
                    <td className="py-4 pl-4 text-[#B8860B]">
                      Publier des dossiers techniques exhaustifs avec <strong>tests Martindale réels, ISO 105-B02 et classements M1</strong>.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-4 pr-4 font-semibold text-white">ASD Textiles</td>
                    <td className="py-4 px-4 text-white/70">Tissus d'ameublement à Sidi Ghanem, fiches techniques riches.</td>
                    <td className="py-4 px-4 text-rose-300">Site internet classique, peu optimisé UX/UI e-commerce moderne.</td>
                    <td className="py-4 pl-4 text-[#B8860B]">
                      Allier la même rigueur technique à une expérience d'achat digitale fluide et un branding <strong>Kanso</strong> épuré.
                    </td>
                  </tr>
                  <tr className="hover:bg-white/[0.02]">
                    <td className="py-4 pr-4 font-semibold text-white">Easy Linge Kech</td>
                    <td className="py-4 px-4 text-white/70">Linge hôtelier B2B à Marrakech, polycoton 60°C.</td>
                    <td className="py-4 px-4 text-rose-300">Orienté volume standard, pas de pur lin lavé ni percale de prestige.</td>
                    <td className="py-4 pl-4 text-[#B8860B]">
                      Capturer les riads de charme et hôtels boutiques de luxe avec notre <strong>Espace Pro / Hôtellerie Lin Lavé</strong>.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Tab 3: Publishing Schedule (2-4 Days Cadence) */}
      {activeTab === "schedule" && (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
          <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B8860B] block mb-1">
                  CADENCE D'AUTOMATION CALIBRÉE
                </span>
                <h3 className="font-termina text-xl font-bold uppercase text-white">
                  {removeAccents("Calendrier de Publication (Tous les 2 à 4 Jours)")}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs text-white/70">Cycle actif et régulier</span>
              </div>
            </div>

            <div className="space-y-4">
              {BLOG_POSTS.map((post, index) => (
                <div
                  key={post.slug}
                  className="rounded-2xl bg-white/5 border border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-[#B8860B] font-bold w-6">
                      #{index + 1}
                    </span>
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-white/15">
                      <Image
                        src={post.coverImage}
                        alt={post.coverAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/50 block">
                        {post.category} · {post.readingTime} de lecture
                      </span>
                      <h4 className="text-xs font-semibold text-white">
                        {post.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                      En Ligne
                    </span>
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="text-xs uppercase tracking-wider text-white/80 hover:text-[#B8860B] underline"
                    >
                      Consulter →
                    </Link>
                  </div>
                </div>
              ))}

              {UPCOMING_TOPIC_PIPELINE.map((topic, i) => (
                <div
                  key={topic.slug}
                  className="rounded-2xl bg-white/[0.02] border border-dashed border-white/15 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-80"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-white/40 font-bold w-6">
                      #{BLOG_POSTS.length + i + 1}
                    </span>
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-white/5">
                      <Image
                        src={topic.coverImage}
                        alt={topic.coverAlt}
                        fill
                        className="object-cover opacity-60"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-amber-400/70 block">
                        {topic.category} · Programmé dans +{(i + 1) * 3} jours
                      </span>
                      <h4 className="text-xs font-semibold text-white/90">
                        {topic.title}
                      </h4>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full shrink-0">
                    Planifié Automatique
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tab 4: Backlinks & Digital PR Strategy */}
      {activeTab === "backlinks" && (
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-7 sm:p-9">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B8860B] block mb-2">
                PRESSE LIFESTYLE MAROCAINE & DESIGN
              </span>
              <h3 className="font-termina text-lg font-bold uppercase text-white mb-4">
                Partenariats Rédactionnels Ciblés
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                Pour faire grimper l'autorité du domaine (Domain Authority - DA) de kansotex.com, les liens entrants issus de médias établis transmettent un jus SEO décisif :
              </p>

              <div className="space-y-4">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <h4 className="text-xs font-semibold text-white">Shoelifer (Média N°1 Luxe & Lifestyle Maroc)</h4>
                  <p className="text-[11px] text-white/60 mt-1">
                    Angle : Dossier 'Made in Morocco' et 'Rénover un salon de riad avec des étoffes locales nobles'.
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <h4 className="text-xs font-semibold text-white">A+E Magazine (Architecture + Environnement)</h4>
                  <p className="text-[11px] text-white/60 mt-1">
                    Angle : Spécifications techniques des toiles outdoor durables pour terrasses bioclimatiques et hôtels.
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <h4 className="text-xs font-semibold text-white">Maisons du Maroc & Déco Actuel</h4>
                  <p className="text-[11px] text-white/60 mt-1">
                    Angle : Communiqués de presse sur les nouvelles collections de lin d'Atlas pré-lavé et velours peigné.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-7 sm:p-9">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B8860B] block mb-2">
                ANNUAIRES DE LUXE & SALONS PRO
              </span>
              <h3 className="font-termina text-lg font-bold uppercase text-white mb-4">
                Ancrage Local Sidi Ghanem & B2B
              </h3>
              <p className="text-xs text-white/70 font-light leading-relaxed mb-6">
                L'écosystème de Marrakech confère un capital de confiance géographique unique :
              </p>

              <div className="space-y-4">
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <h4 className="text-xs font-semibold text-white">Guide Sidi Ghanem / Top 10 Marrakech</h4>
                  <p className="text-[11px] text-white/60 mt-1">
                    Fiche showroom officielle avec backlink DoFollow vers kansotex.com et géolocalisation Maps.
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <h4 className="text-xs font-semibold text-white">Salons Marocotel & EquipHotel</h4>
                  <p className="text-[11px] text-white/60 mt-1">
                    Référencement en tant qu'exposant fournisseur hôtelier officiel avec lien direct vers l'Espace Pro.
                  </p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                  <h4 className="text-xs font-semibold text-white">Annuaire des Architectes d'Intérieur (MarocBTP)</h4>
                  <p className="text-[11px] text-white/60 mt-1">
                    Partenariat de prescription avec accès direct aux dossiers techniques et boîtes d'échantillons textiles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
