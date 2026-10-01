import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { UnderlineLink } from "@/components/UnderlineLink";
import { pillars } from "@/lib/content";

export const metadata: Metadata = {
  title: "Notre savoir-faire",
  description:
    "Matière, indoor & outdoor, accompagnement de projet : le savoir-faire textile Kansotex.",
};

const steps = [
  {
    n: "01",
    title: "Le brief",
    text: "Usage, lumière, climat, style. Nous écoutons le projet — riad, hôtel, villa, restaurant ou maison — pour poser les bonnes contraintes.",
  },
  {
    n: "02",
    title: "La matière",
    text: "Échantillons, palettes, essais au mètre. Indoor ou outdoor, linge ou ameublement : chaque tissu est choisi pour sa main, sa tenue et son caractère.",
  },
  {
    n: "03",
    title: "La mise en œuvre",
    text: "Métrages, délais, coordination avec les ateliers et les décorateurs. Un suivi unique jusqu’à la pose et la livraison.",
  },
];

export default function SavoirFairePage() {
  return (
    <div>
      <PageHero
        title="Notre savoir-faire"
        kicker="Textile"
        tone="#3F4636"
        image="https://images.unsplash.com/photo-1620799140408-edc6dcb6d694?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="bg-cream px-6 py-20 md:px-12 md:py-28">
        <h2 className="editorial mx-auto max-w-3xl text-center text-4xl leading-tight md:text-5xl">
          Une culture de la{" "}
          <span className="uppercase">matiere</span>, <em>au service</em> de vos
          projets.
        </h2>

        <div className="mx-auto mt-16 grid max-w-6xl gap-10 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="text-center">
              <div className="relative mx-auto aspect-[4/5] w-full overflow-hidden bg-cream-dark">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover"
                  sizes="30vw"
                />
              </div>
              <h3 className="mt-6 text-[12px] uppercase tracking-[0.28em]">
                {pillar.title.replace(/[éèêÉÈÊ]/g, 'e')}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {pillar.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-ink/10 bg-cream px-6 py-20 md:px-12 md:py-28">
        <h2 className="editorial mx-auto max-w-2xl text-center text-4xl">
          Du brief à la livraison
        </h2>
        <div className="mx-auto mt-16 grid max-w-5xl gap-12 md:grid-cols-3">
          {steps.map((step) => (
            <article key={step.n}>
              <p className="text-[11px] tracking-[0.32em] text-muted">{step.n}</p>
              <h3 className="mt-3 text-[13px] uppercase tracking-[0.22em]">
                {step.title.replace(/[éèêÉÈÊ]/g, 'e')}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">{step.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <UnderlineLink href="/contact">Lancer un projet</UnderlineLink>
        </div>
      </section>
    </div>
  );
}
