import inviteModel from "./invite.model.js";
import sendLink from "./invite.gmail.js";
import { createNotification } from "../notification/notification.service.js";
import { isMailConfigured } from "../../utils/mailer.js";
import { verifyMailTransport } from "../../utils/mailer.js";

export const user = async (req, res) => {
  const { teamMembers, email } = req.body;

  try {
    const normalizedMembers = Array.isArray(teamMembers)
      ? teamMembers.join(", ")
      : String(teamMembers || "").trim();

    const savedUser = await inviteModel.create({
      userId: req.user.id,
      teamMembers: normalizedMembers,
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

  if (!isMailConfigured()) {
    return res.status(503).json({
      success: false,
      reason: "mail_not_configured",
      mode: "none",
      message:
        "Email service is not configured. Set EMAIL_APP_USER/EMAIL_APP_PASS or Google OAuth mail credentials.",
    });
  }

  const normalizedMembers = Array.isArray(teamMembers)
    ? teamMembers.map((member) => String(member || "").trim()).filter(Boolean)
    : String(teamMembers || "")
        .split(",")
        .map((member) => member.trim())
        .filter(Boolean);

  if (normalizedMembers.length === 0) {
    return res.status(400).json({
      success: false,
      message: "teamMembers is required",
    });
  }

  try {
    await inviteModel.create({
      userId: req.user.id,
      teamMembers: normalizedMembers.join(", "),
      email,
    });

    const mailResult = await sendLink(email, link, normalizedMembers);
    if (mailResult?.success) {
      try {
        await createNotification({
          userId: req.user.id,
          type: "INVITE_SEND",
          title: "Invitation sent",
          message: `Invitation sent to ${email}`,
        });
      } catch (notifyErr) {
        console.warn("Invite notification failed:", notifyErr.message);
      }

      return res
        .status(200)
        .json({ success: true, message: "link sent successfully" });
    }

    return res.status(502).json({
      success: false,
      reason: mailResult?.reason || "mail_send_failed",
      mode: mailResult?.mode || "unknown",
      message: mailResult?.message || "Sending invite link failed",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, message: "Failed to send link" });
  }
};

export const mailHealth = async (_req, res) => {
  try {
    const result = await verifyMailTransport();
    return res.status(result.success ? 200 : 503).json(result);
  } catch (error) {
    return res.status(500).json({
      success: false,
      reason: "mail_health_failed",
      message: "Failed to verify mail transport",
    });
  }
};

export default { user, sendInvite };
