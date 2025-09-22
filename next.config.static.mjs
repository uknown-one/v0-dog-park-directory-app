/** @type {import('next').NextConfig} */
// Alternative configuration for static export (GitHub Pages compatible)
// Use this config if you remove API routes and authentication
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Configure for GitHub Pages subdirectory deployment
  // Uncomment and modify if deploying to repository subdirectory
  // basePath: '/dog-park-directory',
  // assetPrefix: '/dog-park-directory/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
