export const brand = {
  name: "Kansotex",
  legalName: "Kanso Business SARL",
  legalForm: "Société à Responsabilité Limitée (SARL)",
  capital: "100 000 MAD",
  establishedYear: 2012,
  tagline: "In & Outdoor",
  email: "contact@kansotex.com",
  emailPro: "pro@kansotex.com",
  emailAtelier: "atelier@kansotex.com",
  phone: "+212 5 24 20 09 96",
  phoneGenerale: "+212 5 24 20 09 96",
  phonePro: "+212 6 61 09 09 50",
  phoneManufacture: "+212 8 08 54 16 86",
  whatsappNumber: "+212 6 61 09 09 50",
  whatsappUrl: "https://wa.me/212661090950",
  address: "983 Al Massar, Rte de Safi, Marrakech 40100",
  registeredAddress: "Magasin 7, Rue Tétouan, Immeuble Le Consulat, Marrakech-Médina",
  activity: "Import-export, tapisserie et vente au détail de tissus et d'étoffes d'ameublement au mètre",
  city: "Marrakech",
  country: "Maroc",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
};

export type Universe = {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  description: string;
  image: string;
  tone: string;
};

export const universes: Universe[] = [
  {
    slug: "indoor",
    title: "Indoor",
    kicker: "Intérieur",
    excerpt:
      "Tissus d’ameublement, voilages et textures pensés pour habiller salons, hôtels et résidences.",
    description:
      "Une sélection de tissus d’intérieur haut de gamme : velours, lin, jacquards et voiles. Kansotex accompagne architectes, décorateurs et particuliers dans le choix de matières qui tiennent le quotidien sans jamais trahir l’élégance.",
    image:
      "/gallery/Kansotex-indoor-living-room-pinterest.png",
    tone: "#4A4036",
  },
  {
    slug: "outdoor",
    title: "Outdoor",
    kicker: "Extérieur",
    excerpt:
      "Tissus techniques et esthétiques pour terrasses, jardins, riads et espaces hospitality en plein air.",
    description:
      "Résistance UV, déperlance, tenue des couleurs : nos tissus outdoor allient performance et belle matière. Idéals pour coussins, banquettes, parasols et mobilier d’extérieur, du riad au resort.",
    image:
      "/gallery/Kansotex-outdoor-tissus-pinterest.jpg",
    tone: "#3F4636",
  },
  {
    slug: "linge-de-maison",
    title: "Linge de maison",
    kicker: "Maison",
    excerpt:
      "Nappes, chemins de table, plaids et pièces textiles qui donnent le ton d’une table ou d’un salon.",
    description:
      "Le linge de maison Kansotex célèbre le geste du quotidien : nappes, serviettes de table, plaids et housses. Des fibres nobles, des finitions nettes, une palette calme qui dialogue avec l’architecture marocaine et contemporaine.",
    image:
      "/gallery/linge-de-maison-indoor-villa-kansotex.jpg",
    tone: "#6B5A4A",
  },
  {
    slug: "linge-de-lit",
    title: "Linge de lit",
    kicker: "Lit",
    excerpt:
      "Draps, housses et taies en lin et coton, pour un sommeil d’hôtel et une chambre d’hôte raffinée.",
    description:
      "Parures de lit, draps-housses, housses de couette et taies. Nous travaillons le lin lavé, le percale et les tissages denses pour un tombé fluide, une main douce et une longévité digne de l’hôtellerie.",
    image:
      "/gallery/linge-de-lite-villa-marrakech-kansotex.jpg",
    tone: "#5C534A",
  },
  {
    slug: "linge-de-bain",
    title: "Linge de bain",
    kicker: "Bain",
    excerpt:
      "Serviettes, peignoirs et tapis de bain : absorption, densité et une présence discrète dans la pièce d’eau.",
    description:
      "Le bain mérite autant d’attention que le salon. Éponges, peignoirs et tapis Kansotex offrent un toucher généreux, des grammages maîtrisés et des teintes minérales qui s’installent dans le spa comme dans la maison.",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=80",
    tone: "#7A746C",
  },
  {
    slug: "tissus-haut-de-gamme",
    title: "Tissus haut de gamme",
    kicker: "Matière",
    excerpt:
      "Une matériauthèque exigeante : tissages rares, coloris sur-mesure et étoffes pour projets d’exception.",
    description:
      "Pour les projets qui demandent plus qu’un standard. Kansotex sourit le détail : textures techniques, éditions limitées, coloris sur-mesure et accompagnement jusqu’à la pose. Une haute gamme de tissus, indoor comme outdoor.",
    image:
      "/gallery/tissus-haut-de-gamme.jpg",
    tone: "#2F2C28",
  },
];

export const pillars = [
  {
    title: "La matière",
    text: "Nous parlons un langage commun avec nos clients : celui du beau et du durable. Œil aiguisé, main exigeante, tissus sélectionnés pour leur tenue, leur tombé et leur présence.",
    image:
      "/gallery/matiere-tissus-outdoor-rooftop.jpg",
  },
  {
    title: "In & outdoor",
    text: "Une même exigence des deux côtés du seuil. Indoor pour habiller l’espace, outdoor pour affronter le soleil, l’eau et le temps — sans jamais sacrifier l’esthétique.",
    image:
      "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png",
  },
  {
    title: "L’accompagnement",
    text: "Du brief à la livraison : échantillons, conseil coloris, métrages et suivi de projet. Une équipe dédiée pour les professionnels comme pour les particuliers.",
    image:
      "/gallery/accompagnement-equipe-kansotex.jpg",
  },
];

export const nav = [
  { href: "/univers", label: "Nos univers" },
  { href: "/savoir-faire", label: "Notre savoir-faire" },
  { href: "/a-propos", label: "A propos de nous" },
  { href: "/contact", label: "Nous contacter" },
];
