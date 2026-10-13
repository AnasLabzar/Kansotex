import React from "react";
import Link from "next/link";
import Image from "next/image";
import { toTermina } from "@/lib/text";

interface PDPAtelierBannerProps {
  locale?: string;
}

export function PDPAtelierBanner({ locale = "fr" }: PDPAtelierBannerProps) {
  const isEn = locale === "en";

  return (
    <section className="mt-12 sm:mt-16 border border-ink/10 bg-white/50 p-7 sm:p-9 rounded-xs shadow-xs">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 relative rounded-xs overflow-hidden shrink-0 border border-ink/10 bg-cream shadow-xs">
            <Image
              src="/gallery/Kansotex-indoor-riad-tissus-pinterest-2.webp"
              alt="Atelier Kansotex Marrakech"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-[9px] font-termina uppercase tracking-[0.25em] text-olive font-bold block mb-1">
              {toTermina(isEn ? "Craftsmanship & Bespoke Tailoring" : "Manufacture & Atelier Marrakech")}
            </span>
            <h5 className="font-termina uppercase text-xs sm:text-sm font-bold text-ink mb-1.5">
              {toTermina(isEn ? "Custom Curtains, Cushions & Bench Tailoring" : "Confection Rideaux, Coussins & Banquettes Sur-Mesure")}
            </h5>
            <p className="text-xs sm:text-sm text-muted font-sans font-light leading-relaxed max-w-xl">
              {isEn
                ? "Our master upholsterers handcraft your curtains, roman blinds, headboards, and outdoor terrace seating directly in Marrakech with an on-site measurement service."
                : "Nos maîtres tapissiers confectionnent vos rideaux, stores bateaux, têtes de lit et banquettes d'extérieur directement à Marrakech. Service de prise de cotes et pose sur mesure."}
            </p>
          </div>
        </div>

        <Link
          href={`/${locale}/savoir-faire`}
          className="shrink-0 inline-flex items-center text-[10px] font-termina uppercase tracking-widest text-ink font-bold border-b border-ink/40 pb-0.5 hover:text-olive hover:border-olive transition-colors"
        >
          {toTermina(isEn ? "Discover our Atelier →" : "Decouvrir Notre Savoir-Faire →")}
        </Link>
      </div>
    </section>
  );
}

export default PDPAtelierBanner;
