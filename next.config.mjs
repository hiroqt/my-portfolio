/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: '**.spotifycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons', 'react-icons/fa', 'react-icons/fa6'],
    serverComponentsExternalPackages: ['msedge-tts', 'ws'],
  },

  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          {
            // Allow Cloudflare Turnstile's iframe to communicate with this origin.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Scripts: self + Cloudflare Turnstile + Credly badges + Vercel Analytics
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://cdn.credly.com https://va.vercel-scripts.com",
              // Frames: Turnstile widget + Credly badge iframes + AppBuildersPH vote embeds + Spotify embeds
              "frame-src 'self' https://challenges.cloudflare.com https://www.credly.com https://appbuildersph.com https://open.spotify.com",
              // Styles: inline (Tailwind/Framer) + self-hosted next/font + fontshare
              "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
              // Fonts: self-hosted next/font woff2 + data URIs + Google Fonts gstatic + Fontshare
              "font-src 'self' data: https://fonts.gstatic.com https://cdn.fontshare.com",
              // Images: self + data URIs + Credly + GitHub + Spotify CDN + Unsplash
              "img-src 'self' data: blob: https://images.credly.com https://cdn.credly.com https://avatars.githubusercontent.com https://i.scdn.co https://*.spotifycdn.com https://images.unsplash.com",
              // Media: self + audio blob playback for TTS + Spotify previews
              "media-src 'self' blob: data: https://p.scdn.co https://*.spotifycdn.com",
              // Connections: same-origin API routes only + Vercel Insights + Spotify API
              "connect-src 'self' https://vitals.vercel-insights.com https://api.spotify.com https://open.spotify.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
