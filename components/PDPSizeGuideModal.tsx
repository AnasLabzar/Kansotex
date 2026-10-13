"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PDPSizeGuideModalProps {
  type: "bed" | "bath" | "table";
  locale?: string;
}

export function PDPSizeGuideModal({ type, locale = "fr" }: PDPSizeGuideModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isEn = locale === "en";

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 text-[9px] font-termina uppercase tracking-[0.2em] text-ink/70 hover:text-ink underline underline-offset-4 transition-colors cursor-pointer"
      >
        <svg className="w-3.5 h-3.5 text-olive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
        {isEn ? "View Hotel Size Guide" : "Guide des Tailles Hôtelier"}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#1a1410]/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-2xl bg-cream border border-ink/10 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[85vh] z-10"
            >
              <div className="flex items-start justify-between pb-4 border-b border-ink/10 mb-6">
                <div>
                  <span className="text-[9px] font-termina tracking-[0.3em] uppercase text-olive font-bold">
                    {isEn ? "Kansotex Hospitality Reference" : "Standards Hôtellerie de Luxe"}
                  </span>
                  <h3 className="font-termina text-xl uppercase font-bold text-ink mt-1">
                    {type === "bed"
                      ? isEn ? "Bed Linen Size Guide" : "Guide des Tailles — Linge de Lit"
                      : type === "bath"
                      ? isEn ? "Bath & Spa Size Guide" : "Guide des Tailles — Linge de Bain"
                      : isEn ? "Table Linen Size Guide" : "Guide des Tailles — Linge de Table"}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-ink/50 hover:text-ink transition-colors cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {type === "bed" && (
                <div className="space-y-6 text-xs font-sans text-ink/80">
                  <p className="font-light leading-relaxed">
                    {isEn
                      ? "Our bed linen dimensions follow the strict standards of Moroccan 5-star riads and international luxury hotels. Generous tuck-in flaps (rabat bouteille) ensure neat bed making."
                      : "Nos dimensions de linge de lit respectent scrupuleusement les exigences des Riads de prestige et hôtels 5 étoiles au Maroc. Nos housses disposent de rabats généreux pour un tombé impeccable."}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-ink/20 font-termina text-[9px] uppercase tracking-wider text-ink">
                          <th className="py-2.5 pr-4">{isEn ? "Bed Size" : "Dimensions Lit"}</th>
                          <th className="py-2.5 px-4">{isEn ? "Duvet Cover" : "Housse Couette"}</th>
                          <th className="py-2.5 px-4">{isEn ? "Fitted Sheet" : "Drap Housse"}</th>
                          <th className="py-2.5 pl-4">{isEn ? "Pillowcases" : "Taies d'Oreiller"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/5 font-sans">
                        <tr>
                          <td className="py-3 pr-4 font-medium text-ink">
                            King Size <span className="text-[10px] text-muted block">180 x 200 cm / 200 x 200 cm</span>
                          </td>
                          <td className="py-3 px-4">260 x 240 cm</td>
                          <td className="py-3 px-4">180 x 200 + bonnet 35cm</td>
                          <td className="py-3 pl-4">50 x 70 cm (x2 ou x4)</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-ink">
                            Queen Size <span className="text-[10px] text-muted block">160 x 200 cm</span>
                          </td>
                          <td className="py-3 px-4">240 x 220 cm</td>
                          <td className="py-3 px-4">160 x 200 + bonnet 30cm</td>
                          <td className="py-3 pl-4">50 x 70 cm / 65 x 65 cm</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-ink">
                            Double Standard <span className="text-[10px] text-muted block">140 x 190 / 200 cm</span>
                          </td>
                          <td className="py-3 px-4">240 x 220 cm</td>
                          <td className="py-3 px-4">140 x 200 + bonnet 30cm</td>
                          <td className="py-3 pl-4">50 x 70 cm (x2)</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-ink">
                            Single / Lits Jumeaux <span className="text-[10px] text-muted block">90 x 200 cm (Twin)</span>
                          </td>
                          <td className="py-3 px-4">160 x 200 cm</td>
                          <td className="py-3 px-4">90 x 200 + bonnet 30cm</td>
                          <td className="py-3 pl-4">50 x 70 cm (x1)</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="bg-white/60 border border-ink/5 p-4 rounded-xs text-[11px] leading-relaxed">
                    <strong className="font-termina uppercase text-[9px] text-olive tracking-wider block mb-1">
                      {isEn ? "Bespoke Hotel Mattresses?" : "Literie sur-mesure pour votre Riad ?"}
                    </strong>
                    {isEn
                      ? "Custom dimensions (oversized King, circular beds, custom mattress depths) are crafted upon request at our Marrakech workshop."
                      : "Notre manufacture à Marrakech confectionne également des formats sur-mesure pour literies spécifiques et surmatelas épais (bonnets de 40 cm sur demande)."}
                  </div>
                </div>
              )}

              {type === "bath" && (
                <div className="space-y-6 text-xs font-sans text-ink/80">
                  <p className="font-light leading-relaxed">
                    {isEn
                      ? "Kansotex bath linens offer 600 g/m² combed cotton density, providing luxury resort absorption and cloud-soft hand feel."
                      : "Notre linge de bain 600 g/m² en coton peigné allie moelleux enveloppant et séchage rapide, parfaitement adapté aux spas et riads."}
                  </p>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-ink/20 font-termina text-[9px] uppercase tracking-wider text-ink">
                          <th className="py-2.5 pr-4">{isEn ? "Piece" : "Pièce"}</th>
                          <th className="py-2.5 px-4">{isEn ? "Dimensions" : "Dimensions"}</th>
                          <th className="py-2.5 px-4">{isEn ? "Grammage" : "Densité / Poids"}</th>
                          <th className="py-2.5 pl-4">{isEn ? "Usage" : "Usage préconisé"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-ink/5 font-sans">
                        <tr>
                          <td className="py-3 pr-4 font-medium text-ink">{isEn ? "Bath Sheet" : "Drap de Bain Spa"}</td>
                          <td className="py-3 px-4">100 x 150 cm</td>
                          <td className="py-3 px-4">600 g/m²</td>
                          <td className="py-3 pl-4">{isEn ? "Full body wrap & pool lounger" : "Sortie de douche, spa & transats"}</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-ink">{isEn ? "Bath Towel" : "Serviette de Toilette"}</td>
                          <td className="py-3 px-4">50 x 100 cm</td>
                          <td className="py-3 px-4">600 g/m²</td>
                          <td className="py-3 pl-4">{isEn ? "Face & hair drying" : "Visage & cheveux"}</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-ink">{isEn ? "Guest Towel" : "Serviette Invité"}</td>
                          <td className="py-3 px-4">30 x 50 cm</td>
                          <td className="py-3 px-4">550 g/m²</td>
                          <td className="py-3 pl-4">{isEn ? "Powder rooms & riad lavatories" : "Espaces vasques & toilettes invités"}</td>
                        </tr>
                        <tr>
                          <td className="py-3 pr-4 font-medium text-ink">{isEn ? "Bathrobe Velour" : "Peignoir Spa Velours"}</td>
                          <td className="py-3 px-4">M / L / XL</td>
                          <td className="py-3 px-4">420 g/m²</td>
                          <td className="py-3 pl-4">{isEn ? "Spa & suite relaxation" : "Suites, hammam & détente"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {type === "table" && (
                <div className="space-y-4 text-xs font-sans text-ink/80">
                  <p className="font-light leading-relaxed">
                    {isEn
                      ? "Recommendation: Calculate a 20 to 30 cm overhang on each side of the table for an elegant, fluid drape."
                      : "Conseil de dressage : Prévoyez une retombée de 20 à 30 cm de chaque côté de la table pour un tombé fluide et noble."}
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Table 4 à 6 couverts :</strong> Nappe 150 x 250 cm</li>
                    <li><strong>Table 8 à 10 couverts :</strong> Nappe 170 x 300 cm</li>
                    <li><strong>Table 12 couverts & banquets :</strong> Nappe 180 x 360 cm (ou sur-mesure)</li>
                    <li><strong>Serviettes de table :</strong> 45 x 45 cm</li>
                  </ul>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-ink/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-ink text-cream text-[10px] font-termina uppercase tracking-widest px-6 py-2.5 hover:bg-ink/80 transition-colors cursor-pointer"
                >
                  {isEn ? "Close Guide" : "Fermer le Guide"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PDPSizeGuideModal;
