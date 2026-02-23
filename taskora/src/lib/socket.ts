import { io } from "socket.io-client";

export const socket = io(
  process.env.NEXT_PUBLIC_API_URL2! || "https://taskora-88w5.onrender.com/api",
  {
    autoConnect: false,
  }
);