import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MY_AWS_REGION: process.env.MY_AWS_REGION,
    DYNAMODB_CAMP_TABLE: process.env.DYNAMODB_CAMP_TABLE,
    DYNAMODB_TABLE_NAME: process.env.DYNAMODB_TABLE_NAME,
  },
};

export default nextConfig;
