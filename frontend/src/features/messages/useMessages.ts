import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMessages as getMessagesApi } from "../../services/apiMessages";

export const useMessages = () => {
  const { id } = useParams();

  const {
    data: messages,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["messages", id],
    queryFn: () => {
      if (!id) {
        throw new Error("No conversation ID given, can't retrieve messages");
      }
      return getMessagesApi({ id });
    },
    enabled: Boolean(id),
    retry: 1,
  });

  return { messages, error, isLoading, isFetching };
};
