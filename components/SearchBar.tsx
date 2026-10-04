"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCurrency } from "@/lib/CurrencyContext";

export function SearchBar({ placeholder = "Rechercher un produit...", autoFocus = false, absoluteResults = true }: { placeholder?: string, autoFocus?: boolean, absoluteResults?: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { formatPrice } = useCurrency();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside to close
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length < 2) {
        setResults([]);
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      fetchResults();
    }, 400);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto z-50">
      <div className="relative flex items-center w-full h-12 border-b border-ink/20 bg-cream group hover:border-ink/50 transition-colors">
        <svg className="absolute left-3 w-4 h-4 text-ink/40 group-hover:text-ink/70 transition-colors" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full h-full pl-10 pr-4 bg-transparent outline-none text-sm font-sans font-light placeholder:text-ink/30 text-ink"
        />
        {query && (
          <button 
            onClick={() => { setQuery(""); setResults([]); }}
            className="absolute right-3 text-[9px] font-termina uppercase tracking-widest text-ink/40 hover:text-ink"
          >
            Effacer
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && query.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className={`${absoluteResults ? 'absolute top-full left-0 right-0 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-ink/10 border-t-0 rounded-b-sm' : 'block border-t border-ink/5'} bg-cream max-h-[60vh] overflow-y-auto z-50`}
          >
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-8 text-ink/50 gap-3">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-[10px] font-termina uppercase tracking-widest">Recherche en cours...</span>
              </div>
            ) : results.length > 0 ? (
              <div className="flex flex-col p-2 gap-1">
                {results.map((product) => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-3 rounded-sm hover:bg-ink/5 transition-colors group"
                  >
                    <div className="w-14 h-16 shrink-0 bg-[#e8e4db] overflow-hidden relative rounded-[1px]">
                      <img 
                        src={product.image || "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png"} 
                        alt={product.nameFr} 
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-sans text-sm text-ink group-hover:text-[#c19a86] transition-colors">{product.nameFr}</h4>
                      <p className="text-[9px] font-termina uppercase tracking-[0.2em] text-ink/40 mt-1">
                        REF: {product.slug}
                      </p>
                    </div>
                    <div className="ml-auto flex items-center pr-2">
                      <span className="text-xs font-light text-ink flex items-baseline gap-1">
                        {formatPrice(product.basePrice).value}
                        <span className="font-sans text-[10px] font-medium">{formatPrice(product.basePrice).symbol}</span>
                      </span>
                    </div>
                  </Link>
                ))}
                <Link 
                  href="/products" 
                  onClick={() => setIsOpen(false)}
                  className="mt-2 p-3 text-center text-[10px] font-termina uppercase tracking-widest text-ink/60 hover:text-ink hover:bg-ink/5 transition-colors rounded-sm"
                >
                  Voir tout le catalogue
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 gap-3">
                <svg className="w-8 h-8 text-ink/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div className="text-[10px] font-termina uppercase tracking-widest text-ink/60 text-center">
                  Aucun résultat pour <br/><span className="text-ink font-bold">"{query}"</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
