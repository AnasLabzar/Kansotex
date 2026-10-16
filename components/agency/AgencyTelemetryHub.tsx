"use client";

import React from "react";
import { PromptEvolutionPatch, RealWorldWebsiteMetrics } from "@/lib/agency/types";

interface AgencyTelemetryHubProps {
  metrics: RealWorldWebsiteMetrics;
  evolutions: PromptEvolutionPatch[];
  onTriggerEvolution?: () => void;
}

export function AgencyTelemetryHub({
  metrics,
  evolutions,
  onTriggerEvolution,
}: AgencyTelemetryHubProps) {
  const metricCards = [
    {
      title: "Pinterest Ads CTR",
      value: `${metrics.pinterestCtrPercent}%`,
      benchmark: "Target: > 3.0%",
      status: metrics.pinterestCtrPercent >= 3.0 ? "OPTIMAL" : "NEEDS_IMPROVEMENT",
      change: "+0.85% vs benchmark",
      desc: "Visual search engagement on luxury bedding pins",
    },
    {
      title: "Average Order Value (AOV)",
      value: `${metrics.averageOrderValueMad.toLocaleString()} MAD`,
      benchmark: "Hurdle: > 4,000 MAD",
      status: metrics.averageOrderValueMad >= 4000 ? "OPTIMAL" : "NEEDS_IMPROVEMENT",
      change: "Driven by Riad/Villa suites",
      desc: "Hospitality & residential high-ticket baskets",
    },
    {
      title: "Core Web Vitals (LCP)",
      value: `${metrics.pageSpeedLcpSeconds}s`,
      benchmark: "Target: < 1.5s",
      status: metrics.pageSpeedLcpSeconds <= 1.5 ? "OPTIMAL" : "SLOW",
      change: "Green zone (Google Lighthouse 98)",
      desc: "Fast load gives headroom for Framer micro-animations",
    },
    {
      title: "Meta Ads ROAS",
      value: `${metrics.metaAdsRoas}x`,
      benchmark: "Hurdle: > 4.0x",
      status: metrics.metaAdsRoas >= 4.0 ? "OPTIMAL" : "LOW",
      change: "Profitable paid acquisition",
      desc: "Instagram architectural carousels & reels",
    },
    {
      title: "Store Conversion Rate",
      value: `${metrics.conversionRatePercent}%`,
      benchmark: "Industry: ~ 1.8%",
      status: metrics.conversionRatePercent >= 2.5 ? "OPTIMAL" : "AVERAGE",
      change: "+1.62% above luxury average",
      desc: "Bespoke quote & direct fabric meterage checkout",
    },
    {
      title: "Cart Abandonment",
      value: `${metrics.cartAbandonmentPercent}%`,
      benchmark: "Industry: ~ 68%",
      status: metrics.cartAbandonmentPercent <= 60 ? "OPTIMAL" : "HIGH",
      change: "14% lower than eCommerce baseline",
      desc: "Assisted quote concierge reduces drop-off",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Metrics Row */}
      <div>
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5">
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-white/80">
            Real-World E-commerce Performance Telemetry (Kansotex.com)
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Analytics Feed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {metricCards.map((c, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-[#0f0f14] border border-white/10 space-y-2 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>{c.title}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-semibold ${
                    c.status === "OPTIMAL"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <div className="flex items-baseline justify-between pt-1">
                <span className="text-2xl font-serif text-white font-normal tracking-tight">
                  {c.value}
                </span>
                <span className="text-[10px] font-mono text-white/40">{c.benchmark}</span>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-sans text-white/60">
                <span className="truncate">{c.desc}</span>
                <span className="text-emerald-400/90 font-mono shrink-0 ml-2">{c.change}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Prompt Evolution Feed */}
      <div className="pt-2">
        <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/5">
          <div>
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-white/80">
              Autonomous Prompt Evolutions & Self-Improvement Patches
            </h3>
            <p className="text-[11px] text-white/40 font-sans mt-0.5">
              Agents autonomously rewrite and refine their domain prompts based on telemetry feedback
            </p>
          </div>

          {onTriggerEvolution && (
            <button
              type="button"
              onClick={onTriggerEvolution}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-[10px] font-mono transition-colors cursor-pointer"
            >
              Force Evolution Cycle ↻
            </button>
          )}
        </div>

        <div className="space-y-3">
          {evolutions.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#0f0f14] border border-white/5 text-center text-white/40 text-xs font-mono">
              No prompt evolutions generated yet. Run a workflow to trigger the self-improvement loop.
            </div>
          ) : (
            evolutions.map((patch, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#121218] border border-white/10 hover:border-[#c5a059]/40 transition-all space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#c5a059]/20 text-[#c5a059] font-mono font-bold text-[10px] border border-[#c5a059]/30">
                      {patch.agentRole}
                    </span>
                    <span className="text-[10px] font-mono text-white/40">
                      Version Patch v{patch.version}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px]">
                      {patch.status}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-white/30">
                    Triggered by:{" "}
                    <strong className="text-white/60">{patch.triggerMetric}</strong>
                  </span>
                </div>

                <div className="text-xs text-white/80 font-sans leading-relaxed">
                  <strong className="text-white font-mono text-[11px] block text-white/50 mb-0.5">
                    Empirical Discovery:
                  </strong>
                  {patch.insightDescription}
                </div>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] text-amber-200/90 leading-relaxed">
                  <span className="text-white/40 block text-[9px] mb-1">
                    [SYSTEM_PROMPT_ADDENDUM INJECTED]:
                  </span>
                  &quot;{patch.promptAddendum}&quot;
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
