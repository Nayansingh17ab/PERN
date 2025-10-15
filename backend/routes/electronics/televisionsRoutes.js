import express from "express";
import { 
  getAllTelevisions, 
  getTelevisionById, 
  createTelevision, 
  updateTelevision, 
  deleteTelevision 
} from "../../controllers/electronics/televisionsController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllTelevisions);
router.get("/:id", getTelevisionById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createTelevision);
router.put("/:id", verifyToken, isAdmin, updateTelevision);
router.delete("/:id", verifyToken, isAdmin, deleteTelevision);

export default router;
