"use client";

import { useState, useEffect, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { NavbarRightActions } from "@/components/NavbarRightActions";
import { LuxuryMenuOverlay } from "@/components/LuxuryMenuOverlay";
import { CaptchaShield } from "@/components/CaptchaShield";

// =============================================================================
// BESPOKE LUXURY ARCHITECTURAL SVG ICONS (NO EMOJIS)
// =============================================================================

function IconHotel({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18" />
      <path d="M5 21V7l7-4 7 4v14" />
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M9 14h.01" />
      <path d="M15 14h.01" />
      <path d="M11 21v-4a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1v4" />
    </svg>
  );
}

function IconArchitect({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <path d="m4.93 19 4.24-10.24" />
      <path d="m14.83 8.76 4.24 10.24" />
      <path d="M7 15h10" />
      <path d="M12 3v2" />
    </svg>
  );
}

function IconVilla({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M10 21v-7a2 2 0 0 1 4 0v7" />
    </svg>
  );
}

function IconTapissier({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="3" />
      <path d="M8.12 8.12 12 12" />
      <path d="M20 4 8.12 15.88" />
      <circle cx="6" cy="18" r="3" />
      <path d="M14.8 14.8 20 20" />
    </svg>
  );
}

function IconCurtains({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h18" />
      <path d="M4 4v16c0-2 1.5-3 2.5-3s2.5 1 2.5 3V4" />
      <path d="M15 4v16c0-2 1.5-3 2.5-3s2.5 1 2.5 3V4" />
      <path d="M9 12c-2 0-3.5 1-4 3" />
      <path d="M15 12c2 0 3.5 1 4 3" />
    </svg>
  );
}

function IconSofa({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 9V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2" />
      <path d="M2 11a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5Z" />
      <path d="M4 18v3" />
      <path d="M20 18v3" />
      <path d="M12 5v4" />
    </svg>
  );
}

function IconOutdoor({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function IconBedding({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v3a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
    </svg>
  );
}

function IconBath({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-2.12 2.12L7 8.24" />
      <path d="M14.5 11.5 18 15a4 4 0 0 1-5.66 5.66L8.5 16.82" />
      <path d="M5 19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  );
}

function IconTableCloth({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h18" />
      <path d="M4 7l2 12h12l2-12" />
      <path d="M12 7v12" />
      <path d="M8 7v6" />
      <path d="M16 7v6" />
    </svg>
  );
}

function IconAtelierConfection({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14 12-8.5 8.5a2.12 2.12 0 0 1-3-3L11 9" />
      <path d="M16 7a3 3 0 1 0 4.24-4.24 3 3 0 0 0-4.24 4.24Z" />
      <path d="m14.5 9.5 2 2" />
      <path d="M18 14v4a2 2 0 0 1-2 2h-4" />
    </svg>
  );
}

function IconUploadDocument({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function IconCheckMark({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconShieldLock({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// =============================================================================
// DATA DICTIONARIES
// =============================================================================

const PROFILES = [
  {
    id: "hotel",
    titleFr: "Hôtellerie, Riads & Restauration",
    titleEn: "Hospitality, Riads & Fine Dining",
    subtitleFr: "Palais d'hôtes, resorts de luxe, boutique-hôtels et restaurants d'exception.",
    subtitleEn: "Luxury riads, boutique resorts, boutique hotels and private dining estates.",
    Icon: IconHotel,
    recommendedMeters: "75 à 200m+",
  },
  {
    id: "architecte",
    titleFr: "Architecte d'Intérieur & Décorateur",
    titleEn: "Interior Architects & Designers",
    subtitleFr: "Prescription d'agence, planches tendance, calepinage et villas clients.",
    subtitleEn: "Trade specifications, client presentations, moodboards and bespoke villas.",
    Icon: IconArchitect,
    recommendedMeters: "50 à 150m",
  },
  {
    id: "particulier",
    titleFr: "Résidence Privée & Particulier",
    titleEn: "Private Residence & Estates",
    subtitleFr: "Propriétaires de villas de prestige, riads privés ou appartements contemporains.",
    subtitleEn: "Owners of prestige villas, private heritage riads or penthouse residences.",
    Icon: IconVilla,
    recommendedMeters: "25 à 75m",
  },
  {
    id: "tapissier",
    titleFr: "Tapissier, Revendeur & Façonnier",
    titleEn: "Upholsterers & Master Artisans",
    subtitleFr: "Commandes de métrages au rouleau, approvisionnement régulier et confection en série.",
    subtitleEn: "Bulk rolls, atelier replenishment, serial tailoring and contract fabrics.",
    Icon: IconTapissier,
    recommendedMeters: "+200m Rouleaux",
  },
];

const FABRIC_SERVICES = [
  {
    id: "rideaux",
    titleFr: "Rideaux & Voilages sur-mesure",
    titleEn: "Bespoke Curtains & Sheers",
    descFr: "Draperies grande hauteur, lin lavé d'Atlas, velours et occultants thermiques.",
    descEn: "High-ceiling drapes, heavy Atlas washed linen, combed velvet and thermal blackouts.",
    Icon: IconCurtains,
  },
  {
    id: "ameublement",
    titleFr: "Tissus d'Ameublement & Canapés",
    titleEn: "Indoor Upholstery Fabrics",
    descFr: "Velours de Guéliz, jacquards géométriques, bouclettes d'art et banquettes beldi chic.",
    descEn: "Guéliz velvet, geometric jacquards, textural bouclé and modern Moroccan banquettes.",
    Icon: IconSofa,
  },
  {
    id: "outdoor",
    titleFr: "Outdoor, Piscines & Terrasses",
    titleEn: "Outdoor, Pools & Terraces",
    descFr: "Toiles traitées UV 8/8, mousse Dryfeel® drainante, transats et coussins déperlants.",
    descEn: "UV 8/8 high-grade fabrics, Dryfeel® quick-dry foam, loungers and water-repellent cushions.",
    Icon: IconOutdoor,
  },
  {
    id: "lit",
    titleFr: "Linge de Lit Haute Hôtellerie",
    titleEn: "Luxury Hospitality Bedding",
    descFr: "Percale de coton peigné 300+ fils, satin d'Égypte soyeux et parures brodées.",
    descEn: "300+ TC combed cotton percale, Egyptian cotton sateen and custom embroidered sets.",
    Icon: IconBedding,
  },
  {
    id: "bain",
    titleFr: "Linge de Bain & Spa 600g/m²",
    titleEn: "Bath Linen & Spa 600gsm",
    descFr: "Éponges épaisses et ultra-absorbantes, peignoirs cols châle, draps de bain spa.",
    descEn: "Heavyweight absorbent terry, shawl-collar bathrobes, luxury hammam & pool towels.",
    Icon: IconBath,
  },
  {
    id: "table",
    titleFr: "Linge de Table & Nappage d'Apparat",
    titleEn: "Table Linen & Banquet Cloths",
    descFr: "Nappages d'art au mètre, sets de table lin antitache et serviettes coordonnées.",
    descEn: "Bespoke banquet cloths, stain-guarded linen placemats and coordinated napkins.",
    Icon: IconTableCloth,
  },
  {
    id: "confection",
    titleFr: "Façonnage d'Atelier & Pose sur site",
    titleEn: "Atelier Tailoring & On-Site Installation",
    descFr: "Prise de côtes in situ par nos maîtres tapissiers, plissage manuel et installation complète.",
    descEn: "On-site precision measurements, artisanal hand pleating and complete installation.",
    Icon: IconAtelierConfection,
  },
];

const METERAGE_PRESETS = [
  { id: "petit", labelFr: "< 25 mètres", labelEn: "< 25 meters", descFr: "Chambre, salon ou projet ciblé", descEn: "Single room or specific window" },
  { id: "moyen", labelFr: "25 à 75 mètres", labelEn: "25 to 75 meters", descFr: "Villa moyenne ou Riad 4-5 suites", descEn: "Medium villa or 4-5 suite riad" },
  { id: "grand", labelFr: "75 à 200 mètres", labelEn: "75 to 200 meters", descFr: "Grand Riad, boutique-hôtel", descEn: "Large riad or boutique hotel" },
  { id: "rouleaux", labelFr: "+ 200 mètres", labelEn: "200+ meters", descFr: "Rouleaux complets / Gros œuvre", descEn: "Full fabric bolts & wholesale contract" },
  { id: "aide", labelFr: "À déterminer", labelEn: "Need Calculation Aid", descFr: "Assistance métrage par notre atelier", descEn: "Our team will calculate from your plans" },
];

const TIMELINE_PRESETS = [
  { id: "urgent", labelFr: "Urgent (< 2 semaines)", labelEn: "Urgent (< 2 weeks)" },
  { id: "1mois", labelFr: "Sous 30 jours", labelEn: "Within 30 days" },
  { id: "2-3mois", labelFr: "2 à 3 mois", labelEn: "2 to 3 months" },
  { id: "etude", labelFr: "Phase préparatoire / Futur", labelEn: "Design phase / Future project" },
];

const QUICK_TAGS_FR = [
  "Hauteur sous plafond > 3,80m",
  "Tête de rideaux pli flamand",
  "Toile outdoor anti-UV haute résistance",
  "Tissu déhoussable & lavable",
  "Coloris sable minéral / terre cuite",
  "Occultation 100% obscurcissant",
  "Banquette beldi contemporaine",
];

const QUICK_TAGS_EN = [
  "Ceiling height > 3.80m",
  "French pinch pleat heading",
  "High UV-resistant outdoor fabric",
  "Removable & washable slipcovers",
  "Mineral sand & terracotta palette",
  "100% acoustic & light blackout",
  "Contemporary Moroccan banquette",
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function DevisClientView() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const locale = isEn ? "en" : "fr";
  const [menuOpen, setMenuOpen] = useState(false);

  // Stepper State: 1: Profil, 2: Etoffes, 3: Metrage & Calendrier, 4: Projet & Plans, 5: Contact
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [direction, setDirection] = useState<number>(1);

  // Form State
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [quoteReference, setQuoteReference] = useState<string>("");

  // Step 1: Profile
  const [selectedProfile, setSelectedProfile] = useState<string>("hotel");

  // Step 2: Services
  const [selectedServices, setSelectedServices] = useState<string[]>(["rideaux", "ameublement"]);

  // Step 3: Yardage, Timeline, Samples
  const [selectedMeterage, setSelectedMeterage] = useState<string>(isEn ? "25 to 75 meters" : "25 à 75 mètres");
  const [selectedTimeline, setSelectedTimeline] = useState<string>(isEn ? "Within 30 days" : "Sous 30 jours");
  const [wantsSamples, setWantsSamples] = useState<boolean>(true);

  // Step 4: Project Specifications & Simulated File Upload
  const [projectMessage, setProjectMessage] = useState<string>("");
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // Step 5: Contact Identity
  const [clientName, setClientName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [projectCity, setProjectCity] = useState<string>("Marrakech");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaTimestamp, setCaptchaTimestamp] = useState<number>(0);

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

  // Step Navigation Handlers
  const goToStep = (stepNumber: number) => {
    if (stepNumber < 1 || stepNumber > 5) return;
    setDirection(stepNumber > currentStep ? 1 : -1);
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const handleNext = () => {
    if (currentStep === 2 && selectedServices.length === 0) {
      alert(isEn ? "Please select at least one fabric category." : "Veuillez sélectionner au moins une catégorie d'étoffes.");
      return;
    }
    goToStep(currentStep + 1);
  };

  const handlePrev = () => {
    goToStep(currentStep - 1);
  };

  // Toggle Services
  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Add quick tag to project description
  const appendQuickTag = (tag: string) => {
    setProjectMessage((prev) => {
      if (prev.includes(tag)) return prev;
      return prev ? `${prev} · ${tag}` : tag;
    });
  };

  // Submit Final Quote Request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientPhone) {
      alert(isEn ? "Please fill in your name, email and phone number." : "Veuillez renseigner votre nom, email et téléphone.");
      return;
    }

    if (!captchaToken) {
      alert(
        isEn
          ? "Please check 'I'm not a robot' to secure your quote submission."
          : "Veuillez cocher la case 'Je ne suis pas un robot' pour valider votre demande de devis."
      );
      return;
    }

    setLoading(true);

    try {
      const activeProfileObj = PROFILES.find((p) => p.id === selectedProfile);
      const chosenServiceLabels = FABRIC_SERVICES
        .filter((s) => selectedServices.includes(s.id))
        .map((s) => (isEn ? s.titleEn : s.titleFr));

      const generatedRef = `KTX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const detailedMessage = [
        projectMessage.trim(),
        uploadedFileName ? `[Fichier / Plan transmis : ${uploadedFileName}]` : null,
        `Référence Devis Client : ${generatedRef}`,
      ]
        .filter(Boolean)
        .join("\n\n");

      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          company: companyName,
          clientProfile: isEn ? activeProfileObj?.titleEn : activeProfileObj?.titleFr,
          services: chosenServiceLabels,
          meterage: selectedMeterage,
          timeline: selectedTimeline,
          samples: wantsSamples
            ? isEn
              ? "Yes, client requested physical swatch samples box"
              : "Oui, le client souhaite recevoir un coffret de nuanciers réels"
            : isEn
            ? "No, formal quote proposal first"
            : "Non, proposition chiffrée d'abord",
          city: projectCity,
          message: detailedMessage,
          captchaToken,
          _hp_timestamp: captchaTimestamp,
        }),
      });

      if (res.ok) {
        setQuoteReference(generatedRef);
        setSent(true);
        window.scrollTo({ top: 120, behavior: "smooth" });
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.error || (isEn ? "An error occurred while transmitting your request." : "Erreur lors de la transmission de votre devis."));
      }
    } catch {
      alert(isEn ? "Network error. Please try again." : "Erreur de connexion. Veuillez vérifier votre réseau.");
    } finally {
      setLoading(false);
    }
  };

  const stepsLabels = isEn
    ? ["01. Profile", "02. Fabrics", "03. Scale", "04. Project", "05. Identity"]
    : ["01. Profil", "02. Étoffes", "03. Métrage", "04. Projet", "05. Contact"];

  const progressPercent = Math.round((currentStep / 5) * 100);

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#161513] font-sans antialiased selection:bg-[#161513] selection:text-white pb-32">
      {/* LUXURY FULLSCREEN SLIDE-IN MENU OVERLAY */}
      <LuxuryMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* TOP FLOATING NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#f8f6f0]/90 backdrop-blur-md border-b border-[#e5dfd5] py-3.5 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative flex items-center justify-between min-h-[48px]">
          {/* Left: Burger Menu Button */}
          <div className="flex items-center z-10">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="relative z-20 flex h-6 w-6 flex-col items-center justify-center gap-1.5 cursor-pointer hover:opacity-65 transition-opacity"
              aria-label="Ouvrir le menu"
            >
              <span className="block h-[1px] w-5 bg-[#161513] transition-all duration-300" />
              <span className="block h-[1px] w-5 bg-[#161513] transition-all duration-300" />
              <span className="block h-[1px] w-5 bg-[#161513] transition-all duration-300" />
            </button>
          </div>

          {/* Centered Brand Logo */}
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

      {/* HERO SECTION */}
      <section className="border-b border-[#e5dfd5] bg-gradient-to-b from-[#f3eee5] to-[#f8f6f0] pt-10 sm:pt-14 pb-8 sm:pb-12">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#161513] text-[#faf8f5] text-[10px] font-sans uppercase tracking-[0.25em] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]" />
                <span>{isEn ? "Architectural Quoting & Atelier Tailoring" : "Bureau d'Études & Confection d'Art"}</span>
              </div>

              <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#161513] leading-none">
                {isEn ? "BESPOKE TEXTILE QUOTE" : "DEMANDE DE DEVIS SUR-MESURE"}
              </h1>

              <p className="font-sans text-xs sm:text-sm text-[#161513]/70 leading-relaxed font-light">
                {isEn
                  ? "Dynamic multi-criteria estimation for boutique hotels, riads, luxury villas, and interior architects. Our master tailors review your specifications and reply within 24 business hours."
                  : "Chiffrage précis, calepinage de métrages et envoi d'échantillons réels pour vos riads, hôtels de prestige et résidences privées. Réponse personnalisée de notre manufacture sous 24h ouvrées."}
              </p>
            </div>

            {/* Quick WhatsApp Concierge Floating Pill */}
            <div className="shrink-0">
              <a
                href="https://wa.me/212661090950?text=Bonjour%20Kansotex%2C%20je%20souhaite%20un%20devis%20technique%20pour%20mon%20projet%20textile."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#161513] text-[#faf8f5] hover:bg-black text-xs font-sans font-medium transition-all shadow-sm hover:scale-[1.02]"
              >
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  {isEn ? "WhatsApp Direct Concierge" : "Conciergerie WhatsApp Directe"}
                </span>
              </a>
            </div>
          </div>

          {/* DYNAMIC PROGRESS BAR & INTERACTIVE STEP TABS */}
          {!sent && (
            <div className="mt-8 sm:mt-10 pt-6 border-t border-[#e5dfd5]">
              <div className="flex items-center justify-between text-xs font-sans mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#c5a059] uppercase tracking-wider text-[11px]">
                    {isEn ? "Step" : "Étape"} {currentStep} / 5
                  </span>
                  <span className="text-[#161513]/40">·</span>
                  <span className="font-medium text-[#161513]">
                    {stepsLabels[currentStep - 1]}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#161513]/60 font-semibold">
                  {progressPercent}%
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-full h-1.5 bg-[#e5dfd5] rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#161513] via-[#c5a059] to-[#d4af37]"
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                />
              </div>

              {/* Interactive Step Buttons for Quick Navigation */}
              <div className="hidden sm:grid grid-cols-5 gap-2 mt-4">
                {stepsLabels.map((lbl, idx) => {
                  const stepIdx = idx + 1;
                  const isCurrent = currentStep === stepIdx;
                  const isCompleted = currentStep > stepIdx;

                  return (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => goToStep(stepIdx)}
                      className={`text-left py-2 px-3 rounded-xl border transition-all text-[11px] font-medium flex items-center justify-between cursor-pointer ${
                        isCurrent
                          ? "bg-[#161513] text-white border-[#161513] shadow-xs"
                          : isCompleted
                          ? "bg-white/80 text-[#161513] border-[#c5a059]/40 hover:bg-white"
                          : "bg-transparent text-[#161513]/40 border-transparent hover:text-[#161513]/70"
                      }`}
                    >
                      <span className="truncate">{lbl}</span>
                      {isCompleted && (
                        <span className="w-4 h-4 rounded-full bg-[#c5a059] text-white flex items-center justify-center text-[9px] shrink-0 font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* MAIN CONTENT AREA: 2-COLUMN LAYOUT (WIZARD + LIVE SUMMARY) */}
      <main className="max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 sm:pt-10">
        {sent ? (
          /* ============================================================ */
          /* ULTRA-LUXURY CONFIRMATION SCREEN */
          /* ============================================================ */
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto p-8 sm:p-14 rounded-3xl bg-white border border-[#e5dfd5] shadow-lg text-center space-y-6"
          >
            <div className="w-20 h-20 rounded-full bg-[#161513] text-[#c5a059] flex items-center justify-center mx-auto shadow-md">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/15 text-[#8c6b2d] font-mono text-xs font-semibold">
                <span>Réf. {quoteReference}</span>
              </div>
              <h2 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase text-[#161513]">
                {isEn ? "Quote Request Transmitted" : "Demande de Devis Enregistrée"}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#161513]/70 max-w-lg mx-auto leading-relaxed">
                {isEn
                  ? "Thank you for trusting Kansotex. Our technical office is preparing your custom quote and material advice. You will receive our formal proposal within 24 business hours."
                  : "Merci de votre confiance. Notre bureau d'études étudie vos éléments et établira votre chiffrage détaillé ainsi que vos préconisations de métrages sous 24h ouvrées."}
              </p>
            </div>

            {/* Direct WhatsApp Follow-up Card */}
            <div className="p-6 rounded-2xl bg-[#f8f6f0] border border-[#e5dfd5] text-left space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                <p className="text-xs font-bold text-[#161513] uppercase tracking-wider">
                  {isEn ? "Transmitting Architectural Plans or Photos?" : "Transmettre des plans DWG / PDF ou photos in situ ?"}
                </p>
              </div>
              <p className="text-xs text-[#161513]/70 leading-relaxed font-light">
                {isEn
                  ? "You can share your floorplans, window dimensions, or fabric inspirations directly on WhatsApp with our workshop director using your reference number."
                  : "Partagez directement vos plans d'architecte, métrages ou inspirations avec notre direction technique sur WhatsApp avec votre numéro de référence."}
              </p>
              <a
                href={`https://wa.me/212661090950?text=Bonjour%20Kansotex%2C%20je%20viens%20d%27enregistrer%20la%20demande%20de%20devis%20${quoteReference}.%20Voici%20les%20plans%20et%20sp%C3%A9cifications%20compl%C3%A9mentaires.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#161513] text-[#faf8f5] hover:bg-black font-sans text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
              >
                <span>{isEn ? "Open WhatsApp with Quote Reference" : "Ouvrir WhatsApp avec la Référence Devis"}</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setCurrentStep(1);
                  setClientName("");
                  setClientEmail("");
                  setClientPhone("");
                  setProjectMessage("");
                }}
                className="text-xs font-sans underline underline-offset-4 text-[#161513]/60 hover:text-[#161513]"
              >
                {isEn ? "Submit another project estimation" : "Soumettre une autre demande de devis"}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT / CENTER: INTERACTIVE STEP WIZARD (8 COLS) */}
            <div className="lg:col-span-8 space-y-8">
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait" custom={direction}>
                  
                  {/* STEP 1: CLIENT PROFILE */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: direction * 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#c5a059] font-bold block">
                          {isEn ? "Step 01 / 05" : "Étape 01 sur 05"}
                        </span>
                        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase text-[#161513]">
                          {isEn ? "WHAT IS YOUR PROJECT PROFILE?" : "QUELLE EST LA NATURE DE VOTRE PROJET ?"}
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-[#161513]/65">
                          {isEn
                            ? "Select your profile so our team can adapt technical requirements, trade pricing, and yardage considerations."
                            : "Sélectionnez votre profil pour adapter la tarification professionnelle, les finitions d'atelier et l'accompagnement technique."}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        {PROFILES.map((p) => {
                          const isSelected = selectedProfile === p.id;
                          const IconComp = p.Icon;

                          return (
                            <div
                              key={p.id}
                              onClick={() => setSelectedProfile(p.id)}
                              className={`group relative p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between min-h-[160px] ${
                                isSelected
                                  ? "bg-[#161513] text-white border-[#161513] shadow-md scale-[1.01]"
                                  : "bg-white text-[#161513] border-[#e5dfd5] hover:border-[#161513]/50 hover:shadow-xs"
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div
                                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-white/10 text-[#c5a059]"
                                      : "bg-[#f8f6f0] text-[#161513] group-hover:bg-[#161513] group-hover:text-white"
                                  }`}
                                >
                                  <IconComp className="w-6 h-6" />
                                </div>
                                <div
                                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] transition-all ${
                                    isSelected
                                      ? "border-[#c5a059] bg-[#c5a059] text-[#161513] font-bold"
                                      : "border-[#161513]/25"
                                  }`}
                                >
                                  {isSelected ? "✓" : ""}
                                </div>
                              </div>

                              <div className="mt-4 space-y-1">
                                <p className="text-sm sm:text-base font-bold tracking-tight">
                                  {isEn ? p.titleEn : p.titleFr}
                                </p>
                                <p className={`text-xs leading-relaxed font-light ${isSelected ? "text-white/70" : "text-[#161513]/60"}`}>
                                  {isEn ? p.subtitleEn : p.subtitleFr}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: FABRICS & SERVICES SELECTION */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: direction * 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#c5a059] font-bold block">
                          {isEn ? "Step 02 / 05" : "Étape 02 sur 05"}
                        </span>
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                          <h2 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase text-[#161513]">
                            {isEn ? "SELECT FABRICS & SERVICES" : "ÉTOFFES & PRESTATIONS SOUHAITÉES"}
                          </h2>
                          <span className="text-xs font-sans text-[#c5a059] font-semibold">
                            {selectedServices.length} {isEn ? "selected" : "sélectionné(s)"}
                          </span>
                        </div>
                        <p className="font-sans text-xs sm:text-sm text-[#161513]/65">
                          {isEn
                            ? "Select all textile applications needed for your project (multiple choices allowed)."
                            : "Cochez toutes les applications textiles prévues pour votre projet (sélection multiple)."}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                        {FABRIC_SERVICES.map((item) => {
                          const isChecked = selectedServices.includes(item.id);
                          const IconComp = item.Icon;

                          return (
                            <div
                              key={item.id}
                              onClick={() => toggleService(item.id)}
                              className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                                isChecked
                                  ? "bg-white border-[#161513] shadow-md ring-1 ring-[#161513]"
                                  : "bg-white/70 border-[#e5dfd5] hover:bg-white hover:border-[#161513]/40"
                              }`}
                            >
                              <div
                                className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center transition-colors ${
                                  isChecked
                                    ? "bg-[#161513] text-[#c5a059]"
                                    : "bg-[#f8f6f0] text-[#161513]/70"
                                }`}
                              >
                                <IconComp className="w-5 h-5" />
                              </div>

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <p className="text-xs sm:text-sm font-bold text-[#161513]">
                                    {isEn ? item.titleEn : item.titleFr}
                                  </p>
                                  <div
                                    className={`w-4 h-4 rounded shrink-0 border flex items-center justify-center text-[10px] transition-all ${
                                      isChecked
                                        ? "bg-[#161513] border-[#161513] text-white"
                                        : "border-[#161513]/30"
                                    }`}
                                  >
                                    {isChecked ? "✓" : ""}
                                  </div>
                                </div>
                                <p className="text-[11px] text-[#161513]/60 mt-1 leading-relaxed font-light">
                                  {isEn ? item.descEn : item.descFr}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: METERAGE, TIMELINE & SAMPLES */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: direction * 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-8"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#c5a059] font-bold block">
                          {isEn ? "Step 03 / 05" : "Étape 03 sur 05"}
                        </span>
                        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase text-[#161513]">
                          {isEn ? "PROJECT SCALE & TIMELINE" : "MÉTRAGES ESTIMÉS & CALENDRIER"}
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-[#161513]/65">
                          {isEn
                            ? "Provide approximate volumes and deadlines to reserve workshop capacity and apply wholesale tier discounts."
                            : "Indiquez l'envergure approximative de votre chantier pour réserver le créneau d'atelier et appliquer les remises au volume."}
                        </p>
                      </div>

                      {/* Meterage Presets */}
                      <div className="space-y-3">
                        <span className="text-xs font-sans uppercase tracking-widest text-[#161513]/60 font-bold block">
                          {isEn ? "Estimated Yardage Volume" : "Volume de Métrage Prévisionnel"}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {METERAGE_PRESETS.map((opt) => {
                            const label = isEn ? opt.labelEn : opt.labelFr;
                            const desc = isEn ? opt.descEn : opt.descFr;
                            const isSel = selectedMeterage === label;

                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setSelectedMeterage(label)}
                                className={`text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                                  isSel
                                    ? "bg-[#161513] text-white border-[#161513] shadow-sm"
                                    : "bg-white text-[#161513] border-[#e5dfd5] hover:border-[#161513]/40"
                                }`}
                              >
                                <p className="text-xs sm:text-sm font-bold">{label}</p>
                                <p className={`text-[10.5px] mt-0.5 font-light ${isSel ? "text-white/70" : "text-[#161513]/60"}`}>
                                  {desc}
                                </p>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Delivery Timeline Presets */}
                      <div className="space-y-3">
                        <span className="text-xs font-sans uppercase tracking-widest text-[#161513]/60 font-bold block">
                          {isEn ? "Desired Timeline / Delivery Target" : "Échéance Souhaitée d'Installation / Livraison"}
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                          {TIMELINE_PRESETS.map((opt) => {
                            const label = isEn ? opt.labelEn : opt.labelFr;
                            const isSel = selectedTimeline === label;

                            return (
                              <button
                                key={opt.id}
                                type="button"
                                onClick={() => setSelectedTimeline(label)}
                                className={`py-3 px-3 rounded-xl border text-center text-xs font-medium transition-all cursor-pointer ${
                                  isSel
                                    ? "bg-[#161513] text-white border-[#161513] shadow-xs"
                                    : "bg-white text-[#161513] border-[#e5dfd5] hover:border-[#161513]/40"
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Physical Swatch Box Request Card */}
                      <div
                        onClick={() => setWantsSamples(!wantsSamples)}
                        className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                          wantsSamples
                            ? "bg-[#f3eee5] border-[#c5a059] shadow-sm"
                            : "bg-white border-[#e5dfd5] hover:border-[#161513]/30"
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 text-[#8c6b2d] flex items-center justify-center shrink-0">
                            <IconShieldLock className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-[#161513]">
                              {isEn ? "Request Express Material Swatches Box" : "Recevoir un Coffret de Nuanciers Réels sous 48h"}
                            </p>
                            <p className="text-xs text-[#161513]/65 mt-0.5 font-light leading-relaxed">
                              {isEn
                                ? "Receive curated tactile fabric cuttings directly at your design studio or villa."
                                : "Échantillons d'étoffes réels expédiés directement à votre agence ou villa pour validation des textures et tombés."}
                            </p>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-bold ${
                              wantsSamples ? "bg-[#c5a059] border-[#c5a059] text-white" : "border-[#161513]/30"
                            }`}
                          >
                            {wantsSamples ? "✓" : ""}
                          </div>
                          <span className="text-xs font-medium text-[#161513]">
                            {wantsSamples
                              ? isEn
                                ? "Included in request"
                                : "Inclus dans la demande"
                              : isEn
                              ? "Optional"
                              : "Optionnel"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: SPECIFICATIONS & PLANS UPLOAD */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: direction * 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#c5a059] font-bold block">
                          {isEn ? "Step 04 / 05" : "Étape 04 sur 05"}
                        </span>
                        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase text-[#161513]">
                          {isEn ? "SPECIFICATIONS & ARCHITECTURAL PLANS" : "CAHIER DES CHARGES & PLANS DU PROJET"}
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-[#161513]/65">
                          {isEn
                            ? "Describe your interior mood, window heights, or attach design files (DWG, PDF, JPG)."
                            : "Précisez vos dimensions, hauteurs sous plafond, contraintes solaires ou joignez vos plans."}
                        </p>
                      </div>

                      {/* Quick Interactive Requirement Chips */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-sans uppercase tracking-widest text-[#161513]/55 font-bold block">
                          {isEn ? "Quick Technical Considerations (Click to append)" : "Suggestions Techniques Rapides (Cliquez pour ajouter)"}
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {(isEn ? QUICK_TAGS_EN : QUICK_TAGS_FR).map((tag) => (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => appendQuickTag(tag)}
                              className="px-3 py-1.5 rounded-full border border-[#e5dfd5] bg-white hover:border-[#161513] text-[11px] font-medium text-[#161513]/80 hover:text-[#161513] transition-all cursor-pointer shadow-2xs"
                            >
                              + {tag}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Project Textarea */}
                      <label className="block space-y-2">
                        <span className="text-xs font-sans uppercase tracking-widest text-[#161513]/70 font-semibold block">
                          {isEn ? "Project Description & Dimensions" : "Description Détaillée du Projet"}
                        </span>
                        <textarea
                          rows={5}
                          value={projectMessage}
                          onChange={(e) => setProjectMessage(e.target.value)}
                          placeholder={
                            isEn
                              ? "e.g. 14 bespoke sheer curtains (height 4.20m), 6 outdoor daybed cushions with Dryfeel foam, mineral color palette matching Tadelakt walls..."
                              : "ex. 14 paires de rideaux grande hauteur (4,20m), 6 transats outdoor avec mousse Dryfeel®, banquettes de salon beldi en velours terracotta..."
                          }
                          className="w-full bg-white border border-[#e5dfd5] rounded-2xl p-4 text-xs sm:text-sm font-sans text-[#161513] placeholder:text-[#161513]/35 outline-none focus:border-[#161513] focus:ring-1 focus:ring-[#161513] transition-all shadow-2xs"
                        />
                      </label>

                      {/* Architectural File Attachment Dropzone */}
                      <div className="p-6 rounded-2xl border-2 border-dashed border-[#e5dfd5] bg-white/70 hover:bg-white hover:border-[#c5a059] transition-all text-center space-y-2 relative">
                        <input
                          type="file"
                          accept=".pdf,.dwg,.dxf,.zip,.jpg,.jpeg,.png"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setUploadedFileName(file.name);
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-12 h-12 rounded-full bg-[#f8f6f0] text-[#161513] flex items-center justify-center mx-auto">
                          <IconUploadDocument className="w-5 h-5 text-[#c5a059]" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#161513]">
                            {uploadedFileName ? (
                              <span className="text-[#22c55e]">✓ {uploadedFileName}</span>
                            ) : isEn ? (
                              "Attach Architectural Plans, DWG or Moodboard (Optional)"
                            ) : (
                              "Joindre un plan DWG, PDF ou photos de fenêtres (Optionnel)"
                            )}
                          </p>
                          <p className="text-[11px] text-[#161513]/50 mt-0.5">
                            {isEn ? "Drag & drop files or click to browse (Max 25MB)" : "Glissez votre document ou cliquez pour parcourir (Max 25Mo)"}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: CONTACT & FINAL SUBMIT */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: direction * 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -direction * 30 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#c5a059] font-bold block">
                          {isEn ? "Step 05 / 05" : "Étape 05 sur 05"}
                        </span>
                        <h2 className="font-sans text-2xl sm:text-3xl font-extrabold uppercase text-[#161513]">
                          {isEn ? "WHERE SHOULD WE SEND YOUR ESTIMATE?" : "OÙ DEVRONS-NOUS VOUS TRANSMETTRE LE DEVIS ?"}
                        </h2>
                        <p className="font-sans text-xs sm:text-sm text-[#161513]/65">
                          {isEn
                            ? "Complete your contact identity for direct tailoring follow-up by our Marrakech workshop."
                            : "Vos coordonnées directes pour l'envoi de la proposition chiffrée et des nuanciers réels."}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <label className="block space-y-1.5">
                          <span className="text-[10px] font-sans uppercase tracking-widest text-[#161513]/60 font-semibold block">
                            {isEn ? "Full Name *" : "Nom & Prénom *"}
                          </span>
                          <input
                            required
                            type="text"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            placeholder={isEn ? "e.g. Sarah Benjelloun" : "ex. Sarah Benjelloun"}
                            className="w-full bg-white border border-[#e5dfd5] rounded-xl px-4 py-3 text-xs sm:text-sm font-sans text-[#161513] outline-none focus:border-[#161513] transition-colors shadow-2xs"
                          />
                        </label>

                        <label className="block space-y-1.5">
                          <span className="text-[10px] font-sans uppercase tracking-widest text-[#161513]/60 font-semibold block">
                            {isEn ? "Company / Studio / Riad" : "Société / Agence / Riad"}
                          </span>
                          <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder={isEn ? "e.g. Studio Marrakech Architecture" : "ex. Studio Marrakech Architecture"}
                            className="w-full bg-white border border-[#e5dfd5] rounded-xl px-4 py-3 text-xs sm:text-sm font-sans text-[#161513] outline-none focus:border-[#161513] transition-colors shadow-2xs"
                          />
                        </label>

                        <label className="block space-y-1.5">
                          <span className="text-[10px] font-sans uppercase tracking-widest text-[#161513]/60 font-semibold block">
                            {isEn ? "Professional Email *" : "Adresse Email *"}
                          </span>
                          <input
                            required
                            type="email"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            placeholder="contact@agence.com"
                            className="w-full bg-white border border-[#e5dfd5] rounded-xl px-4 py-3 text-xs sm:text-sm font-sans text-[#161513] outline-none focus:border-[#161513] transition-colors shadow-2xs"
                          />
                        </label>

                        <label className="block space-y-1.5">
                          <span className="text-[10px] font-sans uppercase tracking-widest text-[#161513]/60 font-semibold block">
                            {isEn ? "Phone / WhatsApp *" : "Téléphone / WhatsApp *"}
                          </span>
                          <input
                            required
                            type="tel"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            placeholder="+212 6..."
                            className="w-full bg-white border border-[#e5dfd5] rounded-xl px-4 py-3 text-xs sm:text-sm font-sans text-[#161513] outline-none focus:border-[#161513] transition-colors shadow-2xs"
                          />
                        </label>

                        <label className="block space-y-1.5 sm:col-span-2">
                          <span className="text-[10px] font-sans uppercase tracking-widest text-[#161513]/60 font-semibold block">
                            {isEn ? "Project City / Region" : "Ville & Pays du Chantier"}
                          </span>
                          <input
                            type="text"
                            value={projectCity}
                            onChange={(e) => setProjectCity(e.target.value)}
                            placeholder="Marrakech, Casablanca, Rabat, Tanger, Paris, International..."
                            className="w-full bg-white border border-[#e5dfd5] rounded-xl px-4 py-3 text-xs sm:text-sm font-sans text-[#161513] outline-none focus:border-[#161513] transition-colors shadow-2xs"
                          />
                        </label>
                      </div>

                      {/* Anti-Bot Security Shield */}
                      <CaptchaShield
                        onVerify={(token, ts) => {
                          setCaptchaToken(token);
                          setCaptchaTimestamp(ts);
                        }}
                        onReset={() => {
                          setCaptchaToken(null);
                        }}
                        isEn={isEn}
                        className="my-3"
                      />

                      {/* Privacy & Reassurance Pledge */}
                      <div className="p-4 rounded-xl bg-[#f3eee5] border border-[#e5dfd5] flex items-center gap-3">
                        <IconShieldLock className="w-5 h-5 text-[#c5a059] shrink-0" />
                        <p className="text-[11px] text-[#161513]/70 font-light leading-relaxed">
                          {isEn
                            ? "Confidentiality guaranteed. Your project specs remain private and are strictly used to compute your fabric quote."
                            : "Confidentialité totale de vos plans et projets. Aucune donnée n'est cédée à des tiers."}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* STEPPER ACTION BAR (PREV / NEXT / SUBMIT) */}
                <div className="pt-8 mt-8 border-t border-[#e5dfd5] flex items-center justify-between gap-4">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-3.5 rounded-full border border-[#161513]/30 hover:border-[#161513] text-xs font-sans font-semibold uppercase tracking-wider text-[#161513] transition-colors cursor-pointer"
                    >
                      ← {isEn ? "Previous" : "Précédent"}
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 5 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3.5 rounded-full bg-[#161513] text-[#faf8f5] hover:bg-black text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.01] cursor-pointer"
                    >
                      {isEn ? "Continue →" : "Étape Suivante →"}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading || !captchaToken}
                      className="px-10 py-4 rounded-full bg-gradient-to-r from-[#161513] to-[#2b2925] text-[#d4af37] hover:text-white hover:to-black text-xs font-sans font-extrabold uppercase tracking-widest transition-all shadow-lg hover:scale-[1.02] disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    >
                      {loading
                        ? isEn
                          ? "Transmitting Quote..."
                          : "Transmission en cours..."
                        : isEn
                        ? "Submit Quote Request →"
                        : "Valider ma Demande de Devis →"}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: DYNAMIC LIVE PROJECT SUMMARY CARD (4 COLS, STICKY) */}
            <div className="lg:col-span-4 sticky top-24 space-y-4">
              <div className="rounded-3xl bg-white border border-[#e5dfd5] p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#e5dfd5] pb-4">
                  <span className="font-termina text-[10px] font-bold uppercase tracking-[0.2em] text-[#161513]">
                    {isEn ? "PROJECT SUMMARY" : "RÉCAPITULATIF PROJET"}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                </div>

                {/* Profile Selected */}
                <div className="space-y-1">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#161513]/40 font-semibold block">
                    {isEn ? "Client Profile" : "Profil Client"}
                  </span>
                  <p className="text-xs font-bold text-[#161513]">
                    {isEn
                      ? PROFILES.find((p) => p.id === selectedProfile)?.titleEn
                      : PROFILES.find((p) => p.id === selectedProfile)?.titleFr}
                  </p>
                </div>

                {/* Fabric Categories */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#161513]/40 font-semibold block">
                    {isEn ? "Selected Applications" : "Étoffes & Prestations"}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedServices.map((sid) => {
                      const item = FABRIC_SERVICES.find((s) => s.id === sid);
                      if (!item) return null;
                      return (
                        <span
                          key={sid}
                          className="px-2.5 py-1 rounded-md bg-[#f8f6f0] border border-[#e5dfd5] text-[10.5px] font-medium text-[#161513]"
                        >
                          {isEn ? item.titleEn.split(" ")[0] : item.titleFr.split(" ")[0]}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Meterage & Timeline */}
                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-[#e5dfd5]">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#161513]/40 font-semibold block">
                      {isEn ? "Yardage" : "Volume"}
                    </span>
                    <p className="text-xs font-bold text-[#161513]">{selectedMeterage}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#161513]/40 font-semibold block">
                      {isEn ? "Target" : "Échéance"}
                    </span>
                    <p className="text-xs font-bold text-[#161513]">{selectedTimeline}</p>
                  </div>
                </div>

                {/* Swatches Included */}
                <div className="pt-1 border-t border-[#e5dfd5] flex items-center justify-between text-xs">
                  <span className="text-[#161513]/60">{isEn ? "Swatch Box Kit" : "Nuanciers réels"}</span>
                  <span className="font-bold text-[#c5a059]">
                    {wantsSamples ? (isEn ? "Requested ✓" : "Demandé ✓") : (isEn ? "None" : "Non")}
                  </span>
                </div>

                {/* Guarantees Box */}
                <div className="pt-3 border-t border-[#e5dfd5] space-y-2 text-[11px] text-[#161513]/70 font-light">
                  <div className="flex items-center gap-2">
                    <span className="text-[#22c55e] font-bold">✓</span>
                    <span>{isEn ? "Free detailed quotation under 24h" : "Devis chiffré offert sous 24h"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#22c55e] font-bold">✓</span>
                    <span>{isEn ? "Atelier manufacturing in Marrakech" : "Confection atelier à Marrakech"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#22c55e] font-bold">✓</span>
                    <span>{isEn ? "Wholesale pricing for trade pros" : "Tarifs préférentiels professionnels"}</span>
                  </div>
                </div>
              </div>

              {/* Direct Atelier Contact Card */}
              <div className="p-5 rounded-2xl bg-[#161513] text-[#faf8f5] space-y-2.5">
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#c5a059] font-bold block">
                  {isEn ? "Kansotex Master Tailor Line" : "Bureau Technique Kansotex"}
                </span>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  {isEn
                    ? "Prefer an instant exchange? Contact our senior textile engineer directly on WhatsApp."
                    : "Vous préférez un échange direct ? Contactez notre ingénieur textile sur WhatsApp."}
                </p>
                <a
                  href="https://wa.me/212661090950?text=Bonjour%20Kansotex%2C%20je%20souhaite%20un%20conseil%20technique%20pour%20un%20devis."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#161513] text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span>+212 6 61 09 09 50</span>
                </a>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
