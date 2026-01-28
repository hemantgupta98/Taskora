import express from "express";
import { signup, login, registerUser } from "./auth.controllers.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/otp", registerUser);

router.get("/otp", (req, res) => {
  res.send("Babe");
});

export default router;
