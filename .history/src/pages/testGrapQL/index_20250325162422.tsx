import Loading from "@/components/molecules/Loading";
import { queryTest } from "@/utils/querys";
import { useEffect, useState } from "react";

export default function GraphQLTest() {
  const [{ data, loading, error }, setState] = useState({
    data: undefined,
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetch("/api/graphQL", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ queryTest }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Có lỗi");
        return res.json();
      })
      .then((result) => setState((prev) => ({ ...prev, data: result.data, loading: false })))
      .catch(() => setState((prev) => ({ ...prev, error: "Có lỗi", loading: false })));
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {data?.allGraphQL?.nodes?.flatMap((node: any, index: number) =>
        node?.graphqlItem?.graphqlChild?.a1?.map((item: any, i: number) => {
          const imageUrl = item?.image?.node?.mediaItemUrl;
          console.log(`URL ảnh thứ ${index}-${i}:`, imageUrl);
          
          return (
            <div key={`${index}-${i}`}>
              <img src={imageUrl} alt={`image-${index}-${i}`} />
            </div>
          );
        })
      )}
    </div>
  );
}
