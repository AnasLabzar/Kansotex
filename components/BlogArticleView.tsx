"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlogPost } from "@/lib/blog-data";
import { removeAccents } from "@/lib/text";
import { RichArticleContent } from "@/components/RichArticleContent";
import { getArticleAudit } from "@/lib/editorial-agents";

interface BlogArticleViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  locale: string;
}

export function BlogArticleView({ post, relatedPosts, locale }: BlogArticleViewProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAgentAudit, setShowAgentAudit] = useState(false);

  const isEn = locale === "en";
  const agentAudit = getArticleAudit(post.slug);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(Number(scrollPercent.toFixed(1)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
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

  // Structured Data (JSON-LD) for Google SEO Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: [post.coverImage],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: "Kansotex",
      logo: {
        "@type": "ImageObject",
        url: "https://kansotex.com/icon-kansotex.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://kansotex.com/${locale}/blog/${post.slug}`,
    },
    keywords: post.seoKeywords.join(", "),
  };

  const faqJsonLd = post.faqs && post.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1c1b19] selection:bg-[#1c1b19] selection:text-[#FBF9F5]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-[#1c1b19]/10">
        <div
          className="h-full bg-[#B8860B] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header overlay={false} />

      {/* Hero Article Header */}
      <header className="pt-28 pb-12 sm:pt-36 sm:pb-16 border-b border-[#1c1b19]/10 bg-white/40">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#1c1b19]/60 mb-6 font-light overflow-x-auto no-scrollbar">
            <Link href={`/${locale}`} className="hover:text-[#1c1b19] shrink-0">
              {isEn ? "Home" : "Accueil"}
            </Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-[#1c1b19] shrink-0">
              {isEn ? "The Journal" : "Le Journal"}
            </Link>
            <span>/</span>
            <span className="text-[#B8860B] truncate shrink-0">{post.category}</span>
          </nav>

          {/* Kicker */}
          <span className="inline-block text-[11px] font-semibold tracking-[0.25em] uppercase text-[#B8860B] mb-3">
            {post.kicker}
          </span>

          {/* Title */}
          <h1 className="font-termina text-2xl sm:text-4xl md:text-5xl font-bold uppercase leading-[1.2] tracking-tight text-[#1c1b19]">
            {removeAccents(isEn ? post.titleEn : post.title)}
          </h1>

          {/* Excerpt */}
          <p className="mt-6 text-base sm:text-lg font-light text-[#1c1b19]/80 leading-relaxed italic border-l-2 border-[#B8860B] pl-4 sm:pl-6">
            {isEn ? post.excerptEn : post.excerpt}
          </p>

          {/* Meta Author & Social Actions */}
          <div className="mt-8 pt-6 border-t border-[#1c1b19]/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative h-11 w-11 rounded-full overflow-hidden border border-[#1c1b19]/20 shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1c1b19]">{post.author.name}</p>
                <p className="text-[11px] text-[#1c1b19]/60 font-light">
                  {formatDate(post.publishedAt)} · {post.readingTime} de lecture
                </p>
              </div>
            </div>

            {/* Sharing buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#1c1b19]/15 bg-white px-3.5 py-1.5 text-xs font-light text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all"
                title="Copier le lien de l'article"
              >
                <span>{copied ? "✓ Copié" : "Partager"}</span>
              </button>

              <a
                href={`https://wa.me/?text=${encodeURIComponent(post.title + " - " + "https://kansotex.com/" + locale + "/blog/" + post.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-[#1c1b19]/15 bg-white text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all text-xs"
                title="Partager sur WhatsApp"
              >
                WA
              </a>

              <a
                href={post.pinterestUrl || "https://www.pinterest.com/kansotex"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-[#1c1b19]/15 bg-white text-[#1c1b19] hover:bg-[#1c1b19] hover:text-white transition-all text-xs"
                title="Épingler sur Pinterest"
              >
                Pin
              </a>
            </div>
          </div>

          {/* Multi-Agent Audit Capsule */}
          <div className="mt-8 rounded-2xl border border-[#B8860B]/30 bg-[#B8860B]/[0.04] p-4 sm:p-5 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2 w-2 rounded-full bg-[#B8860B] animate-pulse" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8860B]">
                  DOSSIER MULTI-AGENTS KANSOTEX (3 BOTS IA ACTIFS)
                </span>
              </div>
              <button
                onClick={() => setShowAgentAudit(!showAgentAudit)}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-[11px] font-medium text-[#1c1b19] border border-[#1c1b19]/15 hover:bg-[#1c1b19] hover:text-white transition-all shadow-2xs cursor-pointer"
              >
                <span>{showAgentAudit ? "Masquer l'Audit des Bots" : "Voir l'Ingénierie des 3 Bots →"}</span>
                <span className="text-xs">{showAgentAudit ? "▲" : "▼"}</span>
              </button>
            </div>

            {showAgentAudit && (
              <div className="mt-5 pt-4 border-t border-[#B8860B]/20 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                {/* Bot 1 */}
                <div className="rounded-xl bg-white p-4 border border-[#1c1b19]/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">🎯</span>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#1c1b19]">
                      BOT 1: DIRECTEUR MARKETING
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-[#1c1b19]/80 font-light">
                    <p>
                      <strong className="font-semibold text-[#1c1b19]">Faille Ciblée :</strong>{" "}
                      <span className="text-red-700 font-medium">{agentAudit.competitorTargeted}</span>
                    </p>
                    <p className="line-clamp-2 text-[#1c1b19]/70 italic">
                      "{agentAudit.competitorFlaw}"
                    </p>
                    <p className="pt-1 text-[#B8860B] font-medium">
                      Stratégie Kansotex : {agentAudit.kansotexWinningStrategy}
                    </p>
                  </div>
                </div>

                {/* Bot 2 */}
                <div className="rounded-xl bg-white p-4 border border-[#1c1b19]/10 shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">🧵</span>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#1c1b19]">
                      BOT 2: MAÎTRE HASSAN
                    </span>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-[#1c1b19]/80 font-light">
                    <p>
                      <strong className="font-semibold text-[#1c1b19]">Ton d'Écriture :</strong>{" "}
                      {agentAudit.writerVoice}
                    </p>
                    <p>
                      <strong className="font-semibold text-[#1c1b19]">Normes Validées :</strong>{" "}
                      {agentAudit.technicalStandards.join(" · ")}
                    </p>
                    <p className="pt-1 text-emerald-700 font-medium flex items-center gap-1">
                      <span>✓</span> Style 100% humain certifié (0 cliché IA)
                    </p>
                  </div>
                </div>

                {/* Bot 3 */}
                <div className="rounded-xl bg-white p-4 border border-[#1c1b19]/10 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">⚙️</span>
                      <span className="text-[10px] font-bold tracking-wider uppercase text-[#1c1b19]">
                        BOT 3: CHEF DE PROJET & CURATION
                      </span>
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#B8860B] bg-[#B8860B]/10 px-2 py-0.5 rounded-full">
                      Direction Artistique
                    </span>
                  </div>
                  <div className="space-y-2 text-[11px] text-[#1c1b19]/80 font-light">
                    <p>
                      <strong className="font-semibold text-[#1c1b19]">Données Structurées :</strong>{" "}
                      {agentAudit.schemas.join(", ")}
                    </p>
                    <p>
                      <strong className="font-semibold text-[#1c1b19]">Maillage Catalogue :</strong>{" "}
                      {agentAudit.internalLinks.join(", ")}
                    </p>
                    <div className="pt-1 border-t border-[#1c1b19]/10">
                      <strong className="font-semibold text-[#1c1b19] block mb-1">
                        Curation Visuelle (Choix du Chef de Projet) :
                      </strong>
                      <p className="text-[10.5px] italic text-[#1c1b19]/70 leading-relaxed bg-[#FBF9F5] p-2 rounded-lg border border-[#1c1b19]/5">
                        « {agentAudit.visualCuration.coverReason} »
                      </p>
                    </div>
                    {agentAudit.visualCuration.sectionVisuals && agentAudit.visualCuration.sectionVisuals.length > 0 && (
                      <div className="pt-1 space-y-1.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#B8860B] block">
                          Visuels In-Text Calibrés ({agentAudit.visualCuration.sectionVisuals.length}) :
                        </span>
                        {agentAudit.visualCuration.sectionVisuals.map((vis, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[10px] leading-tight">
                            <span className="text-[#B8860B] shrink-0 font-bold">•</span>
                            <div>
                              <span className="font-semibold text-[#1c1b19]">{vis.sectionTitle} : </span>
                              <span className="text-[#1c1b19]/70">{vis.contextualWhy}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="pt-1 text-[#1c1b19]/70 font-medium text-[10px]">
                      {agentAudit.publishCycle}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Cover Image */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 -mt-2 sm:-mt-4">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border border-[#1c1b19]/10 group">
          <Image
            src={post.coverImage}
            alt={post.coverAlt}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
            priority
            sizes="(max-width: 1200px) 100vw, 1100px"
          />
          <div className="absolute top-4 left-4 bg-[#1c1b19]/80 backdrop-blur-md text-[#FBF9F5] text-[10px] uppercase tracking-wider font-medium px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] animate-pulse" />
            Curation Visuelle Chef de Projet
          </div>
        </div>
        <div className="mt-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-[#1c1b19]/60 font-light">
          <p className="italic">
            <strong className="font-semibold text-[#1c1b19] not-italic">Cadre éditorial :</strong> {agentAudit.visualCuration?.coverReason || post.coverAlt}
          </p>
          <span className="text-[10px] uppercase tracking-wider text-[#B8860B] font-medium shrink-0">
            Haute Définition · Kansotex Marrakech
          </span>
        </div>
      </div>

      {/* Article Body & Sidebar */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sticky Table of Contents (Desktop Sidebar) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-[#1c1b19]/10 bg-white p-6 shadow-sm">
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8860B] block mb-3">
                {isEn ? "SUMMARY" : "SOMMAIRE DU DOSSIER"}
              </span>
              <ul className="space-y-2.5 text-xs font-light text-[#1c1b19]/75">
                {post.tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-[#B8860B] transition-colors block line-clamp-1 py-0.5"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Consultation Prompt */}
              <div className="mt-8 pt-6 border-t border-[#1c1b19]/10 text-center">
                <p className="text-[11px] text-[#1c1b19]/70 font-light leading-relaxed mb-3">
                  {isEn
                    ? "Planning a riad or villa project in Marrakech?"
                    : "Un projet d'aménagement in & outdoor à Marrakech ?"}
                </p>
                <Link
                  href={`/${locale}/pro`}
                  className="inline-block w-full rounded-full bg-[#1c1b19] text-[#FBF9F5] py-2.5 text-[10px] font-semibold uppercase tracking-wider hover:bg-[#B8860B] transition-colors"
                >
                  {isEn ? "B2B Project Quote" : "Demande de Devis Pro"}
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Article Content */}
          <main className="lg:col-span-8 space-y-12 text-[#1c1b19]">
            {/* Mobile Collapsible TOC */}
            <div className="lg:hidden rounded-xl border border-[#1c1b19]/10 bg-white p-5 mb-8">
              <details className="text-xs">
                <summary className="font-semibold uppercase tracking-wider text-[#B8860B] cursor-pointer">
                  {isEn ? "Table of Contents (Tap to view)" : "Sommaire du Dossier (Appuyer pour voir)"}
                </summary>
                <ul className="mt-4 space-y-2 font-light text-[#1c1b19]/80 pl-2">
                  {post.tableOfContents.map((item) => (
                    <li key={item.id}>
                      <a href={`#${item.id}`} className="hover:text-[#B8860B] block">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>

            {/* Structured Sections */}
            {post.sections.map((sec) => (
              <section key={sec.id} id={sec.id} className="scroll-mt-28 space-y-5">
                <h2 className="font-termina text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#1c1b19] border-b border-[#1c1b19]/10 pb-3">
                  {removeAccents(sec.heading)}
                </h2>

                <RichArticleContent content={sec.content} />

                {/* Callout Box */}
                {sec.callout && (
                  <div
                    className={`rounded-2xl p-5 sm:p-6 border ${
                      sec.callout.type === "warning"
                        ? "bg-amber-500/[0.06] border-amber-500/20 text-amber-950"
                        : sec.callout.type === "atelier"
                        ? "bg-[#1c1b19]/[0.04] border-[#1c1b19]/15 text-[#1c1b19]"
                        : "bg-[#B8860B]/[0.06] border-[#B8860B]/25 text-[#1c1b19]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8860B]">
                        {sec.callout.title}
                      </span>
                    </div>
                    <RichArticleContent
                      content={sec.callout.text}
                      className="text-xs sm:text-sm"
                    />
                  </div>
                )}

                {/* Pull Quote */}
                {sec.quote && (
                  <blockquote className="my-8 rounded-2xl bg-white border-l-4 border-[#B8860B] p-6 sm:p-8 shadow-sm">
                    <p className="text-base sm:text-lg font-serif italic text-[#1c1b19]/90 leading-relaxed">
                      “{sec.quote.text}”
                    </p>
                    <footer className="mt-4 text-xs font-medium text-[#1c1b19]/70">
                      — {sec.quote.author},{" "}
                      <span className="font-light italic text-[#1c1b19]/50">{sec.quote.role}</span>
                    </footer>
                  </blockquote>
                )}

                {/* Image Inside Section */}
                {sec.image && (
                  <div className="my-8">
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-[#1c1b19]/10 shadow-sm group">
                      <Image
                        src={sec.image.url}
                        alt={sec.image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        sizes="(max-width: 1024px) 100vw, 800px"
                      />
                      <div className="absolute top-3 left-3 bg-[#1c1b19]/85 backdrop-blur-md text-[#FBF9F5] text-[9px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B]" />
                        Direction Artistique Kansotex
                      </div>
                    </div>
                    {sec.image.caption && (
                      <p className="mt-2.5 text-center text-xs text-[#1c1b19]/70 font-light italic leading-relaxed">
                        {sec.image.caption}
                      </p>
                    )}
                  </div>
                )}
              </section>
            ))}

            {/* Technical Spec Table if available */}
            {post.technicalTable && (
              <div className="mt-14 rounded-2xl bg-white border border-[#1c1b19]/10 p-6 sm:p-8 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8860B]">
                    DOSSIER TECHNIQUE
                  </span>
                </div>
                <h3 className="font-termina text-base sm:text-lg font-bold uppercase text-[#1c1b19] mb-6">
                  {removeAccents(post.technicalTable.caption)}
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-[#1c1b19]/15 text-[10px] sm:text-xs uppercase tracking-wider text-[#1c1b19]/60">
                        <th className="pb-3 pr-4 font-semibold">Critère Technique</th>
                        <th className="pb-3 px-4 font-semibold text-[#B8860B]">Kansotex Marrakech</th>
                        <th className="pb-3 px-4 font-semibold">Standard Marché</th>
                        <th className="pb-3 pl-4 font-semibold">Impact Pratique</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1c1b19]/10 font-light">
                      {post.technicalTable.rows.map((row, i) => (
                        <tr key={i} className="hover:bg-[#1c1b19]/[0.02] transition-colors">
                          <td className="py-4 pr-4 font-medium text-[#1c1b19]">{row.metric}</td>
                          <td className="py-4 px-4 font-medium text-[#B8860B] bg-[#B8860B]/[0.03]">
                            {row.kansotexSpec}
                          </td>
                          <td className="py-4 px-4 text-[#1c1b19]/60">{row.standardMarket}</td>
                          <td className="py-4 pl-4 text-[#1c1b19]/80 text-xs leading-relaxed">
                            {row.practicalImpact}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Cross-Selling: Related Products in this article */}
            {post.relatedProducts && post.relatedProducts.length > 0 && (
              <div className="mt-16 rounded-3xl bg-[#1c1b19] text-[#FBF9F5] p-6 sm:p-10">
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B8860B] block mb-2">
                  ÉTOFFES MENTIONNÉES DANS CE GUIDE
                </span>
                <h3 className="font-termina text-lg sm:text-xl font-bold uppercase mb-6">
                  {removeAccents("Sélection de Matières Disponibles en Stock à Marrakech")}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.relatedProducts.map((prod) => (
                    <Link
                      key={prod.slug}
                      href={`/${locale}/products/${prod.slug}`}
                      className="group flex items-center gap-4 rounded-xl bg-white/5 border border-white/10 p-3.5 hover:bg-white/10 transition-all"
                    >
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0 border border-white/15">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase tracking-wider text-white/50 block">
                          {prod.category}
                        </span>
                        <p className="text-xs font-semibold text-white truncate group-hover:text-[#B8860B] transition-colors">
                          {prod.name}
                        </p>
                        <p className="text-[10px] text-white/70 font-light truncate">
                          {prod.highlight}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Link
                    href={`/${locale}/products`}
                    className="inline-block rounded-full bg-white text-[#1c1b19] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider hover:bg-[#B8860B] hover:text-white transition-all"
                  >
                    {isEn ? "View Entire Fabric Catalog" : "Explorer Tout le Catalogue de Matières"} →
                  </Link>
                </div>
              </div>
            )}

            {/* Interactive FAQs Section */}
            {post.faqs && post.faqs.length > 0 && (
              <div className="mt-16 rounded-2xl bg-white border border-[#1c1b19]/10 p-6 sm:p-8 shadow-sm">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8860B] block mb-2">
                  FOIRE AUX QUESTIONS
                </span>
                <h3 className="font-termina text-lg sm:text-xl font-bold uppercase mb-6">
                  {removeAccents("Questions Fréquentes de Nos Clients")}
                </h3>

                <div className="space-y-3">
                  {post.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-xl border border-[#1c1b19]/10 overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-medium text-xs sm:text-sm text-[#1c1b19] hover:bg-[#1c1b19]/[0.02]"
                        >
                          <span>{faq.question}</span>
                          <span className="text-base text-[#B8860B] font-serif shrink-0">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm font-light text-[#1c1b19]/80 leading-relaxed border-t border-[#1c1b19]/5 pt-3">
                            <RichArticleContent content={faq.answer} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Author Biography Dossier */}
            <div className="mt-16 rounded-2xl bg-white border border-[#1c1b19]/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 shadow-sm">
              <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-[#B8860B] shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B8860B] block mb-1">
                  À PROPOS DE L'AUTEUR
                </span>
                <h4 className="font-termina text-base font-bold text-[#1c1b19]">
                  {post.author.name}
                </h4>
                <p className="text-xs text-[#1c1b19]/60 font-light mb-3">{post.author.role}</p>
                <p className="text-xs font-light text-[#1c1b19]/80 leading-relaxed">
                  {post.author.bio}
                </p>
              </div>
            </div>

            {/* Backlink & Navigation */}
            <div className="mt-12 pt-8 border-t border-[#1c1b19]/10 flex items-center justify-between">
              <Link
                href={`/${locale}/blog`}
                className="text-xs uppercase tracking-wider font-semibold text-[#1c1b19] hover:text-[#B8860B] transition-colors"
              >
                ← {isEn ? "Back to Journal" : "Retour au Journal"}
              </Link>

              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className="text-xs uppercase tracking-wider font-light text-[#1c1b19]/60 hover:text-[#1c1b19]"
              >
                ↑ {isEn ? "Top of page" : "Haut de page"}
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* Related Articles Carousel / Grid */}
      {relatedPosts && relatedPosts.length > 0 && (
        <section className="bg-white border-t border-[#1c1b19]/10 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#B8860B] block mb-2">
                LECTURES COMPLÉMENTAIRES
              </span>
              <h3 className="font-termina text-xl sm:text-3xl font-bold uppercase text-[#1c1b19]">
                {removeAccents(isEn ? "Continue Your Discovery" : "Poursuivre la Découverte")}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${locale}/blog/${rel.slug}`}
                  className="group flex flex-col bg-[#FBF9F5] rounded-2xl overflow-hidden border border-[#1c1b19]/10 hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={rel.coverImage}
                      alt={rel.coverAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#B8860B] font-semibold block mb-2">
                        {rel.category}
                      </span>
                      <h4 className="font-termina text-sm font-bold uppercase leading-snug line-clamp-2 group-hover:text-[#B8860B] transition-colors">
                        {removeAccents(isEn ? rel.titleEn : rel.title)}
                      </h4>
                      <p className="mt-2 text-xs font-light text-[#1c1b19]/70 line-clamp-2">
                        {isEn ? rel.excerptEn : rel.excerpt}
                      </p>
                    </div>
                    <span className="mt-5 text-[11px] font-semibold uppercase tracking-wider text-[#1c1b19] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {isEn ? "Read" : "Lire"} →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
