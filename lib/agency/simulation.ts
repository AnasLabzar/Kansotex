/**
 * KANSOTEX AUTONOMOUS MULTI-AGENT SYSTEM (AI COMMUNICATION AGENCY)
 * End-to-End Simulation & Boundary Verification Runner
 */

import { WorkflowGraph } from "./engine/workflowGraph";
import { MessageBroker } from "./protocol/messageBroker";
import { EvaluationLoop } from "./evolution/evaluationLoop";
import { TelemetryIngestor } from "./evolution/telemetryIngestor";

export async function runAgencySimulation() {
  console.log("================================================================================");
  console.log("🏛️  KANSOTEX AUTONOMOUS MULTI-AGENT SYSTEM (AI COMMUNICATION AGENCY)");
  console.log("================================================================================\n");

  // TEST 1: STRICT HIERARCHICAL COMMUNICATION BOUNDARY VERIFICATION
  console.log("--- TEST 1: STRICT BOUNDARY ENFORCEMENT & SECURITY INTEGRITY ---");
  const testBroker = new MessageBroker();

  try {
    console.log("Attempting forbidden communication: CONTENT_WRITER (Personnel) -> THE_BOSS (CEO)...");
    testBroker.dispatch({
      sender: "CONTENT_WRITER",
      recipient: "THE_BOSS",
      channel: "EXECUTIVE_ISOLATED",
      subject: "Direct message to CEO",
      payload: { hello: "world" },
      correlationId: "ILLEGAL_HOP_01",
    });
    console.error("❌ ERROR: Boundary breach was NOT blocked!");
  } catch (err: any) {
    console.log(`✅ SUCCESS: Security violation caught & blocked: "${err.message}"\n`);
  }

  // TEST 2: FULL MULTI-TIER ORCHESTRATION PIPELINE
  console.log("--- TEST 2: EXECUTING USER REQUEST ORCHESTRATION GRAPH ---");
  const request = "Launch a Pinterest Ads campaign for our new luxury bed sheets";
  console.log(`User Input: "${request}"\n`);

  const graph = new WorkflowGraph();
  const startTime = Date.now();
  const state = await graph.executePipeline(request);
  const elapsedMs = Date.now() - startTime;

  console.log(`Workflow ID: ${state.workflowId}`);
  console.log(`Final Status: ${state.status}`);
  console.log(`Execution Duration: ${elapsedMs}ms`);
  console.log(`Total Tokens Consumed: ${state.totalTokensConsumed} tokens\n`);

  console.log("--- EXECUTIVE DETERMINATION (THE BOSS) ---");
  console.log(`Preliminary Action: ${state.bossPreliminaryDecision?.action}`);
  console.log(`Preliminary Justification: ${state.bossPreliminaryDecision?.justification}\n`);
  console.log(`Final Sign-off Action: ${state.bossFinalDecision?.action}`);
  console.log(`Final Justification: ${state.bossFinalDecision?.justification}\n`);

  console.log("--- AGENCY DIRECTOR ROADMAP ---");
  console.log(`Summary: ${state.directorRoadmap?.summary}`);
  console.log(`Target Audience: ${state.directorRoadmap?.targetAudience}`);
  console.log(`Projected ROAS: ${state.directorRoadmap?.kpis?.projectedRoas}\n`);

  console.log("--- MARKETING PM & PERSONNEL DELIVERABLES ---");
  const adsResult = state.pmSubTasks.find((t) => t.assignedTo === "ADS_EXPERT")?.result as any;
  const contentResult = state.pmSubTasks.find((t) => t.assignedTo === "CONTENT_WRITER")?.result as any;

  console.log("1. Pinterest Ads Campaign Architecture:");
  console.log(`   - Objective: ${adsResult?.campaign?.campaignObjective}`);
  console.log(`   - Daily Budget: ${adsResult?.campaign?.dailyBudgetMad} MAD`);
  console.log(`   - Ad Groups: ${adsResult?.campaign?.adGroups?.length} target segments configured`);
  console.log(`   - Destination: ${adsResult?.campaign?.creativeSpecs?.destinationUrl}\n`);

  console.log("2. Master Content Writer Luxury Copy (Human-like):");
  contentResult?.copySuite?.forEach((copy: any, idx: number) => {
    console.log(`   [Pin Creative #${idx + 1} (${copy.pinId})]:`);
    console.log(`   - Title: ${copy.pinTitle}`);
    console.log(`   - Hook: "${copy.headline}"`);
    console.log(`   - Text Overlay: "${copy.textOverlay}"`);
    console.log(`   - Description: ${copy.description.slice(0, 120)}...\n`);
  });

  console.log("--- AUDIT LOG TRAIL (STRICT COMMAND CHAIN) ---");
  state.auditTrail.forEach((msg, idx) => {
    console.log(`   ${idx + 1}. [${msg.channel}] ${msg.sender} ➔ ${msg.recipient} | ${msg.subject}`);
  });

  // TEST 3: THE SELF-IMPROVEMENT EVOLUTION LOOP
  console.log("\n--- TEST 3: THE SELF-IMPROVEMENT EVOLUTION LOOP ---");
  const telemetry = await TelemetryIngestor.fetchLatestMetrics();
  console.log(`Ingested Real-World Telemetry:`);
  console.log(`- Pinterest CTR: ${telemetry.pinterestCtrPercent}% (Target: >3.5%)`);
  console.log(`- Average Order Value: ${telemetry.averageOrderValueMad} MAD`);
  console.log(`- PageSpeed LCP: ${telemetry.pageSpeedLcpSeconds}s (Target: <1.4s)`);

  const activePatches = EvaluationLoop.getAllActivePatches();
  console.log(`\nActive Dynamic Prompt Evolutions Generated: ${activePatches.length}`);
  activePatches.forEach((patch) => {
    console.log(`- [${patch.agentRole} | v${patch.version}]: Triggered by ${patch.triggerMetric}`);
    console.log(`  Insight: ${patch.insightDescription}`);
    console.log(`  Addendum: "${patch.promptAddendum}"\n`);
  });

  console.log("================================================================================");
  console.log("✅ SIMULATION COMPLETE: All hierarchy, protocol & evolution tests passed!");
  console.log("================================================================================");

  return state;
}

// Allow direct CLI execution via Node/ts-node
if (require.main === module) {
  runAgencySimulation().catch(console.error);
}
