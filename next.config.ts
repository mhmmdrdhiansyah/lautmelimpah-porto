import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "standalone",
  eslint: { ignoreDuringBuilds: true },
} satisfies NextConfig;
export default nextConfig;
