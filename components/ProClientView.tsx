"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useCurrency, CurrencyCode } from "@/lib/CurrencyContext";
import { motion, AnimatePresence } from "framer-motion";
import { LuxuryMenuOverlay } from "@/components/LuxuryMenuOverlay";
import { loginAsPro } from "@/lib/session";
import { requestOtp, verifyOtpAndLogin, completeSignupAndLogin } from "@/lib/auth";

const PRO_PRIVILEGES = [
  {
    number: "01",
    title: "Tarifs Préférentiels jusqu'à -30%",
    desc: "Bénéficiez de remises d'éditeur directes appliquées automatiquement sur l'ensemble de nos étoffes, voilages et métrages au rouleau.",
  },
  {
    number: "02",
    title: "Nuanciers Techniques Offerts sous 48h",
    desc: "Recevez en priorité nos coffrets d'échantillons réels directement à votre agence pour vos présentations clients et moodboards.",
  },
  {
    number: "03",
    title: "Bureau d'Études & Calepinage Dédié",
    desc: "Partagez vos plans DWG ou photos in situ. Nos techniciens calculent les métrages précis, têtes de rideaux et tombés de draperie sous 24h.",
  },
  {
    number: "04",
    title: "Confection d'Atelier & Suivi de Pose",
    desc: "Façonnage sur-mesure dans notre manufacture de Marrakech sans intermédiaire, avec conditionnement soigné et assistance à l'installation.",
  },
];

const SECTORS_DATA = [
  {
    title: "Riads de Caractère & Boutiques Hôtels",
    desc: "Tentures grande hauteur, voilages légers filtrants et banquettes marocaines modernes adaptées aux fortes fréquentations.",
    image: "/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png",
  },
  {
    title: "Villas d'Exception & Résidences Privées",
    desc: "Lins lavés lourds, velours d'apparat et confections déhoussables alliant raffinement tactile et entretien simplifié.",
    image: "/gallery/linge-de-maison-indoor-villa-kansotex.jpg",
  },
  {
    title: "Espaces Plein Air, Terrasses & Rooftops",
    desc: "Toiles techniques haute densité traitées déperlantes et anti-UV pour pergolas, transats piscine et banquettes extérieures.",
    image: "/gallery/Kansotex-outdoor-terasse-rooftop-2.jpg",
  },
];

import { NavbarRightActions } from "@/components/NavbarRightActions";
import { useSession } from "@/lib/SessionContext";
import { ProDashboardView } from "@/components/ProDashboardView";

