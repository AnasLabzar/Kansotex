"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Overlays() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPromo, setShowPromo] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  useEffect(() => {
    // Loading progress animation
    setTimeout(() => setProgress(100), 100);

    // Hide loading screen after 1.5s
    const loadTimer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Show promo popup after 4 seconds
    const promoTimer = setTimeout(() => {
      if (!localStorage.getItem("promo_closed")) {
        setShowPromo(true);
      }
    }, 4000);

    // Show cookies after 2 seconds
    const cookieTimer = setTimeout(() => {
      if (!localStorage.getItem("cookies_accepted")) {
        setShowCookies(true);
      }
    }, 2000);

    return () => {
      clearTimeout(loadTimer);
      clearTimeout(promoTimer);
      clearTimeout(cookieTimer);
    };
  }, []);

  const closePromo = () => {
    setShowPromo(false);
    localStorage.setItem("promo_closed", "true");
  };

  const acceptCookies = () => {
    setShowCookies(false);
    localStorage.setItem("cookies_accepted", "true");
  };

  return (
    <>
      {/* Loading Screen */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#f3eee6] transition-opacity duration-[800ms] ease-in-out ${
          loading ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          <div className="relative h-20 w-20">
            <Image src="/icon-kansotex.png" alt="Loading" fill className="object-contain" />
          </div>
          <div className="h-[1px] w-32 overflow-hidden bg-[#1c1b19]/10">
            <div 
              className="h-full bg-[#1c1b19] transition-all duration-[1200ms] ease-out" 
              style={{ width: `${progress}%` }} 
            />
          </div>
        </div>
      </div>

      {/* Cookies Banner */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[60] transform transition-transform duration-700 ease-out ${
          showCookies && !loading ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="bg-[#1c1b19] px-6 py-5 shadow-[0_-10px_40px_rgba(0,0,0,0.2)] md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
            <p className="font-sans text-[13px] font-light text-[#f3eee6]/80 text-center md:text-left">
              Nous utilisons des cookies pour améliorer votre expérience, analyser notre trafic et personnaliser le contenu. 
              En continuant à naviguer, vous acceptez notre politique.
            </p>
            <div className="flex gap-4 shrink-0 w-full md:w-auto justify-center">
              <button onClick={() => setShowCookies(false)} className="font-termina text-[10px] font-bold uppercase tracking-widest text-[#f3eee6]/50 transition-colors hover:text-[#f3eee6]">
                Refuser
              </button>
              <button onClick={acceptCookies} className="bg-[#f3eee6] px-8 py-3 font-termina text-[10px] font-bold uppercase tracking-widest text-[#1c1b19] transition-transform hover:scale-105">
                Accepter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Promo Popup (Adidas Style - Bold, Minimal, High Contrast) */}
      <div 
        className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-500 ${
          showPromo ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div 
          className={`relative flex w-full max-w-4xl flex-col overflow-hidden bg-[#f3eee6] shadow-2xl md:flex-row transition-transform duration-700 ease-out ${
            showPromo ? "scale-100 translate-y-0" : "scale-95 translate-y-10"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={closePromo}
            className="absolute right-0 top-0 z-10 flex h-12 w-12 items-center justify-center bg-[#1c1b19] text-[#f3eee6] transition-colors hover:bg-black"
            aria-label="Fermer"
          >
            ✕
          </button>

          {/* Image side */}
          <div className="relative hidden w-1/2 md:block">
            <Image src="/gallery/Kansotex-indoor-riad-tissus-pinterest.png" alt="Promo" fill className="object-cover" />
          </div>

          {/* Content side */}
          <div className="flex flex-col justify-center p-10 md:w-1/2 md:p-14">
            <span className="font-termina mb-3 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#a49a8d]">
              Offre exclusive
            </span>
            <h2 className="font-termina mb-4 text-3xl font-bold uppercase leading-[1.1] tracking-wider text-[#1c1b19] md:text-[2.2rem]">
              -15% SUR <br/>VOTRE PREMIÈRE<br/> COMMANDE
            </h2>
            <p className="font-sans mb-10 text-sm font-light leading-relaxed text-[#1c1b19]/70">
              Inscrivez-vous au club Kansotex et recevez un accès prioritaire à nos collections privées ainsi qu'une remise exceptionnelle sur votre premier projet.
            </p>
            <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); closePromo(); }}>
              <input 
                type="email" 
                required
                placeholder="VOTRE ADRESSE EMAIL" 
                className="border-b-2 border-[#1c1b19]/20 bg-transparent pb-3 font-termina text-[11px] font-bold tracking-widest text-[#1c1b19] outline-none transition-colors focus:border-[#1c1b19] placeholder:text-[#1c1b19]/40"
              />
              <button 
                type="submit" 
                className="mt-2 bg-[#1c1b19] py-5 font-termina text-[11px] font-bold uppercase tracking-widest text-[#f3eee6] transition-transform hover:bg-[#2a2926] hover:scale-[1.02]"
              >
                Debloquer mon offre
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
