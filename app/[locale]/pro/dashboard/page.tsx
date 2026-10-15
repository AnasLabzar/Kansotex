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

import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProDashboardPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ view?: string }>;
}) {
  const { locale } = await params;
  const session = await getSession();
  const sp = searchParams ? await searchParams : {};
  const isB2bPreview = sp?.view === "b2b";

  if (session?.role === "ADMIN" && !isB2bPreview) {
    redirect(`/${locale}/admin`);
  }

  return (
    <div className="relative">
      {session?.role === "ADMIN" && (
        <div className="bg-[#1a1a1a] text-white px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/30">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold">Session Administrateur active</span>
            <span className="text-slate-400">— Vous prévisualisez le tableau de bord client B2B.</span>
          </div>
          <Link
            href={`/${locale}/admin`}
            className="px-3 py-1 bg-white text-slate-950 font-bold rounded-lg hover:bg-slate-100 transition-colors shadow-xs"
          >
            ⚡ Accéder au Dashboard Admin Shopify ➔
          </Link>
        </div>
      )}
      <ProDashboardView session={session} />
    </div>
  );
}
