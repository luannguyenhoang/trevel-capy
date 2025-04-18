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

// Định nghĩa type cho comment
interface CommentType {
  id: number;
  author_name: string;
  author_avatar_urls: {
    [key: string]: string;
  };
  date: string;
  content: {
    rendered: string;
  };
  parent: number;
  children: CommentType[];
}

// Props cho CommentForm
interface CommentFormProps {
  initialName?: string;
  initialEmail?: string;
  initialContent?: string;
  replyingTo: number | null;
  onSubmit: (name: string, email: string, content: string) => Promise<boolean>;
  onCancelReply: () => void;
}

const CommentForm: React.FC<CommentFormProps> = React.memo(
  ({
    initialName = "",
    initialEmail = "",
    initialContent = "",
    replyingTo,
    onSubmit,
    onCancelReply,
  }) => {
    const [name, setName] = useState(initialName);
    const [email, setEmail] = useState(initialEmail);
    const [content, setContent] = useState(initialContent);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      setSubmitting(true);

      try {
        const success = await onSubmit(name, email, content);
        if (success) {
        setName(initialName);
        setEmail(initialEmail);
        setContent(initialContent);
        }
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

// Props cho CommentItem
interface CommentItemProps {
  comment: CommentType;
  depth?: number;
  onReply: (commentId: number) => void;
  replyingTo: number | null;
  onSubmitComment: (name: string, email: string, content: string) => Promise<boolean>;
  onCancelReply: () => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ 
  comment, 
  depth = 0, 
  onReply, 
  replyingTo, 
  onSubmitComment, 
  onCancelReply 
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
        onClick={() => onReply(comment.id)}
      >
        Trả lời
      </Button>

      {replyingTo === comment.id && (
        <Box mt={3}>
          <CommentForm
            replyingTo={replyingTo}
            onSubmit={onSubmitComment}
            onCancelReply={onCancelReply}
          />
        </Box>
      )}

      {comment.children && comment.children.length > 0 && (
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
                onReply={onReply}
                replyingTo={replyingTo}
                onSubmitComment={onSubmitComment}
                onCancelReply={onCancelReply}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

interface CommentsPostProps {
  slug: string | number;
}

export default function CommentsPost({ slug }: CommentsPostProps) {
  const [data, setData] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const toast = useToast();

  // Tách logic xử lý và sắp xếp comments thành function riêng
  const processComments = (allComments: CommentType[]) => {
    const commentMap = new Map<number, CommentType>();
    allComments.forEach((comment) => {
          comment.children = [];
          commentMap.set(comment.id, comment);
        });

    const rootComments: CommentType[] = [];
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

    // Sắp xếp bình luận gốc theo thứ tự giảm dần (mới nhất trước)
        rootComments.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

    // Sắp xếp phản hồi theo thứ tự tăng dần (cũ nhất trước)
    const sortChildrenComments = (comments: CommentType[]) => {
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

  // Tách logic tải comments thành function riêng
  const fetchComments = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_POSTS_URL}${slug}&per_page=100`;
      const res = await fetch(apiUrl, { next: { revalidate: 0 } });
      
      if (!res.ok) {
        throw new Error("Không thể tải bình luận");
      }
      
      const allComments = await res.json();
      const processedComments = processComments(allComments);
      setData(processedComments);
      } catch (err) {
        setError("Có lỗi khi tải bình luận");
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  const handleSubmitCommentForm = async (
    name: string,
    email: string,
    content: string
  ): Promise<boolean> => {
    try {
      const commentData = {
        post: typeof slug === 'string' ? parseInt(slug) : slug,
        author_name: name.trim() === "" ? "Ẩn danh" : name,
        author_email: email,
        content: content,
        ...(replyingTo && { parent: replyingTo }),
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

      // Tải lại bình luận sau khi gửi thành công
      await fetchComments();
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
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Box>{error}</Box>;
  }

  return (
    <VStack spacing={4} align="stretch" my={6}>
      <Text fontSize="xl" fontWeight="bold">
        Bình luận ({data.length > 0 ? countAllComments(data) : 0})
      </Text>

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
              onReply={handleReply} 
              replyingTo={replyingTo}
              onSubmitComment={handleSubmitCommentForm}
              onCancelReply={handleCancelReply}
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

function countAllComments(comments: CommentType[]): number {
  let count = 0;

  function countChildren(comment: CommentType) {
    count++;
    if (comment.children && comment.children.length > 0) {
      comment.children.forEach(countChildren);
    }
  }

  comments.forEach(countChildren);
  return count;
}
