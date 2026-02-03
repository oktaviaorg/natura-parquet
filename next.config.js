const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'axemarkwood.com',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
    ],
  },
};

module.exports = withNextIntl(nextConfig);
