import { Star } from "lucide-react";

export default function StarRating({ rating = 0, size = 14, showValue = false, count }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={size}
            className={n <= Math.round(rating) ? "fill-gold text-gold" : "fill-transparent text-charcoal/20"}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showValue && <span className="text-xs text-charcoal/60">{rating.toFixed(1)}</span>}
      {typeof count === "number" && <span className="text-xs text-charcoal/50">({count})</span>}
    </div>
  );
}
