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
              // Frames: Turnstile widget + Credly badge iframes + AppBuildersPH vote embeds
              "frame-src 'self' https://challenges.cloudflare.com https://www.credly.com https://appbuildersph.com",
              // Styles: inline (Tailwind/Framer) + Google Fonts CSS + Fontshare CSS
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://api.fontshare.com",
              // Fonts: Google Fonts files + Fontshare (CSS from api, files from cdn)
              "font-src 'self' https://fonts.gstatic.com https://api.fontshare.com https://cdn.fontshare.com",
              // Images: self + data URIs + Credly badge images + avatar images from GitHub
              "img-src 'self' data: blob: https://images.credly.com https://cdn.credly.com https://avatars.githubusercontent.com",
              // Connections: same-origin API routes only (GitHub/Turnstile called server-side)
              "connect-src 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
