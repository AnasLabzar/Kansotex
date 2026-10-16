"use client";

import React, { useState, useEffect } from "react";

interface ProviderStat {
  name: string;
  envVar: string;
  configured: boolean;
}

interface AgencyLLMConfigProps {
  initialStats?: any;
}

export function AgencyLLMConfig({ initialStats }: AgencyLLMConfigProps) {
  const [stats, setStats] = useState<any>(initialStats || null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/agency/providers");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialStats) {
      fetchStats();
    }
  }, [initialStats]);

  const configuredProviders: ProviderStat[] = stats?.configuredProviders || [
    { name: "Google Gemini (Free 15 RPM / 1M TPM)", envVar: "GEMINI_API_KEY", configured: false },
    { name: "Groq Cloud (Free Llama 3.3 70B)", envVar: "GROQ_API_KEY", configured: false },
    { name: "OpenRouter (Free DeepSeek R1 & Llama)", envVar: "OPENROUTER_API_KEY", configured: false },
    { name: "Mistral AI", envVar: "MISTRAL_API_KEY", configured: false },
    { name: "OpenAI", envVar: "OPENAI_API_KEY", configured: false },
    { name: "Anthropic Claude", envVar: "ANTHROPIC_API_KEY", configured: false },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#14141c] via-[#101016] to-[#161410] border border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
              Multi-Provider Waterfall Router &amp; Failover Matrix
            </h3>
          </div>
          <button
            type="button"
            onClick={fetchStats}
            disabled={loading}
            className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-xs font-mono transition-colors cursor-pointer"
          >
            {loading ? "Checking..." : "Refresh Status ↻"}
          </button>
        </div>
        <p className="text-xs text-white/60 font-sans leading-relaxed max-w-3xl">
          The autonomous agency uses a waterfall cascade router. It always executes the highest-fidelity free model first. If a provider reaches rate limits or quota exhaustion (HTTP 429), the router seamlessly cascades to the next available engine with 0 downtime.
        </p>
      </div>

      {/* Provider Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* 1. Google Gemini */}
        <div className="p-4 rounded-xl bg-[#0f0f14] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white">Google Gemini</span>
            <span
              className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                configuredProviders.find((p) => p.envVar === "GEMINI_API_KEY")?.configured
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/5 text-white/40"
              }`}
            >
              {configuredProviders.find((p) => p.envVar === "GEMINI_API_KEY")?.configured
                ? "CONFIGURED"
                : "AWAITING KEY"}
            </span>
          </div>
          <div className="text-[11px] text-white/60 font-sans">
            Models: <code className="text-[#c5a059]">gemini-2.0-flash</code>, <code className="text-[#c5a059]">gemini-1.5-pro</code>
          </div>
          <div className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
            Free Quota: 15 req/min · 1M tokens/min · 1,500 req/day FREE
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/40">GEMINI_API_KEY in .env</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] hover:underline"
            >
              Get Free Key →
            </a>
          </div>
        </div>

        {/* 2. Groq Cloud */}
        <div className="p-4 rounded-xl bg-[#0f0f14] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white">Groq Cloud (Llama 3.3)</span>
            <span
              className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                configuredProviders.find((p) => p.envVar === "GROQ_API_KEY")?.configured
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/5 text-white/40"
              }`}
            >
              {configuredProviders.find((p) => p.envVar === "GROQ_API_KEY")?.configured
                ? "CONFIGURED"
                : "AWAITING KEY"}
            </span>
          </div>
          <div className="text-[11px] text-white/60 font-sans">
            Models: <code className="text-[#c5a059]">llama-3.3-70b-versatile</code> (500+ tokens/sec)
          </div>
          <div className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
            Free Quota: Ultra-fast open-weights inference engine FREE
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/40">GROQ_API_KEY in .env</span>
            <a
              href="https://console.groq.com/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] hover:underline"
            >
              Get Free Key →
            </a>
          </div>
        </div>

        {/* 3. OpenRouter */}
        <div className="p-4 rounded-xl bg-[#0f0f14] border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-white">OpenRouter Free Hub</span>
            <span
              className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                configuredProviders.find((p) => p.envVar === "OPENROUTER_API_KEY")?.configured
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                  : "bg-white/5 text-white/40"
              }`}
            >
              {configuredProviders.find((p) => p.envVar === "OPENROUTER_API_KEY")?.configured
                ? "CONFIGURED"
                : "AWAITING KEY"}
            </span>
          </div>
          <div className="text-[11px] text-white/60 font-sans">
            Models: <code className="text-[#c5a059]">deepseek-r1:free</code>, <code className="text-[#c5a059]">llama-3.3:free</code>
          </div>
          <div className="text-[10px] font-mono text-emerald-400/90 bg-emerald-500/5 p-2 rounded border border-emerald-500/10">
            Free Quota: Multiple open models accessible with 1 unified key
          </div>
          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
            <span className="text-white/40">OPENROUTER_API_KEY in .env</span>
            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c5a059] hover:underline"
            >
              Get Free Key →
            </a>
          </div>
        </div>

        {/* 4. Safety Net */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-[#12110e] to-[#0f0e0c] border border-[#c5a059]/30 space-y-3 md:col-span-2 lg:col-span-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#c5a059]" />
              <span className="text-xs font-mono font-bold text-white">
                Kansotex Offline Domain Safety Net (Always Active)
              </span>
            </div>
            <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-[#c5a059]/20 text-[#c5a059] border border-[#c5a059]/40">
              100% RELIABILITY GUARANTEE
            </span>
          </div>
          <p className="text-xs text-white/70 font-sans leading-relaxed">
            Even if all remote API quotas expire simultaneously or external network connectivity drops, the system falls back to the deterministic Kansotex luxury domain engine. Missions execute, and the store never crashes.
          </p>
        </div>
      </div>
    </div>
  );
}
