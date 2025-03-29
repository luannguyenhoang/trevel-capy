import { getMetadata } from "@/utils/getPageMetadata";
import { Metadata } from "next";


export default function MienBacLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

