import type { Metadata } from "next";
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
    path: "/pro/dashboard",
    title: locale === "en" ? "B2B Professional Dashboard — Kansotex Marrakech" : "Tableau de Bord Professionnel B2B — Kansotex Marrakech",
    description: locale === "en" ? "Dedicated B2B project tracking, order history, yardage calculator and planning for architects and designers." : "Tableau de bord dédié aux architectes d'intérieur et décorateurs : suivi des confections d'atelier, planning de chantier, calculateur de métrages.",
  });
}

export default async function ProDashboardPage() {
  const session = await getSession();
  return <ProDashboardView session={session} />;
}
