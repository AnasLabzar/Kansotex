import crypto from "crypto";

const CAPTCHA_SECRET = process.env.CAPTCHA_SECRET || "kansotex_shield_secure_key_2026_marrakech";
const MAX_TOKEN_AGE_MS = 15 * 60 * 1000; // 15 minutes
const MIN_SUBMISSION_TIME_MS = 1200; // 1.2 seconds (humans need at least this)

// In-memory IP rate limiter to block bot floods
const ipRateLimits = new Map<string, { count: number; firstSeen: number }>();

function checkRateLimit(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = ipRateLimits.get(ip);
  if (!entry) {
    ipRateLimits.set(ip, { count: 1, firstSeen: now });
    return true;
  }
  if (now - entry.firstSeen > windowMs) {
    ipRateLimits.set(ip, { count: 1, firstSeen: now });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}

/**
 * Creates a signed token that the frontend can obtain upon passing the "I'm not a robot" check.
 */
export function generateShieldToken(): string {
  const timestamp = Date.now();
  const nonce = crypto.randomBytes(8).toString("hex");
  const payload = `${timestamp}:${nonce}`;
  const hmac = crypto.createHmac("sha256", CAPTCHA_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${hmac}`).toString("base64");
}

/**
 * Verifies the submission against 4 distinct anti-bot vectors:
 * 1. Honeypot traps: Automated bots always fill hidden fields.
 * 2. Submission speed: Automated bots submit instantly (< 1.2s).
 * 3. Captcha Shield token: Signed cryptographic challenge.
 * 4. IP rate limiter: Prevents brute force / DDoS floods.
 */
export async function verifyAntiBotProtection(
  body: {
    captchaToken?: string;
    _hp_website?: string;
    _hp_confirm?: string;
    _hp_timestamp?: number | string;
  },
  req?: Request
): Promise<{ success: boolean; error?: string }> {
  // 1. Honeypot check - if a bot filled the invisible trap input
  if (body._hp_website || body._hp_confirm) {
    console.warn("[AntiBot Shield] Blocked bot via honeypot trap field.");
    return {
      success: false,
      error: "Validation anti-robot échouée. Veuillez réessayer.",
    };
  }

  // 2. Submission time check
  if (body._hp_timestamp) {
    const start = typeof body._hp_timestamp === "number" ? body._hp_timestamp : parseInt(body._hp_timestamp, 10);
    const elapsed = Date.now() - start;
    if (!isNaN(start) && elapsed < MIN_SUBMISSION_TIME_MS) {
      console.warn(`[AntiBot Shield] Blocked ultra-fast automated submission (${elapsed}ms).`);
      return {
        success: false,
        error: "Soumission trop rapide. Veuillez patienter un instant avant d'envoyer.",
      };
    }
  }

  // 3. Captcha token validation
  const token = body.captchaToken;
  if (!token) {
    return {
      success: false,
      error: "Veuillez cocher la case 'Je ne suis pas un robot' pour sécuriser votre envoi.",
    };
  }

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    if (parts.length !== 3) {
      return { success: false, error: "Jeton de sécurité invalide." };
    }

    const [timestampStr, nonce, hmac] = parts;
    const timestamp = parseInt(timestampStr, 10);
    const now = Date.now();

    // Check expiration (max 15 mins)
    if (isNaN(timestamp) || now - timestamp > MAX_TOKEN_AGE_MS || timestamp > now + 60000) {
      return { success: false, error: "La vérification anti-robot a expiré. Veuillez recocher la case." };
    }

    // Verify HMAC
    const expectedHmac = crypto.createHmac("sha256", CAPTCHA_SECRET).update(`${timestamp}:${nonce}`).digest("hex");
    if (hmac !== expectedHmac) {
      return { success: false, error: "Jeton de sécurité corrompu ou falsifié." };
    }
  } catch (err) {
    return { success: false, error: "Échec de vérification du jeton de sécurité." };
  }

  // 4. Rate limiting per IP
  if (req) {
    const forwarded = req.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";
    if (!checkRateLimit(clientIp, 12, 60000)) {
      console.warn(`[AntiBot Shield] Rate limit exceeded for IP: ${clientIp}`);
      return {
        success: false,
        error: "Trop de requêtes détectées. Veuillez patienter une minute avant de réessayer.",
      };
    }
  }

  return { success: true };
}
