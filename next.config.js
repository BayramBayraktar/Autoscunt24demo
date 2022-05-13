/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
module.exports = {
  i18n,
  reactStrictMode: true,
  env: {
    API_URL: process.env.API_URL
  },
  experimental: {
    styledComponents: true
  }
}


