import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "../components/molecules/Loading";

const HotelDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/graphQLs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_KHACHSAN_BY_ZOOMNAME,
          }),
        });
        const result = await res.json();
        const roomDetail = result.data?.allKhachSan?.nodes?.[0]?.cardZoom?.roomCardChild?.find(
          (room: any) => room.cardContent.slug === slug
        );
        if (roomDetail) {
          setData(roomDetail.cardContent);
        } else {
          // Xử lý lỗi không tìm thấy phòng
        }
      } catch (error) {
        // Xử lý lỗi khi fetching data
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) return <Loading />;
  return <div>{/* Render thông tin chi tiết phòng */}</div>;
};

export default HotelDetail;
