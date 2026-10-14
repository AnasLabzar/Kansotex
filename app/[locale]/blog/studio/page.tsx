import type { Metadata } from "next";
import { EditorialStudioView } from "@/components/EditorialStudioView";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const isEn = params.locale === "en";

  const title = isEn
    ? "Editorial AI Studio & Market Radar | Kansotex Marrakech"
    : "Studio Éditorial IA & Radar Concurrentiel | Kansotex Marrakech";

  const description = isEn
    ? "Internal multi-agent publishing cockpit for Kansotex: 3 collaborative bots (Marketing Director, Content Writer, Project Manager) dominating luxury textile search."
    : "Cockpit éditorial multi-agents Kansotex : 3 bots collaboratifs (Directeur Marketing, Maître Tisserand Rédacteur, Chef de Projet) pour conquérir le marché textile haut de gamme.";

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EditorialStudioPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  return <EditorialStudioView locale={params.locale} />;
}
