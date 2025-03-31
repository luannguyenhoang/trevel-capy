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
  HStack,
} from "@chakra-ui/react";
import { FormEvent } from "react";
import { FaReply, FaRegSmile, FaRegImage, FaRegPaperPlane } from "react-icons/fa";

export default function CommentsPost({ slug }: { slug: any }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyingContents, setReplyingContents] = useState<Record<number, string>>({});
  const [openReplyForms, setOpenReplyForms] = useState<Record<number, boolean>>({});
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

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

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

      setName("");
      setEmail("");
      setContent("");
      setReplyingTo(null);

      toast({
        title: "Thành công",
        description: "Bình luận của bạn đã được gửi thành công",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Lỗi",
        description: err.message || "Có lỗi xảy ra khi gửi bình luận",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInlineReply = async (commentId: number) => {
    setSubmitting(true);
    
    try {
      const replyContent = replyingContents[commentId];
      
      if (!replyContent || replyContent.trim() === '') {
        throw new Error("Vui lòng nhập nội dung bình luận");
      }
      
      const commentData: any = {
        post: parseInt(slug),
        author_name: name || "Khách", // Sử dụng tên từ form chính hoặc mặc định
        author_email: email || "guest@example.com", // Sử dụng email từ form chính hoặc mặc định
        content: replyContent,
        parent: commentId
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

      // Refresh comments
      const apiUrl = `${process.env.NEXT_PUBLIC_API_POSTS_URL}${slug}&per_page=100`;
      const res = await fetch(apiUrl, { next: { revalidate: 0 } });

      if (res.ok) {
        const allComments = await res.json();
        
        // Organize comments
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

        // Sort comments
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

      // Xóa nội dung trả lời và đóng form
      const updatedContents = { ...replyingContents };
      delete updatedContents[commentId];
      setReplyingContents(updatedContents);
      
      const updatedOpenForms = { ...openReplyForms };
      updatedOpenForms[commentId] = false;
      setOpenReplyForms(updatedOpenForms);

      toast({
        title: "Thành công",
        description: "Bình luận của bạn đã được gửi thành công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err: any) {
      toast({
        title: "Lỗi",
        description: err.message || "Có lỗi xảy ra khi gửi bình luận",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const toggleReplyForm = (commentId: number) => {
    setOpenReplyForms(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
    
    // Khởi tạo nội dung nếu chưa có
    if (!replyingContents[commentId]) {
      setReplyingContents(prev => ({
        ...prev,
        [commentId]: ''
      }));
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
          <Box w="100%">
            <Text fontWeight="bold" fontSize={depth === 0 ? "md" : "sm"}>
              {comment.author_name}
            </Text>
            <Text fontSize={depth === 0 ? "sm" : "xs"} color="gray.500">
              {new Date(comment.date).toLocaleDateString("vi-VN")}
            </Text>
            <Box
              mt={2}
              fontSize={depth === 0 ? "md" : "sm"}
              dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
            />
            
            <HStack mt={2}>
              <Button
                variant="ghost"
                size="xs"
                color="gray.500"
                onClick={() => toggleReplyForm(comment.id)}
              >
                Phản hồi
              </Button>
              <Text fontSize="xs" color="gray.500">
                {openReplyForms[comment.id] ? 'Xem tất cả phản hồi' : 
                  comment.children && comment.children.length > 0 ? 
                  `Xem tất cả ${comment.children.length} phản hồi` : ''}
              </Text>
            </HStack>
            
            {/* Inline reply form */}
            <Collapse in={openReplyForms[comment.id]} animateOpacity>
              <Box mt={2} mb={3}>
                <Flex>
                  <Avatar
                    size="xs"
                    mr={2}
                    src=""
                  />
                  <Box 
                    flex="1"
                    borderWidth="1px"
                    borderRadius="full"
                    bg="gray.50"
                    px={3}
                    py={1}
                  >
                    <Flex align="center">
                      <Input
                        variant="unstyled"
                        placeholder="Viết phản hồi..."
                        size="sm"
                        value={replyingContents[comment.id] || ''}
                        onChange={(e) => 
                          setReplyingContents({
                            ...replyingContents,
                            [comment.id]: e.target.value
                          })
                        }
                      />
                      <HStack spacing={1}>
                        <IconButton
                          aria-label="Insert emoticon"
                          icon={<FaRegSmile />}
                          variant="ghost"
                          size="sm"
                          color="gray.400"
                        />
                        <IconButton
                          aria-label="Attach image"
                          icon={<FaRegImage />}
                          variant="ghost"
                          size="sm"
                          color="gray.400"
                        />
                        <IconButton
                          aria-label="Send reply"
                          icon={<FaRegPaperPlane />}
                          variant="ghost"
                          size="sm"
                          colorScheme="blue"
                          isLoading={submitting}
                          onClick={() => handleInlineReply(comment.id)}
                        />
                      </HStack>
                    </Flex>
                  </Box>
                </Flex>
              </Box>
            </Collapse>
          </Box>
        </Flex>

        {comment.children && comment.children.length > 0 && (
          <Box
            mt={2}
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

      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="sm"
        id="comment-form"
      >
        <form onSubmit={handleSubmitComment}>
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
              Gửi bình luận
            </Button>
          </VStack>
        </form>
      </Box>

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
