import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['shorturl.at', 'images.unsplash.com', 'i.imgur.com', 'cdn.shopify.com', 'www.zarqash.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
