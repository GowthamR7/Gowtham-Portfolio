import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle GLSL files for shaders
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    });
    
    return config;
  },
  transpilePackages: ['three'],
  experimental: {
    optimizePackageImports: ['three'],
  },
};

export default nextConfig;
