import { NavItem } from "@/type/types";
import { createIcon } from "@chakra-ui/react";
import { Metadata } from "next";
import { CommentPost } from "@/type/types";

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
        href: "/404",
      },
      {
        label: "Lễ hội",
        subLabel: "Lễ hội truyền thống Việt Nam",
        href: "/chat",
      },
    ],
  },
  {
    label: "Tin tức",
    children: [
      {
        label: "Tin tức",
        subLabel: "Tin tức và bài viết mới nhất",
        href: "/tin-tuc",
      },
    ],
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

//

export const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});

//

export const parseVietnamCurrency = (currencyString: string) => {
  if (!currencyString) return 0;
  const numericString = currencyString.replace(/\./g, "");
  return parseFloat(numericString) || 0;
};

export const formatVietnamCurrency = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const calculateDiscountPercentage = (
  maxPrice: number,
  minPrice: number
) => {
  if (!maxPrice || !minPrice || maxPrice <= minPrice || maxPrice <= 0) {
    return 0;
  }
  return Math.round(((maxPrice - minPrice) / maxPrice) * 100);
};

//

export function countAllComments(comments: CommentPost[]): number {
  let count = 0;

  function countChildren(comment: CommentPost) {
    count++;
    if (comment.children && comment.children.length > 0) {
      comment.children.forEach(countChildren);
    }
  }

  comments.forEach(countChildren);
  return count;
}
//
export const processComments = (allComments: CommentPost[]): CommentPost[] => {
  const commentMap = new Map<number, CommentPost>();

  allComments.forEach((comment) => {
    comment.children = [];
    commentMap.set(comment.id, comment);
  });

  const rootComments: CommentPost[] = [];

  allComments.forEach((comment) => {
    if (comment.parent === 0) {
      rootComments.push(comment);
    } else {
      const parentComment = commentMap.get(comment.parent);
      if (parentComment) {
        parentComment.children.push(comment);
      } else {
        rootComments.push(comment);
      }
    }
  });

  rootComments.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const sortChildrenComments = (comments: CommentPost[]) => {
    if (comments.length > 0) {
      comments.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      comments.forEach((comment) => sortChildrenComments(comment.children));
    }
  };

  rootComments.forEach((comment) => sortChildrenComments(comment.children));
  return rootComments;
};
//
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  // Các khoảng thời gian tính bằng giây
  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;
  
  if (diffInSeconds < minute) {
    return `${diffInSeconds} giây trước`;
  } else if (diffInSeconds < hour) {
    const minutes = Math.floor(diffInSeconds / minute);
    return `${minutes} phút trước`;
  } else if (diffInSeconds < day) {
    const hours = Math.floor(diffInSeconds / hour);
    return `${hours} giờ trước`;
  } else if (diffInSeconds < week) {
    const days = Math.floor(diffInSeconds / day);
    return `${days} ngày trước`;
  } else if (diffInSeconds < month) {
    const weeks = Math.floor(diffInSeconds / week);
    return `${weeks} tuần trước`;
  } else if (diffInSeconds < year) {
    const months = Math.floor(diffInSeconds / month);
    return `${months} tháng trước`;
  } else {
    const years = Math.floor(diffInSeconds / year);
    return `${years} năm trước`;
  }
}
