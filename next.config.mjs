/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // No image optimization in static export - use regular <img> tags
  
  // Bundle optimization for performance
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features for better performance
  experimental: {
    // Note: optimizeCss requires additional dependencies, disabled for now
    // optimizeCss: true,
  },
  
  // Turbopack configuration (for development)
  // Note: Webpack-style `rules` are not supported in Next.js turbopack config.
  // If you need SVG -> React component support, add an svgr loader in the
  // `webpack` configuration below or use a dedicated plugin instead.
  
  // Webpack optimizations (for production builds)
  webpack: (config, { dev, isServer }) => {
    // Handle importing SVGs as React components when needed
    // Note: prefer <img> for static export, but this keeps support if you import SVGs.
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // Only apply webpack optimizations when not using Turbopack (production builds)
    if (!dev && !isServer) {
      // Tree shaking optimization
      config.optimization.usedExports = true;
      // Keep default sideEffects behavior to avoid breaking packages with side-effectful imports
      // (Do not force sideEffects=false globally)
      
      // Bundle splitting for better caching
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;