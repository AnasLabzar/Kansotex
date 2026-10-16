import { NextResponse } from "next/server";
import { WorkflowGraph } from "@/lib/agency/engine/workflowGraph";
import { EvaluationLoop } from "@/lib/agency/evolution/evaluationLoop";
import { TelemetryIngestor } from "@/lib/agency/evolution/telemetryIngestor";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const request = body.request || "Launch a Pinterest Ads campaign for our new luxury bed sheets";

    const graph = new WorkflowGraph();
    const result = await graph.executePipeline(request);

    return NextResponse.json({
      success: true,
      workflow: result,
      activeEvolutions: EvaluationLoop.getAllActivePatches(),
    });
  } catch (error: any) {
    console.error("Agency execution error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to execute agency workflow" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const metrics = await TelemetryIngestor.fetchLatestMetrics();
    const activePatches = EvaluationLoop.getAllActivePatches();

    return NextResponse.json({
      success: true,
      system: "Kansotex Autonomous Multi-Agent AI Agency",
      metrics,
      activeEvolutionsCount: activePatches.length,
      evolutions: activePatches,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
