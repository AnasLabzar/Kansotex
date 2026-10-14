export interface BlogAuthor {
  name: string;
  role: string;
  roleEn?: string;
  avatar: string;
  bio: string;
  bioEn?: string;
}

export interface BlogSection {
  id: string;
  heading: string;
  headingEn?: string;
  content: string;
  contentEn?: string;
  image?: {
    url: string;
    alt: string;
    altEn?: string;
    caption?: string;
    captionEn?: string;
  };
  callout?: {
    type: "tip" | "warning" | "expert" | "atelier";
    title: string;
    titleEn?: string;
    text: string;
    textEn?: string;
  };
  quote?: {
    text: string;
    textEn?: string;
    author: string;
    role: string;
    roleEn?: string;
  };
}

export interface TechnicalTableRow {
  metric: string;
  metricEn?: string;
  kansotexSpec: string;
  kansotexSpecEn?: string;
  standardMarket: string;
  standardMarketEn?: string;
  practicalImpact: string;
  practicalImpactEn?: string;
}

export type TechnicalRow = TechnicalTableRow;

export interface TechnicalTable {
  caption: string;
  captionEn?: string;
  rows: TechnicalTableRow[];
}

export interface RelatedProduct {
  name: string;
  nameEn?: string;
  category: string;
  categoryEn?: string;
  highlight: string;
  highlightEn?: string;
  image: string;
  slug: string;
}

export interface BlogFAQ {
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  titleEn?: string;
  kicker: string;
  kickerEn?: string;
  excerpt: string;
  excerptEn?: string;
  category: "Outdoor & Terrasses" | "Matières Nobles" | "Guides & Mesures" | "Architecture & Riads" | "Savoir-Faire";
  categorySlug: "outdoor" | "matieres" | "guides" | "architecture" | "savoir-faire";
  coverImage: string;
  coverAlt: string;
  coverAltEn?: string;
  readingTime: string;
  readingTimeEn?: string;
  publishedAt: string;
  updatedAt?: string;
  author: BlogAuthor;
  seoKeywords: string[];
  metaDescription: string;
  metaDescriptionEn?: string;
  tableOfContents: { id: string; title: string; titleEn?: string }[];
  sections: BlogSection[];
  technicalTable?: TechnicalTable;
  faqs: BlogFAQ[];
  relatedProductSlug?: string;
  relatedProducts?: RelatedProduct[];
  pinterestUrl?: string;
  ctaText?: string;
  ctaTextEn?: string;
  ctaUrl?: string;
}

export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  "atelier": {
    "name": "Maître Hassan & L'Atelier Kansotex",
    "role": "Direction Technique de Confection — Marrakech",
    "roleEn": "Technical Master Upholsterer & Manufacturing Director — Marrakech",
    "avatar": "/gallery/accompagnement-equipe-kansotex.jpg",
    "bio": "Plus de 25 ans d'expertise dans le tissage traditionnel et la haute tapisserie d'ameublement in & outdoor à Marrakech. Conseille architectes et riads de prestige.",
    "bioEn": "Over 25 years of master craftsmanship in traditional weaving and luxury in & outdoor upholstery in Marrakech. Technical advisor to luxury riads and architects."
  },
  "studio": {
    "name": "Studio Design Kansotex",
    "role": "Bureau d'Études Textiles & Projets B2B",
    "roleEn": "Textile Engineering Office & B2B Hospitality Projects",
    "avatar": "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
    "bio": "Accompagne maîtres d'œuvre, hôteliers et décorateurs dans l'élaboration de dossiers techniques, choix de fibres durables et confections sur-mesure.",
    "bioEn": "Advises prime contractors, hoteliers, and interior architects in creating technical specifications, durable fiber curation, and bespoke custom manufacturing."
  }
};

