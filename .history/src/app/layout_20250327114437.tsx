'use client';
import { ChakraProvider } from "@chakra-ui/react";
import { DefaultLayout } from "@/app/components/templates/DefautLayout";

  

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <DefaultLayout>
            {children}
          </DefaultLayout>
        </ChakraProvider>
      </body>
    </html>
  )
}
