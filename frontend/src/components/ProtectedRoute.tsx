import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";
import { useEffect } from "react";

const ProtectedRoute = () => {
  const { user, isLoading, isFetching } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading && !isFetching) navigate("/login");
  }, [user, isLoading, isFetching, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    <Navigate to="/login" replace={true} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
