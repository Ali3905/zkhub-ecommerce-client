import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['shorturl.at', 'images.unsplash.com', 'i.imgur.com', 'cdn.shopify.com', 'www.zarqash.com', 'zkhub.s3.ap-south-1.amazonaws.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
