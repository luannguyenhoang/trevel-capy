import Loading from "@/components/molecules/Loading";
import Metadata from "@/components/molecules/Metadata";
import { ScrollAnimation } from "@/components/molecules/ScrollAnimation";
import { MienBacContent, Source, TitlesMienBac } from "@/type/types";
import { useEffect, useState } from "react";
import Titles from "../../components/molecules/Title";
import Containers from "@/components/organisms/Content";

export default function MienBac() {
  const [data, setData] = useState<Source>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/mienTrung");
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
    <></>
  );
}
