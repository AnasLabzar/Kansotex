export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface TechnicalRow {
  metric: string;
  kansotexSpec: string;
  standardMarket: string;
  practicalImpact: string;
}

export interface RelatedProduct {
  slug: string;
  name: string;
  category: string;
  image: string;
  highlight: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  titleEn: string;
  kicker: string;
  excerpt: string;
  excerptEn: string;
  category: "Outdoor & Terrasses" | "Matières Nobles" | "Guides & Mesures" | "Architecture & Riads" | "Savoir-Faire";
  categorySlug: "outdoor" | "matieres" | "guides" | "architecture" | "savoir-faire";
  coverImage: string;
  coverAlt: string;
  publishedAt: string; // ISO date string
  readingTime: string;
  author: BlogAuthor;
  seoKeywords: string[];
  metaDescription: string;
  metaDescriptionEn: string;
  pinterestUrl?: string;
  tableOfContents: { id: string; title: string }[];
  technicalTable?: {
    caption: string;
    rows: TechnicalRow[];
  };
  faqs?: BlogFAQ[];
  relatedProducts?: RelatedProduct[];
  sections: {
    id: string;
    heading: string;
    subheading?: string;
    content: string; // HTML-safe or structured text paragraphs
    callout?: {
      title: string;
      text: string;
      type: "tip" | "warning" | "atelier";
    };
    quote?: {
      text: string;
      author: string;
      role: string;
    };
    image?: {
      url: string;
      alt: string;
      caption?: string;
    };
  }[];
}

