import express from "express";
import { 
  getAllPens, 
  getPenById, 
  createPen, 
  updatePen, 
  deletePen 
} from "../../controllers/stationary/pensController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllPens);
router.get("/:id", getPenById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createPen);
router.put("/:id", verifyToken, isAdmin, updatePen);
router.delete("/:id", verifyToken, isAdmin, deletePen);

export default router;
