/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    localPatterns: [
      {
        pathname: '/api/projects/**',
      },
    ],
  },
};

export default nextConfig;
