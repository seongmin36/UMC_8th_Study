import { type JSX } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../component/navBar";
import Footer from "../component/footer";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import SideBar from "../component/sideBar";

const RootLayout = (): JSX.Element => {
  const { isOpen } = useSidebar();
  return (
    <>
      <div className="flex flex-col min-h-screen transition-all duration-300">
        <Navbar />
        <SideBar />
        <main className={`p-6 pt-22 ${isOpen ? "ml-50" : "ml-0"}`}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

const RootedLayout = () => {
  return (
    <SidebarProvider>
      <RootLayout />
    </SidebarProvider>
  );
};

export default RootedLayout;
