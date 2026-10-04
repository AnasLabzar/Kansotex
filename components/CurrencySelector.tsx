"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrency, CurrencyCode, CURRENCY_SYMBOLS } from "@/lib/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";

export function CurrencySelector({ isDark = false }: { isDark?: boolean }) {
  const { currency, setCurrency, isLoadingRates } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currencies: { code: CurrencyCode; label: string }[] = [
    { code: "MAD", label: `Dirham (${CURRENCY_SYMBOLS["MAD"]})` },
    { code: "EUR", label: `Euro (${CURRENCY_SYMBOLS["EUR"]})` },
    { code: "USD", label: `Dollar (${CURRENCY_SYMBOLS["USD"]})` },
    { code: "GBP", label: `Pound (${CURRENCY_SYMBOLS["GBP"]})` },
  ];

  if (isLoadingRates) {
    return <div className={`w-[38px] h-[18px] animate-pulse rounded-sm ${isDark ? 'bg-white/10' : 'bg-ink/5'}`}></div>;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 text-[10px] font-termina font-bold uppercase tracking-widest hover:opacity-70 transition-opacity ${isDark ? 'text-[#f3eee6]' : 'text-ink'}`}
        aria-label="Changer de devise"
      >
        <span>{currency} ({CURRENCY_SYMBOLS[currency]})</span>
        <svg className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 top-full mt-4 w-40 border shadow-2xl rounded-sm overflow-hidden z-[100] ${isDark ? 'bg-[#1c1b19] border-[#f3eee6]/10' : 'bg-cream border-ink/10'}`}
          >
            <div className="flex flex-col">
              {currencies.map((c) => (
                <button
                  key={c.code}
                  onClick={() => {
                    setCurrency(c.code);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-left text-[9px] font-termina uppercase tracking-widest transition-colors ${
                    isDark 
                      ? (currency === c.code ? "text-white font-bold bg-white/5" : "text-[#f3eee6]/60 hover:bg-white/5")
                      : (currency === c.code ? "text-ink font-bold bg-ink/5" : "text-ink/60 hover:bg-ink/5")
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
