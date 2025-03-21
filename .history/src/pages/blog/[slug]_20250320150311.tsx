import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "@/components/molecules/Loading";

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
        console.log("----" + apiUrl);

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
    <div>
      <h1>{data.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
    </div>
  );
}
