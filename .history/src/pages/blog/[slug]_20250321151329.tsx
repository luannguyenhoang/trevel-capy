import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/molecules/Loading";
import Metadata from "@/components/molecules/Metadata";
import { Box } from "@chakra-ui/react";

export default function BaiVietDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts?slug=${slug}`;

        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Không tìm thấy bài viết");
        const result = await res.json();
        setData(result[0]);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [slug]);

  if (loading) return <Loading />;
  if (!data) return <div>Không tìm thấy bài viết</div>;

  return (
    <Box pt={"16"}>
      <Metadata slug={slug} />
      <h1>{data.title.rendered}</h1>
       {/* <div
                  className={styles["post__heading"]}
                  dangerouslySetInnerHTML={{ __html: post.content.rendered }}
                /> */}
      <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
    </Box>
  );
}
