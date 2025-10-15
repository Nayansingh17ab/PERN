import express from "express";
import { 
  getAllFruits, 
  getFruitById, 
  createFruit, 
  updateFruit, 
  deleteFruit 
} from "../../controllers/grocery/fruitsController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllFruits);
router.get("/:id", getFruitById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createFruit);
router.put("/:id", verifyToken, isAdmin, updateFruit);
router.delete("/:id", verifyToken, isAdmin, deleteFruit);

export default router;
