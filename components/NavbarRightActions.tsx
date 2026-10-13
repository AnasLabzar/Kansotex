"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useSession } from "@/lib/SessionContext";
import { useCurrency, CurrencyCode } from "@/lib/CurrencyContext";
import { logout } from "@/lib/session";
import { motion, AnimatePresence } from "framer-motion";
import { toTermina } from "@/lib/text";

const DEFAULT_ROTATING_LABELS = [
  "Demander un devis",
  "Contactez-nous",
  "Conciergerie",
];

interface NavbarRightActionsProps {
  dynamicLabels?: string[];
  contactHref?: string;
}

export function NavbarRightActions({
  dynamicLabels = DEFAULT_ROTATING_LABELS,
  contactHref = "/contact",
}: NavbarRightActionsProps) {
  const pathname = usePathname();
  const isCheckout = pathname?.includes("/checkout");

  const { cartCount, openCart } = useCart();
  const { session } = useSession();
  const { currency, setCurrency, formatPrice } = useCurrency();

  // Authentication status
  const isAuthenticated = Boolean(session?.isPro);

  // Cart bounce animation trigger when count increments
  const [cartBumping, setCartBumping] = useState(false);
  const prevCountRef = useRef(cartCount);

  useEffect(() => {
    if (cartCount > prevCountRef.current) {
      setCartBumping(true);
      const t = setTimeout(() => setCartBumping(false), 500);
      return () => clearTimeout(t);
    }
    prevCountRef.current = cartCount;
  }, [cartCount]);

  // Rotating dynamic CTA label
  const [ctaIndex, setCtaIndex] = useState(0);
  useEffect(() => {
    if (isAuthenticated) return;
    const interval = setInterval(() => {
      setCtaIndex((prev) => (prev + 1) % dynamicLabels.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [dynamicLabels.length, isAuthenticated]);

  // Search state
  const [isHovered, setIsHovered] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Profile menu dropdown state for authenticated user
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileWrapperRef = useRef<HTMLDivElement>(null);

  // Open search input with smooth focus
  const handleOpenSearch = () => {
    setSearchExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 60);
  };

  // Close search and reset
  const handleCloseSearch = () => {
    setSearchExpanded(false);
    setSearchDropdownOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Keyboard navigation (Escape to close search)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && searchExpanded) {
        handleCloseSearch();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchExpanded]);

  // Click outside listener for search & profile dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setSearchDropdownOpen(false);
        // If search query is empty, collapse back to circular icon button
        if (!searchQuery.trim()) {
          setSearchExpanded(false);
        }
      }
      if (
        profileWrapperRef.current &&
        !profileWrapperRef.current.contains(event.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchQuery]);

  // Fetch search results with debouncing
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data.results || []);
      } catch (err) {
        console.error(err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  // Is this an order search query? (e.g. starts with KTX, ORD, #, or digits)
  const isOrderQuery = /^(ktx|ord|#|\d{3,})/i.test(searchQuery.trim());

  // Determine width:
  // - Rest: 36px (circular icon)
  // - Hover (not focused): ~92px (opens just a little bit "hir wahd chwi")
  // - Clicked / Active typing: ~155px (compact, safe, never touches logo)
  let searchWidthClass = "w-9";
  if (searchExpanded) {
    searchWidthClass = "w-[150px] sm:w-[165px]";
  } else if (isHovered) {
    searchWidthClass = "w-[88px] sm:w-[96px]";
  }

  return (
    <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 z-10">
      
      {/* ============================================================ */}
      {/* 0. CURRENCY SELECTOR (ONLY SHOWN ON CHECKOUT PAGE) */}
      {/* ============================================================ */}
      {isCheckout && (
        <div className="hidden sm:flex items-center bg-[#f2eee6] rounded-full p-0.5 border border-[#e5e0d5]">
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
      )}

      {/* ============================================================ */}
      {/* 1. ANIMATED SEARCH: ICON AT REST -> PEEK ON HOVER -> COMPACT */}
      {/* ============================================================ */}
      <div
        ref={searchWrapperRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${searchWidthClass}`}
      >
        <div
          className={`relative flex items-center h-9 rounded-full bg-white/85 border transition-all duration-300 overflow-hidden shadow-2xs ${
            searchExpanded
              ? "w-full border-[#cfc8bc] bg-white px-2.5 shadow-xs ring-1 ring-[#cfc8bc]/40"
              : isHovered
              ? "w-full border-[#cfc8bc] bg-white px-2.5 cursor-pointer shadow-xs"
              : "w-9 border-[#e2ddd3] hover:border-[#cfc8bc] justify-center cursor-pointer"
          }`}
          onClick={() => {
            if (!searchExpanded) handleOpenSearch();
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              if (!searchExpanded) handleOpenSearch();
            }
          }}
          aria-label="Rechercher"
        >
          {/* Search Icon */}
          <svg
            className="w-3.5 h-3.5 text-[#1c1b19]/70 shrink-0 transition-transform duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Hover Peek Preview Label ("yt7el hir wahd chwi") */}
          {!searchExpanded && isHovered && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.15 }}
              className="text-[11px] font-sans text-[#1c1b19]/50 font-light ml-1.5 whitespace-nowrap select-none truncate"
            >
              Chercher
            </motion.span>
          )}

          {/* Active Search Input (Compact, safe, doesn't overlap logo) */}
          {searchExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -4 }}
              transition={{ duration: 0.18 }}
              className="flex items-center flex-1 min-w-0 ml-1.5"
            >
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchDropdownOpen(true);
                }}
                onFocus={() => setSearchDropdownOpen(true)}
                placeholder="Rechercher..."
                className="w-full bg-transparent text-xs text-[#1c1b19] placeholder:text-[#1c1b19]/40 outline-none font-sans font-light border-none ring-0 focus:ring-0 focus:outline-none"
                aria-label="Rechercher produit ou commande"
              />

              {/* Single Unified Close / Clear Button (Never duplicated!) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (searchQuery) {
                    setSearchQuery("");
                    setSearchResults([]);
                    inputRef.current?.focus();
                  } else {
                    handleCloseSearch();
                  }
                }}
                className="text-[#1c1b19]/40 hover:text-[#1c1b19] text-xs w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#f2eee6] transition-colors shrink-0 ml-1"
                title={searchQuery ? "Effacer recherche" : "Fermer la recherche"}
                aria-label={searchQuery ? "Effacer recherche" : "Fermer la recherche"}
              >
                ✕
              </button>
            </motion.div>
          )}
        </div>

        {/* Live Search & Order Tracking Dropdown */}
        <AnimatePresence>
          {searchDropdownOpen && searchQuery.trim().length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full mt-2 w-[280px] sm:w-[320px] max-h-[75vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-[#e8e4db] p-3 z-50 text-[#1c1b19]"
            >
              {/* If query looks like an order reference */}
              {isOrderQuery && (
                <div className="mb-3 p-3 rounded-xl bg-[#faf7f2] border border-[#ece7de]">
                  <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-[#a49a8d] block mb-1">
                    SUIVI DE COMMANDE
                  </span>
                  <p className="text-xs text-[#1c1b19]">
                    Recherche de la référence :{" "}
                    <strong className="font-semibold">{searchQuery.toUpperCase()}</strong>
                  </p>
                  <Link
                    href={`/contact?subject=suivi&ref=${encodeURIComponent(searchQuery)}`}
                    onClick={() => {
                      setSearchDropdownOpen(false);
                      setSearchExpanded(false);
                    }}
                    className="mt-2 inline-flex items-center text-[10px] font-sans font-semibold text-[#1c1b19] underline hover:text-[#a49a8d] transition-colors"
                  >
                    Demander le statut à l&apos;atelier
                  </Link>
                </div>
              )}

              {/* Products Section */}
              <div className="px-1 py-1">
                <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-[#a49a8d] block mb-2">
                  CATALOGUE TEXTILE
                </span>
                {isSearching ? (
                  <div className="py-6 text-center text-xs text-[#1c1b19]/50">
                    Recherche en cours...
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-1.5">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={() => {
                          setSearchDropdownOpen(false);
                          setSearchExpanded(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#faf7f2] transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-[#eee9e0] shrink-0 border border-ink/5">
                          <img
                            src={product.image || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png"}
                            alt={product.nameFr}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-[#1c1b19] truncate group-hover:text-olive transition-colors">
                            {product.nameFr}
                          </h4>
                          <p className="text-[9px] font-mono text-[#1c1b19]/50 uppercase">
                            {product.slug}
                          </p>
                        </div>
                        <div className="text-right text-xs font-medium shrink-0">
                          {formatPrice(product.basePrice).value}{" "}
                          <span className="text-[10px] text-[#1c1b19]/60">
                            {formatPrice(product.basePrice).symbol}
                          </span>
                        </div>
                      </Link>
                    ))}
                    <Link
                      href="/products"
                      onClick={() => {
                        setSearchDropdownOpen(false);
                        setSearchExpanded(false);
                      }}
                      className="block pt-2 text-center text-[10px] font-termina font-bold uppercase tracking-wider text-[#1c1b19]/60 hover:text-[#1c1b19] transition-colors"
                    >
                      VOIR TOUTES LES ÉTOFFES →
                    </Link>
                  </div>
                ) : (
                  <div className="py-4 text-center text-xs text-[#1c1b19]/50">
                    Aucun tissu trouvé pour &ldquo;{searchQuery}&rdquo;
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ============================================================ */}
      {/* 2. ACCOUNT PROFILE BUTTON (ONLY SHOWN WHEN NOT LOGGED IN) */}
      {/* ============================================================ */}
      {!isAuthenticated && (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/pro"
            className="relative flex items-center justify-center h-9 w-9 rounded-full bg-white/80 border border-[#e2ddd3] hover:border-[#cfc8bc] hover:bg-white transition-all text-[#1c1b19] shrink-0 shadow-2xs hover:shadow-xs outline-none focus:outline-none"
            aria-label="Mon Compte & Espace Pro"
            title="Connexion / Espace Pro"
          >
            <svg
              className="w-4 h-4 text-[#1c1b19]/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
        </motion.div>
      )}

      {/* ============================================================ */}
      {/* 3. PANIER BUTTON */}
      {/* ============================================================ */}
      <motion.button
        id="cart-icon"
        data-cart-icon="true"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={cartBumping ? { scale: [1, 1.25, 0.95, 1.1, 1], rotate: [0, -6, 6, -3, 0] } : {}}
        transition={{ duration: 0.45 }}
        type="button"
        onClick={openCart}
        className="relative flex items-center justify-center h-9 w-9 rounded-full bg-white/80 border border-[#e2ddd3] hover:border-[#cfc8bc] hover:bg-white transition-all text-[#1c1b19] shrink-0 cursor-pointer shadow-2xs hover:shadow-xs outline-none focus:outline-none"
        aria-label="Ouvrir le Panier"
        title="Panier"
      >
        <svg
          className="w-4 h-4 text-[#1c1b19]/80"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: [0.5, 1.35, 0.9, 1.15, 1], opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute -top-1 -right-1 bg-[#1c1b19] text-white text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center shadow-xs"
            >
              {cartCount}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* ============================================================ */}
      {/* 4. DYNAMIC CTA BUTTON vs AUTHENTICATED PROFILE BUTTON */}
      {/* STRICTLY FIXED WIDTH SO IT NEVER WIDENS / SHRINKS ON TEXT ROTATION */}
      {/* ============================================================ */}
      {isAuthenticated ? (
        /* Authenticated: Dynamic button becomes Profile pill button */
        <div ref={profileWrapperRef} className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setProfileMenuOpen((prev) => !prev)}
            className="relative overflow-hidden inline-flex items-center justify-center h-9 w-[130px] sm:w-[145px] rounded-full text-xs font-sans font-medium bg-[#1c1b19] text-[#faf8f5] hover:bg-[#2b2925] transition-all shadow-xs hover:shadow-md gap-2 shrink-0 cursor-pointer outline-none focus:outline-none"
            title="Mon Profil Pro"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span className="text-[10px] font-sans uppercase tracking-widest whitespace-nowrap truncate px-1">
              {session?.role ? `PRO ${session.role}` : "ESPACE PRO"}
            </span>
          </motion.button>

          {/* Quick Profile Popover */}
          <AnimatePresence>
            {profileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.16 }}
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#e8e4db] p-3 z-50 text-[#1c1b19]"
              >
                <div className="px-3 py-2 border-b border-[#f2eee6]">
                  <span className="text-[9px] font-termina font-bold uppercase tracking-wider text-[#a49a8d] block">
                    SESSION ACTIVE
                  </span>
                  <p className="text-xs font-semibold mt-0.5">
                    {session?.role ? `Compte ${session.role}` : "Espace Professionnel"}
                  </p>
                  <p className="text-[11px] text-emerald-600 font-medium">
                    Remise Pro active ({Math.round((session?.tradeDiscount || 0.2) * 100)}%)
                  </p>
                </div>
                <div className="mt-2 space-y-1">
                  <Link
                    href="/pro"
                    onClick={() => setProfileMenuOpen(false)}
                    className="block px-3 py-2 text-xs rounded-xl hover:bg-[#faf7f2] font-medium transition-colors"
                  >
                    Tableau de bord Pro
                  </Link>
                  <Link
                    href="/products"
                    onClick={() => setProfileMenuOpen(false)}
                    className="block px-3 py-2 text-xs rounded-xl hover:bg-[#faf7f2] transition-colors"
                  >
                    Catalogue Éditeur
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      setProfileMenuOpen(false);
                      await logout();
                      window.location.reload();
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-red-700 rounded-xl hover:bg-red-50 transition-colors font-medium"
                  >
                    Déconnexion
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Not Authenticated: Kept as the Dynamic Rotating CTA Button */
        /* FIXED WIDTH (w-[150px] sm:w-[165px]) so rotating text never changes button width! */
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            href={contactHref}
            className="relative overflow-hidden inline-flex items-center justify-center h-9 w-[150px] sm:w-[165px] px-2 rounded-full text-xs font-sans font-medium bg-[#1c1b19] text-[#faf8f5] hover:bg-[#2b2925] transition-all shadow-xs hover:shadow-md shrink-0 outline-none focus:outline-none"
            title="Demander un devis ou Contacter Kansotex"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={dynamicLabels[ctaIndex]}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="inline-flex items-center justify-center w-full whitespace-nowrap text-[10px] sm:text-[10.5px] font-sans uppercase tracking-wider text-center truncate px-1"
              >
                <span>{toTermina(dynamicLabels[ctaIndex])}</span>
              </motion.span>
            </AnimatePresence>
          </Link>
        </motion.div>
      )}
    </div>
  );
}
