import express from "express";
import {
  getUser,
  getAllUsers,
  getUserContacts,
} from "../controllers/usersController.mjs";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/:id/contacts", getUserContacts);
