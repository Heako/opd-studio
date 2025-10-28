/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@opd/opd-pack', '@opd/opd-sign', '@opd/opd-semantic', '@opd/opd-bridge-docx'],
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
}

module.exports = nextConfig

