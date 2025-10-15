import express from "express";
import { 
  getAllBakery, 
  getBakeryById, 
  createBakery, 
  updateBakery, 
  deleteBakery 
} from "../../controllers/fooditems/bakeryController.js";

const router = express.Router();

router.get("/", getAllBakery);
router.get("/:id", getBakeryById);
router.post("/", createBakery);
router.put("/:id", updateBakery);
router.delete("/:id", deleteBakery);

export default router;
