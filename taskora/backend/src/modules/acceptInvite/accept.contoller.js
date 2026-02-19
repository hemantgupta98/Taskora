import { findUserByEmail, User } from "./accept.service.js";
import acceptModel from "./accept.model.js";
import inviteModel from "../invite/invite.model.js";

export const accept = async (req, res) => {
  const { name, phone, email, password, confirmpassword } = req.body;

  try {
    const userExist = await findUserByEmail(email);
    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const savedUser = await User({
      name,
      phone,
      email,
      password,
      confirmpassword,
    });
    res.status(201).json({
      success: true,
      data: savedUser,
      message: "accept user saved",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to send the data",
    });
    console.log(error);
  }
};

export const getAcceptUsers = async (req, res) => {
  try {
    const users = await acceptModel.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Accept API error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getInvitedTeamMember = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "email is required",
    });
  }

  try {
    const invite = await inviteModel
      .findOne({ email: String(email).trim() })
      .sort({ createdAt: -1 });

    if (!invite) {
      return res.status(404).json({
        success: false,
        message: "Invite not found",
      });
    }

    const teamMembers = Array.isArray(invite.teamMembers)
      ? invite.teamMembers
      : [];

    return res.status(200).json({
      success: true,
      data: {
        email: invite.email,
        teamMember: teamMembers[0] ?? "",
        teamMembers,
      },
    });
  } catch (error) {
    console.error("Fetch invited team member API error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteTeamMemeber = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlan = await acceptModel.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({
        success: false,
        message: "Team member not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team member deleted successfully",
    });
  } catch (error) {
    console.error("Delete plan error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default {
  accept,
  getAcceptUsers,
  getInvitedTeamMember,
  deleteTeamMemeber,
};
