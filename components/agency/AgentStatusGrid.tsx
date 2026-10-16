"use client";

import React from "react";
import { AgentRole, AGENT_REGISTRY } from "@/lib/agency/types";

interface AgentStatusGridProps {
  activeAgent?: AgentRole | null;
  agentStats?: Record<string, { tasksCompleted: number; tokensUsed: number; status: "IDLE" | "THINKING" | "WORKING" | "BLOCKED" }>;
}

export function AgentStatusGrid({
  activeAgent = null,
  agentStats = {},
}: AgentStatusGridProps) {
  const allRoles = Object.keys(AGENT_REGISTRY) as AgentRole[];

  // Group by department
  const departments: { key: string; title: string; roles: AgentRole[] }[] = [
    { key: "EXECUTIVE", title: "Executive Command (Tier 1 & 2)", roles: ["THE_BOSS", "THE_DIRECTOR"] },
    { key: "MARKETING", title: "Marketing & Growth (Tier 3 & 4)", roles: ["MARKETING_PM", "ADS_EXPERT", "CONTENT_WRITER", "SEO_EXPERT", "STRATEGY_ANALYST"] },
    { key: "CREATIVE", title: "Creative Atelier (Tier 3 & 4)", roles: ["CREATIVE_PM", "WEB_DESIGNER", "UI_UX_EXPERT"] },
    { key: "CODE", title: "Systems & Engineering (Tier 3 & 4)", roles: ["CODE_PM", "FRONTEND_DEV", "BACKEND_DEV", "DEVOPS_ENG", "AI_DEV"] },
  ];

  const getStatusBadge = (role: AgentRole) => {
    const isCurrentlyActive = activeAgent === role;
    if (isCurrentlyActive) {
      return (
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-bold animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          WORKING
        </span>
      );
    }

    const stat = agentStats[role]?.status || "IDLE";
    if (stat === "THINKING") {
      return (
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[9px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          THINKING
        </span>
      );
    }
    if (stat === "BLOCKED") {
      return (
        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[9px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          BLOCKED
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-[9px] font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
        IDLE
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {departments.map((dept) => (
        <div key={dept.key} className="space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-white/70">
              {dept.title}
            </h3>
            <span className="text-[10px] font-mono text-white/30">
              {dept.roles.length} Personas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {dept.roles.map((role) => {
              const desc = AGENT_REGISTRY[role];
              const isSelected = activeAgent === role;
              const isBoss = role === "THE_BOSS";
              const isDirector = role === "THE_DIRECTOR";
              const isPM = role.endsWith("_PM");

              return (
                <div
                  key={role}
                  className={`relative p-3.5 rounded-xl border transition-all select-none ${
                    isSelected
                      ? "bg-[#181824] border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.2)] ring-1 ring-[#c5a059]/50"
                      : isBoss
                      ? "bg-[#13120f] border-[#c5a059]/30 hover:border-[#c5a059]/60"
                      : isDirector
                      ? "bg-[#111118] border-indigo-500/20 hover:border-indigo-500/50"
                      : isPM
                      ? "bg-[#111118] border-cyan-500/20 hover:border-cyan-500/40"
                      : "bg-[#0e0e13] border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Top Row: Role + Status */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-white tracking-tight block">
                        {role}
                      </span>
                      <span className="text-[9px] font-mono text-white/40">
                        {desc.tier.replace("_", " ")}
                      </span>
                    </div>
                    {getStatusBadge(role)}
                  </div>

                  {/* Hierarchy Link */}
                  <div className="text-[10px] font-mono text-white/50 pt-2 border-t border-white/5 flex items-center justify-between">
                    <span>
                      Reports to:{" "}
                      <strong className="text-white/80">
                        {desc.reportsTo || "None (Owner)"}
                      </strong>
                    </span>
                    {desc.canFallbackExecute && (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[8.5px] font-mono font-semibold">
                        Fallback Capable
                      </span>
                    )}
                  </div>

                  {/* Token Budget Gauge */}
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[9.5px] font-mono text-white/40">
                    <span>Token Ceiling:</span>
                    <span className="text-amber-400 font-medium">
                      {desc.maxTokensPerTask.toLocaleString()} t/task
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
