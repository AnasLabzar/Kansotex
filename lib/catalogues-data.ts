export interface AudienceSegment {
  id: string;
  nameFr: string;
  nameEn: string;
  subtitleFr: string;
  subtitleEn: string;
  descriptionFr: string;
  descriptionEn: string;
  badgeFr: string;
  badgeEn: string;
  perksFr: string[];
  perksEn: string[];
}

export interface VolumeTier {
  minQty: number;
  discountPercent: number;
  labelFr: string;
  labelEn: string;
}

export interface ConfigOption {
  id: string;
  labelFr: string;
  labelEn: string;
  priceModifierEur: number;
  badge?: string;
  hex?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  roleFr: string;
  roleEn: string;
  location: string;
  rating: number;
  date: string;
  titleFr: string;
  titleEn: string;
  commentFr: string;
  commentEn: string;
  verified: boolean;
}

export interface TechnicalSpec {
  labelFr: string;
  labelEn: string;
  valueFr: string;
  valueEn: string;
  detailFr?: string;
  detailEn?: string;
}

export interface CatalogueProductSummary {
  id: string;
  slug: string;
  nameFr: string;
  nameEn: string;
  descriptionFr: string;
  descriptionEn: string;
  basePriceEur: number; // In EUR, converted via CurrencyContext
  image: string;
  categorySlug: string;
  tagFr?: string;
  tagEn?: string;
  composition: string;
  weightGsm?: number;
}

export interface CatalogueDefinition {
  slug: string;
  heroKickerFr: string;
  heroKickerEn: string;
  titleFr: string;
  titleEn: string;
  headlineFr: string;
  headlineEn: string;
  subtitleFr: string;
  subtitleEn: string;
  posterImage: string;
  heroBgImage: string;
  accentColor: string; // for UI badge glow
  partnerLogos?: string[];
  badgesFr: { icon: string; title: string; subtitle: string }[];
  badgesEn: { icon: string; title: string; subtitle: string }[];
  
  // Segment Switcher (e.g. Airbnb / Riads / Hôtels / Conciergeries)
  segments?: AudienceSegment[];
  
  // Star Configurator Pack
  starPack: {
    id: string;
    slug: string;
    titleFr: string;
    titleEn: string;
    kickerFr: string;
    kickerEn: string;
    descriptionFr: string;
    descriptionEn: string;
    basePriceEur: number;
    image: string;
    itemsIncludedFr: string[];
    itemsIncludedEn: string[];
    dimensionOptions: ConfigOption[];
    finishOrWeaveOptions?: ConfigOption[];
    colorOptions?: ConfigOption[];
    warmthOptions?: ConfigOption[];
    volumeTiers: VolumeTier[];
    specs: TechnicalSpec[];
  };

  // Dedicated Products in this catalog
  featuredProducts: CatalogueProductSummary[];

  // Social Proof & Reviews
  reviewsTitleFr: string;
  reviewsTitleEn: string;
  reviewsSubtitleFr: string;
  reviewsSubtitleEn: string;
  averageRating: number;
  totalReviews: number;
  reviews: ReviewItem[];

  // Guarantees & Logistic perks
  deliveryPromiseFr: string;
  deliveryPromiseEn: string;
  washInstructionFr: string;
  washInstructionEn: string;
  b2bPerksFr: string[];
  b2bPerksEn: string[];

  // SEO metadata
  seoCategory: string;
  metaTitleFr: string;
  metaTitleEn: string;
  metaDescFr: string;
  metaDescEn: string;
  keywords: string[];
}

