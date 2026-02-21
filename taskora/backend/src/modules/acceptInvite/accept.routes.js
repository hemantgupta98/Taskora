import {
  accept,
  getAcceptUsers,
  getInvitedTeamMember,
  deleteTeamMemeber,
  uploadAcceptImage,
} from "./accept.contoller.js";
import express from "express";
import upload from "./accept.upload.js";

const router = express.Router();

router.post("/acceptinvite", accept);
router.get("/", getAcceptUsers);
router.get("/team-member", getInvitedTeamMember);
router.delete("/deleteplans/:id", deleteTeamMemeber);

router.post(
  "/upload",

  upload.single("image"), // 👈 REQUIRED
  uploadAcceptImage,
);
export default router;
