import jwt from "jsonwebtoken";
import { comparePassword } from "./auth.hashed.js";
import { LoginHistory } from "./auth.model.js";
import { createUser, findUserByEmail } from "./auth.service.js";
import sendOtp from "./auth.gmail.js";

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

    const token = jwt.sign({ id: user._id }, "Anshu", { expiresIn: "20h" });

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

const optGenerator = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

export const registerUser = async (req, res) => {
  const { email } = req.body;

  const otp = optGenerator();

  const sent = await sendOtp(email, otp);

  if (sent) return res.status(200).json({ message: "Otp send successfully" });

  res.status(500).json({ message: "Sending otp failed" });
};
