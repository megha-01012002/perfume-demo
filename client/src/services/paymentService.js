import api from "./api";

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== "false";

// Mirrors the real flow: POST /api/payment/create-order -> open Razorpay
// Checkout -> POST /api/payment/verify. See
// server/controllers/paymentController.js for the live Razorpay
// integration this stands in for. In demo mode we simulate the same
// three steps with a short delay and a 95% success rate so the full
// checkout flow (including a failure state) can be demonstrated
// without real credentials.
export const paymentService = {
  async createPaymentOrder(amountInPaise) {
    if (!USE_MOCK) {
      const { data } = await api.post("/payment/create-order", { amount: amountInPaise });
      return data;
    }
    await wait(500);
    return { id: `rzp_demo_order_${Date.now()}`, amount: amountInPaise, currency: "INR" };
  },

  async verifyPayment(payload) {
    if (!USE_MOCK) {
      const { data } = await api.post("/payment/verify", payload);
      return data;
    }
    await wait(900);
    const success = Math.random() > 0.05;
    if (!success) {
      const err = new Error("Payment could not be verified. Please try again.");
      err.code = "PAYMENT_FAILED";
      throw err;
    }
    return { verified: true, paymentId: `pay_demo_${Date.now()}` };
  },
};

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
