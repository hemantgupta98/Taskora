import inviteModel from "./invite.model.js";
import sendLink from "./invite.gmail.js";
import dotenv from "dotenv";
import { createNotification } from "../notification/notification.service.js";

dotenv.config();

export const user = async (req, res) => {
  const { teamMembers, email } = req.body;

  try {
    const savedUser = await inviteModel.create({
      teamMembers,
      email,
    });
    res.status(201).json({
      success: true,
      data: savedUser,
      message: "User saved successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "failed to send invite" });
  }
};

export const sendInvite = async (req, res) => {
  const { email, teamMembers } = req.body;
  const link = "https://taskora-peach.vercel.app/acceptInvite";

  if (!process.env.EMAIL_APP_USER || !process.env.EMAIL_APP_PASS) {
    return res.status(503).json({
      success: false,
      message: "Email service is not configured on server",
    });
  }

  if (!Array.isArray(teamMembers) || teamMembers.length === 0) {
    return res.status(400).json({
      success: false,
      message: "teamMembers is required",
    });
  }

  try {
    await inviteModel.create({ teamMembers, email });
    const sent = await sendLink(email, link, teamMembers);
    if (sent) {
      return res
        .status(200)
        .json({ success: true, message: "link sent successfully" });
    }

    data.userId = req.user.id;

    try {
      await createNotification({
        userId: req.user.id,
        type: "INVITE_SEND",
        title: "Invitation send",
        message: `You send a Invite "${doc.title}"`,
      });
    } catch (notifyErr) {
      console.warn("Invite notification failed:", notifyErr.message);
    }

    return res
      .status(500)
      .json({ success: false, message: "Sending link failed" });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ seccess: false, message: "Failed to send link" });
  }
};

export default { user, sendInvite };
