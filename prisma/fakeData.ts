export const fakeCategories = [
  {
    id: "cat-1",
    slug: "linge-de-lit",
    nameFr: "Linge de Lit",
    nameEn: "Linge de Lit (EN)",
    descriptionFr: "Parures, draps et housses de couette d'exception pour un sommeil luxueux.",
    descriptionEn: "Parures, draps et housses de couette d'exception pour un sommeil luxueux. (EN)"
  },
  {
    id: "cat-2",
    slug: "linge-de-bain",
    nameFr: "Linge de Bain",
    nameEn: "Linge de Bain (EN)",
    descriptionFr: "Serviettes, peignoirs et tapis de bain au confort incomparable.",
    descriptionEn: "Serviettes, peignoirs et tapis de bain au confort incomparable. (EN)"
  },
  {
    id: "cat-3",
    slug: "linge-de-table",
    nameFr: "Linge de Table",
    nameEn: "Linge de Table (EN)",
    descriptionFr: "Nappes, serviettes et sets de table pour une décoration de table raffinée.",
    descriptionEn: "Nappes, serviettes et sets de table pour une décoration de table raffinée. (EN)"
  },
  {
    id: "cat-4",
    slug: "tissus-ameublement",
    nameFr: "Tissus d'Ameublement",
    nameEn: "Tissus d'Ameublement (EN)",
    descriptionFr: "Tissus haut de gamme pour canapés, fauteuils et rideaux.",
    descriptionEn: "Tissus haut de gamme pour canapés, fauteuils et rideaux. (EN)"
  },
  {
    id: "cat-5",
    slug: "tissus-outdoor",
    nameFr: "Tissus Outdoor",
    nameEn: "Tissus Outdoor (EN)",
    descriptionFr: "Tissus résistants aux UV et à l'eau pour l'extérieur.",
    descriptionEn: "Tissus résistants aux UV et à l'eau pour l'extérieur. (EN)"
  },
  {
    id: "cat-6",
    slug: "tapis",
    nameFr: "Tapis",
    nameEn: "Tapis (EN)",
    descriptionFr: "Tapis artisanaux de haute qualité.",
    descriptionEn: "Tapis artisanaux de haute qualité. (EN)"
  }
];

