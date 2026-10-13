"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useCurrency, CurrencyCode } from "@/lib/CurrencyContext";
import { brand } from "@/lib/content";
import { NavbarRightActions } from "@/components/NavbarRightActions";
import { LuxuryMenuOverlay } from "@/components/LuxuryMenuOverlay";

interface LegalTabProps {
  initialTab?: "mentions" | "confidentialite" | "cgv";
}

export function MentionsLegalesClientView({ initialTab = "mentions" }: LegalTabProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"mentions" | "confidentialite" | "cgv">(initialTab);

  // Lock body scroll when menu is opened
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

          {/* Centered Brand Logo */}
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

      {/* ============================================================ */}
      {/* 2. HERO EDITORIAL BANNER */}
      {/* ============================================================ */}
      <section className="pt-12 sm:pt-16 pb-10 border-b border-[#e9e5dd] bg-[#faf7f2]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#1c1b19]/50 mb-6">
            <Link href="/" className="hover:text-[#1c1b19] transition-colors">ACCUEIL</Link>
            <span>/</span>
            <span className="text-[#1c1b19]">CADRE JURIDIQUE</span>
          </div>

          <div className="max-w-4xl">
            <span className="inline-block text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#a49a8d] mb-3">
              TRANSPARENCE INSTITUTIONNELLE
            </span>
            <h1 className="font-termina text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#1c1b19] leading-tight">
              MENTIONS LEGALES
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[#1c1b19]/70 font-light leading-relaxed max-w-2xl">
              Informations légales, coordonnées officielles et cadre réglementaire régissant l&apos;activité de la société {brand.legalName}, exploitante de la marque {brand.name}.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-10 flex flex-wrap gap-2 border-b border-[#e2ddd3] pb-px">
            <button
              type="button"
              onClick={() => setActiveTab("mentions")}
              className={`font-termina text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-3 border-b-2 transition-all ${
                activeTab === "mentions"
                  ? "border-[#1c1b19] text-[#1c1b19] bg-white/60"
                  : "border-transparent text-[#1c1b19]/50 hover:text-[#1c1b19]"
              }`}
            >
              MENTIONS LEGALES
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("confidentialite")}
              className={`font-termina text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-3 border-b-2 transition-all ${
                activeTab === "confidentialite"
                  ? "border-[#1c1b19] text-[#1c1b19] bg-white/60"
                  : "border-transparent text-[#1c1b19]/50 hover:text-[#1c1b19]"
              }`}
            >
              CONFIDENTIALITE &amp; DONNEES
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("cgv")}
              className={`font-termina text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] px-4 py-3 border-b-2 transition-all ${
                activeTab === "cgv"
                  ? "border-[#1c1b19] text-[#1c1b19] bg-white/60"
                  : "border-transparent text-[#1c1b19]/50 hover:text-[#1c1b19]"
              }`}
            >
              CONDITIONS GENERALES
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. TAB CONTENT */}
      {/* ============================================================ */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-12 sm:pt-16">
        {activeTab === "mentions" && (
          <div className="space-y-12">
            {/* Top Summary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e9e5dd] shadow-xs">
                <span className="font-termina text-[10px] font-bold uppercase tracking-[0.2em] text-[#a49a8d] block mb-2">
                  SOCIETE EDITRICE
                </span>
                <h2 className="text-xl font-serif text-[#1c1b19] font-medium">{brand.legalName}</h2>
                <p className="mt-2 text-xs text-[#1c1b19]/70 leading-relaxed">
                  {brand.legalForm} au capital social de {brand.capital}, fondée en {brand.establishedYear} à Marrakech.
                </p>
                <div className="mt-4 pt-4 border-t border-[#f2eee6] text-[11px] text-[#1c1b19]/60">
                  Marque déposée : <strong className="text-[#1c1b19]">{brand.name}</strong>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e9e5dd] shadow-xs">
                <span className="font-termina text-[10px] font-bold uppercase tracking-[0.2em] text-[#a49a8d] block mb-2">
                  SIEGE STATUTAIRE
                </span>
                <h2 className="text-xl font-serif text-[#1c1b19] font-medium">Marrakech-Medina</h2>
                <p className="mt-2 text-xs text-[#1c1b19]/70 leading-relaxed">
                  {brand.registeredAddress}, Marrakech, Maroc.
                </p>
                <div className="mt-4 pt-4 border-t border-[#f2eee6] text-[11px] text-[#1c1b19]/60">
                  Juridiction : <strong className="text-[#1c1b19]">Tribunal de Commerce de Marrakech</strong>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e9e5dd] shadow-xs">
                <span className="font-termina text-[10px] font-bold uppercase tracking-[0.2em] text-[#a49a8d] block mb-2">
                  SHOWROOM &amp; ATELIER
                </span>
                <h2 className="text-xl font-serif text-[#1c1b19] font-medium">Al Massar</h2>
                <p className="mt-2 text-xs text-[#1c1b19]/70 leading-relaxed">
                  {brand.address}
                </p>
                <div className="mt-4 pt-4 border-t border-[#f2eee6] text-[11px] text-[#1c1b19]/60">
                  Accueil Showroom : <strong className="text-[#1c1b19]">Sur rendez-vous</strong>
                </div>
              </div>
            </div>

            {/* Detailed Articles */}
            <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e9e5dd] shadow-xs space-y-10">
              {/* Article 1 */}
              <div>
                <h3 className="font-termina text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#1c1b19] pb-3 border-b border-[#e9e5dd]">
                  ARTICLE 1. IDENTIFICATION LEGALE DE L ENTREPRISE
                </h3>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-xs sm:text-sm text-[#1c1b19]/80 leading-relaxed">
                  <div>
                    <span className="font-medium text-[#1c1b19]">Raison Sociale :</span> {brand.legalName}
                  </div>
                  <div>
                    <span className="font-medium text-[#1c1b19]">Enseigne &amp; Marque :</span> {brand.name}
                  </div>
                  <div>
                    <span className="font-medium text-[#1c1b19]">Forme Juridique :</span> {brand.legalForm}
                  </div>
                  <div>
                    <span className="font-medium text-[#1c1b19]">Capital Social :</span> {brand.capital}
                  </div>
                  <div>
                    <span className="font-medium text-[#1c1b19]">Date de Création :</span> Établie en {brand.establishedYear}
                  </div>
                  <div>
                    <span className="font-medium text-[#1c1b19]">Activité Déclarée :</span> {brand.activity}
                  </div>
                  <div>
                    <span className="font-medium text-[#1c1b19]">Siège Social :</span> {brand.registeredAddress}, Marrakech, Maroc
                  </div>
                  <div>
                    <span className="font-medium text-[#1c1b19]">Atelier &amp; Expéditions :</span> {brand.address}
                  </div>
                </div>
              </div>

              {/* Article 2 */}
              <div>
                <h3 className="font-termina text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#1c1b19] pb-3 border-b border-[#e9e5dd]">
                  ARTICLE 2. TOUCHPOINTS &amp; CONTACTS OFFICIELS
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-[#1c1b19]/80 leading-relaxed">
                  Pour toute correspondance, demande institutionnelle ou réclamation technique, nos services sont joignables directement aux coordonnées vérifiées ci-dessous :
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#faf8f5] p-4 rounded-xl border border-[#ece7de]">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#a49a8d] block mb-1">
                      RENSEIGNEMENTS GENERAUX
                    </span>
                    <a href={`tel:${brand.phoneGenerale.replace(/\s/g, "")}`} className="font-medium text-xs sm:text-sm text-[#1c1b19] hover:underline">
                      {brand.phoneGenerale}
                    </a>
                    <span className="text-[11px] text-[#1c1b19]/50 block mt-1">Lundi au Vendredi · 08h30 - 18h30</span>
                  </div>

                  <div className="bg-[#faf8f5] p-4 rounded-xl border border-[#ece7de]">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#a49a8d] block mb-1">
                      BUREAU TECHNIQUE &amp; PROS
                    </span>
                    <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-xs sm:text-sm text-[#1c1b19] hover:underline">
                      {brand.phonePro}
                    </a>
                    <span className="text-[11px] text-[#1c1b19]/50 block mt-1">WhatsApp Concierge Dédié</span>
                  </div>

                  <div className="bg-[#faf8f5] p-4 rounded-xl border border-[#ece7de]">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#a49a8d] block mb-1">
                      MANUFACTURE &amp; EQUIPE
                    </span>
                    <a href={`tel:${brand.phoneManufacture.replace(/\s/g, "")}`} className="font-medium text-xs sm:text-sm text-[#1c1b19] hover:underline">
                      {brand.phoneManufacture}
                    </a>
                    <span className="text-[11px] text-[#1c1b19]/50 block mt-1">Ligne Directe Ateliers</span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#1c1b19]/70">
                  <p>Courriel Conciergerie : <a href={`mailto:${brand.email}`} className="font-medium text-[#1c1b19] underline">{brand.email}</a></p>
                  <p>Courriel Architectes &amp; Pros : <a href={`mailto:${brand.emailPro}`} className="font-medium text-[#1c1b19] underline">{brand.emailPro}</a></p>
                </div>
              </div>

              {/* Article 3 */}
              <div>
                <h3 className="font-termina text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#1c1b19] pb-3 border-b border-[#e9e5dd]">
                  ARTICLE 3. PROPRIETE INTELLECTUELLE
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-[#1c1b19]/80 leading-relaxed">
                  L&apos;ensemble des éléments constituant le site kansotex.com (notamment les marques verbales et semi-figuratives, logotypes, photographies de chantiers, représentations d&apos;étoffes, textures, documents techniques, chartes chromatiques et lignes éditoriales) sont la propriété exclusive et intégrale de <strong className="text-[#1c1b19]">{brand.legalName}</strong>.
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[#1c1b19]/80 leading-relaxed">
                  Toute reproduction, imitation, extraction ou exploitation, intégrale ou partielle, sur quelque support que ce soit, sans accord formel, écrit et préalable de la direction de Kansotex constitue une contrefaçon passible des poursuites prévues par le Code de la propriété industrielle et commerciale du Royaume du Maroc.
                </p>
              </div>

              {/* Article 4 */}
              <div>
                <h3 className="font-termina text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#1c1b19] pb-3 border-b border-[#e9e5dd]">
                  ARTICLE 4. HEBERGEMENT &amp; INFRASTRUCTURE NUMERIQUE
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-[#1c1b19]/80 leading-relaxed">
                  Le présent site est déployé sur une architecture de haute disponibilité avec chiffrement intégral des données en transit par certificat SSL/TLS 256 bits. Les données de navigation et transactions sont hébergées selon les normes de cybersécurité les plus rigoureuses.
                </p>
              </div>

              {/* Article 5 */}
              <div>
                <h3 className="font-termina text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#1c1b19] pb-3 border-b border-[#e9e5dd]">
                  ARTICLE 5. DROIT APPLICABLE ET JURIDICTION
                </h3>
                <p className="mt-4 text-xs sm:text-sm text-[#1c1b19]/80 leading-relaxed">
                  Les présentes mentions légales sont soumises à la législation en vigueur dans le Royaume du Maroc. En cas de litige relatif à l&apos;interprétation, l&apos;exécution ou la validité des présentes, et à défaut d&apos;accord amiable, compétence expresse est attribuée aux tribunaux compétents du ressort du siège de <strong className="text-[#1c1b19]">{brand.legalName}</strong> à Marrakech.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "confidentialite" && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e9e5dd] shadow-xs space-y-8">
            <div>
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.2em] text-[#a49a8d] block mb-2">
                PROTECTION DE LA VIE PRIVEE
              </span>
              <h2 className="font-termina text-lg sm:text-xl font-bold uppercase tracking-tight text-[#1c1b19]">
                POLITIQUE DE CONFIDENTIALITE ET TRAITEMENT DES DONNEES
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#1c1b19]/70 leading-relaxed">
                Conformément à la Loi n° 09-08 promulguée par le Dahir n° 1-09-15 relative à la protection des personnes physiques à l&apos;égard du traitement des données à caractère personnel, {brand.legalName} s&apos;engage à protéger avec la plus haute rigueur la confidentialité des données de ses clients et partenaires.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-[#f2eee6] text-xs sm:text-sm text-[#1c1b19]/80 leading-relaxed">
              <div>
                <h3 className="font-semibold text-[#1c1b19] mb-1">1. Finalité de la collecte des données</h3>
                <p>
                  Les données transmises lors d&apos;une commande, d&apos;une demande d&apos;échantillons ou d&apos;une inscription à l&apos;Espace Pro (nom, prénom, coordonnées téléphoniques, adresse de livraison, identifiants professionnels) sont strictement réservées au traitement de votre commande, à la personnalisation du service d&apos;atelier et à l&apos;acheminement logistique par nos transporteurs partenaires.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1c1b19] mb-1">2. Sécurité et non-cession</h3>
                <p>
                  {brand.legalName} s&apos;interdit formellement de céder, louer ou commercialiser vos informations personnelles auprès d&apos;entités tierces à des fins publicitaires. Toutes les communications relatives aux projets d&apos;ameublement proviennent exclusivement des ateliers Kansotex.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1c1b19] mb-1">3. Droits d&apos;accès, de rectification et d&apos;opposition</h3>
                <p>
                  Vous bénéficiez d&apos;un droit d&apos;accès, de modification, de portabilité et de suppression définitive de vos données enregistrées. Pour exercer ce droit, il vous suffit de notifier notre délégué à la protection des données par courriel à <a href={`mailto:${brand.email}`} className="font-medium text-[#1c1b19] underline">{brand.email}</a> ou par courrier adressé à notre atelier de Marrakech : {brand.address}.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cgv" && (
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#e9e5dd] shadow-xs space-y-8">
            <div>
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.2em] text-[#a49a8d] block mb-2">
                CONDITIONS COMMERCIALES
              </span>
              <h2 className="font-termina text-lg sm:text-xl font-bold uppercase tracking-tight text-[#1c1b19]">
                CONDITIONS GENERALES DE VENTE ET DE CONFECTION
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#1c1b19]/70 leading-relaxed">
                Régissant les commandes de tissus au mètre, échantillons et réalisations confectionnées sur-mesure au sein des ateliers de {brand.legalName}.
              </p>
            </div>

            <div className="space-y-6 pt-4 border-t border-[#f2eee6] text-xs sm:text-sm text-[#1c1b19]/80 leading-relaxed">
              <div>
                <h3 className="font-semibold text-[#1c1b19] mb-1">1. Produits et Étoffes au Mètre</h3>
                <p>
                  Les matières nobles proposées par Kansotex (lin lavé, velours d&apos;éditeurs, toiles outdoor traitées déperlantes) sont vendues au mètre linéaire ou sous forme de confections personnalisées. En raison de la noblesse naturelle des fibres, de légères variations de nuançage d&apos;un bain de teinture à l&apos;autre peuvent survenir, témoignant du caractère authentique de nos étoffes.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1c1b19] mb-1">2. Confection Sur-Mesure et Commandes Personnalisées</h3>
                <p>
                  Les pièces façonnées selon les métrages spécifiques ou les gabarits fournis par le client (rideaux doublés, coussins d&apos;assise déhoussables, banquettes d&apos;extérieur) sont confectionnées artisanalement dans notre manufacture d&apos;Al Massar. Toute commande validée fait l&apos;objet d&apos;un contrôle rigoureux avant emballage et expédition.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1c1b19] mb-1">3. Expédition et Livraison</h3>
                <p>
                  Les expéditions sont opérées avec le plus grand soin depuis notre pôle logistique de Marrakech ({brand.address}). La livraison est offerte sur tout le territoire marocain pour les commandes éligibles. Les délais standards sont de 24h à 72h selon la destination.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[#1c1b19] mb-1">4. Assistance Conciergerie</h3>
                <p>
                  Pour le suivi de votre commande ou une assistance technique lors de la pose, notre bureau technique est à votre écoute au <strong className="text-[#1c1b19]">{brand.phonePro}</strong> ou par courriel à <strong className="text-[#1c1b19]">{brand.email}</strong>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Contact / Concierge Banner */}
        <div className="mt-16 bg-[#1c1b19] rounded-2xl p-8 sm:p-12 text-[#faf8f5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-termina text-[10px] font-bold uppercase tracking-[0.2em] text-[#a49a8d] block mb-2">
              ACCOMPAGNEMENT DEDIE
            </span>
            <h3 className="font-termina text-lg sm:text-xl font-bold uppercase tracking-tight">
              UNE QUESTION SUR NOS MENTIONS OU CONTRATS ?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-white/70 max-w-xl font-light">
              Notre bureau juridique et technique vous répond directement depuis notre manufacture de Marrakech.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={brand.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#1c1b19] hover:bg-[#faf7f2] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center"
            >
              WHATSAPP DIRECT
            </a>
            <Link
              href="/contact"
              className="border border-white/25 hover:border-white text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors inline-flex items-center"
            >
              PAGE CONTACT
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
