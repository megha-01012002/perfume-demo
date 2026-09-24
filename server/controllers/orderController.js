import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";

export async function createOrder(req, res, next) {
  try {
    const { items, shippingAddress, contact, paymentMethod, couponCode } = req.body;
    if (!items?.length) return res.status(400).json({ message: "Cart is empty." });

    // Recompute totals server-side rather than trusting the client.
    let subtotal = 0;
    const orderItems = [];
    for (const line of items) {
      const product = await Product.findById(line.productId);
      if (!product) return res.status(404).json({ message: `Product not found: ${line.productId}` });

      const sizeEntry = product.sizes.find((s) => s.size === line.size);
      if (!sizeEntry || sizeEntry.stock < line.qty) {
        return res.status(400).json({ message: `${product.name} (${line.size}) is out of stock.` });
      }

      const price = product.discountPrice || product.price;
      subtotal += price * line.qty;
      orderItems.push({ product: product._id, name: product.name, size: line.size, qty: line.qty, price });

      sizeEntry.stock -= line.qty; // decrement stock
      await product.save();
    }

    let discount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
      if (coupon && subtotal >= coupon.minOrder) {
        discount = coupon.discountType === "percent" ? Math.round((subtotal * coupon.discountValue) / 100) : coupon.discountValue;
        coupon.usedCount += 1;
        await coupon.save();
      }
    }

    const shipping = subtotal - discount >= 3000 || subtotal === 0 ? 0 : 199;
    const tax = Math.round((subtotal - discount) * 0.18);
    const total = subtotal - discount + tax + shipping;

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      shippingAddress,
      contact,
      subtotal,
      discount,
      tax,
      shipping,
      total,
      couponCode: couponCode?.toUpperCase() || null,
      paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid",
      orderStatus: "confirmed",
    });

    res.status(201).json({ order });
  } catch (err) {
    next(err);
  }
}

export async function getOrders(req, res, next) {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user._id };
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}

export async function getOrderById(req, res, next) {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found." });
    if (req.user.role !== "admin" && !order.user.equals(req.user._id)) {
      return res.status(403).json({ message: "Not authorized to view this order." });
    }
    res.json({ order });
  } catch (err) {
    next(err);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found." });
    res.json({ order });
  } catch (err) {
    next(err);
  }
}
