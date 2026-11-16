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
  // ==========================================
  // NOUVEAUX PACKS CATALOGUES KANSOTEX
  // ==========================================
  {
    id: "pack-linge-de-lit-hotelier",
    slug: "pack-linge-de-lit-hotelier",
    nameFr: "Pack Linge de Lit Hôtelier (4 Pièces)",
    nameEn: "Hotel Bed Linen Pack (4 Pieces)",
    descriptionFr: "L'ensemble complet de référence pour Riads, Hôtels et Airbnb. 2 taies d'oreiller portefeuille, 1 housse de couette avec passe-mains, 1 drap plat bourdon et 1 drap housse grand bonnet 30cm. 100% coton peigné respirant, ultra-résistant aux lavages fréquents.",
    descriptionEn: "Complete benchmark bedding set for Riads, Hotels and Airbnb hosts. 2 envelope pillowcases, 1 duvet cover with hand-slits, 1 bourdon-hem flat sheet and 1 deep 30cm fitted sheet. 100% combed breathable cotton.",
    type: "FINISHED_GOOD",
    basePrice: 125.0,
    image: "/catalogues/linge-hotelier-post.jpg",
    gallery: [
      "/gallery/bed_set_percale_1791048617304.jpg",
      "/gallery/bedroom_lifestyle_1791052936092.jpg",
      "/catalogues/linge-hotelier-post.jpg"
    ],
    categoryId: "cat-1",
    metadata: {
      id: "meta-pack-hotel",
      weight: 130,
      composition: "100% Coton Peigné Naturel — Percale 300 Fils",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-pk-90-blanc",
        sku: "HOTEL-PACK-90-BLC",
        colorNameFr: "Blanc Hôtelier",
        colorNameEn: "Optic Hotel White",
        colorHex: "#ffffff",
        size: "90x200 cm",
        stockLevel: 100.0,
        dyeLots: []
      },
      {
        id: "var-pk-160-blanc",
        sku: "HOTEL-PACK-160-BLC",
        colorNameFr: "Blanc Hôtelier",
        colorNameEn: "Optic Hotel White",
        colorHex: "#ffffff",
        size: "160x200 cm",
        stockLevel: 150.0,
        dyeLots: []
      },
      {
        id: "var-pk-180-blanc",
        sku: "HOTEL-PACK-180-BLC",
        colorNameFr: "Blanc Hôtelier",
        colorNameEn: "Optic Hotel White",
        colorHex: "#ffffff",
        size: "180x200 cm",
        stockLevel: 120.0,
        dyeLots: []
      },
      {
        id: "var-pk-200-blanc",
        sku: "HOTEL-PACK-200-BLC",
        colorNameFr: "Blanc Hôtelier",
        colorNameEn: "Optic Hotel White",
        colorHex: "#ffffff",
        size: "200x200 cm",
        stockLevel: 80.0,
        dyeLots: []
      }
    ]
  },
  {
    id: "couette-hiver-anti-acariens",
    slug: "couette-hiver-anti-acariens",
    nameFr: "Couette Hôtelière Hiver Anti-Acariens SANITIZED®",
    nameEn: "Anti-Dust Mite Hotel Winter Duvet SANITIZED®",
    descriptionFr: "Une couette 100% confort, traitée anti-acariens pour passer un hiver bien au chaud. Piquage carreaux cloisonnés anti-pont thermique, enveloppe pur coton respirante et garnissage microfibre sensation duvet d'oie 400g/m².",
    descriptionEn: "100% comfort duvet, anti-dust mite treated for cozy warm winter nights. Baffle-box construction with zero cold spots, pure breathable cotton shell and 400g/m² down-feel microfiber fill.",
    type: "FINISHED_GOOD",
    basePrice: 119.0,
    image: "/catalogues/collection-hiver-post.jpg",
    gallery: [
      "/gallery/duvet_cover_linen_1791048696631.jpg",
      "/gallery/bed_throw_textured_1791048657945.jpg",
      "/catalogues/collection-hiver-post.jpg"
    ],
    categoryId: "cat-1",
    metadata: {
      id: "meta-couette-hiver",
      weight: 400,
      composition: "Enveloppe 100% Coton Percale — Garnissage Microfibre Siliconée 400g/m²",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-couette-140-blanc",
        sku: "COUETTE-HIV-140",
        colorNameFr: "Blanc Neige",
        colorNameEn: "Snow White",
        colorHex: "#ffffff",
        size: "140x200 cm",
        stockLevel: 75.0,
        dyeLots: []
      },
      {
        id: "var-couette-200-blanc",
        sku: "COUETTE-HIV-200",
        colorNameFr: "Blanc Neige",
        colorNameEn: "Snow White",
        colorHex: "#ffffff",
        size: "200x200 cm",
        stockLevel: 90.0,
        dyeLots: []
      },
      {
        id: "var-couette-240-blanc",
        sku: "COUETTE-HIV-240",
        colorNameFr: "Blanc Neige",
        colorNameEn: "Snow White",
        colorHex: "#ffffff",
        size: "240x220 cm",
        stockLevel: 140.0,
        dyeLots: []
      },
      {
        id: "var-couette-260-blanc",
        sku: "COUETTE-HIV-260",
        colorNameFr: "Blanc Neige",
        colorNameEn: "Snow White",
        colorHex: "#ffffff",
        size: "260x240 cm",
        stockLevel: 65.0,
        dyeLots: []
      }
    ]
  },
  {
    id: "parure-collection-privee-matieres-nobles",
    slug: "parure-collection-privee-matieres-nobles",
    nameFr: "Parure Royale Satin 800 Fils — Collection Privée",
    nameEn: "Royal 800 TC Sateen Set — Private Collection",
    descriptionFr: "L'excellence des matières nobles. 100% coton peigné pur, satin 800 fils d'une douceur liquide incomparable, finitions double bourdon d'artisan et broderie monogramme personnalisée.",
    descriptionEn: "The excellence of noble materials. 100% pure combed cotton, liquid soft 800 TC sateen, artisan double-bourdon hem and bespoke monogram option.",
    type: "FINISHED_GOOD",
    basePrice: 239.0,
    image: "/catalogues/collection-privee-post.jpg",
    gallery: [
      "/gallery/bed_set_satin_1791048686563.jpg",
      "/gallery/bedroom_lifestyle_1791052936092.jpg",
      "/catalogues/collection-privee-post.jpg"
    ],
    categoryId: "cat-1",
    metadata: {
      id: "meta-privee-satin",
      weight: 155,
      composition: "100% Coton Peigné Extra-Long Staple — Satin 800 Fils",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-privee-160-blanc",
        sku: "PRIVEE-SAT800-160-BLC",
        colorNameFr: "Blanc Calcaire",
        colorNameEn: "Limestone White",
        colorHex: "#fafaf8",
        size: "160x200 cm",
        stockLevel: 35.0,
        dyeLots: []
      },
      {
        id: "var-privee-180-blanc",
        sku: "PRIVEE-SAT800-180-BLC",
        colorNameFr: "Blanc Calcaire",
        colorNameEn: "Limestone White",
        colorHex: "#fafaf8",
        size: "180x200 cm",
        stockLevel: 45.0,
        dyeLots: []
      },
      {
        id: "var-privee-180-terra",
        sku: "PRIVEE-SAT800-180-TER",
        colorNameFr: "Terracotta Palais",
        colorNameEn: "Palace Terracotta",
        colorHex: "#a65a42",
        size: "180x200 cm",
        stockLevel: 25.0,
        dyeLots: []
      },
      {
        id: "var-privee-200-blanc",
        sku: "PRIVEE-SAT800-200-BLC",
        colorNameFr: "Blanc Calcaire",
        colorNameEn: "Limestone White",
        colorHex: "#fafaf8",
        size: "200x200 cm",
        stockLevel: 30.0,
        dyeLots: []
      }
    ]
  },
  {
    id: "pack-linge-de-bain-600g",
    slug: "pack-linge-de-bain-600g",
    nameFr: "Pack Linge de Bain Hôtelier 600g (7 Pièces)",
    nameEn: "Hotel Bath Linen Pack 600g (7 Pieces)",
    descriptionFr: "L'ensemble de bain de référence pour Riads, Hôtels et Airbnb. Comprend 2 maxi draps de bain 100x150cm, 2 serviettes toilette 50x90cm, 2 serviettes invités 30x30cm et 1 tapis 800g/m². 100% coton peigné 600g, absorption 3 secondes.",
    descriptionEn: "Benchmark bath linen bundle for Riads, Hotels and Airbnb. Includes 2 maxi bath sheets 100x150cm, 2 hand towels 50x90cm, 2 guest washcloths 30x30cm and 1 heavyweight 800g mat. 100% combed cotton 600g.",
    type: "FINISHED_GOOD",
    basePrice: 91.0,
    image: "/catalogues/linge-de-bain-post.jpg",
    gallery: [
      "/gallery/bath_towels_set_1791048635743.jpg",
      "/gallery/bathrobe_velour_1791048626440.jpg",
      "/catalogues/linge-de-bain-post.jpg"
    ],
    categoryId: "cat-2",
    metadata: {
      id: "meta-pack-bain-600",
      weight: 600,
      composition: "100% Coton Peigné Égyptien Bouclette Double Torsion 600g/m²",
      minOrderLength: 1.0,
      cutIncrement: 1.0
    },
    variants: [
      {
        id: "var-bain600-blanc",
        sku: "BAIN-600-PACK-BLC",
        colorNameFr: "Blanc Pur Hôtelier",
        colorNameEn: "Pure Spa White",
        colorHex: "#ffffff",
        size: "Pack 7 Pièces (30x30, 50x90, 100x150, Tapis)",
        stockLevel: 120.0,
        dyeLots: []
      },
      {
        id: "var-bain600-sauge",
        sku: "BAIN-600-PACK-SGE",
        colorNameFr: "Vert Sauge Eucalyptus",
        colorNameEn: "Eucalyptus Sage",
        colorHex: "#8a9a86",
        size: "Pack 7 Pièces (30x30, 50x90, 100x150, Tapis)",
        stockLevel: 80.0,
        dyeLots: []
      },
      {
        id: "var-bain600-sable",
        sku: "BAIN-600-PACK-SAB",
        colorNameFr: "Crème & Sable d'Agafay",
        colorNameEn: "Cream & Agafay Sand",
        colorHex: "#e4d9c7",
        size: "Pack 7 Pièces (30x30, 50x90, 100x150, Tapis)",
        stockLevel: 70.0,
        dyeLots: []
      },
      {
        id: "var-bain600-olive",
        sku: "BAIN-600-PACK-OLV",
        colorNameFr: "Kaki Olive Ourika",
        colorNameEn: "Ourika Olive Green",
        colorHex: "#5c644e",
        size: "Pack 7 Pièces (30x30, 50x90, 100x150, Tapis)",
        stockLevel: 55.0,
        dyeLots: []
      },
      {
        id: "var-bain600-bleu",
        sku: "BAIN-600-PACK-BLU",
        colorNameFr: "Bleu Nuit Majorelle",
        colorNameEn: "Majorelle Navy Blue",
        colorHex: "#1f2b42",
        size: "Pack 7 Pièces (30x30, 50x90, 100x150, Tapis)",
        stockLevel: 45.0,
        dyeLots: []
      }
    ]
  },

  // LINGE DE LIT (CLASSIQUE)
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
