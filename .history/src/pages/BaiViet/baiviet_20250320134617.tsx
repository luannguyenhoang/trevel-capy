import { ScrollAnimation } from "@/components/organisms/ScrollAnimation";
import { useEffect, useState } from "react";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import Loading from "@/components/molecules/Loading";

export default function MienBac() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Replace with your WordPress site's API endpoint
        const res = await fetch("https://your-wordpress-site.com/wp-json/wp/v2/posts");
        if (!res.ok) {
          throw new Error("Failed to fetch data from WordPress");
        }
        const result = await res.json();
        console.log(result);

        // Assuming you want the first post; adjust as needed
        setData(result[0]);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi khi tải dữ liệu từ WordPress");
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

  // Render WordPress data (e.g., title and content)
  return (
    <div>
      {data && (
        <>
          <h1>{data.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </>
      )}
      {/* Add ScrollAnimation or other components as needed */}

    </div>
  );
}