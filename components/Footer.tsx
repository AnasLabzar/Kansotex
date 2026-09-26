import Link from "next/link";
import { brand, nav } from "@/lib/content";
import { Wordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-[#1c1b19] px-6 pb-10 pt-20 text-[#f3eee6] md:px-12 md:pt-32">
      <div className="mx-auto max-w-7xl">
        {/* Massive Centered Logo */}
        <div className="mb-20 flex justify-center border-b border-[#f3eee6]/15 pb-16">
          <Link href="/" aria-label="Kansotex" className="transition-opacity hover:opacity-80">
            <Wordmark centered className="h-16 w-[18rem] invert sm:h-24 sm:w-[26rem] md:h-32 md:w-[450px]" />
          </Link>
        </div>

        {/* Top Section: Newsletter */}
        <div className="mb-24 flex flex-col items-center text-center">
          <div className="w-full max-w-lg">
            <h3 className="font-termina mb-5 text-[15px] font-bold uppercase leading-relaxed tracking-[0.15em] sm:text-lg md:text-xl">
              REJOIGNEZ KANSOTEX
            </h3>
            <p className="font-sans mb-10 text-[13px] font-light leading-[1.8] text-[#f3eee6]/70">
              Inscrivez-vous à notre newsletter pour découvrir nos nouvelles collections de tissus, nos inspirations et nos projets exclusifs.
            </p>
            <form className="mx-auto flex max-w-sm items-end border-b border-[#f3eee6]/30 pb-3 transition-colors focus-within:border-[#f3eee6]">
              <input 
                type="email" 
                placeholder="VOTRE ADRESSE EMAIL" 
                className="w-full bg-transparent font-termina text-[10px] font-bold uppercase tracking-[0.2em] outline-none placeholder:text-[#f3eee6]/30" 
              />
              <button type="submit" className="font-termina text-[10px] font-bold uppercase tracking-[0.3em] transition-colors hover:text-[#a49a8d]">
                S'INSCRIRE
              </button>
            </form>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 gap-12 border-t border-[#f3eee6]/15 pt-20 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          
          {/* Navigation */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">DÉCOUVRIR</h4>
            <ul className="flex flex-col gap-5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">SERVICE CLIENT</h4>
            <ul className="flex flex-col gap-5">
              <li><Link href="/faq" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">QUESTIONS FRÉQUENTES</Link></li>
              <li><Link href="/livraison" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">LIVRAISON & RETOURS</Link></li>
              <li><Link href="/echantillons" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">ÉCHANTILLONS</Link></li>
              <li><Link href="/guide" className="font-termina text-[10px] font-bold uppercase tracking-[0.15em] text-[#f3eee6]/80 transition-colors hover:text-white">GUIDE D'ENTRETIEN</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">NOUS CONTACTER</h4>
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
                Showroom sur rendez-vous<br/>
                Marrakech, {brand.city}
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-termina mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">RÉSEAUX</h4>
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
          <p className="font-termina text-[9px] font-bold uppercase tracking-[0.2em]">© 2026 {brand.name}. TOUS DROITS RÉSERVÉS.</p>
          <ul className="flex flex-wrap justify-center gap-6 md:gap-10">
            <li><Link href="/mentions-legales" className="font-termina text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#f3eee6]">MENTIONS LÉGALES</Link></li>
            <li><Link href="/confidentialite" className="font-termina text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#f3eee6]">CONFIDENTIALITÉ</Link></li>
            <li><Link href="/cgv" className="font-termina text-[9px] font-bold uppercase tracking-[0.2em] hover:text-[#f3eee6]">CGV</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
