"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useCurrency, type CurrencyCode } from "@/lib/CurrencyContext";
import { loginAsPro, type SessionData } from "@/lib/session";
import { LuxuryMenuOverlay } from "@/components/LuxuryMenuOverlay";
import { NavbarRightActions } from "@/components/NavbarRightActions";
import { motion, AnimatePresence } from "framer-motion";

// Architectural SVG Icons (Strictly NO emojis)
function IconLayers({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function IconCalendar({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function IconTable({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M3 14h18m-9-4v8m-7 4h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function IconCalculator({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function IconSwatch({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  );
}

function IconAtelier({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function IconDownload({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );
}

function IconSearch({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function IconPlus({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconWhatsApp({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.074-2.127-.518-1.708-.707-2.812-2.454-2.898-2.568-.083-.114-.694-.925-.694-1.763 0-.839.435-1.252.59-1.425.156-.173.341-.216.455-.216.113 0 .227.002.326.007.104.005.244-.04.382.291.144.347.491 1.2.534 1.287.043.087.072.188.014.303-.058.116-.087.188-.173.289l-.26.303c-.087.088-.178.183-.077.357.101.174.45 0.744.965 1.204.664.592 1.224.775 1.397.862.173.087.275.073.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087s1.011.477 1.184.564c.174.087.289.13.332.203.044.072.044.419-.1 0.824z" />
    </svg>
  );
}

function IconTrendingUp({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function IconInvoice({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function IconPrinter({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  );
}

// B2B Project & Invoice Interface
export interface B2BProject {
  id: string;
  ref: string;
  invoiceRef: string;
  name: string;
  location: string;
  type: string;
  meters: number;
  publicPriceEur: number; // Base in EUR so multi-currency works smoothly
  status: "DEVIS" | "CONFECTION" | "EXPEDIE" | "POSE";
  invoiceStatus: "PAID" | "DEPOSIT_50" | "PENDING";
  progressPct: number;
  deadline: string;
  invoiceDate: string;
  items: string[];
  notes: string;
}

// Realistic luxury Moroccan projects (base in EUR)
const INITIAL_PROJECTS: B2BProject[] = [
  {
    id: "1",
    ref: "KTX-2026-042",
    invoiceRef: "FA-2026-0042",
    name: "Riad Dar Al Atlas — Suites Royales & Patio",
    location: "Médina, Marrakech",
    type: "Hôtellerie de Caractère",
    meters: 180,
    publicPriceEur: 7800, // ~84,600 MAD
    status: "CONFECTION",
    invoiceStatus: "DEPOSIT_50",
    progressPct: 75,
    deadline: "28 Octobre 2026",
    invoiceDate: "12 Octobre 2026",
    items: [
      "12 pans Rideaux Wave grande hauteur 4.80m en Lin Lavé Blanc Craie",
      "8 banquettes marocaines modernes velours ocre côtelé antitache",
      "Voilages filtrants lin brut pour loggias du patio intérieur",
    ],
    notes: "Tringles motorisées Somfy encastrées en gorge. Têtes plis vagues 2.0x.",
  },
  {
    id: "2",
    ref: "KTX-2026-039",
    invoiceRef: "FA-2026-0039",
    name: "Villa Palmeraie — Pavillon Invités & Piscine",
    location: "Palmeraie, Marrakech",
    type: "Résidence Privée de Prestige",
    meters: 135,
    publicPriceEur: 5900, // ~64,000 MAD
    status: "CONFECTION",
    invoiceStatus: "DEPOSIT_50",
    progressPct: 40,
    deadline: "12 Novembre 2026",
    invoiceDate: "05 Octobre 2026",
    items: [
      "Voilages grande largeur 300cm Lin Céleste pour baies vitrées 6m",
      "40m Toile Suntech Outdoor déperlante pour daybeds piscine",
      "Coussins d'ornement lin lavé 420g confectionnés sur-mesure",
    ],
    notes: "Œillets inox qualité marine pour l'extérieur face aux embruns chlorés.",
  },
  {
    id: "3",
    ref: "KTX-2026-044",
    invoiceRef: "FA-2026-0044",
    name: "Boutique Hôtel Guéliz — Salons & Bar",
    location: "Avenue Mohammed V, Guéliz",
    type: "Hôtel & Lounge Bar",
    meters: 95,
    publicPriceEur: 4700, // ~51,000 MAD
    status: "DEVIS",
    invoiceStatus: "PENDING",
    progressPct: 20,
    deadline: "24 Novembre 2026",
    invoiceDate: "14 Octobre 2026",
    items: [
      "Banquettes d'angle capitonnées velours d'apparat émeraude M1",
      "Draperies phoniques acoustiques occultantes pour salon d'écoute",
    ],
    notes: "Certifications Non-Feu M1 requises pour la commission de sécurité.",
  },
  {
    id: "4",
    ref: "KTX-2026-046",
    invoiceRef: "FA-2026-0046",
    name: "Riad El Fenn Extension — Salon d'Hiver",
    location: "Derb Sidi Bouloukhat, Marrakech",
    type: "Maison d'Hôtes & Galerie",
    meters: 65,
    publicPriceEur: 3200, // ~34,700 MAD
    status: "EXPEDIE",
    invoiceStatus: "PAID",
    progressPct: 90,
    deadline: "20 Octobre 2026",
    invoiceDate: "28 Septembre 2026",
    items: [
      "Tentures lourdes lin naturel doublées satinette thermique",
      "Galettes d'assise capitonnées coton jacquard Kasbah",
    ],
    notes: "Expédié par coursier atelier dédié avec housses de protection.",
  },
  {
    id: "5",
    ref: "KTX-2026-031",
    invoiceRef: "FA-2026-0031",
    name: "Penthouse Hivernage — Réception & Master",
    location: "Boulevard Moulay Rachid, Hivernage",
    type: "Appartement d'Architecte",
    meters: 110,
    publicPriceEur: 5500, // ~59,600 MAD
    status: "POSE",
    invoiceStatus: "PAID",
    progressPct: 100,
    deadline: "04 Octobre 2026",
    invoiceDate: "15 Septembre 2026",
    items: [
      "Double rideaux occultants blackout 100% avec tombé cassant au sol",
      "Têtes de lit tapissées en tissu chenille ivoire",
    ],
    notes: "Chantier réceptionné sans réserve par l'architecte chef de projet.",
  },
  {
    id: "6",
    ref: "KTX-2026-027",
    invoiceRef: "FA-2026-0027",
    name: "Domaine des Oliviers — Pergolas & Terrasses",
    location: "Route de l'Ourika, km 14",
    type: "Domaine Événementiel & Villa",
    meters: 320,
    publicPriceEur: 13600, // ~147,500 MAD
    status: "POSE",
    invoiceStatus: "PAID",
    progressPct: 100,
    deadline: "18 Septembre 2026",
    invoiceDate: "02 Septembre 2026",
    items: [
      "Toiles tendues coulissantes pour 6 pergolas bioclimatiques",
      "18 chiliennes et bains de soleil en tissu outdoor traité UV",
    ],
    notes: "Livraison et pose globale effectuées par les maîtres tapissiers Kansotex.",
  },
];

// Physical Workshop Rolls Stock in Sidi Ghanem
const ATELIER_STOCKS = [
  { ref: "LIN-ROYAL-01", name: "Lin Lavé Royal 420g Naturel", laize: "140 cm", availableMeters: 240, status: "En stock direct", color: "#d8cdb8" },
  { ref: "VOIL-CEL-02", name: "Voilage Céleste Blanc Craie", laize: "300 cm", availableMeters: 380, status: "En stock direct", color: "#f7f6f2" },
  { ref: "OUT-SUN-03", name: "Toile Outdoor Suntech Sable", laize: "150 cm", availableMeters: 190, status: "En stock direct", color: "#c8b9a3" },
  { ref: "VEL-KOUT-04", name: "Velours d'Apparat Koutoubia Ocre", laize: "140 cm", availableMeters: 115, status: "Stock modéré", color: "#b88a38" },
  { ref: "CHEN-ATL-05", name: "Chenille Étoffe Atlas Ivoire", laize: "140 cm", availableMeters: 160, status: "En stock direct", color: "#ede9e1" },
  { ref: "JACQ-KAS-06", name: "Jacquard Kasbah Anthracite", laize: "140 cm", availableMeters: 85, status: "Derniers rouleaux", color: "#3a3834" },
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

  const { currency, setCurrency, rates } = useCurrency();
  const [menuOpen, setMenuOpen] = useState(false);

  // Robust, perfectly spaced number formatter with thousands separator
  const formatMoney = (amountEur: number) => {
    const rate = rates?.[currency] || (currency === "MAD" ? 10.85 : 1);
    const amount = amountEur * rate;
    const rounded = Math.round(amount);
    const numWithSpaces = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const symbol = currency === "MAD" ? "MAD" : currency === "EUR" ? "€" : "$";
    return {
      value: numWithSpaces,
      symbol,
      formatted: `${numWithSpaces} ${symbol}`,
    };
  };

  // Active Tab: default to "orders"
  type TabKey = "orders" | "invoices" | "overview" | "planning" | "calculator" | "margin" | "stocks" | "swatches" | "atelier";
  const [activeTab, setActiveTab] = useState<TabKey>("orders");

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
  const [selectedInvoiceFilter, setSelectedInvoiceFilter] = useState<string>("ALL");
  const [selectedProjectModal, setSelectedProjectModal] = useState<B2BProject | null>(null);
  const [selectedInvoiceModal, setSelectedInvoiceModal] = useState<B2BProject | null>(null);

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

  const [swatchSentNotice, setSwatchSentNotice] = useState<string | null>(null);

  // -------------------------------------------------------------
  // B2B Toolbox: Curtain Yardage Calculator
  // -------------------------------------------------------------
  const [calcWidth, setCalcWidth] = useState<number>(320); // cm
  const [calcHeight, setCalcHeight] = useState<number>(280); // cm
  const [calcHeading, setCalcHeading] = useState<"wave" | "flamand" | "simple" | "plisse">("wave");
  const [calcLaize, setCalcLaize] = useState<140 | 300>(300);
  const [calcLining, setCalcLining] = useState<"none" | "satinette" | "blackout">("satinette");
  const [calcFabricPriceEur, setCalcFabricPriceEur] = useState<number>(42); // EUR/m (~450 MAD)

  const headingMultipliers: Record<string, { factor: number; label: string; desc: string }> = {
    wave: { factor: 2.0, label: "Plis Wave (Vague Continue)", desc: "Tombé fluide moderne, ampleur 200%" },
    flamand: { factor: 2.2, label: "Plis Flamands Doubles", desc: "Élégance classique haute draperie, ampleur 220%" },
    simple: { factor: 1.8, label: "Plis Simples Tapissier", desc: "Sobre et contemporain, ampleur 180%" },
    plisse: { factor: 1.5, label: "Plissé Standard Froncé", desc: "Ampleur économique, ampleur 150%" },
  };

  const calculatedYardage = useMemo(() => {
    const fullness = headingMultipliers[calcHeading]?.factor || 2.0;
    const finishedWidthM = (calcWidth / 100) * fullness;
    const finishedHeightM = (calcHeight + 35) / 100; // 35cm top/bottom hems

    let linearMetersNeeded = 0;
    let numberOfDrops = 1;

    if (calcLaize === 300) {
      linearMetersNeeded = finishedWidthM;
      numberOfDrops = 2; // standard 2 panels split
    } else {
      numberOfDrops = Math.ceil((calcWidth * fullness) / 130);
      linearMetersNeeded = numberOfDrops * finishedHeightM;
    }

    linearMetersNeeded = Math.round(linearMetersNeeded * 10) / 10;

    const publicFabricCostEur = linearMetersNeeded * calcFabricPriceEur;
    const proFabricCostEur = publicFabricCostEur * (1 - currentDiscount);
    const liningCostPerMEur = calcLining === "none" ? 0 : calcLining === "satinette" ? 10 : 16;
    const proLiningCostEur = linearMetersNeeded * liningCostPerMEur * (1 - currentDiscount);
    const tailoringCostEur = (numberOfDrops >= 2 ? numberOfDrops : 2) * 20;

    const totalEstimateProEur = proFabricCostEur + proLiningCostEur + tailoringCostEur;
    const publicTotalEstimateEur = publicFabricCostEur + (linearMetersNeeded * liningCostPerMEur) + (tailoringCostEur * 1.3);

    return {
      linearMetersNeeded,
      numberOfDrops,
      publicTotalEstimateEur,
      totalEstimateProEur,
      savingsEur: publicTotalEstimateEur - totalEstimateProEur,
    };
  }, [calcWidth, calcHeight, calcHeading, calcLaize, calcLining, calcFabricPriceEur, currentDiscount]);

  // -------------------------------------------------------------
  // Agency Margin Simulator
  // -------------------------------------------------------------
  const [agencyPurchaseEur, setAgencyPurchaseEur] = useState<number>(3200);
  const [agencyMarginPct, setAgencyMarginPct] = useState<number>(30); // +30% margin

  const calculatedAgencyMargin = useMemo(() => {
    const resalePriceHTEur = agencyPurchaseEur * (1 + agencyMarginPct / 100);
    const netAgencyProfitEur = resalePriceHTEur - agencyPurchaseEur;
    const clientPriceTTCEur = resalePriceHTEur * 1.20; // 20% TVA
    return {
      resalePriceHTEur,
      netAgencyProfitEur,
      clientPriceTTCEur,
    };
  }, [agencyPurchaseEur, agencyMarginPct]);

  // Aggregate Totals
  const totalPublicEur = useMemo(() => projects.reduce((acc, p) => acc + p.publicPriceEur, 0), [projects]);
  const totalProEur = useMemo(() => projects.reduce((acc, p) => acc + p.publicPriceEur * (1 - currentDiscount), 0), [projects, currentDiscount]);
  const totalSavingsEur = totalPublicEur - totalProEur;
  const totalMeters = useMemo(() => projects.reduce((acc, p) => acc + p.meters, 0), [projects]);
  const activeCount = useMemo(() => projects.filter((p) => p.status !== "POSE").length, [projects]);

  // Invoices Aggregate Totals
  const totalInvoicedTTCEur = useMemo(() => totalProEur * 1.20, [totalProEur]);
  const totalCollectedEur = useMemo(() => {
    return projects.reduce((acc, p) => {
      const net = p.publicPriceEur * (1 - currentDiscount) * 1.20;
      if (p.invoiceStatus === "PAID") return acc + net;
      if (p.invoiceStatus === "DEPOSIT_50") return acc + net * 0.5;
      return acc;
    }, 0);
  }, [projects, currentDiscount]);
  const totalPendingEur = totalInvoicedTTCEur - totalCollectedEur;

  // Filtered Projects for Orders Table
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

  // Filtered Projects for Invoices Table
  const filteredInvoices = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.ref.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.invoiceRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus =
        selectedInvoiceFilter === "ALL" || p.invoiceStatus === selectedInvoiceFilter;
      return matchSearch && matchStatus;
    });
  }, [projects, searchQuery, selectedInvoiceFilter]);

  // Role Switcher Handler
  const handleSwitchRole = async (role: SessionData["role"], discount: number) => {
    setCurrentRole(role);
    setCurrentDiscount(discount);
    if (role === "ARCHITECT") {
      setCompanyName("Studio KB Architecture & Design");
      setUserName("Karim Benjelloun");
    } else if (role === "HOTEL") {
      setCompanyName("Palais & Riad Atlas Luxury Group");
      setUserName("Direction des Opérations");
    } else {
      setCompanyName("Atelier Intérieurs & Décoration");
      setUserName("Sara Tazi");
    }
    try {
      await loginAsPro(role, discount);
    } catch {
      // non-blocking
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ["Reference", "Facture_No", "Chantier", "Lieu", "Metrage_ml", "Prix_Public_HT", "Prix_Pro_HT", "Statut", "Deadline"];
    const rows = filteredProjects.map((p) => [
      p.ref,
      p.invoiceRef,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.location}"`,
      p.meters,
      formatMoney(p.publicPriceEur).value,
      formatMoney(p.publicPriceEur * (1 - currentDiscount)).value,
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

  // Add Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newM = parseInt(newProjectForm.meters, 10) || 60;
    const estEur = newM * 40;
    const randNum = Math.floor(100 + Math.random() * 900);
    const newProj: B2BProject = {
      id: String(Date.now()),
      ref: `KTX-2026-${randNum}`,
      invoiceRef: `FA-2026-${randNum}`,
      name: newProjectForm.name.trim() || "Nouveau Chantier Déco",
      location: newProjectForm.location.trim() || "Marrakech",
      type: newProjectForm.type,
      meters: newM,
      publicPriceEur: estEur,
      status: "DEVIS",
      invoiceStatus: "PENDING",
      progressPct: 15,
      deadline: newProjectForm.deadline,
      invoiceDate: "Aujourd'hui",
      items: [newProjectForm.notes],
      notes: "Projet planifié par le bureau d'études.",
    };
    setProjects([newProj, ...projects]);
    setIsAddProjectOpen(false);
    setActiveTab("orders");
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#141311] font-sans antialiased selection:bg-[#141311] selection:text-white pb-28">
      {/* Slide-in luxury menu overlay */}
      <LuxuryMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ============================================================ */}
      {/* 1. TOP GLOBAL NAVIGATION HEADER */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#e7e3da] py-3 transition-all">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between min-h-[46px]">
          {/* Left: Burger & Brand */}
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-6 w-6 flex-col items-center justify-center gap-1.5 cursor-pointer hover:opacity-65 transition-opacity"
              aria-label="Ouvrir le menu"
            >
              <span className="block h-[1px] w-5 bg-[#141311]" />
              <span className="block h-[1px] w-5 bg-[#141311]" />
              <span className="block h-[1px] w-5 bg-[#141311]" />
            </button>

            <Link href="/" aria-label="Kansotex" className="flex items-center">
              <Image
                src="/KANSOTEX-marque-Black.png"
                alt="Kansotex"
                width={500}
                height={120}
                className="w-[125px] sm:w-[145px] h-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right: Currency & Navbar Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-[#ede9e1] rounded-full p-0.5 border border-[#dfd9cd] text-[11px] font-sans">
              {(["MAD", "EUR", "USD"] as CurrencyCode[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-0.5 rounded-full transition-all cursor-pointer font-medium ${
                    currency === c
                      ? "bg-white text-[#141311] shadow-2xs font-semibold"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <NavbarRightActions />
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* 2. REFINED B2B COMMAND BAR & PARTNER PROFILE */}
      {/* ============================================================ */}
      <section className="bg-white border-b border-[#e7e3da]">
        <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 py-5 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Left: Studio Identity & Live Badge */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#141311] text-[#c5a059] flex items-center justify-center font-serif text-lg font-bold shadow-xs shrink-0">
                K
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-base sm:text-lg font-semibold tracking-tight text-[#141311]">
                    {companyName}
                  </h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium tracking-wide bg-[#faf3e8] text-[#8e6e2f] border border-[#e8d7b8]">
                    -{Math.round(currentDiscount * 100)}% Tarif Éditeur Pro
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-500 font-light">
                  <span>{userName}</span>
                  <span className="text-neutral-300">·</span>
                  <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Atelier Marrakech : En Confection
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Role Switcher (Architect / Hotel / Decorator) & Direct Hotline */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#f5f3ee] border border-[#e5e0d4] text-xs">
                <span className="text-[10px] uppercase font-sans font-medium text-neutral-400 px-2 tracking-wider">
                  Tier Pro :
                </span>
                <button
                  type="button"
                  onClick={() => handleSwitchRole("ARCHITECT", 0.25)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    currentRole === "ARCHITECT"
                      ? "bg-white text-[#141311] shadow-2xs font-semibold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Architecte (-25%)
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchRole("HOTEL", 0.30)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    currentRole === "HOTEL"
                      ? "bg-white text-[#141311] shadow-2xs font-semibold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Hôtellerie (-30%)
                </button>
                <button
                  type="button"
                  onClick={() => handleSwitchRole("DECORATOR", 0.20)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    currentRole === "DECORATOR"
                      ? "bg-white text-[#141311] shadow-2xs font-semibold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Décorateur (-20%)
                </button>
              </div>

              {/* Direct Atelier WhatsApp Button */}
              <a
                href="https://wa.me/212661234567?text=Bonjour%20Hassan,%20suivi%20du%20chantier%20Kansotex"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-medium transition-colors"
              >
                <IconWhatsApp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Atelier Direct</span>
              </a>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* 3. SLICK STRIPE/LINEAR-STYLE TAB NAVIGATION (WITH INVOICES) */}
        {/* ============================================================ */}
        <div className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center gap-6 overflow-x-auto scrollbar-none border-t border-[#f0ece3]">
          {[
            { key: "orders", label: "Chantiers & Devis", icon: IconTable, count: projects.length },
            { key: "invoices", label: "Factures & Règlements", icon: IconInvoice, count: projects.length },
            { key: "overview", label: "Vue d'Ensemble & Stats", icon: IconLayers },
            { key: "planning", label: "Planning & Pose", icon: IconCalendar, count: activeCount },
            { key: "calculator", label: "Calculateur Draperie", icon: IconCalculator },
            { key: "margin", label: "Simulateur Marge", icon: IconTrendingUp },
            { key: "stocks", label: "Stocks Rouleaux Atelier", icon: IconSwatch },
            { key: "swatches", label: "Nuanciers Express 48h", icon: IconSwatch },
            { key: "atelier", label: "Atelier Marrakech", icon: IconAtelier },
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key as TabKey)}
                className={`relative py-3.5 text-xs font-medium inline-flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-[#141311] font-semibold"
                    : "text-neutral-500 hover:text-neutral-900"
                }`}
              >
                <IconComp className={`w-3.5 h-3.5 ${isActive ? "text-[#c5a059]" : "text-neutral-400"}`} />
                <span>{tab.label}</span>
                {typeof tab.count === "number" && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] tabular-nums font-semibold ${
                      isActive ? "bg-[#141311] text-white" : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 inset-x-0 h-[2px] bg-[#141311]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MAIN WORKSPACE CONTENT */}
      {/* ============================================================ */}
      <main className="max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 pt-8">

        {/* ------------------------------------------------------------- */}
        {/* TAB 1: CHANTIERS & DEVIS (THE MASTER DATA TABLE) */}
        {/* FULL WIDTH COLUMN BREATHING ROOM & PROPER ACTION BUTTONS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {/* Header Toolbar: Search & Action Buttons */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#141311]">
                  Chantiers &amp; Devis d&apos;Atelier
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5 font-light">
                  Suivi en temps réel des confections, relevés de métrages et facturation remisée.
                </p>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsAddProjectOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#141311] text-white hover:bg-neutral-800 text-xs font-medium transition-all shadow-2xs cursor-pointer"
                >
                  <IconPlus className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Planifier un Chantier</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#dedad1] hover:border-[#141311] text-neutral-800 text-xs font-medium transition-colors cursor-pointer"
                >
                  <IconDownload className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Export CSV / Excel</span>
                </button>
              </div>
            </div>

            {/* Filter Bar: Live Search & Segmented Filter */}
            <div className="bg-white p-2.5 rounded-2xl border border-[#e7e3da] shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <IconSearch className="w-3.5 h-3.5 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par référence, client, lieu ou tissu..."
                  className="w-full pl-9 pr-8 py-2 rounded-xl bg-[#f7f6f2] text-xs font-sans text-neutral-900 placeholder:text-neutral-400 outline-none border border-transparent focus:border-[#c5a059] focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Status Filter Buttons */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
                {[
                  { key: "ALL", label: "Tous", count: projects.length },
                  { key: "CONFECTION", label: "En Confection", count: projects.filter(p => p.status === "CONFECTION").length },
                  { key: "DEVIS", label: "En Étude / Devis", count: projects.filter(p => p.status === "DEVIS").length },
                  { key: "EXPEDIE", label: "Expédié", count: projects.filter(p => p.status === "EXPEDIE").length },
                  { key: "POSE", label: "Posé", count: projects.filter(p => p.status === "POSE").length },
                ].map((st) => (
                  <button
                    key={st.key}
                    type="button"
                    onClick={() => setSelectedStatusFilter(st.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                      selectedStatusFilter === st.key
                        ? "bg-[#141311] text-white"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-[#f5f3ee]"
                    }`}
                  >
                    {st.label} ({st.count})
                  </button>
                ))}
              </div>
            </div>

            {/* The Master Data Table with Full Widths on Every Column */}
            <div className="bg-white rounded-2xl border border-[#e7e3da] shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1240px] text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fbfaf8] border-b border-[#e7e3da] text-[11px] font-sans font-medium uppercase tracking-[0.08em] text-neutral-500">
                      <th className="py-3.5 px-5 font-semibold w-[140px]">Réf &amp; Date</th>
                      <th className="py-3.5 px-5 font-semibold min-w-[260px]">Chantier &amp; Client</th>
                      <th className="py-3.5 px-4 font-semibold text-center w-[100px]">Métrage</th>
                      <th className="py-3.5 px-4 font-semibold text-right w-[140px]">Tarif Public HT</th>
                      <th className="py-3.5 px-4 font-semibold text-right w-[145px]">Tarif Pro Net HT</th>
                      <th className="py-3.5 px-4 font-semibold text-right w-[155px]">Économie Nette</th>
                      <th className="py-3.5 px-5 font-semibold text-center w-[160px]">Statut Confection</th>
                      <th className="py-3.5 px-5 font-semibold text-right w-[280px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2eee7] text-xs">
                    {filteredProjects.map((p) => {
                      const proPriceEur = p.publicPriceEur * (1 - currentDiscount);
                      const savingsEur = p.publicPriceEur - proPriceEur;

                      return (
                        <tr key={p.id} className="hover:bg-[#fbfaf7] transition-colors group">
                          {/* Réf & Date */}
                          <td className="py-4 px-5">
                            <span className="font-semibold text-[#141311] block">
                              {p.ref}
                            </span>
                            <span className="text-[11px] text-neutral-400 font-light block mt-0.5">
                              {p.deadline}
                            </span>
                          </td>

                          {/* Chantier & Client */}
                          <td className="py-4 px-5">
                            <span className="font-semibold text-[#141311] block group-hover:text-[#8e6e2f] transition-colors">
                              {p.name}
                            </span>
                            <span className="text-[11px] text-neutral-500 font-light block truncate max-w-sm mt-0.5">
                              {p.location} · {p.type}
                            </span>
                          </td>

                          {/* Métrage */}
                          <td className="py-4 px-4 text-center font-medium text-neutral-800 tabular-nums">
                            {p.meters} ml
                          </td>

                          {/* Tarif Public HT */}
                          <td className="py-4 px-4 text-right tabular-nums text-neutral-400 line-through">
                            {formatMoney(p.publicPriceEur).formatted}
                          </td>

                          {/* Tarif Pro Net HT */}
                          <td className="py-4 px-4 text-right tabular-nums font-semibold text-[#141311]">
                            {formatMoney(proPriceEur).formatted}
                          </td>

                          {/* Économie Nette (Wrapped in dedicated soft badge with clean spacing) */}
                          <td className="py-4 px-4 text-right">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80 tabular-nums shadow-2xs">
                              + {formatMoney(savingsEur).formatted}
                            </span>
                          </td>

                          {/* Statut Badge */}
                          <td className="py-4 px-5 text-center">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide ${
                                p.status === "POSE"
                                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                                  : p.status === "EXPEDIE"
                                  ? "bg-indigo-50 text-indigo-900 border border-indigo-200"
                                  : p.status === "CONFECTION"
                                  ? "bg-amber-50 text-amber-900 border border-amber-200"
                                  : "bg-neutral-100 text-neutral-800 border border-neutral-200"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  p.status === "POSE"
                                    ? "bg-emerald-500"
                                    : p.status === "EXPEDIE"
                                    ? "bg-indigo-500"
                                    : p.status === "CONFECTION"
                                    ? "bg-amber-500 animate-pulse"
                                    : "bg-neutral-400"
                                }`}
                              />
                              <span>
                                {p.status === "POSE"
                                  ? "Posé & Réceptionné"
                                  : p.status === "EXPEDIE"
                                  ? "Expédié / En Transit"
                                  : p.status === "CONFECTION"
                                  ? "En Confection"
                                  : "Étude & Devis"}
                              </span>
                            </span>
                          </td>

                          {/* Actions: Full Width Buttons (Fiche, Facture, WhatsApp) */}
                          <td className="py-4 px-5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* 1. Fiche & Côtes */}
                              <button
                                type="button"
                                onClick={() => setSelectedProjectModal(p)}
                                className="px-2.5 py-1.5 rounded-lg bg-[#f5f3ee] hover:bg-[#eae5dc] text-neutral-800 text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap"
                                title="Voir la fiche technique et le calepinage"
                              >
                                Fiche &amp; Côtes
                              </button>

                              {/* 2. Facture Pro Button */}
                              <button
                                type="button"
                                onClick={() => setSelectedInvoiceModal(p)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#dedad1] hover:border-[#141311] text-[#141311] text-[11px] font-medium transition-colors cursor-pointer whitespace-nowrap shadow-2xs"
                                title="Consulter la facture B2B officielle"
                              >
                                <IconInvoice className="w-3.5 h-3.5 text-[#8e6e2f]" />
                                <span>Facture</span>
                              </button>

                              {/* 3. WhatsApp Direct */}
                              <a
                                href={`https://wa.me/212661234567?text=Bonjour%20Atelier,%20question%20sur%20le%20projet%20${encodeURIComponent(p.ref)}%20(${encodeURIComponent(p.name)})`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-emerald-800 text-[11px] font-medium transition-colors whitespace-nowrap"
                                title="Contacter le chef d'atelier sur WhatsApp"
                              >
                                <IconWhatsApp className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Atelier</span>
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
              <div className="bg-[#faf9f6] px-5 py-3.5 border-t border-[#e7e3da] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-neutral-500 font-light">
                  {filteredProjects.length} chantiers affichés · Confections artisanales à Marrakech
                </span>
                <div className="flex items-center gap-6">
                  <span className="text-neutral-500">
                    Total Facturé Net : <strong className="text-[#141311] tabular-nums font-semibold">{formatMoney(totalProEur).formatted}</strong>
                  </span>
                  <span className="text-emerald-800 font-medium tabular-nums">
                    Gain Remise Pro : + {formatMoney(totalSavingsEur).formatted}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 2: FACTURES & RÈGLEMENTS (DEDICATED B2B INVOICE SYSTEM) */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "invoices" && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#141311]">
                  Factures &amp; Règlements Pro
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5 font-light">
                  Relevé des factures d&apos;atelier, suivi des acomptes à 50% et soldes à réception.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#dedad1] hover:border-[#141311] text-neutral-800 text-xs font-medium transition-colors cursor-pointer"
                >
                  <IconDownload className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Exporter le Grand Livre (CSV)</span>
                </button>
              </div>
            </div>

            {/* 3 Summary Financial Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-[#e7e3da] shadow-2xs space-y-2">
                <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider block">
                  Total Facturé Net TTC
                </span>
                <div className="text-2xl font-semibold text-[#141311] tabular-nums">
                  {formatMoney(totalInvoicedTTCEur).formatted}
                </div>
                <div className="text-[11px] text-neutral-400">TVA 20% incluse sur l&apos;ensemble des chantiers</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#e7e3da] shadow-2xs space-y-2">
                <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider block">
                  Règlements &amp; Acomptes Reçus
                </span>
                <div className="text-2xl font-semibold text-emerald-800 tabular-nums">
                  {formatMoney(totalCollectedEur).formatted}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium">Virés sur compte manufacture</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-[#e7e3da] shadow-2xs space-y-2">
                <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider block">
                  Solde Restant en Attente
                </span>
                <div className="text-2xl font-semibold text-amber-800 tabular-nums">
                  {formatMoney(totalPendingEur).formatted}
                </div>
                <div className="text-[11px] text-amber-700 font-medium">Exigible à la pose &amp; réception in-situ</div>
              </div>
            </div>

            {/* Invoices Filter Bar */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
              {[
                { key: "ALL", label: "Toutes les Factures", count: projects.length },
                { key: "PAID", label: "Payées (100%)", count: projects.filter(p => p.invoiceStatus === "PAID").length },
                { key: "DEPOSIT_50", label: "Acompte Réglé (50%)", count: projects.filter(p => p.invoiceStatus === "DEPOSIT_50").length },
                { key: "PENDING", label: "En Attente de Règlement", count: projects.filter(p => p.invoiceStatus === "PENDING").length },
              ].map((st) => (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => setSelectedInvoiceFilter(st.key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    selectedInvoiceFilter === st.key
                      ? "bg-[#141311] text-white"
                      : "bg-white border border-[#dedad1] text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {st.label} ({st.count})
                </button>
              ))}
            </div>

            {/* Invoices Master Table */}
            <div className="bg-white rounded-2xl border border-[#e7e3da] shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1100px] text-left border-collapse">
                  <thead>
                    <tr className="bg-[#fbfaf8] border-b border-[#e7e3da] text-[11px] font-sans font-medium uppercase tracking-[0.08em] text-neutral-500">
                      <th className="py-3.5 px-5 font-semibold w-[140px]">N° Facture</th>
                      <th className="py-3.5 px-5 font-semibold w-[130px]">Date d&apos;Émission</th>
                      <th className="py-3.5 px-5 font-semibold min-w-[260px]">Chantier &amp; Client</th>
                      <th className="py-3.5 px-4 font-semibold text-right w-[140px]">Montant Net HT</th>
                      <th className="py-3.5 px-4 font-semibold text-right w-[140px]">Total TTC</th>
                      <th className="py-3.5 px-5 font-semibold text-center w-[160px]">Statut Règlement</th>
                      <th className="py-3.5 px-5 font-semibold text-right w-[180px]">Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f2eee7] text-xs">
                    {filteredInvoices.map((p) => {
                      const netHTEur = p.publicPriceEur * (1 - currentDiscount);
                      const ttcEur = netHTEur * 1.20;

                      return (
                        <tr key={p.id} className="hover:bg-[#fbfaf7] transition-colors">
                          <td className="py-4 px-5 font-semibold text-[#141311]">
                            {p.invoiceRef}
                          </td>
                          <td className="py-4 px-5 text-neutral-500 font-light">
                            {p.invoiceDate}
                          </td>
                          <td className="py-4 px-5">
                            <span className="font-semibold text-[#141311] block">{p.name}</span>
                            <span className="text-[11px] text-neutral-500 font-light block">{p.location}</span>
                          </td>
                          <td className="py-4 px-4 text-right tabular-nums font-medium text-neutral-800">
                            {formatMoney(netHTEur).formatted}
                          </td>
                          <td className="py-4 px-4 text-right tabular-nums font-semibold text-[#141311]">
                            {formatMoney(ttcEur).formatted}
                          </td>
                          <td className="py-4 px-5 text-center">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide ${
                                p.invoiceStatus === "PAID"
                                  ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                                  : p.invoiceStatus === "DEPOSIT_50"
                                  ? "bg-amber-50 text-amber-900 border border-amber-200"
                                  : "bg-neutral-100 text-neutral-800 border border-neutral-200"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  p.invoiceStatus === "PAID"
                                    ? "bg-emerald-500"
                                    : p.invoiceStatus === "DEPOSIT_50"
                                    ? "bg-amber-500"
                                    : "bg-neutral-400"
                                }`}
                              />
                              <span>
                                {p.invoiceStatus === "PAID"
                                  ? "Payée (100%)"
                                  : p.invoiceStatus === "DEPOSIT_50"
                                  ? "Acompte 50% Réglé"
                                  : "En Attente"}
                              </span>
                            </span>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedInvoiceModal(p)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141311] hover:bg-neutral-800 text-white text-[11px] font-medium transition-colors cursor-pointer shadow-2xs"
                            >
                              <IconInvoice className="w-3.5 h-3.5 text-[#c5a059]" />
                              <span>Ouvrir Facture</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 3: OVERVIEW & STATS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#141311]">
                Statistiques &amp; Performance Pro
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5 font-light">
                Indicateurs financiers, économies négociées et suivi des volumes d&apos;étoffes façonnées.
              </p>
            </div>

            {/* 4 Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="p-5 rounded-2xl bg-white border border-[#e7e3da] shadow-2xs space-y-3">
                <div className="flex justify-between items-start text-xs text-neutral-500 font-medium">
                  <span>Confection Pro HT</span>
                  <div className="w-7 h-7 rounded-lg bg-[#f5f3ee] flex items-center justify-center text-[#c5a059]">
                    <IconLayers className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-[#141311] tabular-nums tracking-tight">
                    {formatMoney(totalProEur).formatted}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center gap-1">
                    <span>↑ +18.4%</span>
                    <span className="text-neutral-400 font-light">vs trimestre précédent</span>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-2xl bg-white border border-[#e7e3da] shadow-2xs space-y-3">
                <div className="flex justify-between items-start text-xs text-neutral-500 font-medium">
                  <span>Économie Nette Réalisée</span>
                  <div className="w-7 h-7 rounded-lg bg-[#f5f3ee] flex items-center justify-center text-emerald-600">
                    <IconCheck className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-emerald-800 tabular-nums tracking-tight">
                    + {formatMoney(totalSavingsEur).formatted}
                  </div>
                  <div className="text-[11px] text-neutral-500 font-light mt-1">
                    Remise éditeur {Math.round(currentDiscount * 100)}% appliquée
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-2xl bg-white border border-[#e7e3da] shadow-2xs space-y-3">
                <div className="flex justify-between items-start text-xs text-neutral-500 font-medium">
                  <span>Métrage Linéaire Total</span>
                  <div className="w-7 h-7 rounded-lg bg-[#f5f3ee] flex items-center justify-center text-[#c5a059]">
                    <IconSwatch className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-[#141311] tabular-nums tracking-tight">
                    {totalMeters} ml
                  </div>
                  <div className="text-[11px] text-neutral-500 font-light mt-1">
                    Sur 6 chantiers livrés ou en confection
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-5 rounded-2xl bg-white border border-[#e7e3da] shadow-2xs space-y-3">
                <div className="flex justify-between items-start text-xs text-neutral-500 font-medium">
                  <span>Chantiers en Cours</span>
                  <div className="w-7 h-7 rounded-lg bg-[#f5f3ee] flex items-center justify-center text-amber-600">
                    <IconCalendar className="w-3.5 h-3.5" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-[#141311] tabular-nums tracking-tight">
                    {activeCount} actifs
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-1">
                    100% délais de pose respectés
                  </div>
                </div>
              </div>
            </div>

            {/* Textile Breakdown */}
            <div className="p-6 rounded-2xl bg-white border border-[#e7e3da] shadow-2xs space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-[#141311]">
                  Répartition des Étoffes Façonnées à l&apos;Atelier
                </h3>
                <span className="text-xs text-neutral-400 font-mono">Saison 2026</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium text-neutral-700">
                    <span>Lin Lavé Lourd 420g &amp; Rideaux Wave</span>
                    <span className="tabular-nums font-semibold">38% (420 ml)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#f2eee7] overflow-hidden">
                    <div className="h-full bg-[#141311] rounded-full" style={{ width: "38%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium text-neutral-700">
                    <span>Voilages Céleste Grande Hauteur 320cm</span>
                    <span className="tabular-nums font-semibold">29% (320 ml)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#f2eee7] overflow-hidden">
                    <div className="h-full bg-[#c5a059] rounded-full" style={{ width: "29%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium text-neutral-700">
                    <span>Toiles Plein Air Suntech Déperlantes</span>
                    <span className="tabular-nums font-semibold">21% (230 ml)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#f2eee7] overflow-hidden">
                    <div className="h-full bg-[#8c8273] rounded-full" style={{ width: "21%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium text-neutral-700">
                    <span>Velours d&apos;Apparat Koutoubia M1 &amp; Banquettes</span>
                    <span className="tabular-nums font-semibold">12% (135 ml)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#f2eee7] overflow-hidden">
                    <div className="h-full bg-[#4a4742] rounded-full" style={{ width: "12%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 4: PLANNING & JALONS */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "planning" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#141311]">
                  Planning &amp; Étapes d&apos;Atelier
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5 font-light">
                  Vision chronologique des confections en cours et jalons de livraison sur vos chantiers.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddProjectOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#141311] text-white text-xs font-medium cursor-pointer self-start sm:self-auto"
              >
                <IconPlus className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Nouveau Chantier</span>
              </button>
            </div>

            <div className="space-y-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white p-5 rounded-2xl border border-[#e7e3da] shadow-2xs space-y-4 hover:border-[#c5a059] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#f5f3ee] text-[#141311]">
                        {proj.ref}
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-[#141311]">{proj.name}</h3>
                        <p className="text-xs text-neutral-500">{proj.location} · {proj.type}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-sans text-neutral-400 block font-medium">Pose Cible</span>
                        <span className="text-xs font-medium text-neutral-900">{proj.deadline}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#f5f3ee] text-neutral-800">
                        {proj.progressPct}% achevé
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-[#f2eee7] overflow-hidden">
                    <div
                      className="h-full bg-[#141311] rounded-full transition-all duration-700"
                      style={{ width: `${proj.progressPct}%` }}
                    />
                  </div>

                  {/* 4 Steps */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] pt-1">
                    <div className={`p-2.5 rounded-xl border ${proj.progressPct >= 20 ? "bg-[#faf9f6] border-[#dfd9cd] text-[#141311] font-medium" : "bg-neutral-50 border-neutral-100 text-neutral-400"}`}>
                      <div>1. Relevé &amp; Côtes</div>
                      <div className="text-[10px] text-neutral-500 font-light">Validation plans DWG</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${proj.progressPct >= 40 ? "bg-[#faf9f6] border-[#dfd9cd] text-[#141311] font-medium" : "bg-neutral-50 border-neutral-100 text-neutral-400"}`}>
                      <div>2. Coupe &amp; Assemblage</div>
                      <div className="text-[10px] text-neutral-500 font-light">Rouleaux lin &amp; toiles</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${proj.progressPct >= 75 ? "bg-[#faf9f6] border-[#dfd9cd] text-[#141311] font-medium" : "bg-neutral-50 border-neutral-100 text-neutral-400"}`}>
                      <div>3. Têtes &amp; Étuve</div>
                      <div className="text-[10px] text-neutral-500 font-light">Repassage vapeur verticale</div>
                    </div>
                    <div className={`p-2.5 rounded-xl border ${proj.progressPct >= 100 ? "bg-emerald-50 border-emerald-200 text-emerald-900 font-medium" : "bg-neutral-50 border-neutral-100 text-neutral-400"}`}>
                      <div>4. Pose In-Situ</div>
                      <div className="text-[10px] text-neutral-500 font-light">Réception sans réserve</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 5: CALCULATEUR DE METRAGE DRAPERIE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "calculator" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#141311]">
                Calculateur Technique de Métrage &amp; Draperie
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5 font-light">
                Calculez le métrage exact de vos rideaux selon les coefficients d&apos;ampleur de nos maîtres tapissiers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form Input Columns */}
              <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-2xl border border-[#e7e3da] shadow-2xs space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-neutral-700">
                      Largeur de Tringle / Rail (cm)
                    </label>
                    <input
                      type="number"
                      value={calcWidth}
                      onChange={(e) => setCalcWidth(Math.max(50, parseInt(e.target.value, 10) || 50))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#dedad1] bg-[#faf9f6] text-sm tabular-nums font-semibold outline-none focus:border-[#141311]"
                    />
                    <span className="text-[11px] text-neutral-400 block">Exemple : 320 cm pour grande baie vitrée</span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-neutral-700">
                      Hauteur sous Plafond / Tringle (cm)
                    </label>
                    <input
                      type="number"
                      value={calcHeight}
                      onChange={(e) => setCalcHeight(Math.max(100, parseInt(e.target.value, 10) || 100))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#dedad1] bg-[#faf9f6] text-sm tabular-nums font-semibold outline-none focus:border-[#141311]"
                    />
                    <span className="text-[11px] text-neutral-400 block">+35 cm ajoutés automatiquement pour ourlets haut/bas</span>
                  </div>
                </div>

                {/* Headings */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-neutral-700">
                    Finition de Tête de Rideau
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(Object.keys(headingMultipliers) as Array<keyof typeof headingMultipliers>).map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setCalcHeading(k as "wave" | "flamand" | "simple" | "plisse")}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          calcHeading === k
                            ? "bg-[#faf8f4] border-[#141311] shadow-2xs"
                            : "bg-white border-[#dedad1] hover:border-neutral-400"
                        }`}
                      >
                        <div className="text-xs font-semibold text-[#141311]">{headingMultipliers[k].label}</div>
                        <div className="text-[11px] text-neutral-500 font-light mt-0.5">{headingMultipliers[k].desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Laize & Lining */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-[#f2eee7]">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-neutral-700">
                      Laize du Tissu
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setCalcLaize(300)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                          calcLaize === 300
                            ? "bg-[#141311] text-white border-[#141311]"
                            : "bg-[#faf9f6] border-[#dedad1] text-neutral-700"
                        }`}
                      >
                        300 cm (Grande Largeur)
                      </button>
                      <button
                        type="button"
                        onClick={() => setCalcLaize(140)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                          calcLaize === 140
                            ? "bg-[#141311] text-white border-[#141311]"
                            : "bg-[#faf9f6] border-[#dedad1] text-neutral-700"
                        }`}
                      >
                        140 cm (Standard)
                      </button>
                    </div>
                    <span className="text-[11px] text-neutral-400 block">
                      {calcLaize === 300 ? "Pose continue sans raccord vertical" : "Assemblage par lés verticaux d'atelier"}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-neutral-700">
                      Doublure Optionnelle
                    </label>
                    <select
                      value={calcLining}
                      onChange={(e) => setCalcLining(e.target.value as any)}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#dedad1] bg-[#faf9f6] text-xs font-medium text-neutral-900 outline-none cursor-pointer"
                    >
                      <option value="none">Sans doublure (Voilage léger)</option>
                      <option value="satinette">Doublure Satinette Coton (+110 MAD/ml)</option>
                      <option value="blackout">Doublure Occultante 100% (+175 MAD/ml)</option>
                    </select>
                    <span className="text-[11px] text-neutral-400 block">Protège le tissu des UV solaires marocains</span>
                  </div>
                </div>
              </div>

              {/* Live Calculation Output Card */}
              <div className="bg-[#141311] text-white p-7 rounded-2xl border border-neutral-800 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                    <span className="text-xs uppercase font-sans tracking-wider text-[#c5a059] font-medium">
                      Résultat Calepinage
                    </span>
                    <span className="text-xs font-medium text-neutral-400">Manufacture Kansotex</span>
                  </div>

                  <div>
                    <span className="text-xs text-neutral-400 block">Métrage Linéaire Exact Recommandé</span>
                    <div className="text-3xl font-serif font-bold text-white mt-1">
                      {calculatedYardage.linearMetersNeeded} <span className="text-sm font-sans font-normal text-neutral-400">mètres</span>
                    </div>
                    <span className="text-xs text-neutral-400 font-light mt-0.5 block">
                      Conditionné en {calculatedYardage.numberOfDrops} pans de rideaux finis
                    </span>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-neutral-800 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Tarif Public Estimé :</span>
                      <span className="tabular-nums line-through">{formatMoney(calculatedYardage.publicTotalEstimateEur).formatted}</span>
                    </div>
                    <div className="flex justify-between text-white font-medium">
                      <span>Tarif Pro Net HT :</span>
                      <span className="tabular-nums font-semibold text-[#c5a059]">{formatMoney(calculatedYardage.totalEstimateProEur).formatted}</span>
                    </div>
                    <div className="flex justify-between text-emerald-400">
                      <span>Économie Prescripteur :</span>
                      <span className="tabular-nums font-medium">+ {formatMoney(calculatedYardage.savingsEur).formatted}</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/devis?meters=${calculatedYardage.linearMetersNeeded}&heading=${calcHeading}`}
                  className="w-full py-3 rounded-xl bg-[#c5a059] hover:bg-[#d4b068] text-[#141311] text-xs font-semibold text-center uppercase tracking-wider transition-colors block"
                >
                  Envoyer au Bureau d&apos;Études →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 6: SIMULATEUR DE MARGE AGENCE */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "margin" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#141311]">
                Simulateur de Marge &amp; Rétrocession Agence
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5 font-light">
                Calculez votre prix de revente recommandé pour présenter une offre tout compris à vos clients finaux.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Form Input */}
              <div className="bg-white p-6 rounded-2xl border border-[#e7e3da] shadow-2xs space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-700">
                    Montant Achat Kansotex Pro Net HT
                  </label>
                  <input
                    type="number"
                    value={Math.round(agencyPurchaseEur * (rates?.[currency] || 1))}
                    onChange={(e) => setAgencyPurchaseEur((parseInt(e.target.value, 10) || 1000) / (rates?.[currency] || 1))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#dedad1] bg-[#faf9f6] text-sm tabular-nums font-semibold outline-none"
                  />
                  <span className="text-[11px] text-neutral-400 block">En {currency}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="text-neutral-700">Marge Agence Souhaitée</span>
                    <span className="text-[#8e6e2f] font-semibold font-mono">+{agencyMarginPct}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={agencyMarginPct}
                    onChange={(e) => setAgencyMarginPct(parseInt(e.target.value, 10))}
                    className="w-full accent-[#141311] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-400">
                    <span>10% (Min)</span>
                    <span>30% (Standard)</span>
                    <span>60% (Luxe)</span>
                  </div>
                </div>
              </div>

              {/* Profit Card */}
              <div className="bg-white p-6 rounded-2xl border border-[#e7e3da] shadow-2xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider block">
                    Bénéfice Net Agence Généré
                  </span>
                  <div className="text-3xl font-semibold text-emerald-800 tabular-nums tracking-tight mt-2">
                    + {formatMoney(calculatedAgencyMargin.netAgencyProfitEur).formatted}
                  </div>
                  <p className="text-xs text-neutral-500 font-light mt-2 leading-relaxed">
                    Honoraires de prescription et coordination de chantier conservés par votre cabinet d&apos;architecture.
                  </p>
                </div>
              </div>

              {/* Final Resale Price */}
              <div className="bg-[#141311] text-white p-6 rounded-2xl border border-neutral-800 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-medium text-[#c5a059] uppercase tracking-wider block">
                    Prix Conseillé Client Final TTC
                  </span>
                  <div className="text-3xl font-semibold text-white tabular-nums tracking-tight mt-2">
                    {formatMoney(calculatedAgencyMargin.clientPriceTTCEur).formatted}
                  </div>
                  <div className="space-y-1.5 pt-3 mt-3 border-t border-neutral-800 text-xs text-neutral-400">
                    <div className="flex justify-between">
                      <span>Prix Agence Revente HT :</span>
                      <span className="tabular-nums text-white">{formatMoney(calculatedAgencyMargin.resalePriceHTEur).formatted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TVA 20% :</span>
                      <span className="tabular-nums text-white">{formatMoney(calculatedAgencyMargin.clientPriceTTCEur - calculatedAgencyMargin.resalePriceHTEur).formatted}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 7: STOCKS ATELIER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "stocks" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#141311]">
                  Disponibilités Rouleaux en Atelier
                </h1>
                <p className="text-xs text-neutral-500 mt-0.5 font-light">
                  Métrages physiques prêts pour coupe immédiate dans notre manufacture de Marrakech.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-900 border border-emerald-200 self-start sm:self-auto">
                ● Synchronisé en direct avec l&apos;atelier
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ATELIER_STOCKS.map((stk) => (
                <div
                  key={stk.ref}
                  className="bg-white p-5 rounded-2xl border border-[#e7e3da] shadow-2xs space-y-3 hover:border-[#c5a059] transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-neutral-300" style={{ backgroundColor: stk.color }} />
                      <span className="text-[11px] font-semibold text-neutral-500">{stk.ref}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-800">
                      {stk.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-[#141311]">{stk.name}</h3>

                  <div className="pt-2 border-t border-[#f2eee7] flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-light">Laize : {stk.laize}</span>
                    <strong className="text-[#141311] font-semibold tabular-nums">{stk.availableMeters} ml dispo</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 8: SWATCHES & SAMPLES ORDER */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "swatches" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#141311]">
                Commande de Nuanciers &amp; Coffrets d&apos;Échantillons
              </h1>
              <p className="text-xs text-neutral-500 mt-0.5 font-light">
                Recevez nos nuanciers complets format 20x20cm directement à votre cabinet sous 48h.
              </p>
            </div>

            {swatchSentNotice && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                <span>{swatchSentNotice}</span>
                <button type="button" onClick={() => setSwatchSentNotice(null)} className="font-bold text-emerald-700">✕</button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "Coffret Lins Purs & Voilages Hôtellerie", tag: "Plus Demandé", desc: "14 échantillons lin lavé lourd 420g et voilages grande hauteur 320cm." },
                { title: "Nuancier Plein Air & Suntech Piscine", tag: "Anti-UV 1500h", desc: "12 toiles déperlantes, antitaches pour banquettes rooftop et transats." },
                { title: "Mallette Velours d'Apparat & Jacquards M1", tag: "Non-Feu M1", desc: "Échantillons velours texturés et jacquards contemporains pour hôtellerie." },
              ].map((pack, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-[#e7e3da] shadow-2xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#faf3e8] text-[#8e6e2f] border border-[#e8d7b8]">
                      {pack.tag}
                    </span>
                    <h3 className="text-base font-semibold text-[#141311]">{pack.title}</h3>
                    <p className="text-xs text-neutral-500 font-light leading-relaxed">{pack.desc}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSwatchSentNotice(`Demande enregistrée pour le ${pack.title}. Expédition gratuite vers votre cabinet sous 48h.`)}
                    className="w-full py-2.5 rounded-xl bg-[#141311] text-white hover:bg-neutral-800 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Commander Gratuitement
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* TAB 9: ATELIER TEAM */}
        {/* ------------------------------------------------------------- */}
        {activeTab === "atelier" && (
          <div className="space-y-6">
            <div className="bg-white p-7 rounded-2xl border border-[#e7e3da] shadow-2xs space-y-6">
              <div className="border-b border-[#f2eee7] pb-5">
                <span className="text-[11px] uppercase font-sans tracking-widest text-[#8e6e2f] font-semibold">
                  Manufacture Directe Marrakech
                </span>
                <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#141311] mt-1">
                  Atelier de Confection — Sidi Ghanem
                </h1>
                <p className="text-xs text-neutral-500 font-light mt-1 max-w-xl">
                  Circuit court sans intermédiaire : coupe numérique, confection tapissière sur-mesure, étuve verticale vapeur et livraison protégée sous housse.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 rounded-xl bg-[#faf9f6] border border-[#e7e3da] space-y-3">
                  <h3 className="text-sm font-semibold text-[#141311]">Hassan El Fassi</h3>
                  <p className="text-xs text-neutral-500 font-light">Maître Tapissier &amp; Responsable d&apos;Atelier</p>
                  <p className="text-xs text-neutral-700 leading-relaxed font-light">
                    Supervise la découpe au millimètre et les retombées de draperie grande hauteur.
                  </p>
                  <a
                    href="https://wa.me/212661234567"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-medium hover:underline pt-1"
                  >
                    <IconWhatsApp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>WhatsApp Direct : +212 6 61 23 45 67</span>
                  </a>
                </div>

                <div className="p-5 rounded-xl bg-[#faf9f6] border border-[#e7e3da] space-y-3">
                  <h3 className="text-sm font-semibold text-[#141311]">Nadia Berrada</h3>
                  <p className="text-xs text-neutral-500 font-light">Ingénieur Textile &amp; Prescription Pro</p>
                  <p className="text-xs text-neutral-700 leading-relaxed font-light">
                    En charge des fiches techniques, certificats non-feu M1 et calepinage sur plans DWG.
                  </p>
                  <a
                    href="mailto:bureau-etudes@kansotex.com"
                    className="inline-block text-xs text-neutral-800 font-medium underline pt-1"
                  >
                    bureau-etudes@kansotex.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ============================================================ */}
      {/* 5. MODAL: OFFICIAL B2B INVOICE VIEWER (FACTURE PRO KANSOTEX) */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedInvoiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoiceModal(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#dedad1] p-6 sm:p-9 z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Header Bar with Action Buttons */}
              <div className="flex items-center justify-between border-b border-[#f2eee7] pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-[#faf3e8] text-[#8e6e2f] border border-[#e8d7b8]">
                    Facture Officielle Pro
                  </span>
                  <span className="text-xs text-neutral-500">Réf : {selectedInvoiceModal.invoiceRef}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dedad1] hover:border-[#141311] text-xs font-medium text-neutral-800 transition-colors cursor-pointer"
                  >
                    <IconPrinter className="w-3.5 h-3.5" />
                    <span>Imprimer / PDF</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedInvoiceModal(null)}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Printable Invoice Sheet */}
              <div id="printable-invoice" className="space-y-6 font-sans text-xs">
                {/* Brand & Client Details */}
                <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6 border-b border-[#f2eee7]">
                  <div className="space-y-1.5">
                    <Image
                      src="/KANSOTEX-marque-Black.png"
                      alt="Kansotex"
                      width={180}
                      height={45}
                      className="w-[140px] h-auto object-contain mb-2"
                    />
                    <div className="font-semibold text-neutral-900">Kanso Business SARL · Manufacture Kansotex</div>
                    <div className="text-neutral-500 font-light">983 Al Massar, Route de Safi, Marrakech</div>
                    <div className="text-neutral-500 font-light">ICE : 002134567000089 · IF : 40291823 · RC : 68421</div>
                    <div className="text-neutral-500 font-light">Email : facturation@kansotex.com · Tél : +212 5 24 20 09 96</div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#faf9f6] border border-[#e7e3da] space-y-1 min-w-[240px]">
                    <span className="text-[10px] uppercase font-sans font-semibold tracking-wider text-neutral-400 block">
                      Client Facturé
                    </span>
                    <div className="font-semibold text-neutral-900 text-sm">{companyName}</div>
                    <div className="text-neutral-600">{userName}</div>
                    <div className="text-neutral-500 font-light">ICE Client : 002984123000045</div>
                    <div className="text-neutral-500 font-light">Marrakech / Casablanca</div>
                    <div className="pt-2 mt-2 border-t border-[#ede9e1] flex justify-between font-medium">
                      <span>Projet :</span>
                      <strong className="text-neutral-900">{selectedInvoiceModal.name}</strong>
                    </div>
                  </div>
                </div>

                {/* Invoice Meta details */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 rounded-lg bg-[#faf9f6] border border-[#e7e3da]">
                    <span className="text-[10px] text-neutral-400 uppercase font-medium block">N° Facture</span>
                    <strong className="text-neutral-900 font-mono">{selectedInvoiceModal.invoiceRef}</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-[#faf9f6] border border-[#e7e3da]">
                    <span className="text-[10px] text-neutral-400 uppercase font-medium block">Date d&apos;Émission</span>
                    <strong className="text-neutral-900">{selectedInvoiceModal.invoiceDate}</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-[#faf9f6] border border-[#e7e3da]">
                    <span className="text-[10px] text-neutral-400 uppercase font-medium block">Remise Éditeur</span>
                    <strong className="text-[#8e6e2f]">-{Math.round(currentDiscount * 100)}% Partenaire</strong>
                  </div>
                  <div className="p-3 rounded-lg bg-[#faf9f6] border border-[#e7e3da]">
                    <span className="text-[10px] text-neutral-400 uppercase font-medium block">Statut Règlement</span>
                    <strong className={selectedInvoiceModal.invoiceStatus === "PAID" ? "text-emerald-800" : "text-amber-800"}>
                      {selectedInvoiceModal.invoiceStatus === "PAID" ? "Réglé à 100%" : "Acompte 50% Reçu"}
                    </strong>
                  </div>
                </div>

                {/* Line Items Table */}
                <div className="rounded-xl border border-[#e7e3da] overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#fbfaf8] border-b border-[#e7e3da] text-[10px] font-sans font-medium uppercase tracking-wider text-neutral-500">
                        <th className="py-2.5 px-4">Désignation Prestation / Tissu</th>
                        <th className="py-2.5 px-3 text-center">Quantité</th>
                        <th className="py-2.5 px-4 text-right">Tarif Brut HT</th>
                        <th className="py-2.5 px-3 text-center">Remise</th>
                        <th className="py-2.5 px-4 text-right">Net HT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f2eee7] text-xs">
                      <tr>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-neutral-900 block">Étoffe Haut de Gamme &amp; Métrage Linéaire</span>
                          <span className="text-[11px] text-neutral-500 font-light">{selectedInvoiceModal.items[0] || "Tissus sur-mesure"}</span>
                        </td>
                        <td className="py-3 px-3 text-center tabular-nums">{selectedInvoiceModal.meters} ml</td>
                        <td className="py-3 px-4 text-right tabular-nums text-neutral-400 line-through">
                          {formatMoney(selectedInvoiceModal.publicPriceEur * 0.75).formatted}
                        </td>
                        <td className="py-3 px-3 text-center font-medium text-[#8e6e2f]">-{Math.round(currentDiscount * 100)}%</td>
                        <td className="py-3 px-4 text-right tabular-nums font-semibold text-neutral-900">
                          {formatMoney(selectedInvoiceModal.publicPriceEur * 0.75 * (1 - currentDiscount)).formatted}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-neutral-900 block">Façonnage Tapissier &amp; Têtes sur-mesure</span>
                          <span className="text-[11px] text-neutral-500 font-light">Plissage d&apos;atelier, étuve vapeur verticale et contrôle tombé</span>
                        </td>
                        <td className="py-3 px-3 text-center tabular-nums">{selectedInvoiceModal.meters} ml</td>
                        <td className="py-3 px-4 text-right tabular-nums text-neutral-400 line-through">
                          {formatMoney(selectedInvoiceModal.publicPriceEur * 0.25).formatted}
                        </td>
                        <td className="py-3 px-3 text-center font-medium text-[#8e6e2f]">-{Math.round(currentDiscount * 100)}%</td>
                        <td className="py-3 px-4 text-right tabular-nums font-semibold text-neutral-900">
                          {formatMoney(selectedInvoiceModal.publicPriceEur * 0.25 * (1 - currentDiscount)).formatted}
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-neutral-900 block">Conditionnement Sous Housse &amp; Livraison Chantier</span>
                          <span className="text-[11px] text-neutral-500 font-light">Protection atelier, livraison sur cintre et déchargement soigné</span>
                        </td>
                        <td className="py-3 px-3 text-center tabular-nums">1 Lot</td>
                        <td className="py-3 px-4 text-right tabular-nums text-neutral-500">Offert</td>
                        <td className="py-3 px-3 text-center font-medium text-emerald-800">100%</td>
                        <td className="py-3 px-4 text-right tabular-nums font-semibold text-emerald-800">0 MAD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Financial Summary Calculation */}
                {(() => {
                  const proHT = selectedInvoiceModal.publicPriceEur * (1 - currentDiscount);
                  const publicHT = selectedInvoiceModal.publicPriceEur;
                  const discountGain = publicHT - proHT;
                  const tvaEur = proHT * 0.20;
                  const ttcEur = proHT * 1.20;
                  const depositEur = selectedInvoiceModal.invoiceStatus === "PAID" ? ttcEur : ttcEur * 0.5;
                  const balanceDueEur = ttcEur - depositEur;

                  return (
                    <div className="flex flex-col sm:flex-row justify-between gap-6 pt-2">
                      <div className="p-4 rounded-xl bg-[#faf9f6] border border-[#e7e3da] text-[11px] space-y-1.5 flex-1">
                        <strong className="text-neutral-900 block font-semibold">Modalités de Paiement &amp; Virement :</strong>
                        <div className="text-neutral-600 font-light">Banque : CIH Bank — Agence Guéliz Marrakech</div>
                        <div className="text-neutral-600 font-mono">RIB : 230 450 1234567890123456 89</div>
                        <div className="text-neutral-600 font-light">Bénéficiaire : Kanso Business SARL (Kansotex)</div>
                        <div className="text-neutral-500 font-light pt-1">Échéance de solde : à réception et pose sur chantier.</div>
                      </div>

                      <div className="w-full sm:w-[280px] space-y-1.5 text-xs">
                        <div className="flex justify-between text-neutral-500">
                          <span>Sous-total Public HT :</span>
                          <span className="tabular-nums line-through">{formatMoney(publicHT).formatted}</span>
                        </div>
                        <div className="flex justify-between text-emerald-800 font-medium">
                          <span>Remise Partenaire ({Math.round(currentDiscount * 100)}%) :</span>
                          <span className="tabular-nums">- {formatMoney(discountGain).formatted}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-neutral-900 pt-1 border-t border-[#f2eee7]">
                          <span>Total Net HT :</span>
                          <span className="tabular-nums">{formatMoney(proHT).formatted}</span>
                        </div>
                        <div className="flex justify-between text-neutral-600">
                          <span>TVA 20% :</span>
                          <span className="tabular-nums">{formatMoney(tvaEur).formatted}</span>
                        </div>
                        <div className="flex justify-between text-base font-bold text-neutral-900 pt-2 border-t border-[#dedad1]">
                          <span>Total TTC :</span>
                          <span className="tabular-nums text-[#8e6e2f]">{formatMoney(ttcEur).formatted}</span>
                        </div>
                        <div className="flex justify-between text-emerald-800 text-xs font-medium pt-1">
                          <span>Acompte 50% réglé :</span>
                          <span className="tabular-nums">{formatMoney(depositEur).formatted}</span>
                        </div>
                        <div className="flex justify-between text-neutral-900 text-xs font-semibold pt-1 border-t border-[#f2eee7]">
                          <span>Reste à payer :</span>
                          <span className="tabular-nums">{formatMoney(balanceDueEur).formatted}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-[#f2eee7] flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={`https://wa.me/212661234567?text=Bonjour%20Comptabilit%C3%A9%20Kansotex,%20je%20souhaite%20un%20point%20sur%20la%20facture%20${encodeURIComponent(selectedInvoiceModal.invoiceRef)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-800 font-medium hover:underline"
                >
                  <IconWhatsApp className="w-4 h-4 text-emerald-600" />
                  <span>Envoyer à la Comptabilité via WhatsApp</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-[#141311] text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    Télécharger PDF
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedInvoiceModal(null)}
                    className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-800 transition-colors cursor-pointer"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 6. MODAL: FICHE CHANTIER DETAILLEE */}
      {/* ============================================================ */}
      <AnimatePresence>
        {selectedProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProjectModal(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-[#dedad1] p-6 sm:p-7 z-10 space-y-5 max-h-[85vh] overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-[#f2eee7] pb-4">
                <div>
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#f5f3ee] text-[#141311]">
                    {selectedProjectModal.ref}
                  </span>
                  <h3 className="text-base font-semibold text-[#141311] mt-1.5">{selectedProjectModal.name}</h3>
                  <p className="text-xs text-neutral-500 font-light">{selectedProjectModal.location} · {selectedProjectModal.type}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(null)}
                  className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600"
                >
                  ✕
                </button>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#faf9f6] border border-[#e7e3da]">
                  <span className="text-[10px] text-neutral-400 uppercase font-sans font-medium block">Métrage</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">{selectedProjectModal.meters} ml</span>
                </div>
                <div className="p-3 rounded-xl bg-[#faf9f6] border border-[#e7e3da]">
                  <span className="text-[10px] text-neutral-400 uppercase font-sans font-medium block">Tarif Pro Net HT</span>
                  <span className="font-semibold text-neutral-900 tabular-nums">
                    {formatMoney(selectedProjectModal.publicPriceEur * (1 - currentDiscount)).formatted}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#faf9f6] border border-[#e7e3da]">
                  <span className="text-[10px] text-neutral-400 uppercase font-sans font-medium block">Gain Partenaire</span>
                  <span className="font-semibold text-emerald-800 tabular-nums">
                    + {formatMoney(selectedProjectModal.publicPriceEur * currentDiscount).formatted}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[#faf9f6] border border-[#e7e3da]">
                  <span className="text-[10px] text-neutral-400 uppercase font-sans font-medium block">Date Pose</span>
                  <span className="font-semibold text-neutral-900">{selectedProjectModal.deadline}</span>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-neutral-700">Détail des Confections d&apos;Atelier</h4>
                <div className="space-y-1.5 text-xs text-neutral-800">
                  {selectedProjectModal.items.map((it, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#faf9f6] border border-[#f0ece3] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0" />
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedProjectModal.notes && (
                <div className="p-3 rounded-xl bg-[#faf3e8] border border-[#e8d7b8] text-xs text-[#8e6e2f]">
                  <strong>Notes de coupe :</strong> {selectedProjectModal.notes}
                </div>
              )}

              <div className="pt-3 border-t border-[#f2eee7] flex justify-between items-center">
                <a
                  href={`https://wa.me/212661234567?text=Bonjour%20Atelier,%20suivi%20du%20projet%20${encodeURIComponent(selectedProjectModal.ref)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-medium"
                >
                  <IconWhatsApp className="w-3.5 h-3.5" />
                  <span>Joindre l&apos;Atelier sur WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedProjectModal(null)}
                  className="px-4 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-800"
                >
                  Fermer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* 7. MODAL: NOUVEAU CHANTIER */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isAddProjectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddProjectOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#dedad1] p-6 sm:p-7 z-10 space-y-4"
            >
              <div className="flex items-start justify-between border-b border-[#f2eee7] pb-3">
                <div>
                  <h3 className="text-base font-semibold text-[#141311]">Planifier un Nouveau Chantier</h3>
                  <p className="text-xs text-neutral-500 font-light">Réservez les rouleaux et fixez la date de pose cible.</p>
                </div>
                <button type="button" onClick={() => setIsAddProjectOpen(false)} className="text-xs font-bold text-neutral-500">✕</button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Nom du Projet / Client *</label>
                  <input
                    type="text"
                    required
                    value={newProjectForm.name}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                    placeholder="Ex: Riad Dar Yasmine..."
                    className="w-full px-3 py-2 rounded-xl border border-[#dedad1] outline-none focus:border-[#141311]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Localisation *</label>
                    <input
                      type="text"
                      required
                      value={newProjectForm.location}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, location: e.target.value })}
                      placeholder="Marrakech, Casablanca..."
                      className="w-full px-3 py-2 rounded-xl border border-[#dedad1] outline-none focus:border-[#141311]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Typologie</label>
                    <select
                      value={newProjectForm.type}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, type: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#dedad1] outline-none"
                    >
                      <option value="Hôtellerie / Riad">Hôtellerie / Riad</option>
                      <option value="Villa de Prestige">Villa de Prestige</option>
                      <option value="Restaurant / Lounge">Restaurant / Lounge</option>
                      <option value="Résidence Privée">Résidence Privée</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Métrage Estimé (ml)</label>
                    <input
                      type="number"
                      required
                      value={newProjectForm.meters}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, meters: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-[#dedad1] outline-none tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 mb-1">Date Pose Cible</label>
                    <input
                      type="text"
                      required
                      value={newProjectForm.deadline}
                      onChange={(e) => setNewProjectForm({ ...newProjectForm, deadline: e.target.value })}
                      placeholder="Ex: 15 Décembre 2026"
                      className="w-full px-3 py-2 rounded-xl border border-[#dedad1] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">Description des Confections</label>
                  <textarea
                    rows={2}
                    value={newProjectForm.notes}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, notes: e.target.value })}
                    placeholder="Rideaux wave lin lavé, voilages baies vitrées..."
                    className="w-full px-3 py-2 rounded-xl border border-[#dedad1] outline-none"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddProjectOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 font-medium cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#141311] text-white font-medium cursor-pointer"
                  >
                    Enregistrer le Chantier
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
