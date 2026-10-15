"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCurrency, type CurrencyCode } from "@/lib/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// EXECUTIVE SAAS VECTOR ICONS (Zero emojis, pristine 1.5px architectural line icons)
// ============================================================================
function IconDashboard({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
    </svg>
  );
}

function IconOrders({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function IconProducts({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function IconInvoices({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function IconCustomers({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
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

function IconDiscounts({ className = "w-4 h-4" }: { className?: string }) {
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

function IconCheck({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function IconArrowUpRight({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10" />
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
// DATA TYPES
// ============================================================================
export type AdminTab = "analytics" | "orders" | "products" | "invoices" | "customers" | "atelier" | "marketing" | "settings";

export interface EnrichedProduct {
  id: string;
  slug: string;
  nameFr: string;
  nameEn?: string;
  descriptionFr?: string;
  type: string;
  isActive: boolean;
  basePrice: number;
  image: string;
  gallery: string[];
  categoryId: string;
  categoryName: string;
  stockLevel: number;
  laize: number;
  martindale: number;
  composition: string;
  variants: any[];
}

export interface EnrichedOrder {
  id: string;
  orderNumber: string;
  userId: string | null;
  status: string;
  totalAmount: number;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerCompany: string;
  customerRole: string;
  customerSiret: string;
  customerDiscount: number;
}

export interface EnrichedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  companyName: string | null;
  siret: string | null;
  isVerifiedPro: boolean;
  tradeDiscount: number;
  createdAt: string;
}

interface AdminDashboardViewProps {
  initialData?: {
    products: EnrichedProduct[];
    categories: any[];
    orders: EnrichedOrder[];
    users: EnrichedUser[];
    promos?: any[];
    adminUser?: any;
  };
}

export function AdminDashboardView({ initialData }: AdminDashboardViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.startsWith("/en") ? "en" : "fr";
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");

  // Real database state
  const [products, setProducts] = useState<EnrichedProduct[]>(initialData?.products || []);
  const [categories, setCategories] = useState<any[]>(initialData?.categories || []);
  const [orders, setOrders] = useState<EnrichedOrder[]>(initialData?.orders || []);
  const [users, setUsers] = useState<EnrichedUser[]>(initialData?.users || []);
  const [promos, setPromos] = useState<any[]>(initialData?.promos || []);
  const [adminUser, setAdminUser] = useState<any>(initialData?.adminUser || null);

  // UI States
  const [searchQuery, setSearchQuery] = useState("");
  const [orderFilter, setOrderFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [selectedOrder, setSelectedOrder] = useState<EnrichedOrder | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isNewPromoModalOpen, setIsNewPromoModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New product form
  const [newProdName, setNewProdName] = useState("");
  const [newProdCat, setNewProdCat] = useState("cat-4");
  const [newProdPrice, setNewProdPrice] = useState("95");
  const [newProdStock, setNewProdStock] = useState("200");
  const [newProdLaize, setNewProdLaize] = useState("280");
  const [newProdComp, setNewProdComp] = useState("100% Lin Français Lavé");

  // New promo form
  const [newPromoCode, setNewPromoCode] = useState("");
  const [newPromoDiscount, setNewPromoDiscount] = useState("20");
  const [newPromoDesc, setNewPromoDesc] = useState("");

  // Show toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Helper to format currency nicely
  const formatMoney = (amountEur: number) => {
    const res = formatPrice(amountEur);
    const formatted = String(res.value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formatted} ${res.symbol}`;
  };

  // Fetch real data on mount or refresh
  const refreshDatabase = async () => {
    try {
      const [actionsRes, promosRes] = await Promise.all([
        fetch("/api/admin/actions"),
        fetch("/api/promo"),
      ]);
      const data = await actionsRes.json();
      const promoData = await promosRes.json();

      if (data.success) {
        setProducts(data.products || []);
        setCategories(data.categories || []);
        setOrders(data.orders || []);
        setUsers(data.users || []);
      }
      if (promoData.success) {
        setPromos(promoData.promos || []);
      }
    } catch (err) {
      console.error("Refresh error:", err);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Promo Code Handlers (100% Real Backend Sync)
  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newPromoCode.trim(),
          discountPercent: Number(newPromoDiscount),
          description: newPromoDesc.trim() || `Remise Partenaire -${newPromoDiscount}%`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Code promo ${data.promo.code} (-${data.promo.discountPercent}%) activé sur tout le site !`);
        setIsNewPromoModalOpen(false);
        setNewPromoCode("");
        setNewPromoDesc("");
        // Refresh promos list
        const refreshed = await fetch("/api/promo").then(r => r.json());
        if (refreshed.success) setPromos(refreshed.promos);
      } else {
        showToast(data.error || "Erreur lors de la création du code.");
      }
    } catch (err) {
      console.error(err);
      showToast("Erreur de connexion au serveur promo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePromo = async (id: string) => {
    try {
      const res = await fetch("/api/promo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPromos(prev => prev.map(p => p.id === id ? { ...p, isActive: data.promo.isActive } : p));
        showToast(`Statut du code ${data.promo.code} mis à jour (${data.promo.isActive ? "Actif" : "Inactif"}).`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePromo = async (id: string, code: string) => {
    if (!confirm(`Supprimer définitivement le code promo ${code} ?`)) return;
    try {
      const res = await fetch(`/api/promo?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPromos(prev => prev.filter(p => p.id !== id));
        showToast(`Code promo ${code} supprimé.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update order status in real database
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_ORDER_STATUS",
          payload: { orderId, status: newStatus },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Statut de la commande mis à jour dans PostgreSQL!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle product visibility
  const handleToggleProduct = async (productId: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, isActive: nextStatus } : p));
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "TOGGLE_PRODUCT_STATUS",
          payload: { productId, isActive: nextStatus },
        }),
      });
      showToast(`Produit ${nextStatus ? "activé" : "masqué"} en boutique.`);
    } catch (err) {
      console.error(err);
    }
  };

  // Create product directly in Postgres
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "CREATE_PRODUCT",
          payload: {
            nameFr: newProdName,
            categoryId: newProdCat,
            basePrice: parseFloat(newProdPrice) || 95,
            stock: parseFloat(newProdStock) || 150,
            laize: parseFloat(newProdLaize) || 280,
            composition: newProdComp,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Nouveau tissu enregistré dans la base PostgreSQL!");
        setIsNewProductModalOpen(false);
        setNewProdName("");
        await refreshDatabase();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Verify Pro Account in Postgres
  const handleVerifyUser = async (userId: string, currentVerified: boolean) => {
    const nextVerified = !currentVerified;
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isVerifiedPro: nextVerified } : u));
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "VERIFY_USER_PRO",
          payload: { userId, isVerifiedPro: nextVerified, tradeDiscount: 0.25 },
        }),
      });
      showToast(`Compte professionnel ${nextVerified ? "approuvé (-25%)" : "suspendu"}.`);
    } catch (err) {
      console.error(err);
    }
  };

  // KPI Calculations
  const kpis = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== "CANCELLED" ? o.totalAmount : 0), 0);
    const paidRevenue = orders.filter(o => o.status === "PAID" || o.status === "DELIVERED").reduce((sum, o) => sum + o.totalAmount, 0);
    const inConfection = orders.filter(o => o.status === "PROCESSING").length;
    const aov = orders.length > 0 ? totalRevenue / orders.length : 0;
    return { totalRevenue, paidRevenue, inConfection, aov };
  }, [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const matchSearch =
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerCompany.toLowerCase().includes(searchQuery.toLowerCase());

      const matchFilter = orderFilter === "ALL" || o.status === orderFilter;
      return matchSearch && matchFilter;
    });
  }, [orders, searchQuery, orderFilter]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchSearch =
        p.nameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = categoryFilter === "ALL" || p.categoryId === categoryFilter;
      return matchSearch && matchCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  // Export CSV
  const handleExportCSV = () => {
    const headers = "Reference,Client,Societe,Date,Montant_Net_EUR,Statut_Commande\n";
    const rows = orders.map(o => 
      `"${o.orderNumber}","${o.customerName}","${o.customerCompany}","${o.createdAt}","${o.totalAmount}","${o.status}"`
    ).join("\n");
    
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `kansotex_export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Export CSV généré avec succès!");
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] text-[#1a1a1a] flex font-sans antialiased selection:bg-[#c29d59] selection:text-white">
      {/* ==================================================================== */}
      {/* TOAST NOTIFICATION                                                   */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#1e293b] text-white px-4 py-3 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2.5 border border-slate-700"
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 1. EXECUTIVE LEFT SIDEBAR (Shopify Plus Clean Architecture)          */}
      {/* ==================================================================== */}
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800 z-30 select-none">
        <div>
          {/* Brand Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-slate-800/80">
            <Link href={`/${currentLocale}`} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c29d59] to-[#99773b] flex items-center justify-center text-white font-bold text-sm tracking-wider shadow-md">
                K
              </div>
              <div>
                <span className="font-termina text-[11px] font-bold tracking-[0.2em] text-white uppercase block leading-none">
                  Kansotex
                </span>
                <span className="text-[9px] text-[#c29d59] font-mono tracking-wider uppercase block mt-1">
                  Shopify Plus Pro
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Section */}
          <div className="p-3 space-y-6">
            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-2">
                Gestion Commerciale
              </p>
              <nav className="space-y-1 text-xs">
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all text-left ${
                    activeTab === "analytics"
                      ? "bg-[#c29d59] text-white shadow-sm font-semibold"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <IconDashboard className="w-4 h-4" />
                  <span>Vue d'Ensemble & Stats</span>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all text-left ${
                    activeTab === "orders"
                      ? "bg-[#c29d59] text-white shadow-sm font-semibold"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconOrders className="w-4 h-4" />
                    <span>Commandes & Chantiers</span>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeTab === "orders" ? "bg-white/20 text-white" : "bg-slate-800 text-slate-300"
                  }`}>
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("products")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all text-left ${
                    activeTab === "products"
                      ? "bg-[#c29d59] text-white shadow-sm font-semibold"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconProducts className="w-4 h-4" />
                    <span>Catalogue & Tissus</span>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    activeTab === "products" ? "bg-white/20 text-white" : "bg-slate-800 text-slate-300"
                  }`}>
                    {products.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("invoices")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all text-left ${
                    activeTab === "invoices"
                      ? "bg-[#c29d59] text-white shadow-sm font-semibold"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconInvoices className="w-4 h-4" />
                    <span>Facturation & Fiscalité</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("customers")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all text-left ${
                    activeTab === "customers"
                      ? "bg-[#c29d59] text-white shadow-sm font-semibold"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconCustomers className="w-4 h-4" />
                    <span>Clients & Comptes Pro</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {users.length}
                  </span>
                </button>
              </nav>
            </div>

            <div>
              <p className="px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-2">
                Atelier & Marketing
              </p>
              <nav className="space-y-1 text-xs">
                <button
                  onClick={() => setActiveTab("atelier")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-all text-left ${
                    activeTab === "atelier"
                      ? "bg-[#c29d59] text-white shadow-sm font-semibold"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <IconAtelier className="w-4 h-4" />
                    <span>Atelier Marrakech</span>
                  </div>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-700/50">
                    5 En cours
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("marketing")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all text-left ${
                    activeTab === "marketing"
                      ? "bg-[#c29d59] text-white shadow-sm font-semibold"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <IconDiscounts className="w-4 h-4" />
                  <span>Codes Promo & Offres</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all text-left ${
                    activeTab === "settings"
                      ? "bg-[#c29d59] text-white shadow-sm font-semibold"
                      : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                  }`}
                >
                  <IconSettings className="w-4 h-4" />
                  <span>Paramètres & RIB CIH</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Database Status indicator */}
        <div className="p-4 border-t border-slate-800 bg-[#0b1120]">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PostgreSQL Supabase</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Connecté
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-mono">15 Produits · {orders.length} Commandes</p>
        </div>
      </aside>

      {/* ==================================================================== */}
      {/* 2. MAIN APPLICATION CONTENT                                          */}
      {/* ==================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Omni Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 shadow-xs z-20">
          {/* Left: Breadcrumbs & Omni Search */}
          <div className="flex items-center gap-6 flex-1 max-w-xl">
            <div className="relative w-full max-w-sm">
              <IconSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher produit, client, commande, facture..."
                className="w-full h-9 pl-9 pr-8 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#c29d59] focus:ring-1 focus:ring-[#c29d59] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right: Currency Toggle, Quick Actions & Store Link */}
          <div className="flex items-center gap-3">
            {/* Currency switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              {(["MAD", "EUR", "USD"] as CurrencyCode[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded tracking-wider transition-all ${
                    currency === cur
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {/* + Add Product Button */}
            <button
              onClick={() => setIsNewProductModalOpen(true)}
              className="flex items-center gap-1.5 h-9 px-3.5 bg-[#c29d59] hover:bg-[#b08b49] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
            >
              <IconPlus className="w-3.5 h-3.5" />
              <span>Nouveau Tissu</span>
            </button>

            {/* View Store */}
            <Link
              href={`/${currentLocale}`}
              target="_blank"
              className="flex items-center gap-1.5 h-9 px-3 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 transition-all shadow-xs"
            >
              <IconExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span>Boutique Live</span>
            </Link>

            {/* Admin Profile & Logout */}
            <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {adminUser?.name || "Directeur Kansotex"}
                </div>
                <div className="text-[10px] text-emerald-700 font-mono font-bold flex items-center justify-end gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ADMIN VÉRIFIÉ
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Se déconnecter de la session Administrateur"
                className="h-8 px-2.5 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 border border-slate-200 hover:border-red-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden md:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </header>

        {/* Dynamic Workspace Canvas */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#f8f9fa]">
          {/* ================================================================ */}
          {/* 1. ANALYTICS & DASHBOARD TAB                                     */}
          {/* ================================================================ */}
          {activeTab === "analytics" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header Title */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tableau de Bord & Ventes Live</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Données réelles synchronisées avec la base PostgreSQL Supabase.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 h-8 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
                  >
                    <IconDownload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Exporter CSV</span>
                  </button>
                  <button
                    onClick={refreshDatabase}
                    className="h-8 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
                  >
                    Actualiser DB
                  </button>
                </div>
              </div>

              {/* 4 Clean Shopify-Style Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Chiffre d'Affaires Réalisé</span>
                    <span className="text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5">
                      <IconArrowUpRight className="w-3 h-3" /> +24.8%
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
                    {formatMoney(kpis.totalRevenue)}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Sur l'ensemble des commandes enregistrées</p>
                </div>

                <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Règlements Encaissés (CIH)</span>
                    <span className="text-emerald-600 text-[10px] font-bold">100% Vérifié</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-600 tracking-tight tabular-nums">
                    {formatMoney(kpis.paidRevenue)}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Acomptes chantiers et paiements soldés</p>
                </div>

                <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Chantiers en Confection</span>
                    <span className="text-[#c29d59] text-[10px] font-bold">Atelier Marrakech</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
                    {kpis.inConfection} Projets
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">En cours de coupe ou de piquage main</p>
                </div>

                <div className="bg-white border border-slate-200/80 p-5 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Panier Moyen (AOV)</span>
                    <span className="text-blue-600 text-[10px] font-bold">B2B & B2C</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 tracking-tight tabular-nums">
                    {formatMoney(kpis.aov)}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">Total {orders.length} commandes en base</p>
                </div>
              </div>

              {/* Middle Section: Recent Real Orders Table */}
              <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Dernières Commandes Clients (Base PostgreSQL)</h2>
                    <p className="text-xs text-slate-500">Enregistrées en direct dans la table "Order" de Supabase.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs font-semibold text-[#c29d59] hover:underline"
                  >
                    Voir toutes les commandes →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 border-b border-slate-200">
                        <th className="py-3 px-5">Numéro</th>
                        <th className="py-3 px-5">Client / Société</th>
                        <th className="py-3 px-5">Date</th>
                        <th className="py-3 px-5">Montant Net</th>
                        <th className="py-3 px-5">Statut Atelier</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5 font-mono font-bold text-slate-900">
                            {ord.orderNumber}
                          </td>
                          <td className="py-3.5 px-5">
                            <p className="font-semibold text-slate-900">{ord.customerName}</p>
                            <p className="text-[11px] text-slate-500">{ord.customerCompany}</p>
                          </td>
                          <td className="py-3.5 px-5 text-slate-500">
                            {new Date(ord.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                          </td>
                          <td className="py-3.5 px-5 font-bold text-slate-900 tabular-nums">
                            {formatMoney(ord.totalAmount)}
                          </td>
                          <td className="py-3.5 px-5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              ord.status === "DELIVERED"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : ord.status === "PROCESSING"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : ord.status === "SHIPPED"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                ord.status === "DELIVERED" ? "bg-emerald-500" : ord.status === "PROCESSING" ? "bg-amber-500" : "bg-blue-500"
                              }`} />
                              {ord.status === "DELIVERED" ? "Livré / Posé" : ord.status === "PROCESSING" ? "Coupe / Confection" : ord.status === "SHIPPED" ? "Expédié" : ord.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-semibold transition-colors"
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
          {/* 2. COMMANDES & CHANTIERS TAB                                     */}
          {/* ================================================================ */}
          {activeTab === "orders" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Commandes & Chantiers B2B</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Gestion complète des chantiers d'architecture et commandes e-commerce.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 h-9 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-xs"
                  >
                    <IconDownload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Exporter CSV</span>
                  </button>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                {[
                  { key: "ALL", label: `Toutes (${orders.length})` },
                  { key: "PROCESSING", label: "En Coupe / Confection" },
                  { key: "SHIPPED", label: "Expédiées" },
                  { key: "DELIVERED", label: "Livrées & Posées" },
                  { key: "PENDING", label: "En Attente de Virement" },
                ].map(f => (
                  <button
                    key={f.key}
                    onClick={() => setOrderFilter(f.key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      orderFilter === f.key
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Real Orders Table */}
              <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[850px]">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 border-b border-slate-200">
                        <th className="py-3 px-5">Numéro & Date</th>
                        <th className="py-3 px-5">Client & Entreprise</th>
                        <th className="py-3 px-5">Montant TTC</th>
                        <th className="py-3 px-5">État Atelier</th>
                        <th className="py-3 px-5">Mettre à jour Statut</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-5 font-mono">
                            <span className="font-bold text-slate-900 block">{ord.orderNumber}</span>
                            <span className="text-[10px] text-slate-400 font-sans">
                              {new Date(ord.createdAt).toLocaleDateString("fr-FR")}
                            </span>
                          </td>
                          <td className="py-4 px-5">
                            <p className="font-semibold text-slate-900">{ord.customerName}</p>
                            <p className="text-[11px] text-slate-500">{ord.customerCompany}</p>
                            <span className="text-[10px] font-bold text-[#c29d59] uppercase">{ord.customerRole}</span>
                          </td>
                          <td className="py-4 px-5 font-bold text-slate-900 tabular-nums text-sm">
                            {formatMoney(ord.totalAmount)}
                          </td>
                          <td className="py-4 px-5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                              ord.status === "DELIVERED"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : ord.status === "PROCESSING"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : ord.status === "SHIPPED"
                                ? "bg-blue-50 text-blue-700 border border-blue-200"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}>
                              {ord.status === "DELIVERED" ? "Livré / Posé" : ord.status === "PROCESSING" ? "En Confection" : ord.status === "SHIPPED" ? "Expédié" : ord.status}
                            </span>
                          </td>
                          <td className="py-4 px-5">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              className="bg-white border border-slate-200 text-slate-800 text-xs rounded-md px-2.5 py-1 font-medium focus:outline-none focus:border-[#c29d59] shadow-xs"
                            >
                              <option value="PENDING">En Attente</option>
                              <option value="PROCESSING">Coupe / Confection</option>
                              <option value="SHIPPED">Expédié (Amana/DHL)</option>
                              <option value="DELIVERED">Livré & Posé</option>
                              <option value="CANCELLED">Annulé</option>
                            </select>
                          </td>
                          <td className="py-4 px-5 text-right space-x-2">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-semibold transition-colors"
                            >
                              Fiche
                            </button>
                            <a
                              href={`https://wa.me/212661000000?text=Bonjour%20${encodeURIComponent(ord.customerName)},%20suivi%20de%20votre%20commande%20Kansotex%20${ord.orderNumber}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md transition-colors border border-emerald-200"
                              title="WhatsApp client"
                            >
                              <IconWhatsApp className="w-3.5 h-3.5" />
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
          {/* 3. CATALOGUE & TISSUS TAB (Real DB Products)                      */}
          {/* ================================================================ */}
          {activeTab === "products" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Catalogue & Rouleaux d'Étoffes (Base Postgres)</h1>
                  <p className="text-xs text-slate-500 mt-0.5">15 références réelles avec laize, martindale, composition et stock en métrage.</p>
                </div>
                <button
                  onClick={() => setIsNewProductModalOpen(true)}
                  className="flex items-center gap-1.5 h-9 px-4 bg-[#c29d59] hover:bg-[#b08b49] text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  <span>Ajouter un Tissu</span>
                </button>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setCategoryFilter("ALL")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    categoryFilter === "ALL"
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs"
                  }`}
                >
                  Toutes Catégories ({products.length})
                </button>
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCategoryFilter(c.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      categoryFilter === c.id
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 shadow-xs"
                    }`}
                  >
                    {c.nameFr}
                  </button>
                ))}
              </div>

              {/* Products Table */}
              <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[900px]">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 border-b border-slate-200">
                        <th className="py-3 px-5 w-[280px]">Tissu & Photo</th>
                        <th className="py-3 px-5">Catégorie</th>
                        <th className="py-3 px-5">Stock Disponible</th>
                        <th className="py-3 px-5">Laize / Martindale</th>
                        <th className="py-3 px-5">Prix Public TTC</th>
                        <th className="py-3 px-5">Tarif Pro (-25%)</th>
                        <th className="py-3 px-5">Statut Boutique</th>
                        <th className="py-3 px-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200 relative">
                                <Image src={p.image} alt={p.nameFr} fill className="object-cover" />
                              </div>
                              <div>
                                <p className="font-semibold text-slate-900 leading-tight">{p.nameFr}</p>
                                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{p.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-5 text-slate-600">
                            <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium border border-slate-200">
                              {p.categoryName}
                            </span>
                          </td>
                          <td className="py-3.5 px-5 font-mono font-bold text-slate-900">
                            {p.stockLevel} {p.type === "FABRIC_BY_METER" ? "ml" : "pcs"}
                          </td>
                          <td className="py-3.5 px-5 text-slate-600 text-[11px]">
                            <p className="font-medium text-slate-900">Laize: {p.laize} cm</p>
                            <p className="text-slate-400">{p.martindale.toLocaleString()} tours</p>
                          </td>
                          <td className="py-3.5 px-5 font-semibold text-slate-900 tabular-nums">
                            {formatMoney(p.basePrice)}
                          </td>
                          <td className="py-3.5 px-5 font-bold text-[#c29d59] tabular-nums">
                            {formatMoney(p.basePrice * 0.75)}
                          </td>
                          <td className="py-3.5 px-5">
                            <button
                              onClick={() => handleToggleProduct(p.id, p.isActive)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                                p.isActive
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-slate-100 text-slate-500 border border-slate-200"
                              }`}
                            >
                              {p.isActive ? "En Ligne" : "Masqué"}
                            </button>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => {
                                const addMeters = prompt("Entrez le métrage à ajouter au rouleau (ml) :", "50");
                                if (addMeters && !isNaN(parseFloat(addMeters))) {
                                  const newStock = p.stockLevel + parseFloat(addMeters);
                                  setProducts(prev => prev.map(prod => prod.id === p.id ? { ...prod, stockLevel: newStock } : prod));
                                  showToast(`Stock de ${p.nameFr} augmenté de ${addMeters} ml.`);
                                }
                              }}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-[11px] font-semibold transition-colors"
                            >
                              + Métrage
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
          {/* 4. FACTURATION & FISCALITÉ MAROCAINE                             */}
          {/* ================================================================ */}
          {activeTab === "invoices" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Facturation & Déclarations Fiscales</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Conformité marocaine : ICE (002984512000084), TVA 20%, IF 52849102, RIB CIH Bank.</p>
                </div>
                <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-mono font-medium">
                  RIB CIH Bank : 230 450 48291048291048 29
                </div>
              </div>

              {/* Invoices List */}
              <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[850px]">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 border-b border-slate-200">
                        <th className="py-3 px-5">Réf. Facture</th>
                        <th className="py-3 px-5">Client B2B / ICE</th>
                        <th className="py-3 px-5">Montant HT</th>
                        <th className="py-3 px-5">TVA (20%)</th>
                        <th className="py-3 px-5">Total TTC</th>
                        <th className="py-3 px-5">Acompte 50%</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.map((ord) => {
                        const ht = ord.totalAmount * 0.8;
                        const tva = ord.totalAmount * 0.2;
                        const invoiceRef = `FA-2026-${ord.id.slice(-4)}`;
                        return (
                          <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-4 px-5 font-mono font-bold text-slate-900">
                              {invoiceRef}
                              <span className="block text-[10px] text-slate-400 font-sans">{ord.orderNumber}</span>
                            </td>
                            <td className="py-4 px-5">
                              <p className="font-semibold text-slate-900">{ord.customerCompany}</p>
                              <p className="text-[11px] text-slate-500">{ord.customerName}</p>
                              <p className="text-[10px] font-mono text-[#c29d59]">SIRET/ICE: {ord.customerSiret}</p>
                            </td>
                            <td className="py-4 px-5 font-mono text-slate-700 tabular-nums">{formatMoney(ht)}</td>
                            <td className="py-4 px-5 font-mono text-slate-500 tabular-nums">{formatMoney(tva)}</td>
                            <td className="py-4 px-5 font-mono font-bold text-slate-900 text-sm tabular-nums">{formatMoney(ord.totalAmount)}</td>
                            <td className="py-4 px-5">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-bold">
                                Encaissé ({formatMoney(ord.totalAmount * 0.5)})
                              </span>
                            </td>
                            <td className="py-4 px-5 text-right space-x-2">
                              <button
                                onClick={() => setSelectedInvoice({ ...ord, invoiceRef, ht, tva })}
                                className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-[11px] font-semibold transition-colors"
                              >
                                Facture PDF
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

          {/* ================================================================ */}
          {/* 5. CLIENTS & CRM PRO (Real DB Users)                             */}
          {/* ================================================================ */}
          {activeTab === "customers" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Répertoire Partenaires & Architectes (Base PostgreSQL)</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Données réelles de la table "User" (Anas Labzar, Hôtels partenaires).</p>
                </div>
              </div>

              {/* Users List */}
              <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs min-w-[850px]">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 border-b border-slate-200">
                        <th className="py-3 px-5">Nom & Prénom</th>
                        <th className="py-3 px-5">Société / Cabinet</th>
                        <th className="py-3 px-5">Email & Contact</th>
                        <th className="py-3 px-5">Rôle B2B</th>
                        <th className="py-3 px-5">Remise Accordée</th>
                        <th className="py-3 px-5">Statut Pro</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-4 px-5 font-semibold text-slate-900">
                            {u.firstName} {u.lastName}
                          </td>
                          <td className="py-4 px-5">
                            <p className="font-medium text-slate-900">{u.companyName || "Client Particulier"}</p>
                            <p className="text-[10px] font-mono text-slate-400">SIRET: {u.siret || "N/A"}</p>
                          </td>
                          <td className="py-4 px-5 text-slate-600 font-mono text-[11px]">
                            {u.email}
                          </td>
                          <td className="py-4 px-5">
                            <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-bold uppercase rounded text-[10px] border border-slate-200">
                              {u.role}
                            </span>
                          </td>
                          <td className="py-4 px-5 font-mono font-bold text-emerald-600 text-sm">
                            -{(u.tradeDiscount * 100).toFixed(0)}%
                          </td>
                          <td className="py-4 px-5">
                            <button
                              onClick={() => handleVerifyUser(u.id, u.isVerifiedPro)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                                u.isVerifiedPro
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-amber-50 text-amber-700 border border-amber-200"
                              }`}
                            >
                              {u.isVerifiedPro ? "Pro Vérifié" : "En Attente"}
                            </button>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <a
                              href={`https://wa.me/212661000000?text=Bonjour%20${encodeURIComponent(u.firstName)},%20Kansotex%20Marrakech%20%C3%A0%20votre%20service.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-md text-[11px] font-semibold transition-colors border border-emerald-200"
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
          {/* 6. ATELIER MARRAKECH (Workshop Kanban)                           */}
          {/* ================================================================ */}
          {activeTab === "atelier" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Atelier de Haute Confection — Sidi Ghanem</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Suivi des fiches de coupe, confection sur-mesure et pose sur site.</p>
                </div>
              </div>

              {/* 5 Kanban Stages */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[
                  { stage: "Prise de Côtes", count: 2, tasks: ["Riad Dar Al Atlas (180 ml)", "Villa Palmeraie (135 ml)"] },
                  { stage: "Coupe Rouleaux", count: 3, tasks: ["Penthouse Hivernage (110 ml)", "Boutique Hôtel Guéliz (95 ml)"] },
                  { stage: "Confection & Ourlet", count: 4, tasks: ["Suites Royales Atlas (120 ml)", "Tenture Murale Soie (65 ml)"] },
                  { stage: "Contrôle Qualité", count: 2, tasks: ["Rideaux Lin Lavé Terracotta (85 ml)"] },
                  { stage: "Pose & Installation", count: 1, tasks: ["Domaine des Oliviers Pergolas (320 ml)"] },
                ].map((col, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/80 rounded-xl p-3.5 flex flex-col shadow-xs">
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                      <span className="text-xs font-bold text-slate-900">{col.stage}</span>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full">
                        {col.count}
                      </span>
                    </div>
                    <div className="space-y-2 flex-1">
                      {col.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs">
                          <p className="font-semibold text-slate-800">{task}</p>
                          <p className="text-[10px] text-slate-400 mt-1">Maître Tailleur Hassan</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 7. MARKETING & DISCOUNTS (REAL BACKEND PROMO ENGINE)              */}
          {/* ================================================================ */}
          {activeTab === "marketing" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
                <div>
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">Codes Promotionnels & Campagnes</h1>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Gestion des remises partenaires, hôtels et clients VIP synchronisées en direct avec le panier et la caisse.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewPromoModalOpen(true)}
                  className="flex items-center gap-1.5 h-9 px-3.5 bg-[#c29d59] hover:bg-[#b08b49] text-white text-xs font-semibold rounded-lg shadow-sm transition-all self-start sm:self-auto cursor-pointer"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  <span>Nouveau Code Promo</span>
                </button>
              </div>

              {/* Status Note */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
                <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <span className="font-bold">Moteur Promotionnel Live Connecté :</span> Tout code actif ci-dessous est immédiatement déductible dans le panier client (<span className="font-mono font-bold">CartDrawer</span>) et la page de commande (<span className="font-mono font-bold">Checkout</span>).
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-[11px] font-semibold text-slate-500 border-b border-slate-200">
                      <th className="py-3 px-5">Code Promo</th>
                      <th className="py-3 px-5">Valeur & Bénéficiaires</th>
                      <th className="py-3 px-5">Utilisations</th>
                      <th className="py-3 px-5">Statut Live</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {promos.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-8 text-center text-slate-400">
                          Aucun code promotionnel configuré. Cliquez sur "Nouveau Code Promo" pour en créer un.
                        </td>
                      </tr>
                    ) : (
                      promos.map((promo) => (
                        <tr key={promo.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3.5 px-5 font-mono font-bold text-slate-900 text-sm">
                            {promo.code}
                          </td>
                          <td className="py-3.5 px-5">
                            <span className="font-bold text-emerald-600 mr-2">-{promo.discountPercent}%</span>
                            <span className="text-slate-600 text-xs">({promo.description})</span>
                          </td>
                          <td className="py-3.5 px-5 text-slate-600 font-mono">
                            {promo.uses || 0} utilisation{(promo.uses || 0) > 1 ? "s" : ""}
                          </td>
                          <td className="py-3.5 px-5">
                            <button
                              onClick={() => handleTogglePromo(promo.id)}
                              title="Cliquer pour basculer Actif / Inactif"
                              className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                                promo.isActive
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                  : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                              }`}
                            >
                              {promo.isActive ? "● Actif" : "○ Inactif"}
                            </button>
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() => handleDeletePromo(promo.id, promo.code)}
                              className="text-xs text-red-600 hover:text-red-800 font-semibold px-2 py-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 8. PARAMÈTRES & FISCALITÉ                                       */}
          {/* ================================================================ */}
          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto space-y-5">
              <div className="pb-2 border-b border-slate-200">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">Paramètres du Store Kansotex</h1>
                <p className="text-xs text-slate-500 mt-0.5">Identifiants légaux, coordonnées bancaires CIH et conciergerie.</p>
              </div>

              <div className="bg-white border border-slate-200/80 p-6 rounded-xl space-y-4 shadow-xs">
                <h2 className="text-sm font-bold text-slate-900">Identifiants Légaux de la Société</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1">ICE (Identifiant Commun de l'Entreprise)</label>
                    <input type="text" readOnly value="002984512000084" className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-mono" />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">Identifiant Fiscal (IF)</label>
                    <input type="text" readOnly value="52849102" className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-mono" />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">RC Marrakech</label>
                    <input type="text" readOnly value="94821" className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-slate-900 font-mono" />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1">RIB CIH Bank Officiel</label>
                    <input type="text" readOnly value="230 450 48291048291048 29" className="w-full bg-emerald-50 border border-emerald-200 rounded px-3 py-2 text-emerald-800 font-mono font-bold" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================================================================== */}
      {/* 3. ORDER DETAILS SLIDE-OVER DRAWER                                   */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white border-l border-slate-200 h-full shadow-2xl flex flex-col z-10"
            >
              <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-mono text-slate-900">{selectedOrder.orderNumber}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Enregistrée le {new Date(selectedOrder.createdAt).toLocaleDateString("fr-FR")}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800">✕</button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-2 text-[10px]">Informations Client (PostgreSQL)</h3>
                  <p className="text-sm font-bold text-slate-900">{selectedOrder.customerName}</p>
                  <p className="text-slate-600 font-medium">{selectedOrder.customerCompany}</p>
                  <p className="text-slate-400 font-mono mt-1">{selectedOrder.customerEmail}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-2 text-[10px]">Synthèse Financière</h3>
                  <div className="flex justify-between text-slate-600">
                    <span>Total HT :</span>
                    <span className="font-mono font-medium">{formatMoney(selectedOrder.totalAmount * 0.8)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>TVA (20% Maroc) :</span>
                    <span className="font-mono font-medium">{formatMoney(selectedOrder.totalAmount * 0.2)}</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                    <span>Total Net TTC :</span>
                    <span className="text-[#c29d59]">{formatMoney(selectedOrder.totalAmount)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-slate-900 uppercase tracking-wider text-[10px]">Mettre à jour l'état dans la base :</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-900 text-xs rounded-lg px-3 py-2 font-medium focus:outline-none focus:border-[#c29d59]"
                  >
                    <option value="PENDING">En Attente de Virement</option>
                    <option value="PROCESSING">En Coupe & Confection Atelier</option>
                    <option value="SHIPPED">Expédié (Amana Express)</option>
                    <option value="DELIVERED">Livré & Posé sur Site</option>
                    <option value="CANCELLED">Annulé</option>
                  </select>
                </div>
              </div>

              <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <a
                  href={`https://wa.me/212661000000?text=Bonjour%20${encodeURIComponent(selectedOrder.customerName)},%20mise%20%C3%A0%20jour%20de%20votre%20commande%20Kansotex%20${selectedOrder.orderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  <IconWhatsApp className="w-4 h-4" />
                  <span>Notifier Client WhatsApp</span>
                </a>
                <button
                  onClick={() => window.print()}
                  className="px-4 h-10 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
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
      {/* 4. OFFICIAL KANSOTEX INVOICE A4 MODAL                                */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden z-10 font-sans my-8"
            >
              <div className="bg-slate-900 px-6 py-3 flex items-center justify-between text-white">
                <span className="font-mono text-xs font-bold text-[#c29d59]">{selectedInvoice.invoiceRef}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => window.print()} className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-medium">Imprimer PDF</button>
                  <button onClick={() => setSelectedInvoice(null)} className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white">✕</button>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                  <div>
                    <h2 className="font-termina text-xl font-bold tracking-[0.2em]">KANSOTEX</h2>
                    <p className="text-xs text-slate-500 mt-1">Éditeur Textile & Confection d'Atelier</p>
                    <div className="text-[11px] text-slate-600 mt-2 space-y-0.5">
                      <p>Sidi Ghanem, Marrakech, Maroc</p>
                      <p className="font-mono text-[#c29d59]">ICE : 002984512000084 · IF : 52849102 · RC : 94821</p>
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-600 space-y-1">
                    <p className="font-bold text-slate-900 font-mono text-sm">{selectedInvoice.invoiceRef}</p>
                    <p>Date : {new Date().toLocaleDateString("fr-FR")}</p>
                    <p>Réf : {selectedInvoice.orderNumber}</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
                  <p className="font-bold text-slate-900 text-sm">{selectedInvoice.customerCompany}</p>
                  <p className="text-slate-600">{selectedInvoice.customerName}</p>
                  <p className="text-slate-400 font-mono mt-0.5">ICE: {selectedInvoice.customerSiret}</p>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold uppercase text-slate-500">
                        <th className="py-2.5 px-4">Prestations & Confection Sur-Mesure</th>
                        <th className="py-2.5 px-4 text-right">Montant HT</th>
                        <th className="py-2.5 px-4 text-right">TVA 20%</th>
                        <th className="py-2.5 px-4 text-right">Total TTC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          Fourniture et coupe de tissus nobles avec confection d'atelier
                        </td>
                        <td className="py-3 px-4 text-right font-mono">{formatMoney(selectedInvoice.ht)}</td>
                        <td className="py-3 px-4 text-right font-mono">{formatMoney(selectedInvoice.tva)}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">{formatMoney(selectedInvoice.totalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between items-end pt-2 text-xs">
                  <div className="text-slate-500 space-y-1">
                    <p className="font-bold text-slate-900">Règlement par virement CIH Bank :</p>
                    <p className="font-mono text-slate-700 font-semibold">230 450 48291048291048 29</p>
                  </div>
                  <div className="w-56 space-y-1.5 text-right">
                    <p className="text-slate-600">Total HT : <span className="font-mono">{formatMoney(selectedInvoice.ht)}</span></p>
                    <p className="text-slate-600">TVA 20% : <span className="font-mono">{formatMoney(selectedInvoice.tva)}</span></p>
                    <p className="text-sm font-bold text-slate-900 pt-1 border-t border-slate-200">
                      Total TTC : <span className="font-mono text-[#c29d59]">{formatMoney(selectedInvoice.totalAmount)}</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* 5. ADD PRODUCT MODAL (Persists to Postgres DB)                       */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isNewProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewProductModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white border border-slate-200 rounded-xl p-6 shadow-2xl z-10 text-slate-900 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h2 className="text-base font-bold text-slate-900">Créer un Tissu dans la Base PostgreSQL</h2>
                <button onClick={() => setIsNewProductModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Nom du Tissu</label>
                  <input
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    placeholder="Ex: Lin Lavé Blanc Albâtre — Signature"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Catégorie</label>
                    <select
                      value={newProdCat}
                      onChange={(e) => setNewProdCat(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#c29d59]"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.nameFr}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Prix Public TTC (EUR)</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Stock Rouleau (Mètres linéaires)</label>
                    <input
                      type="number"
                      required
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Laize (Largeur cm)</label>
                    <input
                      type="number"
                      value={newProdLaize}
                      onChange={(e) => setNewProdLaize(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-[#c29d59]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Composition Textile</label>
                  <input
                    type="text"
                    value={newProdComp}
                    onChange={(e) => setNewProdComp(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewProductModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-[#c29d59] hover:bg-[#b08b49] text-white font-bold rounded-lg shadow-sm transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? "Enregistrement DB..." : "Créer dans Postgres"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* NEW PROMO CODE MODAL */}
        {isNewPromoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewPromoModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden z-10 font-sans"
            >
              <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <IconDiscounts className="w-4 h-4 text-[#c29d59]" />
                  <h3 className="font-bold text-sm">Nouveau Code Promotionnel</h3>
                </div>
                <button
                  onClick={() => setIsNewPromoModalOpen(false)}
                  className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreatePromo} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold uppercase tracking-wider text-[11px]">
                    Code Promo (Majuscules)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="EX: HOTEL30, ARCHI25, SUMMER15"
                    value={newPromoCode}
                    onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold uppercase focus:outline-none focus:border-[#c29d59]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Le code que les clients saisiront dans leur panier.</p>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-semibold uppercase tracking-wider text-[11px]">
                    Pourcentage de Remise (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="1"
                      max="100"
                      placeholder="20"
                      value={newPromoDiscount}
                      onChange={(e) => setNewPromoDiscount(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-[#c29d59]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-semibold uppercase tracking-wider text-[11px]">
                    Description & Bénéficiaires
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Palaces & Riads Marrakech, Partenaires Architectes"
                    value={newPromoDesc}
                    onChange={(e) => setNewPromoDesc(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] leading-relaxed">
                  ✓ Ce code sera instantanément actif sur toute la boutique, dans le tiroir panier et sur la page de paiement.
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewPromoModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg font-medium cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-[#c29d59] hover:bg-[#b08b49] text-white font-bold rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Activation..." : "Activer le Code Promo"}
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
