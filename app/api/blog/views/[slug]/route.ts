import { NextResponse } from 'next/server'
import { getBlogPost } from '@/lib/data/blog'
import { isLikelyBot, isViewCountingEnabled, recordView } from '@/lib/blog/views'

export const dynamic = 'force-dynamic'

const noStore = { 'Cache-Control': 'no-store' }

/** Counts a view of a blog post and returns its total views. */
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!getBlogPost(slug)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404, headers: noStore })
  }
  if (!isViewCountingEnabled()) {
    return NextResponse.json({ views: null }, { status: 503, headers: noStore })
  }

  const userAgent = request.headers.get('user-agent')
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'

  try {
    const views = await recordView(slug, isLikelyBot(userAgent) ? null : { ip, userAgent: userAgent ?? '' })
    return NextResponse.json({ views }, { headers: noStore })
  } catch (error) {
    console.error('Blog view count failed', error)
    return NextResponse.json({ views: null }, { status: 502, headers: noStore })
  }
}
