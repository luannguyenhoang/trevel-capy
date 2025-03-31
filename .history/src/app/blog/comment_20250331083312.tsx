"use client";
import { Banner, Comment, Navbar, Source } from "@/type/types";
import { useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";
import { Avatar, Box, Button, Flex, FormControl, FormLabel, Input, Text, Textarea, useToast, VStack } from "@chakra-ui/react";
import { FormEvent } from "react";

export default function CommentsPost({ slug }: { slug: any }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

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

  const handleSubmitComment = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: parseInt(slug),
          author_name: name,
          author_email: email,
          content: content,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Không thể gửi bình luận');
      }
      
      const newComment = await response.json();
      
      const apiUrl = `${process.env.NEXT_PUBLIC_API_POSTS_URL}${slug}`;
      const res = await fetch(apiUrl, { next: { revalidate: 0 } });
      if (res.ok) {
        const refreshedComments = await res.json();
        setData(refreshedComments);
      }
      
      setName("");
      setEmail("");
      setContent("");
      
      toast({
        title: "Thành công",
        description: "Bình luận của bạn đã được gửi và đang chờ phê duyệt",
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
      console.error(err);
    } finally {
      setSubmitting(false);
    }
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
        Bình luận ({data.length})
      </Text>
      
      {/* Form gửi bình luận */}
      <Box p={4} borderWidth="1px" borderRadius="md" boxShadow="sm">
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