export function ProClientView() {
  const { session } = useSession();

  // If already authenticated as Pro, immediately show Pro Dashboard
  if (session?.isPro) {
    return <ProDashboardView session={session} />;
  }

  const [menuOpen, setMenuOpen] = useState(false);

  // Pro Form States: 'email' -> 'otp' -> 'signup'
  const [step, setStep] = useState<"email" | "otp" | "signup">("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Form data
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [, setIsNewUser] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    siret: "",
    role: "ARCHITECT" as "ARCHITECT" | "DECORATOR" | "HOTEL",
  });

  // Countdown timer for OTP resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Lock body scroll when menu overlay is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  // Demo Login handler
  const handleDemoLogin = async (role: "ARCHITECT" | "DECORATOR", discount: number) => {
    setIsLoading(true);
    await loginAsPro(role, discount);
    window.location.href = "/pro";
  };

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);
    setSuccessNotice(null);
    try {
      const res = await requestOtp(email);
      if (res.success) {
        setIsNewUser(!res.userExists);
        setStep("otp");
        setResendCooldown(45);
        setSuccessNotice(`Un code de sécurité a été envoyé à ${email}.`);
      } else {
        setError(res.error || "Erreur lors de l'envoi du code.");
      }
    } catch {
      setError("Erreur lors de l'envoi du code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isLoading || !email) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await requestOtp(email);
      if (res.success) {
        setResendCooldown(45);
        setSuccessNotice(`Nouveau code envoyé par email à ${email}.`);
      } else {
        setError(res.error || "Erreur lors du renvoi du code.");
      }
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await verifyOtpAndLogin(email, otpCode);
      if (res.success) {
        if (res.isNewUser) {
          setStep("signup");
        } else {
          window.location.href = "/pro";
        }
      } else {
        setError(res.error || "Code invalide.");
      }
    } catch {
      setError("Erreur de vérification.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupData.companyName || !signupData.siret || !signupData.firstName || !signupData.lastName) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await completeSignupAndLogin(email, signupData);
      if (res.success) {
        window.location.href = "/pro";
      }
    } catch {
      setError("Erreur lors de la création du compte.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream text-[#1c1b19] font-sans antialiased selection:bg-[#1c1b19] selection:text-white pb-24">
      {/* ============================================================ */}
      {/* FULL SCREEN / SLIDE-IN LUXURY MENU OVERLAY */}
      {/* ============================================================ */}
      <LuxuryMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ============================================================ */}
      {/* 1. FLOATING NAVIGATION BAR */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur-md border-b border-[#e9e5dd] py-3.5 transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative flex items-center justify-between min-h-[48px]">
          {/* Left: Burger Menu Button */}
          <div className="flex items-center z-10">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="relative z-20 flex h-6 w-6 flex-col items-center justify-center gap-1.5 cursor-pointer hover:opacity-65 transition-opacity"
              aria-label="Ouvrir le menu"
            >
              <span className="block h-[1px] w-5 bg-[#1c1b19] transition-all duration-300" />
              <span className="block h-[1px] w-5 bg-[#1c1b19] transition-all duration-300" />
              <span className="block h-[1px] w-5 bg-[#1c1b19] transition-all duration-300" />
            </button>
          </div>

          {/* Truly Centered Brand Logo */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none">
            <Link href="/" aria-label="Kansotex" className="pointer-events-auto shrink-0 flex items-center justify-center">
              <Image
                src="/KANSOTEX-marque-Black.png"
                alt="Kansotex"
                width={500}
                height={120}
                className="w-[140px] sm:w-[170px] h-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Right Action Controls */}
          <NavbarRightActions />
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 space-y-16 sm:space-y-24">

        {/* ============================================================ */}
        {/* 2. THE GRAND ARCHITECTURAL HERO WITH BOTTOM CUTOUT LOGIN CARD */}
        {/* ============================================================ */}
        <section className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[21/10] min-h-[540px] sm:min-h-[560px] mb-48 sm:mb-56 lg:mb-64 group">
          {/* Rounded Hero Image Wrapper */}
          <div className="absolute inset-0 rounded-[26px] sm:rounded-[36px] overflow-hidden bg-[#24211d] border-t border-x border-[#e8e4db] shadow-xs">
            <Image
              src="/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png"
              alt="Espace Professionnel Kansotex Marrakech"
              fill
              priority
              className="object-cover object-center brightness-[0.88] transition-transform duration-1000 group-hover:scale-[1.02]"
              sizes="100vw"
            />
            {/* Ambient Lighting Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />

            {/* Upper Content inside the Hero */}
            <div className="absolute inset-x-0 top-0 pt-7 sm:pt-10 px-6 sm:px-12 flex flex-col items-center text-center z-10 space-y-3 sm:space-y-3.5">
              {/* Brand Pill Capsule */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-white text-[11px] font-sans tracking-widest uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                <span>Marrakech · Espace Architectes &amp; Décorateurs</span>
              </div>

              {/* Main Headline (Termina strictly for uppercase letters, apostrophe in font-sans to fix font metric bug) */}
              <h1 className="font-termina text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.14em] text-white leading-tight drop-shadow-sm max-w-4xl">
                <span>ESPACE PROFESSIONNEL</span>
              </h1>

              {/* Concise Editorial Subtitle */}
              <p className="font-sans text-xs sm:text-sm text-white/80 font-light leading-relaxed max-w-xl drop-shadow-xs">
                Kansotex accompagne les architectes, décorateurs d&apos;intérieur et hôteliers dans la réalisation de leurs projets d&apos;exception.
              </p>
            </div>
          </div>

          {/* Bottom Center Cutout Notch holding the Pro Login Card (Sitting low & protruding out of hero) */}
          <div className="absolute -bottom-36 sm:-bottom-44 lg:-bottom-48 inset-x-0 flex justify-center z-20 pointer-events-none px-4">
            <div className="relative pointer-events-auto bg-cream p-2.5 sm:p-3.5 rounded-[28px] sm:rounded-[36px] w-full max-w-lg md:max-w-xl shadow-xs">
              {/* The Black Luxury Login Card */}
              <div className="rounded-[22px] sm:rounded-[30px] bg-[#1c1b19] text-[#faf8f5] p-6 sm:p-8 sm:p-9 border border-white/10 shadow-2xl relative space-y-5">
                {/* Dev Quick Demo Login Pill */}
                <div className="flex justify-between items-center pb-2.5 border-b border-white/10">
                  <span className="text-[10px] font-sans uppercase tracking-widest text-[#d8cbb6] font-medium">
                    Portail Sécurisé Pro
                  </span>
                  <div className="flex items-center gap-2">
                    <Link
                      href="/pro/dashboard"
                      className="text-[10px] font-sans font-medium text-[#c5a059] hover:text-white underline transition-all"
                    >
                      Aperçu Tableau de bord →
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDemoLogin("ARCHITECT", 0.25)}
                      className="text-[10px] font-sans font-medium text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/15 transition-all cursor-pointer"
                    >
                      Connexion Démo (-25%)
                    </button>
                  </div>
                </div>

                {/* Card Title & Instructions */}
                <div className="space-y-1">
                  <h2 className="font-sans text-lg sm:text-xl font-bold uppercase tracking-wide text-[#faf8f5]">
                    Espace Professionnel
                  </h2>
                  <p className="text-xs font-sans text-white/60 leading-relaxed">
                    {step === "email" && "Connectez-vous ou créez votre compte pro avec votre adresse email."}
                    {step === "otp" && `Un code de sécurité à 6 chiffres a été envoyé à ${email}.`}
                    {step === "signup" && "Complétez votre profil d'entreprise pour valider vos remises."}
                  </p>
                </div>

                {/* Success Banner */}
                {successNotice && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-emerald-200 text-xs font-sans flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{successNotice}</span>
                  </div>
                )}

                {/* Error Banner */}
                {error && (
                  <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/60 text-red-300 text-xs font-sans">
                    {error}
                  </div>
                )}

                {/* Step Forms */}
                <div className="min-h-[190px]">
                  <AnimatePresence mode="wait">
                    {/* Step 1: Email Request */}
                    {step === "email" && (
                      <motion.form
                        key="step-email"
                        onSubmit={handleRequestOtp}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="space-y-5"
                      >
                        <div className="space-y-1.5">
                          <label className="block text-[10px] font-sans uppercase tracking-widest text-white/60">
                            Email Professionnel *
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="contact@studio.com"
                            required
                            className="w-full bg-transparent border-b border-white/25 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white outline-none transition-colors font-sans"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3.5 rounded-full bg-white text-[#1c1b19] hover:bg-[#e8e2d5] font-sans font-semibold text-xs tracking-wider uppercase transition-all hover:scale-[1.01] disabled:opacity-50 mt-4 shadow-xs"
                        >
                          {isLoading ? "Envoi du code sécurisé..." : "Continuer"}
                        </button>
                      </motion.form>
                    )}

                    {/* Step 2: 6-digit OTP Verification */}
                    {step === "otp" && (
                      <motion.form
                        key="step-otp"
                        onSubmit={handleVerifyOtp}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="space-y-4"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="block text-[10px] font-sans uppercase tracking-widest text-white/60">
                              Code de Sécurité à 6 chiffres *
                            </label>
                            <span className="text-[10px] text-[#c5a880] uppercase tracking-wider font-mono">
                              Valide 15 min
                            </span>
                          </div>
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            autoComplete="one-time-code"
                            autoFocus
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                            placeholder="000000"
                            required
                            className="w-full bg-transparent border-b border-white/25 py-2 text-2xl tracking-[0.45em] text-white placeholder:text-white/20 focus:border-white outline-none transition-colors font-mono text-center sm:text-left"
                          />
                        </div>

                        {/* Resend OTP Link & Spam Guidance */}
                        <div className="flex items-center justify-between text-xs font-sans pt-0.5">
                          <span className="text-white/45 text-[11px]">
                            Code non reçu ? (Vérifiez spams)
                          </span>
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={resendCooldown > 0 || isLoading}
                            className="text-[#c5a880] hover:text-white underline font-medium text-[11px] disabled:opacity-40 disabled:no-underline transition-colors cursor-pointer disabled:cursor-not-allowed"
                          >
                            {resendCooldown > 0 ? `Renvoyer (${resendCooldown}s)` : "Renvoyer le code"}
                          </button>
                        </div>

                        <div className="flex gap-3 pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              setStep("email");
                              setOtpCode("");
                              setError(null);
                              setSuccessNotice(null);
                            }}
                            className="px-4 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-sans font-medium transition-colors"
                          >
                            Modifier
                          </button>
                          <button
                            type="submit"
                            disabled={isLoading || otpCode.length < 6}
                            className="flex-1 py-3 rounded-full bg-white text-[#1c1b19] hover:bg-[#e8e2d5] text-xs font-sans font-semibold tracking-wider uppercase transition-all disabled:opacity-50"
                          >
                            {isLoading ? "Vérification..." : "Valider mon accès"}
                          </button>
                        </div>
                      </motion.form>
                    )}

                    {/* Step 3: Complete Pro Profile */}
                    {step === "signup" && (
                      <motion.form
                        key="step-signup"
                        onSubmit={handleCompleteSignup}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-sans uppercase tracking-widest text-white/60">Prénom *</label>
                            <input
                              type="text"
                              required
                              value={signupData.firstName}
                              onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                              className="w-full bg-transparent border-b border-white/25 py-2 text-xs text-white outline-none focus:border-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-sans uppercase tracking-widest text-white/60">Nom *</label>
                            <input
                              type="text"
                              required
                              value={signupData.lastName}
                              onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                              className="w-full bg-transparent border-b border-white/25 py-2 text-xs text-white outline-none focus:border-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[10px] font-sans uppercase tracking-widest text-white/60">Nom de l&apos;Entreprise *</label>
                          <input
                            type="text"
                            required
                            value={signupData.companyName}
                            onChange={(e) => setSignupData({ ...signupData, companyName: e.target.value })}
                            placeholder="Studio d'Architecture..."
                            className="w-full bg-transparent border-b border-white/25 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-sans uppercase tracking-widest text-white/60">ICE / Patente *</label>
                            <input
                              type="text"
                              required
                              value={signupData.siret}
                              onChange={(e) => setSignupData({ ...signupData, siret: e.target.value })}
                              placeholder="Numéro ICE..."
                              className="w-full bg-transparent border-b border-white/25 py-2 text-xs text-white placeholder:text-white/30 outline-none focus:border-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="block text-[10px] font-sans uppercase tracking-widest text-white/60">Activité *</label>
                            <select
                              value={signupData.role}
                              onChange={(e) => setSignupData({ ...signupData, role: e.target.value as any })}
                              className="w-full bg-transparent border-b border-white/25 py-2 text-xs text-white outline-none focus:border-white cursor-pointer"
                            >
                              <option value="ARCHITECT" className="bg-[#1c1b19] text-white">Architecte</option>
                              <option value="DECORATOR" className="bg-[#1c1b19] text-white">Décorateur</option>
                              <option value="HOTEL" className="bg-[#1c1b19] text-white">Hôtellerie</option>
                            </select>
                          </div>
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full py-3 rounded-full bg-white text-[#1c1b19] hover:bg-[#e8e2d5] text-xs font-sans font-semibold tracking-wider uppercase transition-all mt-3"
                        >
                          {isLoading ? "Création..." : "Finaliser mon Compte"}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/50 font-sans">
                  <span>Activation immédiate des tarifs pro</span>
                  <a href="mailto:pro@kansotex.com" className="hover:text-white underline">Aide &amp; Contact Pro</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. 4 PRIVILEGES BENTO GRID */}
        {/* ============================================================ */}
        <section className="space-y-8 pt-2">
          <div className="space-y-2">
            <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#1c1b19]/45 block">
              SERVICES ET PRIVILÈGES PRO
            </span>
            <h2 className="font-termina text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] text-[#1c1b19]">
              DES AVANTAGES CONÇUS POUR LES CRÉATEURS
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/65 max-w-xl">
              Des remises éditeur directes, un bureau d&apos;études à votre disposition et une confection d&apos;atelier sans intermédiaire à Marrakech.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRO_PRIVILEGES.map((item) => (
              <div
                key={item.number}
                className="p-6 rounded-2xl bg-[#ebe5d8]/60 border border-[#ded5c5] space-y-2.5 hover:border-[#1c1b19]/40 transition-colors"
              >
                <span className="text-xl sm:text-2xl font-bold text-[#1c1b19]/30 font-sans block">
                  {item.number}
                </span>
                <h3 className="font-sans text-sm font-semibold text-[#1c1b19]">
                  {item.title}
                </h3>
                <p className="font-sans text-xs text-[#1c1b19]/65 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. DOMAINES D'INTERVENTION & RÉALISATIONS PRO */}
        {/* ============================================================ */}
        <section className="space-y-8 pt-4">
          <div className="pb-4 border-b border-[#ded6c8] flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#1c1b19]/45 block mb-1">
                SECTEURS D&apos;APPLICATION
              </span>
              <h2 className="font-termina text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-[0.1em] text-[#1c1b19]">
                RÉALISATIONS ET CONFECTIONS SUR-MESURE
              </h2>
            </div>
            <span className="text-xs font-sans text-[#1c1b19]/50 tracking-wider">
              Chantiers &amp; Projets d&apos;Édition
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {SECTORS_DATA.map((sec, idx) => (
              <div key={idx} className="group flex flex-col space-y-3.5">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-dark border border-[#ded5c5]">
                  <Image
                    src={sec.image}
                    alt={sec.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-sans text-base font-semibold text-[#1c1b19]">
                    {sec.title}
                  </h3>
                  <p className="font-sans text-xs text-[#1c1b19]/65 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. ATELIER REASSURANCE RIBBON */}
        {/* ============================================================ */}
        <section className="bg-[#ebe5d8]/70 rounded-2xl p-6 sm:p-9 border border-[#ded5c5]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-[#ded9cf]">
            <div className="sm:px-4 first:pl-0 space-y-1 pt-3 sm:pt-0">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1c1b19]">
                Nuanciers Prioritaires sous 48h
              </h4>
              <p className="font-sans text-[11px] text-[#1c1b19]/60 leading-relaxed">
                Expédition directe de vos sélections de lin, velours et toiles techniques à votre cabinet partout au Maroc et à l&apos;étranger.
              </p>
            </div>

            <div className="sm:px-4 space-y-1 pt-4 sm:pt-0">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1c1b19]">
                Normes Non-Feu M1 &amp; Crib 5
              </h4>
              <p className="font-sans text-[11px] text-[#1c1b19]/60 leading-relaxed">
                Traitements ignifuges et certificats techniques fournis sur demande pour vos chantiers classés et hôtellerie de luxe.
              </p>
            </div>

            <div className="sm:px-4 last:pr-0 space-y-1 pt-4 sm:pt-0">
              <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-[#1c1b19]">
                Atelier Confection a Marrakech
              </h4>
              <p className="font-sans text-[11px] text-[#1c1b19]/60 leading-relaxed">
                Circuit court direct manufacture garantissant une réactivité maximale et une maîtrise totale de la qualité de confection.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
