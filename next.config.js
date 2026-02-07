/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Output standalone for Docker deployments
  output: 'standalone',
  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://agents-ethos-backend-production.up.railway.app',
  },
}

module.exports = nextConfig

