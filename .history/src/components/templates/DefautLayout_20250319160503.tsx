import { ReactNode } from "react";


export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <WithSubnavigation />
      {children}
      <Footer />
    </>
  );
};
