"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/lib/content";

interface PDPSampleModalProps {
  productName: string;
  productSlug: string;
  selectedColor?: string;
  locale?: string;
}

export function PDPSampleModal({
  productName,
  productSlug,
  selectedColor,
  locale = "fr",
}: PDPSampleModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEn = locale === "en";

  const messageText = encodeURIComponent(
    `Bonjour Kansotex, je souhaite commander un échantillon A4 pour le tissu : ${productName} (Réf: ${productSlug}${
      selectedColor ? `, Coloris: ${selectedColor}` : ""
    }). Pouvez-vous me confirmer les modalités d'expédition ?`
  );

  const whatsappLink = `https://wa.me/212661090950?text=${messageText}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 border border-ink/20 bg-transparent text-ink font-termina text-[10px] uppercase tracking-widest py-3 px-4 hover:border-ink hover:bg-ink/5 transition-colors cursor-pointer"
      >
        <svg className="w-4 h-4 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        {isEn ? "Order A4 Fabric Sample" : "Commander un Échantillon A4"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#1a1410]/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-cream border border-ink/10 shadow-2xl p-6 sm:p-8 z-10"
            >
              <div className="flex items-start justify-between pb-3 border-b border-ink/10 mb-5">
                <div>
                  <span className="text-[9px] font-termina tracking-[0.3em] uppercase text-olive font-bold">
                    {isEn ? "Touch & Feel Service" : "Échantillonnage Matière"}
                  </span>
                  <h3 className="font-termina text-lg uppercase font-bold text-ink mt-1">
                    {isEn ? "A4 Swatch Sample" : "Échantillon A4 Kansotex"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-ink/50 hover:text-ink transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4 text-xs font-sans text-ink/80 leading-relaxed">
                <div className="bg-white/60 p-4 border border-ink/5 rounded-xs">
                  <span className="text-[9px] font-termina uppercase text-muted tracking-wider block mb-1">
                    {isEn ? "Selected Material" : "Étoffe sélectionnée"}
                  </span>
                  <p className="font-medium text-ink text-sm">
                    {productName} {selectedColor ? `— ${selectedColor}` : ""}
                  </p>
                  <span className="text-[10px] text-olive font-termina uppercase">Réf : {productSlug}</span>
                </div>

                <ul className="space-y-2 text-[11px]">
                  <li className="flex items-start gap-2">
                    <span className="text-olive font-bold">✓</span>
                    <span>
                      {isEn
                        ? "Generous A4 format with raw selvage to evaluate texture, grain, and weight."
                        : "Format A4 généreux avec lisière pour évaluer le grain, le tombé et la couleur à la lumière naturelle."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-olive font-bold">✓</span>
                    <span>
                      {isEn
                        ? "Delivery across Morocco in 24-48h (Marrakech, Casablanca, Rabat, Tanger...)."
                        : "Expédition express partout au Maroc sous 24h à 48h."}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-olive font-bold">✓</span>
                    <span>
                      {isEn
                        ? "Sample cost is fully refunded / deducted upon your main meterage order."
                        : "Montant de l'échantillon 100% déductible de votre commande finale au mètre."}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-ink/10 flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-olive text-cream text-[10px] font-termina font-bold uppercase tracking-widest py-3 px-4 text-center hover:bg-olive/90 transition-colors"
                >
                  {isEn ? "Request via WhatsApp" : "Commander via WhatsApp"}
                </a>
                <a
                  href={`mailto:${brand.email}?subject=Demande d'échantillon A4 - ${productSlug}&body=${decodeURIComponent(messageText)}`}
                  className="bg-transparent border border-ink/20 text-ink text-[10px] font-termina uppercase tracking-widest py-3 px-4 text-center hover:border-ink transition-colors"
                >
                  {isEn ? "Email" : "Par Email"}
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PDPSampleModal;
