import { useState } from "react";
import { useParams } from "react-router-dom";
import ProductArt from "../components/ProductArt";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import Breadcrumb from "../components/Breadcrumb";
import { getCollectionBySlug } from "../data/collections";
import { products } from "../data/products";
import NotFound from "./NotFound";

export default function CollectionDetail() {
  const { slug } = useParams();
  const collection = getCollectionBySlug(slug);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  if (!collection) return <NotFound />;

  const items = products.filter((p) => collection.productSlugs.includes(p.slug));

  return (
    <div>
      <div className="relative h-[38vh] min-h-[280px] flex items-end" style={{ background: collection.tone }}>
        <div className="absolute inset-0 opacity-70">
          <ProductArt tone={collection.tone} accent="#C8A96B" variant={3} />
        </div>
        <div className="container-lux relative z-10 pb-10 text-ivory">
          <p className="eyebrow text-gold mb-2">{collection.tagline}</p>
          <h1 className="font-display text-4xl sm:text-5xl">{collection.name}</h1>
        </div>
      </div>

      <div className="container-lux py-10 sm:py-14">
        <Breadcrumb items={[{ label: "Collections", to: "/collections" }, { label: collection.name }]} />
        <p className="mt-6 text-charcoal/65 max-w-2xl">{collection.description}</p>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </div>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
