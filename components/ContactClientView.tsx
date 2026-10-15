"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { useCurrency, CurrencyCode } from "@/lib/CurrencyContext";
import { NavbarRightActions } from "@/components/NavbarRightActions";
import { LuxuryMenuOverlay } from "@/components/LuxuryMenuOverlay";

export function ContactClientView() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith("/en");
  const locale = isEn ? "en" : "fr";
  const [menuOpen, setMenuOpen] = useState(false);

  // Form State
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "rendez-vous",
    message: "",
  });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setSent(true);
      } else {
        alert(isEn ? "An error occurred while sending. Please try again." : "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
      }
    } catch {
      alert(isEn ? "Connection error. Please check your network." : "Erreur de connexion. Veuillez vérifier votre réseau.");
    } finally {
      setLoading(false);
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
          <NavbarRightActions contactHref="#contact-form" />
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 space-y-16 sm:space-y-24">

        {/* ============================================================ */}
        {/* 2. THE SIGNATURE HERO CARD WITH GOOGLE MAPS (Adapted Colors) */}
        {/* ============================================================ */}
        <section className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[21/10] min-h-[380px] sm:min-h-[460px] mb-8 sm:mb-12 group">
          {/* Rounded Hero Map Wrapper */}
          <div className="absolute inset-0 rounded-[26px] sm:rounded-[36px] overflow-hidden bg-[#e8e2d5] border-t border-x border-[#e8e4db] shadow-xs">
            {/* Google Maps iframe with adaptable cream/sepia luxury filter */}
            <iframe
              title="Kansotex Manufacture &amp; Showroom Marrakech - 983 Al Massar"
              src="https://maps.google.com/maps?q=983+Al+Massar,+Rte+de+Safi,+Marrakech+40100&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0 transition-all duration-700 group-hover:opacity-95"
              style={{
                filter: "grayscale(80%) sepia(28%) contrast(92%) brightness(97%)",
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Ambient Lighting Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />

            {/* Top location badge inside the hero */}
            <div className="absolute top-6 left-6 sm:top-9 sm:left-9 z-10 pointer-events-none">
              <span className="px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#ded5c5] text-[#1c1b19] text-[11px] font-sans tracking-widest uppercase font-medium shadow-xs">
                Marrakech · Atelier &amp; Showroom Al Massar
              </span>
            </div>
          </div>

          {/* Bottom Center Notch Cutout (Signature Kansotex Style) */}
          <div className="absolute -bottom-7 sm:-bottom-8 inset-x-0 flex justify-center z-20 pointer-events-none">
            <div className="relative pointer-events-auto bg-cream px-6 sm:px-7 py-3 rounded-[26px] sm:rounded-[30px] flex items-center justify-center">
              <a
                href="https://maps.google.com/?q=983+Al+Massar,+Rte+de+Safi,+Marrakech+40100"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#1c1b19] text-[#faf8f5] hover:bg-black px-6 sm:px-8 py-3 rounded-full text-xs font-sans font-semibold tracking-wider uppercase transition-all hover:scale-[1.02]"
              >
                <span>Itinéraire Google Maps</span>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. THE HORIZON EDITORIAL CONTACT SHOWCASE (Exact Reference) */}
        {/* ============================================================ */}
        <section id="contact-details" className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-2">

          {/* Left Column (5 cols): Huge Title, Subtitle, and Social Links */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-10 sm:space-y-16">
            <div className="space-y-5">
              <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1c1b19] leading-[1.05]">
                Contact us
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/60 max-w-sm leading-relaxed">
                Échangez avec notre manufacture pour vos projets d&apos;étoffes, confections sur-mesure et aménagements in &amp; outdoor.
              </p>
            </div>

            {/* Social Links Row (Anchored on bottom like reference) */}
            <div className="pt-6 border-t border-[#ded6c8] flex flex-wrap items-center gap-6 text-xs font-sans text-[#1c1b19]">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-55 transition-opacity"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/212661090950"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-55 transition-opacity"
              >
                WhatsApp
              </a>
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-55 transition-opacity"
              >
                Pinterest
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-55 transition-opacity"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Column (7 cols): 2x2 Contact Info Grid + Panoramic Architectural Photo */}
          <div className="lg:col-span-7 space-y-10">
            {/* 2x2 Touchpoint Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs font-sans">
              {/* Block 1: General Inquiries */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#1c1b19]/45 font-medium block">
                  Renseignements Généraux
                </span>
                <a
                  href="mailto:contact@kansotex.com"
                  className="font-semibold text-sm text-[#1c1b19] hover:underline block"
                >
                  contact@kansotex.com
                </a>
                <a href="tel:+212524200996" className="text-[#1c1b19]/70 hover:text-[#1c1b19] block transition-colors">
                  +212 5 24 20 09 96
                </a>
              </div>

              {/* Block 2: Collaborations & Pros */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#1c1b19]/45 font-medium block">
                  Bureau Technique &amp; Pros
                </span>
                <a
                  href="mailto:pro@kansotex.com"
                  className="font-semibold text-sm text-[#1c1b19] hover:underline block"
                >
                  pro@kansotex.com
                </a>
                <a href="https://wa.me/212661090950" target="_blank" rel="noopener noreferrer" className="text-[#1c1b19]/70 hover:text-[#1c1b19] block transition-colors">
                  +212 6 61 09 09 50 (WhatsApp Pro)
                </a>
              </div>

              {/* Block 3: Manufacture & Atelier */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#1c1b19]/45 font-medium block">
                  Manufacture &amp; Équipe
                </span>
                <a
                  href="mailto:atelier@kansotex.com"
                  className="font-semibold text-sm text-[#1c1b19] hover:underline block"
                >
                  atelier@kansotex.com
                </a>
                <a href="tel:+212808541686" className="text-[#1c1b19]/70 hover:text-[#1c1b19] block transition-colors">
                  +212 8 08 54 16 86
                </a>
              </div>

              {/* Block 4: Physical Address */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-sans uppercase tracking-widest text-[#1c1b19]/45 font-medium block">
                  Adresse Atelier &amp; Showroom
                </span>
                <p className="font-semibold text-sm text-[#1c1b19]">
                  983 Al Massar, Rte de Safi
                </p>
                <p className="text-[#1c1b19]/70">
                  Marrakech 40100, Maroc
                </p>
              </div>
            </div>

            {/* Architectural Bedroom / Lifestyle Visual (Matching Reference Image) */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-cream-dark border border-[#ded5c5] shadow-xs">
              <Image
                src="/gallery/bedroom_lifestyle_1791052936092.jpg"
                alt="Intérieur textile chaleureux Kansotex"
                fill
                priority
                className="object-cover object-center"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
                <span className="text-[10px] font-sans uppercase tracking-widest text-white/70 block">
                  Ambiance Textile
                </span>
                <p className="text-xs sm:text-sm font-sans font-medium mt-0.5">
                  Confection sur-mesure de lin d&apos;Atlas et draperies chaudes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. DEDICATED CONTACT FORM + DEVIS INVITATION BANNER */}
        {/* ============================================================ */}
        <section className="pt-6 border-t border-[#ded6c8] space-y-12">
          {/* Pro / Bespoke Quote Highlight Banner */}
          <div className="rounded-2xl sm:rounded-3xl bg-[#1c1b19] text-[#faf8f5] p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-2xl z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#d4af37] text-[10px] font-sans uppercase tracking-widest font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />
                {isEn ? "Trade & Bespoke Estimation" : "Bureau d'Études & Sur-Mesure"}
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-white">
                {isEn ? "Need a Technical Study or Bespoke Fabric Quote?" : "Besoin d'un chiffrage précis ou d'une étude technique ?"}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
                {isEn
                  ? "Architects, riads, luxury hotels and private residences: use our dedicated Quote Form for yardage calculations, sample requests, and 24h tailor estimates."
                  : "Architectes, riads, hôtels et villas : accédez à notre formulaire de devis dédié pour vos calculs de métrages, sélections d'échantillons et confections d'atelier."}
              </p>
            </div>
            <div className="shrink-0 z-10 w-full sm:w-auto">
              <Link
                href={`/${locale}/devis`}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#1c1b19] hover:text-[#fff] hover:bg-[#1c1b19] font-sans text-xs font-semibold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02]"
              >
                <span>{isEn ? "Open Quote Request Form →" : "Accéder au Formulaire de Devis →"}</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-2">
            {/* Form Left Side: Editorial Context */}
            <div className="lg:col-span-5 space-y-4">
              <span className="font-termina text-[10px] font-bold uppercase tracking-[0.25em] text-[#1c1b19]/45 block">
                {isEn ? "CUSTOMER CARE & INQUIRIES" : "SERVICE CLIENT & CONCIERGERIE"}
              </span>
              <h2 className="font-sans text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#1c1b19] leading-tight">
                {isEn ? "SEND US A MESSAGE" : "ENVOYEZ-NOUS UN MESSAGE"}
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/65 leading-relaxed">
                {isEn
                  ? "A question about our collections, booking a private visit at our Marrakech showroom, or tracking your order: leave us a message, our team responds promptly."
                  : "Une question sur nos étoffes, une prise de rendez-vous dans notre showroom d'Al Massar ou un suivi de commande : écrivez-nous, nos conseillers vous répondent avec attention."}
              </p>

              {/* Direct Conciergerie WhatsApp Pill */}
              <div className="pt-4">
                <a
                  href="https://wa.me/212661090950"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1c1b19] text-[#faf8f5] hover:bg-black text-xs font-sans font-medium transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                  <span>{isEn ? "Direct WhatsApp Concierge" : "Échange Direct WhatsApp Conciergerie"}</span>
                </a>
              </div>
            </div>

            {/* Form Right Side: Pure Contact Form */}
            <div className="lg:col-span-7">
              {sent ? (
                <div className="p-8 sm:p-10 rounded-2xl bg-[#ebe5d8]/70 border border-[#ded5c5] space-y-3">
                  <h3 className="font-sans text-xl font-bold text-[#1c1b19]">
                    {isEn ? "Your message has been sent successfully." : "Votre message a bien été envoyé."}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#1c1b19]/70 leading-relaxed">
                    {isEn
                      ? "Thank you for reaching out to Kansotex. Our customer care team will get back to you shortly."
                      : "Merci d'avoir contacté la Maison Kansotex. Notre service client prend connaissance de votre message et vous répondra dans les plus brefs délais."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "rendez-vous",
                        message: "",
                      });
                    }}
                    className="text-xs font-sans underline underline-offset-4 text-[#1c1b19] pt-2"
                  >
                    {isEn ? "Send another message" : "Envoyer un autre message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <label className="block space-y-1.5">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-medium block">
                        {isEn ? "Full Name *" : "Nom & Prénom *"}
                      </span>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isEn ? "Your full name" : "Votre nom complet"}
                        className="w-full bg-transparent border-b border-[#1c1b19]/25 py-2.5 text-xs sm:text-sm font-sans text-[#1c1b19] placeholder:text-[#1c1b19]/35 outline-none focus:border-[#1c1b19] transition-colors"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-medium block">
                        {isEn ? "Email Address *" : "Adresse Email *"}
                      </span>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="exemple@domaine.com"
                        className="w-full bg-transparent border-b border-[#1c1b19]/25 py-2.5 text-xs sm:text-sm font-sans text-[#1c1b19] placeholder:text-[#1c1b19]/35 outline-none focus:border-[#1c1b19] transition-colors"
                      />
                    </label>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <label className="block space-y-1.5">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-medium block">
                        {isEn ? "Phone / WhatsApp" : "Téléphone / WhatsApp"}
                      </span>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+212 6..."
                        className="w-full bg-transparent border-b border-[#1c1b19]/25 py-2.5 text-xs sm:text-sm font-sans text-[#1c1b19] placeholder:text-[#1c1b19]/35 outline-none focus:border-[#1c1b19] transition-colors"
                      />
                    </label>

                    <label className="block space-y-1.5">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-medium block">
                        {isEn ? "Subject of Inquiry" : "Objet de votre message"}
                      </span>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-transparent border-b border-[#1c1b19]/25 py-2.5 text-xs sm:text-sm font-sans text-[#1c1b19] outline-none focus:border-[#1c1b19] transition-colors cursor-pointer"
                      >
                        <option value="rendez-vous">
                          {isEn ? "Showroom Appointment (Marrakech)" : "Prise de rendez-vous Showroom (Al Massar)"}
                        </option>
                        <option value="info-collections">
                          {isEn ? "Collections & Fabrics Information" : "Information sur nos étoffes & collections"}
                        </option>
                        <option value="suivi-commande">
                          {isEn ? "Order Tracking & Delivery" : "Suivi de commande ou livraison"}
                        </option>
                        <option value="partenariat">
                          {isEn ? "Partnership, Press & Events" : "Partenariat, Presse & Événementiel"}
                        </option>
                        <option value="autre">
                          {isEn ? "Other General Question" : "Autre demande générale"}
                        </option>
                      </select>
                    </label>
                  </div>

                  {/* Message Field */}
                  <label className="block space-y-1.5">
                    <span className="text-[10px] font-sans uppercase tracking-widest text-[#1c1b19]/50 font-medium block">
                      {isEn ? "Your Message *" : "Votre Message *"}
                    </span>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        isEn
                          ? "How can our team assist you today?"
                          : "Comment notre équipe peut-elle vous renseigner ?"
                      }
                      className="w-full resize-none bg-transparent border-b border-[#1c1b19]/25 py-2.5 text-xs sm:text-sm font-sans text-[#1c1b19] placeholder:text-[#1c1b19]/35 outline-none focus:border-[#1c1b19] transition-colors"
                    />
                  </label>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-8 py-3.5 rounded-full bg-[#1c1b19] text-[#faf8f5] hover:bg-black text-xs font-sans font-semibold tracking-wider uppercase transition-all hover:scale-[1.01] disabled:opacity-50 text-center"
                    >
                      {loading
                        ? isEn
                          ? "Sending..."
                          : "Envoi en cours..."
                        : isEn
                        ? "Send Message"
                        : "Envoyer mon message"}
                    </button>
                    <span className="text-[11px] font-sans text-[#1c1b19]/50">
                      {isEn ? "Quick response from our Marrakech team" : "Réponse rapide de notre équipe à Marrakech"}
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
