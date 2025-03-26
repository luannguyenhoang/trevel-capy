import Loading from "@/components/molecules/Loading";
import { Box, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

type Post = {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
};

export default function SlideConten({ slug }: { slug: string }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isAmThucPage = pathname?.includes("am-thuc");

  const baseApiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  const fetchCategoryBySlug = useCallback(
    async (categorySlug: string) => {
      const res = await fetch(`${baseApiUrl}/categories?slug=${categorySlug}`);
      if (!res.ok)
        throw new Error(`Không thể lấy thông tin category: ${categorySlug}`);
      return await res.json();
    },
    [baseApiUrl]
  );

  const fetchPosts = useCallback(async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      let categoryIds: number[] = [];

      if (isAmThucPage) {
        const [amThucData, regionData] = await Promise.all([
          fetchCategoryBySlug("am-thuc"),
          fetchCategoryBySlug(slug),
        ]);

        if (amThucData.length > 0 && regionData.length > 0) {
          categoryIds = [amThucData[0].id, regionData[0].id];
        }
      } else {
        const regionData = await fetchCategoryBySlug(slug);
        if (regionData.length > 0) {
          categoryIds = [regionData[0].id];
        }
      }

      if (categoryIds.length === 0) {
        setPosts([]);
          (false);
        return;
      }

      const apiUrl = `${baseApiUrl}/posts?_embed&categories=${categoryIds.join(
        ","
      )}`;
      const res = await fetch(apiUrl);

      if (!res.ok) throw new Error("Không thể lấy danh sách bài viết");

      const data: Post[] = await res.json();

      const filteredPosts = isAmThucPage
        ? data.filter((post) =>
            categoryIds.every((id) => post.categories.includes(id))
          )
        : data.filter(
            (post) =>
              post.categories.length === 1 &&
              post.categories.includes(categoryIds[0])
          );

      setPosts(filteredPosts);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [slug, isAmThucPage, fetchCategoryBySlug, baseApiUrl]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Box mb={6} borderColor="gray.200" pb={4}>
        {posts.length > 0 ? (
          posts.map((post) => {
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null;

            return (
              <Box
                key={post.id}
                mb={5}
                _hover={{
                  img: { transform: "scale(1.1)" },
                  p: { color: "#359DF3FF" },
                }}
              >
                <Link href={`/blog/${post.slug}`} style={{ display: "block" }}>
                  <Heading as="h1" size="md" color="red.400" mb={2}>
                    {post.title.rendered}
                  </Heading>
                  {featuredImage && (
                    <Box
                      borderRadius="md"
                      position="relative"
                      overflow="hidden"
                    >
                      <Image
                        maxHeight="72"
                        width="100%"
                        src={featuredImage}
                        alt={post.title.rendered}
                        borderRadius="md"
                        objectFit="cover"
                        transition="transform 0.3s ease-in-out"
                      />
                    </Box>
                  )}
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
