/** @type {import('next').NextConfig} */
const nextConfig = {
  // No experimental appDir needed - App Router is stable
  images: {
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig