import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Railway uses classic `next start`. Opt into standalone with BUILD_STANDALONE=1.
  ...(process.env.BUILD_STANDALONE === "1" ? { output: "standalone" as const } : {}),
  async redirects() {
    return [
      { source: "/work", destination: "/portfolio", permanent: true },
      { source: "/work/:path*", destination: "/portfolio/:path*", permanent: true },
      { source: "/our-brands", destination: "/brands", permanent: true },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
