"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface SubMenuItem {
  href: string;
  labelFr: string;
  labelEn: string;
  subtitleFr?: string;
  subtitleEn?: string;
  badge?: string;
}

interface MenuItem {
  key: string;
  href: string;
  labelFr: string;
  labelEn: string;
  children?: SubMenuItem[];
}

interface LuxuryMenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LuxuryMenuOverlay({ isOpen, onClose }: LuxuryMenuOverlayProps) {
  const pathname = usePathname();
  const router = useRouter();

  // Determine active locale from pathname
  const currentLocale = pathname?.startsWith("/en") ? "en" : "fr";
  const isEn = currentLocale === "en";

  // State to track open/closed sub-menus
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    univers: false,
    blog: false,
    savoir: false,
    pro: false,
    about: false,
  });

  // Lock body scroll when menu overlay is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Auto-expand the active section if matches
      if (pathname) {
        if (pathname.includes("/univers") || pathname.includes("/products")) {
          setExpandedMenus((prev) => ({ ...prev, univers: true }));
        } else if (pathname.includes("/blog")) {
          setExpandedMenus((prev) => ({ ...prev, blog: true }));
        } else if (pathname.includes("/savoir-faire") || pathname.includes("/gallery")) {
          setExpandedMenus((prev) => ({ ...prev, savoir: true }));
        } else if (pathname.includes("/pro")) {
          setExpandedMenus((prev) => ({ ...prev, pro: true }));
        } else if (pathname.includes("/a-propos")) {
          setExpandedMenus((prev) => ({ ...prev, about: true }));
        }
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, pathname]);

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

  // Clean pathname for active link comparison (strip /fr or /en prefix)
  const cleanPath = pathname ? pathname.replace(/^\/(fr|en)(\/|$)/, "/") || "/" : "/";

  const getLocalizedHref = (href: string) => {
    // Preserve query strings or hashes
    const [pathPart, queryOrHash] = href.split(/(?=[?#])/);
    const localized = pathPart === "/" ? `/${currentLocale}` : `/${currentLocale}${pathPart}`;
    return queryOrHash ? `${localized}${queryOrHash}` : localized;
  };

  const handleLanguageChange = (newLocale: string) => {
    let current = pathname || "/";
    if (current.startsWith("/en/") || current === "/en") {
      current = current.replace(/^\/en/, "");
    } else if (current.startsWith("/fr/") || current === "/fr") {
      current = current.replace(/^\/fr/, "");
    }
    if (current === "") current = "/";
    const target = newLocale === "fr" ? current : `/${newLocale}${current === "/" ? "" : current}`;
    window.location.href = target;
  };

  const toggleSubMenu = (key: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const menuArchitecture: MenuItem[] = [
    {
      key: "home",
      href: "/",
      labelFr: "ACCUEIL",
      labelEn: "HOME",
    },
    {
      key: "univers",
      href: "/univers",
      labelFr: "NOS UNIVERS",
      labelEn: "OUR UNIVERSES",
      children: [
        {
          href: "/products",
          labelFr: "Tous les Produits & Tissus",
          labelEn: "All Products & Fabrics",
          subtitleFr: "Catalogue complet, filtres de couleur & propriétés",
          subtitleEn: "Full catalog, color filters & technical specs",
        },
        {
          href: "/univers/indoor",
          labelFr: "Indoor & Salons",
          labelEn: "Indoor & Living Spaces",
          subtitleFr: "Tissus d'ameublement, voilages & textures de caractère",
          subtitleEn: "Upholstery textiles, sheers & architectural drapes",
        },
        {
          href: "/univers/outdoor",
          labelFr: "Outdoor & Terrasses",
          labelEn: "Outdoor & Terraces",
          subtitleFr: "Toiles déperlantes, banquettes riad & résistance UV 8/8",
          subtitleEn: "Water-repellent, riad seating & UV Grade 8/8",
        },
        {
          href: "/univers/linge-de-maison",
          labelFr: "Linge de Maison",
          labelEn: "Table & Home Linen",
          subtitleFr: "Nappes pur lin, chemins de table & plaids de réception",
          subtitleEn: "Pure linen tablecloths, table runners & throws",
        },
        {
          href: "/univers/linge-de-lit",
          labelFr: "Linge de Lit",
          labelEn: "Bed Linen",
          subtitleFr: "Draps, housses & taies en lin lavé et percale d'hôtel",
          subtitleEn: "Washed linen & hotel-grade percale duvet sets",
        },
        {
          href: "/univers/linge-de-bain",
          labelFr: "Linge de Bain",
          labelEn: "Bath Linen",
          subtitleFr: "Serviettes denses 650g/m², peignoirs & tapis de bain",
          subtitleEn: "Dense 650g/m² towels, bathrobes & plush bath mats",
        },
        {
          href: "/univers/tissus-haut-de-gamme",
          labelFr: "Tissus Haute Facture",
          labelEn: "Haute Facture Fabrics",
          subtitleFr: "Velours de Gênes, soieries rares & tissages précieux",
          subtitleEn: "Genoa velvets, rare silks & heritage luxury weaves",
          badge: "LUXE",
        },
      ],
    },
    {
      key: "blog",
      href: "/blog",
      labelFr: "LE JOURNAL",
      labelEn: "THE JOURNAL",
      children: [
        {
          href: "/blog",
          labelFr: "Tous les Dossiers & Guides",
          labelEn: "All Articles & Guides",
          subtitleFr: "Analyses de matière, formules de coupe & tendances",
          subtitleEn: "Material dossiers, cutting formulas & design trends",
        },
        {
          href: "/blog?category=outdoor",
          labelFr: "Outdoor & Terrasses",
          labelEn: "Outdoor & Terraces",
          subtitleFr: "Résistance UV 8/8, toiles déperlantes & mousse QuickDry",
          subtitleEn: "UV 8/8 protection, Teflon finishes & QuickDry foam",
        },
        {
          href: "/blog?category=matieres",
          labelFr: "Matières Nobles",
          labelEn: "Noble Materials",
          subtitleFr: "Lin belge, velours peigné de Guéliz & soieries de riad",
          subtitleEn: "Belgian linen, combed velvet & riad silk weaves",
        },
        {
          href: "/blog?category=guides",
          labelFr: "Guides & Mesures",
          labelEn: "Guides & Measurements",
          subtitleFr: "Formules de métrage rideaux, retraits & ourlets d'art",
          subtitleEn: "Curtain yardage formulas, shrinkage & artisan hems",
        },
        {
          href: "/blog?category=architecture",
          labelFr: "Architecture & Riads",
          labelEn: "Architecture & Riads",
          subtitleFr: "Inspirations médina, palais d'hôtes & villas de l'Atlas",
          subtitleEn: "Medina riad inspirations, luxury villas & palaces",
        },
        {
          href: "/blog/studio",
          labelFr: "Studio Éditorial IA",
          labelEn: "Autonomous AI Studio",
          subtitleFr: "Cockpit multi-agents, radar concurrentiel & cadence 2-4j",
          subtitleEn: "Multi-agent cockpit, competitor gap radar & cadence",
          badge: "PRO",
        },
      ],
    },
    {
      key: "savoir",
      href: "/savoir-faire",
      labelFr: "NOTRE SAVOIR-FAIRE",
      labelEn: "OUR EXPERTISE",
      children: [
        {
          href: "/savoir-faire",
          labelFr: "La Manufacture de Marrakech",
          labelEn: "The Marrakech Manufacture",
          subtitleFr: "25 ans de tradition artisanale et d'ingénierie textile",
          subtitleEn: "25 years of master craftsmanship & textile engineering",
        },
        {
          href: "/savoir-faire#sur-mesure",
          labelFr: "Confection & Sur-Mesure",
          labelEn: "Bespoke Confection",
          subtitleFr: "Plissage manuel, finitions d'artisan & passementerie",
          subtitleEn: "Hand pleating, bespoke finishes & Moroccan trimmings",
        },
        {
          href: "/gallery",
          labelFr: "Galerie de Réalisations",
          labelEn: "Showcase Gallery",
          subtitleFr: "Portfolios de projets hôteliers, résidences & riads",
          subtitleEn: "Hospitality portfolios, private estates & riads",
        },
      ],
    },
    {
      key: "pro",
      href: "/pro",
      labelFr: "ESPACE PRO & ARCHITECTES",
      labelEn: "PRO & ARCHITECTURE SPACE",
      children: [
        {
          href: "/pro",
          labelFr: "Portail Prescription B2B",
          labelEn: "B2B Trade Portal",
          subtitleFr: "Accompagnement hôteliers, architectes & décorateurs",
          subtitleEn: "Dedicated support for architects, riads & designers",
        },
        {
          href: "/products",
          labelFr: "Calculateur de Métrage",
          labelEn: "Yardage Calculator",
          subtitleFr: "Estimation instantanée pour rideaux, assises & coussins",
          subtitleEn: "Instant yardage formula for curtains & seating",
        },
        {
          href: "/contact?subject=echantillons",
          labelFr: "Demande d'Échantillons",
          labelEn: "Sample Swatch Kit",
          subtitleFr: "Envoi express de liasses et nuanciers textiles",
          subtitleEn: "Express delivery of textile swatches to your studio",
        },
        {
          href: "/contact?subject=devis",
          labelFr: "Étude Technique & Devis",
          labelEn: "Technical Study & Quote",
          subtitleFr: "Chiffrage et conseil de confection sous 24h ouvrées",
          subtitleEn: "Fast technical estimates and guidance within 24h",
        },
      ],
    },
    {
      key: "about",
      href: "/a-propos",
      labelFr: "A PROPOS DE NOUS",
      labelEn: "ABOUT US",
      children: [
        {
          href: "/a-propos",
          labelFr: "Histoire & Vision",
          labelEn: "Heritage & Vision",
          subtitleFr: "De l'atelier artisanal à la référence textile du Maroc",
          subtitleEn: "From family atelier to Morocco's textile benchmark",
        },
        {
          href: "/a-propos#piliers",
          labelFr: "Nos 3 Piliers Fondateurs",
          labelEn: "Our 3 Core Pillars",
          subtitleFr: "Exigence de la matière, in & outdoor, accompagnement",
          subtitleEn: "Material excellence, in & outdoor, project support",
        },
      ],
    },
    {
      key: "contact",
      href: "/contact",
      labelFr: "NOUS CONTACTER",
      labelEn: "CONTACT US",
    },
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
          className="fixed inset-0 z-[100] flex flex-col bg-[#141413] px-5 sm:px-10 pb-8 pt-12 sm:pt-14 text-[#faf8f5] shadow-2xl"
        >
          {/* Top Bar inside Overlay */}
          <div className="max-w-3xl mx-auto w-full flex items-center justify-between pb-6 border-b border-white/15">
            {/* Logo */}
            <Link
              href={getLocalizedHref("/")}
              onClick={onClose}
              aria-label="Kansotex"
              className="shrink-0 flex items-center group"
            >
              <Image
                src="/KANSOTEX-marque-1-white.png"
                alt="Kansotex"
                width={500}
                height={120}
                className="w-[130px] sm:w-[155px] h-auto object-contain group-hover:opacity-90 transition-opacity"
                priority
              />
            </Link>

            {/* Language Switcher + Close Button */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Language Switcher (FR / EN) */}
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-white">
                <button
                  type="button"
                  onClick={() => handleLanguageChange("fr")}
                  className={`transition-colors cursor-pointer ${
                    !isEn ? "text-[#B8860B] font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  FR
                </button>
                <span className="text-white/30 text-[10px]">|</span>
                <button
                  type="button"
                  onClick={() => handleLanguageChange("en")}
                  className={`transition-colors cursor-pointer ${
                    isEn ? "text-[#B8860B] font-bold" : "text-white/60 hover:text-white"
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="text-xs uppercase tracking-widest font-sans font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-2 py-1.5 px-3 rounded-full hover:bg-white/10 cursor-pointer border border-transparent hover:border-white/15"
                aria-label={isEn ? "Close menu" : "Fermer le menu"}
              >
                <span>{isEn ? "CLOSE" : "FERMER"}</span>
                <span className="text-sm">✕</span>
              </button>
            </div>
          </div>

          {/* Navigation Links with Nested Children Accordions */}
          <div className="mt-6 sm:mt-8 flex-1 max-w-3xl mx-auto w-full overflow-y-auto no-scrollbar pr-1">
            <ul className="space-y-4 sm:space-y-5">
              {menuArchitecture.map((item) => {
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = Boolean(expandedMenus[item.key]);
                const active = isItemActive(item.href);

                return (
                  <li
                    key={item.key}
                    className="border-b border-white/5 pb-3 sm:pb-4 last:border-b-0"
                  >
                    {/* Top Level Item Row */}
                    <div className="flex items-center justify-between gap-3 group">
                      <Link
                        href={getLocalizedHref(item.href)}
                        onClick={() => {
                          if (!hasChildren) onClose();
                        }}
                        className={`font-sans text-lg sm:text-2xl font-extrabold uppercase tracking-[0.06em] py-1 transition-colors flex-1 flex items-center gap-3 ${
                          active
                            ? "text-[#B8860B]"
                            : "text-[#faf8f5] group-hover:text-[#d8cbb6]"
                        }`}
                      >
                        <span>{isEn ? item.labelEn : item.labelFr}</span>
                        {active && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[#B8860B]" />
                        )}
                      </Link>

                      {/* Expand / Collapse Button if children exist */}
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleSubMenu(item.key)}
                          className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all cursor-pointer ${
                            isExpanded
                              ? "bg-[#B8860B] border-[#B8860B] text-[#141413]"
                              : "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                          }`}
                          aria-label={
                            isExpanded
                              ? isEn
                                ? `Collapse ${item.labelEn}`
                                : `Réduire ${item.labelFr}`
                              : isEn
                              ? `Expand ${item.labelEn}`
                              : `Développer ${item.labelFr}`
                          }
                        >
                          <span
                            className={`text-sm transition-transform duration-300 font-bold ${
                              isExpanded ? "rotate-90" : "rotate-0"
                            }`}
                          >
                            ›
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Children Sub-Menu Accordion */}
                    {hasChildren && (
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <ul className="mt-3.5 mb-2 ml-2 sm:ml-3 pl-4 sm:pl-6 border-l border-white/15 space-y-3">
                              {item.children!.map((child) => {
                                const childActive = pathname?.includes(child.href.split("?")[0].split("#")[0]) && child.href !== "/products";

                                return (
                                  <li key={child.href}>
                                    <Link
                                      href={getLocalizedHref(child.href)}
                                      onClick={onClose}
                                      className="group block py-1 transition-all"
                                    >
                                      <div className="flex items-center justify-between gap-2">
                                        <span
                                          className={`font-sans text-xs sm:text-sm font-semibold tracking-wide transition-colors group-hover:text-[#B8860B] group-hover:translate-x-1 duration-200 inline-flex items-center gap-1.5 ${
                                            childActive
                                              ? "text-[#B8860B]"
                                              : "text-white/90"
                                          }`}
                                        >
                                          <span>{isEn ? child.labelEn : child.labelFr}</span>
                                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-[#B8860B]">
                                            →
                                          </span>
                                        </span>

                                        {child.badge && (
                                          <span className="text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-[#B8860B]/20 text-[#B8860B] border border-[#B8860B]/30 shrink-0">
                                            {child.badge}
                                          </span>
                                        )}
                                      </div>

                                      {(child.subtitleFr || child.subtitleEn) && (
                                        <p className="text-[11px] text-white/50 font-light mt-0.5 line-clamp-1 group-hover:text-white/70 transition-colors">
                                          {isEn ? child.subtitleEn : child.subtitleFr}
                                        </p>
                                      )}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Footer Information inside Drawer */}
          <div className="px-1 pt-5 sm:pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-3xl mx-auto w-full text-xs text-white/60 font-sans">
            <div>
              <div className="flex items-center gap-3">
                <a
                  href="mailto:contact@kansotex.com"
                  className="hover:text-white font-medium transition-colors"
                >
                  contact@kansotex.com
                </a>
                <span className="text-white/20">·</span>
                <a
                  href="tel:+212524200996"
                  className="hover:text-white font-medium transition-colors"
                >
                  +212 5 24 20 09 96
                </a>
              </div>
              <p className="mt-1 text-[11px] text-white/45">
                983 Al Massar, Marrakech · {isEn ? "Manufacture & Showroom" : "Manufacture & Showroom"}
              </p>
            </div>

            <div className="flex items-center gap-5 text-[11px] tracking-wider uppercase text-white/60 pt-1 sm:pt-0">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.pinterest.com/kansotex"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Pinterest
              </a>
              <Link
                href={getLocalizedHref("/pro")}
                onClick={onClose}
                className="hover:text-[#B8860B] transition-colors font-semibold text-[#B8860B]"
              >
                {isEn ? "Trade B2B →" : "Espace B2B →"}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
