import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { UnderlineLink } from "@/components/UnderlineLink";
import { IntroScreen, FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";
import { pillars, universes } from "@/lib/content";

export default function Home() {
  return (
    <div className="flex flex-col">
      <IntroScreen />
      
      <section className="relative flex min-h-[100dvh] flex-col overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video-rideau-villa_kansotex.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#1a1410]/45" />
        <Header overlay />

        {/* MOBILE HERO (Maison Nicole style) */}
        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-between px-6 pb-12 pt-20 text-[#f3eee6] md:hidden">
          {/* Top: Huge Brand Name */}
          <div className="w-full flex justify-center mt-2">
            <Image 
              src="/KANSOTEX-marque-1-white.png"
              alt="KANSOTEX"
              width={600}
              height={150}
              className="w-full h-auto max-w-[420px] drop-shadow-lg"
              priority
            />
          </div>

          {/* Center: Main Title */}
          <FadeIn delay={1.5} className="mx-auto flex flex-col items-center gap-3 text-center drop-shadow-md">
            <h2 className="font-termina text-[18px] font-bold uppercase tracking-[0.1em]">
              Textile Haut de Gamme
            </h2>
            <p className="font-termina text-[10px] font-bold uppercase tracking-[0.3em] text-[#f3eee6]/90">
              Marrakech
            </p>
          </FadeIn>

          {/* Bottom: Link */}
          <FadeIn delay={1.8} className="flex justify-center">
            <UnderlineLink href="/univers" light className="font-termina text-[10px] uppercase tracking-widest">
              NOS REALISATIONS
            </UnderlineLink>
          </FadeIn>
        </div>

        {/* DESKTOP HERO (Original) */}
        <div className="relative z-10 hidden min-h-[100dvh] flex-col px-4 pb-10 pt-20 text-[#f3eee6] md:flex">
          <div className="mt-2 flex justify-center">
            <Link href="/" className="block w-full max-w-[1200px] px-4">
              <Image 
                src="/KANSOTEX-marque-1-white.png"
                alt="KANSOTEX"
                width={1400}
                height={350}
                className="w-full h-auto drop-shadow-lg"
                priority
              />
            </Link>
          </div>

          <FadeIn delay={1.5} className="mx-auto mt-auto flex max-w-md flex-col items-center gap-10 pb-0 text-center md:flex-1 md:justify-center">
            <p className="font-termina text-[13px] font-bold uppercase leading-relaxed tracking-[0.42em]">
              In &amp; Outdoor
              <br />
              Textile haut de gamme
            </p>
          </FadeIn>

          <FadeIn delay={1.8} className="flex justify-center">
            <UnderlineLink href="/univers" light>
              Nos univers
            </UnderlineLink>
          </FadeIn>
        </div>

        {/* Bottom Right Mark (Only in Hero) */}
        <div className="absolute bottom-6 right-6 z-40 pointer-events-none">
          <Image 
            src="/made_morocco.png" 
            alt="Made in Morocco" 
            width={120} 
            height={120} 
            className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-md"
          />
        </div>
      </section>

      <section className="bg-[#f3eee6] px-6 py-24 text-[#1c1b19] md:px-12 md:py-32">
        <FadeIn>
          <h2 className="editorial mx-auto max-w-3xl text-center text-4xl leading-tight md:text-5xl">
            Une palette de{" "}
            <span className="uppercase not-italic font-bold">savoir-faire</span> étendue{" "}
            <em>pour habiller</em>{" "}
            <span className="uppercase font-bold">tous vos espaces.</span>
          </h2>
        </FadeIn>

        <StaggerContainer className="mx-auto mt-20 grid max-w-6xl gap-12 md:grid-cols-3 md:gap-8">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title} className="text-center">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden bg-[#e8e4db]">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(min-width: 768px) 30vw, 90vw"
                />
              </div>
              <h3 className="font-termina mt-8 text-[11px] font-bold uppercase tracking-[0.28em] text-[#1c1b19]">
                {pillar.title}
              </h3>
              <p className="mx-auto mt-4 max-w-[280px] font-sans text-[13px] font-light leading-relaxed text-[#1c1b19]/80">
                {pillar.text}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-14 flex justify-center">
          <UnderlineLink href="/savoir-faire" className="font-termina text-[11px] font-bold uppercase tracking-widest text-[#1c1b19]">
            DECOUVREZ NOTRE SAVOIR-FAIRE
          </UnderlineLink>
        </div>
      </section>

      <section className="bg-cream px-6 pb-8 md:px-12">
        <FadeIn>
          <h2 className="editorial mx-auto max-w-3xl text-center text-4xl leading-tight md:text-[2.75rem]">
            Nous habillons{" "}
            <em>l’intérieur et l’extérieur</em>
            <br />
            de <span className="uppercase">tissus haut de gamme</span>,
            <br />
            <em>avec la plus grande exigence.</em>
          </h2>
        </FadeIn>
      </section>

      <StaggerContainer className="grid md:grid-cols-2">
        {universes.slice(0, 2).map((item) => (
          <StaggerItem key={item.slug}>
            <Link
              href={`/univers/${item.slug}`}
              className="group relative flex min-h-[52vh] overflow-hidden"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.05]"
                sizes="50vw"
              />
              <div className="absolute inset-0 bg-[#1c1b19]/35 transition-colors duration-700 group-hover:bg-[#1c1b19]/25" />
              <div className="relative z-10 flex h-full w-full min-h-[52vh] flex-col items-center justify-center px-6 text-center text-[#f3eee6]">
                <p className="font-termina text-[10px] font-bold uppercase tracking-[0.4em]">{item.kicker.replace(/[éèêÉÈÊ]/g, 'e')}</p>
                <h3 className="font-termina mt-4 text-3xl font-bold uppercase tracking-widest md:text-4xl">{item.title.replace(/[éèêÉÈÊ]/g, 'e')}</h3>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <section className="bg-cream px-6 py-20 md:px-12 md:py-28">
        <FadeIn>
          <p className="font-termina mb-10 text-center text-[11px] font-bold uppercase tracking-widest text-[#1c1b19]">
            Linge &amp; matieres
          </p>
        </FadeIn>
        
        <StaggerContainer className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {universes.slice(2).map((item) => (
            <StaggerItem key={item.slug}>
              <Link href={`/univers/${item.slug}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.05]"
                    sizes="(min-width: 1024px) 22vw, 50vw"
                  />
                </div>
                <h3 className="font-termina mt-5 text-center text-[10px] font-bold uppercase tracking-widest text-[#1c1b19]">
                  {item.title.replace(/[éèêÉÈÊ]/g, 'e')}
                </h3>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-14 flex justify-center">
          <UnderlineLink href="/univers" className="font-termina text-[11px] font-bold uppercase tracking-widest text-[#1c1b19]">TOUS NOS UNIVERS · DECOUVRIR</UnderlineLink>
        </div>
      </section>
      <section className="relative flex h-screen w-full flex-col md:h-[110vh] md:flex-row">
        {/* Left half */}
        <Link href="/projets" className="group relative h-1/2 w-full cursor-pointer overflow-hidden md:h-full md:w-1/2">
          <Image
            src="/gallery/Kansotex-indoor-living-room-pinterest.png"
            alt="Tous nos projets"
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-700 group-hover:bg-black/10" />
        </Link>

        {/* Right half */}
        <Link href="/sur-mesure" className="group relative h-1/2 w-full cursor-pointer overflow-hidden md:h-full md:w-1/2">
          <Image
            src="/gallery/Kansotex-indoor-riad-tissus-pinterest-2.png"
            alt="Sur Mesure"
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 transition-colors duration-700 group-hover:bg-black/10" />
        </Link>

        {/* Floating Text Overlay */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-between py-16 text-[#f3eee6] md:py-32">
          <FadeIn>
            <h2 className="font-sans text-center text-4xl font-light tracking-[0.15em] md:text-5xl">
              TOUS NOS PROJETS
            </h2>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <span className="font-termina mt-auto mb-auto text-[11px] font-bold uppercase tracking-[0.3em]">
              DECOUVRIR
            </span>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <h2 className="font-sans text-center text-4xl font-light tracking-[0.15em] md:text-5xl">
              SUR-MESURE
            </h2>
          </FadeIn>
        </div>
      </section>

      <section className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden bg-[#151413] px-6 py-20 text-[#f3eee6] md:px-12">
        {/* Subtle Background Texture */}
        <div className="absolute inset-0 opacity-10 mix-blend-luminosity grayscale">
          <Image 
            src="/gallery/Kansotex-indoor-riad-tissus-pinterest-1.png" 
            alt="Texture" 
            fill 
            className="object-cover" 
          />
        </div>
        
        <div className="relative mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-end md:gap-16">
          <div className="max-w-2xl">
            <FadeIn>
              <h2 className="font-termina text-[15px] font-bold uppercase leading-loose tracking-[0.15em] sm:text-xl md:text-4xl md:leading-snug">
                UN PROJET ?<br />
                <span className="text-[#a49a8d]">UNE COLLABORATION ?</span>
              </h2>
            </FadeIn>
          </div>
          
          <div className="max-w-sm border-l border-[#f3eee6]/20 pl-5 md:pl-8 md:pb-4">
            <FadeIn delay={0.2}>
              <p className="font-sans text-[13px] font-light leading-[1.8] text-[#f3eee6]/80">
                Architectes, hôteliers, décorateurs et particuliers : Kansotex vous
                accompagne du choix de la matière jusqu’à la confection et la mise en œuvre. 
                Notre équipe est à votre écoute pour donner vie à vos espaces.
              </p>
              <div className="mt-8">
                <UnderlineLink href="/contact" light className="font-termina text-[10px] font-bold uppercase tracking-widest text-[#f3eee6]">
                  CONTACTER NOTRE STUDIO
                </UnderlineLink>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
