"use client";
import { Banner, Comment, Navbar, Source } from "@/type/types";
import { useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";

export default function CommentsPost({ slug }: { slug: any }) {
  const [data, setData] = useState<Source>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_POSTS_URL}${slug}`;
        const res = await fetch(apiUrl, { next: { revalidate: 3600 } });
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        setData(result[0]);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi");
      } finally {
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
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
    <>
      <div
        className={styles["post__heading"]}
        dangerouslySetInnerHTML={{ __html: data?.content?.rendered || "" }}
      />
    </>
  );
}
