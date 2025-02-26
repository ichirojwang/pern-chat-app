import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { authUser } = useAuthContext();

  return authUser ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
