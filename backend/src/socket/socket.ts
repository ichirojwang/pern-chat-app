import { Server } from "socket.io";
import http from "http";

const userSocketMap: { [key: string]: string } = {};

export const initSocket = (server: http.Server) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    const userId = socket.handshake.query.userId as string;

    if (userId) {
      userSocketMap[userId] = socket.id;

      // emit to all connected clients
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    }

    socket.on("disconnect", () => {
      console.log("user disconnected", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

export const getReceiverSocketId = (receiverId: string): string | undefined => {
  return userSocketMap[receiverId];
};
