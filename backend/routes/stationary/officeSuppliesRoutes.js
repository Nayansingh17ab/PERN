import express from "express";
import { 
  getAllOfficeSupplies, 
  getOfficeSupplyById, 
  createOfficeSupply, 
  updateOfficeSupply, 
  deleteOfficeSupply 
} from "../../controllers/stationary/officeSuppliesController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllOfficeSupplies);
router.get("/:id", getOfficeSupplyById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createOfficeSupply);
router.put("/:id", verifyToken, isAdmin, updateOfficeSupply);
router.delete("/:id", verifyToken, isAdmin, deleteOfficeSupply);

export default router;
