import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { UnderlineLink } from "@/components/UnderlineLink";
import { universes } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return universes.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = universes.find((u) => u.slug === slug);
  if (!item) return { title: "Univers" };
  return { title: item.title, description: item.excerpt };
}

export default async function UniverseDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = universes.find((u) => u.slug === slug);
  if (!item) notFound();

  const others = universes.filter((u) => u.slug !== slug).slice(0, 3);

  return (
    <div>
      <PageHero
        title={item.title}
        kicker={item.kicker}
        tone={item.tone}
        image={item.image}
      />

      <section className="bg-cream px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-dark">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.32em] text-muted">
              {item.kicker} · In &amp; Outdoor
            </p>
            <h2 className="editorial mt-4 text-4xl leading-tight md:text-5xl">
              {item.title}
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              {item.descriptionFr}
            </p>
            <div className="mt-10">
              <UnderlineLink href="/contact">Parler de votre projet</UnderlineLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream px-6 pb-24 md:px-12">
        <p className="mb-8 text-center text-[11px] uppercase tracking-[0.28em]">
          Autres univers
        </p>
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {others.map((other) => (
            <Link key={other.slug} href={`/univers/${other.slug}`} className="group">
              <div className="relative aspect-[16/10] overflow-hidden bg-cream-dark">
                <Image
                  src={other.image}
                  alt={other.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="33vw"
                />
              </div>
              <h3 className="mt-3 text-center text-[11px] uppercase tracking-[0.24em]">
                {other.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
