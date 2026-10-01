"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type MetrageCalculatorProps = {
  laize?: number | null;
  raccordV?: number | null;
  raccordH?: number | null;
  onApply: (quantity: number) => void;
};

type ProjectType = "rideau" | "fauteuil" | "coussin" | null;

export default function MetrageCalculator({ laize = 140, raccordV = 0, raccordH = 0, onApply }: MetrageCalculatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [projectType, setProjectType] = useState<ProjectType>(null);
  
  // Dimensions pour Rideau
  const [windowWidth, setWindowWidth] = useState<number>(150);
  const [windowHeight, setWindowHeight] = useState<number>(250);
  
  // Dimensions pour Fauteuil
  const [seats, setSeats] = useState<number>(1);
  
  // Dimensions pour Coussin
  const [cushionSize, setCushionSize] = useState<number>(50);
  const [cushionCount, setCushionCount] = useState<number>(2);

  // Valeurs par défaut si null
  const effectiveLaize = laize || 140;
  const effectiveRaccordV = raccordV || 0;
  const effectiveRaccordH = raccordH || 0;

  let recommendedQuantity = 0;

  if (projectType === "rideau") {
    // Calcul pro pour rideau
    const fullness = 2.0; // Ampleur standard
    const widthNeeded = windowWidth * fullness;
    // Nombre de lés (largeurs de tissu) nécessaires
    const numLes = Math.ceil(widthNeeded / effectiveLaize);
    
    // Hauteur d'un lé avec ourlets (30cm)
    let dropHeight = windowHeight + 30;
    
    // Ajustement pour raccord vertical
    if (effectiveRaccordV > 0) {
      dropHeight = Math.ceil(dropHeight / effectiveRaccordV) * effectiveRaccordV;
    }
    
    // Total en cm
    const totalCm = numLes * dropHeight;
    // Conversion en mètres
    recommendedQuantity = Math.ceil((totalCm / 100) * 10) / 10;
  } else if (projectType === "fauteuil") {
    // Calcul approximatif standard (très variable selon le modèle, à affiner par un tapissier)
    // On compte ~2.5m par assise
    recommendedQuantity = seats * 2.5;
  } else if (projectType === "coussin") {
    // Un coussin nécessite 2 faces. 
    // Sur une laize de 140, on peut placer (140 / (cushionSize + 5)) faces par ligne.
    const facesPerRow = Math.floor(effectiveLaize / (cushionSize + 5));
    const totalFaces = cushionCount * 2;
    const rowsNeeded = Math.ceil(totalFaces / facesPerRow);
    
    let rowHeight = cushionSize + 5;
    if (effectiveRaccordV > 0) {
      rowHeight = Math.ceil(rowHeight / effectiveRaccordV) * effectiveRaccordV;
    }
    
    recommendedQuantity = Math.ceil(((rowsNeeded * rowHeight) / 100) * 10) / 10;
  }

  return (
    <div className="mt-8 border border-[#1c1b19]/10 rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-[#1c1b19]/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#1c1b19] flex items-center justify-center text-[#f3eee6]">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </div>
          <div className="text-left">
            <h3 className="font-termina text-[11px] uppercase tracking-[0.2em] font-bold text-[#1c1b19]">Calculateur de métrage</h3>
            <p className="text-xs text-[#1c1b19]/60 font-poppins mt-1">Estimez le tissu nécessaire pour votre projet</p>
          </div>
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="square" 
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[#1c1b19]/10"
          >
            <div className="p-6 bg-[#f3eee6]/50 space-y-8 font-poppins">
              
              {/* Infos Tissu */}
              <div className="flex gap-6 text-xs text-[#1c1b19]/70 bg-white p-4 rounded-xl border border-[#1c1b19]/5">
                <div>
                  <span className="block text-[9px] uppercase tracking-wider text-[#1c1b19]/40 mb-1">Laize</span>
                  <span className="font-semibold">{effectiveLaize} cm</span>
                </div>
                {effectiveRaccordV > 0 && (
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#1c1b19]/40 mb-1">Raccord V.</span>
                    <span className="font-semibold">{effectiveRaccordV} cm</span>
                  </div>
                )}
                {effectiveRaccordH > 0 && (
                  <div>
                    <span className="block text-[9px] uppercase tracking-wider text-[#1c1b19]/40 mb-1">Raccord H.</span>
                    <span className="font-semibold">{effectiveRaccordH} cm</span>
                  </div>
                )}
              </div>

              {/* Sélection du projet */}
              <div>
                <label className="block text-sm font-semibold mb-3">Quel est votre projet ?</label>
                <div className="grid grid-cols-3 gap-3">
                  {(["rideau", "fauteuil", "coussin"] as ProjectType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setProjectType(type)}
                      className={`py-3 px-2 border rounded-xl text-xs uppercase tracking-wider font-termina transition-all ${
                        projectType === type 
                          ? "border-[#1c1b19] bg-[#1c1b19] text-[#f3eee6]" 
                          : "border-[#1c1b19]/20 hover:border-[#1c1b19]/50 text-[#1c1b19]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inputs spécifiques au projet */}
              {projectType === "rideau" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#1c1b19]/60 mb-2">Largeur de la fenêtre (Tringle) en cm</label>
                    <input 
                      type="number" 
                      value={windowWidth} 
                      onChange={(e) => setWindowWidth(Number(e.target.value))}
                      className="w-full bg-white border border-[#1c1b19]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1c1b19]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#1c1b19]/60 mb-2">Hauteur (Tringle au sol) en cm</label>
                    <input 
                      type="number" 
                      value={windowHeight} 
                      onChange={(e) => setWindowHeight(Number(e.target.value))}
                      className="w-full bg-white border border-[#1c1b19]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1c1b19]"
                    />
                  </div>
                  <p className="text-[10px] text-[#1c1b19]/50 italic mt-2">
                    * Calculé avec une ampleur standard de 2x et 30cm d'ourlets.
                  </p>
                </motion.div>
              )}

              {projectType === "fauteuil" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#1c1b19]/60 mb-2">Nombre de places (assises)</label>
                    <input 
                      type="number" 
                      value={seats} 
                      onChange={(e) => setSeats(Number(e.target.value))}
                      className="w-full bg-white border border-[#1c1b19]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1c1b19]"
                    />
                  </div>
                  <p className="text-[10px] text-[#1c1b19]/50 italic mt-2">
                    * Approximatif (2.5m par place). Nous recommandons de consulter votre tapissier pour un devis exact.
                  </p>
                </motion.div>
              )}

              {projectType === "coussin" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-[#1c1b19]/60 mb-2">Taille (carré) en cm</label>
                      <input 
                        type="number" 
                        value={cushionSize} 
                        onChange={(e) => setCushionSize(Number(e.target.value))}
                        className="w-full bg-white border border-[#1c1b19]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1c1b19]"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-[#1c1b19]/60 mb-2">Quantité</label>
                      <input 
                        type="number" 
                        value={cushionCount} 
                        onChange={(e) => setCushionCount(Number(e.target.value))}
                        className="w-full bg-white border border-[#1c1b19]/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#1c1b19]"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Résultat */}
              {projectType && (
                <div className="pt-6 border-t border-[#1c1b19]/10">
                  <div className="flex items-end justify-between mb-6">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-[#1c1b19]/50 font-termina mb-1">Métrage estimé</span>
                      <div className="text-3xl font-cormorant italic font-semibold">{recommendedQuantity} <span className="text-xl font-poppins not-italic font-normal">m</span></div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      onApply(recommendedQuantity);
                      setIsOpen(false);
                    }}
                    className="w-full py-4 bg-[#1c1b19] text-[#f3eee6] font-termina text-[11px] uppercase tracking-[0.2em] hover:bg-[#1c1b19]/90 transition-colors"
                  >
                    Utiliser ce métrage
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
