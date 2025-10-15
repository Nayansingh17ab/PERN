import express from "express";
import { 
  getAllCannedGoods, 
  getCannedGoodById, 
  createCannedGood, 
  updateCannedGood, 
  deleteCannedGood 
} from "../../controllers/fooditems/cannedGoodsController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllCannedGoods);
router.get("/:id", getCannedGoodById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createCannedGood);
router.put("/:id", verifyToken, isAdmin, updateCannedGood);
router.delete("/:id", verifyToken, isAdmin, deleteCannedGood);

export default router;
