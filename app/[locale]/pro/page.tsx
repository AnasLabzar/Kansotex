import type { Metadata } from "next";
import { ProClientView } from "@/components/ProClientView";
import { ProDashboardView } from "@/components/ProDashboardView";
import { getSession } from "@/lib/session";
import { buildCanonicalMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildCanonicalMetadata({
    locale,
    path: "/pro",
    title: locale === "en" ? "B2B Trade Portal & Dashboard — Architects, Designers & Hospitality | Kansotex" : "Tableau de Bord Pro & Espace Prescripteurs — Architectes & Hôtellerie | Kansotex",
    description: locale === "en" ? "Trade portal and professional dashboard for interior architects, decorators and luxury hospitality in Marrakech. Project planning, yardage calculators and tailor tracking." : "Tableau de bord professionnel réservé aux architectes d'intérieur, décorateurs et hôteliers. Suivi de confection, planning de pose, calculateur de métrage et tarifs éditeur à Marrakech.",
  });
}

export default async function ProPage({
  searchParams,
}: {
  searchParams?: Promise<{ demo?: string }>;
}) {
  const session = await getSession();
  const sp = searchParams ? await searchParams : {};
  const isDemo = sp?.demo === "true";

  if (session?.isPro || isDemo) {
    return <ProDashboardView session={session} />;
  }

  return <ProClientView />;
}

