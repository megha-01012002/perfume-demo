import { Router } from "express";
import { createOrder, getOrders, getOrderById, updateOrderStatus } from "../controllers/orderController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id/status", requireAdmin, updateOrderStatus);

export default router;
