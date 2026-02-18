import {
  accept,
  getAcceptUsers,
  getInvitedTeamMember,
} from "./accept.contoller.js";
import express from "express";

const router = express.Router();

router.post("/acceptinvite", accept);
router.get("/", getAcceptUsers);
router.get("/team-member", getInvitedTeamMember);

export default router;
