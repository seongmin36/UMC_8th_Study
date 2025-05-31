import { Outlet } from "react-router-dom";
import Navbar from "../component/navBar";
import Footer from "../component/footer";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import SideBar from "../component/sideBar";

const LayoutContent = () => {
  const { isOpen } = useSidebar();

  return (
    <div className="flex flex-col min-h-screen transition-all duration-300">
      <Navbar />
      <SideBar />
      <main
        className={`flex-1 p-6 pt-22 transition-all duration-300 ${
          isOpen ? "ml-40" : "ml-0"
        }`}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const ProtectedLayout = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default ProtectedLayout;
