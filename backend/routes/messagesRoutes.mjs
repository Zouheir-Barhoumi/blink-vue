import express from "express";
import {
  sendMessage,
  getUserMessages,
} from "../controllers/messagesController.mjs";

const router = express.Router();

router.post("/", sendMessage);
router.get("/:id", getUserMessages);

export default router;
