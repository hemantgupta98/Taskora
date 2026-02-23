import { user, sendInvite } from "./invite.controller.js";
import { verifyToken } from "../../middleware/main.middleware.js";
import express from "express";

const router = express.Router();

router.post("/inviteteam", verifyToken, user);
router.post("/sendinvite", verifyToken, sendInvite);

export default router;
