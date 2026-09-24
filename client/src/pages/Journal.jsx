import { Link } from "react-router-dom";
import ProductArt from "../components/ProductArt";
import Breadcrumb from "../components/Breadcrumb";
import { journalArticles } from "../data/journal";

export default function Journal() {
  return (
    <div className="container-lux py-10 sm:py-14">
      <Breadcrumb items={[{ label: "Journal" }]} />
      <div className="mt-6 mb-12 max-w-xl">
        <p className="eyebrow mb-3">The Éloria Journal</p>
        <h1 className="section-heading">Stories in Scent</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {journalArticles.map((a, i) => (
          <Link key={a.slug} to={`/journal/${a.slug}`} className="group">
            <div className="aspect-[4/3] overflow-hidden">
              <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
                <ProductArt tone={a.tone} accent="#C8A96B" variant={i} />
              </div>
            </div>
            <p className="text-xs text-charcoal/45 mt-4">
              {new Date(a.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <h2 className="font-display text-xl text-burgundy-dark mt-1.5 group-hover:text-burgundy transition-colors">
              {a.title}
            </h2>
            <p className="text-sm text-charcoal/60 mt-2 line-clamp-2">{a.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
