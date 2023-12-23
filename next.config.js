/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require("./package.json");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["prolog-api.profy.dev"],
  },
  env: {
    appVersion: version,
  },
};

module.exports = nextConfig;
