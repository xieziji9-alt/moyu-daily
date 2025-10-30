/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/moyu-daily' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/moyu-daily/' : '',
}

module.exports = nextConfig

