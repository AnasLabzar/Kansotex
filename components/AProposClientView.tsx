"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useCurrency, CurrencyCode } from "@/lib/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryMenuOverlay } from "@/components/LuxuryMenuOverlay";

const PILLARS_ABOUT = [
  {
    number: "01",
    title: "La Noblesse des Matières",
    text: "Nous sélectionnons nos fibres à la source : pur lin d'Atlas pré-lavé, velours de coton peigné et toiles plein air traitées pour résister au soleil intense sans jamais perdre leur éclat.",
  },
  {
    number: "02",
    title: "L'Exigence de la Confection",
    text: "Au sein de notre manufacture à Marrakech, chaque rideau et banquette est coupé au fil droit avec ourlets plombés de 10 cm cousus à la main par nos maîtres artisans.",
  },
  {
    number: "03",
    title: "L'Accompagnement Sur-Mesure",
    text: "Du relevé des cotes jusqu'à l'installation in situ, nous conseillons architectes d'intérieur, riads et particuliers pour des réalisations sans compromis.",
  },
];

const VALUES_DATA = [
  {
    kicker: "Héritage & Savoir-Faire",
    title: "Façonné à Marrakech",
    text: "Un atelier ancré au Maroc qui valorise la précision artisanale et le fait main, sans intermédiaire commercial superflu.",
    image: "/gallery/accompagnement-equipe-kansotex.jpg",
  },
  {
    kicker: "Intérieur & Extérieur",
    title: "In & Outdoor d'Exception",
    text: "De la douceur d'une suite parentale à la résistance d'un rooftop exposé aux éléments, notre collection s'adapte à chaque espace de vie.",
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
  },
];

import { NavbarRightActions } from "@/components/NavbarRightActions";

