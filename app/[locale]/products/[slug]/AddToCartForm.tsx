"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import { useCurrency } from "@/lib/CurrencyContext";
import { useTranslations } from "next-intl";
import MetrageCalculator from "@/components/MetrageCalculator";

type Product = any; 

export default function AddToCartForm({ 
  product, 
  originalPrice, 
  isPro, 
  isPromo, 
  discountAmount 
}: { 
  product: Product, 
  originalPrice?: number,
  isPro?: boolean,
  isPromo?: boolean,
  discountAmount?: number 
}) {
  const t = useTranslations("Products");
  const isFabric = product.type === "FABRIC_BY_METER";
  const step = isFabric ? product.metadata?.cutIncrement || 0.1 : 1;
  const min = isFabric ? product.metadata?.minOrderLength || 1 : 1;

  // Group variants by color
  const colors = useMemo(() => {
    const map = new Map();
    product.variants?.forEach((v: any) => {
      if (!map.has(v.colorName)) {
        map.set(v.colorName, { colorName: v.colorName, colorHex: v.colorHex, variants: [] });
      }
      map.get(v.colorName).variants.push(v);
    });
    return Array.from(map.values());
  }, [product.variants]);

  const [selectedColor, setSelectedColor] = useState<string>(colors[0]?.colorName || "");
  const [selectedVariantId, setSelectedVariantId] = useState<string>(product.variants?.[0]?.id || "");
  const [quantity, setQuantity] = useState<number>(min);
  const [flyingDots, setFlyingDots] = useState<{ id: number, x: number, y: number, targetX: number, targetY: number, img: string }[]>([]);

  // When color changes, select the first available variant for that color
  useEffect(() => {
    const colorGroup = colors.find(c => c.colorName === selectedColor);
    if (colorGroup && colorGroup.variants.length > 0) {
      if (!colorGroup.variants.some((v: any) => v.id === selectedVariantId)) {
        setSelectedVariantId(colorGroup.variants[0].id);
        setQuantity(min);
      }
    }
  }, [selectedColor, colors, selectedVariantId, min]);

  const selectedVariant = product.variants?.find((v: any) => v.id === selectedVariantId);
  const availableSizesForColor = colors.find(c => c.colorName === selectedColor)?.variants || [];
  const hasSizes = availableSizesForColor.some((v: any) => v.size);
  const totalStock = selectedVariant?.stockLevel || 0;
  
  const handleQuantityChange = (val: number) => {
    // Keep to 1 decimal place to avoid floating point weirdness
    const num = Math.round(val * 10) / 10;
    if (num >= min && num <= totalStock) {
      setQuantity(num);
    }
  };

  const { addItem, openCart } = useCart();
  const { formatPrice } = useCurrency();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!selectedVariant) return;

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

    setTimeout(() => {
      addItem({
        id: `${product.id}-${selectedVariant.id}`,
        productId: product.id,
        variantId: selectedVariant.id,
        name: product.nameFr,
        colorName: selectedVariant.colorName,
        colorHex: selectedVariant.colorHex,
        price: product.basePrice,
        quantity: quantity,
        isFabric,
        image: productImage,
      });
      openCart();
      setFlyingDots((prev) => prev.filter((d) => d.id !== dotId));
    }, 700); 
  };

  return (
    <div className="space-y-12 relative w-full font-sans">
      
      {/* Dynamic Currency Price Section */}
      <div className="mb-6 p-6 bg-white/50 border border-ink/10 rounded-sm flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-termina uppercase tracking-widest text-ink/50">
            {isPro ? "Prix Professionnel (HT)" : t("publicPrice")}
          </span>
          <div className="flex items-end gap-3">
            <span className="text-xl font-termina font-medium text-ink tracking-tight flex items-baseline gap-1">
              {formatPrice(product.basePrice).value}
              <span className="font-sans text-base font-semibold">{formatPrice(product.basePrice).symbol}</span>
            </span>
            {(isPro || isPromo) && originalPrice !== undefined && (
              <span className="text-xs font-termina text-ink/40 line-through mb-[2px] flex items-baseline gap-[2px]">
                {formatPrice(originalPrice).value}
                <span className="font-sans font-medium">{formatPrice(originalPrice).symbol}</span>
              </span>
            )}
          </div>
        </div>

        {(isPro || isPromo) && discountAmount !== undefined && (
          <div className="bg-[#c19a86]/10 text-[#c19a86] border border-[#c19a86]/20 px-3 py-1.5 rounded-sm flex items-center gap-2 self-start sm:self-end mb-1">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-[10px] font-termina uppercase tracking-wider font-bold">
              -{Math.round(discountAmount * 100)}% {isPromo ? "PROMO" : "TARIF PRO"}
            </span>
          </div>
        )}
      </div>

      {/* Flying Image Animation */}
      <AnimatePresence>
        {flyingDots.map((dot) => (
          <motion.div
            key={dot.id}
            initial={{ position: "fixed", left: dot.x, top: dot.y, opacity: 1, scale: 1, rotate: 0, zIndex: 9999 }}
            animate={{ left: dot.targetX, top: dot.targetY, scale: 0.1, rotate: 15, opacity: 0.8 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
            className="w-24 h-32 shadow-2xl pointer-events-none overflow-hidden border border-cream"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <img src={dot.img} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* 1. Variant Selection */}
      {colors.length > 0 && (
        <div className="space-y-8">
          {/* Color Selection */}
          <div>
            <h3 className="text-[10px] font-termina tracking-[0.25em] uppercase text-ink mb-4 flex items-center gap-2">
              {t("color")} <span className="w-4 h-[1px] bg-ink/30"></span> <span className="font-sans font-light text-muted normal-case">{selectedColor}</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((colorGroup: any) => {
                const isSelected = colorGroup.colorName === selectedColor;
                return (
                  <button
                    key={colorGroup.colorName}
                    onClick={() => setSelectedColor(colorGroup.colorName)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? "ring-1 ring-offset-4 ring-ink ring-offset-cream" : "ring-1 ring-ink/10 hover:ring-ink/30 ring-offset-cream"
                    }`}
                    title={colorGroup.colorName}
                  >
                    <span 
                      className="w-full h-full rounded-full block shadow-sm"
                      style={{ backgroundColor: colorGroup.colorHex || "#ccc" }}
                    />
                    {isSelected && (
                      <motion.div
                        layoutId="colorOutline"
                        className="absolute inset-0 rounded-full border border-transparent"
                        initial={false}
                        animate={{ scale: 1.2 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Size Selection (Only if sizes exist for this color) */}
          {hasSizes && (
            <div>
              <h3 className="text-[10px] font-termina tracking-[0.25em] uppercase text-ink mb-4 flex items-center gap-2">
                {t("size")} <span className="w-4 h-[1px] bg-ink/30"></span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {availableSizesForColor.map((variant: any) => {
                  const isSelected = variant.id === selectedVariantId;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariantId(variant.id);
                        setQuantity(min);
                      }}
                      className={`px-5 py-2 text-sm transition-all border ${
                        isSelected 
                          ? "border-ink bg-ink text-cream" 
                          : "border-ink/20 text-ink hover:border-ink"
                      }`}
                    >
                      {variant.size || "Standard"}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Stock & Dye Lot Intelligence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedVariantId}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="flex flex-col gap-3 font-sans"
        >
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-ink font-termina uppercase tracking-[0.25em]">{t("availability")}</span>
            <span className="w-4 h-[1px] bg-ink/30"></span>
            <span className={`text-sm font-light ${totalStock > 0 ? "text-ink" : "text-red-900"}`}>
              {totalStock > 0 ? `${totalStock} ${isFabric ? t("linearMeter") : t("inStock")}` : t("outOfStock")}
            </span>
          </div>
          
          {isFabric && totalStock > 0 && selectedVariant?.dyeLots?.length > 0 && (
            <div className="flex items-center gap-3 mt-1">
              <span className="text-[10px] font-termina uppercase tracking-[0.25em] text-ink">{t("dyeLots")}</span>
              <span className="w-4 h-[1px] bg-ink/30"></span>
              <div className="flex gap-3 flex-wrap">
                {selectedVariant.dyeLots.map((lot: any, idx: number) => (
                  <span key={lot.id} className="text-sm text-muted font-light flex items-center">
                    {idx > 0 && <span className="mr-3 text-ink/20">|</span>}
                    {t("lot")} {lot.lotNumber} : {lot.stockLength}m
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Metrage Calculator (only for fabrics) */}
      {isFabric && (
        <div className="pt-4">
          <MetrageCalculator 
            laize={product.metadata?.laize}
            raccordV={product.metadata?.raccordV}
            raccordH={product.metadata?.raccordH}
            onApply={handleQuantityChange}
          />
        </div>
      )}

      {/* 3. Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 pt-8 border-t border-ink/10">
        
        <div className="w-full sm:w-auto">
          <label className="text-[10px] font-termina tracking-[0.25em] uppercase text-ink mb-3 flex items-center gap-2">
            {isFabric ? t("length") : t("quantity")}
          </label>
          <div className="flex items-center bg-transparent border border-ink/20 h-14 p-1 rounded-none hover:border-ink/40 transition-colors">
            <button 
              onClick={() => handleQuantityChange(quantity - step)}
              disabled={quantity <= min}
              className="w-12 h-full flex items-center justify-center text-ink/60 hover:text-ink transition-colors disabled:opacity-30 text-xl"
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
              className="w-20 text-center bg-transparent border-none focus:ring-0 text-base font-light appearance-none m-0 p-0 font-sans text-ink"
              style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
            />
            <button 
              onClick={() => handleQuantityChange(quantity + step)}
              disabled={quantity + step > totalStock}
              className="w-12 h-full flex items-center justify-center text-ink/60 hover:text-ink transition-colors disabled:opacity-30 text-xl"
            >
              +
            </button>
          </div>
          
          {/* Admin Metadata Hints for Fabric */}
          {isFabric && (
            <p className="text-[10px] text-muted mt-2 uppercase tracking-widest font-sans">
              Min: {min}m <span className="mx-1 text-ink/20">|</span> Step: {step}m
            </p>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={totalStock <= 0}
          className="flex-1 h-14 bg-ink text-cream hover:bg-ink/90 transition-colors uppercase tracking-[0.2em] font-termina text-[11px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {totalStock > 0 ? t("addToCart") : t("outOfStock")}
        </button>
      </div>
    </div>
  );
}
