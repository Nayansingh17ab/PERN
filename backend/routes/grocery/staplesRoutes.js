import express from "express";
import { 
  getAllStaples, 
  getStapleById, 
  createStaple, 
  updateStaple, 
  deleteStaple 
} from "../../controllers/grocery/staplesController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllStaples);
router.get("/:id", getStapleById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createStaple);
router.put("/:id", verifyToken, isAdmin, updateStaple);
router.delete("/:id", verifyToken, isAdmin, deleteStaple);

export default router;
