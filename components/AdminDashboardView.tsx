"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCurrency, type CurrencyCode } from "@/lib/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// LUXURY ARTISANAL VECTOR ICONS (Strictly 1.5px fine lines, zero emojis)
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

function IconCategories({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
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

function IconQuotes({ className = "w-4 h-4" }: { className?: string }) {
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

function IconDiscounts({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

function IconInvoices({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
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

function IconExternalLink({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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

function IconArrowUpRight({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

// ============================================================================
// DATA TYPES
// ============================================================================
export type AdminTab =
  | "analytics"
  | "orders"
  | "products"
  | "categories"
  | "customers"
  | "quotes"
  | "atelier"
  | "marketing"
  | "invoices"
  | "settings";

export interface EnrichedProduct {
  id: string;
  slug: string;
  nameFr: string;
  nameEn?: string;
  descriptionFr?: string;
  type: string;
  isActive: boolean;
  basePrice: number;
  image?: string;
  gallery?: string[];
  categoryId: string;
  categoryName?: string;
  metadata?: any;
  variants?: any[];
  stockLevel: number;
  laize: number;
  martindale: number;
  composition: string;
}

export interface EnrichedOrder {
  id: string;
  orderNumber: string;
  userId?: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerCompany: string;
  customerRole: string;
  customerSiret: string;
  customerDiscount: number;
  trackingNumber?: string;
  atelierNote?: string;
}

export interface EnrichedUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  companyName?: string;
  siret?: string;
  isVerifiedPro: boolean;
  tradeDiscount: number;
  createdAt: string;
}

export interface PromoCodeItem {
  id: string;
  code: string;
  discountPercent: number;
  description: string;
  uses: number;
  isActive: boolean;
  createdAt: string;
}

export interface EnrichedQuote {
  id: string;
  quoteNumber: string;
  userId: string;
  status: string;
  totalEstimate: number;
  projectTitle: string;
  createdAt: string;
  customerName: string;
  customerCompany: string;
  customerEmail: string;
  customerPhone?: string;
}

export interface AdminDashboardViewProps {
  initialData?: {
    products: EnrichedProduct[];
    categories: any[];
    orders: EnrichedOrder[];
    users: EnrichedUser[];
    promos?: PromoCodeItem[];
    quotes?: EnrichedQuote[];
    adminUser?: any;
  };
}

export function AdminDashboardView({ initialData }: AdminDashboardViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.startsWith("/en") ? "en" : "fr";
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("analytics");

  // Core Database States
  const [products, setProducts] = useState<EnrichedProduct[]>(initialData?.products || []);
  const [categories, setCategories] = useState<any[]>(initialData?.categories || []);
  const [orders, setOrders] = useState<EnrichedOrder[]>(initialData?.orders || []);
  const [users, setUsers] = useState<EnrichedUser[]>(initialData?.users || []);
  const [promos, setPromos] = useState<PromoCodeItem[]>(initialData?.promos || []);
  const [quotes, setQuotes] = useState<EnrichedQuote[]>(initialData?.quotes || []);
  const [adminUser, setAdminUser] = useState<any>(initialData?.adminUser || null);

  // Global Omnibar & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [orderFilter, setOrderFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [userRoleFilter, setUserRoleFilter] = useState("ALL");
  const [quoteFilter, setQuoteFilter] = useState("ALL");

  // Selected Drawers & Modals
  const [selectedOrder, setSelectedOrder] = useState<EnrichedOrder | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProduct | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<EnrichedUser | null>(null);
  const [selectedQuote, setSelectedQuote] = useState<EnrichedQuote | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);

  // Creation Modals
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isNewPromoModalOpen, setIsNewPromoModalOpen] = useState(false);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Product Form State
  const [newProdName, setNewProdName] = useState("");
  const [newProdCat, setNewProdCat] = useState("cat-1");
  const [newProdPrice, setNewProdPrice] = useState("120");
  const [newProdStock, setNewProdStock] = useState("180");
  const [newProdLaize, setNewProdLaize] = useState("280");
  const [newProdComp, setNewProdComp] = useState("100% Lin Français Lavé");
  const [newProdMartindale, setNewProdMartindale] = useState("40000");

  // New Promo Form State
  const [newPromoCode, setNewPromoCode] = useState("");
  const [newPromoDiscount, setNewPromoDiscount] = useState("25");
  const [newPromoDesc, setNewPromoDesc] = useState("");

  // New Category Form State
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  // Announcement Bar State
  const [announcementText, setAnnouncementText] = useState("Atelier Marrakech : Livraison offerte au Maroc dès 1 500 MAD • Tissus & Confection Sur-Mesure");
  const [isAnnouncementActive, setIsAnnouncementActive] = useState(true);

  // Toast notifier
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Helper currency formatter
  const formatMoney = (amountEur: number) => {
    const res = formatPrice(amountEur);
    const formatted = String(res.value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formatted} ${res.symbol}`;
  };

  // Live Refresh from backend
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
      showToast("Base PostgreSQL Supabase synchronisée en direct !");
    } catch (err) {
      console.error("Refresh error:", err);
      showToast("Erreur lors de la synchronisation de la base.");
    }
  };

  // Admin Logout
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

  // ============================================================================
  // DATABASE MUTATION HANDLERS (Direct PostgreSQL Supabase Execution)
  // ============================================================================

  // 1. Update Order Status
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    try {
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
        showToast(`Statut commande mis à jour : ${newStatus}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 2. Quick Update Product Price (Direct Postgres Mutation)
  const handleUpdateProductPrice = async (productId: string, newPrice: number) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, basePrice: newPrice } : p)));
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_PRODUCT_PRICE",
          payload: { productId, basePrice: newPrice },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Nouveau prix enregistré en base Postgres : ${newPrice} €`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 3. Quick Update Stock Level
  const handleUpdateStock = async (productId: string, variantId: string | undefined, newStock: number) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stockLevel: newStock } : p)));
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_STOCK",
          payload: { productId, variantId, newStock },
        }),
      });
      showToast(`Stock mis à jour en base : ${newStock} mètres.`);
    } catch (err) {
      console.error(err);
    }
  };

  // 4. Toggle Product Visibility in store
  const handleToggleProduct = async (productId: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, isActive: nextStatus } : p)));
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "TOGGLE_PRODUCT_STATUS",
          payload: { productId, isActive: nextStatus },
        }),
      });
      showToast(`Tissu ${nextStatus ? "activé" : "masqué"} en boutique.`);
    } catch (err) {
      console.error(err);
    }
  };

  // 5. Verify/Unverify B2B Pro & Change Trade Discount
  const handleUpdateUserPro = async (userId: string, isVerifiedPro: boolean, tradeDiscount: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isVerifiedPro, tradeDiscount } : u))
    );
    if (selectedCustomer && selectedCustomer.id === userId) {
      setSelectedCustomer((prev) => (prev ? { ...prev, isVerifiedPro, tradeDiscount } : null));
    }
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "VERIFY_USER_PRO",
          payload: { userId, isVerifiedPro, tradeDiscount },
        }),
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Remise de ${Math.round(tradeDiscount * 100)}% et statut Pro validés.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 6. Create New Product in Postgres
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
            nameFr: newProdName.trim(),
            categoryId: newProdCat,
            basePrice: parseFloat(newProdPrice) || 120,
            stock: parseFloat(newProdStock) || 150,
            laize: parseFloat(newProdLaize) || 280,
            martindale: parseInt(newProdMartindale) || 40000,
            composition: newProdComp.trim() || "100% Lin Français Lavé",
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Nouveau tissu noble enregistré dans PostgreSQL !");
        setIsNewProductModalOpen(false);
        setNewProdName("");
        await refreshDatabase();
      } else {
        showToast(data.error || "Erreur de création.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 7. Promo Code CRUD
  const handleCreatePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/promo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: newPromoCode.trim().toUpperCase(),
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
        const refreshed = await fetch("/api/promo").then((r) => r.json());
        if (refreshed.success) setPromos(refreshed.promos);
      }
    } catch (err) {
      console.error(err);
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
        setPromos((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isActive: data.promo.isActive } : p))
        );
        showToast(`Statut du code ${data.promo.code} mis à jour.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePromo = async (id: string, code: string) => {
    if (!confirm(`Supprimer définitivement le code promo ${code} ?`)) return;
    try {
      const res = await fetch(`/api/promo?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setPromos((prev) => prev.filter((p) => p.id !== id));
        showToast(`Code promo ${code} supprimé.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 8. Create Category
  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "CREATE_CATEGORY",
          payload: {
            nameFr: newCatName.trim(),
            slug: newCatSlug.trim() || newCatName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            descriptionFr: newCatDesc.trim() || null,
          },
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Nouvel univers textile enregistré !");
        setIsNewCategoryModalOpen(false);
        setNewCatName("");
        setNewCatSlug("");
        setNewCatDesc("");
        await refreshDatabase();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 9. Update Quote Status
  const handleUpdateQuoteStatus = (quoteId: string, nextStatus: string) => {
    setQuotes((prev) => prev.map((q) => (q.id === quoteId ? { ...q, status: nextStatus } : q)));
    if (selectedQuote && selectedQuote.id === quoteId) {
      setSelectedQuote((prev) => (prev ? { ...prev, status: nextStatus } : null));
    }
    showToast(`Statut du devis mis à jour : ${nextStatus}`);
  };

  // Export Accounting CSV
  const handleExportCSV = () => {
    const headers = [
      "Numero_Commande",
      "Date_Casablanca",
      "Nom_Client",
      "Societe",
      "ICE_SIRET",
      "Statut",
      "Montant_HT_EUR",
      "TVA_20_EUR",
      "Total_TTC_EUR",
      "Total_MAD_Estime",
    ];

    const rows = orders.map((o) => {
      const date = new Date(o.createdAt).toLocaleDateString("fr-FR");
      const ht = (o.totalAmount / 1.2).toFixed(2);
      const tva = (o.totalAmount - o.totalAmount / 1.2).toFixed(2);
      const ttc = o.totalAmount.toFixed(2);
      const mad = (o.totalAmount * 10.85).toFixed(0);

      return [
        `"${o.orderNumber}"`,
        `"${date}"`,
        `"${o.customerName}"`,
        `"${o.customerCompany}"`,
        `"${o.customerSiret || "N/A"}"`,
        `"${o.status}"`,
        `"${ht}"`,
        `"${tva}"`,
        `"${ttc}"`,
        `"${mad}"`,
      ].join(";");
    });

    const csvContent = "\uFEFF" + [headers.join(";"), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `kansotex_releve_fiscal_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Relevé fiscal officiel Kansotex exporté avec succès.");
  };

  // Total Business KPI Calculations
  const totalRevenue = useMemo(
    () => orders.reduce((sum, ord) => sum + (ord.totalAmount || 0), 0),
    [orders]
  );
  const totalMeters = useMemo(
    () => products.reduce((sum, p) => sum + (p.stockLevel || 0), 0),
    [products]
  );
  const activeProductsCount = useMemo(
    () => products.filter((p) => p.isActive).length,
    [products]
  );
  const verifiedProsCount = useMemo(
    () => users.filter((u) => u.isVerifiedPro).length,
    [users]
  );

  // Filtered Lists
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.nameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.composition && p.composition.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = categoryFilter === "ALL" || p.categoryId === categoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, categoryFilter]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = orderFilter === "ALL" || o.status === orderFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, orderFilter]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.companyName && u.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesRole = userRoleFilter === "ALL" || u.role === userRoleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, userRoleFilter]);

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchesSearch =
        q.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.customerCompany.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = quoteFilter === "ALL" || q.status === quoteFilter;
      return matchesSearch && matchesStatus;
    });
  }, [quotes, searchQuery, quoteFilter]);

  return (
    <div className="flex h-screen bg-[#f8f6f0] text-slate-800 font-sans antialiased overflow-hidden select-none">
      {/* ==================================================================== */}
      {/* 1. LUXURY ATELIER SIDEBAR (Moroccan Obsidian, Brass & Hairline Foil) */}
      {/* ==================================================================== */}
      <aside className="w-68 bg-[#0c0e12] border-r border-[#262118] flex flex-col justify-between shrink-0 shadow-2xl z-30">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="h-20 px-5 flex items-center gap-3.5 border-b border-[#211c16] shrink-0 bg-[#090b0e]">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfba73] via-[#c29d59] to-[#8c6d32] p-[1px] shadow-lg shadow-[#c29d59]/10">
              <div className="w-full h-full bg-[#0c0e12] rounded-[11px] flex items-center justify-center">
                <span className="font-serif font-black text-lg text-[#dfba73] tracking-widest">K</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm tracking-wider text-white uppercase">
                  Kansotex
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#c29d59]/20 text-[#dfba73] border border-[#c29d59]/40">
                  ADMIN
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight mt-0.5">
                Marrakech • Éditeur Textile
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
            {/* Section: Gestion E-Commerce & Production */}
            <div>
              <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-[#8a7f70]">
                Gestion & Direction
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === "analytics"
                      ? "bg-[#1f1a14] text-[#dfba73] font-semibold border-l-2 border-[#c29d59] shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconDashboard className={`w-4 h-4 ${activeTab === "analytics" ? "text-[#c29d59]" : "text-slate-500"}`} />
                    <span>Vue d'Ensemble & Ventes</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === "orders"
                      ? "bg-[#1f1a14] text-[#dfba73] font-semibold border-l-2 border-[#c29d59] shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconOrders className={`w-4 h-4 ${activeTab === "orders" ? "text-[#c29d59]" : "text-slate-500"}`} />
                    <span>Commandes & Expéditions</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#262118] text-[#dfba73]">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("products")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === "products"
                      ? "bg-[#1f1a14] text-[#dfba73] font-semibold border-l-2 border-[#c29d59] shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconProducts className={`w-4 h-4 ${activeTab === "products" ? "text-[#c29d59]" : "text-slate-500"}`} />
                    <span>Catalogue Tissus & Stocks</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#262118] text-[#dfba73]">
                    {products.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("categories")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === "categories"
                      ? "bg-[#1f1a14] text-[#dfba73] font-semibold border-l-2 border-[#c29d59] shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconCategories className={`w-4 h-4 ${activeTab === "categories" ? "text-[#c29d59]" : "text-slate-500"}`} />
                    <span>Univers & Collections CMS</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#262118] text-[#dfba73]">
                    {categories.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("customers")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === "customers"
                      ? "bg-[#1f1a14] text-[#dfba73] font-semibold border-l-2 border-[#c29d59] shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconCustomers className={`w-4 h-4 ${activeTab === "customers" ? "text-[#c29d59]" : "text-slate-500"}`} />
                    <span>Clients & Prescripteurs B2B</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#262118] text-[#dfba73]">
                    {users.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("quotes")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === "quotes"
                      ? "bg-[#1f1a14] text-[#dfba73] font-semibold border-l-2 border-[#c29d59] shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconQuotes className={`w-4 h-4 ${activeTab === "quotes" ? "text-[#c29d59]" : "text-slate-500"}`} />
                    <span>Devis & Prescriptions</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#262118] text-[#dfba73]">
                    {quotes.length}
                  </span>
                </button>
              </nav>
            </div>

            {/* Section: Atelier & Marketing */}
            <div>
              <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-[0.2em] font-semibold text-[#8a7f70]">
                Atelier & Marketing
              </div>
              <nav className="space-y-0.5">
                <button
                  onClick={() => setActiveTab("atelier")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === "atelier"
                      ? "bg-[#1f1a14] text-[#dfba73] font-semibold border-l-2 border-[#c29d59] shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconAtelier className={`w-4 h-4 ${activeTab === "atelier" ? "text-[#c29d59]" : "text-slate-500"}`} />
                    <span>Atelier Marrakech (Kanban)</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
                    Live
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("marketing")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === "marketing"
                      ? "bg-[#1f1a14] text-[#dfba73] font-semibold border-l-2 border-[#c29d59] shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconDiscounts className={`w-4 h-4 ${activeTab === "marketing" ? "text-[#c29d59]" : "text-slate-500"}`} />
                    <span>Codes Promo & Campagnes</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#262118] text-[#dfba73]">
                    {promos.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab("invoices")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === "invoices"
                      ? "bg-[#1f1a14] text-[#dfba73] font-semibold border-l-2 border-[#c29d59] shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconInvoices className={`w-4 h-4 ${activeTab === "invoices" ? "text-[#c29d59]" : "text-slate-500"}`} />
                    <span>Facturation & Fiscalité</span>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === "settings"
                      ? "bg-[#1f1a14] text-[#dfba73] font-semibold border-l-2 border-[#c29d59] shadow-inner"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconSettings className={`w-4 h-4 ${activeTab === "settings" ? "text-[#c29d59]" : "text-slate-500"}`} />
                    <span>Paramètres & RIB CIH</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>

          {/* Database Live Pulse Indicator */}
          <div className="p-4 border-t border-[#211c16] bg-[#08090c] shrink-0">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                PostgreSQL Supabase
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Connecté
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              {products.length} Tissus · {orders.length} Commandes · {users.length} Clients
            </p>
          </div>
        </div>
      </aside>

      {/* ==================================================================== */}
      {/* 2. MAIN APPLICATION CONTENT & LUXURY HEADER                           */}
      {/* ==================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#f8f6f0]">
        {/* Top Executive Header */}
        <header className="h-18 bg-white border-b border-[#e8e2d5] px-6 flex items-center justify-between shrink-0 shadow-xs z-20">
          {/* Left: Omnibar Search */}
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full max-w-md">
              <IconSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher tissu, commande, client, code promo, devis..."
                className="w-full h-10 pl-10 pr-9 bg-[#fbf9f6] hover:bg-white focus:bg-white border border-[#e8e2d5] rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#c29d59] focus:ring-1 focus:ring-[#c29d59] transition-all font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={refreshDatabase}
              title="Synchroniser la base de données PostgreSQL"
              className="h-10 px-3 bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] rounded-lg text-xs font-semibold text-slate-700 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <svg className="w-3.5 h-3.5 text-[#c29d59]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden lg:inline">Sync DB</span>
            </button>
          </div>

          {/* Right: Actions, Currency, Store Link & Verified Admin Badge */}
          <div className="flex items-center gap-3">
            {/* Currency Switcher */}
            <div className="flex items-center bg-[#f4efe6] p-0.5 rounded-lg border border-[#e8e2d5]">
              {(["MAD", "EUR", "USD"] as CurrencyCode[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2.5 py-1 text-[11px] font-mono font-bold rounded-md transition-all cursor-pointer ${
                    currency === cur
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {/* Quick Action: New Product */}
            <button
              onClick={() => setIsNewProductModalOpen(true)}
              className="flex items-center gap-1.5 h-10 px-4 bg-gradient-to-r from-[#c29d59] to-[#b08b49] hover:from-[#b08b49] hover:to-[#9b783e] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer tracking-wider uppercase font-termina"
            >
              <IconPlus className="w-3.5 h-3.5" />
              <span>Nouveau Tissu</span>
            </button>

            {/* View Live Store */}
            <Link
              href={`/${currentLocale}`}
              target="_blank"
              className="flex items-center gap-1.5 h-10 px-3.5 bg-white hover:bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg text-xs font-semibold text-slate-700 transition-all shadow-xs"
            >
              <IconExternalLink className="w-3.5 h-3.5 text-[#c29d59]" />
              <span className="hidden sm:inline">Boutique Live</span>
            </Link>

            {/* Verified Admin Profile Section */}
            <div className="flex items-center gap-3 pl-3 border-l border-[#e8e2d5]">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {adminUser?.name || "Directeur Général Kansotex"}
                </div>
                <div className="text-[10px] text-emerald-700 font-mono font-bold flex items-center justify-end gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  ADMIN VÉRIFIÉ
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Se déconnecter de la session Administrateur"
                className="h-10 px-3 bg-[#fbf9f6] hover:bg-red-50 text-slate-600 hover:text-red-700 border border-[#e8e2d5] hover:border-red-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
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
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 bg-[#f8f6f0]">
          {/* ================================================================ */}
          {/* 1. ANALYTICS & OVERVIEW TAB                                      */}
          {/* ================================================================ */}
          {activeTab === "analytics" && (
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e2d5]">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#181c22] tracking-tight">
                    Intelligence Commerciale & Activité Live
                  </h1>
                  <p className="text-xs text-[#736b5e] mt-1 font-sans">
                    Données consolidées en temps réel depuis PostgreSQL Supabase • Siège & Atelier Marrakech.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 h-9 px-3.5 bg-white border border-[#e8e2d5] rounded-lg text-xs font-bold text-slate-700 hover:bg-[#fbf9f6] shadow-xs cursor-pointer"
                  >
                    <IconDownload className="w-3.5 h-3.5 text-[#c29d59]" />
                    <span>Exporter Grand Livre CSV</span>
                  </button>
                </div>
              </div>

              {/* 4 Executive KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-[#e8e2d5] shadow-xs hover:border-[#c29d59]/50 transition-all">
                  <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#8c8273] uppercase tracking-wider mb-2">
                    <span>Chiffre d'Affaires</span>
                    <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold">+28.4%</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#181c22]">
                    {formatMoney(totalRevenue)}
                  </div>
                  <p className="text-[11px] text-[#8c8273] mt-1">
                    ≈ {(totalRevenue * 10.85).toLocaleString("fr-FR")} MAD (Commandes payées & validées)
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#e8e2d5] shadow-xs hover:border-[#c29d59]/50 transition-all">
                  <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#8c8273] uppercase tracking-wider mb-2">
                    <span>Commandes Traitées</span>
                    <span className="text-[#c29d59] font-mono font-bold">{orders.length} totales</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#181c22]">
                    {orders.length}
                  </div>
                  <p className="text-[11px] text-[#8c8273] mt-1">
                    {orders.filter((o) => o.status === "PROCESSING").length} en cours de coupe à l'atelier
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#e8e2d5] shadow-xs hover:border-[#c29d59]/50 transition-all">
                  <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#8c8273] uppercase tracking-wider mb-2">
                    <span>Volume Stock Rouleaux</span>
                    <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px] font-bold">Atelier</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#181c22]">
                    {totalMeters.toLocaleString("fr-FR")} ml
                  </div>
                  <p className="text-[11px] text-[#8c8273] mt-1">
                    Mètres linéaires disponibles dans {activeProductsCount} références nobles
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl border border-[#e8e2d5] shadow-xs hover:border-[#c29d59]/50 transition-all">
                  <div className="flex items-center justify-between text-xs font-mono font-semibold text-[#8c8273] uppercase tracking-wider mb-2">
                    <span>Partenaires B2B Vérifiés</span>
                    <span className="text-[#c29d59] bg-amber-50 px-2 py-0.5 rounded text-[10px] font-bold">Prescripteurs</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#181c22]">
                    {verifiedProsCount}
                  </div>
                  <p className="text-[11px] text-[#8c8273] mt-1">
                    Architectes, décorateurs & palaces partenaires
                  </p>
                </div>
              </div>

              {/* Live Atelier & Recent Orders Split Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2/3 Column: Recent Real Orders */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-[#e8e2d5] p-5 shadow-xs">
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#f0ebe1]">
                    <div>
                      <h2 className="font-serif text-base font-bold text-[#181c22]">
                        Dernières Commandes Clients
                      </h2>
                      <p className="text-xs text-[#8c8273]">Flux transactionnel direct de la boutique</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs font-bold text-[#c29d59] hover:text-[#9b783e] transition-colors cursor-pointer"
                    >
                      Voir toutes les commandes →
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-[#f0ebe1] text-[#8c8273] font-mono text-[11px] uppercase">
                          <th className="pb-2.5">Réf & Client</th>
                          <th className="pb-2.5">Statut</th>
                          <th className="pb-2.5">Montant</th>
                          <th className="pb-2.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#f5f1e8]">
                        {orders.slice(0, 5).map((ord) => (
                          <tr key={ord.id} className="hover:bg-[#fbf9f6] transition-colors">
                            <td className="py-3">
                              <div className="font-mono font-bold text-slate-900">{ord.orderNumber}</div>
                              <div className="text-[11px] text-slate-500">{ord.customerName} • {ord.customerCompany}</div>
                            </td>
                            <td className="py-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                  ord.status === "PAID"
                                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                    : ord.status === "PROCESSING"
                                    ? "bg-amber-50 text-amber-800 border-amber-200"
                                    : ord.status === "SHIPPED"
                                    ? "bg-blue-50 text-blue-800 border-blue-200"
                                    : "bg-slate-100 text-slate-700 border-slate-200"
                                }`}
                              >
                                {ord.status}
                              </span>
                            </td>
                            <td className="py-3 font-mono font-bold text-slate-900">
                              {formatMoney(ord.totalAmount)}
                            </td>
                            <td className="py-3 text-right">
                              <button
                                onClick={() => setSelectedOrder(ord)}
                                className="px-2.5 py-1 bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] text-slate-700 rounded text-xs font-semibold cursor-pointer"
                              >
                                Gérer
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 1/3 Column: Live Quick Actions & Store Health */}
                <div className="space-y-4">
                  {/* Quick Short-Cut Tools Card */}
                  <div className="bg-white rounded-xl border border-[#e8e2d5] p-5 shadow-xs">
                    <h3 className="font-serif text-sm font-bold text-[#181c22] mb-3">
                      Outils de Pilotage Direct
                    </h3>
                    <div className="space-y-2 text-xs">
                      <button
                        onClick={() => setIsNewProductModalOpen(true)}
                        className="w-full p-2.5 rounded-lg bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] text-left flex items-center justify-between transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <IconPlus className="w-4 h-4 text-[#c29d59]" />
                          <span className="font-semibold text-slate-800 group-hover:text-[#c29d59]">Ajouter Nouveau Tissu</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">Catalogue</span>
                      </button>

                      <button
                        onClick={() => setIsNewPromoModalOpen(true)}
                        className="w-full p-2.5 rounded-lg bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] text-left flex items-center justify-between transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <IconDiscounts className="w-4 h-4 text-[#c29d59]" />
                          <span className="font-semibold text-slate-800 group-hover:text-[#c29d59]">Créer un Code Promo</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">Marketing</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("atelier")}
                        className="w-full p-2.5 rounded-lg bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] text-left flex items-center justify-between transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <IconAtelier className="w-4 h-4 text-[#c29d59]" />
                          <span className="font-semibold text-slate-800 group-hover:text-[#c29d59]">Suivi Confection Atelier</span>
                        </div>
                        <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded">Kanban</span>
                      </button>

                      <button
                        onClick={() => setActiveTab("customers")}
                        className="w-full p-2.5 rounded-lg bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] text-left flex items-center justify-between transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2">
                          <IconCustomers className="w-4 h-4 text-[#c29d59]" />
                          <span className="font-semibold text-slate-800 group-hover:text-[#c29d59]">Valider Comptes Pro B2B</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">CRM</span>
                      </button>
                    </div>
                  </div>

                  {/* Legal & Fiscal Info Card */}
                  <div className="bg-[#12151b] text-white rounded-xl p-5 border border-[#2b251c] shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfba73]">
                        Maison Kansotex SARL AU
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">Marrakech</span>
                    </div>
                    <div className="space-y-1 text-[11px] font-mono text-slate-300">
                      <p>ICE : <span className="text-white font-bold">002984512000084</span></p>
                      <p>IF : <span className="text-white font-bold">52849102</span></p>
                      <p>RC Marrakech : <span className="text-white font-bold">94821</span></p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10 text-[10px] text-[#dfba73] font-mono">
                      Banque CIH : 230 450 48291048291048 29
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 2. COMMANDES & EXPÉDITIONS TAB                                    */}
          {/* ================================================================ */}
          {activeTab === "orders" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e2d5]">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#181c22] tracking-tight">
                    Gestion des Commandes & Confection
                  </h1>
                  <p className="text-xs text-[#736b5e] mt-0.5">
                    Mise à jour directe des statuts, génération des factures et suivi transporteur Amana.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Status Filters */}
                  <div className="flex items-center bg-[#f4efe6] p-1 rounded-lg border border-[#e8e2d5] text-xs">
                    {["ALL", "PAID", "PROCESSING", "SHIPPED", "DELIVERED"].map((st) => (
                      <button
                        key={st}
                        onClick={() => setOrderFilter(st)}
                        className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                          orderFilter === st
                            ? "bg-white text-slate-900 shadow-xs"
                            : "text-slate-500 hover:text-slate-900"
                        }`}
                      >
                        {st === "ALL" ? "Toutes" : st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-xl border border-[#e8e2d5] overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#fbf9f6] text-[11px] font-mono font-bold text-[#8c8273] uppercase border-b border-[#e8e2d5]">
                      <th className="py-3 px-5">Numéro & Date</th>
                      <th className="py-3 px-5">Client & Agence</th>
                      <th className="py-3 px-5">Statut Production</th>
                      <th className="py-3 px-5">Montant TTC</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5f1e8]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-slate-400">
                          Aucune commande trouvée.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#fbf9f6] transition-colors">
                          <td className="py-3.5 px-5">
                            <div className="font-mono font-bold text-slate-900">{ord.orderNumber}</div>
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                              {new Date(ord.createdAt).toLocaleDateString("fr-FR")}
                            </div>
                          </td>
                          <td className="py-3.5 px-5">
                            <div className="font-semibold text-slate-900">{ord.customerName}</div>
                            <div className="text-[11px] text-[#c29d59] font-medium">{ord.customerCompany}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{ord.customerEmail}</div>
                          </td>
                          <td className="py-3.5 px-5">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              className={`px-2.5 py-1 rounded text-xs font-bold border transition-all cursor-pointer font-sans ${
                                ord.status === "PAID"
                                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : ord.status === "PROCESSING"
                                  ? "bg-amber-50 text-amber-800 border-amber-200"
                                  : ord.status === "SHIPPED"
                                  ? "bg-blue-50 text-blue-800 border-blue-200"
                                  : ord.status === "DELIVERED"
                                  ? "bg-purple-50 text-purple-800 border-purple-200"
                                  : "bg-slate-100 text-slate-700 border-slate-200"
                              }`}
                            >
                              <option value="PENDING">PENDING (En attente)</option>
                              <option value="PAID">PAID (Payée)</option>
                              <option value="PROCESSING">PROCESSING (En coupe atelier)</option>
                              <option value="SHIPPED">SHIPPED (Expédiée)</option>
                              <option value="DELIVERED">DELIVERED (Livrée)</option>
                              <option value="CANCELLED">CANCELLED (Annulée)</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-5 font-mono font-bold text-slate-900 text-sm">
                            {formatMoney(ord.totalAmount)}
                          </td>
                          <td className="py-3.5 px-5 text-right space-x-2">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="px-3 py-1.5 bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] text-slate-800 rounded text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                            >
                              Détails & Facture
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
          {/* 3. CATALOGUE & ARCHITECTURE TEXTILE TAB                          */}
          {/* ================================================================ */}
          {activeTab === "products" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e2d5]">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#181c22] tracking-tight">
                    Catalogue Tissus & Gestion des Stocks
                  </h1>
                  <p className="text-xs text-[#736b5e] mt-0.5">
                    Édition des prix publics, fiches techniques (Laize, Martindale) et stocks rouleaux en base PostgreSQL.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {/* Category Filter */}
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="h-9 px-3 bg-white border border-[#e8e2d5] rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="ALL">Tous les Univers ({products.length})</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nameFr}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => setIsNewProductModalOpen(true)}
                    className="flex items-center gap-1.5 h-9 px-3.5 bg-[#c29d59] hover:bg-[#b08b49] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer font-termina uppercase tracking-wider"
                  >
                    <IconPlus className="w-3.5 h-3.5" />
                    <span>Nouveau Tissu</span>
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-[#e8e2d5] overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#fbf9f6] text-[11px] font-mono font-bold text-[#8c8273] uppercase border-b border-[#e8e2d5]">
                      <th className="py-3 px-5">Tissu Noble</th>
                      <th className="py-3 px-5">Spécifications Techniques</th>
                      <th className="py-3 px-5">Stock Disponible</th>
                      <th className="py-3 px-5">Prix Public (€ / TTC)</th>
                      <th className="py-3 px-5">Visibilité</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5f1e8]">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#fbf9f6] transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative border border-[#e8e2d5] shrink-0">
                              <Image
                                src={prod.image || "/gallery/duvet_cover_linen_1791048696631.jpg"}
                                alt={prod.nameFr}
                                fill
                                sizes="48px"
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{prod.nameFr}</div>
                              <div className="text-[11px] text-[#c29d59] font-medium">{prod.categoryName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">Slug: {prod.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="space-y-0.5 text-[11px] text-slate-600">
                            <div><span className="font-semibold text-slate-900">Laize:</span> {prod.laize} cm</div>
                            <div><span className="font-semibold text-slate-900">Martindale:</span> {prod.martindale.toLocaleString()} tours</div>
                            <div className="text-[10px] text-slate-500 truncate max-w-xs">{prod.composition}</div>
                          </div>
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              defaultValue={prod.stockLevel}
                              onBlur={(e) =>
                                handleUpdateStock(prod.id, prod.variants?.[0]?.id, parseFloat(e.target.value))
                              }
                              className="w-20 bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono font-bold text-slate-900 text-xs focus:bg-white focus:border-[#c29d59]"
                            />
                            <span className="text-slate-500 text-[11px]">mètres</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              defaultValue={prod.basePrice}
                              onBlur={(e) => handleUpdateProductPrice(prod.id, parseFloat(e.target.value))}
                              className="w-20 bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono font-bold text-slate-900 text-xs focus:bg-white focus:border-[#c29d59]"
                            />
                            <span className="text-slate-600 font-bold">€</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            ≈ {(prod.basePrice * 10.85).toFixed(0)} MAD
                          </div>
                        </td>
                        <td className="py-3.5 px-5">
                          <button
                            onClick={() => handleToggleProduct(prod.id, prod.isActive)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                              prod.isActive
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                : "bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200"
                            }`}
                          >
                            {prod.isActive ? "● En ligne" : "○ Masqué"}
                          </button>
                        </td>
                        <td className="py-3.5 px-5 text-right">
                          <button
                            onClick={() => setSelectedProduct(prod)}
                            className="px-3 py-1.5 bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] text-slate-800 rounded text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                          >
                            Fiche Technique
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 4. UNIVERS & COLLECTIONS CMS TAB                                  */}
          {/* ================================================================ */}
          {activeTab === "categories" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e2d5]">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#181c22] tracking-tight">
                    Univers & Collections de la Maison
                  </h1>
                  <p className="text-xs text-[#736b5e] mt-0.5">
                    Structure des catégories e-commerce et univers d'architecture textile Kansotex.
                  </p>
                </div>
                <button
                  onClick={() => setIsNewCategoryModalOpen(true)}
                  className="flex items-center gap-1.5 h-9 px-3.5 bg-[#c29d59] hover:bg-[#b08b49] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer font-termina uppercase tracking-wider"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  <span>Nouvel Univers</span>
                </button>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((cat) => {
                  const catProducts = products.filter((p) => p.categoryId === cat.id);
                  return (
                    <div
                      key={cat.id}
                      className="bg-white rounded-xl border border-[#e8e2d5] p-5 shadow-xs hover:border-[#c29d59] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold text-[#c29d59] uppercase tracking-wider">
                            Univers Kansotex
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                            {catProducts.length} référence{catProducts.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-slate-900">{cat.nameFr}</h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {cat.descriptionFr || "Collection de confection artisanale et matières nobles."}
                        </p>
                        <div className="text-[11px] font-mono text-slate-400 mt-3">
                          Slug URL: <span className="text-slate-700">/univers/{cat.slug}</span>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                        <Link
                          href={`/${currentLocale}/univers/${cat.slug}`}
                          target="_blank"
                          className="text-xs text-[#c29d59] font-bold hover:underline flex items-center gap-1"
                        >
                          <span>Voir la collection</span>
                          <IconArrowUpRight className="w-3 h-3" />
                        </Link>
                        <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          Actif
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 5. CLIENTS & COMPTES PRO B2B CRM TAB                              */}
          {/* ================================================================ */}
          {activeTab === "customers" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e2d5]">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#181c22] tracking-tight">
                    CRM Clients & Prescripteurs Professionnels
                  </h1>
                  <p className="text-xs text-[#736b5e] mt-0.5">
                    Attribution des remises B2B (Architectes, Hôtels, Décorateurs) enregistrées dans PostgreSQL.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={userRoleFilter}
                    onChange={(e) => setUserRoleFilter(e.target.value)}
                    className="h-9 px-3 bg-white border border-[#e8e2d5] rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="ALL">Tous les Rôles ({users.length})</option>
                    <option value="ARCHITECT">Architectes d'Intérieur</option>
                    <option value="HOTEL">Palaces & Hôtels de Luxe</option>
                    <option value="DECORATOR">Décorateurs</option>
                    <option value="CUSTOMER">Clients Particuliers VIP</option>
                    <option value="ADMIN">Administrateurs</option>
                  </select>
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-white rounded-xl border border-[#e8e2d5] overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#fbf9f6] text-[11px] font-mono font-bold text-[#8c8273] uppercase border-b border-[#e8e2d5]">
                      <th className="py-3 px-5">Prescripteur & Société</th>
                      <th className="py-3 px-5">Rôle & Compte</th>
                      <th className="py-3 px-5">Remise B2B Directe</th>
                      <th className="py-3 px-5">Statut Vérification</th>
                      <th className="py-3 px-5 text-right">Actions CRM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5f1e8]">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-[#fbf9f6] transition-colors">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-slate-900 text-sm">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-[11px] text-[#c29d59] font-medium font-serif">
                            {user.companyName || "Studio Privé"}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{user.email}</div>
                          {user.siret && (
                            <div className="text-[10px] text-slate-500 font-mono">ICE/RC: {user.siret}</div>
                          )}
                        </td>
                        <td className="py-3.5 px-5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold border font-mono ${
                              user.role === "ADMIN"
                                ? "bg-purple-50 text-purple-800 border-purple-200"
                                : user.role === "ARCHITECT"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : user.role === "HOTEL"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-5">
                          <select
                            value={user.tradeDiscount}
                            onChange={(e) =>
                              handleUpdateUserPro(user.id, user.isVerifiedPro, parseFloat(e.target.value))
                            }
                            className="bg-slate-50 border border-slate-200 rounded px-2 py-1 font-mono font-bold text-slate-900 text-xs focus:bg-white focus:border-[#c29d59] cursor-pointer"
                          >
                            <option value={0}>0% (Tarif Public)</option>
                            <option value={0.15}>-15% (Prescripteur Junior)</option>
                            <option value={0.2}>-20% (Architecte Certifié)</option>
                            <option value={0.25}>-25% (Partenaire Premium)</option>
                            <option value={0.3}>-30% (Palaces & Riads)</option>
                            <option value={0.35}>-35% (Grands Comptes & Admin)</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-5">
                          <button
                            onClick={() =>
                              handleUpdateUserPro(user.id, !user.isVerifiedPro, user.tradeDiscount)
                            }
                            className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                              user.isVerifiedPro
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                                : "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                            }`}
                          >
                            {user.isVerifiedPro ? "✓ Pro Vérifié" : "⚠ En Attente"}
                          </button>
                        </td>
                        <td className="py-3.5 px-5 text-right space-x-2">
                          <a
                            href={`https://wa.me/212661000000?text=Bonjour%20${encodeURIComponent(
                              user.firstName
                            )},%20Maison%20Kansotex%20Marrakech%20vous%20contacte%20concernant%20votre%20compte%20prescripteur.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 rounded text-xs font-semibold cursor-pointer"
                          >
                            <IconWhatsApp className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WhatsApp</span>
                          </a>
                          <button
                            onClick={() => setSelectedCustomer(user)}
                            className="px-2.5 py-1.5 bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] text-slate-800 rounded text-xs font-semibold cursor-pointer"
                          >
                            Fiche Client
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 6. DEVIS & PRESCRIPTIONS D'ARCHITECTURE TAB                      */}
          {/* ================================================================ */}
          {activeTab === "quotes" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e2d5]">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#181c22] tracking-tight">
                    Devis & Prescriptions d'Architecture Sur-Mesure
                  </h1>
                  <p className="text-xs text-[#736b5e] mt-0.5">
                    Chiffrages d'hôtellerie de luxe, métrages de lin et confections spéciales.
                  </p>
                </div>
                <div className="flex items-center bg-[#f4efe6] p-1 rounded-lg border border-[#e8e2d5] text-xs">
                  {["ALL", "SENT", "ACCEPTED", "DRAFT"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setQuoteFilter(st)}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer ${
                        quoteFilter === st
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {st === "ALL" ? "Tous les Devis" : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quotes Table */}
              <div className="bg-white rounded-xl border border-[#e8e2d5] overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#fbf9f6] text-[11px] font-mono font-bold text-[#8c8273] uppercase border-b border-[#e8e2d5]">
                      <th className="py-3 px-5">Référence & Date</th>
                      <th className="py-3 px-5">Projet & Prescripteur</th>
                      <th className="py-3 px-5">Estimation Globale</th>
                      <th className="py-3 px-5">Statut</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5f1e8]">
                    {filteredQuotes.map((q) => (
                      <tr key={q.id} className="hover:bg-[#fbf9f6] transition-colors">
                        <td className="py-3.5 px-5 font-mono">
                          <div className="font-bold text-slate-900">{q.quoteNumber}</div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(q.createdAt).toLocaleDateString("fr-FR")}
                          </div>
                        </td>
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-slate-900 text-sm">{q.projectTitle}</div>
                          <div className="text-[11px] text-[#c29d59] font-medium">{q.customerCompany}</div>
                          <div className="text-[10px] text-slate-400">{q.customerName}</div>
                        </td>
                        <td className="py-3.5 px-5 font-mono font-bold text-slate-900 text-sm">
                          {formatMoney(q.totalEstimate)}
                        </td>
                        <td className="py-3.5 px-5">
                          <select
                            value={q.status}
                            onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value)}
                            className={`px-2.5 py-1 rounded text-xs font-bold border cursor-pointer ${
                              q.status === "ACCEPTED"
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : q.status === "SENT"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : "bg-slate-100 text-slate-700 border-slate-200"
                            }`}
                          >
                            <option value="DRAFT">DRAFT (Brouillon)</option>
                            <option value="SENT">SENT (Envoyé au client)</option>
                            <option value="ACCEPTED">ACCEPTED (Validé & Signé)</option>
                            <option value="REJECTED">REJECTED (Refusé)</option>
                          </select>
                        </td>
                        <td className="py-3.5 px-5 text-right space-x-2">
                          <button
                            onClick={() => setSelectedQuote(q)}
                            className="px-3 py-1.5 bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] text-slate-800 rounded text-xs font-semibold cursor-pointer shadow-2xs"
                          >
                            Imprimer Devis
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 7. ATELIER MARRAKECH & CONFECTION KANBAN TAB                      */}
          {/* ================================================================ */}
          {activeTab === "atelier" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e2d5]">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#181c22] tracking-tight">
                    Atelier de Confection Marrakech • Suivi de Production
                  </h1>
                  <p className="text-xs text-[#736b5e] mt-0.5">
                    Pipeline d'atelier de Sidi Ghanem : métrage, coupe, assemblage et expédition soignée.
                  </p>
                </div>
                <div className="text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Atelier Sidi Ghanem : 4 Maîtres Tailleurs en poste
                </div>
              </div>

              {/* 4-Stage Textile Kanban Board */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    stage: "1. Découpe & Bains",
                    count: 3,
                    color: "border-amber-300 bg-amber-50/50",
                    tasks: [
                      { title: "Coupe Lin Lavé 320cm (45 ml)", client: "Palais Riad Atlas", lot: "Bain N° LOT-LIN-2026-B" },
                      { title: "Parure Satin Champagne (6 sets)", client: "Riad Secret Spa", lot: "Bain N° LOT-SAT-CHMP-04" },
                      { title: "Tissu Outdoor Terrasses (80 ml)", client: "Villa Palmeraie", lot: "Bain N° LOT-OUT-DRY-01" },
                    ],
                  },
                  {
                    stage: "2. Piqûre & Ourlet Bourdon",
                    count: 2,
                    color: "border-blue-300 bg-blue-50/50",
                    tasks: [
                      { title: "Confection Rideaux Plissés Lin", client: "Hôtel & Spa Marrakech", lot: "Finition Point Sellier" },
                      { title: "Nappes & Serviettes Cérémonie", client: "Domaine des Oliviers", lot: "Ourlet Ajouré Main" },
                    ],
                  },
                  {
                    stage: "3. Contrôle & Repassage Vapeur",
                    count: 2,
                    color: "border-purple-300 bg-purple-50/50",
                    tasks: [
                      { title: "Draps de Bain Nid d'Abeille (30 pcs)", client: "Hammam Royal VIP", lot: "Contrôle Douceur & Grammage" },
                      { title: "Jetés de Lit Coton Texturé", client: "Studio KB Design", lot: "Vérification Dimensions" },
                    ],
                  },
                  {
                    stage: "4. Emballage & Cachet de Cire",
                    count: 1,
                    color: "border-emerald-300 bg-emerald-50/50",
                    tasks: [
                      { title: "Expédition Finale Amana Express", client: "Résidence Privée Casablanca", lot: "Colis N° AMN-948210" },
                    ],
                  },
                ].map((col, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-[#e8e2d5] p-4 flex flex-col shadow-xs"
                  >
                    <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#f0ebe1]">
                      <span className="font-serif font-bold text-xs text-slate-900">{col.stage}</span>
                      <span className="text-[10px] font-mono font-bold bg-[#f4efe6] text-slate-700 px-2 py-0.5 rounded-full">
                        {col.count}
                      </span>
                    </div>

                    <div className="space-y-2.5 flex-1">
                      {col.tasks.map((task, tIdx) => (
                        <div
                          key={tIdx}
                          className="bg-[#fbf9f6] hover:bg-white p-3 rounded-lg border border-[#e8e2d5] text-xs transition-all shadow-2xs hover:border-[#c29d59]"
                        >
                          <div className="font-bold text-slate-900">{task.title}</div>
                          <div className="text-[11px] text-[#c29d59] font-medium mt-0.5">{task.client}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-1.5 flex items-center justify-between pt-1 border-t border-slate-100">
                            <span>{task.lot}</span>
                            <span className="text-emerald-700 font-bold">Maître Hassan</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 8. CODES PROMO & MARKETING HUB TAB                                */}
          {/* ================================================================ */}
          {activeTab === "marketing" && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e2d5]">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#181c22] tracking-tight">
                    Moteur Promotionnel & Campagnes Marketing
                  </h1>
                  <p className="text-xs text-[#736b5e] mt-0.5">
                    Codes promo connectés en temps réel au panier client (<span className="font-mono font-bold">CartDrawer</span>) et à la caisse (<span className="font-mono font-bold">Checkout</span>).
                  </p>
                </div>
                <button
                  onClick={() => setIsNewPromoModalOpen(true)}
                  className="flex items-center gap-1.5 h-9 px-3.5 bg-[#c29d59] hover:bg-[#b08b49] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer font-termina uppercase tracking-wider"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  <span>Nouveau Code Promo</span>
                </button>
              </div>

              {/* Announcement Banner Controller */}
              <div className="bg-white rounded-xl border border-[#e8e2d5] p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f0ebe1]">
                  <div>
                    <h3 className="font-serif text-sm font-bold text-slate-900">
                      Bannière d'Annonce Live (Haut du Site)
                    </h3>
                    <p className="text-xs text-slate-500">Visible sur toutes les pages de la boutique en ligne.</p>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs font-bold text-slate-700">Afficher la Bannière</span>
                    <input
                      type="checkbox"
                      checked={isAnnouncementActive}
                      onChange={(e) => {
                        setIsAnnouncementActive(e.target.checked);
                        showToast(`Bannière ${e.target.checked ? "activée" : "masquée"}.`);
                      }}
                      className="w-4 h-4 accent-[#c29d59] cursor-pointer"
                    />
                  </label>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={announcementText}
                    onChange={(e) => setAnnouncementText(e.target.value)}
                    className="flex-1 bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-[#c29d59]"
                  />
                  <button
                    onClick={() => showToast("Texte de bannière mis à jour en direct !")}
                    className="px-4 py-2 bg-[#c29d59] hover:bg-[#b08b49] text-white text-xs font-bold rounded-lg transition-all cursor-pointer"
                  >
                    Sauvegarder
                  </button>
                </div>
              </div>

              {/* Promo Codes Table */}
              <div className="bg-white rounded-xl border border-[#e8e2d5] overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#fbf9f6] text-[11px] font-mono font-bold text-[#8c8273] uppercase border-b border-[#e8e2d5]">
                      <th className="py-3 px-5">Code Promo</th>
                      <th className="py-3 px-5">Valeur & Bénéficiaires</th>
                      <th className="py-3 px-5">Utilisations Live</th>
                      <th className="py-3 px-5">Statut Actif</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5f1e8]">
                    {promos.map((promo) => (
                      <tr key={promo.id} className="hover:bg-[#fbf9f6] transition-colors">
                        <td className="py-3.5 px-5 font-mono font-bold text-slate-900 text-sm">
                          {promo.code}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="font-bold text-emerald-700 mr-2 text-sm">
                            -{promo.discountPercent}%
                          </span>
                          <span className="text-slate-600 text-xs">({promo.description})</span>
                        </td>
                        <td className="py-3.5 px-5 font-mono text-slate-700">
                          {promo.uses || 0} utilisation{(promo.uses || 0) > 1 ? "s" : ""}
                        </td>
                        <td className="py-3.5 px-5">
                          <button
                            onClick={() => handleTogglePromo(promo.id)}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold border transition-all cursor-pointer ${
                              promo.isActive
                                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                : "bg-slate-100 text-slate-500 border-slate-300"
                            }`}
                          >
                            {promo.isActive ? "● Actif en Boutique" : "○ Inactif"}
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 9. FACTURATION & FISCALITÉ MAROCAINE TAB                           */}
          {/* ================================================================ */}
          {activeTab === "invoices" && (
            <div className="max-w-7xl mx-auto space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e8e2d5]">
                <div>
                  <h1 className="font-serif text-2xl font-bold text-[#181c22] tracking-tight">
                    Facturation Légale & Relevés Fiscaux Marocains
                  </h1>
                  <p className="text-xs text-[#736b5e] mt-0.5">
                    Émission conforme aux règles de la DGI (Direction Générale des Impôts) du Royaume du Maroc.
                  </p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 h-9 px-3.5 bg-[#c29d59] hover:bg-[#b08b49] text-white text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer font-termina uppercase tracking-wider"
                >
                  <IconDownload className="w-3.5 h-3.5" />
                  <span>Exporter Relevé Fiscal CSV</span>
                </button>
              </div>

              {/* Invoices List */}
              <div className="bg-white rounded-xl border border-[#e8e2d5] overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#fbf9f6] text-[11px] font-mono font-bold text-[#8c8273] uppercase border-b border-[#e8e2d5]">
                      <th className="py-3 px-5">Réf Facture & Date</th>
                      <th className="py-3 px-5">Client & ICE</th>
                      <th className="py-3 px-5">Montant HT</th>
                      <th className="py-3 px-5">TVA 20%</th>
                      <th className="py-3 px-5">Total TTC</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f5f1e8]">
                    {orders.map((ord, idx) => {
                      const invoiceRef = `FA-2026-${(1000 + idx).toString()}`;
                      const ht = ord.totalAmount / 1.2;
                      const tva = ord.totalAmount - ht;
                      return (
                        <tr key={ord.id} className="hover:bg-[#fbf9f6] transition-colors">
                          <td className="py-3.5 px-5 font-mono">
                            <div className="font-bold text-slate-900">{invoiceRef}</div>
                            <div className="text-[10px] text-slate-400">
                              {new Date(ord.createdAt).toLocaleDateString("fr-FR")}
                            </div>
                          </td>
                          <td className="py-3.5 px-5">
                            <div className="font-bold text-slate-900">{ord.customerCompany}</div>
                            <div className="text-[11px] text-slate-500">{ord.customerName}</div>
                            <div className="text-[10px] text-[#c29d59] font-mono">ICE: {ord.customerSiret}</div>
                          </td>
                          <td className="py-3.5 px-5 font-mono text-slate-800">{formatMoney(ht)}</td>
                          <td className="py-3.5 px-5 font-mono text-slate-500">{formatMoney(tva)}</td>
                          <td className="py-3.5 px-5 font-mono font-bold text-slate-900 text-sm">
                            {formatMoney(ord.totalAmount)}
                          </td>
                          <td className="py-3.5 px-5 text-right">
                            <button
                              onClick={() =>
                                setSelectedInvoice({
                                  ...ord,
                                  invoiceRef,
                                  ht,
                                  tva,
                                })
                              }
                              className="px-3 py-1.5 bg-[#fbf9f6] hover:bg-[#f4efe6] border border-[#e8e2d5] text-slate-800 rounded text-xs font-semibold cursor-pointer shadow-2xs"
                            >
                              Imprimer Facture
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* 10. PARAMÈTRES & FISCALITÉ MAROC TAB                              */}
          {/* ================================================================ */}
          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="pb-3 border-b border-[#e8e2d5]">
                <h1 className="font-serif text-2xl font-bold text-[#181c22] tracking-tight">
                  Paramètres de l'Atelier & Fiscalité Marocaine
                </h1>
                <p className="text-xs text-[#736b5e] mt-0.5">
                  Identifiants légaux officiels, compte bancaire CIH et conciergerie VIP Kansotex.
                </p>
              </div>

              {/* Legal Company IDs */}
              <div className="bg-white rounded-xl border border-[#e8e2d5] p-6 space-y-4 shadow-xs">
                <h3 className="font-serif text-sm font-bold text-slate-900">
                  Identifiants Fiscaux Légaux du Siège Kansotex
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1 font-semibold">
                      ICE (Identifiant Commun de l'Entreprise)
                    </label>
                    <input
                      type="text"
                      readOnly
                      value="002984512000084"
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-semibold">Identifiant Fiscal (IF)</label>
                    <input
                      type="text"
                      readOnly
                      value="52849102"
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-semibold">Registre du Commerce (RC)</label>
                    <input
                      type="text"
                      readOnly
                      value="RC 94821 Marrakech"
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-semibold">RIB CIH Bank Officiel</label>
                    <input
                      type="text"
                      readOnly
                      value="230 450 48291048291048 29"
                      className="w-full bg-emerald-50 border border-emerald-300 rounded-lg px-3 py-2 text-emerald-900 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Atelier Address & Coordinates */}
              <div className="bg-white rounded-xl border border-[#e8e2d5] p-6 space-y-4 shadow-xs">
                <h3 className="font-serif text-sm font-bold text-slate-900">
                  Coordonnées de l'Atelier & Showroom Marrakech
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-500 mb-1 font-semibold">Adresse Showroom</label>
                    <input
                      type="text"
                      readOnly
                      value="Quartier Industriel Sidi Ghanem, Voie Principale, Marrakech"
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 mb-1 font-semibold">Ligne Conciergerie VIP</label>
                    <input
                      type="text"
                      readOnly
                      value="+212 5 24 33 00 00 / WhatsApp: +212 6 61 00 00 00"
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ==================================================================== */}
      {/* 3. MODALS & INTERACTIVE DRAWERS                                       */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {/* TOAST NOTIFICATION */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-[#12151b] text-white px-5 py-3 rounded-xl border border-[#c29d59]/50 shadow-2xl flex items-center gap-3 font-sans text-xs"
          >
            <span className="w-2 h-2 rounded-full bg-[#c29d59] animate-pulse" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}

        {/* ORDER DETAIL DRAWER */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-mono text-[#c29d59] uppercase tracking-wider font-bold">
                      Détails de Commande
                    </span>
                    <h2 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                      {selectedOrder.orderNumber}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Client Info */}
                <div className="bg-[#fbf9f6] p-4 rounded-xl border border-[#e8e2d5] space-y-2 text-xs">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-400">
                    Client & Données Fiscales
                  </div>
                  <div className="font-bold text-slate-900 text-sm">{selectedOrder.customerName}</div>
                  <div className="text-[#c29d59] font-medium">{selectedOrder.customerCompany}</div>
                  <div className="text-slate-600 font-mono">Email: {selectedOrder.customerEmail}</div>
                  <div className="text-slate-600 font-mono">ICE/SIRET: {selectedOrder.customerSiret}</div>
                </div>

                {/* Order Status Controller */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Modifier le Statut de Production :
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {["PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((st) => (
                      <button
                        key={st}
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, st)}
                        className={`p-2.5 rounded-lg border font-bold transition-all cursor-pointer ${
                          selectedOrder.status === st
                            ? "bg-[#1f1a14] text-[#dfba73] border-[#c29d59]"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tracking & Notes */}
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Numéro de Suivi Amana / Transporteur</label>
                    <input
                      type="text"
                      placeholder="Ex: AMN-2026-98421"
                      defaultValue={selectedOrder.trackingNumber || ""}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Note d'Atelier & Confection</label>
                    <textarea
                      rows={3}
                      placeholder="Instructions spécifiques pour le maître tailleur Hassan..."
                      defaultValue={selectedOrder.atelierNote || ""}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-6 bg-[#fbf9f6] border-t border-[#e8e2d5] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Total Commande TTC</div>
                  <div className="font-serif text-xl font-bold text-slate-900">
                    {formatMoney(selectedOrder.totalAmount)}
                  </div>
                </div>
                <button
                  onClick={() => {
                    const ht = selectedOrder.totalAmount / 1.2;
                    setSelectedInvoice({
                      ...selectedOrder,
                      invoiceRef: `FA-2026-${selectedOrder.orderNumber.slice(-4)}`,
                      ht,
                      tva: selectedOrder.totalAmount - ht,
                    });
                  }}
                  className="px-4 py-2.5 bg-[#c29d59] hover:bg-[#b08b49] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Imprimer Facture Marocaine
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* PRODUCT TECHNICAL DRAWER */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] font-mono text-[#c29d59] uppercase tracking-wider font-bold">
                      Fiche Technique Textile
                    </span>
                    <h2 className="font-serif text-xl font-bold text-slate-900 mt-0.5">
                      {selectedProduct.nameFr}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Prix de Vente Public (€ / TTC)</label>
                    <input
                      type="number"
                      defaultValue={selectedProduct.basePrice}
                      onChange={(e) => handleUpdateProductPrice(selectedProduct.id, parseFloat(e.target.value))}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono font-bold text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Laize (Largeur rouleau en cm)</label>
                      <input
                        type="number"
                        defaultValue={selectedProduct.laize}
                        className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">Résistance Martindale (Tours)</label>
                      <input
                        type="number"
                        defaultValue={selectedProduct.martindale}
                        className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Composition Textile</label>
                    <input
                      type="text"
                      defaultValue={selectedProduct.composition}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Description E-Commerce</label>
                    <textarea
                      rows={4}
                      defaultValue={selectedProduct.descriptionFr || ""}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#fbf9f6] border-t border-[#e8e2d5] flex items-center justify-between">
                <button
                  onClick={() => handleToggleProduct(selectedProduct.id, selectedProduct.isActive)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    selectedProduct.isActive
                      ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                      : "bg-slate-200 text-slate-700 border-slate-300"
                  }`}
                >
                  {selectedProduct.isActive ? "✓ Produit Actif en Boutique" : "○ Masqué du Catalogue"}
                </button>
                <button
                  onClick={() => {
                    showToast("Fiche technique sauvegardée dans PostgreSQL.");
                    setSelectedProduct(null);
                  }}
                  className="px-5 py-2 bg-[#c29d59] hover:bg-[#b08b49] text-white text-xs font-bold rounded-lg cursor-pointer"
                >
                  Enregistrer
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* NEW PRODUCT MODAL */}
        {isNewProductModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewProductModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 font-sans"
            >
              <div className="bg-[#0c0e12] px-6 py-4 flex items-center justify-between text-white border-b border-[#2b251c]">
                <div className="flex items-center gap-2">
                  <IconProducts className="w-4 h-4 text-[#c29d59]" />
                  <h3 className="font-serif font-bold text-sm tracking-wide">
                    Enregistrer un Nouveau Tissu Noble (PostgreSQL)
                  </h3>
                </div>
                <button
                  onClick={() => setIsNewProductModalOpen(false)}
                  className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold uppercase tracking-wider text-[11px]">
                    Nom du Tissu (Français)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Velours de Soie Ciselé Atlas"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-serif font-bold text-sm focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Univers Textile</label>
                    <select
                      value={newProdCat}
                      onChange={(e) => setNewProdCat(e.target.value)}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-semibold cursor-pointer"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nameFr}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Prix Public (€ / TTC)</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Stock Rouleau (ml)</label>
                    <input
                      type="number"
                      required
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(e.target.value)}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Laize (cm)</label>
                    <input
                      type="number"
                      value={newProdLaize}
                      onChange={(e) => setNewProdLaize(e.target.value)}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Martindale</label>
                    <input
                      type="number"
                      value={newProdMartindale}
                      onChange={(e) => setNewProdMartindale(e.target.value)}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Composition Textile</label>
                  <input
                    type="text"
                    value={newProdComp}
                    onChange={(e) => setNewProdComp(e.target.value)}
                    className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-medium"
                  />
                </div>

                <div className="pt-3 border-t border-[#e8e2d5] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewProductModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-[#c29d59] hover:bg-[#b08b49] text-white font-bold rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Enregistrement..." : "Créer dans Postgres"}
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
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 font-sans"
            >
              <div className="bg-[#0c0e12] px-6 py-4 flex items-center justify-between text-white border-b border-[#2b251c]">
                <div className="flex items-center gap-2">
                  <IconDiscounts className="w-4 h-4 text-[#c29d59]" />
                  <h3 className="font-serif font-bold text-sm tracking-wide">
                    Nouveau Code Promotionnel & Campagne
                  </h3>
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
                    className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono font-bold uppercase focus:outline-none focus:border-[#c29d59]"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Le code saisi par le client dans son panier.</p>
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
                      value={newPromoDiscount}
                      onChange={(e) => setNewPromoDiscount(e.target.value)}
                      className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono font-bold focus:outline-none focus:border-[#c29d59]"
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
                    className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-[11px] leading-relaxed">
                  ✓ Ce code sera instantanément actif sur toute la boutique, dans le tiroir panier et sur la page de paiement.
                </div>

                <div className="pt-3 border-t border-[#e8e2d5] flex justify-end gap-2">
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

        {/* NEW CATEGORY MODAL */}
        {isNewCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewCategoryModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 font-sans"
            >
              <div className="bg-[#0c0e12] px-6 py-4 flex items-center justify-between text-white border-b border-[#2b251c]">
                <div className="flex items-center gap-2">
                  <IconCategories className="w-4 h-4 text-[#c29d59]" />
                  <h3 className="font-serif font-bold text-sm tracking-wide">
                    Créer un Nouvel Univers / Collection CMS
                  </h3>
                </div>
                <button
                  onClick={() => setIsNewCategoryModalOpen(false)}
                  className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateCategory} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold uppercase tracking-wider text-[11px]">
                    Nom de l'Univers (Français)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Tapis & Passementerie d'Atelier"
                    value={newCatName}
                    onChange={(e) => {
                      setNewCatName(e.target.value);
                      if (!newCatSlug) {
                        setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                      }
                    }}
                    className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-serif font-bold focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-semibold uppercase tracking-wider text-[11px]">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: tapis-atelier"
                    value={newCatSlug}
                    onChange={(e) => setNewCatSlug(e.target.value)}
                    className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-[#c29d59]"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-semibold uppercase tracking-wider text-[11px]">
                    Description Artistique
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Description de la confection et des matières..."
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    className="w-full bg-[#fbf9f6] border border-[#e8e2d5] rounded-lg px-3 py-2 text-slate-900 text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-[#e8e2d5] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewCategoryModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 hover:text-slate-900 rounded-lg font-medium cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-[#c29d59] hover:bg-[#b08b49] text-white font-bold rounded-lg shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Création..." : "Créer l'Univers"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* MOROCCAN LEGAL INVOICE / PDF VIEWER */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden z-10 font-sans my-6 max-h-[90vh] overflow-y-auto"
            >
              {/* Invoice Action Bar */}
              <div className="bg-[#0c0e12] px-6 py-3.5 flex items-center justify-between text-white border-b border-[#2b251c]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#dfba73]">
                    {selectedInvoice.invoiceRef}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    • Conforme DGI Maroc
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-1 bg-[#c29d59] hover:bg-[#b08b49] text-slate-950 rounded text-xs font-bold cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>Imprimer PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="w-7 h-7 flex items-center justify-center text-white/70 hover:text-white cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Printable Invoice Sheet */}
              <div className="p-8 space-y-6 bg-white text-xs text-slate-800">
                {/* Header Letterhead */}
                <div className="flex justify-between items-start border-b border-slate-200 pb-6">
                  <div>
                    <h2 className="font-serif text-2xl font-bold tracking-widest text-[#181c22]">
                      KANSOTEX MARRAKECH
                    </h2>
                    <p className="text-xs text-[#c29d59] font-medium mt-1 font-serif">
                      Maison d'Édition Textile & Confection d'Atelier
                    </p>
                    <div className="text-[11px] text-slate-600 mt-2 space-y-0.5 font-mono">
                      <p>Sidi Ghanem, Voie Principale, Marrakech, Maroc</p>
                      <p className="text-slate-900 font-bold">
                        ICE : 002984512000084 • IF : 52849102 • RC : 94821 Marrakech
                      </p>
                      <p className="text-emerald-800 font-semibold">
                        CIH Bank : 230 450 48291048291048 29
                      </p>
                    </div>
                  </div>
                  <div className="text-right space-y-1 font-mono">
                    <div className="text-sm font-bold text-slate-900">{selectedInvoice.invoiceRef}</div>
                    <div className="text-slate-500">Date : {new Date().toLocaleDateString("fr-FR")}</div>
                    <div className="text-slate-500">Réf Commande : {selectedInvoice.orderNumber}</div>
                    <div className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                      FACTURE ACQUITTÉE
                    </div>
                  </div>
                </div>

                {/* Client Box */}
                <div className="bg-[#fbf9f6] p-4 rounded-xl border border-[#e8e2d5] space-y-1 text-xs">
                  <div className="text-[10px] font-mono text-[#c29d59] uppercase font-bold">
                    Destinataire / Client
                  </div>
                  <div className="font-bold text-slate-900 text-sm font-serif">
                    {selectedInvoice.customerCompany}
                  </div>
                  <div className="text-slate-700">{selectedInvoice.customerName}</div>
                  <div className="text-slate-500 font-mono">ICE / SIRET : {selectedInvoice.customerSiret}</div>
                  <div className="text-slate-500 font-mono">{selectedInvoice.customerEmail}</div>
                </div>

                {/* Lines Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-mono uppercase font-bold text-slate-500">
                        <th className="py-2.5 px-4">Désignation des Prestations & Matières</th>
                        <th className="py-2.5 px-4 text-right">Montant HT</th>
                        <th className="py-2.5 px-4 text-right">TVA 20%</th>
                        <th className="py-2.5 px-4 text-right">Total TTC</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 px-4 font-medium text-slate-800">
                          Coupe de tissus nobles, linge de maison et confection sur-mesure d'atelier
                        </td>
                        <td className="py-3 px-4 text-right font-mono">{formatMoney(selectedInvoice.ht)}</td>
                        <td className="py-3 px-4 text-right font-mono">{formatMoney(selectedInvoice.tva)}</td>
                        <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                          {formatMoney(selectedInvoice.totalAmount)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Totals Summary */}
                <div className="flex justify-end pt-2">
                  <div className="w-72 space-y-1.5 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Hors Taxes (HT) :</span>
                      <span>{formatMoney(selectedInvoice.ht)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>TVA (20%) :</span>
                      <span>{formatMoney(selectedInvoice.tva)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                      <span>TOTAL TTC (EUR) :</span>
                      <span className="text-[#c29d59]">{formatMoney(selectedInvoice.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 pt-1">
                      <span>Équivalent MAD :</span>
                      <span>{(selectedInvoice.totalAmount * 10.85).toLocaleString("fr-FR")} MAD</span>
                    </div>
                  </div>
                </div>

                {/* Official Marrakech Cachet Seal */}
                <div className="pt-6 border-t border-slate-200 flex justify-between items-end">
                  <div className="text-[10px] text-slate-400 font-mono max-w-sm">
                    Kansotex Marrakech SARL AU • Dispense de timbre fiscal • Paiement par virement bancaire CIH ou carte bancaire.
                  </div>
                  <div className="w-36 h-20 border-2 border-dashed border-[#c29d59]/50 rounded-lg flex flex-col items-center justify-center p-2 text-center rotate-[-3deg]">
                    <span className="font-serif text-[10px] font-bold text-[#c29d59] uppercase tracking-wider">
                      Cachet Officiel
                    </span>
                    <span className="text-[8px] text-slate-500 font-mono mt-0.5">
                      KANSOTEX MARRAKECH
                    </span>
                    <span className="text-[8px] text-slate-400 font-mono">
                      RC 94821 • ICE 002984512000084
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
