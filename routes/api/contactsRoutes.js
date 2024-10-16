import express from "express";
import {
  addContact,
  getAllContacts,
  getContactById,
  removeContact,
  updateContact,
  updateStatusContact,
} from "../../contactControllers/contactController.js";

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", getContactById);

router.post("/", addContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite/", updateStatusContact);

export { router };