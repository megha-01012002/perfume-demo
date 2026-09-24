import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductArt from "../components/ProductArt";
import Breadcrumb from "../components/Breadcrumb";
import { collections } from "../data/collections";

export default function Collections() {
  return (
    <div>
      <div className="container-lux pt-10 sm:pt-14">
        <Breadcrumb items={[{ label: "Collections" }]} />
        <div className="mt-6 mb-12 text-center max-w-xl mx-auto">
          <p className="eyebrow mb-3">Curated</p>
          <h1 className="section-heading">Our Collections</h1>
          <p className="mt-4 text-charcoal/60">Four worlds of fragrance, each with its own mood and moment.</p>
        </div>
      </div>

      <div className="flex flex-col">
        {collections.map((c, i) => (
          <motion.div
            key={c.slug}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`grid grid-cols-1 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}
          >
            <div className="aspect-[4/3] lg:aspect-auto lg:h-[480px] [direction:ltr]">
              <ProductArt tone={c.tone} accent="#C8A96B" variant={i + 2} />
            </div>
            <div className="flex flex-col justify-center px-6 sm:px-14 py-14 lg:py-0 bg-beige/30 [direction:ltr]">
              <p className="eyebrow mb-3">{c.tagline}</p>
              <h2 className="font-display text-3xl sm:text-4xl text-burgundy-dark">{c.name}</h2>
              <p className="mt-5 text-charcoal/65 max-w-md leading-relaxed">{c.description}</p>
              <Link to={`/collections/${c.slug}`} className="btn-primary mt-8 self-start">
                Explore Collection
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
