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

const ReplyForm = React.memo(
  ({
    commentId,
    onSubmit,
    onCancel,
  }: {
    commentId: number;
    onSubmit: (content: string) => Promise<boolean>;
    onCancel: () => void;
  }) => {
    const [content, setContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const toast = useToast();

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      
      if (!content.trim()) {
        setError("Vui lòng nhập nội dung phản hồi");
        toast({
          title: "Lỗi",
          description: "Vui lòng nhập nội dung phản hồi",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      
      setSubmitting(true);
      try {
        console.log("Gửi phản hồi:", content);
        const success = await onSubmit(content);
        console.log("Kết quả:", success);
        if (success) {
          setContent("");
        }
      } catch (err) {
        console.error("Lỗi khi gửi phản hồi:", err);
        setError("Có lỗi xảy ra khi gửi phản hồi");
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <Box mt={3} ml={6} pl={4}>
        <form onSubmit={handleSubmit}>
          <Flex gap={2} direction={{ base: "column", md: "row" }}>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Viết phản hồi..."
              size="sm"
              resize="none"
              rows={2}
              flexGrow={1}
              isInvalid={!!error}
            />
            <Flex direction={{ base: "row", md: "column" }} gap={2}>
              <Button
                type="submit"
                colorScheme="blue"
                size="sm"
                isLoading={submitting}
              >
                Gửi
              </Button>
              <Button size="sm" variant="ghost" onClick={onCancel}>
                Hủy
              </Button>
            </Flex>
          </Flex>
          {error && (
            <Text color="red.500" fontSize="sm" mt={1}>
              {error}
            </Text>
          )}
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
  const [activeReplyForm, setActiveReplyForm] = useState<number | null>(null);
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
      localStorage.setItem("comment_name", name);
      localStorage.setItem("comment_email", email);
      
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

  const handleDirectReply = async (commentId: number, content: string) => {
    try {
      console.log("Bắt đầu xử lý trả lời trực tiếp, commentId:", commentId);
      
      if (!content.trim()) {
        toast({
          title: "Lỗi",
          description: "Vui lòng nhập nội dung phản hồi",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return false;
      }
      
      const savedName = localStorage.getItem("comment_name") || "";
      const savedEmail = localStorage.getItem("comment_email") || "";
      
      console.log("Thông tin người dùng:", { savedName, savedEmail });
      
      if (!savedName || !savedEmail) {
        console.log("Không có thông tin người dùng, chuyển đến form chính");
        setReplyingTo(commentId);
        setActiveReplyForm(null);
        setTimeout(() => {
          document
            .getElementById("comment-form")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return false;
      }
      
      const commentData: any = {
        post: parseInt(slug),
        author_name: savedName,
        author_email: savedEmail,
        content: content,
        parent: commentId,
      };
      
      console.log("Dữ liệu gửi đi:", commentData);

      const response = await fetch("/api/postComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });
      
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Lỗi từ API:", errorData);
        throw new Error(errorData.error || "Không thể gửi bình luận");
      }

      const responseData = await response.json();
      console.log("Kết quả từ API:", responseData);

      console.log("Đang tải lại bình luận...");
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
      } else {
        console.error("Không thể tải lại bình luận:", res.status);
      }

      setActiveReplyForm(null);

      toast({
        title: "Thành công",
        description: "Phản hồi của bạn đã được gửi",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      return true;
    } catch (err: any) {
      console.error("Lỗi xử lý phản hồi:", err);
      toast({
        title: "Lỗi",
        description: err.message || "Có lỗi xảy ra khi gửi phản hồi",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
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
            setActiveReplyForm(comment.id);
          }}
        >
          Trả lời
        </Button>

        {activeReplyForm === comment.id && (
          <ReplyForm
            commentId={comment.id}
            onSubmit={(content) => handleDirectReply(comment.id, content)}
            onCancel={() => setActiveReplyForm(null)}
          />
        )}

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
