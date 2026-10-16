/**
 * KANSOTEX AUTONOMOUS MULTI-AGENT SYSTEM (AI COMMUNICATION AGENCY)
 * Multi-Provider LLM Router with Waterfall Cascading & Quota Failover
 * 
 * Supports:
 * - Google Gemini (gemini-2.0-flash, gemini-1.5-flash, gemini-1.5-pro) [FREE / Pro]
 * - Groq (llama-3.3-70b-versatile, llama-3.1-8b-instant) [FREE high-speed]
 * - OpenRouter (Free models: DeepSeek, Llama 3.3, Gemini Flash Exp) [FREE / All-in-One]
 * - Mistral AI (mistral-small, codestral) [FREE / Paid]
 * - OpenAI (gpt-4o, gpt-4o-mini)
 * - Anthropic (claude-3-5-sonnet, claude-3-5-haiku)
 * - Offline Deterministic Simulation (Zero-failure safety net)
 */

export interface LLMRequestOptions {
  systemPrompt: string;
  userPrompt: string;
  maxTokens?: number;
  temperature?: number;
  jsonMode?: boolean;
}

export interface LLMResponse {
  content: string;
  providerUsed: string;
  modelUsed: string;
  tokensConsumed: number;
  latencyMs: number;
  failoverChain: string[];
  isFallbackSimulation: boolean;
}

interface ProviderConfig {
  id: string;
  name: string;
  isAvailable: () => boolean;
  execute: (options: LLMRequestOptions) => Promise<{ content: string; tokens: number; model: string }>;
}

export class LLMRouter {
  // Track provider cooldowns (e.g. when 429 Too Many Requests / Quota Exceeded is received)
  private static cooldowns: Map<string, number> = new Map();
  private static stats = {
    totalRequests: 0,
    failoversTriggered: 0,
    providerUsage: {} as Record<string, number>,
  };

  /**
   * Parse comma-separated keys to support multiple keys rotation per provider
   * e.g. GEMINI_API_KEY="keyA,keyB,keyC"
   */
  private static getRotatedKey(envVarName: string): string | null {
    const raw = process.env[envVarName]?.trim();
    if (!raw) return null;
    const keys = raw.split(",").map((k) => k.trim()).filter(Boolean);
    if (keys.length === 0) return null;
    // Pick based on random or round-robin
    const idx = Math.floor(Math.random() * keys.length);
    return keys[idx];
  }

  private static isCoolingDown(providerId: string): boolean {
    const until = this.cooldowns.get(providerId);
    if (!until) return false;
    if (Date.now() > until) {
      this.cooldowns.delete(providerId);
      return false;
    }
    return true;
  }

  private static setCooldown(providerId: string, durationSeconds = 60) {
    this.cooldowns.set(providerId, Date.now() + durationSeconds * 1000);
  }

