import Link from "next/link";
import Image from "next/image";
import { brand, nav } from "@/lib/content";
import { Wordmark } from "./Logo";
import { CurrencySelector } from "./CurrencySelector";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  return (
    <footer className="bg-[#1c1b19] px-6 pb-10 pt-20 text-[#f3eee6] md:px-12 md:pt-32">
      <div className="mx-auto max-w-7xl">
        {/* Massive Centered Logo */}
        <div className="mb-20 flex justify-center border-b border-[#f3eee6]/15 pb-16">
          <Link href="/" aria-label="Kansotex" className="transition-opacity hover:opacity-80">
            <Image 
              src="/KANSOTEX-marque-1-white.png" 
              alt="Kansotex" 
              width={450} 
              height={150} 
              className="w-[18rem] h-auto sm:w-[26rem] md:w-[450px]" 
            />
          </Link>
        </div>

        {/* Top Section: Newsletter */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="w-full max-w-lg">
            <h3 className="font-termina mb-5 text-[15px] font-bold uppercase leading-relaxed tracking-[0.15em] sm:text-lg md:text-xl">
              {t("joinKansotex")}
            </h3>
            <p className="font-sans mb-10 text-[13px] font-light leading-[1.8] text-[#f3eee6]/70">
              {t("newsletterDesc")}
            </p>
            <form className="mx-auto flex max-w-sm items-end border-b border-[#f3eee6]/30 pb-3 transition-colors focus-within:border-[#f3eee6]">
              <input 
                type="email" 
                placeholder={t("emailPlaceholder")} 
                className="w-full bg-transparent font-termina text-[10px] font-bold uppercase tracking-[0.2em] outline-none placeholder:text-[#f3eee6]/30" 
              />
              <button type="submit" className="font-termina text-[10px] font-bold uppercase tracking-[0.3em] transition-colors hover:text-[#a49a8d]">
                {t("subscribe")}
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 gap-12 border-t border-[#f3eee6]/15 pt-20 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          
          {/* Navigation */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">{t("discover")}</h4>
            <ul className="flex flex-col gap-5">
              {nav.map((item) => {
                let translationKey = "navUnivers";
                if (item.href === "/savoir-faire") translationKey = "navSavoirFaire";
                if (item.href === "/a-propos") translationKey = "navAbout";
                if (item.href === "/contact") translationKey = "navContact";
                return (
                  <li key={item.href}>
                    <Link href={item.href} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                      {(t as any)(translationKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">{t("customerService")}</h4>
            <ul className="flex flex-col gap-5">
              <li><Link href="/faq" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">{t("faq")}</Link></li>
              <li><Link href="/livraison" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">{t("shippingReturns")}</Link></li>
              <li><Link href="/echantillons" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">{t("samples")}</Link></li>
              <li><Link href="/guide" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">{t("careGuide")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">{t("contactUs")}</h4>
            <ul className="flex flex-col gap-5">
              <li>
                <a href={`mailto:${brand.email}`} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                  {brand.email}
                </a>
              </li>
              <li>
                <a href={`tel:${brand.phone.replace(/\s/g, "")}`} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                  {brand.phone}
                </a>
              </li>
              <li className="font-sans mt-3 text-[13px] font-light leading-[1.8] text-[#f3eee6]/60">
                {t("showroom")}<br/>
                {brand.city === "Maroc" ? (t as any)("city") || brand.city : brand.city}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">{t("socials")}</h4>
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
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                  PINTEREST
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-28 flex flex-col items-center justify-between gap-8 border-t border-[#f3eee6]/10 pt-10 font-sans text-xs font-light text-[#f3eee6]/40 md:flex-row">
          <div className="flex items-center gap-6">
            <p className="font-termina text-[9px] font-bold uppercase tracking-[0.2em]">© 2026 {brand.name}. {t("allRightsReserved")}</p>
            <div className="hidden md:block w-px h-3 bg-[#f3eee6]/20"></div>
            <CurrencySelector isDark={true} />
            <div className="hidden md:block w-px h-3 bg-[#f3eee6]/20"></div>
            <LanguageSelector />
          </div>
          <ul className="flex flex-wrap justify-center gap-6 md:gap-10">
            <li><Link href="/mentions-legales" className="font-termina text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#f3eee6]">{t("legalNotices")}</Link></li>
            <li><Link href="/confidentialite" className="font-termina text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#f3eee6]">{t("privacy")}</Link></li>
            <li><Link href="/cgv" className="font-termina text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#f3eee6]">{t("cgv")}</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
