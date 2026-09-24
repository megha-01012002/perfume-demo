// Editorial-style generative bottle art, used in place of photography.
// Every product gets a distinct look driven by its `tone`/`accent` colors,
// so the catalog reads as cohesive rather than repetitive. Swap this for
// <img src={product.images[0]} /> once real product photography exists —
// see README "Replacing placeholder art" for the exact swap point.
export default function ProductArt({ tone = "#3B1018", accent = "#C8A96B", variant = 0, className = "" }) {
  const capH = 34 + (variant % 3) * 4;
  const bottleW = 78 - (variant % 2) * 6;
  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(120% 100% at 50% 15%, ${tone}14 0%, #F8F4ED 55%, #EFE7D8 100%)`,
        }}
      />
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[70%] aspect-square rounded-full opacity-30 blur-3xl"
        style={{ background: tone }}
      />
      <svg
        viewBox="0 0 220 320"
        className="relative w-full h-full"
        preserveAspectRatio="xMidYEnd meet"
      >
        <defs>
          <linearGradient id={`glass-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tone} stopOpacity="0.92" />
            <stop offset="55%" stopColor={tone} stopOpacity="0.72" />
            <stop offset="100%" stopColor={tone} stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id={`cap-${variant}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} />
            <stop offset="100%" stopColor={accent} stopOpacity="0.75" />
          </linearGradient>
        </defs>

        {/* soft shadow */}
        <ellipse cx="110" cy="298" rx="58" ry="10" fill={tone} opacity="0.12" />

        {/* bottle body */}
        <rect
          x={110 - bottleW / 2}
          y="140"
          width={bottleW}
          height="150"
          rx="6"
          fill={`url(#glass-${variant})`}
          stroke={accent}
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        {/* neck */}
        <rect x="98" y="96" width="24" height="46" fill={`url(#glass-${variant})`} stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
        {/* cap */}
        <rect x="88" y={96 - capH} width="44" height={capH} rx="3" fill={`url(#cap-${variant})`} />
        {/* label */}
        <rect x={110 - bottleW / 2 + 10} y="190" width={bottleW - 20} height="46" fill="#F8F4ED" opacity="0.88" />
        <line x1={110 - bottleW / 2 + 18} y1="206" x2={110 + bottleW / 2 - 18} y2="206" stroke={tone} strokeWidth="1.2" opacity="0.55" />
        <line x1={110 - bottleW / 2 + 18} y1="216" x2={110 + bottleW / 2 - 38} y2="216" stroke={tone} strokeWidth="1" opacity="0.35" />
        {/* highlight */}
        <rect x={110 - bottleW / 2 + 6} y="146" width="7" height="138" fill="#FFFFFF" opacity="0.18" />
      </svg>
    </div>
  );
}
