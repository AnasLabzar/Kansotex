import React from "react";
import Link from "next/link";
import Image from "next/image";

interface PDPAtelierBannerProps {
  locale?: string;
}

export function PDPAtelierBanner({ locale = "fr" }: PDPAtelierBannerProps) {
  const isEn = locale === "en";

  return (
    <div className="mt-8 border border-ink/10 bg-white/40 p-6 rounded-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 relative rounded-xs overflow-hidden shrink-0 border border-ink/10 bg-cream">
            <Image
              src="/gallery/Kansotex-indoor-riad-tissus-pinterest-2.webp"
              alt="Atelier Kansotex Marrakech"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-[9px] font-termina uppercase tracking-[0.25em] text-olive font-bold block mb-1">
              {isEn ? "Craftsmanship & Bespoke Tailoring" : "Manufacture & Atelier Marrakech"}
            </span>
            <h5 className="font-termina uppercase text-xs font-bold text-ink mb-1">
              {isEn ? "Custom Curtains, Cushions & Bench Tailoring" : "Confection Rideaux, Coussins & Banquettes Sur-Mesure"}
            </h5>
            <p className="text-[11px] text-muted font-sans leading-relaxed max-w-lg">
              {isEn
                ? "Our master upholsterers handcraft your curtains, roman blinds, headboards, and outdoor terrace seating directly in Marrakech with on-site measurement service."
                : "Nos maîtres tapissiers confectionnent vos rideaux, stores bateaux, têtes de lit et banquettes d'extérieur directement à Marrakech. Service de prise de cotes et pose sur mesure."}
            </p>
          </div>
        </div>

        <Link
          href={`/${locale}/savoir-faire`}
          className="shrink-0 text-[9px] font-termina uppercase tracking-widest text-ink font-bold underline underline-offset-4 hover:text-olive transition-colors"
        >
          {isEn ? "Discover our Atelier →" : "Notre Savoir-Faire →"}
        </Link>
      </div>
    </div>
  );
}

export default PDPAtelierBanner;
