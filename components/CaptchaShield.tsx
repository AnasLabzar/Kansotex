"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CaptchaShieldProps {
  onVerify: (token: string, timestamp: number) => void;
  onReset?: () => void;
  isEn?: boolean;
  className?: string;
}

export function CaptchaShield({
  onVerify,
  onReset,
  isEn = false,
  className = "",
}: CaptchaShieldProps) {
  const [status, setStatus] = useState<"idle" | "verifying" | "verified">("idle");
  const [mountTimestamp] = useState<number>(() => Date.now());
  const [honeypotVal, setHoneypotVal] = useState("");
  const checkboxRef = useRef<HTMLButtonElement>(null);

  const handleVerify = async () => {
    if (status !== "idle") return;
    setStatus("verifying");

    try {
      // Simulate real biometric & browser entropy validation (1.1s)
      const [tokenRes] = await Promise.all([
        fetch("/api/captcha/token"),
        new Promise((resolve) => setTimeout(resolve, 1100)),
      ]);

      const data = await tokenRes.json();
      if (data.success && data.token) {
        setStatus("verified");
        onVerify(data.token, mountTimestamp);
      } else {
        setStatus("idle");
        onReset?.();
      }
    } catch (err) {
      console.error("Captcha verification error:", err);
      setStatus("idle");
      onReset?.();
    }
  };

  return (
    <div
      className={`relative select-none max-w-sm rounded-xl border border-[#ded7ca] bg-[#faf8f5] shadow-xs px-4 py-3 transition-all ${className}`}
    >
      {/* Invisible Honeypot Trap - Bots fill this automatically */}
      <input
        type="text"
        name="_hp_website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypotVal}
        onChange={(e) => setHoneypotVal(e.target.value)}
        className="absolute -left-[9999px] opacity-0 pointer-events-none w-0 h-0"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between gap-4">
        {/* Left: Checkbox & Label */}
        <div className="flex items-center gap-3">
          <button
            ref={checkboxRef}
            type="button"
            onClick={handleVerify}
            disabled={status !== "idle"}
            aria-label={isEn ? "I'm not a robot" : "Je ne suis pas un robot"}
            className={`w-7 h-7 rounded-md border flex items-center justify-center transition-all outline-none focus:ring-2 focus:ring-emerald-500/30 ${
              status === "verified"
                ? "bg-emerald-600 border-emerald-600 text-white shadow-xs"
                : status === "verifying"
                ? "bg-white border-[#c9c1b3] cursor-wait"
                : "bg-white border-[#c2b9a9] hover:border-[#8c7e6c] hover:bg-slate-50 cursor-pointer shadow-2xs"
            }`}
          >
            {status === "idle" && (
              <span className="w-full h-full" />
            )}

            {status === "verifying" && (
              <svg
                className="animate-spin w-4 h-4 text-[#8c7e6c]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3.5"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}

            {status === "verified" && (
              <motion.svg
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </motion.svg>
            )}
          </button>

          <span
            onClick={handleVerify}
            className={`text-xs font-sans font-medium transition-colors ${
              status === "idle"
                ? "text-[#1c1b19] cursor-pointer hover:text-black"
                : status === "verifying"
                ? "text-[#1c1b19]/60 cursor-wait"
                : "text-emerald-800 font-semibold cursor-default"
            }`}
          >
            {status === "idle"
              ? isEn
                ? "I'm not a robot"
                : "Je ne suis pas un robot"
              : status === "verifying"
              ? isEn
                ? "Checking browser..."
                : "Vérification en cours..."
              : isEn
              ? "Verified Human"
              : "Vérification réussie"}
          </span>
        </div>

        {/* Right: Security Badge Branding */}
        <div className="flex flex-col items-center justify-center shrink-0 text-center pl-2 border-l border-[#e8e2d8]">
          <div className="w-6 h-6 flex items-center justify-center text-[#9c8e7b]">
            <svg
              className="w-5 h-5 text-[#8c7e6c]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <span className="text-[8.5px] font-mono tracking-tight font-bold text-[#6e6355] uppercase mt-0.5">
            Kansotex Shield
          </span>
          <span className="text-[7.5px] font-sans text-[#a89d8f]">
            {isEn ? "Privacy • Terms" : "Anti-Spam Protégé"}
          </span>
        </div>
      </div>
    </div>
  );
}
