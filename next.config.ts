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
        hostname: 'blogs.graphicwolves.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.blogs.graphicwolves.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
