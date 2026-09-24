import ProductArt from "../components/ProductArt";
import Breadcrumb from "../components/Breadcrumb";

const pillars = [
  {
    title: "Craftsmanship",
    text: "Every ÉLORIA fragrance passes through the hands of master perfumers who spend months, sometimes years, refining a single composition before it earns the ÉLORIA name.",
  },
  {
    title: "Ingredients",
    text: "We source rare materials — Mysore sandalwood, Bulgarian rose, sustainably harvested oud — from growers we've worked with for over a decade.",
  },
  {
    title: "Perfumers",
    text: "Our house works with a small circle of independent perfumers, each bringing their own signature to the ÉLORIA point of view.",
  },
  {
    title: "Sustainability",
    text: "From refillable bottles to responsibly sourced raw materials, we're building toward a smaller footprint without compromising on quality.",
  },
];

export default function About() {
  return (
    <div>
      <div className="container-lux pt-8">
        <Breadcrumb items={[{ label: "About" }]} />
      </div>

      <section className="relative h-[56vh] min-h-[380px] mt-6 flex items-center bg-burgundy-dark">
        <div className="absolute inset-0">
          <ProductArt tone="#2A0B12" accent="#C8A96B" variant={6} />
        </div>
        <div className="absolute inset-0 bg-burgundy-dark/40" />
        <div className="container-lux relative z-10 text-center text-ivory">
          <p className="eyebrow text-gold mb-4">Our Story</p>
          <h1 className="font-display text-4xl sm:text-6xl">The Art of Scent</h1>
        </div>
      </section>

      <section className="container-lux py-16 sm:py-24 max-w-2xl mx-auto text-center">
        <p className="font-display text-2xl sm:text-3xl text-burgundy-dark leading-snug italic">
          "ÉLORIA was created from a simple belief: fragrance is more than something you wear. It is something people
          remember."
        </p>
      </section>

      <section className="container-lux pb-20 sm:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-12">
          {pillars.map((p) => (
            <div key={p.title}>
              <h3 className="font-display text-2xl text-burgundy-dark mb-3">{p.title}</h3>
              <p className="text-charcoal/65 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-beige/40 py-20 sm:py-28">
        <div className="container-lux grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3]">
            <ProductArt tone="#8C5A2B" accent="#3B1018" variant={7} />
          </div>
          <div>
            <p className="eyebrow mb-4">Luxury Positioning</p>
            <h2 className="font-display text-3xl sm:text-4xl text-burgundy-dark">
              Designed for the moments that matter
            </h2>
            <p className="mt-6 text-charcoal/65 leading-relaxed max-w-md">
              We don't chase trends. Every ÉLORIA release is built to have a decade-long place in your rotation —
              considered, balanced, and unmistakably itself, whether worn to a Tuesday morning meeting or a wedding
              in Florence.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