export const CATALOGUES_LIST: CatalogueDefinition[] = [
  // =========================================================================
  // 1. LINGE HÔTELIER — RIADS, HÔTELS & AIRBNB
  // =========================================================================
  {
    slug: "linge-hotelier",
    heroKickerFr: "Kansotex Hospitality",
    heroKickerEn: "Kansotex Hospitality",
    titleFr: "Linge Hôtelier",
    titleEn: "Hotel Bed Linen",
    headlineFr: "Pour Riads, Hôtels & Propriétaires Airbnb",
    headlineEn: "For Riads, Hotels & Airbnb Hosts",
    subtitleFr: "L'élégance hôtelière 5 étoiles conçue pour un entretien intensif, une rotation rapide et le confort absolu de vos voyageurs.",
    subtitleEn: "5-star hospitality elegance engineered for intensive laundry, rapid turnover and the ultimate guest comfort.",
    posterImage: "/catalogues/linge-hotelier-post.jpg",
    heroBgImage: "/gallery/bedroom_lifestyle_1791052936092.jpg",
    accentColor: "#C26D43", // Warm terracotta hôtelier
    partnerLogos: ["Airbnb Superhost", "Booking.com Partner", "Expedia Group"],
    badgesFr: [
      { icon: "cotton", title: "100% Coton", subtitle: "Naturel & hautement respirant" },
      { icon: "feather", title: "Ultra Soft", subtitle: "Toucher soyeux hôtelier 5★" },
      { icon: "sun-snow", title: "Toutes Saisons", subtitle: "Frais en été, douillet en hiver" },
      { icon: "wash", title: "Lavage 90°C", subtitle: "Tenue prouvée au chlore & calandre" },
    ],
    badgesEn: [
      { icon: "cotton", title: "100% Cotton", subtitle: "Pure natural & highly breathable" },
      { icon: "feather", title: "Ultra Soft", subtitle: "5★ hotel grade velvety touch" },
      { icon: "sun-snow", title: "All Seasons", subtitle: "Cool in summer, cozy in winter" },
      { icon: "wash", title: "90°C Wash", subtitle: "Bleach & heavy mangle certified" },
    ],
    segments: [
      {
        id: "airbnb",
        nameFr: "AIRBNB",
        nameEn: "AIRBNB",
        subtitleFr: "Studios, Appartements & Villas de Vacances",
        subtitleEn: "Studios, Apartments & Holiday Villas",
        descriptionFr: "Packs optimisés pour les rotations express entre voyageurs. Repassage ultra-facile, résistance aux taches et tombé net qui sublime les photos d'annonce.",
        descriptionEn: "Optimized packs for rapid guest turnarounds. Easy-iron, stain-resistant and crisp drape that elevates listing photos.",
        badgeFr: "Spécial Superhost",
        badgeEn: "Superhost Choice",
        perksFr: [
          "Séchage 30% plus rapide pour rotations courtes",
          "Drap housse grand bonnet 30cm adapté aux surmatelas",
          "Finitions solides anti-déchirure aux coutures",
          "Garantie note 5★ Confort Literie",
        ],
        perksEn: [
          "30% faster drying for fast check-in turnover",
          "Deep 30cm fitted corners fitting pillow-top mattresses",
          "Reinforced seam stitching resisting heavy tension",
          "5★ Bedding Comfort Guest rating guarantee",
        ],
      },
      {
        id: "riads",
        nameFr: "RIADS",
        nameEn: "RIADS",
        subtitleFr: "Maisons d'Hôtes & Patios Médina",
        subtitleEn: "Boutique Guest Houses & Medina Patios",
        descriptionFr: "Le mariage du confort contemporain et du charme marocain. Coton peigné pur blanc cassé ou blanc optique, option broderie personnalisée au nom de votre Dar.",
        descriptionEn: "The union of contemporary comfort and Moroccan heritage. Pure combed cotton in off-white or optic white, custom Dar embroidery available.",
        badgeFr: "Authenticité Riad",
        badgeEn: "Riad Heritage",
        perksFr: [
          "Tombé fluide adapté aux lits à baldaquin et estrades",
          "Broderie artisanale personnalisée sur devis",
          "Teintes douces en harmonie avec le zellige et tadelakt",
          "Livraison directe dans la Médina de Marrakech",
        ],
        perksEn: [
          "Fluid drape fitting canopy beds and Moroccan alcoves",
          "Bespoke artisan embroidery on quote request",
          "Subtle hues matching zellige and tadelakt walls",
          "Direct delivery inside Marrakech Medina",
        ],
      },
      {
        id: "hotels",
        nameFr: "HÔTELS",
        nameEn: "HOTELS",
        subtitleFr: "Hôtels 4 & 5 Étoiles & Resorts",
        subtitleEn: "4 & 5 Star Hotels & Luxury Resorts",
        descriptionFr: "Confection conforme aux cahiers des charges hôteliers internationaux les plus stricts. Blanchiment chlore toléré, fils retors et étiquetage dimensionnel.",
        descriptionEn: "Tailored to international luxury hotel specifications. Chlorine tolerant, two-ply twisted yarns and color-coded size labeling.",
        badgeFr: "Standard Palace",
        badgeEn: "Palace Standard",
        perksFr: [
          "Résistance aux tunnels de lavage et calandres industrielles",
          "Fermeture housse sac hôtelier avec passe-mains pratiques",
          "Codes couleur d'ourlet pour identification express par le housekeeping",
          "Approvisionnement continu et réassort garanti sous 48h",
        ],
        perksEn: [
          "Tested against industrial continuous wash tunnels & mangles",
          "Hospitality envelope closure with ergonomic hand slits",
          "Color-coded hem threads for quick housekeeping sorting",
          "Guaranteed continuous restocking within 48 hours",
        ],
      },
      {
        id: "conciergeries",
        nameFr: "CONCIERGERIES",
        nameEn: "CONCIERGE",
        subtitleFr: "Gestionnaires Multi-Logements",
        subtitleEn: "Multi-Property Property Managers",
        descriptionFr: "Solutions de flotte pour parcs de 5 à 100+ logements. Tarifs dégressifs B2B, packaging individuel par logement et commande récurrente automatisée.",
        descriptionEn: "Fleet linen solutions for portfolios of 5 to 100+ properties. Tiered B2B pricing, sealed pack per unit and automated replenishment.",
        badgeFr: "Flotte Pro",
        badgeEn: "Fleet Pro",
        perksFr: [
          "Tarif dégressif immédiat jusqu'à -25% par palier",
          "Packs hermétiques prêts à poser sur lit pour femmes de chambre",
          "Facturation centralisée société avec TVA déductible",
          "Support WhatsApp dédié avec interlocuteur dédié 7j/7",
        ],
        perksEn: [
          "Direct volume discount up to -25% across tiers",
          "Sealed ready-to-make bed packs for cleaning crews",
          "Consolidated corporate invoicing with tax deductible VAT",
          "Dedicated 7/7 WhatsApp concierge manager",
        ],
      },
    ],
    starPack: {
      id: "pack-linge-de-lit-hotelier",
      slug: "pack-linge-de-lit-hotelier",
      titleFr: "PACK LINGE DE LIT HÔTELIER",
      titleEn: "HOTEL BED LINEN PACK",
      kickerFr: "Ensemble Complet 4 Pièces",
      kickerEn: "Complete 4-Piece Suite Set",
      descriptionFr: "La référence de l'hôtellerie marocaine. L'ensemble complet comprend 2 taies d'oreiller finition portefeuille, 1 housse de couette avec passe-mains, 1 drap plat bordé point bourdon et 1 drap housse bonnet 30cm.",
      descriptionEn: "The benchmark of Moroccan hospitality. The complete set includes 2 envelope pillowcases, 1 duvet cover with hand-slits, 1 bourdon-stitch flat sheet and 1 deep 30cm fitted sheet.",
      basePriceEur: 125.0, // base price for 160x200 (approx 1350 MAD)
      image: "/gallery/bed_set_percale_1791048617304.jpg",
      itemsIncludedFr: [
        "2 Taies d'oreiller (50×70 cm ou 65×65 cm) avec rabat intérieur 20cm",
        "1 Housse de couette avec fentes passe-mains pour un enfilage éclair",
        "1 Drap plat grand débord avec finition point bourdon raffiné",
        "1 Drap housse bonnet extra-large 30cm tout élastiqué",
      ],
      itemsIncludedEn: [
        "2 Pillowcases (50×70 cm or 65×65 cm) with 20cm envelope flap",
        "1 Duvet cover with ergonomic hand-slits for lightning-fast changing",
        "1 Flat sheet with generous drop and refined bourdon embroidered hem",
        "1 Deep 30cm fitted sheet with reinforced all-around elastic band",
      ],
      dimensionOptions: [
        { id: "dim-90-200", labelFr: "90 × 200 CM (Lit Simple / Twin)", labelEn: "90 × 200 CM (Single / Twin)", priceModifierEur: -40.0, badge: "Twin" },
        { id: "dim-160-200", labelFr: "160 × 200 CM (Queen Size)", labelEn: "160 × 200 CM (Queen Size)", priceModifierEur: 0.0, badge: "Standard" },
        { id: "dim-180-200", labelFr: "180 × 200 CM (King Size)", labelEn: "180 × 200 CM (King Size)", priceModifierEur: 18.0, badge: "Populaire" },
        { id: "dim-200-200", labelFr: "200 × 200 CM (Super King / Suite)", labelEn: "200 × 200 CM (Super King)", priceModifierEur: 36.0, badge: "Master" },
      ],
      finishOrWeaveOptions: [
        { id: "weave-percale-200", labelFr: "Percale de Coton 200 Fils (Frais & Léger)", labelEn: "Cotton Percale 200 TC (Crisp & Cool)", priceModifierEur: -15.0 },
        { id: "weave-percale-300", labelFr: "Percale Signature 300 Fils (Recommandé Hôtels 5★)", labelEn: "Signature Percale 300 TC (5★ Hotel Standard)", priceModifierEur: 0.0, badge: "Recommandé" },
        { id: "weave-satin-400", labelFr: "Satin de Coton Peigné 400 Fils (Toucher Soyeux Palace)", labelEn: "Combed Sateen 400 TC (Palace Silky Touch)", priceModifierEur: 25.0, badge: "Luxe" },
      ],
      colorOptions: [
        { id: "col-blanc-pur", labelFr: "Blanc Hôtelier Optique", labelEn: "Optic Hotel White", priceModifierEur: 0, hex: "#FFFFFF" },
        { id: "col-ivoire", labelFr: "Ivoire Chaud / Écru", labelEn: "Warm Ivory / Ecru", priceModifierEur: 0, hex: "#F7F4EA" },
        { id: "col-sable", labelFr: "Sable d'Agafay", labelEn: "Agafay Desert Sand", priceModifierEur: 5.0, hex: "#E4D9C7" },
        { id: "col-terracotta", labelFr: "Terre Cuite Médina", labelEn: "Medina Terracotta", priceModifierEur: 8.0, hex: "#C56D56" },
      ],
      volumeTiers: [
        { minQty: 1, discountPercent: 0, labelFr: "1 à 4 packs", labelEn: "1 to 4 packs" },
        { minQty: 5, discountPercent: 10, labelFr: "5 à 9 packs (Remise -10%)", labelEn: "5 to 9 packs (-10% off)" },
        { minQty: 10, discountPercent: 18, labelFr: "10 à 24 packs (Remise Hôtelière -18%)", labelEn: "10 to 24 packs (-18% off)" },
        { minQty: 25, discountPercent: 25, labelFr: "25+ packs (Grand Compte -25%)", labelEn: "25+ packs (-25% off)" },
      ],
      specs: [
        { labelFr: "Matière", labelEn: "Material", valueFr: "100% Coton peigné longues fibres", valueEn: "100% Long-staple combed cotton" },
        { labelFr: "Densité Tissage", labelEn: "Thread Count", valueFr: "200 à 400 fils/inch² (selon finition)", valueEn: "200 to 400 TC (depending on weave)" },
        { labelFr: "Lavage & Entretien", labelEn: "Laundry Care", valueFr: "Lavage jusqu'à 90°C (blanc), séchage tambour autorisé", valueEn: "Machine wash up to 90°C (white), tumble dry safe" },
        { labelFr: "Blanchiment", labelEn: "Bleaching", valueFr: "Résistant aux agents chlorés et oxygénés", valueEn: "Chlorine and oxygen bleach resistant" },
        { labelFr: "Stabilité Dimensionnelle", labelEn: "Shrinkage", valueFr: "Retrait contrôlé < 3% au 5ème lavage", valueEn: "Controlled shrinkage < 3% after 5 washes" },
        { labelFr: "Origine & Confection", labelEn: "Manufacture", valueFr: "Ateliers Kansotex Marrakech", valueEn: "Kansotex Marrakech Workshops" },
      ],
    },
    featuredProducts: [
      {
        id: "prod-1",
        slug: "parure-percale-blanc",
        nameFr: "Parure de Lit Percale Signature",
        nameEn: "Signature Percale Bed Set",
        descriptionFr: "La quintessence du lit d'hôtel frais et net. Percale 300 fils douce et respirante.",
        descriptionEn: "The quintessence of crisp hotel bedding. Soft and breathable 300 TC percale.",
        basePriceEur: 145.0,
        image: "/gallery/bed_set_percale_1791048617304.jpg",
        categorySlug: "linge-de-lit",
        tagFr: "Best-Seller",
        tagEn: "Best Seller",
        composition: "100% Coton Percale 300 Fils",
        weightGsm: 130,
      },
      {
        id: "prod-2",
        slug: "parure-satin-champagne",
        nameFr: "Parure de Lit Satin de Coton",
        nameEn: "Sateen Bedding Set",
        descriptionFr: "Toucher soyeux et reflet subtil pour les suites royales et riads de charme.",
        descriptionEn: "Silky touch and subtle sheen for royal suites and luxury riads.",
        basePriceEur: 195.0,
        image: "/gallery/bed_set_satin_1791048686563.jpg",
        categorySlug: "linge-de-lit",
        tagFr: "Palace",
        tagEn: "Palace",
        composition: "100% Satin de Coton 500 Fils",
        weightGsm: 140,
      },
      {
        id: "prod-3",
        slug: "housse-couette-lin-lave",
        nameFr: "Housse de Couette Lin Lavé",
        nameEn: "Washed Linen Duvet Cover",
        descriptionFr: "Le chic décontracté intemporel pour villas méditerranéennes et suites bohèmes.",
        descriptionEn: "Timeless relaxed chic for Mediterranean villas and bohemian suites.",
        basePriceEur: 220.0,
        image: "/gallery/duvet_cover_linen_1791048696631.jpg",
        categorySlug: "linge-de-lit",
        tagFr: "Naturel",
        tagEn: "Natural",
        composition: "100% Lin Français Lavé",
        weightGsm: 165,
      },
      {
        id: "prod-4",
        slug: "jete-de-lit-texture",
        nameFr: "Jeté de Lit Coton Texturé",
        nameEn: "Textured Cotton Bed Throw",
        descriptionFr: "La touche finale texturée tissée à la main pour le pied de lit.",
        descriptionEn: "The hand-woven textured final touch for the foot of the bed.",
        basePriceEur: 85.0,
        image: "/gallery/bed_throw_textured_1791048657945.jpg",
        categorySlug: "linge-de-lit",
        tagFr: "Artisanal",
        tagEn: "Handcrafted",
        composition: "100% Coton Naturel",
        weightGsm: 450,
      },
    ],
    reviewsTitleFr: "Adopté par les Meilleurs Établissements",
    reviewsTitleEn: "Chosen by Morocco's Finest Stays",
    reviewsSubtitleFr: "Plus de 450 riads, conciergeries et hôtels équipés à travers le Maroc.",
    reviewsSubtitleEn: "Over 450 riads, concierge fleets and hotels equipped across Morocco.",
    averageRating: 4.95,
    totalReviews: 218,
    reviews: [
      {
        id: "rev-1",
        author: "Karim B.",
        roleFr: "Directeur d'Exploitation",
        roleEn: "Operations Director",
        location: "Riad & Spa Dar Zohra, Médina Marrakech",
        rating: 5,
        date: "Il y a 2 semaines",
        titleFr: "Une résistance impressionnante aux lavages",
        titleEn: "Impressive wash resistance",
        commentFr: "Nous avons équipé nos 14 chambres avec le Pack Percale 300 fils. Après 40 cycles en blanchisserie industrielle, le blanc reste éclatant et la matière garde son craquant d'origine. Les clients complimentent la literie systématiquement.",
        commentEn: "We outfitted our 14 rooms with the 300 TC Percale Pack. After 40 industrial wash cycles, the white remains radiant and the fabric preserves its crisp feel. Guests compliment the bed every morning.",
        verified: true,
      },
      {
        id: "rev-2",
        author: "Sarah L.",
        roleFr: "Superhost Airbnb (12 Appartements)",
        roleEn: "Airbnb Superhost (12 Units)",
        location: "Guéliz & Hivernage, Marrakech",
        rating: 5,
        date: "Il y a 3 semaines",
        titleFr: "Le secret de mes notes 5 étoiles en literie",
        titleEn: "The secret to my 5-star comfort ratings",
        commentFr: "Mes équipes de ménage adorent les passe-mains qui font gagner 10 minutes par lit. Les draps housses tiennent parfaitement sur les matelas épais. Rapport qualité-prix imbattable avec la remise de volume.",
        commentEn: "My cleaning crews love the hand slits which save 10 minutes per bed. The fitted sheets stay snug on thick mattresses. Unbeatable value with the tiered volume discount.",
        verified: true,
      },
      {
        id: "rev-3",
        author: "Alexandre D.",
        roleFr: "Gérant Conciergerie Privée",
        roleEn: "Private Concierge Owner",
        location: "Casablanca & Taghazout",
        rating: 5,
        date: "Il y a 1 mois",
        titleFr: "Logistique et livraison irréprochables",
        titleEn: "Flawless logistics & fast delivery",
        commentFr: "Livraison reçue sous 48h à Casablanca. Les packs sont emballés sous film individuel, un vrai gain de temps logistique pour notre stockage en réserve.",
        commentEn: "Delivery received within 48h in Casablanca. The sets are sealed individually, a tremendous logistical asset for our stockroom.",
        verified: true,
      },
    ],
    deliveryPromiseFr: "Livraison partout au Maroc (24h - 72h selon votre ville)",
    deliveryPromiseEn: "Express delivery across Morocco (24h - 72h depending on your city)",
    washInstructionFr: "Conçu pour blanchisserie industrielle, résistant jusqu'à 90°C et repassage calandre",
    washInstructionEn: "Engineered for industrial laundry, resistant up to 90°C and heavy iron mangle",
    b2bPerksFr: [
      "Tarifs dégressifs immédiats à partir de 5 packs",
      "Facturation pro avec TVA déductible pour les entreprises",
      "Échantillons de tissu envoyés sur simple demande",
      "Devis personnalisé immédiat sur WhatsApp",
    ],
    b2bPerksEn: [
      "Immediate tiered discounts starting from 5 sets",
      "Corporate invoicing with tax deductible VAT",
      "Fabric sample swatches delivered upon request",
      "Instant tailored quote on WhatsApp",
    ],
    seoCategory: "lit",
    metaTitleFr: "Linge Hôtelier pour Riads, Hôtels & Airbnb | Kansotex Maroc",
    metaTitleEn: "Hotel Bed Linen for Riads, Hotels & Airbnb | Kansotex Morocco",
    metaDescFr: "Équipez vos riads, hôtels et appartements Airbnb avec nos packs de linge de lit hôtelier 100% coton. Percale 300 fils, satin 400 fils. Livraison partout au Maroc sous 24-72h.",
    metaDescEn: "Equip your riads, hotels and Airbnb properties with our 100% cotton hotel bed linen packs. 300 TC percale, 400 TC sateen. Fast delivery across Morocco in 24-72h.",
    keywords: [
      "linge hotelier maroc",
      "pack linge de lit riad marrakech",
      "fournisseur linge airbnb maroc",
      "grossiste linge de lit hotel marrakech",
      "parure de lit hotel 5 etoiles",
      "drap housse grand bonnet marrakech",
      "linge de lit conciergerie maroc",
    ],
  },

  // =========================================================================
  // 2. L'HIVER ARRIVE... COUETTES & CONFORT ANTI-ACARIENS
  // =========================================================================
  {
    slug: "collection-hiver",
    heroKickerFr: "Kansotex Warmth Edition",
    heroKickerEn: "Kansotex Warmth Edition",
    titleFr: "L'Hiver Arrive...",
    titleEn: "Winter is Coming...",
    headlineFr: "et ça se voit dans nos avis client !",
    headlineEn: "and it shows in our customer reviews!",
    subtitleFr: "Une couette 100% confort, traitée anti-acariens pour passer un hiver bien au chaud avec la douceur incomparable des nuits d'Atlas.",
    subtitleEn: "100% comfort duvet, anti-dust mite treated for cozy warm winter nights with the incomparable softness of Atlas evenings.",
    posterImage: "/catalogues/collection-hiver-post.jpg",
    heroBgImage: "/gallery/duvet_cover_linen_1791048696631.jpg",
    accentColor: "#65727A", // Winter frosty mist
    badgesFr: [
      { icon: "cotton", title: "100% Coton", subtitle: "Enveloppe percale anti-fuite duvet" },
      { icon: "feather", title: "Ultra Soft", subtitle: "Gonflant aérien effet duvet d'oie" },
      { icon: "shield", title: "Anti-Acariens", subtitle: "Traitement certifié SANITIZED®" },
      { icon: "flame", title: "Thermorégulation", subtitle: "Chaleur saine sans sudation" },
    ],
    badgesEn: [
      { icon: "cotton", title: "100% Cotton", subtitle: "High-density leak-proof percale shell" },
      { icon: "feather", title: "Ultra Soft", subtitle: "Airy loft with goose down feel" },
      { icon: "shield", title: "Anti-Dust Mite", subtitle: "Certified SANITIZED® treatment" },
      { icon: "flame", title: "Thermoregulation", subtitle: "Healthy warmth with zero moisture" },
    ],
    starPack: {
      id: "couette-hiver-anti-acariens",
      slug: "couette-hiver-anti-acariens",
      titleFr: "COUETTE HÔTELIÈRE HIVER GRAND CONFORT",
      titleEn: "GRAND COMFORT HOTEL WINTER DUVET",
      kickerFr: "Traitée Anti-Acariens & Hypoallergénique",
      kickerEn: "Anti-Dust Mite & Hypoallergenic Treated",
      descriptionFr: "Le cocon thermique idéal pour les nuits fraîches. Son piquage carreaux cloisonnés maintient le garnissage parfaitement réparti. L'enveloppe en pur coton peigné 91 fils/cm² respire et évite toute condensation.",
      descriptionEn: "The ideal thermal cocoon for cool nights. Its baffle-box quilted stitching keeps filling evenly spread with zero cold spots. Pure combed cotton shell breathes naturally.",
      basePriceEur: 119.0, // base price 240x220 (approx 1290 MAD)
      image: "/gallery/duvet_cover_linen_1791048696631.jpg",
      itemsIncludedFr: [
        "1 Couette Hôtelière Haute Chaleur avec piquage carreaux cloisonnés",
        "Enveloppe 100% Percale de Coton naturelle anti-allergique",
        "Garnissage fibres creuses siliconées ultra-gonflantes 400g/m²",
        "Housse de rangement zippée en tissu respirant offerte",
      ],
      itemsIncludedEn: [
        "1 High-Warmth Hotel Duvet with baffle-box quilted structure",
        "100% Natural hypo-allergenic Cotton Percale casing",
        "Ultra-loft siliconized hollow fiber filling 400g/m²",
        "Complimentary breathable zippered storage travel bag",
      ],
      dimensionOptions: [
        { id: "dim-couette-140-200", labelFr: "140 × 200 CM (Lit Simple 90)", labelEn: "140 × 200 CM (Single Bed)", priceModifierEur: -39.0, badge: "Lit 90" },
        { id: "dim-couette-200-200", labelFr: "200 × 200 CM (Lit Standard 140)", labelEn: "200 × 200 CM (Standard Bed 140)", priceModifierEur: -19.0, badge: "Lit 140" },
        { id: "dim-couette-240-220", labelFr: "240 × 220 CM (Lit Queen 160)", labelEn: "240 × 220 CM (Queen Bed 160)", priceModifierEur: 0.0, badge: "Populaire" },
        { id: "dim-couette-260-240", labelFr: "260 × 240 CM (Lit King 180 / 200)", labelEn: "260 × 240 CM (King Bed 180 / 200)", priceModifierEur: 27.0, badge: "King Size" },
      ],
      warmthOptions: [
        { id: "warmth-chaude", labelFr: "Chaude Hiver (400g/m² — Idéale Maroc & Riads)", labelEn: "Warm Winter (400g/m² — Ideal Morocco & Riads)", priceModifierEur: 0.0, badge: "Recommandé" },
        { id: "warmth-grand-froid", labelFr: "Grand Froid / Montagne (500g/m² — Spécial Atlas & Ifrane)", labelEn: "Heavy Cold / Mountain (500g/m² — Special Atlas & Ifrane)", priceModifierEur: 25.0, badge: "Grand Froid" },
        { id: "warmth-4-saisons", labelFr: "4 Saisons Duo Jumelable (200g + 300g modulable)", labelEn: "4-Season Duo Modular (200g + 300g snap-together)", priceModifierEur: 45.0, badge: "Modulable" },
      ],
      colorOptions: [
        { id: "col-blanc-neige", labelFr: "Blanc Neige Hôtelier", labelEn: "Snow Hotel White", priceModifierEur: 0, hex: "#FFFFFF" },
      ],
      volumeTiers: [
        { minQty: 1, discountPercent: 0, labelFr: "1 à 4 couettes", labelEn: "1 to 4 duvets" },
        { minQty: 5, discountPercent: 10, labelFr: "5 à 9 couettes (-10%)", labelEn: "5 to 9 duvets (-10%)" },
        { minQty: 10, discountPercent: 20, labelFr: "10+ couettes (-20% Remise Hiver)", labelEn: "10+ duvets (-20% Winter Special)" },
      ],
      specs: [
        { labelFr: "Enveloppe Extérieure", labelEn: "Shell Fabric", valueFr: "100% Coton Percale 91 fils/cm² toucher soyeux", valueEn: "100% Cotton Percale 91 threads/cm² silky touch" },
        { labelFr: "Garnissage", labelEn: "Fill", valueFr: "Microfibres creuses siliconées cardées sensation duvet", valueEn: "Siliconized combed hollow microfibers down-feel" },
        { labelFr: "Traitement Sanitaire", labelEn: "Sanitary Treatment", valueFr: "Anti-acariens, antibactérien et hypoallergénique SANITIZED®", valueEn: "Anti-dust mite, antibacterial and hypoallergenic SANITIZED®" },
        { labelFr: "Piquage", labelEn: "Stitching", valueFr: "Carreaux cloisonnés avec double passepoil de renfort", valueEn: "Baffle box construction with reinforced double piping" },
        { labelFr: "Entretien", labelEn: "Care", valueFr: "Lavable en machine à 40°C ou 60°C, séchage à l'air libre ou tambour modéré", valueEn: "Machine washable 40°C - 60°C, air dry or low tumble dry" },
      ],
    },
    featuredProducts: [
      {
        id: "prod-3",
        slug: "housse-couette-lin-lave",
        nameFr: "Housse de Couette Lin Lavé Terracotta",
        nameEn: "Washed Linen Duvet Cover Terracotta",
        descriptionFr: "Associez votre couette à la chaleur naturelle du lin lavé thermorégulateur.",
        descriptionEn: "Pair your duvet with the natural warmth of thermoregulating washed linen.",
        basePriceEur: 220.0,
        image: "/gallery/duvet_cover_linen_1791048696631.jpg",
        categorySlug: "linge-de-lit",
        tagFr: "Chaleur Naturelle",
        tagEn: "Natural Warmth",
        composition: "100% Lin Français Lavé",
        weightGsm: 165,
      },
      {
        id: "prod-4",
        slug: "jete-de-lit-texture",
        nameFr: "Plaid & Jeté de Lit Coton Texturé",
        nameEn: "Textured Cotton Bed Throw & Plaid",
        descriptionFr: "Tissé serré et lourd pour conserver la chaleur au pied de lit ou sur le canapé.",
        descriptionEn: "Tightly woven and heavy to preserve warmth at foot of bed or sofa.",
        basePriceEur: 85.0,
        image: "/gallery/bed_throw_textured_1791048657945.jpg",
        categorySlug: "linge-de-lit",
        tagFr: "Cosy",
        tagEn: "Cozy",
        composition: "100% Coton Naturel 450g",
        weightGsm: 450,
      },
    ],
    reviewsTitleFr: "Et ça se voit dans nos avis client !",
    reviewsTitleEn: "And it shows in our customer reviews!",
    reviewsSubtitleFr: "Ce que disent les propriétaires de riads, chalets et résidences d'hiver.",
    reviewsSubtitleEn: "What riad owners, mountain chalets and winter home hosts say.",
    averageRating: 4.93,
    totalReviews: 192,
    reviews: [
      {
        id: "rev-h1",
        author: "Mme Nadia Mansouri",
        roleFr: "Propriétaire de Riad",
        roleEn: "Riad Owner",
        location: "Médina de Fès",
        rating: 5,
        date: "Il y a 6 jours",
        titleFr: "Les nuits d'hiver à Fès sont rudes, cette couette est magique",
        titleEn: "Winter nights in Fes are harsh, this duvet is pure magic",
        commentFr: "Dans les vieux riads de Fès, les plafonds hauts rendent les chambres froides la nuit. Depuis que nous avons installé ces couettes Kansotex, les clients dorment comme des bébés et ne demandent plus de chauffage d'appoint. Un vrai nuage !",
        commentEn: "In historic Fes riads, high ceilings make rooms chilly at night. Since installing these Kansotex duvets, guests sleep like babies without requesting extra electric heaters. Pure bliss!",
        verified: true,
      },
      {
        id: "rev-h2",
        author: "Dr. Tarik E.",
        roleFr: "Client Particulier & Propriétaire Chalet",
        roleEn: "Private Client & Chalet Owner",
        location: "Ifrane / Michlifen",
        rating: 5,
        date: "Il y a 2 semaines",
        titleFr: "Testée à -4°C à Ifrane, chaleur parfaite",
        titleEn: "Tested at -4°C in Ifrane, flawless heat",
        commentFr: "J'ai pris la version Grand Froid 500g. C'est bluffant : elle est légère sur le corps, ne donne aucune sensation de moiteur ou de lourdeur, et la chaleur est constante toute la nuit. Zéro allergie.",
        commentEn: "I picked the 500g Heavy Cold version. Remarkable: lightweight on the chest, zero sweat or heavy feeling, and constant heat all night long. Zero allergies.",
        verified: true,
      },
      {
        id: "rev-h3",
        author: "Kenza T.",
        roleFr: "Architecte d'Intérieur",
        roleEn: "Interior Architect",
        location: "Casablanca & Marrakech",
        rating: 5,
        date: "Il y a 3 semaines",
        titleFr: "Le gonflant reste impeccable dans le temps",
        titleEn: "The puffiness stays intact over time",
        commentFr: "J'ai prescrit ces couettes pour trois villas à Bouskoura et un riad à Marrakech. Même après lavage, le garnissage ne se met pas en boule dans les coins grâce aux carreaux cloisonnés.",
        commentEn: "I specified these duvets for three villas in Bouskoura and a riad in Marrakech. Even after washing, the fill never clumps into corners thanks to the baffle-box stitching.",
        verified: true,
      },
    ],
    deliveryPromiseFr: "Livraison sous 24h à 48h dans toutes les villes du Maroc",
    deliveryPromiseEn: "Express delivery within 24h to 48h across all Moroccan cities",
    washInstructionFr: "Enveloppe anti-acariens traitée, lavable en machine, séchage rapide",
    washInstructionEn: "Treated anti-dust mite casing, machine washable, rapid drying",
    b2bPerksFr: [
      "Tarifs préférentiels pour l'équipement d'hiver des riads et chalets",
      "Éligible au paiement à la livraison partout au Maroc",
      "Housses de rangement zippées offertes pour chaque couette",
      "Garantie satisfaction ou échange de taille sous 14 jours",
    ],
    b2bPerksEn: [
      "Special wholesale rates for winter riad and chalet outfitting",
      "Eligible for Cash on Delivery nationwide in Morocco",
      "Complimentary zippered storage bags included with every duvet",
      "Satisfaction guarantee or free size swap within 14 days",
    ],
    seoCategory: "lit",
    metaTitleFr: "Couette Hiver Anti-Acariens & Grand Confort | Kansotex Maroc",
    metaTitleEn: "Anti-Dust Mite Winter Duvet & Luxury Bedding | Kansotex Morocco",
    metaDescFr: "Passez un hiver bien au chaud avec la couette Kansotex 100% confort traitée anti-acariens. Piquage carreaux cloisonnés, enveloppe coton peigné. Avis clients 4.9/5. Livraison express Maroc.",
    metaDescEn: "Stay cozy and warm with the Kansotex 100% comfort anti-dust mite duvet. Baffle-box construction, combed cotton shell. 4.9/5 customer reviews. Fast Morocco delivery.",
    keywords: [
      "couette hiver maroc",
      "couette anti acariens marrakech",
      "couette chaude lit riad",
      "couette 240x220 marrakech",
      "couette 4 saisons maroc",
      "literie hiver grand confort maroc",
    ],
  },

  // =========================================================================
  // 3. L'EXCELLENCE DES MATIÈRES NOBLES — COLLECTION PRIVÉE
  // =========================================================================
  {
    slug: "collection-privee",
    heroKickerFr: "Kansotex Collection Privée",
    heroKickerEn: "Kansotex Private Collection",
    titleFr: "L'Excellence des Matières Nobles",
    titleEn: "The Excellence of Noble Materials",
    headlineFr: "Collection Privée pour Demeures d'Exception",
    headlineEn: "Private Collection for Exceptional Residences",
    subtitleFr: "L'élégance suprême des suites royales et villas de maître. Fibres extra-longues, satin 800 fils, tombé sculptural et finitions haute façon.",
    subtitleEn: "Supreme elegance for royal suites and master villas. Extra-long fibers, 800 TC sateen, sculptural drape and haute couture finishing.",
    posterImage: "/catalogues/collection-privee-post.jpg",
    heroBgImage: "/gallery/bedroom_lifestyle_1791052936092.jpg",
    accentColor: "#A67C52", // Noble antique gold / bronze
    badgesFr: [
      { icon: "cotton", title: "100% Coton Peigné Pur", subtitle: "Fibres extra-longues d'Égypte & percale noble" },
      { icon: "wind", title: "Tissu Ultra-Respirant", subtitle: "Thermorégulation active nuit & jour" },
      { icon: "sparkle", title: "Texture Soyeuse & Moelleuse", subtitle: "Toucher caresse au lustre discret" },
      { icon: "gem", title: "Durabilité & Entretien Facile", subtitle: "Résistance suprême au boulochage & déformation" },
    ],
    badgesEn: [
      { icon: "cotton", title: "100% Pure Combed Cotton", subtitle: "Extra-long staple Egyptian fibers & noble percale" },
      { icon: "wind", title: "Ultra-Breathable Fabric", subtitle: "Active thermoregulation night and day" },
      { icon: "sparkle", title: "Silky & Velvety Texture", subtitle: "Caress soft touch with refined matte sheen" },
      { icon: "gem", title: "Longevity & Easy Care", subtitle: "Supreme pilling and distortion resistance" },
    ],
    starPack: {
      id: "parure-collection-privee-matieres-nobles",
      slug: "parure-collection-privee-matieres-nobles",
      titleFr: "PARURE ROYALE SATIN 800 FILS — MATIÈRES NOBLES",
      titleEn: "ROYAL SATEEN 800 TC SET — NOBLE MATERIALS",
      kickerFr: "Collection Privée Sur-Mesure",
      kickerEn: "Bespoke Private Collection",
      descriptionFr: "Le joyau de notre manufacture. Tissé à partir des plus belles fibres de coton peigné extra-longues, ce satin 800 fils procure une sensation liquide sur la peau. Finitions d'artisan avec double bourdon cousu main et monogramme personnalisable.",
      descriptionEn: "The crown jewel of our manufacture. Woven from the finest extra-long combed cotton fibers, this 800 TC sateen feels like liquid silk against the skin. Artisan finishes with hand-guided double bourdon and optional monogramming.",
      basePriceEur: 239.0, // approx 2600 MAD for 180x200
      image: "/gallery/bed_set_satin_1791048686563.jpg",
      itemsIncludedFr: [
        "2 Taies d'oreiller de prestige (volant plat 7cm avec jour échelle ou bourdon)",
        "1 Housse de couette impériale avec fermeture boutons nacre dissimulée",
        "1 Drap plat magistral avec revers brodé 15cm",
        "1 Drap housse haute couture bonnet 35cm pour matelas d'exception",
        "Pochette protectrice en toile de lin monogrammée Kansotex",
      ],
      itemsIncludedEn: [
        "2 Prestige pillow shams (7cm flat flounce with ladder-stitch or bourdon)",
        "1 Imperial duvet cover with hidden genuine mother-of-pearl button closure",
        "1 Grand flat sheet with 15cm embroidered luxury turnover cuff",
        "1 Haute couture 35cm deep fitted sheet for high-end master mattresses",
        "Kansotex monogrammed linen dustbag protective casing",
      ],
      dimensionOptions: [
        { id: "dim-privee-160-200", labelFr: "160 × 200 CM (Queen Suite)", labelEn: "160 × 200 CM (Queen Suite)", priceModifierEur: -37.0, badge: "Queen" },
        { id: "dim-privee-180-200", labelFr: "180 × 200 CM (King Palace)", labelEn: "180 × 200 CM (King Palace)", priceModifierEur: 0.0, badge: "Signature" },
        { id: "dim-privee-200-200", labelFr: "200 × 200 CM (Super King Impérial)", labelEn: "200 × 200 CM (Imperial Super King)", priceModifierEur: 32.0, badge: "Master Suite" },
      ],
      finishOrWeaveOptions: [
        { id: "fin-bourdon-ton-sur-ton", labelFr: "Double Bourdon Ton-sur-Ton (Minimaliste Chic)", labelEn: "Tone-on-Tone Double Bourdon (Minimalist Chic)", priceModifierEur: 0.0 },
        { id: "fin-jour-venise", labelFr: "Finition Jour Échelle / Jour Venise Traditionnel", labelEn: "Traditional Ladder / Venice Openwork Hem", priceModifierEur: 25.0, badge: "Artisanat" },
        { id: "fin-monogramme", labelFr: "Broderie Monogramme Personnalisé (2 Initiales)", labelEn: "Bespoke Monogram Embroidery (2 Initials)", priceModifierEur: 30.0, badge: "Sur-Mesure" },
      ],
      colorOptions: [
        { id: "col-blanc-calcaire", labelFr: "Blanc Calcaire Lumineux", labelEn: "Luminous Limestone White", priceModifierEur: 0, hex: "#FAFAF8" },
        { id: "col-taupe-atlas", labelFr: "Taupe Atlas Poudré", labelEn: "Powdered Atlas Taupe", priceModifierEur: 10.0, hex: "#8F8275" },
        { id: "col-terracotta-palais", labelFr: "Terre Cuite & Cannelle", labelEn: "Terracotta & Cinnamon", priceModifierEur: 15.0, hex: "#A65A42" },
        { id: "col-sauge-eucalyptus", labelFr: "Sauge Eucalyptus", labelEn: "Eucalyptus Sage", priceModifierEur: 10.0, hex: "#8A9A86" },
        { id: "col-sable-dore", labelFr: "Champagne Doré", labelEn: "Golden Champagne", priceModifierEur: 10.0, hex: "#E5D3B3" },
      ],
      volumeTiers: [
        { minQty: 1, discountPercent: 0, labelFr: "1 à 2 parures", labelEn: "1 to 2 sets" },
        { minQty: 3, discountPercent: 8, labelFr: "3 à 5 parures (-8%)", labelEn: "3 to 5 sets (-8%)" },
        { minQty: 6, discountPercent: 15, labelFr: "6+ parures (-15% Villa Suite)", labelEn: "6+ sets (-15% Villa Suite)" },
      ],
      specs: [
        { labelFr: "Composition", labelEn: "Composition", valueFr: "100% Coton Peigné Extra-Long Staple (Giza / Pima)", valueEn: "100% Combed Extra-Long Staple Cotton (Giza / Pima)" },
        { labelFr: "Densité", labelEn: "Thread Count", valueFr: "800 fils par pouce carré (tissage satin dense)", valueEn: "800 threads per sq inch (dense satin weave)" },
        { labelFr: "Toucher", labelEn: "Touch", valueFr: "Finition soyeuse, ultra-doux et fluide", valueEn: "Silky finish, ultra-soft and fluid drape" },
        { labelFr: "Respirabilité", labelEn: "Breathability", valueFr: "Régulation thermique naturelle, absorption instantanée", valueEn: "Natural thermal regulation, instant moisture wicking" },
        { labelFr: "Confection", labelEn: "Craftsmanship", valueFr: "Confection atelier d'artisan à Marrakech avec surjet renforcé", valueEn: "Bespoke workshop craftsmanship in Marrakech" },
      ],
    },
    featuredProducts: [
      {
        id: "prod-2",
        slug: "parure-satin-champagne",
        nameFr: "Parure Satin de Coton Champagne",
        nameEn: "Champagne Sateen Bedding Set",
        descriptionFr: "L'éclat chaleureux du satin de coton 500 fils pour une atmosphère feutrée.",
        descriptionEn: "The warm radiance of 500 TC sateen for an intimate refined ambiance.",
        basePriceEur: 195.0,
        image: "/gallery/bed_set_satin_1791048686563.jpg",
        categorySlug: "linge-de-lit",
        tagFr: "Signature",
        tagEn: "Signature",
        composition: "100% Satin de Coton 500 Fils",
        weightGsm: 140,
      },
      {
        id: "prod-3",
        slug: "housse-couette-lin-lave",
        nameFr: "Housse de Couette Lin Lavé Haut de Gamme",
        nameEn: "Luxury Washed Linen Duvet Cover",
        descriptionFr: "Lin européen d'exception adouci aux pierres ponces naturelles.",
        descriptionEn: "Exceptional European linen pumice-stone washed for sublime suppleness.",
        basePriceEur: 220.0,
        image: "/gallery/duvet_cover_linen_1791048696631.jpg",
        categorySlug: "linge-de-lit",
        tagFr: "Noble",
        tagEn: "Noble",
        composition: "100% Lin Français Lavé",
        weightGsm: 165,
      },
    ],
    reviewsTitleFr: "Le Choix des Architectes & Décorateurs",
    reviewsTitleEn: "Specified by Architects & Designers",
    reviewsSubtitleFr: "L'art du textile au service des résidences les plus exclusives.",
    reviewsSubtitleEn: "Textile artistry catering to Morocco's most exclusive estates.",
    averageRating: 5.0,
    totalReviews: 86,
    reviews: [
      {
        id: "rev-p1",
        author: "Ghita E. M.",
        roleFr: "Architecte d'Intérieur",
        roleEn: "Interior Architect",
        location: "Palmeraie de Marrakech",
        rating: 5,
        date: "Il y a 10 jours",
        titleFr: "Le niveau de confection rivalise avec les plus grandes maisons italiennes",
        titleEn: "Craftsmanship rivals top Italian textile houses",
        commentFr: "Pour la rénovation d'une villa de 1200m² dans la Palmeraie, nous avons commandé les parures satin 800 fils avec broderie personnalisée. Le tombé est majestueux, le tissu ne plisse pas de manière disgracieuse et la texture est d'une sensualité rare.",
        commentEn: "For a 1200m² villa renovation in the Palmeraie, we ordered the 800 TC sateen sets with custom embroidery. The drape is majestic, the fabric resists unsightly creases and the texture feels exquisitely sensual.",
        verified: true,
      },
      {
        id: "rev-p2",
        author: "Lord Julian H.",
        roleFr: "Propriétaire de Villa Privée",
        roleEn: "Private Villa Owner",
        location: "Ouirgane & Marrakech",
        rating: 5,
        date: "Il y a 1 mois",
        titleFr: "Pure luxury and exceptional Moroccan craft",
        titleEn: "Pure luxury and exceptional Moroccan craft",
        commentFr: "Kansotex has managed to fuse the finest long-staple cotton with master Moroccan tailoring. Sleeping in this bedding feels like waking up in a grand suite at Royal Mansour.",
        commentEn: "Kansotex has managed to fuse the finest long-staple cotton with master Moroccan tailoring. Sleeping in this bedding feels like waking up in a grand suite at Royal Mansour.",
        verified: true,
      },
    ],
    deliveryPromiseFr: "Livraison sous housse de prestige avec suivi personnalisé partout au Maroc",
    deliveryPromiseEn: "Delivered in luxury dustbag with white-glove tracking across Morocco",
    washInstructionFr: "Lavage délicat 40°-60°C, repassage doux pour sublimer le reflet du satin",
    washInstructionEn: "Delicate wash 40°-60°C, warm iron to enhance natural sateen sheen",
    b2bPerksFr: [
      "Service broderie sur-mesure & monogrammes héraldiques",
      "Échantillothèque complète livrée à domicile ou cabinet d'architecture",
      "Tailles hors-normes sur mesure (matelas jusqu'à 240×240 cm)",
      "Accompagnement par notre styliste textile dédié",
    ],
    b2bPerksEn: [
      "Bespoke embroidery & heraldic monogramming service",
      "Full textile swatchbook delivered to your home or studio",
      "Oversized custom sizing available (mattresses up to 240×240 cm)",
      "Direct guidance by our dedicated textile consultant",
    ],
    seoCategory: "ameublement",
    metaTitleFr: "L'Excellence des Matières Nobles — Collection Privée | Kansotex",
    metaTitleEn: "The Excellence of Noble Materials — Private Collection | Kansotex",
    metaDescFr: "Découvrez la Collection Privée Kansotex : Satin de coton 800 fils, 100% coton peigné pur, finitions haute couture pour villas et suites de luxe. Confection sur mesure à Marrakech.",
    metaDescEn: "Explore Kansotex Private Collection: 800 TC cotton sateen, 100% pure combed cotton, haute couture finishes for master villas and palace suites. Bespoke in Marrakech.",
    keywords: [
      "linge de lit matieres nobles",
      "satin de coton 800 fils maroc",
      "parure lit grand luxe marrakech",
      "collection privee textile maroc",
      "coton peigne pur fibres longues",
      "linge de maison villa luxe marrakech",
    ],
  },

  // =========================================================================
  // 4. LINGE DE BAIN HÔTELIER 600G — RIADS & AIRBNB
  // =========================================================================
  {
    slug: "linge-de-bain",
    heroKickerFr: "Kansotex Bath & Wellness",
    heroKickerEn: "Kansotex Bath & Wellness",
    titleFr: "Linge de Bain Hôtelier",
    titleEn: "Hotel Bath Linen",
    headlineFr: "Pour Riads, Hôtels & Propriétaires Airbnb",
    headlineEn: "For Riads, Hotels & Airbnb Hosts",
    subtitleFr: "Serviettes, draps de bain et peignoirs 600g/m² 100% coton peigné. Une absorption immédiate, un moelleux généreux et une palette minérale pensée pour sublimer vos salles de bain.",
    subtitleEn: "Towels, bath sheets and robes 600g/m² 100% combed cotton. Instant absorption, generous fluffiness and an earthy palette designed to elevate your bathrooms.",
    posterImage: "/catalogues/linge-de-bain-post.jpg",
    heroBgImage: "/gallery/bath_towels_set_1791048635743.jpg",
    accentColor: "#4B6B63", // Serene sage / olive bath tone
    partnerLogos: ["Airbnb Superhost", "Booking.com Partner", "Expedia Group"],
    badgesFr: [
      { icon: "cotton", title: "100% Coton Peigné", subtitle: "Bouclette double torsion 600g/m²" },
      { icon: "feather", title: "Ultra Soft", subtitle: "Moelleux voluptueux lavage après lavage" },
      { icon: "droplet", title: "Absorption 3s", subtitle: "Capacité d'absorption record sans peluchage" },
      { icon: "sun-snow", title: "Toutes Saisons", subtitle: "Épais en hiver, séchage respirant en été" },
    ],
    badgesEn: [
      { icon: "cotton", title: "100% Combed Cotton", subtitle: "Double-twisted loop 600g/m² density" },
      { icon: "feather", title: "Ultra Soft", subtitle: "Voluptuous plush wash after wash" },
      { icon: "droplet", title: "3s Fast Absorption", subtitle: "Record water absorption with zero lint" },
      { icon: "sun-snow", title: "All Seasons", subtitle: "Plush in winter, breathable drying in summer" },
    ],
    starPack: {
      id: "pack-linge-de-bain-600g",
      slug: "pack-linge-de-bain-600g",
      titleFr: "PACK BAIN HÔTELIER 600G (ÉPONGE NOBLE)",
      titleEn: "600G HOTEL BATH PACK (NOBLE TERRY)",
      kickerFr: "Pack Essentiel 7 Pièces Complet",
      kickerEn: "Complete 7-Piece Essential Pack",
      descriptionFr: "L'équipement parfait pour une salle de bain de riad ou un appartement de vacances. Tissé en 100% coton peigné 600g/m² avec liseré chevron discret. Comprend les trois dimensions réglementaires hôtelières et le tapis de bain coordonné.",
      descriptionEn: "The perfect setup for a riad bathroom or luxury vacation suite. Woven in 100% combed cotton 600g/m² with subtle herringbone border. Features the three official hospitality towel sizes plus coordinated bath mat.",
      basePriceEur: 91.0, // approx 990 MAD
      image: "/gallery/bath_towels_set_1791048635743.jpg",
      itemsIncludedFr: [
        "2 Grands Draps de Bain Maxi (100 × 150 cm) — 600g/m² pour une sortie de bain enveloppante",
        "2 Serviettes de Toilette Visage & Mains (50 × 90 cm) — 600g/m²",
        "2 Serviettes Invités / Débarbouillettes (30 × 30 cm) — 600g/m²",
        "1 Tapis de Bain Hôtelier Épais Cadre Jacquard (50 × 80 cm) — 800g/m² ultra-absorbant",
      ],
      itemsIncludedEn: [
        "2 Maxi Bath Sheets (100 × 150 cm) — 600g/m² for an enveloping dry-off",
        "2 Hand & Face Towels (50 × 90 cm) — 600g/m²",
        "2 Guest / Face Washcloths (30 × 30 cm) — 600g/m²",
        "1 Heavyweight Hotel Bath Mat with Jacquard Frame (50 × 80 cm) — 800g/m² super absorbent",
      ],
      dimensionOptions: [
        { id: "dim-bain-pack-standard", labelFr: "Pack 7 Pièces Essentiel (2 Maxi + 2 Mains + 2 Invités + 1 Tapis)", labelEn: "7-Piece Essential Pack (2 Maxi + 2 Hand + 2 Guest + 1 Mat)", priceModifierEur: 0.0, badge: "Recommandé" },
        { id: "dim-bain-pack-duo", labelFr: "Pack 14 Pièces Double Salle d'Eau (4 Maxi + 4 Mains + 4 Invités + 2 Tapis)", labelEn: "14-Piece Double Bathroom Pack", priceModifierEur: 82.0, badge: "Économique" },
      ],
      colorOptions: [
        { id: "col-blanc-spa", labelFr: "Blanc Pur Hôtelier", labelEn: "Pure Spa White", priceModifierEur: 0, hex: "#FFFFFF" },
        { id: "col-vert-sauge", labelFr: "Vert Sauge Eucalyptus", labelEn: "Eucalyptus Sage Green", priceModifierEur: 4.0, hex: "#8A9A86" },
        { id: "col-creme-sable", labelFr: "Crème & Sable d'Agafay", labelEn: "Cream & Agafay Sand", priceModifierEur: 4.0, hex: "#E4D9C7" },
        { id: "col-olive-ourika", labelFr: "Kaki Olive de l'Ourika", labelEn: "Ourika Valley Olive", priceModifierEur: 6.0, hex: "#5C644E" },
        { id: "col-bleu-majorelle", labelFr: "Bleu Nuit Majorelle", labelEn: "Majorelle Deep Navy", priceModifierEur: 6.0, hex: "#1F2B42" },
      ],
      finishOrWeaveOptions: [
        { id: "opt-sans-peignoir", labelFr: "Pack Serviettes & Tapis Seul", labelEn: "Towels & Mat Pack Only", priceModifierEur: 0.0 },
        { id: "opt-avec-1-peignoir", labelFr: "+ 1 Peignoir Velours Col Châle (450g) assorti", labelEn: "+ 1 Matching Velour Shawl Collar Bathrobe (450g)", priceModifierEur: 68.0, badge: "+ 1 Peignoir" },
        { id: "opt-avec-2-peignoirs", labelFr: "+ 2 Peignoirs Velours Col Châle (450g) assortis", labelEn: "+ 2 Matching Velour Shawl Collar Bathrobes (450g)", priceModifierEur: 130.0, badge: "+ 2 Peignoirs" },
      ],
      volumeTiers: [
        { minQty: 1, discountPercent: 0, labelFr: "1 à 4 packs", labelEn: "1 to 4 packs" },
        { minQty: 5, discountPercent: 10, labelFr: "5 à 9 packs (Remise Pro -10%)", labelEn: "5 to 9 packs (-10% Pro)" },
        { minQty: 10, discountPercent: 18, labelFr: "10+ packs (Remise Hôtelière -18%)", labelEn: "10+ packs (-18% Hotel Rate)" },
      ],
      specs: [
        { labelFr: "Grammage Serviettes", labelEn: "Towel Weight", valueFr: "600 g/m² (épaisseur dense hôtellerie de luxe)", valueEn: "600 g/m² (heavyweight luxury hotel standard)" },
        { labelFr: "Grammage Tapis", labelEn: "Bath Mat Weight", valueFr: "800 g/m² avec cadre jacquard double boucle", valueEn: "800 g/m² with jacquard frame double looped" },
        { labelFr: "Dimensions Clés", labelEn: "Key Sizes", valueFr: "30×30 cm (Invité) / 50×90 cm (Toilette) / 100×150 cm (Maxi Bain)", valueEn: "30×30 cm (Guest) / 50×90 cm (Hand) / 100×150 cm (Maxi Bath)" },
        { labelFr: "Matière", labelEn: "Fiber", valueFr: "100% Coton peigné cardé, bouclette double torsion anti-accrochage", valueEn: "100% Combed cotton, double-twisted anti-snag loops" },
        { labelFr: "Lavage & Calandre", labelEn: "Care & Laundry", valueFr: "Lavage machine 60°C (couleurs) à 90°C (blanc), séchoir tambour recommandé pour redonner le gonflant", valueEn: "Machine wash 60°C - 90°C, tumble dry recommended for maximum fluff" },
      ],
    },
    featuredProducts: [
      {
        id: "prod-5",
        slug: "peignoir-velours-eponge",
        nameFr: "Peignoir Velours & Éponge 450g",
        nameEn: "Velour & Terry Bathrobe 450g",
        descriptionFr: "Extérieur velours soyeux, intérieur bouclette absorbante. Finition col châle palace.",
        descriptionEn: "Silky velour outside, thirsty terry loops inside. Palace shawl collar cut.",
        basePriceEur: 130.0,
        image: "/gallery/bathrobe_velour_1791048626440.jpg",
        categorySlug: "linge-de-bain",
        tagFr: "Spa & Palace",
        tagEn: "Spa & Palace",
        composition: "100% Coton Peigné 450g",
        weightGsm: 450,
      },
      {
        id: "prod-6",
        slug: "set-serviettes-premium",
        nameFr: "Set Serviettes Spa Premium 600g",
        nameEn: "Premium Spa Towel Set 600g",
        descriptionFr: "Ensemble de 4 pièces ultra-denses. Douceur et tenue éprouvée après 50 lavages.",
        descriptionEn: "Set of 4 heavyweight towels. Proven softness and strength past 50 washes.",
        basePriceEur: 95.0,
        image: "/gallery/bath_towels_set_1791048635743.jpg",
        categorySlug: "linge-de-bain",
        tagFr: "Bestseller",
        tagEn: "Bestseller",
        composition: "100% Coton Égyptien 600g",
        weightGsm: 600,
      },
      {
        id: "prod-7",
        slug: "serviette-bain-nid-abeille",
        nameFr: "Drap de Bain Nid d'Abeille Waffle",
        nameEn: "Waffle Honeycomb Bath Towel",
        descriptionFr: "Tissage gaufré ultra-absorbant et séchage deux fois plus rapide. Idéal hammam et riad.",
        descriptionEn: "Waffle structure with twice faster drying time. Ideal for hammams and sunny terraces.",
        basePriceEur: 55.0,
        image: "/gallery/bath_towel_waffle_1791048706061.jpg",
        categorySlug: "linge-de-bain",
        tagFr: "Séchage Rapide",
        tagEn: "Quick Dry",
        composition: "100% Coton Gaufré",
        weightGsm: 380,
      },
    ],
    reviewsTitleFr: "La Note Confort des Riads & Spas",
    reviewsTitleEn: "The Comfort Seal for Riads & Spas",
    reviewsSubtitleFr: "Plus de 35 000 serviettes fournies aux établissements touristiques du Royaume.",
    reviewsSubtitleEn: "Over 35,000 towels delivered to premier Moroccan hospitality venues.",
    averageRating: 4.96,
    totalReviews: 247,
    reviews: [
      {
        id: "rev-b1",
        author: "Siham B.",
        roleFr: "Gérante Riad & Spa",
        roleEn: "Riad & Spa General Manager",
        location: "Kasbah, Marrakech",
        rating: 5,
        date: "Il y a 1 semaine",
        titleFr: "Le maxi drap 100x150cm fait toute la différence",
        titleEn: "The 100x150cm maxi sheet makes all the difference",
        commentFr: "Nos clients européens détestent les petites serviettes d'hôtel où l'on ne peut pas s'enrouler. Le drap 100x150cm Kansotex est généreux, lourd, et absorbe dès le premier contact sans frotter. Nous avons pris le coloris Vert Sauge qui s'accorde divinement avec nos carreaux de ciment.",
        commentEn: "Our European guests hate skimpy bath towels you can't wrap around yourself. The Kansotex 100x150cm sheet is generous, heavy, and absorbs on first touch without rubbing. The Sage Green shade pairs divinely with our encaustic tiles.",
        verified: true,
      },
      {
        id: "rev-b2",
        author: "Yassine M.",
        roleFr: "Gestionnaire Conciergerie Airbnb",
        roleEn: "Airbnb Concierge Manager",
        location: "Marrakech & Taghazout Bay",
        rating: 5,
        date: "Il y a 3 semaines",
        titleFr: "Zéro peluchage, séchage impeccable",
        titleEn: "Zero lint, impeccable laundering",
        commentFr: "Le gros problème du linge de bain pas cher est le peluchage qui bouche les filtres des machines et colle à la peau. Avec Kansotex 600g, la boucle est serrée et ne peluche pas. Nos 8 appartements sont équipés.",
        commentEn: "The biggest issue with budget towels is lint clogging dryer filters and sticking to skin. With Kansotex 600g, loops are dense and never shed. All our 8 units are equipped.",
        verified: true,
      },
    ],
    deliveryPromiseFr: "Livraison sous 24h-72h partout au Maroc (Casablanca, Marrakech, Tanger, Agadir...)",
    deliveryPromiseEn: "Delivery within 24h-72h nationwide across Morocco",
    washInstructionFr: "Résistant aux lavages haute température 60°-90°C et séchoir rotatif",
    washInstructionEn: "Resistant to high temperature 60°-90°C wash cycles and tumble drying",
    b2bPerksFr: [
      "Tarifs flottes dégressifs à partir de 5 packs de bain",
      "Option broderie logo sur peignoirs et serviettes (dès 10 pièces)",
      "Échantillon gratuit envoyé pour test de lavage blanchisserie",
      "Devis personnalisé direct sur WhatsApp",
    ],
    b2bPerksEn: [
      "Fleet wholesale discounts starting from 5 bath packs",
      "Custom logo embroidery on robes and towels (from 10 units)",
      "Free sample provided for industrial wash test",
      "Direct personalized quotation on WhatsApp",
    ],
    seoCategory: "bain",
    metaTitleFr: "Linge de Bain Hôtelier 600g — Riads, Hôtels & Airbnb | Kansotex",
    metaTitleEn: "Hotel Bath Linen 600g — Riads, Hotels & Airbnb | Kansotex",
    metaDescFr: "Serviettes, draps de bain 100x150cm et peignoirs 600g/m² 100% coton peigné pour riads, hôtels et hébergements Airbnb. Qualité spa luxe, absorption 3s. Livraison Maroc.",
    metaDescEn: "Towels, bath sheets 100x150cm and bathrobes 600g/m² 100% combed cotton for riads, hotels and Airbnb rentals. Luxury spa quality, 3s absorption. Morocco delivery.",
    keywords: [
      "linge de bain hotelier marrakech",
      "serviette 600g maroc",
      "drap de bain 100x150 riad",
      "fournisseur serviettes airbnb maroc",
      "peignoir velours eponge marrakech",
      "pack serviettes bain hotel maroc",
      "grossiste linge de bain marrakech",
    ],
  },
];

