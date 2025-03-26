import Loading from "@/components/molecules/Loading";
import { Box, Heading, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SlideConten({ slug }: { slug: string }) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [amThucId, setAmThucId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCategoryIds() {
      try {
        const categoryApiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=${slug}`;
        const categoryRes = await fetch(categoryApiUrl);

        if (!categoryRes.ok) {
          throw new Error("Failed to fetch category");
        }

        const categoryData = await categoryRes.json();

        const amThucApiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/categories?slug=am-thuc`;
        const amThucRes = await fetch(amThucApiUrl);

        if (!amThucRes.ok) {
          throw new Error("Failed to fetch am-thuc category");
        }

        const amThucData = await amThucRes.json();

        if (categoryData.length > 0 && amThucData.length > 0) {
          setCategoryId(categoryData[0].id);
          setAmThucId(amThucData[0].id);
        } else {
          throw new Error("Category not found");
        }
      } catch (err) {
        setLoading(false);
      }
    }

    if (slug) {
      fetchCategoryIds();
    } else {
      fetchPosts(null, null);
    }
  }, [slug]);

  useEffect(() => {
    if (categoryId !== null) {
      if (slug.includes("am-thuc") && amThucId !== null) {
        fetchPosts(categoryId, amThucId);
      } else {
        fetchPosts(categoryId, null);
      }
    }
  }, [categoryId, amThucId, slug]);

  async function fetchPosts(catId: number | null, amThucId: number | null) {
    try {
      let apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?_embed`;

      if (catId !== null) {
        apiUrl += `&categories=${catId}`;
        if (amThucId !== null) {
          apiUrl += `&categories[]=${amThucId}`;
        }
      }

      const res = await fetch(apiUrl);

      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const result = await res.json();
      const filteredPosts = result.filter((post: any) => {
        const postCategories = post.categories || [];
        return amThucId
          ? postCategories.includes(catId) && postCategories.includes(amThucId)
          : postCategories.includes(catId);
      });

      setData(filteredPosts);
    } catch (err) {
      console.error(err);
    }
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
