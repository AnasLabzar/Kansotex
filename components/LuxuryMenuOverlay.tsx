"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface LuxuryMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LuxuryMenuOverlay({ isOpen, onClose }: LuxuryMenuOverlayProps) {
  const pathname = usePathname();

  // Lock body scroll when menu overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Determine active locale from pathname
  const currentLocale = pathname?.startsWith("/en") ? "en" : "fr";
  const isEn = currentLocale === "en";

  // Clean pathname for active link comparison (strip /fr or /en prefix)
  const cleanPath = pathname ? pathname.replace(/^\/(fr|en)(\/|$)/, "/") || "/" : "/";

  const getLocalizedHref = (href: string) => {
    return href === "/" ? `/${currentLocale}` : `/${currentLocale}${href}`;
  };

  const navItems = isEn
    ? [
        { href: "/", label: "HOME" },
        { href: "/univers", label: "OUR UNIVERSES" },
        { href: "/savoir-faire", label: "OUR EXPERTISE" },
        { href: "/blog", label: "THE JOURNAL" },
        { href: "/a-propos", label: "ABOUT US" },
        { href: "/pro", label: "ARCHITECTURE & PRO SPACE" },
        { href: "/contact", label: "CONTACT US" },
      ]
    : [
        { href: "/", label: "ACCUEIL" },
        { href: "/univers", label: "NOS UNIVERS" },
        { href: "/savoir-faire", label: "NOTRE SAVOIR-FAIRE" },
        { href: "/blog", label: "LE JOURNAL" },
        { href: "/a-propos", label: "A PROPOS DE NOUS" },
        { href: "/pro", label: "ESPACE ARCHITECTURE & PRO" },
        { href: "/contact", label: "NOUS CONTACTER" },
      ];

  const isItemActive = (href: string) => {
    if (href === "/") {
      return cleanPath === "/" || cleanPath === "";
    }
    return cleanPath.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col bg-[#141413] px-6 sm:px-10 pb-10 pt-16 text-[#faf8f5]"
        >
          {/* Top Bar inside Overlay */}
          <div className="max-w-2xl mx-auto w-full flex items-center justify-between pb-7 border-b border-white/15">
            <Link href={getLocalizedHref("/")} onClick={onClose} aria-label="Kansotex" className="shrink-0 flex items-center">
              <Image
                src="/KANSOTEX-marque-1-white.png"
                alt="Kansotex"
                width={500}
                height={120}
                className="w-[140px] sm:w-[160px] h-auto object-contain"
                priority
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="text-xs uppercase tracking-widest font-sans text-white/70 hover:text-white transition-colors flex items-center gap-2 py-1 px-2.5 rounded-full hover:bg-white/10 cursor-pointer"
              aria-label={isEn ? "Close menu" : "Fermer le menu"}
            >
              <span>{isEn ? "CLOSE" : "FERMER"}</span>
              <span className="text-sm">✕</span>
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="mt-8 sm:mt-10 space-y-6 sm:space-y-7 px-2 flex-1 max-w-2xl mx-auto w-full overflow-y-auto">
            {navItems.map((item) => {
              const active = isItemActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={getLocalizedHref(item.href)}
                    onClick={onClose}
                    className={`font-termina text-xl sm:text-3xl font-bold uppercase tracking-widest block py-1 transition-colors ${
                      active
                        ? "text-[#d8cbb6]"
                        : "text-[#faf8f5] hover:text-[#d8cbb6]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Footer Information inside Drawer */}
          <div className="px-2 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 max-w-2xl mx-auto w-full text-xs text-white/60 font-sans">
            <div>
              <a href="mailto:contact@kansotex.com" className="hover:text-white transition-colors block">
                contact@kansotex.com
              </a>
              <p className="mt-0.5">983 Al Massar, Marrakech · +212 5 24 20 09 96</p>
            </div>
            <div className="flex gap-4 text-[11px] tracking-wider uppercase text-white/50 pt-2 sm:pt-0">
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                INSTAGRAM
              </a>
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
              >
                FACEBOOK
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
