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
      <Box  mb={6} borderColor="gray.200" pb={4}>
        {data.map((post: any) => (
          <Link href={`/blog/${post.slug}`}>
            <h1>{post.title.rendered}</h1>
            <div className="mb-8 " dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </Link>
        ))}
      </Box>
    </div>
  );
}
