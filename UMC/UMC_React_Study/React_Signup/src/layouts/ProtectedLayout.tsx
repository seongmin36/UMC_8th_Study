import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../component/navBar";
import { useEffect, useState } from "react";
import Footer from "../component/footer";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (accessToken === undefined) return;
    if (!accessToken) {
      navigate("/login", { replace: true });
    }
    setChecking(false);
  }, [navigate, accessToken]);

  if (checking) {
    return <div>로딩 중..</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-16 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
