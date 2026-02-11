import user from "./invite.controller.js";
import express from "express";

const router = express.Router();

router.post("/inviteteam", user);

export default router;
