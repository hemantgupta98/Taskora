import { Notification } from "./notification.model.js";
import { getIO } from "../../middleware/socket.js";

export const createNotification = async ({ userId, type, title, message }) => {
  const notification = await Notification.create({
    user: userId,
    type,
    title,
    message,
  });

  const io = getIO();
  io.to(userId.toString()).emit("new-notification", notification);

  return notification;
};
