import { BlogPost, BLOG_AUTHORS, BLOG_POSTS } from "./blog-data";

/**
 * Editorial ideas pipeline matching high-intent search queries in Morocco and luxury hospitality.
 * Each entry contains human-crafted technical blueprints, formulas, and local contextual nuances.
 */
export const UPCOMING_TOPIC_PIPELINE = [
  {
    slug: "entretenir-nettoyer-velours-poussière-marrakech",
    title: "Comment Nettoyer et Entretenir Vos Banquettes en Velours Face à la Poussière de Marrakech",
    titleEn: "How to Clean and Maintain Velvet Sofas Against the Desert Dust of Marrakech",
    kicker: "Conseils d'Entretien & Soin des Étoffes",
    excerpt: "Brossage au poil de sanglier, vapeur défroissante sans écraser le velours et détachage à sec : les secrets des maîtres tapissiers pour garder un velours soyeux et profond malgré le Chergui.",
    category: "Matières Nobles" as const,
    categorySlug: "matieres" as const,
    coverImage: "/gallery/tissus-haut-de-gamme.webp",
    coverAlt: "Entretien méticuleux d'une étoffe en velours de coton dans l'atelier Kansotex",
    readingTime: "6 min",
    author: BLOG_AUTHORS.atelier,
    seoKeywords: [
      "nettoyer velours canapé poussiere",
      "entretien velours marrakech",
      "detacher velours coton sans aureole",
      "brossage velours dans le sens du poil",
      "proteger salon velours poussiere",
    ],
    metaDescription: "Guide pratique de l'Atelier Kansotex pour entretenir et détacher vos banquettes en velours de coton à Marrakech sans abîmer les fibres.",
    tableOfContents: [
      { id: "le-defi-du-chergui", title: "1. Le défi du Chergui et des microparticules de sable" },
      { id: "geste-hebdomadaire", title: "2. Le rituel hebdomadaire : Brosser dans le sens du poil" },
      { id: "detacher-sans-aureole", title: "3. Traiter une tache fraîche de thé ou de café sans auréole" },
      { id: "redonner-gonflant", title: "4. Redonner du gonflant aux zones d'assise écrasées" },
      { id: "faq-velours", title: "5. Foire Aux Questions (FAQ)" },
    ],
    technicalTable: {
      caption: "Guide des Produits Autorisés & Proscrits sur le Velours Peigné Kansotex",
      rows: [
        {
          metric: "Brossage quotidien",
          kansotexSpec: "Brosse souple en soies naturelles de sanglier",
          standardMarket: "Brosse synthétique dure",
          practicalImpact: "Dépoussière en profondeur sans cisailler la pointe des poils de coton."
        },
        {
          metric: "Détachage liquide",
          kansotexSpec: "Terre de Sommières à sec + tamponnage eau tiède déminéralisée",
          standardMarket: "Frottement vigoureux avec détergent javellisé",
          practicalImpact: "Absorbe les corps gras sans décolorer ni brûler le pigment de la fibre."
        },
        {
          metric: "Défroissage thermique",
          kansotexSpec: "Vapeur douce verticale à 15 cm de distance",
          standardMarket: "Fer à repasser chaud posé à plat",
          practicalImpact: "Redresse instantanément le poil écrasé sans marquer le tissu."
        }
      ]
    },
    faqs: [
      {
        question: "Comment savoir dans quel sens brosser un velours de coton ?",
        answer: "Passez doucement la paume de votre main sur l'étoffe. Si le tissu devient lisse et soyeux sous vos doigts, vous êtes dans le 'sens du poil'. S'il accroche légèrement et fonce visuellement, vous êtes 'à rebrousse-poil'. Brossez toujours dans le sens du poil pour éliminer la poussière en douceur."
      },
      {
        question: "Que faire si quelqu'un renverse du thé à la menthe chaud sur la banquette ?",
        answer: "Agissez immédiatement sans jamais frotter ! Posez un chiffon blanc propre et absorbant pour éponger l'excès de liquide par pression. Saupoudrez généreusement de Terre de Sommières pour absorber les tanins, laissez agir 4 heures, puis brossez doucement. La tache disparaît sans laisser d'auréole."
      }
    ],
    sections: [
      {
        id: "le-defi-du-chergui",
        heading: "1. Le défi du Chergui et des microparticules de sable",
        content: `À Marrakech, le velours est une étoffe adulée pour sa noblesse et sa profondeur tactile. Cependant, le vent du désert transporte avec lui une poussière ultrafine chargée de silice. 

Si cette poussière n'est pas évacuée régulièrement, les microcristaux de sable pénètrent entre les poils serrés du velours et agissent comme un papier de verre microscopique lors de chaque assise. Préserver son velours, c'est donc avant tout empêcher le sable de s'incruster à la racine de la trame.`
      },
      {
        id: "geste-hebdomadaire",
        heading: "2. Le rituel hebdomadaire : Brosser dans le sens du poil",
        content: `Pour l'entretien courant, oubliez les embouts d'aspirateur en plastique dur qui risquent de rayer les fibres.

Utilisez une brosse en soies naturelles souples (soie de sanglier ou crin de cheval) :
1. Brossez délicatement de haut en bas toujours dans le même sens.
2. Si vous utilisez un aspirateur, réglez-le sur la puissance minimale et munissez-le d'une brosse ronde à poils doux.
3. Ce geste de deux minutes par semaine suffit à préserver la brillance satinée du velours pendant plus de dix ans.`
      },
      {
        id: "detacher-sans-aureole",
        heading: "3. Traiter une tache fraîche de thé ou de café sans auréole",
        content: `La règle d'or universelle de la tapisserie d'art : **ne jamais frotter une tache sur un velours**. Frotter fait pénétrer le liquide au cœur du sous-tissu et casse l'orientation des poils, créant une marque irréversible.

Tamponnez avec un papier absorbant ou un chiffon blanc en microfibre. Pour les taches grasses, appliquez de la Terre de Sommières en fine couche. Laissez sécher à l'air libre sans utiliser de sèche-cheveux chaud qui fixerait les sucres de la boisson.`
      },
      {
        id: "redonner-gonflant",
        heading: "4. Redonner du gonflant aux zones d'assise écrasées",
        content: `Avec le temps, le poids des corps assis au même endroit peut incliner les poils du velours. Pour leur redonner tout leur rebond :
- Utilisez un défroisseur vapeur vertical ou le jet vapeur d'un fer tenu à **15 cm au-dessus du tissu**.
- La chaleur humide détend la kératine et le coton naturel.
- Brossez immédiatement à rebrousse-poil pour redresser la fibre, puis lissez délicatement dans le sens de la lumière. L'effet de renouveau est spectaculaire.`
      },
      {
        id: "faq-velours",
        heading: "5. Foire Aux Questions (FAQ)",
        content: `Retrouvez les réponses pratiques de nos artisans tapissiers.`
      }
    ]
  },
  {
    slug: "banquettes-salon-marocain-contemporain-tissus-nobles",
    title: "Banquettes Traditionnelles vs Assises Basses Contemporaines : Comment Moderniser le Salon Marocain",
    titleEn: "Traditional Banquettes vs Contemporary Low Seating: Modernizing the Moroccan Living Room",
    kicker: "Architecture d'Intérieur & Art de Vivre",
    excerpt: "Comment allier la convivialité légendaire du salon marocain traditionnel avec l'épure architecturale contemporaine : choix des mousses haute résilience, tissus texturés et proportions parfaites.",
    category: "Architecture & Riads" as const,
    categorySlug: "architecture" as const,
    coverImage: "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.webp",
    coverAlt: "Salon marocain contemporain avec banquettes habillées de lin d'Atlas et velours peigné",
    readingTime: "8 min",
    author: BLOG_AUTHORS.studio,
    seoKeywords: [
      "salon marocain contemporain",
      "banquette sur mesure marrakech",
      "moderniser salon marocain tissu",
      "tissu banquette assise basse",
      "mousse haute resilience salon marocain",
    ],
    metaDescription: "Conseils de designers pour moderniser le salon marocain avec des tissus nobles Kansotex : lin d'Atlas, assises épurées et mousses HR.",
    tableOfContents: [
      { id: "revolution-salon-marocain", title: "1. La réinvention contemporaine du salon marocain" },
      { id: "choix-des-proportions", title: "2. Les proportions parfaites d'une assise moderne" },
      { id: "mousse-confort", title: "3. La mousse : Densité 35 kg/m³ pour une tenue éternelle" },
      { id: "jeu-des-textures", title: "4. Marier lin brut, velours mat et passepoils contrastés" },
      { id: "faq-salon", title: "5. Foire Aux Questions (FAQ)" },
    ],
    faqs: [
      {
        question: "Quelle est la profondeur idéale pour une banquette marocaine contemporaine ?",
        answer: "Le salon traditionnel mesurait souvent 80 à 90 cm de profondeur avec des dossiers très épais. En design contemporain, nous préconisons une profondeur de 75 à 80 cm avec un dossier incliné ergonomique de 10 à 12 cm, complété de coussins d'appoint en plumes ou fibres douces pour un confort lounge décontracté."
      }
    ],
    sections: [
      {
        id: "revolution-salon-marocain",
        heading: "1. La réinvention contemporaine du salon marocain",
        content: `Le salon marocain est le cœur battant de la maison. Il accueille les fêtes familiales, le thé d'après-midi, les confidences du soir et les siestes dominicales.

Pendant longtemps, le salon traditionnel a été surchargé de motifs damassés brillants, de glands de passementerie dorés et de mousses excessivement dures. Aujourd'hui, une nouvelle génération d'architectes à Marrakech et Casablanca réinvente ce patrimoine avec une épure somptueuse : des lignes géométriques basses, des tissus mats aux textures riches et des finitions haute-facture.`
      },
      {
        id: "choix-des-proportions",
        heading: "2. Les proportions parfaites d'une assise moderne",
        content: `Pour transformer un salon sans trahir sa convivialité :
- **Hauteur d'assise** : 40 à 42 cm du sol (mousse + socle compris). C'est la hauteur universelle qui permet de s'asseoir confortablement sans sensation d'enfoncement.
- **Socles flottants** : Remplacez les caissons en bois sculpté lourd par des socles en chêne clair brossé, en plâtre lissé ou en acier thermolaqué noir avec un retrait de 10 cm pour créer un effet de lévitation visuelle.`
      },
      {
        id: "mousse-confort",
        heading: "3. La mousse : Densité 35 kg/m³ pour une tenue éternelle",
        content: `L'erreur la plus fréquente consiste à choisir une mousse trop rigide sous prétexte qu'elle durera plus longtemps. Une mousse à 28 kg/m³ trop dure s'avère inconfortable pour les invités, tandis qu'une mousse trop molle à 20 kg/m³ s'affaisse après quelques mois.

Notre recommandation absolue : une **mousse polyuréthane Haute Résilience (HR) de densité 35 kg/m³**, recouverte d'un matelas d'accueil en ouate siliconée de 300 g/m² (Dacron). Vous obtenez ainsi un accueil moelleux immédiat avec un soutien ferme et pérenne.`
      },
      {
        id: "jeu-des-textures",
        heading: "4. Marier lin brut, velours mat et passepoils contrastés",
        content: `Le secret d'un salon marocain contemporain réussi réside dans le contraste des textures unies :
- Une galette d'assise en **Pur Lin d'Atlas Pré-Lavé** couleur mastic ou grège.
- Des coussins de dossier en **Velours de Coton Peigné** couleur terracotta ou vert cyprès.
- Un passepoil discret contrasté de 5 mm qui souligne l'arête des coussins avec une précision d'orfèvre.`
      },
      {
        id: "faq-salon",
        heading: "5. Foire Aux Questions (FAQ)",
        content: `Retrouvez les conseils de notre studio pour votre salon.`
      }
    ]
  }
];

