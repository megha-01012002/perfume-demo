import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, Heart, ShoppingBag } from "lucide-react";
import ProductArt from "../components/ProductArt";
import Breadcrumb from "../components/Breadcrumb";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function Cart() {
  const { items, updateQty, removeFromCart, totals, coupon, applyCoupon, removeCoupon } = useCart();
  const { toggleWishlist } = useWishlist();
  const [promo, setPromo] = useState("");

  const submitPromo = (e) => {
    e.preventDefault();
    if (!promo.trim()) return;
    applyCoupon(promo);
    setPromo("");
  };

  if (items.length === 0) {
    return (
      <div className="container-lux py-24 text-center min-h-[50vh]">
        <ShoppingBag size={36} className="mx-auto text-burgundy/40 mb-5" />
        <p className="font-display text-2xl text-burgundy-dark mb-2">Your Bag Is Empty</p>
        <p className="text-charcoal/60 mb-7">Discover a fragrance worth remembering.</p>
        <Link to="/shop" className="btn-primary">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container-lux py-10 sm:py-14">
      <Breadcrumb items={[{ label: "Bag" }]} />
      <h1 className="font-display text-3xl sm:text-4xl text-burgundy-dark mt-6 mb-10">Your Bag</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        <div className="space-y-6">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex flex-col sm:flex-row gap-5 border-b border-charcoal/10 pb-6">
              <div className="w-full sm:w-28 h-40 sm:h-32 shrink-0 bg-beige/40">
                <ProductArt tone={item.tone} accent={item.accent} variant={1} />
              </div>
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <Link to={`/product/${item.slug}`} className="font-display text-lg text-burgundy-dark hover:text-burgundy">
                    {item.name}
                  </Link>
                  <p className="text-xs text-charcoal/50 mt-1">Size: {item.size}</p>
                  <p className="text-sm text-burgundy-dark mt-2 sm:hidden">₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-charcoal/20">
                    <button className="w-8 h-8 flex items-center justify-center" onClick={() => updateQty(item.productId, item.size, item.qty - 1)} aria-label="Decrease quantity">
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-sm">{item.qty}</span>
                    <button className="w-8 h-8 flex items-center justify-center" onClick={() => updateQty(item.productId, item.size, item.qty + 1)} aria-label="Increase quantity">
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-burgundy-dark w-20 text-right">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => { toggleWishlist(item.productId); removeFromCart(item.productId, item.size); }}
                      aria-label="Move to wishlist"
                      className="text-charcoal/40 hover:text-burgundy"
                    >
                      <Heart size={16} />
                    </button>
                    <button onClick={() => removeFromCart(item.productId, item.size)} aria-label="Remove item" className="text-charcoal/40 hover:text-burgundy">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-beige/30 p-7 h-fit">
          <h3 className="font-display text-xl text-burgundy-dark mb-5">Order Summary</h3>

          <form onSubmit={submitPromo} className="flex gap-2 mb-6">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="ENTER PROMO CODE"
              className="input-lux flex-1 text-xs uppercase tracking-widest2 bg-ivory"
            />
            <button type="submit" className="btn-secondary px-4 text-[11px]">Apply</button>
          </form>
          {coupon && (
            <div className="flex items-center justify-between text-xs text-burgundy mb-5 -mt-3">
              <span>{coupon.code} applied ({coupon.label})</span>
              <button onClick={removeCoupon} className="underline">Remove</button>
            </div>
          )}

          <div className="space-y-3 text-sm border-t border-charcoal/10 pt-5">
            <div className="flex justify-between"><span className="text-charcoal/60">Subtotal</span><span>₹{totals.subtotal.toLocaleString("en-IN")}</span></div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-burgundy"><span>Discount</span><span>−₹{totals.discount.toLocaleString("en-IN")}</span></div>
            )}
            <div className="flex justify-between"><span className="text-charcoal/60">Shipping</span><span>{totals.shipping === 0 ? "Free" : `₹${totals.shipping}`}</span></div>
            <div className="flex justify-between"><span className="text-charcoal/60">Tax (GST 18%)</span><span>₹{totals.tax.toLocaleString("en-IN")}</span></div>
          </div>
          <div className="flex justify-between items-center border-t border-charcoal/10 mt-4 pt-4">
            <span className="font-display text-lg text-burgundy-dark">Total</span>
            <span className="font-display text-lg text-burgundy-dark">₹{totals.total.toLocaleString("en-IN")}</span>
          </div>

          <Link to="/checkout" className="btn-primary w-full mt-6">Proceed to Checkout</Link>
          <p className="text-[11px] text-charcoal/45 mt-3 text-center">Try code ELORIA10 for 10% off</p>
        </div>
      </div>
    </div>
  );
}
