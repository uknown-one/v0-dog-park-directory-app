/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export is incompatible with API routes and NextAuth
  //output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Uncomment and modify these lines if deploying to a repository subdirectory
  basePath: '/dog-park-directory',
  assetPrefix: '/dog-park-directory/',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
