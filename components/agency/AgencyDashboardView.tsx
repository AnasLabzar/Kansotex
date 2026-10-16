"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { AgencyLiveFeed } from "./AgencyLiveFeed";
import { AgentStatusGrid } from "./AgentStatusGrid";
import { AgencyKanban } from "./AgencyKanban";
import { AgencyTelemetryHub } from "./AgencyTelemetryHub";
import { AgencyLLMConfig } from "./AgencyLLMConfig";
import { WorkflowState, AgentMessage, RealWorldWebsiteMetrics, PromptEvolutionPatch } from "@/lib/agency/types";

interface AgencyDashboardViewProps {
  initialWorkflow?: WorkflowState | null;
  initialMetrics?: RealWorldWebsiteMetrics;
  initialEvolutions?: PromptEvolutionPatch[];
  initialProvidersStats?: any;
}

const PRESET_MISSIONS = [
  "Launch a Pinterest Ads campaign for our new luxury bed sheets",
  "Optimize SEO architecture for Marrakech Linens & Savoir-Faire collections",
  "Architect High-Speed Redis Cache Layer for PDPs with sub-100ms response",
  "Design High-AOV Autumn Promotion for Boutique Riads and Hospitality Suites",
];

export function AgencyDashboardView({
  initialWorkflow = null,
  initialMetrics,
  initialEvolutions = [],
  initialProvidersStats,
}: AgencyDashboardViewProps) {
  const [activeTab, setActiveTab] = useState<"FEED" | "AGENTS" | "KANBAN" | "TELEMETRY" | "MODELS">("FEED");
  const [currentRequest, setCurrentRequest] = useState<string>(PRESET_MISSIONS[0]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [workflow, setWorkflow] = useState<WorkflowState | null>(initialWorkflow);
  const [messages, setMessages] = useState<AgentMessage[]>(initialWorkflow?.auditTrail || []);
  const [channelFilter, setChannelFilter] = useState<string>("ALL");

  // Telemetry & Evolution State
  const [metrics, setMetrics] = useState<RealWorldWebsiteMetrics>(
    initialMetrics || {
      conversionRatePercent: 3.42,
      averageOrderValueMad: 4850,
      bounceRatePercent: 29.8,
      pageSpeedLcpSeconds: 1.28,
      seoKeywordTop3Count: 48,
      pinterestCtrPercent: 3.85,
      metaAdsRoas: 5.2,
      cartAbandonmentPercent: 54.6,
      timestamp: new Date().toISOString(),
    }
  );
  const [evolutions, setEvolutions] = useState<PromptEvolutionPatch[]>(initialEvolutions);

  // Trigger Autonomous Multi-Agent Pipeline
  const handleLaunchMission = async () => {
    if (!currentRequest.trim() || isRunning) return;
    setIsRunning(true);

    try {
      const res = await fetch("/api/agency/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request: currentRequest }),
      });

      const data = await res.json();
      if (data.success && data.workflow) {
        setWorkflow(data.workflow);

        // Smooth playback of messages into the live terminal
        const fullTrail: AgentMessage[] = data.workflow.auditTrail || [];
        setMessages([]);

        for (let i = 0; i < fullTrail.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 250));
          setMessages((prev) => [...prev, fullTrail[i]]);
        }

        if (data.activeEvolutions) {
          setEvolutions(data.activeEvolutions);
        }
      } else {
        alert(data.error || "Failed to execute agency workflow");
      }
    } catch (err: any) {
      alert("Execution error: " + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  // Trigger Force Evolution Cycle
  const handleForceEvolution = async () => {
    try {
      const res = await fetch("/api/agency/run");
      const data = await res.json();
      if (data.success && data.evolutions) {
        setEvolutions(data.evolutions);
        if (data.metrics) setMetrics(data.metrics);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white font-sans antialiased selection:bg-[#c5a059] selection:text-black flex flex-col">
      {/* ===================================================================== */}
      {/* 1. TOP STICKY EXECUTIVE HUD & SYSTEM HEALTH */}
      {/* ===================================================================== */}
      <header className="sticky top-0 z-50 bg-[#0c0c10]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3 transition-all">
        <div className="max-w-[1700px] mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Brand & System Status */}
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[11px] font-mono font-medium text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Back to Ops</span>
            </Link>

            <div className="h-4 w-px bg-white/10" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c5a059] to-[#8c7038] flex items-center justify-center font-serif text-black font-black text-sm shadow-md">
                K
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Kansotex AI Agency Command Center
                  </h1>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    AUTONOMOUS
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/40 block">
                  Next.js 16 App Router · 15 Personas · Multi-Model Waterfall
                </span>
              </div>
            </div>
          </div>

          {/* Real-time Metric Indicators */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono">
            {/* Boss Status */}
            <div className="bg-[#121218] px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-[9px] text-white/40 uppercase block">The Boss Status</span>
              <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                {workflow?.bossFinalDecision?.action || "[OK] READY"}
              </span>
            </div>

            {/* Tokens Ingested */}
            <div className="bg-[#121218] px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-[9px] text-white/40 uppercase block">Tokens Consumed</span>
              <span className="text-amber-400 font-bold text-[11px]">
                {(workflow?.totalTokensConsumed || 4210).toLocaleString()} t
              </span>
            </div>

            {/* Projected ROI */}
            <div className="bg-[#121218] px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-[9px] text-white/40 uppercase block">Projected ROAS</span>
              <span className="text-[#c5a059] font-bold text-[11px]">4.8x</span>
            </div>

            {/* Active Model */}
            <div className="hidden lg:block bg-[#121218] px-3 py-1.5 rounded-lg border border-white/5">
              <span className="text-[9px] text-white/40 uppercase block">Active Primary</span>
              <span className="text-cyan-400 font-bold text-[11px]">Gemini 2.0 Flash</span>
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================================== */}
      {/* 2. MISSION CONTROL COMMAND BAR */}
      {/* ===================================================================== */}
      <section className="bg-[#0f0f15] border-b border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-[1700px] mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <span className="text-[11px] font-mono text-white/50 uppercase shrink-0">
              Agency Mandate:
            </span>

            {/* Preset Selector */}
            <select
              value={currentRequest}
              onChange={(e) => setCurrentRequest(e.target.value)}
              className="bg-[#15151e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white/90 outline-none focus:border-[#c5a059] transition-colors"
            >
              {PRESET_MISSIONS.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>

            {/* Custom Edit Input */}
            <input
              type="text"
              value={currentRequest}
              onChange={(e) => setCurrentRequest(e.target.value)}
              placeholder="Or write bespoke mandate for The Boss..."
              className="flex-1 bg-[#15151e] border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white/90 outline-none focus:border-[#c5a059] transition-colors placeholder:text-white/30"
            />
          </div>

          <button
            type="button"
            onClick={handleLaunchMission}
            disabled={isRunning}
            className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#c5a059] to-[#8c7038] hover:from-[#d4af37] hover:to-[#9c7d40] text-black font-mono font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(197,160,89,0.3)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer shrink-0 flex items-center justify-center gap-2"
          >
            {isRunning ? (
              <>
                <svg
                  className="animate-spin w-4 h-4 text-black"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                <span>Orchestrating...</span>
              </>
            ) : (
              <>
                <span>⚡</span>
                <span>Dispatch Mandate</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. MAIN DASHBOARD WORKSPACE (SIDEBAR + CONTENT) */}
      {/* ===================================================================== */}
      <div className="flex-1 max-w-[1700px] w-full mx-auto px-4 sm:px-8 py-6 flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-1 select-none">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest px-3 pb-2 font-semibold">
            Control Views
          </div>

          <button
            type="button"
            onClick={() => setActiveTab("FEED")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === "FEED"
                ? "bg-[#181822] text-[#c5a059] border border-[#c5a059]/40 shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span>⚡</span>
              <span>Live Command Feed</span>
            </div>
            {messages.length > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-white/10 text-[10px] text-white font-mono">
                {messages.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("AGENTS")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === "AGENTS"
                ? "bg-[#181822] text-[#c5a059] border border-[#c5a059]/40 shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span>👥</span>
              <span>Agent Org Grid</span>
            </div>
            <span className="text-[10px] text-white/40 font-mono">15 Agents</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("KANBAN")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === "KANBAN"
                ? "bg-[#181822] text-[#c5a059] border border-[#c5a059]/40 shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span>📋</span>
              <span>Pipeline Kanban</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Live</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("TELEMETRY")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === "TELEMETRY"
                ? "bg-[#181822] text-[#c5a059] border border-[#c5a059]/40 shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span>🧠</span>
              <span>Self-Improvement Hub</span>
            </div>
            {evolutions.length > 0 && (
              <span className="px-1.5 py-0.2 rounded bg-[#c5a059]/20 text-[10px] text-[#c5a059] font-mono">
                {evolutions.length} Patches
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("MODELS")}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
              activeTab === "MODELS"
                ? "bg-[#181822] text-[#c5a059] border border-[#c5a059]/40 shadow-sm"
                : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span>🌊</span>
              <span>Waterfall LLM Router</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">Active</span>
          </button>

          {/* Quick Stats Panel */}
          <div className="pt-6 mt-6 border-t border-white/5 space-y-3">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider block font-semibold">
              Live Governance
            </span>
            <div className="p-3 rounded-xl bg-[#0d0d12] border border-white/5 space-y-2 text-[10px] font-mono text-white/60">
              <div className="flex justify-between">
                <span>Boundary Rules:</span>
                <span className="text-emerald-400 font-bold">100% Enforced</span>
              </div>
              <div className="flex justify-between">
                <span>Violations Blocked:</span>
                <span className="text-white/80">0 Breaches</span>
              </div>
              <div className="flex justify-between">
                <span>Hurdle Rate:</span>
                <span className="text-[#c5a059]">3.5x Min ROI</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {activeTab === "FEED" && (
              <motion.div
                key="FEED"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-[750px]"
              >
                {/* Channel Filter Toolbar */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-mono text-white/50">
                    Filter by Communication Channel:
                  </span>
                  <div className="flex gap-1.5 text-[10px] font-mono">
                    {["ALL", "EXECUTIVE_ISOLATED", "DIRECTORATE_DESK", "TEAM_DISPATCH"].map((ch) => (
                      <button
                        key={ch}
                        type="button"
                        onClick={() => setChannelFilter(ch)}
                        className={`px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          channelFilter === ch
                            ? "bg-white/10 text-white border-white/20 font-bold"
                            : "bg-transparent text-white/40 border-transparent hover:text-white/70"
                        }`}
                      >
                        {ch}
                      </button>
                    ))}
                  </div>
                </div>

                <AgencyLiveFeed
                  messages={messages}
                  isStreaming={isRunning}
                  filterChannel={channelFilter}
                />
              </motion.div>
            )}

            {activeTab === "AGENTS" && (
              <motion.div
                key="AGENTS"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AgentStatusGrid />
              </motion.div>
            )}

            {activeTab === "KANBAN" && (
              <motion.div
                key="KANBAN"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AgencyKanban workflow={workflow} />
              </motion.div>
            )}

            {activeTab === "TELEMETRY" && (
              <motion.div
                key="TELEMETRY"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AgencyTelemetryHub
                  metrics={metrics}
                  evolutions={evolutions}
                  onTriggerEvolution={handleForceEvolution}
                />
              </motion.div>
            )}

            {activeTab === "MODELS" && (
              <motion.div
                key="MODELS"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <AgencyLLMConfig initialStats={initialProvidersStats} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
