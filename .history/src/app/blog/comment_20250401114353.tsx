"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { CommentPost } from "@/type/types";
import {
  countAllComments,
  processComments,
} from "@/utils/common";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import CommentSkeleton from "./CommentSkeleton";

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
