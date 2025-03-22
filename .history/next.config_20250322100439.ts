import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/mien-bac",
        destination: "/mienBacPage/Index",
      },
      {
        source: "/mien-bac",
        destination: "/mienTrungPage/Index",
      },
      {
        source: "/sign-in",
        destination: "/loginPage/SignIn",
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
