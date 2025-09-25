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
    // Disable polyfills for modern browsers
    if (!dev && !isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
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
  // Enhanced tree shaking optimization for animation bundle
  // Keep usedExports to enable tree-shaking while leaving `sideEffects`
  // at the Webpack/Next default to avoid breaking CSS and other
  // side-effectful modules. If you require more aggressive removal,
  // prefer per-package `package.json` "sideEffects": false or add
  // webpack rules that set `module.sideEffects` for safe bundles.
  config.optimization.usedExports = true;

      // Bundle splitting optimized for animation code
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Separate animation utilities into their own chunk
          animations: {
            test: /[\\/](lib[\\/]utils[\\/]animation|components[\\/]utility)[\\/]/,
            name: 'animations',
            chunks: 'all',
            priority: 20,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
        },
      };

      // Minimize animation bundle size
      config.optimization.minimize = true;

      // Remove unused code more aggressively — only adjust if a TerserPlugin minimizer is present.
      if (config.optimization.minimizer && Array.isArray(config.optimization.minimizer)) {
        const hasTerser = config.optimization.minimizer.some(
          minimizer => minimizer && minimizer.constructor && minimizer.constructor.name === 'TerserPlugin'
        );

        if (hasTerser) {
          config.optimization.minimizer.forEach(minimizer => {
            if (minimizer?.constructor?.name === 'TerserPlugin') {
              minimizer.options = {
                ...minimizer.options,
                terserOptions: {
                  ...minimizer.options?.terserOptions,
                  compress: {
                    ...minimizer.options?.terserOptions?.compress,
                    drop_console: true, // Remove console.log in production
                    drop_debugger: true,
                    pure_funcs: ['console.log', 'console.info', 'console.debug'],
                    unused: true, // Remove unused code
                  },
                },
              };
            }
          });
        }
      }
    }

    return config;
  },
};

export default nextConfig;