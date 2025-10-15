import express from "express";
import { 
  getAllPants, 
  getPantById, 
  createPant, 
  updatePant, 
  deletePant 
} from "../../controllers/clothing/pantsController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllPants);
router.get("/:id", getPantById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createPant);
router.put("/:id", verifyToken, isAdmin, updatePant);
router.delete("/:id", verifyToken, isAdmin, deletePant);

export default router;
