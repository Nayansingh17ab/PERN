import express from "express";
import { 
  getAllMobiles, 
  getMobileById, 
  createMobile, 
  updateMobile, 
  deleteMobile 
} from "../../controllers/electronics/mobilesController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllMobiles);
router.get("/:id", getMobileById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createMobile);
router.put("/:id", verifyToken, isAdmin, updateMobile);
router.delete("/:id", verifyToken, isAdmin, deleteMobile);

export default router;
