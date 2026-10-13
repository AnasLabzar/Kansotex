import React from "react";
import { toTermina } from "@/lib/text";

interface PDPTechnicalBadgesProps {
  product: {
    type: string;
    category?: {
      slug?: string;
      nameFr?: string;
      nameEn?: string | null;
    } | null;
    metadata?: {
      martindale?: number | null;
      composition?: string | null;
      weight?: number | null;
      laize?: number | null;
    } | null;
  };
  locale?: string;
}

export function PDPTechnicalBadges({ product, locale = "fr" }: PDPTechnicalBadgesProps) {
  const isEn = locale === "en";
  const catSlug = product.category?.slug?.toLowerCase() || "";
  const isFabric = product.type === "FABRIC_BY_METER" || catSlug.includes("tissu");
  const isOutdoor = catSlug.includes("outdoor");
  const isBedLinen = catSlug.includes("linge-de-lit");
  const isBathLinen = catSlug.includes("linge-de-bain");

  // =========================================================================
  // FABRICS IN & OUTDOOR (Fer de lance vs Mozaieq & ASD)
  // =========================================================================
  if (isFabric) {
    return (
      <section className="mt-20 sm:mt-28">
        
        {/* Luxury Dossier Top Header */}
        <div className="border border-ink/15 bg-[#faf6f0] p-8 sm:p-10 border-b-0">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-ink/10">
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-block w-2 h-2 rotate-45 bg-olive" />
                <span className="font-termina text-[10px] tracking-[0.3em] uppercase text-olive font-bold">
                  {toTermina(isEn ? "Technical Dossier · Contract Grade" : "Cahier des Charges Technique · Haute Facture")}
                </span>
              </div>
              <h3 className="editorial text-3xl sm:text-4xl lg:text-5xl text-ink font-normal italic tracking-tight">
                {isEn ? "In & Outdoor Performance Standards" : "Performances In & Outdoor & Haute Facture"}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-muted font-light mt-2 max-w-2xl leading-relaxed">
                {isEn
                  ? "Architectural-grade textiles engineered for rigorous hospitality environments, private estates, and luxury riads."
                  : "Étoffes éditées pour répondre aux exigences extrêmes de l'hôtellerie de luxe, des riads de prestige et de l'architecture méditerranéenne."}
              </p>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2 bg-ink text-[#f4efe6] border border-ink flex items-center gap-2.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c19a86]" />
                <span className="font-termina text-[9px] uppercase tracking-[0.2em] font-bold">
                  {toTermina(isOutdoor ? (isEn ? "High Outdoor Resistance" : "Haute Resistance Exterieure") : (isEn ? "Contract & Luxury Grade" : "Qualite Contract & Grand Passage"))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Hairline Matrix (Bespoke Pro Icons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-x border-b border-ink/15 bg-[#faf6f0]">
          
          {/* 1. Solidité UV & Lumière (ISO 105-B02 Grade 7/8) */}
          <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                  <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                    {/* Pro Icon: Solar compass disc with celestial meridian & rays */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                      <circle cx="12" cy="12" r="9.5" strokeDasharray="1.5 2.5" opacity="0.6" />
                      <circle cx="12" cy="12" r="4.5" />
                      <line x1="12" y1="1.5" x2="12" y2="4.5" />
                      <line x1="12" y1="19.5" x2="12" y2="22.5" />
                      <line x1="1.5" y1="12" x2="4.5" y2="12" />
                      <line x1="19.5" y1="12" x2="22.5" y2="12" />
                      <line x1="4.5" y1="4.5" x2="6.7" y2="6.7" />
                      <line x1="17.3" y1="17.3" x2="19.5" y2="19.5" />
                      <line x1="4.5" y1="19.5" x2="6.7" y2="17.3" />
                      <line x1="17.3" y1="6.7" x2="19.5" y2="4.5" />
                      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                  <span className="font-termina text-xs text-olive font-bold tracking-widest block">01</span>
                </div>
              </div>

              <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
                {toTermina(isEn ? "UV Resistance Grade 7/8" : "Solidite UV & Plein Soleil")}
              </h4>
              <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
                {isEn
                  ? "Certified ISO 105-B02 colorfastness rating 7/8. Mass-dyed fibers resist extreme desert and coastal UV exposure without fading or degrading."
                  : "Certification ISO 105-B02 indice 7/8. Teint dans la masse, le tissu ne décolore pas face au soleil zénithal de Marrakech et aux fortes expositions lumineuses."}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
              <span className="text-ink/40 font-medium">{toTermina(isEn ? "Standard" : "Norme")}</span>
              <span className="font-bold text-ink flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-olive" />
                ISO 105-B02 (7/8)
              </span>
            </div>
          </div>

          {/* 2. Déperlance & Anti-taches Signature */}
          <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                  <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                    {/* Pro Icon: Hydrophobic droplet on warp & weft textile lattice */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                      <path d="M4 11c2.5-3 5.5-4.5 8-4.5s5.5 1.5 8 4.5" strokeDasharray="1.5 1.5" opacity="0.7" />
                      <path d="M12 3.5C12 3.5 7.5 9 7.5 13a4.5 4.5 0 0 0 9 0c0-4-4.5-9.5-4.5-9.5z" />
                      <path d="M10.5 13.5a1.8 1.8 0 0 1 1.8-1.8" />
                      <line x1="3" y1="20.5" x2="21" y2="20.5" />
                      <line x1="5" y1="17.5" x2="19" y2="17.5" />
                      <circle cx="7" cy="20.5" r="0.6" fill="currentColor" />
                      <circle cx="12" cy="20.5" r="0.6" fill="currentColor" />
                      <circle cx="17" cy="20.5" r="0.6" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                  <span className="font-termina text-xs text-olive font-bold tracking-widest block">02</span>
                </div>
              </div>

              <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
                {toTermina(isEn ? "Hydrophobic & Stain Shield" : "Deperlance & Barriere Anti-Taches")}
              </h4>
              <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
                {isEn
                  ? "Treated with invisible hydrophobic fluorocarbon shield that causes water, poolside splashes, coffee, and oils to bead up on contact for effortless cleaning."
                  : "Traitement hydrophobe invisible haute tenue : l'eau de piscine, les averses, le café et les graisses perlent instantanément en surface sans pénétrer la trame."}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
              <span className="text-ink/40 font-medium">{toTermina(isEn ? "Finishing" : "Traitement")}</span>
              <span className="font-bold text-ink flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-olive" />
                {toTermina(isEn ? "Easy Clean Oleophobic" : "Bouclier Oleophobe")}
              </span>
            </div>
          </div>

          {/* 3. Martindale Abrasion Heavy Contract */}
          <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                  <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                    {/* Pro Icon: Calibrated Martindale orbital friction dial */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                      <circle cx="12" cy="12" r="9.5" />
                      <circle cx="12" cy="12" r="6" strokeDasharray="2 2" opacity="0.6" />
                      <polygon points="12 8 15 12 12 16 9 12" />
                      <line x1="12" y1="2.5" x2="12" y2="4.5" />
                      <line x1="12" y1="19.5" x2="12" y2="21.5" />
                      <line x1="2.5" y1="12" x2="4.5" y2="12" />
                      <line x1="19.5" y1="12" x2="21.5" y2="12" />
                      <path d="M17 7a7 7 0 0 1 1.5 5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                  <span className="font-termina text-xs text-olive font-bold tracking-widest block">03</span>
                </div>
              </div>

              <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
                {toTermina(product.metadata?.martindale ? `Martindale ${product.metadata.martindale.toLocaleString()} Tours` : "Test Martindale Intensif")}
              </h4>
              <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
                {isEn
                  ? "Rated for heavy contract hospitality use. Withstands intensive friction on hotel seating, banquettes, and restaurant terraces without premature wear."
                  : "Homologué usage contract intensif. Résistance exceptionnelle aux frottements répétés, idéal pour assises de riads, banquettes d'hôtels et terrasses à fort passage."}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
              <span className="text-ink/40 font-medium">{toTermina(isEn ? "Durability" : "Resilience")}</span>
              <span className="font-bold text-ink flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-olive" />
                {product.metadata?.martindale ? `${product.metadata.martindale.toLocaleString()} Tours` : "Contract Grade"}
              </span>
            </div>
          </div>

          {/* 4. Anti-Moisissures & Imputrescibilité */}
          <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                  <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                    {/* Pro Icon: Breathable atmospheric micro-ventilation matrix */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                      <path d="M3 8.5c3-2 6 2 9 0s6-2 9 0" />
                      <path d="M3 13.5c3-2 6 2 9 0s6-2 9 0" />
                      <line x1="3" y1="18.5" x2="21" y2="18.5" />
                      <line x1="3" y1="21.5" x2="21" y2="21.5" strokeDasharray="2 2" opacity="0.6" />
                      <line x1="7" y1="16.5" x2="7" y2="21.5" />
                      <line x1="12" y1="16.5" x2="12" y2="21.5" />
                      <line x1="17" y1="16.5" x2="17" y2="21.5" />
                      <circle cx="18" cy="5" r="1.2" />
                    </svg>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                  <span className="font-termina text-xs text-olive font-bold tracking-widest block">04</span>
                </div>
              </div>

              <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
                {toTermina(isEn ? "Mildew & Moisture Resistant" : "Anti-Moisissure & Imputrescible")}
              </h4>
              <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
                {isEn
                  ? "Breathable fiber structure prevents condensation, mildew growth, and fiber rot even when exposed to humid poolside or coastal environments."
                  : "Structure respirante empêchant la stagnation de l'humidité et le développement de moisissures. Parfait pour pergolas, abords de piscine et bord de mer."}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
              <span className="text-ink/40 font-medium">{toTermina(isEn ? "Protection" : "Traitement")}</span>
              <span className="font-bold text-ink flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-olive" />
                {toTermina(isEn ? "Anti-Microbial" : "Imputrescible")}
              </span>
            </div>
          </div>

          {/* 5. Sécurité Incendie & Norme Non-Feu (M1 / BS 5852 ERP) */}
          <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                  <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                    {/* Pro Icon: Heraldic shield with disciplined flame crest */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                      <path d="M12 2.5L4.5 5.5v6.5c0 5 3.5 8.5 7.5 10 4-1.5 7.5-5 7.5-10V5.5L12 2.5z" />
                      <path d="M12 8c.5 1.5 2 2.5 2 4.5a2.5 2.5 0 0 1-5 0c0-1.8 1.8-3 2-4.5z" />
                      <circle cx="12" cy="13.5" r="0.8" fill="currentColor" />
                    </svg>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                  <span className="font-termina text-xs text-olive font-bold tracking-widest block">05</span>
                </div>
              </div>

              <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
                {toTermina(isEn ? "Contract Fire Retardant M1 / BS5852" : "Normes Non-Feu M1 / ERP")}
              </h4>
              <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
                {isEn
                  ? "Meets strict hospitality fire regulations. Certifications M1, BS 5852 Crib 5 and CAL 117 available upon request for public establishments."
                  : "Conforme aux exigences strictes de sécurité incendie des ERP. Traitements ignifuges certifiés M1 / BS 5852 disponibles sur demande pour vos chantiers."}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
              <span className="text-ink/40 font-medium">{toTermina(isEn ? "Fire Safety" : "Securite")}</span>
              <span className="font-bold text-ink flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-olive" />
                M1 / BS 5852 (ERP)
              </span>
            </div>
          </div>

          {/* 6. Confection Sur-Mesure Atelier Marrakech */}
          <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
            <div>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                  <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                    {/* Pro Icon: Master tailor crossed shears & ribbon rule */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                      <circle cx="6" cy="6" r="2.8" />
                      <circle cx="6" cy="18" r="2.8" />
                      <line x1="8.2" y1="7.8" x2="20" y2="19.5" />
                      <line x1="8.2" y1="16.2" x2="20" y2="4.5" />
                      <circle cx="12" cy="12" r="1.1" fill="currentColor" />
                      <path d="M17 9.5l3 2.5-3 2.5" strokeDasharray="1 1" opacity="0.6" />
                    </svg>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                  <span className="font-termina text-xs text-olive font-bold tracking-widest block">06</span>
                </div>
              </div>

              <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
                {toTermina(isEn ? "Marrakech Bespoke Workshop" : "Atelier & Confection Marrakech")}
              </h4>
              <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
                {isEn
                  ? "Crafted by master upholsterers directly in our Marrakech manufacture. Bespoke drapery, roman shades, outdoor seating and cushions made to measure."
                  : "Façonnage sur mesure dans notre manufacture à Marrakech. Prise de cotes, rideaux doublés grande hauteur, stores bateaux et banquettes d'extérieur."}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
              <span className="text-ink/40 font-medium">{toTermina(isEn ? "Craftsmanship" : "Origine")}</span>
              <span className="font-bold text-ink flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-olive" />
                {toTermina("Manufacture Marrakech")}
              </span>
            </div>
          </div>

        </div>
      </section>
    );
  }

  // =========================================================================
  // LUXURY BED & BATH LINEN (Face à Easy Linge & concurrents)
  // =========================================================================
  return (
    <section className="mt-20 sm:mt-28">
      
      {/* Luxury Dossier Top Header */}
      <div className="border border-ink/15 bg-[#faf6f0] p-8 sm:p-10 border-b-0">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-ink/10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-block w-2 h-2 rotate-45 bg-olive" />
              <span className="font-termina text-[10px] tracking-[0.3em] uppercase text-olive font-bold">
                {toTermina(isEn ? "Hospitality Excellence Standards · 5 Stars" : "Standards Hotellerie de Luxe · 5 Etoiles")}
              </span>
            </div>
            <h3 className="editorial text-3xl sm:text-4xl lg:text-5xl text-ink font-normal italic tracking-tight">
              {isEn ? "Luxury Bed & Bath Linen Excellence" : "Excellence Hôtelière & Savoir-Faire Linge"}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-muted font-light mt-2 max-w-2xl leading-relaxed">
              {isEn
                ? "Crafted to the exacting standards of Morocco's leading palaces, luxury riads, and five-star spa sanctuaries."
                : "Confectionné selon les exigences rigoureuses des plus prestigieux palaces marocains, riads d'exception et spas de luxe."}
            </p>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 bg-ink text-[#f4efe6] border border-ink flex items-center gap-2.5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c19a86]" />
              <span className="font-termina text-[9px] uppercase tracking-[0.2em] font-bold">
                {toTermina(
                  isBedLinen
                    ? (isEn ? "5-Star Riad & Suite Grade" : "Standards Palaces & Riads")
                    : isBathLinen
                    ? (isEn ? "Luxury Spa & Resort 600g/m2" : "Spa & Residences 600g/m2")
                    : (isEn ? "Fine Table Linen" : "Haute Table d'Hotes")
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Hairline Matrix (Bespoke Pro Icons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-x border-b border-ink/15 bg-[#faf6f0]">
        
        {/* 1. Résistance Blanchisserie Industrielle (60°-90°C) */}
        <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
          <div>
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                  {/* Pro Icon: Architectural laundry calender vat with thermal waves */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                    <path d="M4 6.5h16l-1.8 12.5a2 2 0 0 1-2 1.8H7.8a2 2 0 0 1-2-1.8L4 6.5z" />
                    <line x1="3" y1="6.5" x2="21" y2="6.5" />
                    <path d="M8 12c1.3 1.2 2.7 1.2 4 0s2.7-1.2 4 0" />
                    <path d="M9 15.5c1 1 2 1 3 0s2-1 3 0" opacity="0.7" />
                    <path d="M8.5 2.5v2M12 1.5v3M15.5 2.5v2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                <span className="font-termina text-xs text-olive font-bold tracking-widest block">01</span>
              </div>
            </div>

            <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
              {toTermina(isEn ? "Industrial Wash 60-90C" : "Lavage Intensif 60-90 C")}
            </h4>
            <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
              {isEn
                ? "Tested for industrial laundry calenders. Maintains dimensional stability, fiber density, and silken touch through hundreds of professional cycles."
                : "Conçu pour les calandres et blanchisseries professionnelles. Résiste aux lavages à haute température (60°-90°C) sans rétrécir, ni pelucher, ni vriller."}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
            <span className="text-ink/40 font-medium">{toTermina(isEn ? "Thermal Cycle" : "Temperature")}</span>
            <span className="font-bold text-ink flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-olive" />
              60°C - 90°C Pro
            </span>
          </div>
        </div>

        {/* 2. Fibres d'Exception Longues Fibres */}
        <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
          <div>
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                  {/* Pro Icon: Exquisite botanical cotton flower boll & flax stem */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                    <path d="M12 21.5v-6" />
                    <path d="M12 15.5c-3.5-1-5.5-3.5-5.5-6.5a5.5 5.5 0 0 1 11 0c0 3-2 5.5-5.5 6.5z" />
                    <path d="M8 9a4 4 0 0 1 8 0" />
                    <circle cx="12" cy="8.5" r="1.8" />
                    <path d="M9 16c-1.5 2-3 2.5-4 2.5M15 16c1.5 2 3 2.5 4 2.5" opacity="0.6" />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                <span className="font-termina text-xs text-olive font-bold tracking-widest block">02</span>
              </div>
            </div>

            <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
              {toTermina(isEn ? "Long-Staple Noble Fibers" : "Fibres Nobles d'Exception")}
            </h4>
            <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
              {product.metadata?.composition
                ? product.metadata.composition
                : isEn
                ? "Woven exclusively from certified long-staple combed cotton or European Flax certified French washed linen with natural softness."
                : "Coton peigné longues fibres d'Égypte (percale 300 fils ou satin 500 fils) et pur lin lavé certifié European Flax, au toucher d'une douceur absolue."}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
            <span className="text-ink/40 font-medium">{toTermina(isEn ? "Fiber Grade" : "Origine")}</span>
            <span className="font-bold text-ink flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-olive" />
              Giza / European Flax
            </span>
          </div>
        </div>

        {/* 3. Thermorégulation Naturelle */}
        <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
          <div>
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                  {/* Pro Icon: Dual-climate equilibrium (solar warmth & cool breeze wave) */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                    <circle cx="12" cy="12" r="9.5" />
                    <line x1="12" y1="2.5" x2="12" y2="21.5" strokeDasharray="1.5 2" opacity="0.5" />
                    <path d="M12 6.5a5.5 5.5 0 0 0 0 11" />
                    <line x1="7" y1="8" x2="5.5" y2="6.5" />
                    <line x1="5" y1="12" x2="3.5" y2="12" />
                    <line x1="7" y1="16" x2="5.5" y2="17.5" />
                    <path d="M13.5 9h5a2 2 0 0 0-2-2" />
                    <path d="M13.5 12h6a2 2 0 0 0-2-2" />
                    <path d="M13.5 15h4a2 2 0 0 0-2-2" />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                <span className="font-termina text-xs text-olive font-bold tracking-widest block">03</span>
              </div>
            </div>

            <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
              {toTermina(isEn ? "Active Thermoregulation" : "Thermoregulation Naturelle")}
            </h4>
            <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
              {isEn
                ? "Highly breathable natural structure ensures a crisp, cool sensation during warm Moroccan summer nights and a cozy, enveloping warmth in winter."
                : "Pouvoir respirant élevé permettant une régulation thermique idéale : fraîcheur aérée durant les nuits d'été et chaleur douce et enveloppante en hiver."}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
            <span className="text-ink/40 font-medium">{toTermina(isEn ? "Comfort" : "Climat")}</span>
            <span className="font-bold text-ink flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-olive" />
              {toTermina(isEn ? "4-Season Equilibrium" : "4 Saisons Actif")}
            </span>
          </div>
        </div>

        {/* 4. Densité & Grammage Hôtelier (600 g/m²) */}
        <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
          <div>
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                  {/* Pro Icon: Precision balance scale with stamped metric weight */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                    <line x1="12" y1="3" x2="12" y2="21" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="4" y1="6.5" x2="20" y2="6.5" />
                    <circle cx="12" cy="6.5" r="1.2" fill="currentColor" />
                    <path d="M4 6.5l-2 7h6l-2-7" />
                    <path d="M2 13.5c0 1.5 1.8 2.5 3 2.5s3-1 3-2.5" />
                    <path d="M20 6.5l-2 7h6l-2-7" />
                    <path d="M18 13.5c0 1.5 1.8 2.5 3 2.5s3-1 3-2.5" />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                <span className="font-termina text-xs text-olive font-bold tracking-widest block">04</span>
              </div>
            </div>

            <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
              {toTermina(product.metadata?.weight ? `${product.metadata.weight} g/m2 Certifie` : "Densite Hôteliere Superieure")}
            </h4>
            <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
              {isEn
                ? "Ultra-plush combed cotton loops deliver immediate capillary absorption and luxurious weight for bath sheets, and fluid, crisp drape for bed sets."
                : "Boucles généreuses en coton peigné offrant une absorption instantanée pour le bain et un tombé lourd digne des plus prestigieux spas et riads."}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
            <span className="text-ink/40 font-medium">{toTermina(isEn ? "Density" : "Grammage")}</span>
            <span className="font-bold text-ink flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-olive" />
              {product.metadata?.weight ? `${product.metadata.weight} g/m²` : "600 g/m² Certifié"}
            </span>
          </div>
        </div>

        {/* 5. Broderie & Monogramme Sur-Mesure */}
        <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
          <div>
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                  {/* Pro Icon: Haute couture embroidery needle & monogram crest */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                    <line x1="20.5" y1="3.5" x2="7" y2="17" />
                    <ellipse cx="19.5" cy="4.5" rx="1.5" ry="0.6" transform="rotate(-45 19.5 4.5)" />
                    <circle cx="19.2" cy="4.8" r="0.4" fill="currentColor" />
                    <path d="M18.5 5.5c-4 4-8 1-9 5s3 6-1 7-4-1-4-1" strokeDasharray="1.5 1.5" />
                    <path d="M3 21c2-3 5-3 7 0" opacity="0.6" />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                <span className="font-termina text-xs text-olive font-bold tracking-widest block">05</span>
              </div>
            </div>

            <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
              {toTermina(isEn ? "Bespoke Monogram Embroidery" : "Broderie & Armoiries Riad")}
            </h4>
            <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
              {isEn
                ? "Custom embroidery of your hotel emblem, monogram or property signature executed with precision silk threads in our Marrakech workshop."
                : "Personnalisation brodée aux armoiries, monogrammes ou emblèmes de votre Riad, boutique-hôtel ou domaine de prestige à Marrakech."}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
            <span className="text-ink/40 font-medium">{toTermina(isEn ? "Craft" : "Finition")}</span>
            <span className="font-bold text-ink flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-olive" />
              {toTermina(isEn ? "Silk Monogram" : "Fil de Soie")}
            </span>
          </div>
        </div>

        {/* 6. Normes Écologiques & Oeko-Tex */}
        <div className="p-8 sm:p-9 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white transition-all duration-300 group relative">
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-olive/60 transition-colors pointer-events-none" />
          <div>
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 border border-ink/20 bg-[#f4efe6] group-hover:border-olive group-hover:bg-[#fcfbf9] transition-all duration-300 flex items-center justify-center text-ink group-hover:text-olive shadow-xs">
                <div className="w-11 h-11 border border-ink/10 group-hover:border-olive/40 flex items-center justify-center transition-colors">
                  {/* Pro Icon: Pure botanical laurel wreath and organic sprout */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 transition-transform duration-300 group-hover:scale-105">
                    <circle cx="12" cy="12" r="9.5" />
                    <circle cx="12" cy="12" r="7.8" strokeDasharray="1.5 2" opacity="0.5" />
                    <path d="M12 17.5v-7" />
                    <path d="M12 10.5c0-3 2.5-4 4.5-4 0 2.5-1.5 4-4.5 4z" />
                    <path d="M12 13c0-2-2-3-3.5-3 0 2 1 3 3.5 3z" />
                    <path d="M8.5 17.5h7" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
              <div className="text-right">
                <span className="font-termina text-[9px] text-ink/40 font-bold tracking-[0.25em] block">SPEC</span>
                <span className="font-termina text-xs text-olive font-bold tracking-widest block">06</span>
              </div>
            </div>

            <h4 className="font-termina text-xs font-bold uppercase tracking-[0.16em] text-ink mb-2.5 leading-snug">
              {toTermina(isEn ? "Oeko-Tex Standard 100" : "Teintures Saines Oeko-Tex")}
            </h4>
            <p className="font-sans text-xs text-muted/90 font-light leading-relaxed">
              {isEn
                ? "Certified free of toxic dyes, heavy metals and harsh chemical finishes. Completely hypoallergenic and soothing on sensitive skin."
                : "Teintures éco-responsables certifiées sans métaux lourds ni substances allergènes. Confort absolu pour les peaux les plus exigeantes."}
            </p>
          </div>

          <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-[10px] font-termina tracking-widest uppercase">
            <span className="text-ink/40 font-medium">{toTermina(isEn ? "Health" : "Certification")}</span>
            <span className="font-bold text-ink flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-olive" />
              Oeko-Tex 100 Classe 1
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PDPTechnicalBadges;
