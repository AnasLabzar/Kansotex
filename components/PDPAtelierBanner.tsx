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
    <section className="mt-16 sm:mt-24 border border-ink/15 bg-[#ece6dc]/50 relative overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Left Side: Generous Atmospheric Workshop Imagery */}
        <div className="lg:col-span-5 relative min-h-[320px] sm:min-h-[400px] overflow-hidden bg-[#e0d8cc]">
          <Image
            src="/gallery/Kansotex-indoor-riad-tissus-pinterest-2.webp"
            alt="Atelier Kansotex Marrakech"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
          
          {/* Authentic Atelier Stamp */}
          <div className="absolute bottom-5 left-5 z-10 bg-cream/95 backdrop-blur-xs px-3.5 py-2 border border-ink/15 shadow-sm">
            <span className="font-termina text-[8px] uppercase tracking-[0.25em] text-olive font-bold block">
              {toTermina(isEn ? "Master Upholsterers" : "Maitres Tapissiers")}
            </span>
            <span className="font-termina text-[10px] uppercase tracking-[0.2em] text-ink font-bold">
              {toTermina("Manufacture Marrakech")}
            </span>
          </div>
        </div>

        {/* Right Side: Editorial Content & Bespoke Services */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-olive" />
              <span className="font-termina text-[9px] uppercase tracking-[0.3em] text-olive font-bold">
                {toTermina(isEn ? "Craftsmanship & Tailoring Services" : "Savoir-Faire & Confection Sur-Mesure")}
              </span>
            </div>

            <h3 className="editorial text-3xl sm:text-4xl text-ink font-normal italic mb-4 leading-tight">
              {isEn ? "The Art of Haute Tapestry in Marrakech" : "L'Art de la Haute Confection Tapissière"}
            </h3>

            <p className="font-sans text-xs sm:text-sm text-muted font-light leading-relaxed mb-6 max-w-xl">
              {isEn
                ? "Beyond fine fabrics, Kansotex operates an artisanal manufacture in Marrakech. Our master craftsmen transform your chosen textiles into bespoke curtains, roman shades, headboards, and outdoor terrace daybeds."
                : "Au-delà de l'édition de tissus, Kansotex dispose de sa propre manufacture à Marrakech. Nos artisans tapissiers donnent vie à vos projets d'aménagement sur mesure pour riads, résidences et hôtels de luxe."}
            </p>

            {/* Editorial Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-ink/10 text-xs font-sans text-ink/80 mb-8">
              <div className="flex items-start gap-2.5">
                <span className="text-olive font-bold text-sm shrink-0">·</span>
                <div>
                  <strong className="font-termina text-[10px] uppercase tracking-wider block text-ink mb-0.5">
                    {toTermina(isEn ? "On-Site Measurements" : "Prise de Cotes sur Site")}
                  </strong>
                  <span className="text-[11px] text-muted font-light">
                    {isEn ? "Direct on-site measurements across Morocco." : "Déplacement technique en riad, villa et hôtel."}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-olive font-bold text-sm shrink-0">·</span>
                <div>
                  <strong className="font-termina text-[10px] uppercase tracking-wider block text-ink mb-0.5">
                    {toTermina(isEn ? "Drapery & Shades" : "Rideaux & Stores Bateaux")}
                  </strong>
                  <span className="text-[11px] text-muted font-light">
                    {isEn ? "Lined blackouts, wave pleats & sheer linens." : "Doublures occultantes thermiques et plis wave."}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-olive font-bold text-sm shrink-0">·</span>
                <div>
                  <strong className="font-termina text-[10px] uppercase tracking-wider block text-ink mb-0.5">
                    {toTermina(isEn ? "Outdoor Terraces" : "Banquettes & Terrasses")}
                  </strong>
                  <span className="text-[11px] text-muted font-light">
                    {isEn ? "Water-repellent foam & UV resistant covers." : "Mousses Dry-Feel et toiles imputrescibles."}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="text-olive font-bold text-sm shrink-0">·</span>
                <div>
                  <strong className="font-termina text-[10px] uppercase tracking-wider block text-ink mb-0.5">
                    {toTermina(isEn ? "Installation & Fit" : "Pose & Finitions")}
                  </strong>
                  <span className="text-[11px] text-muted font-light">
                    {isEn ? "Turnkey installation and meticulous steam press." : "Pose clé en main avec défroissage vapeur."}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-ink/10">
            <Link
              href={`/${locale}/savoir-faire`}
              className="inline-flex items-center justify-center bg-ink text-cream hover:bg-black font-termina text-[10px] uppercase tracking-[0.25em] font-bold py-3.5 px-7 transition-colors"
            >
              {toTermina(isEn ? "Discover our Atelier →" : "Decouvrir Notre Atelier →")}
            </Link>
            <a
              href="https://wa.me/212661090950?text=Bonjour%20Kansotex,%20je%20souhaite%20une%20prise%20de%20cotes%20ou%20un%20devis%20de%20confection%20sur-mesure."
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-termina uppercase tracking-widest text-ink/70 hover:text-ink underline underline-offset-4 transition-colors py-2"
            >
              {toTermina(isEn ? "Request On-Site Measurement via WhatsApp" : "Demander une Prise de Cotes sur WhatsApp")}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PDPAtelierBanner;
