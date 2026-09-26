import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { UnderlineLink } from "@/components/UnderlineLink";

export const metadata: Metadata = {
  title: "À propos de nous",
  description:
    "Kansotex, maison de textile in & outdoor. Tissus haut de gamme, linge de maison, lit et bain.",
};

export default function AProposPage() {
  return (
    <div>
      <PageHero
        title="À propos de nous"
        kicker="La maison"
        tone="#5C534A"
        image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="bg-cream px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=80"
              alt="Intérieur textile Kansotex"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div>
            <h2 className="editorial text-4xl leading-tight md:text-5xl">
              Kansotex, <em>in &amp; outdoor</em>
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
              <p>
                Kansotex est une maison de textile dédiée à l’intérieur comme à
                l’extérieur. Nous sélectionnons et accompagnons des tissus haut
                de gamme, du linge de maison au linge de lit et de bain, pour
                des projets résidentiels, hôteliers et d’architecture d’intérieur.
              </p>
              <p>
                Notre regard est celui du détail : tombé, couleur, résistance,
                main. Indoor, nous habillons salons, chambres et tables.
                Outdoor, nous faisons tenir la matière au soleil, à l’eau et au
                temps — sans jamais céder sur l’élégance.
              </p>
              <p>
                Professionnels et particuliers avancent avec la même exigence :
                une matériauthèque claire, un conseil franc, un suivi de projet
                jusqu’à la pose.
              </p>
            </div>
            <div className="mt-10">
              <UnderlineLink href="/univers">Découvrir nos univers</UnderlineLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
