import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductArt from "./ProductArt";

export default function CartDrawer() {
  const { drawerOpen, setDrawerOpen, items, updateQty, removeFromCart, totals } = useCart();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-burgundy-dark/50 z-[90]"
            onClick={() => setDrawerOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-ivory z-[100] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-[76px] border-b border-charcoal/10">
              <h3 className="font-display text-xl text-burgundy-dark">Your Bag ({items.length})</h3>
              <button onClick={() => setDrawerOpen(false)} aria-label="Close bag">
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8">
                <p className="font-display text-2xl text-burgundy-dark mb-2">Your bag is empty</p>
                <p className="text-sm text-charcoal/60 mb-6">Discover a fragrance worth remembering.</p>
                <button onClick={() => setDrawerOpen(false)} className="btn-primary">
                  <Link to="/shop">Shop Now</Link>
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                  {items.map((item) => (
                    <div key={`${item.productId}-${item.size}`} className="flex gap-4">
                      <div className="w-20 h-24 shrink-0 bg-beige/40">
                        <ProductArt tone={item.tone} accent={item.accent} variant={1} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-base text-burgundy-dark truncate">{item.name}</p>
                        <p className="text-xs text-charcoal/50 mt-0.5">{item.size}</p>
                        <div className="flex items-center justify-between mt-2.5">
                          <div className="flex items-center border border-charcoal/20">
                            <button
                              className="w-7 h-7 flex items-center justify-center"
                              onClick={() => updateQty(item.productId, item.size, item.qty - 1)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-xs">{item.qty}</span>
                            <button
                              className="w-7 h-7 flex items-center justify-center"
                              onClick={() => updateQty(item.productId, item.size, item.qty + 1)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-medium text-burgundy-dark">
                            ₹{(item.price * item.qty).toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.size)}
                        aria-label="Remove item"
                        className="self-start text-charcoal/40 hover:text-burgundy"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-charcoal/10 px-6 py-5 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-charcoal/60">Subtotal</span>
                    <span>₹{totals.subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <Link
                    to="/cart"
                    onClick={() => setDrawerOpen(false)}
                    className="btn-secondary w-full"
                  >
                    View Bag
                  </Link>
                  <Link
                    to="/checkout"
                    onClick={() => setDrawerOpen(false)}
                    className="btn-primary w-full"
                  >
                    Checkout
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
