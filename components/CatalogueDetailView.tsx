"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  CatalogueDefinition,
  buildCatalogueWhatsAppMessage,
  AudienceSegment,
} from "@/lib/catalogues-data";
import { useCart } from "@/lib/CartContext";
import { useCurrency } from "@/lib/CurrencyContext";
import { EditorialHero } from "./catalogue-heroes/EditorialHero";
import { ArrowGlyph, Stars, WhatsAppGlyph } from "./catalogue-heroes/shared";

interface CatalogueDetailViewProps {
  catalogue: CatalogueDefinition;
  locale: string;
}

const FIELD_CLASS =
  "w-full rounded-xl border border-[#DCD2C3] bg-[#FAF7F2] px-3.5 py-2.5 text-xs text-[#2B2620] placeholder:text-[#A99C8B] transition-colors focus:border-[#1C1B19] focus:outline-none focus:ring-1 focus:ring-[#1C1B19]/15";

export function CatalogueDetailView({ catalogue, locale }: CatalogueDetailViewProps) {
  const isEn = locale === "en";
  const { addItem, openCart } = useCart();
  const { formatPrice } = useCurrency();

  const accent = catalogue.accentColor || "#C26D43";

  // --- Audience segment ---
  const [selectedSegmentId, setSelectedSegmentId] = useState<string>(
    catalogue.segments && catalogue.segments.length > 0 ? catalogue.segments[0].id : "",
  );

  const activeSegment: AudienceSegment | undefined = useMemo(() => {
    return catalogue.segments?.find((s) => s.id === selectedSegmentId) || catalogue.segments?.[0];
  }, [catalogue.segments, selectedSegmentId]);

  // --- Star configurator ---
  const starPack = catalogue.starPack;

  const [selectedDimensionId, setSelectedDimensionId] = useState<string>(
    starPack.dimensionOptions[1]?.id || starPack.dimensionOptions[0]?.id || "",
  );
  const [selectedFinishId, setSelectedFinishId] = useState<string>(
    starPack.finishOrWeaveOptions?.[0]?.id || "",
  );
  const [selectedWarmthId, setSelectedWarmthId] = useState<string>(
    starPack.warmthOptions?.[0]?.id || "",
  );
  const [selectedColorId, setSelectedColorId] = useState<string>(
    starPack.colorOptions?.[0]?.id || "",
  );

  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);
  const [isDevisModalOpen, setIsDevisModalOpen] = useState<boolean>(false);

  // Devis form
  const [devisForm, setDevisForm] = useState({
    name: "",
    email: "",
    phone: "",
    establishment: "",
    city: "Marrakech",
    message: "",
  });
  const [devisSending, setDevisSending] = useState(false);
  const [devisSuccess, setDevisSuccess] = useState(false);
  const [devisError, setDevisError] = useState("");

  // --- Selected options ---
  const selectedDimension = useMemo(() => {
    return (
      starPack.dimensionOptions.find((d) => d.id === selectedDimensionId) ||
      starPack.dimensionOptions[0]
    );
  }, [starPack.dimensionOptions, selectedDimensionId]);

  const selectedFinish = useMemo(() => {
    return starPack.finishOrWeaveOptions?.find((f) => f.id === selectedFinishId);
  }, [starPack.finishOrWeaveOptions, selectedFinishId]);

  const selectedWarmth = useMemo(() => {
    return starPack.warmthOptions?.find((w) => w.id === selectedWarmthId);
  }, [starPack.warmthOptions, selectedWarmthId]);

  const selectedColor = useMemo(() => {
    return (
      starPack.colorOptions?.find((c) => c.id === selectedColorId) ||
      starPack.colorOptions?.[0]
    );
  }, [starPack.colorOptions, selectedColorId]);

  // --- Pricing ---
  const baseUnitPriceEur = useMemo(() => {
    let total = starPack.basePriceEur;
    if (selectedDimension) total += selectedDimension.priceModifierEur;
    if (selectedFinish) total += selectedFinish.priceModifierEur;
    if (selectedWarmth) total += selectedWarmth.priceModifierEur;
    if (selectedColor) total += selectedColor.priceModifierEur;
    return Math.max(total, 10);
  }, [starPack.basePriceEur, selectedDimension, selectedFinish, selectedWarmth, selectedColor]);

  const sortedTiers = useMemo(
    () => [...starPack.volumeTiers].sort((a, b) => a.minQty - b.minQty),
    [starPack.volumeTiers],
  );

  const activeTier = useMemo(() => {
    const matched = sortedTiers.filter((t) => quantity >= t.minQty);
    return matched[matched.length - 1];
  }, [sortedTiers, quantity]);

  const activeDiscountPercent = activeTier?.discountPercent ?? 0;

  const unitPriceAfterDiscountEur = useMemo(() => {
    return baseUnitPriceEur * (1 - activeDiscountPercent / 100);
  }, [baseUnitPriceEur, activeDiscountPercent]);

  const totalPriceEur = useMemo(() => {
    return unitPriceAfterDiscountEur * quantity;
  }, [unitPriceAfterDiscountEur, quantity]);

  const savingsEur = baseUnitPriceEur * quantity - totalPriceEur;

  const unitPriceFormatted = formatPrice(unitPriceAfterDiscountEur).formatted;
  const originalTotalFormatted = formatPrice(baseUnitPriceEur * quantity).formatted;
  const totalPriceFormatted = formatPrice(totalPriceEur).formatted;
  const savingsFormatted = formatPrice(savingsEur).formatted;

  const formatDelta = (value: number) => {
    if (!value) return isEn ? "Included" : "Inclus";
    return `${value > 0 ? "+" : "−"}${formatPrice(Math.abs(value)).formatted}`;
  };

  // --- Configurator steps ---
  const hasWarmth = (starPack.warmthOptions?.length ?? 0) > 0;
  const hasFinish = (starPack.finishOrWeaveOptions?.length ?? 0) > 0;
  const hasColors = (starPack.colorOptions?.length ?? 0) > 0;
  const stepNumbers = (() => {
    let n = 0;
    return {
      dimension: ++n,
      warmth: hasWarmth ? ++n : 0,
      finish: hasFinish ? ++n : 0,
      color: hasColors ? ++n : 0,
    };
  })();

  // --- Add to cart ---
  const handleAddToCart = () => {
    const dimensionLabel = isEn ? selectedDimension?.labelEn : selectedDimension?.labelFr;
    const colorLabel = isEn ? selectedColor?.labelEn : selectedColor?.labelFr;
    const finishLabel = selectedFinish
      ? isEn
        ? selectedFinish.labelEn
        : selectedFinish.labelFr
      : undefined;
    const warmthLabel = selectedWarmth
      ? isEn
        ? selectedWarmth.labelEn
        : selectedWarmth.labelFr
      : undefined;

    const variantNameParts = [dimensionLabel, colorLabel, finishLabel, warmthLabel].filter(Boolean);
    const fullVariantTitle = variantNameParts.join(" · ");
    const cartItemTitle = `${isEn ? starPack.titleEn : starPack.titleFr} (${fullVariantTitle})`;

    addItem({
      id: `${starPack.id}-${selectedDimensionId}-${selectedColorId}-${selectedFinishId}-${selectedWarmthId}`,
      productId: starPack.id,
      variantId: `${selectedDimensionId}-${selectedColorId}`,
      name: cartItemTitle,
      colorName: colorLabel || "Standard",
      colorHex: selectedColor?.hex || "#FFFFFF",
      price: unitPriceAfterDiscountEur,
      quantity,
      isFabric: false,
      image: catalogue.posterImage || starPack.image,
    });

    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 2500);
    openCart();
  };

  // --- WhatsApp quote ---
  const whatsappUrl = useMemo(() => {
    const textEncoded = buildCatalogueWhatsAppMessage({
      catalogue,
      dimensionLabel: isEn ? selectedDimension?.labelEn : selectedDimension?.labelFr,
      colorLabel: isEn ? selectedColor?.labelEn : selectedColor?.labelFr,
      finishLabel: selectedFinish
        ? isEn
          ? selectedFinish.labelEn
          : selectedFinish.labelFr
        : undefined,
      quantity,
      finalPriceFormatted: totalPriceFormatted,
    });
    return `https://wa.me/212661090950?text=${textEncoded}`;
  }, [catalogue, selectedDimension, selectedColor, selectedFinish, quantity, totalPriceFormatted, isEn]);

  // --- Modal keyboard + scroll lock ---
  useEffect(() => {
    if (!isDevisModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDevisModalOpen(false);
        setDevisSuccess(false);
        setDevisError("");
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isDevisModalOpen]);

  const closeDevisModal = () => {
    setIsDevisModalOpen(false);
    setDevisSuccess(false);
    setDevisError("");
  };

  // --- Devis submit ---
  const handleDevisSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDevisSending(true);
    setDevisError("");

    try {
      const dimensionLabel = isEn ? selectedDimension?.labelEn : selectedDimension?.labelFr;
      const colorLabel = isEn ? selectedColor?.labelEn : selectedColor?.labelFr;
      const finishLabel = selectedFinish
        ? isEn
          ? selectedFinish.labelEn
          : selectedFinish.labelFr
        : "";

      const payload = {
        name: devisForm.name,
        email: devisForm.email,
        phone: devisForm.phone,
        company: devisForm.establishment,
        clientProfile: activeSegment?.nameFr || "Hôtellerie / Riad",
        city: devisForm.city,
        message: `DEMANDE CATALOGUE SPÉCIAL [${catalogue.titleFr}]
Produit: ${starPack.titleFr}
Quantité: ${quantity} pack(s)
Dimension: ${dimensionLabel}
Coloris: ${colorLabel}
Finition: ${finishLabel}
Estimation: ~${totalPriceFormatted}
Note client: ${devisForm.message}`,
        items: [
          {
            name: `${starPack.titleFr} - ${dimensionLabel} (${colorLabel})`,
            quantity,
            price: unitPriceAfterDiscountEur,
          },
        ],
      };

      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Une erreur est survenue lors de l'envoi.");
      }

      setDevisSuccess(true);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erreur lors de la transmission du devis.";
      setDevisError(message);
    } finally {
      setDevisSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-24 text-[#1C1B19] selection:bg-[#1C1B19] selection:text-white">
      {/* 01 — Editorial hero */}
      <EditorialHero
        catalogue={catalogue}
        locale={locale}
        whatsappUrl={whatsappUrl}
        onOpenDevis={() => setIsDevisModalOpen(true)}
      />

      {/* 02 — Hospitality audience selector */}
      {catalogue.segments && catalogue.segments.length > 0 && (
        <section
          id="profils"
          className="mx-auto max-w-7xl scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20 lg:px-12"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionKicker index="01" accent={accent}>
                {isEn ? "Hospitality profiles" : "Profils d'hébergement"}
              </SectionKicker>
              <h2 className="mt-4 max-w-sm text-balance font-serif text-[30px] font-normal leading-[1.04] tracking-tight text-[#2B2620] sm:text-[38px]">
                {isEn
                  ? "A configuration for every way you host."
                  : "Une configuration pour chaque façon d'accueillir."}
              </h2>
              <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-[#6E6457]">
                {isEn
                  ? "Select your property profile — the pack composition, finishing and service level adapt instantly."
                  : "Sélectionnez votre profil — la composition du pack, les finitions et le niveau de service s'adaptent instantanément."}
              </p>

              {/* Desktop vertical profile list */}
              <div className="mt-7 hidden gap-1.5 lg:flex lg:flex-col" role="tablist" aria-label={isEn ? "Hospitality profiles" : "Profils d'hébergement"}>
                {catalogue.segments.map((seg, i) => {
                  const isActive = seg.id === selectedSegmentId;
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedSegmentId(seg.id)}
                      className={`group flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B19]/25 focus-visible:ring-offset-2 ${
                        isActive
                          ? "border-[#1C1B19]/85 bg-white shadow-[0_2px_12px_rgba(28,27,25,0.05)]"
                          : "border-transparent hover:border-[#E3DACC] hover:bg-white/60"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                          isActive ? "" : "bg-[#1c1b19]/15"
                        }`}
                        style={isActive ? { backgroundColor: accent } : undefined}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-[#2B2620]">
                          {isEn ? seg.nameEn : seg.nameFr}
                        </span>
                        <span className="mt-0.5 block truncate text-[11px] text-[#7A6F62]">
                          {isEn ? seg.subtitleEn : seg.subtitleFr}
                        </span>
                      </span>
                      <span className="shrink-0 font-serif text-sm tabular-nums text-[#1c1b19]/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 hidden border-t border-[#E5DDD0] pt-4 text-[10px] leading-relaxed text-[#7A6F62] lg:block">
                {isEn
                  ? "Not sure which profile fits? Our Marrakech team sizes your linen fleet in one call."
                  : "Un doute sur votre profil ? Notre équipe à Marrakech dimensionne votre parc de linge en un appel."}
              </p>
            </div>

            <div className="min-w-0 lg:col-span-8">
              {/* Mobile horizontal tabs */}
              <div
                className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden"
                role="tablist"
                aria-label={isEn ? "Hospitality profiles" : "Profils d'hébergement"}
              >
                {catalogue.segments.map((seg) => {
                  const isActive = seg.id === selectedSegmentId;
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedSegmentId(seg.id)}
                      className={`shrink-0 rounded-full border px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] transition-all ${
                        isActive
                          ? "border-[#1C1B19] bg-[#1C1B19] text-white"
                          : "border-[#E0D7C8] bg-white text-[#635A4E]"
                      }`}
                    >
                      {isEn ? seg.nameEn : seg.nameFr}
                    </button>
                  );
                })}
              </div>

              {activeSegment && (
                <motion.div
                  key={activeSegment.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="mt-4 rounded-[26px] border border-[#E5DDD0] bg-white p-5 shadow-[0_1px_0_rgba(28,27,25,0.03)] sm:p-7 lg:mt-0 lg:p-8"
                >
                  <div className="min-w-0">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
                      style={{ backgroundColor: `${accent}14`, color: accent }}
                    >
                      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                      {isEn ? activeSegment.badgeEn : activeSegment.badgeFr}
                    </span>
                    <h3 className="mt-3 text-balance font-serif text-2xl font-normal leading-tight text-[#2B2620] sm:text-[26px]">
                      {isEn ? activeSegment.subtitleEn : activeSegment.subtitleFr}
                    </h3>
                  </div>

                  <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-[#5C5449]">
                    {isEn ? activeSegment.descriptionEn : activeSegment.descriptionFr}
                  </p>

                  <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {(isEn ? activeSegment.perksEn : activeSegment.perksFr).map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${accent}18`, color: accent }}
                          aria-hidden="true"
                        >
                          <CheckGlyph className="h-2.5 w-2.5" />
                        </span>
                        <span className="text-[12px] leading-relaxed text-[#524B42]">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0EAE0] pt-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#9A8F80]">
                      {isEn ? "Adapted pack & finishing" : "Pack & finitions adaptés"}
                    </p>
                    <a
                      href="#configurateur"
                      className="group/link inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1C1B19] transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B19]/25 focus-visible:ring-offset-2"
                    >
                      {isEn ? "Configure this pack" : "Configurer ce pack"}
                      <ArrowGlyph className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                    </a>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 03 — Star pack configurator */}
      <section
        id="configurateur"
        className="scroll-mt-24 border-y border-[#E7DFD3] bg-white py-14 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <SectionKicker index="02" accent={accent}>
                {isEn ? "Interactive configurator" : "Configurateur interactif"}
              </SectionKicker>
              <h2 className="mt-4 text-balance font-serif text-[30px] font-normal leading-[1.04] tracking-tight text-[#2B2620] sm:text-[38px] lg:text-[42px]">
                {isEn ? starPack.titleEn : starPack.titleFr}
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-[#6E6457] sm:text-sm">
                {isEn ? starPack.descriptionEn : starPack.descriptionFr}
              </p>
            </div>
          </div>

          <div className="mt-8 grid items-start gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-10">
            {/* Media + composition */}
            <div className="lg:col-span-5">
              <div className="space-y-5">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px] border border-[#E5DDD0] bg-[#EFE8DD]">
                  <Image
                    src={starPack.image || catalogue.posterImage}
                    alt={isEn ? starPack.titleEn : starPack.titleFr}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 480px"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                  <span className="absolute left-4 top-4 rounded-full border border-white/35 bg-white/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#1C1B19] backdrop-blur-md">
                    {isEn ? starPack.kickerEn : starPack.kickerFr}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/60">
                        {isEn ? "Starting from" : "À partir de"}
                      </p>
                      <p className="mt-0.5 font-serif text-2xl leading-none">
                        {formatPrice(starPack.basePriceEur).formatted}
                      </p>
                    </div>
                    <span className="rounded-full border border-white/30 bg-black/20 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md">
                      {isEn ? "Pack price" : "Prix du pack"}
                    </span>
                  </div>
                </div>

                <div className="rounded-[22px] border border-[#E5DDD0] bg-[#FAF7F2] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#2B2620]">
                      {isEn ? "Inside this pack" : "Composition du pack"}
                    </h3>
                    <span className="font-serif text-lg text-[#1c1b19]/25">
                      {String((isEn ? starPack.itemsIncludedEn : starPack.itemsIncludedFr).length).padStart(2, "0")}
                    </span>
                  </div>
                  <ul className="mt-3 space-y-2.5">
                    {(isEn ? starPack.itemsIncludedEn : starPack.itemsIncludedFr).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[12px] leading-relaxed text-[#4F473E]">
                        <span
                          className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: `${accent}18`, color: accent }}
                          aria-hidden="true"
                        >
                          <CheckGlyph className="h-2.5 w-2.5" />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-7">
              <div className="rounded-[26px] border border-[#E5DDD0] bg-[#FAF7F2] p-4 sm:p-6 lg:p-7">
                <div className="space-y-6">
                  {/* Dimensions */}
                  <div>
                    <StepHeading
                      step={stepNumbers.dimension}
                      title={isEn ? "Select your dimensions" : "Choisissez la dimension"}
                      meta={
                        isEn
                          ? selectedDimension?.labelEn
                          : selectedDimension?.labelFr
                      }
                    />
                    <div className="grid gap-2.5 sm:grid-cols-2" role="radiogroup" aria-label={isEn ? "Dimensions" : "Dimensions"}>
                      {starPack.dimensionOptions.map((dim) => (
                        <ChoiceCard
                          key={dim.id}
                          selected={dim.id === selectedDimensionId}
                          onClick={() => setSelectedDimensionId(dim.id)}
                          label={isEn ? dim.labelEn : dim.labelFr}
                          badge={dim.badge}
                          delta={formatDelta(dim.priceModifierEur)}
                          accent={accent}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Warmth */}
                  {hasWarmth && (
                    <div>
                      <StepHeading
                        step={stepNumbers.warmth}
                        title={isEn ? "Warmth level & season" : "Niveau de chaleur & saison"}
                        meta={isEn ? selectedWarmth?.labelEn : selectedWarmth?.labelFr}
                      />
                      <div className="grid gap-2.5" role="radiogroup" aria-label={isEn ? "Warmth level" : "Niveau de chaleur"}>
                        {starPack.warmthOptions?.map((warm) => (
                          <ChoiceCard
                            key={warm.id}
                            selected={warm.id === selectedWarmthId}
                            onClick={() => setSelectedWarmthId(warm.id)}
                            label={isEn ? warm.labelEn : warm.labelFr}
                            badge={warm.badge}
                            delta={formatDelta(warm.priceModifierEur)}
                            accent={accent}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Finish */}
                  {hasFinish && (
                    <div>
                      <StepHeading
                        step={stepNumbers.finish}
                        title={isEn ? "Finishing & weave" : "Finition & tissage"}
                        meta={isEn ? selectedFinish?.labelEn : selectedFinish?.labelFr}
                      />
                      <div className="grid gap-2.5" role="radiogroup" aria-label={isEn ? "Finishing and weave" : "Finition et tissage"}>
                        {starPack.finishOrWeaveOptions?.map((fin) => (
                          <ChoiceCard
                            key={fin.id}
                            selected={fin.id === selectedFinishId}
                            onClick={() => setSelectedFinishId(fin.id)}
                            label={isEn ? fin.labelEn : fin.labelFr}
                            badge={fin.badge}
                            delta={formatDelta(fin.priceModifierEur)}
                            accent={accent}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Colours */}
                  {hasColors && (
                    <div>
                      <StepHeading
                        step={stepNumbers.color}
                        title={isEn ? "Colour palette" : "Nuancier de couleur"}
                        meta={isEn ? selectedColor?.labelEn : selectedColor?.labelFr}
                      />
                      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={isEn ? "Colours" : "Couleurs"}>
                        {starPack.colorOptions?.map((color) => {
                          const isSelected = color.id === selectedColorId;
                          return (
                            <button
                              key={color.id}
                              type="button"
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setSelectedColorId(color.id)}
                              className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B19]/25 focus-visible:ring-offset-2 sm:text-[11px] ${
                                isSelected
                                  ? "border-[#1C1B19] bg-white text-[#1C1B19] shadow-[0_2px_8px_rgba(28,27,25,0.06)]"
                                  : "border-[#E3DACC] bg-white/55 text-[#635A4E] hover:border-[#BFB3A1] hover:bg-white"
                              }`}
                            >
                              <span
                                className="h-3.5 w-3.5 rounded-full border border-black/15"
                                style={{ backgroundColor: color.hex || "#FFFFFF" }}
                                aria-hidden="true"
                              />
                              <span>{isEn ? color.labelEn : color.labelFr}</span>
                              {color.priceModifierEur !== 0 && (
                                <span className="text-[9px] text-[#8A8072]">
                                  {formatDelta(color.priceModifierEur)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Quantity + tiers */}
                <div className="mt-6 rounded-2xl border border-[#E5DDD0] bg-white p-4 sm:p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h3 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#1C1B19]">
                        {isEn ? "Quantity & volume pricing" : "Quantité & tarifs dégressifs"}
                      </h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-[#7A6F62]">
                        {activeDiscountPercent > 0
                          ? isEn
                            ? `${activeDiscountPercent}% volume discount applied automatically.`
                            : `${activeDiscountPercent}% de remise volume appliquée automatiquement.`
                          : isEn
                            ? "From 5 packs, wholesale pricing unlocks tier by tier."
                            : "Dès 5 packs, le tarif pro se débloque palier par palier."}
                      </p>
                    </div>

                    <div className="flex items-center overflow-hidden rounded-full border border-[#DCD3C5] bg-[#FAF7F2]">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        aria-label={isEn ? "Decrease quantity" : "Diminuer la quantité"}
                        className="flex h-9 w-9 items-center justify-center text-sm font-bold text-[#544C42] transition-colors hover:bg-[#EBE2D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1C1B19]/25"
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-xs font-bold tabular-nums text-[#1C1B19]">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        aria-label={isEn ? "Increase quantity" : "Augmenter la quantité"}
                        className="flex h-9 w-9 items-center justify-center text-sm font-bold text-[#544C42] transition-colors hover:bg-[#EBE2D4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1C1B19]/25"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {sortedTiers.map((tier, index) => {
                      const nextTier = sortedTiers[index + 1];
                      const range = nextTier ? `${tier.minQty}–${nextTier.minQty - 1}` : `${tier.minQty}+`;
                      const isActive = activeTier?.minQty === tier.minQty;
                      const isUnlocked = quantity >= tier.minQty;

                      return (
                        <div
                          key={`${tier.minQty}-${tier.discountPercent}`}
                          className={`rounded-xl border px-2.5 py-2.5 text-center transition-colors ${
                            isActive
                              ? "border-[#1C1B19] bg-[#1C1B19] text-white"
                              : isUnlocked
                                ? "border-[#D9CBB8] bg-[#FAF7F2] text-[#2B2620]"
                                : "border-dashed border-[#E2D9CB] bg-transparent text-[#A19584]"
                          }`}
                        >
                          <p className="text-[8px] font-semibold uppercase tracking-[0.12em] opacity-70">
                            {range} {isEn ? "packs" : "packs"}
                          </p>
                          <p className="mt-1 font-serif text-lg leading-none">
                            {tier.discountPercent > 0 ? `−${tier.discountPercent}%` : "—"}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price summary */}
                <div className="mt-4 rounded-[22px] bg-[#1C1B19] p-4 text-[#FAF7F2] sm:p-6">
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/40">
                        {isEn ? "Estimated total" : "Total estimé"}
                      </span>
                      <div className="mt-1.5 flex flex-wrap items-baseline gap-2">
                        <span className="font-serif text-[34px] leading-none sm:text-4xl">
                          {totalPriceFormatted}
                        </span>
                        {activeDiscountPercent > 0 && (
                          <span className="text-[11px] text-white/35 line-through">
                            {originalTotalFormatted}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-[10px] text-white/40">
                        {quantity} × {unitPriceFormatted}
                        {activeTier
                          ? ` · ${isEn ? "tier" : "palier"} ${activeTier.minQty}+`
                          : ""}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.16em] text-white/40">
                        {isEn ? "Unit price" : "Prix unitaire"}
                      </span>
                      <span className="mt-1 block text-sm font-semibold tabular-nums text-[#E9CDB3]">
                        {unitPriceFormatted}
                      </span>
                    </div>
                  </div>

                  {savingsEur > 0 && (
                    <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-medium text-emerald-300">
                      <CheckGlyph className="h-3 w-3" />
                      {isEn ? `You save ${savingsFormatted}` : `Vous économisez ${savingsFormatted}`}
                    </p>
                  )}

                  <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#FAF7F2] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1C1B19] transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1B19]"
                    >
                      {isAddedFeedback ? (
                        <>
                          <CheckGlyph className="h-3.5 w-3.5 text-emerald-600" />
                          {isEn ? "Added to cart!" : "Ajouté au panier !"}
                        </>
                      ) : (
                        <>
                          <BagGlyph className="h-4 w-4" />
                          {isEn ? "Add pack to cart" : "Ajouter au panier"}
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#20BA5A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1B19]"
                    >
                      <WhatsAppGlyph className="h-4 w-4" />
                      {isEn ? "WhatsApp quote" : "Devis WhatsApp"}
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDevisModalOpen(true)}
                    className="mt-2.5 w-full rounded-full border border-white/15 py-3 text-[9px] font-bold uppercase tracking-[0.16em] text-white/60 transition-colors hover:border-white/35 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1B19]"
                  >
                    {isEn ? "Request an official proforma" : "Demander une proforma officielle"}
                  </button>

                  <p className="mt-3 text-center text-[9px] leading-relaxed text-white/30">
                    {isEn
                      ? "VAT included · 24–72h delivery across Morocco · Tax-deductible pro invoice on request"
                      : "TVA incluse · Livraison 24–72h partout au Maroc · Facture pro TVA déductible sur demande"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Technical specifications */}
      <section className="bg-[#FAF7F2] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <SectionKicker index="03" accent={accent}>
                {isEn ? "Textile engineering" : "Ingénierie textile"}
              </SectionKicker>
              <h2 className="mt-4 text-balance font-serif text-[30px] font-normal leading-[1.04] tracking-tight text-[#2B2620] sm:text-[38px]">
                {isEn ? "Hospitality technical sheet" : "Fiche technique hôtellerie"}
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-[#6E6457]">
                {isEn
                  ? "Every specification is written for real hotel constraints: wash tunnels, industrial mangles, chlorine and daily turnover."
                  : "Chaque spécification est écrite pour les contraintes réelles de l'hôtellerie : tunnels de lavage, calandres, chlore et rotation quotidienne."}
              </p>

              <div className="mt-6 rounded-2xl border border-[#E4D3C4] bg-[#FAF2EB] p-4 sm:p-5">
                <div className="flex items-start gap-3">
                  <LeafGlyph className="mt-0.5 h-5 w-5 shrink-0 text-[#8C6D58]" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#8C6D58]">
                      {isEn ? "Hospitality standard" : "Norme hôtelière"}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#6B462C]">
                      {isEn ? catalogue.washInstructionEn : catalogue.washInstructionFr}
                    </p>
                  </div>
                </div>
              </div>

              {catalogue.b2bPerksFr && catalogue.b2bPerksFr.length > 0 && (
                <div className="mt-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#9A8F80]">
                    {isEn ? "Professional services" : "Services professionnels"}
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {(isEn ? catalogue.b2bPerksEn : catalogue.b2bPerksFr).map((perk, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[11px] leading-relaxed text-[#5C5449]">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#D9CCBB] text-[#8C6D58]">
                          <CheckGlyph className="h-2.5 w-2.5" />
                        </span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-8">
              <div className="overflow-hidden rounded-[24px] border border-[#E5DDD0] bg-white">
                <div className="flex items-center justify-between border-b border-[#F0EAE0] px-5 py-4 sm:px-6">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2B2620]">
                    {isEn ? "Specification" : "Spécification"}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#2B2620]">
                    {isEn ? "Detail" : "Détail"}
                  </p>
                </div>
                <dl className="divide-y divide-[#F1EBE1]">
                  {starPack.specs.map((spec, idx) => (
                    <div
                      key={idx}
                      className="grid gap-1 px-5 py-4 transition-colors hover:bg-[#FCFAF6] sm:grid-cols-[190px_1fr] sm:gap-6 sm:px-6"
                    >
                      <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#9A8F80] sm:pt-0.5">
                        {isEn ? spec.labelEn : spec.labelFr}
                      </dt>
                      <dd>
                        <p className="text-[13px] font-medium leading-snug text-[#2B2620]">
                          {isEn ? spec.valueEn : spec.valueFr}
                        </p>
                        {spec.detailEn || spec.detailFr ? (
                          <p className="mt-1 text-[11px] leading-relaxed text-[#7A6F62]">
                            {isEn ? spec.detailEn : spec.detailFr}
                          </p>
                        ) : null}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Reviews */}
      <section className="border-y border-[#E7DFD3] bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="grid gap-8 pb-9 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <SectionKicker index="04" accent={accent}>
                {isEn ? "Verified feedback" : "Témoignages vérifiés"}
              </SectionKicker>
              <h2 className="mt-4 text-balance font-serif text-[30px] font-normal leading-[1.04] tracking-tight text-[#2B2620] sm:text-[38px]">
                {isEn ? catalogue.reviewsTitleEn : catalogue.reviewsTitleFr}
              </h2>
              <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-[#6E6457]">
                {isEn ? catalogue.reviewsSubtitleEn : catalogue.reviewsSubtitleFr}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-wrap items-center justify-between gap-5 rounded-[22px] border border-[#E5DDD0] bg-[#FAF7F2] px-5 py-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <span className="font-serif text-4xl leading-none text-[#1C1B19]">
                      {catalogue.averageRating.toFixed(1)}
                    </span>
                    <span className="mt-0.5 block text-[9px] text-[#8A7D6E]">/ 5.0</span>
                  </div>
                  <div className="h-10 w-px bg-[#E0D7C8]" aria-hidden="true" />
                  <div>
                    <Stars className="text-[13px] tracking-[0.12em] text-amber-500" />
                    <p className="mt-1 text-[10px] font-semibold text-[#544B3F]">
                      {catalogue.totalReviews} {isEn ? "verified reviews" : "avis vérifiés"}
                    </p>
                  </div>
                </div>

                {catalogue.partnerLogos && catalogue.partnerLogos.length > 0 && (
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {catalogue.partnerLogos.map((partner) => (
                      <span
                        key={partner}
                        className="text-[8px] font-semibold uppercase tracking-[0.12em] text-[#9A8F80]"
                      >
                        {partner}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {catalogue.reviews.map((rev) => {
              const initials = rev.author
                .split(" ")
                .map((word) => word.replace(/[^\p{L}]/gu, ""))
                .filter(Boolean)
                .map((word) => word[0])
                .slice(0, 2)
                .join("")
                .toUpperCase();

              return (
                <article
                  key={rev.id}
                  className="group flex min-w-0 flex-col justify-between overflow-hidden rounded-[22px] border border-[#EBE4D8] bg-[#FAF7F2] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#DCD2C3] hover:bg-white hover:shadow-[0_12px_30px_rgba(28,27,25,0.06)] sm:p-6"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-serif text-4xl leading-none text-[#1c1b19]/10" aria-hidden="true">
                        “
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>

                    <h3 className="mt-1 font-serif text-lg font-medium leading-snug text-[#2B2620]">
                      {isEn ? rev.titleEn : rev.titleFr}
                    </h3>
                    <p className="mt-2 text-[12px] leading-relaxed text-[#5C5449] sm:text-[13px]">
                      {isEn ? rev.commentEn : rev.commentFr}
                    </p>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-3 border-t border-[#EDE6DA] pt-4">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: accent }}
                        aria-hidden="true"
                      >
                        {initials}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-bold text-[#2B2620]">{rev.author}</p>
                        <p className="text-[10px] leading-snug text-[#7A6F62]">
                          {isEn ? rev.roleEn : rev.roleFr} · {rev.location}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#EBF5EE] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.08em] text-[#2E7D32]">
                          <CheckGlyph className="h-2 w-2" />
                          {isEn ? "Verified" : "Vérifié"}
                        </span>
                      )}
                      <p className="mt-1 text-[8px] text-[#9E9180]">{rev.date}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06 — Complementary pieces */}
      {catalogue.featuredProducts && catalogue.featuredProducts.length > 0 && (
        <section className="bg-[#FAF7F2] py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            <div className="flex flex-col gap-4 border-b border-[#E5DDD0] pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionKicker index="05" accent={accent}>
                  {isEn ? "Complementary pieces" : "Compléments de collection"}
                </SectionKicker>
                <h2 className="mt-4 font-serif text-[30px] font-normal leading-[1.04] tracking-tight text-[#2B2620] sm:text-[38px]">
                  {isEn ? "Complete the whole space" : "Pour parfaire l'ensemble de vos espaces"}
                </h2>
              </div>
              <Link
                href={`/${locale}/products`}
                className="group/all inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1C1B19]/60 transition-colors hover:text-[#1C1B19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B19]/25 focus-visible:ring-offset-2"
              >
                {isEn ? "View all products" : "Voir tous les produits"}
                <ArrowGlyph className="h-3.5 w-3.5 transition-transform duration-300 group-hover/all:translate-x-0.5" />
              </Link>
            </div>

            <div className="no-scrollbar -mx-4 mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
              {catalogue.featuredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group flex w-[78%] min-w-0 shrink-0 snap-start flex-col overflow-hidden rounded-[20px] border border-[#E8DFCF] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(28,27,25,0.08)] sm:w-auto"
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFE8DD]">
                    <Image
                      src={product.image}
                      alt={isEn ? product.nameEn : product.nameFr}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {product.tagFr && (
                      <span className="absolute left-3 top-3 rounded-full border border-white/40 bg-white/90 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-[#2B2620] backdrop-blur-md">
                        {isEn ? product.tagEn : product.tagFr}
                      </span>
                    )}

                    {product.weightGsm && (
                      <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/25 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-md">
                        {product.weightGsm} g/m²
                      </span>
                    )}

                    <Link
                      href={`/${locale}/products/${product.slug}`}
                      aria-label={isEn ? `View ${product.nameEn}` : `Voir ${product.nameFr}`}
                      className="absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
                    >
                      <span className="absolute bottom-3 left-3 right-3 inline-flex translate-y-2 items-center justify-between gap-2 rounded-full bg-white/95 px-3.5 py-2 text-[8px] font-bold uppercase tracking-[0.14em] text-[#1C1B19] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                        {isEn ? "View product" : "Voir le produit"}
                        <ArrowGlyph className="h-3 w-3" />
                      </span>
                    </Link>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#9A8F80]">
                      {product.composition}
                    </p>
                    <h3 className="mt-1.5 font-serif text-[15px] font-medium leading-snug text-[#2B2620]">
                      {isEn ? product.nameEn : product.nameFr}
                    </h3>

                    <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                      <span className="font-serif text-lg leading-none text-[#1C1B19]">
                        {formatPrice(product.basePriceEur).formatted}
                      </span>
                      <Link
                        href={`/${locale}/products/${product.slug}`}
                        className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#1C1B19]/55 transition-colors hover:text-[#1C1B19]"
                      >
                        {isEn ? "Details" : "Détails"} →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 07 — Other catalogues */}
      <section className="px-4 pb-4 pt-2 sm:px-6 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[26px] bg-[#16140F] px-5 py-9 text-[#F6F1E8] sm:rounded-[34px] sm:px-8 sm:py-12 lg:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: accent }}
            />
            <div className="relative">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#C9A36B] sm:text-[10px]">
                    <span className="h-px w-8 bg-[#C9A36B]/70" aria-hidden="true" />
                    {isEn ? "Continue the house tour" : "Poursuivre la visite"}
                  </div>
                  <h2 className="mt-3 font-serif text-[28px] font-normal leading-[1.05] tracking-tight text-white sm:text-[36px]">
                    {isEn ? "Explore our other catalogues" : "Explorez nos autres catalogues"}
                  </h2>
                </div>

                <Link
                  href={`/${locale}/catalogues`}
                  className="group/all inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.14em] text-white/70 transition-colors hover:border-white/45 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#16140F]"
                >
                  {isEn ? "All editions" : "Toutes les éditions"}
                  <ArrowGlyph className="h-3.5 w-3.5 transition-transform duration-300 group-hover/all:translate-x-0.5" />
                </Link>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                {CATALOGUES_LIST_PREVIEW.filter((c) => c.slug !== catalogue.slug).map((c, index) => (
                  <Link
                    key={c.slug}
                    href={`/${locale}/catalogues/${c.slug}`}
                    className="group/card relative block overflow-hidden rounded-[18px] border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#16140F]"
                  >
                    <div className="relative aspect-[5/4] w-full overflow-hidden bg-[#24211D]">
                      <Image
                        src={c.posterImage}
                        alt={isEn ? c.titleEn : c.titleFr}
                        fill
                        className="object-cover brightness-[0.78] transition-transform duration-700 ease-out group-hover/card:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

                      <span className="absolute right-3 top-3 font-serif text-sm text-white/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="absolute inset-x-4 bottom-4">
                        <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-[#D8BC93]">
                          {isEn ? c.kickerEn : c.kickerFr}
                        </p>
                        <h3 className="mt-1 font-serif text-lg font-normal leading-tight text-white">
                          {isEn ? c.titleEn : c.titleFr}
                        </h3>
                        <div className="mt-2.5 flex items-center justify-between gap-3">
                          <span className="text-[9px] font-medium text-white/55">
                            {isEn ? "From" : "Dès"} {formatPrice(c.basePriceEur).formatted}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] text-white/70 transition-colors group-hover/card:text-white">
                            {isEn ? "Open" : "Ouvrir"}
                            <ArrowGlyph className="h-3 w-3 transition-transform duration-300 group-hover/card:translate-x-0.5" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Official proforma modal */}
      <AnimatePresence>
        {isDevisModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDevisModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="devis-title"
              initial={{ opacity: 0, scale: 0.97, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 18 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative z-10 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[26px] border border-[#E8DFCF] bg-white p-5 shadow-2xl sm:rounded-[26px] sm:p-7"
            >
              <button
                type="button"
                onClick={closeDevisModal}
                aria-label={isEn ? "Close quote request" : "Fermer la demande de devis"}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#E7DFD3] text-[#8A7D6E] transition-colors hover:border-[#1c1b19]/30 hover:text-[#1C1B19] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B19]/25"
              >
                ✕
              </button>

              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[9px] font-bold uppercase tracking-[0.14em]"
                style={{ backgroundColor: `${accent}14`, color: accent }}
              >
                <span className="h-1 w-1 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
                {isEn ? "Official B2B quote" : "Devis officiel B2B"}
              </span>

              <h3 id="devis-title" className="mt-3 pr-8 font-serif text-2xl font-normal leading-tight text-[#2B2620]">
                {isEn ? "Receive your proforma" : "Recevez votre proforma"}
              </h3>
              <p className="mt-1 text-[11px] leading-relaxed text-[#7A6F62]">
                {isEn
                  ? "Our Marrakech hospitality desk replies within 2 working hours with a formal, VAT-ready quote."
                  : "Notre bureau hôtelier de Marrakech vous répond sous 2 heures ouvrées avec un devis formel prêt pour la TVA."}
              </p>

              <div className="mt-4 flex gap-3 rounded-2xl border border-[#E8DFCF] bg-[#FAF7F2] p-3">
                <div className="relative h-16 w-14 shrink-0 overflow-hidden rounded-xl bg-[#EFE8DD]">
                  <Image
                    src={catalogue.posterImage || starPack.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-serif text-sm text-[#2B2620]">
                    {isEn ? starPack.titleEn : starPack.titleFr}
                  </p>
                  <p className="mt-0.5 truncate text-[10px] text-[#7A6F62]">
                    {quantity} × {isEn ? selectedDimension?.labelEn : selectedDimension?.labelFr}
                    {selectedColor ? ` · ${isEn ? selectedColor.labelEn : selectedColor.labelFr}` : ""}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#1C1B19]">{totalPriceFormatted}</p>
                </div>
              </div>

              {devisSuccess ? (
                <div className="py-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckGlyph className="h-5 w-5" />
                  </div>
                  <h4 className="mt-4 font-serif text-xl text-[#2B2620]">
                    {isEn ? "Quote request sent!" : "Demande transmise !"}
                  </h4>
                  <p className="mx-auto mt-2 max-w-xs text-[11px] leading-relaxed text-[#5C5245]">
                    {isEn
                      ? "Our hospitality consultant will contact you with a formal proforma within 2 hours."
                      : "Notre conseiller hôtellerie vous transmettra votre devis proforma sous 2 heures."}
                  </p>
                  <button
                    type="button"
                    onClick={closeDevisModal}
                    className="mt-5 rounded-full bg-[#1C1B19] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-black"
                  >
                    {isEn ? "Close window" : "Fermer la fenêtre"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleDevisSubmit} className="mt-4 space-y-3.5 text-xs">
                  {devisError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-[11px] text-red-700">
                      {devisError}
                    </div>
                  )}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="devis-name" className="mb-1 block font-bold text-[#2B2620]">
                        {isEn ? "Full name *" : "Nom & prénom *"}
                      </label>
                      <input
                        id="devis-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={devisForm.name}
                        onChange={(e) => setDevisForm({ ...devisForm, name: e.target.value })}
                        placeholder="Ex: Karim Benali"
                        className={FIELD_CLASS}
                      />
                    </div>

                    <div>
                      <label htmlFor="devis-phone" className="mb-1 block font-bold text-[#2B2620]">
                        {isEn ? "Phone / WhatsApp *" : "Téléphone / WhatsApp *"}
                      </label>
                      <input
                        id="devis-phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={devisForm.phone}
                        onChange={(e) => setDevisForm({ ...devisForm, phone: e.target.value })}
                        placeholder="+212 6..."
                        className={FIELD_CLASS}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="devis-email" className="mb-1 block font-bold text-[#2B2620]">
                      {isEn ? "Email address *" : "Adresse email *"}
                    </label>
                    <input
                      id="devis-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={devisForm.email}
                      onChange={(e) => setDevisForm({ ...devisForm, email: e.target.value })}
                      placeholder="contact@monriad.com"
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label htmlFor="devis-establishment" className="mb-1 block font-bold text-[#2B2620]">
                        {isEn ? "Establishment / property" : "Établissement / riad"}
                      </label>
                      <input
                        id="devis-establishment"
                        type="text"
                        autoComplete="organization"
                        value={devisForm.establishment}
                        onChange={(e) =>
                          setDevisForm({ ...devisForm, establishment: e.target.value })
                        }
                        placeholder="Riad Dar..."
                        className={FIELD_CLASS}
                      />
                    </div>

                    <div>
                      <label htmlFor="devis-city" className="mb-1 block font-bold text-[#2B2620]">
                        {isEn ? "City (Morocco)" : "Ville (Maroc)"}
                      </label>
                      <input
                        id="devis-city"
                        type="text"
                        autoComplete="address-level2"
                        value={devisForm.city}
                        onChange={(e) => setDevisForm({ ...devisForm, city: e.target.value })}
                        placeholder="Marrakech, Casablanca..."
                        className={FIELD_CLASS}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="devis-message" className="mb-1 block font-bold text-[#2B2620]">
                      {isEn ? "Special notes / delivery" : "Précisions / délais souhaités"}
                    </label>
                    <textarea
                      id="devis-message"
                      rows={3}
                      value={devisForm.message}
                      onChange={(e) => setDevisForm({ ...devisForm, message: e.target.value })}
                      placeholder={
                        isEn
                          ? "Number of rooms, custom embroidery, delivery urgency..."
                          : "Nombre de chambres, broderie, délai souhaité..."
                      }
                      className={`${FIELD_CLASS} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={devisSending}
                    className="w-full rounded-full bg-[#1C1B19] py-3.5 text-[10px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {devisSending
                      ? isEn
                        ? "Transmitting..."
                        : "Transmission en cours..."
                      : isEn
                        ? "Send official quote request"
                        : "Transmettre ma demande de devis"}
                  </button>

                  <p className="text-center text-[9px] leading-relaxed text-[#9A8F80]">
                    {isEn
                      ? "No commitment · Your data stays with the Kansotex hospitality team."
                      : "Sans engagement · Vos données restent au bureau hôtelier Kansotex."}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Small presentational helpers                                     */
/* ---------------------------------------------------------------- */

function SectionKicker({
  index,
  accent,
  children,
}: {
  index: string;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.28em] sm:text-[10px]"
      style={{ color: accent }}
    >
      <span className="tabular-nums text-[#1c1b19]/30">{index}</span>
      <span className="h-px w-8" style={{ backgroundColor: `${accent}55` }} aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

function StepHeading({
  step,
  title,
  meta,
}: {
  step: number;
  title: string;
  meta?: string;
}) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-3">
      <h3 className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#1C1B19] sm:text-[11px]">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1C1B19] text-[9px] font-bold text-white">
          {String(step).padStart(2, "0")}
        </span>
        {title}
      </h3>
      {meta ? (
        <span className="hidden max-w-[45%] text-right text-[10px] font-medium leading-snug text-[#8A8072] sm:block">
          {meta}
        </span>
      ) : null}
    </div>
  );
}

function ChoiceCard({
  selected,
  onClick,
  label,
  badge,
  delta,
  accent,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  badge?: string;
  delta: string;
  accent: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1B19]/25 focus-visible:ring-offset-2 ${
        selected
          ? "border-[#1C1B19] bg-white shadow-[0_2px_10px_rgba(28,27,25,0.06)]"
          : "border-[#E3DACC] bg-white/55 hover:border-[#BFB3A1] hover:bg-white"
      }`}
    >
      <span className="min-w-0">
        <span className="block text-[11px] font-semibold leading-snug text-[#2B2620] sm:text-xs">
          {label}
        </span>
        {badge ? (
          <span
            className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: accent }}
          >
            {badge}
          </span>
        ) : null}
      </span>
      <span
        className={`shrink-0 text-[10px] font-medium tabular-nums sm:text-[11px] ${
          selected ? "text-[#1C1B19]" : "text-[#8A8072]"
        }`}
      >
        {delta}
      </span>
    </button>
  );
}

function CheckGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BagGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.8}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  );
}

function LeafGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.6}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 4C13 4 5 7 5 15c0 2 1 4 1 4s2-1 4-1c8 0 10-8 10-14zM5 19c2-4 5-7 9-9"
      />
    </svg>
  );
}

/* Compact preview info for cross-navigation */
const CATALOGUES_LIST_PREVIEW = [
  {
    slug: "linge-hotelier",
    titleFr: "Linge Hôtelier — Riads & Airbnb",
    titleEn: "Hotel Bed Linen — Riads & Airbnb",
    kickerFr: "Hospitality Edition",
    kickerEn: "Hospitality Edition",
    posterImage: "/catalogues/linge-hotelier-post.jpg",
    basePriceEur: 125,
  },
  {
    slug: "collection-hiver",
    titleFr: "L'Hiver Arrive...",
    titleEn: "Winter is Coming...",
    kickerFr: "Warmth & Comfort",
    kickerEn: "Warmth & Comfort",
    posterImage: "/catalogues/collection-hiver-post.jpg",
    basePriceEur: 119,
  },
  {
    slug: "collection-privee",
    titleFr: "L'Excellence des Matières Nobles",
    titleEn: "Excellence of Noble Materials",
    kickerFr: "Collection Privée",
    kickerEn: "Private Collection",
    posterImage: "/catalogues/collection-privee-post.jpg",
    basePriceEur: 239,
  },
  {
    slug: "linge-de-bain",
    titleFr: "Linge de Bain Hôtelier 600g",
    titleEn: "Hotel Bath Linen 600g",
    kickerFr: "Bath & Wellness",
    kickerEn: "Bath & Wellness",
    posterImage: "/catalogues/linge-de-bain-post.jpg",
    basePriceEur: 91,
  },
];
