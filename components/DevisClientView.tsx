"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavbarRightActions } from "@/components/NavbarRightActions";
import { LuxuryMenuOverlay } from "@/components/LuxuryMenuOverlay";

const PROFILES_FR = [
  {
    id: "hotel",
    title: "Hôtellerie & Riads",
    subtitle: "Riads de caractère, boutique-hôtels, resorts et restaurants.",
    icon: "🏨",
  },
  {
    id: "architecte",
    title: "Architecte & Décorateur",
    subtitle: "Prescription d'agence, plans d'aménagement et villas clients.",
    icon: "📐",
  },
  {
    id: "particulier",
    title: "Résidentiel Privé",
    subtitle: "Propriétaires de villas, riads privés ou appartements d'exception.",
    icon: "🏡",
  },
  {
    id: "tapissier",
    title: "Tapissier & Promoteur",
    subtitle: "Métrages en rouleaux, confection en série et chantiers d'envergure.",
    icon: "🪡",
  },
];

const PROFILES_EN = [
  {
    id: "hotel",
    title: "Hospitality & Riads",
    subtitle: "Luxury riads, boutique hotels, resorts and fine dining spaces.",
    icon: "🏨",
  },
  {
    id: "architecte",
    title: "Architects & Interior Designers",
    subtitle: "Trade studio sourcing, client moodboards and specifications.",
    icon: "📐",
  },
  {
    id: "particulier",
    title: "Private Residential",
    subtitle: "Luxury villa estates, private residences and penthouses.",
    icon: "🏡",
  },
  {
    id: "tapissier",
    title: "Upholsterers & Developers",
    subtitle: "Bulk fabric rolls, serial tailoring and property developments.",
    icon: "🪡",
  },
];

const SERVICES_FR = [
  { id: "rideaux", label: "Rideaux & Voilages sur-mesure", desc: "Grande hauteur, lin Atlas, occultants phoniques", icon: "🪟" },
  { id: "ameublement", label: "Tissus d'Ameublement & Canapés", desc: "Velours peigné, bouclettes, banquettes beldi", icon: "🛋️" },
  { id: "outdoor", label: "Outdoor & Terrasses / Piscine", desc: "Transats, daybeds Dryfeel®, toiles anti-UV 8/8", icon: "☀️" },
  { id: "lit", label: "Linge de Lit Haute Hôtellerie", desc: "Percale de coton 300+ fils, satin d'Égypte", icon: "🛏️" },
  { id: "bain", label: "Linge de Bain & Spa 600g/m²", desc: "Éponges épaisses, peignoirs, draps de bain", icon: "🛁" },
  { id: "table", label: "Linge de Table & Nappage", desc: "Nappages d'apparat, sets de table et chemins", icon: "🍽️" },
  { id: "confection", label: "Confection Complète & Pose", desc: "Prise de côtes in situ, façon atelier, installation", icon: "✂️" },
];

const SERVICES_EN = [
  { id: "rideaux", label: "Bespoke Curtains & Sheers", desc: "Double height, Atlas linen, blackout drapes", icon: "🪟" },
  { id: "ameublement", label: "Indoor Upholstery Fabrics", desc: "Combed velvet, bouclés, bespoke sofas & banquettes", icon: "🛋️" },
  { id: "outdoor", label: "Outdoor, Terraces & Pool", desc: "Daybeds, Dryfeel® foam, UV 8/8 water-repellent fabrics", icon: "☀️" },
  { id: "lit", label: "Luxury Hospitality Bedding", desc: "300+ thread count cotton percale, Egyptian sateen", icon: "🛏️" },
  { id: "bain", label: "600gsm Bath Linen & Spa", desc: "Plush bath towels, combed robes, pool towels", icon: "🛁" },
  { id: "table", label: "Table Linen & Banquet Cloths", desc: "Bespoke tablecloths, luxury napkins, table runners", icon: "🍽️" },
  { id: "confection", label: "Full Atelier Tailoring & Fitting", desc: "On-site measurements, hand-crafting, seamless installation", icon: "✂️" },
];

