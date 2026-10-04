"use client";

import { useState } from "react";
import { brand } from "@/lib/content";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const t = useTranslations("ContactForm");

  return (
    <form
      className="mx-auto grid w-full max-w-xl gap-6 text-left"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      {sent ? (
        <p className="font-serif text-2xl italic">
          {t("successMessage")}
        </p>
      ) : (
        <>
          <label className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.28em]">
              {t("name")}
            </span>
            <input
              required
              name="name"
              className="w-full border-b border-[#1c1b19]/30 bg-transparent py-2 outline-none focus:border-[#1c1b19]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.28em]">
              {t("email")}
            </span>
            <input
              required
              type="email"
              name="email"
              className="w-full border-b border-[#1c1b19]/30 bg-transparent py-2 outline-none focus:border-[#1c1b19]"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.28em]">
              {t("project")}
            </span>
            <textarea
              required
              name="message"
              rows={4}
              className="w-full resize-none border-b border-[#1c1b19]/30 bg-transparent py-2 outline-none focus:border-[#1c1b19]"
            />
          </label>
          <button
            type="submit"
            className="mt-4 justify-self-start text-[11px] uppercase tracking-[0.28em] underline decoration-[0.7px] underline-offset-[10px]"
          >
            {t("send")}
          </button>
          <p className="text-xs text-[#1c1b19]/60">
            {t("directEmail")}{brand.email}
          </p>
        </>
      )}
    </form>
  );
}
