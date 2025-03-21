import { useEffect, useState } from "react";
import Loading from "@/components/molecules/Loading";

interface MienBacContentItem {
  dia_diem: string;
  hinh_anh: string;
  ghi_chu: string;
  noi_dung: string;
  slug: string;
}

export default function MienBac() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/baiViet");
        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        console.log(result);

        setData(result[0]);
      } catch (err) {
        console.error("Error:", err);
        setError("error ");
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
    <div>
      {data && (
        <>
          <div
            className="text-red-500"
            dangerouslySetInnerHTML={{ __html: data.content.rendered }}
          />
        </>
      )}
    </div>
  );
}
