import Metadata from "@/components/molecules/Metadata";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const api_rm_url = process.env.NEXT_PUBLIC_API_RMS_URL || "";
  const api_url = `${api_rm_url}/example-page`;

  try {
    const res = await fetch(api_url);
    if (!res.ok) {
      throw new Error(`Fetch failed with status: ${res.statusText}`);
    }
    const data = await res.json();
    return {
      props: {
        head: data?.head || null
      }
    };
  } catch (error) {
    console.error("Error fetching SEO data:", error);
    return {
      props: {
        head: null
      }
    };
  }
};

const ExamplePage = (props: any) => {
  return (
    <>
      <Metadata 
        head={props.head}
        defaultTitle="Trang Ví Dụ - Du Lịch Việt Nam" 
        defaultDescription="Đây là trang ví dụ sử dụng component Metadata"
      />
      <main>
        <h1>Trang Ví Dụ</h1>
        <p>Nội dung trang ví dụ</p>
      </main>
    </>
  );
};

export default ExamplePage; 