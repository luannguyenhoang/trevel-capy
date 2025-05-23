import Loading from "@/components/molecules/Loading";
import type { AmThuc as AmThucType } from "@/type/types";
import { useEffect, useState } from "react";
import Containers from "./Containers";

export default function AmThucPage() {
  const [data, setData] = useState<AmThucType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/amThuc");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Error:", err);
        setError("Có lỗi khi tải dữ liệu");
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

  return <Containers amThucData={data} />;
}
