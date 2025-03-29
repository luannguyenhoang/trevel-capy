import { getMetadata } from '@/utils/getPageMetadata';
import { Metadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const metadata = await getMetadata(params.slug);
  return {
    ...metadata
  }
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;  // Chỉ return children, không wrap thêm layout
} 