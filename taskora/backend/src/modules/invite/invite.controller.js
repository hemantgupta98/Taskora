import inviteModel from "./invite.model.js";
import sendLink from "./invite.gmail.js";
import dotenv from "dotenv";

dotenv.config();

export const user = async (req, res) => {
  const { name, email } = req.body;

  try {
    const savedUser = await inviteModel.create({
      name,
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

export const check = async (req, res) => {
  const { email } = req.body;
  const link = "http://taskora.com/join/team-abc-123";
  try {
    const sent = await sendLink(email, link);
    if (sent) {
      return res
        .status(200)
        .json({ success: true, message: "link sent successfully" });
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

export default { user, check };
