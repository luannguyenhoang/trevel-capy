import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/mien-bac",
        destination: "/mienBacPage/Index",
      },
      {
        source: "/mien-trung",
        destination: "/mienTrungPage/Index",
      },
      {
        source: "/mien-nam",
        destination: "/mienNamPage/Index",
      },
      {
        source: "/sign-in",
        destination: "/loginPage/SignIn",
      },
      {
        source: "/am-thuc",
        destination: "/amThucPage/Index",
      },
      {
        source: "/404",
        destination: "/amThucPage/Index",
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
