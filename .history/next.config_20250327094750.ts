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
        source: "/graphQL",
        destination: "/testGrapQL/Index",
      },
      {
        source: "/am-thuc",
        destination: "/amThucPage/Index",
      },
      {
        source: "/khach-san",
        destination: "/khachSan/Index",
      },
      {
        source: "/tin-tuc",
        destination: "/tinTuc/Index",
      },

      {
        source: "/404",
        destination: "/amThucPage/404",
      },
    ];
  },
  reactStrictMode: true,
};

export default nextConfig;
