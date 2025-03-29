import { getMetadata } from "@/utils/getPageMetadata";
import { Metadata } from "next";

const getApiEndpoint = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1];
  
  const endpointMap: Record<string, string> = {
    'mienBac': '/api/mienBac',
    'mienTrung': '/api/mienTrung',
    'mienNam': '/api/mienNam',
  };
  
  return endpointMap[lastSegment] || '/api/default';
};

export async function generateMetadata({ 
  params, 
  pathname 
}: { 
  params: { slug?: string },
  pathname: string 
}): Promise<Metadata> {
  // Xác định endpoint API dựa trên pathname hiện tại
  const apiEndpoint = getApiEndpoint(pathname);
  
  try {
    // Fetch dữ liệu để lấy slug từ API
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}${apiEndpoint}`, { 
      next: { revalidate: 3600 } 
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    
    const result = await res.json();
    const type = result[0]?.type;
    
    if (!type) {
      throw new Error("Type not found in API response");
    }
    
    // Lấy metadata dựa trên type
    const metadata = await getMetadata(type);
    return {
      ...metadata,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    
    // Fallback to default metadata từ pathname
    const fallbackSlug = pathname.split('/').filter(Boolean).pop() || 'default';
    const fallbackMetadata = await getMetadata(fallbackSlug);
    
    return fallbackMetadata || {
      title: "Thông tin",
      description: "Thông tin chi tiết",
    };
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
} 