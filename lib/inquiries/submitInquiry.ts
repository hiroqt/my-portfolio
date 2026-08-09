import type { InquiryPayload } from '@/schemas/inquiry'

// How long to wait for the freelance API before giving up (milliseconds).
const FORWARD_TIMEOUT_MS = 10_000

export type SubmitInquiryResult =
  | { ok: true }
  | { ok: false; userMessage: string }

/**
 * Forwards a validated inquiry payload to the freelance application via HTTPS.
 * Authenticates with X-Inquiry-Secret so the receiving API can reject unauthenticated callers.
 *
 * The secret and URL are read exclusively from server-side environment variables —
 * they are never exposed to the browser.
 */
export async function submitInquiry(
  payload: InquiryPayload,
  clientIp?: string,
): Promise<SubmitInquiryResult> {
  const apiUrl = process.env.FREELANCE_INQUIRY_API_URL
  const apiSecret = process.env.FREELANCE_INQUIRY_API_SECRET

  if (!apiUrl || !apiSecret) {
    console.error('[submitInquiry] Missing FREELANCE_INQUIRY_API_URL or FREELANCE_INQUIRY_API_SECRET env vars.')
    return { ok: false, userMessage: "Sorry, we couldn't send your inquiry right now. Please try again in a moment." }
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), FORWARD_TIMEOUT_MS)

  console.log(`[submitInquiry] Forwarding to: ${apiUrl}`)

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Inquiry-Secret': apiSecret,
        // Forward the real client IP so the downstream rate-limiter keys on
        // the actual user, not on Vercel's shared serverless egress IPs.
        ...(clientIp && clientIp !== 'unknown' ? { 'X-Client-Ip': clientIp } : {}),
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    console.log(`[submitInquiry] Response status: ${response.status}`)

    // 201 Created — success
    if (response.status === 201) {
      return { ok: true }
    }

    // Also treat 200 as success in case the freelance API returns 200
    if (response.status === 200) {
      return { ok: true }
    }

    // Map known upstream status codes to safe user-facing messages.
    // Never leak internal details, secrets, or upstream URLs.
    if (response.status === 400) {
      const body = await response.text().catch(() => '(unreadable)')
      console.warn('[submitInquiry] Freelance API returned 400 (validation error). Body:', body)
      return { ok: false, userMessage: 'There was a problem with your submission. Please check your details and try again.' }
    }

    if (response.status === 401) {
      const body = await response.text().catch(() => '(unreadable)')
      console.error('[submitInquiry] Freelance API returned 401 — check FREELANCE_INQUIRY_API_SECRET. Body:', body)
      return { ok: false, userMessage: "Sorry, we couldn't send your inquiry right now. Please try again in a moment." }
    }

    if (response.status === 429) {
      console.warn('[submitInquiry] Freelance API returned 429 (rate limited).')
      return { ok: false, userMessage: 'Too many requests. Please try again later.' }
    }

    if (response.status >= 500) {
      const body = await response.text().catch(() => '(unreadable)')
      console.error(`[submitInquiry] Freelance API returned ${response.status}. Body:`, body)
      return { ok: false, userMessage: 'Something went wrong. Please try again later.' }
    }

    // Unexpected status
    const body = await response.text().catch(() => '(unreadable)')
    console.error(`[submitInquiry] Unexpected status ${response.status} from freelance API. Body:`, body)
    return { ok: false, userMessage: "Sorry, we couldn't send your inquiry right now. Please try again in a moment." }
  } catch (err) {
    clearTimeout(timeoutId)

    if (err instanceof Error && err.name === 'AbortError') {
      console.error(`[submitInquiry] Request timed out after ${FORWARD_TIMEOUT_MS}ms.`)
      return { ok: false, userMessage: "The request timed out. Please try again in a moment." }
    }

    // Log the real error server-side but never expose it to the browser.
    console.error('[submitInquiry] Network or unexpected error:', err)
    return { ok: false, userMessage: "Sorry, we couldn't send your inquiry right now. Please try again in a moment." }
  }
}
