import express from "express";
import { 
  getAllFilesFolders, 
  getFilesFolderById, 
  createFilesFolder, 
  updateFilesFolder, 
  deleteFilesFolder 
} from "../../controllers/stationary/filesFoldersController.js";
import { verifyToken, isAdmin } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Public routes - anyone can view
router.get("/", getAllFilesFolders);
router.get("/:id", getFilesFolderById);

// Protected routes - admin only
router.post("/", verifyToken, isAdmin, createFilesFolder);
router.put("/:id", verifyToken, isAdmin, updateFilesFolder);
router.delete("/:id", verifyToken, isAdmin, deleteFilesFolder);

export default router;
