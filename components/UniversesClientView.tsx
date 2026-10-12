"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useCurrency, CurrencyCode } from "@/lib/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

interface UniverseItem {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  description: string;
  image: string;
  tone: string;
  tag: string;
  samplePrice: number; // in EUR (0 = offert)
  sampleName: string;
}

const UNIVERSES_DATA: UniverseItem[] = [
  {
    slug: "indoor",
    title: "Indoor, Salons et Sejours",
    kicker: "Interieur et Hotellerie",
    excerpt: "Velours d'ameublement, soies, jacquards et lins lourds penses pour canapes, banquettes et voilages sur-mesure.",
    description: "Une collection d'etoffes interieures combinant sophistication tactile et durabilite d'exception pour villas, riads et residences privees.",
    image: "/gallery/Kansotex-indoor-living-room-pinterest.png",
    tone: "#4A4036",
    tag: "Haute Decoration",
    samplePrice: 0,
    sampleName: "Echantillon Velours et Lin",
  },
  {
    slug: "outdoor",
    title: "Outdoor et Terrasses",
    kicker: "Plein Air et Hospitality",
    excerpt: "Tissus techniques deperlants, toiles haute densite anti-UV pour banquettes, pergolas, rooftops et transats.",
    description: "Resistance solaire maximale, respirabilite et deperlance pour resister aux etes marocains sans alterer l'eclat des textures.",
    image: "/gallery/Kansotex-outdoor-tissus-pinterest.jpg",
    tone: "#3F4636",
    tag: "Resistance UV",
    samplePrice: 0,
    sampleName: "Echantillon Toile Outdoor",
  },
  {
    slug: "linge-de-lit",
    title: "Linge de Lit et Suites",
    kicker: "Chambres et Riads",
    excerpt: "Draps, housses et taies en pur lin lave d'Atlas et satin de coton peigne 400 fils pour un sommeil digne des grands hotels.",
    description: "Le toucher fluide et frais du lin lave naturel, selectionne pour une regulation thermique parfaite et un tombe nonchalant d'une grande elegance.",
    image: "/gallery/linge-de-lite-villa-marrakech-kansotex.jpg",
    tone: "#5C534A",
    tag: "Pur Lin d'Atlas",
    samplePrice: 0,
    sampleName: "Nuancier Pur Lin Lave",
  },
  {
    slug: "linge-de-bain",
    title: "Linge de Bain et Spas",
    kicker: "Pieces d'Eau et Spas",
    excerpt: "Serviettes eponges 600g, draps de bain absorbants et peignoirs doux confectionnes pour spas, bains et residences.",
    description: "Une epaisseur genereuse en coton peigne naturel, procurant une absorption immediate et une caresse reconfortante apres le bain ou le hammam.",
    image: "/gallery/bath_towels_set_1791048635743.jpg",
    tone: "#7A746C",
    tag: "Coton Peigne 600g",
    samplePrice: 0,
    sampleName: "Echantillon Eponge Spa",
  },
  {
    slug: "linge-de-maison",
    title: "Linge de Table et Receptions",
    kicker: "Art de la Table",
    excerpt: "Nappes genereuses, chemins de table et serviettes brodees pour sublimer les dejeuners sous la pergola ou les diners d'apparat.",
    description: "Des matieres vivantes qui s'adoucissent a chaque lavage, apportant la convivialite raffinee et la noblesse de la table marocaine contemporaine.",
    image: "/gallery/linge-de-maison-indoor-villa-kansotex.jpg",
    tone: "#6B5A4A",
    tag: "Confection Artisanale",
    samplePrice: 0,
    sampleName: "Nuancier Linge de Table",
  },
  {
    slug: "tissus-haut-de-gamme",
    title: "Tissus et Metrages Editeur",
    kicker: "Atelier et Matieratheque Pro",
    excerpt: "Metrages au rouleau, tissages rares et finitions sur-mesure destines aux tapissiers, architectes et projets d'exception.",
    description: "Un service direct de coupe au metre lineaire, avec transmission de certificats techniques, nuanciers complets et metrages a la demande.",
    image: "/gallery/tissus-haut-de-gamme.jpg",
    tone: "#2F2C28",
    tag: "Metrages Atelier",
    samplePrice: 0,
    sampleName: "Nuancier Complet Atelier",
  },
];

const CATEGORIES = [
  { id: "all", label: "Tous les Univers" },
  { id: "indoor", label: "Indoor & Salons" },
  { id: "outdoor", label: "Outdoor & Terrasses" },
  { id: "linge-de-lit", label: "Linge de Lit" },
  { id: "linge-de-bain", label: "Bain & Spa" },
  { id: "linge-de-maison", label: "Linge de Table" },
  { id: "tissus-haut-de-gamme", label: "Tissus d'Éditeur" },
];