  /**
   * Provider 1: Google Gemini (Direct Native REST API - Free Tier: 15 RPM / 1M TPM)
   */
  private static async callGemini(
    options: LLMRequestOptions,
    model = "gemini-2.0-flash"
  ): Promise<{ content: string; tokens: number; model: string }> {
    const key = this.getRotatedKey("GEMINI_API_KEY");
    if (!key) throw new Error("GEMINI_API_KEY is not configured");

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: options.systemPrompt }],
          },
          contents: [
            {
              role: "user",
              parts: [{ text: options.userPrompt }],
            },
          ],
          generationConfig: {
            temperature: options.temperature ?? 0.3,
            maxOutputTokens: options.maxTokens ?? 2500,
            responseMimeType: options.jsonMode ? "application/json" : "text/plain",
          },
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`Gemini API Error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const tokens = data?.usageMetadata?.totalTokenCount || 650;

      return { content, tokens, model };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Provider 2: Groq Cloud (Free Ultra-Fast Llama 3.3 70B & 3.1 8B)
   */
  private static async callGroq(
    options: LLMRequestOptions,
    model = "llama-3.3-70b-versatile"
  ): Promise<{ content: string; tokens: number; model: string }> {
    const key = this.getRotatedKey("GROQ_API_KEY");
    if (!key) throw new Error("GROQ_API_KEY is not configured");

    const endpoint = "https://api.groq.com/openai/v1/chat/completions";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: options.systemPrompt },
            { role: "user", content: options.userPrompt },
          ],
          temperature: options.temperature ?? 0.3,
          max_tokens: options.maxTokens ?? 2500,
          response_format: options.jsonMode ? { type: "json_object" } : undefined,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`Groq API Error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || "";
      const tokens = data?.usage?.total_tokens || 550;

      return { content, tokens, model };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Provider 3: OpenRouter (All Models + Free Tier: DeepSeek, Llama 3.3, Gemini)
   */
  private static async callOpenRouter(
    options: LLMRequestOptions,
    model = "meta-llama/llama-3.3-70b-instruct:free"
  ): Promise<{ content: string; tokens: number; model: string }> {
    const key = this.getRotatedKey("OPENROUTER_API_KEY");
    if (!key) throw new Error("OPENROUTER_API_KEY is not configured");

    const endpoint = "https://openrouter.ai/api/v1/chat/completions";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
          "HTTP-Referer": "https://kansotex.com",
          "X-Title": "Kansotex AI Agency",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: options.systemPrompt },
            { role: "user", content: options.userPrompt },
          ],
          temperature: options.temperature ?? 0.3,
          max_tokens: options.maxTokens ?? 2500,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`OpenRouter API Error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || "";
      const tokens = data?.usage?.total_tokens || 600;

      return { content, tokens, model };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Provider 4: Mistral AI (Mistral Small / Codestral)
   */
  private static async callMistral(
    options: LLMRequestOptions,
    model = "mistral-small-latest"
  ): Promise<{ content: string; tokens: number; model: string }> {
    const key = this.getRotatedKey("MISTRAL_API_KEY");
    if (!key) throw new Error("MISTRAL_API_KEY is not configured");

    const endpoint = "https://api.mistral.ai/v1/chat/completions";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 18000);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: options.systemPrompt },
            { role: "user", content: options.userPrompt },
          ],
          temperature: options.temperature ?? 0.3,
          max_tokens: options.maxTokens ?? 2500,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`Mistral API Error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || "";
      const tokens = data?.usage?.total_tokens || 580;

      return { content, tokens, model };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Provider 5: OpenAI (GPT-4o / GPT-4o-mini)
   */
  private static async callOpenAI(
    options: LLMRequestOptions,
    model = "gpt-4o-mini"
  ): Promise<{ content: string; tokens: number; model: string }> {
    const key = this.getRotatedKey("OPENAI_API_KEY");
    if (!key) throw new Error("OPENAI_API_KEY is not configured");

    const endpoint = "https://api.openai.com/v1/chat/completions";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: options.systemPrompt },
            { role: "user", content: options.userPrompt },
          ],
          temperature: options.temperature ?? 0.3,
          max_tokens: options.maxTokens ?? 2500,
          response_format: options.jsonMode ? { type: "json_object" } : undefined,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`OpenAI API Error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || "";
      const tokens = data?.usage?.total_tokens || 620;

      return { content, tokens, model };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Provider 6: Anthropic Claude (Claude 3.5 Sonnet / Haiku)
   */
  private static async callAnthropic(
    options: LLMRequestOptions,
    model = "claude-3-5-haiku-20241022"
  ): Promise<{ content: string; tokens: number; model: string }> {
    const key = this.getRotatedKey("ANTHROPIC_API_KEY");
    if (!key) throw new Error("ANTHROPIC_API_KEY is not configured");

    const endpoint = "https://api.anthropic.com/v1/messages";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model,
          system: options.systemPrompt,
          messages: [{ role: "user", content: options.userPrompt }],
          max_tokens: options.maxTokens ?? 2500,
          temperature: options.temperature ?? 0.3,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => "");
        throw new Error(`Anthropic API Error ${res.status}: ${errText}`);
      }

      const data = await res.json();
      const content = data?.content?.[0]?.text || "";
      const tokens = (data?.usage?.input_tokens || 300) + (data?.usage?.output_tokens || 300);

      return { content, tokens, model };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  /**
   * Waterfall Priority List
   * Orders execution from highest quality / free quota down to backup models
   */
  private static getWaterfallProviders(): ProviderConfig[] {
    return [
      // 1. Google Gemini (Free Tier / 15 RPM / 1M TPM)
      {
        id: "gemini",
        name: "Google Gemini (gemini-2.0-flash)",
        isAvailable: () => Boolean(process.env.GEMINI_API_KEY) && !this.isCoolingDown("gemini"),
        execute: (opt) => this.callGemini(opt, "gemini-2.0-flash"),
      },
      // 2. Groq (Free high-speed Llama 3.3 70B)
      {
        id: "groq",
        name: "Groq (llama-3.3-70b-versatile)",
        isAvailable: () => Boolean(process.env.GROQ_API_KEY) && !this.isCoolingDown("groq"),
        execute: (opt) => this.callGroq(opt, "llama-3.3-70b-versatile"),
      },
      // 3. OpenRouter Free Models
      {
        id: "openrouter",
        name: "OpenRouter (meta-llama/llama-3.3-70b-instruct:free)",
        isAvailable: () => Boolean(process.env.OPENROUTER_API_KEY) && !this.isCoolingDown("openrouter"),
        execute: (opt) => this.callOpenRouter(opt, "meta-llama/llama-3.3-70b-instruct:free"),
      },
      // 4. Mistral AI
      {
        id: "mistral",
        name: "Mistral AI (mistral-small-latest)",
        isAvailable: () => Boolean(process.env.MISTRAL_API_KEY) && !this.isCoolingDown("mistral"),
        execute: (opt) => this.callMistral(opt, "mistral-small-latest"),
      },
      // 5. OpenAI
      {
        id: "openai",
        name: "OpenAI (gpt-4o-mini)",
        isAvailable: () => Boolean(process.env.OPENAI_API_KEY) && !this.isCoolingDown("openai"),
        execute: (opt) => this.callOpenAI(opt, "gpt-4o-mini"),
      },
      // 6. Anthropic
      {
        id: "anthropic",
        name: "Anthropic Claude (claude-3-5-haiku)",
        isAvailable: () => Boolean(process.env.ANTHROPIC_API_KEY) && !this.isCoolingDown("anthropic"),
        execute: (opt) => this.callAnthropic(opt, "claude-3-5-haiku-20241022"),
      },
    ];
  }

  /**
   * Main Router Entry Point:
   * Cascades through available providers in order.
   * If a provider returns 429, timeout, or quota error, it automatically falls back
   * to the next active provider in the chain without failing.
   */
  public static async complete(options: LLMRequestOptions): Promise<LLMResponse> {
    const startTime = Date.now();
    this.stats.totalRequests += 1;
    const failoverChain: string[] = [];
    const providers = this.getWaterfallProviders();

    for (const provider of providers) {
      if (!provider.isAvailable()) continue;

      try {
        const result = await provider.execute(options);
        const latencyMs = Date.now() - startTime;

        // Record provider stats
        this.stats.providerUsage[provider.id] = (this.stats.providerUsage[provider.id] || 0) + 1;

        return {
          content: result.content,
          providerUsed: provider.name,
          modelUsed: result.model,
          tokensConsumed: result.tokens,
          latencyMs,
          failoverChain,
          isFallbackSimulation: false,
        };
      } catch (err: any) {
        console.warn(`[LLM Router Failover] ${provider.name} failed: ${err.message}. Cascading to next provider...`);
        failoverChain.push(`${provider.name} (Error: ${err.message.slice(0, 60)})`);
        this.stats.failoversTriggered += 1;

        // If rate limit / quota exceeded (429) or service unavailable (503), cool down for 90 seconds
        if (err.message.includes("429") || err.message.includes("quota") || err.message.includes("503")) {
          this.setCooldown(provider.id, 90);
        } else {
          // General error: brief cooldown
          this.setCooldown(provider.id, 30);
        }
      }
    }

    // =========================================================================
    // SAFETY NET: Deterministic Domain Fallback Engine
    // If no API keys are entered, or ALL external providers are quota-limited,
    // the system NEVER breaks or crashes!
    // =========================================================================
    const latencyMs = Date.now() - startTime;
    this.stats.providerUsage["offline_simulation"] = (this.stats.providerUsage["offline_simulation"] || 0) + 1;

    return {
      content: "",
      providerUsed: "Kansotex Offline Domain Engine",
      modelUsed: "deterministic-luxury-v1",
      tokensConsumed: 450,
      latencyMs,
      failoverChain,
      isFallbackSimulation: true,
    };
  }

  /**
   * Helper to parse JSON output cleanly from LLM response
   */
  public static parseJsonSafely<T = any>(rawText: string, fallback: T): T {
    try {
      // 1. Try direct parse
      return JSON.parse(rawText.trim());
    } catch {
      // 2. Try markdown extraction: ```json { ... } ```
      const match = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (match && match[1]) {
        try {
          return JSON.parse(match[1].trim());
        } catch {}
      }

      // 3. Try finding first { and last }
      const firstBrace = rawText.indexOf("{");
      const lastBrace = rawText.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        try {
          return JSON.parse(rawText.slice(firstBrace, lastBrace + 1));
        } catch {}
      }

      return fallback;
    }
  }

  public static getStats() {
    return {
      ...this.stats,
      activeCooldowns: Array.from(this.cooldowns.entries()).map(([k, v]) => ({
        provider: k,
        remainingSeconds: Math.max(0, Math.round((v - Date.now()) / 1000)),
      })),
      configuredProviders: [
        { name: "Google Gemini (Free 15 RPM / 1M TPM)", envVar: "GEMINI_API_KEY", configured: Boolean(process.env.GEMINI_API_KEY) },
        { name: "Groq Cloud (Free Llama 3.3 70B)", envVar: "GROQ_API_KEY", configured: Boolean(process.env.GROQ_API_KEY) },
        { name: "OpenRouter (Free Models)", envVar: "OPENROUTER_API_KEY", configured: Boolean(process.env.OPENROUTER_API_KEY) },
        { name: "Mistral AI", envVar: "MISTRAL_API_KEY", configured: Boolean(process.env.MISTRAL_API_KEY) },
        { name: "OpenAI", envVar: "OPENAI_API_KEY", configured: Boolean(process.env.OPENAI_API_KEY) },
        { name: "Anthropic Claude", envVar: "ANTHROPIC_API_KEY", configured: Boolean(process.env.ANTHROPIC_API_KEY) },
      ],
    };
  }
}
