"use client";
import { Banner, Comment, Navbar, Source } from "@/type/types";
import { useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";
import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";

export default function CommentsPost({ slug }: { slug: any }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_POSTS_URL}${slug}`;
        console.log(apiUrl);
        const res = await fetch(apiUrl, { next: { revalidate: 0 } });
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        setData(result);
        console.log(result);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi");
      } finally {
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    fetchData();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <VStack spacing={4} align="stretch" my={6}>
      <Text fontSize="xl" fontWeight="bold">
        Bình luận ({data.length})
      </Text>
      
      {data && data.length > 0 ? (
        data.map((comment) => (
          <Box 
            key={comment.id} 
            p={4} 
            borderWidth="1px" 
            borderRadius="md" 
            boxShadow="sm"
          >
            <Flex mb={2}>
              <Avatar 
                src={comment.author_avatar_urls['48']} 
                name={comment.author_name} 
                mr={3} 
                size="sm"
              />
              <Box>
                <Text fontWeight="bold">{comment.author_name}</Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(comment.date).toLocaleDateString('vi-VN')}
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
          <Text>Chưa có bình luận nào.</Text>
        </Box>
      )}
    </VStack>
  );
}
