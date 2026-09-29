/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'react-icons', 'react-icons/fa'],
  },
  serverExternalPackages: ['msedge-tts', 'ws'],

  async headers() {
    const scriptSources = ["'self'", "'unsafe-inline'", 'https://va.vercel-scripts.com'];
    if (process.env.NODE_ENV === 'development') scriptSources.push("'unsafe-eval'");

    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `script-src ${scriptSources.join(' ')}`,
              // Project data includes App Builders PH vote embeds.
              "frame-src 'self' https://appbuildersph.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "img-src 'self' data: blob:",
              // Spoken answers play same-origin audio and browser-created blobs.
              "media-src 'self' blob: data:",
              "connect-src 'self' https://vitals.vercel-insights.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
