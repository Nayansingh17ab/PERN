import express from "express";
import { 
  getAllSpices, 
  getSpiceById, 
  createSpice, 
  updateSpice, 
  deleteSpice 
} from "../../controllers/grocery/spicesController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllSpices);
router.get("/:id", getSpiceById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createSpice);
router.put("/:id", verifyToken, isAdmin, updateSpice);
router.delete("/:id", verifyToken, isAdmin, deleteSpice);

export default router;
