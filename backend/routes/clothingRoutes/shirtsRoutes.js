// routes/clothing/shirtsRoutes.js
import express from "express";
import { 
  getAllShirts, 
  getShirtById, 
  createShirt, 
  updateShirt, 
  deleteShirt 
} from "../../controllers/clothing/shirtsController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllShirts);              // Public - anyone can view
router.get("/:id", getShirtById);           // Public - anyone can view
router.post("/", verifyToken, isAdmin, createShirt);      // Protected - admin only
router.put("/:id", verifyToken, isAdmin, updateShirt);    // Protected - admin only
router.delete("/:id", verifyToken, isAdmin, deleteShirt); // Protected - admin only

export default router;
