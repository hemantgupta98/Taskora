import jwt from "jsonwebtoken";
import { comparePassword, hashpassword } from "./auth.hashed.js";
import { LoginHistory, User, googleDB } from "./auth.model.js";
import {
  createUser,
  findUserByEmail,
  createResetPasswordRecord,
} from "./auth.service.js";
import sendOtp from "./auth.gmail.js";
import { isMailConfigured } from "../../utils/mailer.js";

const issueAuthToken = (res, userId, expiresIn = "20h") => {
  const jwtToken = process.env.JWT_TOKEN;
  if (!jwtToken) {
    throw new Error("JWT token secret is missing");
  }

  const token = jwt.sign({ id: userId }, jwtToken, { expiresIn });

  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("auth_token", token, {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    maxAge: 20 * 60 * 60 * 1000,
  });

  return token;
};

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await findUserByEmail(email);

    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }

    const user = await createUser({ name, email, password });
    const issueSignupToken = process.env.ISSUE_SIGNUP_TOKEN !== "false";
    const token = issueAuthToken(res, user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      ...(issueSignupToken ? { token } : {}),
      user: {
        id: user._id,
        email: user.email,
      },
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
    const token = issueAuthToken(res, user._id);

    return res.status(200).json({
      success: true,
      token,
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
      reason: mailResult?.reason || "mail_send_failed",
      mode: mailResult?.mode || "unknown",
      message: "Server error",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    let user = await User.findById(userId).select(
      "_id name email username contact address bio",
    );

    if (!user) {
      user = await googleDB
        .findById(userId)
        .select("_id name email username contact address bio");
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        userId: user._id,
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        contact: user.contact || "",
        address: user.address || "",
        bio: user.bio || "",
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user?.id;
    const editableFields = ["username", "contact", "address", "bio"];
    const updates = {};

    for (const key of editableFields) {
      if (req.body[key] !== undefined) {
        updates[key] = String(req.body[key] ?? "").trim();
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No profile fields provided for update",
      });
    }

    let user = await User.findById(userId);

    if (!user) {
      user = await googleDB.findById(userId);
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    Object.assign(user, updates);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        userId: user._id,
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        contact: user.contact || "",
        address: user.address || "",
        bio: user.bio || "",
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
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

    const token = issueAuthToken(res, user._id);

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
  const normalizedEmail = String(req.body?.email || "")
    .trim()
    .toLowerCase();

  if (!normalizedEmail) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  const emailPattern = /^\S+@\S+\.\S+$/;
  if (!emailPattern.test(normalizedEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (!isMailConfigured()) {
    return res.status(503).json({
      success: false,
      message:
        "Email service is not configured. Set EMAIL_APP_USER/EMAIL_APP_PASS or Google OAuth mail credentials.",
    });
  }

  try {
    const user = await findUserByEmail(normalizedEmail);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = otpGenerator();
    const hashedOtp = await hashpassword(otp);
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

    user.otpCode = hashedOtp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    const mailResult = await sendOtp(normalizedEmail, otp);
    if (mailResult?.success) {
      return res
        .status(200)
        .json({ success: true, message: "OTP sent successfully" });
    }

    user.otpCode = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    return res.status(502).json({
      success: false,
      reason: mailResult?.reason || "mail_send_failed",
      message: mailResult?.message || "Unable to send OTP email",
    });
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
    const isProduction = process.env.NODE_ENV === "production";

    res.clearCookie("auth_token", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
    });

    res.clearCookie("token", {
      httpOnly: true,
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
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
