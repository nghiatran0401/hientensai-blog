import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is used by default in Next.js 16
  turbopack: {
    // Empty config to use Turbopack without warnings
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
