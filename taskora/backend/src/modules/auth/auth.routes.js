import express from "express";
import {
  signup,
  login,
  registerUser,
  verifyotp,
  resetpassword,
} from "./auth.controllers.js";

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

export default router;
