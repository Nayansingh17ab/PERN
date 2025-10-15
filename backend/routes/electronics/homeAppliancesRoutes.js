import express from "express";
import { 
  getAllHomeAppliances, 
  getHomeApplianceById, 
  createHomeAppliance, 
  updateHomeAppliance, 
  deleteHomeAppliance 
} from "../../controllers/electronics/homeAppliancesController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllHomeAppliances);
router.get("/:id", getHomeApplianceById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createHomeAppliance);
router.put("/:id", verifyToken, isAdmin, updateHomeAppliance);
router.delete("/:id", verifyToken, isAdmin, deleteHomeAppliance);

export default router;
