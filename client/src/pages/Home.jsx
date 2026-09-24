import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Trees, Waves, Flame, Gem, Clock, Leaf, ShieldCheck, Truck } from "lucide-react";
import ProductArt from "../components/ProductArt";
import ProductCard from "../components/ProductCard";
import QuickViewModal from "../components/QuickViewModal";
import { products, featured, bestsellers } from "../data/products";

const moods = [
  { key: "Floral", label: "Floral", icon: Sparkles },
  { key: "Woody", label: "Woody", icon: Trees },
  { key: "Fresh", label: "Fresh", icon: Waves },
  { key: "Warm & Spicy", label: "Warm & Spicy", icon: Flame },
  { key: "Elegant", label: "Elegant", icon: Gem },
];

const whyEloria = [
  { icon: Clock, title: "Long-Lasting", text: "Exceptional compositions designed to stay." },
  { icon: Leaf, title: "Premium Ingredients", text: "Carefully selected fragrance materials." },
  { icon: ShieldCheck, title: "Cruelty-Free", text: "Created with conscious choices." },
  { icon: Truck, title: "Secure Delivery", text: "Carefully packed and delivered." },
];

export default function Home() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeMood, setActiveMood] = useState(null);

  const moodResults = activeMood ? products.filter((p) => p.moods?.includes(activeMood)).slice(0, 4) : [];

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[88vh] min-h-[560px] bg-burgundy-dark overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <ProductArt tone="#2A0B12" accent="#C8A96B" variant={4} className="opacity-90" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-dark via-burgundy-dark/70 to-transparent" />
        <div className="container-lux relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="eyebrow text-gold mb-5">ÉLORIA · Eau de Parfum</p>
            <h1 className="font-display text-ivory text-[2.6rem] sm:text-6xl leading-[1.05] tracking-tight">
              A Scent That Stays With You.
            </h1>
            <p className="mt-6 text-ivory/75 text-base sm:text-lg max-w-md">
              Discover refined fragrances crafted to become part of your signature.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-gold">Shop Collection</Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 border border-ivory/40 text-ivory px-7 py-3.5 text-xs uppercase tracking-widest2 hover:bg-ivory hover:text-burgundy-dark transition-all duration-300"
              >
                Discover Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SIGNATURE COLLECTION */}
      <section className="container-lux py-20 sm:py-28">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="eyebrow mb-3">Featured</p>
          <h2 className="section-heading">The Signature Collection</h2>
          <p className="mt-4 text-charcoal/60">Five compositions. Five moods. One unforgettable signature.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-14">
          {featured.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </section>

      {/* FRAGRANCE FINDER */}
      <section className="bg-beige/50 py-20 sm:py-28">
        <div className="container-lux text-center">
          <p className="eyebrow mb-3">Fragrance Finder</p>
          <h2 className="section-heading">What Mood Are You In?</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
            {moods.map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveMood(activeMood === m.key ? null : m.key)}
                className={`flex items-center gap-2 px-5 py-3 border text-xs uppercase tracking-widest2 transition-all duration-300 ${
                  activeMood === m.key
                    ? "bg-burgundy text-ivory border-burgundy"
                    : "border-charcoal/20 text-charcoal hover:border-burgundy"
                }`}
              >
                <m.icon size={15} /> {m.label}
              </button>
            ))}
          </div>

          {activeMood && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8 text-left"
            >
              {moodResults.length ? (
                moodResults.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
                ))
              ) : (
                <p className="col-span-full text-charcoal/50">No matches yet for this mood — check back soon.</p>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="container-lux py-20 sm:py-28">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="eyebrow mb-3">Bestsellers</p>
          <h2 className="section-heading">The Scents Everyone Is Talking About</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-14">
          {bestsellers.slice(0, 4).map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      </section>

      {/* BRAND STORY */}
      <section className="bg-burgundy-dark text-ivory">
        <div className="container-lux py-20 sm:py-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] order-2 lg:order-1">
            <ProductArt tone="#5A1B24" accent="#C8A96B" variant={5} />
          </div>
          <div className="order-1 lg:order-2">
            <p className="eyebrow text-gold mb-4">Our Philosophy</p>
            <h2 className="font-display text-3xl sm:text-4xl leading-tight">More Than a Fragrance</h2>
            <p className="mt-6 text-ivory/70 leading-relaxed max-w-md">
              Every ÉLORIA fragrance is designed to capture a feeling, a place, or a moment. We work with master
              perfumers and rare materials to create compositions that don't just smell beautiful — they stay with you.
            </p>
            <Link to="/about" className="btn-gold mt-8 inline-flex">Discover Our Story</Link>
          </div>
        </div>
      </section>

      {/* WHY ELORIA */}
      <section className="container-lux py-20 sm:py-28">
        <div className="text-center max-w-xl mx-auto mb-14">
          <p className="eyebrow mb-3">Why ÉLORIA</p>
          <h2 className="section-heading">Crafted With Care</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {whyEloria.map((f) => (
            <div key={f.title} className="text-center px-2">
              <div className="w-14 h-14 rounded-full bg-beige/60 flex items-center justify-center mx-auto mb-4">
                <f.icon size={22} className="text-burgundy" />
              </div>
              <h4 className="font-display text-lg text-burgundy-dark">{f.title}</h4>
              <p className="text-sm text-charcoal/60 mt-1.5">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
