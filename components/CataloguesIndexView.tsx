"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getAllCatalogues } from "@/lib/catalogues-data";
import { useCurrency } from "@/lib/CurrencyContext";
import { CataloguesIndexHero } from "./CataloguesIndexHero";
import { ArrowGlyph } from "./catalogue-heroes/shared";

interface CataloguesIndexViewProps {
  locale: string;
}

const FILTERS = [
  { id: "all", labelFr: "Toutes les éditions", labelEn: "All editions" },
  { id: "hotelier", labelFr: "Hôtellerie & Airbnb", labelEn: "Hospitality & Airbnb" },
  { id: "hiver", labelFr: "Hiver & couettes", labelEn: "Winter & duvets" },
  { id: "privee", labelFr: "Collection privée", labelEn: "Private collection" },
  { id: "bain", labelFr: "Linge de bain", labelEn: "Bath linen" },
];

export function CataloguesIndexView({ locale }: CataloguesIndexViewProps) {
  const isEn = locale === "en";
  const { formatPrice } = useCurrency();
  const catalogues = getAllCatalogues();

  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredCatalogues = catalogues.filter((cat) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "hotelier") return cat.slug === "linge-hotelier" || cat.slug === "linge-de-bain";
    if (activeFilter === "hiver") return cat.slug === "collection-hiver";
    if (activeFilter === "privee") return cat.slug === "collection-privee";
    if (activeFilter === "bain") return cat.slug === "linge-de-bain";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24 text-[#1C1B19] selection:bg-[#C26D43] selection:text-white">
      <CataloguesIndexHero locale={locale} catalogues={catalogues} />

      {/* Editions index + filters */}
      <section
        id="editions"
        className="scroll-mt-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto pt-10 sm:pt-14"
      >
        <div className="flex flex-col gap-5 border-b border-[#e5ddd0] pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#C26D43] sm:text-[10px]">
              <span className="h-px w-8 bg-[#C26D43]/70" aria-hidden="true" />
              {isEn ? "The 2026 selection" : "La sélection 2026"}
            </div>
            <h2 className="mt-2 font-serif text-3xl font-normal tracking-tight text-[#2B2620] sm:text-4xl">
              {isEn ? "Four chapters, four worlds" : "Quatre chapitres, quatre univers"}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label={isEn ? "Filter catalogues" : "Filtrer les catalogues"}>
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                aria-pressed={activeFilter === filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] transition-all sm:text-[10px] ${
                  activeFilter === filter.id
                    ? "bg-[#1C1B19] text-white shadow-sm"
                    : "border border-[#e0d7c8] bg-white text-[#635A4E] hover:border-[#c9bfae] hover:bg-[#F7F2E9]"
                }`}
              >
                {isEn ? filter.labelEn : filter.labelFr}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.2em] text-[#1c1b19]/35 sm:text-[10px]">
          <span>
            {String(filteredCatalogues.length).padStart(2, "0")}{" "}
            {isEn
              ? filteredCatalogues.length === 1 ? "edition" : "editions"
              : filteredCatalogues.length === 1 ? "édition" : "éditions"}
          </span>
          <span className="hidden sm:inline">{isEn ? "Open a chapter to configure" : "Ouvrez un chapitre pour configurer"}</span>
        </div>

        {/* Editorial catalogue grid */}
        <div className="mt-5 grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
          {filteredCatalogues.map((cat) => {
            const title = isEn ? cat.titleEn : cat.titleFr;
            const headline = isEn ? cat.headlineEn : cat.headlineFr;
            const subtitle = isEn ? cat.subtitleEn : cat.subtitleFr;
            const kicker = isEn ? cat.heroKickerEn : cat.heroKickerFr;
            const badges = isEn ? cat.badgesEn : cat.badgesFr;
            const number = String(catalogues.findIndex((item) => item.slug === cat.slug) + 1).padStart(2, "0");

            return (
              <article
                key={cat.slug}
                className="group flex flex-col overflow-hidden rounded-[24px] border border-[#e8dfcf] bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Link
                  href={`/${locale}/catalogues/${cat.slug}`}
                  className="relative block aspect-[4/5] overflow-hidden bg-[#EFE8DD]"
                  aria-label={`${isEn ? "Open" : "Ouvrir"} ${title}`}
                >
                  <Image
                    src={cat.posterImage}
                    alt={title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#14120f]/80 via-[#14120f]/10 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#14120f]/25 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/90 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-[#1C1B19] backdrop-blur-md">
                    {kicker}
                  </span>
                  <span
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-black/20 font-serif text-[10px] text-white backdrop-blur-md"
                    aria-hidden="true"
                  >
                    {number}
                  </span>

                  <div className="absolute inset-x-4 bottom-4 text-white">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.22em] text-white/60">
                      {headline}
                    </p>
                    <p className="mt-1 font-serif text-2xl leading-[1.05] sm:text-3xl">
                      {title}
                    </p>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="line-clamp-3 text-[12px] leading-relaxed text-[#5C5449] sm:text-[13px]">
                    {subtitle}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {badges.slice(0, 4).map((badge, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-[#ece5d8] bg-[#FAF7F2] px-3 py-2"
                      >
                        <p className="text-[9px] font-bold uppercase leading-tight tracking-[0.04em] text-[#2B2620]">
                          {badge.title}
                        </p>
                        <p className="mt-0.5 line-clamp-1 text-[9px] leading-tight text-[#7A6F62]">
                          {badge.subtitle}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 border-t border-[#ece5d8] pt-4 sm:mt-5">
                    <div>
                      <span className="block text-[8px] font-semibold uppercase tracking-[0.18em] text-[#1c1b19]/40">
                        {isEn ? "Starting from" : "À partir de"}
                      </span>
                      <p className="mt-0.5 flex items-baseline gap-1 font-serif leading-none text-[#2B2620]">
                        <span className="text-2xl font-normal">{formatPrice(cat.starPack.basePriceEur).formatted}</span>
                        <span className="font-sans text-[9px] font-medium text-[#1c1b19]/40">/ pack</span>
                      </p>
                    </div>

                    <Link
                      href={`/${locale}/catalogues/${cat.slug}`}
                      className="group/cta inline-flex items-center gap-2 rounded-full bg-[#1C1B19] px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c1b19]/40 focus-visible:ring-offset-2"
                    >
                      {isEn ? "Open catalogue" : "Ouvrir le catalogue"}
                      <ArrowGlyph className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
                    </Link>
                  </div>

                  <Link
                    href={`/${locale}/catalogues/${cat.slug}#configurateur`}
                    className="mt-3 inline-flex w-fit text-[9px] font-semibold uppercase tracking-[0.14em] text-[#1c1b19]/45 underline decoration-[#1c1b19]/15 underline-offset-4 transition-colors hover:text-[#1c1b19] hover:decoration-[#1c1b19]/50"
                  >
                    {isEn ? "Packs & volume pricing" : "Packs & tarifs dégressifs"}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {filteredCatalogues.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-[#ded5c5] bg-white/60 px-6 py-10 text-center text-sm text-[#7A6F62]">
            {isEn ? "No edition matches this filter." : "Aucune édition ne correspond à ce filtre."}
          </p>
        )}
      </section>

      {/* Moroccan Nationwide Delivery Banner */}
      <section className="mt-16 sm:mt-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 rounded-[24px] border border-[#33302B] bg-[#1C1B19] p-8 text-center text-[#FAF7F2] sm:rounded-[32px] sm:p-12 md:grid-cols-3 md:text-left">
          <div className="space-y-2">
            <span className="text-2xl" aria-hidden="true">🚚</span>
            <h3 className="font-serif text-lg font-semibold">{isEn ? "Morocco-Wide Express Delivery" : "Livraison Partout au Maroc"}</h3>
            <p className="text-xs font-light leading-relaxed text-[#B8AEA0]">
              {isEn ? "24h to 72h direct shipping to your Riad, Hotel or Villa in Marrakech, Casablanca, Tangier, Rabat, Agadir." : "Expédition directe en 24h à 72h vers votre Riad, Hôtel ou Villa à Marrakech, Casablanca, Tanger, Rabat, Agadir."}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-2xl" aria-hidden="true">🏨</span>
            <h3 className="font-serif text-lg font-semibold">{isEn ? "Single or Multi-Unit Fleet" : "Un ou Plusieurs Logements"}</h3>
            <p className="text-xs font-light leading-relaxed text-[#B8AEA0]">
              {isEn ? "From single studio setups to 50-room hotel complexes. Tiered wholesale pricing up to -25% off." : "De l'équipement d'un studio Airbnb au complexe hôtelier de 50 chambres. Tarifs dégressifs jusqu'à -25%."}
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-2xl" aria-hidden="true">💬</span>
            <h3 className="font-serif text-lg font-semibold">{isEn ? "Direct WhatsApp Quotes" : "Devis WhatsApp Direct"}</h3>
            <p className="text-xs font-light leading-relaxed text-[#B8AEA0]">
              {isEn ? "Speak directly with our Marrakech textile team at +212 6 61 09 09 50 for instantaneous formal quotations." : "Échangez directement avec notre équipe textile à Marrakech au +212 6 61 09 09 50 pour un devis en 5 minutes."}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
