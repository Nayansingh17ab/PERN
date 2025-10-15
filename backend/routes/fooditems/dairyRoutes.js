import express from "express";
import { 
  getAllDairy, 
  getDairyById, 
  createDairy, 
  updateDairy, 
  deleteDairy 
} from "../../controllers/fooditems/dairyController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllDairy);
router.get("/:id", getDairyById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createDairy);
router.put("/:id", verifyToken, isAdmin, updateDairy);
router.delete("/:id", verifyToken, isAdmin, deleteDairy);

export default router;
