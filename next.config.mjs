/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },

  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            // Allow Cloudflare Turnstile's iframe to communicate with this origin.
            // The widget renders inside challenges.cloudflare.com and uses postMessage
            // back to the parent — without this, some browsers block that channel and
            // log cross-origin frame errors in the console.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // Scripts: self + Cloudflare Turnstile + Credly badges
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com https://cdn.credly.com",
              // Frames: allow Turnstile + Credly + AppBuildersPH embeds
              "frame-src 'self' https://challenges.cloudflare.com https://www.credly.com https://appbuildersph.com",
              // Styles: self + inline (needed by Framer Motion / Tailwind)
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Fonts
              "font-src 'self' https://fonts.gstatic.com",
              // Images: self + data URIs + Credly badge images
              "img-src 'self' data: blob: https://images.credly.com https://cdn.credly.com",
              // Connections: self + Cloudflare Turnstile verify endpoint + Vercel
              "connect-src 'self' https://challenges.cloudflare.com https://api.turnstile.cloudflare.com",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
