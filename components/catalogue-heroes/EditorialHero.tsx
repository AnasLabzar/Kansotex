"use client";

import Image from "next/image";
import { useCurrency } from "@/lib/CurrencyContext";
import {
  ArrowGlyph,
  HeroBreadcrumb,
  Stars,
  WhatsAppGlyph,
  getHeroData,
  type CatalogueHeroProps,
} from "./shared";

/**
 * Editorial hero shared by every catalogue detail page.
 *
 * The frame is a direct echo of the “À propos” architectural card:
 * full-bleed photography, a cream notch in the top-right carrying the
 * headline, a cream notch in the bottom-left carrying the commercial proof,
 * and the same inverted fillets connecting both notches to the card edges.
 *
 * The catalogue-specific layer is deliberately small — photography, accent,
 * copy, starting price and proof — so the page still reads as one house.
 */
export function EditorialHero({
  catalogue,
  locale,
  whatsappUrl,
  onOpenDevis,
}: CatalogueHeroProps) {
  const { formatPrice } = useCurrency();
  const data = getHeroData(
    catalogue,
    locale,
    formatPrice(catalogue.starPack.basePriceEur).formatted,
  );
  const isEn = data.isEn;

  return (
    <section
      aria-labelledby="catalogue-hero-title"
      className="relative mx-auto w-full max-w-7xl px-4 pt-[88px] sm:px-6 sm:pt-[104px] lg:px-12"
    >
      <HeroBreadcrumb locale={locale} title={data.title} />

      <div className="group relative aspect-[4/3] min-h-[380px] w-full overflow-hidden rounded-[28px] border border-[#e8e4db] bg-[#24211d] sm:aspect-[16/11] sm:min-h-[460px] sm:rounded-[38px] lg:aspect-[21/10]">
        <Image
          src={catalogue.heroBgImage || data.mood.image}
          alt={
            isEn
              ? `${data.title} — Kansotex signature collection`
              : `${data.title} — collection signature Kansotex`
          }
          fill
          preload
          className="object-cover object-center brightness-[0.93] transition-transform duration-1000 group-hover:scale-[1.02]"
          sizes="(max-width: 1400px) 100vw, 1400px"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/25" />

        {/* Top-left — capsule + collection headline, exactly like À propos */}
        <div className="pointer-events-none absolute left-5 top-5 z-10 flex flex-col items-start gap-3 sm:left-9 sm:top-9 lg:left-12 lg:top-10">
          <span className="hidden items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3.5 py-1.5 text-[9px] font-medium uppercase tracking-[0.14em] text-white shadow-xs backdrop-blur-md sm:inline-flex sm:px-4 sm:text-[10px]">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: data.accent }}
              aria-hidden="true"
            />
            {isEn ? "Edition 2026" : "Édition 2026"}
          </span>

          <div className="hidden space-y-1 text-white drop-shadow-sm lg:block">
            <p className="max-w-[300px] text-xs font-normal leading-snug tracking-wide text-white/85 sm:text-sm">
              {data.headline}
            </p>
            <p className="max-w-[320px] text-[10px] font-bold uppercase tracking-[0.16em] text-white sm:text-[11px]">
              {data.delivery}
            </p>
          </div>
        </div>

        {/* Top-right cream notch — the catalogue headline */}
        <div className="absolute right-0 top-0 z-20 max-w-[82%] sm:max-w-[58%] lg:max-w-[54%]">
          <div className="relative bg-[#FAF7F2] pb-4 pl-5 pr-5 pt-4 rounded-bl-[26px] sm:pb-6 sm:pl-9 sm:pr-9 sm:pt-6 sm:rounded-bl-[34px]">
            <svg
              className="pointer-events-none absolute top-0 -left-[26px] h-[26px] w-[26px] sm:-left-[34px] sm:h-[34px] sm:w-[34px]"
              viewBox="0 0 36 36"
              fill="none"
              aria-hidden="true"
            >
              <path d="M36 0 H0 C19.88 0 36 16.12 36 36 V0 Z" fill="#FAF7F2" />
            </svg>
            <svg
              className="pointer-events-none absolute -bottom-[26px] right-0 h-[26px] w-[26px] sm:-bottom-[34px] sm:h-[34px] sm:w-[34px]"
              viewBox="0 0 36 36"
              fill="none"
              aria-hidden="true"
            >
              <path d="M36 0 H0 C19.88 0 36 16.12 36 36 V0 Z" fill="#FAF7F2" />
            </svg>

            <span className="mb-1.5 block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#1c1b19]/45 sm:mb-2 sm:text-[10px]">
              {data.kicker}
            </span>
            <h1
              id="catalogue-hero-title"
              className="text-balance font-sans text-[17px] font-bold leading-[1.1] tracking-tight text-[#1c1b19] sm:text-xl md:text-2xl lg:text-[30px]"
            >
              {data.title}
            </h1>
          </div>
        </div>

        {/* Bottom-left cream notch — price + verified proof */}
        <div className="absolute bottom-0 left-0 z-20 max-w-[80%] sm:max-w-none">
          <div className="relative bg-[#FAF7F2] pb-4 pl-5 pr-5 pt-3.5 rounded-tr-[24px] sm:pb-4 sm:pl-7 sm:pr-7 sm:pt-4 sm:rounded-tr-[32px]">
            <svg
              className="pointer-events-none absolute -top-[24px] left-0 h-[24px] w-[24px] sm:-top-[32px] sm:h-[32px] sm:w-[32px]"
              viewBox="0 0 36 36"
              fill="none"
              aria-hidden="true"
            >
              <path d="M0 36 V0 C0 19.88 16.12 36 36 36 H0 Z" fill="#FAF7F2" />
            </svg>
            <svg
              className="pointer-events-none absolute bottom-0 -right-[24px] h-[24px] w-[24px] sm:-right-[32px] sm:h-[32px] sm:w-[32px]"
              viewBox="0 0 36 36"
              fill="none"
              aria-hidden="true"
            >
              <path d="M0 36 V0 C0 19.88 16.12 36 36 36 H0 Z" fill="#FAF7F2" />
            </svg>

            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#1c1b19]/40">
              {isEn ? "Starting from" : "À partir de"}
            </p>
            <p className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5">
              <span className="font-serif text-xl leading-none text-[#1c1b19] sm:text-2xl">
                {data.price}
              </span>
              <span className="text-[8px] font-medium uppercase tracking-[0.12em] text-[#1c1b19]/40">
                / pack
              </span>
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[9px] font-medium text-[#1c1b19]/55 sm:text-[10px]">
              <Stars className="text-[9px] tracking-[0.08em] text-[#C26D43]" />
              <span className="leading-snug">{data.mood.proof}</span>
            </div>
          </div>
        </div>

        {/* Bottom-right workshop signature */}
        <div className="absolute bottom-8 right-8 z-10 hidden flex-col items-end gap-1 text-right text-white/55 sm:flex">
          <span className="text-[8px] font-semibold uppercase tracking-[0.26em]">
            Ateliers Kansotex
          </span>
          <span className="text-[8px] font-semibold uppercase tracking-[0.26em]">
            Marrakech · 31.62°N
          </span>
        </div>
      </div>

      {/* Slim action rail — the catalogue-specific signature. Kept as a
          single line so the hero stays the hero, not a form card. */}
      <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-medium text-[#1c1b19]/65">
          {data.badges.slice(0, 3).map((badge, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <span
                className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${data.accent}18`, color: data.accent }}
                aria-hidden="true"
              >
                <CheckGlyph className="h-2 w-2" />
              </span>
              {badge.title}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-2.5 sm:justify-end">
          <a
            href="#configurateur"
            className="group/cta inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-[#1C1B19] px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#FAF7F2] transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c1b19]/40 focus-visible:ring-offset-2 sm:flex-none sm:px-5"
          >
            <span className="sm:hidden">{isEn ? "Configure" : "Configurer"}</span>
            <span className="hidden sm:inline">
              {isEn ? "Configure the pack" : "Configurer le pack"}
            </span>
            <ArrowGlyph className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/cta:translate-x-0.5" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={isEn ? "Request a quote on WhatsApp" : "Demander un devis sur WhatsApp"}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white transition-colors hover:bg-[#20ba5a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2"
          >
            <WhatsAppGlyph className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={onOpenDevis}
            className="h-11 shrink-0 rounded-full border border-[#DCD3C5] bg-white px-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1c1b19]/65 transition-colors hover:border-[#1c1b19]/40 hover:text-[#1c1b19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1c1b19]/30 focus-visible:ring-offset-2"
          >
            {isEn ? "Pro quote" : "Devis pro"}
          </button>
        </div>
      </div>
    </section>
  );
}

function CheckGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
