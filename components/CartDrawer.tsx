"use client";

import { useCart } from "@/lib/CartContext";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "@/lib/CurrencyContext";
import { useTranslations } from "next-intl";
import { removeAccents } from "@/lib/text";

// Safe helper for Termina font to avoid any character / accent glitches
const toTermina = (str: string) => removeAccents(str || "").toUpperCase();

export function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, cartTotal, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const t = useTranslations("Cart");

  const [isRequestingDevis, setIsRequestingDevis] = useState(false);
  const [devisSuccess, setDevisSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      setDevisSuccess(false);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  // Handle promo code application
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (!cleanCode) return;

    if (cleanCode === "KANSOTEX10" || cleanCode === "BIENVENUE" || cleanCode === "WELCOME") {
      setDiscountPercent(10);
      setPromoMessage({ text: "-10% applique !" });
    } else if (cleanCode === "VIP20") {
      setDiscountPercent(20);
      setPromoMessage({ text: "-20% VIP applique !" });
    } else {
      setPromoMessage({ text: "Code non valide", error: true });
    }
  };

  const discountAmount = (cartTotal * discountPercent) / 100;
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  // Handle request devis
  const handleRequestDevis = async () => {
    setIsRequestingDevis(true);
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Client Panier",
          email: "client@kansotex.com",
          company: "Projet Particulier / B2B",
          message: "Demande de devis depuis le panier Kansotex",
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
            colorName: item.colorName,
          })),
        }),
      });

      if (res.ok) {
        setDevisSuccess(true);
        setTimeout(() => {
          clearCart();
          closeCart();
        }, 2200);
      } else {
        alert("Erreur lors de l'envoi du devis.");
      }
    } catch {
      alert("Erreur de connexion.");
    } finally {
      setIsRequestingDevis(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6 lg:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/65 backdrop-blur-md"
          />

          {/* Modal Container: Borderless Luxury Card with Deep Soft Shadow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 14 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full md:w-[96vw] max-w-[1260px] h-full md:h-[92vh] max-h-[840px] md:rounded-[28px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.65)] bg-[#fdfbf7] flex flex-col lg:flex-row"
          >
            {/* ============================================================ */}
            {/* COLUMN 1: LEFT DARK SIDEBAR (Byredo Style Navigation) */}
            {/* ============================================================ */}
            <div className="hidden lg:flex flex-col w-[230px] xl:w-[250px] bg-[#272522] text-[#f3eee6] p-7 xl:p-8 border-r border-[#383530] shrink-0 select-none">
              {/* Brand Logo */}
              <div className="mb-9">
                <Link
                  href="/"
                  onClick={closeCart}
                  aria-label="Kansotex"
                  className="block shrink-0"
                >
                  <Image
                    src="/KANSOTEX-marque-1-white.png"
                    alt="Kansotex"
                    width={500}
                    height={120}
                    className="w-[145px] h-auto object-contain"
                    priority
                  />
                </Link>
              </div>

              {/* Navigation Sections */}
              <div className="flex-1 overflow-y-auto space-y-7 pr-1 text-[11px] font-sans">
                {/* EXPLORE */}
                <div>
                  <h4 className="font-termina text-[9px] font-bold uppercase tracking-[0.24em] text-[#9a9287] mb-3">
                    {toTermina(t("explore"))}
                  </h4>
                  <ul className="space-y-2 text-[#d2cbbf]">
                    <li>
                      <Link
                        href="/univers"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {t("bestSellers")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/univers"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {t("newArrivals")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/savoir-faire"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {t("samples")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {t("giftCards")}
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* OUR UNIVERSES */}
                <div>
                  <h4 className="font-termina text-[9px] font-bold uppercase tracking-[0.24em] text-[#9a9287] mb-3">
                    {toTermina(t("universes"))}
                  </h4>
                  <ul className="space-y-2 text-[#d2cbbf]">
                    <li>
                      <Link
                        href="/univers/indoor"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        Indoor
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/univers/outdoor"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        Outdoor
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/univers/linge-de-lit"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        Linge de lit
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/univers/linge-de-maison"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        Linge de maison
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/univers/tissus-haut-de-gamme"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        Tissus d&apos;exception
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* SERVICES & PRO */}
                <div>
                  <h4 className="font-termina text-[9px] font-bold uppercase tracking-[0.24em] text-[#9a9287] mb-3">
                    {toTermina(t("services"))}
                  </h4>
                  <ul className="space-y-2 text-[#d2cbbf]">
                    <li>
                      <Link
                        href="/sur-mesure"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {t("customMade")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/pro"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {t("proSpace")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        onClick={closeCart}
                        className="hover:text-white transition-colors block py-0.5"
                      >
                        {t("requestQuote")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Sidebar Footer */}
              <div className="pt-5 border-t border-[#383530] text-[9px] text-[#9a9287] tracking-[0.2em] font-termina uppercase">
                MARRAKECH · MAROC
              </div>
            </div>

            {/* ============================================================ */}
            {/* COLUMN 2: CENTER SHOPPING CART (Table / Items Area) */}
            {/* ============================================================ */}
            <div className="flex-1 flex flex-col bg-white min-w-0 overflow-hidden">
              {/* Top Navigation Bar: Back to store */}
              <div className="px-6 lg:px-9 pt-6 pb-3 flex items-center justify-between border-b border-ink/5">
                <button
                  onClick={closeCart}
                  className="group inline-flex items-center gap-2 text-[10px] font-termina font-bold tracking-[0.2em] uppercase text-ink/60 hover:text-ink transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:-translate-x-1"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  <span>{toTermina(t("backToStore"))}</span>
                </button>

                {/* Mobile Close Button */}
                <button
                  onClick={closeCart}
                  className="lg:hidden p-2 text-ink/60 hover:text-ink transition-colors"
                  aria-label="Fermer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Main Cart Heading */}
              <div className="px-6 lg:px-9 py-5 flex items-baseline justify-between border-b border-ink/5 bg-[#fdfcf9]">
                <h1 className="font-termina text-xl lg:text-2xl font-bold uppercase tracking-[0.1em] text-ink">
                  {toTermina(t("title"))}
                </h1>
                <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-ink/50">
                  {items.length} {toTermina(items.length > 1 ? t("items") : t("itemSingular"))}
                </span>
              </div>

              {/* Table Column Headers (Desktop only, perfectly proportional) */}
              {items.length > 0 && (
                <div className="hidden md:flex items-center gap-4 px-6 lg:px-9 py-3 text-[10px] font-termina font-bold uppercase tracking-[0.2em] text-ink/40 border-b border-ink/5 bg-white select-none">
                  <div className="flex-1 min-w-[200px]">{toTermina(t("itemHeader"))}</div>
                  <div className="w-24 text-center shrink-0">{toTermina("Option")}</div>
                  <div className="w-28 text-center shrink-0">{toTermina(t("quantityHeader"))}</div>
                  <div className="w-28 text-right shrink-0 pr-1">{toTermina(t("priceHeader"))}</div>
                  <div className="w-7 shrink-0" />
                </div>
              )}

              {/* Items List (Scrollable, Generous Layout) */}
              <div className="flex-1 overflow-y-auto px-6 lg:px-9 py-2 divide-y divide-ink/5">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-20 text-center space-y-6">
                    <div className="w-16 h-16 rounded-full border border-ink/10 flex items-center justify-center bg-cream/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                        className="text-ink/40"
                      >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                      </svg>
                    </div>
                    <p className="font-poppins text-sm text-ink/60 max-w-xs leading-relaxed">
                      {t("empty")}
                    </p>
                    <button
                      onClick={closeCart}
                      className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] px-6 py-3 bg-ink text-[#f3eee6] hover:bg-black transition-colors"
                    >
                      {toTermina(t("discover"))}
                    </button>
                  </div>
                ) : (
                  items.map((item) => {
                    const priceFormatted = formatPrice(item.price * item.quantity);
                    return (
                      <div
                        key={item.id}
                        className="py-5 flex flex-col md:flex-row md:items-center gap-4 group"
                      >
                        {/* Item Details: Image + Title + Subtitle (Takes all remaining width) */}
                        <div className="flex-1 min-w-[200px] flex items-center gap-4">
                          <div className="w-16 h-20 md:w-18 md:h-22 bg-[#f5f3ef] relative overflow-hidden rounded-md shrink-0 border border-ink/5">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-ink/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 pr-2">
                            {/* Product Title: Allowed 2 full lines, never ugly truncated */}
                            <h3 className="font-termina text-[11px] font-bold uppercase tracking-[0.1em] text-ink leading-snug line-clamp-2">
                              {toTermina(item.name)}
                            </h3>
                            <p className="font-termina text-[9px] uppercase tracking-[0.18em] text-ink/40 mt-1">
                              {item.isFabric ? "TISSU AU METRE" : "CONFECTION KANSOTEX"}
                            </p>
                            {item.colorName && (
                              <div className="flex items-center gap-1.5 mt-2 text-[10px] text-ink/60 font-sans">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-ink/20 shrink-0"
                                  style={{ backgroundColor: item.colorHex || "#dcd7cf" }}
                                />
                                <span className="truncate">{item.colorName}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Middle Controls & Price in Desktop Row */}
                        <div className="flex items-center justify-between md:justify-end gap-3 md:gap-4 shrink-0 pt-2 md:pt-0">
                          {/* Option / Size Column */}
                          <div className="w-24 text-center shrink-0">
                            <span className="font-sans text-[11px] text-ink/70 bg-[#f7f5f0] px-2.5 py-1 rounded-sm border border-ink/5 inline-block">
                              {item.isFabric ? `${item.quantity} m` : "Standard"}
                            </span>
                          </div>

                          {/* Quantity Stepper Column */}
                          <div className="w-28 flex justify-center shrink-0">
                            <div className="flex items-center border border-ink/20 rounded-full bg-white px-1 py-0.5 shadow-sm">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Math.max(1, item.quantity - (item.isFabric ? 0.5 : 1))
                                  )
                                }
                                disabled={item.quantity <= (item.isFabric ? 1 : 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-full text-ink/60 hover:text-ink hover:bg-cream/80 disabled:opacity-30 transition-colors font-sans text-sm"
                                aria-label="Diminuer"
                              >
                                −
                              </button>
                              <span className="w-9 text-center font-termina text-[11px] font-bold text-ink">
                                {item.quantity}
                                {item.isFabric ? "m" : ""}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.quantity + (item.isFabric ? 0.5 : 1)
                                  )
                                }
                                className="w-7 h-7 flex items-center justify-center rounded-full text-ink/60 hover:text-ink hover:bg-cream/80 transition-colors font-sans text-sm"
                                aria-label="Augmenter"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Price Column: Always whitespace-nowrap with currency symbol inline */}
                          <div className="w-28 text-right shrink-0 whitespace-nowrap pr-1">
                            <span className="font-cormorant text-2xl font-medium text-ink tracking-tight inline-flex items-baseline justify-end gap-1">
                              <span>{priceFormatted.value}</span>
                              <span className="font-termina text-[9px] tracking-wider text-ink/70">
                                {priceFormatted.symbol}
                              </span>
                            </span>
                          </div>

                          {/* Delete Action Column */}
                          <div className="w-7 flex justify-center shrink-0">
                            <button
                              onClick={() => removeItem(item.id)}
                              className="w-7 h-7 flex items-center justify-center text-ink/30 hover:text-red-800 transition-colors hover:rotate-90 duration-300"
                              aria-label="Supprimer"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom Reassurance Banner */}
              <div className="px-6 lg:px-9 py-3.5 border-t border-ink/5 bg-[#faf8f5] flex items-center justify-between text-[10px] font-sans text-ink/60">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  <span>{t("freeShippingNote")}</span>
                </span>
                <span className="hidden sm:inline font-termina text-[9px] tracking-widest uppercase text-ink/40">
                  KANSOTEX MARRAKECH
                </span>
              </div>
            </div>

            {/* ============================================================ */}
            {/* COLUMN 3: RIGHT SUMMARY & CHECKOUT PANEL */}
            {/* ============================================================ */}
            <div className="w-full lg:w-[320px] xl:w-[350px] bg-[#f8f6f2] border-t lg:border-t-0 lg:border-l border-ink/10 flex flex-col p-6 lg:p-8 shrink-0 justify-between">
              <div>
                {/* Header with Close Icon */}
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-termina text-[12px] font-bold uppercase tracking-[0.25em] text-ink">
                    {toTermina(t("summary"))}
                  </h2>
                  <button
                    onClick={closeCart}
                    className="p-1.5 -mr-1 text-ink/50 hover:text-ink transition-transform hover:rotate-90 duration-300"
                    aria-label="Fermer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>

                {/* Summary Breakdown Rows */}
                <div className="space-y-4 font-sans text-[12px] text-ink/80 pb-6 border-b border-ink/10">
                  <div className="flex justify-between items-center">
                    <span className="text-ink/60">{t("subtotal")}</span>
                    <span className="font-medium text-ink whitespace-nowrap">
                      {formatPrice(cartTotal).value} {formatPrice(cartTotal).symbol}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-ink/60">{t("shipping")}</span>
                    <span className="font-termina text-[10px] tracking-wider text-green-900 font-bold uppercase">
                      {toTermina(t("freeShipping"))}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-ink/60">{t("tax")}</span>
                    <span className="text-ink/50 text-[11px] font-termina tracking-wider uppercase">
                      {toTermina(t("taxIncluded"))}
                    </span>
                  </div>

                  {discountPercent > 0 && (
                    <div className="flex justify-between items-center text-green-900 font-medium">
                      <span>Remise ({discountPercent}%)</span>
                      <span className="whitespace-nowrap">
                        -{formatPrice(discountAmount).value} {formatPrice(discountAmount).symbol}
                      </span>
                    </div>
                  )}
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyPromo} className="py-5 border-b border-ink/10">
                  <label className="block font-termina text-[9px] font-bold uppercase tracking-[0.2em] text-ink/50 mb-2">
                    {toTermina(t("promocode"))}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder={toTermina(t("enterCode"))}
                      className="flex-1 bg-white border border-ink/15 px-3 py-2 text-[11px] font-sans placeholder:text-ink/30 focus:outline-none focus:border-ink rounded-sm uppercase tracking-wider"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-white border border-ink/20 text-ink hover:bg-ink hover:text-white transition-colors font-termina text-[9px] font-bold uppercase tracking-wider rounded-sm"
                    >
                      {toTermina(t("apply"))}
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`text-[10px] mt-2 font-sans ${
                        promoMessage.error ? "text-red-700" : "text-green-800"
                      }`}
                    >
                      {promoMessage.text}
                    </p>
                  )}
                </form>

                {/* Total Row: Prominent, Aligned, Never Wraps */}
                <div className="py-6 flex items-baseline justify-between">
                  <span className="font-termina text-[11px] font-bold uppercase tracking-[0.25em] text-ink">
                    {toTermina(t("total"))}
                  </span>
                  <div className="text-right whitespace-nowrap">
                    <span className="font-cormorant text-3xl font-semibold text-ink tracking-tight inline-flex items-baseline justify-end gap-1.5">
                      <span>{formatPrice(finalTotal).value}</span>
                      <span className="font-termina text-[10px] tracking-widest text-ink/70">
                        {formatPrice(finalTotal).symbol}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className={`group relative flex w-full h-13 items-center justify-center bg-[#1c1b19] text-[#f3eee6] rounded-md overflow-hidden shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 ${
                    items.length === 0 ? "pointer-events-none opacity-40" : ""
                  }`}
                >
                  <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                  <span className="relative font-termina text-[10px] font-bold tracking-[0.25em] uppercase">
                    {toTermina(t("checkout"))}
                  </span>
                </Link>

                <button
                  onClick={handleRequestDevis}
                  disabled={isRequestingDevis || devisSuccess || items.length === 0}
                  className="flex w-full h-11 items-center justify-center bg-transparent border border-ink/20 rounded-md text-ink/80 hover:border-ink hover:text-ink transition-colors disabled:opacity-40"
                >
                  <span className="font-termina text-[9px] font-bold tracking-[0.2em] uppercase">
                    {devisSuccess
                      ? toTermina(t("quoteSuccess"))
                      : isRequestingDevis
                      ? toTermina(t("quoteSending"))
                      : toTermina(t("requestQuote"))}
                  </span>
                </button>

                <p className="text-center text-[10px] font-sans text-ink/40 tracking-wide pt-1 leading-relaxed">
                  {t("taxesNote")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
