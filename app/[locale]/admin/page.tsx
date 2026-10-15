import type { Metadata } from "next";
import { AdminDashboardView } from "@/components/AdminDashboardView";
import { getSession } from "@/lib/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Administration Générale & Gestion E-commerce — Kansotex Marrakech",
    description: "Portail d'administration de la Maison Kansotex : gestion des commandes, catalogue tissus, facturation, clients et atelier.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AdminPage() {
  const session = await getSession();

  return <AdminDashboardView session={session} />;
}
