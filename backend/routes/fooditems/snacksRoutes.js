import express from "express";
import { 
  getAllSnacks, 
  getSnackById, 
  createSnack, 
  updateSnack, 
  deleteSnack 
} from "../../controllers/fooditems/snacksController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllSnacks);
router.get("/:id", getSnackById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createSnack);
router.put("/:id", verifyToken, isAdmin, updateSnack);
router.delete("/:id", verifyToken, isAdmin, deleteSnack);

export default router;
