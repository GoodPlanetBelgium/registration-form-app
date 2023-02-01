/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['default', 'nl', 'fr'],
    defaultLocale: 'default',
    localeDetection: false
  }
}

module.exports = nextConfig
