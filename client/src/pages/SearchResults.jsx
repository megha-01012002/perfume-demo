import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import Breadcrumb from "../components/Breadcrumb";
import { products } from "../data/products";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const q = (searchParams.get("q") || "").toLowerCase().trim();
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const results = useMemo(() => {
    if (!q) return [];
    return products.filter((p) => {
      const haystack = [
        p.name,
        p.category,
        p.family,
        p.gender,
        p.description,
        ...(p.notes.top || []),
        ...(p.notes.heart || []),
        ...(p.notes.base || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [q]);

  return (
    <div className="container-lux py-10 sm:py-14 min-h-[50vh]">
      <Breadcrumb items={[{ label: "Search" }]} />
      <h1 className="font-display text-3xl sm:text-4xl text-burgundy-dark mt-6 mb-2">
        Search Results {q && <span className="text-charcoal/40">for "{q}"</span>}
      </h1>
      <p className="text-charcoal/60 mb-10">{results.length} fragrance{results.length !== 1 ? "s" : ""} found</p>

      {results.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-2xl text-burgundy-dark mb-2">No Fragrances Found</p>
          <p className="text-charcoal/60">Try searching for another scent or explore our complete collection.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8">
          {results.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      )}
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
