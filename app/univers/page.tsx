import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { universes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nos univers",
  description:
    "Indoor, outdoor, linge de maison, linge de lit, linge de bain et tissus haut de gamme — les univers Kansotex.",
};

export default function UniversPage() {
  return (
    <div>
      <PageHero
        title="Nos univers"
        kicker="In & Outdoor"
        tone="#4A4036"
        image="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?auto=format&fit=crop&w=1800&q=80"
      />

      <section className="bg-cream px-6 py-20 md:px-12 md:py-28">
        <h2 className="editorial mx-auto max-w-3xl text-center text-4xl leading-tight md:text-5xl">
          Kansotex, <em>l’exigence</em> de la{" "}
          <span className="uppercase">matière</span> pour chaque espace.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-muted">
          Du salon à la terrasse, de la chambre à la salle de bain : une maison
          de textile qui relie indoor et outdoor, linge et ameublement, usage
          quotidien et haute gamme.
        </p>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {universes.map((item) => (
            <Link key={item.slug} href={`/univers/${item.slug}`} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 30vw, 50vw"
                />
              </div>
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.32em] text-muted">
                {item.kicker}
              </p>
              <h3 className="mt-1 text-center text-[12px] uppercase tracking-[0.22em]">
                {item.title}
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-relaxed text-muted">
                {item.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
