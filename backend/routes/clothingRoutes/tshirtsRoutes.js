import express from "express";
import { 
  getAllTshirts, 
  getTshirtById, 
  createTshirt, 
  updateTshirt, 
  deleteTshirt 
} from "../../controllers/clothing/tshirtsController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllTshirts);
router.get("/:id", getTshirtById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createTshirt);
router.put("/:id", verifyToken, isAdmin, updateTshirt);
router.delete("/:id", verifyToken, isAdmin, deleteTshirt);

export default router;
