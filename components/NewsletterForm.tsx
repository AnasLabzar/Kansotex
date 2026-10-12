"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { removeAccents } from "@/lib/text";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const t = useTranslations("Footer");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className="font-sans text-[13px] font-light text-[#f3eee6]/70 mx-auto max-w-sm border-b border-[#f3eee6]/30 pb-3 text-center">
        Merci pour votre inscription !
      </p>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-sm items-end border-b border-[#f3eee6]/30 pb-3 transition-colors focus-within:border-[#f3eee6]"
    >
      <input 
        type="email" 
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={removeAccents(t("emailPlaceholder"))} 
        className="w-full bg-transparent font-termina text-[10px] font-bold uppercase tracking-[0.2em] outline-none placeholder:text-[#f3eee6]/30" 
      />
      <button 
        type="submit" 
        disabled={status === "loading"}
        className="font-termina text-[10px] font-bold uppercase tracking-[0.3em] transition-colors hover:text-[#a49a8d] disabled:opacity-50"
      >
        {status === "loading" ? "..." : removeAccents(t("subscribe"))}
      </button>
    </form>
  );
}
