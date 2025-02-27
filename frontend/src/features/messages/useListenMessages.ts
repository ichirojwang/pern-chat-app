// listen for newMessage from socket

import { useCallback, useRef } from "react";
import { useSocket } from "../../context/SocketContext";

export const useListenMessages = () => {
  const { socket } = useSocket();
  const listenerAdded = useRef<boolean>(false);

  const handleNewMessage = useCallback((newMessage: MessageType) => {
    newMessage.shouldShake = true;
    const sound = new Audio("/notification.mp3");
    sound.volume = 0.1;
    sound.play();
  }, []);

  if (socket && !listenerAdded.current) {
    socket.on("newMessage", handleNewMessage);
    listenerAdded.current = true;
  }
};
