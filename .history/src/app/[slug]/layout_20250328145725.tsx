import { getMetadata } from '@/utils/getPageMetadata';
import { Metadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log('generateMetadata called with params:', params);
  const metadata = await getMetadata(params.slug);
  console.log('Metadata result:', metadata);
  return metadata;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;  // Chỉ return children, không wrap thêm layout
} 