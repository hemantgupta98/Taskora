import app from "./app.js";
import connectDB from "../src/config/db.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();

const port = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });

  app.set("io", io);

  server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

startServer();
