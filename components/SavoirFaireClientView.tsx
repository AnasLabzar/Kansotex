"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useCurrency, CurrencyCode } from "@/lib/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryMenuOverlay } from "@/components/LuxuryMenuOverlay";

interface CraftChapter {
  id: string;
  stepNumber: string;
  kicker: string;
  title: string;
  description: string;
  quote: string;
  highlights: string[];
  image: string;
  sampleName: string;
}

const CHAPTERS_DATA: CraftChapter[] = [
  {
    id: "matiere-premiere",
    stepNumber: "01",
    kicker: "01 · LA MATIERE PREMIERE",
    title: "La Richesse Tactile du Lin d'Atlas et des Velours Nobles",
    description: "Chaque rouleau sélectionné dans notre manufacture provient de filatures d'exception. Nous privilégions les lins d'Atlas pré-lavés, les cotons peignés et les velours denses, capables d'offrir un tombé souple, une respirabilité naturelle et une tenue inaltérable face aux étés ensoleillés.",
    quote: "Une étoffe d'art ne triche pas : sa noblesse se révèle dans la caresse de sa fibre et la fluidité de son mouvement.",
    highlights: [
      "Fils de lin pur pré-lavés au toucher adouci",
      "Velours de coton à poil serré anti-écrasement",
      "Teintures grand teint résistantes aux UV solaires",
    ],
    image: "/gallery/linen_fabric_closeup_1791052926029.jpg",
    sampleName: "Nuancier Fibres Nobles & Lin",
  },
  {
    id: "coupe-calepinage",
    stepNumber: "02",
    kicker: "02 · PRECISION ET GEOMETRIE",
    title: "Le Calepinage d'Atelier et la Coupe au Fil Droit",
    description: "La tenue parfaite d'une draperie commence par la rigueur de sa découpe. Nos maîtres tailleurs tracent chaque laize à la main au fil droit rigoureux. Cette discipline empêche tout vrillage du tissu sur les rideaux de grande hauteur et assure un alignement millimétré des raccords de motifs jacquard.",
    quote: "Couper au fil droit, c'est garantir que le rideau conservera son aplomb parfait pendant des décennies.",
    highlights: [
      "Tolérance de coupe strictement inférieure à 2 mm",
      "Raccordement invisible des motifs sur toute la largeur",
      "Confection de hauteurs monumentales jusqu'à 6,5 mètres",
    ],
    image: "/fabric_layers.jpg",
    sampleName: "Guide Technique Calepinage Kansotex",
  },
  {
    id: "ourlet-plombe",
    stepNumber: "03",
    kicker: "03 · FINITIONS HAUTE COUTURE",
    title: "Ourlets Plombés de 10 cm et Points Invisibles",
    description: "Le secret de nos tentures réside dans la lourdeur maîtrisée de leur base. Nos ourlets bas généreux de 10 cm intègrent un fil de plomb souple cousu en sous-face, avec des coins repliés en onglet à la main. Les têtes à plis pincés flamands sont façonnées une à une pour créer des ondulations régulières et majestueuses.",
    quote: "La perfection se loge dans les détails invisibles qui donnent à la draperie son tombé sculptural.",
    highlights: [
      "Ourlets de 10 cm avec coins en onglet cousus main",
      "Plombage discret intégré pour un drapé franc et lourd",
      "Têtes de rideaux renforcées indéformables",
    ],
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
    sampleName: "Échantillon Finitions Couture Atelier",
  },
  {
    id: "tapisserie-assises",
    stepNumber: "04",
    kicker: "04 · AMEUBLEMENT ET CONFORT",
    title: "Banquettes de Riad et Mousses Haute Résilience",
    description: "Spécialistes reconnus de l'assise sur-mesure pour riads, villas et salons de réception, nous concevons des banquettes au confort ferme et durable. Nos garnissages combinent des mousses haute résilience 35 à 45 kg/m³, des sous-housses techniques étanches et des fermetures marins dissimulées pour un déhoussage sans effort.",
    quote: "Façonner une banquette de riad, c'est sculpter une invitation au repos et à l'hospitalité marocaine.",
    highlights: [
      "Mousses Haute Résilience indéformables testées",
      "Sous-housses techniques protectrices respirantes",
      "Confection entièrement déhoussable avec zips invisibles",
    ],
    image: "/gallery/Kansotex-outdoor-terasse-rooftop-2.jpg",
    sampleName: "Nuancier Assises & Mousses de Riad",
  },
];

