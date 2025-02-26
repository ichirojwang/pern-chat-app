import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (selectedConversation === null) return;
      setLoading(true);
      setMessages([]);
      try {
        const res = await fetch(`/api/messages/${selectedConversation?.id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getMessages();
  }, [selectedConversation, setMessages]);
  return { messages, loading };
};

export default useGetMessages;
