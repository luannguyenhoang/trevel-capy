import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/mien-bac",
        destination: "/mienBacPage/Index",
      },
      {
        source: "/sign-in",
        destination: "/LoginPage/SignIn",
      },
      {
        source: "/dong-van",
        destination: "/LoginPage/SignIn",
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
