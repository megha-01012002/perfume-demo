import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";

export default function Wishlist() {
  const { productIds } = useWishlist();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const items = products.filter((p) => productIds.includes(p.id));

  return (
    <div className="container-lux py-10 sm:py-14 min-h-[50vh]">
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <h1 className="font-display text-3xl sm:text-4xl text-burgundy-dark mt-6 mb-10">Your Wishlist</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={36} className="mx-auto text-burgundy/40 mb-5" />
          <p className="font-display text-2xl text-burgundy-dark mb-2">Your Wishlist Is Waiting</p>
          <p className="text-charcoal/60 mb-7">Save the scents you can't stop thinking about.</p>
          <Link to="/shop" className="btn-primary">Explore Fragrances</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      )}
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
