"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Wordmark } from "./Logo";
import { nav } from "@/lib/content";
import { useCart } from "@/lib/CartContext";
import { useSession } from "@/lib/SessionContext";
import { logout } from "@/lib/session";

type HeaderProps = {
  overlay?: boolean;
};

export function Header({ overlay = false }: HeaderProps) {
  const pathname = usePathname();
  const { openCart, cartCount } = useCart();
  const { session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
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
  }, [pathname]);

  const compact = scrolled || !overlay;
  const bar = compact
    ? "bg-[#f3eee6]/95 text-[#1c1b19] shadow-[0_1px_0_rgba(28,27,25,0.06)] backdrop-blur-md"
    : "bg-transparent text-[#f3eee6]";

  const headerTransform = hidden && !open ? "-translate-y-full" : "translate-y-0";

  const transformClass = menuOrigin === "left"
    ? open ? "translate-x-0" : "-translate-x-8 md:-translate-x-full" // slide from left
    : open ? "translate-x-0" : "translate-x-8 md:translate-x-full"; // slide from right

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${bar} ${headerTransform}`}>
        {compact ? (
          <div className="flex items-center justify-between gap-4 px-5 py-2 md:px-8 overflow-hidden">
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
              {nav.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  active={pathname.startsWith(item.href)}
                />
              ))}
            </nav>
            <div className="flex items-center gap-6">
              {session?.isPro && (
                <button 
                  onClick={async () => {
                    await logout();
                    window.location.reload();
                  }}
                  className="hidden lg:block text-[8px] uppercase tracking-widest font-termina bg-red-900/10 text-red-900 px-2 py-1 rounded-sm hover:bg-red-900/20 transition-colors"
                >
                  Déconnexion B2B
                </button>
              )}
              <button aria-label="Recherche" className="transition-opacity hover:opacity-70">
                <SearchIcon className="h-[18px] w-[18px]" />
              </button>
              <Link href="/pro" aria-label="Compte" className="hidden transition-opacity hover:opacity-70 sm:block">
                <UserIcon className="h-[18px] w-[18px]" />
              </Link>
              <button id="cart-icon" aria-label="Panier" onClick={openCart} className="relative transition-opacity hover:opacity-70">
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
                      className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#1c1b19] text-[9px] text-[#f3eee6]"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <MenuButton open={open} onClick={() => { setMenuOrigin("right"); setOpen((v) => !v); }} />
            </div>
          </div>
        ) : (
          <>
            {/* Mobile Overlay Header (Maison Nicole style) */}
            <div className="flex items-center justify-between px-6 py-8 md:hidden">
              <button 
                onClick={() => { setMenuOrigin("left"); setOpen((v) => !v); }}
                className="font-termina text-[11px] font-bold uppercase tracking-widest hover:opacity-70"
              >
                Menu
              </button>
              <Link
                href="/contact"
                className="font-termina text-[11px] font-bold uppercase tracking-widest hover:opacity-70"
              >
                Contact
              </Link>
            </div>

            {/* Desktop Overlay Header (Original) */}
            <nav className="hidden grid-cols-4 gap-y-2 px-10 py-5 md:grid">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-termina text-center text-[10px] font-bold uppercase tracking-[0.32em] hover:opacity-70"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </>
        )}
      </header>

      {/* Mobile Menu Overlay - Moved OUTSIDE header to fix stacking context issues on scroll */}
      <div 
        className={`fixed inset-0 z-[60] flex flex-col bg-[#1c1b19] px-8 pb-10 pt-24 text-[#f3eee6] transition-all duration-500 ease-out md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } ${transformClass}`}
      >
        <button
          type="button"
          className="absolute right-6 top-6 text-[11px] uppercase tracking-[0.28em] hover:opacity-70"
          onClick={() => setOpen(false)}
        >
          Fermer
        </button>
        <ul className="mt-8 space-y-8 px-6 flex-1">
          <li>
            <Link href="/" className="font-termina text-2xl font-bold uppercase tracking-widest text-[#f3eee6]" onClick={() => setOpen(false)}>
              ACCUEIL
            </Link>
          </li>
          {nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="font-termina text-2xl font-bold uppercase tracking-widest text-[#f3eee6]" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Menu Bottom Details */}
        <div className="px-6 pb-6 pt-10 border-t border-[#f3eee6]/15 flex flex-col gap-3">
          <a href="mailto:contact@kansotex.com" className="font-termina text-[9px] font-bold uppercase tracking-[0.25em] text-[#f3eee6]/70 hover:text-[#f3eee6] transition-colors">
            CONTACT@KANSOTEX.COM
          </a>
          <p className="font-termina text-[9px] font-bold uppercase tracking-[0.25em] text-[#f3eee6]/70">
            MARRAKECH, MAROC
          </p>
          <div className="mt-4 flex gap-6">
            <a href="#" className="font-termina text-[9px] font-bold uppercase tracking-[0.25em] text-[#f3eee6]/70 hover:text-[#f3eee6] transition-colors">INSTAGRAM</a>
            <a href="#" className="font-termina text-[9px] font-bold uppercase tracking-[0.25em] text-[#f3eee6]/70 hover:text-[#f3eee6] transition-colors">FACEBOOK</a>
          </div>
        </div>
      </div>
    </>
  );
}

function MenuButton({ open, onClick }: { open: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      className="relative z-50 flex h-6 w-6 flex-col items-center justify-center gap-1.5 md:hidden"
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
      {label}
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
