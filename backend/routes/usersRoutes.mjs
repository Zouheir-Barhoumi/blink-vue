import express from "express";
import {
  getUserDetails,
  getAllUsers,
  getUserContacts,
} from "../controllers/usersController.mjs";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserDetails);
router.get("/:id/contacts", getUserContacts);
