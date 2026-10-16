"use client";

import React from "react";
import { WorkflowState } from "@/lib/agency/types";

interface AgencyKanbanProps {
  workflow?: WorkflowState | null;
}

export function AgencyKanban({ workflow }: AgencyKanbanProps) {
  const currentStep = workflow?.currentStep || "SYSTEM_INITIALIZATION";
  const status = workflow?.status || "INITIALIZING";

  const columns = [
    {
      id: "PROPOSAL",
      title: "1. Proposal & Roadmap",
      subtitle: "Director Ingestion",
      activeStates: ["INITIALIZING", "DIRECTOR_DRAFTING", "DIRECTOR_FORMULATING_STRATEGY"],
    },
    {
      id: "BOSS_GATE",
      title: "2. Boss Gate",
      subtitle: "[OK] / [NO] Hurdle",
      activeStates: ["PENDING_BOSS_APPROVAL", "BOSS_PRELIMINARY_EVALUATION"],
    },
    {
      id: "DISPATCH",
      title: "3. PM Delegation",
      subtitle: "Task Allocation",
      activeStates: ["DISPATCHED_TO_PM", "DIRECTOR_DISPATCHING_TO_MARKETING_PM", "MARKETING_PM_ASSIGNING_PERSONNEL"],
    },
    {
      id: "EXECUTION",
      title: "4. Execution",
      subtitle: "Personnel Delivery",
      activeStates: ["PERSONNEL_EXECUTING", "PERSONNEL_GENERATING_DELIVERABLES"],
    },
    {
      id: "SYNTHESIS",
      title: "5. Synthesis",
      subtitle: "Quality Review",
      activeStates: ["PM_SYNTHESIS", "MARKETING_PM_SYNTHESIZING_DOSSIER", "DIRECTOR_FINAL_REVIEW", "DIRECTOR_ASSEMBLING_FINAL_SIGN_OFF"],
    },
    {
      id: "SIGN_OFF",
      title: "6. Boss Sign-off",
      subtitle: "Final Authorization",
      activeStates: ["PENDING_BOSS_SIGN_OFF", "BOSS_FINAL_SIGN_OFF"],
    },
    {
      id: "COMPLETE",
      title: "7. Deployed",
      subtitle: "Live in Production",
      activeStates: ["COMPLETED", "CAMPAIGN_LAUNCHED_SUCCESSFULLY"],
    },
  ];

  // Determine which column is currently active
  const getColumnIndex = () => {
    if (!workflow) return 0;
    if (workflow.status === "COMPLETED") return 6;
    if (workflow.status === "REJECTED_BY_BOSS") return 1;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].activeStates.includes(workflow.status) || columns[i].activeStates.includes(currentStep)) {
        return i;
      }
    }
    return 0;
  };

  const activeColIndex = getColumnIndex();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-white/90">
            Autonomous Pipeline Lifecycle Kanban
          </h3>
          <p className="text-[11px] text-white/40 font-sans mt-0.5">
            Real-time stage tracking of the active AI mandate
          </p>
        </div>

        {workflow && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-white/40">Workflow:</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white font-mono text-[10px]">
              {workflow.workflowId}
            </span>
          </div>
        )}
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {columns.map((col, idx) => {
          const isPassed = idx < activeColIndex;
          const isCurrent = idx === activeColIndex;
          const isUpcoming = idx > activeColIndex;

          return (
            <div
              key={col.id}
              className={`flex flex-col min-h-[320px] rounded-xl border p-3 transition-all ${
                isCurrent
                  ? "bg-[#14141d] border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.15)] ring-1 ring-[#c5a059]/40"
                  : isPassed
                  ? "bg-[#0e0e13] border-emerald-500/30"
                  : "bg-[#0a0a0e] border-white/5 opacity-60"
              }`}
            >
              {/* Column Header */}
              <div className="pb-2.5 mb-2.5 border-b border-white/5 flex items-start justify-between">
                <div>
                  <h4 className="text-[11px] font-mono font-bold text-white tracking-tight">
                    {col.title}
                  </h4>
                  <span className="text-[9.5px] font-mono text-white/40 block mt-0.5">
                    {col.subtitle}
                  </span>
                </div>
                {isPassed && (
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono flex items-center justify-center font-bold">
                    ✓
                  </span>
                )}
                {isCurrent && (
                  <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
                )}
              </div>

              {/* Column Content Cards */}
              <div className="flex-1 space-y-2.5">
                {isCurrent && workflow && (
                  <div className="p-3 rounded-lg bg-black/40 border border-[#c5a059]/30 text-xs space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-amber-400 font-semibold uppercase">ACTIVE STEP</span>
                      <span className="text-white/40">{workflow.totalTokensConsumed} t</span>
                    </div>
                    <p className="text-[11px] text-white/80 font-sans leading-snug">
                      {workflow.originalRequest}
                    </p>

                    {col.id === "BOSS_GATE" && workflow.bossPreliminaryDecision && (
                      <div className="pt-2 border-t border-white/10 text-[10px] font-mono">
                        <span className="px-2 py-0.5 rounded bg-emerald-500 text-black font-extrabold mr-1.5">
                          {workflow.bossPreliminaryDecision.action}
                        </span>
                        <span className="text-white/60">
                          {workflow.bossPreliminaryDecision.projectedRoiMultiplier}x Target ROI
                        </span>
                      </div>
                    )}

                    {col.id === "EXECUTION" && workflow.pmSubTasks.length > 0 && (
                      <div className="space-y-1.5 pt-1">
                        {workflow.pmSubTasks.map((t) => (
                          <div
                            key={t.taskId}
                            className="p-1.5 rounded bg-white/5 text-[10px] font-mono text-white/70 flex items-center justify-between"
                          >
                            <span>{t.assignedTo}</span>
                            <span className="text-emerald-400">✓ Done</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {col.id === "COMPLETE" && (
                      <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono font-semibold text-center">
                        CAMPAIGN READY
                      </div>
                    )}
                  </div>
                )}

                {isPassed && (
                  <div className="p-2 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-white/50 text-center">
                    Stage Verified ✓
                  </div>
                )}

                {isUpcoming && (
                  <div className="p-3 rounded border border-dashed border-white/5 text-[10px] font-mono text-white/20 text-center">
                    Queued
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
