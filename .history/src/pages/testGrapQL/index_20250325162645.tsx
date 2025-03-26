import Loading from "@/components/molecules/Loading";
import { queryTest } from "@/utils/querys";
import { useEffect, useState } from "react";

export default function GraphQLTest() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Tách logic fetch data ra function riêng
  const fetchGraphQLData = async () => {
    try {
      const res = await fetch("/api/graphQL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ queryTest }),
      });

      if (!res.ok) {
        throw new Error("Lỗi khi tải dữ liệu");
      }

      const result = await res.json();
      setData(result.data);
    } catch (err) {
      setError("Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGraphQLData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;
  if (!data) return <div>Không có dữ liệu</div>;

  const renderImages = () => {
    return data.allGraphQL.nodes.map((node: any, index: number) => (
      node?.graphqlItem?.graphqlChild?.a1.map((item: any, i: number) => {
        const imageUrl = item?.image?.node?.mediaItemUrl;
        
        return (
          <div key={`${index}-${i}`} className="image-container">
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt={`Hình ảnh ${index}-${i}`}
                loading="lazy"
              />
            )}
          </div>
        );
      })
    ));
  };

  return <div className="images-grid">{renderImages()}</div>;
}
