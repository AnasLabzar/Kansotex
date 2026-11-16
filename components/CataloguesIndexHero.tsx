"use client";

import Image from "next/image";
import Link from "next/link";
import type { CatalogueDefinition } from "@/lib/catalogues-data";
import { useCurrency } from "@/lib/CurrencyContext";
import { ArrowGlyph, HeroBreadcrumb, Stars } from "./catalogue-heroes/shared";

interface CataloguesIndexHeroProps {
  locale: string;
  catalogues: CatalogueDefinition[];
}

export function CataloguesIndexHero({ locale, catalogues }: CataloguesIndexHeroProps) {
  const isEn = locale === "en";
  const { formatPrice } = useCurrency();

  return (
    <section className="relative pt-[88px] sm:pt-[104px] pb-2 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
      <HeroBreadcrumb locale={locale} title={isEn ? "Catalogues" : "Catalogues"} />

      <div className="relative overflow-hidden rounded-[28px] border border-[#2b2925] bg-[#141311] text-[#f6f1e8] sm:rounded-[44px]">
        <Image
          src="/gallery/post-linge-lit-couette-kansotex.jpg"
          alt=""
          fill
          preload
          className="object-cover object-center brightness-[0.7]"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#141311] via-[#141311]/90 to-[#141311]/35" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141311] via-transparent to-[#141311]/55" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#c26d43]/20 blur-3xl"
        />

        <div className="relative z-10 flex flex-col gap-10 p-6 sm:p-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:p-14">
          {/* Manifesto */}
          <div className="flex flex-col justify-between gap-9 lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#c9a36b] sm:text-[10px]">
                <span className="h-px w-10 bg-[#c9a36b]/70" aria-hidden="true" />
                {isEn ? "Signature Editions · 2026" : "Éditions Signature · 2026"}
                <span className="text-white/20">/</span>
                <span className="text-white/45">
                  {String(catalogues.length).padStart(2, "0")} {isEn ? "collections" : "collections"}
                </span>
              </div>

              <h1 className="mt-6 max-w-2xl text-balance font-serif text-[46px] font-normal leading-[0.92] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[84px]">
                {isEn ? (
                  <>
                    Signature{" "}
                    <em className="italic text-[#c9a36b]">Catalogues</em>
                  </>
                ) : (
                  <>
                    Catalogues{" "}
                    <em className="italic text-[#c9a36b]">d&apos;Exception</em>
                  </>
                )}
              </h1>

              <p className="mt-6 max-w-xl text-[13px] leading-relaxed text-white/55 sm:text-sm">
                {isEn
                  ? "Four curated chapters for riads, hotels, winter comfort, noble materials and bath rituals. Each edition opens onto its own configurator, volume pricing and made-to-measure guidance."
                  : "Quatre chapitres éditoriaux pour riads, hôtels, confort d'hiver, matières nobles et rituels de bain. Chaque édition ouvre son propre configurateur, ses tarifs dégressifs et son accompagnement sur-mesure."}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#editions"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#f6f1e8] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#141311] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f6f1e8]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141311]"
                >
                  {isEn ? "Explore the editions" : "Explorer les éditions"}
                  <ArrowGlyph className="h-3.5 w-3.5 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
                <Link
                  href={`/${locale}/devis`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white/75 transition-colors hover:border-white/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#141311]"
                >
                  {isEn ? "Request a quote" : "Demander un devis"}
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35 sm:text-[10px]">
              <span>450+ Riads &amp; Hôtels</span>
              <span>80+ Villas</span>
              <span>35 000+ Serviettes</span>
              <span className="flex items-center gap-1.5 text-white/50">
                4.95 <Stars className="text-[9px] text-[#c9a36b]" />
              </span>
            </div>
          </div>

          {/* Edition index */}
          <div className="lg:col-span-5 lg:pl-4">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <span className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/40">
                {isEn ? "The 2026 index" : "L'index 2026"}
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/25">
                {isEn ? "Open" : "Ouvrir"}
              </span>
            </div>

            <div>
              {catalogues.map((cat, i) => (
                <Link
                  key={cat.slug}
                  href={`/${locale}/catalogues/${cat.slug}`}
                  className="group flex items-center gap-3 border-b border-white/12 py-4 transition-colors hover:border-white/25 sm:gap-4 sm:py-[18px]"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: cat.accentColor }}
                  />
                  <span className="w-5 shrink-0 font-serif text-sm text-white/25 transition-colors group-hover:text-[#c9a36b]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-lg leading-tight text-white/90 transition-colors group-hover:text-white sm:text-xl">
                      {isEn ? cat.titleEn : cat.titleFr}
                    </p>
                    <p className="mt-0.5 truncate text-[8px] font-semibold uppercase tracking-[0.18em] text-white/35 sm:text-[9px]">
                      {isEn ? cat.heroKickerEn : cat.heroKickerFr}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/25">
                      {isEn ? "from" : "dès"}
                    </p>
                    <p className="text-[11px] font-semibold text-white/60">
                      {formatPrice(cat.starPack.basePriceEur).formatted}
                    </p>
                  </div>
                  <ArrowGlyph className="h-4 w-4 shrink-0 -translate-x-1 text-white/0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-white/70" />
                </Link>
              ))}
            </div>

            <p className="mt-4 text-[9px] leading-relaxed text-white/30">
              {isEn
                ? "Select an edition to open its full lookbook, configurator and volume pricing."
                : "Sélectionnez une édition pour ouvrir son lookbook complet, son configurateur et ses tarifs dégressifs."}
            </p>
          </div>
        </div>

        {/* Service ticker */}
        <div className="relative z-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/10 px-6 py-3.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white/35 sm:px-10 sm:text-[9px] lg:px-14">
          <span className="flex items-center gap-1.5">
            <span className="h-1 w-1 rounded-full bg-emerald-400" aria-hidden="true" />
            {isEn ? "Morocco delivery 24–72h" : "Livraison Maroc 24–72h"}
          </span>
          <span>{isEn ? "Tiered B2B pricing" : "Tarifs dégressifs pro"}</span>
          <span>{isEn ? "WhatsApp quotes in 5 min" : "Devis WhatsApp en 5 min"}</span>
          <span className="hidden sm:inline">Ateliers Kansotex · Marrakech</span>
        </div>
      </div>
    </section>
  );
}
