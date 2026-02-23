import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.bfldr.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
