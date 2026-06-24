import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        hostname: 'storage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: '*.maruplanner.my.id',
      },
      {
        protocol: 'https',
        hostname: 'cdn.maruplanner.my.id',
      },
      {
        protocol: 'https',
        hostname: 'dev-cdn.maruplanner.my.id',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '4000',
      },
    ],
  },
}

export default nextConfig
