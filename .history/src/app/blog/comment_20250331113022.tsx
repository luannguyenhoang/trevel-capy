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
import { countAllComments } from "@/utils/common";



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

  const commentCount = data.length > 0 ? countAllComments(data) : 0;

  return (
    <VStack spacing={4} align="stretch" my={6}>
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold">
          Bình luận ({commentCount})
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
