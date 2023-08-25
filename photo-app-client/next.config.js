/** @type {import('next').NextConfig} */
const publicRuntimeConfig = {
  API_BASE_URL: process.env.API_BASE_URL
};
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig
};

module.exports = nextConfig;
