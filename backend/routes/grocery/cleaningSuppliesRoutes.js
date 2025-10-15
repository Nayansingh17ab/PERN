import express from "express";
import { 
  getAllCleaningSupplies, 
  getCleaningSupplyById, 
  createCleaningSupply, 
  updateCleaningSupply, 
  deleteCleaningSupply 
} from "../../controllers/grocery/cleaningSuppliesController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllCleaningSupplies);
router.get("/:id", getCleaningSupplyById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createCleaningSupply);
router.put("/:id", verifyToken, isAdmin, updateCleaningSupply);
router.delete("/:id", verifyToken, isAdmin, deleteCleaningSupply);

export default router;
