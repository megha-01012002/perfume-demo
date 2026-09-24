import { Router } from "express";
import { createPaymentOrder, verifyPayment } from "../controllers/paymentController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.use(requireAuth);
router.post("/create-order", createPaymentOrder);
router.post("/verify", verifyPayment);

export default router;
