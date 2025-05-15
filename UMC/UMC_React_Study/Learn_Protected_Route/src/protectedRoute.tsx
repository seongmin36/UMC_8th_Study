import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  role: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role }) => {
  if (!role) {
    return <Navigate to="/" replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
