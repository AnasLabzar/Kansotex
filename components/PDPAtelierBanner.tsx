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
    <section className="mt-16 sm:mt-24 border border-ink/15 bg-[#faf6f0] overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Atmospheric Full-Height Atelier Imagery */}
        <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[460px] overflow-hidden bg-[#e0d8cc]">
          <Image
            src="/gallery/Kansotex-indoor-riad-tissus-pinterest-2.webp"
            alt="Atelier Kansotex Marrakech"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
          
          {/* Authentic Maison Atelier Stamp */}
          <div className="absolute bottom-6 left-6 z-10 bg-[#faf6f0]/95 backdrop-blur-xs p-4 border border-ink/15 shadow-md">
            <span className="font-termina text-[8px] uppercase tracking-[0.3em] text-olive font-bold block mb-1">
              {toTermina(isEn ? "Master Upholsterers" : "Maitres Tapissiers")}
            </span>
            <span className="font-termina text-[11px] uppercase tracking-[0.2em] text-ink font-bold block">
              {toTermina("Manufacture Marrakech")}
            </span>
            <span className="text-[10px] font-sans text-muted font-light mt-0.5 block">
              {isEn ? "Bespoke tailoring since inception" : "Façonnage & confection sur-mesure"}
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Spread & 4 Tailoring Pillars */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-block w-2 h-2 rotate-45 bg-olive" />
              <span className="font-termina text-[9px] uppercase tracking-[0.3em] text-olive font-bold">
                {toTermina(isEn ? "Artisanal Manufacture · Marrakech" : "Savoir-Faire & Confection Sur-Mesure")}
              </span>
            </div>

            <h3 className="editorial text-3xl sm:text-4xl lg:text-5xl text-ink font-normal italic mb-4 leading-tight">
              {isEn ? "The Art of Haute Tapestry in Marrakech" : "L'Art de la Haute Confection Tapissière"}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-muted/90 font-light leading-relaxed mb-8 max-w-xl">
              {isEn
                ? "Beyond fine fabrics, Kansotex operates an artisanal manufacture in Marrakech. Our master craftsmen transform your chosen textiles into bespoke curtains, roman shades, headboards, and outdoor terrace daybeds."
                : "Au-delà de l'édition de nos étoffes, Kansotex dispose de sa propre manufacture à Marrakech. Nos artisans tapissiers donnent vie à vos projets d'aménagement sur mesure pour riads, résidences privées et hôtels d'exception."}
            </p>

            {/* 4 Bespoke Service Pillars with Pro SVG Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-6 border-t border-ink/10 mb-8">
              
              {/* 1. Prise de cotes */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-white transition-all flex items-center justify-center text-ink group-hover:text-olive shrink-0">
                  {/* Icon: Calipers & architectural ruler */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M4 21V3h4v18H4z" />
                    <line x1="8" y1="7" x2="6" y2="7" />
                    <line x1="8" y1="11" x2="5" y2="11" />
                    <line x1="8" y1="15" x2="6" y2="15" />
                    <path d="M12 5h8v4h-8z" />
                    <path d="M16 9v12" />
                  </svg>
                </div>
                <div>
                  <strong className="font-termina text-[10px] uppercase tracking-wider block text-ink mb-1 font-bold">
                    {toTermina(isEn ? "On-Site Measurements" : "Prise de Cotes sur Site")}
                  </strong>
                  <span className="text-[11px] font-sans text-muted font-light leading-relaxed block">
                    {isEn ? "Technical assessment across Marrakech, Casablanca & Rabat." : "Déplacement technique en riad, villa et hôtel partout au Maroc."}
                  </span>
                </div>
              </div>

              {/* 2. Rideaux & Stores Bateaux */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-white transition-all flex items-center justify-center text-ink group-hover:text-olive shrink-0">
                  {/* Icon: Drapery wave pleat & curtain cord */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <line x1="3" y1="4" x2="21" y2="4" />
                    <path d="M6 4v16c1-2 2-2 3 0v-16" />
                    <path d="M12 4v16c1-2 2-2 3 0v-16" />
                    <path d="M18 4v16c1-2 1.5-2 2 0v-16" />
                  </svg>
                </div>
                <div>
                  <strong className="font-termina text-[10px] uppercase tracking-wider block text-ink mb-1 font-bold">
                    {toTermina(isEn ? "Drapery & Shades" : "Rideaux & Stores Bateaux")}
                  </strong>
                  <span className="text-[11px] font-sans text-muted font-light leading-relaxed block">
                    {isEn ? "High ceilings, wave pleats & blackout thermal linings." : "Grande hauteur sous plafond, plis wave et doublures occultantes."}
                  </span>
                </div>
              </div>

              {/* 3. Banquettes & Terrasses */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-white transition-all flex items-center justify-center text-ink group-hover:text-olive shrink-0">
                  {/* Icon: Outdoor bench cushion & water repellency */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M3 13h18v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5z" />
                    <path d="M5 13V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5" />
                    <line x1="6" y1="20" x2="6" y2="22" />
                    <line x1="18" y1="20" x2="18" y2="22" />
                  </svg>
                </div>
                <div>
                  <strong className="font-termina text-[10px] uppercase tracking-wider block text-ink mb-1 font-bold">
                    {toTermina(isEn ? "Outdoor Terraces" : "Banquettes & Terrasses")}
                  </strong>
                  <span className="text-[11px] font-sans text-muted font-light leading-relaxed block">
                    {isEn ? "Water-draining Dry-Feel foam & UV-proof covers." : "Mousses Dry-Feel imputrescibles et toiles déperlantes."}
                  </span>
                </div>
              </div>

              {/* 4. Pose & Finitions */}
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-white transition-all flex items-center justify-center text-ink group-hover:text-olive shrink-0">
                  {/* Icon: Precision artisan compass & square */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7L6 20M12 7l6 13" />
                    <line x1="8" y1="14" x2="16" y2="14" />
                  </svg>
                </div>
                <div>
                  <strong className="font-termina text-[10px] uppercase tracking-wider block text-ink mb-1 font-bold">
                    {toTermina(isEn ? "Installation & Fit" : "Pose & Finitions")}
                  </strong>
                  <span className="text-[11px] font-sans text-muted font-light leading-relaxed block">
                    {isEn ? "Turnkey installation and meticulous steam press." : "Pose soignée par nos équipes et défroissage vapeur sur place."}
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-6 border-t border-ink/10">
            <a
              href="https://wa.me/212661090950?text=Bonjour%20Kansotex%2C%20je%20souhaite%20un%20devis%20de%20confection%20sur%20mesure%20pour%20mon%20projet."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-ink text-[#f4efe6] hover:bg-black font-termina text-[10px] uppercase tracking-[0.25em] font-bold py-4 px-7 transition-colors shadow-xs gap-2.5"
            >
              <svg className="w-4 h-4 text-[#c19a86]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.19.014.305-.058.116-.087.188-.173.289l-.26.303c-.087.087-.179.182-.077.357.101.174.453.748.971 1.209.667.594 1.23.778 1.403.865.174.087.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.203c.044.072.044.42-.1.825z" />
              </svg>
              <span>{toTermina(isEn ? "Consult a Master Tailor via WhatsApp" : "Echanger avec un Maitre Tapissier")}</span>
            </a>

            <Link
              href={`/${locale}/devis`}
              className="inline-flex items-center justify-center border border-ink/25 text-ink hover:border-ink hover:bg-black/5 font-termina text-[10px] uppercase tracking-widest py-3.5 px-6 transition-colors text-center"
            >
              {toTermina(isEn ? "Request On-Site Quote" : "Demander un Devis Atelier")}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PDPAtelierBanner;
