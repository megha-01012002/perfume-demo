export const reviews = [
  {
    id: "r1",
    productSlug: "noir-elegance",
    rating: 5,
    title: "Absolutely beautiful.",
    comment:
      "Elegant, warm and incredibly long-lasting. This has quickly become my signature fragrance.",
    name: "Ananya R.",
    date: "2025-11-02",
    verified: true,
  },
  {
    id: "r2",
    productSlug: "noir-elegance",
    rating: 5,
    title: "Compliment magnet",
    comment:
      "I get stopped and asked what I'm wearing almost every time. Worth every rupee.",
    name: "Karan M.",
    date: "2025-10-18",
    verified: true,
  },
  {
    id: "r3",
    productSlug: "eclat-dor",
    rating: 5,
    title: "Golden and radiant, exactly as promised",
    comment:
      "The saffron opening is stunning and it settles into something so warm and comforting.",
    name: "Priya S.",
    date: "2025-09-27",
    verified: true,
  },
  {
    id: "r4",
    productSlug: "eclat-dor",
    rating: 4,
    title: "Lovely, but strong",
    comment: "A little goes a long way — two sprays lasted me the whole day.",
    name: "Neha T.",
    date: "2025-08-30",
    verified: false,
  },
  {
    id: "r5",
    productSlug: "midnight-oud",
    rating: 5,
    title: "My evening signature",
    comment:
      "Smoky, rich, and mysterious without being heavy. Perfect for dinners out.",
    name: "Aditya V.",
    date: "2025-11-11",
    verified: true,
  },
  {
    id: "r6",
    productSlug: "santal-24",
    rating: 5,
    title: "Creamy sandalwood perfection",
    comment: "Unisex, warm, and never overpowering. My partner wears it too.",
    name: "Ritika D.",
    date: "2025-07-14",
    verified: true,
  },
  {
    id: "r7",
    productSlug: "velours",
    rating: 4,
    title: "Soft and romantic",
    comment: "Beautiful rose-peony blend, great for daytime wear.",
    name: "Simran K.",
    date: "2025-10-05",
    verified: true,
  },
  {
    id: "r8",
    productSlug: "oud-royal",
    rating: 5,
    title: "Worth the investment",
    comment:
      "This is as close to a bespoke oud as I've found off the shelf. Exceptional.",
    name: "Farhan A.",
    date: "2025-09-02",
    verified: true,
  },
];

export const getReviewsForProduct = (slug) =>
  reviews.filter((r) => r.productSlug === slug);
