import { useEffect, useState } from "react";

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/messages/conversations");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
