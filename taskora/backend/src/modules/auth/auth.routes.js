import express from "express";
import jwt from "jsonwebtoken";
import {
  signup,
  login,
  registerUser,
  verifyotp,
  resetpassword,
} from "./auth.controllers.js";
import passport from "passport";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/otp", registerUser);
router.post("/verifyotp", verifyotp);
router.post("/resetpassword", resetpassword);

router.get("/otp", (req, res) => {
  res.send("Babe");
});

router.get("/resetpassword", (req, res) => {
  res.send("Baby");
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    // redirect to frontend with token
    res.redirect(`http://localhost:3000/auth/success?token=${token}`);
  },
);

export default router;
