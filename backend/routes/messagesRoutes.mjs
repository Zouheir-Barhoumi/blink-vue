import express from "express";
import { sendMessage } from "../controllers/messagesController.mjs";

const router = express.Router();

router.post("/", sendMessage);

export default router;
