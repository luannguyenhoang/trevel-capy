import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import { useEffect, useState } from "react";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import Loading from "@/components/molecules/Loading";
import Link from "next/link";

export default function SlideConten() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/baiViet");
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
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
      {data && data.map((post: any) => (
        <ScrollAnimation key={post.id} delay={0.3}>
          <Link href={`/blog/${post.slug}`}>
            <Box display="flex" mb={6} borderColor="gray.200" pb={4}>
              {/* ... phần code hiển thị bài viết ... */}
            </Box>
          </Link>
        </ScrollAnimation>
      ))}
    </div>
  );
}
