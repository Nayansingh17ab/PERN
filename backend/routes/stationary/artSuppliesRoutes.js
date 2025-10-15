import express from "express";
import { 
  getAllArtSupplies, 
  getArtSupplyById, 
  createArtSupply, 
  updateArtSupply, 
  deleteArtSupply 
} from "../../controllers/stationary/artSuppliesController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllArtSupplies);
router.get("/:id", getArtSupplyById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createArtSupply);
router.put("/:id", verifyToken, isAdmin, updateArtSupply);
router.delete("/:id", verifyToken, isAdmin, deleteArtSupply);

export default router;
