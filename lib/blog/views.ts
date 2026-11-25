import { createHmac } from 'node:crypto'
import { Redis } from '@upstash/redis'

/**
 * Blog view counts in Upstash Redis (connected through the Vercel Marketplace).
 * Server-only: imported by the view count API route.
 *
 * A visitor counts once per post every 24 hours, so refreshes do not add views.
 * Visitors are identified by a keyed hash of IP + user agent; raw IPs are never stored.
 */

const SEEN_TTL_SECONDS = 60 * 60 * 24
const BOT_PATTERN = /bot|crawl|spider|slurp|preview|fetch|monitor|headless|lighthouse|facebookexternalhit|embedly|curl|wget|python|axios/i

// Production counts are kept apart from local development and preview deployments.
const namespace = process.env.VERCEL_ENV === 'production' ? 'blog' : `blog-${process.env.VERCEL_ENV ?? 'local'}`

let client: Redis | null | undefined

function getRedis() {
  if (client !== undefined) return client
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
  client = url && token ? new Redis({ url, token }) : null
  return client
}

export function isViewCountingEnabled() {
  return getRedis() !== null
}

export function isLikelyBot(userAgent: string | null) {
  return !userAgent || BOT_PATTERN.test(userAgent)
}

function visitorHash(ip: string, userAgent: string) {
  const secret = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || ''
  return createHmac('sha256', secret).update(`${ip}|${userAgent}`).digest('base64url').slice(0, 22)
}

/** Reads view totals for several posts in one command, without counting a view. */
export async function getViewCounts(slugs: string[]) {
  const redis = getRedis()
  if (!redis || slugs.length === 0) return null

  const counts = await redis.mget<(number | null)[]>(...slugs.map(slug => `${namespace}:views:${slug}`))
  return Object.fromEntries(slugs.map((slug, index) => [slug, Number(counts[index] ?? 0)]))
}

/** Records a view (at most once per visitor per day) and returns the post's total. */
export async function recordView(slug: string, visitor: { ip: string; userAgent: string } | null) {
  const redis = getRedis()
  if (!redis) return null

  const countKey = `${namespace}:views:${slug}`
  if (!visitor) return (await redis.get<number>(countKey)) ?? 0

  const seenKey = `${namespace}:seen:${slug}:${visitorHash(visitor.ip, visitor.userAgent)}`
  const firstVisitToday = await redis.set(seenKey, 1, { nx: true, ex: SEEN_TTL_SECONDS })
  if (firstVisitToday) return redis.incr(countKey)
  return (await redis.get<number>(countKey)) ?? 0
}
