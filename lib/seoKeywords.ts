/**
 * Comprehensive SEO Keywords Master Repository for Kansotex.
 * Categorized by search intent, high-volume searches in Morocco/Marrakech,
 * competitor gaps (Textis, Balzatex, Angie Sidi Ghanem), and B2B/B2C luxury markets.
 */

// 1. Core Top-Volume Brand & Category Keywords (Morocco & International)
export const CORE_LUXURY_KEYWORDS = [
  "linge de maison haut de gamme marrakech",
  "linge de maison maroc luxe",
  "tissu ameublement marrakech",
  "maison de textile marrakech",
  "kansotex",
  "kansotex marrakech",
  "textile in and outdoor maroc",
  "confection sur mesure marrakech",
  "tissus haut de gamme maroc",
  "editeur textile marrakech",
];

// 2. Linge de Lit (Bed Linen) - Luxury Private Residences & 5-Star Riads
export const LINGE_DE_LIT_KEYWORDS = [
  "linge de lit luxe marrakech",
  "linge de lit haut de gamme maroc",
  "parure de lit satin de coton maroc",
  "housse de couette lin lave marrakech",
  "draps percale de coton marrakech",
  "parure de lit hotel 5 etoiles maroc",
  "draps pour riad marrakech",
  "taie oreiller satin de coton",
  "couette et oreiller haut de gamme marrakech",
  "drap plat grand bonnet lit maroc",
  "draps lin francais lave marrakech",
  "linge de lit brode sur mesure maroc",
];

// 3. Linge de Bain (Bath Linen) - Spas, Riads, Hotels & Luxury Homes
export const LINGE_DE_BAIN_KEYWORDS = [
  "linge de bain haut de gamme marrakech",
  "peignoir velours eponge luxe maroc",
  "serviette de bain 600g marrakech",
  "peignoir brode personnalise maroc",
  "drap de bain riad marrakech",
  "linge de bain spa marrakech",
  "peignoir col chale velours marrakech",
  "serviette invité et drap de douche luxe",
  "tapis de bain grande densite marrakech",
  "peignoir nid d abeille hotel marrakech",
];

// 4. Linge de Table (Table Linen) - Prestige Restaurants, Riads & Villas
export const LINGE_DE_TABLE_KEYWORDS = [
  "linge de table haut de gamme marrakech",
  "nappe jacquard anti taches marrakech",
  "nappe lin lave sur mesure maroc",
  "serviettes de table brodees marrakech",
  "chemin de table restaurant riad marrakech",
  "sets de table lin et cuir marrakech",
  "art de la table textile luxe maroc",
];

// 5. Tissus d'Ameublement In & Outdoor - Terrasses, Piscines, Salons
export const TISSUS_AMEUBLEMENT_KEYWORDS = [
  "tissu ameublement marrakech",
  "tissus ameublement sidi ghanem",
  "tissu outdoor deperlant marrakech",
  "toile exterieure resistant uv piscine terrasse maroc",
  "tissu canape salon moderne marrakech",
  "velours d ameublement marrakech",
  "lin d ameublement au metre maroc",
  "tissu transat et coussin exterieur marrakech",
  "vente tissu au metre marrakech",
  "tissus techniques in & outdoor",
];

// 6. Confection Sur Mesure - Rideaux, Voilages & Banquettes
export const CONFECTION_SUR_MESURE_KEYWORDS = [
  "confection rideaux sur mesure marrakech",
  "rideaux voilages grande hauteur marrakech",
  "tapissier ameublement marrakech",
  "atelier confection textile marrakech al massar",
  "pose rideaux tringles villa marrakech",
  "stores bateaux sur mesure marrakech",
  "banquette riad coussin sur mesure",
  "couture ameublement marrakech",
];

// 7. B2B Hôtellerie, Architectes & Riads (High Commercial Intent)
export const B2B_HOTELLERIE_KEYWORDS = [
  "fournisseur textile hotel marrakech",
  "grossiste linge de maison maroc",
  "grossiste linge de maison marrakech",
  "fournisseur linge riad marrakech",
  "textile pour architecte interieur marrakech",
  "equipement textile maison d hote maroc",
  "devis confection hotel riad marrakech",
  "prescripteur textile marrakech sidi ghanem",
  "linge de lit professionnel maroc",
];

// 8. Local Marrakech Geotargeted & Sidi Ghanem / Al Massar Searches
export const LOCAL_MARRAKECH_KEYWORDS = [
  "linge de maison sidi ghanem marrakech",
  "magasin tissu ameublement al massar marrakech",
  "showroom textile marrakech",
  "boutique deco sidi ghanem marrakech",
  "linge marrakech",
  "linge de maison a marrakech",
  "magasin rideaux marrakech gueliz",
  "fabricant textile marrakech",
];

// 9. English Keywords for Expats, Riad Owners & International Clients
export const ENGLISH_SEO_KEYWORDS = [
  "luxury home linen marrakech",
  "bespoke curtains marrakech",
  "high end fabrics morocco",
  "hotel bed linen supplier marrakech",
  "outdoor upholstery fabrics morocco",
  "washed linen duvet cover marrakech",
  "egyptian cotton bed sheets marrakech",
  "luxury terry bathrobes morocco",
  "riad textile supplier marrakech",
  "interior fabrics showroom marrakech",
];

/**
 * Returns a tailored, deduped array of keywords based on context
 */
export function getKeywordsForCategory(category: string, isEn: boolean = false): string[] {
  if (isEn) {
    return Array.from(new Set([...ENGLISH_SEO_KEYWORDS, "kansotex", "marrakech textile"]));
  }

  const base = [...CORE_LUXURY_KEYWORDS, ...LOCAL_MARRAKECH_KEYWORDS];

  switch (category.toLowerCase()) {
    case "lit":
    case "linge-de-lit":
      return Array.from(new Set([...LINGE_DE_LIT_KEYWORDS, ...base]));
    case "bain":
    case "linge-de-bain":
      return Array.from(new Set([...LINGE_DE_BAIN_KEYWORDS, ...base]));
    case "table":
    case "linge-de-table":
      return Array.from(new Set([...LINGE_DE_TABLE_KEYWORDS, ...base]));
    case "outdoor":
      return Array.from(new Set([...TISSUS_AMEUBLEMENT_KEYWORDS, ...base]));
    case "ameublement":
    case "indoor":
    case "tissus-haut-de-gamme":
      return Array.from(new Set([...TISSUS_AMEUBLEMENT_KEYWORDS, ...CONFECTION_SUR_MESURE_KEYWORDS, ...base]));
    case "pro":
      return Array.from(new Set([...B2B_HOTELLERIE_KEYWORDS, ...base]));
    case "home":
    default:
      return Array.from(
        new Set([
          ...CORE_LUXURY_KEYWORDS,
          ...LINGE_DE_LIT_KEYWORDS.slice(0, 4),
          ...LINGE_DE_BAIN_KEYWORDS.slice(0, 3),
          ...TISSUS_AMEUBLEMENT_KEYWORDS.slice(0, 4),
          ...B2B_HOTELLERIE_KEYWORDS.slice(0, 3),
          ...LOCAL_MARRAKECH_KEYWORDS,
        ])
      );
  }
}
