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
        destination: "/mienPage/Index",
      },
      {
        source: "/sign-in",
        destination: "/loginPage/SignIn",
      },
      {
        source: "/dong-van",
        destination: "/BaiViet/baiviet",
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
