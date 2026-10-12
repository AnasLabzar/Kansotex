"use client";

import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-[#1c1b19] flex flex-col items-center justify-center text-[#f3eee6] px-6 relative overflow-hidden">
          
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-luminosity grayscale pointer-events-none">
            <Image 
              src="/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png" 
              alt="Texture" 
              fill 
              className="object-cover" 
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Logo */}
            <Link href="/" className="mb-16 hover:opacity-80 transition-opacity">
              <Image 
                src="/KANSOTEX-marque-1-white.png" 
                alt="Kansotex" 
                width={300} 
                height={80} 
                className="w-[200px] md:w-[280px] h-auto" 
              />
            </Link>

            {/* Content */}
            <h1 className="font-termina text-6xl md:text-8xl font-bold uppercase tracking-widest text-[#a49a8d] mb-6">
              404
            </h1>
            
            <h2 className="font-termina text-[12px] md:text-[14px] font-bold uppercase tracking-[0.3em] mb-4">
              Page Introuvable
            </h2>
            
            <p className="font-sans text-[14px] font-light text-[#f3eee6]/60 max-w-md mx-auto mb-12 leading-relaxed">
              La page que vous recherchez semble s'être égarée. Elle a peut-être été déplacée ou n'a jamais existé.
            </p>

            {/* Action */}
            <Link 
              href="/" 
              className="group relative flex h-14 items-center justify-center bg-[#f3eee6] text-[#1c1b19] px-10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[#a49a8d] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]"></div>
              <span className="relative font-termina text-[10px] font-bold tracking-[0.25em] uppercase">
                Retour à l'accueil
              </span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
