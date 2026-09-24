import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    size: String,
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: "India" },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [orderItemSchema],
    shippingAddress: addressSchema,
    contact: { name: String, email: String, phone: String },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    couponCode: { type: String, default: null },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "upi", "netbanking", "wallet", "cod"],
      required: true,
    },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
    orderStatus: {
      type: String,
      enum: ["processing", "confirmed", "shipped", "out_for_delivery", "delivered", "cancelled"],
      default: "processing",
    },
    razorpayOrderId: { type: String, default: null },
    razorpayPaymentId: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
