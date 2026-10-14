"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { nav } from "@/lib/content";
import { useCart } from "@/lib/CartContext";
import { useSession } from "@/lib/SessionContext";
import { logout } from "@/lib/session";
import { SearchBar } from "./SearchBar";
import { CurrencySelector } from "./CurrencySelector";
import { NavbarRightActions } from "./NavbarRightActions";
import { LuxuryMenuOverlay } from "./LuxuryMenuOverlay";
import { useTranslations } from "next-intl";
import { removeAccents } from "@/lib/text";

type HeaderProps = {
  overlay?: boolean;
};

export function Header({ overlay = false }: HeaderProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { openCart, cartCount } = useCart();
  const { session } = useSession();
  const t = useTranslations("Header");
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState<"left" | "right">("right");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 90);
      
      // Hide header when reaching near the footer
      const scrollPosition = window.scrollY + window.innerHeight;
      const threshold = document.documentElement.scrollHeight - 200; // 200px from bottom
      if (scrollPosition > threshold) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const compact = scrolled || !overlay;
  const bar = compact
    ? "bg-cream/95 text-ink shadow-[0_1px_0_rgba(28,27,25,0.06)] backdrop-blur-md"
    : "bg-transparent text-[#f3eee6]";

  const headerTransform = hidden && !open ? "-translate-y-full" : "translate-y-0";

  const transformClass = menuOrigin === "left"
    ? open ? "translate-x-0" : "-translate-x-8 -translate-x-full" // slide from left
    : open ? "translate-x-0" : "translate-x-8 translate-x-full"; // slide from right

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${bar} ${headerTransform}`}>
        {compact ? (
          isHome ? (
            /* --- HOME PAGE COMPACT HEADER --- */
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between gap-4 py-2 w-full overflow-hidden">
              <Link href="/" aria-label="Kansotex" className="-ml-2 md:-ml-3 shrink-0">
                <Image 
                  src="/KANSOTEX-marque-Black.png" 
                  alt="Kansotex" 
                  width={500} 
                  height={120} 
                  className="w-[160px] sm:w-[200px] h-auto md:w-auto md:h-[70px] object-contain" 
                  priority 
                />
              </Link>
              <nav className="hidden items-center gap-8 md:flex">
                {nav.map((item) => {
                  let translationKey = "navUnivers";
                  if (item.href === "/savoir-faire") translationKey = "navSavoirFaire";
                  if (item.href === "/blog") translationKey = "navJournal";
                  if (item.href === "/a-propos") translationKey = "navAbout";
                  if (item.href === "/contact") translationKey = "navContact";
                  return (
                    <NavItem
                      key={item.href}
                      href={item.href}
                      label={(t as any)(translationKey)}
                      active={pathname.startsWith(item.href)}
                    />
                  );
                })}
              </nav>
              <div className="flex items-center gap-3">
                <NavbarRightActions />
                <MenuButton open={open} onClick={() => { setMenuOrigin("right"); setOpen((v) => !v); }} />
              </div>
            </div>
          ) : (
            /* --- OTHER PAGES MINIMAL HEADER --- */
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-[70px] relative w-full">
              {/* Left: Burger Menu (Always visible) */}
              <div className="flex items-center justify-start z-10">
                <MenuButton open={open} onClick={() => { setMenuOrigin("left"); setOpen((v) => !v); }} forceVisible={true} />
              </div>

              {/* Center: Logo */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <Link href="/" aria-label="Kansotex" className="pointer-events-auto shrink-0 flex items-center justify-center">
                  <Image 
                    src="/KANSOTEX-marque-Black.png" 
                    alt="Kansotex" 
                    width={500} 
                    height={120} 
                    className="w-[140px] sm:w-[160px] h-auto object-contain" 
                    priority 
                  />
                </Link>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center justify-end z-10">
                <NavbarRightActions />
              </div>
            </div>
          )
        ) : (
          /* --- TRANSPARENT OVERLAY (Usually only on Home Top) --- */
          <>
            <div className="flex items-center justify-between px-6 py-8 md:hidden">
              <button 
                onClick={() => { setMenuOrigin("left"); setOpen((v) => !v); }}
                className="font-termina text-[11px] font-bold uppercase tracking-widest hover:opacity-70"
              >
                {removeAccents(t("menu"))}
              </button>
              <Link
                href="/contact"
                className="font-termina text-[11px] font-bold uppercase tracking-widest hover:opacity-70"
              >
                {removeAccents(t("contact"))}
              </Link>
            </div>
            <nav className="hidden grid-cols-4 gap-y-2 px-10 py-5 md:grid">
              {nav.map((item) => {
                let translationKey = "navUnivers";
                if (item.href === "/savoir-faire") translationKey = "navSavoirFaire";
                if (item.href === "/a-propos") translationKey = "navAbout";
                if (item.href === "/contact") translationKey = "navContact";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="font-termina text-center text-[10px] font-bold uppercase tracking-[0.32em] hover:opacity-70"
                  >
                    {removeAccents((t as any)(translationKey))}
                  </Link>
                );
              })}
            </nav>
          </>
        )}
      </header>

      {/* Search Overlay Dropdown (Desktop) */}
      <AnimatePresence>
        {searchOpen && (
          <>
            {/* Backdrop to close when clicking outside */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/5"
              onClick={() => setSearchOpen(false)}
            />
            {/* Search Dropdown Panel */}
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[70px] md:top-[80px] right-4 md:right-12 w-full max-w-[380px] z-[70] bg-cream shadow-2xl border border-ink/10 rounded-sm overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b border-ink/5 flex justify-between items-center bg-[#f8f5f0]">
                <span className="text-[10px] font-termina uppercase tracking-widest text-ink/50">{removeAccents(t("quickSearch"))}</span>
                <button onClick={() => setSearchOpen(false)} className="text-ink/50 hover:text-ink transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div className="w-full">
                <SearchBar autoFocus={true} absoluteResults={false} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Luxury Full Screen Menu Overlay */}
      <LuxuryMenuOverlay isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

function MenuButton({ open, onClick, forceVisible = false }: { open: boolean; onClick: () => void; forceVisible?: boolean }) {
  return (
    <button
      type="button"
      className={`relative z-50 flex h-6 w-6 flex-col items-center justify-center gap-1.5 ${forceVisible ? "" : "md:hidden"}`}
      onClick={onClick}
      aria-expanded={open}
      aria-label="Menu"
    >
      <span
        className={`block h-[1px] w-5 bg-current transition-all duration-300 ease-out ${
          open ? "translate-y-[7px] rotate-45" : ""
        }`}
      />
      <span
        className={`block h-[1px] w-5 bg-current transition-all duration-300 ease-out ${
          open ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block h-[1px] w-5 bg-current transition-all duration-300 ease-out ${
          open ? "-translate-y-[7px] -rotate-45" : ""
        }`}
      />
    </button>
  );
}

function CartButton({ cartCount, openCart }: { cartCount: number, openCart: () => void }) {
  return (
    <button aria-label="Panier" onClick={openCart} className="relative transition-opacity hover:opacity-70">
      <CartIcon className="h-[18px] w-[18px]" />
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.span 
            key={cartCount}
            initial={{ y: -20, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 15,
              mass: 0.8
            }}
            className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-ink text-[9px] text-cream"
          >
            {cartCount}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`font-termina text-[10px] font-bold uppercase tracking-[0.28em] transition-opacity hover:opacity-70 ${
        active ? "underline underline-offset-8 decoration-[0.6px]" : ""
      }`}
    >
      {removeAccents(label)}
    </Link>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  );
}

function UserIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

function CartIcon({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" className={className}>
      <circle cx="9" cy="21" r="1.5"></circle><circle cx="20" cy="21" r="1.5"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );
}
