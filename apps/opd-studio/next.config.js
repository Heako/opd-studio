const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@opd/opd-pack', '@opd/opd-sign', '@opd/opd-semantic', '@opd/opd-bridge-docx'],
  experimental: {
    optimizePackageImports: ['@heroicons/react'],
  },
  webpack: (config, { isServer }) => {
    // Add alias for workspace packages
    config.resolve.alias = {
      ...config.resolve.alias,
      '@opd/opd-pack': path.resolve(__dirname, '../../packages/opd-pack/src'),
      '@opd/opd-sign': path.resolve(__dirname, '../../packages/opd-sign/src'),
      '@opd/opd-semantic': path.resolve(__dirname, '../../packages/opd-semantic/src'),
      '@opd/opd-bridge-docx': path.resolve(__dirname, '../../packages/opd-bridge-docx/src'),
    };

    // Allow .ts/.tsx files to be resolved when importing with .js extension
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
      '.cjs': ['.cts', '.cjs'],
    };

    return config;
  },
}

module.exports = nextConfig

