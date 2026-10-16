/**
 * KANSOTEX AUTONOMOUS MULTI-AGENT SYSTEM (AI COMMUNICATION AGENCY)
 * Stateful Orchestration Workflow Graph
 */

import {
  WorkflowState,
  WorkflowStatus,
  TaskAssignment,
  BossDecision,
} from "../types";
import { MessageBroker } from "../protocol/messageBroker";
import { AgentNode } from "./agentNode";
import { EvaluationLoop } from "../evolution/evaluationLoop";

export class WorkflowGraph {
  private broker: MessageBroker;

  constructor() {
    this.broker = new MessageBroker();
  }

  /**
   * Orchestrates the complete end-to-end multi-agent execution pipeline.
   * Example: "Launch a Pinterest Ads campaign for our new luxury bed sheets"
   */
  public async executePipeline(userRequest: string): Promise<WorkflowState> {
    const workflowId = `WF-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const state: WorkflowState = {
      workflowId,
      originalRequest: userRequest,
      initiatedAt: new Date().toISOString(),
      status: "INITIALIZING",
      currentStep: "SYSTEM_INITIALIZATION",
      pmSubTasks: [],
      deliverables: {},
      auditTrail: [],
      totalTokensConsumed: 0,
      feedbackIterations: 0,
    };

    // =========================================================================
    // STEP 1: THE DIRECTOR FORMULATES ROADMAP
    // =========================================================================
    state.status = "DIRECTOR_DRAFTING";
    state.currentStep = "DIRECTOR_FORMULATING_STRATEGY";

    const directorDraft = await AgentNode.executeAgent("THE_DIRECTOR", {
      request: userRequest,
      workflowId,
    });
    state.totalTokensConsumed += directorDraft.tokensConsumed;
    const roadmap = directorDraft.result.roadmap as any;

    state.directorRoadmap = {
      summary: roadmap.summary,
      targetAudience: roadmap.targetAudience,
      kpis: roadmap.kpis,
      assignedPM: "MARKETING_PM",
      estimatedCostTokens: roadmap.estimatedCostTokens,
    };

    // Record Director -> Boss communication on isolated executive channel
    const msgToBoss = this.broker.dispatch({
      sender: "THE_DIRECTOR",
      recipient: "THE_BOSS",
      channel: "EXECUTIVE_ISOLATED",
      subject: `Executive Proposal: ${userRequest}`,
      payload: { roadmap },
      tokenCostEstimate: directorDraft.tokensConsumed,
      correlationId: workflowId,
    });
    state.auditTrail.push(msgToBoss);

    // =========================================================================
    // STEP 2: THE BOSS INITIAL EVALUATION ([OK] or [NO])
    // =========================================================================
    state.status = "PENDING_BOSS_APPROVAL";
    state.currentStep = "BOSS_PRELIMINARY_EVALUATION";

    const bossInitial = await AgentNode.executeAgent("THE_BOSS", {
      stage: "INITIAL_PROPOSAL",
      request: userRequest,
      projectedRoi: 4.8,
      budgetMad: 15000,
      tokenCost: state.totalTokensConsumed,
    });
    state.totalTokensConsumed += bossInitial.tokensConsumed;
    const initialDecision = bossInitial.result.decision as BossDecision;
    state.bossPreliminaryDecision = initialDecision;

    // Record Boss -> Director decision on isolated channel
    const bossMsg = this.broker.dispatch({
      sender: "THE_BOSS",
      recipient: "THE_DIRECTOR",
      channel: "EXECUTIVE_ISOLATED",
      subject: `Executive Determination: ${initialDecision.action}`,
      payload: { decision: initialDecision },
      tokenCostEstimate: bossInitial.tokensConsumed,
      correlationId: workflowId,
    });
    state.auditTrail.push(bossMsg);

    // If The Boss rejects, workflow halts immediately
    if (initialDecision.action === "[NO]") {
      state.status = "REJECTED_BY_BOSS";
      state.currentStep = "TERMINATED_BY_EXECUTIVE_VETO";
      return state;
    }

    // =========================================================================
    // STEP 3: THE DIRECTOR DELEGATES TO MARKETING PM
    // =========================================================================
    state.status = "DISPATCHED_TO_PM";
    state.currentStep = "DIRECTOR_DISPATCHING_TO_MARKETING_PM";

    const dirToPmMsg = this.broker.dispatch({
      sender: "THE_DIRECTOR",
      recipient: "MARKETING_PM",
      channel: "DIRECTORATE_DESK",
      subject: `Mandate: Execute Pinterest Campaign for Luxury Bed Sheets`,
      payload: {
        mandate: roadmap.departmentMandates[0],
        approvedBudgetMad: initialDecision.maxApprovedBudgetMad,
      },
      correlationId: workflowId,
    });
    state.auditTrail.push(dirToPmMsg);

    // =========================================================================
    // STEP 4: MARKETING PM BREAKS DOWN TASKS
    // =========================================================================
    state.currentStep = "MARKETING_PM_ASSIGNING_PERSONNEL";
    const pmDelegation = await AgentNode.executeAgent("MARKETING_PM", {
      action: "DELEGATE_TASKS",
      request: userRequest,
    });
    state.totalTokensConsumed += pmDelegation.tokensConsumed;
    const taskList = (pmDelegation.result.taskAssignments as any[]) || [];

    // =========================================================================
    // STEP 5: PERSONNEL EXECUTION (ADS EXPERT & CONTENT WRITER)
    // =========================================================================
    state.status = "PERSONNEL_EXECUTING";
    state.currentStep = "PERSONNEL_GENERATING_DELIVERABLES";

    for (const t of taskList) {
      // 5.1 Route task from PM -> Personnel
      const taskMsg = this.broker.dispatch({
        sender: "MARKETING_PM",
        recipient: t.assignedTo,
        channel: "TEAM_DISPATCH",
        subject: `Task Assignment: ${t.taskId}`,
        payload: { brief: t.brief, deliverableType: t.deliverableType },
        correlationId: workflowId,
      });
      state.auditTrail.push(taskMsg);

      // 5.2 Personnel executes specialized work
      const startTime = Date.now();
      const execution = await AgentNode.executeAgent(t.assignedTo, {
        taskId: t.taskId,
        brief: t.brief,
      });
      const durationMs = Date.now() - startTime;
      state.totalTokensConsumed += execution.tokensConsumed;

      const assignment: TaskAssignment = {
        taskId: t.taskId,
        assignedTo: t.assignedTo,
        brief: t.brief,
        deliverableType: t.deliverableType,
        status: "COMPLETED",
        result: execution.result,
        tokensConsumed: execution.tokensConsumed,
        durationMs,
      };
      state.pmSubTasks.push(assignment);

      // 5.3 Route deliverable from Personnel -> PM
      const returnMsg = this.broker.dispatch({
        sender: t.assignedTo,
        recipient: "MARKETING_PM",
        channel: "TEAM_DISPATCH",
        subject: `Deliverable Submission: ${t.taskId}`,
        payload: execution.result,
        tokenCostEstimate: execution.tokensConsumed,
        correlationId: workflowId,
      });
      state.auditTrail.push(returnMsg);
    }

    // =========================================================================
    // STEP 6: MARKETING PM SYNTHESIZES & QUALITY CHECKS
    // =========================================================================
    state.status = "PM_SYNTHESIS";
    state.currentStep = "MARKETING_PM_SYNTHESIZING_DOSSIER";

    const pmSynthesis = await AgentNode.executeAgent("MARKETING_PM", {
      action: "SYNTHESIZE",
      tasks: state.pmSubTasks,
    });
    state.totalTokensConsumed += pmSynthesis.tokensConsumed;

    // Send synthesized package from PM -> Director
    const pmToDirMsg = this.broker.dispatch({
      sender: "MARKETING_PM",
      recipient: "THE_DIRECTOR",
      channel: "DIRECTORATE_DESK",
      subject: `Synthesized Campaign Dossier: Pinterest Luxury Bed Sheets`,
      payload: {
        synthesisReport: pmSynthesis.result.synthesisReport,
        deliverables: state.pmSubTasks.map((t) => ({
          taskId: t.taskId,
          assignedTo: t.assignedTo,
          result: t.result,
        })),
      },
      correlationId: workflowId,
    });
    state.auditTrail.push(pmToDirMsg);

    // =========================================================================
    // STEP 7: THE DIRECTOR FINAL REVIEW & SUBMISSION TO BOSS
    // =========================================================================
    state.status = "DIRECTOR_FINAL_REVIEW";
    state.currentStep = "DIRECTOR_ASSEMBLING_FINAL_SIGN_OFF";

    state.deliverables = {
      campaignStructure: state.pmSubTasks.find((t) => t.assignedTo === "ADS_EXPERT")?.result,
      adCopySuite: state.pmSubTasks.find((t) => t.assignedTo === "CONTENT_WRITER")?.result,
      pmReport: pmSynthesis.result,
    };

    const dirFinalToBoss = this.broker.dispatch({
      sender: "THE_DIRECTOR",
      recipient: "THE_BOSS",
      channel: "EXECUTIVE_ISOLATED",
      subject: `Final Launch Authorization Request: Pinterest Campaign`,
      payload: {
        deliverablesSummary: "Full campaign structure + bilingual copy suite complete.",
        totalTokensConsumed: state.totalTokensConsumed,
        finalBudgetMad: initialDecision.maxApprovedBudgetMad,
        targetRoi: 4.8,
      },
      correlationId: workflowId,
    });
    state.auditTrail.push(dirFinalToBoss);

    // =========================================================================
    // STEP 8: THE BOSS FINAL SIGN-OFF ([OK] or [NO])
    // =========================================================================
    state.status = "PENDING_BOSS_SIGN_OFF";
    state.currentStep = "BOSS_FINAL_SIGN_OFF";

    const bossFinal = await AgentNode.executeAgent("THE_BOSS", {
      stage: "FINAL_SIGN_OFF",
      projectedRoi: 4.8,
      budgetMad: initialDecision.maxApprovedBudgetMad,
      tokenCost: state.totalTokensConsumed,
    });
    state.totalTokensConsumed += bossFinal.tokensConsumed;
    const finalDecision = bossFinal.result.decision as BossDecision;
    state.bossFinalDecision = finalDecision;

    const bossFinalMsg = this.broker.dispatch({
      sender: "THE_BOSS",
      recipient: "THE_DIRECTOR",
      channel: "EXECUTIVE_ISOLATED",
      subject: `Executive Launch Authorization: ${finalDecision.action}`,
      payload: { decision: finalDecision },
      tokenCostEstimate: bossFinal.tokensConsumed,
      correlationId: workflowId,
    });
    state.auditTrail.push(bossFinalMsg);

    if (finalDecision.action === "[OK]") {
      state.status = "COMPLETED";
      state.currentStep = "CAMPAIGN_LAUNCHED_SUCCESSFULLY";
    } else {
      state.status = "REJECTED_BY_BOSS";
      state.currentStep = "TERMINATED_BY_EXECUTIVE_VETO";
    }

    // =========================================================================
    // STEP 9: SELF-IMPROVEMENT EVOLUTION LOOP
    // =========================================================================
    await EvaluationLoop.runEvaluationCycle();
    state.feedbackIterations += 1;

    return state;
  }
}
