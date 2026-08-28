import crypto from "crypto";

export interface OtpChallenge {
  email: string;
  hashedOtp: string;
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
}

const OTP_SECRET = process.env.OTP_SECRET || "conversion-house-secret-key-32-chars-minimum";
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

// In-memory fallback map for local dev instances
const localMemoryStore = new Map<string, OtpChallenge>();

// Format Indian currency cleanly (e.g. 125 -> ₹1.25L, 35 -> ₹35K)
export function formatIndianPrice(thousandsInr: number): string {
  if (thousandsInr >= 100) {
    const lakhs = thousandsInr / 100;
    const formatted = Number(lakhs.toFixed(2));
    return `₹${formatted}L`;
  }
  return `₹${thousandsInr}K`;
}

// Hash OTP value for secure storage
export function hashOtp(email: string, otp: string): string {
  return crypto
    .createHmac("sha256", OTP_SECRET)
    .update(`${email.toLowerCase()}:${otp}`)
    .digest("hex");
}

// Generate secure 6-digit OTP
export function generateSecureOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

// Key helper
function getStoreKey(email: string): string {
  return `otp:${email.toLowerCase().trim()}`;
}

// Save OTP Challenge to KV or Memory/Encrypted Token
export async function saveOtpChallenge(email: string, hashedOtp: string): Promise<{ success: boolean; cooldownSeconds: number }> {
  const normalizedEmail = email.toLowerCase().trim();
  const now = Date.now();
  const key = getStoreKey(normalizedEmail);

  // Check existing cooldown (60 seconds)
  const existing = await getOtpChallenge(normalizedEmail);
  if (existing && now - existing.lastSentAt < 60000) {
    const remainingCooldown = Math.ceil((60000 - (now - existing.lastSentAt)) / 1000);
    return { success: false, cooldownSeconds: remainingCooldown };
  }

  const challenge: OtpChallenge = {
    email: normalizedEmail,
    hashedOtp,
    expiresAt: now + 10 * 60 * 1000, // 10 minutes TTL
    attempts: 0,
    lastSentAt: now,
  };

  if (KV_URL && KV_TOKEN) {
    try {
      await fetch(`${KV_URL}/set/${encodeURIComponent(key)}?EX=600`, {
        method: "POST",
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        body: JSON.stringify(challenge),
      });
    } catch (err) {
      console.error("[OTP Store KV Error]:", err);
      localMemoryStore.set(key, challenge);
    }
  } else {
    localMemoryStore.set(key, challenge);
  }

  return { success: true, cooldownSeconds: 60 };
}

// Get active OTP Challenge
export async function getOtpChallenge(email: string): Promise<OtpChallenge | null> {
  const normalizedEmail = email.toLowerCase().trim();
  const key = getStoreKey(normalizedEmail);

  if (KV_URL && KV_TOKEN) {
    try {
      const res = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });
      const data = await res.json();
      if (data && data.result) {
        const parsed = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
        return parsed as OtpChallenge;
      }
    } catch (err) {
      console.error("[OTP Store KV Fetch Error]:", err);
    }
  }

  const local = localMemoryStore.get(key);
  if (!local) return null;
  if (Date.now() > local.expiresAt) {
    localMemoryStore.delete(key);
    return null;
  }
  return local;
}

// Increment attempts counter
export async function incrementOtpAttempts(email: string): Promise<number> {
  const challenge = await getOtpChallenge(email);
  if (!challenge) return 0;

  challenge.attempts += 1;
  const normalizedEmail = email.toLowerCase().trim();
  const key = getStoreKey(normalizedEmail);

  if (KV_URL && KV_TOKEN) {
    try {
      await fetch(`${KV_URL}/set/${encodeURIComponent(key)}?EX=600`, {
        method: "POST",
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
        body: JSON.stringify(challenge),
      });
    } catch (err) {
      console.error("[OTP Store KV Update Error]:", err);
    }
  } else {
    localMemoryStore.set(key, challenge);
  }

  return challenge.attempts;
}

// Invalidate OTP Challenge upon successful verification
export async function deleteOtpChallenge(email: string): Promise<void> {
  const normalizedEmail = email.toLowerCase().trim();
  const key = getStoreKey(normalizedEmail);

  if (KV_URL && KV_TOKEN) {
    try {
      await fetch(`${KV_URL}/del/${encodeURIComponent(key)}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${KV_TOKEN}` },
      });
    } catch (err) {
      console.error("[OTP Store KV Delete Error]:", err);
    }
  }
  localMemoryStore.delete(key);
}

// Generate signed verification token for quote submission
export function createVerificationToken(email: string): string {
  const payload = `${email.toLowerCase().trim()}:${Date.now() + 15 * 60 * 1000}`;
  const sig = crypto.createHmac("sha256", OTP_SECRET).update(payload).digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64");
}

export function verifyToken(token: string, email: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [tokenEmail, expiresStr, sig] = decoded.split(":");
    if (tokenEmail !== email.toLowerCase().trim()) return false;
    if (Date.now() > parseInt(expiresStr, 10)) return false;

    const expectedSig = crypto
      .createHmac("sha256", OTP_SECRET)
      .update(`${tokenEmail}:${expiresStr}`)
      .digest("hex");
    return sig === expectedSig;
  } catch {
    return false;
  }
}
