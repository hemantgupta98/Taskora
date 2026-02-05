import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
  signup,
  login,
  registerUser,
  verifyotp,
  resetpassword,
} from "./auth.controllers.js";

const router = express.Router();

// Email / password auth
router.post("/signup", signup);
router.post("/login", login);

// OTP
router.post("/otp", registerUser);
router.post("/verifyotp", verifyotp);
router.post("/resetpassword", resetpassword);

// Google OAuth start
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Google OAuth callback (ONLY ONE)
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL ?? "http://localhost:3000"}/login?oauth=failed`,
  }),
  (req, res) => {
    const FRONTEND_URL = process.env.FRONTEND_URL ?? "http://localhost:3000";

    try {
      const user = req.user;
      if (!user) {
        return res.redirect(`${FRONTEND_URL}/login?oauth=missing_user`);
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.redirect(`${FRONTEND_URL}/login?oauth=server_misconfig`);
      }

      const token = jwt.sign({ id: user._id, email: user.email }, secret, {
        expiresIn: "7d",
      });

      return res.redirect(`${FRONTEND_URL}/dashboard/?token=${token}`);
    } catch {
      return res.redirect(`${FRONTEND_URL}/login?oauth=error`);
    }
  },
);

export default router;
