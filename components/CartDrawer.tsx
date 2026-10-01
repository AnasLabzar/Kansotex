"use client";

import { useCart } from "@/lib/CartContext";
import { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CartDrawer() {
  const { isCartOpen, closeCart, items, removeItem, updateQuantity, cartTotal } = useCart();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#1c1b19]/60 backdrop-blur-md z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-0 right-0 w-full max-w-lg bg-[#f3eee6] text-[#1c1b19] z-[70] shadow-2xl flex flex-col border-l border-[#1c1b19]/10"
          >
            {/* Header */}
            <div className="px-8 py-8 flex items-center justify-between border-b border-[#1c1b19]/10">
              <h2 className="font-cormorant text-3xl italic tracking-wide">Votre Panier</h2>
              <button 
                onClick={closeCart}
                className="group p-2 flex items-center justify-center transition-transform hover:rotate-90"
                aria-label="Fermer le panier"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter" className="text-[#1c1b19]/60 group-hover:text-[#1c1b19] transition-colors">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-full text-center space-y-6"
                >
                  <p className="font-cormorant text-2xl italic text-[#1c1b19]/50">Votre panier est vide.</p>
                  <button onClick={closeCart} className="font-termina text-[10px] uppercase tracking-[0.2em] border-b border-[#1c1b19] pb-1 hover:text-[#1c1b19]/60 hover:border-[#1c1b19]/60 transition-all">
                    Découvrir notre collection
                  </button>
                </motion.div>
              ) : (
                items.map((item, i) => (
                  <motion.div 
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-6 group"
                  >
                    {/* Item Image */}
                    <div className="w-24 h-32 bg-[#1c1b19]/5 relative overflow-hidden flex-shrink-0">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                        </div>
                      )}
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col font-poppins py-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-termina text-[11px] uppercase tracking-[0.2em] font-bold">
                            {item.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}
                          </h3>
                          <p className="text-xs font-light text-[#1c1b19]/60 mt-2 flex items-center gap-2 uppercase tracking-wider">
                            <span className="w-3 h-3 rounded-full border border-[#1c1b19]/20" style={{ backgroundColor: item.colorHex || "#ccc" }} />
                            {item.colorName}
                          </p>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-[#1c1b19]/40 hover:text-[#1c1b19] transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="square" strokeLinejoin="miter"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>

                      <div className="mt-auto flex items-end justify-between">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - (item.isFabric ? 0.5 : 1))}
                            disabled={item.quantity <= (item.isFabric ? 1 : 1)}
                            className="text-lg font-light text-[#1c1b19]/40 hover:text-[#1c1b19] disabled:opacity-30 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center text-sm font-light">
                            {item.quantity} {item.isFabric ? "m" : ""}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + (item.isFabric ? 0.5 : 1))}
                            className="text-lg font-light text-[#1c1b19]/40 hover:text-[#1c1b19] transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-cormorant text-2xl italic">
                          {(item.price * item.quantity).toFixed(2)} €
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="p-8 bg-[#f3eee6] border-t border-[#1c1b19]/10"
              >
                <div className="flex justify-between items-end mb-6 font-poppins">
                  <span className="text-sm uppercase tracking-wider text-[#1c1b19]/60">Sous-total</span>
                  <span className="text-2xl">{cartTotal.toFixed(2)} €</span>
                </div>
                <p className="text-[10px] text-[#1c1b19]/50 font-light mb-6">
                  Taxes et frais de livraison calculés à l'étape suivante.
                </p>
                
                <Link 
                  href="/checkout"
                  onClick={closeCart}
                  className="flex w-full h-14 items-center justify-center bg-[#1c1b19] text-[#f3eee6] font-termina text-[10px] tracking-[0.28em] uppercase hover:bg-[#1c1b19]/90 transition-colors"
                >
                  Commander
                </Link>
                
                <div className="mt-4 flex w-full">
                  <button className="w-full text-center font-termina text-[9px] uppercase tracking-[0.2em] text-[#1c1b19]/60 border border-[#1c1b19]/20 h-10 hover:bg-[#1c1b19]/5 transition-colors">
                    Demander un devis pro
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
