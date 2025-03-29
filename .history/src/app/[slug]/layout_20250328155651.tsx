import { getMetadata } from "@/utils/getPageMetadata";
import { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const metadata = await getMetadata(params.slug);
  return {
    ...metadata,
  };
}

export default function MienBacLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

interface A {
  title: string;
  description: string;
}
export const A = (props: A) => {
  const { title,  } = props;
  return <>{title}

  </>;
};
