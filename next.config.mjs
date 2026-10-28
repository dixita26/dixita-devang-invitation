/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep `next dev` isolated from `next build`; sharing `.next` lets a production
  // build overwrite the modules and CSS currently served by the dev server.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  images: { unoptimized: true },
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable Webpack filesystem packfile caching to eliminate ENOENT and module corruption on rapid reloads
      config.cache = false;
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