export function AProposClientView() {
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

  return (
    <div className="min-h-screen bg-cream text-[#1c1b19] font-sans antialiased selection:bg-[#1c1b19] selection:text-white pb-24">
      {/* ============================================================ */}
      {/* FULL SCREEN / SLIDE-IN LUXURY MENU OVERLAY */}
      {/* ============================================================ */}
      <LuxuryMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ============================================================ */}
      {/* 1. FLOATING NAVIGATION BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-[#e9e5dd] py-3.5 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative flex items-center justify-between min-h-[48px]">
          {/* Left: Burger Menu Button */}
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
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 space-y-16 sm:space-y-24">

        {/* ============================================================ */}
        {/* 2. THE ARCHITECTURAL HERO CARD (Exact Reference Design) */}
        {/* ============================================================ */}
        <section className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[21/10] min-h-[380px] sm:min-h-[460px] mb-8 sm:mb-12 rounded-[28px] sm:rounded-[38px] overflow-hidden bg-[#24211d] border border-[#e8e4db] group">
          {/* Full Background Image */}
          <Image
            src="/gallery/linge-de-maison-indoor-villa-kansotex.jpg"
            alt="Maison Kansotex Marrakech"
            fill
            priority
            className="object-cover object-center brightness-[0.93] transition-transform duration-1000 group-hover:scale-[1.02]"
            sizes="100vw"
          />
          {/* Ambient Lighting Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/25 pointer-events-none" />

          {/* ---------------------------------------------------------- */}
          {/* TOP-LEFT OVERLAY (Inside the image - Interior Design style) */}
          {/* ---------------------------------------------------------- */}
          <div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10 flex flex-col items-start gap-3 sm:gap-4 pointer-events-none">
            {/* Pill Capsule */}
            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] sm:text-xs font-sans tracking-wide uppercase font-medium shadow-xs">
              Maison d&apos;Art
            </span>

            {/* Subtitle Lines */}
            <div className="space-y-0.5 sm:space-y-1 text-white drop-shadow-sm">
              <p className="text-xs sm:text-sm font-sans text-white/85 font-normal tracking-wide">
                L&apos;Art du Sur-Mesure
              </p>
              <p className="text-sm sm:text-base lg:text-lg font-bold font-sans tracking-wider uppercase text-white">
                DEPUIS PLUS DE 15 ANS
              </p>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* TOP-RIGHT NOTCH CUTOUT (Culture & Nature style) */}
          {/* ---------------------------------------------------------- */}
          <div className="absolute top-0 right-0 z-20 pointer-events-auto">
            <div className="relative bg-cream pt-4 pb-4 pl-6 pr-6 sm:pt-6 sm:pb-6 sm:pl-9 sm:pr-9 rounded-bl-[26px] sm:rounded-bl-[34px]">
              {/* Left Inverted Fillet (connecting to card top edge) */}
              <svg
                className="absolute top-0 -left-[26px] sm:-left-[34px] w-[26px] sm:w-[34px] h-[26px] sm:h-[34px] pointer-events-none"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path d="M36 0 H0 C19.88 0 36 16.12 36 36 V0 Z" fill="#f3eee6" />
              </svg>

              {/* Bottom Inverted Fillet (connecting to card right edge) */}
              <svg
                className="absolute -bottom-[26px] sm:-bottom-[34px] right-0 w-[26px] sm:w-[34px] h-[26px] sm:h-[34px] pointer-events-none"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path d="M36 0 H0 C19.88 0 36 16.12 36 36 V0 Z" fill="#f3eee6" />
              </svg>

              {/* Big Architectural Headline */}
              <div className="text-left select-none">
                <span className="block font-sans text-base sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-[#1c1b19] leading-tight">
                  L&apos;Harmonie du Textile,
                </span>
                <span className="block font-sans text-base sm:text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-[#1c1b19] leading-tight">
                  Culture &amp; Matière.
                </span>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* BOTTOM-LEFT NOTCH CUTOUT (Model NEOXCAU style) */}
          {/* ---------------------------------------------------------- */}
          <div className="absolute bottom-0 left-0 z-20 pointer-events-auto">
            <div className="relative bg-cream pt-3.5 pb-3.5 pl-5 pr-5 sm:pt-4 sm:pb-4 sm:pl-7 sm:pr-7 rounded-tr-[24px] sm:rounded-tr-[32px]">
              {/* Top Inverted Fillet (connecting to card left edge) */}
              <svg
                className="absolute -top-[24px] sm:-top-[32px] left-0 w-[24px] sm:w-[32px] h-[24px] sm:h-[32px] pointer-events-none"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path d="M0 36 V0 C0 19.88 16.12 36 36 36 H0 Z" fill="#f3eee6" />
              </svg>

              {/* Right Inverted Fillet (connecting to card bottom edge) */}
              <svg
                className="absolute bottom-0 -right-[24px] sm:-right-[32px] w-[24px] sm:w-[32px] h-[24px] sm:h-[32px] pointer-events-none"
                viewBox="0 0 36 36"
                fill="none"
              >
                <path d="M0 36 V0 C0 19.88 16.12 36 36 36 H0 Z" fill="#f3eee6" />
              </svg>

              {/* Capsule Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white border border-[#ded5c5] text-[#1c1b19] text-[11px] sm:text-xs font-sans font-medium shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1c1b19]" />
                <span>Maison Kansotex · Marrakech</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. HISTOIRE ET MANIFESTE DE LA MAISON */}
        {/* ============================================================ */}
        <section id="histoire-kansotex" className="pt-2 pb-6 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left Column: Brand Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#1c1b19]/45 block">
                  L&apos;HISTOIRE KANSOTEX
                </span>
                <h1 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#1c1b19] leading-[1.15]">
                  UNE MAISON D&apos;ÉTOFFES DÉDIÉE À L&apos;ART DE VIVRE MAROCAIN ET CONTEMPORAIN.
                </h1>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#1c1b19]/70 leading-relaxed font-sans">
                <p>
                  Kansotex est née d&apos;une passion profonde pour le textile et d&apos;une conviction : l&apos;exigence de la matière transforme un lieu en demeure d&apos;exception. Depuis plus de 15 ans au cœur de Marrakech, nous sélectionnons et confectionnons des étoffes d&apos;art pensées pour sublimer les intérieurs comme les extérieurs.
                </p>
                <p>
                  Notre regard est celui de la précision : le tombé fluide du lin d&apos;Atlas lavé, la profondeur caressante du velours de coton, et la haute ténacité de toiles plein air hydrofuges capables de résister aux étés les plus ensoleillés sans jamais altérer l&apos;éclat de leurs pigments.
                </p>
                <p>
                  Architectes d&apos;intérieur, gestionnaires de riads et particuliers avancent à nos côtés avec la même certitude : une écoute attentive, des métrages calculés au millimètre, des nuanciers réels expédiés sous 48h et un suivi d&apos;atelier jusqu&apos;à l&apos;installation finale.
                </p>
              </div>

              {/* Minimal Benchmarks */}
              <div className="pt-3 border-t border-[#ded6c8] flex flex-wrap items-center gap-6 text-xs font-sans text-[#1c1b19]/70">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1c1b19]" />
                  <span className="font-semibold text-[#1c1b19]">Fondée à Marrakech</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1c1b19]" />
                  <span className="font-semibold text-[#1c1b19]">15 Ans d&apos;Expertise</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1c1b19]" />
                  <span className="font-semibold text-[#1c1b19]">Confection d&apos;Atelier Pro</span>
                </div>
              </div>
            </div>

            {/* Right Column: High Quality Photo */}
            <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-cream-dark border border-[#ded5c5] shadow-xs">
              <Image
                src="/gallery/accompagnement-equipe-kansotex.jpg"
                alt="L'équipe et le conseil Maison Kansotex Marrakech"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/70 block">
                  Conseil &amp; Atelier
                </span>
                <p className="text-xs font-sans font-medium mt-0.5">
                  Un accompagnement dédié de la sélection matière à la pose finale
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. LES TROIS PILIERS DE LA MAISON */}
        {/* ============================================================ */}
        <section className="space-y-8 pt-4">
          <div className="pb-4 border-b border-[#ded6c8] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#1c1b19]/45 block mb-1">
                NOS VALEURS ET ENGAGEMENTS
              </span>
              <h2 className="font-termina text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] text-[#1c1b19]">
                LES TROIS PILIERS DE MAISON KANSOTEX
              </h2>
            </div>
            <span className="text-xs font-sans text-[#1c1b19]/50 tracking-wider">
              Exigence &amp; Durabilité
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {PILLARS_ABOUT.map((item) => (
              <div
                key={item.number}
                className="bg-[#ebe5d8]/60 rounded-2xl p-6 sm:p-7 border border-[#ded5c5] flex flex-col justify-between space-y-4 hover:border-[#1c1b19]/40 transition-colors"
              >
                <div className="space-y-3">
                  <span className="font-sans text-2xl sm:text-3xl font-bold text-[#1c1b19]/35 block">
                    {item.number}
                  </span>
                  <h3 className="font-sans text-base font-semibold text-[#1c1b19]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#1c1b19]/65 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. DUAL EDITORIAL FEATURE CARDS */}
        {/* ============================================================ */}
        <section className="space-y-8 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES_DATA.map((val, idx) => (
              <div
                key={idx}
                className="group flex flex-col space-y-4"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-cream-dark border border-[#ded5c5]">
                  <Image
                    src={val.image}
                    alt={val.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/45 font-medium">
                    {val.kicker}
                  </span>
                  <h3 className="font-sans text-lg font-semibold text-[#1c1b19]">
                    {val.title}
                  </h3>
                  <p className="font-sans text-xs text-[#1c1b19]/65 leading-relaxed">
                    {val.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. ATELIER REASSURANCE RIBBON */}
        {/* ============================================================ */}
        <section className="bg-[#ebe5d8]/70 rounded-2xl p-6 sm:p-9 border border-[#ded5c5]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-[#ded9cf]">
            <div className="sm:px-4 first:pl-0 space-y-1 pt-3 sm:pt-0">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1c1b19]">
                Nuanciers Gratuits sous 48h
              </h4>
              <p className="font-sans text-[11px] text-[#1c1b19]/60 leading-relaxed">
                Recevez directement vos sélections d&apos;étoffes et nuanciers avant confection partout au Maroc et à l&apos;étranger.
              </p>
            </div>

            <div className="sm:px-4 space-y-1 pt-4 sm:pt-0">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1c1b19]">
                Atelier Confection a Marrakech
              </h4>
              <p className="font-sans text-[11px] text-[#1c1b19]/60 leading-relaxed">
                Nos artisans calculent vos métrages précis pour canapés, banquettes de riad et tentures grande hauteur.
              </p>
            </div>

            <div className="sm:px-4 last:pr-0 space-y-1 pt-4 sm:pt-0">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1c1b19]">
                Accompagnement Projets &amp; Riads
              </h4>
              <p className="font-sans text-[11px] text-[#1c1b19]/60 leading-relaxed">
                Un interlocuteur dédié pour coordonner délais, échantillons et livraison directe sur votre chantier.
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. VIP CONCIERGERIE & ATELIER CALL TO ACTION */}
        {/* ============================================================ */}
        <section className="rounded-3xl bg-[#1c1b19] text-[#faf8f5] p-8 sm:p-12 lg:p-14 border border-[#2b2926]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-8 space-y-3.5">
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#d8cbb6] block">
                CONCIERGERIE ATELIER ET CONSEIL
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#faf8f5] leading-tight">
                DONNEZ VIE À VOTRE PROJET TEXTILE AVEC KANSOTEX
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#faf8f5]/70 leading-relaxed max-w-2xl">
                Particuliers, décorateurs et gestionnaires d&apos;établissements hôteliers : notre équipe vous conseille, vérifie vos métrages et vous transmet les nuanciers d&apos;étoffes réelles.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/contact"
                className="w-full text-center px-6 py-3.5 rounded-full bg-white text-[#1c1b19] font-sans font-semibold text-xs tracking-wider uppercase hover:bg-[#e8e2d5] transition-colors"
              >
                Prendre Rendez-Vous
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