export const BLOG_POSTS: BlogPost[] = [
  {
    "slug": "guide-tissus-outdoor-marrakech-riads-rooftops",
    "title": "Le Guide Ultime des Tissus Outdoor pour Riads & Rooftops à Marrakech : Résister au Soleil Intense sans Compromis Esthétique",
    "titleEn": "The Ultimate Guide to Outdoor Fabrics for Riads & Rooftops in Marrakech",
    "kicker": "Haute Performance & Climat de l'Atlas",
    "excerpt": "Sous le soleil de Marrakech et les amplitudes thermiques du Haut-Atlas, habiller un rooftop ou un patio de riad exige des fibres techniques d'exception. Analyse des indices UV, déperlance téflonée et mousses réticulées.",
    "excerptEn": "Under the Marrakech sun and intense Atlas UV index, dressing a luxury rooftop or riad patio requires exceptional technical textiles.",
    "category": "Outdoor & Terrasses",
    "categorySlug": "outdoor",
    "coverImage": "/gallery/Kansotex-outdoor-terasse-rooftop.webp",
    "coverAlt": "Banquettes et coussins outdoor Kansotex sur un rooftop ensoleillé face à l'Atlas à Marrakech",
    "publishedAt": "2026-10-10T09:00:00.000Z",
    "readingTime": "9 min",
    "author": {
      "name": "Maître Hassan & L'Atelier Kansotex",
      "role": "Direction Technique de Confection — Marrakech",
      "avatar": "/gallery/accompagnement-equipe-kansotex.jpg",
      "bio": "Plus de 25 ans d'expertise dans le tissage traditionnel et la haute tapisserie d'ameublement in & outdoor à Marrakech. Conseille architectes et riads de prestige."
    },
    "metaDescription": "Guide expert sur les tissus outdoor à Marrakech : résistance UV Grade 8/8, déperlance téflonée, mousses drainantes QuickDry et confections sur-mesure pour riads.",
    "metaDescriptionEn": "Expert guide on luxury outdoor textiles in Marrakech: UV Grade 8/8, Teflon water repellency, QuickDry foam and custom riad bespoke sewing.",
    "seoKeywords": [
      "tissu outdoor marrakech",
      "toile déperlante riad",
      "tissu rooftop marrakech",
      "tissu acrylique teinté masse",
      "banquette outdoor sur mesure maroc",
      "mousse drainante quickdry marrakech",
      "résistance uv tissu extérieur"
    ],
    "pinterestUrl": "https://www.pinterest.com/kansotex",
    "tableOfContents": [
      {
        "id": "le-defi-climatique",
        "title": "1. Le défi climatique unique de Marrakech",
        "titleEn": "1. The unique climate challenge of Marrakech for outdoor fabrics"
      },
      {
        "id": "acrylique-vs-polyester",
        "title": "2. Acrylique teinté dans la masse vs Polyester standard",
        "titleEn": "2. Solution-Dyed Acrylic vs Standard Polyester"
      },
      {
        "id": "tableau-comparatif",
        "title": "3. Tableau comparatif des performances techniques",
        "titleEn": "3. Technical Performance Comparison Table"
      },
      {
        "id": "mousses-et-respirabilite",
        "title": "4. Mousses drainantes & respirabilité sous les coussins",
        "titleEn": "4. Drainable foams & airflow under outdoor cushions"
      },
      {
        "id": "choix-des-teintes",
        "title": "5. Quelle palette chromatique face à la réverbération ocre ?",
        "titleEn": "5. Which color palette against ochre glare?"
      },
      {
        "id": "confection-atelier",
        "title": "6. Les secrets de couture de notre atelier de Marrakech",
        "titleEn": "6. Sewing secrets from our Marrakech workshop"
      },
      {
        "id": "faq-outdoor",
        "title": "7. Foire Aux Questions (FAQ)",
        "titleEn": "7. Frequently Asked Questions (FAQ)"
      }
    ],
    "technicalTable": {
      "caption": "Étude comparative : Tissus Outdoor Kansotex vs Toiles d'Extérieur Entrée de Gamme",
      "rows": [
        {
          "metric": "Solidité des coloris à la lumière (ISO 105-B02)",
          "kansotexSpec": "Grade 7-8 / 8 (Teinture dans la masse)",
          "standardMarket": "Grade 4-5 / 8 (Teinture de surface)",
          "practicalImpact": "Conserve l'intensité des teintes pendant 8 à 10 ans sans décoloration au soleil marocain.",
          "metricEn": "Color fastness to artificial light (ISO 105-B02)",
          "kansotexSpecEn": "Grade 7-8 / 8 (Solution-Dyed)",
          "standardMarketEn": "Grade 4-5 / 8 (Surface printed/dyed)",
          "practicalImpactEn": "Retains deep, luminous color intensity for 8 to 10 years without bleaching under the Moroccan sun."
        },
        {
          "metric": "Résistance à l'abrasion (Test Martindale)",
          "kansotexSpec": "45 000 à 60 000 tours",
          "standardMarket": "15 000 à 20 000 tours",
          "practicalImpact": "Supporte les frottements intensifs en hôtellerie, terrasses de restaurant et suites de riad.",
          "metricEn": "Abrasion resistance (Martindale Test)",
          "kansotexSpecEn": "45,000 to 60,000 rubs",
          "standardMarketEn": "15,000 to 20,000 rubs",
          "practicalImpactEn": "Endures heavy commercial traffic in boutique hotels, restaurant terraces, and riad suites."
        },
        {
          "metric": "Traitement déperlant & oléophobe",
          "kansotexSpec": "Enduction Téflon® EcoElite fluor-free",
          "standardMarket": "Traitement spray temporaire",
          "practicalImpact": "L'eau perle à la surface et n'imprègne pas la fibre. Résiste aux taches de café et thé à la menthe.",
          "metricEn": "Water & oil-repellent finish",
          "kansotexSpecEn": "Teflon® EcoElite fluor-free repellent coating",
          "standardMarketEn": "Temporary aerosol spray finish",
          "practicalImpactEn": "Water beads across the surface without penetrating the core yarn. Resists espresso, wine, and mint tea spills."
        },
        {
          "metric": "Séchage & Anti-moisissure",
          "kansotexSpec": "Séchage ultra-rapide (20 min) + biocide actif",
          "standardMarket": "Rétention d'humidité prolongée",
          "practicalImpact": "Évite toute formation d'auréoles ou d'odeurs même après les averses d'orage de l'Atlas.",
          "metricEn": "Drying speed & Anti-mildew barrier",
          "kansotexSpecEn": "Ultra-fast drying (20 min) + active antimicrobial agent",
          "standardMarketEn": "Prolonged moisture retention & bacterial rot",
          "practicalImpactEn": "Prevents musty odors, staining, and halo rings even after torrential Atlas summer downpours."
        }
      ],
      "captionEn": "Comparative Study: Kansotex Outdoor Textiles vs Entry-Level Outdoor Canvas"
    },
    "faqs": [
      {
        "question": "Pourquoi les toiles outdoor standard blanchissent-elles si vite à Marrakech ?",
        "answer": "À Marrakech, l'indice UV atteint régulièrement 11+ entre mai et septembre. Les tissus ordinaires sont simplement imprimés ou teints en surface : le rayonnement UV brise les molécules de pigment superficielles en quelques semaines. Chez Kansotex, nos toiles outdoor sont tissées à partir de fibres acryliques teintées dans la masse (solution-dyed) : la couleur est injectée au cœur même du polymère liquide avant filage, garantissant une tenue inaltérable.",
        "questionEn": "Why do standard outdoor fabrics fade so rapidly in Marrakech?",
        "answerEn": "In Marrakech, the UV index consistently hits 11+ between May and September. Generic textiles are merely piece-dyed or surface-printed: harsh solar radiation breaks superficial pigment molecules within weeks. Kansotex outdoor textiles are spun from 100% solution-dyed acrylic fibers: UV-resistant mineral pigments are locked directly into the liquid polymer core before yarn extrusion, guaranteeing lifetime color fidelity."
      },
      {
        "question": "Quelle mousse associer à vos tissus outdoor pour les assises de terrasse ?",
        "answer": "Nous recommandons impérativement une mousse réticulée drainante à cellules ouvertes type QuickDry Foam (densité 30 à 35 kg/m³). Associée à nos toiles déperlantes et une sous-face en maille aérée (batyline ou résille technique), l'eau traverse instantanément le coussin sans stagner, permettant une réutilisation 30 minutes après une ondée.",
        "questionEn": "Which foam core should be paired with outdoor fabrics for terrace seating?",
        "answerEn": "We strictly recommend reticulated open-cell drainable foam such as QuickDry / Dryfeel Foam (30 to 35 kg/m³ density). Paired with our water-repellent canvases and a micro-mesh breathable bottom panel, rainwater channels straight through the seat without pooling, allowing cushions to be dry and ready for guests within 30 minutes after rain."
      },
      {
        "question": "Comment entretenir vos tissus outdoor face à la poussière du Chergui ?",
        "answer": "Un simple brossage à sec régulier avec une brosse souple suffit pour éliminer la poussière du Chergui. Pour un nettoyage complet, une eau tiède avec un savon doux de Marseille (ou liquide vaisselle neutre) rincée à l'eau claire au jet d'arrosage redonne à l'étoffe son éclat d'origine sans altérer son apprêt déperlant.",
        "questionEn": "How do you maintain and clean outdoor fabrics exposed to desert dust (Chergui)?",
        "answerEn": "A routine dry brushing with a soft-bristle brush is all that is required to sweep away Chergui silica dust. For seasonal deep cleaning, mild Castile soap (or neutral dish soap) diluted in lukewarm water followed by a gentle garden hose rinse revives the fabric's original brilliance without stripping its water-repellent finish."
      }
    ],
    "relatedProducts": [
      {
        "slug": "toile-outdoor-atlas-sable",
        "name": "Toile Outdoor Atlas — Sable Ocre",
        "category": "Outdoor",
        "image": "/gallery/matiere-tissus-outdoor-rooftop.jpg",
        "highlight": "Protection UV 50+ & Déperlance active"
      },
      {
        "slug": "velours-coton-gueliz",
        "name": "Velours Peigné Guéliz",
        "category": "Indoor",
        "image": "/gallery/tissus-haut-de-gamme.webp",
        "highlight": "Martindale 50 000 tours"
      }
    ],
    "sections": [
      {
        "id": "le-defi-climatique",
        "heading": "1. Le défi climatique unique de Marrakech pour les étoffes d'extérieur",
        "content": "À Marrakech, la beauté envoûtante des terrasses et patios dissimule un véritable banc d'essai pour le textile. Avec plus de 300 jours d'ensoleillement par an, un indice UV dépassant fréquemment 11 au zénith et des écarts de température pouvant osciller de 15°C la nuit à 45°C le jour en période estivale, les toiles d'extérieur subissent une agression photochimique extrême.\n\nAjoutez à cela le vent du désert — le fameux *Chergui* — qui transporte des microparticules de sable siliceux abrasives, ainsi que les violents orages de fin d'été descendant du djebel Toubkal. Choisir un tissu d'ameublement outdoor pour un riad de la Médina, une villa de la Palmeraie ou un hôtel boutique de l'Hivernage ne relève donc pas d'une simple décision décorative : c'est un calcul d'ingénierie textile rigoureux.",
        "callout": {
          "title": "Le constat de notre atelier",
          "text": "Chaque année, plus de 40% des propriétaires de riads viennent nous voir après avoir acheté des toiles d'importation standard décolorées après seulement six mois. Une économie initiale apparente qui se transforme en double investissement.",
          "type": "warning",
          "titleEn": "Workshop Observation",
          "textEn": "Every year, over 40% of riad owners consult our atelier after purchasing generic imported fabrics that bleached after a single summer. An apparent upfront saving that rapidly turns into a double replacement cost."
        },
        "headingEn": "1. The unique climate challenge of Marrakech for outdoor fabrics",
        "contentEn": "In Marrakech, the enchanting beauty of rooftops and courtyard patios conceals a demanding testing ground for textiles. With over 300 days of sunshine per year, a UV index frequently exceeding 11 at solar noon, and summer temperature swings from 15°C at night to 45°C during the day, outdoor fabrics endure severe photochemical stress.\n\nAdd to this the desert wind — the famous *Chergui* — carrying abrasive silica dust particles, alongside intense end-of-summer thunderstorms rolling down from Mount Toubkal. Choosing outdoor upholstery textiles for a Medina riad, a Palmeraie villa, or an Hivernage boutique hotel is therefore not merely a decorative choice: it is a rigorous exercise in textile engineering."
      },
      {
        "id": "acrylique-vs-polyester",
        "heading": "2. Acrylique teinté dans la masse vs Polyester standard : la clé du mystère",
        "content": "La différence fondamentale entre une étoffe qui perd ses nuances en une saison et une étoffe qui traverse les décennies réside dans la technique de coloration moléculaire.\n\nSur un fil de polyester classique ou un coton enduit ordinaire, la couleur est appliquée **en surface** après le tissage (teinture en pièce ou impression au cadre). C'est le principe d'un radis : la couleur est rouge à l'extérieur, mais le cœur reste immaculé. Dès que les rayons ultraviolets attaquent la couche superficielle, le blanc apparaît et le tissu devient terne et cassant.\n\nÀ l'inverse, nos collections outdoor Kansotex sont composées de fibres **acryliques 100% teintées dans la masse**. Les pigments minéraux de haute pureté sont introduits dans la pâte de polymère avant même l'extrusion du filament. Le filament est ainsi coloré jusqu'à son cœur moléculaire, tel une carotte. Même exposé à un rayonnement zénithal ininterrompu, le tissu conserve l'intégralité de sa saturation lumineuse.",
        "quote": {
          "text": "Travailler la matière à Marrakech, c'est apprendre à dialoguer avec le soleil sans jamais tenter de tricher avec lui. Si le pigment n'est pas scellé dans le polymère, le ciel d'ocre finira toujours par l'emporter.",
          "author": "Maître Hassan",
          "role": "Chef d'atelier tapisserie Kansotex Marrakech",
          "textEn": "Working with materials in Marrakech means learning to commune with the sun rather than attempting to cut corners. If the pigment is not sealed within the polymer core, the ochre sky will always prevail.",
          "roleEn": "Master Upholsterer — Kansotex Marrakech Workshop"
        },
        "image": {
          "url": "/gallery/matiere-tissus-outdoor-rooftop.jpg",
          "alt": "Macro-tissage acrylique déperlant teinté dans la masse Kansotex avec perles d'eau",
          "caption": "Détail de notre armure sergée déperlante : l'enduction fluor-free Téflon® EcoElite repousse l'eau sans altérer le toucher naturel du fil.",
          "altEn": "Macro texture of water-repellent solution-dyed acrylic fabric with water beads",
          "captionEn": "Detail of our water-repellent twill weave: Teflon® EcoElite fluor-free repellent finish repels water droplets without compromising the natural tactile hand of the weave."
        },
        "headingEn": "2. Solution-Dyed Acrylic vs Standard Polyester: The Science of Longevity",
        "contentEn": "The fundamental difference between a textile that loses its vibrancy in one season and one that endures for decades lies in its molecular coloration technology.\n\nOn conventional polyester or generic coated cotton, color is applied **on the surface** after weaving (piece dyeing or roll printing). It is akin to a radish: vivid red on the outside, but white at its core. As soon as ultraviolet rays degrade the outer layer, the white core shows through, leaving the fabric faded and brittle.\n\nIn contrast, Kansotex outdoor collections are woven from **100% solution-dyed acrylic fibers**. High-purity mineral pigments are injected into the liquid polymer solution before filament extrusion. The filament is thus colored straight through to its molecular core, like a carrot. Even under unbroken Atlas sunlight, the fabric retains its full saturation and textural integrity."
      },
      {
        "id": "tableau-comparatif",
        "heading": "3. Tableau comparatif des performances techniques",
        "content": "Pour guider les prescripteurs, architectes d'intérieur et maîtres d'ouvrage, nos ingénieurs ont synthétisé les normes techniques indispensables à exiger lors de la rédaction de vos cahiers des charges :",
        "headingEn": "3. Technical Performance Comparison Table",
        "contentEn": "To assist interior architects, procurement directors, and riad owners in establishing robust technical specifications, our engineering team has summarized the essential performance benchmarks:"
      },
      {
        "id": "mousses-et-respirabilite",
        "heading": "4. Mousses drainantes & respirabilité sous les coussins",
        "content": "Un tissu exceptionnel ne suffit pas si l'âme du coussin retient l'eau. Trop de projets de terrasses à Marrakech souffrent d'assises détrempées pendant des jours après un orage, favorisant l'apparition de moisissures sous la housse.\n\nDans notre atelier de la Route de Safi, nous confectionnons systématiquement les assises outdoor avec une double règle d'art :\n1. **Âme en mousse réticulée drainante** : Contrairement aux mousses polyuréthane traditionnelles dont les cellules fermées retiennent l'eau comme une éponge, la mousse réticulée possède une structure alvéolaire 100% ouverte permettant à l'eau de s'écouler librement par gravité.\n2. **Sous-face respirante en résille technique** : Le dessous de nos galettes d'assise intègre un panneau en maille micro-perforée qui permet à l'air de circuler en permanence, évitant l'effet de condensation entre le tissu et la structure métallique ou en zellige.",
        "image": {
          "url": "/gallery/Kansotex-outdoor-terasse-rooftop-2.webp",
          "alt": "Détail de confection d'assise outdoor drainante dans un riad à Marrakech",
          "caption": "Banquettes d'angle sur-mesure confectionnées par Kansotex avec mousse réticulée et tissu outdoor teinté dans la masse.",
          "altEn": "Detail of drainable outdoor seating craftsmanship in a luxury Marrakech riad",
          "captionEn": "Bespoke corner modular seating crafted by Kansotex with reticulated Dryfeel foam and solution-dyed outdoor textiles."
        },
        "headingEn": "4. Drainable Foams & Airflow Architecture Under Outdoor Cushions",
        "contentEn": "An exceptional fabric is futile if the cushion core traps moisture. Far too many terrace installations in Marrakech suffer from waterlogged seating days after a storm, fostering mildew growth inside the casing.\n\nIn our Route de Safi atelier, we systematically build outdoor seating following two gold standards:\n1. **Reticulated Open-Cell Drainable Core**: Unlike conventional polyurethane foams whose closed cells trap water like a sponge, reticulated foam features a 100% open-cell honeycomb architecture that allows water to drain freely by gravity.\n2. **Breathable Technical Mesh Underside**: The bottom face of our seat pads incorporates a micro-perforated mesh panel that allows air to circulate constantly, preventing condensation build-up between the cushion and the wrought iron or zellige base."
      },
      {
        "id": "choix-des-teintes",
        "heading": "5. Quelle palette chromatique face à la réverbération ocre de Marrakech ?",
        "content": "L'environnement architectural de Marrakech impose une réflexion chromatique particulière. La ville rouge possède une lumière chaude et puissante, renvoyée par les enduits de chaux, le pisé et le tadelakt.\n\nVoici les recommandations de notre studio de design :\n- **Les Sables Chauds & Écru Naturel** : La teinte idéale pour les grandes assises de rooftop. Elle capte peu la chaleur, s'intègre harmonieusement au plâtre sculpté et ne révèle pas la fine poussière du désert.\n- **Le Vert Oasis & Palmier** : Parfait pour créer des îlots de fraîcheur visuelle dans un patio minéral. Notre velours outdoor et notre toile sergé vert sauge créent un dialogue immédiat avec les orangers et les bananiers du riad.\n- **Le Terracotta & Terre de Sienne** : Une couleur identitaire de Marrakech qui sublime les couchers de soleil sur la Koutoubia. À réserver de préférence pour les coussins d'accent et les jetés de banquette afin de structurer l'espace sans alourdir le volume.",
        "callout": {
          "title": "Astuce thermique de l'Atelier",
          "text": "Évitez le noir absolu et le bleu marine très foncé sur des assises en plein soleil direct sans ombrage : ces teintes peuvent emmagasiner jusqu'à 65°C de température de surface en milieu d'après-midi en juillet.",
          "type": "tip",
          "titleEn": "Atelier Thermal Tip",
          "textEn": "Avoid pitch black or midnight navy on unshaded sun loungers in direct sunlight: dark synthetic fibers can heat up to 65°C under July midday sun."
        },
        "headingEn": "5. Which Color Palette Against the Ochre Glare of Marrakech?",
        "contentEn": "The architectural landscape of Marrakech calls for thoughtful chromatic curation. The Red City possesses intense, warm sunlight reflected off lime plaster, rammed earth, and polished tadelakt.\n\nOur design studio recommends:\n- **Warm Sands & Natural Ecru**: The quintessential hue for grand rooftop banquettes. It absorbs minimal heat, harmonizes with carved plasterwork, and conceals fine desert dust.\n- **Oasis & Palm Green**: Ideal for creating refreshing visual sanctuaries in mineral courtyards. Our outdoor velvet and sage green twill establish an organic dialogue with riad orange trees and banana palms.\n- **Terracotta & Burnt Sienna**: An iconic Marrakech signature that mirrors sunset over the Koutoubia minaret. Best reserved for accent cushions and throws to structure the space without visually overwhelming the volume."
      },
      {
        "id": "confection-atelier",
        "heading": "6. Les secrets de couture de notre atelier de Marrakech",
        "content": "La longévité d'un aménagement outdoor ne dépend pas seulement du tissu, mais de la manière dont il est assemblé :\n- **Fils à coudre 100% PTFE / Polyéthylène haute ténacité** : Un fil ordinaire en coton ou polyester se désagrège sous les UV bien avant que le tissu ne fatigue. Nos coutures sont piquées avec des fils imputrescibles garantis 10 ans contre les rayons ultraviolets.\n- **Fermetures éclair invisibles avec rabat de protection** : Toutes nos glissières sont dissimulées sous un ourlet pare-soleil qui protège les maillons de la poussière siliceuse et des rayons directs.\n- **Surpiqûres rabattues étanches** : Chaque panneau d'assise subit une double piqûre rabattue qui empêche l'eau de pluie de pénétrer par les perforations de l'aiguille.",
        "quote": {
          "text": "Une bonne housse doit pouvoir être déhoussée et lavée cent fois sans jamais perdre sa géométrie d'origine. C'est l'exigence que nous maintenons pour chaque maître d'ouvrage qui nous confie son établissement.",
          "author": "Studio Kansotex",
          "role": "Bureau de Confection Sur-Mesure",
          "textEn": "A high-performance outdoor cushion cover must withstand a hundred laundry cycles without distorting its architectural lines. That is the exact standard we deliver to every project owner who entrusts their property to Kansotex.",
          "roleEn": "Bespoke Manufacturing Bureau"
        },
        "headingEn": "6. Master Tailoring Secrets from Our Marrakech Workshop",
        "contentEn": "The longevity of an outdoor layout depends as much on bespoke assembly as on raw textile quality:\n- **100% High-Tenacity PTFE Sewing Threads**: Standard cotton or nylon threads break down under intense UV long before the canvas tires. Our seams are stitched with rot-proof threads guaranteed for 10 years against UV degradation.\n- **Concealed Marine Zippers with Protective Storm Flaps**: All zippers are shielded beneath an overlapping fabric flap that protects teeth from abrasive sand and direct radiation.\n- **Double French Seams**: Every seating panel is engineered with reinforced flat-felled double stitching to prevent water ingress through needle perforations."
      },
      {
        "id": "faq-outdoor",
        "heading": "7. Foire Aux Questions (FAQ)",
        "content": "Retrouvez ci-dessous les réponses aux interrogations les plus fréquentes formulées par nos clients architectes et particuliers lors de l'aménagement de leurs espaces extérieurs.",
        "headingEn": "7. Frequently Asked Questions (FAQ)",
        "contentEn": "Find answers below to the most common technical questions raised by architects and estate owners when furnishing outdoor living spaces in Morocco."
      }
    ],
    "coverAltEn": "Kansotex outdoor banquettes and cushions on a sunlit rooftop facing the Atlas in Marrakech"
  },
  {
    "slug": "lin-atlas-vs-velours-gueliz-rideaux-salons-suites",
    "title": "Lin d'Atlas Pré-Lavé vs Velours de Coton Peigné : Quelle Étoffe Choisir pour Vos Rideaux de Salon & Suites ?",
    "titleEn": "Atlas Pre-Washed Linen vs Combed Cotton Velvet: Which Luxury Fabric for Your Curtains & Suites?",
    "kicker": "Matières Nobles & Confection d'Exception",
    "excerpt": "Entre la légèreté vaporeuse d'un pur lin de l'Atlas au tombé plombé et l'opulence acoustique d'un velours de coton peigné, découvrez comment sélectionner la matière parfaite pour votre salon marocain contemporain ou suite royale.",
    "excerptEn": "Between the breezy elegance of pure Atlas washed linen and the acoustic opulence of combed cotton velvet, discover how to dress your luxury interior.",
    "category": "Matières Nobles",
    "categorySlug": "matieres",
    "coverImage": "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp",
    "coverAlt": "Rideaux en pur lin d'Atlas pré-lavé avec ourlet plombé artisanal dans un riad contemporain",
    "publishedAt": "2026-10-12T11:00:00.000Z",
    "readingTime": "8 min",
    "author": {
      "name": "Maître Hassan & L'Atelier Kansotex",
      "role": "Direction Technique de Confection — Marrakech",
      "avatar": "/gallery/accompagnement-equipe-kansotex.jpg",
      "bio": "Plus de 25 ans d'expertise dans le tissage traditionnel et la haute tapisserie d'ameublement in & outdoor à Marrakech. Conseille architectes et riads de prestige."
    },
    "metaDescription": "Comparatif expert entre lin pré-lavé et velours de coton pour rideaux haut de gamme à Marrakech. Isolation thermique, tombé plombé 10cm et acoustique.",
    "metaDescriptionEn": "In-depth comparison between pre-washed linen and combed cotton velvet for luxury bespoke curtains in Marrakech. Thermal and acoustic insulation.",
    "seoKeywords": [
      "rideaux lin marrakech",
      "velours de coton ameublement",
      "rideaux sur mesure marrakech",
      "tissu lin atlas lavé",
      "isolation phonique rideau velours",
      "ourlet plombé rideau confection",
      "tissu salon marocain contemporain"
    ],
    "pinterestUrl": "https://www.pinterest.com/kansotex",
    "tableOfContents": [
      {
        "id": "duel-des-matieres",
        "title": "1. Le duel de deux matières royales",
        "titleEn": "1. The duel of two noble fabrics in Moroccan architecture"
      },
      {
        "id": "lin-atlas",
        "title": "2. Le Pur Lin d'Atlas Pré-Lavé : La respiration de l'espace",
        "titleEn": "2. Pre-washed Atlas Pure Linen: The breath of space"
      },
      {
        "id": "velours-peigne",
        "title": "3. Le Velours de Coton Peigné : L'écrin thermique et acoustique",
        "titleEn": "3. Combed Cotton Velvet: Acoustic and thermal sanctuary"
      },
      {
        "id": "tableau-comparatif-indoor",
        "title": "4. Tableau comparatif : Lin vs Velours",
        "titleEn": "4. Comparative Table: Linen vs Velvet"
      },
      {
        "id": "l-art-du-tombe",
        "title": "5. L'art du tombé : Pourquoi l'ourlet plombé de 10 cm change tout",
        "titleEn": "5. The art of drape: Why the 10 cm weighted hem changes everything"
      },
      {
        "id": "recommandations-pieces",
        "title": "6. Quelle matière pour quelle pièce ?",
        "titleEn": "6. Which fabric for which room?"
      },
      {
        "id": "faq-indoor",
        "title": "7. Foire Aux Questions (FAQ)",
        "titleEn": "7. Frequently Asked Questions (FAQ)"
      }
    ],
    "technicalTable": {
      "caption": "Comparaison Technique : Lin d'Atlas Pré-Lavé Kansotex vs Velours Peigné Guéliz",
      "rows": [
        {
          "metric": "Grammage & Densité",
          "kansotexSpec": "Lin : 380 g/m² | Velours : 540 g/m²",
          "standardMarket": "Lin standard : 240 g/m² | Velours : 380 g/m²",
          "practicalImpact": "Un grammage généreux garantit un tombé sculptural droit sans faux-plis disgracieux.",
          "metricEn": "Grammage & Weight",
          "kansotexSpecEn": "Linen: 380 g/m² | Velvet: 540 g/m²",
          "standardMarketEn": "Linen: 180-240 g/m² | Velvet: 300 g/m²",
          "practicalImpactEn": "Generous fabric weight ensures an impeccable vertical drape and zero flyaway on drafty doorways."
        },
        {
          "metric": "Coefficient d'isolation phonique (NRC)",
          "kansotexSpec": "Velours : NRC 0.65 (réduction écho) | Lin : NRC 0.35",
          "standardMarket": "Tissus synthétiques fins : NRC 0.15",
          "practicalImpact": "Le velours absorbe la réverbération des murs en zellige et sols en marbre des grands volumes.",
          "metricEn": "Acoustic Noise Absorption (NRC coefficient)",
          "kansotexSpecEn": "Velvet NRC 0.65 (High dampening) | Linen NRC 0.25",
          "standardMarketEn": "Unlined synthetic: NRC 0.10",
          "practicalImpactEn": "Combed velvet eliminates harsh echoes and reverberation in high-ceiling marble and zellige living rooms."
        },
        {
          "metric": "Régulation thermique & Respirabilité",
          "kansotexSpec": "Lin : Fibre creuse thermorégulatrice active",
          "standardMarket": "Polyester : Effet de serre intérieur",
          "practicalImpact": "Le lin filtre l'air chaud en journée et conserve une sensation de fraîcheur naturelle.",
          "metricEn": "Thermal Insulation against Atlas night cold",
          "kansotexSpecEn": "Up to 30% reduction in thermal transfer with velvet double drapes",
          "standardMarketEn": "Negligible thermal barrier",
          "practicalImpactEn": "Significantly lowers winter heating needs and stabilizes bedroom temperatures during crisp Marrakech nights."
        },
        {
          "metric": "Occultation lumineuse",
          "kansotexSpec": "Lin : 60-70% (Lumière tamisée) | Velours doublé : 100% Blackout",
          "standardMarket": "Toiles simples : 40% de filtration",
          "practicalImpact": "Permet de choisir entre ambiance solaire chaleureuse ou obscurité totale pour le sommeil.",
          "metricEn": "Light filtration & Privacy",
          "kansotexSpecEn": "Linen: Soft natural diffusion | Velvet: 95% light blockout",
          "standardMarketEn": "Uneven translucency",
          "practicalImpactEn": "Choose linen for sunlit daytime living spaces; select velvet for restorative bedroom darkness."
        }
      ],
      "captionEn": "Technical Comparison: Pre-Washed Atlas Pure Linen vs Heavy Combed Cotton Velvet"
    },
    "faqs": [
      {
        "question": "Le lin ne risque-t-il pas de rétrécir après confection à Marrakech ?",
        "answer": "Le lin brut peut en effet rétrécir de 8 à 12% lors du premier nettoyage. C'est précisément pour cela que nos lins Kansotex sont pré-lavés à haute température en manufacture (stonewashed) et stabilisés dimensionnellement avant d'être coupés dans notre atelier. Vos rideaux ne bougeront pas d'un millimètre dans le temps.",
        "questionEn": "Does pure linen shrink when washed in Moroccan laundries?",
        "answerEn": "Standard raw linen can shrink up to 8% during its initial wash. Kansotex Atlas linen undergoes an industrial enzyme stonewash process prior to workshop cutting, stabilizing the fiber: residual shrinkage is capped below 1.5%. For curtains, our makers systematically factor an extra 2.5 cm hem allowance."
      },
      {
        "question": "Peut-on associer lin et velours dans un même salon ?",
        "answer": "Absolument, c'est l'un des mariages les plus raffinés préconisés par les décorateurs de renom à Marrakech. L'association classique consiste à installer des voilages ou rideaux légers en pur lin d'Atlas pour filtrer le soleil de jour, doublés de doubles-rideaux latéraux majestueux en velours de coton peigné tirés le soir pour l'intimité et le confort acoustique.",
        "questionEn": "Can linen and velvet be combined within the same room?",
        "answerEn": "It is the hallmark signature of luxury interior styling. We frequently design dual-track curtain systems: an ethereal sheer linen layer facing the courtyard to softly temper daytime glare, framed by tailored combed velvet blackout drapes pulled closed at nightfall."
      }
    ],
    "relatedProducts": [
      {
        "slug": "lin-naturel-atlas-lave",
        "name": "Pur Lin d'Atlas Pré-Lavé",
        "category": "Indoor",
        "image": "/gallery/linen_fabric_closeup_1791052926029.jpg",
        "highlight": "380 g/m² · Fibre naturelle thermorégulatrice"
      },
      {
        "slug": "velours-coton-gueliz",
        "name": "Velours Coton Peigné Guéliz",
        "category": "Indoor",
        "image": "/gallery/tissus-haut-de-gamme.webp",
        "highlight": "540 g/m² · Isolation acoustique NRC 0.65"
      }
    ],
    "sections": [
      {
        "id": "duel-des-matieres",
        "heading": "1. Le duel de deux matières royales dans l'architecture marocaine",
        "content": "Le choix des étoffes d'un intérieur ne répond pas seulement à une exigence visuelle. Il sculpte le volume sonore de la pièce, module l'intensité de la lumière naturelle et dicte la sensation tactile lorsque l'on effleure une tenture.\n\nDans les riads de la Médina comme dans les villas contemporaines d'Amelkis ou de la Palmeraie, deux étoffes incarnent le sommet de la haute tapisserie : le **Pur Lin d'Atlas Pré-Lavé** et le **Velours de Coton Peigné**. Si chacune possède sa noblesse propre, leurs propriétés physiques et leur impact sur l'atmosphère d'une pièce sont diamétralement opposés.",
        "callout": {
          "title": "Le regard de l'artisan",
          "text": "Le lin est la matière du souffle et de la lumière. Le velours est la matière du silence et de la profondeur. Choisir entre les deux, c'est décider de l'âme que vous souhaitez insuffler à votre espace.",
          "type": "atelier",
          "titleEn": "The Master Weaver's Perspective",
          "textEn": "Linen is the fiber of breath and light. Velvet is the fiber of silence and depth. Choosing between them determines the very soul you bestow upon your space."
        },
        "headingEn": "1. The duel of two noble fabrics in Moroccan architecture",
        "contentEn": "Selecting fabrics for an interior does not merely serve a visual desire. It sculpts the acoustic volume of a space, modulates natural daylight, and dictates the tactile sensation when brushing against a drape.\n\nIn Medina riads as well as contemporary villas in Amelkis or the Palmeraie, two fabrics represent the pinnacle of high upholstery: **Pre-Washed Atlas Pure Linen** and **Heavy Combed Cotton Velvet**. While both possess their own quiet aristocracy, their physical characteristics and atmospheric impacts are diametrically opposed."
      },
      {
        "id": "lin-atlas",
        "heading": "2. Le Pur Lin d'Atlas Pré-Lavé : La respiration de l'espace",
        "content": "Fibre végétale millénaire, le lin possède une structure interne alvéolaire creuse qui en fait un régulateur thermique naturel sans équivalent. Sous les latitudes ensoleillées de Marrakech, le lin filtre l'ardeur du soleil sans jamais plonger la pièce dans une obscurité artificielle.\n\nNotre lin d'Atlas se distingue par un **grammage lourd de 380 g/m²** et un traitement aux enzymes de pierre (stonewash). Ce procédé assouplit le fil de chaîne tout en révélant une texture légèrement froissée, vibrante, qui ne nécessite aucun repassage compassé.\n\nLa lumière qui traverse un rideau en lin Kansotex baigne les zelliges et les plâtres d'une clarté douce et poudrée, tout en préservant une parfaite intimité visuelle depuis l'extérieur.",
        "image": {
          "url": "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.webp",
          "alt": "Rideaux en lin dans un salon baigné de lumière naturelle à Marrakech",
          "caption": "Lin d'Atlas pré-lavé Kansotex : tombé droit et filtration de la lumière zénithale.",
          "altEn": "Pure linen curtains in a sun-drenched Marrakech living room",
          "captionEn": "Pre-washed Atlas linen by Kansotex: impeccable vertical drape and gentle powdered light diffusion."
        },
        "headingEn": "2. Pre-Washed Atlas Pure Linen: The Breath of Space",
        "contentEn": "An ancient natural fiber, linen features an internal hollow honeycomb structure that makes it an unrivaled natural thermal regulator. Under the sunny skies of Marrakech, linen filters intense solar glare without casting the room into artificial shadow.\n\nOur Atlas linen stands out with a **substantial 380 g/m² weight** and a stonewash enzyme treatment. This softens the warp yarns while revealing a softly textured, vibrant drape that requires no rigid pressing.\n\nDaylight passing through a Kansotex linen curtain bathes zellige tiles and carved plaster in a soft, powdered glow while preserving absolute visual privacy from the exterior."
      },
      {
        "id": "velours-peigne",
        "heading": "3. Le Velours de Coton Peigné : L'écrin thermique et acoustique",
        "content": "Lorsque les hauteurs sous plafond dépassent 4 mètres — situation fréquente dans les grandes réceptions et les patios couverts — la réverbération sonore devient un enjeu majeur. Les sols en marbre ou bejmat et les parois enduites renvoient les ondes acoustiques, créant un effet d'écho désagréable lors des réceptions.\n\nC'est ici que le **Velours de Coton Peigné Guéliz** déploie toute sa suprématie :\n- **Absorption phonique certifiée (NRC 0.65)** : Grâce à sa densité de poils serrés (plus de 180 000 poils au m²), le velours brise l'onde sonore et étouffe les échos indésirables.\n- **Barrière thermique contre le froid hivernal** : Les nuits d'hiver à Marrakech peuvent être particulièrement fraîches (parfois 4°C). Tirer des doubles rideaux en velours lourd de 540 g/m² crée une chambre d'air isolante qui réduit les déperditions thermiques de vos baies vitrées de près de 30%.\n- **Chatoiement sous l'éclairage nocturne** : Sous la lumière tamisée des lanternes en laiton ciselé, le velours de coton reflète des reflets profonds et voluptueux qui confèrent au salon une aura de sanctuaire aristocratique.",
        "quote": {
          "text": "Un salon sans rideaux de velours à Marrakech est comme une harpe sans caisse de résonance. C'est l'épaisseur du coton peigné qui apporte cette rondeur feutrée si caractéristique des grandes demeures impériales.",
          "author": "Studio Kansotex",
          "role": "Département Hôtellerie & Résidences Privées",
          "textEn": "A grand salon in Marrakech without velvet curtains is like a harp without a resonance chamber. The density of combed cotton provides that muted aristocratic warmth unique to imperial estates.",
          "roleEn": "Hospitality & Private Estates Division"
        },
        "image": {
          "url": "/gallery/Kansotex-indoor-living-room-pinterest.webp",
          "alt": "Double rideaux en velours de coton peigné dans un salon de réception à Marrakech",
          "caption": "Absorption acoustique (NRC 0.65) et prestance feutrée : le velours lourd 540g/m² Kansotex structure les volumes sous 4m de plafond.",
          "altEn": "Heavy combed cotton velvet curtains in a luxury reception hall",
          "captionEn": "Acoustic absorption (NRC 0.65) and tailored majesty: Kansotex heavy 540g/m² velvet structures soaring 4-meter ceiling volumes."
        },
        "headingEn": "3. Combed Cotton Velvet: Acoustic and Thermal Sanctuary",
        "contentEn": "When ceiling heights surpass 4 meters — common in grand reception salons and enclosed patios — acoustic reverberation becomes a major challenge. Marble, polished cement, and bejmat floors bounce sound waves, creating unpleasant echoes during dinners and gatherings.\n\nThis is where **Guéliz Combed Cotton Velvet** displays its full mastery:\n- **Certified Sound Absorption (NRC 0.65)**: With a dense pile count exceeding 180,000 fibers per square meter, velvet dampens sound waves and suppresses unwanted reverberation.\n- **Thermal Barrier Against Winter Chill**: Winter nights in Marrakech can drop to 4°C. Pulling closed heavy 540 g/m² velvet double drapes creates an insulating air pocket that reduces window heat loss by nearly 30%.\n- **Nocturnal Luster**: Under the warm glow of hand-chiseled brass lanterns, combed cotton velvet displays deep, voluptuous reflections that lend reception salons an imperial sanctuary aura."
      },
      {
        "id": "tableau-comparatif-indoor",
        "heading": "4. Tableau comparatif : Lin vs Velours",
        "content": "Pour vous orienter avec précision selon les spécificités de votre projet, voici la confrontation technique de nos deux étoffes signatures :",
        "headingEn": "4. Comparative Matrix: Pure Linen vs Combed Velvet",
        "contentEn": "To guide your decision according to your specific architectural layout, here is the technical head-to-head comparison of our signature textiles:"
      },
      {
        "id": "l-art-du-tombe",
        "heading": "5. L'art du tombé : Pourquoi l'ourlet plombé de 10 cm change tout",
        "content": "La qualité d'un rideau de prestige ne se mesure pas seulement au métrage de tissu déroulé, mais à la façon dont il embrasse le sol.\n\nUn rideau d'entrée de gamme présente souvent un ourlet bas étriqué de 2 à 4 cm, piqué à la machine industrielle, qui ondule et rebique au gré des courants d'air. \n\nDans la manufacture Kansotex de Marrakech, chaque panneau de rideau est doté d'un **ourlet double de 10 cm cousu au point invisible à la main**, dans lequel nos artisans glissent un fil de plomb calibré ou des pastilles de lestage aux deux angles. \n\nCe plombage invisible confère au tissu une inertie gravitaire parfaite :\n1. Les plis verticaux restent droits et nets du rail jusqu'au sol.\n2. Le bas du panneau vient effleurer le parquet ou le zellige avec une précision au millimètre.\n3. Aucune ligne de couture n'est apparente sur la face endroit du rideau.",
        "callout": {
          "title": "Règle de pose de l'Atelier",
          "text": "Pour un rendu haute-couture 'cassant sur le sol', nos confectionneurs ajoutent exactement 2,5 cm à 3 cm de tissu au métrage hauteur sol-tringle pour que l'étoffe vienne délicatement se déposer sur le pavement sans ramasser la poussière.",
          "type": "tip",
          "titleEn": "Atelier Installation Rule",
          "textEn": "For a couture 'breaking hem' look, our master upholsterers add exactly 2.5 cm to 3 cm to the finished floor-to-rod drop, enabling the fabric to kiss the zellige pavement gracefully without gathering floor dust."
        },
        "headingEn": "5. The Art of Drape: Why the 10 cm Weighted Hem Changes Everything",
        "contentEn": "The true caliber of a luxury curtain is measured not merely by fabric yardage, but by the way it gathers upon the floor.\n\nMass-market curtains often feature skimpy 2 to 4 cm hems, machine-stitched with visible seams that curl and twist under air currents.\n\nIn the Kansotex manufacture of Marrakech, every single curtain panel is finished with a **double 10 cm blind-stitched hem sewn by hand**, into which our artisans insert a calibrated leaded weighting cord or corner corner-weights.\n\nThis invisible weighting imparts flawless gravitational drape:\n1. Vertical pleats hang laser-straight from track to floor.\n2. The bottom panel skims parquet or zellige tile with millimeter precision.\n3. Zero stitch lines show on the face of the fabric."
      },
      {
        "id": "recommandations-pieces",
        "heading": "6. Quelle matière pour quelle pièce ?",
        "content": "En conclusion, voici la règle d'or appliquée par notre bureau d'études :\n- **Séjour, Salle à manger & Patio véranda** : Privilégiez le *Pur Lin d'Atlas Pré-Lavé* pour maximiser la lumière naturelle, aérer la perspective et inviter le jardin à l'intérieur.\n- **Suites parentales & Chambres d'hôtes** : Optez pour le *Velours Peigné doublé* pour garantir une obscurité totale bienfaisante, une isolation phonique contre les bruits nocturnes et une intimité cocon.\n- **Salons de réception & Bibliothèques** : Superposez les deux ! Un voilage lin filtrant en premier plan et des doubles-rideaux velours en encadrement théâtral.",
        "headingEn": "6. Which Fabric for Which Room?",
        "contentEn": "In summary, here is the golden rule applied by our design office:\n- **Living Room, Dining Hall & Veranda Patio**: Prioritize *Pre-Washed Atlas Pure Linen* to maximize natural light, open horizons, and invite the garden inside.\n- **Master Suites & Guest Bedrooms**: Choose *Lined Combed Velvet* to ensure total soothing blackout, acoustic isolation against nocturnal sounds, and a comforting cocoon.\n- **Formal Reception Salons & Libraries**: Layer both! Sheer filtering linen in front, framed by grand architectural velvet drapes on the outer track."
      },
      {
        "id": "faq-indoor",
        "heading": "7. Foire Aux Questions (FAQ)",
        "content": "Retrouvez les réponses techniques de nos maîtres tapissiers pour réussir l'habillement textile de votre demeure.",
        "headingEn": "7. Frequently Asked Questions (FAQ)",
        "contentEn": "Explore practical answers from our master upholsterers to ensure flawless textile furnishing for your home."
      }
    ],
    "coverAltEn": "Luxury living room in Marrakech with pure Atlas linen curtains and heavy combed cotton velvet draperies"
  },
  {
    "slug": "comment-mesurer-calculer-metrage-rideaux-sur-mesure",
    "title": "Comment Prendre Vos Mesures & Calculer le Métrage de Vos Rideaux : Le Manuel Pratique de Notre Manufacture",
    "titleEn": "How to Measure and Calculate Fabric Yardage for Bespoke Curtains: The Master Workshop Guide",
    "kicker": "Guide Technique & Métrage Précis",
    "excerpt": "Calcul du coefficient de fronce (1.8x à 2.2x), prise de cotes tringle-au-sol, dégagement des retours muraux et métrage des lès : le guide complet de nos maîtres confectionneurs pour ne jamais vous tromper.",
    "excerptEn": "Calculation of gathering fullness (1.8x to 2.2x), rod-to-floor measurements, wall returns and panel cuts: the complete master workshop guide.",
    "category": "Guides & Mesures",
    "categorySlug": "guides",
    "coverImage": "/gallery/accompagnement-equipe-kansotex.webp",
    "coverAlt": "Maîtres artisans de l'atelier Kansotex prenant des mesures précises sur une pièce d'étoffe",
    "publishedAt": "2026-10-14T08:00:00.000Z",
    "readingTime": "7 min",
    "author": {
      "name": "Maître Hassan & L'Atelier Kansotex",
      "role": "Direction Technique de Confection — Marrakech",
      "avatar": "/gallery/accompagnement-equipe-kansotex.jpg",
      "bio": "Plus de 25 ans d'expertise dans le tissage traditionnel et la haute tapisserie d'ameublement in & outdoor à Marrakech. Conseille architectes et riads de prestige."
    },
    "metaDescription": "Guide étape par étape pour mesurer et calculer le métrage de vos rideaux sur-mesure à Marrakech. Formules de calcul, coefficient de fronce et astuces de tapissier.",
    "metaDescriptionEn": "Step-by-step master guide to measuring and calculating bespoke curtain fabric yardage in Marrakech. Formulas, fullness ratio, and master tips.",
    "seoKeywords": [
      "calculer metrage rideau sur mesure",
      "prise de cotes rideaux marrakech",
      "coefficient de fronce rideau",
      "combien de metre tissu pour rideau",
      "ourlet rideau tete flamande",
      "rideaux grande hauteur sous plafond",
      "atelier tapisserie marrakech"
    ],
    "pinterestUrl": "https://www.pinterest.com/kansotex",
    "tableOfContents": [
      {
        "id": "regle-or-mesures",
        "title": "1. La règle d'or avant de sortir le mètre ruban",
        "titleEn": "1. The Golden Rule before taking out the tape measure"
      },
      {
        "id": "mesurer-largeur-fronce",
        "title": "2. Mesurer la largeur & appliquer le bon coefficient de fronce",
        "titleEn": "2. Measuring width & applying the right fullness ratio"
      },
      {
        "id": "mesurer-hauteur",
        "title": "3. Mesurer la hauteur avec une rigueur d'horloger",
        "titleEn": "3. Measuring height with watchmaker precision"
      },
      {
        "id": "formule-magique",
        "title": "4. La formule mathématique exacte de notre atelier",
        "titleEn": "4. The exact mathematical yardage formula of our atelier"
      },
      {
        "id": "tetes-de-rideaux",
        "title": "5. Tête flamande, plis simples ou œillets : quel impact ?",
        "titleEn": "5. Flemish pleats, ripple wave or eyelets: visual and fullness impact"
      },
      {
        "id": "pieges-a-eviter",
        "title": "6. Les 4 erreurs courantes à proscrire",
        "titleEn": "6. The 4 critical measurement mistakes to avoid"
      },
      {
        "id": "faq-mesures",
        "title": "7. Foire Aux Questions (FAQ)",
        "titleEn": "7. Frequently Asked Questions (FAQ)"
      }
    ],
    "technicalTable": {
      "caption": "Coefficients de Fronce Recommandés par Type de Tête de Rideau (Atelier Kansotex)",
      "rows": [
        {
          "metric": "Plis Flamands doubles (Pincés)",
          "kansotexSpec": "Coefficient 2.0x à 2.2x",
          "standardMarket": "1.5x (Plis étriqués)",
          "practicalImpact": "Crée des vagues généreuses et profondes d'une élégance intemporelle dans les salons nobles.",
          "metricEn": "Contemporary Wave Fold (Wave / Ripplefold)",
          "kansotexSpecEn": "2.2x to 2.4x track width",
          "standardMarketEn": "1.5x (Skimpy, flat pleats)",
          "practicalImpactEn": "Creates continuous, architectural S-waves with flawless alignment from ceiling to floor."
        },
        {
          "metric": "Plis Wave / Vague contemporaine",
          "kansotexSpec": "Coefficient 1.8x à 2.0x",
          "standardMarket": "1.6x",
          "practicalImpact": "Idéal sur rail encastré plafond dans les villas contemporaines et baies vitrées coulissantes.",
          "metricEn": "Double Tailored Pinch Pleat (French Pleats)",
          "kansotexSpecEn": "2.3x track width",
          "standardMarketEn": "1.8x (Gapping pleats)",
          "practicalImpactEn": "Delivers timeless neoclassical elegance, keeping pleats crisp even across grand patio French doors."
        },
        {
          "metric": "Œillets contemporains (Ø 40 mm)",
          "kansotexSpec": "Coefficient 1.8x à 2.0x",
          "standardMarket": "1.5x",
          "practicalImpact": "Ondulation régulière et glisse fluide sur tringle tube en laiton ou acier noir mat.",
          "metricEn": "Heavyweight Blackout Linings",
          "kansotexSpecEn": "Full 100% blockout with thermal barrier",
          "standardMarketEn": "Simple cotton lining (50% blockout)",
          "practicalImpactEn": "Ensures complete sleeping darkness in guest suites and preserves delicate face fabrics from Atlas UV."
        },
        {
          "metric": "Fronces simples légères (Voilages)",
          "kansotexSpec": "Coefficient 2.2x à 2.5x",
          "standardMarket": "1.8x",
          "practicalImpact": "Permet au voilage transparent de tamiser la lumière sans effet de toile tendue plate.",
          "metricEn": "Bottom Hem Weighting",
          "kansotexSpecEn": "Double 10 cm blind-stitched hem with leaded cord",
          "standardMarketEn": "Single machine-stitched 3 cm hem",
          "practicalImpactEn": "Provides optimal gravitational weight so drapes hang straight without billowing in garden breezes."
        }
      ],
      "captionEn": "Fabric Fullness Multipliers by Pleating Style & Visual Aesthetic"
    },
    "faqs": [
      {
        "question": "Faut-il mesurer la fenêtre ou la tringle ?",
        "answer": "Toujours la **tringle ou le rail**, jamais l'encadrement de la fenêtre ! La tringle dépasse généralement de 20 à 30 cm de chaque côté de l'ouverture pour permettre aux rideaux repliés de dégager entièrement le vitrage en journée. La largeur de référence pour vos calculs est donc la longueur totale de la barre (hors embouts décoratifs).",
        "questionEn": "Should curtain measurements be taken from the ceiling or the rod?",
        "answerEn": "Always measure from the exact underside of the track glider or ring eyelet down to the floor covering (parquet, marble, or bejmat). For ceiling-recessed architectural tracks, measure directly from the ceiling groove to the floor with a laser distance meter."
      },
      {
        "question": "Quel espace laisser entre le bas du rideau et le sol ?",
        "answer": "Pour un tombé 'net' sans toucher le sol, nous laissons traditionnellement **1,5 cm** de jour. Pour un tombé 'affleurant' moderne, nous laissons **0,5 cm**. Enfin, pour un tombé majestueux 'cassant', nous ajoutons **+3 cm** à la hauteur pour que l'étoffe repose sur le sol avec souplesse.",
        "questionEn": "How much allowance should be added for a break on the floor?",
        "answerEn": "For an effortless 'trouser break', add +2.5 cm. For a dramatic, puddle-draped imperial look in a riad master suite, add +5 cm to +8 cm. If you prefer the hem to hover cleanly just above the floor without sweeping dust, deduct 1 cm."
      }
    ],
    "relatedProducts": [
      {
        "slug": "lin-naturel-atlas-lave",
        "name": "Lin d'Atlas Pré-Lavé",
        "category": "Indoor",
        "image": "/gallery/linen_fabric_closeup_1791052926029.jpg",
        "highlight": "Idéal tête flamande & wave"
      },
      {
        "slug": "toile-outdoor-atlas-sable",
        "name": "Toile Outdoor Atlas",
        "category": "Outdoor",
        "image": "/gallery/matiere-tissus-outdoor-rooftop.jpg",
        "highlight": "Pour rideaux de terrasse & tonnelle"
      }
    ],
    "sections": [
      {
        "id": "regle-or-mesures",
        "heading": "1. La règle d'or avant de sortir le mètre ruban",
        "content": "Rien n'est plus décevant qu'une paire de rideaux coupée trop courte de deux centimètres ou manquante d'ampleur face à une haute baie vitrée. \n\nLa confection sur-mesure répond à des règles géométriques immuables. Avant toute chose, retenez cette consigne absolue de nos artisans : **posez toujours votre tringle ou votre rail avant de prendre les mesures définitives**. Tenter de mesurer à partir d'une ligne imaginaire sur un mur brut est l'assurance d'une déconvenue lors de la pose finale.",
        "callout": {
          "title": "Outil indispensable",
          "text": "Utilisez impérativement un mètre ruban métallique rigide ou un télémètre laser professionnel. Les mètres de couturière souples en tissu s'étirent et introduisent des erreurs de 1 à 3 cm sur les grandes hauteurs.",
          "type": "tip",
          "titleEn": "Essential Tool",
          "textEn": "Always use a rigid steel tape measure or a professional laser distance meter. Flexible tailor cloth tapes stretch under tension and introduce errors of 1 to 3 cm across tall drops."
        },
        "headingEn": "1. The Golden Rule before taking out the tape measure",
        "contentEn": "Nothing is more frustrating than a pair of custom curtains cut two centimeters too short or lacking fullness in front of an expansive floor-to-ceiling bay window.\n\nBespoke tailoring follows immutable geometric rules. Before anything else, observe this absolute commandment of our master artisans: **always install your curtain rod or ceiling track before taking final measurements**. Attempting to measure from an imaginary line on a raw wall is guaranteed to cause disappointment during final installation."
      },
      {
        "id": "mesurer-largeur-fronce",
        "heading": "2. Mesurer la largeur & appliquer le bon coefficient de fronce",
        "content": "Un rideau ne doit jamais être une surface plate tirée comme un drap d'hôpital. Sa noblesse vient de la générosité de ses plis.\n\nPour obtenir une belle onde, on applique à la largeur de la tringle un **coefficient de fronce** (compris entre 1.8 et 2.2 selon le tissu) :\n- **Largeur de tringle de 2,00 m avec coefficient 2.0x** = 4,00 m de tissu déployé nécessaire.\n- Si vous prévoyez deux rideaux (ouverture centrale), chaque panneau mesurera 2,00 m de large une fois confectionné, soit deux lés complets.\n\nN'oubliez pas d'ajouter les retours muraux (+ 10 cm par côté) et le croisement central des deux rideaux (+ 5 cm) pour éviter que la lumière ne s'infiltre au milieu une fois les rideaux fermés.",
        "quote": {
          "text": "Dans le luxe, l'économie de tissu sur la fronce est immédiatement visible à l'œil nu. Mieux vaut un tissu plus simple avec une fronce généreuse à 2.2x qu'une soie somptueuse tendue sans aucun volume.",
          "author": "Maître Hassan",
          "role": "Directeur de production Kansotex",
          "textEn": "In luxury design, scrimping on fabric fullness is immediately obvious to the naked eye. It is far better to specify a simpler textile with generous 2.2x fullness than a sumptuous silk hung taut without any body.",
          "roleEn": "Head of Atelier Production, Kansotex"
        },
        "headingEn": "2. Measuring width & applying the right fullness ratio",
        "contentEn": "A luxury curtain should never be a flat, taut surface pulled like a hospital sheet. Its nobility and prestige stem from the generous rhythm of its undulating folds.\n\nTo achieve an architectural wave, apply a **fullness ratio** (between 1.8x and 2.2x depending on fabric weight and pleat style) to the rod or track length:\n- **Track width of 2.00 m with a 2.0x fullness ratio** = 4.00 m of deployed flat fabric required.\n- If you opt for a pair of curtains (center split opening), each tailored panel will span 2.00 m once stitched, requiring two full fabric widths.\n\nDo not forget to add side returns (+ 10 cm per wall edge) and center overlap (+ 5 cm) to prevent light infiltration at the center when curtains are drawn."
      },
      {
        "id": "mesurer-hauteur",
        "heading": "3. Mesurer la hauteur avec une rigueur d'horloger",
        "content": "Mesurez toujours la hauteur à trois endroits distincts : **à gauche, au centre et à droite de la baie vitrée**. \n\nDans les riads traditionnels comme dans les constructions récentes, le sol ou le plafond présente presque toujours un léger dénivelé de 5 à 15 mm. Si un écart existe, notre atelier adapte la coupe de l'ourlet pour que la chute paraisse rigoureusement parallèle au sol.\n\n**Le point de départ de la mesure :**\n- **Sur tringle à anneaux** : Mesurez depuis le bas de l'anneau (là où s'insère le crochet) jusqu'au sol.\n- **Sur rail encastré au plafond** : Mesurez depuis le dessous du rail jusqu'au sol.\n- **Sur tringle à œillets** : Mesurez depuis le dessus de la barre métallique jusqu'au sol, puis ajoutez 3,5 cm pour la tête de rideau qui dépasse au-dessus de la tringle.",
        "image": {
          "url": "/gallery/accompagnement-equipe-kansotex.webp",
          "alt": "Vérification des cotes et découpe au fil droit dans l'atelier Kansotex",
          "caption": "Chaque laize est coupée au fil droit dans notre manufacture à Marrakech pour éviter toute vrille.",
          "altEn": "Measurement calibration and straight grain fabric cutting in the Kansotex atelier",
          "captionEn": "Every fabric width is cut along the true thread grain in our Marrakech manufacture to prevent bowing or twisting."
        },
        "headingEn": "3. Measuring height with watchmaker precision",
        "contentEn": "Always measure the drop height at three distinct points: **at the left, center, and right of the window opening**.\n\nIn traditional Moroccan riads as well as contemporary villas, floors and ceilings almost invariably feature a slight slope of 5 to 15 mm. When discrepancies occur, our atelier custom-shapes the hem gradient so that the fall appears rigorously parallel to the finished floor.\n\n**Starting reference points for measurement:**\n- **On ringed rods**: Measure from the bottom of the eyelet ring (where the drapery hook inserts) down to the floor.\n- **On ceiling-recessed tracks**: Measure from the underside of the track channel down to the floor.\n- **On eyelet (grommet) rods**: Measure from the top surface of the metal rod down to the floor, then add 3.5 cm for the fabric header rising above the pole."
      },
      {
        "id": "formule-magique",
        "heading": "4. La formule mathématique exacte de notre atelier",
        "content": "Pour déterminer le métrage exact en mètres linéaires de rouleau (laize standard Kansotex de 140 cm ou 280 cm grande largeur) :\n\n**Formule pour Grande Largeur (Laize 280 cm) :**\nLorsque le tissu est tissé en grande laize de 280 cm, la hauteur du rideau s'inscrit dans la largeur du rouleau (tombé dans le droit fil horizontal).\n*Métrage à commander = (Longueur de tringle × Coefficient de fronce) + 30 cm pour les ourlets latéraux.*\n\n**Formule pour Petite Largeur (Laize 140 cm) :**\n*Nombre de lés nécessaires = (Longueur de tringle × Coefficient de fronce) ÷ 130 cm.*\n*Métrage par lé = Hauteur finie + 35 cm (ourlet bas 20 cm replié + tête 15 cm).*\n*Métrage total = Nombre de lés × Métrage par lé.*",
        "headingEn": "4. The exact mathematical yardage formula of our atelier",
        "contentEn": "To calculate the exact linear yardage required from roll bolts (standard Kansotex width of 140 cm or double width of 280 cm):\n\n**Formula for Double Width Fabric (280 cm Bolt):**\nWhen the fabric is woven in double width (280 cm), curtain drop fits into the roll width, running railroaded horizontally.\n*Yardage to order = (Track Length × Fullness Ratio) + 30 cm for double side hems.*\n\n**Formula for Standard Width Fabric (140 cm Bolt):**\n*Number of widths required = (Track Length × Fullness Ratio) ÷ 130 cm.*\n*Length per width = Finished Drop Height + 35 cm (20 cm double weighted hem + 15 cm pleated header).*\n*Total linear fabric to order = Number of widths × Length per width.*"
      },
      {
        "id": "tetes-de-rideaux",
        "heading": "5. Tête flamande, plis simples ou œillets : quel impact ?",
        "content": "Le type d'attache détermine non seulement le style décoratif de la pièce, mais également le repli du rideau lorsqu'il est ouvert en journée :\n- **Les Plis Flamands (Pincés doubles ou triples)** : Le summum du raffinement classique et contemporain. Les plis sont piqués de manière permanente avec une ganse rigide cachée. Ils se rangent dans un volume très compact lorsqu'ils sont ouverts.\n- **La Finition Wave (Vague ondulante)** : Moderne et épurée, elle nécessite un rail spécifique équipé de petits cordons d'espacement (généralement 6 ou 8 cm). Les vagues restent parfaitement calibrées de haut en bas.\n- **Les Œillets métalliques** : Faciles à manipuler, recommandés pour les chambres d'enfants ou les espaces informels, mais moins isolants sur le plan thermique en raison de la lumière qui s'infiltre au-dessus de la barre.",
        "image": {
          "url": "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.webp",
          "alt": "Détail de tête plissée flamande et tombé cassant de rideau sur sol en zellige",
          "caption": "Finitions haute facture : tête à plis flamands réguliers et tombé cassant de 2,5 cm reposant délicatement sur le zellige.",
          "altEn": "Architectural Flemish pleat heading and tailored break drape resting gently on authentic Moroccan zellige tile",
          "captionEn": "Haute couture drapery finishing: crisp pinch pleat header with a 2.5 cm gentle break puddle resting elegantly on traditional zellige floors."
        },
        "headingEn": "5. Flemish pleats, ripple wave or eyelets: visual and fullness impact",
        "contentEn": "The header style determines not only the decorative character of the room, but also how compactly the drapery stacks when opened during daylight hours:\n- **French / Flemish Pinch Pleats (Double or Triple Pleat)**: The absolute gold standard of classical and transitional elegance. Pleats are permanently stitched with a concealed stiff buckram heading. They stack back neatly into a very compact footprint.\n- **Ripplefold / Wave Finish**: Sleek, modern, and architectural. Requires a dedicated track system with internal spacer cords (typically 6 or 8 cm intervals). The fluid S-curves remain uniformly calibrated from ceiling to floor.\n- **Metallic Eyelets (Grommets)**: Contemporary and effortless to glide, recommended for casual lounges, though offering slightly lower thermal and acoustic sealing due to light haloing above the rod."
      },
      {
        "id": "pieges-a-eviter",
        "heading": "6. Les 4 erreurs courantes à proscrire absolument",
        "content": "1. **Oublier le retrait au lavage** : Si vous choisissez un tissu non stabilisé, lavez-le avant confection ou exigez un lin préalablement stonewashed comme ceux de Kansotex.\n2. **Ne pas prévoir le dégagement mural** : Si la tringle s'arrête exactement à la limite de la fenêtre, le rideau masquera 30% de votre baie vitrée en permanence en journée.\n3. **Négliger le poids sur le rail** : Sur des hauteurs sous plafond de 3,50 m en velours peigné, une paire de rideaux peut peser plus de 12 kg. Prévoyez des fixations murales adaptées (chevilles molly ou scellement chimique sur brique creuse).\n4. **Couper sans vérifier l'aplomb du mur** : Une coupe au laser sans tenir compte de la dénivellation du sol se remarque au premier coup d'œil.",
        "headingEn": "6. The 4 critical measurement mistakes to avoid",
        "contentEn": "1. **Forgetting fabric shrinkage**: If specifying unstabilized natural weaves, pre-wash before cutting or insist on pre-shrunk stonewashed linens such as Kansotex collections.\n2. **Ignoring wall stackback clearance**: If your track stops flush with the window frame edges, stacked drapery will permanently obscure 30% of natural light and garden views.\n3. **Underestimating fabric weight on the track**: Over a 3.50 m ceiling drop in heavy combed velvet, a pair of lined drapes can weigh upwards of 12 kg. Specify heavy-duty wall anchors (chemical anchors or hollow brick toggle bolts).\n4. **Cutting without verifying level**: A laser-straight hem cut without adjusting for floor slope will look noticeably crooked to the naked eye."
      },
      {
        "id": "faq-mesures",
        "heading": "7. Foire Aux Questions (FAQ)",
        "content": "Consultez les réponses directes de notre équipe pour sécuriser votre projet.",
        "headingEn": "7. Frequently Asked Questions (FAQ)",
        "contentEn": "Explore direct answers from our technical team to guarantee precision for your residential or hotel projects."
      }
    ],
    "coverAltEn": "Master upholsterer measuring fabric yardage with precision steel rule in the Kansotex workshop"
  },
  {
    "slug": "amenagement-textile-b2b-renover-riad-hotel-luxe",
    "title": "Aménagement Textile B2B : Rénover un Riad Historique ou un Hôtel Boutik avec des Étoffes Sur-Mesure",
    "titleEn": "B2B Textile Design: Renovating a Historic Riad or Boutique Hotel with Bespoke Fabrics",
    "kicker": "Architecture, Hospitality & Prescription B2B",
    "excerpt": "Normes non-feu M1/Crib 5 pour l'hôtellerie, résistance Martindale supérieure à 50 000 tours, tarifs professionnels négociés et confection locale : comment Kansotex accompagne architectes et maîtres d'ouvrage à Marrakech.",
    "excerptEn": "Fire-retardant M1/Crib 5 standards, Martindale durability over 50,000 rubs, negotiated trade prices: how Kansotex supports architects and hospitality owners.",
    "category": "Architecture & Riads",
    "categorySlug": "architecture",
    "coverImage": "/gallery/Kansotex-indoor-living-room-pinterest.webp",
    "coverAlt": "Salon de réception d'un hôtel de luxe à Marrakech habillé de tissus d'ameublement sur-mesure Kansotex",
    "publishedAt": "2026-10-15T14:00:00.000Z",
    "readingTime": "8 min",
    "author": {
      "name": "Studio Design Kansotex",
      "role": "Bureau d'Études Textiles & Projets B2B",
      "avatar": "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
      "bio": "Accompagne maîtres d'œuvre, hôteliers et décorateurs dans l'élaboration de dossiers techniques, choix de fibres durables et confections sur-mesure."
    },
    "metaDescription": "Solutions textiles B2B pour hôtels et riads à Marrakech. Tissus certifiés non-feu M1, résistance hôtelière 50 000 tours et confection sur-mesure.",
    "metaDescriptionEn": "B2B hospitality textile solutions in Marrakech. Flame retardant M1 fabrics, 50,000+ Martindale durability, and custom bespoke manufacturing.",
    "seoKeywords": [
      "tissu hotel marrakech",
      "amenagement riad luxe textile",
      "tissu non feu m1 maroc",
      "tissu ameublement professionnel",
      "devis textile b2b marrakech",
      "tapissier decorateur hotel maroc",
      "espace pro kansotex"
    ],
    "pinterestUrl": "https://www.pinterest.com/kansotex",
    "tableOfContents": [
      {
        "id": "enjeux-hospitality",
        "title": "1. Les contraintes spécifiques de l'hôtellerie de charme",
        "titleEn": "1. The specific constraints of boutique hospitality in Marrakech"
      },
      {
        "id": "normes-et-securite",
        "title": "2. Les normes de sécurité : Non-Feu M1, Crib 5 & OEKO-TEX",
        "titleEn": "2. Safety standards: M1 Flame-Retardant, Crib 5 & OEKO-TEX"
      },
      {
        "id": "durabilite-intensive",
        "title": "3. La durabilité intensive face à la rotation des hôtes",
        "titleEn": "3. Intensive durability against frequent guest turnover"
      },
      {
        "id": "accompagnement-sur-mesure",
        "title": "4. L'accompagnement sur-mesure Kansotex pour architectes",
        "titleEn": "4. Kansotex bespoke support for architects & interior designers"
      },
      {
        "id": "service-echantillons",
        "title": "5. Service d'échantillonnage express et chiffrage 48h",
        "titleEn": "5. Express swatch dispatch and 48-hour trade estimates"
      },
      {
        "id": "faq-b2b",
        "title": "6. Foire Aux Questions B2B",
        "titleEn": "6. B2B Hospitality FAQ"
      }
    ],
    "technicalTable": {
      "caption": "Exigences Hôtelières Spécifiques vs Standards Résidentiels Grand Public",
      "rows": [
        {
          "metric": "Résistance au feu",
          "kansotexSpec": "Certification Non-Feu M1 (NF P92-507) & BS 5852 Crib 5",
          "standardMarket": "Non ignifugé (Interdit en ERP)",
          "practicalImpact": "Conformité légale immédiate avec les commissions de sécurité touristiques marocaines.",
          "metricEn": "Fire safety certification",
          "kansotexSpecEn": "Certified Flame-Retardant M1 (NF P92-507) & BS 5852 Crib 5",
          "standardMarketEn": "Non-flame retardant (Prohibited in commercial public venues)",
          "practicalImpactEn": "Guarantees full regulatory compliance with Moroccan tourist board and hospitality safety inspections."
        },
        {
          "metric": "Détachabilité & Entretien professionnel",
          "kansotexSpec": "Traitement hydro-oléophobe lavable à 40°C ou pressing sec",
          "standardMarket": "Nettoyage délicat avec risque d'auréoles",
          "practicalImpact": "Réduit les coûts de blanchisserie et garantit un renouvellement rapide des chambres.",
          "metricEn": "Stain release & Professional laundry durability",
          "kansotexSpecEn": "Hydro-oleophobic treatment washable at 40°C or dry-cleanable",
          "standardMarketEn": "Delicate dry-clean only with high ring staining risk",
          "practicalImpactEn": "Drastically reduces hotel laundry turnover times and guestroom turnaround costs."
        },
        {
          "metric": "Solidité des coutures sous tension continue",
          "kansotexSpec": "Renforts d'angles thermosoudés et double piquage nylon",
          "standardMarket": "Coutures simples avec déchirement rapide",
          "practicalImpact": "Absence d'affaissement des banquettes de restaurant et assises de lobby après 3 ans.",
          "metricEn": "Seam strength under continuous seating tension",
          "kansotexSpecEn": "Reinforced heat-sealed stress points and heavy nylon double-stitching",
          "standardMarketEn": "Single chain stitch prone to seam slippage",
          "practicalImpactEn": "Prevents sagging and burst seams on high-turnover restaurant banquettes and lobby lounges after 3+ years."
        }
      ],
      "captionEn": "Hospitality Contract Requirements vs Standard Residential Grade"
    },
    "faqs": [
      {
        "question": "Proposez-vous des tarifs préférentiels pour les décorateurs et hôteliers ?",
        "answer": "Oui, notre Espace Pro & Architecture offre des remises quantitatives directes (de 15% à 35% selon les volumes de projet), un accès prioritaire à nos rouleaux en stock permanent à Marrakech et l'affectation d'un chargé de projet dédié disponible sur WhatsApp et in situ.",
        "questionEn": "Do you offer preferential trade pricing for interior designers and hoteliers?",
        "answerEn": "Yes. Our Kansotex Trade Portal provides direct wholesale volume tiers (from 15% to 35% discount depending on project scope), priority allocation on rolls held in stock in Marrakech, and a dedicated project manager available via WhatsApp and on site."
      },
      {
        "question": "Pouvez-vous confectionner sur-mesure d'après nos plans d'architecte ?",
        "answer": "C'est le cœur de notre métier. Vous nous transmettez vos plans d'élévation, vos calepinages d'assises ou simplement vos métrages bruts : notre bureau d'études établit le devis matière + confection sous 24 à 48 heures, réalise un prototype si nécessaire, puis lance la fabrication dans notre manufacture de Marrakech.",
        "questionEn": "Can you manufacture bespoke items directly from architectural elevation drawings?",
        "answerEn": "That is our core competency. Submit your architectural elevations, seating calepinages, or raw window dimensions: our technical design office produces full material + sewing estimates within 24 to 48 hours, prepares sample mockups if required, and launches workshop fabrication in Marrakech."
      }
    ],
    "relatedProducts": [
      {
        "slug": "velours-coton-gueliz",
        "name": "Velours Peigné Guéliz — Spécial ERP",
        "category": "Indoor",
        "image": "/gallery/tissus-haut-de-gamme.webp",
        "highlight": "Martindale 50 000 rubs · Classement Hôtelier"
      },
      {
        "slug": "toile-outdoor-atlas-sable",
        "name": "Toile Outdoor Atlas — Traitée UV",
        "category": "Outdoor",
        "image": "/gallery/Kansotex-outdoor-terasse-rooftop.webp",
        "highlight": "Résistance chlore & sel pour piscines de riad"
      }
    ],
    "sections": [
      {
        "id": "enjeux-hospitality",
        "heading": "1. Les contraintes spécifiques de l'hôtellerie de charme à Marrakech",
        "content": "Rénover un riad du XVIIe siècle dans la Médina de Marrakech ou aménager un écolodge au pied de l'Atlas confronte le maître d'œuvre à un double impératif souvent jugé contradictoire : préserver l'authenticité artisanale locale tout en répondant aux normes draconiennes de l'hôtellerie de luxe internationale.\n\nLes établissements recevant du public (ERP) subissent un trafic intense. Entre les valises frottant contre les tentures, la crème solaire des transats de piscine, les cafés renversés au petit-déjeuner et les cycles de nettoyage quotidiens, une étoffe domestique capitule en moins d'un an.\n\nKansotex a été pensé pour combler ce vide : proposer des tissus d'ameublement d'une noblesse tactile digne des plus grands palais, armés d'une résistance industrielle invisible.",
        "callout": {
          "title": "Accompagnement B2B Dédié",
          "text": "Chaque projet hôtelier suivi par Kansotex bénéficie d'un interlocuteur unique, du relevé des cotes initial jusqu'à la livraison étiquetée chambre par chambre.",
          "type": "atelier",
          "titleEn": "Dedicated B2B Project Support",
          "textEn": "Every hospitality project overseen by Kansotex is assigned a single key account manager, from the initial on-site survey to room-by-room labeled delivery."
        },
        "headingEn": "1. The specific constraints of boutique hospitality in Marrakech",
        "contentEn": "Renovating a 17th-century riad in the Marrakech Medina or styling an eco-lodge at the foothills of the Atlas presents prime contractors with a dual challenge: preserving local craft authenticity while meeting the stringent technical standards of luxury international hospitality.\n\nCommercial establishments face continuous heavy traffic. Between suitcases scraping against wall draperies, sunscreen stains on poolside daybeds, spilled breakfast coffee, and rigorous housekeeping cycles, domestic fabrics surrender in under a year.\n\nKansotex was founded to bridge this exact divide: delivering upholstery fabrics imbued with tactile aristocratic nobility fit for luxury palaces, fortified by invisible industrial durability."
      },
      {
        "id": "normes-et-securite",
        "heading": "2. Les normes de sécurité : Non-Feu M1, Crib 5 & OEKO-TEX",
        "content": "Pour obtenir l'autorisation d'ouverture et satisfaire aux audits des commissions de sécurité et des compagnies d'assurance internationales, les tentures murales, rideaux et têtes de lit doivent être classés **Non-Feu M1** (norme française NF P92-507) ou répondre au standard britannique **BS 5852 Crib 5**.\n\nNos gammes hôtelières intègrent des fibres modacryliques et des polyesters Trévira CS ignifugés de manière permanente dans la masse de la fibre :\n- L'ignifugation ne part pas au lavage, contrairement aux traitements de surface par trempage chimique qui perdent leur efficacité après 3 cycles d'entretien.\n- Elles ne dégagent aucun gaz toxique en cas de source de chaleur intense.\n- Elles bénéficient du label **OEKO-TEX® Standard 100**, certifiant l'absence totale de métaux lourds ou de formaldéhydes au contact de la peau des voyageurs.",
        "quote": {
          "text": "Pour un hôtelier, la sérénité n'a pas de prix. Quand la commission de sécurité passe, avoir les certificats d'ignifugation M1 conformes permet d'ouvrir dans les délais prévus sans blocage administratif.",
          "author": "Studio Kansotex",
          "role": "Département Prescription Hôtelière",
          "textEn": "For a hotelier, peace of mind is priceless. When safety inspectors arrive, having certified M1 flame-retardant documentation ensures timely opening without administrative delays.",
          "roleEn": "Hospitality Prescription Bureau"
        },
        "image": {
          "url": "/gallery/bedroom_lifestyle_1791052936092.jpg",
          "alt": "Chambre d'hôtel de luxe équipée de literie 300 fils et tentures ignifugées M1 Kansotex",
          "caption": "Suite hôtelière de riad : literie percale 300 fils longues fibres et tentures ignifugées homologuées Non-Feu M1.",
          "altEn": "Luxury hotel guestroom with 300-thread-count bedding and flame-retardant drapes",
          "captionEn": "Boutique riad guest suite: 300-thread-count long-staple cotton percale bedding and certified M1 flame-retardant draperies."
        },
        "headingEn": "2. Safety standards: M1 Flame-Retardant, Crib 5 & OEKO-TEX",
        "contentEn": "To secure commercial operating permits and satisfy international hotel brand audits and insurance underwriters, drapes, wall fabrics, and headboards must carry an **M1 Flame-Retardant rating** (French NF P92-507 standard) or comply with British **BS 5852 Crib 5**.\n\nOur hospitality textiles feature inherently flame-retardant Trevira CS polyesters and modacrylic fibers:\n- Fire resistance is permanent at the molecular level and does not wash out with laundering, unlike superficial chemical coatings.\n- Fibers produce non-toxic emissions when subjected to intense heat.\n- Certified under **OEKO-TEX® Standard 100**, ensuring complete freedom from harmful heavy metals or formaldehydes against guest skin."
      },
      {
        "id": "durabilite-intensive",
        "heading": "3. La durabilité intensive face à la rotation des hôtes",
        "content": "Le test Martindale simule l'usure par frottement répété en exerçant une pression oscillante sur l'étoffe jusqu'à rupture des premiers fils :\n- **Usage résidentiel standard** : 15 000 à 20 000 tours.\n- **Usage hôtelier intensif Kansotex** : **45 000 à 60 000 tours**.\n\nNos velours de coton peigné et nos toiles jacquard résistent aux frottements continus des assises de lobby, des banquettes de restaurant et des tabourets de bar sans jamais boulocher ni s'effilocher aux coutures d'assemblage.",
        "headingEn": "3. Intensive durability against frequent guest turnover",
        "contentEn": "The Martindale test simulates continuous abrasive wear by rubbing fabric samples in oscillating cycles until yarn breakdown:\n- **Standard residential grade**: 15,000 to 20,000 rubs.\n- **Kansotex intensive commercial grade**: **45,000 to 60,000 rubs**.\n\nOur combed cotton velvets and jacquard weaves withstand non-stop friction across hotel lobbies, cocktail lounges, and restaurant banquettes without pilling or seam distortion."
      },
      {
        "id": "accompagnement-sur-mesure",
        "heading": "4. L'accompagnement sur-mesure Kansotex pour architectes & décorateurs",
        "content": "Notre manufacture à Marrakech n'est pas un simple entrepôt de vente au rouleau. C'est un atelier complet de confection d'ameublement capable d'assumer des séries hôtelières de grande envergure :\n- **Confection de rideaux occultants et voilages** pour 10 à 80 chambres avec crochets micro-réglables déjà posés.\n- **Banquettes et dossiers sur-mesure** taillés au millimètre pour épouser les banquettes traditionnelles en plâtre ou en cèdre sculpté des salons marocains.\n- **Coussins de terrasse et matelas de transat outdoor** étanches et déhoussables avec fermetures inoxydables.",
        "image": {
          "url": "/gallery/Kansotex-indoor-riad-tissus-pinterest.webp",
          "alt": "Banquettes et coussins sur-mesure dans un riad prestigieux de la Médina de Marrakech",
          "caption": "Réalisation sur-mesure Kansotex : harmonie des textures entre velours peigné et toiles unies.",
          "altEn": "Custom banquette cushions in a historic Medina riad",
          "captionEn": "Kansotex custom realization: harmonious textural dialogue between combed velvet and textural plains."
        },
        "headingEn": "4. Kansotex bespoke support for architects & interior designers",
        "contentEn": "Our manufacture in Marrakech is far more than a fabric showroom: it is a comprehensive bespoke upholstery and curtain atelier capable of executing major hotel rollouts:\n- **Production of blackout drapes and sheer curtains** for 10 to 80 guestrooms with pre-installed micro-adjustable hooks.\n- **Bespoke banquette and backrest cushions** cut to the millimeter to fit traditional carved cedar and plaster seating.\n- **Waterproof outdoor poolside daybeds and sunbed mattresses** with stainless steel zippers."
      },
      {
        "id": "service-echantillons",
        "heading": "5. Service d'échantillonnage express et chiffrage 48h",
        "content": "Parce que le temps d'un architecte sur chantier est précieux, nous avons mis en place une organisation logistique réactive :\n1. **Livraison d'échantillons en 24h** sur Marrakech (et 48h sur Casablanca, Rabat et Tanger) pour vos moodboards et réunions client.\n2. **Étude technique et devis B2B quantitatif sous 48 heures** à partir de votre bordereau des prix unitaires (BPU).\n3. **Stock permanent garanti** sur nos références phares pour éviter les ruptures de fin de chantier.",
        "headingEn": "5. Express swatch dispatch and 48-hour trade estimates",
        "contentEn": "Understanding the rapid timelines of architects on active job sites, we operate a streamlined logistics pipeline:\n1. **24-hour swatch delivery in Marrakech** (48 hours in Casablanca, Rabat, and Tangier) for client presentations.\n2. **Technical review and comprehensive B2B quote generated within 48 hours** based on your bill of quantities (BOQ).\n3. **Guaranteed continuous roll inventory** on core benchmark references to prevent late-stage project stockouts."
      },
      {
        "id": "faq-b2b",
        "heading": "6. Foire Aux Questions B2B",
        "content": "Retrouvez toutes les modalités de collaboration professionnelle avec notre maison.",
        "headingEn": "6. B2B Hospitality FAQ",
        "contentEn": "Discover all technical terms and collaboration procedures for trade and architecture professionals."
      }
    ],
    "coverAltEn": "Luxury boutique hotel reception salon in Marrakech furnished with custom bespoke Kansotex contract upholstery fabrics"
  },
  {
    "slug": "toiles-remplacement-chiliennes-transats-marrakech",
    "title": "Toiles de Remplacement Haut de Gamme pour Chiliennes & Transats : Le Guide Sur-Mesure de Marrakech",
    "titleEn": "Luxury Replacement Canvas for Deckchairs & Loungers: The Marrakech Bespoke Guide",
    "kicker": "Rénovation Outdoor & Confort Solaire",
    "excerpt": "Vos ossatures en bois dur de chiliennes méritent mieux qu'une toile délavée après un été. Analyse des toiles acryliques déperlantes, calcul des dimensions au centimètre et pas à pas de changement dans notre manufacture de Marrakech.",
    "excerptEn": "Your deckchair frames deserve better than faded canvas after one summer. Discover solution-dyed acrylic fabrics, custom dimensions, and expert re-canvasing in Marrakech.",
    "category": "Outdoor & Terrasses",
    "categorySlug": "outdoor",
    "coverImage": "/gallery/chilienne-luxe-transat-marrakech.jpg",
    "coverAlt": "Chilienne artisanale en bois noble avec toile rayée terracotta Kansotex au bord du bassin d'un riad à Marrakech",
    "publishedAt": "2026-10-14T09:00:00.000Z",
    "readingTime": "7 min",
    "author": {
      "name": "Maître Hassan & L'Atelier Kansotex",
      "role": "Direction Technique de Confection — Marrakech",
      "avatar": "/gallery/accompagnement-equipe-kansotex.jpg",
      "bio": "Plus de 25 ans d'expertise dans le tissage traditionnel et la haute tapisserie d'ameublement in & outdoor à Marrakech. Conseille architectes et riads de prestige."
    },
    "metaDescription": "Guide complet pour rénover et changer vos toiles de chiliennes à Marrakech : toiles outdoor acryliques anti-UV Grade 8, confection sur-mesure et résistance chlore.",
    "metaDescriptionEn": "Complete guide to re-covering deckchairs in Marrakech with luxury UV-proof and water-repellent outdoor fabrics.",
    "seoKeywords": [
      "tissu chilienne marrakech",
      "toile transat sur mesure maroc",
      "tissu remplacement chilienne luxe",
      "toile rayee transat piscine",
      "tissu outdoor deperlant terrasse",
      "transat jardin maroc",
      "toile acrylique teinté masse",
      "chilienne bois marrakech",
      "changer toile chilienne"
    ],
    "pinterestUrl": "https://www.pinterest.com/kansotex",
    "tableOfContents": [
      {
        "id": "pourquoi-renover",
        "title": "1. Pourquoi rénover la toile plutôt que racheter une chilienne bon marché ?",
        "titleEn": "1. Why re-canvas rather than buy cheap deckchairs?"
      },
      {
        "id": "fibres-gagnantes",
        "title": "2. Les fibres qui résistent au soleil de Marrakech et au chlore",
        "titleEn": "2. The winning fibers against Marrakech sun and pool chlorine"
      },
      {
        "id": "tableau-chilienne",
        "title": "3. Tableau comparatif : Toile Kansotex vs Toile Standard",
        "titleEn": "3. Comparative Table: Kansotex Canvas vs Standard Fabric"
      },
      {
        "id": "prendre-cotes",
        "title": "4. Comment mesurer précisément votre ancienne toile (Largeur 43 cm standard)",
        "titleEn": "4. How to accurately measure your existing sling (Standard 43 cm width)"
      },
      {
        "id": "etapes-remplacement",
        "title": "5. Les 4 étapes pour remplacer la toile sans outillage lourd",
        "titleEn": "5. The 4 steps to replace canvas without heavy tools"
      },
      {
        "id": "faq-chiliennes",
        "title": "6. Foire Aux Questions (FAQ)",
        "titleEn": "6. Frequently Asked Questions (FAQ)"
      }
    ],
    "technicalTable": {
      "caption": "Toile de Chilienne Outdoor Kansotex vs Toiles Entrée de Gamme du Marché",
      "rows": [
        {
          "metric": "Composition du fil",
          "kansotexSpec": "100% Acrylique teinté dans la masse (Sun-Resistant)",
          "standardMarket": "Polyester 100% teinté en surface",
          "practicalImpact": "Ne se décolore pas après 5 étés d'exposition directe au soleil zénithal.",
          "metricEn": "Yarn composition",
          "kansotexSpecEn": "100% Solution-dyed acrylic (Sun-Resistant)",
          "standardMarketEn": "100% surface-printed polyester",
          "practicalImpactEn": "Zero sun fading even after 5 consecutive summers of direct high-noon exposure."
        },
        {
          "metric": "Grammage au m²",
          "kansotexSpec": "320 g/m² (Maintien corporel rigide sans pochage)",
          "standardMarket": "180 à 220 g/m² (Toile qui se détend)",
          "practicalImpact": "Soutien ferme du dos, aucune sensation d'affaissement au fil des heures.",
          "metricEn": "Basis weight (g/m²)",
          "kansotexSpecEn": "320 g/m² (Rigid body support without sagging)",
          "standardMarketEn": "180 to 220 g/m² (Stretches and loses shape)",
          "practicalImpactEn": "Maintains firm lumbar support without uncomfortable body sagging over time."
        },
        {
          "metric": "Résistance au chlore & sel de piscine",
          "kansotexSpec": "Traitement hydrofuge résistant au chlore actif",
          "standardMarket": "Non traitée (blanchiment rapide)",
          "practicalImpact": "S'assoir en maillot de bain mouillé ne crée aucune auréole décolorée.",
          "metricEn": "Resistance to chlorine & pool salt",
          "kansotexSpecEn": "Waterproof finish resistant to active pool chemicals",
          "standardMarketEn": "Untreated (rapid bleaching and yellowing)",
          "practicalImpactEn": "Lounging in wet swimwear causes no discoloration or bleached halo rings."
        },
        {
          "metric": "Finition des ourlets d'accroche",
          "kansotexSpec": "Fourreaux doubles avec renfort de jonc plastique incassable",
          "standardMarket": "Simple pli agrafé fragile",
          "practicalImpact": "Sécurité totale : la toile ne peut pas se décrocher sous le poids.",
          "metricEn": "Attachment sleeve finish",
          "kansotexSpecEn": "Double sewn sleeves reinforced with unbreakable retention rods",
          "standardMarketEn": "Single stapled fold prone to tearing",
          "practicalImpactEn": "Absolute safety: the sling canvas cannot pull loose under adult weight."
        }
      ],
      "captionEn": "Kansotex Outdoor Sling Canvas vs Generic Mass-Market Replacement Slings"
    },
    "faqs": [
      {
        "question": "Quelle est la dimension standard d'une toile de chilienne à Marrakech ?",
        "answer": "La grande majorité des transats en hêtre ou acacia au Maroc utilisent une largeur standard de **43 cm** (parfois 45 cm) pour une longueur déroulée comprise entre **120 cm et 130 cm**. Dans notre atelier de Marrakech, nous coupons vos toiles exactement au millimètre près d'après votre ancienne toile ou vos baguettes de fixation.",
        "questionEn": "What is the standard dimension for deckchair replacement canvas in Marrakech?",
        "answerEn": "The vast majority of beech and acacia deckchairs in Morocco feature a standard width of 43 cm (occasionally 45 cm) with a rolled length between 120 cm and 130 cm. In our Marrakech atelier, we cut your replacement slings to the exact millimeter matching your frame."
      },
      {
        "question": "Peut-on commander des toiles rayées ou personnalisées ?",
        "answer": "Oui ! Nous disposons d'une vaste sélection de rayures bayadères inspirées des rivieras méditerranéennes et des kasbahs de l'Atlas (rayures sable/écru, vert cyprès/terracotta, bleu indigo/blanc) ainsi que des unis texturés effet lin.",
        "questionEn": "Can we order striped or customized replacement canvas?",
        "answerEn": "Yes! We curate an extensive selection of deckchair bayadère stripes inspired by the Mediterranean Riviera and Atlas kasbahs (sand/ecru, cypress green/terracotta, indigo blue/chalk) as well as textured linen-look solids."
      }
    ],
    "relatedProducts": [
      {
        "slug": "toile-outdoor-atlas-sable",
        "name": "Toile Outdoor Atlas — Sable Ocre",
        "category": "Outdoor",
        "image": "/gallery/matiere-tissus-outdoor-rooftop.jpg",
        "highlight": "Grammage lourd 320 g/m² · Spécial Chiliennes"
      },
      {
        "slug": "velours-coton-gueliz",
        "name": "Velours Peigné Guéliz",
        "category": "Indoor",
        "image": "/gallery/tissus-haut-de-gamme.webp",
        "highlight": "Pour coussins intérieurs coordonnés"
      }
    ],
    "sections": [
      {
        "id": "pourquoi-renover",
        "heading": "1. Pourquoi rénover la toile plutôt que racheter une chilienne bon marché ?",
        "content": "À l'arrivée des beaux jours, nombreuses sont les terrasses de Marrakech où les chiliennes ressortent du local technique avec une toile décolorée, tachetée par les intempéries ou déchirée à l'assise.\n\nLe réflexe facile consiste à racheter des transats neufs d'entrée de gamme à 500 ou 600 DH. Pourtant, les ossatures en bois dur (acacia, hêtre massif ou teck) traversent les décennies sans faiblir. Remplacer uniquement la toile par une étoffe acrylique noble de fabrication haute facture présente un triple avantage :\n1. **Économique** : Vous économisez le coût d'une structure neuve.\n2. **Esthétique** : Vous choisissez une matière texturée digne d'un hôtel de luxe, à des années-lumière des toiles synthétiques criardes.\n3. **Durable** : Une toile outdoor Kansotex résiste plus de 8 ans sans ternir sous les rayons UV de Marrakech.",
        "callout": {
          "title": "L'alternative éco-responsable de luxe",
          "text": "Rénover la toile d'une chilienne de qualité s'inscrit dans l'esprit Kanso : la simplicité épurée, le respect des matières nobles et le refus du jetable.",
          "type": "atelier"
        },
        "headingEn": "1. Why re-canvas rather than buy cheap deckchairs?",
        "contentEn": "Solid acacia, teak, or beech wood deckchair frames frequently outlive their original fabric by decades. Discarding a well-built wooden frame merely because the fabric faded after a single summer is economically wasteful and ecologically unsound.\n\nReplacing the sling with high-performance solution-dyed acrylic canvas from Kansotex restores your outdoor furniture to luxury hotel standards at a fraction of the cost of new loungers."
      },
      {
        "id": "fibres-gagnantes",
        "heading": "2. Les fibres qui résistent au soleil de Marrakech et au chlore",
        "content": "Sous un indice UV estival qui flirte avec 11+ à Marrakech, une toile en coton ordinaire ou en polyester bas de gamme cuit au soleil en quelques semaines : le tissu devient cassant et cède dès qu'un invité s'y assoit.\n\nNos toiles de chiliennes Kansotex utilisent exclusivement des fils **100% acrylique teintés dans la masse (solution-dyed)** :\n- **Pigmentation à cœur** : La couleur ne craint ni le soleil zénithal, ni les éclaboussures de chlore au bord de la piscine.\n- **Apprêt Téflon® EcoElite** : L'eau glisse sur l'étoffe sans pénétrer. Vous pouvez renverser un verre de jus d'orange ou de thé sans laisser de tache permanente.\n- **Tissage sergé dense** : Une trame serrée qui épouse les formes du corps sans jamais s'affaisser ni pocher au fil des après-midis de détente.",
        "quote": {
          "text": "Une chilienne réussie est celle qui accueille le corps avec fermeté et douceur. La toile doit tendre sous la charge sans jamais s'étirer irréversiblement.",
          "author": "Maître Hassan",
          "role": "Chef de Confection Outdoor Kansotex"
        },
        "image": {
          "url": "/gallery/matiere-tissus-outdoor-rooftop.jpg",
          "alt": "Tissage sergé acrylique 320g/m² Kansotex avec perles d'eau et résistance au chlore",
          "caption": "Trame acrylique teintée dans la masse 320g/m² traitée Téflon® : les gouttes perlent sans altérer la fibre face aux embruns chlorés de piscine."
        },
        "headingEn": "2. The winning fibers against Marrakech sun and pool chlorine",
        "contentEn": "Poolside loungers endure intense solar radiation compounded by chemical splashes containing chlorine and bromine.\n\nOur sling canvases are woven with solution-dyed acrylic yarns treated with an active chlorine-resistant and anti-fungal barrier that prevents fabric degradation and mildew."
      },
      {
        "id": "tableau-chilienne",
        "heading": "3. Tableau comparatif : Toile Kansotex vs Toile Standard",
        "content": "Pour comprendre pourquoi les hôtels 5 étoiles et riads prestigieux de Marrakech confient la réfection de leurs transats à notre atelier :",
        "headingEn": "3. Comparative Table: Kansotex Canvas vs Standard Fabric",
        "contentEn": "Review the essential metrics when selecting replacement canvas for outdoor lounging:"
      },
      {
        "id": "prendre-cotes",
        "heading": "4. Comment mesurer précisément votre ancienne toile (Largeur 43 cm standard)",
        "content": "Pour passer commande auprès de notre manufacture :\n1. **Démontez votre ancienne toile** et posez-la à plat sur une grande table.\n2. **Mesurez la largeur entre les deux lisières** : La mesure standard est généralement de **43 cm** (hors coutures).\n3. **Mesurez la longueur totale d'une extrémité à l'autre** : Comptez environ **125 à 130 cm** d'ourlet à ourlet.\n4. **Vérifiez le type de fixation** :\n   - *À fourreaux pour baguettes de bois (le plus fréquent)* : Deux tunnels cousus en haut et en bas dans lesquels glisse un jonc rond amovible.\n   - *À clous tapissiers ou agrafes* : Si la toile était fixée directement sur le barreau en bois.",
        "image": {
          "url": "/gallery/accompagnement-equipe-kansotex.webp",
          "alt": "Vérification des cotes et découpe d'une toile de chilienne dans l'atelier Kansotex à Marrakech",
          "caption": "Prise de cotes d'une toile de 43 cm et préparation des fourreaux doubles renforcés par nos artisans sur table de coupe."
        },
        "headingEn": "4. How to accurately measure your existing sling (Standard 43 cm width)",
        "contentEn": "Measure the width between the frame rails (most commonly 43 cm) and the total unfolded length including the hems that wrap around the wooden dowels (typically 125 cm to 130 cm)."
      },
      {
        "id": "etapes-remplacement",
        "heading": "5. Les 4 étapes pour remplacer la toile sans outillage lourd",
        "content": "Le changement d'une toile à fourreaux prend moins de 10 minutes par transat :\n1. Dépliez la chilienne et retirez les deux baguettes en bois ou joncs plastiques glissés dans les fourreaux haut et bas.\n2. Dégagez l'ancienne toile de la fente du barreau.\n3. Glissez la nouvelle toile Kansotex dans les rainures en veillant à orienter le côté déperlant vers le ciel.\n4. Réinsérez les baguettes de blocage à l'intérieur des fourreaux. Lorsque vous vous asseyez, la tension naturelle verrouille le jonc dans son encoche. C'est prêt !",
        "headingEn": "5. The 4 steps to replace canvas without heavy tools",
        "contentEn": "1. Slide out the old retention dowels from the top and bottom grooves.\n2. Remove the worn fabric.\n3. Slide the new Kansotex sling into the grooves.\n4. Insert the heavy-duty acrylic retention dowels provided by our workshop."
      },
      {
        "id": "faq-chiliennes",
        "heading": "6. Foire Aux Questions (FAQ)",
        "content": "Retrouvez les conseils de nos tapissiers pour réussir la rénovation de vos transats de piscine et terrasse.",
        "headingEn": "6. Frequently Asked Questions (FAQ)",
        "contentEn": "Discover answers from our master upholsterers on refreshing your poolside loungers and daybeds."
      }
    ],
    "coverAltEn": "Bespoke handcrafted deckchair in noble wood with terracotta striped outdoor canvas by Kansotex by a riad pool"
  },
  {
    "slug": "mousse-dryfeel-tissus-outdoor-piscine-marrakech",
    "title": "Mousse Réticulée Dryfeel & Tissus Imperméables : La Formule Anti-Moisissure pour Daybeds & Margelles de Piscine",
    "titleEn": "Dryfeel Reticulated Foam & Waterproof Fabrics: The Mildew-Proof Formula for Poolside Daybeds",
    "kicker": "Ingénierie Outdoor & Confort Réticulé",
    "excerpt": "Découvrez pourquoi une mousse classique pourrit sous une housse de piscine et comment l'association Mousse Dryfeel alvéolaire + toile acrylique déperlante garantit un séchage en 20 minutes sans odeurs.",
    "excerptEn": "Discover why standard foam rots inside poolside cushions and how open-cell reticulated Dryfeel foam dries in 20 minutes without mildew.",
    "category": "Outdoor & Terrasses",
    "categorySlug": "outdoor",
    "coverImage": "/gallery/daybed-mousse-dryfeel-piscine-marrakech.jpg",
    "coverAlt": "Daybed double outdoor avec matelas déperlant et mousse réticulée Dryfeel face à la piscine et l'Atlas à Marrakech",
    "publishedAt": "2026-10-14T12:00:00.000Z",
    "readingTime": "8 min",
    "author": {
      "name": "Studio Design Kansotex",
      "role": "Bureau d'Études Textiles & Projets B2B",
      "avatar": "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
      "bio": "Accompagne maîtres d'œuvre, hôteliers et décorateurs dans l'élaboration de dossiers techniques, choix de fibres durables et confections sur-mesure."
    },
    "metaDescription": "Guide technique sur la mousse réticulée Dryfeel et toiles étanches pour daybeds et transats à Marrakech. Zéro moisissure, séchage rapide et confort ferme.",
    "metaDescriptionEn": "Technical guide on reticulated Dryfeel foam and waterproof fabrics for poolside daybeds in Marrakech. Anti-mildew, quick drying.",
    "seoKeywords": [
      "mousse sur mesure outdoor maroc",
      "mousse dryfeel marrakech",
      "matelas transat piscine impermeable",
      "coussin etanche daybed riad",
      "tissu resistant chlore et sel maroc",
      "mousse drainante seche vite",
      "housse transat anti uv",
      "amenagement piscine villa marrakech"
    ],
    "pinterestUrl": "https://www.pinterest.com/kansotex",
    "tableOfContents": [
      {
        "id": "pourquoi-mousses-pourrissent",
        "title": "1. Pourquoi les mousses traditionnelles pourrissent au bord de la piscine",
        "titleEn": "1. Why traditional foams rot beside the swimming pool"
      },
      {
        "id": "anatomie-dryfeel",
        "title": "2. L'anatomie de la mousse réticulée Dryfeel : 100% cellules ouvertes",
        "titleEn": "2. The anatomy of reticulated Dryfeel foam: 100% open-cell"
      },
      {
        "id": "tableau-dryfeel",
        "title": "3. Tableau comparatif : Mousse Dryfeel vs Mousse Polyuréthane Classique",
        "titleEn": "3. Comparative Table: Dryfeel Foam vs Standard Polyurethane Foam"
      },
      {
        "id": "assemblage-kansotex",
        "title": "4. L'assemblage sandwich exclusif de l'Atelier Kansotex",
        "titleEn": "4. The exclusive sandwich assembly by Atelier Kansotex"
      },
      {
        "id": "faq-dryfeel",
        "title": "5. Foire Aux Questions (FAQ)",
        "titleEn": "5. Frequently Asked Questions (FAQ)"
      }
    ],
    "technicalTable": {
      "caption": "Comparaison des Propriétés d'Écoulement : Mousse Dryfeel vs Mousse Haute Résilience Standard",
      "rows": [
        {
          "metric": "Structure cellulaire",
          "kansotexSpec": "Réticulée 100% ouverte (Structure nid d'abeille)",
          "standardMarket": "Cellules fermées semi-perméables (Éponge)",
          "practicalImpact": "L'eau traverse le bloc de mousse sans aucune rétention par capillarité.",
          "metricEn": "Cellular structure",
          "kansotexSpecEn": "100% open honeycomb reticulated matrix",
          "standardMarketEn": "Closed semi-permeable cells (acts like a sponge)",
          "practicalImpactEn": "Water pours right through the foam block with zero capillary water retention."
        },
        {
          "metric": "Temps d'évacuation de l'eau après immersion",
          "kansotexSpec": "Moins de 20 minutes au soleil de Marrakech",
          "standardMarket": "24 à 48 heures de séchage avec odeurs",
          "practicalImpact": "Les transats peuvent être réutilisés immédiatement après une baignade ou un orage.",
          "metricEn": "Water evacuation time after full saturation",
          "kansotexSpecEn": "Under 20 minutes in the Marrakech sun",
          "standardMarketEn": "24 to 48 hours of drying with musty odors",
          "practicalImpactEn": "Pool loungers and daybeds are fully dry and ready to use immediately after rain or swimming."
        },
        {
          "metric": "Traitement anti-moisissures & bactéries",
          "kansotexSpec": "Agent biocide actif polymérisé dans la masse",
          "standardMarket": "Aucun traitement antifongique",
          "practicalImpact": "Empêche le noircissement interne et les odeurs d'humidité en climat chaud.",
          "metricEn": "Anti-mildew and antimicrobial treatment",
          "kansotexSpecEn": "Active biocide agent polymerized within the core polymer",
          "standardMarketEn": "No antifungal protection",
          "practicalImpactEn": "Prevents internal black mold and damp odors even under humid pool climates."
        }
      ],
      "captionEn": "Drainage Flow Comparison: Reticulated Dryfeel Foam vs Standard High Resilience Foam"
    },
    "faqs": [
      {
        "question": "Faut-il rentrer les coussins Dryfeel en cas de pluie à Marrakech ?",
        "answer": "Non ! C'est tout l'intérêt de notre conception outdoor : la mousse Dryfeel ne craint pas l'eau. Même sous une pluie torrentielle, l'eau s'écoule par gravité à travers le coussin et ressort par la sous-face en résille. Le coussin sèche en plein air en moins de 30 minutes dès le retour du soleil.",
        "questionEn": "Do Dryfeel cushions need to be brought indoors during Marrakech rain?",
        "answerEn": "No! That is the primary virtue of our outdoor engineering: Dryfeel foam cannot rot. Even during torrential storms, water flows freely through the cushion by gravity and drains through the mesh bottom panel. The cushion dries in open air in under 30 minutes once the sun re-emerges."
      }
    ],
    "relatedProducts": [
      {
        "slug": "toile-outdoor-atlas-sable",
        "name": "Toile Outdoor Atlas — Traitée UV",
        "category": "Outdoor",
        "image": "/gallery/matiere-tissus-outdoor-rooftop.jpg",
        "highlight": "Hydrophobe & Déperlante"
      }
    ],
    "sections": [
      {
        "id": "pourquoi-mousses-pourrissent",
        "heading": "1. Pourquoi les mousses traditionnelles pourrissent au bord de la piscine",
        "content": "Combien de propriétaires de riads ou de villas à Marrakech découvrent au printemps que les coussins de leurs daybeds de piscine dégagent une odeur nauséabonde d'humidité et se couvrent de points noirs à l'intérieur ?\n\nLe coupable est presque toujours le même : **l'utilisation d'une mousse polyuréthane classique pour canapé intérieur**. \nMême si la housse extérieure est vendue comme 'imperméable', l'eau de pluie ou l'humidité des maillots de bain finit toujours par s'infiltrer par les piqûres d'aiguille et la fermeture éclair. Une fois emprisonnée dans une mousse à cellules fermées, l'eau stagne à 35°C, créant un incubateur idéal pour les moisissures et la prolifération bactérienne.",
        "headingEn": "1. Why traditional foams rot beside the swimming pool",
        "contentEn": "Countless riad and villa owners in Marrakech discover each spring that their poolside daybed cushions smell of stagnant damp and harbor black mildew spots inside.\n\nThe culprit is almost invariably **the use of standard indoor polyurethane furniture foam**.\nEven when outer covers are advertised as 'waterproof', rainwater and wet swimwear moisture inevitably penetrate through needle stitching holes and zippers. Once trapped within closed-cell foam, water stagnates at 35°C, creating a breeding ground for mold and bacterial odor."
      },
      {
        "id": "anatomie-dryfeel",
        "heading": "2. L'anatomie de la mousse réticulée Dryfeel : 100% cellules ouvertes",
        "content": "La mousse réticulée (souvent connue sous la marque de référence *Dryfeel*) subit un traitement thermique de déflagration contrôlée lors de sa fabrication qui fait éclater toutes les parois des alvéoles.\n\nLe résultat ? Un squelette tridimensionnel alvéolaire composé à 100% de cellules ouvertes. Versez un seau d'eau sur un bloc de mousse Dryfeel : **l'eau passe instantanément au travers comme à travers un tamis**, sans être retenue par capillarité.\n\nDe plus, la matière est traitée avec un agent biocide certifié qui inhibe la formation de champignons et de bactéries même en immersion fréquente.",
        "image": {
          "url": "/gallery/matiere-tissus-outdoor-rooftop.jpg",
          "alt": "Toile déperlante respirante combinée à la mousse à cellules ouvertes Dryfeel Kansotex",
          "caption": "Déperlance oléophobe et respirabilité : l'eau glisse en surface sans bloquer la respiration alvéolaire de l'assise.",
          "altEn": "Water-repellent breathable fabric combined with open-cell Dryfeel foam",
          "captionEn": "Breathable water-repellent fabric combined with Kansotex Dryfeel open-cell foam."
        },
        "headingEn": "2. The anatomy of reticulated Dryfeel foam: 100% open-cell",
        "contentEn": "Reticulated foam (internationally benchmarked under the *Dryfeel* brand) undergoes a controlled thermal deflagration process during manufacture that blasts away all cell window membranes.\n\nThe result is a three-dimensional honeycomb skeleton composed of 100% open cells. Pour a bucket of water over a block of Dryfeel foam: **the water passes instantly straight through as if through a sieve**, without being trapped by capillary tension.\n\nFurthermore, the raw polymer is infused with a certified biocide that prevents fungal and bacterial colonization even under frequent immersion."
      },
      {
        "id": "tableau-dryfeel",
        "heading": "3. Tableau comparatif : Mousse Dryfeel vs Mousse Polyuréthane Classique",
        "content": "Voici l'analyse des propriétés indispensables pour vos espaces de baignade :",
        "headingEn": "3. Comparative Table: Dryfeel Foam vs Standard Polyurethane Foam",
        "contentEn": "Here is the critical performance evaluation for luxury poolside installations:"
      },
      {
        "id": "assemblage-kansotex",
        "heading": "4. L'assemblage sandwich exclusif de l'Atelier Kansotex",
        "content": "Pour conjuguer la fermeté drainante du Dryfeel avec l'accueil voluptueux attendu dans un palace ou un riad 5 étoiles, notre atelier de la Route de Safi a mis au point une architecture 'sandwich' exclusive :\n1. **Face supérieure et tour** : Toile acrylique Kansotex déperlante et anti-UV.\n2. **Couche d'accueil supérieure** : Mousse Dryfeel Soft (densité 30 kg/m³) de 4 cm pour un accueil moelleux sans effet de planche.\n3. **Cœur de soutien** : Mousse Dryfeel Firm (densité 35 kg/m³) de 8 à 12 cm garantissant une tenue sans affaissement.\n4. **Sous-face inférieure** : Panneau en résille technique Batyline micro-perforée qui permet à l'eau de s'évacuer immédiatement par le dessous sans jamais stagner contre le transat.",
        "image": {
          "url": "/gallery/Kansotex-outdoor-terasse-rooftop-2.webp",
          "alt": "Daybed de piscine et banquettes avec assise drainante Dryfeel dans un riad à Marrakech",
          "caption": "Architecture 4 couches Kansotex : toile acrylique déperlante, double densité Dryfeel et sous-face respirante Batyline."
        },
        "headingEn": "4. The exclusive sandwich assembly by Atelier Kansotex",
        "contentEn": "To combine the rapid drainage of Dryfeel with the sumptuous lounge comfort expected in a five-star riad or private palace, our Route de Safi atelier developed an exclusive sandwich architecture:\n1. **Top face and borders**: Kansotex water-repellent, UV-resistant solution-dyed acrylic fabric.\n2. **Top comfort layer**: 4 cm of Dryfeel Soft foam (30 kg/m³ density) for a plush initial sit without a rigid board sensation.\n3. **Firm supportive core**: 10 cm of Dryfeel Firm foam (35 kg/m³) to maintain postural support without bottoming out.\n4. **Underside**: Micro-perforated technical Batyline mesh to ensure unimpeded gravity drainage."
      },
      {
        "id": "faq-dryfeel",
        "heading": "5. Foire Aux Questions (FAQ)",
        "content": "Retrouvez les réponses de notre bureau d'études outdoor.",
        "headingEn": "5. Frequently Asked Questions (FAQ)",
        "contentEn": "Find expert guidance from our textile engineers on building durable poolside daybeds and sunbed mattresses in Morocco."
      }
    ],
    "coverAltEn": "Double outdoor daybed with water-repellent mattress and Dryfeel reticulated foam overlooking the pool and Atlas in Marrakech"
  }
];

export const BLOG_CATEGORIES = [
  { name: "Tous les Articles", nameEn: "All Articles", slug: "all" },
  { name: "Outdoor & Terrasses", nameEn: "Outdoor & Terraces", slug: "outdoor" },
  { name: "Matières Nobles", nameEn: "Noble Materials", slug: "matieres" },
  { name: "Guides & Mesures", nameEn: "Guides & Measurements", slug: "guides" },
  { name: "Architecture & Riads", nameEn: "Architecture & Riads", slug: "architecture" },
  { name: "Savoir-Faire", nameEn: "Craftsmanship & Atelier", slug: "savoir-faire" },
] as const;

export function getBlogCategoryLabel(cat: string, isEn: boolean = false): string {
  const match = BLOG_CATEGORIES.find((c) => c.name === cat || c.slug === cat);
  if (!match) return cat;
  return isEn ? match.nameEn : match.name;
}

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedBlogPosts(currentSlug: string, count: number = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return BLOG_POSTS.slice(0, count);

  const sameCategory = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.categorySlug === current.categorySlug
  );
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }

  const others = BLOG_POSTS.filter(
    (p) => p.slug !== currentSlug && p.categorySlug !== current.categorySlug
  );
  return [...sameCategory, ...others].slice(0, count);
}
