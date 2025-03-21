import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import { useEffect, useState } from "react";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import Loading from "@/components/molecules/Loading";
import Link from "next/link";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import styles from "@/styles/Post.module.css";

export default function SlideConten() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?_embed`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
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
      <Box mb={6} borderColor="gray.200" pb={4}>
        {data.map((post: any) => {
          const featuredImage =
            post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

          return (
            <Link
              className={styles["post__heading"]}
              key={post.id}
              href={`/blog/${post.slug}`}
            >
              <Heading as="h1" size="md" color="red.400" mb={2}>
                {post.title.rendered}
              </Heading>
              <Box
                borderRadius="md"
                position="relative"
                overflow="hidden"
                maxHeight="72"
                width="100%"
              >
                {featuredImage && (
                  <Image
                    maxHeight="72"
                    width="100%"
                    src={featuredImage}
                    alt={post.title.rendered}
                    borderRadius="md"
                    mb={2}
                    objectFit="cover"
                  />
                )}
              </Box>
              {/* <div
                  className={styles["post__heading"]}
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                /> */}
              <div
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
            </Link>
          );
        })}
      </Box>
    </div>
  );
}
