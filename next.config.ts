import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Required for server functions (API routes) in Amplify
  reactStrictMode: true, // Optional but recommended
};

export default nextConfig;
