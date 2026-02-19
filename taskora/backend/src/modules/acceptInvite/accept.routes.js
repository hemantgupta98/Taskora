import {
  accept,
  getAcceptUsers,
  getInvitedTeamMember,
  deleteTeamMemeber,
} from "./accept.contoller.js";
import express from "express";

const router = express.Router();

router.post("/acceptinvite", accept);
router.get("/", getAcceptUsers);
router.get("/team-member", getInvitedTeamMember);
router.delete("/deleteplans/:id", deleteTeamMemeber);

export default router;
