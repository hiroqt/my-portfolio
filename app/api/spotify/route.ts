import { NextResponse } from 'next/server'
import { getNowPlaying } from '@/lib/spotify'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const track = await getNowPlaying()
    return NextResponse.json(track, {
      headers: {
        'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30',
      },
    })
  } catch (error) {
    console.error('API /api/spotify error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Spotify track' },
      { status: 500 }
    )
  }
}
