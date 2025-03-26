import Loading from "@/components/molecules/Loading";
import { Box, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SlideConten({ slug }: { slug: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const pathname = usePathname();
  const isAmThucPage = pathname?.includes("am-thuc");

  useEffect(() => {
    async function fetchCategoryId() {
      try {
        if (isAmThucPage) {
          // Nếu đang ở trang ẩm thực, lấy cả 2 categories
          const amThucRes = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=am-thuc`
          );
          const amThucData = await amThucRes.json();

          const regionRes = await fetch(
            `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=${slug}`
          );
          const regionData = await regionRes.json();

          if (amThucData.length > 0 && regionData.length > 0) {
            setCategoryId([amThucData[0].id, regionData[0].id]);
          }
        } else {
          // Nếu không phải trang ẩm thực, chỉ lấy 1 category
          const categoryApiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=${slug}`;
          const categoryRes = await fetch(categoryApiUrl);
          const categoryData = await categoryRes.json();

          if (categoryData.length > 0) {
            setCategoryId(categoryData[0].id);
          }
        }
      } catch (err) {
        setLoading(false);
      }
    }

    if (slug) {
      fetchCategoryId();
    } else {
      fetchPosts(null);
    }
  }, [slug, isAmThucPage]);

  useEffect(() => {
    if (categoryId !== null) {
      fetchPosts(categoryId);
    }
  }, [categoryId]);

  async function fetchPosts(catId: number | number[] | null) {
    try {
      let apiUrl;
      if (Array.isArray(catId)) {
        apiUrl = `${
          process.env.NEXT_PUBLIC_WORDPRESS_API_URL
        }/posts?_embed&categories=${catId.join(",")}`;
      } else {
        apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?_embed${
          catId ? `&categories=${catId}` : ""
        }`;
      }

      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const result = await res.json();

      const filteredPosts =
        Array.isArray(catId) && isAmThucPage
          ? result.filter((post: any) =>
              catId.every((id) => post.categories.includes(id))
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
