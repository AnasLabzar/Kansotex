"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type CurrencyCode = "MAD" | "EUR" | "USD" | "GBP";

interface Rates {
  [key: string]: number;
}

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  rates: Rates;
  isLoadingRates: boolean;
  formatPrice: (amountInEur: number) => { value: string, symbol: string };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  EUR: "€",
  MAD: "MAD",
  USD: "$",
  GBP: "£"
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Default is MAD, as requested by the user
  const [currency, setCurrencyState] = useState<CurrencyCode>("MAD");
  const [rates, setRates] = useState<Rates>({ EUR: 1, MAD: 10.85, USD: 1.08, GBP: 0.85 });
  const [isLoadingRates, setIsLoadingRates] = useState(true);

  useEffect(() => {
    // Load preferred currency from localStorage
    const savedCurrency = localStorage.getItem("kansotex_currency") as CurrencyCode;
    if (savedCurrency && CURRENCY_SYMBOLS[savedCurrency]) {
      setCurrencyState(savedCurrency);
    }

    // Fetch live rates
    const fetchRates = async () => {
      try {
        const res = await fetch("/api/rates");
        const data = await res.json();
        if (data.rates) {
          setRates(data.rates);
        }
      } catch (e) {
        console.error("Could not fetch live rates, using fallback.");
      } finally {
        setIsLoadingRates(false);
      }
    };

    fetchRates();
  }, []);

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem("kansotex_currency", c);
  };

  const formatPrice = (amountInEur: number) => {
    const rate = rates[currency] || 1;
    const convertedAmount = amountInEur * rate;
    
    // Formatting: MAD usually doesn't show decimals unless needed, but for premium we can keep .00 or just integer if it's MAD
    const value = currency === "MAD" 
      ? convertedAmount.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })
      : convertedAmount.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      
    return {
      value,
      symbol: CURRENCY_SYMBOLS[currency]
    };
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, isLoadingRates, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
