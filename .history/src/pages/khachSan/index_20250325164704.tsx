import Loading from "@/components/molecules/Loading";
import Metadata from "@/components/molecules/Metadata";
import { ScrollAnimation } from "@/components/molecules/ScrollAnimation";
import { Source } from "@/type/types";
import { useEffect, useState } from "react";
import { FaWifi, FaCar, FaSwimmingPool, FaUtensils, FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';

export default function KhachSan() {
  const [data, setData] = useState<Source>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/khachSan");
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

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <>
      
    </>
  );
}