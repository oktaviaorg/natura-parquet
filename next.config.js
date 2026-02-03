const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['axemarkwood.com', 'i0.wp.com'],
  },
};

module.exports = withNextIntl(nextConfig);
