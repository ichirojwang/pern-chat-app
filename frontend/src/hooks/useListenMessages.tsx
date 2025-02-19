import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: MessageType) => {
      newMessage.shouldShake = true;
      const sound = new Audio("/notification.mp3");
      sound.volume = 0.1;
      sound.play();

      if (selectedConversation?.id === newMessage.senderId) {
        setMessages([...messages, newMessage]);
      }
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, messages, setMessages, selectedConversation]);
};

export default useListenMessages;
