import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../component/navBar";
import { useEffect } from "react";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login", { replace: true });
    }
  }, [navigate, accessToken]);

  return accessToken ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <></>
  );
};

export default ProtectedLayout;
