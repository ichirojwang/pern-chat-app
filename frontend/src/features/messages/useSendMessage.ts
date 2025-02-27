import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { sendMessage as sendMessageApi } from "../../services/apiMessages";

interface MutationProps {
  body: string;
}

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();

  const { mutate: sendMessage, isPending: isSending } = useMutation({
    mutationFn: ({ body }: MutationProps) => {
      if (!id) {
        throw new Error("No conversation ID given, can't send message");
      }
      return sendMessageApi({ id, body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", id] });
    },
  });

  return { sendMessage, isSending };
};
