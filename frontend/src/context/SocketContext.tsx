import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const socketUrl = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

interface ContextProps {
  socket: Socket | null;
  onlineUsers: string[];
}
const SocketContext = createContext<ContextProps>({
  socket: null,
  onlineUsers: [],
});

interface ProviderProps {
  children: ReactNode;
}

const SocketContextProvider = ({ children }: ProviderProps) => {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (user && !isLoading) {
      const socket = io(socketUrl, { query: { userId: user.id } });

      socketRef.current = socket;
      socket.on("getOnlineUsers", (users: string[]) => {
        setOnlineUsers(users);
      });

      // close connection on cleanup
      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (!user && !isLoading && socketRef.current) {
      // close connection if user not auth'd
      socketRef.current.close();
      socketRef.current = null;
    }
  }, [user, isLoading]);

  return (
    <SocketContext.Provider value={{ onlineUsers, socket: socketRef.current }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("SocketContext used outside SocketContextProvider");
  }

  return context;
};

export default SocketContextProvider;
