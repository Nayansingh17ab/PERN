import express from "express";
import { 
  getAllAccessories, 
  getAccessoryById, 
  createAccessory, 
  updateAccessory, 
  deleteAccessory 
} from "../../controllers/electronics/accessoriesController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllAccessories);
router.get("/:id", getAccessoryById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createAccessory);
router.put("/:id", verifyToken, isAdmin, updateAccessory);
router.delete("/:id", verifyToken, isAdmin, deleteAccessory);

export default router;
