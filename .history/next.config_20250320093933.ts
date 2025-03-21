import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/sign-in",
        destination: "/LoginPage/SignIn",
      },
      {
        source: "/mien-bac",
        destination: "/mienBacPage/Index",
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
