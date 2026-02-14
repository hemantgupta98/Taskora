import accept from "./accept.contoller.js";
import express from "express";

const router = express.Router();

router.post("/acceptinvite", accept);

export default accept;
