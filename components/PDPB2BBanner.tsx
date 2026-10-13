import React from "react";
import Link from "next/link";
import { brand } from "@/lib/content";

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
    <div className="mt-10 mb-8 bg-[#2d2822] text-[#f3eee6] p-6 sm:p-7 rounded-xs border border-white/5 relative overflow-hidden">
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="max-w-md">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
            <span className="text-[9px] font-termina tracking-[0.3em] uppercase text-cream/70 font-bold">
              {isEn ? "Hospitality & Professional Hub" : "Espace Riads, Hôtels & Architectes"}
            </span>
          </div>
          <h4 className="font-termina uppercase text-sm sm:text-base font-bold tracking-wider text-white mb-2">
            {isEn ? "Trade Pricing & Bulk Orders" : "Tarifs Dégressifs & Accompagnement Pro"}
          </h4>
          <p className="text-xs text-cream/80 font-sans font-light leading-relaxed">
            {isFabric
              ? isEn
                ? "Full rolls (rouleaux complets), custom contract flame-retardant treatments, and dedicated workshop tailoring in Marrakech."
                : "Tarifs avantageux au rouleau complet, confection tapissière sur-mesure dans notre atelier à Marrakech et facturation avec TVA récupérable."
              : isEn
                ? "Bespoke monogram embroidery, bulk guest suites equipping, and high-temperature laundering durability."
                : "Équipement complet de suites de riad, broderie de vos armoiries sur-mesure et tenue garantie aux lavages industriels répétés."}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href={`/${locale}/pro`}
            className="inline-flex items-center justify-center bg-cream text-ink font-termina text-[9px] uppercase tracking-widest font-bold py-3 px-5 hover:bg-white transition-colors text-center"
          >
            {isEn ? "Access Pro Portal" : "Ouvrir un Compte Pro"}
          </Link>
          <a
            href={`https://wa.me/212661090950?text=${messageText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border border-white/20 text-white font-termina text-[9px] uppercase tracking-widest py-3 px-4 hover:border-white transition-colors text-center"
          >
            {isEn ? "Instant Quote" : "Devis Express"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default PDPB2BBanner;
