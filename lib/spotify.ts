export interface SpotifyTrackData {
  isPlaying: boolean
  title: string
  artist: string
  album: string
  albumImageUrl: string
  songUrl: string
  embedUrl: string
  previewUrl: string | null
  durationMs: number
  progressMs: number
  isLive?: boolean
}

// Locked exclusively to "B's on the Table" by Drake ft. 21 Savage
export const DEFAULT_TRACK: SpotifyTrackData = {
  isPlaying: false,
  title: "B's on the Table",
  artist: "Drake, 21 Savage",
  album: "ICEMAN",
  albumImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
  songUrl: "https://open.spotify.com/search/Drake%20B's%20on%20the%20table",
  embedUrl: "https://open.spotify.com/embed/track/1bDbXMyxUEoNEfeT7n31w6?utm_source=generator&theme=0",
  previewUrl: null,
  durationMs: 198000,
  progressMs: 0,
  isLive: true,
}

export async function getNowPlaying(): Promise<SpotifyTrackData> {
  // Exclusively return "B's on the Table" by Drake as requested
  return DEFAULT_TRACK
}
