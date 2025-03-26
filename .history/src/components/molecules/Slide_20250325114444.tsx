import Loading from "@/components/molecules/Loading";
import { Box, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SlideConten({ slug }: { slug: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<number[] | null>(null);

  useEffect(() => {
    async function fetchCategoryIds() {
      try {
        // Lấy category ID cho "am-thuc"
        const amThucRes = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=am-thuc`
        );
        const amThucData = await amThucRes.json();

        // Lấy category ID cho miền (bắc/trung/nam)
        const regionRes = await fetch(
          `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=${slug}`
        );
        const regionData = await regionRes.json();

        if (amThucData.length > 0 && regionData.length > 0) {
          // Lưu cả 2 category IDs
          setCategoryId([amThucData[0].id, regionData[0].id]);
        } else {
          throw new Error("Categories not found");
        }
      } catch (err) {
        setLoading(false);
      }
    }

    if (slug) {
      fetchCategoryIds();
    } else {
      fetchPosts(null);
    }
  }, [slug]);

  useEffect(() => {
    if (categoryId !== null) {
      fetchPosts(categoryId);
    }
  }, [categoryId]);
  async function fetchPosts(catIds: number[] | null) {
    try {
      // Nếu có category IDs, query posts có cả 2 categories
      let apiUrl = catIds
        ? `${
            process.env.NEXT_PUBLIC_WORDPRESS_API_URL
          }/posts?_embed&categories=${catIds.join(",")}`
        : `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?_embed`;

      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const result = await res.json();
      // Lọc để chỉ lấy posts có đủ cả 2 categories
      const filteredPosts = catIds
        ? result.filter((post: any) =>
            catIds.every((id) => post.categories.includes(id))
          )
        : result;

      setData(filteredPosts);
    } catch (err) {}
    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Box mb={6} borderColor="gray.200" pb={4}>
        {data.length > 0 ? (
          data.map((post: any) => {
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return (
              <Box
                key={post.id}
                mb={5}
                _hover={{
                  img: {
                    transform: "scale(1.1)",
                  },
                  p: {
                    color: "#359DF3FF",
                  },
                }}
              >
                <Link href={`/blog/${post.slug}`} style={{ display: "block" }}>
                  <Heading as="h1" size="md" color="red.400" mb={2}>
                    {post.title.rendered}
                  </Heading>
                  <Box borderRadius="md" position="relative" overflow="hidden">
                    {featuredImage && (
                      <Image
                        maxHeight="72"
                        width="100%"
                        src={featuredImage}
                        alt={post.title.rendered}
                        borderRadius="md"
                        objectFit="cover"
                        transition="transform 0.3s ease-in-out"
                      />
                    )}
                  </Box>
                  <div
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                </Link>
              </Box>
            );
          })
        ) : (
          <Box textAlign="center" py={10}>
            Không có bài viết nào.
          </Box>
        )}
      </Box>
    </div>
  );
}
