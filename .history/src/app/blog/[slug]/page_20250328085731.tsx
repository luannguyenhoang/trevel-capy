"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Box, Heading } from "@chakra-ui/react";
import styles from "@/styles/Post.module.css";
import Loading from "../../components/molecules/Loading";
import Metadata from "../../components/molecules/Metadata";
import { useParams } from "next/navigation";

export default function BaiVietDetail() {
  const { slug } = useParams() as { slug: string };
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?slug=${slug}`;
        const res = await fetch(apiUrl);
        
        if (!res.ok) throw new Error("Không tìm thấy bài viết");
        const result = await res.json();
        
        if (mounted) {
          setData(result[0]);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error:", err);
        if (mounted) {
          setLoading(false);
        }
      }
    }

    if (slug) {
      fetchData();
    }

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) return <Loading />;
  if (!data) return <div>Không tìm thấy bài viết</div>;

  return (
    <Box pt={"16"} maxW={"7xl"} mx={"auto"}>
      <Metadata slug={slug} />
      <Heading
        as="h1"
        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
        fontWeight="bold"
        lineHeight="1.2"
        pb={3}
        textAlign="center"
        position="relative"
        color="gray.800"
        _dark={{ color: "white" }}
        _after={{
          content: '""',
          display: "block",
          width: "100px",
          height: "4px",
          bg: "red.400",
          mx: "auto",
          mt: 4,
          borderRadius: "full",
        }}
        dangerouslySetInnerHTML={{ __html: data.title.rendered }}
      />
      <div
        className={styles["post__heading"]}
        dangerouslySetInnerHTML={{ __html: data.content.rendered }}
      />
    </Box>
  );
}
