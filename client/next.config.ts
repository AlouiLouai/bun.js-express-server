import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  webpack(config, { dev, isServer }) {
    if (dev && isServer) {
      // Debugging HMR and Webpack settings during development
      console.log('Webpack in development mode');

      config.devServer = {
        hot: true, // Enable hot reloading
        liveReload: true, // Ensure live reloading is enabled
        headers: { 'Access-Control-Allow-Origin': '*' }, // Avoid CORS issues
      };
    }

    return config;
  },
};

export default nextConfig;
