const client_id = process.env.SPOTIFY_CLIENT_ID
const client_secret = process.env.SPOTIFY_CLIENT_SECRET
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN

const basic = client_id && client_secret 
  ? Buffer.from(`${client_id}:${client_secret}`).toString('base64')
  : null

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing'
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1'

export interface SpotifyTrackData {
  isPlaying: boolean
  title: string
  artist: string
  album: string
  albumImageUrl: string
  songUrl: string
  previewUrl: string | null
  durationMs: number
  progressMs: number
  isLive?: boolean
}

// Fallback track when not playing or credentials not yet configured
export const DEFAULT_TRACK: SpotifyTrackData = {
  isPlaying: false,
  title: "B's on the Table",
  artist: "Drake, 21 Savage",
  album: "ICEMAN",
  albumImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  songUrl: "https://open.spotify.com/search/Drake%20B's%20on%20the%20table",
  previewUrl: null,
  durationMs: 198000,
  progressMs: 0,
  isLive: false,
}

const getAccessToken = async () => {
  if (!basic || !refresh_token) return null

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
      cache: 'no-store',
    })

    if (!response.ok) return null
    return response.json()
  } catch (error) {
    console.error('Spotify token fetch error:', error)
    return null
  }
}

export async function getNowPlaying(): Promise<SpotifyTrackData> {
  const tokenData = await getAccessToken()

  if (!tokenData || !tokenData.access_token) {
    return DEFAULT_TRACK
  }

  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
      cache: 'no-store',
    })

    if (response.status === 204 || response.status > 400) {
      // Not actively playing, try recently played
      return getRecentlyPlayed(tokenData.access_token)
    }

    const song = await response.json()
    if (!song.item) {
      return getRecentlyPlayed(tokenData.access_token)
    }

    const isPlaying = song.is_playing
    const title = song.item.name
    const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(', ')
    const album = song.item.album.name
    const albumImageUrl = song.item.album.images[0]?.url || DEFAULT_TRACK.albumImageUrl
    const songUrl = song.item.external_urls.spotify
    const previewUrl = song.item.preview_url
    const durationMs = song.item.duration_ms
    const progressMs = song.progress_ms

    return {
      isPlaying,
      title,
      artist,
      album,
      albumImageUrl,
      songUrl,
      previewUrl,
      durationMs,
      progressMs,
      isLive: true,
    }
  } catch (error) {
    console.error('Spotify currently playing fetch error:', error)
    return DEFAULT_TRACK
  }
}

async function getRecentlyPlayed(accessToken: string): Promise<SpotifyTrackData> {
  try {
    const response = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    })

    if (!response.ok) return DEFAULT_TRACK

    const data = await response.json()
    const item = data.items?.[0]?.track

    if (!item) return DEFAULT_TRACK

    return {
      isPlaying: false,
      title: item.name,
      artist: item.artists.map((_artist: { name: string }) => _artist.name).join(', '),
      album: item.album.name,
      albumImageUrl: item.album.images[0]?.url || DEFAULT_TRACK.albumImageUrl,
      songUrl: item.external_urls.spotify,
      previewUrl: item.preview_url,
      durationMs: item.duration_ms,
      progressMs: 0,
      isLive: true,
    }
  } catch {
    return DEFAULT_TRACK
  }
}
