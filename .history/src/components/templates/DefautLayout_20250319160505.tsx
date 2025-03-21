import { ReactNode } from "react";
import WithSubnavigation from "../molecules/Navbar";


export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <WithSubnavigation />
      {children}
      <Footer />
    </>
  );
};
