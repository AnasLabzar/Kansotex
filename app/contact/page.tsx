import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { brand } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nous contacter",
  description: "Un projet textile, indoor ou outdoor ? Contactez Kansotex.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero title="Nous contacter" kicker="Projet" tone="#2F2C28" />

      <section className="bg-cream px-6 py-20 text-center md:px-12 md:py-28">
        <h2 className="editorial mx-auto max-w-2xl text-4xl leading-tight md:text-5xl">
          Un projet ? <em>Une collaboration ?</em>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted">
          Échantillons, métrages, conseil matière pour l’hôtellerie, la
          décoration ou la maison. Dites-nous ce que vous imaginez.
        </p>

        <div className="mx-auto mt-12 flex max-w-md flex-col gap-2 text-sm">
          <a href={`mailto:${brand.email}`} className="hover:opacity-70">
            {brand.email}
          </a>
          <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
          <p className="text-muted">{brand.city}</p>
        </div>

        <div className="mt-16">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
