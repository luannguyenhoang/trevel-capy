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
  IconButton,
  Collapse,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import { FaReply } from "react-icons/fa";
import React from "react";

// Tạo một component con riêng biệt để xử lý form
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
            <FormControl id="name" isRequired>
              <FormLabel>Tên</FormLabel>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tên của bạn"
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

export default function CommentsPost({ slug }: { slug: any }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const toast = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_POSTS_URL}${slug}&per_page=100`;

        const res = await fetch(apiUrl, { next: { revalidate: 0 } });
        if (!res.ok) {
          throw new Error("error");
        }
        const allComments = await res.json();

        const commentMap = new Map();
        allComments.forEach((comment: any) => {
          comment.children = [];
          commentMap.set(comment.id, comment);
        });

        const rootComments: any[] = [];
        allComments.forEach((comment: any) => {
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

        function sortChildrenComments(comments: any[]) {
          if (comments.length > 0) {
            comments.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            comments.forEach((comment) =>
              sortChildrenComments(comment.children)
            );
          }
        }

        rootComments.forEach((comment) =>
          sortChildrenComments(comment.children)
        );

        setData(rootComments);
      } catch (err) {
        setError("Có lỗi khi tải bình luận");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  const handleSubmitCommentForm = async (
    name: string,
    email: string,
    content: string
  ) => {
    try {
      const commentData: any = {
        post: parseInt(slug),
        author_name: name,
        author_email: email,
        content: content,
      };

      if (replyingTo) {
        commentData.parent = parseInt(String(replyingTo));
      }

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

      const apiUrl = `${process.env.NEXT_PUBLIC_API_POSTS_URL}${slug}&per_page=100`;
      const res = await fetch(apiUrl, { next: { revalidate: 0 } });

      if (res.ok) {
        const allComments = await res.json();

        const commentMap = new Map();
        allComments.forEach((comment: any) => {
          comment.children = [];
          commentMap.set(comment.id, comment);
        });

        const rootComments: any[] = [];
        allComments.forEach((comment: any) => {
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

        function sortChildrenComments(comments: any[]) {
          if (comments.length > 0) {
            comments.sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            comments.forEach((comment) =>
              sortChildrenComments(comment.children)
            );
          }
        }

        rootComments.forEach((comment) =>
          sortChildrenComments(comment.children)
        );

        setData(rootComments);
      }

      setReplyingTo(null);

      toast({
        title: "Thành công",
        description: "Bình luận của bạn đã được gửi thành công",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

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
    setTimeout(() => {
      document
        .getElementById("comment-form")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const CommentItem = ({
    comment,
    depth = 0,
  }: {
    comment: any;
    depth?: number;
  }) => {
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

        <Button
          leftIcon={<FaReply />}
          variant="ghost"
          size={depth === 0 ? "sm" : "xs"}
          mt={2}
          onClick={() => {
            handleReply(comment.id);
          }}
        >
          Trả lời
        </Button>

        {comment.children && comment.children.length > 0 && (
          <Box
            mt={4}
            ml={6}
            pl={4}
            borderLeftWidth="2px"
            borderColor="gray.200"
          >
            {comment.children.map((child: any) => (
              <Box key={child.id} mb={4}>
                <CommentItem comment={child} depth={depth + 1} />
              </Box>
            ))}
          </Box>
        )}
      </Box>
    );
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <VStack spacing={4} align="stretch" my={6}>
      <Text fontSize="xl" fontWeight="bold">
        Bình luận ({data.length > 0 ? countAllComments(data) : 0})
      </Text>

      <CommentForm
        replyingTo={replyingTo}
        onSubmit={handleSubmitCommentForm}
        onCancelReply={() => setReplyingTo(null)}
      />

      {data && data.length > 0 ? (
        data.map((comment) => (
          <Box
            key={comment.id}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            boxShadow="sm"
          >
            <CommentItem comment={comment} />
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

function countAllComments(comments: any[]): number {
  let count = 0;

  function countChildren(comment: any) {
    count++;
    if (comment.children && comment.children.length > 0) {
      comment.children.forEach(countChildren);
    }
  }

  comments.forEach(countChildren);
  return count;
}
