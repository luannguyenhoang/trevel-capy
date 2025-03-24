import Loading from "@/components/molecules/Loading";
import { Box, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SlideConten({ slug }: { slug: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCategoryId() {
      try {
        const categoryApiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=${slug}`;
        const categoryRes = await fetch(categoryApiUrl);

        if (!categoryRes.ok) {
          throw new Error("Failed to fetch category");
        }

        const categoryData = await categoryRes.json();

        if (categoryData.length > 0) {
          setCategoryId(categoryData[0].id);
        } else {
          throw new Error("Category not found");
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
  }, [slug]);

  useEffect(() => {
    if (categoryId !== null) {
      fetchPosts(categoryId);
    }
  }, [categoryId]);

  async function fetchPosts(catId: number | null) {
    try {
      let apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?_embed&categories=${catId}`;

      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }

      const result = await res.json();
      setData(result);
      setLoading(false);
    } catch (err) {
    } finally {
      setLoading(false);
    
    }
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