/**
 * Cadence helper: returns articles spaced by 2 to 4 days intervals.
 * Automatically checks if a new article from UPCOMING_TOPIC_PIPELINE should be activated!
 */
export function getAutomatedPublishingSchedule(): BlogPost[] {
  const published = [...BLOG_POSTS];
  const now = new Date();

  // If there are upcoming topics, simulate the dynamic 2-4 days release calendar
  UPCOMING_TOPIC_PIPELINE.forEach((topic, idx) => {
    // Generate scheduled dates staggered every 3 days from the latest post
    const baseDate = new Date("2026-10-15T14:00:00.000Z");
    const intervalDays = (idx + 1) * 3; // +3 days, +6 days, etc.
    const scheduledDate = new Date(baseDate.getTime() + intervalDays * 24 * 60 * 60 * 1000);

    const automatedPost: BlogPost = {
      slug: topic.slug,
      title: topic.title,
      titleEn: topic.titleEn,
      kicker: topic.kicker,
      excerpt: topic.excerpt,
      excerptEn: topic.excerpt,
      category: topic.category,
      categorySlug: topic.categorySlug,
      coverImage: topic.coverImage,
      coverAlt: topic.coverAlt,
      publishedAt: scheduledDate.toISOString(),
      readingTime: topic.readingTime,
      author: topic.author,
      seoKeywords: topic.seoKeywords,
      metaDescription: topic.metaDescription,
      metaDescriptionEn: topic.metaDescription,
      tableOfContents: topic.tableOfContents,
      technicalTable: topic.technicalTable,
      faqs: topic.faqs,
      sections: topic.sections,
    };

    // If scheduled date has arrived or if forced preview, include it
    if (scheduledDate <= now) {
      published.push(automatedPost);
    }
  });

  return published.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}
