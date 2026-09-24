import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, onChange, max = 10 }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-widest2 text-charcoal/50 mb-2">Quantity</p>
      <div className="inline-flex items-center border border-charcoal/20">
        <button
          className="w-10 h-10 flex items-center justify-center hover:bg-beige/40"
          onClick={() => onChange(Math.max(1, value - 1))}
          aria-label="Decrease quantity"
        >
          <Minus size={13} />
        </button>
        <span className="w-10 text-center text-sm">{value}</span>
        <button
          className="w-10 h-10 flex items-center justify-center hover:bg-beige/40"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label="Increase quantity"
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}
