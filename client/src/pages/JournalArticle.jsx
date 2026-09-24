import { useParams, Link } from "react-router-dom";
import ProductArt from "../components/ProductArt";
import Breadcrumb from "../components/Breadcrumb";
import { getArticleBySlug, journalArticles } from "../data/journal";
import NotFound from "./NotFound";

export default function JournalArticle() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  if (!article) return <NotFound />;

  const more = journalArticles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <div>
      <div className="aspect-[16/7] min-h-[240px]">
        <ProductArt tone={article.tone} accent="#C8A96B" variant={2} />
      </div>
      <div className="container-lux py-10 sm:py-14 max-w-2xl mx-auto">
        <Breadcrumb items={[{ label: "Journal", to: "/journal" }, { label: article.title }]} />
        <p className="text-xs text-charcoal/45 mt-6">
          {new Date(article.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl text-burgundy-dark mt-2 mb-8 leading-tight">{article.title}</h1>
        <div className="space-y-5">
          {article.content.map((p, i) => (
            <p key={i} className="text-charcoal/75 leading-relaxed">{p}</p>
          ))}
        </div>
      </div>

      {more.length > 0 && (
        <div className="container-lux pb-16">
          <h3 className="font-display text-xl text-burgundy-dark mb-6">More from the Journal</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {more.map((a, i) => (
              <Link key={a.slug} to={`/journal/${a.slug}`} className="group">
                <div className="aspect-[4/3]"><ProductArt tone={a.tone} accent="#C8A96B" variant={i + 3} /></div>
                <h4 className="font-display text-lg text-burgundy-dark mt-3 group-hover:text-burgundy">{a.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
