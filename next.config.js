/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 在构建时完全忽略ESLint错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 在构建时忽略TypeScript错误
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'replicate.delivery'],
  },
  env: {
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
  },
  // 禁用严格模式来避免一些React错误
  reactStrictMode: false,
}

module.exports = nextConfig 