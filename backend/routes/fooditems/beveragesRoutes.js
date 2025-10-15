import express from "express";
import { 
  getAllBakery, 
  getBakeryById, 
  createBakery, 
  updateBakery, 
  deleteBakery 
} from "../../controllers/fooditems/bakeryController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllBakery);
router.get("/:id", getBakeryById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createBakery);
router.put("/:id", verifyToken, isAdmin, updateBakery);
router.delete("/:id", verifyToken, isAdmin, deleteBakery);

export default router;
