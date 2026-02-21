import jwt from "jsonwebtoken";
import { comparePassword, hashpassword } from "./auth.hashed.js";
import { LoginHistory } from "./auth.model.js";
import {
  createUser,
  findUserByEmail,
  createResetPasswordRecord,
} from "./auth.service.js";
import sendOtp from "./auth.gmail.js";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await findUserByEmail(email);

    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await createUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

export const getUserByGmail = async (req, res) => {
  const { email } = req.query;
  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email query param is required",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not registered. Please sign up first.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Get user by gmail error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    await LoginHistory.create({
      userId: user._id,
      email: user.email,
    });

    const jwtToken = process.env.JWT_TOKEN;
    const token = jwt.sign({ id: user._id }, jwtToken, { expiresIn: "20h" });

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(500).json({ message: "Login failed" });
  }
};

const otpGenerator = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const registerUser = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = otpGenerator();
    const hashedOtp = await hashpassword(otp);
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

    user.otpCode = hashedOtp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    const sent = await sendOtp(email, otp);
    if (sent) {
      return res
        .status(200)
        .json({ success: true, message: "OTP sent successfully" });
    }

    return res
      .status(500)
      .json({ success: false, message: "Sending OTP failed" });
  } catch (error) {
    console.log("Register OTP error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const verifyotp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.otpCode || !user.otpExpiresAt) {
      return res.status(400).json({ message: "No OTP requested" });
    }

    if (user.otpExpiresAt < new Date()) {
      return res.status(410).json({ message: "OTP expired" });
    }

    const isValid = await comparePassword(otp, user.otpCode);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    user.otpCode = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return res.status(200).json({ success: true, message: "OTP verified" });
  } catch (error) {
    console.log("Verify OTP error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const resetpassword = async (req, res) => {
  const { email, otp, newPassword, confirmPassword } = req.body;

  if (!email || !otp || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otpExpiresAt < new Date()) {
      return res.status(410).json({ message: "OTP expired" });
    }

    {
      /**if (!user.otpCode || !user.otpExpiresAt) {
      return res.status(400).json({ message: "OTP already used or expired" });
    } */
    }

    user.password = newPassword;
    user.otpCode = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    // Record the reset event in the "resetpassword" collection
    await createResetPasswordRecord(user);

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
