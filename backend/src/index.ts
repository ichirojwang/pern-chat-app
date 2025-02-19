import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { initSocket } from "./socket/socket.js";

dotenv.config(); // access .env

const app = express();
const server = http.createServer(app);

app.use(cookieParser()); // to parse cookies
app.use(express.json()); // to parse json data
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const io = initSocket(server);

export { app, server, io };
