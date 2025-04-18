"use client";
import { useEffect, useState, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Grid,
  IconButton,
  Portal,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import React from "react";
import { CommentPost } from "@/type/types";
import { countAllComments, processComments } from "@/utils/common";
import { FaSmile } from "react-icons/fa";

const emojis = [
  "😀",
  "😁",
  "😂",
  "🤣",
  "😃",
  "😄",
  "😅",
  "😆",
  "😉",
  "😊",
  "😋",
  "😎",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "🙂",
  "🤗",
  "🤩",
  "🤔",
  "🤨",
  "😐",
  "😑",
  "😶",
  "🙄",
  "😏",
  "😣",
  "😥",
  "😮",
  "🤐",
  "😯",
  "😪",
  "😫",
  "🥱",
  "😴",
  "😌",
  "😛",
  "😜",
  "😝",
  "🤤",
  "😒",
  "😓",
  "😔",
  "😕",
  "🙃",
  "🤑",
  "😲",
  "🙁",
  "😖",
  "😞",
  "😟",
  "😤",
  "😢",
  "😭",
];

const CommentForm = React.memo(
  ({
    initialName = "",
    initialContent = "",
    replyingTo,
    replyingToName,
    onSubmit,
    onCancelReply,
  }: {
    initialName?: string;
    initialContent?: string;
    replyingTo: number | null;
    replyingToName?: string;
    onSubmit: (name: string, content: string) => void;
    onCancelReply: () => void;
  }) => {
    const [name, setName] = useState(initialName);
    const [content, setContent] = useState(initialContent);
    const [submitting, setSubmitting] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiButtonRef = useRef<HTMLButtonElement>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          emojiPickerRef.current && 
          emojiButtonRef.current && 
          !emojiPickerRef.current.contains(event.target as Node) &&
          !emojiButtonRef.current.contains(event.target as Node)
        ) {
          setShowEmojiPicker(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      try {
        await onSubmit(name, content);
        setName(initialName);
        setContent(initialContent);
      } finally {
        setSubmitting(false);
      }
    };

    const insertEmoji = (emoji: string) => {
      setContent((prev) => prev + emoji);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    };

    return (
      <Box id="comment-form">
        <form onSubmit={handleSubmit}>
          {replyingTo && (
            <Flex mb={2} align="center" gap={2}>
              <Text fontSize="sm" color="gray.500">
                Đang trả lời bình luận của
              </Text>
              <Text fontSize="sm" fontWeight="bold" color="blue.500">
                {replyingToName}
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                onClick={onCancelReply}
                _hover={{ textDecoration: "underline" }}
              >
                • Hủy
              </Text>
            </Flex>
          )}

          <Flex gap={2}>
            <Avatar size="sm" />
            <Box flex="1">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn"
                size="sm"
                mb={2}
                bg="white"
              />
              <Box borderWidth="1px" borderRadius="xl" overflow="hidden">
                <Textarea
                  ref={textareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Viết bình luận..."
                  minH="60px"
                  p={3}
                  border="none"
                  _focus={{ border: "none", boxShadow: "none" }}
                  resize="none"
                />
                <Flex
                  justify="space-between"
                  p={2}
                  borderTop="1px"
                  borderColor="gray.100"
                  align="center"
                >
                  <Box position="relative">
                    <IconButton
                      ref={emojiButtonRef}
                      aria-label="Add emoji"
                      icon={<FaSmile />}
                      variant="ghost"
                      size="sm"
                      colorScheme="gray"
                      fontSize="18px"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    />
                    
                    {showEmojiPicker && (
                      <Portal>
                        <Box
                          ref={emojiPickerRef}
                          position="absolute"
                          bottom="40px"
                          left="0"
                          width="300px"
                          bg="white"
                          boxShadow="lg"
                          borderRadius="md"
                          zIndex={1000}
                          p={2}
                        >
                          <Text fontSize="sm" fontWeight="medium" mb={2} px={2}>
                            Mặt cười & hình người
                          </Text>
                          <Grid templateColumns="repeat(8, 1fr)" gap={1}>
                            {emojis.map((emoji, index) => (
                              <Box
                                key={index}
                                as="button"
                                type="button"
                                fontSize="22px"
                                width="30px"
                                height="30px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="md"
                                cursor="pointer"
                                onClick={() => insertEmoji(emoji)}
                                _hover={{ bg: "gray.100" }}
                              >
                                {emoji}
                              </Box>
                            ))}
                          </Grid>
                        </Box>
                      </Portal>
                    )}
                  </Box>

                  <Button
                    type="submit"
                    colorScheme="blue"
                    size="sm"
                    isLoading={submitting}
                    borderRadius="full"
                  >
                    {replyingTo ? "Phản hồi" : "Bình luận"}
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </form>
      </Box>
    );
  }
);

const CommentItem = React.memo(
  ({
    comment,
    depth = 0,
    replyingTo,
    replyingToName,
    onReply,
    onSubmitComment,
    onCancelReply,
    parentExpanded,
    isLastChild = false,
  }: {
    comment: CommentPost;
    depth?: number;
    replyingTo: number | null;
    replyingToName?: string;
    onReply: (id: number) => void;
    onSubmitComment: (name: string, content: string) => Promise<boolean>;
    onCancelReply: () => void;
    parentExpanded: boolean;
    isLastChild?: boolean;
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
      <Box position="relative">
        {depth > 0 && (
          <Box
            position="absolute"
            left="-57px"
            top="-70px"
            bottom={isLastChild ? "auto" : "0"}
            width="2px"
            height={isLastChild ? "76px" : "auto"}
            bg="gray.200"
            _before={{
              content: '""',
              position: "absolute",
              left: "0",
              top: "70px",
              width: "46px",
              height: "15px",
              borderLeft: "2.5px solid #E2E8F0",
              borderBottom: "2.5px solid #E2E8F0",
              borderBottomLeftRadius: "10px",
            }}
          />
        )}

        <Flex gap={2}>
          <Avatar
            src={comment.author_avatar_urls["48"]}
            name={comment.author_name}
            size={depth === 0 ? "sm" : "xs"}
          />
          <Box flex="1">
            <Box bg="gray.50" p={3} borderRadius="xl">
              <Text fontWeight="semibold" fontSize={depth === 0 ? "md" : "sm"}>
                {comment.author_name}
              </Text>
              <Box
                mt={1}
                fontSize={depth === 0 ? "md" : "sm"}
                color="gray.700"
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
              />
            </Box>

            <Flex mt={1} gap={4} ml={2}>
              <Text
                fontSize="sm"
                color="gray.500"
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={() => onReply(comment.id)}
              >
                Phản hồi
              </Text>
              {hasChildren && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  onClick={toggleReplies}
                  fontWeight="bold"
                >
                  {showReplies ? "Ẩn phản hồi" : `${childrenCount} phản hồi`}
                </Text>
              )}
              <Text fontSize="sm" color="gray.500">
                {new Date(comment.date).toLocaleDateString("vi-VN")}
              </Text>
            </Flex>

            {replyingTo === comment.id && (
              <Box mt={3}>
                <CommentForm
                  replyingTo={replyingTo}
                  replyingToName={replyingToName || comment.author_name}
                  onSubmit={onSubmitComment}
                  onCancelReply={onCancelReply}
                />
              </Box>
            )}

            {hasChildren && showReplies && (
              <Box mt={2} ml={8} position="relative">
                {comment.children.map((child, index) => (
                  <Box key={child.id} mb={2}>
                    <CommentItem
                      comment={child}
                      depth={depth + 1}
                      replyingTo={replyingTo}
                      replyingToName={replyingToName}
                      onReply={onReply}
                      onSubmitComment={onSubmitComment}
                      onCancelReply={onCancelReply}
                      parentExpanded={false}
                      isLastChild={index === comment.children.length - 1}
                    />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    );
  }
);

CommentForm.displayName = "CommentForm";
CommentItem.displayName = "CommentItem";

const CommentSkeleton = () => {
  return (
    <VStack spacing={4} align="stretch">
      {[1, 2, 3].map((i) => (
        <Box key={i}>
          <Flex gap={2}>
            <Box>
              <Box
                width="32px"
                height="32px"
                borderRadius="full"
                bg="gray.200"
                animation="pulse 1.5s infinite"
              />
            </Box>
            <Box flex="1">
              <Box bg="gray.50" p={3} borderRadius="xl">
                <Box
                  width="120px"
                  height="20px"
                  bg="gray.200"
                  borderRadius="md"
                  mb={2}
                  animation="pulse 1.5s infinite"
                />
                <Box
                  width="100%"
                  height="40px"
                  bg="gray.200"
                  borderRadius="md"
                  animation="pulse 1.5s infinite"
                />
              </Box>
              <Flex mt={1} gap={4} ml={2}>
                <Box
                  width="60px"
                  height="16px"
                  bg="gray.200"
                  borderRadius="md"
                  animation="pulse 1.5s infinite"
                />
                <Box
                  width="80px"
                  height="16px"
                  bg="gray.200"
                  borderRadius="md"
                  animation="pulse 1.5s infinite"
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
      ))}
    </VStack>
  );
};

export default function CommentsPost({ slug }: { slug: string }) {
  const [data, setData] = useState<CommentPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const toast = useToast();

  const [expandAll, setExpandAll] = useState(false);

  const toggleAllComments = () => {
    setExpandAll(!expandAll);
  };

  const fetchComments = async () => {
    try {
      setLoading(true);
      const apiUrl = `${process.env.NEXT_PUBLIC_API_POSTS_URL}${slug}&per_page=100`;
      const res = await fetch(apiUrl, { next: { revalidate: 0 } });

      if (!res.ok) {
        throw new Error("error");
      }

      const allComments = await res.json();
      setData(processComments(allComments));
    } catch (err: any) {
      setError(err.message || "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const handleCommentSuccess = async () => {
    await fetchComments();
    setReplyingTo(null);

    setExpandAll(false);

    toast({
      title: "Thành công",
      description: "Bình luận của bạn đã được gửi thành công",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSubmitCommentForm = async (
    name: string,
    content: string
  ): Promise<boolean> => {
    try {
      const commentData = {
        post: parseInt(slug),
        author_name: name.trim() === "" ? "Ẩn danh" : name,
        content: content,
        parent: replyingTo ? replyingTo : 0,
      };

      const response = await fetch("/api/postComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Không thể gửi bình luận");
      }

      await response.json();
      await handleCommentSuccess();

      return true;
    } catch (err: any) {
      toast({
        title: "Lỗi",
        description: err.message || "Có lỗi xảy ra khi gửi bình luận",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
  };

  const handleReply = (commentId: number) => {
    setReplyingTo(commentId);
    const formElement = document.getElementById("comment-form");
    formElement?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  if (loading) {
    return (
      <Box>
        <Flex justify="space-between" align="center" mb={4}>
          <Box
            width="150px"
            height="24px"
            bg="gray.200"
            borderRadius="md"
            animation="pulse 1.5s infinite"
          />
        </Flex>
        <CommentSkeleton />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4} bg="red.50" color="red.500" borderRadius="md">
        <Text>{error}</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={4} align="stretch" my={6}>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontSize="lg" fontWeight="bold">
          Bình luận ({data.length > 0 ? countAllComments(data) : 0})
        </Text>
        {data && data.length > 3 && (
          <Text
            fontSize="sm"
            color="blue.500"
            cursor="pointer"
            onClick={toggleAllComments}
            _hover={{ textDecoration: "underline" }}
          >
            {expandAll ? "Thu gọn tất cả" : "Xem tất cả"}
          </Text>
        )}
      </Flex>

      {!replyingTo && (
        <CommentForm
          replyingTo={null}
          onSubmit={handleSubmitCommentForm}
          onCancelReply={handleCancelReply}
        />
      )}

      {data && data.length > 0 ? (
        <VStack spacing={4} align="stretch">
          {data.map((comment, index) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              replyingTo={replyingTo}
              replyingToName={
                replyingTo
                  ? data.find((c) => c.id === replyingTo)?.author_name
                  : undefined
              }
              onReply={handleReply}
              onSubmitComment={handleSubmitCommentForm}
              onCancelReply={handleCancelReply}
              parentExpanded={expandAll}
              isLastChild={index === data.length - 1}
            />
          ))}
        </VStack>
      ) : (
        <Text color="gray.500" textAlign="center" py={4}>
          Chưa có bình luận nào.
        </Text>
      )}
    </VStack>
  );
}