const METERAGE_OPTIONS_FR = [
  { id: "petit", label: "< 25 mètres", sub: "Chambre / Salon ponctuel" },
  { id: "moyen", label: "25 à 75 mètres", sub: "Villa ou Riad moyen" },
  { id: "grand", label: "75 à 200 mètres", sub: "Grand Riad / Établissement" },
  { id: "rouleaux", label: "+ 200 mètres", sub: "Gros œuvre / Rouleaux complets" },
  { id: "aide", label: "À déterminer", sub: "Conseil métrage souhaité" },
];

const METERAGE_OPTIONS_EN = [
  { id: "petit", label: "< 25 meters", sub: "Single room / Living space" },
  { id: "moyen", label: "25 to 75 meters", sub: "Complete villa / Medium riad" },
  { id: "grand", label: "75 to 200 meters", sub: "Large riad / Boutique hotel" },
  { id: "rouleaux", label: "200+ meters", sub: "Full bolts / Wholesale rolls" },
  { id: "aide", label: "To be determined", sub: "Need yardage calculation assistance" },
];

const TIMELINE_OPTIONS_FR = [
  { id: "urgent", label: "Urgent (< 2 semaines)" },
  { id: "1mois", label: "Sous 1 mois" },
  { id: "2-3mois", label: "2 à 3 mois" },
  { id: "etude", label: "Phase d'étude / Projet à venir" },
];

const TIMELINE_OPTIONS_EN = [
  { id: "urgent", label: "Urgent (< 2 weeks)" },
  { id: "1mois", label: "Within 1 month" },
  { id: "2-3mois", label: "2 to 3 months" },
  { id: "etude", label: "Design phase / Future timeline" },
];

