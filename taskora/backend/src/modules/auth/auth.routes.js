import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
  signup,
  login,
  registerUser,
  verifyotp,
  resetpassword,
  logout,
  getUserByGmail,
} from "./auth.controllers.js";
import { verifyToken } from "./auth.middleware.js";

const router = express.Router();
//all are set

// Email / password auth
router.post("/signup", signup);
router.get("/me", verifyToken, async (req, res) => {
  const user = await findUserByEmail(req.user.email);

  return res.json({
    success: true,
    data: {
      userId: user._id,
      email: user.email,
      name: user.name,
    },
  });
});
router.post("/login", login);

// OTP
router.post("/otp", registerUser);
router.post("/verifyotp", verifyotp);
router.post("/resetpassword", resetpassword);
router.post("/logout", logout);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL ?? "https://taskora-peach.vercel.app/"}/login?oauth=failed`,
  }),
  (req, res) => {
    const FRONTEND_URL =
      process.env.FRONTEND_URL ?? "https://taskora-peach.vercel.app/";

    try {
      const user = req.user;
      if (!user) {
        return res.redirect(`${FRONTEND_URL}/login?oauth=missing_user`);
      }

      const secret = process.env.JWT_TOKEN;
      if (!secret) {
        console.error("JWT_SECRET is missing");
        return res.redirect(`${FRONTEND_URL}/login?oauth=server_misconfig`);
      }

      const token = jwt.sign({ id: user._id, email: user.email }, secret, {
        expiresIn: "7d",
      });

      return res.redirect(`${FRONTEND_URL}/dashboard/?token=${token}`);
    } catch (err) {
      return res.redirect(`${FRONTEND_URL}/login?oauth=error`);
    }
  },
);

export default router;
