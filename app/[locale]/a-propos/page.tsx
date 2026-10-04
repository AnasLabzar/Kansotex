import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { UnderlineLink } from "@/components/UnderlineLink";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "À propos de nous",
  description:
    "Kansotex, maison de textile in & outdoor. Tissus haut de gamme, linge de maison, lit et bain.",
};

export default async function AProposPage() {
  const t = await getTranslations("About");

  return (
    <div>
      <PageHero
        title={t("title")}
        kicker={t("kicker")}
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
            <h2 className="editorial text-4xl leading-tight md:text-5xl" dangerouslySetInnerHTML={{ __html: t.raw("subtitle") }} />
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>
            <div className="mt-10">
              <UnderlineLink href="/univers">{t("discoverLink")}</UnderlineLink>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
