import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 
  async rewrites() {
    return [
      {
        source: "/test-nhe-sos",
        destination: "/testNhe",
      },
      {
        source: "/sign-in",
        destination: "/LoginPage/SignIn",
      },
      {
        source: "/sign-in",
        destination: "/LoginPage/SignIn",
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
