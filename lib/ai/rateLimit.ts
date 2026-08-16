interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const MAX_REQUESTS_PER_USER = 15; // Strict 15 requests per user limit

const ipRateLimits = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    ipRateLimits.forEach((record, key) => {
      if (now > record.resetTime) {
        ipRateLimits.delete(key);
      }
    });
  }, 5 * 60 * 1000);
}

export function checkRateLimit(ip: string): { success: boolean; remaining: number; total: number; resetTime: number } {
  const now = Date.now();
  const record = ipRateLimits.get(ip);

  if (!record || now > record.resetTime) {
    ipRateLimits.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS
    });
    return {
      success: true,
      remaining: MAX_REQUESTS_PER_USER - 1,
      total: MAX_REQUESTS_PER_USER,
      resetTime: now + WINDOW_MS
    };
  }

  if (record.count >= MAX_REQUESTS_PER_USER) {
    return {
      success: false,
      remaining: 0,
      total: MAX_REQUESTS_PER_USER,
      resetTime: record.resetTime
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: MAX_REQUESTS_PER_USER - record.count,
    total: MAX_REQUESTS_PER_USER,
    resetTime: record.resetTime
  };
}

export function getRateLimitStatus(ip: string): { remaining: number; total: number; resetTime: number } {
  const now = Date.now();
  const record = ipRateLimits.get(ip);
  if (!record || now > record.resetTime) {
    return {
      remaining: MAX_REQUESTS_PER_USER,
      total: MAX_REQUESTS_PER_USER,
      resetTime: now + WINDOW_MS
    };
  }
  return {
    remaining: Math.max(0, MAX_REQUESTS_PER_USER - record.count),
    total: MAX_REQUESTS_PER_USER,
    resetTime: record.resetTime
  };
}
