import { getMetadata } from '@/utils/getPageMetadata';
import { Metadata } from 'next';

type Props = {
  params: { slug: string }
}


export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
} 