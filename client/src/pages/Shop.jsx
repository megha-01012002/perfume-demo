import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, LayoutGrid, List, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import QuickViewModal from "../components/QuickViewModal";
import Breadcrumb from "../components/Breadcrumb";
import { products } from "../data/products";

const GENDERS = ["Women", "Men", "Unisex"];
const FAMILIES = ["Floral", "Woody", "Oriental", "Fresh", "Citrus", "Musky", "Amber", "Oud"];
const PRICE_BANDS = [
  { label: "Under ₹5,000", test: (p) => p < 5000 },
  { label: "₹5,000–₹7,500", test: (p) => p >= 5000 && p <= 7500 },
  { label: "₹7,500–₹10,000", test: (p) => p > 7500 && p <= 10000 },
  { label: "Above ₹10,000", test: (p) => p > 10000 },
];
const SIZES = ["50ml", "75ml", "100ml"];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState("grid");
  const [sort, setSort] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const [genders, setGenders] = useState(searchParams.get("gender") ? [searchParams.get("gender")] : []);
  const [families, setFamilies] = useState([]);
  const [priceBands, setPriceBands] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const quickFilter = searchParams.get("filter");

  const toggle = (arr, setArr, value) =>
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (quickFilter === "bestseller") list = list.filter((p) => p.isBestseller);
    if (quickFilter === "new") list = list.filter((p) => p.isNew);
    if (genders.length) list = list.filter((p) => genders.includes(p.gender));
    if (families.length) list = list.filter((p) => families.includes(p.family));
    if (priceBands.length)
      list = list.filter((p) => priceBands.some((label) => PRICE_BANDS.find((b) => b.label === label)?.test(p.discountPrice || p.price)));
    if (sizes.length) list = list.filter((p) => p.sizes.some((s) => sizes.includes(s.size)));

    switch (sort) {
      case "newest":
        list = list.filter((p) => p.isNew).concat(list.filter((p) => !p.isNew));
        break;
      case "price-asc":
        list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case "price-desc":
        list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [genders, families, priceBands, sizes, sort, quickFilter]);

  const clearAll = () => {
    setGenders([]);
    setFamilies([]);
    setPriceBands([]);
    setSizes([]);
    setSearchParams({});
  };

  const activeCount = genders.length + families.length + priceBands.length + sizes.length;

  const FilterGroup = ({ title, options, active, onToggle }) => (
    <div className="py-5 border-b border-charcoal/10">
      <h4 className="text-xs uppercase tracking-widest2 text-charcoal/60 mb-3">{title}</h4>
      <div className="flex flex-col gap-2">
        {options.map((opt) => (
          <label key={opt} className="flex items-center gap-2.5 text-sm cursor-pointer group">
            <input
              type="checkbox"
              checked={active.includes(opt)}
              onChange={() => onToggle(opt)}
              className="accent-burgundy w-4 h-4"
            />
            <span className="text-charcoal/75 group-hover:text-burgundy transition-colors">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const FiltersPanel = (
    <div>
      <FilterGroup title="Gender" options={GENDERS} active={genders} onToggle={(v) => toggle(genders, setGenders, v)} />
      <FilterGroup title="Fragrance Family" options={FAMILIES} active={families} onToggle={(v) => toggle(families, setFamilies, v)} />
      <FilterGroup
        title="Price"
        options={PRICE_BANDS.map((b) => b.label)}
        active={priceBands}
        onToggle={(v) => toggle(priceBands, setPriceBands, v)}
      />
      <FilterGroup title="Size" options={SIZES} active={sizes} onToggle={(v) => toggle(sizes, setSizes, v)} />
      {activeCount > 0 && (
        <button onClick={clearAll} className="mt-4 text-xs uppercase tracking-widest2 text-burgundy border-b border-burgundy/40">
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="container-lux py-10 sm:py-14">
      <Breadcrumb items={[{ label: "Shop" }]} />
      <div className="mt-6 mb-10">
        <h1 className="font-display text-3xl sm:text-4xl text-burgundy-dark">Discover Your Signature</h1>
        <p className="mt-2 text-charcoal/60 max-w-lg">
          Explore our collection of modern compositions crafted for every mood.
        </p>
      </div>

      <div className="flex items-center justify-between border-y border-charcoal/10 py-3.5 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFiltersOpen(true)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest2 lg:hidden"
          >
            <SlidersHorizontal size={14} /> Filters {activeCount > 0 && `(${activeCount})`}
          </button>
          <span className="text-xs text-charcoal/50 hidden sm:inline">{filtered.length} fragrances</span>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="text-xs uppercase tracking-widest2 bg-transparent border border-charcoal/20 px-3 py-2 focus:outline-none focus:border-burgundy"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Best Rated</option>
          </select>
          <div className="hidden sm:flex items-center gap-1.5">
            <button onClick={() => setView("grid")} aria-label="Grid view" className={view === "grid" ? "text-burgundy" : "text-charcoal/40"}>
              <LayoutGrid size={17} />
            </button>
            <button onClick={() => setView("list")} aria-label="List view" className={view === "list" ? "text-burgundy" : "text-charcoal/40"}>
              <List size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
        <aside className="hidden lg:block">{FiltersPanel}</aside>

        {filtersOpen && (
          <div className="fixed inset-0 z-[95] lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-[82%] max-w-sm bg-ivory p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="font-display text-xl text-burgundy-dark">Filters</span>
                <button onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={20} /></button>
              </div>
              {FiltersPanel}
              <button onClick={() => setFiltersOpen(false)} className="btn-primary w-full mt-6">
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        )}

        <div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-10">
              {Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-display text-2xl text-burgundy-dark mb-2">No Fragrances Found</p>
              <p className="text-charcoal/60">Try adjusting your filters or explore our complete collection.</p>
              <button onClick={clearAll} className="btn-secondary mt-6">Clear Filters</button>
            </div>
          ) : (
            <div
              className={`grid gap-x-5 gap-y-10 sm:gap-x-8 ${
                view === "grid" ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
              }`}
            >
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
              ))}
            </div>
          )}
        </div>
      </div>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
