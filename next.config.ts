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
        hostname: 'pub-3334be0afedb48ae85de0e143ffa2130.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'cdn.maruplanner.my.id',
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