const SWATCHES_PREVIEW = [
  {
    id: "lin-naturel",
    name: "Pur Lin d'Atlas Lavé",
    weight: "450 g/m²",
    tone: "Naturel Écru",
    image: "/gallery/linen_fabric_closeup_1791052926029.jpg",
  },
  {
    id: "velours-riad",
    name: "Velours Royal Palais",
    weight: "520 g/m²",
    tone: "Sable Chaud",
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
  },
  {
    id: "outdoor-deperlant",
    name: "Toile Plein Air Déperlante",
    weight: "380 g/m²",
    tone: "Olive & Écru",
    image: "/gallery/matiere-tissus-outdoor-rooftop.jpg",
  },
  {
    id: "jacquard-art",
    name: "Jacquard Tissé d'Honneur",
    weight: "410 g/m²",
    tone: "Ivoire Brodé",
    image: "/gallery/tablecloth_jacquard_1791048717130.jpg",
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Consultation & Nuanciers",
    desc: "Échange sur vos besoins, étude de vos plans et envoi offert de nos nuanciers de matières réelles sous 48h.",
  },
  {
    number: "02",
    title: "Relevé In Situ & Calepinage",
    desc: "Calcul précis des métrages, hauteur sous plafond et vérification des aplombs pour rails et tringles.",
  },
  {
    number: "03",
    title: "Confection en Atelier",
    desc: "Coupe au fil droit, finitions manuelles plombées et contrôles de drapé réalisés à Marrakech par nos maîtres artisans.",
  },
  {
    number: "04",
    title: "Livraison & Pose Soignée",
    desc: "Conditionnement protecteur sur rouleau, expédition express partout au Maroc et assistance technique à l'installation.",
  },
];

import { NavbarRightActions } from "@/components/NavbarRightActions";

