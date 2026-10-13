import React from "react";
import Link from "next/link";
import { toTermina } from "@/lib/text";

interface PDPB2BBannerProps {
  productName: string;
  productSlug: string;
  locale?: string;
  isFabric?: boolean;
}

export function PDPB2BBanner({
  productName,
  productSlug,
  locale = "fr",
  isFabric = false,
}: PDPB2BBannerProps) {
  const isEn = locale === "en";

  const messageText = encodeURIComponent(
    `Bonjour Kansotex Pro, je souhaite un devis professionnel pour le projet : ${productName} (Réf: ${productSlug}). Pouvez-vous me transmettre la grille tarifaire Pro ?`
  );

  return (
    <section className="mt-16 sm:mt-24 bg-[#1a1815] text-[#f3eee6] p-8 sm:p-12 lg:p-14 border border-white/10 relative overflow-hidden shadow-xl">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 sm:gap-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
            <span className="font-termina text-[9px] uppercase tracking-[0.3em] text-[#c19a86] font-bold">
              {toTermina(isEn ? "Hospitality & Architecture Division" : "Division Hotellerie, Riads & Architectes")}
            </span>
          </div>

          <h3 className="editorial text-3xl sm:text-4xl text-white font-normal italic mb-3 leading-tight">
            {isEn ? "Trade Pricing & Dedicated Key Account" : "Tarifs Dégressifs & Accompagnement Professionnel"}
          </h3>

          <p className="font-sans text-xs sm:text-sm text-cream/75 font-light leading-relaxed mb-6">
            {isFabric
              ? isEn
                ? "Full rolls wholesale pricing, contract fire-retardant treatments (M1 / BS 5852), and dedicated workshop tailoring in Marrakech with deductible VAT invoicing."
                : "Tarifs avantageux au rouleau complet, confection tapissière sur-mesure dans notre manufacture à Marrakech et facturation société avec TVA marocaine récupérable."
              : isEn
                ? "Bespoke monogram embroidery, turnkey guest suite equipping, and high-temperature industrial laundry resistance."
                : "Équipement complet de suites de riad, broderie de vos armoiries sur-mesure et résistance garantie aux cycles répétés de blanchisserie industrielle."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5 border-t border-white/10 text-[11px] font-sans text-cream/85">
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 border border-[#c19a86]/40 flex items-center justify-center text-[#c19a86] shrink-0 text-[10px]">
                ◆
              </span>
              <span>{isEn ? "Wholesale roll pricing" : "Remises au rouleau complet"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 border border-[#c19a86]/40 flex items-center justify-center text-[#c19a86] shrink-0 text-[10px]">
                ◆
              </span>
              <span>{isEn ? "Express material swatch box" : "Échantillonnage express chantiers"}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="w-5 h-5 border border-[#c19a86]/40 flex items-center justify-center text-[#c19a86] shrink-0 text-[10px]">
                ◆
              </span>
              <span>{isEn ? "24h quotes with deductible VAT" : "Devis sous 24h avec TVA"}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 w-full sm:w-auto lg:w-64">
          <Link
            href={`/${locale}/pro`}
            className="inline-flex items-center justify-center bg-cream text-ink font-termina text-[10px] uppercase tracking-[0.25em] font-bold py-4 px-6 hover:bg-white transition-colors text-center w-full shadow-sm"
          >
            {toTermina(isEn ? "Access Pro Portal" : "Ouvrir un Compte Pro")}
          </Link>
          <a
            href={`https://wa.me/212661090950?text=${messageText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-white/25 text-white font-termina text-[10px] uppercase tracking-widest py-3.5 px-5 hover:border-white hover:bg-white/5 transition-colors text-center gap-2 w-full"
          >
            <svg className="w-3.5 h-3.5 text-olive shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.19.014.305-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.101.174.453.748.971 1.209.667.594 1.23.778 1.403.865.174.087.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.044.072.044.42-.1.825z" />
            </svg>
            {toTermina(isEn ? "WhatsApp Trade Line" : "Ligne Directe WhatsApp")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default PDPB2BBanner;
