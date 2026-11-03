export const newsletterRateLimitDefaults = {
  emailLimit: 5,
  ipLimit: 20,
  windowMs: 10 * 60 * 1000,
} as const;

interface RateLimitRule {
  limit: number;
  windowMs: number;
}

const buckets = new Map<string, number[]>();

export function resetNewsletterRateLimit(): void {
  buckets.clear();
}

function pruneExpired(now: number, windowMs: number): void {
  if (buckets.size < 5000) return;

  for (const [key, timestamps] of buckets) {
    const recent = timestamps.filter((timestamp) => now - timestamp < windowMs);
    if (recent.length === 0) {
      buckets.delete(key);
      continue;
    }
    buckets.set(key, recent);
  }

  if (buckets.size > 5000) buckets.clear();
}

/** Retourne true quand la clé a dépassé le quota. */
export function isNewsletterRateLimited(
  key: string,
  now: number,
  rule: RateLimitRule,
): boolean {
  pruneExpired(now, rule.windowMs);
  const recent = (buckets.get(key) ?? []).filter(
    (timestamp) => now - timestamp < rule.windowMs,
  );

  if (recent.length >= rule.limit) {
    buckets.set(key, recent);
    return true;
  }

  recent.push(now);
  buckets.set(key, recent);
  return false;
}

export function readClientIp(
  forwardedFor: string | null,
  realIp: string | null,
): string {
  const forwarded = forwardedFor?.split(",")[0]?.trim();
  if (forwarded) return forwarded;
  const real = realIp?.trim();
  if (real) return real;
  return "unknown";
}