import { NavbarRightActions } from "@/components/NavbarRightActions";

export function UniversesClientView() {
  const { addItem, openCart } = useCart();
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState("all");
  const [justAddedSlug, setJustAddedSlug] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll when menu overlay is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Filter items
  const filteredUniverses = activeCategory === "all"
    ? UNIVERSES_DATA
    : UNIVERSES_DATA.filter((u) => u.slug === activeCategory);

  // Quick Add Sample to Cart & Trigger Drawer
  const handleAddSample = (universe: UniverseItem) => {
    addItem({
      id: `sample-${universe.slug}`,
      productId: `prod-${universe.slug}`,
      variantId: `var-sample-${universe.slug}`,
      name: universe.sampleName,
      colorName: "Nuancier Officiel Kansotex",
      price: universe.samplePrice,
      quantity: 1,
      isFabric: true,
      image: universe.image,
    });

    setJustAddedSlug(universe.slug);
    setTimeout(() => setJustAddedSlug(null), 2500);

    // Open Cart Drawer
    openCart();
  };

  return (
    <div className="min-h-screen bg-cream text-[#1c1b19] font-sans antialiased selection:bg-[#1c1b19] selection:text-white pb-24">
      {/* ============================================================ */}
      {/* FULL SCREEN / SLIDE-IN LUXURY MENU OVERLAY (Home Navbar Style) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-[#1c1b19] px-6 sm:px-10 pb-10 pt-16 text-[#faf8f5]"
          >
            {/* Top Bar inside Overlay */}
            <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-7 border-b border-white/15">
              <Link href="/" onClick={() => setMenuOpen(false)} aria-label="Kansotex" className="shrink-0 flex items-center">
                <Image
                  src="/KANSOTEX-marque-1-white.png"
                  alt="Kansotex"
                  width={500}
                  height={120}
                  className="w-[140px] sm:w-[160px] h-auto object-contain"
                  priority
                />
              </Link>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-xs uppercase tracking-widest font-sans text-white/70 hover:text-white transition-colors flex items-center gap-2 py-1 px-2.5 rounded-full hover:bg-white/10"
              >
                <span>Fermer</span>
                <span className="text-sm">✕</span>
              </button>
            </div>

            {/* Navigation Links */}
            <ul className="mt-8 sm:mt-10 space-y-6 sm:space-y-7 px-2 flex-1 max-w-2xl mx-auto w-full overflow-y-auto">
              <li>
                <Link
                  href="/"
                  onClick={() => setMenuOpen(false)}
                  className="font-termina text-xl sm:text-3xl font-bold uppercase tracking-widest text-[#faf8f5] hover:text-white/60 transition-colors block py-1"
                >
                  ACCUEIL
                </Link>
              </li>
              <li>
                <Link
                  href="/univers"
                  onClick={() => setMenuOpen(false)}
                  className="font-termina text-xl sm:text-3xl font-bold uppercase tracking-widest text-[#d8cbb6] hover:text-white transition-colors block py-1"
                >
                  NOS UNIVERS
                </Link>
              </li>
              <li>
                <Link
                  href="/savoir-faire"
                  onClick={() => setMenuOpen(false)}
                  className="font-termina text-xl sm:text-3xl font-bold uppercase tracking-widest text-[#faf8f5] hover:text-white/60 transition-colors block py-1"
                >
                  NOTRE SAVOIR-FAIRE
                </Link>
              </li>
              <li>
                <Link
                  href="/a-propos"
                  onClick={() => setMenuOpen(false)}
                  className="font-termina text-xl sm:text-3xl font-bold uppercase tracking-widest text-[#faf8f5] hover:text-white/60 transition-colors block py-1"
                >
                  A PROPOS DE NOUS
                </Link>
              </li>
              <li>
                <Link
                  href="/pro"
                  onClick={() => setMenuOpen(false)}
                  className="font-termina text-xl sm:text-3xl font-bold uppercase tracking-widest text-[#faf8f5] hover:text-white/60 transition-colors block py-1"
                >
                  ESPACE ARCHITECTURE &amp; PRO
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="font-termina text-xl sm:text-3xl font-bold uppercase tracking-widest text-[#faf8f5] hover:text-white/60 transition-colors block py-1"
                >
                  NOUS CONTACTER
                </Link>
              </li>
            </ul>

            {/* Footer Information inside Drawer */}
            <div className="px-2 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-2xl mx-auto w-full text-xs text-white/60 font-sans">
              <div>
                <a href="mailto:contact@kansotex.com" className="hover:text-white transition-colors block">
                  contact@kansotex.com
                </a>
                <p className="mt-0.5">983 Al Massar, Marrakech · +212 5 24 20 09 96</p>
              </div>
              <div className="flex gap-4 text-[11px] tracking-wider uppercase text-white/50 pt-2 sm:pt-0">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram
                </a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 1. FLOATING NAVIGATION BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-[#e9e5dd] py-3.5 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative flex items-center justify-between min-h-[48px]">
          {/* Left: Burger Menu Button (Identical to Home Navbar) */}
          <div className="flex items-center z-10">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="relative z-20 flex h-6 w-6 flex-col items-center justify-center gap-1.5 cursor-pointer hover:opacity-65 transition-opacity"
              aria-label="Ouvrir le menu"
            >
              <span className="block h-[1px] w-5 bg-[#1c1b19] transition-all duration-300" />
              <span className="block h-[1px] w-5 bg-[#1c1b19] transition-all duration-300" />
              <span className="block h-[1px] w-5 bg-[#1c1b19] transition-all duration-300" />
            </button>
          </div>

          {/* Truly Centered Brand Logo (Mathematically Centered in Navbar) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <Link href="/" aria-label="Kansotex" className="pointer-events-auto shrink-0 flex items-center justify-center">
              <Image
                src="/KANSOTEX-marque-Black.png"
                alt="Kansotex"
                width={500}
                height={120}
                className="w-[140px] sm:w-[170px] h-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right Action Controls */}
          <NavbarRightActions />
        </div>
      </header>

      {/* Main Container (Perfect Alignment with Navbar Width & Generous Section Spacing) */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 space-y-16 sm:space-y-24">

        {/* ============================================================ */}
        {/* 2. THE HERO CARD WITH BOTTOM NOTCH CUTOUT BUTTON (Exact NENYA) */}
        {/* ============================================================ */}
        <section className="relative w-full aspect-[16/10] sm:aspect-[21/10] mb-30 sm:mb-26 group">
          {/* Rounded Hero Image Wrapper (Clips the image to rounded corners) */}
          <div className="absolute inset-0 rounded-[26px] sm:rounded-[36px] overflow-hidden bg-[#24211d] border-t border-x border-[#e8e4db]">
            <Image
              src="/gallery/Kansotex-outdoor-terasse-rooftop.jpg"
              alt="Kansotex Univers Textiles d'Exception"
              fill
              priority
              className="object-cover object-center brightness-[0.92] transition-transform duration-1000 group-hover:scale-[1.02]"
              sizes="100vw"
            />
            {/* Ambient Lighting Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />

            {/* Top subtle brand badge inside the hero */}
            <div className="absolute top-6 left-6 sm:top-9 sm:left-9 z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] font-sans tracking-widest uppercase font-medium">
                Marrakech · In &amp; Outdoor
              </span>
            </div>
          </div>

          {/* Bottom Center Notch Cutout (Positioned lower so it sticks out further beyond the image) */}
          <div className="absolute -bottom-7 sm:-bottom-8 inset-x-0 flex justify-center z-20 pointer-events-none">
            <div className="relative pointer-events-auto bg-cream px-6 sm:px-7 py-3 rounded-[26px] sm:rounded-[30px] flex items-center justify-center">
              {/* Capsule Button inside the Cutout */}
              <a
                href="#univers-explore"
                className="inline-flex items-center gap-2.5 bg-[#1c1b19] text-[#faf8f5] hover:bg-black px-6 sm:px-8 py-3 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all hover:scale-[1.02] group/btn"
              >
                <span>Explorer les Univers</span>
                <span className="text-sm transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. SPLIT EDITORIAL SECTION & STATS BENTO (Exact NENYA Style) */}
        {/* ============================================================ */}
        <section id="univers-explore" className="pt-2 pb-6 sm:pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column (7 cols): Filter Pills + Main Editorial Typography */}
            <div className="lg:col-span-7 space-y-6">
              {/* Category Pills Slider */}
              <div className="flex flex-wrap items-center gap-2 pb-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                      activeCategory === cat.id
                        ? "bg-[#1c1b19] text-white shadow-xs"
                        : "bg-[#e8e2d5]/60 hover:bg-[#e8e2d5] text-[#1c1b19]/75 border border-[#dcd4c5]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Bold Impactful Headline */}
              <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#1c1b19] leading-[1.12]">
                TEXTILES D&apos;EXCEPTION CONÇUS POUR SUBLIMER CHAQUE ESPACE.
              </h1>

              {/* Refined Description Paragraph */}
              <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/65 leading-relaxed max-w-xl">
                Maison d&apos;étoffes et atelier de confection sur-mesure à Marrakech. Du salon de réception à la terrasse ombragée, de la suite parentale au riad d&apos;architecte, nous travaillons des matières naturelles aux finitions artisanales pensées pour sublimer le quotidien et traverser le temps.
              </p>
            </div>

            {/* Right Column (5 cols): 2x2 Modular Stats with Dashed Borders (Exact NENYA Style) */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 border-t border-b sm:border-l border-dashed border-[#cdc6b9]">
                {/* Stat 1 */}
                <div className="p-6 sm:p-7 border-r border-b border-dashed border-[#cdc6b9]">
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-[#1c1b19] tracking-tight block">
                    500+
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/60 mt-1.5 font-normal">
                    Métrages &amp; Références textiles
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="p-6 sm:p-7 border-b border-dashed border-[#cdc6b9]">
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-[#1c1b19] tracking-tight block">
                    6
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/60 mt-1.5 font-normal">
                    Univers In &amp; Outdoor
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="p-6 sm:p-7 border-r border-dashed border-[#cdc6b9]">
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-[#1c1b19] tracking-tight block">
                    15 Ans
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/60 mt-1.5 font-normal">
                    D&apos;Excellence à Marrakech
                  </p>
                </div>

                {/* Stat 4 */}
                <div className="p-6 sm:p-7">
                  <span className="font-sans text-3xl sm:text-4xl font-bold text-[#1c1b19] tracking-tight block">
                    100%
                  </span>
                  <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/60 mt-1.5 font-normal">
                    Confection sur-mesure &amp; Pro
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. THE INTERACTIVE UNIVERSES SHOWCASE CARDS (Pro Branding) */}
        {/* ============================================================ */}
        <section className="space-y-8 pt-4">
          {/* Section Header with Termina Typography (ONLY used here) */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-[#ded6c8]">
            <div>
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#1c1b19]/45 block mb-1">
                COLLECTIONS ET MATIERES
              </span>
              <h2 className="font-termina text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] text-[#1c1b19]">
                DECOUVREZ NOS 6 UNIVERS
              </h2>
            </div>
            <span className="text-xs font-sans text-[#1c1b19]/50 tracking-wider">
              6 Univers In et Outdoor
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
            <AnimatePresence mode="popLayout">
              {filteredUniverses.map((item) => (
                <motion.article
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col"
                >
                  {/* Frameless Editorial Image */}
                  <Link
                    href={`/univers/${item.slug}`}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-dark block cursor-pointer"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />

                    {/* Tag Badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full bg-[#1c1b19]/60 backdrop-blur-md text-white text-[10px] font-sans font-medium">
                        {item.tag}
                      </span>
                    </div>
                  </Link>

                  {/* Editorial Text Details (Clean font-sans - NO Termina) */}
                  <div className="pt-4 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <p className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/45 font-medium">
                        {item.kicker}
                      </p>

                      <h3 className="font-sans text-base sm:text-lg font-semibold text-[#1c1b19] group-hover:opacity-75 transition-opacity">
                        <Link href={`/univers/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>

                      <p className="font-sans text-xs text-[#1c1b19]/65 leading-relaxed line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>

                    {/* Clean Action Row - NO special characters */}
                    <div className="pt-3 border-t border-[#ded6c8] flex items-center justify-between gap-3">
                      <Link
                        href={`/univers/${item.slug}`}
                        className="text-xs font-sans font-medium text-[#1c1b19] underline underline-offset-4 hover:opacity-60 transition-opacity"
                      >
                        Explorer
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleAddSample(item)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-all ${
                          justAddedSlug === item.slug
                            ? "bg-[#2e6224] text-white"
                            : "bg-[#1c1b19] text-white hover:bg-black"
                        }`}
                      >
                        {justAddedSlug === item.slug ? "Echantillon ajoute" : "Echantillon offert"}
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. ATELIER SERVICES REASSURANCE RIBBON */}
        {/* ============================================================ */}
        <section className="bg-[#ebe5d8]/70 rounded-2xl p-6 sm:p-9 border border-[#ded5c5] mt-12 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-[#ded9cf]">
            <div className="sm:px-4 first:pl-0 space-y-1 pt-3 sm:pt-0">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1c1b19]">
                Échantillons Gratuits
              </h4>
              <p className="font-sans text-[11px] text-[#1c1b19]/60 leading-relaxed">
                Recevez directement chez vous vos sélections d&apos;étoffes et nuanciers avant confection.
              </p>
            </div>

            <div className="sm:px-4 space-y-1 pt-4 sm:pt-0">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1c1b19]">
                Conseil &amp; Devis sous 24h
              </h4>
              <p className="font-sans text-[11px] text-[#1c1b19]/60 leading-relaxed">
                Nos artisans tapissiers calculent vos métrages pour banquettes, rideaux et suites de villas.
              </p>
            </div>

            <div className="sm:px-4 last:pr-0 space-y-1 pt-4 sm:pt-0">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1c1b19]">
                Confection à Marrakech
              </h4>
              <p className="font-sans text-[11px] text-[#1c1b19]/60 leading-relaxed">
                Fabrication soignée et livraison express offerte dans tout le Maroc et à l&apos;international.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
