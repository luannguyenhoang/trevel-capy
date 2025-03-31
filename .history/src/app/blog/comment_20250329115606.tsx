"use client";
import { Comment } from "@/type/types";
import { useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";
import { 
  Box, VStack, Text, Avatar, Flex, Divider, 
  Heading, Button, Textarea, FormControl 
} from "@chakra-ui/react";

export default function CommentsPost({ slug }: { slug: string }) {
  // Thay đổi kiểu dữ liệu để phù hợp với mảng comments
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchComments() {
      try {
        // Thay đổi URL để lấy comments của bài viết
        const commentsApiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/comments?post=${slug}`;
        console.log("Fetching comments from:", commentsApiUrl);
        
        const res = await fetch(commentsApiUrl, { next: { revalidate: 3600 } });
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        
        const result = await res.json();
        // Lưu toàn bộ mảng comments
        setComments(result);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setError("Không thể tải bình luận");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      fetchComments();
    }
  }, [slug]); // Thêm slug vào dependencies

  const handleSubmitComment = async () => {
    // Implement logic để gửi comment
    // ...
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Box p={4} color="red.500">{error}</Box>;
  }

  return (
    <Box my={8}>
      <Heading as="h3" size="lg" mb={6}>
        Bình luận ({comments.length})
      </Heading>
      
      {/* Form thêm bình luận mới */}
      <Box mb={8} bg="gray.50" p={4} borderRadius="md">
        <Heading as="h4" size="md" mb={4}>
          Để lại bình luận
        </Heading>
        <FormControl mb={4}>
          <Textarea
            placeholder="Viết bình luận của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            bg="white"
          />
        </FormControl>
        <Button colorScheme="blue" onClick={handleSubmitComment}>
          Gửi bình luận
        </Button>
      </Box>

      {/* Danh sách bình luận */}
      <VStack spacing={4} align="stretch">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Box key={comment.id} p={4} bg="white" borderRadius="md" boxShadow="sm">
              <Flex mb={2}>
                <Avatar 
                  src={comment.author_avatar_urls['48']} 
                  name={comment.author_name} 
                  mr={3} 
                />
                <Box>
                  <Text fontWeight="bold">{comment.author_name}</Text>
                  <Text fontSize="sm" color="gray.500">
                    {new Date(comment.date).toLocaleDateString('vi-VN', {
                      day: 'numeric',
                      month: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </Text>
                </Box>
              </Flex>
              <Box 
                mt={2}
                dangerouslySetInnerHTML={{ __html: comment.content.rendered }} 
              />
            </Box>
          ))
        ) : (
          <Box p={4} bg="gray.50" borderRadius="md" textAlign="center">
            <Text>Chưa có bình luận nào. Hãy để lại bình luận đầu tiên!</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
