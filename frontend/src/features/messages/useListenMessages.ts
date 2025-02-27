// listen for newMessage from socket

import { useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { useQueryClient } from "@tanstack/react-query";

export const useListenMessages = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket?.on("newMessage", (newMessage: MessageType) => {
      newMessage.shouldShake = true;
      const sound = new Audio("/notification.mp3");
      sound.volume = 0.1;
      sound.play();
      queryClient.invalidateQueries({ queryKey: ["messages", newMessage.senderId] });
    });

    return () => {
      socket?.off("newMessage");
    };
  }, [socket, queryClient]);
};
