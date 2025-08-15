import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // No image optimization in static export - use regular <img> tags
};

export default nextConfig;
