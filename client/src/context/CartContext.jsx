import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "./ToastContext";

const CartContext = createContext(null);
const STORAGE_KEY = "eloria_cart";

const COUPONS = {
  ELORIA10: { type: "percent", value: 10, minOrder: 0, label: "10% off" },
  WELCOME15: { type: "percent", value: 15, minOrder: 5000, label: "15% off (min ₹5,000)" },
  FIRSTORDER: { type: "flat", value: 500, minOrder: 4000, label: "₹500 off (min ₹4,000)" },
};

function lineKey(productId, size) {
  return `${productId}__${size}`;
}

export function CartProvider({ children }) {
  const { showToast } = useToast();
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });
  const [coupon, setCoupon] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (product, size, qty = 1) => {
    setItems((prev) => {
      const key = lineKey(product.id, size);
      const existing = prev.find((i) => lineKey(i.productId, i.size) === key);
      if (existing) {
        return prev.map((i) =>
          lineKey(i.productId, i.size) === key ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          slug: product.slug,
          size,
          qty,
          price: product.discountPrice || product.price,
          tone: product.tone,
          accent: product.accent,
        },
      ];
    });
    setLastAdded({ name: product.name, size, price: product.discountPrice || product.price });
    setDrawerOpen(true);
    showToast?.("Added to bag");
  };

  const removeFromCart = (productId, size) => {
    setItems((prev) => prev.filter((i) => lineKey(i.productId, i.size) !== lineKey(productId, size)));
  };

  const updateQty = (productId, size, qty) => {
    if (qty < 1) return removeFromCart(productId, size);
    setItems((prev) =>
      prev.map((i) =>
        lineKey(i.productId, i.size) === lineKey(productId, size) ? { ...i, qty } : i
      )
    );
  };

  const applyCoupon = (code) => {
    const upper = code.trim().toUpperCase();
    const found = COUPONS[upper];
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    if (!found) {
      showToast?.("Invalid promo code");
      return false;
    }
    if (subtotal < found.minOrder) {
      showToast?.(`Minimum order ₹${found.minOrder.toLocaleString("en-IN")} required`);
      return false;
    }
    setCoupon({ code: upper, ...found });
    showToast?.("Coupon applied");
    return true;
  };

  const removeCoupon = () => setCoupon(null);
  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const totals = useMemo(() => {
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
    let discount = 0;
    if (coupon) {
      discount = coupon.type === "percent" ? Math.round((subtotal * coupon.value) / 100) : coupon.value;
      discount = Math.min(discount, subtotal);
    }
    const shipping = subtotal === 0 || subtotal >= 3000 ? 0 : 199;
    const taxable = subtotal - discount;
    const tax = Math.round(taxable * 0.18);
    const total = taxable + tax + shipping;
    return { subtotal, discount, shipping, tax, total };
  }, [items, coupon]);

  const itemCount = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        applyCoupon,
        removeCoupon,
        clearCart,
        coupon,
        totals,
        itemCount,
        drawerOpen,
        setDrawerOpen,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
