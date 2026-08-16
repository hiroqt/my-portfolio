interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 30; // 30 requests per 10 min window

const ipRateLimits = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically
setInterval(() => {
  const now = Date.now();
  ipRateLimits.forEach((record, key) => {
    if (now > record.resetTime) {
      ipRateLimits.delete(key);
    }
  });
}, 5 * 60 * 1000);

export function checkRateLimit(ip: string): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = ipRateLimits.get(ip);

  if (!record || now > record.resetTime) {
    ipRateLimits.set(ip, {
      count: 1,
      resetTime: now + WINDOW_MS
    });
    return {
      success: true,
      remaining: MAX_REQUESTS - 1,
      resetTime: now + WINDOW_MS
    };
  }

  if (record.count >= MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
      resetTime: record.resetTime
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: MAX_REQUESTS - record.count,
    resetTime: record.resetTime
  };
}
