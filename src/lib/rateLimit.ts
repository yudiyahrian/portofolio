/**
 * Simple in-memory rate limiter.
 * Tracks requests per IP using a sliding window.
 * Resets automatically after the window expires.
 * NOTE: This is per-instance. For multi-instance deployments,
 * swap the Map for Redis (e.g. Upstash) using the same interface.
 */

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 10 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  store.forEach((entry, key) => {
    if (now - entry.windowStart > 60 * 60 * 1000) {
      store.delete(key);
    }
  });
}, 10 * 60 * 1000);

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAfterMs: number;
}

/**
 * @param identifier  - Usually the client IP address
 * @param limit       - Max requests allowed in the window
 * @param windowMs    - Window size in milliseconds
 */
export function rateLimit(
  identifier: string,
  limit: number = 3,
  windowMs: number = 60 * 60 * 1000 // 1 hour default
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now - entry.windowStart > windowMs) {
    // Fresh window
    store.set(identifier, { count: 1, windowStart: now });
    return { allowed: true, remaining: limit - 1, resetAfterMs: windowMs };
  }

  if (entry.count >= limit) {
    const resetAfterMs = windowMs - (now - entry.windowStart);
    return { allowed: false, remaining: 0, resetAfterMs };
  }

  entry.count += 1;
  store.set(identifier, entry);

  return {
    allowed: true,
    remaining: limit - entry.count,
    resetAfterMs: windowMs - (now - entry.windowStart),
  };
}