export const fakeProducts = [
  // LINGE DE LIT
  {
    id: "prod-1",
    slug: "parure-percale-blanc",
    nameFr: "Parure de Lit Percale Signature",
    nameEn: "Parure de Lit Percale Signature (EN)",
    descriptionFr: "Une parure de lit complète en percale de coton haut de gamme (300 fils). Légère, craquante et respirante. Parfaite pour les nuits chaudes. Inclut une housse de couette et deux taies d'oreiller.",
    descriptionEn: "Une parure de lit complète en percale de coton haut de gamme (300 fils). Légère, craquante et respirante. Parfaite pour les nuits chaudes. Inclut une housse de couette et deux taies d'oreiller. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 145.0, 
    image: "/gallery/bed_set_percale_1791048617304.jpg",
    gallery: ["/gallery/Kansotex-indoor-living-room-pinterest.png", "/gallery/Kansotex-outdoor-tissus-pinterest.jpg"],
    categoryId: "cat-1",
    metadata: {
      id: "meta-1",
      weight: 120,
      composition: "100% Coton Percale - 300 Fils",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-1-blanc",
        sku: "LIT-PERC-BLC-240",
        colorNameFr: "Blanc Pur",
    colorNameEn: "Blanc Pur (EN)",
        colorHex: "#ffffff",
        size: "240x260 cm",
        stockLevel: 45.0,
        dyeLots: []
      }
    ]
  },
  {
    id: "prod-2",
    slug: "parure-satin-champagne",
    nameFr: "Parure de Lit Satin de Coton",
    nameEn: "Parure de Lit Satin de Coton (EN)",
    descriptionFr: "L'élégance absolue. Cette parure en satin de coton (500 fils) offre un toucher soyeux, un reflet subtil et une douceur inégalée pour transformer votre chambre en suite d'hôtel 5 étoiles.",
    descriptionEn: "L'élégance absolue. Cette parure en satin de coton (500 fils) offre un toucher soyeux, un reflet subtil et une douceur inégalée pour transformer votre chambre en suite d'hôtel 5 étoiles. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 195.0, 
    image: "/gallery/bed_set_satin_1791048686563.jpg",
    gallery: ["/gallery/bedroom_lifestyle_1791052936092.jpg", "/gallery/bathrobe_velour_1791048626440.jpg", "/gallery/linen_fabric_closeup_1791052926029.jpg", "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png"],
    categoryId: "cat-1",
    metadata: {
      id: "meta-2",
      weight: 140,
      composition: "100% Satin de Coton - 500 Fils",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-2-champagne",
        sku: "LIT-SAT-CHMP-240",
        colorNameFr: "Champagne",
    colorNameEn: "Champagne (EN)",
        colorHex: "#e5d3b3",
        size: "240x260 cm",
        stockLevel: 25.0,
        dyeLots: []
      }
    ]
  },
  {
    id: "prod-3",
    slug: "housse-couette-lin-lave",
    nameFr: "Housse de Couette Lin Lavé",
    nameEn: "Housse de Couette Lin Lavé (EN)",
    descriptionFr: "Le charme intemporel du lin naturel. Cette housse de couette thermorégulatrice est idéale toute l'année. Son aspect légèrement froissé apporte une touche bohème chic et authentique.",
    descriptionEn: "Le charme intemporel du lin naturel. Cette housse de couette thermorégulatrice est idéale toute l'année. Son aspect légèrement froissé apporte une touche bohème chic et authentique. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 220.0, 
    image: "/gallery/duvet_cover_linen_1791048696631.jpg",
    gallery: ["/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png", "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png", "/gallery/Kansotex-outdoor-tissus-pinterest.jpg", "/gallery/bathrobe_velour_1791048626440.jpg"],
    categoryId: "cat-1",
    metadata: {
      id: "meta-3",
      weight: 165,
      composition: "100% Lin Français Lavé",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-3-terracotta",
        sku: "LIT-LIN-TER-240",
        colorNameFr: "Terracotta",
    colorNameEn: "Terracotta (EN)",
        colorHex: "#c56d56",
        size: "240x260 cm",
        stockLevel: 30.0,
        dyeLots: []
      },
      {
        id: "var-3-sauge",
        sku: "LIT-LIN-SGE-240",
        colorNameFr: "Vert Sauge",
    colorNameEn: "Vert Sauge (EN)",
        colorHex: "#8a9a86",
        size: "240x260 cm",
        stockLevel: 15.0,
        dyeLots: []
      }
    ]
  },
  {
    id: "prod-4",
    slug: "jete-de-lit-texture",
    nameFr: "Jeté de Lit Coton Texturé",
    nameEn: "Jeté de Lit Coton Texturé (EN)",
    descriptionFr: "La touche finale parfaite pour votre lit ou votre canapé. Ce jeté tissé à la main offre une belle texture épaisse et un tombé lourd, idéal pour les soirées d'hiver ou pour sublimer votre décoration.",
    descriptionEn: "La touche finale parfaite pour votre lit ou votre canapé. Ce jeté tissé à la main offre une belle texture épaisse et un tombé lourd, idéal pour les soirées d'hiver ou pour sublimer votre décoration. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 85.0, 
    image: "/gallery/bed_throw_textured_1791048657945.jpg",
    gallery: ["/gallery/tablecloth_linen_1791048647057.jpg", "/gallery/Kansotex-outdoor-tissus-pinterest.jpg"],
    categoryId: "cat-1",
    metadata: {
      id: "meta-4",
      weight: 450,
      composition: "100% Coton Naturel",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-4-sable",
        sku: "LIT-JET-SAB",
        colorNameFr: "Beige Sable",
    colorNameEn: "Beige Sable (EN)",
        colorHex: "#d8cabc",
        size: "180x230 cm",
        stockLevel: 60.0,
        dyeLots: []
      }
    ]
  },
  
  // LINGE DE BAIN
  {
    id: "prod-5",
    slug: "peignoir-velours-eponge",
    nameFr: "Peignoir Velours & Éponge",
    nameEn: "Peignoir Velours & Éponge (EN)",
    descriptionFr: "L'expérience d'un spa de luxe chez vous. L'extérieur en velours coupé offre une brillance élégante, tandis que l'intérieur en bouclette d'éponge garantit une absorption optimale.",
    descriptionEn: "L'expérience d'un spa de luxe chez vous. L'extérieur en velours coupé offre une brillance élégante, tandis que l'intérieur en bouclette d'éponge garantit une absorption optimale. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 130.0, 
    image: "/gallery/bathrobe_velour_1791048626440.jpg",
    gallery: ["/gallery/Kansotex-outdoor-tissus-pinterest.jpg", "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png", "/gallery/Kansotex-outdoor-tissus-pinterest.jpg"],
    categoryId: "cat-2",
    metadata: {
      id: "meta-5",
      weight: 420,
      composition: "100% Coton Peigné",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-5-ecru",
        sku: "BAIN-PGN-ECR-M",
        colorNameFr: "Écru",
    colorNameEn: "Écru (EN)",
        colorHex: "#f5f5dc",
        size: "M/L",
        stockLevel: 20.0,
        dyeLots: []
      }
    ]
  },
  {
    id: "prod-6",
    slug: "set-serviettes-premium",
    nameFr: "Set Serviettes Spa Premium",
    nameEn: "Set Serviettes Spa Premium (EN)",
    descriptionFr: "Ensemble de 4 pièces (2 draps de douche, 2 serviettes de toilette) d'une épaisseur exceptionnelle (600g/m²). Un moelleux incomparable qui résiste aux lavages répétés.",
    descriptionEn: "Ensemble de 4 pièces (2 draps de douche, 2 serviettes de toilette) d'une épaisseur exceptionnelle (600g/m²). Un moelleux incomparable qui résiste aux lavages répétés. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 95.0, 
    image: "/gallery/bath_towels_set_1791048635743.jpg",
    gallery: ["/gallery/tablecloth_linen_1791048647057.jpg", "/gallery/tablecloth_linen_1791048647057.jpg", "/gallery/Kansotex-indoor-living-room-pinterest.png"],
    categoryId: "cat-2",
    metadata: {
      id: "meta-6",
      weight: 600,
      composition: "100% Coton Égyptien",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-6-taupe",
        sku: "BAIN-SET-TAU",
        colorNameFr: "Taupe",
    colorNameEn: "Taupe (EN)",
        colorHex: "#8b7e74",
        size: "Standard",
        stockLevel: 80.0,
        dyeLots: []
      }
    ]
  },
  {
    id: "prod-7",
    slug: "drap-bain-nid-abeille",
    nameFr: "Drap de Bain Nid d'Abeille",
    nameEn: "Drap de Bain Nid d'Abeille (EN)",
    descriptionFr: "Design moderne, léger et très absorbant. Le tissage en nid d'abeille sèche rapidement et prend très peu de place, ce qui le rend idéal pour la maison, le hammam ou le voyage.",
    descriptionEn: "Design moderne, léger et très absorbant. Le tissage en nid d'abeille sèche rapidement et prend très peu de place, ce qui le rend idéal pour la maison, le hammam ou le voyage. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 45.0, 
    image: "/gallery/bath_towel_waffle_1791048706061.jpg",
    gallery: ["/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png", "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png"],
    categoryId: "cat-2",
    metadata: {
      id: "meta-7",
      weight: 280,
      composition: "100% Coton",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-7-blanc",
        sku: "BAIN-NID-BLC",
        colorNameFr: "Blanc Optique",
    colorNameEn: "Blanc Optique (EN)",
        colorHex: "#ffffff",
        size: "100x150 cm",
        stockLevel: 100.0,
        dyeLots: []
      }
    ]
  },

  // LINGE DE TABLE
  {
    id: "prod-8",
    slug: "nappe-lin-naturel",
    nameFr: "Nappe en Lin Brut",
    nameEn: "Nappe en Lin Brut (EN)",
    descriptionFr: "Une nappe au tombé lourd et naturel, parfaite pour de grandes tablées chaleureuses. Son aspect authentique magnifie chaque dîner, du quotidien aux réceptions chic.",
    descriptionEn: "Une nappe au tombé lourd et naturel, parfaite pour de grandes tablées chaleureuses. Son aspect authentique magnifie chaque dîner, du quotidien aux réceptions chic. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 115.0, 
    image: "/gallery/tablecloth_linen_1791048647057.jpg",
    gallery: ["/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png", "/gallery/bathrobe_velour_1791048626440.jpg", "/gallery/Kansotex-outdoor-tissus-pinterest.jpg"],
    categoryId: "cat-3",
    metadata: {
      id: "meta-8",
      weight: 180,
      composition: "100% Lin",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-8-nat",
        sku: "TAB-LIN-NAT-250",
        colorNameFr: "Lin Naturel",
    colorNameEn: "Lin Naturel (EN)",
        colorHex: "#c2b2a1",
        size: "170x250 cm",
        stockLevel: 40.0,
        dyeLots: []
      }
    ]
  },
  {
    id: "prod-9",
    slug: "nappe-jacquard-antitache",
    nameFr: "Nappe Jacquard Anti-taches",
    nameEn: "Nappe Jacquard Anti-taches (EN)",
    descriptionFr: "L'alliance parfaite entre le raffinement d'un tissage jacquard classique et la praticité d'un traitement déperlant invisible. Résiste aux éclaboussures de vin et de café.",
    descriptionEn: "L'alliance parfaite entre le raffinement d'un tissage jacquard classique et la praticité d'un traitement déperlant invisible. Résiste aux éclaboussures de vin et de café. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 90.0, 
    image: "/gallery/tablecloth_jacquard_1791048717130.jpg",
    gallery: ["/gallery/bedroom_lifestyle_1791052936092.jpg", "/gallery/bedroom_lifestyle_1791052936092.jpg", "/gallery/bedroom_lifestyle_1791052936092.jpg", "/gallery/bedroom_lifestyle_1791052936092.jpg"],
    categoryId: "cat-3",
    metadata: {
      id: "meta-9",
      weight: 220,
      composition: "Coton Jacquard Traité Teflon",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-9-ivoire",
        sku: "TAB-JAC-IVO-250",
        colorNameFr: "Ivoire",
    colorNameEn: "Ivoire (EN)",
        colorHex: "#fcf8f2",
        size: "150x250 cm",
        stockLevel: 55.0,
        dyeLots: []
      }
    ]
  },
  {
    id: "prod-10",
    slug: "set-serviettes-table-lin",
    nameFr: "Serviettes de Table Lin (Lot de 4)",
    nameEn: "Serviettes de Table Lin (Lot de 4) (EN)",
    descriptionFr: "Faites la différence avec ces serviettes en lin lavé aux finitions frangées à la main. Idéales pour créer un dressage de table rustique et élégant à la fois.",
    descriptionEn: "Faites la différence avec ces serviettes en lin lavé aux finitions frangées à la main. Idéales pour créer un dressage de table rustique et élégant à la fois. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 48.0, 
    image: "/gallery/napkins_linen_1791048727943.jpg",
    gallery: ["/gallery/tablecloth_linen_1791048647057.jpg", "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png"],
    categoryId: "cat-3",
    metadata: {
      id: "meta-10",
      weight: 165,
      composition: "100% Lin",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-10-grege",
        sku: "TAB-SRV-GRE",
        colorNameFr: "Grège",
    colorNameEn: "Grège (EN)",
        colorHex: "#a8a29b",
        size: "45x45 cm",
        stockLevel: 120.0,
        dyeLots: []
      }
    ]
  },
  // ANCIENS TISSUS ET NOUVEAU TAPIS
  {
    id: "prod-11",
    slug: "velours-cotele-paris",
    nameFr: "Velours Côtelé Paris",
    nameEn: "Velours Côtelé Paris (EN)",
    descriptionFr: "Un velours côtelé élégant, d'une douceur exceptionnelle. Idéal pour la confection de canapés et fauteuils contemporains. Sa texture riche apporte profondeur et chaleur à tout intérieur haut de gamme.",
    descriptionEn: "Un velours côtelé élégant, d'une douceur exceptionnelle. Idéal pour la confection de canapés et fauteuils contemporains. Sa texture riche apporte profondeur et chaleur à tout intérieur haut de gamme. (EN)",
    type: "FABRIC_BY_METER",
    basePrice: 45.0, 
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
    gallery: ["/gallery/Kansotex-outdoor-tissus-pinterest.jpg", "/gallery/Kansotex-outdoor-tissus-pinterest.jpg", "/gallery/tablecloth_linen_1791048647057.jpg"],
    categoryId: "cat-4",
    metadata: {
      id: "meta-11",
      laize: 140,
      raccordV: 0,
      raccordH: 0,
      isHalfDrop: false,
      martindale: 80000,
      weight: 550,
      composition: "100% Polyester Premium",
      minOrderLength: 1.0,
      cutIncrement: 0.1
    },
    variants: [
      {
        id: "var-11-bleu",
        sku: "VEL-PAR-BLU",
        colorNameFr: "Bleu Nuit",
    colorNameEn: "Bleu Nuit (EN)",
        colorHex: "#1a2530",
        stockLevel: 150.0,
        dyeLots: [
          { lotNumber: "L-2026-001", stockLength: 100.0 },
          { lotNumber: "L-2026-002", stockLength: 50.0 }
        ]
      },
      {
        id: "var-11-terracotta",
        sku: "VEL-PAR-TER",
        colorNameFr: "Terracotta",
    colorNameEn: "Terracotta (EN)",
        colorHex: "#e2725b",
        stockLevel: 80.0,
        dyeLots: [
          { lotNumber: "L-2026-003", stockLength: 80.0 }
        ]
      }
    ]
  },
  {
    id: "prod-12",
    slug: "lin-lave-outdoor-capri",
    nameFr: "Toile Outdoor Capri",
    nameEn: "Toile Outdoor Capri (EN)",
    descriptionFr: "Toile haute performance traitée déperlante et anti-UV. Une résistance exceptionnelle aux éléments tout en conservant le toucher naturel d'un lin brut. Parfait pour vos bains de soleil, coussins de terrasse et voilages d'extérieur.",
    descriptionEn: "Toile haute performance traitée déperlante et anti-UV. Une résistance exceptionnelle aux éléments tout en conservant le toucher naturel d'un lin brut. Parfait pour vos bains de soleil, coussins de terrasse et voilages d'extérieur. (EN)",
    type: "FABRIC_BY_METER",
    basePrice: 58.0,
    image: "/gallery/Kansotex-outdoor-tissus-pinterest.jpg",
    gallery: ["/gallery/Kansotex-indoor-living-room-pinterest.png", "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png"],
    categoryId: "cat-5",
    metadata: {
      id: "meta-12",
      laize: 160,
      raccordV: 15,
      raccordH: 15,
      isHalfDrop: false,
      martindale: 45000,
      weight: 320,
      composition: "100% Acrylique Teint Masse",
      minOrderLength: 1.0,
      cutIncrement: 0.1
    },
    variants: [
      {
        id: "var-12-raye",
        sku: "OUT-CAP-RAY",
        colorNameFr: "Sable / Écru",
    colorNameEn: "Sable / Écru (EN)",
        colorHex: "#e8ddce",
        stockLevel: 210.0,
        dyeLots: [
          { lotNumber: "L-2026-004", stockLength: 210.0 }
        ]
      }
    ]
  },
  {
    id: "prod-13",
    slug: "bouclette-alpes",
    nameFr: "Tissu Bouclette Alpes",
    nameEn: "Tissu Bouclette Alpes (EN)",
    descriptionFr: "L'iconique tissu bouclette, revisité avec des fibres techniques pour une résilience absolue. Son aspect moutonné et son confort enveloppant en font le choix privilégié des décorateurs.",
    descriptionEn: "L'iconique tissu bouclette, revisité avec des fibres techniques pour une résilience absolue. Son aspect moutonné et son confort enveloppant en font le choix privilégié des décorateurs. (EN)",
    type: "FABRIC_BY_METER",
    basePrice: 75.0,
    image: "/gallery/Kansotex-indoor-living-room-pinterest.png",
    gallery: ["/gallery/tablecloth_linen_1791048647057.jpg", "/gallery/tablecloth_linen_1791048647057.jpg", "/gallery/rug_beniouarain_1791049165733.jpg"],
    categoryId: "cat-4",
    metadata: {
      id: "meta-13",
      laize: 138,
      raccordV: 0,
      raccordH: 0,
      isHalfDrop: false,
      martindale: 100000,
      weight: 620,
      composition: "35% Laine, 30% Acrylique, 25% PES, 10% Coton",
      minOrderLength: 2.0,
      cutIncrement: 0.5
    },
    variants: [
      {
        id: "var-13-creme",
        sku: "BOU-ALP-CRE",
        colorNameFr: "Crème d'Ivoire",
    colorNameEn: "Crème d'Ivoire (EN)",
        colorHex: "#f2f0e6",
        stockLevel: 45.0,
        dyeLots: [
          { lotNumber: "L-2026-005", stockLength: 45.0 }
        ]
      }
    ]
  },
  {
    id: "prod-14",
    slug: "jacquard-atlas",
    nameFr: "Jacquard Atlas Héritage",
    nameEn: "Jacquard Atlas Héritage (EN)",
    descriptionFr: "Inspiré de l'artisanat marocain, ce Jacquard majestueux tissé en double chaîne révèle des motifs géométriques subtils. Idéal pour des rideaux lourds au tombé magistral.",
    descriptionEn: "Inspiré de l'artisanat marocain, ce Jacquard majestueux tissé en double chaîne révèle des motifs géométriques subtils. Idéal pour des rideaux lourds au tombé magistral. (EN)",
    type: "FABRIC_BY_METER",
    basePrice: 110.0, 
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png",
    gallery: ["/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png", "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png", "/gallery/Kansotex-outdoor-tissus-pinterest.jpg"],
    categoryId: "cat-4",
    metadata: {
      id: "meta-14",
      laize: 145,
      raccordV: 64,
      raccordH: 32,
      isHalfDrop: true,
      martindale: 25000,
      weight: 480,
      composition: "60% Coton, 40% Viscose",
      minOrderLength: 1.0,
      cutIncrement: 0.1
    },
    variants: [
      {
        id: "var-14-or",
        sku: "JAC-ATL-OR",
        colorNameFr: "Fil d'Or",
    colorNameEn: "Fil d'Or (EN)",
        colorHex: "#d4af37",
        stockLevel: 90.0,
        dyeLots: [
          { lotNumber: "L-2026-007", stockLength: 90.0 }
        ]
      }
    ]
  },
  {
    id: "prod-15",
    slug: "tapis-beni-ouarain",
    nameFr: "Tapis Beni Ouarain Signature",
    nameEn: "Tapis Beni Ouarain Signature (EN)",
    descriptionFr: "Véritable chef-d'œuvre de l'artisanat marocain, ce tapis épais en pure laine vierge apporte chaleur et authenticité à votre intérieur.",
    descriptionEn: "Véritable chef-d'œuvre de l'artisanat marocain, ce tapis épais en pure laine vierge apporte chaleur et authenticité à votre intérieur. (EN)",
    type: "FINISHED_GOOD",
    basePrice: 850.0, 
    image: "/gallery/rug_beniouarain_1791049165733.jpg",
    gallery: ["/gallery/bedroom_lifestyle_1791052936092.jpg", "/gallery/Kansotex-indoor-living-room-pinterest.png", "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png"],
    categoryId: "cat-6",
    metadata: {
      id: "meta-15",
      weight: 3500,
      composition: "100% Laine Vierge",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-15-blanc",
        sku: "TAP-BEN-BLC-2x3",
        colorNameFr: "Blanc Crème et Lignes Noires",
    colorNameEn: "Blanc Crème et Lignes Noires (EN)",
        colorHex: "#f0efe9",
        size: "200x300 cm",
        stockLevel: 10.0,
        dyeLots: []
      }
    ]
  }
];
