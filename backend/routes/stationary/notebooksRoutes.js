import express from "express";
import { 
  getAllNotebooks, 
  getNotebookById, 
  createNotebook, 
  updateNotebook, 
  deleteNotebook 
} from "../../controllers/stationary/notebooksController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllNotebooks);
router.get("/:id", getNotebookById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createNotebook);
router.put("/:id", verifyToken, isAdmin, updateNotebook);
router.delete("/:id", verifyToken, isAdmin, deleteNotebook);

export default router;
