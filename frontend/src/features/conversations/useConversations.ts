import { useQuery } from "@tanstack/react-query";
import { getConversations as getConversationsApi } from "../../services/apiMessages";

export const useConversations = () => {
  const {
    data: conversations,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversationsApi,
    retry: false,
  });

  return { conversations, error, isLoading, isFetching };
};