export function getAllCatalogues(): CatalogueDefinition[] {
  return CATALOGUES_LIST;
}

export function getCatalogueBySlug(slug: string): CatalogueDefinition | undefined {
  return CATALOGUES_LIST.find((cat) => cat.slug === slug);
}

export function buildCatalogueWhatsAppMessage({
  catalogue,
  dimensionLabel,
  colorLabel,
  finishLabel,
  quantity,
  finalPriceFormatted,
  clientName,
  establishmentName,
  city,
}: {
  catalogue: CatalogueDefinition;
  dimensionLabel?: string;
  colorLabel?: string;
  finishLabel?: string;
  quantity: number;
  finalPriceFormatted: string;
  clientName?: string;
  establishmentName?: string;
  city?: string;
}): string {
  const parts: string[] = [
    `*DEMANDE DE DEVIS — KANSOTEX*`,
    `Catalogue : ${catalogue.titleFr} (${catalogue.headlineFr})`,
    `Produit : ${catalogue.starPack.titleFr}`,
    `--------------------------------`,
    `• Quantité : ${quantity} pack(s)`,
  ];

  if (dimensionLabel) parts.push(`• Dimension : ${dimensionLabel}`);
  if (colorLabel) parts.push(`• Coloris : ${colorLabel}`);
  if (finishLabel) parts.push(`• Option/Finition : ${finishLabel}`);
  
  parts.push(`• Estimation indicative : ~${finalPriceFormatted}`);
  
  if (establishmentName) parts.push(`• Établissement : ${establishmentName}`);
  if (city) parts.push(`• Ville : ${city}`);
  if (clientName) parts.push(`• Contact : ${clientName}`);
  
  parts.push(`--------------------------------`);
  parts.push(`Bonjour l'équipe Kansotex, je souhaite recevoir un devis officiel et confirmer la disponibilité de cette commande. Merci !`);

  return encodeURIComponent(parts.join("\n"));
}
