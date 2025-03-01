import "./config.js";

import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";
import http from "http";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { initSocket } from "./socket/socket.js";

const app = express();
const __dirname = path.resolve();

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}

const server = http.createServer(app);
const io = initSocket(server);

export { app, server, io };
