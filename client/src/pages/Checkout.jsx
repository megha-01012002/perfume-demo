import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Check, Loader2, CreditCard, Smartphone, Landmark, Wallet, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { orderService } from "../services/orderService";
import { paymentService } from "../services/paymentService";
import { useToast } from "../context/ToastContext";

const STEPS = ["Contact", "Shipping", "Payment"];

const PAYMENT_METHODS = [
  { id: "razorpay", label: "Razorpay (Card / UPI / Wallets)", icon: CreditCard },
  { id: "upi", label: "UPI", icon: Smartphone },
  { id: "netbanking", label: "Net Banking", icon: Landmark },
  { id: "wallet", label: "Wallet", icon: Wallet },
  { id: "cod", label: "Cash on Delivery", icon: Truck },
];

export default function Checkout() {
  const { items, totals, clearCart, coupon } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [method, setMethod] = useState("razorpay");

  const [contact, setContact] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });
  const [address, setAddress] = useState({ address: "", city: "", state: "", pincode: "", country: "India" });

  if (items.length === 0) return <Navigate to="/cart" replace />;

  const canProceedContact = contact.name && contact.email && contact.phone;
  const canProceedShipping = address.address && address.city && address.state && address.pincode;

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const placeOrder = async () => {
    setProcessing(true);
    setPaymentError("");
    try {
      if (method !== "cod") {
        const paymentOrder = await paymentService.createPaymentOrder(Math.round(totals.total * 100));
        await paymentService.verifyPayment({
          razorpay_order_id: paymentOrder.id,
          razorpay_payment_id: `pay_demo_${Date.now()}`,
          razorpay_signature: "demo_signature",
        });
      }
      const order = await orderService.createOrder({
        userId: user?.id,
        items,
        shippingAddress: address,
        contact,
        paymentMethod: method,
        totals,
      });
      showToast?.("Order confirmed");
      clearCart();
      navigate(`/order-success/${order.id}`);
    } catch (err) {
      setPaymentError(err.message || "Something went wrong. Please try again.");
      showToast?.("Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container-lux py-10 sm:py-14">
      <h1 className="font-display text-3xl sm:text-4xl text-burgundy-dark mb-8">Checkout</h1>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-10 max-w-md">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  i < step ? "bg-burgundy text-ivory" : i === step ? "bg-gold text-burgundy-dark" : "bg-beige text-charcoal/40"
                }`}
              >
                {i < step ? <Check size={13} /> : i + 1}
              </div>
              <span className={`text-xs uppercase tracking-widest2 ${i === step ? "text-burgundy-dark" : "text-charcoal/40"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && <div className="flex-1 h-px bg-charcoal/15 mx-3" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        <div>
          {step === 0 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-md">
              <h2 className="font-display text-xl text-burgundy-dark mb-2">Contact Information</h2>
              <input className="input-lux" placeholder="Full Name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
              <input className="input-lux" type="email" placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
              <input className="input-lux" placeholder="Phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
              <button disabled={!canProceedContact} onClick={goNext} className="btn-primary mt-2">Continue to Shipping</button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 max-w-md">
              <h2 className="font-display text-xl text-burgundy-dark mb-2">Shipping Address</h2>
              <input className="input-lux" placeholder="Address" value={address.address} onChange={(e) => setAddress({ ...address, address: e.target.value })} />
              <div className="grid grid-cols-2 gap-3">
                <input className="input-lux" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                <input className="input-lux" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input className="input-lux" placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                <input className="input-lux" placeholder="Country" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={goBack} className="btn-secondary">Back</button>
                <button disabled={!canProceedShipping} onClick={goNext} className="btn-primary">Continue to Payment</button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-md">
              <h2 className="font-display text-xl text-burgundy-dark mb-2">Payment</h2>
              <div className="space-y-2.5 mt-4">
                {PAYMENT_METHODS.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-3 border px-4 py-3.5 cursor-pointer transition-colors ${
                      method === m.id ? "border-burgundy bg-beige/30" : "border-charcoal/15"
                    }`}
                  >
                    <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} className="accent-burgundy" />
                    <m.icon size={17} className="text-charcoal/60" />
                    <span className="text-sm">{m.label}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-6 text-xs text-charcoal/60 bg-beige/30 px-4 py-3">
                <Lock size={13} className="text-gold-dark" />
                <span>
                  <strong className="text-charcoal">Secure Checkout.</strong> Your payment information is encrypted and secure.
                </span>
              </div>

              {paymentError && (
                <p className="mt-4 text-sm text-burgundy bg-burgundy/5 border border-burgundy/20 px-4 py-3">{paymentError}</p>
              )}

              <div className="flex gap-3 mt-6">
                <button onClick={goBack} className="btn-secondary" disabled={processing}>Back</button>
                <button onClick={placeOrder} disabled={processing} className="btn-primary flex-1">
                  {processing ? (
                    <span className="flex items-center gap-2"><Loader2 size={15} className="animate-spin" /> Processing…</span>
                  ) : method === "cod" ? (
                    "Place Order"
                  ) : (
                    `Pay ₹${totals.total.toLocaleString("en-IN")}`
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-beige/30 p-7 h-fit">
          <h3 className="font-display text-xl text-burgundy-dark mb-5">Order Summary</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-charcoal/70">{item.name} ({item.size}) x{item.qty}</span>
                <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
              </div>
            ))}
          </div>
          <div className="space-y-2.5 text-sm border-t border-charcoal/10 mt-4 pt-4">
            <div className="flex justify-between"><span className="text-charcoal/60">Subtotal</span><span>₹{totals.subtotal.toLocaleString("en-IN")}</span></div>
            {totals.discount > 0 && <div className="flex justify-between text-burgundy"><span>Discount {coupon && `(${coupon.code})`}</span><span>−₹{totals.discount.toLocaleString("en-IN")}</span></div>}
            <div className="flex justify-between"><span className="text-charcoal/60">Shipping</span><span>{totals.shipping === 0 ? "Free" : `₹${totals.shipping}`}</span></div>
            <div className="flex justify-between"><span className="text-charcoal/60">Tax</span><span>₹{totals.tax.toLocaleString("en-IN")}</span></div>
          </div>
          <div className="flex justify-between items-center border-t border-charcoal/10 mt-4 pt-4">
            <span className="font-display text-lg text-burgundy-dark">Total</span>
            <span className="font-display text-lg text-burgundy-dark">₹{totals.total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
