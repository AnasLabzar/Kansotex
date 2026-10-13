import React from "react";

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
  const isTableLinen = catSlug.includes("linge-de-table");

  if (isFabric) {
    return (
      <div className="mb-8 pt-6 border-t border-ink/10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[10px] font-termina uppercase tracking-widest text-ink font-bold">
            {isEn ? "Technical Performance & Certification" : "Performances Techniques & Normes In & Outdoor"}
          </h4>
          <span className="text-[9px] font-termina tracking-widest text-olive uppercase bg-olive/10 px-2 py-0.5 rounded-xs">
            {isOutdoor ? (isEn ? "Outdoor High Resistance" : "Haute Résistance Extérieure") : (isEn ? "Contract & Luxury Grade" : "Qualité Contract & Résidentiel")}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* 1. Résistance UV & Lumière */}
          <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
                <path strokeLinecap="round" strokeWidth="1.5" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41m14.14-14.14l-1.41 1.41" />
              </svg>
              <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
                {isEn ? "UV Resistance" : "Solidité UV"}
              </span>
            </div>
            <p className="text-[11px] text-muted font-sans leading-tight">
              {isEn ? "Colorfastness Grade 7/8. Sun & fade resistant." : "Indice 7/8 ISO 105. Ne décolore pas au plein soleil."}
            </p>
          </div>

          {/* 2. Déperlance & Anti-taches */}
          <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
              </svg>
              <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
                {isEn ? "Water Repellent" : "Déperlant"}
              </span>
            </div>
            <p className="text-[11px] text-muted font-sans leading-tight">
              {isEn ? "Stain & pool-water resistant coating." : "Barrière anti-taches & projections d'eau de piscine."}
            </p>
          </div>

          {/* 3. Martindale Abrasion */}
          <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
                {product.metadata?.martindale ? `Martindale ${product.metadata.martindale.toLocaleString()}` : "Martindale Intensif"}
              </span>
            </div>
            <p className="text-[11px] text-muted font-sans leading-tight">
              {isEn ? "Heavy commercial & hospitality seating grade." : "Usage intensif pour assises d'hôtels, riads et restaurants."}
            </p>
          </div>

          {/* 4. Anti-Moisissure */}
          <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
              <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
                {isEn ? "Mildew Resistant" : "Anti-Moisissure"}
              </span>
            </div>
            <p className="text-[11px] text-muted font-sans leading-tight">
              {isEn ? "Breathable & quick drying. Rot-proof outdoors." : "Fibre respirante, imputrescible en terrasse & rooftop."}
            </p>
          </div>

          {/* 5. Confection Sur-Mesure Atelier Marrakech */}
          <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879a3 3 0 11-4.242-4.242L10.757 8.757M9 12l-2-2m5 5l2 2" />
              </svg>
              <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
                {isEn ? "Bespoke Atelier" : "Atelier Marrakech"}
              </span>
            </div>
            <p className="text-[11px] text-muted font-sans leading-tight">
              {isEn ? "Custom curtain, cushion & bench tailoring." : "Confection rideaux, banquettes & coussins sur-mesure."}
            </p>
          </div>

          {/* 6. Norme Non-Feu Contract */}
          <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343a7.975 7.975 0 010 11.314z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
                {isEn ? "Fire Retardant" : "Normes ERP / M1"}
              </span>
            </div>
            <p className="text-[11px] text-muted font-sans leading-tight">
              {isEn ? "Complies with hospitality fire regulations." : "Homologation sécurité hôtellerie & ERP disponible."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Linge de Lit & Bain de Luxe
  // -------------------------------------------------------------------------
  return (
    <div className="mb-8 pt-6 border-t border-ink/10">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-[10px] font-termina uppercase tracking-widest text-ink font-bold">
          {isEn ? "Luxury Hospitality Standards & Care" : "Excellence Hôtelière & Savoir-Faire Linge"}
        </h4>
        <span className="text-[9px] font-termina tracking-widest text-olive uppercase bg-olive/10 px-2 py-0.5 rounded-xs">
          {isBedLinen
            ? (isEn ? "5-Star Riad & Suite Grade" : "Standards Palaces & Riads")
            : isBathLinen
            ? (isEn ? "Luxury Spa & Resort 600g/m²" : "Spa & Résidences 600g/m²")
            : (isEn ? "Fine Table Linen" : "Haute Table d'Hôtes")}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* 1. Résistance Blanchisserie Industrielle */}
        <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
              {isEn ? "Industrial Wash 60°-90°" : "Lavage Intensif 60°-90°"}
            </span>
          </div>
          <p className="text-[11px] text-muted font-sans leading-tight">
            {isEn
              ? "Withstands repeated industrial laundry cycles without pilling."
              : "Résiste aux blanchisseries professionnelles sans rétrécir ni pelucher."}
          </p>
        </div>

        {/* 2. Fibres d'Exception */}
        <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
              {isEn ? "Noble Fibers" : "Fibres Nobles"}
            </span>
          </div>
          <p className="text-[11px] text-muted font-sans leading-tight">
            {product.metadata?.composition
              ? product.metadata.composition
              : isEn
              ? "Long-staple combed cotton & certified European washed linen."
              : "Coton peigné longues fibres & lin lavé certifié European Flax."}
          </p>
        </div>

        {/* 3. Thermorégulateur & Douceur */}
        <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
              {isEn ? "Thermo-regulating" : "Thermorégulateur"}
            </span>
          </div>
          <p className="text-[11px] text-muted font-sans leading-tight">
            {isEn
              ? "Naturally cool in summer, cocooning in winter."
              : "Toucher frais et respirant en été, enveloppant et doux en hiver."}
          </p>
        </div>

        {/* 4. Densité & Grammage Hôtelier */}
        <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
              {product.metadata?.weight ? `${product.metadata.weight} g/m² Certifié` : "Grammage Supérieur"}
            </span>
          </div>
          <p className="text-[11px] text-muted font-sans leading-tight">
            {isEn
              ? "Heavyweight plush feel for maximum absorbency and fluid drape."
              : "Absorption ultra-rapide et tombé lourd digne des plus grands spas."}
          </p>
        </div>

        {/* 5. Personnalisation & Monogramme Riads */}
        <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
              {isEn ? "Bespoke Embroidery" : "Broderie Monogramme"}
            </span>
          </div>
          <p className="text-[11px] text-muted font-sans leading-tight">
            {isEn
              ? "Personalized crest & monogram embroidery for riads and boutique hotels."
              : "Personnalisation au nom de votre Riad, villa ou établissement sur demande."}
          </p>
        </div>

        {/* 6. Normes Écologiques & Oeko-Tex */}
        <div className="bg-white/50 border border-ink/5 p-3 rounded-xs flex flex-col gap-1.5 transition-colors hover:border-ink/20">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-ink">
              {isEn ? "Oeko-Tex Standard" : "Teintures Saines"}
            </span>
          </div>
          <p className="text-[11px] text-muted font-sans leading-tight">
            {isEn
              ? "Hypoallergenic, free from harmful chemicals. Safe for sensitive skin."
              : "Colorants hypoallergéniques sans métaux lourds. Respectueux de la peau."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PDPTechnicalBadges;
