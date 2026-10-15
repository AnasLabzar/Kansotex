"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCurrency, type CurrencyCode } from "@/lib/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// SHOPIFY POLARIS VECTOR ICONS (Strictly 1.75px Clean Stroke Icons)
// ============================================================================
function IconShopifyHome({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function IconShopifyOrders({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  );
}

function IconShopifyProducts({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}

function IconShopifyInventory({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function IconShopifyCollections({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function IconShopifyCustomers({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function IconShopifyDiscounts({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

function IconShopifyFinance({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
    </svg>
  );
}

function IconShopifySettings({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconEyeStore({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function IconSearch({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function IconPlus({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
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

function IconExternal({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
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

function IconShopifyQuotes({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}

// ============================================================================
// DATA STRUCTURES
// ============================================================================
export type ShopifyTab =
  | "home"
  | "orders"
  | "quotes"
  | "products"
  | "inventory"
  | "collections"
  | "customers"
  | "discounts"
  | "finances"
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
  carrier?: string;
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

export interface AdminDashboardViewProps {
  initialData?: {
    products: EnrichedProduct[];
    categories: any[];
    orders: EnrichedOrder[];
    users: EnrichedUser[];
    promos?: PromoCodeItem[];
    quotes?: any[];
    adminUser?: any;
  };
}

export function AdminDashboardView({ initialData }: AdminDashboardViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.startsWith("/en") ? "en" : "fr";
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Active Shopify Menu Section
  const [activeTab, setActiveTab] = useState<ShopifyTab>("home");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as ShopifyTab | null;
      if (
        tabParam &&
        [
          "home",
          "orders",
          "quotes",
          "products",
          "inventory",
          "collections",
          "customers",
          "discounts",
          "finances",
        ].includes(tabParam)
      ) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  // Core Data States (Directly wired to PostgreSQL)
  const [products, setProducts] = useState<EnrichedProduct[]>(initialData?.products || []);
  const [categories, setCategories] = useState<any[]>(initialData?.categories || []);
  const [orders, setOrders] = useState<EnrichedOrder[]>(initialData?.orders || []);
  const [users, setUsers] = useState<EnrichedUser[]>(initialData?.users || []);
  const [promos, setPromos] = useState<PromoCodeItem[]>(initialData?.promos || []);
  const [quotes, setQuotes] = useState<any[]>(initialData?.quotes || []);
  const [adminUser, setAdminUser] = useState<any>(initialData?.adminUser || null);

  // Search & Segment Filters (Shopify Style)
  const [searchQuery, setSearchQuery] = useState("");
  const [orderSegment, setOrderSegment] = useState("ALL");
  const [quoteSegment, setQuoteSegment] = useState("ALL");
  const [productSegment, setProductSegment] = useState("ALL");
  const [inventorySegment, setInventorySegment] = useState("ALL");
  const [customerSegment, setCustomerSegment] = useState("ALL");

  // Drawers & Modals
  const [selectedOrder, setSelectedOrder] = useState<EnrichedOrder | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<EnrichedProduct | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<EnrichedUser | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<any | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [isNewPromoModalOpen, setIsNewPromoModalOpen] = useState(false);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [isReceiveRollModalOpen, setIsReceiveRollModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Forms State
  const [newProdName, setNewProdName] = useState("");
  const [newProdCat, setNewProdCat] = useState("cat-1");
  const [newProdPrice, setNewProdPrice] = useState("120");
  const [newProdStock, setNewProdStock] = useState("180");
  const [newProdLaize, setNewProdLaize] = useState("280");
  const [newProdComp, setNewProdComp] = useState("100% Lin Français Lavé");

  const [rollProductId, setRollProductId] = useState(initialData?.products?.[0]?.id || "");
  const [rollMeters, setRollMeters] = useState("50");
  const [rollDyeLot, setRollDyeLot] = useState("LOT-2026-X1");
  const [rollRack, setRollRack] = useState("Rack A-02");

  const [newPromoCode, setNewPromoCode] = useState("");
  const [newPromoDiscount, setNewPromoDiscount] = useState("20");
  const [newPromoDesc, setNewPromoDesc] = useState("");

  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatDesc, setNewCatDesc] = useState("");

  // Toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Currency helper
  const formatMoney = (amountEur: number) => {
    const res = formatPrice(amountEur);
    const formatted = String(res.value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${formatted} ${res.symbol}`;
  };

  // Sync DB
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
      showToast("Données synchronisées avec PostgreSQL Supabase !");
    } catch (err) {
      console.error(err);
      showToast("Erreur lors de la synchronisation.");
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout" }),
      });
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  // ============================================================================
  // DATABASE MUTATION HANDLERS (Live PostgreSQL Execution)
  // ============================================================================
  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_ORDER_STATUS",
          payload: { orderId, status: newStatus },
        }),
      });
      showToast(`Statut de commande mis à jour : ${newStatus}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProductPrice = async (productId: string, newPrice: number) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, basePrice: newPrice } : p)));
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_PRODUCT_PRICE",
          payload: { productId, basePrice: newPrice },
        }),
      });
      showToast(`Prix mis à jour : ${newPrice} €`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStock = async (productId: string, newStock: number) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stockLevel: newStock } : p)));
    try {
      const prod = products.find((p) => p.id === productId);
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_STOCK",
          payload: { productId, variantId: prod?.variants?.[0]?.id, newStock },
        }),
      });
      showToast(`Stock rouleau mis à jour : ${newStock} mètres.`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleQuickStockAdjust = async (productId: string, deltaMeters: number) => {
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;
    const newStock = Math.max(0, (prod.stockLevel || 0) + deltaMeters);
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stockLevel: newStock } : p)));
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_STOCK",
          payload: { productId, variantId: prod?.variants?.[0]?.id, newStock },
        }),
      });
      showToast(`${deltaMeters > 0 ? "+" : ""}${deltaMeters}m ajusté pour ${prod.nameFr} (Stock : ${newStock} ml)`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReceiveRoll = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollProductId) {
      showToast("Veuillez sélectionner un tissu pour le rouleau.");
      return;
    }
    const metersVal = parseFloat(rollMeters) || 0;
    if (metersVal <= 0) {
      showToast("Veuillez saisir un métrage valide.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "RECEIVE_ROLL",
          payload: {
            productId: rollProductId,
            meters: metersVal,
            dyeLot: rollDyeLot,
            rackLocation: rollRack,
          },
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === rollProductId ? { ...p, stockLevel: (p.stockLevel || 0) + metersVal } : p
          )
        );
        setIsReceiveRollModalOpen(false);
        showToast(data.message || `Rouleau de ${metersVal}m réceptionné avec succès !`);
      } else {
        showToast(data.error || "Erreur lors de la réception.");
      }
    } catch (err) {
      console.error(err);
      showToast("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateQuoteStatus = async (quoteId: string, status: string) => {
    setQuotes((prev) => prev.map((q) => (q.id === quoteId ? { ...q, status } : q)));
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_QUOTE_STATUS",
          payload: { quoteId, status },
        }),
      });
      showToast(`Statut chantier atelier mis à jour : ${status}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveProductEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_PRODUCT_FULL",
          payload: {
            productId: selectedProduct.id,
            nameFr: selectedProduct.nameFr,
            descriptionFr: selectedProduct.descriptionFr,
            basePrice: selectedProduct.basePrice,
            categoryId: selectedProduct.categoryId,
            laize: selectedProduct.laize,
            martindale: selectedProduct.martindale,
            composition: selectedProduct.composition,
          },
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === selectedProduct.id ? selectedProduct : p))
        );
        setSelectedProduct(null);
        showToast("Fiche tissu enregistrée dans PostgreSQL Supabase !");
      } else {
        showToast(data.error || "Erreur lors de l'enregistrement.");
      }
    } catch (err) {
      console.error(err);
      showToast("Erreur de mise à jour.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      showToast(`Produit ${nextStatus ? "actif en boutique" : "masqué"}.`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateUserPro = async (userId: string, isVerifiedPro: boolean, tradeDiscount: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, isVerifiedPro, tradeDiscount } : u))
    );
    if (selectedCustomer && selectedCustomer.id === userId) {
      setSelectedCustomer((prev) => (prev ? { ...prev, isVerifiedPro, tradeDiscount } : null));
    }
    try {
      await fetch("/api/admin/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "VERIFY_USER_PRO",
          payload: { userId, isVerifiedPro, tradeDiscount },
        }),
      });
      showToast(`Remise B2B (${Math.round(tradeDiscount * 100)}%) et statut pro validés.`);
    } catch (err) {
      console.error(err);
    }
  };

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
            composition: newProdComp.trim() || "100% Lin Français Lavé",
          },
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast("Nouveau produit créé dans Shopify / Postgres !");
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
          description: newPromoDesc.trim() || `Remise -${newPromoDiscount}%`,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Code promo ${data.promo.code} actif sur toute la boutique !`);
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
        showToast(`Statut du code promo mis à jour.`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePromo = async (id: string, code: string) => {
    if (!confirm(`Supprimer définitivement le code ${code} ?`)) return;
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

  const handleExportCSV = () => {
    const headers = [
      "Numero_Commande",
      "Date",
      "Nom_Client",
      "Societe",
      "Statut",
      "Total_EUR",
      "Equivalent_MAD",
    ];
    const rows = orders.map((o) => [
      `"${o.orderNumber}"`,
      `"${new Date(o.createdAt).toLocaleDateString("fr-FR")}"`,
      `"${o.customerName}"`,
      `"${o.customerCompany}"`,
      `"${o.status}"`,
      `"${o.totalAmount.toFixed(2)}"`,
      `"${(o.totalAmount * 10.85).toFixed(0)}"`,
    ].join(";"));
    const csvContent = "\uFEFF" + [headers.join(";"), ...rows].join("\r\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `shopify_export_commandes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Export CSV Shopify généré avec succès !");
  };

  // KPIs
  const totalRevenue = useMemo(() => orders.reduce((s, o) => s + (o.totalAmount || 0), 0), [orders]);
  const totalMetersInStock = useMemo(() => products.reduce((s, p) => s + (p.stockLevel || 0), 0), [products]);
  const totalStockValuationEur = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.stockLevel || 0) * (p.basePrice || 0), 0);
  }, [products]);
  const lowStockCount = useMemo(() => products.filter((p) => (p.stockLevel || 0) < 50).length, [products]);
  const pendingOrdersCount = useMemo(() => orders.filter((o) => o.status === "PROCESSING" || o.status === "PENDING").length, [orders]);

  // Filtered queries
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const match =
        p.nameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.composition && p.composition.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchSeg =
        productSegment === "ALL"
          ? true
          : productSegment === "ACTIVE"
          ? p.isActive
          : productSegment === "DRAFT"
          ? !p.isActive
          : productSegment === "LOW_STOCK"
          ? (p.stockLevel || 0) < 50
          : true;
      return match && matchSeg;
    });
  }, [products, searchQuery, productSegment]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const match =
        o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerCompany.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchSeg = orderSegment === "ALL" ? true : o.status === orderSegment;
      return match && matchSeg;
    });
  }, [orders, searchQuery, orderSegment]);

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const match =
        (q.quoteNumber || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.projectTitle || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.customerName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.customerCompany || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchSeg = quoteSegment === "ALL" ? true : q.status === quoteSegment;
      return match && matchSeg;
    });
  }, [quotes, searchQuery, quoteSegment]);

  const filteredInventory = useMemo(() => {
    return products.filter((p) => {
      const match =
        p.nameFr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.composition && p.composition.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchSeg =
        inventorySegment === "ALL"
          ? true
          : inventorySegment === "LOW_STOCK"
          ? (p.stockLevel || 0) < 50
          : inventorySegment === "CRITICAL"
          ? (p.stockLevel || 0) < 15
          : true;
      return match && matchSeg;
    });
  }, [products, searchQuery, inventorySegment]);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const match =
        `${u.firstName} ${u.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.companyName && u.companyName.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchSeg = customerSegment === "ALL" ? true : u.role === customerSegment;
      return match && matchSeg;
    });
  }, [users, searchQuery, customerSegment]);

  return (
    <div className="flex h-screen bg-[#f1f2f4] text-[#202223] font-sans antialiased overflow-hidden select-none">
      {/* ==================================================================== */}
      {/* 1. SHOPIFY POLARIS SIDEBAR (Clean Charcoal, Precise Hierarchy)       */}
      {/* ==================================================================== */}
      <aside className="w-64 bg-[#1a1a1a] text-[#c9cccf] flex flex-col justify-between shrink-0 shadow-lg z-30 border-r border-[#2d2d2d]">
        <div className="flex flex-col h-full overflow-hidden">
          {/* Store Switcher Bar (Shopify Header) */}
          <div className="h-14 px-4 flex items-center justify-between border-b border-[#2d2d2d] bg-[#141414] shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-md bg-[#303030] border border-[#404040] flex items-center justify-center font-bold text-xs text-white">
                K
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">Kansotex Marrakech</div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Shopify Plus Live
                </div>
              </div>
            </div>

            {/* Quick Link to View Live Store */}
            <Link
              href={`/${currentLocale}`}
              target="_blank"
              title="Afficher la boutique en ligne Kansotex"
              className="w-7 h-7 rounded hover:bg-[#303030] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
            >
              <IconEyeStore className="w-4 h-4" />
            </Link>
          </div>

          {/* Navigation Menu (Shopify Core Structure) */}
          <div className="flex-1 overflow-y-auto px-2 py-3 space-y-6">
            {/* Primary Apps */}
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab("home")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "home"
                    ? "bg-[#303030] text-white shadow-xs font-semibold"
                    : "text-[#a6acb2] hover:text-white hover:bg-[#262626]"
                }`}
              >
                <IconShopifyHome className="w-4 h-4 shrink-0" />
                <span>Accueil</span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "orders"
                    ? "bg-[#303030] text-white shadow-xs font-semibold"
                    : "text-[#a6acb2] hover:text-white hover:bg-[#262626]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconShopifyOrders className="w-4 h-4 shrink-0" />
                  <span>Commandes</span>
                </div>
                {pendingOrdersCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#ffea8a] text-[#4a3b00]">
                    {pendingOrdersCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("quotes")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "quotes"
                    ? "bg-[#303030] text-white shadow-xs font-semibold"
                    : "text-[#a6acb2] hover:text-white hover:bg-[#262626]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconShopifyQuotes className="w-4 h-4 shrink-0" />
                  <span>Chantiers & Confection</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{quotes.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("products")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "products"
                    ? "bg-[#303030] text-white shadow-xs font-semibold"
                    : "text-[#a6acb2] hover:text-white hover:bg-[#262626]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconShopifyProducts className="w-4 h-4 shrink-0" />
                  <span>Produits & Tissus</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{products.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("inventory")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "inventory"
                    ? "bg-[#303030] text-white shadow-xs font-semibold"
                    : "text-[#a6acb2] hover:text-white hover:bg-[#262626]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconShopifyInventory className="w-4 h-4 shrink-0" />
                  <span>Stocks & Rouleaux</span>
                </div>
                {lowStockCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300">
                    {lowStockCount} bas
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab("collections")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "collections"
                    ? "bg-[#303030] text-white shadow-xs font-semibold"
                    : "text-[#a6acb2] hover:text-white hover:bg-[#262626]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconShopifyCollections className="w-4 h-4 shrink-0" />
                  <span>Collections & Univers</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{categories.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("customers")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "customers"
                    ? "bg-[#303030] text-white shadow-xs font-semibold"
                    : "text-[#a6acb2] hover:text-white hover:bg-[#262626]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconShopifyCustomers className="w-4 h-4 shrink-0" />
                  <span>Clients & B2B Pro</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">{users.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("discounts")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "discounts"
                    ? "bg-[#303030] text-white shadow-xs font-semibold"
                    : "text-[#a6acb2] hover:text-white hover:bg-[#262626]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <IconShopifyDiscounts className="w-4 h-4 shrink-0" />
                  <span>Réductions & Promos</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">{promos.length}</span>
              </button>

              <button
                onClick={() => setActiveTab("finances")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "finances"
                    ? "bg-[#303030] text-white shadow-xs font-semibold"
                    : "text-[#a6acb2] hover:text-white hover:bg-[#262626]"
                }`}
              >
                <IconShopifyFinance className="w-4 h-4 shrink-0" />
                <span>Finances & Factures</span>
              </button>
            </nav>
          </div>

          {/* Bottom Settings & User Session Bar */}
          <div className="p-3 border-t border-[#2d2d2d] bg-[#141414] space-y-2 shrink-0">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#a6acb2] hover:text-white hover:bg-[#262626] transition-all cursor-pointer"
            >
              <IconShopifySettings className="w-4 h-4" />
              <span>Paramètres Store</span>
            </button>

            <div className="flex items-center justify-between pt-2 border-t border-[#2d2d2d] px-1">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full bg-[#c29d59] text-slate-950 flex items-center justify-center text-[10px] font-bold font-mono">
                  DG
                </div>
                <div className="min-w-0 text-[11px] leading-tight">
                  <div className="font-semibold text-white truncate">{adminUser?.name || "Directeur Admin"}</div>
                  <div className="text-[9px] text-slate-400 font-mono">ADMIN</div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                title="Se déconnecter"
                className="text-[10px] font-semibold text-red-400 hover:text-red-300 p-1 hover:bg-red-950/30 rounded transition-colors cursor-pointer"
              >
                Sortir
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* ==================================================================== */}
      {/* 2. MAIN APPLICATION WORKSPACE & OMNIBAR                               */}
      {/* ==================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Global Shopify Omnibar */}
        <header className="h-14 bg-white border-b border-[#e1e3e5] px-6 flex items-center justify-between shrink-0 shadow-2xs z-20">
          {/* Omnibar Search */}
          <div className="relative w-full max-w-lg">
            <IconSearch className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher (Ctrl + K) commandes, tissus, clients, codes..."
              className="w-full h-8 pl-9 pr-8 bg-[#f6f6f7] hover:bg-[#edeef0] focus:bg-white border border-transparent focus:border-[#005bd3] focus:ring-1 focus:ring-[#005bd3] rounded-lg text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
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

          {/* Quick Actions & Store Switcher */}
          <div className="flex items-center gap-3">
            {/* Currency switch */}
            <div className="flex items-center bg-[#f1f2f4] p-0.5 rounded-lg border border-[#e1e3e5] text-xs">
              {(["MAD", "EUR", "USD"] as CurrencyCode[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono transition-all cursor-pointer ${
                    currency === cur ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            <button
              onClick={refreshDatabase}
              className="h-8 px-2.5 bg-white border border-[#c9cccf] hover:bg-[#f6f6f7] rounded-lg text-xs font-medium text-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Actualiser</span>
            </button>

            <Link
              href={`/${currentLocale}`}
              target="_blank"
              className="h-8 px-3 bg-[#1a1a1a] hover:bg-[#303030] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <IconExternal className="w-3.5 h-3.5" />
              <span>Boutique en ligne</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Workspace Container */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f1f2f4]">
          {/* ================================================================ */}
          {/* TAB 1: SHOPIFY HOME (Tableau de Bord / Accueil)                  */}
          {/* ================================================================ */}
          {activeTab === "home" && (
            <div className="max-w-6xl mx-auto space-y-5">
              {/* Top Banner Alert (Shopify Tasks Alert) */}
              <div className="bg-white border border-[#e1e3e5] rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                    Attention requise à l'Atelier Marrakech
                  </div>
                  <h2 className="text-sm font-bold text-slate-900 mt-1">
                    {pendingOrdersCount} commande(s) en attente de traitement & {lowStockCount} tissu(s) en stock faible
                  </h2>
                  <p className="text-xs text-slate-500">
                    Les rouleaux doivent être coupés et préparés pour expédition Amana / Chronopost.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#303030] text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  >
                    Voir les commandes ({orders.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("inventory")}
                    className="px-4 py-2 bg-white border border-[#c9cccf] hover:bg-[#f6f6f7] text-slate-700 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  >
                    Gérer les stocks
                  </button>
                </div>
              </div>

              {/* 4 Shopify Metric Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#e1e3e5] shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Ventes Totales</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    {formatMoney(totalRevenue)}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    ≈ {(totalRevenue * 10.85).toLocaleString()} MAD
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e1e3e5] shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Commandes Reçues</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    {orders.length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {pendingOrdersCount} à confectionner
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e1e3e5] shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Métrage Tissu en Stock</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    {totalMetersInStock.toLocaleString()} ml
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Sur {products.length} références actives
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e1e3e5] shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Partenaires Pro B2B</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    {users.filter((u) => u.isVerifiedPro).length}
                  </div>
                  <div className="text-[11px] text-[#c29d59] font-medium mt-1">
                    Architectes & Hôtellerie
                  </div>
                </div>
              </div>

              {/* Recent Orders Overview Card */}
              <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-xs overflow-hidden">
                <div className="p-4 border-b border-[#e1e3e5] flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Commandes Récentes (Live Postgres)</h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-[#005bd3] font-semibold hover:underline"
                  >
                    Voir tout ({orders.length}) →
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f6f7] text-[11px] text-slate-500 font-semibold border-b border-[#e1e3e5]">
                        <th className="py-2.5 px-4">Commande</th>
                        <th className="py-2.5 px-4">Date</th>
                        <th className="py-2.5 px-4">Client</th>
                        <th className="py-2.5 px-4">Paiement / Confection</th>
                        <th className="py-2.5 px-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f2f4]">
                      {orders.slice(0, 5).map((o) => (
                        <tr
                          key={o.id}
                          onClick={() => setSelectedOrder(o)}
                          className="hover:bg-[#f6f6f7] cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                          <td className="py-3 px-4 text-slate-500">{new Date(o.createdAt).toLocaleDateString("fr-FR")}</td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-900">{o.customerName}</span>
                            <span className="text-slate-400 block text-[10px]">{o.customerCompany}</span>
                          </td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                o.status === "PAID"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : o.status === "PROCESSING"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {o.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                            {formatMoney(o.totalAmount)}
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
          {/* TAB 2: SHOPIFY ORDERS (Commandes Complètes)                      */}
          {/* ================================================================ */}
          {activeTab === "orders" && (
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Commandes</h1>
                  <p className="text-xs text-slate-500">Gérez le traitement, la confection atelier et les expéditions Amana.</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleExportCSV}
                    className="h-8 px-3 bg-white border border-[#c9cccf] hover:bg-[#f6f6f7] text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Exporter
                  </button>
                </div>
              </div>

              {/* Segmented Filter Bar */}
              <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-xs overflow-hidden">
                <div className="p-3 border-b border-[#e1e3e5] flex flex-wrap gap-2">
                  {["ALL", "PENDING", "PAID", "PROCESSING", "SHIPPED", "DELIVERED"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderSegment(st)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        orderSegment === st ? "bg-[#1a1a1a] text-white" : "bg-[#f1f2f4] text-slate-600 hover:bg-[#e4e5e7]"
                      }`}
                    >
                      {st === "ALL" ? "Toutes" : st}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f6f7] text-[11px] text-slate-500 font-semibold border-b border-[#e1e3e5]">
                        <th className="py-2.5 px-4">Commande</th>
                        <th className="py-2.5 px-4">Date</th>
                        <th className="py-2.5 px-4">Client</th>
                        <th className="py-2.5 px-4">Statut de Traitement</th>
                        <th className="py-2.5 px-4">Total</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f2f4]">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#f6f6f7] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                          <td className="py-3 px-4 text-slate-500">{new Date(ord.createdAt).toLocaleDateString("fr-FR")}</td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{ord.customerName}</div>
                            <div className="text-slate-400 text-[10px]">{ord.customerCompany}</div>
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value)}
                              className="bg-[#f1f2f4] border border-[#c9cccf] rounded px-2 py-1 text-xs font-bold cursor-pointer"
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="PAID">PAID</option>
                              <option value="PROCESSING">PROCESSING</option>
                              <option value="SHIPPED">SHIPPED</option>
                              <option value="DELIVERED">DELIVERED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{formatMoney(ord.totalAmount)}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedOrder(ord)}
                              className="px-2.5 py-1 bg-white border border-[#c9cccf] hover:bg-[#f6f6f7] text-slate-700 rounded text-xs font-semibold cursor-pointer"
                            >
                              Voir détails
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
          {/* TAB: SHOPIFY CHANTIERS & CONFECTIONS (Devis d'Atelier B2B)       */}
          {/* ================================================================ */}
          {activeTab === "quotes" && (
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Chantiers & Confections d&apos;Atelier</h1>
                  <p className="text-xs text-slate-500">
                    Suivi direct des prescriptions d&apos;architectes, métrages de coupe et devis sur-mesure pour les Riads et Hôtels.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-bold">
                    {quotes.length} dossier(s) en atelier
                  </span>
                </div>
              </div>

              {/* Segmented Filter Bar */}
              <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-xs overflow-hidden">
                <div className="p-3 border-b border-[#e1e3e5] flex flex-wrap gap-2">
                  {["ALL", "SENT", "ACCEPTED", "DRAFT"].map((st) => (
                    <button
                      key={st}
                      onClick={() => setQuoteSegment(st)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        quoteSegment === st ? "bg-[#1a1a1a] text-white" : "bg-[#f1f2f4] text-slate-600 hover:bg-[#e4e5e7]"
                      }`}
                    >
                      {st === "ALL" ? "Tous les chantiers" : st === "SENT" ? "En Étude / Devis" : st === "ACCEPTED" ? "En Confection Atelier" : "Brouillon"}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f6f7] text-[11px] text-slate-500 font-semibold border-b border-[#e1e3e5]">
                        <th className="py-2.5 px-4">Réf & Date</th>
                        <th className="py-2.5 px-4">Projet & Client B2B</th>
                        <th className="py-2.5 px-4">Métrage Estimé</th>
                        <th className="py-2.5 px-4">Budget Estimatif</th>
                        <th className="py-2.5 px-4">Statut Confection</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f2f4]">
                      {filteredQuotes.map((q) => (
                        <tr key={q.id} className="hover:bg-[#f6f6f7] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            <div>{q.quoteNumber}</div>
                            <div className="text-[10px] text-slate-400 font-normal">
                              {new Date(q.createdAt).toLocaleDateString("fr-FR")}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900">{q.projectTitle}</div>
                            <div className="text-[11px] text-[#c29d59] font-medium">{q.customerCompany}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{q.customerName} • {q.customerEmail}</div>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-800">
                            {q.id === "quote-1" ? "180 ml" : q.id === "quote-2" ? "245 ml" : "65 ml"}
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {formatMoney(q.totalEstimate || 35000)}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={q.status}
                              onChange={(e) => handleUpdateQuoteStatus(q.id, e.target.value)}
                              className="bg-white border border-[#c9cccf] rounded px-2 py-1 text-xs font-bold cursor-pointer"
                            >
                              <option value="SENT">En Étude / Devis</option>
                              <option value="ACCEPTED">En Confection Atelier</option>
                              <option value="DRAFT">Brouillon</option>
                              <option value="DELIVERED">Expédié / Posé</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <a
                              href={`https://wa.me/212661000000?text=${encodeURIComponent(`Bonjour Kansotex, suivi du chantier ${q.projectTitle} (${q.quoteNumber})`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold cursor-pointer shadow-xs mr-1"
                            >
                              <IconWhatsApp className="w-3 h-3" />
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
          {/* TAB 3: SHOPIFY PRODUCTS (Catalogue Tissus)                        */}
          {/* ================================================================ */}
          {activeTab === "products" && (
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Produits & Tissus</h1>
                  <p className="text-xs text-slate-500">Catalogue complet Kansotex : gestion des prix, laizes et stocks.</p>
                </div>
                <button
                  onClick={() => setIsNewProductModalOpen(true)}
                  className="h-8 px-3.5 bg-[#1a1a1a] hover:bg-[#303030] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  <span>Ajouter un produit</span>
                </button>
              </div>

              {/* Segmented Filter Bar */}
              <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-xs overflow-hidden">
                <div className="p-3 border-b border-[#e1e3e5] flex gap-2">
                  {["ALL", "ACTIVE", "DRAFT", "LOW_STOCK"].map((seg) => (
                    <button
                      key={seg}
                      onClick={() => setProductSegment(seg)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                        productSegment === seg ? "bg-[#1a1a1a] text-white" : "bg-[#f1f2f4] text-slate-600 hover:bg-[#e4e5e7]"
                      }`}
                    >
                      {seg === "ALL" ? "Tous" : seg === "ACTIVE" ? "Actifs" : seg === "DRAFT" ? "Masqués" : "Stock Faible"}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f6f7] text-[11px] text-slate-500 font-semibold border-b border-[#e1e3e5]">
                        <th className="py-2.5 px-4">Produit</th>
                        <th className="py-2.5 px-4">Statut</th>
                        <th className="py-2.5 px-4">Stock (ml)</th>
                        <th className="py-2.5 px-4">Prix Public TTC</th>
                        <th className="py-2.5 px-4">Catégorie</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f2f4]">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-[#f6f6f7] transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-md bg-slate-100 overflow-hidden relative border border-[#e1e3e5] shrink-0">
                                <Image
                                  src={p.image || "/gallery/duvet_cover_linen_1791048696631.jpg"}
                                  alt={p.nameFr}
                                  fill
                                  sizes="40px"
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-bold text-slate-900">{p.nameFr}</div>
                                <div className="text-[10px] text-slate-400 font-mono">Slug: {p.slug}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleToggleProduct(p.id, p.isActive)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold cursor-pointer ${
                                p.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                              }`}
                            >
                              {p.isActive ? "Actif" : "Brouillon"}
                            </button>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              defaultValue={p.stockLevel}
                              onBlur={(e) => handleUpdateStock(p.id, parseFloat(e.target.value))}
                              className="w-20 bg-white border border-[#c9cccf] rounded px-2 py-1 font-mono text-xs font-bold"
                            />{" "}
                            <span className="text-slate-400">ml</span>
                          </td>
                          <td className="py-3 px-4">
                            <input
                              type="number"
                              defaultValue={p.basePrice}
                              onBlur={(e) => handleUpdateProductPrice(p.id, parseFloat(e.target.value))}
                              className="w-20 bg-white border border-[#c9cccf] rounded px-2 py-1 font-mono text-xs font-bold"
                            />{" "}
                            <span className="font-bold">€</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{p.categoryName}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedProduct(p)}
                              className="px-2.5 py-1 bg-white border border-[#c9cccf] hover:bg-[#f6f6f7] text-slate-700 rounded text-xs font-semibold cursor-pointer"
                            >
                              Modifier
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
          {/* TAB 4: SHOPIFY INVENTORY & STORAGE (Stocks, Rouleaux & Racks)    */}
          {/* ================================================================ */}
          {activeTab === "inventory" && (
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Stocks, Rouleaux & Gestion du Stockage</h1>
                  <p className="text-xs text-slate-500">
                    Suivi temps réel des métrages par rouleau, bains de teinture et racks de stockage à l&apos;Atelier Marrakech.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsReceiveRollModalOpen(true)}
                    className="h-8 px-3.5 bg-[#1a1a1a] hover:bg-[#303030] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <IconPlus className="w-3.5 h-3.5" />
                    <span>Réceptionner un Rouleau</span>
                  </button>
                  <button
                    onClick={refreshDatabase}
                    className="h-8 px-3 bg-white border border-[#c9cccf] hover:bg-[#f6f6f7] text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    Actualiser
                  </button>
                </div>
              </div>

              {/* 4 Inventory Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-[#e1e3e5] shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Métrage Global en Atelier</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    {totalMetersInStock.toLocaleString()} ml
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    Prêt pour confections & découpe
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e1e3e5] shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Valeur Marchande du Stock</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    {formatMoney(totalStockValuationEur)}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    ≈ {(totalStockValuationEur * 10.85).toLocaleString()} MAD HT
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e1e3e5] shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Alertes Stock Faible</div>
                  <div className="text-xl font-bold text-amber-600 mt-1 font-mono">
                    {lowStockCount} tissu(s)
                  </div>
                  <div className="text-[11px] text-amber-700 font-medium mt-1">
                    Seuil inférieur à 50 mètres
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#e1e3e5] shadow-xs">
                  <div className="text-xs text-slate-500 font-medium">Rouleaux Répertoriés</div>
                  <div className="text-xl font-bold text-slate-900 mt-1 font-mono">
                    ~{products.reduce((acc, p) => acc + Math.max(1, Math.ceil((p.stockLevel || 0) / 45)), 0)} rouleaux
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    Atelier Sidi Ghanem (Racks A à D)
                  </div>
                </div>
              </div>

              {/* Segmented Filter Bar */}
              <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-xs overflow-hidden">
                <div className="p-3 border-b border-[#e1e3e5] flex flex-wrap gap-2">
                  {[
                    { id: "ALL", label: "Tous les Rouleaux" },
                    { id: "LOW_STOCK", label: "Stock Faible (< 50 ml)" },
                    { id: "CRITICAL", label: "Rupture Imminente (< 15 ml)" },
                  ].map((seg) => (
                    <button
                      key={seg.id}
                      onClick={() => setInventorySegment(seg.id)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        inventorySegment === seg.id
                          ? "bg-[#1a1a1a] text-white"
                          : "bg-[#f1f2f4] text-slate-600 hover:bg-[#e4e5e7]"
                      }`}
                    >
                      {seg.label}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f6f7] text-[11px] text-slate-500 font-semibold border-b border-[#e1e3e5]">
                        <th className="py-2.5 px-4">Tissu & Étoffe</th>
                        <th className="py-2.5 px-4">Emplacement Atelier</th>
                        <th className="py-2.5 px-4">Bain Teinture</th>
                        <th className="py-2.5 px-4">Rouleaux</th>
                        <th className="py-2.5 px-4">Disponible (ml)</th>
                        <th className="py-2.5 px-4">Ajustement Rapide (+/-)</th>
                        <th className="py-2.5 px-4">État Stock</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f2f4]">
                      {filteredInventory.map((p, idx) => {
                        const rackLoc = `Rack A-0${(idx % 6) + 1} • Niveau ${((idx % 3) + 1)}`;
                        const dyeLot = `LOT-2026-B${(idx % 9) + 1}`;
                        const rollsCount = Math.max(1, Math.ceil((p.stockLevel || 0) / 45));
                        const isLow = (p.stockLevel || 0) < 50;
                        const isCrit = (p.stockLevel || 0) < 15;

                        return (
                          <tr key={p.id} className="hover:bg-[#f6f6f7] transition-colors">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-md bg-slate-100 overflow-hidden relative border border-[#e1e3e5] shrink-0">
                                  <Image
                                    src={p.image || "/gallery/duvet_cover_linen_1791048696631.jpg"}
                                    alt={p.nameFr}
                                    fill
                                    sizes="36px"
                                    className="object-cover"
                                  />
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 truncate">{p.nameFr}</div>
                                  <div className="text-[10px] text-slate-400 font-mono">
                                    Laize: {p.laize}cm • Martindale: {p.martindale?.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-slate-700 font-medium">
                              <div>Atelier Sidi Ghanem</div>
                              <div className="text-[10px] text-slate-400 font-mono">{rackLoc}</div>
                            </td>
                            <td className="py-3 px-4 font-mono text-[11px] font-bold text-[#c29d59]">
                              {dyeLot}
                            </td>
                            <td className="py-3 px-4 font-mono font-bold text-slate-700">
                              {rollsCount} rlx
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <input
                                  type="number"
                                  defaultValue={p.stockLevel}
                                  onBlur={(e) => handleUpdateStock(p.id, parseFloat(e.target.value))}
                                  className="w-20 bg-white border border-[#c9cccf] rounded px-2 py-1 font-mono font-bold text-xs"
                                />
                                <span className="text-slate-500 font-mono text-[11px]">ml</span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleQuickStockAdjust(p.id, -10)}
                                  title="Retirer 10 mètres"
                                  className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-700 cursor-pointer"
                                >
                                  -10m
                                </button>
                                <button
                                  onClick={() => handleQuickStockAdjust(p.id, -5)}
                                  title="Retirer 5 mètres"
                                  className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-700 cursor-pointer"
                                >
                                  -5m
                                </button>
                                <button
                                  onClick={() => handleQuickStockAdjust(p.id, 5)}
                                  title="Ajouter 5 mètres"
                                  className="px-1.5 py-0.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded text-[10px] font-mono font-bold text-emerald-800 cursor-pointer"
                                >
                                  +5m
                                </button>
                                <button
                                  onClick={() => handleQuickStockAdjust(p.id, 10)}
                                  title="Ajouter 10 mètres"
                                  className="px-1.5 py-0.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded text-[10px] font-mono font-bold text-emerald-800 cursor-pointer"
                                >
                                  +10m
                                </button>
                                <button
                                  onClick={() => handleQuickStockAdjust(p.id, 50)}
                                  title="Ajouter 50 mètres (1 rouleau)"
                                  className="px-1.5 py-0.5 bg-emerald-100 hover:bg-emerald-200 border border-emerald-400 rounded text-[10px] font-mono font-bold text-emerald-900 cursor-pointer"
                                >
                                  +50m
                                </button>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  isCrit
                                    ? "bg-red-100 text-red-800"
                                    : isLow
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-emerald-100 text-emerald-800"
                                }`}
                              >
                                {isCrit ? "✕ Alerte Rupture" : isLow ? "⚠ Stock Faible" : "✓ En Stock"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => setSelectedProduct(p)}
                                className="px-2.5 py-1 bg-white border border-[#c9cccf] hover:bg-[#f6f6f7] text-slate-700 rounded text-xs font-semibold cursor-pointer"
                              >
                                Modifier
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
          {/* TAB 5: SHOPIFY COLLECTIONS (Catégories & Univers)                 */}
          {/* ================================================================ */}
          {activeTab === "collections" && (
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Collections & Univers CMS</h1>
                  <p className="text-xs text-slate-500">Organisation de la boutique Kansotex en collections thématiques.</p>
                </div>
                <button
                  onClick={() => setIsNewCategoryModalOpen(true)}
                  className="h-8 px-3.5 bg-[#1a1a1a] hover:bg-[#303030] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  <span>Créer une collection</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((c) => {
                  const count = products.filter((p) => p.categoryId === c.id).length;
                  return (
                    <div key={c.id} className="bg-white rounded-xl border border-[#e1e3e5] p-4 shadow-xs space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-900">{c.nameFr}</span>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-mono font-bold">
                          {count} produits
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {c.descriptionFr || "Collection textile exclusive Maison Kansotex."}
                      </p>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-mono">/univers/{c.slug}</span>
                        <Link
                          href={`/${currentLocale}/univers/${c.slug}`}
                          target="_blank"
                          className="text-[#005bd3] font-semibold hover:underline flex items-center gap-1"
                        >
                          <span>Voir</span>
                          <IconExternal className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* TAB 6: SHOPIFY CUSTOMERS (Clients & CRM B2B)                      */}
          {/* ================================================================ */}
          {activeTab === "customers" && (
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Clients & Comptes Pro B2B</h1>
                  <p className="text-xs text-slate-500">Prescripteurs architectes, hôtellerie et remises exclusives sauvegardées dans PostgreSQL.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-xs overflow-hidden">
                <div className="p-3 border-b border-[#e1e3e5] flex gap-2">
                  {["ALL", "ARCHITECT", "HOTEL", "DECORATOR", "CUSTOMER"].map((role) => (
                    <button
                      key={role}
                      onClick={() => setCustomerSegment(role)}
                      className={`px-3 py-1 rounded-md text-xs font-semibold cursor-pointer ${
                        customerSegment === role ? "bg-[#1a1a1a] text-white" : "bg-[#f1f2f4] text-slate-600 hover:bg-[#e4e5e7]"
                      }`}
                    >
                      {role === "ALL" ? "Tous" : role}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f6f6f7] text-[11px] text-slate-500 font-semibold border-b border-[#e1e3e5]">
                        <th className="py-2.5 px-4">Client</th>
                        <th className="py-2.5 px-4">Rôle B2B</th>
                        <th className="py-2.5 px-4">Remise Négociée</th>
                        <th className="py-2.5 px-4">Statut Vérification</th>
                        <th className="py-2.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f1f2f4]">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-[#f6f6f7] transition-colors">
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900">{u.firstName} {u.lastName}</div>
                            <div className="text-[11px] text-[#c29d59] font-medium">{u.companyName || "Client direct"}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>
                          </td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-700">{u.role}</td>
                          <td className="py-3 px-4">
                            <select
                              value={u.tradeDiscount}
                              onChange={(e) => handleUpdateUserPro(u.id, u.isVerifiedPro, parseFloat(e.target.value))}
                              className="bg-white border border-[#c9cccf] rounded px-2 py-1 text-xs font-mono font-bold cursor-pointer"
                            >
                              <option value={0}>0% (Tarif Public)</option>
                              <option value={0.15}>-15% (Prescripteur)</option>
                              <option value={0.2}>-20% (Architecte)</option>
                              <option value={0.25}>-25% (Hôtellerie)</option>
                              <option value={0.3}>-30% (Palaces & Riads)</option>
                              <option value={0.35}>-35% (Admin / Direction)</option>
                            </select>
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => handleUpdateUserPro(u.id, !u.isVerifiedPro, u.tradeDiscount)}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                                u.isVerifiedPro ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {u.isVerifiedPro ? "✓ Pro Vérifié" : "En attente"}
                            </button>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedCustomer(u)}
                              className="px-2.5 py-1 bg-white border border-[#c9cccf] hover:bg-[#f6f6f7] text-slate-700 rounded text-xs font-semibold cursor-pointer"
                            >
                              Fiche client
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
          {/* TAB 7: SHOPIFY DISCOUNTS (Réductions & Promos Live)              */}
          {/* ================================================================ */}
          {activeTab === "discounts" && (
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Réductions & Codes Promotionnels</h1>
                  <p className="text-xs text-slate-500">Moteur promo branché en direct sur le panier et le passage en caisse.</p>
                </div>
                <button
                  onClick={() => setIsNewPromoModalOpen(true)}
                  className="h-8 px-3.5 bg-[#1a1a1a] hover:bg-[#303030] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <IconPlus className="w-3.5 h-3.5" />
                  <span>Créer une réduction</span>
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f6f6f7] text-[11px] text-slate-500 font-semibold border-b border-[#e1e3e5]">
                      <th className="py-2.5 px-4">Code</th>
                      <th className="py-2.5 px-4">Statut</th>
                      <th className="py-2.5 px-4">Valeur</th>
                      <th className="py-2.5 px-4">Utilisations</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f2f4]">
                    {promos.map((p) => (
                      <tr key={p.id} className="hover:bg-[#f6f6f7] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">{p.code}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleTogglePromo(p.id)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                              p.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {p.isActive ? "Actif" : "Désactivé"}
                          </button>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-bold text-emerald-700">-{p.discountPercent}%</span>{" "}
                          <span className="text-slate-500 text-[11px]">({p.description})</span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">{p.uses || 0} fois</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeletePromo(p.id, p.code)}
                            className="text-xs text-red-600 hover:text-red-800 font-semibold cursor-pointer"
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
          {/* TAB 8: SHOPIFY FINANCES (Facturation Légale Marocaine)             */}
          {/* ================================================================ */}
          {activeTab === "finances" && (
            <div className="max-w-6xl mx-auto space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-lg font-bold text-slate-900">Finances & Facturation Marocaine</h1>
                  <p className="text-xs text-slate-500">Conforme à la DGI Maroc : ICE 002984512000084 • IF 52849102 • RC 94821 Marrakech.</p>
                </div>
                <button
                  onClick={handleExportCSV}
                  className="h-8 px-3 bg-white border border-[#c9cccf] hover:bg-[#f6f6f7] text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Exporter CSV Comptable
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#e1e3e5] shadow-xs overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f6f6f7] text-[11px] text-slate-500 font-semibold border-b border-[#e1e3e5]">
                      <th className="py-2.5 px-4">Facture Réf</th>
                      <th className="py-2.5 px-4">Client / Société</th>
                      <th className="py-2.5 px-4">Montant HT</th>
                      <th className="py-2.5 px-4">TVA (20%)</th>
                      <th className="py-2.5 px-4">Total TTC</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f1f2f4]">
                    {orders.map((ord, idx) => {
                      const invoiceRef = `FA-2026-${(1000 + idx).toString()}`;
                      const ht = ord.totalAmount / 1.2;
                      const tva = ord.totalAmount - ht;
                      return (
                        <tr key={ord.id} className="hover:bg-[#f6f6f7] transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{invoiceRef}</td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{ord.customerCompany}</div>
                            <div className="text-[10px] text-slate-400 font-mono">ICE: {ord.customerSiret}</div>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700">{formatMoney(ht)}</td>
                          <td className="py-3 px-4 font-mono text-slate-500">{formatMoney(tva)}</td>
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">{formatMoney(ord.totalAmount)}</td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => setSelectedInvoice({ ...ord, invoiceRef, ht, tva })}
                              className="px-2.5 py-1 bg-white border border-[#c9cccf] hover:bg-[#f6f6f7] text-slate-700 rounded text-xs font-semibold cursor-pointer"
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
        </main>
      </div>

      {/* ==================================================================== */}
      {/* 3. SHOPIFY DETAIL DRAWERS & POPUPS                                   */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {/* Toast */}
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 bg-[#1a1a1a] text-white px-4 py-2.5 rounded-lg border border-[#3d3d3d] shadow-xl text-xs font-medium flex items-center gap-2"
          >
            <IconCheck className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
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
              className="fixed inset-0 bg-black/40 cursor-pointer"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto"
            >
              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-slate-400">COMMANDE SHOPIFY</span>
                    <h2 className="text-lg font-bold text-slate-900">{selectedOrder.orderNumber}</h2>
                  </div>
                  <button onClick={() => setSelectedOrder(null)} className="text-slate-400 hover:text-slate-700">✕</button>
                </div>

                <div className="bg-[#f6f6f7] p-3 rounded-lg border border-[#e1e3e5] space-y-1 text-xs">
                  <div className="font-bold text-slate-900">{selectedOrder.customerName}</div>
                  <div className="text-slate-600">{selectedOrder.customerCompany}</div>
                  <div className="text-slate-500 font-mono">Email: {selectedOrder.customerEmail}</div>
                  <div className="text-slate-500 font-mono">ICE: {selectedOrder.customerSiret}</div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Modifier le Statut :</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleUpdateOrderStatus(selectedOrder.id, e.target.value)}
                    className="w-full bg-white border border-[#c9cccf] rounded-lg p-2 text-xs font-bold cursor-pointer"
                  >
                    <option value="PENDING">PENDING (En attente)</option>
                    <option value="PAID">PAID (Payée)</option>
                    <option value="PROCESSING">PROCESSING (En confection atelier)</option>
                    <option value="SHIPPED">SHIPPED (Expédiée)</option>
                    <option value="DELIVERED">DELIVERED (Livrée)</option>
                    <option value="CANCELLED">CANCELLED (Annulée)</option>
                  </select>
                </div>

                <div className="space-y-2 text-xs">
                  <label className="block font-bold text-slate-700">Transporteur & Suivi</label>
                  <input
                    type="text"
                    defaultValue="Amana Express Maroc"
                    placeholder="Transporteur"
                    className="w-full bg-[#f6f6f7] border border-[#c9cccf] rounded p-2 text-xs"
                  />
                  <input
                    type="text"
                    defaultValue={selectedOrder.trackingNumber || "AMN-948210"}
                    placeholder="Numéro de suivi"
                    className="w-full bg-[#f6f6f7] border border-[#c9cccf] rounded p-2 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="p-4 bg-[#f6f6f7] border-t border-[#e1e3e5] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400">Total TTC</div>
                  <div className="text-base font-bold text-slate-900 font-mono">{formatMoney(selectedOrder.totalAmount)}</div>
                </div>
                <button
                  onClick={() => {
                    const ht = selectedOrder.totalAmount / 1.2;
                    setSelectedInvoice({
                      ...selectedOrder,
                      invoiceRef: `FA-${selectedOrder.orderNumber}`,
                      ht,
                      tva: selectedOrder.totalAmount - ht,
                    });
                  }}
                  className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#303030] text-white text-xs font-semibold rounded-lg cursor-pointer"
                >
                  Imprimer Facture Maroc
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* SETTINGS MODAL */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 bg-black/50 cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 z-10 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e5]">
                <h3 className="font-bold text-sm text-slate-900">Paramètres Généraux du Store</h3>
                <button onClick={() => setIsSettingsOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">ICE (Identifiant Commun de l'Entreprise)</label>
                  <input type="text" readOnly value="002984512000084" className="w-full bg-[#f6f6f7] border border-[#c9cccf] rounded p-2 font-mono font-bold" />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Identifiant Fiscal (IF)</label>
                  <input type="text" readOnly value="52849102" className="w-full bg-[#f6f6f7] border border-[#c9cccf] rounded p-2 font-mono font-bold" />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">RC Marrakech</label>
                  <input type="text" readOnly value="RC 94821 Marrakech" className="w-full bg-[#f6f6f7] border border-[#c9cccf] rounded p-2 font-mono font-bold" />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">RIB CIH Bank Officiel</label>
                  <input type="text" readOnly value="230 450 48291048291048 29" className="w-full bg-emerald-50 border border-emerald-300 rounded p-2 font-mono font-bold text-emerald-900" />
                </div>
              </div>
              <div className="pt-3 border-t border-[#e1e3e5] flex justify-end">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-4 py-2 bg-[#1a1a1a] text-white rounded-lg font-semibold"
                >
                  Fermer
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
              className="fixed inset-0 bg-black/50 cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 z-10 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e5]">
                <h3 className="font-bold text-sm text-slate-900">Ajouter un produit (Shopify)</h3>
                <button onClick={() => setIsNewProductModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3">
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Titre du Produit</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Housse de Couette Lin Lavé Terracotta"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    className="w-full bg-white border border-[#c9cccf] rounded p-2 font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Catégorie</label>
                    <select
                      value={newProdCat}
                      onChange={(e) => setNewProdCat(e.target.value)}
                      className="w-full bg-white border border-[#c9cccf] rounded p-2"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.nameFr}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">Prix Public (€)</label>
                    <input
                      type="number"
                      required
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(e.target.value)}
                      className="w-full bg-white border border-[#c9cccf] rounded p-2 font-mono font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Stock Rouleau (mètres linéaires)</label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full bg-white border border-[#c9cccf] rounded p-2 font-mono"
                  />
                </div>
                <div className="pt-3 border-t border-[#e1e3e5] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewProductModalOpen(false)}
                    className="px-3 py-1.5 bg-[#f1f2f4] text-slate-700 rounded font-semibold"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 bg-[#1a1a1a] text-white rounded font-semibold"
                  >
                    {isSubmitting ? "Création..." : "Enregistrer le produit"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* NEW PROMO MODAL */}
        {isNewPromoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNewPromoModalOpen(false)}
              className="fixed inset-0 bg-black/50 cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 z-10 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e5]">
                <h3 className="font-bold text-sm text-slate-900">Créer un Code Réduction</h3>
                <button onClick={() => setIsNewPromoModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleCreatePromo} className="space-y-3">
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Code Promotionnel</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: HOTEL30, ARCHI25"
                    value={newPromoCode}
                    onChange={(e) => setNewPromoCode(e.target.value.toUpperCase())}
                    className="w-full bg-white border border-[#c9cccf] rounded p-2 font-mono font-bold uppercase"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Pourcentage de Réduction (%)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={newPromoDiscount}
                    onChange={(e) => setNewPromoDiscount(e.target.value)}
                    className="w-full bg-white border border-[#c9cccf] rounded p-2 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Description</label>
                  <input
                    type="text"
                    placeholder="Ex: Palaces & Riads Marrakech"
                    value={newPromoDesc}
                    onChange={(e) => setNewPromoDesc(e.target.value)}
                    className="w-full bg-white border border-[#c9cccf] rounded p-2"
                  />
                </div>
                <div className="pt-3 border-t border-[#e1e3e5] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsNewPromoModalOpen(false)}
                    className="px-3 py-1.5 bg-[#f1f2f4] text-slate-700 rounded font-semibold"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 bg-[#1a1a1a] text-white rounded font-semibold"
                  >
                    {isSubmitting ? "Création..." : "Activer la réduction"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* RECEIVE ROLL MODAL */}
        {isReceiveRollModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReceiveRollModalOpen(false)}
              className="fixed inset-0 bg-black/50 cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-6 z-10 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e5]">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Réception d&apos;un Rouleau d&apos;Atelier</h3>
                  <p className="text-[11px] text-slate-500">Enregistrement d&apos;un arrivage textile sur racks.</p>
                </div>
                <button onClick={() => setIsReceiveRollModalOpen(false)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleReceiveRoll} className="space-y-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Tissu Réceptionné</label>
                  <select
                    value={rollProductId}
                    onChange={(e) => setRollProductId(e.target.value)}
                    className="w-full bg-white border border-[#c9cccf] rounded p-2 text-xs font-semibold"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.nameFr} ({p.stockLevel} ml actuels)</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Métrage du Rouleau (ml)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      step="0.5"
                      value={rollMeters}
                      onChange={(e) => setRollMeters(e.target.value)}
                      className="w-full bg-white border border-[#c9cccf] rounded p-2 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Bain de Teinture / Lot</label>
                    <input
                      type="text"
                      required
                      value={rollDyeLot}
                      onChange={(e) => setRollDyeLot(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-[#c9cccf] rounded p-2 font-mono font-bold text-xs uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Emplacement Rack Atelier</label>
                  <input
                    type="text"
                    required
                    value={rollRack}
                    onChange={(e) => setRollRack(e.target.value)}
                    placeholder="Ex: Rack A-02 • Étagère 1"
                    className="w-full bg-white border border-[#c9cccf] rounded p-2 font-semibold text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-[#e1e3e5] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsReceiveRollModalOpen(false)}
                    className="px-3 py-1.5 bg-[#f1f2f4] text-slate-700 rounded font-semibold cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 bg-[#1a1a1a] hover:bg-[#303030] text-white rounded font-semibold cursor-pointer"
                  >
                    {isSubmitting ? "Enregistrement..." : "Valider l'Arrivage Rouleau"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* EDIT PRODUCT MODAL */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-black/50 cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 z-10 space-y-4 text-xs max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#e1e3e5]">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Modifier la Fiche Tissu</h3>
                  <p className="text-[11px] text-slate-500 font-mono">ID: {selectedProduct.id} • Slug: {selectedProduct.slug}</p>
                </div>
                <button onClick={() => setSelectedProduct(null)} className="text-slate-400 hover:text-slate-700">✕</button>
              </div>

              <form onSubmit={handleSaveProductEdit} className="space-y-3">
                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Nom de l&apos;Étoffe (FR)</label>
                  <input
                    type="text"
                    required
                    value={selectedProduct.nameFr}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, nameFr: e.target.value })}
                    className="w-full bg-white border border-[#c9cccf] rounded p-2 text-xs font-bold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Prix Public TTC (€)</label>
                    <input
                      type="number"
                      required
                      step="0.5"
                      value={selectedProduct.basePrice}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, basePrice: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white border border-[#c9cccf] rounded p-2 font-mono font-bold text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Stock Total (mètres)</label>
                    <input
                      type="number"
                      required
                      value={selectedProduct.stockLevel}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, stockLevel: parseFloat(e.target.value) || 0 })}
                      className="w-full bg-white border border-[#c9cccf] rounded p-2 font-mono font-bold text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Laize (cm)</label>
                    <input
                      type="number"
                      value={selectedProduct.laize || 280}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, laize: parseFloat(e.target.value) || 280 })}
                      className="w-full bg-white border border-[#c9cccf] rounded p-2 font-mono text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Martindale (tours)</label>
                    <input
                      type="number"
                      value={selectedProduct.martindale || 35000}
                      onChange={(e) => setSelectedProduct({ ...selectedProduct, martindale: parseInt(e.target.value) || 35000 })}
                      className="w-full bg-white border border-[#c9cccf] rounded p-2 font-mono text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Composition</label>
                  <input
                    type="text"
                    value={selectedProduct.composition || "100% Lin Français Lavé"}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, composition: e.target.value })}
                    className="w-full bg-white border border-[#c9cccf] rounded p-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 mb-1 font-semibold">Collection / Univers</label>
                  <select
                    value={selectedProduct.categoryId}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, categoryId: e.target.value })}
                    className="w-full bg-white border border-[#c9cccf] rounded p-2 text-xs"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.nameFr}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 border-t border-[#e1e3e5] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(null)}
                    className="px-3 py-1.5 bg-[#f1f2f4] text-slate-700 rounded font-semibold cursor-pointer"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-1.5 bg-[#1a1a1a] hover:bg-[#303030] text-white rounded font-semibold cursor-pointer"
                  >
                    {isSubmitting ? "Enregistrement..." : "Enregistrer dans PostgreSQL"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* PRINTABLE MOROCCAN INVOICE */}
        {selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInvoice(null)}
              className="fixed inset-0 bg-black/60 cursor-pointer"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 z-10 text-xs space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-mono font-bold text-slate-900">{selectedInvoice.invoiceRef}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1 bg-[#1a1a1a] text-white rounded font-semibold cursor-pointer"
                  >
                    Imprimer PDF
                  </button>
                  <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-700">✕</button>
                </div>
              </div>

              <div className="space-y-4 p-4 border border-slate-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-bold text-base text-slate-900">KANSOTEX MARRAKECH</h2>
                    <p className="text-[11px] text-slate-500">Éditeur Textile & Confection d'Atelier</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">
                      ICE : 002984512000084 • IF : 52849102 • RC : 94821 Marrakech
                    </p>
                  </div>
                  <div className="text-right font-mono">
                    <div className="font-bold text-slate-900">{selectedInvoice.invoiceRef}</div>
                    <div className="text-slate-400">{new Date(selectedInvoice.createdAt).toLocaleDateString("fr-FR")}</div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="font-bold text-slate-900">{selectedInvoice.customerCompany}</div>
                  <div className="text-slate-600">{selectedInvoice.customerName}</div>
                  <div className="text-slate-500 font-mono">ICE : {selectedInvoice.customerSiret}</div>
                </div>

                <div className="border border-slate-200 rounded overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-2">Désignation</th>
                        <th className="p-2 text-right">HT</th>
                        <th className="p-2 text-right">TVA 20%</th>
                        <th className="p-2 text-right">TTC</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-2">Fourniture tissus nobles & confection sur-mesure</td>
                        <td className="p-2 text-right font-mono">{formatMoney(selectedInvoice.ht)}</td>
                        <td className="p-2 text-right font-mono">{formatMoney(selectedInvoice.tva)}</td>
                        <td className="p-2 text-right font-mono font-bold text-slate-900">{formatMoney(selectedInvoice.totalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-right space-y-1 font-mono">
                  <div>Total HT : {formatMoney(selectedInvoice.ht)}</div>
                  <div>TVA (20%) : {formatMoney(selectedInvoice.tva)}</div>
                  <div className="font-bold text-sm text-slate-900">Total TTC : {formatMoney(selectedInvoice.totalAmount)}</div>
                  <div className="text-slate-500 text-[11px]">≈ {(selectedInvoice.totalAmount * 10.85).toLocaleString()} MAD</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
