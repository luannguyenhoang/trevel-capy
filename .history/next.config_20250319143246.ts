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
        source: "/mien-bac",
        destination: "//SignIn",
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
