import Navbar from "@/components/navbar/Navbar";
import { Provider } from "@/components/ui/provider";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider>
      <div>
        <Navbar />
        {children}
      </div>
    </Provider>
  );
};
export default Layout;
