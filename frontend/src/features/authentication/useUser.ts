import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../services/apiAuth";

export const useUser = () => {
  const {
    data: user,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false, // only try fetching once
  });

  return { user, error, isLoading, isFetching };
};