export function SavoirFaireClientView() {
  const { addItem, openCart } = useCart();
  const { currency, setCurrency } = useCurrency();
  const [addedSampleId, setAddedSampleId] = useState<string | null>(null);
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

  // Quick Add Sample to Cart & Trigger Drawer
  const handleAddSample = (sampleName: string, id: string, image: string) => {
    addItem({
      id: `sample-craft-${id}`,
      productId: `craft-${id}`,
      variantId: `var-craft-${id}`,
      name: sampleName,
      colorName: "Nuancier Officiel Atelier Kansotex",
      price: 0,
      quantity: 1,
      isFabric: true,
      image: image,
    });

    setAddedSampleId(id);
    setTimeout(() => setAddedSampleId(null), 2500);
    openCart();
  };

  return (
    <div className="min-h-screen bg-cream text-[#1c1b19] font-sans antialiased selection:bg-[#1c1b19] selection:text-white pb-28">
      {/* ============================================================ */}
      {/* FULL SCREEN LUXURY MENU OVERLAY */}
      {/* ============================================================ */}
      <LuxuryMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ============================================================ */}
      {/* 1. FLOATING NAVIGATION BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-[#e9e5dd] py-3.5 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative flex items-center justify-between min-h-[48px]">
          {/* Burger Menu Button */}
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

          {/* Truly Centered Brand Logo */}
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

      {/* Main Container */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 space-y-20 sm:space-y-28">

        {/* ============================================================ */}
        {/* 2. THE HERO CARD WITH BOTTOM NOTCH CUTOUT BUTTON (Signature Kansotex) */}
        {/* ============================================================ */}
        <section className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/10] min-h-[380px] sm:min-h-[460px] mb-8 sm:mb-10 group">
          <div className="absolute inset-0 rounded-[26px] sm:rounded-[36px] overflow-hidden bg-[#24211d] border-t border-x border-[#e8e4db]">
            <Image
              src="/gallery/Kansotex-outdoor-terasse-rooftop.jpg"
              alt="Atelier de Confection et Savoir-Faire Kansotex"
              fill
              priority
              className="object-cover object-center brightness-[0.92] transition-transform duration-1000 group-hover:scale-[1.02]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-black/30" />

            <div className="absolute top-6 left-6 sm:top-9 sm:left-9 z-10">
              <span className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] font-sans tracking-widest uppercase font-medium">
                Marrakech · Atelier &amp; Confection d&apos;Art
              </span>
            </div>
          </div>

          <div className="absolute -bottom-7 sm:-bottom-8 inset-x-0 flex justify-center z-20 pointer-events-none">
            <div className="relative pointer-events-auto bg-cream px-6 sm:px-7 py-3 rounded-[26px] sm:rounded-[30px] flex items-center justify-center">
              <a
                href="#atelier-manifesto"
                className="inline-flex items-center gap-2.5 bg-[#1c1b19] text-[#faf8f5] hover:bg-black px-6 sm:px-8 py-3 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all hover:scale-[1.02]"
              >
                <span>Explorer Notre Savoir-Faire</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. ATELIER MANIFESTO (Airy, Pure Luxury Editorial - No Bento Grid) */}
        {/* ============================================================ */}
        <section id="atelier-manifesto" className="pt-4 sm:pt-6 space-y-8 max-w-4xl">
          <div className="space-y-3">
            <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#1c1b19]/45 block">
              MANUFACTURE KANSOTEX · MARRAKECH
            </span>
            <h1 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#1c1b19] leading-[1.1]">
              L&apos;INTELLIGENCE DU GESTE, LA RIGUEUR DU METRAGE ET LA NOBLESSE DES MATIERES.
            </h1>
          </div>

          <p className="font-sans text-sm sm:text-base text-[#1c1b19]/70 leading-relaxed">
            Chaque rideau, tenture et banquette façonnés chez Kansotex naissent d&apos;une exigence absolue : sélectionner des fibres naturelles d&apos;exception, calepiner au fil droit millimétré, et confier l&apos;assemblage aux mains expertes de nos maîtres artisans au cœur de Marrakech.
          </p>

          {/* Minimalist Benchmarks Row (Clean inline typography, no dashed boxes) */}
          <div className="pt-4 border-t border-[#ded6c8] flex flex-wrap items-center gap-6 sm:gap-12 text-xs font-sans text-[#1c1b19]/70">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1c1b19]" />
              <span className="font-semibold text-[#1c1b19]">15 Ans de Confection d&apos;Art</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1c1b19]" />
              <span className="font-semibold text-[#1c1b19]">Façonné Main à Marrakech</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1c1b19]" />
              <span className="font-semibold text-[#1c1b19]">Tolérance 0 mm &amp; Ourlets Plombés</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1c1b19]" />
              <span className="font-semibold text-[#1c1b19]">Nuanciers Expédiés sous 48h</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. LES 4 GRANDS GESTES D'ATELIER (Magazine-Grade Alternating Spreads) */}
        {/* ============================================================ */}
        <section className="space-y-12 sm:space-y-16 pt-4">
          <div className="pb-4 border-b border-[#ded6c8] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#1c1b19]/45 block mb-1">
                L&apos;ART DE LA HAUTE CONFECTION
              </span>
              <h2 className="font-termina text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] text-[#1c1b19]">
                LES QUATRE GESTES FONDAMENTAUX DE NOTRE ATELIER
              </h2>
            </div>
            <span className="text-xs font-sans text-[#1c1b19]/50 tracking-wider">
              Exigence Artisanale
            </span>
          </div>

          {/* Alternating Architectural Chapters */}
          <div className="space-y-20 sm:space-y-28">
            {CHAPTERS_DATA.map((chapter, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <article
                  key={chapter.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 relative aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-cream-dark border border-[#ded5c5] shadow-xs group ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Image
                      src={chapter.image}
                      alt={chapter.title}
                      fill
                      className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] group-hover:scale-105"
                      sizes="(min-width: 1024px) 50vw, 100vw"
                    />

                    {/* Step badge */}
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#1c1b19]/80 backdrop-blur-md text-white text-[11px] font-sans font-medium">
                      Geste d&apos;Atelier · {chapter.stepNumber}
                    </div>
                  </div>

                  {/* Narrative Column */}
                  <div
                    className={`lg:col-span-6 space-y-6 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="space-y-2.5">
                      <span className="text-xs font-sans uppercase tracking-widest text-[#1c1b19]/45 font-semibold block">
                        {chapter.kicker}
                      </span>
                      <h3 className="font-sans text-2xl sm:text-3xl font-bold text-[#1c1b19] leading-snug">
                        {chapter.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/70 leading-relaxed pt-1">
                        {chapter.description}
                      </p>
                    </div>

                    {/* Poetic quote */}
                    <blockquote className="border-l-2 border-[#1c1b19] pl-4 py-1 text-xs sm:text-sm italic font-sans text-[#1c1b19]/80">
                      &laquo; {chapter.quote} &raquo;
                    </blockquote>

                    {/* Technical Highlights list */}
                    <ul className="space-y-2 text-xs font-sans text-[#1c1b19]/75 pt-1">
                      {chapter.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#1c1b19] shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action button */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        onClick={() => handleAddSample(chapter.sampleName, chapter.id, chapter.image)}
                        className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-all ${
                          addedSampleId === chapter.id
                            ? "bg-[#2e6224] text-white"
                            : "bg-[#1c1b19] text-white hover:bg-black"
                        }`}
                      >
                        {addedSampleId === chapter.id ? "Nuancier ajoute" : "Recevoir ce Nuancier (Offert)"}
                      </button>

                      <Link
                        href="/contact"
                        className="text-xs font-sans font-medium text-[#1c1b19] underline underline-offset-4 hover:opacity-60 transition-opacity"
                      >
                        Consulter l&apos;Atelier
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. MATIEROTHEQUE TACTILE (Visual Swatches Preview) */}
        {/* ============================================================ */}
        <section className="space-y-8 pt-4">
          <div className="pb-4 border-b border-[#ded6c8] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#1c1b19]/45 block mb-1">
                SELECTION DE MATIERES
              </span>
              <h2 className="font-termina text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] text-[#1c1b19]">
                LES TEXTURES NOBLES DU NUANCIER
              </h2>
            </div>
            <span className="text-xs font-sans text-[#1c1b19]/50 tracking-wider">
              Nuanciers Prêts pour Envoi
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SWATCHES_PREVIEW.map((swatch) => (
              <div
                key={swatch.id}
                className="group flex flex-col justify-between space-y-3 bg-[#ebe5d8]/50 p-4 rounded-2xl border border-[#ded5c5] hover:border-[#1c1b19]/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-cream-dark">
                    <Image
                      src={swatch.image}
                      alt={swatch.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-sans">
                      {swatch.weight}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-sans text-sm font-semibold text-[#1c1b19]">
                      {swatch.name}
                    </h3>
                    <p className="text-xs font-sans text-[#1c1b19]/60">
                      {swatch.tone}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddSample(`Nuancier ${swatch.name}`, swatch.id, swatch.image)}
                  className={`w-full py-2 rounded-full text-xs font-sans font-medium transition-all ${
                    addedSampleId === swatch.id
                      ? "bg-[#2e6224] text-white"
                      : "bg-[#1c1b19] text-white hover:bg-black"
                  }`}
                >
                  {addedSampleId === swatch.id ? "Nuancier ajoute" : "Ajouter au Nuancier (Gratuit)"}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. LE PROTOCOLE EN 4 PHASES (Clean, Architectural Track) */}
        {/* ============================================================ */}
        <section className="space-y-8 pt-4">
          <div className="pb-4 border-b border-[#ded6c8] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#1c1b19]/45 block mb-1">
                METHODE ET SUIVI
              </span>
              <h2 className="font-termina text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] text-[#1c1b19]">
                LE DEROULE SUR-MESURE KANSOTEX
              </h2>
            </div>
            <span className="text-xs font-sans text-[#1c1b19]/50 tracking-wider">
              De l&apos;Idée à la Pose
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-[#ebe5d8]/60 rounded-2xl p-6 border border-[#ded5c5] flex flex-col justify-between space-y-4 hover:border-[#1c1b19]/40 transition-colors"
              >
                <div className="space-y-3">
                  <span className="font-sans text-2xl font-bold text-[#1c1b19]/35 block">
                    {step.number}
                  </span>
                  <h3 className="font-sans text-sm sm:text-base font-semibold text-[#1c1b19]">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xs text-[#1c1b19]/65 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. VIP CONCIERGERIE & ATELIER CALL TO ACTION */}
        {/* ============================================================ */}
        <section className="rounded-3xl bg-[#1c1b19] text-[#faf8f5] p-8 sm:p-12 lg:p-14 border border-[#2b2926]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-3.5">
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8cbb6] block">
                BUREAU TECHNIQUE ET ATELIER
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#faf8f5] leading-tight">
                UN PROJET RÉSIDENTIEL OU HÔTELIER SUR-MESURE ?
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#faf8f5]/70 leading-relaxed max-w-2xl">
                Particuliers, décorateurs et gestionnaires de riads : notre équipe d&apos;artisans vous conseille, vérifie vos métrages et vous accompagne jusqu&apos;à la pose finale.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/contact"
                className="w-full text-center px-6 py-3.5 rounded-full bg-white text-[#1c1b19] font-sans font-semibold text-xs tracking-wider uppercase hover:bg-[#e8e2d5] transition-colors"
              >
                Demander une Étude Atelier
              </Link>
              <a
                href="https://wa.me/212661090950"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center px-6 py-3.5 rounded-full bg-white/10 border border-white/20 text-[#faf8f5] font-sans font-medium text-xs tracking-wider uppercase hover:bg-white/20 transition-colors"
              >
                Conciergerie WhatsApp Pro
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
