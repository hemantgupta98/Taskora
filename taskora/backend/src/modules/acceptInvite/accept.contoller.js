import { findUserByEmail, User } from "./accept.service.js";
import acceptModel from "./accept.model.js";

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

export default { accept, getAcceptUsers };
