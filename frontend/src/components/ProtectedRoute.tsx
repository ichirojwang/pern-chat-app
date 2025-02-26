import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    navigate("/login");
  }

  return <Outlet />;
};

export default ProtectedRoute;
