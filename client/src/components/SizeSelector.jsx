export default function SizeSelector({ sizes = [], value, onChange }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest2 text-charcoal/50 mb-2">Size</p>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((s) => {
          const outOfStock = s.stock === 0;
          const active = value === s.size;
          return (
            <button
              key={s.size}
              disabled={outOfStock}
              onClick={() => onChange(s.size)}
              className={`px-4 py-2 text-xs border transition-colors relative ${
                active ? "border-burgundy bg-burgundy text-ivory" : "border-charcoal/25 hover:border-burgundy"
              } ${outOfStock ? "opacity-40 cursor-not-allowed line-through" : ""}`}
            >
              {s.size}
            </button>
          );
        })}
      </div>
      {value && sizes.find((s) => s.size === value)?.stock <= 4 && sizes.find((s) => s.size === value)?.stock > 0 && (
        <p className="text-[11px] text-burgundy font-medium mt-2">
          Only {sizes.find((s) => s.size === value).stock} left
        </p>
      )}
    </div>
  );
}
