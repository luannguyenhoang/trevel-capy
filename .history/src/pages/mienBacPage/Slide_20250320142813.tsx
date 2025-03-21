import Loading from "@/components/molecules/Loading";
import { MienBacContentItem } from "@/type/types";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";





export default function SlideConten() {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/baiViet`);
        if (!res.ok) throw new Error("Không tìm thấy bài viết");
        const result = await res.json();
        setData(result);
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
    <Link href={`/BaiViet/${data.slug}`}>
     
    </Link>
  );
}
