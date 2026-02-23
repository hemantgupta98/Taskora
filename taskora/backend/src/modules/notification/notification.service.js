import { Notification } from "./notification.model.js";
import { getIO } from "../../middleware/socket.js";

export const createNotification = async ({ userId, type, title, message }) => {
  const notification = await Notification.create({
    user: userId,
    type,
    title,
    message,
  });

  try {
    const io = getIO();
    io.to(userId.toString()).emit("new-notification", notification);
  } catch (error) {
    console.warn("Socket emit skipped:", error.message);
  }

  return notification;
};
