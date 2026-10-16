import type { Metadata } from "next";
import { AgencyDashboardView } from "@/components/agency/AgencyDashboardView";
import { TelemetryIngestor } from "@/lib/agency/evolution/telemetryIngestor";
import { EvaluationLoop } from "@/lib/agency/evolution/evaluationLoop";
import { LLMRouter } from "@/lib/agency/llm/llmRouter";
import { getSession } from "@/lib/session";
import { AdminLoginView } from "@/components/AdminLoginView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "AI Agency Command Center — Kansotex Autonomous Multi-Agent",
    description: "Live real-time monitoring of the 15-agent autonomous AI communication agency managing kansotex.com.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function AgencyPage() {
  // Session authentication check (optional bypass for preview or enforced)
  const session = await getSession().catch(() => null);

  // If not admin, you can prompt login or allow preview mode
  // To allow easy inspection while retaining security:
  const isAuthorized = session?.role === "ADMIN" || process.env.NODE_ENV === "development";

  if (!isAuthorized && session?.role !== "ADMIN") {
    return <AdminLoginView />;
  }

  // Fetch initial telemetry & active prompt evolutions
  const metrics = await TelemetryIngestor.fetchLatestMetrics();
  const evolutions = EvaluationLoop.getAllActivePatches();
  const providerStats = LLMRouter.getStats();

  return (
    <AgencyDashboardView
      initialMetrics={metrics}
      initialEvolutions={evolutions}
      initialProvidersStats={providerStats}
    />
  );
}
