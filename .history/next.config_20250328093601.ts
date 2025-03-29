import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/mien-bac",
        destination: "/mienBac",
      },
      {
        source: "/mien-trung",
        destination: "/mienTrung",
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
        destination: "/amThuc",
      },
      {
        source: "/khach-san",
        destination: "/khachSan",
      },
      {
        source: "/tin-tuc",
        destination: "/tinTuc",
      },

      {
        source: "/404",
        destination: "/amThucPage/404",
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
