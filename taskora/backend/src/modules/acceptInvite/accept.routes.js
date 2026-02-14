import { accept, getAcceptUsers } from "./accept.contoller.js";
import express from "express";

const router = express.Router();

router.post("/acceptinvite", accept);
router.get("/", getAcceptUsers);

export default router;
