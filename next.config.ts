/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' for Vercel
  experimental: {
    appDir: true,
  }
}

module.exports = nextConfig