import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, BadgeCheck, Truck, RotateCcw } from "lucide-react";
import ProductArt from "../components/ProductArt";
import StarRating from "../components/StarRating";
import SizeSelector from "../components/SizeSelector";
import QuantitySelector from "../components/QuantitySelector";
import Accordion from "../components/Accordion";
import FragrancePyramid from "../components/FragrancePyramid";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import { getProductBySlug, products } from "../data/products";
import { getReviewsForProduct } from "../data/reviews";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import NotFound from "./NotFound";

export default function ProductDetails() {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [activeThumb, setActiveThumb] = useState(0);
  const [size, setSize] = useState(product?.sizes?.[0]?.size);
  const [qty, setQty] = useState(1);

  if (!product) return <NotFound />;

  const reviews = getReviewsForProduct(slug);
  const related = products.filter((p) => p.family === product.family && p.id !== product.id).slice(0, 4);

  const accordionItems = [
    { title: "Fragrance Notes", content: <FragrancePyramid notes={product.notes} /> },
    { title: "Description", content: product.description },
    {
      title: "How to Use",
      content:
        "Spray onto pulse points — wrists, neck, and behind the ears — from a distance of 4–6 inches after showering, when skin is clean and slightly damp for best longevity.",
    },
    {
      title: "Ingredients",
      content:
        "Alcohol Denat., Parfum (Fragrance), Aqua, and a proprietary blend of natural and synthetic aromatic compounds. Full INCI list available on product packaging.",
    },
    {
      title: "Shipping & Returns",
      content:
        "Free shipping on orders above ₹3,000. Standard delivery in 3–5 business days. Unopened products may be returned within 15 days of delivery for a full refund.",
    },
    {
      title: "Reviews",
      content: (
        <div className="space-y-6 pt-2">
          {reviews.length === 0 && <p>No reviews yet for this fragrance.</p>}
          {reviews.map((r) => (
            <div key={r.id} className="border-b border-charcoal/10 pb-5 last:border-0">
              <div className="flex items-center justify-between mb-1.5">
                <StarRating rating={r.rating} size={13} />
                <span className="text-xs text-charcoal/40">{new Date(r.date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })}</span>
              </div>
              <p className="font-medium text-burgundy-dark text-sm">{r.title}</p>
              <p className="text-sm text-charcoal/70 mt-1">{r.comment}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-charcoal/50">— {r.name}</span>
                {r.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-gold-dark uppercase tracking-widest2">
                    <BadgeCheck size={12} /> Verified Purchase
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="container-lux py-8 sm:py-12">
      <Breadcrumb items={[{ label: "Shop", to: "/shop" }, { label: product.name }]} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* GALLERY */}
        <div>
          <div className="aspect-square bg-beige/30">
            <ProductArt tone={product.tone} accent={product.accent} variant={activeThumb} />
          </div>
          <div className="flex gap-3 mt-3">
            {[0, 1, 2].map((v) => (
              <button
                key={v}
                onClick={() => setActiveThumb(v)}
                className={`w-20 h-20 shrink-0 bg-beige/30 ${activeThumb === v ? "ring-1 ring-burgundy" : ""}`}
              >
                <ProductArt tone={product.tone} accent={product.accent} variant={v} />
              </button>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div>
          <p className="text-[11px] uppercase tracking-widest2 text-charcoal/50">
            {product.gender} &middot; {product.category}
          </p>
          <h1 className="font-display text-3xl sm:text-[2.6rem] text-burgundy-dark mt-2 leading-tight">
            {product.name}
          </h1>
          <div className="mt-3"><StarRating rating={product.rating} count={product.reviewCount} showValue /></div>

          <div className="mt-5 flex items-center gap-3">
            {product.discountPrice ? (
              <>
                <span className="text-2xl font-medium text-burgundy-dark">₹{product.discountPrice.toLocaleString("en-IN")}</span>
                <span className="text-base text-charcoal/40 line-through">₹{product.price.toLocaleString("en-IN")}</span>
              </>
            ) : (
              <span className="text-2xl font-medium text-burgundy-dark">₹{product.price.toLocaleString("en-IN")}</span>
            )}
          </div>

          <p className="mt-5 text-sm text-charcoal/70 leading-relaxed max-w-md">{product.description}</p>

          <div className="mt-7"><SizeSelector sizes={product.sizes} value={size} onChange={setSize} /></div>
          <div className="mt-5"><QuantitySelector value={qty} onChange={setQty} /></div>

          <div className="mt-7 flex gap-3">
            <button onClick={() => addToCart(product, size, qty)} className="btn-primary flex-1">Add to Bag</button>
            <button className="btn-secondary flex-1">Buy Now</button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="w-[52px] h-[52px] shrink-0 flex items-center justify-center border border-charcoal/20 hover:border-burgundy"
            >
              <Heart size={18} className={isWishlisted(product.id) ? "fill-burgundy text-burgundy" : ""} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-charcoal/10 pt-6">
            <div className="flex items-start gap-2.5">
              <Truck size={17} className="text-gold-dark mt-0.5 shrink-0" />
              <p className="text-xs text-charcoal/60">Free shipping on orders above ₹3,000</p>
            </div>
            <div className="flex items-start gap-2.5">
              <RotateCcw size={17} className="text-gold-dark mt-0.5 shrink-0" />
              <p className="text-xs text-charcoal/60">15-day easy returns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-3xl">
        <Accordion items={accordionItems} />
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="section-heading text-2xl sm:text-3xl mb-8">You May Also Love</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
