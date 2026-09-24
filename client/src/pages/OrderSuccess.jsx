import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { orderService } from "../services/orderService";

export default function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getOrder(id).then((o) => {
      setOrder(o);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="container-lux py-32 flex justify-center">
        <Loader2 className="animate-spin text-burgundy" size={28} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container-lux py-24 text-center">
        <p className="font-display text-2xl text-burgundy-dark mb-3">Order Not Found</p>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-lux py-14 sm:py-20 max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <CheckCircle2 size={52} className="mx-auto text-burgundy mb-5" strokeWidth={1.3} />
      </motion.div>
      <h1 className="font-display text-3xl sm:text-4xl text-burgundy-dark">Order Confirmed</h1>
      <p className="text-charcoal/60 mt-2">Thank you for choosing ÉLORIA.</p>

      <div className="mt-10 bg-beige/30 p-7 text-left">
        <div className="flex justify-between text-sm mb-4">
          <span className="text-charcoal/60">Order Number</span>
          <span className="font-medium text-burgundy-dark">{order.id}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-charcoal/60">Payment Status</span>
          <span className="capitalize font-medium text-burgundy-dark">{order.paymentStatus}</span>
        </div>
        <div className="flex justify-between text-sm mb-5">
          <span className="text-charcoal/60">Estimated Delivery</span>
          <span className="font-medium text-burgundy-dark">
            {new Date(order.estimatedDelivery).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>

        <div className="border-t border-charcoal/10 pt-4 space-y-2">
          {order.items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
              <span className="text-charcoal/70">{item.name} ({item.size}) x{item.qty}</span>
              <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between border-t border-charcoal/10 mt-4 pt-4">
          <span className="font-display text-lg text-burgundy-dark">Total</span>
          <span className="font-display text-lg text-burgundy-dark">₹{order.totals.total.toLocaleString("en-IN")}</span>
        </div>

        <div className="border-t border-charcoal/10 mt-4 pt-4 text-sm text-charcoal/65">
          <p className="text-xs uppercase tracking-widest2 text-charcoal/40 mb-1">Delivery Address</p>
          <p>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <Link to="/account/orders" className="btn-primary">View Order</Link>
        <Link to="/shop" className="btn-secondary">Continue Shopping</Link>
      </div>
    </div>
  );
}