export const BLOG_AUTHORS: Record<string, BlogAuthor> = {
  atelier: {
    name: "Maître Hassan & L'Atelier Kansotex",
    role: "Direction Technique de Confection — Marrakech",
    avatar: "/gallery/accompagnement-equipe-kansotex.jpg",
    bio: "Plus de 25 ans d'expertise dans le tissage traditionnel et la haute tapisserie d'ameublement in & outdoor à Marrakech. Conseille architectes et riads de prestige.",
  },
  studio: {
    name: "Studio Design Kansotex",
    role: "Bureau d'Études Textiles & Projets B2B",
    avatar: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
    bio: "Accompagne maîtres d'œuvre, hôteliers et décorateurs dans l'élaboration de dossiers techniques, choix de fibres durables et confections sur-mesure.",
  },
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "guide-tissus-outdoor-marrakech-riads-rooftops",
    title: "Le Guide Ultime des Tissus Outdoor pour Riads & Rooftops à Marrakech : Résister au Soleil Intense sans Compromis Esthétique",
    titleEn: "The Ultimate Guide to Outdoor Fabrics for Riads & Rooftops in Marrakech",
    kicker: "Haute Performance & Climat de l'Atlas",
    excerpt: "Sous le soleil de Marrakech et les amplitudes thermiques du Haut-Atlas, habiller un rooftop ou un patio de riad exige des fibres techniques d'exception. Analyse des indices UV, déperlance téflonée et mousses réticulées.",
    excerptEn: "Under the Marrakech sun and intense Atlas UV index, dressing a luxury rooftop or riad patio requires exceptional technical textiles.",
    category: "Outdoor & Terrasses",
    categorySlug: "outdoor",
    coverImage: "/gallery/Kansotex-outdoor-terasse-rooftop.webp",
    coverAlt: "Banquettes et coussins outdoor Kansotex sur un rooftop ensoleillé face à l'Atlas à Marrakech",
    publishedAt: "2026-10-10T09:00:00.000Z",
    readingTime: "9 min",
    author: BLOG_AUTHORS.atelier,
    metaDescription: "Guide expert sur les tissus outdoor à Marrakech : résistance UV Grade 8/8, déperlance téflonée, mousses drainantes QuickDry et confections sur-mesure pour riads.",
    metaDescriptionEn: "Expert guide on luxury outdoor textiles in Marrakech: UV Grade 8/8, Teflon water repellency, QuickDry foam and custom riad bespoke sewing.",
    seoKeywords: [
      "tissu outdoor marrakech",
      "toile déperlante riad",
      "tissu rooftop marrakech",
      "tissu acrylique teinté masse",
      "banquette outdoor sur mesure maroc",
      "mousse drainante quickdry marrakech",
      "résistance uv tissu extérieur",
    ],
    pinterestUrl: "https://www.pinterest.com/kansotex",
    tableOfContents: [
      { id: "le-defi-climatique", title: "1. Le défi climatique unique de Marrakech" },
      { id: "acrylique-vs-polyester", title: "2. Acrylique teinté dans la masse vs Polyester standard" },
      { id: "tableau-comparatif", title: "3. Tableau comparatif des performances techniques" },
      { id: "mousses-et-respirabilite", title: "4. Mousses drainantes & respirabilité sous les coussins" },
      { id: "choix-des-teintes", title: "5. Quelle palette chromatique face à la réverbération ocre ?" },
      { id: "confection-atelier", title: "6. Les secrets de couture de notre atelier de Marrakech" },
      { id: "faq-outdoor", title: "7. Foire Aux Questions (FAQ)" },
    ],
    technicalTable: {
      caption: "Étude comparative : Tissus Outdoor Kansotex vs Toiles d'Extérieur Entrée de Gamme",
      rows: [
        {
          metric: "Solidité des coloris à la lumière (ISO 105-B02)",
          kansotexSpec: "Grade 7-8 / 8 (Teinture dans la masse)",
          standardMarket: "Grade 4-5 / 8 (Teinture de surface)",
          practicalImpact: "Conserve l'intensité des teintes pendant 8 à 10 ans sans décoloration au soleil marocain."
        },
        {
          metric: "Résistance à l'abrasion (Test Martindale)",
          kansotexSpec: "45 000 à 60 000 tours",
          standardMarket: "15 000 à 20 000 tours",
          practicalImpact: "Supporte les frottements intensifs en hôtellerie, terrasses de restaurant et suites de riad."
        },
        {
          metric: "Traitement déperlant & oléophobe",
          kansotexSpec: "Enduction Téflon® EcoElite fluor-free",
          standardMarket: "Traitement spray temporaire",
          practicalImpact: "L'eau perle à la surface et n'imprègne pas la fibre. Résiste aux taches de café et thé à la menthe."
        },
        {
          metric: "Séchage & Anti-moisissure",
          kansotexSpec: "Séchage ultra-rapide (20 min) + biocide actif",
          standardMarket: "Rétention d'humidité prolongée",
          practicalImpact: "Évite toute formation d'auréoles ou d'odeurs même après les averses d'orage de l'Atlas."
        }
      ]
    },
    faqs: [
      {
        question: "Pourquoi les toiles outdoor standard blanchissent-elles si vite à Marrakech ?",
        answer: "À Marrakech, l'indice UV atteint régulièrement 11+ entre mai et septembre. Les tissus ordinaires sont simplement imprimés ou teints en surface : le rayonnement UV brise les molécules de pigment superficielles en quelques semaines. Chez Kansotex, nos toiles outdoor sont tissées à partir de fibres acryliques teintées dans la masse (solution-dyed) : la couleur est injectée au cœur même du polymère liquide avant filage, garantissant une tenue inaltérable."
      },
      {
        question: "Quelle mousse associer à vos tissus outdoor pour les assises de terrasse ?",
        answer: "Nous recommandons impérativement une mousse réticulée drainante à cellules ouvertes type QuickDry Foam (densité 30 à 35 kg/m³). Associée à nos toiles déperlantes et une sous-face en maille aérée (batyline ou résille technique), l'eau traverse instantanément le coussin sans stagner, permettant une réutilisation 30 minutes après une ondée."
      },
      {
        question: "Comment entretenir vos tissus outdoor face à la poussière du Chergui ?",
        answer: "Un simple brossage à sec régulier avec une brosse souple suffit pour éliminer la poussière du Chergui. Pour un nettoyage complet, une eau tiède avec un savon doux de Marseille (ou liquide vaisselle neutre) rincée à l'eau claire au jet d'arrosage redonne à l'étoffe son éclat d'origine sans altérer son apprêt déperlant."
      }
    ],
    relatedProducts: [
      {
        slug: "toile-outdoor-atlas-sable",
        name: "Toile Outdoor Atlas — Sable Ocre",
        category: "Outdoor",
        image: "/gallery/matiere-tissus-outdoor-rooftop.jpg",
        highlight: "Protection UV 50+ & Déperlance active"
      },
      {
        slug: "velours-coton-gueliz",
        name: "Velours Peigné Guéliz",
        category: "Indoor",
        image: "/gallery/tissus-haut-de-gamme.webp",
        highlight: "Martindale 50 000 tours"
      }
    ],
    sections: [
      {
        id: "le-defi-climatique",
        heading: "1. Le défi climatique unique de Marrakech pour les étoffes d'extérieur",
        content: `À Marrakech, la beauté envoûtante des terrasses et patios dissimule un véritable banc d'essai pour le textile. Avec plus de 300 jours d'ensoleillement par an, un indice UV dépassant fréquemment 11 au zénith et des écarts de température pouvant osciller de 15°C la nuit à 45°C le jour en période estivale, les toiles d'extérieur subissent une agression photochimique extrême.

Ajoutez à cela le vent du désert — le fameux *Chergui* — qui transporte des microparticules de sable siliceux abrasives, ainsi que les violents orages de fin d'été descendant du djebel Toubkal. Choisir un tissu d'ameublement outdoor pour un riad de la Médina, une villa de la Palmeraie ou un hôtel boutique de l'Hivernage ne relève donc pas d'une simple décision décorative : c'est un calcul d'ingénierie textile rigoureux.`,
        callout: {
          title: "Le constat de notre atelier",
          text: "Chaque année, plus de 40% des propriétaires de riads viennent nous voir après avoir acheté des toiles d'importation standard décolorées après seulement six mois. Une économie initiale apparente qui se transforme en double investissement.",
          type: "warning"
        }
      },
      {
        id: "acrylique-vs-polyester",
        heading: "2. Acrylique teinté dans la masse vs Polyester standard : la clé du mystère",
        content: `La différence fondamentale entre une étoffe qui perd ses nuances en une saison et une étoffe qui traverse les décennies réside dans la technique de coloration moléculaire.

Sur un fil de polyester classique ou un coton enduit ordinaire, la couleur est appliquée **en surface** après le tissage (teinture en pièce ou impression au cadre). C'est le principe d'un radis : la couleur est rouge à l'extérieur, mais le cœur reste immaculé. Dès que les rayons ultraviolets attaquent la couche superficielle, le blanc apparaît et le tissu devient terne et cassant.

À l'inverse, nos collections outdoor Kansotex sont composées de fibres **acryliques 100% teintées dans la masse**. Les pigments minéraux de haute pureté sont introduits dans la pâte de polymère avant même l'extrusion du filament. Le filament est ainsi coloré jusqu'à son cœur moléculaire, tel une carotte. Même exposé à un rayonnement zénithal ininterrompu, le tissu conserve l'intégralité de sa saturation lumineuse.`,
        quote: {
          text: "Travailler la matière à Marrakech, c'est apprendre à dialoguer avec le soleil sans jamais tenter de tricher avec lui. Si le pigment n'est pas scellé dans le polymère, le ciel d'ocre finira toujours par l'emporter.",
          author: "Maître Hassan",
          role: "Chef d'atelier tapisserie Kansotex Marrakech"
        },
        image: {
          url: "/gallery/matiere-tissus-outdoor-rooftop.jpg",
          alt: "Macro-tissage acrylique déperlant teinté dans la masse Kansotex avec perles d'eau",
          caption: "Détail de notre armure sergée déperlante : l'enduction fluor-free Téflon® EcoElite repousse l'eau sans altérer le toucher naturel du fil."
        }
      },
      {
        id: "tableau-comparatif",
        heading: "3. Tableau comparatif des performances techniques",
        content: `Pour guider les prescripteurs, architectes d'intérieur et maîtres d'ouvrage, nos ingénieurs ont synthétisé les normes techniques indispensables à exiger lors de la rédaction de vos cahiers des charges :`
      },
      {
        id: "mousses-et-respirabilite",
        heading: "4. Mousses drainantes & respirabilité sous les coussins",
        content: `Un tissu exceptionnel ne suffit pas si l'âme du coussin retient l'eau. Trop de projets de terrasses à Marrakech souffrent d'assises détrempées pendant des jours après un orage, favorisant l'apparition de moisissures sous la housse.

Dans notre atelier de la Route de Safi, nous confectionnons systématiquement les assises outdoor avec une double règle d'art :
1. **Âme en mousse réticulée drainante** : Contrairement aux mousses polyuréthane traditionnelles dont les cellules fermées retiennent l'eau comme une éponge, la mousse réticulée possède une structure alvéolaire 100% ouverte permettant à l'eau de s'écouler librement par gravité.
2. **Sous-face respirante en résille technique** : Le dessous de nos galettes d'assise intègre un panneau en maille micro-perforée qui permet à l'air de circuler en permanence, évitant l'effet de condensation entre le tissu et la structure métallique ou en zellige.`,
        image: {
          url: "/gallery/Kansotex-outdoor-terasse-rooftop-2.webp",
          alt: "Détail de confection d'assise outdoor drainante dans un riad à Marrakech",
          caption: "Banquettes d'angle sur-mesure confectionnées par Kansotex avec mousse réticulée et tissu outdoor teinté dans la masse."
        }
      },
      {
        id: "choix-des-teintes",
        heading: "5. Quelle palette chromatique face à la réverbération ocre de Marrakech ?",
        content: `L'environnement architectural de Marrakech impose une réflexion chromatique particulière. La ville rouge possède une lumière chaude et puissante, renvoyée par les enduits de chaux, le pisé et le tadelakt.

Voici les recommandations de notre studio de design :
- **Les Sables Chauds & Écru Naturel** : La teinte idéale pour les grandes assises de rooftop. Elle capte peu la chaleur, s'intègre harmonieusement au plâtre sculpté et ne révèle pas la fine poussière du désert.
- **Le Vert Oasis & Palmier** : Parfait pour créer des îlots de fraîcheur visuelle dans un patio minéral. Notre velours outdoor et notre toile sergé vert sauge créent un dialogue immédiat avec les orangers et les bananiers du riad.
- **Le Terracotta & Terre de Sienne** : Une couleur identitaire de Marrakech qui sublime les couchers de soleil sur la Koutoubia. À réserver de préférence pour les coussins d'accent et les jetés de banquette afin de structurer l'espace sans alourdir le volume.`,
        callout: {
          title: "Astuce thermique de l'Atelier",
          text: "Évitez le noir absolu et le bleu marine très foncé sur des assises en plein soleil direct sans ombrage : ces teintes peuvent emmagasiner jusqu'à 65°C de température de surface en milieu d'après-midi en juillet.",
          type: "tip"
        }
      },
      {
        id: "confection-atelier",
        heading: "6. Les secrets de couture de notre atelier de Marrakech",
        content: `La longévité d'un aménagement outdoor ne dépend pas seulement du tissu, mais de la manière dont il est assemblé :
- **Fils à coudre 100% PTFE / Polyéthylène haute ténacité** : Un fil ordinaire en coton ou polyester se désagrège sous les UV bien avant que le tissu ne fatigue. Nos coutures sont piquées avec des fils imputrescibles garantis 10 ans contre les rayons ultraviolets.
- **Fermetures éclair invisibles avec rabat de protection** : Toutes nos glissières sont dissimulées sous un ourlet pare-soleil qui protège les maillons de la poussière siliceuse et des rayons directs.
- **Surpiqûres rabattues étanches** : Chaque panneau d'assise subit une double piqûre rabattue qui empêche l'eau de pluie de pénétrer par les perforations de l'aiguille.`,
        quote: {
          text: "Une bonne housse doit pouvoir être déhoussée et lavée cent fois sans jamais perdre sa géométrie d'origine. C'est l'exigence que nous maintenons pour chaque maître d'ouvrage qui nous confie son établissement.",
          author: "Studio Kansotex",
          role: "Bureau de Confection Sur-Mesure"
        }
      },
      {
        id: "faq-outdoor",
        heading: "7. Foire Aux Questions (FAQ)",
        content: `Retrouvez ci-dessous les réponses aux interrogations les plus fréquentes formulées par nos clients architectes et particuliers lors de l'aménagement de leurs espaces extérieurs.`
      }
    ]
  },
  {
    slug: "lin-atlas-vs-velours-gueliz-rideaux-salons-suites",
    title: "Lin d'Atlas Pré-Lavé vs Velours de Coton Peigné : Quelle Étoffe Choisir pour Vos Rideaux de Salon & Suites ?",
    titleEn: "Atlas Pre-Washed Linen vs Combed Cotton Velvet: Which Luxury Fabric for Your Curtains & Suites?",
    kicker: "Matières Nobles & Confection d'Exception",
    excerpt: "Entre la légèreté vaporeuse d'un pur lin de l'Atlas au tombé plombé et l'opulence acoustique d'un velours de coton peigné, découvrez comment sélectionner la matière parfaite pour votre salon marocain contemporain ou suite royale.",
    excerptEn: "Between the breezy elegance of pure Atlas washed linen and the acoustic opulence of combed cotton velvet, discover how to dress your luxury interior.",
    category: "Matières Nobles",
    categorySlug: "matieres",
    coverImage: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.webp",
    coverAlt: "Rideaux en pur lin d'Atlas pré-lavé avec ourlet plombé artisanal dans un riad contemporain",
    publishedAt: "2026-10-12T11:00:00.000Z",
    readingTime: "8 min",
    author: BLOG_AUTHORS.atelier,
    metaDescription: "Comparatif expert entre lin pré-lavé et velours de coton pour rideaux haut de gamme à Marrakech. Isolation thermique, tombé plombé 10cm et acoustique.",
    metaDescriptionEn: "In-depth comparison between pre-washed linen and combed cotton velvet for luxury bespoke curtains in Marrakech. Thermal and acoustic insulation.",
    seoKeywords: [
      "rideaux lin marrakech",
      "velours de coton ameublement",
      "rideaux sur mesure marrakech",
      "tissu lin atlas lavé",
      "isolation phonique rideau velours",
      "ourlet plombé rideau confection",
      "tissu salon marocain contemporain",
    ],
    pinterestUrl: "https://www.pinterest.com/kansotex",
    tableOfContents: [
      { id: "duel-des-matieres", title: "1. Le duel de deux matières royales" },
      { id: "lin-atlas", title: "2. Le Pur Lin d'Atlas Pré-Lavé : La respiration de l'espace" },
      { id: "velours-peigne", title: "3. Le Velours de Coton Peigné : L'écrin thermique et acoustique" },
      { id: "tableau-comparatif-indoor", title: "4. Tableau comparatif : Lin vs Velours" },
      { id: "l-art-du-tombe", title: "5. L'art du tombé : Pourquoi l'ourlet plombé de 10 cm change tout" },
      { id: "recommandations-pieces", title: "6. Quelle matière pour quelle pièce ?" },
      { id: "faq-indoor", title: "7. Foire Aux Questions (FAQ)" },
    ],
    technicalTable: {
      caption: "Comparaison Technique : Lin d'Atlas Pré-Lavé Kansotex vs Velours Peigné Guéliz",
      rows: [
        {
          metric: "Grammage & Densité",
          kansotexSpec: "Lin : 380 g/m² | Velours : 540 g/m²",
          standardMarket: "Lin standard : 240 g/m² | Velours : 380 g/m²",
          practicalImpact: "Un grammage généreux garantit un tombé sculptural droit sans faux-plis disgracieux."
        },
        {
          metric: "Coefficient d'isolation phonique (NRC)",
          kansotexSpec: "Velours : NRC 0.65 (réduction écho) | Lin : NRC 0.35",
          standardMarket: "Tissus synthétiques fins : NRC 0.15",
          practicalImpact: "Le velours absorbe la réverbération des murs en zellige et sols en marbre des grands volumes."
        },
        {
          metric: "Régulation thermique & Respirabilité",
          kansotexSpec: "Lin : Fibre creuse thermorégulatrice active",
          standardMarket: "Polyester : Effet de serre intérieur",
          practicalImpact: "Le lin filtre l'air chaud en journée et conserve une sensation de fraîcheur naturelle."
        },
        {
          metric: "Occultation lumineuse",
          kansotexSpec: "Lin : 60-70% (Lumière tamisée) | Velours doublé : 100% Blackout",
          standardMarket: "Toiles simples : 40% de filtration",
          practicalImpact: "Permet de choisir entre ambiance solaire chaleureuse ou obscurité totale pour le sommeil."
        }
      ]
    },
    faqs: [
      {
        question: "Le lin ne risque-t-il pas de rétrécir après confection à Marrakech ?",
        answer: "Le lin brut peut en effet rétrécir de 8 à 12% lors du premier nettoyage. C'est précisément pour cela que nos lins Kansotex sont pré-lavés à haute température en manufacture (stonewashed) et stabilisés dimensionnellement avant d'être coupés dans notre atelier. Vos rideaux ne bougeront pas d'un millimètre dans le temps."
      },
      {
        question: "Peut-on associer lin et velours dans un même salon ?",
        answer: "Absolument, c'est l'un des mariages les plus raffinés préconisés par les décorateurs de renom à Marrakech. L'association classique consiste à installer des voilages ou rideaux légers en pur lin d'Atlas pour filtrer le soleil de jour, doublés de doubles-rideaux latéraux majestueux en velours de coton peigné tirés le soir pour l'intimité et le confort acoustique."
      }
    ],
    relatedProducts: [
      {
        slug: "lin-naturel-atlas-lave",
        name: "Pur Lin d'Atlas Pré-Lavé",
        category: "Indoor",
        image: "/gallery/linen_fabric_closeup_1791052926029.jpg",
        highlight: "380 g/m² · Fibre naturelle thermorégulatrice"
      },
      {
        slug: "velours-coton-gueliz",
        name: "Velours Coton Peigné Guéliz",
        category: "Indoor",
        image: "/gallery/tissus-haut-de-gamme.webp",
        highlight: "540 g/m² · Isolation acoustique NRC 0.65"
      }
    ],
    sections: [
      {
        id: "duel-des-matieres",
        heading: "1. Le duel de deux matières royales dans l'architecture marocaine",
        content: `Le choix des étoffes d'un intérieur ne répond pas seulement à une exigence visuelle. Il sculpte le volume sonore de la pièce, module l'intensité de la lumière naturelle et dicte la sensation tactile lorsque l'on effleure une tenture.

Dans les riads de la Médina comme dans les villas contemporaines d'Amelkis ou de la Palmeraie, deux étoffes incarnent le sommet de la haute tapisserie : le **Pur Lin d'Atlas Pré-Lavé** et le **Velours de Coton Peigné**. Si chacune possède sa noblesse propre, leurs propriétés physiques et leur impact sur l'atmosphère d'une pièce sont diamétralement opposés.`,
        callout: {
          title: "Le regard de l'artisan",
          text: "Le lin est la matière du souffle et de la lumière. Le velours est la matière du silence et de la profondeur. Choisir entre les deux, c'est décider de l'âme que vous souhaitez insuffler à votre espace.",
          type: "atelier"
        }
      },
      {
        id: "lin-atlas",
        heading: "2. Le Pur Lin d'Atlas Pré-Lavé : La respiration de l'espace",
        content: `Fibre végétale millénaire, le lin possède une structure interne alvéolaire creuse qui en fait un régulateur thermique naturel sans équivalent. Sous les latitudes ensoleillées de Marrakech, le lin filtre l'ardeur du soleil sans jamais plonger la pièce dans une obscurité artificielle.

Notre lin d'Atlas se distingue par un **grammage lourd de 380 g/m²** et un traitement aux enzymes de pierre (stonewash). Ce procédé assouplit le fil de chaîne tout en révélant une texture légèrement froissée, vibrante, qui ne nécessite aucun repassage compassé.

La lumière qui traverse un rideau en lin Kansotex baigne les zelliges et les plâtres d'une clarté douce et poudrée, tout en préservant une parfaite intimité visuelle depuis l'extérieur.`,
        image: {
          url: "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.webp",
          alt: "Rideaux en lin dans un salon baigné de lumière naturelle à Marrakech",
          caption: "Lin d'Atlas pré-lavé Kansotex : tombé droit et filtration de la lumière zénithale."
        }
      },
      {
        id: "velours-peigne",
        heading: "3. Le Velours de Coton Peigné : L'écrin thermique et acoustique",
        content: `Lorsque les hauteurs sous plafond dépassent 4 mètres — situation fréquente dans les grandes réceptions et les patios couverts — la réverbération sonore devient un enjeu majeur. Les sols en marbre ou bejmat et les parois enduites renvoient les ondes acoustiques, créant un effet d'écho désagréable lors des réceptions.

C'est ici que le **Velours de Coton Peigné Guéliz** déploie toute sa suprématie :
- **Absorption phonique certifiée (NRC 0.65)** : Grâce à sa densité de poils serrés (plus de 180 000 poils au m²), le velours brise l'onde sonore et étouffe les échos indésirables.
- **Barrière thermique contre le froid hivernal** : Les nuits d'hiver à Marrakech peuvent être particulièrement fraîches (parfois 4°C). Tirer des doubles rideaux en velours lourd de 540 g/m² crée une chambre d'air isolante qui réduit les déperditions thermiques de vos baies vitrées de près de 30%.
- **Chatoiement sous l'éclairage nocturne** : Sous la lumière tamisée des lanternes en laiton ciselé, le velours de coton reflète des reflets profonds et voluptueux qui confèrent au salon une aura de sanctuaire aristocratique.`,
        quote: {
          text: "Un salon sans rideaux de velours à Marrakech est comme une harpe sans caisse de résonance. C'est l'épaisseur du coton peigné qui apporte cette rondeur feutrée si caractéristique des grandes demeures impériales.",
          author: "Studio Kansotex",
          role: "Département Hôtellerie & Résidences Privées"
        },
        image: {
          url: "/gallery/Kansotex-indoor-living-room-pinterest.webp",
          alt: "Double rideaux en velours de coton peigné dans un salon de réception à Marrakech",
          caption: "Absorption acoustique (NRC 0.65) et prestance feutrée : le velours lourd 540g/m² Kansotex structure les volumes sous 4m de plafond."
        }
      },
      {
        id: "tableau-comparatif-indoor",
        heading: "4. Tableau comparatif : Lin vs Velours",
        content: `Pour vous orienter avec précision selon les spécificités de votre projet, voici la confrontation technique de nos deux étoffes signatures :`
      },
      {
        id: "l-art-du-tombe",
        heading: "5. L'art du tombé : Pourquoi l'ourlet plombé de 10 cm change tout",
        content: `La qualité d'un rideau de prestige ne se mesure pas seulement au métrage de tissu déroulé, mais à la façon dont il embrasse le sol.

Un rideau d'entrée de gamme présente souvent un ourlet bas étriqué de 2 à 4 cm, piqué à la machine industrielle, qui ondule et rebique au gré des courants d'air. 

Dans la manufacture Kansotex de Marrakech, chaque panneau de rideau est doté d'un **ourlet double de 10 cm cousu au point invisible à la main**, dans lequel nos artisans glissent un fil de plomb calibré ou des pastilles de lestage aux deux angles. 

Ce plombage invisible confère au tissu une inertie gravitaire parfaite :
1. Les plis verticaux restent droits et nets du rail jusqu'au sol.
2. Le bas du panneau vient effleurer le parquet ou le zellige avec une précision au millimètre.
3. Aucune ligne de couture n'est apparente sur la face endroit du rideau.`,
        callout: {
          title: "Règle de pose de l'Atelier",
          text: "Pour un rendu haute-couture 'cassant sur le sol', nos confectionneurs ajoutent exactement 2,5 cm à 3 cm de tissu au métrage hauteur sol-tringle pour que l'étoffe vienne délicatement se déposer sur le pavement sans ramasser la poussière.",
          type: "tip"
        }
      },
      {
        id: "recommandations-pieces",
        heading: "6. Quelle matière pour quelle pièce ?",
        content: `En conclusion, voici la règle d'or appliquée par notre bureau d'études :
- **Séjour, Salle à manger & Patio véranda** : Privilégiez le *Pur Lin d'Atlas Pré-Lavé* pour maximiser la lumière naturelle, aérer la perspective et inviter le jardin à l'intérieur.
- **Suites parentales & Chambres d'hôtes** : Optez pour le *Velours Peigné doublé* pour garantir une obscurité totale bienfaisante, une isolation phonique contre les bruits nocturnes et une intimité cocon.
- **Salons de réception & Bibliothèques** : Superposez les deux ! Un voilage lin filtrant en premier plan et des doubles-rideaux velours en encadrement théâtral.`
      },
      {
        id: "faq-indoor",
        heading: "7. Foire Aux Questions (FAQ)",
        content: `Retrouvez les réponses techniques de nos maîtres tapissiers pour réussir l'habillement textile de votre demeure.`
      }
    ]
  },
  {
    slug: "comment-mesurer-calculer-metrage-rideaux-sur-mesure",
    title: "Comment Prendre Vos Mesures & Calculer le Métrage de Vos Rideaux : Le Manuel Pratique de Notre Manufacture",
    titleEn: "How to Measure and Calculate Fabric Yardage for Bespoke Curtains: The Master Workshop Guide",
    kicker: "Guide Technique & Métrage Précis",
    excerpt: "Calcul du coefficient de fronce (1.8x à 2.2x), prise de cotes tringle-au-sol, dégagement des retours muraux et métrage des lès : le guide complet de nos maîtres confectionneurs pour ne jamais vous tromper.",
    excerptEn: "Calculation of gathering fullness (1.8x to 2.2x), rod-to-floor measurements, wall returns and panel cuts: the complete master workshop guide.",
    category: "Guides & Mesures",
    categorySlug: "guides",
    coverImage: "/gallery/accompagnement-equipe-kansotex.webp",
    coverAlt: "Maîtres artisans de l'atelier Kansotex prenant des mesures précises sur une pièce d'étoffe",
    publishedAt: "2026-10-14T08:00:00.000Z",
    readingTime: "7 min",
    author: BLOG_AUTHORS.atelier,
    metaDescription: "Guide étape par étape pour mesurer et calculer le métrage de vos rideaux sur-mesure à Marrakech. Formules de calcul, coefficient de fronce et astuces de tapissier.",
    metaDescriptionEn: "Step-by-step master guide to measuring and calculating bespoke curtain fabric yardage in Marrakech. Formulas, fullness ratio, and master tips.",
    seoKeywords: [
      "calculer metrage rideau sur mesure",
      "prise de cotes rideaux marrakech",
      "coefficient de fronce rideau",
      "combien de metre tissu pour rideau",
      "ourlet rideau tete flamande",
      "rideaux grande hauteur sous plafond",
      "atelier tapisserie marrakech",
    ],
    pinterestUrl: "https://www.pinterest.com/kansotex",
    tableOfContents: [
      { id: "regle-or-mesures", title: "1. La règle d'or avant de sortir le mètre ruban" },
      { id: "mesurer-largeur-fronce", title: "2. Mesurer la largeur & appliquer le bon coefficient de fronce" },
      { id: "mesurer-hauteur", title: "3. Mesurer la hauteur avec une rigueur d'horloger" },
      { id: "formule-magique", title: "4. La formule mathématique exacte de notre atelier" },
      { id: "tetes-de-rideaux", title: "5. Tête flamande, plis simples ou œillets : quel impact ?" },
      { id: "pieges-a-eviter", title: "6. Les 4 erreurs courantes à proscrire" },
      { id: "faq-mesures", title: "7. Foire Aux Questions (FAQ)" },
    ],
    technicalTable: {
      caption: "Coefficients de Fronce Recommandés par Type de Tête de Rideau (Atelier Kansotex)",
      rows: [
        {
          metric: "Plis Flamands doubles (Pincés)",
          kansotexSpec: "Coefficient 2.0x à 2.2x",
          standardMarket: "1.5x (Plis étriqués)",
          practicalImpact: "Crée des vagues généreuses et profondes d'une élégance intemporelle dans les salons nobles."
        },
        {
          metric: "Plis Wave / Vague contemporaine",
          kansotexSpec: "Coefficient 1.8x à 2.0x",
          standardMarket: "1.6x",
          practicalImpact: "Idéal sur rail encastré plafond dans les villas contemporaines et baies vitrées coulissantes."
        },
        {
          metric: "Œillets contemporains (Ø 40 mm)",
          kansotexSpec: "Coefficient 1.8x à 2.0x",
          standardMarket: "1.5x",
          practicalImpact: "Ondulation régulière et glisse fluide sur tringle tube en laiton ou acier noir mat."
        },
        {
          metric: "Fronces simples légères (Voilages)",
          kansotexSpec: "Coefficient 2.2x à 2.5x",
          standardMarket: "1.8x",
          practicalImpact: "Permet au voilage transparent de tamiser la lumière sans effet de toile tendue plate."
        }
      ]
    },
    faqs: [
      {
        question: "Faut-il mesurer la fenêtre ou la tringle ?",
        answer: "Toujours la **tringle ou le rail**, jamais l'encadrement de la fenêtre ! La tringle dépasse généralement de 20 à 30 cm de chaque côté de l'ouverture pour permettre aux rideaux repliés de dégager entièrement le vitrage en journée. La largeur de référence pour vos calculs est donc la longueur totale de la barre (hors embouts décoratifs)."
      },
      {
        question: "Quel espace laisser entre le bas du rideau et le sol ?",
        answer: "Pour un tombé 'net' sans toucher le sol, nous laissons traditionnellement **1,5 cm** de jour. Pour un tombé 'affleurant' moderne, nous laissons **0,5 cm**. Enfin, pour un tombé majestueux 'cassant', nous ajoutons **+3 cm** à la hauteur pour que l'étoffe repose sur le sol avec souplesse."
      }
    ],
    relatedProducts: [
      {
        slug: "lin-naturel-atlas-lave",
        name: "Lin d'Atlas Pré-Lavé",
        category: "Indoor",
        image: "/gallery/linen_fabric_closeup_1791052926029.jpg",
        highlight: "Idéal tête flamande & wave"
      },
      {
        slug: "toile-outdoor-atlas-sable",
        name: "Toile Outdoor Atlas",
        category: "Outdoor",
        image: "/gallery/matiere-tissus-outdoor-rooftop.jpg",
        highlight: "Pour rideaux de terrasse & tonnelle"
      }
    ],
    sections: [
      {
        id: "regle-or-mesures",
        heading: "1. La règle d'or avant de sortir le mètre ruban",
        content: `Rien n'est plus décevant qu'une paire de rideaux coupée trop courte de deux centimètres ou manquante d'ampleur face à une haute baie vitrée. 

La confection sur-mesure répond à des règles géométriques immuables. Avant toute chose, retenez cette consigne absolue de nos artisans : **posez toujours votre tringle ou votre rail avant de prendre les mesures définitives**. Tenter de mesurer à partir d'une ligne imaginaire sur un mur brut est l'assurance d'une déconvenue lors de la pose finale.`,
        callout: {
          title: "Outil indispensable",
          text: "Utilisez impérativement un mètre ruban métallique rigide ou un télémètre laser professionnel. Les mètres de couturière souples en tissu s'étirent et introduisent des erreurs de 1 à 3 cm sur les grandes hauteurs.",
          type: "tip"
        }
      },
      {
        id: "mesurer-largeur-fronce",
        heading: "2. Mesurer la largeur & appliquer le bon coefficient de fronce",
        content: `Un rideau ne doit jamais être une surface plate tirée comme un drap d'hôpital. Sa noblesse vient de la générosité de ses plis.

Pour obtenir une belle onde, on applique à la largeur de la tringle un **coefficient de fronce** (compris entre 1.8 et 2.2 selon le tissu) :
- **Largeur de tringle de 2,00 m avec coefficient 2.0x** = 4,00 m de tissu déployé nécessaire.
- Si vous prévoyez deux rideaux (ouverture centrale), chaque panneau mesurera 2,00 m de large une fois confectionné, soit deux lés complets.

N'oubliez pas d'ajouter les retours muraux (+ 10 cm par côté) et le croisement central des deux rideaux (+ 5 cm) pour éviter que la lumière ne s'infiltre au milieu une fois les rideaux fermés.`,
        quote: {
          text: "Dans le luxe, l'économie de tissu sur la fronce est immédiatement visible à l'œil nu. Mieux vaut un tissu plus simple avec une fronce généreuse à 2.2x qu'une soie somptueuse tendue sans aucun volume.",
          author: "Maître Hassan",
          role: "Directeur de production Kansotex"
        }
      },
      {
        id: "mesurer-hauteur",
        heading: "3. Mesurer la hauteur avec une rigueur d'horloger",
        content: `Mesurez toujours la hauteur à trois endroits distincts : **à gauche, au centre et à droite de la baie vitrée**. 

Dans les riads traditionnels comme dans les constructions récentes, le sol ou le plafond présente presque toujours un léger dénivelé de 5 à 15 mm. Si un écart existe, notre atelier adapte la coupe de l'ourlet pour que la chute paraisse rigoureusement parallèle au sol.

**Le point de départ de la mesure :**
- **Sur tringle à anneaux** : Mesurez depuis le bas de l'anneau (là où s'insère le crochet) jusqu'au sol.
- **Sur rail encastré au plafond** : Mesurez depuis le dessous du rail jusqu'au sol.
- **Sur tringle à œillets** : Mesurez depuis le dessus de la barre métallique jusqu'au sol, puis ajoutez 3,5 cm pour la tête de rideau qui dépasse au-dessus de la tringle.`,
        image: {
          url: "/gallery/accompagnement-equipe-kansotex.webp",
          alt: "Vérification des cotes et découpe au fil droit dans l'atelier Kansotex",
          caption: "Chaque laize est coupée au fil droit dans notre manufacture à Marrakech pour éviter toute vrille."
        }
      },
      {
        id: "formule-magique",
        heading: "4. La formule mathématique exacte de notre atelier",
        content: `Pour déterminer le métrage exact en mètres linéaires de rouleau (laize standard Kansotex de 140 cm ou 280 cm grande largeur) :

**Formule pour Grande Largeur (Laize 280 cm) :**
Lorsque le tissu est tissé en grande laize de 280 cm, la hauteur du rideau s'inscrit dans la largeur du rouleau (tombé dans le droit fil horizontal).
*Métrage à commander = (Longueur de tringle × Coefficient de fronce) + 30 cm pour les ourlets latéraux.*

**Formule pour Petite Largeur (Laize 140 cm) :**
*Nombre de lés nécessaires = (Longueur de tringle × Coefficient de fronce) ÷ 130 cm.*
*Métrage par lé = Hauteur finie + 35 cm (ourlet bas 20 cm replié + tête 15 cm).*
*Métrage total = Nombre de lés × Métrage par lé.*`
      },
      {
        id: "tetes-de-rideaux",
        heading: "5. Tête flamande, plis simples ou œillets : quel impact ?",
        content: `Le type d'attache détermine non seulement le style décoratif de la pièce, mais également le repli du rideau lorsqu'il est ouvert en journée :
- **Les Plis Flamands (Pincés doubles ou triples)** : Le summum du raffinement classique et contemporain. Les plis sont piqués de manière permanente avec une ganse rigide cachée. Ils se rangent dans un volume très compact lorsqu'ils sont ouverts.
- **La Finition Wave (Vague ondulante)** : Moderne et épurée, elle nécessite un rail spécifique équipé de petits cordons d'espacement (généralement 6 ou 8 cm). Les vagues restent parfaitement calibrées de haut en bas.
- **Les Œillets métalliques** : Faciles à manipuler, recommandés pour les chambres d'enfants ou les espaces informels, mais moins isolants sur le plan thermique en raison de la lumière qui s'infiltre au-dessus de la barre.`,
        image: {
          url: "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.webp",
          alt: "Détail de tête plissée flamande et tombé cassant de rideau sur sol en zellige",
          caption: "Finitions haute facture : tête à plis flamands réguliers et tombé cassant de 2,5 cm reposant délicatement sur le zellige."
        }
      },
      {
        id: "pieges-a-eviter",
        heading: "6. Les 4 erreurs courantes à proscrire absolument",
        content: `1. **Oublier le retrait au lavage** : Si vous choisissez un tissu non stabilisé, lavez-le avant confection ou exigez un lin préalablement stonewashed comme ceux de Kansotex.
2. **Ne pas prévoir le dégagement mural** : Si la tringle s'arrête exactement à la limite de la fenêtre, le rideau masquera 30% de votre baie vitrée en permanence en journée.
3. **Négliger le poids sur le rail** : Sur des hauteurs sous plafond de 3,50 m en velours peigné, une paire de rideaux peut peser plus de 12 kg. Prévoyez des fixations murales adaptées (chevilles molly ou scellement chimique sur brique creuse).
4. **Couper sans vérifier l'aplomb du mur** : Une coupe au laser sans tenir compte de la dénivellation du sol se remarque au premier coup d'œil.`
      },
      {
        id: "faq-mesures",
        heading: "7. Foire Aux Questions (FAQ)",
        content: `Consultez les réponses directes de notre équipe pour sécuriser votre projet.`
      }
    ]
  },
  {
    slug: "amenagement-textile-b2b-renover-riad-hotel-luxe",
    title: "Aménagement Textile B2B : Rénover un Riad Historique ou un Hôtel Boutik avec des Étoffes Sur-Mesure",
    titleEn: "B2B Textile Design: Renovating a Historic Riad or Boutique Hotel with Bespoke Fabrics",
    kicker: "Architecture, Hospitality & Prescription B2B",
    excerpt: "Normes non-feu M1/Crib 5 pour l'hôtellerie, résistance Martindale supérieure à 50 000 tours, tarifs professionnels négociés et confection locale : comment Kansotex accompagne architectes et maîtres d'ouvrage à Marrakech.",
    excerptEn: "Fire-retardant M1/Crib 5 standards, Martindale durability over 50,000 rubs, negotiated trade prices: how Kansotex supports architects and hospitality owners.",
    category: "Architecture & Riads",
    categorySlug: "architecture",
    coverImage: "/gallery/Kansotex-indoor-living-room-pinterest.webp",
    coverAlt: "Salon de réception d'un hôtel de luxe à Marrakech habillé de tissus d'ameublement sur-mesure Kansotex",
    publishedAt: "2026-10-15T14:00:00.000Z",
    readingTime: "8 min",
    author: BLOG_AUTHORS.studio,
    metaDescription: "Solutions textiles B2B pour hôtels et riads à Marrakech. Tissus certifiés non-feu M1, résistance hôtelière 50 000 tours et confection sur-mesure.",
    metaDescriptionEn: "B2B hospitality textile solutions in Marrakech. Flame retardant M1 fabrics, 50,000+ Martindale durability, and custom bespoke manufacturing.",
    seoKeywords: [
      "tissu hotel marrakech",
      "amenagement riad luxe textile",
      "tissu non feu m1 maroc",
      "tissu ameublement professionnel",
      "devis textile b2b marrakech",
      "tapissier decorateur hotel maroc",
      "espace pro kansotex",
    ],
    pinterestUrl: "https://www.pinterest.com/kansotex",
    tableOfContents: [
      { id: "enjeux-hospitality", title: "1. Les contraintes spécifiques de l'hôtellerie de charme" },
      { id: "normes-et-securite", title: "2. Les normes de sécurité : Non-Feu M1, Crib 5 & OEKO-TEX" },
      { id: "durabilite-intensive", title: "3. La durabilité intensive face à la rotation des hôtes" },
      { id: "accompagnement-sur-mesure", title: "4. L'accompagnement sur-mesure Kansotex pour architectes" },
      { id: "service-echantillons", title: "5. Service d'échantillonnage express et chiffrage 48h" },
      { id: "faq-b2b", title: "6. Foire Aux Questions B2B" },
    ],
    technicalTable: {
      caption: "Exigences Hôtelières Spécifiques vs Standards Résidentiels Grand Public",
      rows: [
        {
          metric: "Résistance au feu",
          kansotexSpec: "Certification Non-Feu M1 (NF P92-507) & BS 5852 Crib 5",
          standardMarket: "Non ignifugé (Interdit en ERP)",
          practicalImpact: "Conformité légale immédiate avec les commissions de sécurité touristiques marocaines."
        },
        {
          metric: "Détachabilité & Entretien professionnel",
          kansotexSpec: "Traitement hydro-oléophobe lavable à 40°C ou pressing sec",
          standardMarket: "Nettoyage délicat avec risque d'auréoles",
          practicalImpact: "Réduit les coûts de blanchisserie et garantit un renouvellement rapide des chambres."
        },
        {
          metric: "Solidité des coutures sous tension continue",
          kansotexSpec: "Renforts d'angles thermosoudés et double piquage nylon",
          standardMarket: "Coutures simples avec déchirement rapide",
          practicalImpact: "Absence d'affaissement des banquettes de restaurant et assises de lobby après 3 ans."
        }
      ]
    },
    faqs: [
      {
        question: "Proposez-vous des tarifs préférentiels pour les décorateurs et hôteliers ?",
        answer: "Oui, notre Espace Pro & Architecture offre des remises quantitatives directes (de 15% à 35% selon les volumes de projet), un accès prioritaire à nos rouleaux en stock permanent à Marrakech et l'affectation d'un chargé de projet dédié disponible sur WhatsApp et in situ."
      },
      {
        question: "Pouvez-vous confectionner sur-mesure d'après nos plans d'architecte ?",
        answer: "C'est le cœur de notre métier. Vous nous transmettez vos plans d'élévation, vos calepinages d'assises ou simplement vos métrages bruts : notre bureau d'études établit le devis matière + confection sous 24 à 48 heures, réalise un prototype si nécessaire, puis lance la fabrication dans notre manufacture de Marrakech."
      }
    ],
    relatedProducts: [
      {
        slug: "velours-coton-gueliz",
        name: "Velours Peigné Guéliz — Spécial ERP",
        category: "Indoor",
        image: "/gallery/tissus-haut-de-gamme.webp",
        highlight: "Martindale 50 000 rubs · Classement Hôtelier"
      },
      {
        slug: "toile-outdoor-atlas-sable",
        name: "Toile Outdoor Atlas — Traitée UV",
        category: "Outdoor",
        image: "/gallery/Kansotex-outdoor-terasse-rooftop.webp",
        highlight: "Résistance chlore & sel pour piscines de riad"
      }
    ],
    sections: [
      {
        id: "enjeux-hospitality",
        heading: "1. Les contraintes spécifiques de l'hôtellerie de charme à Marrakech",
        content: `Rénover un riad du XVIIe siècle dans la Médina de Marrakech ou aménager un écolodge au pied de l'Atlas confronte le maître d'œuvre à un double impératif souvent jugé contradictoire : préserver l'authenticité artisanale locale tout en répondant aux normes draconiennes de l'hôtellerie de luxe internationale.

Les établissements recevant du public (ERP) subissent un trafic intense. Entre les valises frottant contre les tentures, la crème solaire des transats de piscine, les cafés renversés au petit-déjeuner et les cycles de nettoyage quotidiens, une étoffe domestique capitule en moins d'un an.

Kansotex a été pensé pour combler ce vide : proposer des tissus d'ameublement d'une noblesse tactile digne des plus grands palais, armés d'une résistance industrielle invisible.`,
        callout: {
          title: "Accompagnement B2B Dédié",
          text: "Chaque projet hôtelier suivi par Kansotex bénéficie d'un interlocuteur unique, du relevé des cotes initial jusqu'à la livraison étiquetée chambre par chambre.",
          type: "atelier"
        }
      },
      {
        id: "normes-et-securite",
        heading: "2. Les normes de sécurité : Non-Feu M1, Crib 5 & OEKO-TEX",
        content: `Pour obtenir l'autorisation d'ouverture et satisfaire aux audits des commissions de sécurité et des compagnies d'assurance internationales, les tentures murales, rideaux et têtes de lit doivent être classés **Non-Feu M1** (norme française NF P92-507) ou répondre au standard britannique **BS 5852 Crib 5**.

Nos gammes hôtelières intègrent des fibres modacryliques et des polyesters Trévira CS ignifugés de manière permanente dans la masse de la fibre :
- L'ignifugation ne part pas au lavage, contrairement aux traitements de surface par trempage chimique qui perdent leur efficacité après 3 cycles d'entretien.
- Elles ne dégagent aucun gaz toxique en cas de source de chaleur intense.
- Elles bénéficient du label **OEKO-TEX® Standard 100**, certifiant l'absence totale de métaux lourds ou de formaldéhydes au contact de la peau des voyageurs.`,
        quote: {
          text: "Pour un hôtelier, la sérénité n'a pas de prix. Quand la commission de sécurité passe, avoir les certificats d'ignifugation M1 conformes permet d'ouvrir dans les délais prévus sans blocage administratif.",
          author: "Studio Kansotex",
          role: "Département Prescription Hôtelière"
        },
        image: {
          url: "/gallery/bedroom_lifestyle_1791052936092.jpg",
          alt: "Chambre d'hôtel de luxe équipée de literie 300 fils et tentures ignifugées M1 Kansotex",
          caption: "Suite hôtelière de riad : literie percale 300 fils longues fibres et tentures ignifugées homologuées Non-Feu M1."
        }
      },
      {
        id: "durabilite-intensive",
        heading: "3. La durabilité intensive face à la rotation des hôtes",
        content: `Le test Martindale simule l'usure par frottement répété en exerçant une pression oscillante sur l'étoffe jusqu'à rupture des premiers fils :
- **Usage résidentiel standard** : 15 000 à 20 000 tours.
- **Usage hôtelier intensif Kansotex** : **45 000 à 60 000 tours**.

Nos velours de coton peigné et nos toiles jacquard résistent aux frottements continus des assises de lobby, des banquettes de restaurant et des tabourets de bar sans jamais boulocher ni s'effilocher aux coutures d'assemblage.`
      },
      {
        id: "accompagnement-sur-mesure",
        heading: "4. L'accompagnement sur-mesure Kansotex pour architectes & décorateurs",
        content: `Notre manufacture à Marrakech n'est pas un simple entrepôt de vente au rouleau. C'est un atelier complet de confection d'ameublement capable d'assumer des séries hôtelières de grande envergure :
- **Confection de rideaux occultants et voilages** pour 10 à 80 chambres avec crochets micro-réglables déjà posés.
- **Banquettes et dossiers sur-mesure** taillés au millimètre pour épouser les banquettes traditionnelles en plâtre ou en cèdre sculpté des salons marocains.
- **Coussins de terrasse et matelas de transat outdoor** étanches et déhoussables avec fermetures inoxydables.`,
        image: {
          url: "/gallery/Kansotex-indoor-riad-tissus-pinterest.webp",
          alt: "Banquettes et coussins sur-mesure dans un riad prestigieux de la Médina de Marrakech",
          caption: "Réalisation sur-mesure Kansotex : harmonie des textures entre velours peigné et toiles unies."
        }
      },
      {
        id: "service-echantillons",
        heading: "5. Service d'échantillonnage express et chiffrage 48h",
        content: `Parce que le temps d'un architecte sur chantier est précieux, nous avons mis en place une organisation logistique réactive :
1. **Livraison d'échantillons en 24h** sur Marrakech (et 48h sur Casablanca, Rabat et Tanger) pour vos moodboards et réunions client.
2. **Étude technique et devis B2B quantitatif sous 48 heures** à partir de votre bordereau des prix unitaires (BPU).
3. **Stock permanent garanti** sur nos références phares pour éviter les ruptures de fin de chantier.`
      },
      {
        id: "faq-b2b",
        heading: "6. Foire Aux Questions B2B",
        content: `Retrouvez toutes les modalités de collaboration professionnelle avec notre maison.`
      }
    ]
  },
  {
    slug: "toiles-remplacement-chiliennes-transats-marrakech",
    title: "Toiles de Remplacement Haut de Gamme pour Chiliennes & Transats : Le Guide Sur-Mesure de Marrakech",
    titleEn: "Luxury Replacement Canvas for Deckchairs & Loungers: The Marrakech Bespoke Guide",
    kicker: "Rénovation Outdoor & Confort Solaire",
    excerpt: "Vos ossatures en bois dur de chiliennes méritent mieux qu'une toile délavée après un été. Analyse des toiles acryliques déperlantes, calcul des dimensions au centimètre et pas à pas de changement dans notre manufacture de Marrakech.",
    excerptEn: "Your deckchair frames deserve better than faded canvas after one summer. Discover solution-dyed acrylic fabrics, custom dimensions, and expert re-canvasing in Marrakech.",
    category: "Outdoor & Terrasses",
    categorySlug: "outdoor",
    coverImage: "/gallery/chilienne-luxe-transat-marrakech.jpg",
    coverAlt: "Chilienne artisanale en bois noble avec toile rayée terracotta Kansotex au bord du bassin d'un riad à Marrakech",
    publishedAt: "2026-10-14T09:00:00.000Z",
    readingTime: "7 min",
    author: BLOG_AUTHORS.atelier,
    metaDescription: "Guide complet pour rénover et changer vos toiles de chiliennes à Marrakech : toiles outdoor acryliques anti-UV Grade 8, confection sur-mesure et résistance chlore.",
    metaDescriptionEn: "Complete guide to re-covering deckchairs in Marrakech with luxury UV-proof and water-repellent outdoor fabrics.",
    seoKeywords: [
      "tissu chilienne marrakech",
      "toile transat sur mesure maroc",
      "tissu remplacement chilienne luxe",
      "toile rayee transat piscine",
      "tissu outdoor deperlant terrasse",
      "transat jardin maroc",
      "toile acrylique teinté masse",
      "chilienne bois marrakech",
      "changer toile chilienne",
    ],
    pinterestUrl: "https://www.pinterest.com/kansotex",
    tableOfContents: [
      { id: "pourquoi-renover", title: "1. Pourquoi rénover la toile plutôt que racheter une chilienne bon marché ?" },
      { id: "fibres-gagnantes", title: "2. Les fibres qui résistent au soleil de Marrakech et au chlore" },
      { id: "tableau-chilienne", title: "3. Tableau comparatif : Toile Kansotex vs Toile Standard" },
      { id: "prendre-cotes", title: "4. Comment mesurer précisément votre ancienne toile (Largeur 43 cm standard)" },
      { id: "etapes-remplacement", title: "5. Les 4 étapes pour remplacer la toile sans outillage lourd" },
      { id: "faq-chiliennes", title: "6. Foire Aux Questions (FAQ)" },
    ],
    technicalTable: {
      caption: "Toile de Chilienne Outdoor Kansotex vs Toiles Entrée de Gamme du Marché",
      rows: [
        {
          metric: "Composition du fil",
          kansotexSpec: "100% Acrylique teinté dans la masse (Sun-Resistant)",
          standardMarket: "Polyester 100% teinté en surface",
          practicalImpact: "Ne se décolore pas après 5 étés d'exposition directe au soleil zénithal."
        },
        {
          metric: "Grammage au m²",
          kansotexSpec: "320 g/m² (Maintien corporel rigide sans pochage)",
          standardMarket: "180 à 220 g/m² (Toile qui se détend)",
          practicalImpact: "Soutien ferme du dos, aucune sensation d'affaissement au fil des heures."
        },
        {
          metric: "Résistance au chlore & sel de piscine",
          kansotexSpec: "Traitement hydrofuge résistant au chlore actif",
          standardMarket: "Non traitée (blanchiment rapide)",
          practicalImpact: "S'assoir en maillot de bain mouillé ne crée aucune auréole décolorée."
        },
        {
          metric: "Finition des ourlets d'accroche",
          kansotexSpec: "Fourreaux doubles avec renfort de jonc plastique incassable",
          standardMarket: "Simple pli agrafé fragile",
          practicalImpact: "Sécurité totale : la toile ne peut pas se décrocher sous le poids."
        }
      ]
    },
    faqs: [
      {
        question: "Quelle est la dimension standard d'une toile de chilienne à Marrakech ?",
        answer: "La grande majorité des transats en hêtre ou acacia au Maroc utilisent une largeur standard de **43 cm** (parfois 45 cm) pour une longueur déroulée comprise entre **120 cm et 130 cm**. Dans notre atelier de Marrakech, nous coupons vos toiles exactement au millimètre près d'après votre ancienne toile ou vos baguettes de fixation."
      },
      {
        question: "Peut-on commander des toiles rayées ou personnalisées ?",
        answer: "Oui ! Nous disposons d'une vaste sélection de rayures bayadères inspirées des rivieras méditerranéennes et des kasbahs de l'Atlas (rayures sable/écru, vert cyprès/terracotta, bleu indigo/blanc) ainsi que des unis texturés effet lin."
      }
    ],
    relatedProducts: [
      {
        slug: "toile-outdoor-atlas-sable",
        name: "Toile Outdoor Atlas — Sable Ocre",
        category: "Outdoor",
        image: "/gallery/matiere-tissus-outdoor-rooftop.jpg",
        highlight: "Grammage lourd 320 g/m² · Spécial Chiliennes"
      },
      {
        slug: "velours-coton-gueliz",
        name: "Velours Peigné Guéliz",
        category: "Indoor",
        image: "/gallery/tissus-haut-de-gamme.webp",
        highlight: "Pour coussins intérieurs coordonnés"
      }
    ],
    sections: [
      {
        id: "pourquoi-renover",
        heading: "1. Pourquoi rénover la toile plutôt que racheter une chilienne bon marché ?",
        content: `À l'arrivée des beaux jours, nombreuses sont les terrasses de Marrakech où les chiliennes ressortent du local technique avec une toile décolorée, tachetée par les intempéries ou déchirée à l'assise.

Le réflexe facile consiste à racheter des transats neufs d'entrée de gamme à 500 ou 600 DH. Pourtant, les ossatures en bois dur (acacia, hêtre massif ou teck) traversent les décennies sans faiblir. Remplacer uniquement la toile par une étoffe acrylique noble de fabrication haute facture présente un triple avantage :
1. **Économique** : Vous économisez le coût d'une structure neuve.
2. **Esthétique** : Vous choisissez une matière texturée digne d'un hôtel de luxe, à des années-lumière des toiles synthétiques criardes.
3. **Durable** : Une toile outdoor Kansotex résiste plus de 8 ans sans ternir sous les rayons UV de Marrakech.`,
        callout: {
          title: "L'alternative éco-responsable de luxe",
          text: "Rénover la toile d'une chilienne de qualité s'inscrit dans l'esprit Kanso : la simplicité épurée, le respect des matières nobles et le refus du jetable.",
          type: "atelier"
        }
      },
      {
        id: "fibres-gagnantes",
        heading: "2. Les fibres qui résistent au soleil de Marrakech et au chlore",
        content: `Sous un indice UV estival qui flirte avec 11+ à Marrakech, une toile en coton ordinaire ou en polyester bas de gamme cuit au soleil en quelques semaines : le tissu devient cassant et cède dès qu'un invité s'y assoit.

Nos toiles de chiliennes Kansotex utilisent exclusivement des fils **100% acrylique teintés dans la masse (solution-dyed)** :
- **Pigmentation à cœur** : La couleur ne craint ni le soleil zénithal, ni les éclaboussures de chlore au bord de la piscine.
- **Apprêt Téflon® EcoElite** : L'eau glisse sur l'étoffe sans pénétrer. Vous pouvez renverser un verre de jus d'orange ou de thé sans laisser de tache permanente.
- **Tissage sergé dense** : Une trame serrée qui épouse les formes du corps sans jamais s'affaisser ni pocher au fil des après-midis de détente.`,
        quote: {
          text: "Une chilienne réussie est celle qui accueille le corps avec fermeté et douceur. La toile doit tendre sous la charge sans jamais s'étirer irréversiblement.",
          author: "Maître Hassan",
          role: "Chef de Confection Outdoor Kansotex"
        },
        image: {
          url: "/gallery/matiere-tissus-outdoor-rooftop.jpg",
          alt: "Tissage sergé acrylique 320g/m² Kansotex avec perles d'eau et résistance au chlore",
          caption: "Trame acrylique teintée dans la masse 320g/m² traitée Téflon® : les gouttes perlent sans altérer la fibre face aux embruns chlorés de piscine."
        }
      },
      {
        id: "tableau-chilienne",
        heading: "3. Tableau comparatif : Toile Kansotex vs Toile Standard",
        content: `Pour comprendre pourquoi les hôtels 5 étoiles et riads prestigieux de Marrakech confient la réfection de leurs transats à notre atelier :`
      },
      {
        id: "prendre-cotes",
        heading: "4. Comment mesurer précisément votre ancienne toile (Largeur 43 cm standard)",
        content: `Pour passer commande auprès de notre manufacture :
1. **Démontez votre ancienne toile** et posez-la à plat sur une grande table.
2. **Mesurez la largeur entre les deux lisières** : La mesure standard est généralement de **43 cm** (hors coutures).
3. **Mesurez la longueur totale d'une extrémité à l'autre** : Comptez environ **125 à 130 cm** d'ourlet à ourlet.
4. **Vérifiez le type de fixation** :
   - *À fourreaux pour baguettes de bois (le plus fréquent)* : Deux tunnels cousus en haut et en bas dans lesquels glisse un jonc rond amovible.
   - *À clous tapissiers ou agrafes* : Si la toile était fixée directement sur le barreau en bois.`,
        image: {
          url: "/gallery/accompagnement-equipe-kansotex.webp",
          alt: "Vérification des cotes et découpe d'une toile de chilienne dans l'atelier Kansotex à Marrakech",
          caption: "Prise de cotes d'une toile de 43 cm et préparation des fourreaux doubles renforcés par nos artisans sur table de coupe."
        }
      },
      {
        id: "etapes-remplacement",
        heading: "5. Les 4 étapes pour remplacer la toile sans outillage lourd",
        content: `Le changement d'une toile à fourreaux prend moins de 10 minutes par transat :
1. Dépliez la chilienne et retirez les deux baguettes en bois ou joncs plastiques glissés dans les fourreaux haut et bas.
2. Dégagez l'ancienne toile de la fente du barreau.
3. Glissez la nouvelle toile Kansotex dans les rainures en veillant à orienter le côté déperlant vers le ciel.
4. Réinsérez les baguettes de blocage à l'intérieur des fourreaux. Lorsque vous vous asseyez, la tension naturelle verrouille le jonc dans son encoche. C'est prêt !`
      },
      {
        id: "faq-chiliennes",
        heading: "6. Foire Aux Questions (FAQ)",
        content: `Retrouvez les conseils de nos tapissiers pour réussir la rénovation de vos transats de piscine et terrasse.`
      }
    ]
  },
  {
    slug: "mousse-dryfeel-tissus-outdoor-piscine-marrakech",
    title: "Mousse Réticulée Dryfeel & Tissus Imperméables : La Formule Anti-Moisissure pour Daybeds & Margelles de Piscine",
    titleEn: "Dryfeel Reticulated Foam & Waterproof Fabrics: The Mildew-Proof Formula for Poolside Daybeds",
    kicker: "Ingénierie Outdoor & Confort Réticulé",
    excerpt: "Découvrez pourquoi une mousse classique pourrit sous une housse de piscine et comment l'association Mousse Dryfeel alvéolaire + toile acrylique déperlante garantit un séchage en 20 minutes sans odeurs.",
    excerptEn: "Discover why standard foam rots inside poolside cushions and how open-cell reticulated Dryfeel foam dries in 20 minutes without mildew.",
    category: "Outdoor & Terrasses",
    categorySlug: "outdoor",
    coverImage: "/gallery/daybed-mousse-dryfeel-piscine-marrakech.jpg",
    coverAlt: "Daybed double outdoor avec matelas déperlant et mousse réticulée Dryfeel face à la piscine et l'Atlas à Marrakech",
    publishedAt: "2026-10-14T12:00:00.000Z",
    readingTime: "8 min",
    author: BLOG_AUTHORS.studio,
    metaDescription: "Guide technique sur la mousse réticulée Dryfeel et toiles étanches pour daybeds et transats à Marrakech. Zéro moisissure, séchage rapide et confort ferme.",
    metaDescriptionEn: "Technical guide on reticulated Dryfeel foam and waterproof fabrics for poolside daybeds in Marrakech. Anti-mildew, quick drying.",
    seoKeywords: [
      "mousse sur mesure outdoor maroc",
      "mousse dryfeel marrakech",
      "matelas transat piscine impermeable",
      "coussin etanche daybed riad",
      "tissu resistant chlore et sel maroc",
      "mousse drainante seche vite",
      "housse transat anti uv",
      "amenagement piscine villa marrakech",
    ],
    pinterestUrl: "https://www.pinterest.com/kansotex",
    tableOfContents: [
      { id: "pourquoi-mousses-pourrissent", title: "1. Pourquoi les mousses traditionnelles pourrissent au bord de la piscine" },
      { id: "anatomie-dryfeel", title: "2. L'anatomie de la mousse réticulée Dryfeel : 100% cellules ouvertes" },
      { id: "tableau-dryfeel", title: "3. Tableau comparatif : Mousse Dryfeel vs Mousse Polyuréthane Classique" },
      { id: "assemblage-kansotex", title: "4. L'assemblage sandwich exclusif de l'Atelier Kansotex" },
      { id: "faq-dryfeel", title: "5. Foire Aux Questions (FAQ)" },
    ],
    technicalTable: {
      caption: "Comparaison des Propriétés d'Écoulement : Mousse Dryfeel vs Mousse Haute Résilience Standard",
      rows: [
        {
          metric: "Structure cellulaire",
          kansotexSpec: "Réticulée 100% ouverte (Structure nid d'abeille)",
          standardMarket: "Cellules fermées semi-perméables (Éponge)",
          practicalImpact: "L'eau traverse le bloc de mousse sans aucune rétention par capillarité."
        },
        {
          metric: "Temps d'évacuation de l'eau après immersion",
          kansotexSpec: "Moins de 20 minutes au soleil de Marrakech",
          standardMarket: "24 à 48 heures de séchage avec odeurs",
          practicalImpact: "Les transats peuvent être réutilisés immédiatement après une baignade ou un orage."
        },
        {
          metric: "Traitement anti-moisissures & bactéries",
          kansotexSpec: "Agent biocide actif polymérisé dans la masse",
          standardMarket: "Aucun traitement antifongique",
          practicalImpact: "Empêche le noircissement interne et les odeurs d'humidité en climat chaud."
        }
      ]
    },
    faqs: [
      {
        question: "Faut-il rentrer les coussins Dryfeel en cas de pluie à Marrakech ?",
        answer: "Non ! C'est tout l'intérêt de notre conception outdoor : la mousse Dryfeel ne craint pas l'eau. Même sous une pluie torrentielle, l'eau s'écoule par gravité à travers le coussin et ressort par la sous-face en résille. Le coussin sèche en plein air en moins de 30 minutes dès le retour du soleil."
      }
    ],
    relatedProducts: [
      {
        slug: "toile-outdoor-atlas-sable",
        name: "Toile Outdoor Atlas — Traitée UV",
        category: "Outdoor",
        image: "/gallery/matiere-tissus-outdoor-rooftop.jpg",
        highlight: "Hydrophobe & Déperlante"
      }
    ],
    sections: [
      {
        id: "pourquoi-mousses-pourrissent",
        heading: "1. Pourquoi les mousses traditionnelles pourrissent au bord de la piscine",
        content: `Combien de propriétaires de riads ou de villas à Marrakech découvrent au printemps que les coussins de leurs daybeds de piscine dégagent une odeur nauséabonde d'humidité et se couvrent de points noirs à l'intérieur ?

Le coupable est presque toujours le même : **l'utilisation d'une mousse polyuréthane classique pour canapé intérieur**. 
Même si la housse extérieure est vendue comme 'imperméable', l'eau de pluie ou l'humidité des maillots de bain finit toujours par s'infiltrer par les piqûres d'aiguille et la fermeture éclair. Une fois emprisonnée dans une mousse à cellules fermées, l'eau stagne à 35°C, créant un incubateur idéal pour les moisissures et la prolifération bactérienne.`
      },
      {
        id: "anatomie-dryfeel",
        heading: "2. L'anatomie de la mousse réticulée Dryfeel : 100% cellules ouvertes",
        content: `La mousse réticulée (souvent connue sous la marque de référence *Dryfeel*) subit un traitement thermique de déflagration contrôlée lors de sa fabrication qui fait éclater toutes les parois des alvéoles.

Le résultat ? Un squelette tridimensionnel alvéolaire composé à 100% de cellules ouvertes. Versez un seau d'eau sur un bloc de mousse Dryfeel : **l'eau passe instantanément au travers comme à travers un tamis**, sans être retenue par capillarité.

De plus, la matière est traitée avec un agent biocide certifié qui inhibe la formation de champignons et de bactéries même en immersion fréquente.`,
        image: {
          url: "/gallery/matiere-tissus-outdoor-rooftop.jpg",
          alt: "Toile déperlante respirante combinée à la mousse à cellules ouvertes Dryfeel Kansotex",
          caption: "Déperlance oléophobe et respirabilité : l'eau glisse en surface sans bloquer la respiration alvéolaire de l'assise."
        }
      },
      {
        id: "tableau-dryfeel",
        heading: "3. Tableau comparatif : Mousse Dryfeel vs Mousse Polyuréthane Classique",
        content: `Voici l'analyse des propriétés indispensables pour vos espaces de baignade :`
      },
      {
        id: "assemblage-kansotex",
        heading: "4. L'assemblage sandwich exclusif de l'Atelier Kansotex",
        content: `Pour conjuguer la fermeté drainante du Dryfeel avec l'accueil voluptueux attendu dans un palace ou un riad 5 étoiles, notre atelier de la Route de Safi a mis au point une architecture 'sandwich' exclusive :
1. **Face supérieure et tour** : Toile acrylique Kansotex déperlante et anti-UV.
2. **Couche d'accueil supérieure** : Mousse Dryfeel Soft (densité 30 kg/m³) de 4 cm pour un accueil moelleux sans effet de planche.
3. **Cœur de soutien** : Mousse Dryfeel Firm (densité 35 kg/m³) de 8 à 12 cm garantissant une tenue sans affaissement.
4. **Sous-face inférieure** : Panneau en résille technique Batyline micro-perforée qui permet à l'eau de s'évacuer immédiatement par le dessous sans jamais stagner contre le transat.`,
        image: {
          url: "/gallery/Kansotex-outdoor-terasse-rooftop-2.webp",
          alt: "Daybed de piscine et banquettes avec assise drainante Dryfeel dans un riad à Marrakech",
          caption: "Architecture 4 couches Kansotex : toile acrylique déperlante, double densité Dryfeel et sous-face respirante Batyline."
        }
      },
      {
        id: "faq-dryfeel",
        heading: "5. Foire Aux Questions (FAQ)",
        content: `Retrouvez les réponses de notre bureau d'études outdoor.`
      }
    ]
  }
];

export const BLOG_CATEGORIES = [
  { name: "Tous les Articles", slug: "all" },
  { name: "Outdoor & Terrasses", slug: "outdoor" },
  { name: "Matières Nobles", slug: "matieres" },
  { name: "Guides & Mesures", slug: "guides" },
  { name: "Architecture & Riads", slug: "architecture" },
];

/**
 * Filter and sort published articles.
 * In production, only articles whose publishedAt <= now are visible!
 */
export function getPublishedBlogPosts(locale: string = "fr"): BlogPost[] {
  const now = new Date().toISOString();
  return BLOG_POSTS.filter((post) => post.publishedAt <= now).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Find single post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/**
 * Get related articles for cross-linking
 */
export function getRelatedBlogPosts(currentSlug: string, count: number = 3): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.slug !== currentSlug).slice(0, count);
}
