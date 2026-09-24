import { Link } from "react-router-dom";
import ProductArt from "../components/ProductArt";

export default function NotFound() {
  return (
    <div className="container-lux py-20 sm:py-28 text-center">
      <div className="w-40 h-40 mx-auto mb-8">
        <ProductArt tone="#3B1018" accent="#C8A96B" variant={9} />
      </div>
      <p className="eyebrow mb-3">Error 404</p>
      <h1 className="font-display text-3xl sm:text-4xl text-burgundy-dark mb-4">Page Not Found</h1>
      <p className="text-charcoal/60 max-w-sm mx-auto mb-8">
        The page you're looking for may have moved, or perhaps it never existed at all.
      </p>
      <Link to="/" className="btn-primary">Return Home</Link>
    </div>
  );
}
