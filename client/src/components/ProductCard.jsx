import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye } from "lucide-react";
import ProductArt from "./ProductArt";
import StarRating from "./StarRating";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product, index = 0, onQuickView }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [hovered, setHovered] = useState(false);
  const lowStock = product.sizes?.some((s) => s.stock > 0 && s.stock <= 4);
  const defaultSize = product.sizes?.[product.sizes.length - 1]?.size;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-beige/40">
        <Link to={`/product/${product.slug}`} aria-label={product.name}>
          <motion.div
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <ProductArt tone={product.tone} accent={product.accent} variant={index} />
          </motion.div>
        </Link>

        {/* badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-charcoal text-ivory text-[10px] uppercase tracking-widest2 px-2.5 py-1">New</span>
          )}
          {product.discountPrice && (
            <span className="bg-gold text-burgundy-dark text-[10px] uppercase tracking-widest2 px-2.5 py-1 font-semibold">
              Sale
            </span>
          )}
        </div>

        {/* wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-ivory/90 backdrop-blur-sm hover:bg-ivory transition-colors"
        >
          <Heart
            size={16}
            className={isWishlisted(product.id) ? "fill-burgundy text-burgundy" : "text-charcoal"}
          />
        </button>

        {/* quick view */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.25 }}
          onClick={() => onQuickView?.(product)}
          className="hidden sm:flex absolute bottom-3 left-3 items-center gap-1.5 bg-ivory/95 backdrop-blur-sm px-3 py-2 text-[11px] uppercase tracking-widest2 hover:bg-ivory"
        >
          <Eye size={13} /> Quick View
        </motion.button>

        {/* add to bag */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.25, delay: 0.04 }}
          onClick={() => addToCart(product, defaultSize, 1)}
          className="absolute bottom-3 right-3 bg-burgundy text-ivory px-3.5 py-2 text-[11px] uppercase tracking-widest2 hover:bg-burgundy-dark"
        >
          Add to Bag
        </motion.button>
      </div>

      <div className="mt-3.5 space-y-1">
        <p className="text-[10px] uppercase tracking-widest2 text-charcoal/50">
          {product.gender} &middot; {product.category}
        </p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display text-lg text-burgundy-dark hover:text-burgundy transition-colors">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} count={product.reviewCount} size={12} />
        <div className="flex items-center gap-2 pt-0.5">
          {product.discountPrice ? (
            <>
              <span className="text-sm font-medium text-burgundy-dark">
                ₹{product.discountPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-charcoal/40 line-through">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
            </>
          ) : (
            <span className="text-sm font-medium text-burgundy-dark">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
        {lowStock && <p className="text-[11px] text-burgundy font-medium">Only a few left</p>}
      </div>
    </motion.div>
  );
}
