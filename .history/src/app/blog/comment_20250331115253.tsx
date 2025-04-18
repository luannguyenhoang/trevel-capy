"use client";
import { useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import { FaReply } from "react-icons/fa";
import React from "react";
import { CommentPost } from "@/type/types";
import { countAllComments, processComments } from "@/utils/common";

const CommentForm = React.memo(
  ({
    initialName = "",
    initialEmail = "",
    initialContent = "",
    replyingTo,
    replyingToName,
    onSubmit,
    onCancelReply,
  }: {
    initialName?: string;
    initialEmail?: string;
    initialContent?: string;
    replyingTo: number | null;
    replyingToName?: string;
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
        borderRadius="lg"
        boxShadow="sm"
        bg="white"
        id="comment-form"
      >
        <form onSubmit={handleSubmit}>
          {replyingTo && (
            <Box mb={3} p={2} bg="gray.50" borderRadius="md">
              <Flex justify="space-between" align="center">
                <div className="flex items-center gap-2">
                  <Text fontSize="sm">Đang trả lời bình luận của</Text>
                  <Text fontWeight="bold" color="blue.500">
                    {replyingToName || "người dùng"}
                  </Text>
                </div>
                <Button size="sm" colorScheme="gray" onClick={onCancelReply}>
                  Hủy
                </Button>
              </Flex>
            </Box>
          )}

          <VStack spacing={4} align="stretch">
            <Flex gap={4}>
              <FormControl id="name" flex="1">
                <FormLabel fontSize="sm">Tên</FormLabel>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tên của bạn (để trống sẽ hiển thị là Ẩn danh)"
                  size="md"
                  borderRadius="md"
                />
              </FormControl>

              <FormControl id="email" isRequired flex="1">
                <FormLabel fontSize="sm">Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  size="md"
                  borderRadius="md"
                />
              </FormControl>
            </Flex>

            <FormControl id="content" isRequired>
              <FormLabel fontSize="sm">Bình luận</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết bình luận của bạn..."
                minH="100px"
                borderRadius="md"
                bg="gray.50"
                _focus={{ bg: "white" }}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={submitting}
              alignSelf="flex-end"
              borderRadius="full"
              px={6}
            >
              {replyingTo ? "Gửi trả lời" : "Đăng bình luận"}
            </Button>
          </VStack>
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
  }: {
    comment: CommentPost;
    depth?: number;
    replyingTo: number | null;
    replyingToName?: string;
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
      <Box bg={depth === 0 ? "white" : "transparent"} borderRadius="lg">
        <Flex>
          <Avatar
            src={comment.author_avatar_urls["48"]}
            name={comment.author_name}
            mr={3}
            size={depth === 0 ? "sm" : "xs"}
          />
          <Box flex="1">
            <Box
              bg={depth === 0 ? "gray.50" : "gray.50"}
              p={3}
              borderRadius="lg"
            >
              <Text fontWeight="bold" fontSize={depth === 0 ? "md" : "sm"} color="blue.600">
                {comment.author_name}
              </Text>
              <Box
                mt={1}
                fontSize={depth === 0 ? "md" : "sm"}
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
              />
            </Box>

            <Flex mt={1} gap={4} ml={2} fontSize="xs" color="gray.500" align="center">
              <Text>
                {new Date(comment.date).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </Text>
              <Text
                fontWeight="medium" 
                cursor="pointer"
                _hover={{ textDecor: "underline" }}
                onClick={() => onReply(comment.id)}
              >
                Trả lời
              </Text>
              
              {hasChildren && (
                <Text 
                  fontWeight="medium"
                  cursor="pointer" 
                  _hover={{ textDecor: "underline" }}
                  onClick={toggleReplies}
                >
                  {showReplies ? "Ẩn câu trả lời" : `Xem ${childrenCount} câu trả lời`}
                </Text>
              )}
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
              <Box
                mt={3}
                ml={4}
                pl={3}
                borderLeftWidth="2px"
                borderColor="gray.200"
              >
                {comment.children.map((child) => (
                  <Box key={child.id} mb={3}>
                    <CommentItem
                      comment={child}
                      depth={depth + 1}
                      replyingTo={replyingTo}
                      replyingToName={replyingToName}
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
        </Flex>
      </Box>
    );
  }
);

CommentForm.displayName = "CommentForm";
CommentItem.displayName = "CommentItem";

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
        throw new Error("Không thể tải bình luận");
      }

      const allComments = await res.json();
      setData(processComments(allComments));
    } catch (err: any) {
      setError(err.message || "Có lỗi khi tải bình luận");
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
    email: string,
    content: string
  ): Promise<boolean> => {
    try {
      const commentData = {
        post: parseInt(slug),
        author_name: name.trim() === "" ? "Ẩn danh" : name,
        author_email: email,
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
    return <Loading />;
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
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">
          Bình luận ({data.length > 0 ? countAllComments(data) : 0})
        </Text>

        {data && data.length > 3 && (
          <Button size="sm" variant="outline" onClick={toggleAllComments}>
            {expandAll ? "Thu gọn tất cả" : "Mở rộng tất cả"}
          </Button>
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
        data.map((comment) => (
          <Box
            key={comment.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
          >
            <CommentItem
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
            />
          </Box>
        ))
      ) : (
        <Box p={4} bg="gray.50" borderRadius="md" textAlign="center">
          <Text>Chưa có bình luận nào.</Text>
        </Box>
      )}
    </VStack>
  );
}
