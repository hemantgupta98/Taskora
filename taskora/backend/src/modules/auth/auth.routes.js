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
  getProfile,
  updateProfile,
} from "./auth.controllers.js";
import { sendMailSafe } from "../../utils/mailer.js";
import { verifyToken } from "./auth.middleware.js";

const router = express.Router();
const isGoogleConfigured = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
);
//all are set

// Email / password auth
router.post("/signup", signup);
router.get("/me", verifyToken, getProfile);
router.patch("/me", verifyToken, updateProfile);
router.post("/login", login);

// OTP
router.post("/otp", registerUser);
router.post("/verifyotp", verifyotp);
router.post("/resetpassword", resetpassword);
router.post("/logout", logout);
router.get("/mail-test", async (req, res) => {
  const result = await sendMailSafe({
    to: "yourgmail@gmail.com",
    subject: "SMTP Test",
    text: "SMTP working successfully",
    context: "test",
  });

  return res.json(result);
});

router.get(
  "/google",
  (req, res, next) => {
    if (!isGoogleConfigured) {
      return res.status(503).json({
        success: false,
        message: "Google OAuth is not configured on server",
      });
    }

    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  (req, res, next) => {
    if (!isGoogleConfigured) {
      const FRONTEND_URL =
        process.env.FRONTEND_URL ?? "https://taskora-peach.vercel.app/";
      return res.redirect(`${FRONTEND_URL}/login?oauth=google_not_configured`);
    }

    next();
  },
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
