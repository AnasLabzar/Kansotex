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
    kickerEn: "Fabric Care & Textile Maintenance",
    excerpt: "Brossage au poil de sanglier, vapeur défroissante sans écraser le velours et détachage à sec : les secrets des maîtres tapissiers pour garder un velours soyeux et profond malgré le Chergui.",
    excerptEn: "Boar bristle brushing, steaming without crushing the pile, and dry spot cleaning: master upholsterers' secrets to keeping combed velvet lustrous and deep despite the desert Chergui wind.",
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
    metaDescriptionEn: "Kansotex Atelier practical guide to caring for and stain-removing cotton velvet banquettes and sofas in Marrakech: dust prevention, dry Terre de Sommières treatment, and pile restoration.",
    tableOfContents: [
      { id: "le-defi-du-chergui", title: "1. Le défi du Chergui et des microparticules de sable", titleEn: "1. The Chergui challenge and silica microdust" },
      { id: "geste-hebdomadaire", title: "2. Le rituel hebdomadaire : Brosser dans le sens du poil", titleEn: "2. The weekly ritual: Brushing along the pile" },
      { id: "detacher-sans-aureole", title: "3. Traiter une tache fraîche de thé ou de café sans auréole", titleEn: "3. Treating fresh tea or coffee spills without watermark rings" },
      { id: "redonner-gonflant", title: "4. Redonner du gonflant aux zones d'assise écrasées", titleEn: "4. Restoring bounce and lift to crushed seating zones" },
      { id: "faq-velours", title: "5. Foire Aux Questions (FAQ)", titleEn: "5. Frequently Asked Questions (FAQ)" },
    ],
    technicalTable: {
      caption: "Guide des Produits Autorisés & Proscrits sur le Velours Peigné Kansotex",
      captionEn: "Approved vs Prohibited Care Protocols for Kansotex Combed Cotton Velvet",
      rows: [
        {
          metric: "Brossage quotidien",
          metricEn: "Daily & Weekly Brushing",
          kansotexSpec: "Brosse souple en soies naturelles de sanglier",
          kansotexSpecEn: "Soft natural boar-bristle brush",
          standardMarket: "Brosse synthétique dure",
          standardMarketEn: "Hard synthetic bristles",
          practicalImpact: "Dépoussière en profondeur sans cisailler la pointe des poils de coton.",
          practicalImpactEn: "Deep cleans dust without shearing or scratching cotton pile tips."
        },
        {
          metric: "Détachage liquide",
          metricEn: "Liquid Stain Removal",
          kansotexSpec: "Terre de Sommières à sec + tamponnage eau tiède déminéralisée",
          kansotexSpecEn: "Dry Terre de Sommières clay powder + demineralized warm water dab",
          standardMarket: "Frottement vigoureux avec détergent javellisé",
          standardMarketEn: "Vigorous scrubbing with bleach/chlorine detergents",
          practicalImpact: "Absorbe les corps gras sans décolorer ni brûler le pigment de la fibre.",
          practicalImpactEn: "Absorbs fats and tannins without bleaching or burning natural fiber pigments."
        },
        {
          metric: "Défroissage thermique",
          metricEn: "Thermal De-wrinkling",
          kansotexSpec: "Vapeur douce verticale à 15 cm de distance",
          kansotexSpecEn: "Gentle vertical steam held 15 cm away",
          standardMarket: "Fer à repasser chaud posé à plat",
          standardMarketEn: "Hot flat iron pressed directly on fabric",
          practicalImpact: "Redresse instantanément le poil écrasé sans marquer le tissu.",
          practicalImpactEn: "Instantly revives crushed velvet pile without glazing or leaving permanent iron marks."
        }
      ]
    },
    faqs: [
      {
        question: "Comment savoir dans quel sens brosser un velours de coton ?",
        questionEn: "How do I know which direction to brush cotton velvet?",
        answer: "Passez doucement la paume de votre main sur l'étoffe. Si le tissu devient lisse et soyeux sous vos doigts, vous êtes dans le 'sens du poil'. S'il accroche légèrement et fonce visuellement, vous êtes 'à rebrousse-poil'. Brossez toujours dans le sens du poil pour éliminer la poussière en douceur.",
        answerEn: "Gently stroke the palm of your hand across the fabric. If it feels smooth and silky under your fingers, you are moving 'with the grain' (along the pile). If it catches slightly and appears darker, you are moving 'against the grain'. Always brush in the direction of the pile to remove dust smoothly without friction damage."
      },
      {
        question: "Que faire si quelqu'un renverse du thé à la menthe chaud sur la banquette ?",
        questionEn: "What should I do if someone spills hot Moroccan mint tea on the banquette?",
        answer: "Agissez immédiatement sans jamais frotter ! Posez un chiffon blanc propre et absorbant pour éponger l'excès de liquide par pression. Saupoudrez généreusement de Terre de Sommières pour absorber les tanins, laissez agir 4 heures, puis brossez doucement. La tache disparaît sans laisser d'auréole.",
        answerEn: "Act immediately without ever rubbing! Place a clean, dry white microfiber towel over the spill to absorb excess liquid by downward pressure. Generously sprinkle dry Terre de Sommières powder to pull tannins out of the fibers, leave for 4 hours, then gently brush away. The stain vanishes without leaving watermarks."
      }
    ],
    sections: [
      {
        id: "le-defi-du-chergui",
        heading: "1. Le défi du Chergui et des microparticules de sable",
        headingEn: "1. The Chergui challenge and silica microdust",
        content: `À Marrakech, le velours est une étoffe adulée pour sa noblesse et sa profondeur tactile. Cependant, le vent du désert transporte avec lui une poussière ultrafine chargée de silice. 

Si cette poussière n'est pas évacuée régulièrement, les microcristaux de sable pénètrent entre les poils serrés du velours et agissent comme un papier de verre microscopique lors de chaque assise. Préserver son velours, c'est donc avant tout empêcher le sable de s'incruster à la racine de la trame.`,
        contentEn: `In Marrakech, velvet is celebrated for its tactile nobility and visual depth. However, dry desert winds bring extremely fine airborne silica sand.

If this dust is not regularly evacuated, microscopic sand crystals work their way into the dense velvet pile, acting like sandpaper with every seated motion. Preserving velvet is primarily about preventing silica from taking root at the weave foundation.`
      },
      {
        id: "geste-hebdomadaire",
        heading: "2. Le rituel hebdomadaire : Brosser dans le sens du poil",
        headingEn: "2. The weekly ritual: Brushing along the pile",
        content: `Pour l'entretien courant, oubliez les embouts d'aspirateur en plastique dur qui risquent de rayer les fibres.

Utilisez une brosse en soies naturelles souples (soie de sanglier ou crin de cheval) :
1. Brossez délicatement de haut en bas toujours dans le même sens.
2. Si vous utilisez un aspirateur, réglez-le sur la puissance minimale et munissez-le d'une brosse ronde à poils doux.
3. Ce geste de deux minutes par semaine suffit à préserver la brillance satinée du velours pendant plus de dix ans.`,
        contentEn: `For routine maintenance, avoid rigid plastic vacuum nozzle attachments that scratch and scuff delicate fibers.

Use a soft natural bristle brush (wild boar hair or horsehair):
1. Brush gently from top to bottom, always maintaining the same direction.
2. If using a vacuum cleaner, set it to the lowest suction power and equip it with a round soft dusting brush.
3. This simple two-minute weekly gesture preserves the rich satiny sheen of velvet for well over a decade.`
      },
      {
        id: "detacher-sans-aureole",
        heading: "3. Traiter une tache fraîche de thé ou de café sans auréole",
        headingEn: "3. Treating fresh tea or coffee spills without watermark rings",
        content: `La règle d'or universelle de la tapisserie d'art : **ne jamais frotter une tache sur un velours**. Frotter fait pénétrer le liquide au cœur du sous-tissu et casse l'orientation des poils, créant une marque irréversible.

Tamponnez avec un papier absorbant ou un chiffon blanc en microfibre. Pour les taches grasses, appliquez de la Terre de Sommières en fine couche. Laissez sécher à l'air libre sans utiliser de sèche-cheveux chaud qui fixerait les sucres de la boisson.`,
        contentEn: `The universal golden rule of art upholstery: **never rub a spill on velvet**. Rubbing forces liquid deep into the backing cloth and breaks pile orientation, creating a permanent distorted watermark.

Blot immediately with absorbent paper towels or a dry white cloth. For oily or sugary spills, apply a generous layer of dry Terre de Sommières clay. Allow to dry naturally without hot hairdryers, which bake beverage sugars directly into the cellulose.`
      },
      {
        id: "redonner-gonflant",
        heading: "4. Redonner du gonflant aux zones d'assise écrasées",
        headingEn: "4. Restoring bounce and lift to crushed seating zones",
        content: `Avec le temps, le poids des corps assis au même endroit peut incliner les poils du velours. Pour leur redonner tout leur rebond :
- Utilisez un défroisseur vapeur vertical ou le jet vapeur d'un fer tenu à **15 cm au-dessus du tissu**.
- La chaleur humide détend la kératine et le coton naturel.
- Brossez immédiatement à rebrousse-poil pour redresser la fibre, puis lissez délicatement dans le sens de la lumière. L'effet de renouveau est spectaculaire.`,
        contentEn: `Over time, body weight concentrated on high-use seating zones can flatten velvet pile. To restore its natural rebound:
- Use a vertical garment steamer held **15 cm above the fabric**.
- Moist warm steam relaxes natural cotton fibers.
- Immediately brush against the grain to lift the pile, then smooth softly in the direction of natural ambient light. The rejuvenation is immediate and dramatic.`
      },
      {
        id: "faq-velours",
        heading: "5. Foire Aux Questions (FAQ)",
        headingEn: "5. Frequently Asked Questions (FAQ)",
        content: `Retrouvez les réponses pratiques de nos artisans tapissiers.`,
        contentEn: `Practical advice from our master upholsterers on maintaining luxury velvet.`
      }
    ]
  },
  {
    slug: "banquettes-salon-marocain-contemporain-tissus-nobles",
    title: "Banquettes Traditionnelles vs Assises Basses Contemporaines : Comment Moderniser le Salon Marocain",
    titleEn: "Traditional Banquettes vs Contemporary Low Seating: Modernizing the Moroccan Living Room",
    kicker: "Architecture d'Intérieur & Art de Vivre",
    kickerEn: "Interior Architecture & Art of Living",
    excerpt: "Comment allier la convivialité légendaire du salon marocain traditionnel avec l'épure architecturale contemporaine : choix des mousses haute résilience, tissus texturés et proportions parfaites.",
    excerptEn: "How to marry the legendary warmth of the traditional Moroccan salon with sleek architectural minimalism: high-resilience foams, textured noble textiles, and calibrated proportions.",
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
    metaDescriptionEn: "Interior design guide to modernizing the Moroccan living room with noble Kansotex fabrics: Atlas washed linen, minimal seating profiles, and HR 35kg/m³ foam.",
    tableOfContents: [
      { id: "revolution-salon-marocain", title: "1. La réinvention contemporaine du salon marocain", titleEn: "1. The contemporary reinvention of the Moroccan salon" },
      { id: "choix-des-proportions", title: "2. Les proportions parfaites d'une assise moderne", titleEn: "2. The ideal dimensions of modern low seating" },
      { id: "mousse-confort", title: "3. La mousse : Densité 35 kg/m³ pour une tenue éternelle", titleEn: "3. Foam selection: 35 kg/m³ density for lifelong resilience" },
      { id: "jeu-des-textures", title: "4. Marier lin brut, velours mat et passepoils contrastés", titleEn: "4. Pairing raw linen, matte velvet, and contrasting piping" },
      { id: "faq-salon", title: "5. Foire Aux Questions (FAQ)", titleEn: "5. Frequently Asked Questions (FAQ)" },
    ],
    faqs: [
      {
        question: "Quelle est la profondeur idéale pour une banquette marocaine contemporaine ?",
        questionEn: "What is the ideal seat depth for a contemporary Moroccan banquette?",
        answer: "Le salon traditionnel mesurait souvent 80 à 90 cm de profondeur avec des dossiers très épais. En design contemporain, nous préconisons une profondeur de 75 à 80 cm avec un dossier incliné ergonomique de 10 à 12 cm, complété de coussins d'appoint en plumes ou fibres douces pour un confort lounge décontracté.",
        answerEn: "Traditional salons typically spanned 80 to 90 cm deep with bulky upright back cushions. In contemporary residential architecture, we recommend a seat depth of 75 to 80 cm with an ergonomic 10 to 12 cm angled backrest, complemented by down-filled loose cushions for relaxed lounge seating."
      }
    ],
    sections: [
      {
        id: "revolution-salon-marocain",
        heading: "1. La réinvention contemporaine du salon marocain",
        headingEn: "1. The contemporary reinvention of the Moroccan salon",
        content: `Le salon marocain est le cœur battant de la maison. Il accueille les fêtes familiales, le thé d'après-midi, les confidences du soir et les siestes dominicales.

Pendant longtemps, le salon traditionnel a été surchargé de motifs damassés brillants, de glands de passementerie dorés et de mousses excessivement dures. Aujourd'hui, une nouvelle génération d'architectes à Marrakech et Casablanca réinvente ce patrimoine avec une épure somptueuse : des lignes géométriques basses, des tissus mats aux textures riches et des finitions haute-facture.`,
        contentEn: `The Moroccan living room is the beating heart of hospitality. It welcomes family celebrations, afternoon mint tea, evening conversations, and tranquil weekend repose.

For decades, traditional salons featured heavy metallic damask weaves, gilded bullion fringes, and overly rigid foam blocks. Today, an ambitious generation of architects in Marrakech and Casablanca is reimagining this heritage with architectural clarity: low geometric silhouettes, rich tactile matte fabrics, and couture craftsmanship.`
      },
      {
        id: "choix-des-proportions",
        heading: "2. Les proportions parfaites d'une assise moderne",
        headingEn: "2. The ideal dimensions of modern low seating",
        content: `Pour transformer un salon sans trahir sa convivialité :
- **Hauteur d'assise** : 40 à 42 cm du sol (mousse + socle compris). C'est la hauteur universelle qui permet de s'asseoir confortablement sans sensation d'enfoncement.
- **Socles flottants** : Remplacez les caissons en bois sculpté lourd par des socles en chêne clair brossé, en plâtre lissé ou en acier thermolaqué noir avec un retrait de 10 cm pour créer un effet de lévitation visuelle.`,
        contentEn: `To modernize a salon without compromising its warm hospitality:
- **Finished Seat Height**: 40 to 42 cm from the finished floor (including foam core and plinth). This universal height allows effortless seating and rising without sinking.
- **Floating Plinths**: Replace heavy carved wooden boxes with recessed plinths in wire-brushed oak, smooth tadelakt plaster, or matte black powder-coated steel recessed 10 cm to create a visually floating effect.`
      },
      {
        id: "mousse-confort",
        heading: "3. La mousse : Densité 35 kg/m³ pour une tenue éternelle",
        headingEn: "3. Foam selection: 35 kg/m³ density for lifelong resilience",
        content: `L'erreur la plus fréquente consiste à choisir une mousse trop rigide sous prétexte qu'elle durera plus longtemps. Une mousse à 28 kg/m³ trop dure s'avère inconfortable pour les invités, tandis qu'une mousse trop molle à 20 kg/m³ s'affaisse après quelques mois.

Notre recommandation absolue : une **mousse polyuréthane Haute Résilience (HR) de densité 35 kg/m³**, recouverte d'un matelas d'accueil en ouate siliconée de 300 g/m² (Dacron). Vous obtenez ainsi un accueil moelleux immédiat avec un soutien ferme et pérenne.`,
        contentEn: `The most common mistake is choosing overly dense, rock-hard foam under the false impression that it lasts longer. Rigid 28 kg/m³ foam causes discomfort for guests, while cheap 20 kg/m³ low-grade foam sags within months.

Our definitive atelier specification: **High Resilience (HR) polyurethane foam at 35 kg/m³ density**, wrapped in a 300 g/m² siliconized Dacron batting. This delivers immediate plush surface softness paired with enduring core support.`
      },
      {
        id: "jeu-des-textures",
        heading: "4. Marier lin brut, velours mat et passepoils contrastés",
        headingEn: "4. Pairing raw linen, matte velvet, and contrasting piping",
        content: `Le secret d'un salon marocain contemporain réussi réside dans le contraste des textures unies :
- Une galette d'assise en **Pur Lin d'Atlas Pré-Lavé** couleur mastic ou grège.
- Des coussins de dossier en **Velours de Coton Peigné** couleur terracotta ou vert cyprès.
- Un passepoil discret contrasté de 5 mm qui souligne l'arête des coussins avec une précision d'orfèvre.`,
        contentEn: `The secret of a refined contemporary Moroccan salon lies in the interplay of contrasting solid textures:
- A base seat cushion upholstered in **Pre-Washed Atlas Pure Linen** in putty or greige.
- Back and lumbar cushions in **Heavy Combed Cotton Velvet** in terracotta or cypress green.
- A delicate 5 mm contrast piping cord framing cushion contours with tailoring precision.`
      },
      {
        id: "faq-salon",
        heading: "5. Foire Aux Questions (FAQ)",
        headingEn: "5. Frequently Asked Questions (FAQ)",
        content: `Retrouvez les conseils de notre studio pour votre salon.`,
        contentEn: `Expert recommendations from our design studio for contemporary salon projects.`
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
      kickerEn: topic.kickerEn,
      excerpt: topic.excerpt,
      excerptEn: topic.excerptEn,
      category: topic.category,
      categorySlug: topic.categorySlug,
      coverImage: topic.coverImage,
      coverAlt: topic.coverAlt,
      publishedAt: scheduledDate.toISOString(),
      updatedAt: scheduledDate.toISOString(),
      readingTime: topic.readingTime,
      author: topic.author,
      seoKeywords: topic.seoKeywords,
      metaDescription: topic.metaDescription,
      metaDescriptionEn: topic.metaDescriptionEn,
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
