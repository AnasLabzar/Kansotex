"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/CartContext";
import { useCurrency } from "@/lib/CurrencyContext";
import { useTranslations, useLocale } from "next-intl";
import MetrageCalculator from "@/components/MetrageCalculator";
import { PDPSizeGuideModal } from "@/components/PDPSizeGuideModal";
import { PDPSampleModal } from "@/components/PDPSampleModal";
import { toTermina } from "@/lib/text";

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
  const locale = useLocale();
  const isFabric = product.type === "FABRIC_BY_METER";
  const step = isFabric ? product.metadata?.cutIncrement || 0.1 : 1;
  const min = isFabric ? product.metadata?.minOrderLength || 1 : 1;

  const catSlug = product.category?.slug?.toLowerCase() || "";
  const catName = product.category?.nameFr?.toLowerCase() || "";
  const prodName = product.nameFr?.toLowerCase() || "";
  const isBedLinen = catSlug.includes("linge-de-lit") || catName.includes("lit") || prodName.includes("housse") || prodName.includes("drap") || prodName.includes("parure");
  const isBathLinen = catSlug.includes("linge-de-bain") || catName.includes("bain") || prodName.includes("serviette") || prodName.includes("peignoir");
  const isTableLinen = catSlug.includes("linge-de-table") || catName.includes("table") || prodName.includes("nappe");
  const linenType: "bed" | "bath" | "table" | null = isBedLinen ? "bed" : isBathLinen ? "bath" : isTableLinen ? "table" : null;

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
    <div className="space-y-6 sm:space-y-8 relative w-full font-sans">
      
      {/* 1. Dynamic Currency Price Section (Prominent, Above The Fold!) */}
      <div className="p-4 sm:p-5 bg-white/60 border border-ink/10 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-termina uppercase tracking-[0.25em] text-ink/50">
            {toTermina(isPro ? "Prix Professionnel HT" : t("publicPrice"))}
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-termina font-bold text-ink tracking-tight flex items-baseline gap-1.5">
              {formatPrice(product.basePrice).value}
              <span className="font-sans text-sm sm:text-base font-semibold">{formatPrice(product.basePrice).symbol}</span>
            </span>
            {(isPro || isPromo) && originalPrice !== undefined && (
              <span className="text-xs font-termina text-ink/40 line-through flex items-baseline gap-1">
                {formatPrice(originalPrice).value}
                <span className="font-sans text-[11px] font-medium">{formatPrice(originalPrice).symbol}</span>
              </span>
            )}
            <span className="text-[10px] text-muted font-sans font-light">
              {isFabric ? (locale === "en" ? "/ linear meter" : "/ mètre linéaire") : (locale === "en" ? "VAT included" : "TVA incluse")}
            </span>
          </div>
        </div>

        {(isPro || isPromo) && discountAmount !== undefined && (
          <div className="bg-[#c19a86]/15 text-ink border border-[#c19a86]/30 px-3 py-1.5 rounded-xs flex items-center gap-2 self-start sm:self-center">
            <svg className="w-3.5 h-3.5 text-olive shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <span className="text-[9px] font-termina uppercase tracking-wider font-bold">
              {toTermina(`-${Math.round(discountAmount * 100)}% ${isPromo ? "PROMO" : "TARIF PRO"}`)}
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
      
      {/* 2. Variant Selection */}
      {colors.length > 0 && (
        <div className="space-y-6">
          {/* Color Selection */}
          <div>
            <h3 className="text-[10px] font-termina tracking-[0.25em] uppercase text-ink mb-3 flex items-center gap-2">
              {toTermina(t("color"))} <span className="w-4 h-[1px] bg-ink/30"></span> <span className="font-sans font-light text-muted normal-case">{selectedColor}</span>
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {colors.map((colorGroup: any) => {
                const isSelected = colorGroup.colorName === selectedColor;
                return (
                  <button
                    key={colorGroup.colorName}
                    onClick={() => setSelectedColor(colorGroup.colorName)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected ? "ring-1 ring-offset-3 ring-ink ring-offset-cream" : "ring-1 ring-ink/15 hover:ring-ink/40 ring-offset-cream"
                    }`}
                    title={colorGroup.colorName}
                  >
                    <span 
                      className="w-full h-full rounded-full block shadow-xs"
                      style={{ backgroundColor: colorGroup.colorHex || "#ccc" }}
                    />
                    {isSelected && (
                      <motion.div
                        layoutId="colorOutline"
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
          
          {/* Size Selection */}
          {hasSizes && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[10px] font-termina tracking-[0.25em] uppercase text-ink flex items-center gap-2">
                  {toTermina(t("size"))} <span className="w-4 h-[1px] bg-ink/30"></span>
                </h3>
                {linenType && (
                  <PDPSizeGuideModal type={linenType} locale={locale} />
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {availableSizesForColor.map((variant: any) => {
                  const isSelected = variant.id === selectedVariantId;
                  return (
                    <button
                      key={variant.id}
                      onClick={() => {
                        setSelectedVariantId(variant.id);
                        setQuantity(min);
                      }}
                      className={`px-4 py-2 text-xs font-sans transition-all border ${
                        isSelected 
                          ? "border-ink bg-ink text-cream font-medium" 
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

          {/* Size Guide fallback if product is linen but has no separate sizes in variant table */}
          {linenType && !hasSizes && (
            <div className="flex items-center justify-between pt-1">
              <span className="text-[9px] font-termina uppercase tracking-wider text-muted">
                {toTermina(locale === "en" ? "Standard Hospitality Dimensions" : "Confection Standard Hoteliere")}
              </span>
              <PDPSizeGuideModal type={linenType} locale={locale} />
            </div>
          )}
        </div>
      )}

      {/* 3. Stock & Dye Lot Intelligence */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedVariantId}
          initial={{ opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -3 }}
          className="flex flex-col gap-2 font-sans pt-1"
        >
          <div className="flex items-center gap-3">
            <span className="text-[9px] text-ink font-termina uppercase tracking-[0.25em]">
              {toTermina(t("availability"))}
            </span>
            <span className="w-4 h-[1px] bg-ink/30"></span>
            <span className={`text-xs font-light ${totalStock > 0 ? "text-ink" : "text-red-900"}`}>
              {totalStock > 0 ? `${totalStock} ${isFabric ? t("linearMeter") : t("inStock")}` : t("outOfStock")}
            </span>
          </div>
          
          {isFabric && totalStock > 0 && selectedVariant?.dyeLots?.length > 0 && (
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-[9px] font-termina uppercase tracking-[0.25em] text-ink">
                {toTermina(t("dyeLots"))}
              </span>
              <span className="w-4 h-[1px] bg-ink/30"></span>
              <div className="flex gap-2 flex-wrap">
                {selectedVariant.dyeLots.map((lot: any, idx: number) => (
                  <span key={lot.id} className="text-xs text-muted font-light flex items-center">
                    {idx > 0 && <span className="mr-2 text-ink/20">|</span>}
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
        <div className="pt-2">
          <MetrageCalculator 
            laize={product.metadata?.laize}
            raccordV={product.metadata?.raccordV}
            raccordH={product.metadata?.raccordH}
            onApply={handleQuantityChange}
          />
        </div>
      )}

      {/* 4. Quantity & Add to Cart */}
      <div className="pt-4 border-t border-ink/10 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-4">
          
          <div className="w-full sm:w-auto">
            <label className="text-[9px] font-termina tracking-[0.25em] uppercase text-ink mb-2 block">
              {toTermina(isFabric ? t("length") : t("quantity"))}
            </label>
            <div className="flex items-center bg-transparent border border-ink/20 h-13 p-1 rounded-none hover:border-ink/40 transition-colors">
              <button 
                onClick={() => handleQuantityChange(quantity - step)}
                disabled={quantity <= min}
                className="w-10 h-full flex items-center justify-center text-ink/60 hover:text-ink transition-colors disabled:opacity-30 text-lg cursor-pointer"
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
                className="w-16 text-center bg-transparent border-none focus:ring-0 text-sm font-light appearance-none m-0 p-0 font-sans text-ink"
                style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
              />
              <button 
                onClick={() => handleQuantityChange(quantity + step)}
                disabled={quantity + step > totalStock}
                className="w-10 h-full flex items-center justify-center text-ink/60 hover:text-ink transition-colors disabled:opacity-30 text-lg cursor-pointer"
              >
                +
              </button>
            </div>
            
            {/* Admin Metadata Hints for Fabric */}
            {isFabric && (
              <p className="text-[9px] text-muted mt-1 uppercase tracking-wider font-sans">
                Min: {min}m <span className="mx-1 text-ink/20">|</span> Pas: {step}m
              </p>
            )}
          </div>

          <button 
            onClick={handleAddToCart}
            disabled={totalStock <= 0}
            className="flex-1 h-13 bg-ink text-cream hover:bg-black transition-colors uppercase tracking-[0.2em] font-termina text-[11px] font-bold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {toTermina(totalStock > 0 ? t("addToCart") : t("outOfStock"))}
          </button>
        </div>

        {/* Fabric A4 Sample CTA */}
        {isFabric && (
          <div className="pt-1">
            <PDPSampleModal
              productName={product.nameFr}
              productSlug={product.slug}
              selectedColor={selectedColor}
              locale={locale}
            />
          </div>
        )}
      </div>
    </div>
  );
}
