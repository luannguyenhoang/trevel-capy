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

// Tạo interface cho comment để có type rõ ràng
interface Comment {
  id: number;
  parent: number;
  date: string;
  author_name: string;
  author_avatar_urls: {
    [key: string]: string;
  };
  content: {
    rendered: string;
  };
  children: Comment[];
}

// Tách processComments thành hàm với type rõ ràng
const processComments = (allComments: Comment[]): Comment[] => {
  const commentMap = new Map<number, Comment>();
  
  // Tạo map và khởi tạo children array
  allComments.forEach((comment) => {
    comment.children = [];
    commentMap.set(comment.id, comment);
  });

  const rootComments: Comment[] = [];
  
  // Xây dựng cây comments
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

  rootComments.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Sắp xếp replies theo thứ tự thời gian
  const sortChildrenComments = (comments: Comment[]) => {
    if (comments.length > 0) {
      comments.sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      comments.forEach(comment => sortChildrenComments(comment.children));
    }
  };

  rootComments.forEach(comment => sortChildrenComments(comment.children));
  return rootComments;
};

// Tách CommentItem thành một component riêng ngoài function chính
const CommentItem = React.memo(({
  comment,
  depth = 0,
  replyingTo,
  onReply,
  onSubmitComment,
  onCancelReply,
}: {
  comment: Comment;
  depth?: number;
  replyingTo: number | null;
  onReply: (id: number) => void;
  onSubmitComment: (name: string, email: string, content: string) => Promise<boolean>;
  onCancelReply: () => void;
}) => {
  const [showReplies, setShowReplies] = useState(true);
  const hasChildren = comment.children && comment.children.length > 0;
  const childrenCount = hasChildren ? comment.children.length : 0;
  
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
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
});

CommentForm.displayName = 'CommentForm';
CommentItem.displayName = 'CommentItem';

export default function CommentsPost({ slug }: { slug: string }) {
  const [data, setData] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const toast = useToast();

  const [expandAll, setExpandAll] = useState(true);
  
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
        parent: replyingTo ? replyingTo : 0
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
    const formElement = document.getElementById('comment-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
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
          <Button 
            size="sm" 
            variant="outline" 
            onClick={toggleAllComments}
          >
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

function countAllComments(comments: Comment[]): number {
  let count = 0;

  function countChildren(comment: Comment) {
    count++;
    if (comment.children && comment.children.length > 0) {
      comment.children.forEach(countChildren);
    }
  }

  comments.forEach(countChildren);
  return count;
}
