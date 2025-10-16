import express from "express";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";
import { verifyToken, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer routes
router.post("/", verifyToken, createOrder);
router.get("/my-orders", verifyToken, getUserOrders);
router.get("/:orderId", verifyToken, getOrderById);

// Admin routes
router.get("/admin/all", verifyToken, requireAdmin, getAllOrders);
router.patch("/:orderId/status", verifyToken, requireAdmin, updateOrderStatus);

export default router;
