export const journalArticles = [
  {
    slug: "find-your-signature-scent",
    title: "How to Find Your Signature Scent",
    excerpt:
      "A signature fragrance is less about trends and more about how a scent makes you feel. Here's how to find yours.",
    date: "2025-11-01",
    tone: "#3B1018",
    content: [
      "Finding a signature scent isn't about chasing what's popular — it's about noticing what draws you back to the same bottle, week after week.",
      "Start with the families: floral, woody, oriental, fresh. Most people gravitate strongly toward one or two, even before they can name why.",
      "Test on skin, not paper. A fragrance changes as it warms, and the base notes — the ones that stay with you for hours — only reveal themselves after thirty minutes or so.",
      "Live with a sample for a full day before committing. The scent that gets the most compliments by evening is usually the one worth keeping.",
    ],
  },
  {
    slug: "top-heart-base-notes",
    title: "Understanding Top, Heart & Base Notes",
    excerpt:
      "Every fine fragrance unfolds in three acts. Here's what's actually happening in the bottle.",
    date: "2025-10-14",
    tone: "#8C5A2B",
    content: [
      "Top notes are the first impression — light, volatile molecules like citrus and pepper that you smell for the first fifteen minutes and then lose.",
      "Heart notes are the character of the fragrance — usually florals or spices — and typically last two to four hours.",
      "Base notes are the foundation: woods, musks, ambers and resins that anchor the composition and can linger for the rest of the day.",
      "A well-built fragrance moves through all three in a way that feels like a single idea, not three separate ones stitched together.",
    ],
  },
  {
    slug: "art-of-layering",
    title: "The Art of Layering Fragrances",
    excerpt:
      "Layering lets you build a scent that's entirely your own. A few rules make it easy to get right.",
    date: "2025-09-22",
    tone: "#5C6E3E",
    content: [
      "Start with the heavier fragrance as your base layer and apply the lighter one on top — this lets the brighter scent lead without being overwhelmed.",
      "Stay within a shared note family at first: two woody fragrances, or two florals, blend more predictably than opposites.",
      "Apply to pulse points rather than clothing, and give each layer a minute to settle before adding the next.",
      "Keep notes on what you combine — the best layers are rarely accidental twice.",
    ],
  },
  {
    slug: "why-oud-remains-timeless",
    title: "Why Oud Remains Timeless",
    excerpt:
      "One of the world's most precious raw materials, oud has anchored perfumery for centuries. Here's why it endures.",
    date: "2025-08-30",
    tone: "#2A1215",
    content: [
      "Oud is resin formed within agarwood trees as a defense response to infection — a slow, rare process that makes genuine oud extraordinarily valuable.",
      "Its scent profile is complex: woody, smoky, leathery and faintly sweet, all at once, which is why it rarely needs much else around it.",
      "Modern perfumery has found ways to responsibly source and extend oud without diluting its character — a balance ÉLORIA takes seriously in every oud composition.",
      "Worn well, oud doesn't shout. It sits close to the skin and rewards anyone who leans in.",
    ],
  },
  {
    slug: "make-perfume-last-longer",
    title: "How to Make Your Perfume Last Longer",
    excerpt:
      "Small habits make a bigger difference than a heavier hand with the bottle.",
    date: "2025-08-05",
    tone: "#6B4226",
    content: [
      "Moisturized skin holds fragrance far better than dry skin — apply an unscented lotion before spraying.",
      "Target pulse points: wrists, neck, and behind the ears, where body heat helps the fragrance project gently through the day.",
      "Don't rub your wrists together after applying — it breaks down the top notes faster than letting them dry naturally.",
      "Store your bottles away from direct sunlight and heat, which is the single biggest cause of a fragrance losing its character over time.",
    ],
  },
];

export const getArticleBySlug = (slug) =>
  journalArticles.find((a) => a.slug === slug);
