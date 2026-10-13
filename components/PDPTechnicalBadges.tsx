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
      <section className="mt-20 sm:mt-28 pt-14 sm:pt-16 border-t border-ink/15">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-ink/10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-olive" />
              <span className="font-termina text-[10px] tracking-[0.3em] uppercase text-olive font-bold">
                {toTermina(isEn ? "Technical Specifications · Contract Grade" : "Cahier des Charges Technique · Qualite Contract")}
              </span>
            </div>
            <h3 className="editorial text-3xl sm:text-4xl text-ink font-normal italic">
              {isEn ? "In & Outdoor Performance Standards" : "Performances In & Outdoor & Haute Facture"}
            </h3>
          </div>
          
          <div className="flex items-center gap-2 shrink-0 self-start md:self-end">
            <span className="font-termina text-[9px] uppercase tracking-widest px-3.5 py-1.5 border border-olive/30 bg-olive/5 text-olive font-bold">
              {toTermina(isOutdoor ? (isEn ? "Outdoor High Resistance" : "Haute Resistance Exterieure") : (isEn ? "Contract & Luxury Grade" : "Qualite Contract & Residentiel"))}
            </span>
          </div>
        </div>

        {/* Architectural Hairline Matrix (Bespoke Pro Icons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink/15 bg-white/40">
          
          {/* 1. Solidité UV & Lumière (ISO 105-B02 Grade 7/8) */}
          <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                  {/* Pro Icon: Sun ray aperture with solar shield */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
                    <circle cx="12" cy="12" r="7.5" strokeDasharray="1 3" />
                  </svg>
                </span>
                <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">01</span>
              </div>
              <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
                {toTermina(isEn ? "UV Resistance Grade 7/8" : "Solidite UV & Plein Soleil")}
              </h4>
              <p className="font-sans text-xs text-muted font-light leading-relaxed">
                {isEn
                  ? "Certified ISO 105-B02 colorfastness rating 7/8. Mass-dyed fibers resist extreme desert and coastal UV exposure without fading."
                  : "Certification ISO 105-B02 indice 7/8. Teint dans la masse, le tissu ne décolore pas face au soleil zénithal de Marrakech et aux fortes luminosités."}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
              <span>{toTermina(isEn ? "Standard" : "Norme")}</span>
              <span className="font-bold text-ink">ISO 105-B02</span>
            </div>
          </div>

          {/* 2. Déperlance & Anti-taches Signature */}
          <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                  {/* Pro Icon: Water pearl beading upon woven fabric grid */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2.5C12 2.5 6 9.5 6 14a6 6 0 0 0 12 0c0-4.5-6-11.5-6-11.5z" />
                    <path d="M3 21h18M5 18h14M7 15h10" strokeDasharray="1.5 1.5" />
                    <circle cx="10" cy="12" r="1" fill="currentColor" />
                  </svg>
                </span>
                <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">02</span>
              </div>
              <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
                {toTermina(isEn ? "Hydrophobic & Stain Shield" : "Deperlance & Barriere Anti-Taches")}
              </h4>
              <p className="font-sans text-xs text-muted font-light leading-relaxed">
                {isEn
                  ? "Treated with invisible fluorocarbon shield that causes water, poolside splashes, coffee, and wine to bead up on contact for effortless cleaning."
                  : "Traitement hydrophobe invisible haute tenue : l'eau de piscine, les pluies battantes, le café et les graisses perlent en surface sans pénétrer la fibre."}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
              <span>{toTermina(isEn ? "Finishing" : "Traitement")}</span>
              <span className="font-bold text-ink">{toTermina(isEn ? "Easy Clean" : "Anti-Taches")}</span>
            </div>
          </div>

          {/* 3. Martindale Abrasion Heavy Contract */}
          <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                  {/* Pro Icon: Precision friction orbital gauge */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 6v6l4 2" />
                    <path d="M9 3l3-2 3 2M9 21l3 2 3-2" />
                  </svg>
                </span>
                <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">03</span>
              </div>
              <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
                {toTermina(product.metadata?.martindale ? `Martindale ${product.metadata.martindale.toLocaleString()} Tours` : "Test Martindale Intensif")}
              </h4>
              <p className="font-sans text-xs text-muted font-light leading-relaxed">
                {isEn
                  ? "Rated for heavy contract hospitality use. Withstands intensive friction on hotel seating, banquettes, and restaurant terraces without premature wear."
                  : "Homologué usage contract intensif. Résistance exceptionnelle à l'usure mécanique, idéal pour assises de riads, banquettes d'hôtels et restaurants."}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
              <span>{toTermina(isEn ? "Grade" : "Usage")}</span>
              <span className="font-bold text-ink">{toTermina(isEn ? "Heavy Duty" : "Grand Passage")}</span>
            </div>
          </div>

          {/* 4. Anti-Moisissures & Imputrescibilité */}
          <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                  {/* Pro Icon: Breathable cross-perforated weave grid */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M3 15h18M9 3v18M15 3v18" strokeDasharray="1 2" />
                    <path d="M8 8l8 8M16 8l-8 8" />
                  </svg>
                </span>
                <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">04</span>
              </div>
              <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
                {toTermina(isEn ? "Anti-Mildew & Rot-Proof" : "Anti-Moisissures & Imputrescible")}
              </h4>
              <p className="font-sans text-xs text-muted font-light leading-relaxed">
                {isEn
                  ? "Engineered with quick-drying breathable structure. Resists condensation, mold, and odor build-up on outdoor cushions left outside year-round."
                  : "Structure respirante à séchage rapide. Empêche le développement des moisissures, champignons et odeurs sur les mousses de coussins d'extérieur."}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
              <span>{toTermina(isEn ? "Property" : "Propriete")}</span>
              <span className="font-bold text-ink">{toTermina(isEn ? "Rot-Proof" : "Imputrescible")}</span>
            </div>
          </div>

          {/* 5. Normes Non-Feu M1 / Contract ERP */}
          <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                  {/* Pro Icon: Safety flame within an architectural heraldic shield */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8c1.5 2 2.5 3 2.5 4.5a2.5 2.5 0 0 1-5 0c0-1.5 1-2.5 2.5-4.5z" fill="currentColor" fillOpacity="0.2" />
                  </svg>
                </span>
                <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">05</span>
              </div>
              <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
                {toTermina(isEn ? "Contract Fire Retardant M1 / BS5852" : "Normes Non-Feu M1 / ERP")}
              </h4>
              <p className="font-sans text-xs text-muted font-light leading-relaxed">
                {isEn
                  ? "Meets strict hospitality fire regulations. Certifications M1, BS 5852 Crib 5 and CAL 117 available upon request for public establishments."
                  : "Conforme aux exigences de sécurité incendie des ERP. Traitements ignifuges certifiés M1 / BS 5852 disponibles sur demande pour vos chantiers."}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
              <span>{toTermina(isEn ? "Fire Safety" : "Securite")}</span>
              <span className="font-bold text-ink">{toTermina("M1 / BS 5852")}</span>
            </div>
          </div>

          {/* 6. Confection Sur-Mesure Atelier Marrakech */}
          <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                  {/* Pro Icon: Master tailor scissors crossed with ribbon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <line x1="8.5" y1="8.5" x2="20" y2="20" />
                    <line x1="8.5" y1="15.5" x2="20" y2="4" />
                  </svg>
                </span>
                <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">06</span>
              </div>
              <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
                {toTermina(isEn ? "Marrakech Bespoke Workshop" : "Atelier & Confection Marrakech")}
              </h4>
              <p className="font-sans text-xs text-muted font-light leading-relaxed">
                {isEn
                  ? "Crafted by master upholsterers directly in our Marrakech manufacture. Bespoke drapery, roman shades, outdoor seating and cushions made to measure."
                  : "Façonnage sur mesure dans notre manufacture à Marrakech. Prise de cotes, rideaux doublés, stores bateaux, coussins d'assise et banquettes."}
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
              <span>{toTermina(isEn ? "Origin" : "Origine")}</span>
              <span className="font-bold text-ink">{toTermina("Marrakech")}</span>
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
    <section className="mt-20 sm:mt-28 pt-14 sm:pt-16 border-t border-ink/15">
      
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-ink/10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-olive" />
            <span className="font-termina text-[10px] tracking-[0.3em] uppercase text-olive font-bold">
              {toTermina(isEn ? "Hospitality Excellence Standards · 5 Stars" : "Standards Hotellerie de Luxe · 5 Etoiles")}
            </span>
          </div>
          <h3 className="editorial text-3xl sm:text-4xl text-ink font-normal italic">
            {isEn ? "Luxury Bed & Bath Linen Excellence" : "Excellence Hôtelière & Savoir-Faire Linge"}
          </h3>
        </div>
        
        <div className="flex items-center gap-2 shrink-0 self-start md:self-end">
          <span className="font-termina text-[9px] uppercase tracking-widest px-3.5 py-1.5 border border-olive/30 bg-olive/5 text-olive font-bold">
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

      {/* Architectural Hairline Matrix (Bespoke Pro Icons) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-ink/15 bg-white/40">
        
        {/* 1. Résistance Blanchisserie Industrielle (60°-90°C) */}
        <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                {/* Pro Icon: Architectural laundry vat with temperature stamp */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 6h16l-2 13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L4 6z" />
                  <path d="M3 6h18" />
                  <path d="M9 11c1.5 1.5 4.5 1.5 6 0" />
                  <circle cx="12" cy="15" r="1" fill="currentColor" />
                  <path d="M8 2l2 2M16 2l-2 2" strokeDasharray="1 1" />
                </svg>
              </span>
              <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">01</span>
            </div>
            <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
              {toTermina(isEn ? "Industrial Wash 60-90C" : "Lavage Intensif 60-90 C")}
            </h4>
            <p className="font-sans text-xs text-muted font-light leading-relaxed">
              {isEn
                ? "Tested for industrial laundry calenders. Maintains dimensional stability, fiber density, and silken touch through hundreds of professional cycles."
                : "Conçu pour les calandres et blanchisseries professionnelles. Résiste aux lavages à haute température (60°-90°C) sans rétrécir, ni pelucher, ni vriller."}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
            <span>{toTermina(isEn ? "Thermal Stability" : "Temperature")}</span>
            <span className="font-bold text-ink">60°C - 90°C</span>
          </div>
        </div>

        {/* 2. Fibres d'Exception Longues Fibres */}
        <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                {/* Pro Icon: Botanical Egyptian cotton boll / flax filament */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c-4-4-7-8-7-12a7 7 0 0 1 14 0c0 4-3 8-7 12z" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 7v6M9 10h6" />
                </svg>
              </span>
              <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">02</span>
            </div>
            <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
              {toTermina(isEn ? "Long-Staple Noble Fibers" : "Fibres Nobles d'Exception")}
            </h4>
            <p className="font-sans text-xs text-muted font-light leading-relaxed">
              {product.metadata?.composition
                ? product.metadata.composition
                : isEn
                ? "Woven exclusively from certified long-staple combed cotton or European Flax certified French washed linen with natural softness."
                : "Coton peigné longues fibres d'Égypte (percale 300 fils ou satin 500 fils) et pur lin lavé de France certifié European Flax, au toucher incomparable."}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
            <span>{toTermina(isEn ? "Fiber Grade" : "Certification")}</span>
            <span className="font-bold text-ink">European Flax / Giza</span>
          </div>
        </div>

        {/* 3. Thermorégulation Naturelle */}
        <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                {/* Pro Icon: Dual microclimate thermal vector (breathable breeze wave) */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12h8a2 2 0 1 0-2-2" />
                  <path d="M3 17h12a2 2 0 1 0-2-2" />
                  <path d="M3 7h15a2 2 0 1 0-2-2" />
                </svg>
              </span>
              <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">03</span>
            </div>
            <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
              {toTermina(isEn ? "Active Thermoregulation" : "Thermoregulation Naturelle")}
            </h4>
            <p className="font-sans text-xs text-muted font-light leading-relaxed">
              {isEn
                ? "Highly breathable natural structure ensures a crisp, cool sensation during warm Moroccan summer nights and a cozy, enveloping warmth in winter."
                : "Pouvoir respirant élevé permettant une régulation thermique idéale : fraîcheur aérée durant les nuits d'été et chaleur douce en hiver."}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
            <span>{toTermina(isEn ? "Comfort" : "Climat")}</span>
            <span className="font-bold text-ink">{toTermina(isEn ? "All Seasons" : "4 Saisons")}</span>
          </div>
        </div>

        {/* 4. Densité & Grammage Hôtelier (600 g/m²) */}
        <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                {/* Pro Icon: Heavy weight density balance medallion */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v18M3 7l9-4 9 4M6 16l-3-6h6l-3 6zM18 16l-3-6h6l-3 6z" />
                  <circle cx="12" cy="18" r="2" />
                </svg>
              </span>
              <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">04</span>
            </div>
            <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
              {toTermina(product.metadata?.weight ? `${product.metadata.weight} g/m2 Certifie` : "Densite Superieure")}
            </h4>
            <p className="font-sans text-xs text-muted font-light leading-relaxed">
              {isEn
                ? "Ultra-plush combed cotton loops deliver immediate capillary absorption and luxurious weight for bath sheets, and fluid, crisp drape for bed sets."
                : "Boucles généreuses en coton peigné offrant une absorption instantanée pour le bain et un tombé lourd digne des plus prestigieux spas et riads."}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
            <span>{toTermina(isEn ? "Density" : "Grammage")}</span>
            <span className="font-bold text-ink">{product.metadata?.weight ? `${product.metadata.weight} g/m²` : "600 g/m²"}</span>
          </div>
        </div>

        {/* 5. Broderie & Monogramme Sur-Mesure */}
        <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                {/* Pro Icon: Haute couture needle & monogram silk stitch */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 3l-6 6M15 9l-2-2 6-6 2 2-6 6z" />
                  <path d="M13 11c-2 2-4 3-6 1s0-4 2-5 5-2 5-4-2-3-4-2-2 3-1 5" strokeDasharray="1 1.5" />
                  <circle cx="4" cy="20" r="2" />
                </svg>
              </span>
              <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">05</span>
            </div>
            <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
              {toTermina(isEn ? "Bespoke Monogram Embroidery" : "Broderie & Armoiries Riad")}
            </h4>
            <p className="font-sans text-xs text-muted font-light leading-relaxed">
              {isEn
                ? "Custom embroidery of your hotel emblem, monogram or property signature executed with precision silk threads in our Marrakech workshop."
                : "Personnalisation brodée aux armoiries, monogrammes ou emblèmes de votre Riad, boutique-hôtel ou domaine de prestige à Marrakech."}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
            <span>{toTermina(isEn ? "Finishing" : "Finition")}</span>
            <span className="font-bold text-ink">{toTermina(isEn ? "Bespoke" : "Sur-Mesure")}</span>
          </div>
        </div>

        {/* 6. Normes Écologiques & Oeko-Tex */}
        <div className="p-7 sm:p-8 border-r border-b border-ink/15 flex flex-col justify-between hover:bg-white/70 transition-colors group">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="w-11 h-11 rounded-full border border-ink/15 bg-cream/90 flex items-center justify-center text-olive group-hover:border-olive group-hover:scale-105 transition-all">
                {/* Pro Icon: Organic circular seal with pure botanical leaf */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M7 12c3-4 7-4 10 0-3 4-7 4-10 0z" />
                  <path d="M12 8v8" />
                </svg>
              </span>
              <span className="font-termina text-[10px] text-olive/60 font-bold tracking-widest">06</span>
            </div>
            <h4 className="font-termina text-xs font-bold uppercase tracking-wider text-ink mb-2">
              {toTermina(isEn ? "Oeko-Tex Standard 100" : "Teintures Saines Oeko-Tex")}
            </h4>
            <p className="font-sans text-xs text-muted font-light leading-relaxed">
              {isEn
                ? "Certified free of toxic dyes, heavy metals and harsh chemical finishes. Completely hypoallergenic and soothing on sensitive skin."
                : "Teintures éco-responsables certifiées sans métaux lourds ni substances allergènes. Confort absolu pour les peaux les plus exigeantes."}
            </p>
          </div>
          <div className="mt-6 pt-3 border-t border-ink/5 flex items-center justify-between text-[10px] font-termina text-ink/50 uppercase tracking-widest">
            <span>{toTermina(isEn ? "Health Standard" : "Sante")}</span>
            <span className="font-bold text-ink">Oeko-Tex 100</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default PDPTechnicalBadges;
