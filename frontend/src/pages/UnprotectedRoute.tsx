import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function UnprotectedRoute() {
  const { authUser } = useAuthContext();

  return authUser ? <Navigate to="/" /> : <Outlet />;
}

export default UnprotectedRoute;
