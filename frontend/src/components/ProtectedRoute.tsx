import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "./Spinner";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, isLoading, isFetching } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isLoading && !isFetching) navigate("/login");
  }, [user, isLoading, isFetching, navigate]);

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  return children;
};

export default ProtectedRoute;
