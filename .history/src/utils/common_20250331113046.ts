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
        href: "/graphQL",
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
const CommentForm = React.memo(
  ({
    initialName = "",
    initialEmail = "",
    initialContent = "",
    replyingTo,
    onSubmit,
    onCancelReply,
  }: {
    initialName?: string;
    initialEmail?: string;
    initialContent?: string;
    replyingTo: number | null;
    onSubmit: (name: string, email: string, content: string) => void;
    onCancelReply: () => void;
  }) => {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [content, setContent] = useState(initialContent);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      try {
        await onSubmit(name, email, content);
        setName(initialName);
        setEmail(initialEmail);
        setContent(initialContent);
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="sm"
        id="comment-form"
      >
        <form onSubmit={handleSubmit}>
          {replyingTo && (
            <Box mb={3} p={2} bg="gray.50" borderRadius="md">
              <Flex justify="space-between" align="center">
                <Text fontSize="sm">Đang trả lời bình luận #{replyingTo}</Text>
                <Button size="sm" onClick={onCancelReply}>
                  Hủy
                </Button>
              </Flex>
            </Box>
          )}

          <VStack spacing={3}>
            <FormControl id="name">
              <FormLabel>Tên</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn (để trống sẽ hiển thị là Ẩn danh)"
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email của bạn"
              />
            </FormControl>

            <FormControl id="content" isRequired>
              <FormLabel>Bình luận</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Nội dung bình luận"
                minH="100px"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={submitting}
              alignSelf="flex-start"
            >
              {replyingTo ? "Gửi trả lời" : "Gửi bình luận"}
            </Button>
          </VStack>
        </form>
      </Box>
    );
  }
);

const processComments = (allComments: CommentPost[]): CommentPost[] => {
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

const CommentItem = React.memo(
  ({
    comment,
    depth = 0,
    replyingTo,
    onReply,
    onSubmitComment,
    onCancelReply,
    parentExpanded,
  }: {
    comment: CommentPost;
    depth?: number;
    replyingTo: number | null;
    onReply: (id: number) => void;
    onSubmitComment: (
      name: string,
      email: string,
      content: string
    ) => Promise<boolean>;
    onCancelReply: () => void;
    parentExpanded: boolean;
  }) => {
    const [showReplies, setShowReplies] = useState(false);
    const hasChildren = comment.children && comment.children.length > 0;
    const childrenCount = hasChildren ? comment.children.length : 0;

    useEffect(() => {
      if (depth === 0) {
        setShowReplies(parentExpanded);
      }
    }, [parentExpanded, depth]);

    const toggleReplies = () => {
      setShowReplies(!showReplies);
    };

    return (
      <Box>
        <Flex mb={2}>
          <Avatar
            src={comment.author_avatar_urls["48"]}
            name={comment.author_name}
            mr={3}
            size={depth === 0 ? "sm" : "xs"}
          />
          <Box>
            <Text fontWeight="bold" fontSize={depth === 0 ? "md" : "sm"}>
              {comment.author_name}
            </Text>
            <Text fontSize={depth === 0 ? "sm" : "xs"} color="gray.500">
              {new Date(comment.date).toLocaleDateString("vi-VN")}
            </Text>
          </Box>
        </Flex>

        <Box
          mt={2}
          fontSize={depth === 0 ? "md" : "sm"}
          dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
        />

        <Flex mt={2} gap={2} alignItems="center">
          <Button
            leftIcon={<FaReply />}
            variant="ghost"
            size={depth === 0 ? "sm" : "xs"}
            onClick={() => onReply(comment.id)}
          >
            Trả lời
          </Button>

          {hasChildren && (
            <Button
              variant="link"
              size={depth === 0 ? "sm" : "xs"}
              onClick={toggleReplies}
              color="blue.500"
            >
              {showReplies ? "Ẩn" : "Xem"} {childrenCount} câu trả lời
            </Button>
          )}
        </Flex>

        {replyingTo === comment.id && (
          <Box mt={3}>
            <CommentForm
              replyingTo={replyingTo}
              onSubmit={onSubmitComment}
              onCancelReply={onCancelReply}
            />
          </Box>
        )}

        {hasChildren && showReplies && (
          <Box
            mt={4}
            ml={6}
            pl={4}
            borderLeftWidth="2px"
            borderColor="gray.200"
          >
            {comment.children.map((child) => (
              <Box key={child.id} mb={4}>
                <CommentItem
                  comment={child}
                  depth={depth + 1}
                  replyingTo={replyingTo}
                  onReply={onReply}
                  onSubmitComment={onSubmitComment}
                  onCancelReply={onCancelReply}
                  parentExpanded={false}
                />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  }
);

CommentForm.displayName = "CommentForm";
CommentItem.displayName = "CommentItem";
