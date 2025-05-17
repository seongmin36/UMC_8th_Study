import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../component/navBar";
import { useEffect, useState } from "react";

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
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
