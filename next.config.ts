/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  serverDependenciesToBundle: [
    "@aws-sdk/client-dynamodb",
    "@aws-sdk/lib-dynamodb"
  ],
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
