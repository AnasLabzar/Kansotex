"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import MetrageCalculator from "@/components/MetrageCalculator";

// Simplified type based on what we fetched
type Product = any; 

export default function AddToCartForm({ product }: { product: Product }) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants?.[0]?.id || ""
  );
  const [quantity, setQuantity] = useState<number>(
    product.metadata?.minOrderLength || 1
  );
  
  // Animation state (Harban effect)
  const [flyingDots, setFlyingDots] = useState<{ id: number, x: number, y: number, targetX: number, targetY: number, img: string }[]>([]);

  const isFabric = product.type === "FABRIC_BY_METER";
  const step = isFabric ? product.metadata?.cutIncrement || 0.1 : 1;
  const min = isFabric ? product.metadata?.minOrderLength || 1 : 1;

  const selectedVariant = product.variants?.find((v: any) => v.id === selectedVariantId);
  
  // Calculate total stock for the variant
  const totalStock = selectedVariant?.stockLevel || 0;
  
  const handleQuantityChange = (val: number) => {
    // Keep to 1 decimal place to avoid floating point weirdness
    const num = Math.round(val * 10) / 10;
    if (num >= min && num <= totalStock) {
      setQuantity(num);
    }
  };

  const { addItem, openCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!selectedVariant) return;

    // 1. Get positions for animation
    const buttonRect = e.currentTarget.getBoundingClientRect();
    const startX = buttonRect.left + buttonRect.width / 2;
    const startY = buttonRect.top + buttonRect.height / 2;

    const cartIcon = document.getElementById("cart-icon");
    let targetX = window.innerWidth - 40; 
    let targetY = 40; 

    if (cartIcon) {
      const iconRect = cartIcon.getBoundingClientRect();
      targetX = iconRect.left + iconRect.width / 2;
      targetY = iconRect.top + iconRect.height / 2;
    }

    const dotId = Date.now();
    const productImage = product.image || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png";

    setFlyingDots((prev) => [...prev, { id: dotId, x: startX, y: startY, targetX, targetY, img: productImage }]);

    // 2. Wait for animation to finish, then add item and open cart
    setTimeout(() => {
      addItem({
        id: `${product.id}-${selectedVariant.id}`,
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        colorName: selectedVariant.colorName,
        colorHex: selectedVariant.colorHex,
        price: product.basePrice,
        quantity: quantity,
        isFabric,
        image: productImage,
      });
      openCart();
      setFlyingDots((prev) => prev.filter((d) => d.id !== dotId));
    }, 700); // 700ms corresponds to the animation duration
  };

  return (
    <div className="space-y-10 relative">
      
      {/* Flying Image Animation (Harban) */}
      <AnimatePresence>
        {flyingDots.map((dot) => (
          <motion.div
            key={dot.id}
            initial={{ 
              position: "fixed", 
              left: dot.x, 
              top: dot.y, 
              opacity: 1,
              scale: 1,
              rotate: 0,
              zIndex: 9999
            }}
            animate={{ 
              left: dot.targetX, 
              top: dot.targetY, 
              scale: 0.1,
              rotate: 15,
              opacity: 0.8 
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              duration: 0.7, 
              ease: [0.32, 0.72, 0, 1] // Very smooth arc-like easing
            }}
            className="w-24 h-32 shadow-2xl pointer-events-none overflow-hidden border-2 border-[#f3eee6]"
            style={{ 
              transform: "translate(-50%, -50%)" 
            }}
          >
            <img src={dot.img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Flying Dots Animation */}
      <AnimatePresence>
        {flyingDots.map((dot) => (
          <motion.div
            key={dot.id}
            initial={{ 
              position: "fixed", 
              left: dot.x, 
              top: dot.y, 
              opacity: 1,
              scale: 1,
              zIndex: 9999
            }}
            animate={{ 
              left: dot.targetX, 
              top: dot.targetY, 
              scale: 0.1,
              opacity: 0.5 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-10 h-10 rounded-full border border-[#1c1b19]/20 shadow-lg pointer-events-none"
            style={{ 
              backgroundColor: selectedVariant?.colorHex || "#1c1b19",
              transform: "translate(-50%, -50%)" 
            }}
          />
        ))}
      </AnimatePresence>
      
      {/* 1. Variant Selection */}
      {product.variants && product.variants.length > 0 && (
        <div className="mb-10">
          <h3 className="text-[10px] font-termina tracking-[0.28em] uppercase text-[#1c1b19] mb-6">
            Couleur : <span className="font-poppins font-light text-[#1c1b19]/60 normal-case ml-2">{selectedVariant?.colorName}</span>
          </h3>
          <div className="flex flex-wrap gap-4">
            {product.variants.map((variant: any) => {
              const isSelected = variant.id === selectedVariantId;
              return (
                <button
                  key={variant.id}
                  onClick={() => {
                    setSelectedVariantId(variant.id);
                    setQuantity(min); // Reset quantity on variant change
                  }}
                  className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isSelected ? "ring-[0.6px] ring-offset-4 ring-[#1c1b19]" : "ring-[0.6px] ring-[#1c1b19]/20 hover:ring-[#1c1b19]/40"
                  }`}
                  aria-label={variant.colorName}
                  title={variant.colorName}
                >
                  <span 
                    className="w-10 h-10 rounded-full block shadow-inner"
                    style={{ backgroundColor: variant.colorHex || "#ccc" }}
                  />
                  {/* Subtle micro-interaction */}
                  {isSelected && (
                    <motion.div
                      layoutId="variantOutline"
                      className="absolute inset-0 rounded-full border border-transparent"
                      initial={false}
                      animate={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Stock & Dye Lot Intelligence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedVariantId}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="bg-transparent rounded-none p-5 border border-[#1c1b19]/10 font-poppins mb-10"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#1c1b19]/60 font-termina uppercase tracking-[0.28em]">Disponibilité</span>
            <span className={`text-sm font-light ${totalStock > 0 ? "text-[#1c1b19]" : "text-red-900/80"}`}>
              {totalStock > 0 ? `${totalStock} ${isFabric ? 'mètres' : 'en stock'}` : "Rupture de stock"}
            </span>
          </div>
          
          {/* Show Dye Lots if it's a fabric and has stock */}
          {isFabric && totalStock > 0 && selectedVariant?.dyeLots?.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#1c1b19]/10">
              <span className="text-[10px] font-termina uppercase tracking-[0.28em] text-[#1c1b19]/50 block mb-3">Bains de teinture</span>
              <div className="flex gap-2 flex-wrap">
                {selectedVariant.dyeLots.map((lot: any) => (
                  <span key={lot.id} className="text-xs bg-white/50 border border-[#1c1b19]/10 px-3 py-1.5 rounded-none text-[#1c1b19] font-light">
                    Lot {lot.lotNumber}: {lot.stockLength}m
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Metrage Calculator (only for fabrics) */}
      {isFabric && (
        <MetrageCalculator 
          laize={product.metadata?.laize}
          raccordV={product.metadata?.raccordV}
          raccordH={product.metadata?.raccordH}
          onApply={handleQuantityChange}
        />
      )}

      {/* 3. Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row items-end gap-4 pt-4 border-t border-[#1c1b19]/10">
        
        <div className="w-full sm:w-32">
          <label className="text-[10px] font-termina tracking-[0.28em] uppercase text-[#1c1b19] mb-4 block">
            {isFabric ? "Métrage" : "Quantité"}
          </label>
          <div className="flex items-center bg-transparent rounded-none border border-[#1c1b19]/20 h-14 p-1">
            <button 
              onClick={() => handleQuantityChange(quantity - step)}
              disabled={quantity <= min}
              className="w-12 h-12 flex items-center justify-center text-[#1c1b19]/60 hover:text-[#1c1b19] transition-colors disabled:opacity-30"
            >
              -
            </button>
            <input 
              type="number"
              min={min}
              max={totalStock}
              step={step}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseFloat(e.target.value) || min)}
              className="flex-1 text-center bg-transparent border-none focus:ring-0 text-lg font-light appearance-none m-0 p-0 font-poppins text-[#1c1b19]"
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
            <button 
              onClick={() => handleQuantityChange(quantity + step)}
              disabled={quantity + step > totalStock}
              className="w-12 h-12 flex items-center justify-center text-[#1c1b19]/60 hover:text-[#1c1b19] transition-colors disabled:opacity-30"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={totalStock === 0}
          className="flex-1 w-full h-14 bg-[#1c1b19] text-[#f3eee6] rounded-none font-termina text-[10px] tracking-[0.28em] uppercase hover:bg-[#1c1b19]/90 transition-all disabled:bg-[#1c1b19]/30 disabled:cursor-not-allowed active:scale-[0.98] duration-300"
        >
          {totalStock === 0 ? "Épuisé" : "Ajouter au panier"}
        </button>

      </div>
    </div>
  );
}
