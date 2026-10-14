import Link from "next/link";
import Image from "next/image";
import { brand, nav } from "@/lib/content";
import { Wordmark } from "./Logo";
import { CurrencySelector } from "./CurrencySelector";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslations, useLocale } from "next-intl";
import { removeAccents } from "@/lib/text";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  const t = useTranslations("Footer");
  const rawLocale = useLocale();
  const isEn = rawLocale === "en";
  const locale = isEn ? "en" : "fr";

  return (
    <footer className="relative overflow-hidden bg-[#1c1b19] px-6 pb-10 pt-20 text-[#f3eee6] md:px-12 md:pt-32">
      {/* Background Logistics & Shipping Truck Visual (Bottom Left) */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 w-[280px] sm:w-[380px] md:w-[480px] lg:w-[580px] select-none opacity-45 sm:opacity-55 lg:opacity-65 transition-opacity">
        <div className="relative aspect-[16/10] w-full">
          <Image
            src="/gallery/Kansotex-logistique-shipping.jpg"
            alt="Kansotex Logistique & Expédition"
            fill
            className="object-contain object-left-bottom mix-blend-lighten"
            sizes="(max-width: 768px) 380px, (max-width: 1200px) 580px, 640px"
          />
          {/* Subtle gradient fades so edges blend into the dark footer background */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#1c1b19]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1c1b19]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Centered Logo (Refined Luxury Size) */}
        <div className="mb-14 sm:mb-16 flex justify-center border-b border-[#f3eee6]/15 pb-10 sm:pb-12">
          <Link href={`/${locale}`} aria-label="Kansotex" className="transition-opacity hover:opacity-80">
            <Image 
              src="/KANSOTEX-marque-1-white.png" 
              alt="Kansotex" 
              width={400} 
              height={100} 
              className="w-[11.5rem] sm:w-[14.5rem] md:w-[260px] h-auto object-contain" 
            />
          </Link>
        </div>

        {/* Top Section: Newsletter */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="w-full max-w-lg">
            <h3 className="font-termina mb-5 text-[15px] font-bold uppercase leading-relaxed tracking-[0.15em] sm:text-lg md:text-xl">
              {removeAccents(t("joinKansotex"))}
            </h3>
            <p className="font-sans mb-10 text-[13px] font-light leading-[1.8] text-[#f3eee6]/70">
              {t("newsletterDesc")}
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 gap-12 border-t border-[#f3eee6]/15 pt-20 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          
          {/* Navigation */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">{removeAccents(t("discover"))}</h4>
            <ul className="flex flex-col gap-5">
              {nav.map((item) => {
                let translationKey = "navUnivers";
                if (item.href === "/savoir-faire") translationKey = "navSavoirFaire";
                if (item.href === "/a-propos") translationKey = "navAbout";
                if (item.href === "/contact") translationKey = "navContact";
                return (
                  <li key={item.href}>
                    <Link href={`/${locale}${item.href}`} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                      {removeAccents((t as any)(translationKey))}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href={`/${locale}/gallery`} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                  {removeAccents((t as any)("navGallery") || (isEn ? "Gallery & Projects" : "Galerie & Réalisations"))}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                  {removeAccents(isEn ? "The Journal" : "Le Journal")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">{removeAccents(t("customerService"))}</h4>
            <ul className="flex flex-col gap-5">
              <li><Link href={`/${locale}/faq`} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">{removeAccents(t("faq"))}</Link></li>
              <li><Link href={`/${locale}/livraison`} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">{removeAccents(t("shippingReturns"))}</Link></li>
              <li><Link href={`/${locale}/echantillons`} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">{removeAccents(t("samples"))}</Link></li>
              <li><Link href={`/${locale}/guide`} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">{removeAccents(t("careGuide"))}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">{removeAccents(t("contactUs"))}</h4>
            <ul className="flex flex-col gap-3 font-sans text-xs">
              <li>
                <a href={`mailto:${brand.email}`} className="font-semibold text-white/90 hover:text-white transition-colors block">
                  {brand.email}
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase tracking-wider text-[#a49a8d] block">{isEn ? "General" : "Général"}</span>
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="text-white/80 hover:text-white transition-colors">
                  {brand.phone}
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase tracking-wider text-[#a49a8d] block">{isEn ? "Trade Office & WhatsApp" : "Bureau Pros & WhatsApp"}</span>
                <a href={brand.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                  {brand.phonePro}
                </a>
              </li>
              <li>
                <span className="text-[10px] uppercase tracking-wider text-[#a49a8d] block">{isEn ? "Manufacture Atelier" : "Manufacture"}</span>
                <a href={`tel:${brand.phoneManufacture.replace(/\s/g, "")}`} className="text-white/80 hover:text-white transition-colors">
                  {brand.phoneManufacture}
                </a>
              </li>
              <li className="pt-2 text-[11px] font-light leading-relaxed text-[#f3eee6]/60 border-t border-white/10">
                {brand.address}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">{removeAccents(t("socials"))}</h4>
            <ul className="flex flex-col gap-5">
              <li>
                <a href={brand.instagram} target="_blank" rel="noreferrer" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                  INSTAGRAM
                </a>
              </li>
              <li>
                <a href={brand.facebook} target="_blank" rel="noreferrer" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                  FACEBOOK
                </a>
              </li>
              <li>
                <a href={brand.pinterest} target="_blank" rel="noreferrer" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                  PINTEREST
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-28 flex flex-col items-center justify-between gap-8 border-t border-[#f3eee6]/10 pt-10 font-sans text-xs font-light text-[#f3eee6]/40 md:flex-row">
          <div className="flex items-center gap-6">
            <p className="font-termina text-[9px] font-bold uppercase tracking-[0.2em]">© 2026 {brand.name} · {brand.legalName}. {removeAccents(t("allRightsReserved"))}</p>
            <div className="hidden md:block w-px h-3 bg-[#f3eee6]/20"></div>
            <CurrencySelector isDark={true} />
            <div className="hidden md:block w-px h-3 bg-[#f3eee6]/20"></div>
            <LanguageSelector />
          </div>
          <ul className="flex flex-wrap justify-center gap-6 md:gap-10">
            <li><Link href={`/${locale}/mentions-legales`} className="font-termina text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#f3eee6]">{removeAccents(t("legalNotices"))}</Link></li>
            <li><Link href={`/${locale}/confidentialite`} className="font-termina text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#f3eee6]">{removeAccents(t("privacy"))}</Link></li>
            <li><Link href={`/${locale}/cgv`} className="font-termina text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#f3eee6]">{removeAccents(t("cgv"))}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
