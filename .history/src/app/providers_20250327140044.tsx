'use client';

import { ChakraProvider } from "@chakra-ui/react";
import { DefaultLayout } from "@/app/components/templates/DefautLayout";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <DefaultLayout>{children}</DefaultLayout>
      </ChakraProvider>
    </CacheProvider>
  );
}