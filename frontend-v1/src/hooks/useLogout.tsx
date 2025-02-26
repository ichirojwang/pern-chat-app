import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { BASE_URL } from "../constants";
import useConversation from "../zustand/useConversation";

const useLogout = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setAuthUser } = useAuthContext();
  const { setSelectedConversation, setMessages } = useConversation();

  const logout = async () => {
    setLoading(false);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setAuthUser(null);
      setSelectedConversation(null);
      setMessages([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
