import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    inlineCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blue-zebra-943252.hostingersite.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.blue-zebra-943252.hostingersite.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
