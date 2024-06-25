import express from "express";
import {
  getUserDetails,
  getAllUsers,
  getUserContacts,
  addContact,
} from "../controllers/usersController.mjs";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserDetails);
router.get("/:id/contacts", getUserContacts);
router.post("/:id/contacts", addContact);

export default router;
