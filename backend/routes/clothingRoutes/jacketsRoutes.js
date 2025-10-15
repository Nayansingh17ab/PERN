import express from "express";
import { 
  getAllJackets, 
  getJacketById, 
  createJacket, 
  updateJacket, 
  deleteJacket 
} from "../../controllers/clothing/jacketsController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllJackets);
router.get("/:id", getJacketById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createJacket);
router.put("/:id", verifyToken, isAdmin, updateJacket);
router.delete("/:id", verifyToken, isAdmin, deleteJacket);

export default router;
