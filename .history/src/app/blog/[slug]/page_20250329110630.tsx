import { Box, Heading } from "@chakra-ui/react";
import styles from "@/styles/Post.module.css";
import { replaceSeoRM } from "@/utils/replaceSeoRM";
import { Metadata } from "next";

// Hàm tạo metadata dành cho trang
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  
  try {
    // Lấy metadata từ RMS API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_RMS_URL}${slug}`,
      { next: { revalidate: 3600 } }
    );

    const rmsData = await response.json();
    const processedHead = replaceSeoRM(rmsData.head);

    const getTitleFromMeta = (head: any) => {
      const match = head.match(
        /<meta\s+property="og:title"\s+content="([^"]*)"/
      );
      return match ? match[1] : null;
    };

    const getDescriptionFromMeta = (head: any) => {
      const match = head.match(
        /<meta\s+property="og:description"\s+content="([^"]*)"/
      );
      return match ? match[1] : null;
    };

    const title = getTitleFromMeta(processedHead) || "Du Lịch Việt Nam";
    const description = getDescriptionFromMeta(processedHead) || "Khám phá vẻ đẹp Việt Nam";

    return {
      title,
      description,
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Du Lịch Việt Nam",
      description: "Khám phá vẻ đẹp Việt Nam",
    };
  }
}

// Hàm lấy dữ liệu bài viết
async function getPostData(slug: string) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?slug=${slug}`;
    const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
    
    if (!res.ok) {
      throw new Error("Không tìm thấy bài viết");
    }
    
    const posts = await res.json();
    return posts[0] || null;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}


export default async function BaiVietDetail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getPostData(slug);

  if (!data) {
    return <div>Không tìm thấy bài viết</div>;
  }

  return (
    <Box pt={"16"} maxW={"7xl"} mx={"auto"}>
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
        dangerouslySetInnerHTML={{ __html: data?.title?.rendered || "" }}
      />
      <div
        className={styles["post__heading"]}
        dangerouslySetInnerHTML={{ __html: data?.content?.rendered || "" }}
      />
    </Box>
  );
}
