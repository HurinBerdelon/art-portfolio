const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['tsx'],
  compiler: {
    styledComponents: true
  },
  i18n
}

module.exports = nextConfig
