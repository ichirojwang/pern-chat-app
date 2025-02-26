import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../services/apiAuth";

export const useUser = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
  });

  return { user, error, isLoading };
};
