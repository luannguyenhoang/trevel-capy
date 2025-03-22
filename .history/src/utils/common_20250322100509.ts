import { NavItem } from "@/type/types";

export const NAV_ITEMS: Array<NavItem> = [
    {
      label: "Điểm đến",
      children: [
        {
          label: "Miền Bắc",
          subLabel: "Sapa, Hà Giang, Hạ Long...",
          href: "/mien-bac",
        },
        {
          label: "Miền Trung",
          subLabel: "Huế, Đà Nẵng, Hội An...",
          href: "/mien-trung",
        },
        {
          label: "Miền Nam",
          subLabel: "Phú Quốc, Cần Thơ, Đà Lạt...",
          href: "/mien-nam",
        },
      ],
    },
    {
      label: "Trải nghiệm",
      children: [
        {
          label: "Ẩm thực",
          subLabel: "Khám phá nền ẩm thực đa dạng",
          href: "/am-thuc",
        },
        {
          label: "Di sản văn hóa",
          subLabel: "Các di sản UNESCO tại Việt Nam",
          href: "/di-san-van-hoa",
        },
        {
          label: "Lễ hội",
          subLabel: "Lễ hội truyền thống Việt Nam",
          href: "/le-hoi",
        },
      ],
    },
    {
      label: "Lịch trình",
      href: "/itineraries",
    },
    {
      label: "Dịch vụ",
      children: [
        {
          label: "Khách sạn",
          subLabel: "Đặt phòng khách sạn",
          href: "/khach-san",
        },
        {
          label: "Tour du lịch",
          subLabel: "Tour trọn gói và tùy chỉnh",
          href: "/tours-du-lich",
        },
        {
          label: "Vận chuyển",
          subLabel: "Máy bay, tàu, xe du lịch",
          href: "/van-chuyen",
        },
      ],
    },
  ];