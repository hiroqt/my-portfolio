import { NextResponse } from 'next/server'
import { inquiryFormSchema, inquiryPayloadSchema } from '@/schemas/inquiry'
import { submitInquiry } from '@/lib/inquiries/submitInquiry'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Verify a Cloudflare Turnstile token server-side.
async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY

  if (!secret) {
    // If Turnstile is not configured (e.g. local dev without a key),
    // allow the request through but log a warning.
    console.warn('[inquiries/route] TURNSTILE_SECRET_KEY is not set — skipping Turnstile verification.')
    return true
  }

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })
    const data = await res.json()
    return data.success === true
  } catch (err) {
    console.error('[inquiries/route] Turnstile verification request failed:', err)
    return false
  }
}

export async function POST(request: Request) {
  // 1 — Parse body
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400 },
    )
  }

  // 2 — Server-side schema validation (authoritative)
  const parsed = inquiryFormSchema.safeParse(body)
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors
    return NextResponse.json(
      { success: false, message: 'Validation failed.', errors: fieldErrors },
      { status: 400 },
    )
  }

  const { turnstileToken, ...inquiryData } = parsed.data

  // 3 — Verify Turnstile token
  const turnstileOk = await verifyTurnstileToken(turnstileToken)
  if (!turnstileOk) {
    return NextResponse.json(
      { success: false, message: 'Captcha verification failed. Please refresh and try again.' },
      { status: 400 },
    )
  }

  // 4 — Strip optional empty strings so the freelance API receives clean data
  const payload = inquiryPayloadSchema.parse({
    name: inquiryData.name,
    email: inquiryData.email,
    phone: inquiryData.phone || undefined,
    company: inquiryData.company || undefined,
    projectType: inquiryData.projectType || undefined,
    budget: inquiryData.budget || undefined,
    message: inquiryData.message,
  })

  // 5 — Forward to the freelance application
  const result = await submitInquiry(payload)

  if (result.ok) {
    return NextResponse.json({ success: true }, { status: 200 })
  }

  // Sanitised error — never expose internal details to the browser.
  return NextResponse.json(
    { success: false, message: result.userMessage },
    { status: 503 },
  )
}
