import type { Metadata } from "next";
import { ProClientView } from "@/components/ProClientView";
import { ProDashboardView } from "@/components/ProDashboardView";
import { getSession } from "@/lib/session";
import { buildCanonicalMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

import { redirect } from "next/navigation";
import Link from "next/link";

export default async function ProPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams?: Promise<{ demo?: string; view?: string }>;
}) {
  const { locale } = await params;
  const session = await getSession();
  const sp = searchParams ? await searchParams : {};
  const isDemo = sp?.demo === "true";
  const isB2bPreview = sp?.view === "b2b";

  // If user is an ADMIN and didn't explicitly request B2B preview mode, redirect to the Shopify Admin
  if (session?.role === "ADMIN" && !isB2bPreview) {
    redirect(`/${locale}/admin`);
  }

  if (session?.isPro || isDemo) {
    return (
      <div className="relative">
        {session?.role === "ADMIN" && (
          <div className="bg-[#1a1a1a] text-white px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="font-semibold">Session Administrateur active</span>
              <span className="text-slate-400">— Vous visualisez actuellement l&apos;interface réservée aux clients prescripteurs B2B.</span>
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

  return <ProClientView />;
}

