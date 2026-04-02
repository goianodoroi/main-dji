import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "se-cdn.djiits.com" },
      { protocol: "https", hostname: "www-cdn.djiits.com" },
      { protocol: "https", hostname: "customer-siyy2ilzb5oakkgv.cloudflarestream.com" },
    ],
  },
};

export default nextConfig;
