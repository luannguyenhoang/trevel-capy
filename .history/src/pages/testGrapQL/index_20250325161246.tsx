import Loading from "@/components/molecules/Loading";
import { Source } from "@/type/types";
import { useEffect, useState } from "react";

export default function MienBac() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const query = `
          query MyQuery {
            allGraphQL {
              nodes {
                graphqlItem {
                  graphqlChild {
                    a1 {
                      image {
                        node {
                          mediaItemUrl
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        const res = await fetch("/api/graphQL", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) {
          throw new Error("error");
        }
        const result = await res.json();
        setData(result.data);
        log
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
    <div>
      {data?.allGraphQL?.nodes?.map((node: any, index: number) => (
        <div key={index}>
          <img 
            src={node?.graphqlItem?.graphqlChild?.a1?.image?.node?.mediaItemUrl} 
            alt="image"
          />
        </div>
      ))}
    </div>
  );
}
