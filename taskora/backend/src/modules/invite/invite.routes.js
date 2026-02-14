import { user, sendInvite } from "./invite.controller.js";
import express from "express";

const router = express.Router();

router.post("/inviteteam", user);
router.post("/sendinvite", sendInvite);

export default router;
