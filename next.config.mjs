/** @type {import('next').NextConfig} */
const nextConfig = {
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
              // Frames: Turnstile widget + Credly badge iframes + AppBuildersPH vote embeds
              "frame-src 'self' https://challenges.cloudflare.com https://www.credly.com https://appbuildersph.com",
              // Styles: inline (Tailwind/Framer) + self-hosted next/font
              "style-src 'self' 'unsafe-inline'",
              // Fonts: self-hosted next/font woff2 + data URIs
              "font-src 'self' data:",
              // Images: self + data URIs + Credly badge images + avatar images from GitHub
              "img-src 'self' data: blob: https://images.credly.com https://cdn.credly.com https://avatars.githubusercontent.com",
              // Media: self + audio blob playback for TTS
              "media-src 'self' blob: data:",
              // Connections: same-origin API routes only + Vercel Insights
              "connect-src 'self' https://vitals.vercel-insights.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
