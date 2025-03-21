import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import { useEffect, useState } from "react";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import Loading from "@/components/molecules/Loading";
import Link from "next/link";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";

export default function SlideConten() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        console.log(result);

        setData(result);
      } catch (err) {
        console.error("Error:", err);
        setError("error");
      } finally {
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
         <Box
          display="flex"
          mb={6}
       
          borderColor="gray.200"
          pb={4}
        >
          <Box width="100px" height="80px" mr={4}>
            <Image
              width="100%"
              height="100%"
              borderRadius="md"
    
              
              objectFit="cover"
            />
          </Box>

          <Box flex={1}>
            <Heading as="h3" size="sm" fontWeight="bold" mb={1}>
              {group.dia_diem}
            </Heading>

            <HStack spacing={1} mb={1}>
              <Text color="yellow.400" fontSize="xs">
                ★★★★★
              </Text>
              <Text color="blue.600" fontSize="sm" fontWeight="bold">
                8.8/10
              </Text>
            </HStack>

            <Text color="gray.600" fontSize="sm" mb={1}>
            
            </Text>

            <Text as="s" color="gray.500" fontSize="xs">
              1.084.914 VND
            </Text>

            <Text color="orange.500" fontWeight="bold" fontSize="sm">
              934.330 VND
            </Text>
          </Box>
        </Box>
      {data.map((post: any) => (
        <Link href={`/blog/${post.slug}`}>
          <h1>{post.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </Link>
      ))}
    </div>
  );
}
