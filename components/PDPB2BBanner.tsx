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
    <section className="mt-12 sm:mt-16 bg-[#24201c] text-[#f3eee6] p-7 sm:p-9 rounded-xs border border-white/10 relative overflow-hidden shadow-lg">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 mb-2.5">
            <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
            <span className="text-[9px] font-termina tracking-[0.3em] uppercase text-cream/70 font-bold">
              {toTermina(isEn ? "Hospitality & Trade Program" : "Espace Riads, Hotels & Architectes")}
            </span>
          </div>
          <h4 className="font-termina uppercase text-base sm:text-lg font-bold tracking-wider text-white mb-2.5">
            {toTermina(isEn ? "Trade Pricing & Dedicated Account" : "Tarifs Degressifs & Accompagnement Pro")}
          </h4>
          <p className="text-xs sm:text-sm text-cream/80 font-sans font-light leading-relaxed">
            {isFabric
              ? isEn
                ? "Full rolls (rouleaux complets), custom contract flame-retardant treatments, and dedicated workshop tailoring in Marrakech with deductible VAT invoicing."
                : "Tarifs avantageux au rouleau complet, confection tapissière sur-mesure dans notre atelier à Marrakech et facturation société avec TVA récupérable."
              : isEn
                ? "Bespoke monogram embroidery, bulk guest suites equipping, and high-temperature industrial laundering durability."
                : "Équipement complet de suites de riad, broderie de vos armoiries sur-mesure et résistance garantie aux lavages industriels répétés."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3.5 shrink-0">
          <Link
            href={`/${locale}/pro`}
            className="inline-flex items-center justify-center bg-cream text-ink font-termina text-[10px] uppercase tracking-widest font-bold py-3.5 px-6 hover:bg-white transition-colors text-center"
          >
            {toTermina(isEn ? "Access Pro Portal" : "Ouvrir un Compte Pro")}
          </Link>
          <a
            href={`https://wa.me/212661090950?text=${messageText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-white/25 text-white font-termina text-[10px] uppercase tracking-widest py-3.5 px-5 hover:border-white hover:bg-white/5 transition-colors text-center gap-2"
          >
            <svg className="w-3.5 h-3.5 text-olive shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.19.014.305-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.101.174.453.748.971 1.209.667.594 1.23.778 1.403.865.174.087.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.044.072.044.42-.1.825z" />
            </svg>
            {toTermina(isEn ? "WhatsApp Trade Line" : "Devis Express WhatsApp")}
          </a>
        </div>
      </div>
    </section>
  );
}

export default PDPB2BBanner;
