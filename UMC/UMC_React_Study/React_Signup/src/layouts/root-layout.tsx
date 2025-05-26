import { type JSX } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navBar";
import Footer from "../component/footer";
import Sidebar from "../component/sideBar";

const RootLayout = (): JSX.Element => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-16">
        {/* <Sidebar isOpen={...}/> */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;
