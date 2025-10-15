import express from "express";
import { 
  getAllVegetables, 
  getVegetableById, 
  createVegetable, 
  updateVegetable, 
  deleteVegetable 
} from "../../controllers/grocery/vegetablesController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllVegetables);
router.get("/:id", getVegetableById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createVegetable);
router.put("/:id", verifyToken, isAdmin, updateVegetable);
router.delete("/:id", verifyToken, isAdmin, deleteVegetable);

export default router;
