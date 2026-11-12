import type { NextConfig } from "next";

import legacyRedirects from "./lib/legacy-redirects.json";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Explicit 301: permanent: true would produce a 308. Queries pass through.
      // Absolute destinations normalize host and legacy path in a single hop.
      ...Object.entries(legacyRedirects).map(([source, path]) => ({
        source,
        destination: "https://graphicwolves.com" + path,
        statusCode: 301 as const,
      })),
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.graphicwolves.com" }],
        destination: "https://graphicwolves.com/:path*",
        statusCode: 301,
      },
    ];
  },
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
