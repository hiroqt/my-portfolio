import { NextRequest, NextResponse } from 'next/server'
import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

// Rate limiting storage (in production, use Redis or a database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

// Security: Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 10, // Maximum requests per window
  windowMs: 60000, // 1 minute window
  maxMessageLength: 500, // Maximum message length
  blockedPatterns: [
    /(?:https?:\/\/|www\.)/gi, // Block URLs
    /<script|javascript:/gi, // Block script injections
  ]
}

function getRateLimitKey(req: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('x-real-ip') || 'unknown'
  return ip
}

function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record || now > record.resetTime) {
    // Create new record or reset expired one
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + RATE_LIMIT.windowMs
    })
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1 }
  }

  if (record.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: RATE_LIMIT.maxRequests - record.count }
}

function sanitizeMessage(message: string): { valid: boolean; error?: string } {
  // Check message length
  if (message.length > RATE_LIMIT.maxMessageLength) {
    return { valid: false, error: 'Message too long. Please keep it under 500 characters.' }
  }

  // Check for blocked patterns
  for (const pattern of RATE_LIMIT.blockedPatterns) {
    if (pattern.test(message)) {
      return { valid: false, error: 'Message contains blocked content.' }
    }
  }

  return { valid: true }
}

export async function POST(req: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Chat service is not configured. Please contact the administrator.' },
        { status: 503 }
      )
    }

    // Rate limiting check
    const clientKey = getRateLimitKey(req)
    const rateLimit = checkRateLimit(clientKey)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a minute.' },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
            'X-RateLimit-Remaining': '0',
            'Retry-After': '60'
          }
        }
      )
    }

    const { message } = await req.json()

    // Validate message
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message format.' },
        { status: 400 }
      )
    }

    // Sanitize message
    const sanitization = sanitizeMessage(message.trim())
    if (!sanitization.valid) {
      return NextResponse.json(
        { error: sanitization.error },
        { status: 400 }
      )
    }

    // Call Groq API
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are Nel, a professional AI assistant for Arnel Baylon's portfolio. You help visitors learn about Arnel's:
- Full-stack development experience (Laravel, Vue.js, React, Next.js)
- Projects: 
  * HRIS System (Victorious Christian Montessori) - HR platform with QR attendance, payroll, role-based access - https://vcm-cavite.online
  * Queuing System (GEAMH) - Patient flow management for hospital
  * Clearance System (GEAMH) - Digital clearance workflow with approval routing
  * EMR System (GEAMH) - Electronic medical records platform
  * TMRC Running Club Website - Community platform with event management and member tracking - https://tmrc.vercel.app
  * HiveSyncVA Website - Virtual assistant service showcase with client onboarding - https://hivesync.vercel.app
- Technical skills: PHP, Laravel, MySQL, Vue.js, Next.js, React, JavaScript, TypeScript, Tailwind CSS, Alpine.js, Vite
- Education: Bachelor of Science in Information Technology (Current Student), Senior Highschool - ICT (2021-2022)
- Training: Cisco Ethical Hacker Certification, Digital Literacy (AI Tools), Blockchain Campus Conference, 486hrs OJT
- Contact: arnelbaylon15@gmail.com, GitHub: hiroqt, Location: Cavite, Philippines

Keep responses concise, professional, and informative. When mentioning projects with live URLs, include the links. Do not use emojis. If asked about topics outside Arnel's portfolio, politely redirect to relevant information. Do not provide personal opinions on sensitive topics.`
        },
        {
          role: 'user',
          content: message.trim()
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 300,
      top_p: 1,
      stream: false
    })

    const responseMessage = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    return NextResponse.json(
      { 
        message: responseMessage,
        remaining: rateLimit.remaining
      },
      {
        headers: {
          'X-RateLimit-Limit': RATE_LIMIT.maxRequests.toString(),
          'X-RateLimit-Remaining': rateLimit.remaining.toString()
        }
      }
    )

  } catch (error: any) {
    console.error('Chat API Error:', error)
    
    // Handle specific Groq API errors
    if (error?.status === 429) {
      return NextResponse.json(
        { error: 'Service temporarily busy. Please try again in a moment.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
