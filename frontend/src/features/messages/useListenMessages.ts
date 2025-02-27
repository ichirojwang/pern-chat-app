// listen for newMessage from socket

import { useSocket } from "../../context/SocketContext";

export const useListenMessages = () => {
  const { socket } = useSocket();
  
  
};
