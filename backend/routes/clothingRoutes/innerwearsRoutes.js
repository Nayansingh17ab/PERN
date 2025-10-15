import express from "express";
import { 
  getAllInnerwears, 
  getInnerwearById, 
  createInnerwear, 
  updateInnerwear, 
  deleteInnerwear 
} from "../../controllers/clothing/innerwearsController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllInnerwears);
router.get("/:id", getInnerwearById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createInnerwear);
router.put("/:id", verifyToken, isAdmin, updateInnerwear);
router.delete("/:id", verifyToken, isAdmin, deleteInnerwear);

export default router;
