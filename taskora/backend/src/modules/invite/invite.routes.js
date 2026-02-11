import { user, check } from "./invite.controller.js";
import express from "express";

const router = express.Router();

router.post("/inviteteam", user);
router.post("/check", check);

export default router;
