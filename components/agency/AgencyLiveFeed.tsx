"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgentMessage } from "@/lib/agency/types";

interface AgencyLiveFeedProps {
  messages: AgentMessage[];
  isStreaming?: boolean;
  filterChannel?: string;
}

export function AgencyLiveFeed({
  messages,
  isStreaming = false,
  filterChannel = "ALL",
}: AgencyLiveFeedProps) {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isStreaming]);

  const filteredMessages = messages.filter((m) => {
    if (filterChannel === "ALL") return true;
    return m.channel === filterChannel;
  });

  return (
    <div className="flex flex-col h-full bg-[#0d0d11] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#121218] border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block shadow-sm" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block shadow-sm" />
          </div>
          <span className="text-[11px] font-mono font-medium text-white/50 tracking-wider uppercase ml-2">
            Kansotex MessageBroker Terminal · Protocol v2.4
          </span>
        </div>

        <div className="flex items-center gap-3">
          {isStreaming && (
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              LIVE DISPATCH
            </div>
          )}
          <span className="text-[10px] font-mono text-white/40">
            {filteredMessages.length} Messages logged
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="flex-1 p-5 overflow-y-auto space-y-4 font-sans text-xs scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {filteredMessages.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center text-white/40 space-y-2">
            <svg
              className="w-10 h-10 text-white/20 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="font-mono text-xs">Waiting for command dispatch...</p>
            <p className="text-[11px] text-white/30">
              Launch a mission to observe the multi-agent command chain.
            </p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filteredMessages.map((msg, index) => {
              const isBoss = msg.sender === "THE_BOSS";
              const isDirector = msg.sender === "THE_DIRECTOR";
              const isPM = msg.sender.endsWith("_PM");
              const isPersonnel = !isBoss && !isDirector && !isPM;

              return (
                <motion.div
                  key={msg.id || index}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`relative rounded-xl p-4 border transition-all ${
                    isBoss
                      ? "bg-gradient-to-r from-[#181611] to-[#12110e] border-[#c5a059]/40 shadow-[0_4px_24px_rgba(197,160,89,0.12)]"
                      : isDirector
                      ? "bg-[#14141c] border-indigo-500/30 shadow-lg"
                      : isPM
                      ? "bg-[#131318] border-cyan-500/25 shadow-md"
                      : "bg-[#0f0f14] border-white/10"
                  }`}
                >
                  {/* Message Meta Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      {/* Sender Badge */}
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wide uppercase ${
                          isBoss
                            ? "bg-[#c5a059] text-black shadow-xs font-black"
                            : isDirector
                            ? "bg-indigo-500 text-white"
                            : isPM
                            ? "bg-cyan-500 text-black font-semibold"
                            : "bg-white/15 text-white/80"
                        }`}
                      >
                        {msg.sender}
                      </span>

                      <span className="text-white/30 font-mono text-[10px]">➔</span>

                      {/* Recipient Badge */}
                      <span className="text-[10px] font-mono text-white/60 font-medium">
                        {msg.recipient}
                      </span>

                      {/* Channel Tag */}
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/40 border border-white/5 uppercase">
                        {msg.channel}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] font-mono text-white/40">
                      {msg.tokenCostEstimate && (
                        <span className="text-amber-400/80">
                          {msg.tokenCostEstimate} tokens
                        </span>
                      )}
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  {/* Message Subject */}
                  <div className="font-medium text-white/90 text-xs tracking-tight mb-2 flex items-center gap-2">
                    {isBoss && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
                    )}
                    <span>{msg.subject}</span>
                  </div>

                  {/* Specialized Renderers based on Sender */}
                  {isBoss && msg.payload?.decision && (
                    <div className="mt-2 p-3 rounded-lg bg-black/40 border border-[#c5a059]/30 space-y-2">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded text-xs font-mono font-extrabold tracking-wider ${
                            (msg.payload.decision as any).action === "[OK]"
                              ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {(msg.payload.decision as any).action}
                        </span>
                        <div className="text-[11px] font-mono text-white/70">
                          Target ROI:{" "}
                          <span className="text-[#c5a059] font-bold">
                            {(msg.payload.decision as any).projectedRoiMultiplier}x
                          </span>{" "}
                          · Risk:{" "}
                          <span className="text-emerald-400">
                            {(msg.payload.decision as any).riskAssessment}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-white/80 leading-relaxed font-sans italic border-l-2 border-[#c5a059]/50 pl-2.5">
                        &quot;{(msg.payload.decision as any).justification}&quot;
                      </p>
                    </div>
                  )}

                  {isDirector && msg.payload?.roadmap && (
                    <div className="mt-2 p-3 rounded-lg bg-black/30 border border-indigo-500/20 text-[11px] space-y-1.5 text-white/80">
                      <div className="text-indigo-400 font-mono font-semibold text-[10px] uppercase">
                        Operational Roadmap
                      </div>
                      <p className="text-white/90 leading-relaxed">
                        {(msg.payload.roadmap as any).summary}
                      </p>
                      <div className="flex flex-wrap gap-3 pt-1 text-[10px] font-mono text-white/60">
                        <span>
                          Target:{" "}
                          <strong className="text-white/80">
                            {(msg.payload.roadmap as any).targetAudience?.slice(0, 45)}...
                          </strong>
                        </span>
                        <span>
                          ROAS Hurdle:{" "}
                          <strong className="text-emerald-400">
                            {(msg.payload.roadmap as any).kpis?.projectedRoas}
                          </strong>
                        </span>
                      </div>
                    </div>
                  )}

                  {msg.sender === "ADS_EXPERT" && (msg.payload as any)?.campaign && (
                    <div className="mt-2 p-3 rounded-lg bg-black/30 border border-white/10 text-[11px] space-y-1.5 font-mono">
                      <div className="text-emerald-400 font-semibold text-[10px] uppercase flex items-center justify-between">
                        <span>Pinterest Campaign Config</span>
                        <span className="text-white/50">
                          Budget: {(msg.payload as any).campaign?.dailyBudgetMad} MAD/day
                        </span>
                      </div>
                      <div className="text-white/70 text-[10px]">
                        Targeting:{" "}
                        {(msg.payload as any).campaign?.adGroups
                          ?.map((g: any) => g.name)
                          .join(" • ")}
                      </div>
                      <div className="text-[9px] text-[#c5a059] truncate">
                        URL: {(msg.payload as any).campaign?.creativeSpecs?.destinationUrl}
                      </div>
                    </div>
                  )}

                  {msg.sender === "CONTENT_WRITER" && (msg.payload as any)?.copySuite && (
                    <div className="mt-2 p-3 rounded-lg bg-black/30 border border-white/10 text-[11px] space-y-2">
                      <div className="text-amber-400 font-mono font-semibold text-[10px] uppercase">
                        Bespoke Luxury Ad Copy Suite
                      </div>
                      {(msg.payload as any).copySuite?.slice(0, 1).map((c: any, i: number) => (
                        <div key={i} className="space-y-1">
                          <div className="font-serif italic text-white/95 text-xs">
                            &quot;{c.headline}&quot;
                          </div>
                          <div className="text-[10px] text-white/70 leading-relaxed">
                            {c.description?.slice(0, 140)}...
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Raw Fallback Payload Inspector */}
                  {!isBoss &&
                    !isDirector &&
                    msg.sender !== "ADS_EXPERT" &&
                    msg.sender !== "CONTENT_WRITER" && (
                      <div className="mt-2 p-2 rounded bg-black/20 text-[10px] font-mono text-white/60 truncate">
                        {JSON.stringify(msg.payload)}
                      </div>
                    )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
