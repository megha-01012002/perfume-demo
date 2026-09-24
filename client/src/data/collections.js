export const collections = [
  {
    slug: "the-signatures",
    name: "The Signatures",
    tagline: "Timeless compositions.",
    description:
      "The fragrances that defined ÉLORIA — balanced, wearable, and built to last a lifetime in your rotation.",
    tone: "#3B1018",
    productSlugs: ["noir-elegance", "santal-24", "eclat-dor", "velours"],
  },
  {
    slug: "after-dark",
    name: "After Dark",
    tagline: "Deep and sensual fragrances.",
    description:
      "For evenings that ask for more. Smoky ouds, dark ambers and resins built to hold a room.",
    tone: "#1A070B",
    productSlugs: ["midnight-oud", "oud-royal", "ambre-nuit", "rose-noire"],
  },
  {
    slug: "lumiere",
    name: "Lumière",
    tagline: "Bright and fresh compositions.",
    description:
      "Citrus, white flowers and clean musks — effortless fragrances for daylight hours.",
    tone: "#C8A96B",
    productSlugs: ["maison-blanche", "opale", "lumiere", "jardin-secret"],
  },
  {
    slug: "oud-collection",
    name: "Oud Collection",
    tagline: "Rich oriental fragrances.",
    description:
      "Our most precious materials, sourced and blended for depth, longevity and quiet opulence.",
    tone: "#2A1215",
    productSlugs: ["midnight-oud", "oud-royal"],
  },
];

export const getCollectionBySlug = (slug) =>
  collections.find((c) => c.slug === slug);
