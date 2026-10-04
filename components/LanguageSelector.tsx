"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); // e.g. /fr/products or /products

  const handleLanguageChange = (newLocale: string) => {
    // If the path already has a locale, replace it
    // Note: usePathname from next/navigation returns the full path including the locale prefix sometimes,
    // but in Next-Intl it depends on configuration.
    // A robust way to switch in next-intl is to just rewrite the url.
    
    // To make it simple and bulletproof, we just reload to /locale/pathname
    // However, if localePrefix is "as-needed", "fr" is the root.
    
    let currentPath = pathname;
    
    // Remove existing locale prefix if present
    if (currentPath.startsWith('/en/') || currentPath === '/en') {
      currentPath = currentPath.replace(/^\/en/, '');
    } else if (currentPath.startsWith('/fr/') || currentPath === '/fr') {
      currentPath = currentPath.replace(/^\/fr/, '');
    }
    
    if (currentPath === '') currentPath = '/';
    
    const newPath = newLocale === 'fr' ? currentPath : `/${newLocale}${currentPath === '/' ? '' : currentPath}`;
    
    // Hard navigate to ensure cookies and middleware catch it and reload page data correctly
    window.location.href = newPath;
  };

  return (
    <div className="flex gap-2 font-termina text-[10px] font-bold uppercase tracking-[0.2em] text-[#a49a8d]">
      <button 
        onClick={() => handleLanguageChange('fr')}
        className={`transition-colors hover:text-white ${locale === 'fr' ? 'text-white' : ''}`}
      >
        FR
      </button>
      <span>/</span>
      <button 
        onClick={() => handleLanguageChange('en')}
        className={`transition-colors hover:text-white ${locale === 'en' ? 'text-white' : ''}`}
      >
        EN
      </button>
    </div>
  );
}
