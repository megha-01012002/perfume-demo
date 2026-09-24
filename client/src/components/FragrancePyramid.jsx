const tiers = [
  { key: "top", label: "Top Notes" },
  { key: "heart", label: "Heart Notes" },
  { key: "base", label: "Base Notes" },
];

export default function FragrancePyramid({ notes }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {tiers.map((tier, i) => (
        <div key={tier.key} className="bg-beige/40 p-6 text-center">
          <span className="text-[10px] uppercase tracking-widest2 text-gold-dark">{`0${i + 1}`}</span>
          <h4 className="font-display text-lg text-burgundy-dark mt-1 mb-3">{tier.label}</h4>
          <ul className="space-y-1.5">
            {notes[tier.key]?.map((n) => (
              <li key={n} className="text-sm text-charcoal/70">{n}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
