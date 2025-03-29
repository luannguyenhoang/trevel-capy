"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { DefaultLayout } from "@/app/components/templates/DefautLayout";
import { useState, useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  // Sử dụng kỹ thuật tránh hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render toàn bộ nội dung chỉ khi đã mounted trên client
  return (
    <ChakraProvider>
      {isMounted ? (
        <DefaultLayout>{children}</DefaultLayout>
      ) : (
        <div style={{ visibility: "hidden" }}>
          <DefaultLayout>{children}</DefaultLayout>
        </div>
      )}
    </ChakraProvider>
  );
}
