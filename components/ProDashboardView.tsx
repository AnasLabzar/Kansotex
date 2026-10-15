"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useCurrency } from "@/lib/CurrencyContext";
import { logout, loginAsPro, type SessionData } from "@/lib/session";
import { LuxuryMenuOverlay } from "@/components/LuxuryMenuOverlay";
import { NavbarRightActions } from "@/components/NavbarRightActions";
import { motion, AnimatePresence } from "framer-motion";

// Architectural SVG Icons (Strictly NO emojis)
function SvgChart({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function SvgCalendar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function SvgTable({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v8m-7 4h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function SvgCalculator({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function SvgSwatch({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  );
}

function SvgAtelier({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function SvgDownload({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function SvgSearch({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function SvgPlus({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function SvgCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SvgWhatsApp({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.127-.518-1.708-.707-2.812-2.454-2.898-2.568-.083-.114-.694-.925-.694-1.763 0-.839.435-1.252.59-1.425.156-.173.341-.216.455-.216.113 0 .227.002.326.007.104.005.244-.04.382.291.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.088-.178.183-.077.357.101.174.45 0.744.965 1.204.664.592 1.224.775 1.397.862.173.087.275.073.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087s1.011.477 1.184.564c.174.087.289.13.332.203.044.072.044.419-.1 0.824z" />
    </svg>
  );
}

// B2B Mock Orders and Projects Data
export interface B2BProject {
  id: string;
  ref: string;
  name: string;
  location: string;
  type: string;
  meters: number;
  publicPriceHT: number;
  proPriceHT: number;
  status: "DEVIS" | "CONFECTION" | "EXPEDIE" | "POSE";
  progressPct: number;
  deadline: string;
  items: string[];
  notes: string;
}

const INITIAL_PROJECTS: B2BProject[] = [
  {
    id: "1",
    ref: "KTX-2026-042",
    name: "Riad Dar Al Atlas — Suites & Patio",
    location: "Médina, Marrakech",
    type: "Hôtellerie de Caractère",
    meters: 180,
    publicPriceHT: 82800,
    proPriceHT: 62100, // 25% discount
    status: "CONFECTION",
    progressPct: 75,
    deadline: "28 Octobre 2026",
    items: [
      "12 pans Rideaux Wave grande hauteur 4.80m en Lin Lavé Blanc Craie",
      "8 banquettes marocaines modernes velours ocre côtelé antitache",
      "Voilages filtrants lin brut terrasse patio",
    ],
    notes: "Tringle motorisée Somfy intégrée en gorge. Têtes plis vagues 2.0x.",
  },
  {
    id: "2",
    ref: "KTX-2026-039",
    name: "Villa Palmeraie — Pavillon Invités",
    location: "Palmeraie, Marrakech",
    type: "Résidence Privée de Prestige",
    meters: 135,
    publicPriceHT: 64500,
    proPriceHT: 48375,
    status: "CONFECTION",
    progressPct: 40,
    deadline: "12 Novembre 2026",
    items: [
      "Voilages grande largeur 300cm Lin Céleste pour baies vitrées 6m",
      "40m Toile Suntech Outdoor déperlante pour daybeds piscine",
      "Coussins d'ornement lin lavé 420g sur-mesure",
    ],
    notes: "Œillets inox qualité marine pour l'extérieur face aux embruns chlorés.",
  },
  {
    id: "3",
    ref: "KTX-2026-044",
    name: "Boutique Hôtel Guéliz — Salons & Bar",
    location: "Avenue Mohammed V, Guéliz",
    type: "Hôtel & Lounge Bar",
    meters: 95,
    publicPriceHT: 51200,
    proPriceHT: 38400,
    status: "DEVIS",
    progressPct: 20,
    deadline: "24 Novembre 2026",
    items: [
      "Banquettes d'angle capitonnées velours d'apparat émeraude M1",
      "Draperies phoniques acoustiques occultantes pour salon d'écoute",
    ],
    notes: "Certification Non-Feu M1 exigée pour la commission de sécurité.",
  },
  {
    id: "4",
    ref: "KTX-2026-046",
    name: "Riad El Fenn Extension — Salon d'Hiver",
    location: "Derb Sidi Bouloukhat, Marrakech",
    type: "Maison d'Hôtes & Galerie",
    meters: 65,
    publicPriceHT: 34800,
    proPriceHT: 26100,
    status: "EXPEDIE",
    progressPct: 90,
    deadline: "20 Octobre 2026",
    items: [
      "Tentures lourdes lin naturel doublées satinette thermique",
      "Galettes d'assise capitonnées coton jacquard Kasbah",
    ],
    notes: "Expédié par transporteur privé dédié avec emballage sous housse atelier.",
  },
  {
    id: "5",
    ref: "KTX-2026-031",
    name: "Penthouse Hivernage — Réception & Master",
    location: "Boulevard Moulay Rachid, Hivernage",
    type: "Appartement d'Architecte",
    meters: 110,
    publicPriceHT: 59400,
    proPriceHT: 44550,
    status: "POSE",
    progressPct: 100,
    deadline: "04 Octobre 2026",
    items: [
      "Double rideaux occultants blackout 100% avec tombé cassant au sol",
      "Têtes de lit tapissées en tissu chenille ivoire",
    ],
    notes: "Chantier réceptionné sans réserve par l'architecte chef de projet.",
  },
  {
    id: "6",
    ref: "KTX-2026-027",
    name: "Domaine des Oliviers — Terrasses Pergolas",
    location: "Route de l'Ourika, km 14",
    type: "Domaine Événementiel & Villa",
    meters: 320,
    publicPriceHT: 148000,
    proPriceHT: 111000,
    status: "POSE",
    progressPct: 100,
    deadline: "18 Septembre 2026",
    items: [
      "Toiles tendues coulissantes pour 6 pergolas bioclimatiques",
      "18 chiliennes et bains de soleil en tissu outdoor traité UV",
    ],
    notes: "Livraison et pose globale effectuées par les maîtres tapissiers Kansotex.",
  },
];

// Atelier Fabric Roll Stock Mock Data
const ATELIER_STOCKS = [
  { ref: "LIN-ROYAL-01", name: "Lin Lavé Royal 420g Naturel", laize: "140 cm", availableMeters: 240, status: "En stock direct" },
  { ref: "VOIL-CEL-02", name: "Voilage Céleste Blanc Craie", laize: "300 cm", availableMeters: 380, status: "En stock direct" },
  { ref: "OUT-SUN-03", name: "Toile Outdoor Suntech Sable", laize: "150 cm", availableMeters: 190, status: "En stock direct" },
  { ref: "VEL-KOUT-04", name: "Velours d'Apparat Koutoubia Ocre", laize: "140 cm", availableMeters: 115, status: "Stock modéré" },
  { ref: "CHEN-ATL-05", name: "Chenille Étoffe Atlas Ivoire", laize: "140 cm", availableMeters: 160, status: "En stock direct" },
  { ref: "JACQ-KAS-06", name: "Jacquard Kasbah Anthracite", laize: "140 cm", availableMeters: 85, status: "Derniers rouleaux" },
];

interface ProDashboardViewProps {
  session?: SessionData | null;
}

export function ProDashboardView({ session }: ProDashboardViewProps) {
  const pathname = usePathname();
  let rawLocale = "fr";
  try {
    rawLocale = useLocale();
  } catch {
    rawLocale = pathname?.startsWith("/en") ? "en" : "fr";
  }
  const isEn = rawLocale === "en" || pathname?.startsWith("/en");

  const { formatPrice } = useCurrency();
  const [menuOpen, setMenuOpen] = useState(false);

  // Active Tab
  type TabKey = "overview" | "planning" | "orders" | "toolbox" | "swatches" | "atelier";
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  // Pro Tier Demo Switcher State
  const [currentRole, setCurrentRole] = useState<SessionData["role"]>(session?.role || "ARCHITECT");
  const [currentDiscount, setCurrentDiscount] = useState<number>(
    session?.tradeDiscount || (session?.role === "HOTEL" ? 0.30 : session?.role === "DECORATOR" ? 0.20 : 0.25)
  );
  const [companyName, setCompanyName] = useState<string>(
    session?.companyName || "Studio KB Architecture & Design"
  );
  const [userName, setUserName] = useState<string>(
    session?.name || "Karim Benjelloun"
  );

  // Projects & Search State
  const [projects, setProjects] = useState<B2BProject[]>(INITIAL_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("ALL");
  const [selectedProjectModal, setSelectedProjectModal] = useState<B2BProject | null>(null);

  // New Project Planning Modal
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    name: "",
    location: "Marrakech",
    type: "Hôtellerie / Riad",
    meters: "80",
    deadline: "15 Décembre 2026",
    notes: "Confection rideaux wave lin",
  });

  // Export Report Dialog State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Swatch Order Request Notification State
  const [swatchSentNotice, setSwatchSentNotice] = useState<string | null>(null);

  // -------------------------------------------------------------
  // B2B Toolbox State 1: Curtain Yardage Calculator
  // -------------------------------------------------------------
  const [calcWidth, setCalcWidth] = useState<number>(320); // cm
  const [calcHeight, setCalcHeight] = useState<number>(280); // cm
  const [calcHeading, setCalcHeading] = useState<"wave" | "flamand" | "simple" | "plisse">("wave");
  const [calcLaize, setCalcLaize] = useState<140 | 300>(300);
  const [calcLining, setCalcLining] = useState<"none" | "satinette" | "blackout">("satinette");
  const [calcFabricPricePerM, setCalcFabricPricePerM] = useState<number>(450); // MAD/m public

  // Calculations
  const headingMultipliers: Record<string, number> = {
    wave: 2.0,
    flamand: 2.2,
    simple: 1.8,
    plisse: 1.5,
  };

  const calculatedYardage = useMemo(() => {
    const fullness = headingMultipliers[calcHeading] || 2.0;
    const finishedWidthM = (calcWidth / 100) * fullness; // total fabric width needed
    const finishedHeightM = (calcHeight + 35) / 100; // adding 35cm for top & bottom hems

    let linearMetersNeeded = 0;
    let numberOfBreaths = 1;

    if (calcLaize === 300) {
      // Grande largeur (fabric height fits up to 300cm, width is cut along the roll length)
      linearMetersNeeded = finishedWidthM;
      numberOfBreaths = 2; // Usually split into 2 panels
    } else {
      // Petite laize 140cm (fabric width is 1.40m, need multiple drops stitched together)
      numberOfBreaths = Math.ceil((calcWidth * fullness) / 130); // 130cm usable width
      linearMetersNeeded = numberOfBreaths * finishedHeightM;
    }

    // Round nicely to 1 decimal
    linearMetersNeeded = Math.round(linearMetersNeeded * 10) / 10;

    const publicFabricCost = linearMetersNeeded * calcFabricPricePerM;
    const proFabricCost = publicFabricCost * (1 - currentDiscount);
    const liningCostPerM = calcLining === "none" ? 0 : calcLining === "satinette" ? 110 : 180;
    const proLiningCost = linearMetersNeeded * liningCostPerM * (1 - currentDiscount);
    const tailoringCostEstimate = (numberOfBreaths >= 2 ? numberOfBreaths : 2) * 220; // 220 MAD per panel confection

    const totalEstimateProHT = proFabricCost + proLiningCost + tailoringCostEstimate;

    return {
      linearMetersNeeded,
      numberOfBreaths,
      publicFabricCost,
      proFabricCost,
      proLiningCost,
      tailoringCostEstimate,
      totalEstimateProHT,
      savingsHT: publicFabricCost - proFabricCost,
    };
  }, [calcWidth, calcHeight, calcHeading, calcLaize, calcLining, calcFabricPricePerM, currentDiscount]);

  // -------------------------------------------------------------
  // B2B Toolbox State 2: Client Markup & Margin Simulator
  // -------------------------------------------------------------
  const [markupPurchaseCostHT, setMarkupPurchaseCostHT] = useState<number>(35000);
  const [markupMarginPct, setMarkupMarginPct] = useState<number>(35); // +35% agency margin
  const [markupVatPct, setMarkupVatPct] = useState<number>(20); // 20% TVA

  const calculatedAgencyMargin = useMemo(() => {
    const agencySellingPriceHT = markupPurchaseCostHT * (1 + markupMarginPct / 100);
    const agencyGrossProfit = agencySellingPriceHT - markupPurchaseCostHT;
    const clientPriceTTC = agencySellingPriceHT * (1 + markupVatPct / 100);
    return {
      agencySellingPriceHT,
      agencyGrossProfit,
      clientPriceTTC,
    };
  }, [markupPurchaseCostHT, markupMarginPct, markupVatPct]);

  // -------------------------------------------------------------
  // Aggregate KPIs
  // -------------------------------------------------------------
  const totalTurnoverPublic = useMemo(() => projects.reduce((acc, p) => acc + p.publicPriceHT, 0), [projects]);
  const totalTurnoverPro = useMemo(() => projects.reduce((acc, p) => acc + p.proPriceHT, 0), [projects]);
  const totalSavings = totalTurnoverPublic - totalTurnoverPro;
  const totalMeters = useMemo(() => projects.reduce((acc, p) => acc + p.meters, 0), [projects]);
  const activeProjectsCount = useMemo(() => projects.filter((p) => p.status !== "POSE").length, [projects]);

  // Filtered Projects for Table
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.items.some((it) => it.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchStatus =
        selectedStatusFilter === "ALL" || p.status === selectedStatusFilter;
      return matchSearch && matchStatus;
    });
  }, [projects, searchQuery, selectedStatusFilter]);

  // Switch Role Handler
  const handleSwitchRole = async (role: SessionData["role"], discount: number) => {
    setCurrentRole(role);
    setCurrentDiscount(discount);
    if (role === "ARCHITECT") {
      setCompanyName("Studio KB Architecture & Design");
      setUserName("Karim Benjelloun");
    } else if (role === "HOTEL") {
      setCompanyName("Palais & Riad Atlas Luxury");
      setUserName("Directeur d'Exploitation");
    } else {
      setCompanyName("Atelier Intérieurs Marrakech");
      setUserName("Sara Tazi");
    }
    // Update server session cookie seamlessly
    try {
      await loginAsPro(role, discount);
    } catch {
      // non-blocking
    }
  };

  // Export CSV handler
  const handleExportCSV = () => {
    const headers = ["Reference", "Projet", "Lieu", "Metrage_ml", "Prix_Public_HT_MAD", "Prix_Pro_HT_MAD", "Economie_MAD", "Statut", "Deadline"];
    const rows = filteredProjects.map((p) => [
      p.ref,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.location}"`,
      p.meters,
      p.publicPriceHT,
      p.proPriceHT,
      p.publicPriceHT - p.proPriceHT,
      p.status,
      `"${p.deadline}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `kansotex_releve_pro_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add Project handler
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newM = parseInt(newProjectForm.meters, 10) || 50;
    const estPublic = newM * 420;
    const estPro = estPublic * (1 - currentDiscount);
    const newProj: B2BProject = {
      id: String(Date.now()),
      ref: `KTX-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: newProjectForm.name.trim() || "Nouveau Chantier Déco",
      location: newProjectForm.location.trim() || "Marrakech",
      type: newProjectForm.type,
      meters: newM,
      publicPriceHT: estPublic,
      proPriceHT: estPro,
      status: "DEVIS",
      progressPct: 15,
      deadline: newProjectForm.deadline,
      items: [newProjectForm.notes],
      notes: "Chantier planifié par l'agence.",
    };
    setProjects([newProj, ...projects]);
    setIsAddProjectOpen(false);
    setNewProjectForm({
      name: "",
      location: "Marrakech",
      type: "Hôtellerie / Riad",
      meters: "80",
      deadline: "15 Décembre 2026",
      notes: "Confection rideaux wave lin",
    });
    setActiveTab("planning");
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-[#161513] font-sans antialiased selection:bg-[#161513] selection:text-white pb-24">
      {/* Full screen slide-in menu overlay */}
      <LuxuryMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ============================================================ */}
      {/* 1. FLOATING NAVIGATION BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-[#fcfaf7]/90 backdrop-blur-md border-b border-[#e9e3d8] py-3.5 transition-all">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative flex items-center justify-between min-h-[48px]">
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

          {/* Truly Centered Brand Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <Link href="/" aria-label="Kansotex" className="pointer-events-auto shrink-0 flex items-center justify-center">
              <Image
                src="/KANSOTEX-marque-Black.png"
                alt="Kansotex"
                width={500}
                height={120}
                className="w-[135px] sm:w-[165px] h-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right Action Controls */}
          <NavbarRightActions />
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. DEDICATED LUXURY B2B PRO TOP BAR */}
      {/* ============================================================ */}
      <div className="bg-[#161513] text-[#faf8f5] border-b border-[#2b2925]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          {/* Left: Partner Studio Info & Tier Pill */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#c5a059] shrink-0 font-serif text-sm font-bold">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">
                  {companyName}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider font-semibold bg-[#c5a059] text-[#161513]">
                  -{Math.round(currentDiscount * 100)}% REMISE ÉDITEUR
                </span>
              </div>
              <p className="text-[11px] text-white/55 font-light">
                {userName} · Partenaire Agréé Kansotex Éditions Marrakech
              </p>
            </div>
          </div>

          {/* Right: Role Switcher & Atelier Hotline */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-end">
            {/* Quick Role Tester Pills */}
            <div className="inline-flex items-center p-1 rounded-full bg-white/10 border border-white/10 text-[10px]">
              <span className="text-white/40 px-2 uppercase tracking-widest text-[9px]">Profil Démo :</span>
              <button
                type="button"
                onClick={() => handleSwitchRole("ARCHITECT", 0.25)}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  currentRole === "ARCHITECT"
                    ? "bg-[#c5a059] text-[#161513] font-semibold shadow-xs"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Architecte (-25%)
              </button>
              <button
                type="button"
                onClick={() => handleSwitchRole("HOTEL", 0.30)}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  currentRole === "HOTEL"
                    ? "bg-[#c5a059] text-[#161513] font-semibold shadow-xs"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Hôtellerie (-30%)
              </button>
              <button
                type="button"
                onClick={() => handleSwitchRole("DECORATOR", 0.20)}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  currentRole === "DECORATOR"
                    ? "bg-[#c5a059] text-[#161513] font-semibold shadow-xs"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Décorateur (-20%)
              </button>
            </div>

            {/* Direct WhatsApp Atelier Link */}
            <a
              href="https://wa.me/212661234567?text=Bonjour%20Atelier%20Kansotex,%20je%20souhaite%20un%20suivi%20sur%20mon%20chantier%20en%20cours"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-medium transition-all"
              title="Joindre le chef d'atelier sur WhatsApp"
            >
              <SvgWhatsApp className="w-3.5 h-3.5 text-emerald-400" />
              <span>Atelier Direct</span>
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. MAIN DASHBOARD CONTAINER */}
      {/* ============================================================ */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 space-y-8">
        
        {/* Header Title & Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#e6dfd3]">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#161513]/60 font-semibold">
                B2B PORTAL · KANSOTEX MANUFACTURE
              </span>
            </div>
            <h1 className="font-termina text-xl sm:text-2xl lg:text-3xl font-bold uppercase tracking-[0.08em] text-[#161513]">
              Tableau de Bord Professionnel
            </h1>
            <p className="text-xs sm:text-sm text-[#161513]/65 mt-1">
              Pilotage des confections d&apos;atelier, suivi des chantiers et outils techniques pour prescripteurs d&apos;exception.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setIsAddProjectOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#161513] text-[#faf8f5] hover:bg-[#2b2925] text-xs font-medium tracking-wide uppercase transition-all shadow-xs"
            >
              <SvgPlus className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Planifier un Chantier</span>
            </button>
            <button
              type="button"
              onClick={() => setIsReportModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#dcd4c5] hover:border-[#161513] text-[#161513] text-xs font-medium tracking-wide uppercase transition-all"
            >
              <SvgDownload className="w-3.5 h-3.5 text-[#161513]/70" />
              <span>Rapport d&apos;Activité (PDF)</span>
            </button>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 4. LUXURY TABS NAVIGATION BAR */}
        {/* ============================================================ */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#e6dfd3]">
          {[
            { key: "overview", label: "Vue d'Ensemble & Stats", icon: SvgChart },
            { key: "planning", label: "Planification Chantiers", icon: SvgCalendar, badge: `${activeProjectsCount}` },
            { key: "orders", label: "Projets & Devis", icon: SvgTable, badge: `${projects.length}` },
            { key: "toolbox", label: "Boîte à Outils B2B", icon: SvgCalculator },
            { key: "swatches", label: "Nuanciers & Échantillons", icon: SvgSwatch },
            { key: "atelier", label: "Atelier & Bureau d'Études", icon: SvgAtelier },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#161513] text-white shadow-xs"
                    : "bg-[#f2ece2] text-[#161513]/70 hover:text-[#161513] hover:bg-[#e8e0d2]"
                }`}
              >
                <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-[#c5a059]" : "text-[#161513]/60"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-semibold ${
                      isActive ? "bg-[#c5a059] text-[#161513]" : "bg-[#ded6c8] text-[#161513]"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* 5. TAB CONTENT RENDERING */}
        {/* ============================================================ */}

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: OVERVIEW & STATS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fadeIn">
            {/* 4 Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Metric 1: Volume d'affaires */}
              <div className="p-6 rounded-2xl bg-white border border-[#e5ded2] shadow-xs relative overflow-hidden group hover:border-[#c5a059] transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#161513]/50 font-medium">
                    Confection &amp; Métrages Pro HT
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#f4eee3] flex items-center justify-center text-[#c5a059]">
                    <SvgChart className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#161513] font-serif">
                    {formatPrice(totalTurnoverPro).value} <span className="text-xs font-sans text-[#161513]/60 font-normal">{formatPrice(totalTurnoverPro).symbol}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                    <span>↑ +18.4%</span>
                    <span className="text-[#161513]/40 font-light">vs trimestre précédent</span>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f0eae0] flex items-center justify-between text-[11px] text-[#161513]/55">
                  <span>Tarif public cumulé</span>
                  <span className="font-mono line-through">{formatPrice(totalTurnoverPublic).formatted}</span>
                </div>
              </div>

              {/* Metric 2: Économies Remise Pro */}
              <div className="p-6 rounded-2xl bg-[#161513] text-white border border-[#2b2925] shadow-xs relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059] font-medium">
                    Économie Nette Partenaire
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#c5a059]">
                    <SvgCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#c5a059] font-serif">
                    {formatPrice(totalSavings).value} <span className="text-xs font-sans text-white/70 font-normal">{formatPrice(totalSavings).symbol}</span>
                  </div>
                  <div className="text-xs text-white/70 font-light">
                    Gain direct sur vos achats matière
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/60">
                  <span>Taux de remise appliqué</span>
                  <span className="font-mono font-semibold text-white">-{Math.round(currentDiscount * 100)}%</span>
                </div>
              </div>

              {/* Metric 3: Métrage Façonné */}
              <div className="p-6 rounded-2xl bg-white border border-[#e5ded2] shadow-xs relative overflow-hidden group hover:border-[#c5a059] transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#161513]/50 font-medium">
                    Métrage Linéaire Total
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#f4eee3] flex items-center justify-center text-[#c5a059]">
                    <SvgSwatch className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#161513] font-serif">
                    {totalMeters.toLocaleString("fr-FR")} <span className="text-xs font-sans text-[#161513]/60 font-normal">mètres</span>
                  </div>
                  <div className="text-xs text-[#161513]/60 font-light">
                    Coupe et tombé sur-mesure
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f0eae0] flex items-center justify-between text-[11px] text-[#161513]/55">
                  <span>Laizes 140cm &amp; 300cm</span>
                  <span className="font-mono text-[#161513] font-medium">6 Chantiers</span>
                </div>
              </div>

              {/* Metric 4: Chantiers en cours */}
              <div className="p-6 rounded-2xl bg-white border border-[#e5ded2] shadow-xs relative overflow-hidden group hover:border-[#c5a059] transition-all">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#161513]/50 font-medium">
                    Chantiers en Confection
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#f4eee3] flex items-center justify-center text-[#c5a059]">
                    <SvgCalendar className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div className="mt-4 space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#161513] font-serif">
                    {activeProjectsCount} <span className="text-xs font-sans text-[#161513]/60 font-normal">actifs</span>
                  </div>
                  <div className="text-xs text-[#161513]/60 font-light">
                    Prochaine pose : 28 Octobre (Riad Atlas)
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-[#f0eae0] flex items-center justify-between text-[11px] text-[#161513]/55">
                  <span>Délais d&apos;atelier respectés</span>
                  <span className="font-mono text-emerald-700 font-semibold">100%</span>
                </div>
              </div>
            </div>

            {/* Split Section: Fabric Breakdown & Atelier Live Timeline Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 Cols: Textile Breakdown & Project Status Summary */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-[#e5ded2] space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-[#161513]">
                      Répartition Textile de vos Projets
                    </h3>
                    <p className="text-xs text-[#161513]/60">
                      Typologies d&apos;étoffes façonnées dans notre manufacture de Marrakech
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#c5a059] font-medium">Saison 2026</span>
                </div>

                {/* Progress bars */}
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span>Lin Lavé Lourd 420g &amp; Rideaux Wave</span>
                      <span className="font-mono text-[#161513]/70">38% (486 ml)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#f0eae0] overflow-hidden">
                      <div className="h-full bg-[#161513] rounded-full transition-all duration-1000" style={{ width: "38%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span>Voilages Céleste Grande Hauteur 320cm</span>
                      <span className="font-mono text-[#161513]/70">29% (371 ml)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#f0eae0] overflow-hidden">
                      <div className="h-full bg-[#c5a059] rounded-full transition-all duration-1000" style={{ width: "29%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span>Toiles Outdoor Suntech &amp; Daybeds Piscine</span>
                      <span className="font-mono text-[#161513]/70">21% (268 ml)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#f0eae0] overflow-hidden">
                      <div className="h-full bg-[#a39480] rounded-full transition-all duration-1000" style={{ width: "21%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1.5 font-medium">
                      <span>Velours d&apos;Apparat Koutoubia &amp; Banquettes M1</span>
                      <span className="font-mono text-[#161513]/70">12% (155 ml)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#f0eae0] overflow-hidden">
                      <div className="h-full bg-[#4a4742] rounded-full transition-all duration-1000" style={{ width: "12%" }} />
                    </div>
                  </div>
                </div>

                {/* Banner Guarantee */}
                <div className="p-4 rounded-xl bg-[#f7f3ec] border border-[#e7dfd2] flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#c5a059]/20 flex items-center justify-center text-[#c5a059] shrink-0">
                      <SvgCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="font-medium text-[#161513]">Contrôle Qualité &amp; Repassage Vapeur Vertical Atelier</strong>
                      <p className="text-[11px] text-[#161513]/60">Chaque pan de rideau est étuvé et testé sur tringle test avant expédition.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("atelier")}
                    className="underline hover:text-[#c5a059] whitespace-nowrap text-[11px] font-medium"
                  >
                    Voir l&apos;Atelier →
                  </button>
                </div>
              </div>

              {/* Right Col: Atelier Live Status Widget */}
              <div className="p-6 rounded-2xl bg-[#1f1e1b] text-white border border-[#302e29] space-y-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#c5a059]">Atelier Marrakech Direct</span>
                    </div>
                    <span className="text-[10px] text-white/50 font-mono">Ligne Ouverte</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    <h4 className="font-sans text-sm font-semibold text-[#faf8f5]">
                      Votre Référent Technique Dédié
                    </h4>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#35332d] border border-white/10 flex items-center justify-center text-[#c5a059] font-serif text-lg font-bold">
                        HF
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Hassan El Fassi</div>
                        <div className="text-[11px] text-white/60">Maître Tapissier &amp; Chef d&apos;Atelier</div>
                        <div className="text-[11px] text-[#c5a059] font-mono mt-0.5">+212 6 61 23 45 67</div>
                      </div>
                    </div>

                    <p className="text-xs text-white/70 leading-relaxed font-light pt-2">
                      Disponible du lundi au samedi pour vérifier vos calepinages, plans DWG et réservations de rouleaux prioritaires.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                  <a
                    href="https://wa.me/212661234567?text=Bonjour%20Hassan,%20j%27ai%20une%20question%20calepinage%20pour%20mon%20chantier"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-center text-xs font-medium tracking-wide flex items-center justify-center gap-2 transition-all"
                  >
                    <SvgWhatsApp className="w-4 h-4" />
                    <span>Contacter Hassan sur WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setActiveTab("toolbox")}
                    className="w-full py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-center text-xs font-medium tracking-wide transition-all"
                  >
                    Ouvrir le Calculateur de Métrage
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: PLANNING & JALONS CHANTIERS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "planning" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#e6dfd3]">
              <div>
                <h3 className="font-sans text-base font-semibold uppercase tracking-wider text-[#161513]">
                  Roadmap &amp; Calendrier de Pose des Chantiers
                </h3>
                <p className="text-xs text-[#161513]/65">
                  Suivez en direct l&apos;avancement étape par étape de chaque projet de votre agence.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddProjectOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161513] text-[#faf8f5] text-xs font-medium uppercase tracking-wide self-start sm:self-auto"
              >
                <SvgPlus className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Ajouter un Chantier</span>
              </button>
            </div>

            {/* Timeline Cards Grid */}
            <div className="space-y-4">
              {projects.map((proj) => {
                const isFinished = proj.status === "POSE";
                const isShipped = proj.status === "EXPEDIE";
                const isCrafting = proj.status === "CONFECTION";

                return (
                  <div
                    key={proj.id}
                    className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e5ded2] hover:border-[#c5a059] transition-all shadow-xs space-y-4"
                  >
                    {/* Top Row: Ref, Title, Status & Target Date */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-[#f4eee3] text-[#161513] border border-[#e5ddce]">
                          {proj.ref}
                        </span>
                        <div>
                          <h4 className="font-sans text-sm sm:text-base font-semibold text-[#161513]">
                            {proj.name}
                          </h4>
                          <span className="text-xs text-[#161513]/60">
                            {proj.location} · {proj.type}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase ${
                            isFinished
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : isShipped
                              ? "bg-blue-100 text-blue-800 border border-blue-300"
                              : isCrafting
                              ? "bg-amber-100 text-amber-900 border border-amber-300"
                              : "bg-gray-100 text-gray-800 border border-gray-300"
                          }`}
                        >
                          {proj.status === "POSE"
                            ? "Posé & Réceptionné"
                            : proj.status === "EXPEDIE"
                            ? "Expédié / En Transit"
                            : proj.status === "CONFECTION"
                            ? "En Confection Atelier"
                            : "Étude & Calepinage"}
                        </span>
                        <div className="text-right">
                          <span className="text-[10px] text-[#161513]/45 block uppercase font-mono">Date Cible</span>
                          <span className="text-xs font-semibold text-[#161513] font-mono">{proj.deadline}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar & Stages */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-[#161513]/70">Niveau d&apos;avancement confection</span>
                        <span className="font-mono text-[#c5a059] font-bold">{proj.progressPct}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#f0eae0] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#c5a059] to-[#161513]"
                          style={{ width: `${proj.progressPct}%` }}
                        />
                      </div>
                    </div>

                    {/* Stepper Indicators */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px]">
                      <div className={`p-2 rounded-lg border ${proj.progressPct >= 20 ? "bg-[#f4efe5] border-[#d8cdb8] text-[#161513]" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
                        <div className="font-semibold">1. Prise de côtes &amp; Plan</div>
                        <div className="text-[10px] text-[#161513]/55">Validation calepinage</div>
                      </div>
                      <div className={`p-2 rounded-lg border ${proj.progressPct >= 40 ? "bg-[#f4efe5] border-[#d8cdb8] text-[#161513]" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
                        <div className="font-semibold">2. Coupe &amp; Assemblage</div>
                        <div className="text-[10px] text-[#161513]/55">Rouleaux lin &amp; voilage</div>
                      </div>
                      <div className={`p-2 rounded-lg border ${proj.progressPct >= 75 ? "bg-[#f4efe5] border-[#d8cdb8] text-[#161513]" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
                        <div className="font-semibold">3. Têtes &amp; Repassage</div>
                        <div className="text-[10px] text-[#161513]/55">Étuve verticale vapeur</div>
                      </div>
                      <div className={`p-2 rounded-lg border ${proj.progressPct >= 100 ? "bg-emerald-50 border-emerald-300 text-emerald-900" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
                        <div className="font-semibold">4. Pose In-Situ</div>
                        <div className="text-[10px] text-[#161513]/55">Réception sans réserve</div>
                      </div>
                    </div>

                    {/* Bottom Details & Actions */}
                    <div className="pt-3 border-t border-[#f0eae0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="text-[#161513]/70 font-light truncate max-w-xl">
                        <strong>Détails :</strong> {proj.items.join(" · ")}
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                        <button
                          type="button"
                          onClick={() => setSelectedProjectModal(proj)}
                          className="px-3 py-1.5 rounded-full border border-[#dcd4c5] hover:border-[#161513] text-[#161513] font-medium transition-colors cursor-pointer"
                        >
                          Fiche Chantier
                        </button>
                        <a
                          href={`https://wa.me/212661234567?text=Bonjour%20Atelier,%20suivi%20du%20projet%20${encodeURIComponent(proj.ref)}%20(${encodeURIComponent(proj.name)})`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-medium flex items-center gap-1.5 transition-colors"
                        >
                          <SvgWhatsApp className="w-3 h-3" />
                          <span>Point d&apos;Étape</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: ORDERS & DEVIS INTERACTIVE DATA TABLE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "orders" && (
          <div className="space-y-5 animate-fadeIn">
            {/* Header controls: Search & Status Pills & CSV Export */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pb-3 border-b border-[#e6dfd3]">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <SvgSearch className="w-4 h-4 text-[#161513]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par référence, chantier, tissu ou ville..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#dcd4c5] focus:border-[#161513] text-xs outline-none transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#161513]/40 hover:text-[#161513]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Status Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { key: "ALL", label: "Tous" },
                  { key: "DEVIS", label: "En Étude / Devis" },
                  { key: "CONFECTION", label: "En Confection" },
                  { key: "EXPEDIE", label: "Expédié" },
                  { key: "POSE", label: "Posé & Clôturé" },
                ].map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => setSelectedStatusFilter(st.key)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      selectedStatusFilter === st.key
                        ? "bg-[#161513] text-white"
                        : "bg-white border border-[#dcd4c5] text-[#161513]/70 hover:text-[#161513]"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="px-3.5 py-1.5 rounded-full bg-[#f4eee3] hover:bg-[#eae1d2] border border-[#ded5c3] text-[#161513] text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors ml-2"
                  title="Télécharger l'historique complet en fichier CSV"
                >
                  <SvgDownload className="w-3.5 h-3.5 text-[#161513]/70" />
                  <span>Export Excel / CSV</span>
                </button>
              </div>
            </div>

            {/* The Main High-End Data Table */}
            <div className="rounded-2xl bg-white border border-[#e5ded2] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f7f3ec] border-b border-[#e5ded2] text-[10px] font-mono uppercase tracking-wider text-[#161513]/60">
                      <th className="py-3.5 px-4 font-semibold">Réf &amp; Date</th>
                      <th className="py-3.5 px-4 font-semibold">Chantier &amp; Client</th>
                      <th className="py-3.5 px-4 font-semibold">Métrage (ml)</th>
                      <th className="py-3.5 px-4 font-semibold">Tarif Public HT</th>
                      <th className="py-3.5 px-4 font-semibold">Tarif Pro Net HT</th>
                      <th className="py-3.5 px-4 font-semibold">Économie Nette</th>
                      <th className="py-3.5 px-4 font-semibold">Statut Confection</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0eae0] text-xs font-sans">
                    {filteredProjects.map((p) => {
                      const netSavings = p.publicPriceHT - p.proPriceHT;

                      return (
                        <tr key={p.id} className="hover:bg-[#faf7f2] transition-colors group">
                          {/* Réf & Date */}
                          <td className="py-4 px-4 font-mono">
                            <span className="font-semibold text-[#161513] block">{p.ref}</span>
                            <span className="text-[10px] text-[#161513]/45">{p.deadline}</span>
                          </td>

                          {/* Chantier & Client */}
                          <td className="py-4 px-4">
                            <span className="font-semibold text-[#161513] block group-hover:text-[#c5a059] transition-colors">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-[#161513]/60 block truncate max-w-xs">
                              {p.location} · {p.type}
                            </span>
                          </td>

                          {/* Métrage */}
                          <td className="py-4 px-4 font-mono font-medium text-[#161513]">
                            {p.meters} ml
                          </td>

                          {/* Tarif Public HT */}
                          <td className="py-4 px-4 font-mono text-[#161513]/50 line-through">
                            {formatPrice(p.publicPriceHT).formatted}
                          </td>

                          {/* Tarif Pro Net HT */}
                          <td className="py-4 px-4 font-mono font-bold text-[#161513]">
                            {formatPrice(p.proPriceHT).formatted}
                          </td>

                          {/* Économie Nette */}
                          <td className="py-4 px-4 font-mono font-semibold text-[#c5a059]">
                            +{formatPrice(netSavings).formatted}
                          </td>

                          {/* Statut Badge */}
                          <td className="py-4 px-4">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide uppercase ${
                                p.status === "POSE"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : p.status === "EXPEDIE"
                                  ? "bg-blue-100 text-blue-800"
                                  : p.status === "CONFECTION"
                                  ? "bg-amber-100 text-amber-900"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  p.status === "POSE"
                                    ? "bg-emerald-500"
                                    : p.status === "EXPEDIE"
                                    ? "bg-blue-500"
                                    : p.status === "CONFECTION"
                                    ? "bg-amber-500 animate-pulse"
                                    : "bg-gray-400"
                                }`}
                              />
                              <span>
                                {p.status === "POSE"
                                  ? "Posé"
                                  : p.status === "EXPEDIE"
                                  ? "Expédié"
                                  : p.status === "CONFECTION"
                                  ? "Confection"
                                  : "Devis"}
                              </span>
                            </span>
                          </td>

                          {/* Action Buttons */}
                          <td className="py-4 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedProjectModal(p)}
                                className="px-2.5 py-1 rounded-md bg-[#f4eee3] hover:bg-[#eae1d2] text-[#161513] text-[11px] font-medium transition-colors"
                                title="Voir le calepinage et le détail de ce devis"
                              >
                                Détails
                              </button>
                              <a
                                href={`https://wa.me/212661234567?text=Bonjour%20Atelier,%20suivi%20du%20devis%20${encodeURIComponent(p.ref)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded-md text-[#161513]/60 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                                title="Poser une question sur WhatsApp"
                              >
                                <SvgWhatsApp className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer Totals */}
              <div className="bg-[#f7f3ec] p-4 border-t border-[#e5ded2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-[#161513]/60">
                  Affichage de <strong>{filteredProjects.length}</strong> chantiers et devis professionnels
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[#161513]/60">
                    Total Chiffré HT : <strong className="text-[#161513]">{formatPrice(totalTurnoverPro).formatted}</strong>
                  </span>
                  <span className="font-mono text-[#c5a059] font-bold">
                    Économie Nette Partenaire : {formatPrice(totalSavings).formatted}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: B2B TOOLBOX (YARDAGE CALCULATOR & MARKUP SIMULATOR) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "toolbox" && (
          <div className="space-y-8 animate-fadeIn">
            <div>
              <h3 className="font-sans text-base font-semibold uppercase tracking-wider text-[#161513]">
                Boîte à Outils Techniques Kansotex
              </h3>
              <p className="text-xs text-[#161513]/65">
                Calculs de métrage sur-mesure, gestion de marges agence et consultation directe des stocks rouleaux à l&apos;atelier de Marrakech.
              </p>
            </div>

            {/* Tool 1: Advanced Curtain Yardage & Headings Calculator */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e5ded2] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0eae0]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f4eee3] flex items-center justify-center text-[#c5a059]">
                    <SvgCalculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-semibold text-[#161513]">
                      Calculateur de Métrage Draperie &amp; Tombé
                    </h4>
                    <p className="text-xs text-[#161513]/60">
                      Ratios professionnels selon le style de tête, le coefficient d&apos;ampleur et la laize du tissu.
                    </p>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-medium px-3 py-1 rounded-full bg-[#f4eee3] text-[#161513] self-start sm:self-auto">
                  Algorithme Atelier Kansotex
                </span>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Width */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                    Largeur de Tringle / Rail (cm)
                  </label>
                  <input
                    type="number"
                    value={calcWidth}
                    onChange={(e) => setCalcWidth(Math.max(50, parseInt(e.target.value, 10) || 50))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd4c5] bg-[#faf8f5] text-sm font-mono font-semibold text-[#161513] outline-none focus:border-[#161513]"
                  />
                  <span className="text-[10px] text-[#161513]/45 block">Ex: 320 cm pour baie vitrée standard</span>
                </div>

                {/* Height */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                    Hauteur sous plafond / tringle (cm)
                  </label>
                  <input
                    type="number"
                    value={calcHeight}
                    onChange={(e) => setCalcHeight(Math.max(100, parseInt(e.target.value, 10) || 100))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd4c5] bg-[#faf8f5] text-sm font-mono font-semibold text-[#161513] outline-none focus:border-[#161513]"
                  />
                  <span className="text-[10px] text-[#161513]/45 block">+35 cm ajoutés automatiquement pour les ourlets</span>
                </div>

                {/* Heading Type */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                    Tête de Rideau &amp; Ampleur
                  </label>
                  <select
                    value={calcHeading}
                    onChange={(e) => setCalcHeading(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd4c5] bg-[#faf8f5] text-xs font-semibold text-[#161513] outline-none focus:border-[#161513] cursor-pointer"
                  >
                    <option value="wave">Plis Vagues / Wave (Ampleur 2.0x)</option>
                    <option value="flamand">Plis Flamands Doubles (Ampleur 2.2x)</option>
                    <option value="simple">Plis Simples Tapissier (Ampleur 1.8x)</option>
                    <option value="plisse">Plissé Standard Froncé (Ampleur 1.5x)</option>
                  </select>
                  <span className="text-[10px] text-[#161513]/45 block">Multiplicateur de tissu sur rail</span>
                </div>

                {/* Fabric Laize */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                    Laize du Tissu Choisi
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCalcLaize(300)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        calcLaize === 300
                          ? "bg-[#161513] text-white border-[#161513]"
                          : "bg-[#faf8f5] border-[#dcd4c5] text-[#161513]/70"
                      }`}
                    >
                      300cm (Grande Largeur)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCalcLaize(140)}
                      className={`py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                        calcLaize === 140
                          ? "bg-[#161513] text-white border-[#161513]"
                          : "bg-[#faf8f5] border-[#dcd4c5] text-[#161513]/70"
                      }`}
                    >
                      140cm (Standard)
                    </button>
                  </div>
                  <span className="text-[10px] text-[#161513]/45 block">
                    {calcLaize === 300 ? "Pose sans raccord vertical" : "Assemblage par lés verticaux"}
                  </span>
                </div>

                {/* Lining Option */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                    Doublure d&apos;Atelier
                  </label>
                  <select
                    value={calcLining}
                    onChange={(e) => setCalcLining(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd4c5] bg-[#faf8f5] text-xs font-semibold text-[#161513] outline-none focus:border-[#161513] cursor-pointer"
                  >
                    <option value="none">Sans doublure (Voilage / Léger)</option>
                    <option value="satinette">Doublure Satinette Coton (+110 MAD/ml)</option>
                    <option value="blackout">Doublure Occultante 100% (+180 MAD/ml)</option>
                  </select>
                  <span className="text-[10px] text-[#161513]/45 block">Protège le tissu du soleil et crée un tombé lourd</span>
                </div>

                {/* Fabric Public Unit Price */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                    Prix Public Tissu (MAD/m)
                  </label>
                  <input
                    type="number"
                    value={calcFabricPricePerM}
                    onChange={(e) => setCalcFabricPricePerM(Math.max(100, parseInt(e.target.value, 10) || 100))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd4c5] bg-[#faf8f5] text-sm font-mono font-semibold text-[#161513] outline-none focus:border-[#161513]"
                  />
                  <span className="text-[10px] text-[#c5a059] block font-mono font-medium">
                    Votre Tarif Pro Net : {Math.round(calcFabricPricePerM * (1 - currentDiscount))} MAD/m
                  </span>
                </div>
              </div>

              {/* Real-time Calculation Result Box */}
              <div className="p-6 rounded-2xl bg-[#161513] text-white border border-[#2b2925] grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">
                    Métrage Linéaire Recommandé
                  </span>
                  <div className="text-3xl font-bold font-serif text-[#c5a059]">
                    {calculatedYardage.linearMetersNeeded} <span className="text-sm font-sans font-normal text-white/80">mètres</span>
                  </div>
                  <span className="text-xs text-white/60 block mt-1">
                    Découpé en {calculatedYardage.numberOfBreaths} pans de rideaux finis
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">
                    Estimation Confection &amp; Matière Pro HT
                  </span>
                  <div className="text-3xl font-bold font-serif text-white">
                    {formatPrice(calculatedYardage.totalEstimateProHT).value}{" "}
                    <span className="text-sm font-sans font-normal text-white/70">{formatPrice(calculatedYardage.totalEstimateProHT).symbol}</span>
                  </div>
                  <span className="text-xs text-[#c5a059] block mt-1 font-mono">
                    Économie Pro : +{formatPrice(calculatedYardage.savingsHT).formatted}
                  </span>
                </div>

                <div className="flex flex-col justify-center items-start sm:items-end">
                  <Link
                    href={`/devis?meters=${calculatedYardage.linearMetersNeeded}&heading=${calcHeading}`}
                    className="px-5 py-2.5 rounded-full bg-[#c5a059] text-[#161513] hover:bg-[#d9b873] text-xs font-semibold uppercase tracking-wider transition-all"
                  >
                    Envoyer au Bureau d&apos;Études →
                  </Link>
                  <span className="text-[10px] text-white/45 mt-2 text-right">
                    Devis officiel chiffré sous 24h avec plan de coupe
                  </span>
                </div>
              </div>
            </div>

            {/* Tool 2: Agency Markup & Margin Simulator */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e5ded2] shadow-xs space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-[#f0eae0]">
                <div className="w-9 h-9 rounded-full bg-[#f4eee3] flex items-center justify-center text-[#c5a059]">
                  <SvgChart className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-base font-semibold text-[#161513]">
                    Simulateur de Marge &amp; Rétrocession Agence
                  </h4>
                  <p className="text-xs text-[#161513]/60">
                    Fixez vos honoraires ou votre coefficient de revente pour présenter une offre globale transparente à votre client final.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                      Prix d&apos;Achat Kansotex Pro Net HT (MAD)
                    </label>
                    <input
                      type="number"
                      value={markupPurchaseCostHT}
                      onChange={(e) => setMarkupPurchaseCostHT(Math.max(1000, parseInt(e.target.value, 10) || 1000))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#dcd4c5] bg-[#faf8f5] text-sm font-mono font-semibold text-[#161513] outline-none focus:border-[#161513]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                      <span>Marge Agence Appliquée</span>
                      <span className="text-[#c5a059] font-bold">+{markupMarginPct}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={60}
                      step={5}
                      value={markupMarginPct}
                      onChange={(e) => setMarkupMarginPct(parseInt(e.target.value, 10))}
                      className="w-full accent-[#161513] cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#161513]/40 font-mono">
                      <span>10% (Étroite)</span>
                      <span>35% (Standard Agence)</span>
                      <span>60% (Prestige)</span>
                    </div>
                  </div>
                </div>

                {/* Result Columns */}
                <div className="p-5 rounded-xl bg-[#faf7f2] border border-[#e5ded2] space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#161513]/50 block">
                    Bénéfice Net Agence Généré
                  </span>
                  <div className="text-2xl font-serif font-bold text-emerald-800">
                    +{formatPrice(calculatedAgencyMargin.agencyGrossProfit).formatted}
                  </div>
                  <p className="text-xs text-[#161513]/60 leading-relaxed">
                    Honoraires de prescription et coordination de chantier conservés par votre cabinet.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#161513] text-white border border-[#2b2925] space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#c5a059] block">
                    Prix Conseillé Client Final TTC
                  </span>
                  <div className="text-2xl font-serif font-bold text-white">
                    {formatPrice(calculatedAgencyMargin.clientPriceTTC).formatted}
                  </div>
                  <div className="text-xs text-white/60 space-y-1 pt-1 border-t border-white/10 font-mono">
                    <div className="flex justify-between">
                      <span>Prix Agence HT :</span>
                      <span>{formatPrice(calculatedAgencyMargin.agencySellingPriceHT).formatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TVA ({markupVatPct}%) :</span>
                      <span>{formatPrice(calculatedAgencyMargin.clientPriceTTC - calculatedAgencyMargin.agencySellingPriceHT).formatted}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tool 3: Direct Workshop Rolls Stock Consultation */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#e5ded2] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#f0eae0]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#f4eee3] flex items-center justify-center text-[#c5a059]">
                    <SvgSwatch className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans text-base font-semibold text-[#161513]">
                      Consultation des Stocks Rouleaux en Atelier
                    </h4>
                    <p className="text-xs text-[#161513]/60">
                      Disponibilités physiques immédiates pour livraison express sous 24h à Marrakech et 48h à Casablanca / Rabat.
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">
                  Synchronisé en direct
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ATELIER_STOCKS.map((stk) => (
                  <div
                    key={stk.ref}
                    className="p-4 rounded-xl border border-[#e5ded2] hover:border-[#c5a059] transition-all bg-[#faf8f5] space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono text-[#161513]/50 uppercase">{stk.ref}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                        {stk.status}
                      </span>
                    </div>
                    <h5 className="font-sans text-sm font-semibold text-[#161513]">
                      {stk.name}
                    </h5>
                    <div className="pt-2 border-t border-[#ede7dc] flex items-center justify-between text-xs font-mono">
                      <span className="text-[#161513]/60">Laize : {stk.laize}</span>
                      <strong className="text-[#161513]">{stk.availableMeters} ml dispo</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: SWATCHES & SAMPLE KITS ORDER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "swatches" && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <h3 className="font-sans text-base font-semibold uppercase tracking-wider text-[#161513]">
                Commande de Nuanciers &amp; Coffrets Échantillons
              </h3>
              <p className="text-xs text-[#161513]/65">
                Recevez directement à votre cabinet nos coffrets de matières réelles (format 20x20cm avec fiches techniques et certificats M1).
              </p>
            </div>

            {swatchSentNotice && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SvgCheck className="w-4 h-4 text-emerald-600" />
                  <span>{swatchSentNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSwatchSentNotice(null)}
                  className="text-emerald-700 hover:text-emerald-950 font-bold"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: "pack-lin",
                  title: "Coffret Lins Purs & Voilages Hôtellerie",
                  desc: "14 échantillons de lin lavé lourd 420g, voilage lin grande largeur 320cm et toiles de métis. Idéal pour villas et riads.",
                  tag: "Le Plus Demandé",
                },
                {
                  id: "pack-outdoor",
                  title: "Nuancier Plein Air & Suntech Piscine",
                  desc: "12 toiles déperlantes, anti-taches et traitées anti-UV pour pergolas, transats, coussins d'extérieur et banquettes rooftop.",
                  tag: "Résistance UV 1500h",
                },
                {
                  id: "pack-velours",
                  title: "Mallette Velours d'Apparat & Jacquards",
                  desc: "Échantillons velours texturé côtelé, velours lisse mat antitache et jacquards géométriques d'inspiration marocaine contemporaine.",
                  tag: "Classé Non-Feu M1",
                },
              ].map((pack) => (
                <div
                  key={pack.id}
                  className="p-6 rounded-2xl bg-white border border-[#e5ded2] hover:border-[#c5a059] transition-all shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold bg-[#f4eee3] text-[#c5a059]">
                      {pack.tag}
                    </span>
                    <h4 className="font-sans text-base font-semibold text-[#161513]">
                      {pack.title}
                    </h4>
                    <p className="text-xs text-[#161513]/65 leading-relaxed">
                      {pack.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#f0eae0] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-mono text-[#161513]/50 block">Expédition Express</span>
                      <span className="text-xs font-semibold text-emerald-800">Offert aux Partenaires</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSwatchSentNotice(`Votre demande pour le "${pack.title}" a bien été transmise à notre atelier. Expédition sous 24h à l'adresse de votre agence.`)}
                      className="px-4 py-2 rounded-full bg-[#161513] hover:bg-[#2b2925] text-white text-xs font-medium tracking-wide transition-all"
                    >
                      Commander (Gratuit)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 6: ATELIER & BUREAU D'ETUDES */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "atelier" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-8 rounded-2xl bg-white border border-[#e5ded2] shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#f0eae0]">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#c5a059] font-bold">
                    CIRCUIT COURT MANUFACTURE DIRECTE
                  </span>
                  <h3 className="font-sans text-xl font-bold uppercase tracking-wide text-[#161513] mt-1">
                    Atelier de Confection Kansotex — Sidi Ghanem Marrakech
                  </h3>
                  <p className="text-xs text-[#161513]/65 mt-1 max-w-2xl">
                    Notre manufacture intègre l&apos;ensemble de la chaîne textile : bureau d&apos;études de calepinage, coupe assistée, confection tapissière sur-mesure et assistance à la pose sur vos chantiers.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#e5ded2] text-xs font-mono space-y-1 self-start sm:self-auto">
                  <div><strong>Horaires :</strong> Lun - Sam : 08h30 - 18h30</div>
                  <div><strong>Zone :</strong> Sidi Ghanem, Marrakech</div>
                </div>
              </div>

              {/* Atelier Team Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#faf7f2] border border-[#e5ded2] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#161513] text-[#c5a059] flex items-center justify-center font-serif font-bold text-lg">
                      HF
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-[#161513]">Hassan El Fassi</h4>
                      <p className="text-xs text-[#161513]/60">Maître Tapissier &amp; Responsable Confection</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#161513]/70 leading-relaxed font-light">
                    Supervise la coupe au millimètre, l&apos;alignement des motifs jacquard et les tombés de draperie grande hauteur.
                  </p>
                  <div className="pt-2 border-t border-[#ede7dc] flex items-center justify-between text-xs">
                    <span className="font-mono text-[#161513]/60">+212 6 61 23 45 67</span>
                    <a
                      href="https://wa.me/212661234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-medium hover:underline flex items-center gap-1"
                    >
                      <SvgWhatsApp className="w-3.5 h-3.5" />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#faf7f2] border border-[#e5ded2] space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#161513] text-[#c5a059] flex items-center justify-center font-serif font-bold text-lg">
                      NB
                    </div>
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-[#161513]">Nadia Berrada</h4>
                      <p className="text-xs text-[#161513]/60">Ingénieur Textile &amp; Prescription Pro</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#161513]/70 leading-relaxed font-light">
                    En charge des fiches techniques, certifications ignifuges non-feu M1 et relevés de côtes in situ pour architectes.
                  </p>
                  <div className="pt-2 border-t border-[#ede7dc] flex items-center justify-between text-xs">
                    <span className="font-mono text-[#161513]/60">bureau-etudes@kansotex.com</span>
                    <a
                      href="mailto:bureau-etudes@kansotex.com"
                      className="text-[#161513] font-medium hover:underline"
                    >
                      Envoyer vos Plans DWG
                    </a>
                  </div>
                </div>
              </div>

              {/* Guarantees Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#f0eae0]">
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#161513] block">Contrôle d&apos;Étuve Verticale</span>
                  <p className="text-[11px] text-[#161513]/60">Chaque rideau est repassé suspendu sur tringle pour fixer le plissé naturel.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#161513] block">Conditionnement Sous Housse</span>
                  <p className="text-[11px] text-[#161513]/60">Livraison sur cintre dédié évitant tout froissement avant l&apos;accrochage sur site.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-semibold text-[#161513] block">Garantie Atelier 5 Ans</span>
                  <p className="text-[11px] text-[#161513]/60">Coutures renforcées au fil haute ténacité résistant aux tractions répétées.</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ============================================================ */}
      {/* 6. MODAL: FICHE CHANTIER / DETAILS DU PROJET */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProjectModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#ded5c5] p-6 sm:p-8 z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-[#f0eae0] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#f4eee3] text-[#161513]">
                      {selectedProjectModal.ref}
                    </span>
                    <span className="text-xs text-[#161513]/60">{selectedProjectModal.location}</span>
                  </div>
                  <h3 className="font-sans text-lg font-bold text-[#161513] mt-1">
                    {selectedProjectModal.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Project Info Columns */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#e5ded2]">
                  <span className="text-[10px] uppercase font-mono text-[#161513]/50 block">Métrage Confection</span>
                  <span className="font-semibold text-sm font-mono text-[#161513]">{selectedProjectModal.meters} ml</span>
                </div>
                <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#e5ded2]">
                  <span className="text-[10px] uppercase font-mono text-[#161513]/50 block">Tarif Pro Net HT</span>
                  <span className="font-semibold text-sm font-mono text-[#161513]">{formatPrice(selectedProjectModal.proPriceHT).formatted}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#e5ded2]">
                  <span className="text-[10px] uppercase font-mono text-[#161513]/50 block">Économie Partenaire</span>
                  <span className="font-semibold text-sm font-mono text-[#c5a059]">+{formatPrice(selectedProjectModal.publicPriceHT - selectedProjectModal.proPriceHT).formatted}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#faf7f2] border border-[#e5ded2]">
                  <span className="text-[10px] uppercase font-mono text-[#161513]/50 block">Date de Pose</span>
                  <span className="font-semibold text-sm font-mono text-[#161513]">{selectedProjectModal.deadline}</span>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                  Calepinage &amp; Prestations Spécifiées
                </h4>
                <ul className="space-y-1.5 text-xs text-[#161513]">
                  {selectedProjectModal.items.map((it, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-[#faf7f2] border border-[#f0eae0] flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notes */}
              {selectedProjectModal.notes && (
                <div className="p-3 rounded-xl bg-[#f4eee3] border border-[#ded5c5] text-xs text-[#161513]/80">
                  <strong>Notes d&apos;atelier :</strong> {selectedProjectModal.notes}
                </div>
              )}

              {/* Actions Footer */}
              <div className="pt-4 border-t border-[#f0eae0] flex items-center justify-between">
                <a
                  href={`https://wa.me/212661234567?text=Bonjour%20Atelier,%20suivi%20du%20projet%20${encodeURIComponent(selectedProjectModal.ref)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium transition-colors"
                >
                  <SvgWhatsApp className="w-3.5 h-3.5" />
                  <span>Joindre l&apos;Atelier sur WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(null)}
                  className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-medium text-gray-800 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 7. MODAL: PLANIFIER UN NOUVEAU CHANTIER */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isAddProjectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddProjectOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#ded5c5] p-6 sm:p-8 z-10 space-y-5"
            >
              <div className="flex items-start justify-between border-b border-[#f0eae0] pb-3">
                <div>
                  <h3 className="font-sans text-base font-bold uppercase tracking-wide text-[#161513]">
                    Planifier un Nouveau Chantier
                  </h3>
                  <p className="text-xs text-[#161513]/60">
                    Enregistrez votre projet pour réserver les métrages de rouleaux prioritaires à l&apos;atelier.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                    Nom du Chantier / Projet *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProjectForm.name}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                    placeholder="Ex: Riad Dar Yasmine, Villa Majorelle..."
                    className="w-full px-3 py-2 rounded-xl border border-[#dcd4c5] outline-none focus:border-[#161513]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                      Localisation *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProjectForm.location}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, location: e.target.value })}
                      placeholder="Marrakech, Casablanca..."
                      className="w-full px-3 py-2 rounded-xl border border-[#dcd4c5] outline-none focus:border-[#161513]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                      Type de Bâtiment
                    </label>
                    <select
                      value={newProjectForm.type}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#dcd4c5] outline-none focus:border-[#161513]"
                    >
                      <option value="Hôtellerie / Riad">Hôtellerie / Riad</option>
                      <option value="Villa de Prestige">Villa de Prestige</option>
                      <option value="Restaurant / Lounge">Restaurant / Lounge</option>
                      <option value="Appartement / Penthouse">Appartement / Penthouse</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                      Métrage Estimé (ml)
                    </label>
                    <input
                      type="number"
                      required
                      value={newProjectForm.meters}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, meters: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#dcd4c5] outline-none focus:border-[#161513] font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                      Date de Pose Cible *
                    </label>
                    <input
                      type="text"
                      required
                      value={newProjectForm.deadline}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, deadline: e.target.value })}
                      placeholder="Ex: 15 Décembre 2026"
                      className="w-full px-3 py-2 rounded-xl border border-[#dcd4c5] outline-none focus:border-[#161513]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-[#161513]/70 font-semibold">
                    Description des Confections
                  </label>
                  <textarea
                    rows={2}
                    value={newProjectForm.notes}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, notes: e.target.value })}
                    placeholder="Rideaux wave lin lavé, voilages 5m, banquettes outdoor..."
                    className="w-full px-3 py-2 rounded-xl border border-[#dcd4c5] outline-none focus:border-[#161513]"
                  />
                </div>

                <div className="pt-3 border-t border-[#f0eae0] flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddProjectOpen(false)}
                    className="flex-1 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-[#161513] font-medium transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-full bg-[#161513] hover:bg-[#2b2925] text-white font-medium transition-colors"
                  >
                    Valider le Chantier
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 8. MODAL: EXPORT RAPPORT D'ACTIVITÉ PRO PDF */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReportModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#ded5c5] p-6 sm:p-8 z-10 space-y-5"
            >
              <div className="flex items-start justify-between border-b border-[#f0eae0] pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f4eee3] flex items-center justify-center text-[#c5a059]">
                    <SvgDownload className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-sans text-base font-bold text-[#161513]">
                      Rapport d&apos;Activité Trimestriel Pro
                    </h3>
                    <p className="text-xs text-[#161513]/60">
                      Génération du document comptable et récapitulatif pour votre cabinet.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Simulated Document Preview */}
              <div className="p-4 rounded-xl bg-[#faf7f2] border border-[#e5ded2] text-xs font-mono space-y-2 text-[#161513]">
                <div className="flex justify-between border-b border-[#e5ded2] pb-2">
                  <span>Cabinet :</span>
                  <strong>{companyName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Période :</span>
                  <span>Année 2026 (Tous chantiers)</span>
                </div>
                <div className="flex justify-between">
                  <span>Métrage Façonné :</span>
                  <strong>{totalMeters} mètres linéaires</strong>
                </div>
                <div className="flex justify-between">
                  <span>Volume Facturé HT :</span>
                  <strong>{formatPrice(totalTurnoverPro).formatted}</strong>
                </div>
                <div className="flex justify-between text-emerald-800">
                  <span>Économie Éditeur B2B :</span>
                  <strong>+{formatPrice(totalSavings).formatted} (-{Math.round(currentDiscount * 100)}%)</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f0eae0] flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleExportCSV();
                    setIsReportModalOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-white border border-[#dcd4c5] hover:border-[#161513] text-[#161513] text-xs font-medium transition-colors"
                >
                  Télécharger CSV / Excel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.print();
                    setIsReportModalOpen(false);
                  }}
                  className="flex-1 py-2.5 rounded-full bg-[#161513] hover:bg-[#2b2925] text-white text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <SvgDownload className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Imprimer en PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
