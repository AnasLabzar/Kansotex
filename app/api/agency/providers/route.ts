import { NextResponse } from "next/server";
import { LLMRouter } from "@/lib/agency/llm/llmRouter";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const stats = LLMRouter.getStats();
    return NextResponse.json({
      success: true,
      stats,
      documentation: {
        freeProviders: [
          {
            name: "Google Gemini",
            freeQuota: "15 requests/min, 1,000,000 tokens/min, 1,500 requests/day for FREE",
            getKeyUrl: "https://aistudio.google.com/app/apikey",
            envVariable: "GEMINI_API_KEY",
            tip: "You can provide multiple keys separated by commas for automatic rotation: GEMINI_API_KEY=key1,key2",
          },
          {
            name: "Groq Cloud",
            freeQuota: "Ultra-fast Llama 3.3 70B & 3.1 8B, high rate-limits for FREE",
            getKeyUrl: "https://console.groq.com/keys",
            envVariable: "GROQ_API_KEY",
            tip: "Fastest inference engine (500+ tokens/sec). Great fallback.",
          },
          {
            name: "OpenRouter",
            freeQuota: "Access to free models (DeepSeek R1, Llama 3.3 70B free, Gemini Flash Exp)",
            getKeyUrl: "https://openrouter.ai/keys",
            envVariable: "OPENROUTER_API_KEY",
            tip: "One key for hundreds of models with automatic fallback.",
          },
          {
            name: "Mistral AI",
            freeQuota: "Free trial tier for Mistral Small and Codestral",
            getKeyUrl: "https://console.mistral.ai/",
            envVariable: "MISTRAL_API_KEY",
          },
        ],
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
