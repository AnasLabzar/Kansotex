"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";
import { useCurrency, CurrencyCode } from "@/lib/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

export type ShippingMethod =
  | "standard"
  | "white_glove"
  | "showroom"
  | "intl_express"
  | "intl_priority";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart, addItem } = useCart();
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Form State
  const [customerType, setCustomerType] = useState<"individual" | "pro">("individual");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [iceNumber, setIceNumber] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("Marrakech");
  const [country, setCountry] = useState("Maroc");
  const [notes, setNotes] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  // Delivery & Payment
  const isInternational = country !== "Maroc";
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<"transfer" | "cod" | "pro_invoice" | "card">("transfer");

  // Promo Code
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any | null>(null);
  const [copiedRib, setCopiedRib] = useState(false);

  // Switch country handler: Automatically adapts shipping method & fees
  const handleCountryChange = (newCountry: string) => {
    setCountry(newCountry);
    if (newCountry === "Maroc") {
      if (shippingMethod === "intl_express" || shippingMethod === "intl_priority") {
        setShippingMethod("standard");
      }
    } else {
      if (shippingMethod === "standard" || shippingMethod === "white_glove" || shippingMethod === "showroom") {
        setShippingMethod("intl_express");
      }
    }
  };

  // Shipping cost in EUR base equivalent (dynamically converted to the active currency by formatPrice)
  const getShippingCost = (): number => {
    if (country === "Maroc") {
      if (shippingMethod === "white_glove") return 14; // ~150 MAD
      return 0; // standard (Offerte partout au Maroc) & showroom (Gratuit)
    } else {
      if (shippingMethod === "intl_priority") return 60; // ~650 MAD / ~60 € / ~52 £ / ~65 $
      return 35; // intl_express (~380 MAD / ~35 € / ~30 £ / ~38 $)
    }
  };

  const shippingCost = getShippingCost();
  const discountAmount = (cartTotal * discountPercent) / 100;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingCost);

  // Apply promo code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = promoCode.trim().toUpperCase();
    if (!clean) return;
    if (clean === "KANSOTEX10" || clean === "BIENVENUE" || clean === "WELCOME") {
      setDiscountPercent(10);
      setPromoMessage({ text: "Privilège -10% déduit de votre commande." });
    } else if (clean === "VIP20") {
      setDiscountPercent(20);
      setPromoMessage({ text: "Privilège -20% appliqué avec succès." });
    } else {
      setPromoMessage({ text: "Code promotionnel invalide ou expiré.", error: true });
    }
  };

  // Add demo items if cart is empty for testing
  const handleAddSampleItems = () => {
    addItem({
      id: "demo-set-serviettes-1",
      productId: "prod-serviettes",
      variantId: "var-taupe",
      name: "Set Serviettes Éponge Spa Marrakech",
      colorName: "Taupe Naturel",
      colorHex: "#9a8f82",
      price: 18.9, // EUR base
      quantity: 3,
      isFabric: false,
      image: "/gallery/bath_towels_set_1791048635743.jpg",
    });
    addItem({
      id: "demo-lin-lave-2",
      productId: "prod-lin-lave",
      variantId: "var-sable",
      name: "Tissu Lin Lavé Pur — Sable d'Atlas",
      colorName: "Sable Doré",
      colorHex: "#d8cbb6",
      price: 29.5, // EUR base
      quantity: 5,
      isFabric: true,
      image: "/gallery/linen_fabric_closeup_1791052926029.jpg",
    });
  };

  // Copy RIB to clipboard
  const handleCopyRib = () => {
    navigator.clipboard.writeText("007 450 0001234567890123 45");
    setCopiedRib(true);
    setTimeout(() => setCopiedRib(false), 2200);
  };

  // Submit order
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsSubmitting(true);
    try {
      const payload = {
        customer: {
          type: customerType,
          email,
          phone,
          firstName,
          lastName,
          company,
          iceNumber,
          newsletter,
        },
        shipping: {
          address,
          apartment,
          city,
          country,
          method: shippingMethod,
          isInternational,
          notes,
        },
        payment: {
          method: paymentMethod,
        },
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          color: i.colorName,
          isFabric: i.isFabric,
        })),
        totals: {
          subtotal: cartTotal,
          discount: discountAmount,
          shipping: shippingCost,
          finalTotal,
        },
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setOrderConfirmed({
          orderId: data.orderId,
          email: email || "client@kansotex.com",
          total: finalTotal,
          itemsCount: items.length,
          paymentMethod,
          shippingMethod,
          country,
        });
        clearCart();
      } else {
        alert("Erreur lors de la validation. Veuillez vérifier vos informations.");
      }
    } catch {
      alert("Erreur de connexion au serveur.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1b19] flex flex-col font-sans antialiased selection:bg-[#1c1b19] selection:text-white">
      {/* ============================================================ */}
      {/* LUXURY MINIMALIST HEADER */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e9e5dd] shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
          {/* Back link */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs font-sans text-[#1c1b19]/70 hover:text-[#1c1b19] transition-colors tracking-wide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:-translate-x-1"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="hidden sm:inline">Retour à la boutique</span>
            <span className="sm:hidden">Boutique</span>
          </Link>

          {/* Centered Brand Logo (Home Navbar Style) */}
          <Link href="/" aria-label="Kansotex" className="shrink-0 flex items-center justify-center">
            <Image
              src="/KANSOTEX-marque-Black.png"
              alt="Kansotex"
              width={500}
              height={120}
              className="w-[140px] sm:w-[160px] h-auto object-contain"
              priority
            />
          </Link>

          {/* Right Controls: Currency Switcher & Security Badge */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Currency Selector */}
            <div className="flex items-center bg-[#f4f1ea] rounded-full p-0.5 border border-[#e5e0d5]">
              {(["MAD", "EUR", "USD", "GBP"] as CurrencyCode[]).map((cur) => (
                <button
                  key={cur}
                  type="button"
                  onClick={() => setCurrency(cur)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-medium transition-all ${
                    currency === cur
                      ? "bg-white text-[#1c1b19] shadow-xs"
                      : "text-[#1c1b19]/50 hover:text-[#1c1b19]"
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>

            {/* Security Badge */}
            <div className="hidden md:flex items-center gap-1.5 text-xs text-[#1c1b19]/75 font-sans pl-2 border-l border-[#e9e5dd]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#3b663b]"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>Paiement sécurisé</span>
            </div>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* ORDER CONFIRMATION SCREEN */}
      {/* ============================================================ */}
      {orderConfirmed ? (
        <main className="flex-1 flex items-center justify-center px-5 sm:px-8 py-16 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl bg-white rounded-2xl p-7 sm:p-10 lg:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.04)] border border-[#e8e4db] text-center space-y-7"
          >
            {/* Elegant Checkmark Badge */}
            <div className="w-16 h-16 rounded-full bg-[#f4f8f2] border border-[#d5e5cf] text-[#2e6224] flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-widest text-[#1c1b19]/50 font-medium">
                Confirmation de commande
              </p>
              <h1 className="font-cormorant text-3xl sm:text-4xl font-normal text-[#1c1b19]">
                Merci pour votre confiance
              </h1>
              <p className="font-sans text-xs text-[#1c1b19]/70 max-w-md mx-auto leading-relaxed pt-1">
                Votre commande a été transmise à notre atelier de Marrakech. Nos maîtres tapissiers et artisans préparent vos pièces avec le plus grand soin.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-[#fbf9f6] rounded-xl p-5 text-left border border-[#e8e4db] space-y-3.5 text-xs font-sans">
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1c1b19]/10">
                <span className="text-[#1c1b19]/60">Numéro de référence</span>
                <span className="font-mono font-medium text-[#1c1b19] text-sm">
                  #{orderConfirmed.orderId}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1c1b19]/10">
                <span className="text-[#1c1b19]/60">Email client</span>
                <span className="text-[#1c1b19] font-medium truncate max-w-[220px]">
                  {orderConfirmed.email}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1c1b19]/10">
                <span className="text-[#1c1b19]/60">Destination &amp; Livraison</span>
                <span className="text-[#1c1b19] font-medium">
                  {orderConfirmed.country === "Maroc"
                    ? "Maroc (Livraison offerte)"
                    : `International (${orderConfirmed.country})`}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-[#1c1b19]/10">
                <span className="text-[#1c1b19]/60">Total de la commande</span>
                <span className="font-cormorant text-2xl font-normal text-[#1c1b19] whitespace-nowrap">
                  {formatPrice(orderConfirmed.total).value}{" "}
                  <span className="text-sm font-sans">{formatPrice(orderConfirmed.total).symbol}</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#1c1b19]/60">Mode de règlement</span>
                <span className="text-[#1c1b19] font-medium">
                  {orderConfirmed.paymentMethod === "transfer"
                    ? "Virement bancaire (RIB)"
                    : orderConfirmed.paymentMethod === "cod"
                    ? "Règlement à la livraison"
                    : orderConfirmed.paymentMethod === "pro_invoice"
                    ? "Facturation B2B / Pro"
                    : "Paiement par carte (réservé)"}
                </span>
              </div>
            </div>

            {/* Instructions for Transfer */}
            {orderConfirmed.paymentMethod === "transfer" && (
              <div className="bg-[#f5f3ee] p-4 rounded-xl text-left border border-[#e5e0d5] text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#1c1b19]">Coordonnées pour virement bancaire :</span>
                  <button
                    type="button"
                    onClick={handleCopyRib}
                    className="text-[11px] underline text-[#1c1b19]/70 hover:text-[#1c1b19]"
                  >
                    {copiedRib ? "✓ RIB copié" : "Copier le RIB"}
                  </button>
                </div>
                <div className="font-mono text-[11px] bg-white p-2.5 rounded border border-[#e2ddd3] space-y-1">
                  <p>Banque : Attijariwafa Bank Marrakech</p>
                  <p>Bénéficiaire : KANSOTEX TEXTILES SARL</p>
                  <p>RIB : 007 450 0001234567890123 45</p>
                  <p>SWIFT : BCMAMAMC</p>
                </div>
                <p className="text-[11px] text-[#1c1b19]/60">
                  Veuillez spécifier la référence #{orderConfirmed.orderId} dans l&apos;intitulé de votre virement.
                </p>
              </div>
            )}

            {/* WhatsApp Contact concierge button */}
            <div className="pt-2">
              <a
                href={`https://wa.me/212661090950?text=Bonjour%20Kansotex,%20je%20viens%20de%20passer%20la%20commande%20%23${orderConfirmed.orderId}%20pour%20un%20montant%20de%20${formatPrice(orderConfirmed.total).value}%20${formatPrice(orderConfirmed.total).symbol}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#3b663b]/30 bg-[#f4f8f2] text-[#2b5921] hover:bg-[#ebf4e8] transition-colors text-xs font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <span>Informer la conciergerie sur WhatsApp</span>
              </a>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <Link
                href="/univers"
                className="font-sans text-xs font-medium tracking-wide uppercase px-7 py-3 bg-[#1c1b19] text-white hover:bg-black transition-colors rounded-lg"
              >
                Continuer mes achats
              </Link>
              <Link
                href="/"
                className="font-sans text-xs font-medium tracking-wide uppercase px-7 py-3 bg-white border border-[#1c1b19]/20 text-[#1c1b19] hover:border-[#1c1b19] transition-colors rounded-lg"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </motion.div>
        </main>
      ) : (
        /* ============================================================ */
        /* MAIN CHECKOUT EXPERIENCE */
        /* ============================================================ */
        <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-12">
          {items.length === 0 ? (
            /* Empty State */
            <div className="max-w-md mx-auto bg-white rounded-2xl p-8 lg:p-12 text-center border border-[#e8e4db] shadow-[0_4px_25px_rgba(0,0,0,0.03)] space-y-5">
              <div className="w-14 h-14 rounded-full border border-[#1c1b19]/10 flex items-center justify-center mx-auto bg-[#faf8f5]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#1c1b19]/40"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
              </div>
              <div className="space-y-1.5">
                <h2 className="font-cormorant text-2xl lg:text-3xl font-normal text-[#1c1b19]">
                  Votre panier est actuellement vide
                </h2>
                <p className="font-sans text-xs text-[#1c1b19]/60 leading-relaxed max-w-sm mx-auto">
                  Découvrez nos collections d&apos;étoffes nobles et de linge de maison haut de gamme confectionnés à Marrakech.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 pt-3 justify-center">
                <button
                  type="button"
                  onClick={handleAddSampleItems}
                  className="font-sans text-xs font-medium tracking-wide uppercase px-5 py-3 bg-[#1c1b19] text-white hover:bg-black transition-colors rounded-lg shadow-xs"
                >
                  Charger un panier de démonstration
                </button>
                <Link
                  href="/univers"
                  className="font-sans text-xs font-medium tracking-wide uppercase px-5 py-3 bg-white border border-[#1c1b19]/20 text-[#1c1b19] hover:border-[#1c1b19] transition-colors rounded-lg"
                >
                  Découvrir nos univers
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-start">
              {/* ============================================================ */}
              {/* LEFT COLUMN: INTERACTIVE LUXURY FORM */}
              {/* ============================================================ */}
              <div className="lg:col-span-7 space-y-7">
                <form onSubmit={handlePlaceOrder} className="space-y-7">
                  {/* Step 1: Coordonnées & Profil */}
                  <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e4db] shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-5">
                    <div className="flex items-center justify-between pb-4 border-b border-[#f0ece3]">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#1c1b19] text-[#faf8f5] text-xs font-serif flex items-center justify-center font-medium">
                          1
                        </span>
                        <h2 className="font-cormorant text-2xl font-normal text-[#1c1b19] tracking-tight">
                          Coordonnées &amp; Profil
                        </h2>
                      </div>

                      {/* Particulier / Architecte Pro Switch */}
                      <div className="flex bg-[#f4f1ea] p-1 rounded-full border border-[#e5e0d5]">
                        <button
                          type="button"
                          onClick={() => setCustomerType("individual")}
                          className={`px-3 py-1 rounded-full text-xs font-sans transition-all ${
                            customerType === "individual"
                              ? "bg-white text-[#1c1b19] font-medium shadow-xs"
                              : "text-[#1c1b19]/60 hover:text-[#1c1b19]"
                          }`}
                        >
                          Particulier
                        </button>
                        <button
                          type="button"
                          onClick={() => setCustomerType("pro")}
                          className={`px-3 py-1 rounded-full text-xs font-sans transition-all ${
                            customerType === "pro"
                              ? "bg-white text-[#1c1b19] font-medium shadow-xs"
                              : "text-[#1c1b19]/60 hover:text-[#1c1b19]"
                          }`}
                        >
                          Architecte / Pro
                        </button>
                      </div>
                    </div>

                    {/* Pro-specific fields */}
                    <AnimatePresence>
                      {customerType === "pro" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#faf8f5] border border-[#e8e4db] mb-2">
                            <div>
                              <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                                Raison sociale / Agence d&apos;architecture *
                              </label>
                              <input
                                type="text"
                                required={customerType === "pro"}
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="Studio d'Architecture & Décoration"
                                className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                                Identifiant Fiscal / N° ICE *
                              </label>
                              <input
                                type="text"
                                required={customerType === "pro"}
                                value={iceNumber}
                                onChange={(e) => setIceNumber(e.target.value)}
                                placeholder="0023456780000..."
                                className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19]"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                          Adresse email de contact *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="votre.email@domaine.com"
                          className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                          Téléphone de contact *
                        </label>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+212 6 61 09 09 50"
                          className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19]"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="newsletter"
                        checked={newsletter}
                        onChange={(e) => setNewsletter(e.target.checked)}
                        className="rounded border-[#ded9cf] text-[#1c1b19] focus:ring-[#1c1b19] h-4 w-4"
                      />
                      <label htmlFor="newsletter" className="text-xs text-[#1c1b19]/70 font-sans cursor-pointer select-none">
                        Recevoir les invitations privées et nouvelles collections d&apos;étoffes Kansotex.
                      </label>
                    </div>
                  </section>

                  {/* Step 2: Adresse & Formule de Livraison */}
                  <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e4db] shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-5">
                    <div className="flex items-center gap-3 pb-4 border-b border-[#f0ece3]">
                      <span className="w-6 h-6 rounded-full bg-[#1c1b19] text-[#faf8f5] text-xs font-serif flex items-center justify-center font-medium">
                        2
                      </span>
                      <h2 className="font-cormorant text-2xl font-normal text-[#1c1b19] tracking-tight">
                        Adresse &amp; Formule de Livraison
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                          Prénom du destinataire *
                        </label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Karim"
                          className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                          Nom de famille *
                        </label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Benjelloun"
                          className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                        Adresse de livraison complète *
                      </label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Numéro, rue, villa, riad ou résidence..."
                        className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                          Complément (Villa, Étage)
                        </label>
                        <input
                          type="text"
                          value={apartment}
                          onChange={(e) => setApartment(e.target.value)}
                          placeholder="Villa 12, Porte A..."
                          className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                          Ville *
                        </label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Marrakech"
                          className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                          Pays de destination *
                        </label>
                        <select
                          value={country}
                          onChange={(e) => handleCountryChange(e.target.value)}
                          className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19]"
                        >
                          <option value="Maroc">Maroc (Livraison offerte)</option>
                          <option value="France">France</option>
                          <option value="Belgique">Belgique</option>
                          <option value="Suisse">Suisse</option>
                          <option value="Royaume-Uni">Royaume-Uni</option>
                          <option value="Émirats Arabes Unis">Émirats Arabes Unis</option>
                          <option value="Espagne">Espagne</option>
                          <option value="Italie">Italie</option>
                          <option value="États-Unis">États-Unis</option>
                          <option value="Canada">Canada</option>
                          <option value="Arabie Saoudite">Arabie Saoudite</option>
                          <option value="Qatar">Qatar</option>
                          <option value="Koweït">Koweït</option>
                          <option value="Allemagne">Allemagne</option>
                          <option value="Pays-Bas">Pays-Bas</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Autre destination">Autre destination internationale</option>
                        </select>
                      </div>
                    </div>

                    {/* ========================================================= */}
                    {/* Dynamic Shipping Options (Maroc vs International) */}
                    {/* ========================================================= */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-3">
                        <label className="block text-xs font-sans font-medium text-[#1c1b19]/70">
                          {isInternational
                            ? `Formule d'expédition internationale (${country})`
                            : "Choisir une formule de livraison (Maroc)"}
                        </label>
                        {!isInternational && (
                          <span className="text-[11px] font-sans font-medium text-[#2e6224]">
                            ✓ Livraison gratuite partout au Maroc
                          </span>
                        )}
                      </div>

                      {/* --- CASE 1: MOROCCO (DOMESTIC) --- */}
                      {!isInternational ? (
                        <div className="space-y-3">
                          {/* Standard Option (100% Free Everywhere in Morocco) */}
                          <label
                            className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                              shippingMethod === "standard"
                                ? "border-[#1c1b19] bg-[#faf8f5] shadow-xs"
                                : "border-[#e8e4db] hover:border-[#1c1b19]/40 bg-white"
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <input
                                type="radio"
                                name="shipping"
                                checked={shippingMethod === "standard"}
                                onChange={() => setShippingMethod("standard")}
                                className="mt-1 text-[#1c1b19] focus:ring-[#1c1b19] h-4 w-4"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-sans text-xs font-semibold text-[#1c1b19]">
                                    Livraison Standard Kansotex (Partout au Maroc)
                                  </span>
                                </div>
                                <p className="font-sans text-[11px] text-[#1c1b19]/60 mt-0.5 leading-relaxed">
                                  Expédition suivie sous 24h-48h dans tout le Maroc (Casablanca, Rabat, Marrakech, Tanger, Agadir...) · Housse protectrice soignée.
                                </p>
                              </div>
                            </div>
                            <span className="font-sans text-xs font-semibold text-[#2e6224] whitespace-nowrap pl-3">
                              Offerte
                            </span>
                          </label>

                          {/* White Glove Option (150 MAD / ~14 EUR converted in active currency) */}
                          <label
                            className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                              shippingMethod === "white_glove"
                                ? "border-[#1c1b19] bg-[#faf8f5] shadow-xs"
                                : "border-[#e8e4db] hover:border-[#1c1b19]/40 bg-white"
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <input
                                type="radio"
                                name="shipping"
                                checked={shippingMethod === "white_glove"}
                                onChange={() => setShippingMethod("white_glove")}
                                className="mt-1 text-[#1c1b19] focus:ring-[#1c1b19] h-4 w-4"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-sans text-xs font-semibold text-[#1c1b19]">
                                    Service Sur Rendez-vous &amp; Gants Blancs
                                  </span>
                                </div>
                                <p className="font-sans text-[11px] text-[#1c1b19]/60 mt-0.5 leading-relaxed">
                                  Créneau horaire dédié, remise en main propre et déballage soigné pour villas &amp; riads.
                                </p>
                              </div>
                            </div>
                            <span className="font-sans text-xs font-semibold text-[#1c1b19] whitespace-nowrap pl-3">
                              +{formatPrice(14).value} {formatPrice(14).symbol}
                            </span>
                          </label>

                          {/* Showroom Pickup Option (Free) */}
                          <label
                            className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                              shippingMethod === "showroom"
                                ? "border-[#1c1b19] bg-[#faf8f5] shadow-xs"
                                : "border-[#e8e4db] hover:border-[#1c1b19]/40 bg-white"
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <input
                                type="radio"
                                name="shipping"
                                checked={shippingMethod === "showroom"}
                                onChange={() => setShippingMethod("showroom")}
                                className="mt-1 text-[#1c1b19] focus:ring-[#1c1b19] h-4 w-4"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-sans text-xs font-semibold text-[#1c1b19]">
                                    Retrait Showroom Kansotex Marrakech
                                  </span>
                                </div>
                                <p className="font-sans text-[11px] text-[#1c1b19]/60 mt-0.5 leading-relaxed">
                                  Disponible sous 24h à notre atelier · Accueil et conseil matière personnalisés.
                                </p>
                              </div>
                            </div>
                            <span className="font-sans text-xs font-semibold text-[#2e6224] whitespace-nowrap pl-3">
                              Gratuit
                            </span>
                          </label>
                        </div>
                      ) : (
                        /* --- CASE 2: INTERNATIONAL DESTINATIONS --- */
                        <div className="space-y-3">
                          {/* International Express (DHL / FedEx) */}
                          <label
                            className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                              shippingMethod === "intl_express"
                                ? "border-[#1c1b19] bg-[#faf8f5] shadow-xs"
                                : "border-[#e8e4db] hover:border-[#1c1b19]/40 bg-white"
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <input
                                type="radio"
                                name="shipping"
                                checked={shippingMethod === "intl_express"}
                                onChange={() => setShippingMethod("intl_express")}
                                className="mt-1 text-[#1c1b19] focus:ring-[#1c1b19] h-4 w-4"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-sans text-xs font-semibold text-[#1c1b19]">
                                    Livraison Internationale Express · DHL / FedEx
                                  </span>
                                </div>
                                <p className="font-sans text-[11px] text-[#1c1b19]/60 mt-0.5 leading-relaxed">
                                  Acheminement aérien sécurisé sous 3-5 jours vers {country} · Suivi porte-à-porte &amp; formalités douanières export incluses.
                                </p>
                              </div>
                            </div>
                            <span className="font-sans text-xs font-semibold text-[#1c1b19] whitespace-nowrap pl-3">
                              +{formatPrice(35).value} {formatPrice(35).symbol}
                            </span>
                          </label>

                          {/* International Priority with Reinforced Crate */}
                          <label
                            className={`flex items-start justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                              shippingMethod === "intl_priority"
                                ? "border-[#1c1b19] bg-[#faf8f5] shadow-xs"
                                : "border-[#e8e4db] hover:border-[#1c1b19]/40 bg-white"
                            }`}
                          >
                            <div className="flex items-start gap-3.5">
                              <input
                                type="radio"
                                name="shipping"
                                checked={shippingMethod === "intl_priority"}
                                onChange={() => setShippingMethod("intl_priority")}
                                className="mt-1 text-[#1c1b19] focus:ring-[#1c1b19] h-4 w-4"
                              />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-sans text-xs font-semibold text-[#1c1b19]">
                                    Expédition Prioritaire &amp; Caisse Renforcée Export
                                  </span>
                                </div>
                                <p className="font-sans text-[11px] text-[#1c1b19]/60 mt-0.5 leading-relaxed">
                                  Conditionnement rigide renforcé, assurance valeur déclarée 100% et créneau prioritaire sur rendez-vous.
                                </p>
                              </div>
                            </div>
                            <span className="font-sans text-xs font-semibold text-[#1c1b19] whitespace-nowrap pl-3">
                              +{formatPrice(60).value} {formatPrice(60).symbol}
                            </span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Custom Notes */}
                    <div>
                      <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                        Précisions pour l&apos;atelier (Dimensions spécifiques, découpe, date souhaitée...)
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Exemple : Prévoir confection en deux lés séparés de 2,50m..."
                        className="w-full bg-white border border-[#ded9cf] rounded-lg px-3.5 py-2.5 text-xs text-[#1c1b19] focus:outline-none focus:border-[#1c1b19] focus:ring-1 focus:ring-[#1c1b19] resize-none"
                      />
                    </div>
                  </section>

                  {/* Step 3: Mode de Règlement Sécurisé */}
                  <section className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e8e4db] shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-5">
                    <div className="flex items-center gap-3 pb-4 border-b border-[#f0ece3]">
                      <span className="w-6 h-6 rounded-full bg-[#1c1b19] text-[#faf8f5] text-xs font-serif flex items-center justify-center font-medium">
                        3
                      </span>
                      <h2 className="font-cormorant text-2xl font-normal text-[#1c1b19] tracking-tight">
                        Mode de Règlement
                      </h2>
                    </div>

                    {/* Clean Payment Mode Tabs with Consistent Line Icons from the SAME family */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {/* Virement RIB */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("transfer")}
                        className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                          paymentMethod === "transfer"
                            ? "border-[#1c1b19] bg-[#1c1b19] text-[#faf8f5] shadow-xs"
                            : "border-[#e8e4db] bg-white text-[#1c1b19]/80 hover:border-[#1c1b19]/40"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                          <line x1="2" y1="10" x2="22" y2="10"></line>
                        </svg>
                        <span className="font-sans text-xs font-medium">
                          Virement RIB
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                          paymentMethod === "transfer" ? "bg-white/20 text-white" : "bg-[#f4f1ea] text-[#1c1b19]/70"
                        }`}>
                          Recommandé
                        </span>
                      </button>

                      {/* À la livraison */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("cod")}
                        className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                          paymentMethod === "cod"
                            ? "border-[#1c1b19] bg-[#1c1b19] text-[#faf8f5] shadow-xs"
                            : "border-[#e8e4db] bg-white text-[#1c1b19]/80 hover:border-[#1c1b19]/40"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        <span className="font-sans text-xs font-medium">
                          À la livraison
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                          paymentMethod === "cod" ? "bg-white/20 text-white" : "bg-[#f4f1ea] text-[#1c1b19]/70"
                        }`}>
                          Espèces/Chèque
                        </span>
                      </button>

                      {/* Facturation Pro */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("pro_invoice")}
                        className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                          paymentMethod === "pro_invoice"
                            ? "border-[#1c1b19] bg-[#1c1b19] text-[#faf8f5] shadow-xs"
                            : "border-[#e8e4db] bg-white text-[#1c1b19]/80 hover:border-[#1c1b19]/40"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                        </svg>
                        <span className="font-sans text-xs font-medium">
                          Facturation Pro
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                          paymentMethod === "pro_invoice" ? "bg-white/20 text-white" : "bg-[#f4f1ea] text-[#1c1b19]/70"
                        }`}>
                          B2B / 30 jours
                        </span>
                      </button>

                      {/* Carte CMI / Visa / Mastercard: Clearly marked 'En cours' */}
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("card")}
                        className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-2 relative ${
                          paymentMethod === "card"
                            ? "border-[#1c1b19] bg-[#1c1b19] text-[#faf8f5] shadow-xs"
                            : "border-[#e8e4db] bg-white text-[#1c1b19]/80 hover:border-[#1c1b19]/40"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                          <line x1="1" y1="10" x2="23" y2="10"></line>
                        </svg>
                        <span className="font-sans text-xs font-medium">
                          Carte CMI / Visa
                        </span>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${
                          paymentMethod === "card"
                            ? "bg-amber-400 text-amber-950 font-semibold"
                            : "bg-amber-100 text-amber-900 border border-amber-300"
                        }`}>
                          En cours
                        </span>
                      </button>
                    </div>

                    {/* Payment Details Container */}
                    <div className="p-5 rounded-xl bg-[#faf8f5] border border-[#e8e4db]">
                      {paymentMethod === "transfer" && (
                        <div className="space-y-3.5 text-xs text-[#1c1b19]/80 leading-relaxed font-sans">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#1c1b19]">
                              Coordonnées bancaires officielles Kansotex :
                            </span>
                            <button
                              type="button"
                              onClick={handleCopyRib}
                              className="text-[11px] font-sans text-[#1c1b19]/75 hover:text-[#1c1b19] underline flex items-center gap-1"
                            >
                              {copiedRib ? "✓ RIB copié dans le presse-papier !" : "Copier le RIB"}
                            </button>
                          </div>
                          <div className="bg-white p-3.5 rounded-lg border border-[#ded9cf] font-mono text-xs space-y-1.5 select-all">
                            <p><span className="text-[#1c1b19]/40 font-sans">Banque :</span> Attijariwafa Bank Marrakech</p>
                            <p><span className="text-[#1c1b19]/40 font-sans">Bénéficiaire :</span> KANSOTEX TEXTILES SARL</p>
                            <p><span className="text-[#1c1b19]/40 font-sans">RIB :</span> 007 450 0001234567890123 45</p>
                            <p><span className="text-[#1c1b19]/40 font-sans">Code SWIFT :</span> BCMAMAMC</p>
                          </div>
                          <p className="text-[11px] text-[#1c1b19]/60">
                            Veuillez mentionner votre nom ou numéro de commande lors de l&apos;émission du virement. La découpe et préparation de vos confections débutent dès notification.
                          </p>
                        </div>
                      )}

                      {paymentMethod === "cod" && (
                        <div className="space-y-2 text-xs text-[#1c1b19]/80 leading-relaxed font-sans">
                          <p className="font-semibold text-[#1c1b19]">
                            Règlement en mains propres à la livraison :
                          </p>
                          <p>
                            Réglez directement auprès de notre transporteur lors de la remise en main propre de vos colis, ou directement lors de votre passage à notre showroom de Marrakech (par espèces ou chèque certifié).
                          </p>
                        </div>
                      )}

                      {paymentMethod === "pro_invoice" && (
                        <div className="space-y-2 text-xs text-[#1c1b19]/80 leading-relaxed font-sans">
                          <p className="font-semibold text-[#1c1b19]">
                            Facturation 30 jours pour Architectes &amp; Décorateurs :
                          </p>
                          <p>
                            Votre commande fera l&apos;objet d&apos;un bon de commande professionnel avec mention de votre identifiant fiscal (ICE) et transmission de la facture proforma par nos chargés de projet.
                          </p>
                        </div>
                      )}

                      {/* Transparent and helpful notification for Card method in progress */}
                      {paymentMethod === "card" && (
                        <div className="space-y-3.5 text-xs text-[#1c1b19]/80 leading-relaxed font-sans">
                          <div className="flex items-start gap-3 bg-amber-50 p-4 rounded-xl border border-amber-200">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              className="text-amber-800 shrink-0 mt-0.5"
                            >
                              <circle cx="12" cy="12" r="10"></circle>
                              <line x1="12" y1="8" x2="12" y2="12"></line>
                              <line x1="12" y1="16" x2="12.01" y2="16"></line>
                            </svg>
                            <div className="space-y-1">
                              <p className="font-semibold text-amber-950">
                                Passerelle Carte Bancaire (CMI / Visa / Mastercard) en cours d&apos;activation
                              </p>
                              <p className="text-[11px] text-amber-900/90 leading-relaxed">
                                Le système de paiement direct en ligne par carte bancaire est en cours d&apos;homologation finale auprès du Centre Monétique Interbancaire.
                              </p>
                            </div>
                          </div>

                          <p className="text-[11px] text-[#1c1b19]/70">
                            Pour valider votre commande aujourd&apos;hui sans délai, vous pouvez sélectionner le <strong>Virement bancaire</strong> ou le <strong>Règlement à la livraison</strong>. Si vous préférez payer par carte bancaire, notre conciergerie peut vous transmettre un lien de paiement sécurisé direct.
                          </p>

                          <div className="flex flex-wrap gap-2.5 pt-1">
                            <button
                              type="button"
                              onClick={() => setPaymentMethod("transfer")}
                              className="px-4 py-2 bg-[#1c1b19] text-white rounded-lg text-xs font-medium hover:bg-black transition-colors"
                            >
                              Basculer sur Virement RIB
                            </button>
                            <a
                              href="https://wa.me/212661090950?text=Bonjour%20Kansotex,%20je%20souhaite%20r%C3%A9gler%20ma%20commande%20par%20carte%20bancaire%20via%20un%20lien%20s%C3%A9curis%C3%A9."
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-white border border-[#1c1b19]/20 text-[#1c1b19] rounded-lg text-xs font-medium hover:border-[#1c1b19] transition-colors inline-flex items-center gap-1.5"
                            >
                              <span>Demander un lien de paiement direct</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Place Order CTA Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex w-full h-14 items-center justify-center bg-[#1c1b19] text-[#faf8f5] rounded-xl overflow-hidden shadow-sm transition-all hover:bg-black active:scale-[0.99] disabled:opacity-60"
                    >
                      <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                      <span className="relative font-sans text-xs font-semibold tracking-wider uppercase flex items-center gap-3">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                            </svg>
                            <span>Validation en cours...</span>
                          </>
                        ) : (
                          <span>
                            Confirmer la commande · {formatPrice(finalTotal).value} {formatPrice(finalTotal).symbol}
                          </span>
                        )}
                      </span>
                    </button>
                  </section>
                </form>
              </div>

              {/* ============================================================ */}
              {/* RIGHT COLUMN: REFINED ORDER SUMMARY & REASSURANCE */}
              {/* ============================================================ */}
              <div className="lg:col-span-5 sticky top-28 space-y-6">
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#e8e4db] shadow-[0_4px_25px_rgba(0,0,0,0.02)] space-y-5">
                  {/* Summary Header */}
                  <div className="flex items-baseline justify-between pb-3.5 border-b border-[#f0ece3]">
                    <h3 className="font-cormorant text-2xl font-normal text-[#1c1b19] tracking-tight">
                      Votre Commande
                    </h3>
                    <span className="text-xs text-[#1c1b19]/50 font-sans">
                      {items.length} {items.length > 1 ? "articles" : "article"}
                    </span>
                  </div>

                  {/* Items List */}
                  <div className="max-h-[360px] overflow-y-auto divide-y divide-[#f2efe9] pr-1 space-y-3.5">
                    {items.map((item) => {
                      const itemTotal = item.price * item.quantity;
                      const formattedLineTotal = formatPrice(itemTotal);
                      const formattedUnitPrice = formatPrice(item.price);

                      return (
                        <div key={item.id} className="pt-3.5 first:pt-0 flex items-start gap-3.5">
                          {/* Thumbnail */}
                          <div className="w-16 h-20 bg-[#f7f5f0] rounded-lg overflow-hidden shrink-0 border border-[#e8e4db] relative">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[#1c1b19]/25 text-[10px] uppercase font-sans">
                                Kansotex
                              </div>
                            )}
                          </div>

                          {/* Info Column */}
                          <div className="flex-1 min-w-0 pr-2">
                            <h4 className="font-sans text-xs font-semibold text-[#1c1b19] line-clamp-2 leading-snug">
                              {item.name}
                            </h4>
                            <div className="text-[11px] text-[#1c1b19]/60 font-sans mt-1 space-y-0.5">
                              {item.isFabric ? (
                                <p>
                                  <span className="font-medium text-[#1c1b19]/80">Métrage :</span> {item.quantity} mètres
                                </p>
                              ) : (
                                <p>
                                  <span className="font-medium text-[#1c1b19]/80">Quantité :</span> {item.quantity} {item.quantity > 1 ? "pièces" : "pièce"}
                                </p>
                              )}
                              {item.colorName && (
                                <p>
                                  <span className="font-medium text-[#1c1b19]/80">Coloris :</span> {item.colorName}
                                </p>
                              )}
                              <p className="text-[10px] text-[#1c1b19]/45">
                                {formattedUnitPrice.value} {formattedUnitPrice.symbol} {item.isFabric ? "/ mètre" : "/ unité"}
                              </p>
                            </div>
                          </div>

                          {/* Line Item Total Price: Formatted cleanly on one line */}
                          <div className="text-right shrink-0 whitespace-nowrap pl-2 pt-0.5">
                            <span className="font-cormorant text-xl font-medium text-[#1c1b19] inline-flex items-baseline justify-end gap-1">
                              <span>{formattedLineTotal.value}</span>
                              <span className="text-xs font-sans text-[#1c1b19]/70">
                                {formattedLineTotal.symbol}
                              </span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="pt-4 border-t border-[#f0ece3]">
                    <label className="block text-xs font-sans font-medium text-[#1c1b19]/70 mb-1.5">
                      Code privilège ou promo
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="BIENVENUE / KANSOTEX10"
                        className="flex-1 bg-[#faf8f5] border border-[#ded9cf] px-3.5 py-2.5 text-xs font-sans placeholder:text-[#1c1b19]/30 focus:outline-none focus:border-[#1c1b19] rounded-lg uppercase tracking-wider"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2.5 bg-[#1c1b19] text-white hover:bg-black transition-colors text-xs font-sans font-medium rounded-lg tracking-wide shrink-0"
                      >
                        Appliquer
                      </button>
                    </div>
                    {promoMessage && (
                      <p className={`text-[11px] mt-1.5 font-sans ${promoMessage.error ? "text-red-700" : "text-[#2e6224]"}`}>
                        {promoMessage.text}
                      </p>
                    )}
                  </form>

                  {/* Financial Calculations */}
                  <div className="space-y-2.5 font-sans text-xs text-[#1c1b19]/75 pt-4 border-t border-[#f0ece3]">
                    <div className="flex justify-between items-center">
                      <span className="text-[#1c1b19]/60">Sous-total</span>
                      <span className="font-medium text-[#1c1b19] whitespace-nowrap">
                        {formatPrice(cartTotal).value} {formatPrice(cartTotal).symbol}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-[#1c1b19]/60">
                        {isInternational ? `Livraison (${country})` : "Livraison (Maroc)"}
                      </span>
                      <span className="font-sans text-xs font-medium whitespace-nowrap">
                        {shippingCost === 0 ? (
                          <span className="text-[#2e6224] font-semibold">Offerte partout au Maroc</span>
                        ) : (
                          <span className="text-[#1c1b19]">
                            +{formatPrice(shippingCost).value} {formatPrice(shippingCost).symbol}
                          </span>
                        )}
                      </span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between items-center text-[#2e6224] font-medium">
                        <span>Remise privilège ({discountPercent}%)</span>
                        <span className="whitespace-nowrap">
                          -{formatPrice(discountAmount).value} {formatPrice(discountAmount).symbol}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <span className="text-[#1c1b19]/60">TVA (20% incluse)</span>
                      <span className="text-[#1c1b19]/50 text-xs">
                        Incluse
                      </span>
                    </div>
                  </div>

                  {/* Grand Total */}
                  <div className="pt-4 border-t border-[#f0ece3] flex items-baseline justify-between">
                    <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1c1b19]">
                      Total à régler
                    </span>
                    <div className="text-right whitespace-nowrap">
                      <span className="font-cormorant text-3xl font-normal text-[#1c1b19] tracking-tight inline-flex items-baseline justify-end gap-1.5">
                        <span>{formatPrice(finalTotal).value}</span>
                        <span className="text-sm font-sans text-[#1c1b19]/70">
                          {formatPrice(finalTotal).symbol}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Professional Reassurance Card with Line Icons from the SAME Family (Zero Emojis!) */}
                <div className="bg-[#f5f3ee] rounded-2xl p-5 sm:p-6 border border-[#e5e0d5] space-y-4 text-xs text-[#1c1b19]/80 font-sans">
                  {/* Item 1 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#ded9cf] flex items-center justify-center shrink-0 text-[#1c1b19]/80 shadow-2xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="8" r="6"></circle>
                        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold text-[#1c1b19]">
                        Confection d&apos;Excellence
                      </p>
                      <p className="text-[11px] text-[#1c1b19]/65 mt-0.5 leading-relaxed">
                        Chaque étoffe et confection de linge est inspectée manuellement dans notre atelier avant expédition.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#ded9cf] flex items-center justify-center shrink-0 text-[#1c1b19]/80 shadow-2xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold text-[#1c1b19]">
                        Expédition Protégée &amp; Soignée
                      </p>
                      <p className="text-[11px] text-[#1c1b19]/65 mt-0.5 leading-relaxed">
                        Housse respirante protectrice Kansotex et emballage rigide de protection inclus.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#ded9cf] flex items-center justify-center shrink-0 text-[#1c1b19]/80 shadow-2xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 21h18"></path>
                        <path d="M5 21V7l7-4 7 4v14"></path>
                        <path d="M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v11H9z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold text-[#1c1b19]">
                        Showroom &amp; Atelier Marrakech
                      </p>
                      <p className="text-[11px] text-[#1c1b19]/65 mt-0.5 leading-relaxed">
                        Nos maîtres tapissiers et conseillers vous assistent pour tous vos projets d&apos;ameublement sur-mesure.
                      </p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#ded9cf] flex items-center justify-center shrink-0 text-[#1c1b19]/80 shadow-2xs">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                    <div>
                      <p className="font-sans text-xs font-semibold text-[#1c1b19]">
                        Fibres &amp; Matières Certifiées
                      </p>
                      <p className="text-[11px] text-[#1c1b19]/65 mt-0.5 leading-relaxed">
                        Lin lavé européen, soies et cotons peignés conformes aux normes écologiques internationales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* ============================================================ */}
      {/* LUXURY MINIMAL FOOTER */}
      {/* ============================================================ */}
      <footer className="mt-auto border-t border-[#e9e5dd] bg-white py-6 text-center text-xs text-[#1c1b19]/50 font-sans">
        <p className="font-sans text-[11px] tracking-wide text-[#1c1b19]/50">
          Kansotex · Maison de textiles d&apos;exception In &amp; Outdoor · Marrakech · Tous droits réservés
        </p>
      </footer>
    </div>
  );
}
