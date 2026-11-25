import { NextResponse } from 'next/server'
import { blogPosts } from '@/lib/data/blog'
import { getViewCounts, isViewCountingEnabled } from '@/lib/blog/views'

export const dynamic = 'force-dynamic'

const noStore = { 'Cache-Control': 'no-store' }

/** Returns view totals for every blog post. Read-only: listing posts never counts a view. */
export async function GET() {
  if (!isViewCountingEnabled()) {
    return NextResponse.json({ views: null }, { status: 503, headers: noStore })
  }

  try {
    const views = await getViewCounts(blogPosts.map(post => post.slug))
    return NextResponse.json({ views }, { headers: noStore })
  } catch (error) {
    console.error('Blog view counts failed', error)
    return NextResponse.json({ views: null }, { status: 502, headers: noStore })
  }
}
