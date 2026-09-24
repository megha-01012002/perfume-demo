import { createContext, useContext, useEffect, useState } from "react";
import { useToast } from "./ToastContext";

const WishlistContext = createContext(null);
const STORAGE_KEY = "eloria_wishlist";

export function WishlistProvider({ children }) {
  const { showToast } = useToast();
  const [productIds, setProductIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(productIds));
  }, [productIds]);

  const isWishlisted = (productId) => productIds.includes(productId);

  const toggleWishlist = (productId) => {
    setProductIds((prev) => {
      if (prev.includes(productId)) {
        showToast?.("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      }
      showToast?.("Added to wishlist");
      return [...prev, productId];
    });
  };

  const removeFromWishlist = (productId) => {
    setProductIds((prev) => prev.filter((id) => id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ productIds, isWishlisted, toggleWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
