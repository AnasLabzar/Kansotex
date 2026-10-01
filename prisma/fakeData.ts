export const fakeCategories = [
  {
    id: "cat-1",
    slug: "tissus-ameublement",
    name: "Tissus d'Ameublement",
    description: "Tissus haut de gamme pour canapés, fauteuils et rideaux."
  },
  {
    id: "cat-2",
    slug: "tissus-outdoor",
    name: "Tissus Outdoor",
    description: "Tissus résistants aux UV et à l'eau pour l'extérieur."
  },
  {
    id: "cat-3",
    slug: "linge-maison",
    name: "Linge de Maison",
    description: "Draps, housses et accessoires en lin et coton."
  }
];

export const fakeProducts = [
  {
    id: "prod-1",
    slug: "velours-cotele-paris",
    name: "Velours Côtelé Paris",
    description: "Un velours côtelé élégant, d'une douceur exceptionnelle. Idéal pour la confection de canapés et fauteuils contemporains. Sa texture riche apporte profondeur et chaleur à tout intérieur haut de gamme.",
    type: "FABRIC_BY_METER",
    basePrice: 45.0, 
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
    categoryId: "cat-1",
    metadata: {
      id: "meta-1",
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
        id: "var-1-bleu",
        sku: "VEL-PAR-BLU",
        colorName: "Bleu Nuit",
        colorHex: "#1a2530",
        stockLevel: 150.0,
        dyeLots: [
          { lotNumber: "L-2026-001", stockLength: 100.0 },
          { lotNumber: "L-2026-002", stockLength: 50.0 }
        ]
      },
      {
        id: "var-1-terracotta",
        sku: "VEL-PAR-TER",
        colorName: "Terracotta",
        colorHex: "#e2725b",
        stockLevel: 80.0,
        dyeLots: [
          { lotNumber: "L-2026-003", stockLength: 80.0 }
        ]
      }
    ]
  },
  {
    id: "prod-2",
    slug: "lin-lave-outdoor-capri",
    name: "Toile Outdoor Capri",
    description: "Toile haute performance traitée déperlante et anti-UV. Une résistance exceptionnelle aux éléments tout en conservant le toucher naturel d'un lin brut. Parfait pour vos bains de soleil, coussins de terrasse et voilages d'extérieur.",
    type: "FABRIC_BY_METER",
    basePrice: 58.0,
    image: "/gallery/Kansotex-outdoor-tissus-pinterest.jpg",
    categoryId: "cat-2",
    metadata: {
      id: "meta-2",
      laize: 160,
      raccordV: 15,
      raccordH: 15,
      isHalfDrop: false,
      martindale: 45000,
      weight: 320,
      composition: "100% Acrylique Teint Masse (Sunbrella)",
      minOrderLength: 1.0,
      cutIncrement: 0.1
    },
    variants: [
      {
        id: "var-2-raye",
        sku: "OUT-CAP-RAY",
        colorName: "Sable / Écru",
        colorHex: "#e8ddce",
        stockLevel: 210.0,
        dyeLots: [
          { lotNumber: "L-2026-004", stockLength: 210.0 }
        ]
      }
    ]
  },
  {
    id: "prod-3",
    slug: "bouclette-alpes",
    name: "Tissu Bouclette Alpes",
    description: "L'iconique tissu bouclette, revisité avec des fibres techniques pour une résilience absolue. Son aspect moutonné et son confort enveloppant en font le choix privilégié des décorateurs pour les assises sculpturales organiques.",
    type: "FABRIC_BY_METER",
    basePrice: 75.0,
    image: "/gallery/Kansotex-indoor-living-room-pinterest.png",
    categoryId: "cat-1",
    metadata: {
      id: "meta-3",
      laize: 138,
      raccordV: 0,
      raccordH: 0,
      isHalfDrop: false,
      martindale: 100000,
      weight: 620,
      composition: "35% Laine, 30% Acrylique, 25% PES, 10% Coton",
      minOrderLength: 2.0, // Specific rule
      cutIncrement: 0.5  // Must order by 0.5 increments
    },
    variants: [
      {
        id: "var-3-creme",
        sku: "BOU-ALP-CRE",
        colorName: "Crème d'Ivoire",
        colorHex: "#f2f0e6",
        stockLevel: 45.0,
        dyeLots: [
          { lotNumber: "L-2026-005", stockLength: 45.0 }
        ]
      },
      {
        id: "var-3-taupe",
        sku: "BOU-ALP-TAU",
        colorName: "Taupe Grisé",
        colorHex: "#8b857c",
        stockLevel: 120.0,
        dyeLots: [
          { lotNumber: "L-2026-006", stockLength: 120.0 }
        ]
      }
    ]
  },
  {
    id: "prod-4",
    slug: "jacquard-atlas",
    name: "Jacquard Atlas Héritage",
    description: "Inspiré de l'artisanat marocain, ce Jacquard majestueux tissé en double chaîne révèle des motifs géométriques subtils. Idéal pour des rideaux lourds au tombé magistral ou des pièces de tapisserie maîtresses.",
    type: "FABRIC_BY_METER",
    basePrice: 110.0, 
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png",
    categoryId: "cat-1",
    metadata: {
      id: "meta-4",
      laize: 145,
      raccordV: 64, // Big pattern repeat
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
        id: "var-4-or",
        sku: "JAC-ATL-OR",
        colorName: "Fil d'Or",
        colorHex: "#d4af37",
        stockLevel: 90.0,
        dyeLots: [
          { lotNumber: "L-2026-007", stockLength: 90.0 }
        ]
      }
    ]
  }
];
