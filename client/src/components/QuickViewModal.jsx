import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { X, Heart } from "lucide-react";
import ProductArt from "./ProductArt";
import StarRating from "./StarRating";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [size, setSize] = useState(product?.sizes?.[0]?.size);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setSize(product.sizes?.[0]?.size);
      setQty(1);
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "");
  }, [product]);

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-burgundy-dark/60 z-[90]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[100] inset-x-4 top-[6%] bottom-[6%] sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-1/2 sm:-translate-y-1/2 sm:w-[800px] sm:h-auto bg-ivory overflow-y-auto grid grid-cols-1 sm:grid-cols-2"
          >
            <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 z-10 bg-ivory/90 w-9 h-9 flex items-center justify-center">
              <X size={18} />
            </button>
            <div className="aspect-square sm:aspect-auto sm:h-full bg-beige/30">
              <ProductArt tone={product.tone} accent={product.accent} variant={2} />
            </div>
            <div className="p-6 sm:p-9">
              <p className="text-[10px] uppercase tracking-widest2 text-charcoal/50">{product.gender} &middot; {product.category}</p>
              <h2 className="font-display text-2xl sm:text-3xl text-burgundy-dark mt-1.5">{product.name}</h2>
              <div className="mt-2"><StarRating rating={product.rating} count={product.reviewCount} /></div>
              <p className="mt-3 text-sm text-charcoal/70 leading-relaxed">{product.description}</p>
              <div className="mt-4 flex items-center gap-2">
                {product.discountPrice ? (
                  <>
                    <span className="text-lg font-medium text-burgundy-dark">₹{product.discountPrice.toLocaleString("en-IN")}</span>
                    <span className="text-sm text-charcoal/40 line-through">₹{product.price.toLocaleString("en-IN")}</span>
                  </>
                ) : (
                  <span className="text-lg font-medium text-burgundy-dark">₹{product.price.toLocaleString("en-IN")}</span>
                )}
              </div>

              <div className="mt-5">
                <SizeSelector sizes={product.sizes} value={size} onChange={setSize} />
              </div>
              <div className="mt-4">
                <QuantitySelector value={qty} onChange={setQty} />
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={() => { addToCart(product, size, qty); onClose(); }} className="btn-primary flex-1">
                  Add to Bag
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  className="w-12 h-12 flex items-center justify-center border border-charcoal/20"
                >
                  <Heart size={17} className={isWishlisted(product.id) ? "fill-burgundy text-burgundy" : ""} />
                </button>
              </div>
              <Link to={`/product/${product.slug}`} onClick={onClose} className="inline-block mt-4 text-xs uppercase tracking-widest2 text-burgundy border-b border-burgundy/40">
                View Full Details
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
