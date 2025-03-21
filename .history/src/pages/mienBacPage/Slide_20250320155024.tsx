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
        const res = await fetch("/api/baiViet");
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
        {data.map((post: any) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <Heading as="h1" size="lg" color="red.400" mb={2}>
              {post.featured_media.rendered}
            
            </Heading>
            <div
              className={styles["post__heading"]}
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </Link>
        ))}
      </Box>
    </div>
  );
}
