"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { useCurrency, type CurrencyCode } from "@/lib/CurrencyContext";
import { loginAsAdmin, logout, type SessionData } from "@/lib/session";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// ARCHITECTURAL LUXURY SVG ICONS (Strictly ZERO emojis)
// ============================================================================
function IconShopify({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function IconAnalytics({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

function IconBox({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function IconLayers({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function IconUsers({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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

function IconAtelier({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

function IconDiscount({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

function IconSettings({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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

function IconTrendingUp({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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

function IconPrinter({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
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

function IconTruck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
    </svg>
  );
}

function IconAlert({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function IconEye({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function IconExternalLink({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

// ============================================================================
// DATA MODELS & RICH INITIAL STATE
// ============================================================================

export type AdminTab = 
  | "analytics" 
  | "orders" 
  | "products" 
  | "quotes" 
  | "invoices" 
  | "customers" 
  | "atelier" 
  | "marketing" 
  | "settings";

export interface AdminProduct {
  id: string;
  name: string;
  sku: string;
  category: "Lin" | "Velours" | "Voilage" | "Linge de Lit" | "Linge de Table" | "Outdoor" | "Tapis";
  type: "FABRIC_BY_METER" | "FINISHED_GOOD" | "SAMPLE";
  image: string;
  stockMeters: number;
  lowStockThreshold: number;
  basePriceEur: number; // Stored in base EUR for Kansotex useCurrency conversion
  tradePriceEur: number;
  widthCm: number; // Laize
  martindale: number;
  composition: string;
  status: "ACTIVE" | "LOW_STOCK" | "OUT_OF_STOCK" | "DRAFT";
  variantsCount: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerType: "B2C_PUBLIC" | "ARCHITECT_PRO" | "HOTEL_LUXURY" | "DECORATOR";
  channel: "BOUTIQUE_WEB" | "DEVIS_SIGNE" | "CONCIERGERIE_WHATSAPP";
  city: string;
  totalEur: number;
  itemsCount: number;
  meterageTotal: number;
  paymentStatus: "PAID" | "DEPOSIT_50" | "PENDING" | "REFUNDED";
  fulfillmentStatus: "PENDING" | "CUTTING_ATELIER" | "IN_CONFECTION" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  items: {
    name: string;
    meterage: number;
    priceEur: number;
    finishing?: string;
  }[];
}

export interface AdminInvoice {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  date: string;
  dueDate: string;
  clientName: string;
  clientCompany: string;
  clientIce: string;
  totalHtEur: number;
  tvaEur: number;
  totalTtcEur: number;
  depositReceivedEur: number;
  balanceDueEur: number;
  status: "PAID" | "DEPOSIT_PAID" | "PENDING" | "OVERDUE";
  paymentMethod: "VIREMENT_CIH" | "CARTE_CMI" | "CHEQUE" | "ESPECES_ATELIER";
}

export interface AdminQuote {
  id: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  clientName: string;
  projectName: string;
  city: string;
  meterageTotal: number;
  publicAmountEur: number;
  proNetEur: number;
  marginSavedEur: number;
  status: "DRAFT" | "SENT" | "DEPOSIT_RECEIVED" | "IN_PRODUCTION" | "COMPLETED";
}

export interface AdminCustomer {
  id: string;
  name: string;
  companyName: string;
  role: "ARCHITECT" | "HOTEL" | "DECORATOR" | "CUSTOMER";
  discountRate: number; // 0.25 for 25%
  email: string;
  phone: string;
  city: string;
  totalSpentEur: number;
  ordersCount: number;
  isVerifiedPro: boolean;
  joinedDate: string;
}

export interface AdminAtelierTask {
  id: string;
  projectRef: string;
  title: string;
  client: string;
  stage: "COTES_VALIDATION" | "COUPE_ROULEAUX" | "CONFECTION_MAIN" | "CONTROLE_REPASSAGE" | "POSE_SITE";
  meterage: number;
  artisanMaster: string;
  targetDate: string;
  priority: "URGENTE" | "NORMALE" | "HAUTE";
}

export interface AdminDiscount {
  id: string;
  code: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  value: number; // 25% or 500 MAD
  usesCount: number;
  maxUses: number | null;
  minPurchaseEur: number;
  status: "ACTIVE" | "EXPIRED" | "SCHEDULED";
  expiryDate: string;
}

// Initial catalog data matching real Kansotex inventory
const INITIAL_PRODUCTS: AdminProduct[] = [
  {
    id: "prod-lin-naturel",
    name: "Lin Pur Français Lavé — Signature Naturel",
    sku: "KTX-LIN-NAT-01",
    category: "Lin",
    type: "FABRIC_BY_METER",
    image: "/gallery/duvet_cover_linen_1791048696631.jpg",
    stockMeters: 480,
    lowStockThreshold: 50,
    basePriceEur: 85,
    tradePriceEur: 63.75, // -25%
    widthCm: 300,
    martindale: 35000,
    composition: "100% Lin Français certifié Masters of Linen",
    status: "ACTIVE",
    variantsCount: 8,
  },
  {
    id: "prod-velours-cotele",
    name: "Velours Côtelé Paris — Ameublement & Sièges",
    sku: "KTX-VEL-PAR-02",
    category: "Velours",
    type: "FABRIC_BY_METER",
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
    stockMeters: 210,
    lowStockThreshold: 40,
    basePriceEur: 95,
    tradePriceEur: 71.25,
    widthCm: 140,
    martindale: 50000,
    composition: "88% Coton, 12% Viscose d'art",
    status: "ACTIVE",
    variantsCount: 12,
  },
  {
    id: "prod-voilage-soie",
    name: "Voilage Soie & Lin Aérien — Lumière Filtre",
    sku: "KTX-VOI-SOIE-03",
    category: "Voilage",
    type: "FABRIC_BY_METER",
    image: "/gallery/Kansotex-indoor-living-room-pinterest.png",
    stockMeters: 18,
    lowStockThreshold: 30,
    basePriceEur: 110,
    tradePriceEur: 82.5,
    widthCm: 320,
    martindale: 18000,
    composition: "55% Soie Sauvage, 45% Lin Blanc",
    status: "LOW_STOCK",
    variantsCount: 4,
  },
  {
    id: "prod-outdoor-terrasse",
    name: "Tissu Technique Outdoor — Déperlant & Anti-UV",
    sku: "KTX-OUT-TER-04",
    category: "Outdoor",
    type: "FABRIC_BY_METER",
    image: "/gallery/Kansotex-outdoor-tissus-pinterest.jpg",
    stockMeters: 340,
    lowStockThreshold: 60,
    basePriceEur: 125,
    tradePriceEur: 93.75,
    widthCm: 150,
    martindale: 65000,
    composition: "100% Acrylique teinté masse traité Teflon",
    status: "ACTIVE",
    variantsCount: 6,
  },
  {
    id: "prod-parure-percale",
    name: "Parure de Lit Percale Signature 300 Fils",
    sku: "KTX-LIT-PERC-05",
    category: "Linge de Lit",
    type: "FINISHED_GOOD",
    image: "/gallery/bed_set_percale_1791048617304.jpg",
    stockMeters: 45,
    lowStockThreshold: 15,
    basePriceEur: 145,
    tradePriceEur: 108.75,
    widthCm: 240,
    martindale: 25000,
    composition: "100% Coton Percale Égyptien",
    status: "ACTIVE",
    variantsCount: 3,
  },
  {
    id: "prod-nappe-jacquard",
    name: "Nappe Jacquard Déperlante — Motifs Riad",
    sku: "KTX-TAB-JAC-06",
    category: "Linge de Table",
    type: "FINISHED_GOOD",
    image: "/gallery/tablecloth_jacquard_1791048717130.jpg",
    stockMeters: 62,
    lowStockThreshold: 20,
    basePriceEur: 90,
    tradePriceEur: 67.5,
    widthCm: 170,
    martindale: 30000,
    composition: "Coton Jacquard Traité Teflon",
    status: "ACTIVE",
    variantsCount: 5,
  },
  {
    id: "prod-coussin-brode",
    name: "Coussin d'Artisanat Brodé Main Marrakech",
    sku: "KTX-COU-BROD-07",
    category: "Velours",
    type: "FINISHED_GOOD",
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png",
    stockMeters: 12,
    lowStockThreshold: 25,
    basePriceEur: 75,
    tradePriceEur: 56.25,
    widthCm: 50,
    martindale: 40000,
    composition: "Velours de Soie & Passepoil Laiton",
    status: "LOW_STOCK",
    variantsCount: 6,
  },
];

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "cmd-1",
    orderNumber: "CMD-2026-108",
    date: "15 Octobre 2026",
    customerName: "Karim Benjelloun",
    customerEmail: "k.benjelloun@studio-kb.ma",
    customerPhone: "+212 6 61 24 55 88",
    customerType: "ARCHITECT_PRO",
    channel: "DEVIS_SIGNE",
    city: "Marrakech (Médina)",
    totalEur: 5930, // ~64 338 MAD
    itemsCount: 3,
    meterageTotal: 180,
    paymentStatus: "DEPOSIT_50",
    fulfillmentStatus: "IN_CONFECTION",
    items: [
      { name: "Lin Pur Français Lavé — Blanc Albâtre", meterage: 120, priceEur: 7650, finishing: "Ruflette onde Wave 80mm & Doublure occultante" },
      { name: "Voilage Soie & Lin — Ivoire Doré", meterage: 60, priceEur: 4950, finishing: "Tête flamande 2 plis main" },
    ],
  },
  {
    id: "cmd-2",
    orderNumber: "CMD-2026-107",
    date: "14 Octobre 2026",
    customerName: "Domaine des Oliviers Luxury Estate",
    customerEmail: "direction@domaine-oliviers.ma",
    customerPhone: "+212 6 62 11 00 22",
    customerType: "HOTEL_LUXURY",
    channel: "DEVIS_SIGNE",
    city: "Route de l'Ourika, Marrakech",
    totalEur: 10339, // ~112 180 MAD
    itemsCount: 4,
    meterageTotal: 320,
    paymentStatus: "PAID",
    fulfillmentStatus: "DELIVERED",
    items: [
      { name: "Tissu Technique Outdoor — Déperlant Pergolas", meterage: 240, priceEur: 22500, finishing: "Fourreaux de tension inox brossé" },
      { name: "Coussins Daybeds Outdoor Dryfeel", meterage: 80, priceEur: 7500, finishing: "Mousse réticulée outdoor & passepoil nautique" },
    ],
  },
  {
    id: "cmd-3",
    orderNumber: "CMD-2026-106",
    date: "14 Octobre 2026",
    customerName: "Sophie Delaunay",
    customerEmail: "s.delaunay@paris-interiors.fr",
    customerPhone: "+33 6 12 34 56 78",
    customerType: "DECORATOR",
    channel: "BOUTIQUE_WEB",
    city: "Paris / Marrakech Palmeraie",
    totalEur: 4485, // ~48 666 MAD
    itemsCount: 2,
    meterageTotal: 135,
    paymentStatus: "DEPOSIT_50",
    fulfillmentStatus: "CUTTING_ATELIER",
    items: [
      { name: "Lin Pur Lavé — Terracotta d'Ourika", meterage: 85, priceEur: 5418, finishing: "Ourlet lourd 10cm plombé" },
      { name: "Velours Côtelé Paris — Miel Sauvage", meterage: 50, priceEur: 3562, finishing: "Coupe métrage brut pour tapissier" },
    ],
  },
  {
    id: "cmd-4",
    orderNumber: "CMD-2026-105",
    date: "13 Octobre 2026",
    customerName: "Dr. Mehdi Alami",
    customerEmail: "mehdi.alami@casanet.ma",
    customerPhone: "+212 6 61 78 90 12",
    customerType: "B2C_PUBLIC",
    channel: "BOUTIQUE_WEB",
    city: "Casablanca (Anfa)",
    totalEur: 1420, // ~15 400 MAD
    itemsCount: 3,
    meterageTotal: 25,
    paymentStatus: "PAID",
    fulfillmentStatus: "SHIPPED",
    items: [
      { name: "Parure de Lit Percale Signature — 240x260", meterage: 0, priceEur: 145, finishing: "Finition standard" },
      { name: "Housse de Couette Lin Lavé Sauge", meterage: 0, priceEur: 220, finishing: "Boutons nacre véritable" },
      { name: "Drap de Bain Nid d'Abeille Blanc", meterage: 0, priceEur: 135, finishing: "Broderie monogramme K" },
    ],
  },
  {
    id: "cmd-5",
    orderNumber: "CMD-2026-104",
    date: "12 Octobre 2026",
    customerName: "Boutique Hôtel Guéliz Art",
    customerEmail: "contact@hotel-gueliz-art.ma",
    customerPhone: "+212 5 24 43 00 11",
    customerType: "HOTEL_LUXURY",
    channel: "CONCIERGERIE_WHATSAPP",
    city: "Marrakech (Guéliz)",
    totalEur: 3573, // ~38 768 MAD
    itemsCount: 2,
    meterageTotal: 95,
    paymentStatus: "PENDING",
    fulfillmentStatus: "PENDING",
    items: [
      { name: "Velours Côtelé Vert Empire", meterage: 65, priceEur: 4631, finishing: "Confection banquettes bar capitonnées" },
      { name: "Voilage Soie & Lin Naturel", meterage: 30, priceEur: 2475, finishing: "Tête froncée ruflette" },
    ],
  },
  {
    id: "cmd-6",
    orderNumber: "CMD-2026-103",
    date: "10 Octobre 2026",
    customerName: "Riad El Fenn Extension",
    customerEmail: "architecture@riad-elfenn.com",
    customerPhone: "+212 6 61 99 88 77",
    customerType: "HOTEL_LUXURY",
    channel: "DEVIS_SIGNE",
    city: "Médina, Marrakech",
    totalEur: 2432, // ~26 395 MAD
    itemsCount: 2,
    meterageTotal: 65,
    paymentStatus: "PAID",
    fulfillmentStatus: "DELIVERED",
    items: [
      { name: "Lin Pur Français Lavé — Écru Sauvage", meterage: 45, priceEur: 2868, finishing: "Tringle laiton brossé & œillets cousus main" },
      { name: "Coussins Brodés Main Soie & Laiton", meterage: 20, priceEur: 1500, finishing: "Garnissage duvet oie naturel" },
    ],
  },
];

const INITIAL_INVOICES: AdminInvoice[] = [
  {
    id: "inv-1",
    invoiceNumber: "FA-2026-0091",
    orderNumber: "CMD-2026-108",
    date: "15 Octobre 2026",
    dueDate: "30 Octobre 2026",
    clientName: "Karim Benjelloun",
    clientCompany: "Studio KB Architecture & Design SARL",
    clientIce: "001893421000045",
    totalHtEur: 4941,
    tvaEur: 988,
    totalTtcEur: 5930,
    depositReceivedEur: 2965,
    balanceDueEur: 2965,
    status: "DEPOSIT_PAID",
    paymentMethod: "VIREMENT_CIH",
  },
  {
    id: "inv-2",
    invoiceNumber: "FA-2026-0090",
    orderNumber: "CMD-2026-107",
    date: "14 Octobre 2026",
    dueDate: "14 Octobre 2026",
    clientName: "Directeur d'Exploitation",
    clientCompany: "Domaine des Oliviers Marrakech SA",
    clientIce: "002441920000078",
    totalHtEur: 8616,
    tvaEur: 1723,
    totalTtcEur: 10339,
    depositReceivedEur: 10339,
    balanceDueEur: 0,
    status: "PAID",
    paymentMethod: "VIREMENT_CIH",
  },
  {
    id: "inv-3",
    invoiceNumber: "FA-2026-0089",
    orderNumber: "CMD-2026-106",
    date: "14 Octobre 2026",
    dueDate: "29 Octobre 2026",
    clientName: "Sophie Delaunay",
    clientCompany: "Delaunay Interior Design Paris",
    clientIce: "003109482000012",
    totalHtEur: 3737,
    tvaEur: 747,
    totalTtcEur: 4485,
    depositReceivedEur: 2242,
    balanceDueEur: 2242,
    status: "DEPOSIT_PAID",
    paymentMethod: "CARTE_CMI",
  },
  {
    id: "inv-4",
    invoiceNumber: "FA-2026-0088",
    orderNumber: "CMD-2026-105",
    date: "12 Octobre 2026",
    dueDate: "26 Octobre 2026",
    clientName: "Boutique Hôtel Guéliz Art",
    clientCompany: "Guéliz Art & Hospitality SARL",
    clientIce: "002883912000091",
    totalHtEur: 2977,
    tvaEur: 595,
    totalTtcEur: 3573,
    depositReceivedEur: 0,
    balanceDueEur: 3573,
    status: "PENDING",
    paymentMethod: "VIREMENT_CIH",
  },
  {
    id: "inv-5",
    invoiceNumber: "FA-2026-0087",
    orderNumber: "CMD-2026-104",
    date: "13 Octobre 2026",
    dueDate: "13 Octobre 2026",
    clientName: "Dr. Mehdi Alami",
    clientCompany: "Particulier VIP",
    clientIce: "N/A - Particulier",
    totalHtEur: 1183,
    tvaEur: 236,
    totalTtcEur: 1420,
    depositReceivedEur: 1420,
    balanceDueEur: 0,
    status: "PAID",
    paymentMethod: "CARTE_CMI",
  },
];

const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: "cust-1",
    name: "Karim Benjelloun",
    companyName: "Studio KB Architecture & Design",
    role: "ARCHITECT",
    discountRate: 0.25,
    email: "k.benjelloun@studio-kb.ma",
    phone: "+212 6 61 24 55 88",
    city: "Marrakech / Casablanca",
    totalSpentEur: 28450,
    ordersCount: 8,
    isVerifiedPro: true,
    joinedDate: "12 Janvier 2025",
  },
  {
    id: "cust-2",
    name: "Directrice Générale",
    companyName: "Riad El Fenn Luxury Heritage",
    role: "HOTEL",
    discountRate: 0.30,
    email: "architecture@riad-elfenn.com",
    phone: "+212 6 61 99 88 77",
    city: "Médina, Marrakech",
    totalSpentEur: 42100,
    ordersCount: 14,
    isVerifiedPro: true,
    joinedDate: "04 Mars 2024",
  },
  {
    id: "cust-3",
    name: "Sophie Delaunay",
    companyName: "Delaunay Interior Design Paris",
    role: "DECORATOR",
    discountRate: 0.20,
    email: "s.delaunay@paris-interiors.fr",
    phone: "+33 6 12 34 56 78",
    city: "Paris / Marrakech",
    totalSpentEur: 19600,
    ordersCount: 5,
    isVerifiedPro: true,
    joinedDate: "18 Juin 2025",
  },
  {
    id: "cust-4",
    name: "Tariq Mansouri",
    companyName: "Palais & Riads Collection",
    role: "HOTEL",
    discountRate: 0.30,
    email: "t.mansouri@palais-marrakech.com",
    phone: "+212 6 61 44 22 11",
    city: "Palmeraie, Marrakech",
    totalSpentEur: 68900,
    ordersCount: 19,
    isVerifiedPro: true,
    joinedDate: "10 Septembre 2024",
  },
  {
    id: "cust-5",
    name: "Nadia Chraïbi",
    companyName: "Atelier d'Intérieur Casa",
    role: "DECORATOR",
    discountRate: 0.20,
    email: "n.chraibi@atelier-deco.ma",
    phone: "+212 6 62 77 33 55",
    city: "Casablanca",
    totalSpentEur: 14200,
    ordersCount: 4,
    isVerifiedPro: true,
    joinedDate: "22 Février 2026",
  },
];

const INITIAL_ATELIER_TASKS: AdminAtelierTask[] = [
  {
    id: "task-1",
    projectRef: "KTX-2026-042",
    title: "Riad Dar Al Atlas — Suites Royales & Patio",
    client: "Studio KB Architecture",
    stage: "CONFECTION_MAIN",
    meterage: 180,
    artisanMaster: "Maître Hassan (Chef d'Atelier)",
    targetDate: "28 Octobre 2026",
    priority: "HAUTE",
  },
  {
    id: "task-2",
    projectRef: "KTX-2026-039",
    title: "Villa Palmeraie — Pavillon Invités & Daybeds",
    client: "Sophie Delaunay Decor",
    stage: "COUPE_ROULEAUX",
    meterage: 135,
    artisanMaster: "Youssef (Spécialiste Coupe Lin)",
    targetDate: "12 Novembre 2026",
    priority: "NORMALE",
  },
  {
    id: "task-3",
    projectRef: "KTX-2026-044",
    title: "Boutique Hôtel Guéliz — Salons & Tenture Bar",
    client: "Guéliz Art Hospitality",
    stage: "COTES_VALIDATION",
    meterage: 95,
    artisanMaster: "Rachid (Prise de Côtes Site)",
    targetDate: "24 Novembre 2026",
    priority: "NORMALE",
  },
  {
    id: "task-4",
    projectRef: "KTX-2026-046",
    title: "Riad El Fenn Extension — Salon d'Hiver",
    client: "Riad El Fenn",
    stage: "CONTROLE_REPASSAGE",
    meterage: 65,
    artisanMaster: "Amina (Contrôle Tombé & Vapeur)",
    targetDate: "20 Octobre 2026",
    priority: "URGENTE",
  },
  {
    id: "task-5",
    projectRef: "KTX-2026-027",
    title: "Domaine des Oliviers — Pergolas & Terrasses",
    client: "Domaine des Oliviers",
    stage: "POSE_SITE",
    meterage: 320,
    artisanMaster: "Équipe Pose & Tension Extérieure",
    targetDate: "18 Octobre 2026",
    priority: "HAUTE",
  },
];

const INITIAL_DISCOUNTS: AdminDiscount[] = [
  {
    id: "disc-1",
    code: "ARCHI25",
    type: "PERCENTAGE",
    value: 25,
    usesCount: 42,
    maxUses: null,
    minPurchaseEur: 500,
    status: "ACTIVE",
    expiryDate: "31 Décembre 2026",
  },
  {
    id: "disc-2",
    code: "BIENVENUE10",
    type: "PERCENTAGE",
    value: 10,
    usesCount: 118,
    maxUses: 500,
    minPurchaseEur: 100,
    status: "ACTIVE",
    expiryDate: "31 Décembre 2026",
  },
  {
    id: "disc-3",
    code: "HOTELPALACE30",
    type: "PERCENTAGE",
    value: 30,
    usesCount: 19,
    maxUses: 50,
    minPurchaseEur: 2500,
    status: "ACTIVE",
    expiryDate: "30 Novembre 2026",
  },
  {
    id: "disc-4",
    code: "NUANCIER48H",
    type: "FIXED_AMOUNT",
    value: 50, // 50 EUR / 500 MAD de remise sur nuancier
    usesCount: 86,
    maxUses: null,
    minPurchaseEur: 0,
    status: "ACTIVE",
    expiryDate: "Sans limite",
  },
];

// ============================================================================
// MAIN COMPONENT: AdminDashboardView
// ============================================================================

interface AdminDashboardViewProps {
  session?: SessionData | null;
}

export function AdminDashboardView({ session }: AdminDashboardViewProps) {
  const pathname = usePathname();
  const currentLocale = pathname?.startsWith("/en") ? "en" : "fr";
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");

  // State collections
  const [products, setProducts] = useState<AdminProduct[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<AdminOrder[]>(INITIAL_ORDERS);
  const [invoices, setInvoices] = useState<AdminInvoice[]>(INITIAL_INVOICES);
  const [customers, setCustomers] = useState<AdminCustomer[]>(INITIAL_CUSTOMERS);
  const [atelierTasks, setAtelierTasks] = useState<AdminAtelierTask[]>(INITIAL_ATELIER_TASKS);
  const [discounts, setDiscounts] = useState<AdminDiscount[]>(INITIAL_DISCOUNTS);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>("ALL");
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>("ALL");

  // Modals
  const [selectedOrderForDrawer, setSelectedOrderForDrawer] = useState<AdminOrder | null>(null);
  const [selectedInvoiceForModal, setSelectedInvoiceForModal] = useState<AdminInvoice | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isNewDiscountModalOpen, setIsNewDiscountModalOpen] = useState(false);

  // New product form state
  const [newProductName, setNewProductName] = useState("");
  const [newProductCategory, setNewProductCategory] = useState<AdminProduct["category"]>("Lin");
  const [newProductPriceEur, setNewProductPriceEur] = useState("95");
  const [newProductStock, setNewProductStock] = useState("200");
  const [newProductWidth, setNewProductWidth] = useState("280");
  const [newProductComposition, setNewProductComposition] = useState("100% Lin Lavé Naturel");

  // New discount form state
  const [newDiscountCode, setNewDiscountCode] = useState("");
  const [newDiscountValue, setNewDiscountValue] = useState("15");

  // Format price helper with explicit space separators
  const formatMoney = (amountEur: number) => {
    const res = formatPrice(amountEur);
    const formattedVal = String(res.value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formattedVal} ${res.symbol}`;
  };

  // Calculations for KPI analytics
  const kpiData = useMemo(() => {
    const totalRevenueEur = orders.reduce((sum, o) => sum + (o.paymentStatus !== "REFUNDED" ? o.totalEur : 0), 0);
    const paidRevenueEur = invoices.reduce((sum, i) => sum + i.depositReceivedEur, 0);
    const pendingBalanceEur = invoices.reduce((sum, i) => sum + i.balanceDueEur, 0);
    const ordersCount = orders.length;
    const aovEur = ordersCount > 0 ? totalRevenueEur / ordersCount : 0;
    const totalMeterageConfection = orders.reduce((sum, o) => sum + o.meterageTotal, 0);

    return {
      totalRevenueEur,
      paidRevenueEur,
      pendingBalanceEur,
      ordersCount,
      aovEur,
      totalMeterageConfection,
    };
  }, [orders, invoices]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        orderStatusFilter === "ALL" ||
        o.fulfillmentStatus === orderStatusFilter ||
        o.paymentStatus === orderStatusFilter;

      return matchSearch && matchStatus;
    });
  }, [orders, searchQuery, orderStatusFilter]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.composition.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        productCategoryFilter === "ALL" || p.category === productCategoryFilter;

      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, productCategoryFilter]);

  // Quick actions
  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminOrder["fulfillmentStatus"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, fulfillmentStatus: newStatus } : o))
    );
    if (selectedOrderForDrawer && selectedOrderForDrawer.id === orderId) {
      setSelectedOrderForDrawer((prev) => prev ? { ...prev, fulfillmentStatus: newStatus } : null);
    }
  };

  const handleUpdatePaymentStatus = (invoiceId: string, newStatus: AdminInvoice["status"]) => {
    setInvoices((prev) =>
      prev.map((i) => {
        if (i.id === invoiceId) {
          const isPaid = newStatus === "PAID";
          return {
            ...i,
            status: newStatus,
            depositReceivedEur: isPaid ? i.totalTtcEur : i.depositReceivedEur,
            balanceDueEur: isPaid ? 0 : i.balanceDueEur,
          };
        }
        return i;
      })
    );
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const basePrice = parseFloat(newProductPriceEur) || 80;
    const stock = parseFloat(newProductStock) || 100;
    const width = parseFloat(newProductWidth) || 280;

    const newProd: AdminProduct = {
      id: `prod-${Date.now()}`,
      name: newProductName,
      sku: `KTX-${newProductCategory.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
      category: newProductCategory,
      type: "FABRIC_BY_METER",
      image: "/gallery/duvet_cover_linen_1791048696631.jpg",
      stockMeters: stock,
      lowStockThreshold: 30,
      basePriceEur: basePrice,
      tradePriceEur: basePrice * 0.75,
      widthCm: width,
      martindale: 40000,
      composition: newProductComposition,
      status: "ACTIVE",
      variantsCount: 1,
    };

    setProducts([newProd, ...products]);
    setIsNewProductModalOpen(false);
    setNewProductName("");
  };

  const handleCreateDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiscountCode.trim()) return;

    const newDisc: AdminDiscount = {
      id: `disc-${Date.now()}`,
      code: newDiscountCode.toUpperCase().replace(/\s+/g, ""),
      type: "PERCENTAGE",
      value: parseFloat(newDiscountValue) || 15,
      usesCount: 0,
      maxUses: 100,
      minPurchaseEur: 150,
      status: "ACTIVE",
      expiryDate: "31 Décembre 2026",
    };

    setDiscounts([newDisc, ...discounts]);
    setIsNewDiscountModalOpen(false);
    setNewDiscountCode("");
  };

  const handleExportCSV = () => {
    const headers = "Reference,Client,Date,Canal,Metrage,Montant_Net_EUR,Statut_Paiement,Statut_Confection\n";
    const rows = orders.map(o => 
      `"${o.orderNumber}","${o.customerName}","${o.date}","${o.channel}","${o.meterageTotal} ml","${o.totalEur}","${o.paymentStatus}","${o.fulfillmentStatus}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `kansotex_commandes_admin_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-[#eceff1] flex flex-col font-sans antialiased selection:bg-[#c29d59] selection:text-white">
      {/* ==================================================================== */}
      {/* 1. TOP MASTER NAVIGATION (Shopify Plus Style Omni-Header)            */}
      {/* ==================================================================== */}
      <header className="h-[68px] bg-[#14171f] border-b border-[#232733] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 select-none">
        {/* Left: Brand Monogram & Admin Status */}
        <div className="flex items-center gap-4">
          <Link href={`/${currentLocale}`} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c29d59] to-[#99773b] flex items-center justify-center text-white font-bold tracking-wider text-base shadow-lg shadow-[#c29d59]/20 group-hover:scale-105 transition-transform">
              K
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-termina text-xs font-bold uppercase tracking-[0.22em] text-white">Kansotex</span>
                <span className="bg-[#202738] text-[#c29d59] border border-[#c29d59]/30 text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                  Admin Suite
                </span>
              </div>
              <p className="text-[10px] text-[#8e98a8] font-mono tracking-tight">Atelier & Siège Marrakech</p>
            </div>
          </Link>

          {/* Vertical divider */}
          <div className="hidden md:block w-px h-6 bg-[#262c3b]" />

          {/* Store Live Pulse */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#78c288] bg-[#12281b] border border-[#235832] px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
            <span className="font-medium">Boutique En Ligne • Live & Synchronisée</span>
          </div>
        </div>

        {/* Center: Global Omni-Search */}
        <div className="flex-1 max-w-md mx-4 hidden sm:block">
          <div className="relative">
            <IconSearch className="w-4 h-4 text-[#606b7d] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une commande, tissu, client, facture ou métrage..."
              className="w-full h-9 pl-9 pr-4 bg-[#1b1f2b] border border-[#2b3142] rounded-lg text-xs text-white placeholder-[#606b7d] focus:outline-none focus:border-[#c29d59] focus:ring-1 focus:ring-[#c29d59] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8e98a8] hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Currency Switcher, Quick Actions & Admin Menu */}
        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center bg-[#1b1f2b] p-0.5 rounded-lg border border-[#2b3142]">
            {(["MAD", "EUR", "USD"] as CurrencyCode[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setCurrency(cur)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded tracking-wider transition-all ${
                  currency === cur
                    ? "bg-[#c29d59] text-white shadow-sm"
                    : "text-[#8e98a8] hover:text-white"
                }`}
              >
                {cur}
              </button>
            ))}
          </div>

          {/* Quick Create Button */}
          <button
            onClick={() => setIsNewProductModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 h-9 px-3.5 bg-gradient-to-r from-[#c29d59] to-[#af8745] text-white text-xs font-bold rounded-lg shadow-sm hover:brightness-110 transition-all"
          >
            <IconPlus className="w-3.5 h-3.5" />
            <span>Nouveau Tissu</span>
          </button>

          {/* View Public Store */}
          <Link
            href={`/${currentLocale}`}
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 h-9 px-3 bg-[#1b1f2b] hover:bg-[#252b3b] border border-[#2b3142] rounded-lg text-xs text-[#a4b1c7] hover:text-white transition-all"
            title="Ouvrir la boutique client"
          >
            <IconExternalLink className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Voir Boutique</span>
          </Link>

          {/* Admin Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-[#262c3b]">
            <div className="w-8 h-8 rounded-full bg-[#202738] border border-[#3b4459] flex items-center justify-center text-xs font-bold text-[#c29d59]">
              DG
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-white leading-tight">Direction Kansotex</p>
              <p className="text-[10px] text-[#6d788d]">Super Administrateur</p>
            </div>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* 2. BODY LAYOUT: SHOPIFY SIDEBAR + DYNAMIC CONTENT                    */}
      {/* ==================================================================== */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0">
        {/* Left Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-[#12151c] border-b md:border-b-0 md:border-r border-[#232733] flex flex-row md:flex-col justify-between shrink-0 overflow-x-auto md:overflow-x-visible">
          {/* Main Navigation Links */}
          <div className="p-3 md:p-4 flex flex-row md:flex-col gap-1 w-full">
            <div className="hidden md:block px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#556075]">
              Menu Principal
            </div>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left whitespace-nowrap ${
                activeTab === "analytics"
                  ? "bg-[#c29d59]/15 text-[#c29d59] font-bold border border-[#c29d59]/30"
                  : "text-[#8e98a8] hover:bg-[#1a1f2b] hover:text-white"
              }`}
            >
              <IconAnalytics className="w-4 h-4 shrink-0" />
              <span>Vue d'Ensemble & Stats</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left whitespace-nowrap ${
                activeTab === "orders"
                  ? "bg-[#c29d59]/15 text-[#c29d59] font-bold border border-[#c29d59]/30"
                  : "text-[#8e98a8] hover:bg-[#1a1f2b] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconBox className="w-4 h-4 shrink-0" />
                <span>Commandes & Ventes</span>
              </div>
              <span className="bg-[#242b3b] text-[#c29d59] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left whitespace-nowrap ${
                activeTab === "products"
                  ? "bg-[#c29d59]/15 text-[#c29d59] font-bold border border-[#c29d59]/30"
                  : "text-[#8e98a8] hover:bg-[#1a1f2b] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconLayers className="w-4 h-4 shrink-0" />
                <span>Catalogue & Rouleaux</span>
              </div>
              <span className="bg-[#242b3b] text-[#8e98a8] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("invoices")}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left whitespace-nowrap ${
                activeTab === "invoices"
                  ? "bg-[#c29d59]/15 text-[#c29d59] font-bold border border-[#c29d59]/30"
                  : "text-[#8e98a8] hover:bg-[#1a1f2b] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconInvoice className="w-4 h-4 shrink-0" />
                <span>Factures & Règlements</span>
              </div>
              <span className="bg-[#242b3b] text-[#8e98a8] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {invoices.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("atelier")}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left whitespace-nowrap ${
                activeTab === "atelier"
                  ? "bg-[#c29d59]/15 text-[#c29d59] font-bold border border-[#c29d59]/30"
                  : "text-[#8e98a8] hover:bg-[#1a1f2b] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconAtelier className="w-4 h-4 shrink-0" />
                <span>Atelier Marrakech</span>
              </div>
              <span className="bg-[#235832] text-[#4ade80] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {atelierTasks.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("customers")}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left whitespace-nowrap ${
                activeTab === "customers"
                  ? "bg-[#c29d59]/15 text-[#c29d59] font-bold border border-[#c29d59]/30"
                  : "text-[#8e98a8] hover:bg-[#1a1f2b] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconUsers className="w-4 h-4 shrink-0" />
                <span>Clients & Comptes Pro</span>
              </div>
              <span className="bg-[#242b3b] text-[#8e98a8] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {customers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("marketing")}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left whitespace-nowrap ${
                activeTab === "marketing"
                  ? "bg-[#c29d59]/15 text-[#c29d59] font-bold border border-[#c29d59]/30"
                  : "text-[#8e98a8] hover:bg-[#1a1f2b] hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <IconDiscount className="w-4 h-4 shrink-0" />
                <span>Marketing & Codes Promo</span>
              </div>
              <span className="bg-[#242b3b] text-[#8e98a8] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {discounts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left whitespace-nowrap ${
                activeTab === "settings"
                  ? "bg-[#c29d59]/15 text-[#c29d59] font-bold border border-[#c29d59]/30"
                  : "text-[#8e98a8] hover:bg-[#1a1f2b] hover:text-white"
              }`}
            >
              <IconSettings className="w-4 h-4 shrink-0" />
              <span>Paramètres du Store</span>
            </button>
          </div>

          {/* Bottom Atelier Quick Phone & Help */}
          <div className="hidden md:block p-4 border-t border-[#232733] bg-[#0d0f14]">
            <div className="bg-[#171b24] p-3 rounded-lg border border-[#272e3d]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c29d59]">Atelier Marrakech</span>
                <span className="w-2 h-2 rounded-full bg-[#4ade80]" />
              </div>
              <p className="text-[11px] text-[#8e98a8] font-mono">+212 5 24 33 00 00</p>
              <p className="text-[10px] text-[#556075] mt-1">Sidi Ghanem • 08h30 - 18h30</p>
            </div>
          </div>
        </aside>

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 bg-[#0b0d12] overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* ================================================================ */}
          {/* TAB 1: ANALYTICS & VUE D'ENSEMBLE                                */}
          {/* ================================================================ */}
          {activeTab === "analytics" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header with Title & Period Selector */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#202533]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Vue d'Ensemble & Statistiques Live</h1>
                  <p className="text-xs text-[#8e98a8] mt-1">
                    Suivi en temps réel des ventes e-commerce, chantiers d'architecture et facturation atelier Kansotex.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 h-8 px-3 bg-[#1b1f2b] hover:bg-[#252b3b] border border-[#2b3142] rounded-lg text-xs font-medium text-white transition-all"
                  >
                    <IconDownload className="w-3.5 h-3.5 text-[#c29d59]" />
                    <span>Exporter CSV</span>
                  </button>
                  <div className="bg-[#1b1f2b] border border-[#2b3142] px-3 py-1.5 rounded-lg text-xs font-bold text-[#c29d59]">
                    Octobre 2026
                  </div>
                </div>
              </div>

              {/* 4 Core Financial KPI Cards (Shopify Style) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Chiffre d'Affaires Total */}
                <div className="bg-[#141720] border border-[#222736] p-5 rounded-xl relative overflow-hidden">
                  <div className="flex items-center justify-between text-[#8e98a8] text-xs mb-2">
                    <span>Chiffre d'Affaires Net</span>
                    <span className="text-[#4ade80] flex items-center gap-0.5 text-[11px] font-bold">
                      <IconTrendingUp className="w-3 h-3" /> +26.4%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight tabular-nums">
                    {formatMoney(kpiData.totalRevenueEur)}
                  </div>
                  <p className="text-[11px] text-[#606b7d] mt-2">
                    Commandes Web B2C & Devis Chantiers B2B
                  </p>
                </div>

                {/* 2. Encaissé (Acomptes & Soldes) */}
                <div className="bg-[#141720] border border-[#222736] p-5 rounded-xl">
                  <div className="flex items-center justify-between text-[#8e98a8] text-xs mb-2">
                    <span>Règlements Reçus (CIH / CMI)</span>
                    <span className="text-[#4ade80] text-[11px] font-bold">Encaissé 100%</span>
                  </div>
                  <div className="text-2xl font-bold text-[#4ade80] tracking-tight tabular-nums">
                    {formatMoney(kpiData.paidRevenueEur)}
                  </div>
                  <p className="text-[11px] text-[#606b7d] mt-2">
                    Acomptes 50% perçus & factures soldées
                  </p>
                </div>

                {/* 3. Soldes Restants en Attente */}
                <div className="bg-[#141720] border border-[#222736] p-5 rounded-xl">
                  <div className="flex items-center justify-between text-[#8e98a8] text-xs mb-2">
                    <span>Solde Restant à la Pose</span>
                    <span className="text-[#f59e0b] text-[11px] font-bold">À la livraison</span>
                  </div>
                  <div className="text-2xl font-bold text-[#f59e0b] tracking-tight tabular-nums">
                    {formatMoney(kpiData.pendingBalanceEur)}
                  </div>
                  <p className="text-[11px] text-[#606b7d] mt-2">
                    Recouvrement planifié à la réception chantier
                  </p>
                </div>

                {/* 4. Panier Moyen (AOV) & Métrage */}
                <div className="bg-[#141720] border border-[#222736] p-5 rounded-xl">
                  <div className="flex items-center justify-between text-[#8e98a8] text-xs mb-2">
                    <span>Panier Moyen (AOV)</span>
                    <span className="text-[#38bdf8] text-[11px] font-bold">Métrage : {kpiData.totalMeterageConfection} ml</span>
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight tabular-nums">
                    {formatMoney(kpiData.aovEur)}
                  </div>
                  <p className="text-[11px] text-[#606b7d] mt-2">
                    Taux de conversion global boutique : 3.92%
                  </p>
                </div>
              </div>

              {/* Middle Section: Sales Evolution Graph + Channels Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 30-Day Sales Chart (Luxury SVG representation) */}
                <div className="lg:col-span-2 bg-[#141720] border border-[#222736] p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-sm font-bold text-white">Évolution des Ventes (30 Derniers Jours)</h2>
                      <p className="text-xs text-[#8e98a8] mt-0.5">Progression constante du volume chantiers architectes</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#8e98a8]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#c29d59]" />
                        <span>Chiffre Réalisé</span>
                      </div>
                    </div>
                  </div>

                  {/* SVG Chart visualization */}
                  <div className="h-56 w-full flex flex-col justify-end">
                    <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-2 border-b border-[#252c3d]">
                      {[42, 68, 55, 84, 62, 95, 78, 110, 89, 134, 105, 148, 120, 165].map((height, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                          <div
                            style={{ height: `${height}%` }}
                            className="w-full bg-gradient-to-t from-[#8f7035] to-[#c29d59] rounded-t-sm group-hover:brightness-125 transition-all relative"
                          >
                            {/* Hover tooltip */}
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#202738] text-[10px] text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 border border-[#3b4459]">
                              {height * 120} EUR
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* X-axis labels */}
                    <div className="flex justify-between text-[10px] text-[#556075] px-2 pt-2">
                      <span>01 Oct</span>
                      <span>05 Oct</span>
                      <span>10 Oct</span>
                      <span>15 Oct (Aujourd'hui)</span>
                    </div>
                  </div>
                </div>

                {/* Sales Breakdown by Channel */}
                <div className="bg-[#141720] border border-[#222736] p-6 rounded-xl flex flex-col justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white mb-1">Répartition des Canaux</h2>
                    <p className="text-xs text-[#8e98a8] mb-5">Origine des commandes & chantiers</p>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white font-medium">Architectes & Décorateurs (B2B)</span>
                          <span className="text-[#c29d59] font-bold">54%</span>
                        </div>
                        <div className="w-full h-2 bg-[#202636] rounded-full overflow-hidden">
                          <div className="h-full bg-[#c29d59] rounded-full" style={{ width: "54%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white font-medium">Hôtellerie de Luxe & Riads</span>
                          <span className="text-[#4ade80] font-bold">28%</span>
                        </div>
                        <div className="w-full h-2 bg-[#202636] rounded-full overflow-hidden">
                          <div className="h-full bg-[#4ade80] rounded-full" style={{ width: "28%" }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white font-medium">E-commerce Grand Public (B2C)</span>
                          <span className="text-[#38bdf8] font-bold">18%</span>
                        </div>
                        <div className="w-full h-2 bg-[#202636] rounded-full overflow-hidden">
                          <div className="h-full bg-[#38bdf8] rounded-full" style={{ width: "18%" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Operational Atelier Health */}
                  <div className="mt-6 pt-4 border-t border-[#232733] bg-[#0f121a] p-3 rounded-lg">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#8e98a8]">Cadence Atelier Marrakech</span>
                      <span className="text-[#4ade80] font-bold">94% Capacité</span>
                    </div>
                    <p className="text-[11px] text-[#556075]">4 chantiers en confection simultanée à Sidi Ghanem</p>
                  </div>
                </div>
              </div>

              {/* Bottom: Recent Orders Quick Feed */}
              <div className="bg-[#141720] border border-[#222736] rounded-xl overflow-hidden">
                <div className="p-4 sm:p-5 border-b border-[#222736] flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-white">Dernières Commandes & Devis Validés</h2>
                    <p className="text-xs text-[#8e98a8]">Flux en direct des transactions récentes</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-[#c29d59] hover:underline font-medium"
                  >
                    Voir toutes les commandes →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-[#222736] text-[10px] font-bold uppercase tracking-wider text-[#606b7d] bg-[#11131a]">
                        <th className="py-3 px-4">Commande</th>
                        <th className="py-3 px-4">Client & Ville</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Métrage</th>
                        <th className="py-3 px-4">Total Net</th>
                        <th className="py-3 px-4">Paiement</th>
                        <th className="py-3 px-4">Confection / Envoi</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2330]">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-[#191d29] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            {order.orderNumber}
                          </td>
                          <td className="py-3.5 px-4">
                            <p className="font-medium text-white">{order.customerName}</p>
                            <p className="text-[10px] text-[#8e98a8]">{order.city}</p>
                          </td>
                          <td className="py-3.5 px-4 text-[#8e98a8]">{order.date}</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            {order.meterageTotal > 0 ? `${order.meterageTotal} ml` : `${order.itemsCount} pièces`}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-white tabular-nums">
                            {formatMoney(order.totalEur)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                order.paymentStatus === "PAID"
                                  ? "bg-[#183925] text-[#4ade80] border border-[#235832]"
                                  : order.paymentStatus === "DEPOSIT_50"
                                  ? "bg-[#332512] text-[#fbbf24] border border-[#593e17]"
                                  : "bg-[#2d1b1b] text-[#f87171] border border-[#5c2828]"
                              }`}
                            >
                              {order.paymentStatus === "PAID"
                                ? "Payé 100%"
                                : order.paymentStatus === "DEPOSIT_50"
                                ? "Acompte 50%"
                                : "En attente"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                order.fulfillmentStatus === "DELIVERED"
                                  ? "bg-[#183925] text-[#4ade80]"
                                  : order.fulfillmentStatus === "SHIPPED"
                                  ? "bg-[#1c2e4a] text-[#60a5fa]"
                                  : order.fulfillmentStatus === "IN_CONFECTION"
                                  ? "bg-[#332512] text-[#fbbf24]"
                                  : "bg-[#252b3b] text-[#a4b1c7]"
                              }`}
                            >
                              {order.fulfillmentStatus === "DELIVERED"
                                ? "Livré / Posé"
                                : order.fulfillmentStatus === "SHIPPED"
                                ? "Expédié"
                                : order.fulfillmentStatus === "IN_CONFECTION"
                                ? "En Confection"
                                : order.fulfillmentStatus === "CUTTING_ATELIER"
                                ? "Coupe Atelier"
                                : "En Attente"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedOrderForDrawer(order)}
                              className="px-2.5 py-1 bg-[#202636] hover:bg-[#2b3347] text-white rounded text-[11px] font-medium transition-colors"
                            >
                              Détails
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 2: COMMANDES & VENTES (Shopify Orders Management)            */}
          {/* ================================================================ */}
          {activeTab === "orders" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#202533]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Gestion des Commandes & Chantiers</h1>
                  <p className="text-xs text-[#8e98a8] mt-1">
                    Suivi complet des commandes e-commerce grand public et des devis validés d'architecture intérieure.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 h-9 px-3.5 bg-[#1b1f2b] hover:bg-[#252b3b] border border-[#2b3142] rounded-lg text-xs font-medium text-white transition-all"
                  >
                    <IconDownload className="w-3.5 h-3.5 text-[#c29d59]" />
                    <span>Exporter CSV</span>
                  </button>
                </div>
              </div>

              {/* Status Filter Tabs (Shopify Style) */}
              <div className="flex flex-wrap items-center gap-2 border-b border-[#222736] pb-3">
                {[
                  { key: "ALL", label: `Toutes (${orders.length})` },
                  { key: "IN_CONFECTION", label: "En Confection Atelier" },
                  { key: "CUTTING_ATELIER", label: "Coupe des Rouleaux" },
                  { key: "SHIPPED", label: "Expédiées" },
                  { key: "DELIVERED", label: "Livrées / Posées" },
                  { key: "DEPOSIT_50", label: "Acomptes 50% Réglés" },
                ].map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setOrderStatusFilter(f.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      orderStatusFilter === f.key
                        ? "bg-[#c29d59] text-white font-bold"
                        : "bg-[#141720] text-[#8e98a8] hover:text-white border border-[#222736]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Orders Data Table */}
              <div className="bg-[#141720] border border-[#222736] rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[950px]">
                    <thead>
                      <tr className="border-b border-[#222736] text-[10px] font-bold uppercase tracking-wider text-[#606b7d] bg-[#11131a]">
                        <th className="py-3 px-4 w-[130px]">Numéro</th>
                        <th className="py-3 px-4 min-w-[200px]">Client / Société</th>
                        <th className="py-3 px-4 w-[120px]">Canal</th>
                        <th className="py-3 px-4 w-[100px]">Métrage</th>
                        <th className="py-3 px-4 w-[140px]">Montant Net</th>
                        <th className="py-3 px-4 w-[130px]">Paiement</th>
                        <th className="py-3 px-4 w-[150px]">Statut Atelier</th>
                        <th className="py-3 px-4 text-right w-[150px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2330]">
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-[#191d29] transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-white">
                            {order.orderNumber}
                            <p className="text-[10px] font-sans font-normal text-[#8e98a8]">{order.date}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-white">{order.customerName}</p>
                            <p className="text-[11px] text-[#8e98a8]">{order.city}</p>
                            <span className="text-[9px] font-bold uppercase tracking-wider text-[#c29d59]">
                              {order.customerType.replace("_", " ")}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-[#a4b1c7]">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-[#1c212d] border border-[#2a3245]">
                              {order.channel.replace("_", " ")}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-white">
                            {order.meterageTotal > 0 ? `${order.meterageTotal} ml` : `${order.itemsCount} pièces`}
                          </td>
                          <td className="py-4 px-4 font-bold text-white tabular-nums text-sm">
                            {formatMoney(order.totalEur)}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                order.paymentStatus === "PAID"
                                  ? "bg-[#183925] text-[#4ade80] border border-[#235832]"
                                  : order.paymentStatus === "DEPOSIT_50"
                                  ? "bg-[#332512] text-[#fbbf24] border border-[#593e17]"
                                  : "bg-[#2d1b1b] text-[#f87171] border border-[#5c2828]"
                              }`}
                            >
                              {order.paymentStatus === "PAID"
                                ? "Payé 100%"
                                : order.paymentStatus === "DEPOSIT_50"
                                ? "Acompte 50%"
                                : "En attente"}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <select
                              value={order.fulfillmentStatus}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as AdminOrder["fulfillmentStatus"])}
                              className="bg-[#1b1f2b] border border-[#2b3142] text-white text-[11px] rounded px-2 py-1 font-medium focus:outline-none focus:border-[#c29d59]"
                            >
                              <option value="PENDING">En Attente</option>
                              <option value="CUTTING_ATELIER">Coupe Atelier</option>
                              <option value="IN_CONFECTION">En Confection</option>
                              <option value="SHIPPED">Expédié</option>
                              <option value="DELIVERED">Livré / Réceptionné</option>
                              <option value="CANCELLED">Annulé</option>
                            </select>
                          </td>
                          <td className="py-4 px-4 text-right space-x-1.5">
                            <button
                              onClick={() => setSelectedOrderForDrawer(order)}
                              className="px-2.5 py-1 bg-[#202636] hover:bg-[#2b3347] text-white rounded text-[11px] font-medium transition-colors"
                            >
                              Fiche
                            </button>
                            <a
                              href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}?text=Bonjour%20${encodeURIComponent(order.customerName)},%20suivi%20de%20votre%20commande%20Kansotex%20${order.orderNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2 py-1 bg-[#12281b] hover:bg-[#1a3826] text-[#4ade80] rounded text-[11px] font-medium transition-colors border border-[#235832]"
                              title="Envoyer notification WhatsApp"
                            >
                              <IconWhatsApp className="w-3 h-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 3: CATALOGUE & ROULEAUX (Shopify Products & Inventory)       */}
          {/* ================================================================ */}
          {activeTab === "products" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header with Add Product Modal Trigger */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#202533]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Catalogue Tissus & Gestion des Rouleaux</h1>
                  <p className="text-xs text-[#8e98a8] mt-1">
                    Gestion des métrages disponibles, spécifications techniques (laize, Martindale), tarifs publics et pro.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsNewProductModalOpen(true)}
                    className="flex items-center gap-1.5 h-9 px-4 bg-gradient-to-r from-[#c29d59] to-[#af8745] text-white text-xs font-bold rounded-lg shadow-sm hover:brightness-110 transition-all"
                  >
                    <IconPlus className="w-3.5 h-3.5" />
                    <span>Ajouter un Tissu / Produit</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 border-b border-[#222736] pb-3">
                {["ALL", "Lin", "Velours", "Voilage", "Outdoor", "Linge de Lit", "Linge de Table"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProductCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      productCategoryFilter === cat
                        ? "bg-[#c29d59] text-white font-bold"
                        : "bg-[#141720] text-[#8e98a8] hover:text-white border border-[#222736]"
                    }`}
                  >
                    {cat === "ALL" ? "Toutes Catégories" : cat}
                  </button>
                ))}
              </div>

              {/* Products Table */}
              <div className="bg-[#141720] border border-[#222736] rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[900px]">
                    <thead>
                      <tr className="border-b border-[#222736] text-[10px] font-bold uppercase tracking-wider text-[#606b7d] bg-[#11131a]">
                        <th className="py-3 px-4 w-[280px]">Tissu & Référence</th>
                        <th className="py-3 px-4 w-[120px]">Catégorie</th>
                        <th className="py-3 px-4 w-[120px]">Stock Rouleau</th>
                        <th className="py-3 px-4 w-[110px]">Laize (Largeur)</th>
                        <th className="py-3 px-4 w-[130px]">Prix Public TTC</th>
                        <th className="py-3 px-4 w-[130px]">Tarif Pro Net</th>
                        <th className="py-3 px-4 w-[110px]">Statut</th>
                        <th className="py-3 px-4 text-right w-[110px]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2330]">
                      {filteredProducts.map((prod) => (
                        <tr key={prod.id} className="hover:bg-[#191d29] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded bg-[#202738] overflow-hidden shrink-0 border border-[#2b3347] relative">
                                <Image
                                  src={prod.image}
                                  alt={prod.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-semibold text-white leading-tight">{prod.name}</p>
                                <p className="text-[10px] font-mono text-[#8e98a8] mt-0.5">{prod.sku}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#a4b1c7]">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-[#1b1f2b] border border-[#2b3142]">
                              {prod.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-white text-sm">
                                {prod.stockMeters} {prod.type === "FABRIC_BY_METER" ? "ml" : "pcs"}
                              </span>
                            </div>
                            {prod.stockMeters <= prod.lowStockThreshold && (
                              <span className="text-[10px] text-[#f87171] flex items-center gap-1 font-bold mt-0.5">
                                <IconAlert className="w-3 h-3" /> Seuil d'alerte
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[#a4b1c7]">
                            {prod.widthCm} cm
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-white tabular-nums">
                            {formatMoney(prod.basePriceEur)}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#c29d59] tabular-nums">
                            {formatMoney(prod.tradePriceEur)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                prod.status === "ACTIVE"
                                  ? "bg-[#183925] text-[#4ade80]"
                                  : prod.status === "LOW_STOCK"
                                  ? "bg-[#332512] text-[#fbbf24]"
                                  : "bg-[#2d1b1b] text-[#f87171]"
                              }`}
                            >
                              {prod.status === "ACTIVE" ? "En Ligne" : prod.status === "LOW_STOCK" ? "Stock Faible" : "Rupture"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                const addMeters = prompt("Entrez le métrage reçu à ajouter au rouleau :", "50");
                                if (addMeters && !isNaN(parseFloat(addMeters))) {
                                  setProducts(prev => prev.map(p => p.id === prod.id ? { ...p, stockMeters: p.stockMeters + parseFloat(addMeters) } : p));
                                }
                              }}
                              className="px-2.5 py-1 bg-[#202636] hover:bg-[#2b3347] text-white rounded text-[11px] font-medium transition-colors"
                            >
                              + Stock
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 4: FACTURES & RÈGLEMENTS (Moroccan Compliance System)        */}
          {/* ================================================================ */}
          {activeTab === "invoices" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#202533]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Facturation Officielle & Règlements</h1>
                  <p className="text-xs text-[#8e98a8] mt-1">
                    Conformité marocaine : ICE (002984512000084), TVA 20%, IF (52849102), RIB CIH Bank et acomptes 50%.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#1b1f2b] border border-[#2b3142] px-3 py-1.5 rounded-lg text-xs font-mono text-[#4ade80]">
                    RIB CIH : 230 450 48291048291048 29
                  </div>
                </div>
              </div>

              {/* Financial Invoicing KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#141720] border border-[#222736] p-5 rounded-xl">
                  <span className="text-[#8e98a8] text-xs">Total Facturé TTC</span>
                  <div className="text-2xl font-bold text-white tracking-tight mt-1 tabular-nums">
                    {formatMoney(invoices.reduce((sum, i) => sum + i.totalTtcEur, 0))}
                  </div>
                </div>
                <div className="bg-[#141720] border border-[#222736] p-5 rounded-xl">
                  <span className="text-[#8e98a8] text-xs">Règlements Encaissés (CIH / CMI)</span>
                  <div className="text-2xl font-bold text-[#4ade80] tracking-tight mt-1 tabular-nums">
                    {formatMoney(invoices.reduce((sum, i) => sum + i.depositReceivedEur, 0))}
                  </div>
                </div>
                <div className="bg-[#141720] border border-[#222736] p-5 rounded-xl">
                  <span className="text-[#8e98a8] text-xs">Soldes Restants en Attente</span>
                  <div className="text-2xl font-bold text-[#f59e0b] tracking-tight mt-1 tabular-nums">
                    {formatMoney(invoices.reduce((sum, i) => sum + i.balanceDueEur, 0))}
                  </div>
                </div>
              </div>

              {/* Invoices List */}
              <div className="bg-[#141720] border border-[#222736] rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[950px]">
                    <thead>
                      <tr className="border-b border-[#222736] text-[10px] font-bold uppercase tracking-wider text-[#606b7d] bg-[#11131a]">
                        <th className="py-3 px-4 w-[130px]">N° Facture</th>
                        <th className="py-3 px-4 min-w-[200px]">Client / ICE</th>
                        <th className="py-3 px-4 w-[110px]">Émission</th>
                        <th className="py-3 px-4 w-[130px]">Total HT</th>
                        <th className="py-3 px-4 w-[110px]">TVA 20%</th>
                        <th className="py-3 px-4 w-[140px]">Total TTC</th>
                        <th className="py-3 px-4 w-[130px]">Statut</th>
                        <th className="py-3 px-4 text-right w-[160px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2330]">
                      {invoices.map((inv) => (
                        <tr key={inv.id} className="hover:bg-[#191d29] transition-colors">
                          <td className="py-4 px-4 font-mono font-bold text-white">
                            {inv.invoiceNumber}
                            <p className="text-[10px] font-sans font-normal text-[#8e98a8]">{inv.orderNumber}</p>
                          </td>
                          <td className="py-4 px-4">
                            <p className="font-semibold text-white">{inv.clientCompany}</p>
                            <p className="text-[11px] text-[#8e98a8]">{inv.clientName}</p>
                            <p className="text-[10px] font-mono text-[#c29d59] mt-0.5">ICE: {inv.clientIce}</p>
                          </td>
                          <td className="py-4 px-4 text-[#8e98a8]">{inv.date}</td>
                          <td className="py-4 px-4 font-mono text-white tabular-nums">
                            {formatMoney(inv.totalHtEur)}
                          </td>
                          <td className="py-4 px-4 font-mono text-[#8e98a8] tabular-nums">
                            {formatMoney(inv.tvaEur)}
                          </td>
                          <td className="py-4 px-4 font-bold text-white tabular-nums text-sm">
                            {formatMoney(inv.totalTtcEur)}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                inv.status === "PAID"
                                  ? "bg-[#183925] text-[#4ade80] border border-[#235832]"
                                  : inv.status === "DEPOSIT_PAID"
                                  ? "bg-[#332512] text-[#fbbf24] border border-[#593e17]"
                                  : "bg-[#2d1b1b] text-[#f87171] border border-[#5c2828]"
                              }`}
                            >
                              {inv.status === "PAID"
                                ? "Réglée 100%"
                                : inv.status === "DEPOSIT_PAID"
                                ? "Acompte 50%"
                                : "En attente"}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right space-x-1.5">
                            <button
                              onClick={() => setSelectedInvoiceForModal(inv)}
                              className="px-2.5 py-1 bg-[#202636] hover:bg-[#2b3347] text-white rounded text-[11px] font-medium transition-colors"
                            >
                              Visualiser
                            </button>
                            <button
                              onClick={() => handleUpdatePaymentStatus(inv.id, inv.status === "PAID" ? "DEPOSIT_PAID" : "PAID")}
                              className="px-2 py-1 bg-[#12281b] hover:bg-[#1a3826] text-[#4ade80] rounded text-[11px] font-medium transition-colors border border-[#235832]"
                              title="Basculer statut réglé"
                            >
                              <IconCheck className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 5: ATELIER MARRAKECH (Bespoke Production Kanban)             */}
          {/* ================================================================ */}
          {activeTab === "atelier" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#202533]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Atelier de Confection — Marrakech Sidi Ghanem</h1>
                  <p className="text-xs text-[#8e98a8] mt-1">
                    Gestion de production textile : coupe au laser/ciseaux d'art, ourlet main, contrôle tombé et pose sur site.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#12281b] border border-[#235832] text-[#4ade80] text-xs font-bold px-3 py-1.5 rounded-lg">
                    5 Chantiers en cours de confection
                  </div>
                </div>
              </div>

              {/* 5 Stages Kanban Pipeline */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { stage: "COTES_VALIDATION", label: "1. Prise de Côtes & Validation" },
                  { stage: "COUPE_ROULEAUX", label: "2. Coupe des Rouleaux" },
                  { stage: "CONFECTION_MAIN", label: "3. Confection & Finition Main" },
                  { stage: "CONTROLE_REPASSAGE", label: "4. Contrôle Vapeur & Tombé" },
                  { stage: "POSE_SITE", label: "5. Pose & Installation Site" },
                ].map((col) => {
                  const tasksInStage = atelierTasks.filter((t) => t.stage === col.stage);
                  return (
                    <div key={col.stage} className="bg-[#141720] border border-[#222736] rounded-xl p-3 flex flex-col">
                      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#222736]">
                        <h2 className="text-xs font-bold text-white tracking-tight">{col.label}</h2>
                        <span className="text-[10px] font-bold bg-[#202636] text-[#c29d59] px-1.5 py-0.5 rounded-full">
                          {tasksInStage.length}
                        </span>
                      </div>

                      <div className="space-y-2.5 flex-1">
                        {tasksInStage.map((task) => (
                          <div
                            key={task.id}
                            className="bg-[#1b1f2b] p-3 rounded-lg border border-[#2b3142] hover:border-[#c29d59]/50 transition-all space-y-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-mono text-[#c29d59] font-bold">{task.projectRef}</span>
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                                  task.priority === "URGENTE"
                                    ? "bg-[#2d1b1b] text-[#f87171]"
                                    : "bg-[#202636] text-[#a4b1c7]"
                                }`}
                              >
                                {task.priority}
                              </span>
                            </div>

                            <p className="text-xs font-bold text-white leading-snug">{task.title}</p>
                            <p className="text-[11px] text-[#8e98a8]">{task.client}</p>

                            <div className="pt-2 border-t border-[#252b3b] flex items-center justify-between text-[10px] text-[#606b7d]">
                              <span>{task.meterage} ml</span>
                              <span className="text-[#a4b1c7]">{task.targetDate}</span>
                            </div>

                            {/* Stage progression button */}
                            <button
                              onClick={() => {
                                const stages: AdminAtelierTask["stage"][] = [
                                  "COTES_VALIDATION",
                                  "COUPE_ROULEAUX",
                                  "CONFECTION_MAIN",
                                  "CONTROLE_REPASSAGE",
                                  "POSE_SITE",
                                ];
                                const currentIdx = stages.indexOf(task.stage);
                                if (currentIdx < stages.length - 1) {
                                  const nextStage = stages[currentIdx + 1];
                                  setAtelierTasks(prev => prev.map(t => t.id === task.id ? { ...t, stage: nextStage } : t));
                                }
                              }}
                              className="w-full mt-1 py-1 bg-[#202636] hover:bg-[#2b3347] text-white rounded text-[10px] font-medium text-center transition-colors"
                            >
                              Étape suivante →
                            </button>
                          </div>
                        ))}

                        {tasksInStage.length === 0 && (
                          <div className="h-24 border border-dashed border-[#222736] rounded-lg flex items-center justify-center text-[11px] text-[#556075]">
                            Aucun chantier à cette étape
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 6: CLIENTS & COMPTES PRO (CRM & Partner Directory)          */}
          {/* ================================================================ */}
          {activeTab === "customers" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#202533]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Répertoire Clients & Partenaires Pro</h1>
                  <p className="text-xs text-[#8e98a8] mt-1">
                    Gestion des comptes Architectes (-25%), Hôtellerie (-30%), Décorateurs (-20%) et clients VIP grand public.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-[#1b1f2b] border border-[#2b3142] px-3 py-1.5 rounded-lg text-xs font-bold text-[#c29d59]">
                    {customers.length} Partenaires Enregistrés
                  </div>
                </div>
              </div>

              {/* Customers List */}
              <div className="bg-[#141720] border border-[#222736] rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[900px]">
                    <thead>
                      <tr className="border-b border-[#222736] text-[10px] font-bold uppercase tracking-wider text-[#606b7d] bg-[#11131a]">
                        <th className="py-3 px-4 min-w-[220px]">Nom & Société</th>
                        <th className="py-3 px-4 w-[140px]">Statut B2B</th>
                        <th className="py-3 px-4 w-[110px]">Remise</th>
                        <th className="py-3 px-4 min-w-[180px]">Contact Téléphone & Email</th>
                        <th className="py-3 px-4 w-[110px]">Commandes</th>
                        <th className="py-3 px-4 w-[140px]">Total Dépensé</th>
                        <th className="py-3 px-4 text-right w-[140px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2330]">
                      {customers.map((cust) => (
                        <tr key={cust.id} className="hover:bg-[#191d29] transition-colors">
                          <td className="py-4 px-4">
                            <p className="font-semibold text-white">{cust.name}</p>
                            <p className="text-[11px] text-[#c29d59]">{cust.companyName}</p>
                            <p className="text-[10px] text-[#8e98a8]">{cust.city}</p>
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#1b1f2b] border border-[#2b3142] text-[#c29d59]">
                              {cust.role}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-[#4ade80] text-sm">
                            -{cust.discountRate * 100}%
                          </td>
                          <td className="py-4 px-4 text-[#a4b1c7]">
                            <p className="font-mono text-white">{cust.phone}</p>
                            <p className="text-[11px] text-[#8e98a8]">{cust.email}</p>
                          </td>
                          <td className="py-4 px-4 font-mono font-bold text-white">
                            {cust.ordersCount} chantiers
                          </td>
                          <td className="py-4 px-4 font-bold text-white tabular-nums text-sm">
                            {formatMoney(cust.totalSpentEur)}
                          </td>
                          <td className="py-4 px-4 text-right space-x-1.5">
                            <a
                              href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, "")}?text=Bonjour%20${encodeURIComponent(cust.name)},%20Kansotex%20Marrakech%20%C3%A0%20votre%20service.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#12281b] hover:bg-[#1a3826] text-[#4ade80] rounded text-[11px] font-medium transition-colors border border-[#235832]"
                            >
                              <IconWhatsApp className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 7: MARKETING & CODES PROMO (Shopify Discounts)               */}
          {/* ================================================================ */}
          {activeTab === "marketing" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#202533]">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Marketing & Codes Promotionnels</h1>
                  <p className="text-xs text-[#8e98a8] mt-1">
                    Gestion des codes de réduction pour prescripteurs, hôteliers et campagnes privées Kansotex.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsNewDiscountModalOpen(true)}
                    className="flex items-center gap-1.5 h-9 px-4 bg-gradient-to-r from-[#c29d59] to-[#af8745] text-white text-xs font-bold rounded-lg shadow-sm hover:brightness-110 transition-all"
                  >
                    <IconPlus className="w-3.5 h-3.5" />
                    <span>Créer un Code Promo</span>
                  </button>
                </div>
              </div>

              {/* Discounts Table */}
              <div className="bg-[#141720] border border-[#222736] rounded-xl overflow-hidden shadow-lg">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[750px]">
                    <thead>
                      <tr className="border-b border-[#222736] text-[10px] font-bold uppercase tracking-wider text-[#606b7d] bg-[#11131a]">
                        <th className="py-3 px-4">Code Promotionnel</th>
                        <th className="py-3 px-4">Valeur de la Remise</th>
                        <th className="py-3 px-4">Utilisations</th>
                        <th className="py-3 px-4">Expiration</th>
                        <th className="py-3 px-4">Statut</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1e2330]">
                      {discounts.map((disc) => (
                        <tr key={disc.id} className="hover:bg-[#191d29] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-white text-sm">
                            <span className="bg-[#202738] border border-[#3b4459] px-2.5 py-1 rounded text-[#c29d59]">
                              {disc.code}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#4ade80] text-sm">
                            {disc.type === "PERCENTAGE" ? `-${disc.value}%` : `-${disc.value} EUR`}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-white">
                            {disc.usesCount} {disc.maxUses ? `/ ${disc.maxUses}` : "fois (Illimité)"}
                          </td>
                          <td className="py-3.5 px-4 text-[#8e98a8]">{disc.expiryDate}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#183925] text-[#4ade80]">
                              {disc.status === "ACTIVE" ? "Actif" : "Expiré"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setDiscounts(prev => prev.filter(d => d.id !== disc.id))}
                              className="px-2.5 py-1 bg-[#2d1b1b] hover:bg-[#3d2424] text-[#f87171] rounded text-[11px] font-medium transition-colors"
                            >
                              Désactiver
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 8: PARAMÈTRES DU STORE (Shopify Store Configuration)         */}
          {/* ================================================================ */}
          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="pb-2 border-b border-[#202533]">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Paramètres Généraux de la Maison Kansotex</h1>
                <p className="text-xs text-[#8e98a8] mt-1">
                  Coordonnées légales de l'entreprise, coordonnées bancaires CIH, fiscalité et conciergerie WhatsApp.
                </p>
              </div>

              <div className="space-y-4">
                {/* 1. Legal Company Card */}
                <div className="bg-[#141720] border border-[#222736] p-6 rounded-xl space-y-4">
                  <h2 className="text-sm font-bold text-white">Identifiants Légaux & Enregistrement Commercial</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[#8e98a8] mb-1">Raison Sociale</label>
                      <input
                        type="text"
                        readOnly
                        value="Kansotex SARL d'Art Textile"
                        className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded px-3 py-2 text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8e98a8] mb-1">ICE (Identifiant Commun de l'Entreprise)</label>
                      <input
                        type="text"
                        readOnly
                        value="002984512000084"
                        className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8e98a8] mb-1">Identifiant Fiscal (IF)</label>
                      <input
                        type="text"
                        readOnly
                        value="52849102"
                        className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8e98a8] mb-1">Registre de Commerce (RC Marrakech)</label>
                      <input
                        type="text"
                        readOnly
                        value="94821"
                        className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded px-3 py-2 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Banking Details */}
                <div className="bg-[#141720] border border-[#222736] p-6 rounded-xl space-y-4">
                  <h2 className="text-sm font-bold text-white">Coordonnées Bancaires Officielles (Virements Chantiers)</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[#8e98a8] mb-1">Établissement Bancaire</label>
                      <input
                        type="text"
                        readOnly
                        value="CIH Bank — Agence Guéliz Marrakech"
                        className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded px-3 py-2 text-white font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8e98a8] mb-1">Relevé d'Identité Bancaire (RIB 24 Caractères)</label>
                      <input
                        type="text"
                        readOnly
                        value="230 450 48291048291048 29"
                        className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded px-3 py-2 text-[#4ade80] font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Workshop & Concierge */}
                <div className="bg-[#141720] border border-[#222736] p-6 rounded-xl space-y-4">
                  <h2 className="text-sm font-bold text-white">Atelier Principal & Conciergerie WhatsApp</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-[#8e98a8] mb-1">Adresse de l'Atelier</label>
                      <input
                        type="text"
                        readOnly
                        value="Zone Industrielle Sidi Ghanem, Marrakech 40000, Maroc"
                        className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded px-3 py-2 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[#8e98a8] mb-1">Téléphone Conciergerie WhatsApp Directe</label>
                      <input
                        type="text"
                        readOnly
                        value="+212 5 24 33 00 00 / +212 6 61 00 00 00"
                        className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded px-3 py-2 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================================================================== */}
      {/* 3. ORDER DETAILS DRAWER (Shopify Slide-Over Modal)                    */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {selectedOrderForDrawer && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrderForDrawer(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-over panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-xl bg-[#141720] border-l border-[#232733] h-full shadow-2xl flex flex-col z-10 text-white"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#222736] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold font-mono text-white">{selectedOrderForDrawer.orderNumber}</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#202738] text-[#c29d59] border border-[#c29d59]/30">
                      {selectedOrderForDrawer.channel.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs text-[#8e98a8] mt-1">Passée le {selectedOrderForDrawer.date}</p>
                </div>
                <button
                  onClick={() => setSelectedOrderForDrawer(null)}
                  className="w-8 h-8 rounded-lg bg-[#202636] hover:bg-[#2c344a] flex items-center justify-center text-[#8e98a8] hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Client Box */}
                <div className="bg-[#1b1f2b] p-4 rounded-xl border border-[#2b3142]">
                  <h3 className="text-xs font-bold text-[#c29d59] uppercase tracking-wider mb-2">Informations Client</h3>
                  <p className="text-sm font-bold text-white">{selectedOrderForDrawer.customerName}</p>
                  <p className="text-xs text-[#a4b1c7] mt-0.5">{selectedOrderForDrawer.city}</p>
                  <p className="text-xs text-[#8e98a8] font-mono mt-1">{selectedOrderForDrawer.customerPhone}</p>
                  <p className="text-xs text-[#8e98a8] mt-0.5">{selectedOrderForDrawer.customerEmail}</p>
                </div>

                {/* Items & Meterage */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#c29d59] uppercase tracking-wider">Tissus & Confections Commandés</h3>
                  <div className="space-y-2">
                    {selectedOrderForDrawer.items.map((item, idx) => (
                      <div key={idx} className="bg-[#1b1f2b] p-3 rounded-lg border border-[#2b3142] flex justify-between items-start text-xs">
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          {item.meterage > 0 && (
                            <p className="text-[11px] font-mono text-[#4ade80] mt-0.5">Métrage : {item.meterage} ml</p>
                          )}
                          {item.finishing && (
                            <p className="text-[10px] text-[#8e98a8] mt-0.5">Finitions : {item.finishing}</p>
                          )}
                        </div>
                        <span className="font-mono font-bold text-white tabular-nums text-sm">
                          {formatMoney(item.priceEur)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="bg-[#1b1f2b] p-4 rounded-xl border border-[#2b3142] space-y-2 text-xs">
                  <div className="flex justify-between text-[#8e98a8]">
                    <span>Sous-total articles :</span>
                    <span className="font-mono text-white tabular-nums">{formatMoney(selectedOrderForDrawer.totalEur * 0.8)}</span>
                  </div>
                  <div className="flex justify-between text-[#8e98a8]">
                    <span>TVA (20% Maroc) :</span>
                    <span className="font-mono text-white tabular-nums">{formatMoney(selectedOrderForDrawer.totalEur * 0.2)}</span>
                  </div>
                  <div className="pt-2 border-t border-[#262c3b] flex justify-between font-bold text-sm text-white">
                    <span>Total Net TTC :</span>
                    <span className="text-[#c29d59] tabular-nums">{formatMoney(selectedOrderForDrawer.totalEur)}</span>
                  </div>
                </div>

                {/* Status Switcher in Drawer */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#c29d59] uppercase tracking-wider">Mettre à jour l'état de fabrication :</label>
                  <select
                    value={selectedOrderForDrawer.fulfillmentStatus}
                    onChange={(e) => handleUpdateOrderStatus(selectedOrderForDrawer.id, e.target.value as AdminOrder["fulfillmentStatus"])}
                    className="w-full bg-[#1b1f2b] border border-[#2b3142] text-white text-xs rounded-lg px-3 py-2.5 font-medium focus:outline-none focus:border-[#c29d59]"
                  >
                    <option value="PENDING">En Attente</option>
                    <option value="CUTTING_ATELIER">Coupe Atelier des Rouleaux</option>
                    <option value="IN_CONFECTION">En Confection & Ourlet</option>
                    <option value="SHIPPED">Expédié par Transporteur</option>
                    <option value="DELIVERED">Livré & Réceptionné sur Site</option>
                    <option value="CANCELLED">Annulé</option>
                  </select>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-[#222736] bg-[#0f121a] flex items-center justify-between gap-3">
                <a
                  href={`https://wa.me/${selectedOrderForDrawer.customerPhone.replace(/[^0-9]/g, "")}?text=Bonjour%20${encodeURIComponent(selectedOrderForDrawer.customerName)},%20mise%20%C3%A0%20jour%20de%20votre%20commande%20Kansotex%20${selectedOrderForDrawer.orderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-10 bg-[#12281b] hover:bg-[#1a3826] text-[#4ade80] rounded-lg text-xs font-bold transition-colors border border-[#235832]"
                >
                  <IconWhatsApp className="w-4 h-4" />
                  <span>Notifier sur WhatsApp</span>
                </a>
                <button
                  onClick={() => window.print()}
                  className="px-4 h-10 bg-[#202636] hover:bg-[#2b3347] text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <IconPrinter className="w-4 h-4" />
                  <span>Imprimer</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 4. OFFICIAL KANSOTEX INVOICE SHEET MODAL (Moroccan Legal Sheet)      */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {selectedInvoiceForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoiceForModal(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Printable Invoice Paper Sheet */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white text-[#1a1917] rounded-xl shadow-2xl overflow-hidden z-10 font-sans my-8"
            >
              {/* Sheet Action Bar */}
              <div className="bg-[#1c1b19] px-6 py-3.5 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#c29d59]">{selectedInvoiceForModal.invoiceNumber}</span>
                  <span className="text-xs text-[#a4b1c7]">· Facture Officielle Kansotex</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-medium text-white transition-colors"
                  >
                    <IconPrinter className="w-3.5 h-3.5" />
                    <span>Imprimer / PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedInvoiceForModal(null)}
                    className="w-7 h-7 rounded hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Printable Body */}
              <div className="p-8 sm:p-10 space-y-8 bg-white">
                {/* Header: Brand + Legal details */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-[#e5e7eb] pb-8">
                  <div>
                    <h2 className="font-termina text-xl font-bold tracking-[0.2em] text-[#1a1917]">KANSOTEX</h2>
                    <p className="text-xs text-[#6b7280] font-light mt-1">Éditeur Textile & Confection d'Atelier</p>
                    <div className="text-[11px] text-[#4b5563] space-y-0.5 mt-3">
                      <p>Zone Industrielle Sidi Ghanem</p>
                      <p>Marrakech 40000, Maroc</p>
                      <p>Téléphone : +212 5 24 33 00 00</p>
                      <p className="font-mono text-[#c29d59]">ICE : 002984512000084 · IF : 52849102 · RC : 94821</p>
                    </div>
                  </div>

                  {/* Invoice Meta */}
                  <div className="text-left sm:text-right">
                    <span className="inline-block bg-[#f3f4f6] text-[#1f2937] px-3 py-1 rounded text-xs font-bold font-mono tracking-wider">
                      {selectedInvoiceForModal.invoiceNumber}
                    </span>
                    <div className="text-xs text-[#4b5563] space-y-1 mt-3">
                      <p><span className="text-[#9ca3af]">Date d'émission :</span> {selectedInvoiceForModal.date}</p>
                      <p><span className="text-[#9ca3af]">Échéance :</span> {selectedInvoiceForModal.dueDate}</p>
                      <p><span className="text-[#9ca3af]">Réf. Commande :</span> {selectedInvoiceForModal.orderNumber}</p>
                    </div>
                  </div>
                </div>

                {/* Client B2B Block */}
                <div className="bg-[#f9fafb] p-5 rounded-lg border border-[#e5e7eb] flex flex-col sm:flex-row justify-between gap-4 text-xs">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-1">Facturé à (Client B2B) :</p>
                    <p className="font-bold text-sm text-[#111827]">{selectedInvoiceForModal.clientCompany}</p>
                    <p className="text-[#4b5563] mt-0.5">À l'attention de : {selectedInvoiceForModal.clientName}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#9ca3af] mb-1">Identifiants Fiscaux Client :</p>
                    <p className="font-mono font-bold text-[#1f2937]">ICE : {selectedInvoiceForModal.clientIce}</p>
                    <p className="text-[#6b7280] mt-0.5">Marrakech / Casablanca, Maroc</p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="border border-[#e5e7eb] rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-[#f9fafb] border-b border-[#e5e7eb] text-[10px] font-bold uppercase tracking-wider text-[#6b7280]">
                        <th className="py-3 px-4">Désignation des Prestations & Étoffes</th>
                        <th className="py-3 px-4 text-right">Montant HT</th>
                        <th className="py-3 px-4 text-right">TVA (20%)</th>
                        <th className="py-3 px-4 text-right">Total Net TTC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f3f4f6]">
                      <tr>
                        <td className="py-3.5 px-4 font-medium text-[#111827]">
                          Confection sur-mesure textile & métrages rouleaux (Chantier {selectedInvoiceForModal.orderNumber})
                          <p className="text-[11px] text-[#6b7280] mt-0.5">Finitions atelier : Ruflette onde Wave, ourlet plombé 10cm</p>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-[#374151]">
                          {formatMoney(selectedInvoiceForModal.totalHtEur)}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-[#6b7280]">
                          {formatMoney(selectedInvoiceForModal.tvaEur)}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold font-mono text-[#111827]">
                          {formatMoney(selectedInvoiceForModal.totalTtcEur)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Totals & Breakdown */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-2">
                  <div className="text-xs text-[#6b7280] max-w-xs space-y-1">
                    <p className="font-bold text-[#111827]">Modalités de Règlement :</p>
                    <p>Virement bancaire CIH Bank : <span className="font-mono text-[#1f2937]">230 450 48291048291048 29</span></p>
                    <p>Acompte de 50% à la validation, solde restant à réception et pose sur site.</p>
                  </div>

                  <div className="w-full sm:w-64 space-y-2 text-xs">
                    <div className="flex justify-between text-[#4b5563]">
                      <span>Total Brut HT :</span>
                      <span className="font-mono font-medium">{formatMoney(selectedInvoiceForModal.totalHtEur)}</span>
                    </div>
                    <div className="flex justify-between text-[#4b5563]">
                      <span>TVA 20% :</span>
                      <span className="font-mono font-medium">{formatMoney(selectedInvoiceForModal.tvaEur)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#e5e7eb] flex justify-between font-bold text-sm text-[#111827]">
                      <span>Total TTC :</span>
                      <span className="font-mono text-base">{formatMoney(selectedInvoiceForModal.totalTtcEur)}</span>
                    </div>
                    <div className="bg-[#f0fdf4] text-[#166534] p-2 rounded flex justify-between font-bold text-xs">
                      <span>Acompte 50% Réglé :</span>
                      <span>{formatMoney(selectedInvoiceForModal.depositReceivedEur)}</span>
                    </div>
                    {selectedInvoiceForModal.balanceDueEur > 0 && (
                      <div className="bg-[#fefce8] text-[#854d0e] p-2 rounded flex justify-between font-bold text-xs">
                        <span>Solde à la Livraison :</span>
                        <span>{formatMoney(selectedInvoiceForModal.balanceDueEur)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 5. ADD PRODUCT MODAL                                                 */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isNewProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewProductModalOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#141720] border border-[#2b3142] rounded-xl p-6 shadow-2xl z-10 text-white space-y-5"
            >
              <div className="flex items-center justify-between border-b border-[#222736] pb-3">
                <h2 className="text-base font-bold text-white">Ajouter un Tissu ou Produit au Catalogue</h2>
                <button onClick={() => setIsNewProductModalOpen(false)} className="text-[#8e98a8] hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#8e98a8] mb-1 font-medium">Nom du Tissu / Désignation</label>
                  <input
                    type="text"
                    required
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="Ex: Lin Lavé Blanc Albâtre — Signature"
                    className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#8e98a8] mb-1 font-medium">Catégorie</label>
                    <select
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value as AdminProduct["category"])}
                      className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#c29d59]"
                    >
                      <option value="Lin">Lin</option>
                      <option value="Velours">Velours</option>
                      <option value="Voilage">Voilage</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Linge de Lit">Linge de Lit</option>
                      <option value="Linge de Table">Linge de Table</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#8e98a8] mb-1 font-medium">Prix de Base (EUR)</label>
                    <input
                      type="number"
                      required
                      value={newProductPriceEur}
                      onChange={(e) => setNewProductPriceEur(e.target.value)}
                      className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#8e98a8] mb-1 font-medium">Stock Rouleau (Mètres linéaires)</label>
                    <input
                      type="number"
                      required
                      value={newProductStock}
                      onChange={(e) => setNewProductStock(e.target.value)}
                      className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#8e98a8] mb-1 font-medium">Laize / Largeur (cm)</label>
                    <input
                      type="number"
                      value={newProductWidth}
                      onChange={(e) => setNewProductWidth(e.target.value)}
                      className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#8e98a8] mb-1 font-medium">Composition Technique</label>
                  <input
                    type="text"
                    value={newProductComposition}
                    onChange={(e) => setNewProductComposition(e.target.value)}
                    placeholder="Ex: 100% Lin Français certifié Masters of Linen"
                    className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="pt-3 border-t border-[#222736] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewProductModalOpen(false)}
                    className="px-4 py-2 bg-[#1b1f2b] hover:bg-[#252b3b] text-[#8e98a8] hover:text-white rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#c29d59] to-[#af8745] text-white font-bold rounded-lg shadow-sm hover:brightness-110 transition-all"
                  >
                    Créer le Tissu
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 6. ADD DISCOUNT CODE MODAL                                           */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isNewDiscountModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewDiscountModalOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-[#141720] border border-[#2b3142] rounded-xl p-6 shadow-2xl z-10 text-white space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#222736] pb-3">
                <h2 className="text-base font-bold text-white">Nouveau Code Promo</h2>
                <button onClick={() => setIsNewDiscountModalOpen(false)} className="text-[#8e98a8] hover:text-white">✕</button>
              </div>

              <form onSubmit={handleCreateDiscount} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#8e98a8] mb-1 font-medium">Code (Ex: VIPARCHI30)</label>
                  <input
                    type="text"
                    required
                    value={newDiscountCode}
                    onChange={(e) => setNewDiscountCode(e.target.value)}
                    placeholder="VIPARCHI30"
                    className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded-lg px-3 py-2 text-white font-mono uppercase focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div>
                  <label className="block text-[#8e98a8] mb-1 font-medium">Pourcentage de Remise (%)</label>
                  <input
                    type="number"
                    required
                    value={newDiscountValue}
                    onChange={(e) => setNewDiscountValue(e.target.value)}
                    className="w-full bg-[#1b1f2b] border border-[#2b3142] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="pt-3 border-t border-[#222736] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewDiscountModalOpen(false)}
                    className="px-4 py-2 bg-[#1b1f2b] text-[#8e98a8] hover:text-white rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-[#c29d59] to-[#af8745] text-white font-bold rounded-lg shadow-sm hover:brightness-110 transition-all"
                  >
                    Activer le Code
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
