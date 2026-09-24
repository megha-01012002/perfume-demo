import crypto from "crypto";
import Razorpay from "razorpay";

const hasRazorpayCreds = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET;

const razorpay = hasRazorpayCreds
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

// POST /api/payment/create-order
export async function createPaymentOrder(req, res, next) {
  try {
    const { amount } = req.body; // amount in paise
    if (!amount || amount <= 0) return res.status(400).json({ message: "Invalid amount." });

    if (!razorpay) {
      // Demo mode: no real credentials configured. Returns an order
      // shaped like Razorpay's response so the frontend flow is identical.
      return res.json({
        id: `order_demo_${Date.now()}`,
        amount,
        currency: "INR",
        demo: true,
      });
    }

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
}

// POST /api/payment/verify
export async function verifyPayment(req, res, next) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay) {
      // Demo mode: accept the simulated payment.
      return res.json({ verified: true, paymentId: razorpay_payment_id });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ verified: false, message: "Payment signature verification failed." });
    }

    res.json({ verified: true, paymentId: razorpay_payment_id });
  } catch (err) {
    next(err);
  }
}
