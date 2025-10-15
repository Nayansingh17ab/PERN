import express from "express";
import { 
  getAllLaptops, 
  getLaptopById, 
  createLaptop, 
  updateLaptop, 
  deleteLaptop 
} from "../../controllers/electronics/laptopsController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllLaptops);
router.get("/:id", getLaptopById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createLaptop);
router.put("/:id", verifyToken, isAdmin, updateLaptop);
router.delete("/:id", verifyToken, isAdmin, deleteLaptop);

export default router;
