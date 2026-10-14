import React from "react";

interface RichArticleContentProps {
  content: string;
  className?: string;
}

/**
 * Formats inline Markdown syntax:
 * - **bold text** -> <strong className="font-semibold text-[#1c1b19]">
 * - *italic text* -> <em className="italic font-serif text-[#1c1b19]/90">
 */
export function FormattedInline({ text }: { text: string }) {
  if (!text) return null;

  const tokens: { type: "text" | "bold" | "italic"; val: string }[] = [];
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: "text",
        val: text.substring(lastIndex, match.index),
      });
    }

    const raw = match[0];
    if (raw.startsWith("**") && raw.endsWith("**")) {
      tokens.push({
        type: "bold",
        val: raw.slice(2, -2),
      });
    } else if (raw.startsWith("*") && raw.endsWith("*")) {
      tokens.push({
        type: "italic",
        val: raw.slice(1, -1),
      });
    }

    lastIndex = match.index + raw.length;
  }

  if (lastIndex < text.length) {
    tokens.push({
      type: "text",
      val: text.substring(lastIndex),
    });
  }

  return (
    <>
      {tokens.map((token, i) => {
        if (token.type === "bold") {
          return (
            <strong
              key={i}
              className="font-semibold text-[#1c1b19] underline decoration-[#B8860B]/30 decoration-1 underline-offset-2"
            >
              {token.val}
            </strong>
          );
        }
        if (token.type === "italic") {
          return (
            <em key={i} className="font-serif italic text-[#1c1b19]/90">
              {token.val}
            </em>
          );
        }
        return <span key={i}>{token.val}</span>;
      })}
    </>
  );
}

/**
 * Renders rich structured editorial blocks with:
 * - Paragraphs with bold & italic parsing
 * - Styled luxury numbered steps (1. 2. 3.)
 * - Styled luxury gold bullet points (- or *)
 */
export function RichArticleContent({
  content,
  className = "",
}: RichArticleContentProps) {
  if (!content) return null;

  const lines = content.split("\n");
  type Block =
    | { type: "p"; text: string }
    | { type: "ol"; items: { num: string; text: string }[] }
    | { type: "ul"; items: string[] };

  const blocks: Block[] = [];
  let currentList:
    | { type: "ol"; items: { num: string; text: string }[] }
    | { type: "ul"; items: string[] }
    | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      if (currentList) {
        blocks.push(currentList);
        currentList = null;
      }
      continue;
    }

    // Match numbered list: "1. text" or "1) text"
    const numMatch = line.match(/^(\d+)[\.\)]\s+(.*)$/);
    if (numMatch) {
      if (!currentList || currentList.type !== "ol") {
        if (currentList) blocks.push(currentList);
        currentList = { type: "ol", items: [] };
      }
      currentList.items.push({ num: numMatch[1], text: numMatch[2] });
      continue;
    }

    // Match bullet point: "- text" or "* text" or "• text"
    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      if (!currentList || currentList.type !== "ul") {
        if (currentList) blocks.push(currentList);
        currentList = { type: "ul", items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      continue;
    }

    if (currentList) {
      blocks.push(currentList);
      currentList = null;
    }

    blocks.push({ type: "p", text: line });
  }

  if (currentList) {
    blocks.push(currentList);
  }

  return (
    <div
      className={`space-y-4 text-sm sm:text-base font-light leading-[1.85] text-[#1c1b19]/85 ${className}`}
    >
      {blocks.map((block, idx) => {
        if (block.type === "p") {
          return (
            <p key={idx} className="leading-relaxed">
              <FormattedInline text={block.text} />
            </p>
          );
        }

        if (block.type === "ol") {
          return (
            <div key={idx} className="my-5 space-y-3 pl-1 sm:pl-2">
              {block.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B8860B]/10 text-[#B8860B] text-[11px] font-semibold border border-[#B8860B]/20">
                    {item.num}
                  </span>
                  <div className="flex-1 text-xs sm:text-sm leading-relaxed text-[#1c1b19]/90">
                    <FormattedInline text={item.text} />
                  </div>
                </div>
              ))}
            </div>
          );
        }

        if (block.type === "ul") {
          return (
            <div key={idx} className="my-5 space-y-2.5 pl-1 sm:pl-2">
              {block.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B8860B] mt-2.5 shrink-0" />
                  <div className="flex-1 text-xs sm:text-sm leading-relaxed text-[#1c1b19]/90">
                    <FormattedInline text={item} />
                  </div>
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