export function DevisClientView() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const locale = isEn ? "en" : "fr";
  const [menuOpen, setMenuOpen] = useState(false);

  const profiles = isEn ? PROFILES_EN : PROFILES_FR;
  const servicesList = isEn ? SERVICES_EN : SERVICES_FR;
  const meterageOptions = isEn ? METERAGE_OPTIONS_EN : METERAGE_OPTIONS_FR;
  const timelineOptions = isEn ? TIMELINE_OPTIONS_EN : TIMELINE_OPTIONS_FR;

  // Form State
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<string>("hotel");
  const [selectedServices, setSelectedServices] = useState<string[]>(["rideaux", "ameublement"]);
  const [selectedMeterage, setSelectedMeterage] = useState<string>("25 à 75 mètres");
  const [selectedTimeline, setSelectedTimeline] = useState<string>("Sous 1 mois");
  const [wantsSamples, setWantsSamples] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    city: "Marrakech",
    message: "",
  });

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

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const activeProfileObj = profiles.find((p) => p.id === selectedProfile);
      const chosenServiceLabels = servicesList
        .filter((s) => selectedServices.includes(s.id))
        .map((s) => s.label);

      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          clientProfile: activeProfileObj?.title || selectedProfile,
          services: chosenServiceLabels,
          meterage: selectedMeterage,
          timeline: selectedTimeline,
          samples: wantsSamples
            ? isEn
              ? "Yes, customer requests physical fabric swatches"
              : "Oui, demande de nuanciers physiques d'étoffes"
            : isEn
            ? "No, formal quote first"
            : "Non, devis chiffré d'abord",
          city: formData.city,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSent(true);
        window.scrollTo({ top: 300, behavior: "smooth" });
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || (isEn ? "An error occurred while sending your quote request." : "Erreur lors de l'envoi de votre demande de devis."));
      }
    } catch {
      alert(isEn ? "Connection error. Please check your network." : "Erreur de connexion. Veuillez vérifier votre réseau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-[#1c1b19] font-sans antialiased selection:bg-[#1c1b19] selection:text-white pb-28">
      {/* LUXURY SLIDE-IN MENU OVERLAY */}
      <LuxuryMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* FLOATING HEADER */}
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

          {/* Center Brand Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <Link href={`/${locale}`} aria-label="Kansotex" className="pointer-events-auto shrink-0 flex items-center justify-center">
              <Image
                src="/KANSOTEX-marque-Black.png"
                alt="Kansotex"
                width={500}
                height={120}
                className="w-[140px] sm:w-[160px] md:w-[175px] h-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center z-10">
            <NavbarRightActions />
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1200px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-14 space-y-12 sm:space-y-16">
        
        {/* HERO SECTION */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1b19]/5 border border-[#1c1b19]/10 text-[#1c1b19]/70 text-[10px] font-sans uppercase tracking-[0.25em] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
            {isEn ? "BUREAU D'ÉTUDES & MANUFACTURE" : "BUREAU D'ÉTUDES & MANUFACTURE TEXTILE"}
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#1c1b19] leading-tight">
            {isEn ? "REQUEST A BESPOKE QUOTE" : "DEMANDE DE DEVIS SUR-MESURE"}
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base text-[#1c1b19]/70 leading-relaxed font-light">
            {isEn
              ? "Detailed pricing, fabric yardage calculation, and swatch dispatch for luxury riads, hospitality projects, interior architects, and private villas. Direct workshop support within 24 business hours."
              : "Chiffrage précis, préconisations de métrages et envoi de nuanciers pour vos projets hôteliers, résidences privées, riads et chantiers de décoration. Réponse personnalisée de notre atelier de Marrakech sous 24h ouvrées."}
          </p>
        </section>

        {/* TRUST BADGES ROW */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-[#ebe5d8]/45 border border-[#ded5c5]">
          <div className="flex items-center gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <p className="text-xs font-semibold text-[#1c1b19]">{isEn ? "24h Response" : "Réponse sous 24h"}</p>
              <p className="text-[10.5px] text-[#1c1b19]/60">{isEn ? "Fast technical study" : "Chiffrage précis & clair"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl">📐</span>
            <div>
              <p className="text-xs font-semibold text-[#1c1b19]">{isEn ? "Yardage Calculation" : "Calepinage & Métrage"}</p>
              <p className="text-[10.5px] text-[#1c1b19]/60">{isEn ? "Optimized cuts & hems" : "Optimisation des laizes"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl">🎨</span>
            <div>
              <p className="text-xs font-semibold text-[#1c1b19]">{isEn ? "Swatch Kits" : "Nuanciers Physiques"}</p>
              <p className="text-[10.5px] text-[#1c1b19]/60">{isEn ? "Shipped to your studio" : "Expédiés à votre adresse"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl">🏭</span>
            <div>
              <p className="text-xs font-semibold text-[#1c1b19]">{isEn ? "Direct Atelier" : "Manufacture Directe"}</p>
              <p className="text-[10.5px] text-[#1c1b19]/60">{isEn ? "Marrakech Al Massar" : "Sans intermédiaire"}</p>
            </div>
          </div>
        </section>

        {/* QUOTE FORM OR SUCCESS SCREEN */}
        {sent ? (
          <section className="p-8 sm:p-14 rounded-3xl bg-[#ebe5d8]/70 border border-[#ded5c5] space-y-6 text-center max-w-3xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#1c1b19] text-[#d4af37] text-2xl flex items-center justify-center mx-auto shadow-md">
              ✓
            </div>

            <div className="space-y-2">
              <h2 className="font-sans text-2xl sm:text-3xl font-bold text-[#1c1b19]">
                {isEn ? "Your quote request has been received." : "Votre demande de devis a bien été transmise."}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/75 max-w-xl mx-auto leading-relaxed">
                {isEn
                  ? "Our master craftsmen and technical estimators are reviewing your specifications. We will send you a detailed estimation with fabric references within 24 business hours."
                  : "Notre bureau technique et nos maîtres tapissiers étudient vos éléments. Une proposition chiffrée avec recommandations de matières vous parviendra sous 24h ouvrées."}
              </p>
            </div>

            {/* Direct WhatsApp Follow-up */}
            <div className="p-5 rounded-2xl bg-white/70 border border-[#ded5c5] max-w-md mx-auto space-y-3">
              <p className="text-xs font-medium text-[#1c1b19]">
                {isEn ? "Do you have architectural plans (DWG/PDF) or on-site photos?" : "Vous disposez de plans d'architecte ou de photos in situ ?"}
              </p>
              <a
                href="https://wa.me/212661090950?text=Bonjour%20Kansotex%2C%20je%20viens%20de%20d%C3%A9poser%20une%20demande%20de%20devis%20sur%20le%20site%20pour%20mon%20projet."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[#1c1b19] text-[#faf8f5] hover:bg-black text-xs font-medium transition-all shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span>{isEn ? "Send Plans on WhatsApp (+212 6 61 09 09 50)" : "Transférer les plans sur WhatsApp Pro"}</span>
              </a>
            </div>

            <button
              type="button"
              onClick={() => {
                setSent(false);
                setFormData({
                  name: "",
                  company: "",
                  email: "",
                  phone: "",
                  city: "Marrakech",
                  message: "",
                });
              }}
              className="text-xs font-sans underline underline-offset-4 text-[#1c1b19]/70 hover:text-[#1c1b19] pt-4"
            >
              {isEn ? "Submit another project quotation" : "Déposer une autre demande de devis"}
            </button>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-12">
            
            {/* STEP 1: CLIENT PROFILE */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#ded6c8] pb-3">
                <span className="font-termina text-xs font-bold text-[#d4af37]">01</span>
                <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-[#1c1b19]">
                  {isEn ? "YOUR PROFILE & PROJECT TYPOLOGY" : "VOTRE PROFIL & TYPOLOGIE DE PROJET"}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {profiles.map((p) => {
                  const isSelected = selectedProfile === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedProfile(p.id)}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[110px] ${
                        isSelected
                          ? "bg-[#1c1b19] text-[#faf8f5] border-[#1c1b19] shadow-md scale-[1.01]"
                          : "bg-white/60 text-[#1c1b19] border-[#ded5c5] hover:bg-white hover:border-[#1c1b19]/40"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-2xl">{p.icon}</span>
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center text-[9px] ${
                            isSelected
                              ? "border-[#d4af37] bg-[#d4af37] text-[#1c1b19] font-bold"
                              : "border-[#1c1b19]/30"
                          }`}
                        >
                          {isSelected ? "✓" : ""}
                        </span>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs sm:text-sm font-bold tracking-tight">{p.title}</p>
                        <p className={`text-[10.5px] mt-0.5 line-clamp-2 ${isSelected ? "text-white/70" : "text-[#1c1b19]/60"}`}>
                          {p.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 2: SERVICES & FABRIC UNIVERSES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#ded6c8] pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-termina text-xs font-bold text-[#d4af37]">02</span>
                  <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-[#1c1b19]">
                    {isEn ? "SELECT FABRICS & BESPOKE SERVICES" : "PRESTATIONS & ÉTOFFES RECHERCHÉES"}
                  </h3>
                </div>
                <span className="text-[11px] font-sans text-[#1c1b19]/50 hidden sm:inline">
                  {isEn ? "Multiple selections allowed" : "Plusieurs choix possibles"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {servicesList.map((service) => {
                  const isChecked = selectedServices.includes(service.id);
                  return (
                    <div
                      key={service.id}
                      onClick={() => toggleService(service.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                        isChecked
                          ? "bg-white border-[#1c1b19] shadow-xs"
                          : "bg-white/40 border-[#ded5c5] hover:bg-white hover:border-[#1c1b19]/30"
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{service.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-xs sm:text-sm font-bold text-[#1c1b19]">{service.label}</p>
                          <div
                            className={`w-4 h-4 rounded shrink-0 border flex items-center justify-center text-[10px] ${
                              isChecked
                                ? "bg-[#1c1b19] border-[#1c1b19] text-white"
                                : "border-[#1c1b19]/30"
                            }`}
                          >
                            {isChecked ? "✓" : ""}
                          </div>
                        </div>
                        <p className="text-[10.5px] text-[#1c1b19]/60 mt-0.5">{service.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: METERAGE, TIMELINE & SAMPLES */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#ded6c8] pb-3">
                <span className="font-termina text-xs font-bold text-[#d4af37]">03</span>
                <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-[#1c1b19]">
                  {isEn ? "PROJECT SCALE, TIMELINE & SAMPLES" : "ENVERGURE DU CHANTIER & CALENDRIER"}
                </h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Meterage Selection */}
                <div className="lg:col-span-6 space-y-2">
                  <span className="text-[11px] font-sans uppercase tracking-widest text-[#1c1b19]/55 font-semibold block">
                    {isEn ? "Estimated Yardage Volume" : "Volume de Métrage Estimé"}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {meterageOptions.map((opt) => {
                      const isSel = selectedMeterage === opt.label;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedMeterage(opt.label)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSel
                              ? "bg-[#1c1b19] text-[#faf8f5] border-[#1c1b19]"
                              : "bg-white/60 text-[#1c1b19] border-[#ded5c5] hover:bg-white"
                          }`}
                        >
                          <p className="text-xs font-bold">{opt.label}</p>
                          <p className={`text-[10px] ${isSel ? "text-white/70" : "text-[#1c1b19]/60"}`}>{opt.sub}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Timeline & Swatch Request */}
                <div className="lg:col-span-6 space-y-4">
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-widest text-[#1c1b19]/55 font-semibold block mb-2">
                      {isEn ? "Desired Timeline / Delivery" : "Échéance Souhaitée de Livraison"}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {timelineOptions.map((opt) => {
                        const isSel = selectedTimeline === opt.label;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setSelectedTimeline(opt.label)}
                            className={`p-3 rounded-xl border text-center text-xs font-medium transition-all ${
                              isSel
                                ? "bg-[#1c1b19] text-[#faf8f5] border-[#1c1b19]"
                                : "bg-white/60 text-[#1c1b19] border-[#ded5c5] hover:bg-white"
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Swatches Checkbox */}
                  <div
                    onClick={() => setWantsSamples(!wantsSamples)}
                    className="p-3.5 rounded-2xl bg-white/70 border border-[#ded5c5] flex items-center justify-between cursor-pointer hover:bg-white transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">📦</span>
                      <div>
                        <p className="text-xs font-bold text-[#1c1b19]">
                          {isEn ? "Request Physical Sample Swatches" : "Demander l'envoi d'échantillons physiques"}
                        </p>
                        <p className="text-[10.5px] text-[#1c1b19]/60">
                          {isEn ? "Shipped express directly to your studio or address" : "Expédiés sous 48h à votre agence ou domicile"}
                        </p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center text-xs ${
                        wantsSamples ? "bg-[#d4af37] border-[#d4af37] text-[#1c1b19] font-bold" : "border-[#1c1b19]/30"
                      }`}
                    >
                      {wantsSamples ? "✓" : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 4: CONTACT & PROJECT SPECIFICATIONS */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-[#ded6c8] pb-3">
                <span className="font-termina text-xs font-bold text-[#d4af37]">04</span>
                <h3 className="font-sans text-sm sm:text-base font-bold uppercase tracking-wider text-[#1c1b19]">
                  {isEn ? "CONTACT DETAILS & PROJECT SPECIFICATIONS" : "VOS COORDONNÉES & CAHIER DES CHARGES"}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <label className="block space-y-1.5">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-semibold block">
                    {isEn ? "Full Name *" : "Nom & Prénom *"}
                  </span>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isEn ? "e.g. Jean Dupont" : "ex. Sarah Benjelloun"}
                    className="w-full bg-white/80 border border-[#ded5c5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans text-[#1c1b19] outline-none focus:border-[#1c1b19] transition-colors"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-semibold block">
                    {isEn ? "Company / Studio Name" : "Société / Agence / Riad"}
                  </span>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder={isEn ? "e.g. Studio Marrakech Architecture" : "ex. Riad Dar Al Ouloum / Studio Design"}
                    className="w-full bg-white/80 border border-[#ded5c5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans text-[#1c1b19] outline-none focus:border-[#1c1b19] transition-colors"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-semibold block">
                    {isEn ? "Email Address *" : "Adresse Email *"}
                  </span>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="contact@agence.com"
                    className="w-full bg-white/80 border border-[#ded5c5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans text-[#1c1b19] outline-none focus:border-[#1c1b19] transition-colors"
                  />
                </label>

                <label className="block space-y-1.5">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-semibold block">
                    {isEn ? "Phone / WhatsApp *" : "Téléphone / WhatsApp *"}
                  </span>
                  <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+212 6..."
                    className="w-full bg-white/80 border border-[#ded5c5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans text-[#1c1b19] outline-none focus:border-[#1c1b19] transition-colors"
                  />
                </label>

                <label className="block space-y-1.5 sm:col-span-2">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-semibold block">
                    {isEn ? "Project City / Region" : "Ville & Pays du Chantier"}
                  </span>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Marrakech, Casablanca, Rabat, Tanger, Paris, International..."
                    className="w-full bg-white/80 border border-[#ded5c5] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans text-[#1c1b19] outline-none focus:border-[#1c1b19] transition-colors"
                  />
                </label>
              </div>

              {/* Message / Specifications */}
              <label className="block space-y-1.5 pt-2">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-semibold block">
                  {isEn ? "Project Description & Specific Notes" : "Description du Projet & Spécifications Techniques"}
                </span>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={
                    isEn
                      ? "Specify dimensions (e.g. ceiling heights 4.2m), color palette, sun exposure (UV requirements), specific textures seen on site..."
                      : "Précisez vos dimensions (ex: hauteur sous plafond 4,20m, 6 rideaux occultants), coloris privilégiés, contraintes d'ensoleillement outdoor, références de tissus repérées..."
                  }
                  className="w-full resize-none bg-white/80 border border-[#ded5c5] rounded-2xl p-4 text-xs sm:text-sm font-sans text-[#1c1b19] placeholder:text-[#1c1b19]/40 outline-none focus:border-[#1c1b19] transition-colors"
                />
              </label>
            </div>

            {/* DIRECT WHATSAPP PRO CALLOUT */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#ebe5d8]/60 border border-[#ded5c5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#22c55e] shrink-0" />
                <p className="text-xs text-[#1c1b19]/80 font-medium">
                  {isEn
                    ? "Need an immediate technical consult or want to share DWG architectural plans?"
                    : "Besoin d'un échange technique immédiat ou de transmettre vos plans d'architecte DWG/PDF ?"}
                </p>
              </div>
              <a
                href="https://wa.me/212661090950?text=Bonjour%20Kansotex%2C%20je%20souhaite%20un%20devis%20technique%20pour%20mon%20projet%20textile."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1c1b19] text-[#faf8f5] hover:bg-black text-xs font-sans font-medium transition-colors shrink-0"
              >
                <span>{isEn ? "Chat on WhatsApp Pro" : "Contacter le Bureau Technique WhatsApp"}</span>
              </a>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#ded6c8]">
              <button
                type="submit"
                disabled={loading}
                className="px-10 py-4 rounded-full bg-[#1c1b19] text-[#faf8f5] hover:bg-black text-xs font-sans font-bold tracking-widest uppercase transition-all shadow-md hover:scale-[1.01] disabled:opacity-50 text-center"
              >
                {loading
                  ? isEn
                    ? "Calculating & Transmitting..."
                    : "Transmission de votre demande..."
                  : isEn
                  ? "Submit Quote Request →"
                  : "Transmettre ma Demande de Devis →"}
              </button>
              <div className="text-[11px] font-sans text-[#1c1b19]/55">
                <p>✓ {isEn ? "Free & non-binding estimate" : "Devis gratuit et sans engagement"}</p>
                <p>✓ {isEn ? "Direct response within 24 business hours" : "Réponse sous 24h ouvrées par nos maîtres tapissiers"}</p>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
