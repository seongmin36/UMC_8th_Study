import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../component/navBar";
import Footer from "../component/footer";
import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import SideBar from "../component/sideBar";
import { useAuth } from "../context/AuthContext";

const LayoutContent = () => {
  const { isOpen } = useSidebar();

  const { accessToken } = useAuth();

  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
    return <Navigate to="/login" replace />;
  }

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
