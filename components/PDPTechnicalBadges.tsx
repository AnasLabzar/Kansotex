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

  if (isFabric) {
    return (
      <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-ink/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-[9px] font-termina tracking-[0.3em] uppercase text-olive font-bold block mb-1">
              {toTermina(isEn ? "Hospitality & Outdoor Specifications" : "Cahier des Charges & Normes")}
            </span>
            <h3 className="font-termina uppercase text-xl sm:text-2xl font-bold text-ink tracking-wide">
              {toTermina(isEn ? "Technical Performance & Certification" : "Performances Techniques & Normes In & Outdoor")}
            </h3>
          </div>
          <span className="text-[9px] font-termina tracking-widest text-olive uppercase bg-olive/10 px-3 py-1 rounded-xs border border-olive/20 self-start sm:self-end">
            {toTermina(isOutdoor ? (isEn ? "Outdoor High Resistance" : "Haute Resistance Exterieure") : (isEn ? "Contract & Luxury Grade" : "Qualite Contract & Residentiel"))}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. Solidité UV & Lumière */}
          <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
                  <path strokeLinecap="round" strokeWidth="1.5" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" />
                </svg>
              </span>
              <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
                {toTermina(isEn ? "UV Resistance (Grade 7/8)" : "Solidite UV & Plein Soleil")}
              </span>
            </div>
            <p className="text-xs text-muted font-sans font-light leading-relaxed">
              {isEn ? "ISO 105-B02 colorfastness rating 7/8. Sun and fade resistant even under intense Moroccan sunlight." : "Norme ISO 105-B02 indice 7/8. Garanti grand teint, ne décolore pas face au soleil zénithal de Marrakech."}
            </p>
          </div>

          {/* 2. Déperlance & Anti-taches */}
          <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
                </svg>
              </span>
              <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
                {toTermina(isEn ? "Water & Stain Repellent" : "Deperlance & Anti-Taches")}
              </span>
            </div>
            <p className="text-xs text-muted font-sans font-light leading-relaxed">
              {isEn ? "Hydrophobic fluorocarbon shield protects against pool water splashes, rain, wine, and tea stains." : "Traitement hydrophobe haute efficacité contre les éclaboussures de piscine, pluies battantes, boissons et graisses."}
            </p>
          </div>

          {/* 3. Martindale Abrasion */}
          <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
                {toTermina(product.metadata?.martindale ? `Martindale ${product.metadata.martindale.toLocaleString()} Tours` : "Martindale Intensif")}
              </span>
            </div>
            <p className="text-xs text-muted font-sans font-light leading-relaxed">
              {isEn ? "Heavy commercial contract seating grade designed for high-traffic hotels, restaurants and riad courtyards." : "Usage contract intensif sans boulochage pour assises d'hôtels, restaurants, salons de riad et terrasses."}
            </p>
          </div>

          {/* 4. Anti-Moisissure & Respirabilité */}
          <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </span>
              <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
                {toTermina(isEn ? "Mildew Resistant & Rot-Proof" : "Anti-Moisissures & Imputrescible")}
              </span>
            </div>
            <p className="text-xs text-muted font-sans font-light leading-relaxed">
              {isEn ? "Breathable construction prevents condensation, mold growth, and odor buildup on outdoor furniture." : "Fibre respirante à séchage ultra-rapide évitant le développement de moisissures sur les mousses et banquettes."}
            </p>
          </div>

          {/* 5. Norme Non-Feu M1 / Contract */}
          <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343a7.975 7.975 0 010 11.314z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
                {toTermina(isEn ? "Contract Non-Feu M1 / BS5852" : "Normes Non-Feu M1 / ERP")}
              </span>
            </div>
            <p className="text-xs text-muted font-sans font-light leading-relaxed">
              {isEn ? "Flame-retardant contract certification available on request for public hospitality establishments (ERP)." : "Certifications ignifuges conformes aux exigences de sécurité des établissements recevant du public."}
            </p>
          </div>

          {/* 6. Confection Sur-Mesure Atelier Marrakech */}
          <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L10.757 8.757M9 12l-2-2m5 5l2 2" />
                </svg>
              </span>
              <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
                {toTermina(isEn ? "Marrakech Bespoke Tailoring" : "Confection Sur-Mesure Marrakech")}
              </span>
            </div>
            <p className="text-xs text-muted font-sans font-light leading-relaxed">
              {isEn ? "Handcrafted curtains, roman blinds, daybeds and decorative cushions cut and sewn in our local workshop." : "Façonnage sur mesure dans notre manufacture à Marrakech : rideaux, stores bateaux, coussins et banquettes d'extérieur."}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // -------------------------------------------------------------------------
  // Linge de Lit & Bain de Luxe
  // -------------------------------------------------------------------------
  return (
    <section className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-ink/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <span className="text-[9px] font-termina tracking-[0.3em] uppercase text-olive font-bold block mb-1">
            {toTermina(isEn ? "Hospitality Excellence Standards" : "Standards Hôteliers 5 Étoiles")}
          </span>
          <h3 className="font-termina uppercase text-xl sm:text-2xl font-bold text-ink tracking-wide">
            {toTermina(isEn ? "Luxury Hospitality Standards & Care" : "Excellence Hôtelière & Savoir-Faire Linge")}
          </h3>
        </div>
        <span className="text-[9px] font-termina tracking-widest text-olive uppercase bg-olive/10 px-3 py-1 rounded-xs border border-olive/20 self-start sm:self-end">
          {toTermina(
            isBedLinen
              ? (isEn ? "5-Star Riad & Suite Grade" : "Standards Palaces & Riads")
              : isBathLinen
              ? (isEn ? "Luxury Spa & Resort 600g/m2" : "Spa & Residences 600g/m2")
              : (isEn ? "Fine Table Linen" : "Haute Table d'Hôtes")
          )}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Résistance Blanchisserie Industrielle */}
        <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
            <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
              {toTermina(isEn ? "Industrial Laundry 60-90C" : "Lavage Intensif 60-90 C")}
            </span>
          </div>
          <p className="text-xs text-muted font-sans font-light leading-relaxed">
            {isEn
              ? "Withstands repeated industrial laundry cycles without pilling, loss of softness or seam distortion."
              : "Conçu pour résister aux blanchisseries professionnelles et lavages fréquents sans rétrécir ni pelucher."}
          </p>
        </div>

        {/* 2. Fibres Nobles d'Exception */}
        <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </span>
            <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
              {toTermina(isEn ? "Certified Noble Fibers" : "Fibres Nobles Certifiees")}
            </span>
          </div>
          <p className="text-xs text-muted font-sans font-light leading-relaxed">
            {product.metadata?.composition
              ? product.metadata.composition
              : isEn
              ? "Long-staple combed Egyptian cotton or European Flax certified French washed linen."
              : "Coton peigné longues fibres d'Égypte ou pur lin lavé certifié European Flax, au toucher d'exception."}
          </p>
        </div>

        {/* 3. Thermorégulateur & Douceur */}
        <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
              {toTermina(isEn ? "Natural Thermoregulation" : "Thermoregulation Naturelle")}
            </span>
          </div>
          <p className="text-xs text-muted font-sans font-light leading-relaxed">
            {isEn
              ? "Naturally breathable structure regulates temperature, ensuring fresh summer nights and cozy winter sleep."
              : "Fibre active hautement respirante : sensation de fraîcheur en été marocain et chaleur enveloppante en hiver."}
          </p>
        </div>

        {/* 4. Densité & Grammage Hôtelier */}
        <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </span>
            <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
              {toTermina(product.metadata?.weight ? `${product.metadata.weight} g/m2 Certifie` : "Densite Superieure")}
            </span>
          </div>
          <p className="text-xs text-muted font-sans font-light leading-relaxed">
            {isEn
              ? "Generous weight ensures maximum water absorption for bath linen and a crisp, opulent drape for bed linen."
              : "Grammage généreux garantissant une absorption maximale pour le bain et un tombé impeccable pour les lits."}
          </p>
        </div>

        {/* 5. Personnalisation & Monogramme Riads */}
        <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </span>
            <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
              {toTermina(isEn ? "Bespoke Monogram Embroidery" : "Broderie & Monogramme Riad")}
            </span>
          </div>
          <p className="text-xs text-muted font-sans font-light leading-relaxed">
            {isEn
              ? "Custom embroidery of your hotel emblem, monogram or riad signature handcrafted directly in Marrakech."
              : "Service de broderie personnalisée aux armoiries ou initiales de votre riad, hôtel ou villa de prestige."}
          </p>
        </div>

        {/* 6. Normes Écologiques & Oeko-Tex */}
        <div className="bg-white/60 border border-ink/10 p-5 rounded-xs flex flex-col gap-2 hover:border-ink/30 transition-all shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-full bg-olive/10 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <span className="text-[10px] font-termina font-bold uppercase tracking-wider text-ink">
              {toTermina(isEn ? "Oeko-Tex Standard 100" : "Teintures Saines Oeko-Tex")}
            </span>
          </div>
          <p className="text-xs text-muted font-sans font-light leading-relaxed">
            {isEn
              ? "Dyes and finishing processes certified hypoallergenic and free of heavy metals or harmful irritants."
              : "Colorants hypoallergéniques certifiés sans substances nocives, garantissant un respect absolu de la peau."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PDPTechnicalBadges;
