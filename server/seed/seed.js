// Seeds MongoDB with demo products, users, coupons and reviews.
// Run with: npm run seed  (after copying .env.example to .env)
import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";
import Review from "../models/Review.js";

const productSeed = [
  {
    name: "Noir Élégance", slug: "noir-elegance", category: "Eau de Parfum", gender: "Unisex", fragranceFamily: "Oriental",
    price: 7990, discountPrice: null,
    sizes: [{ size: "50ml", stock: 6 }, { size: "75ml", stock: 28 }, { size: "100ml", stock: 10 }],
    notes: { top: ["Bergamot", "Pink Pepper"], heart: ["Rose", "Jasmine", "Iris"], base: ["Amber", "Vanilla", "Sandalwood"] },
    description: "A sophisticated composition of luminous florals and warm woods, Noir Élégance leaves a refined and unforgettable trail.",
    images: ["/images/products/noir-elegance-1.webp", "/images/products/noir-elegance-2.webp", "/images/products/noir-elegance-3.webp"],
    isFeatured: true, isBestseller: true, isNew: false, rating: 4.8, reviewCount: 0,
  },
  {
    name: "Velours", slug: "velours", category: "Eau de Parfum", gender: "Women", fragranceFamily: "Floral",
    price: 6490, discountPrice: null,
    sizes: [{ size: "50ml", stock: 14 }, { size: "75ml", stock: 22 }],
    notes: { top: ["Pear", "Bergamot"], heart: ["Rose", "Peony"], base: ["Musk", "Vanilla", "Cashmere Wood"] },
    description: "Soft pear and bergamot open onto a heart of rose and peony, settling into a cashmere-soft musk and vanilla base.",
    images: ["/images/products/velours-1.webp", "/images/products/velours-2.webp", "/images/products/velours-3.webp"],
    isFeatured: true, isBestseller: false, isNew: true, rating: 4.6, reviewCount: 0,
  },
  {
    name: "Éclat d'Or", slug: "eclat-dor", category: "Eau de Parfum", gender: "Women", fragranceFamily: "Amber",
    price: 8490, discountPrice: 7640,
    sizes: [{ size: "50ml", stock: 9 }, { size: "100ml", stock: 17 }],
    notes: { top: ["Saffron", "Citrus"], heart: ["Jasmine", "Orange Blossom"], base: ["Amberwood", "Cedar", "Musk"] },
    description: "Golden saffron and citrus give way to jasmine and orange blossom over a radiant amberwood base — pure luminosity.",
    images: ["/images/products/eclat-dor-1.webp", "/images/products/eclat-dor-2.webp", "/images/products/eclat-dor-3.webp"],
    isFeatured: true, isBestseller: true, isNew: false, rating: 4.9, reviewCount: 0,
  },
  {
    name: "Midnight Oud", slug: "midnight-oud", category: "Eau de Parfum", gender: "Unisex", fragranceFamily: "Oud",
    price: 9990, discountPrice: null,
    sizes: [{ size: "50ml", stock: 5 }, { size: "100ml", stock: 12 }],
    notes: { top: ["Saffron", "Cardamom"], heart: ["Rose", "Oud"], base: ["Leather", "Amber", "Sandalwood"] },
    description: "Saffron and cardamom lead into a smoky rose-oud heart, resting on leather, amber and sandalwood after dark.",
    images: ["/images/products/midnight-oud-1.webp", "/images/products/midnight-oud-2.webp", "/images/products/midnight-oud-3.webp"],
    isFeatured: false, isBestseller: true, isNew: false, rating: 4.7, reviewCount: 0,
  },
  {
    name: "Maison Blanche", slug: "maison-blanche", category: "Eau de Toilette", gender: "Unisex", fragranceFamily: "Fresh",
    price: 5990, discountPrice: null,
    sizes: [{ size: "50ml", stock: 20 }, { size: "75ml", stock: 31 }],
    notes: { top: ["Lemon", "Neroli"], heart: ["White Flowers"], base: ["Musk", "Cedar"] },
    description: "Lemon and neroli open into a bouquet of white flowers, resting gently on musk and cedar. Effortless and bright.",
    images: ["/images/products/maison-blanche-1.webp", "/images/products/maison-blanche-2.webp", "/images/products/maison-blanche-3.webp"],
    isFeatured: false, isBestseller: false, isNew: true, rating: 4.5, reviewCount: 0,
  },
  {
    name: "Rose Noire", slug: "rose-noire", category: "Eau de Parfum", gender: "Women", fragranceFamily: "Floral",
    price: 7490, discountPrice: null,
    sizes: [{ size: "50ml", stock: 3 }, { size: "75ml", stock: 18 }],
    notes: { top: ["Blackcurrant"], heart: ["Damask Rose"], base: ["Patchouli", "Amber", "Musk"] },
    description: "Blackcurrant opens onto a dramatic heart of damask rose, deepened by patchouli, amber and musk.",
    images: ["/images/products/rose-noire-1.webp", "/images/products/rose-noire-2.webp", "/images/products/rose-noire-3.webp"],
    isFeatured: false, isBestseller: false, isNew: false, rating: 4.6, reviewCount: 0,
  },
  {
    name: "Santal 24", slug: "santal-24", category: "Eau de Parfum", gender: "Unisex", fragranceFamily: "Woody",
    price: 8990, discountPrice: null,
    sizes: [{ size: "75ml", stock: 11 }, { size: "100ml", stock: 14 }],
    notes: { top: ["Bergamot"], heart: ["Sandalwood"], base: ["Vanilla", "Tonka Bean", "Musk"] },
    description: "Creamy sandalwood at its core, wrapped in vanilla, tonka bean and musk. A modern woody signature.",
    images: ["/images/products/santal-24-1.webp", "/images/products/santal-24-2.webp", "/images/products/santal-24-3.webp"],
    isFeatured: true, isBestseller: true, isNew: false, rating: 4.8, reviewCount: 0,
  },
  {
    name: "Azure Homme", slug: "azure-homme", category: "Eau de Toilette", gender: "Men", fragranceFamily: "Fresh",
    price: 6990, discountPrice: null,
    sizes: [{ size: "50ml", stock: 25 }, { size: "100ml", stock: 19 }],
    notes: { top: ["Grapefruit", "Marine Accord"], heart: ["Lavender", "Geranium"], base: ["Vetiver", "Cedarwood"] },
    description: "Grapefruit and a marine accord open into lavender and geranium, grounded by vetiver and cedarwood.",
    images: ["/images/products/azure-homme-1.webp", "/images/products/azure-homme-2.webp", "/images/products/azure-homme-3.webp"],
    isFeatured: false, isBestseller: false, isNew: false, rating: 4.4, reviewCount: 0,
  },
  {
    name: "Lumière", slug: "lumiere", category: "Eau de Parfum", gender: "Women", fragranceFamily: "Floral",
    price: 7290, discountPrice: null,
    sizes: [{ size: "50ml", stock: 16 }, { size: "75ml", stock: 8 }],
    notes: { top: ["Mandarin", "Pear"], heart: ["Iris", "Jasmine"], base: ["White Musk", "Amber"] },
    description: "Mandarin and pear give way to iris and jasmine, resting on white musk and amber — radiant and weightless.",
    images: ["/images/products/lumiere-1.webp", "/images/products/lumiere-2.webp", "/images/products/lumiere-3.webp"],
    isFeatured: false, isBestseller: false, isNew: true, rating: 4.7, reviewCount: 0,
  },
  {
    name: "Oud Royal", slug: "oud-royal", category: "Eau de Parfum", gender: "Unisex", fragranceFamily: "Oud",
    price: 11990, discountPrice: null,
    sizes: [{ size: "50ml", stock: 4 }, { size: "100ml", stock: 7 }],
    notes: { top: ["Saffron"], heart: ["Oud", "Rose"], base: ["Amber", "Leather", "Vanilla"] },
    description: "Saffron opens the most opulent composition in the house — precious oud and rose over amber, leather and vanilla.",
    images: ["/images/products/oud-royal-1.webp", "/images/products/oud-royal-2.webp", "/images/products/oud-royal-3.webp"],
    isFeatured: true, isBestseller: false, isNew: false, rating: 4.9, reviewCount: 0,
  },
  {
    name: "Velvet Bloom", slug: "velvet-bloom", category: "Eau de Parfum", gender: "Women", fragranceFamily: "Musky",
    price: 6790, discountPrice: null,
    sizes: [{ size: "50ml", stock: 13 }, { size: "75ml", stock: 21 }],
    notes: { top: ["Peach", "Bergamot"], heart: ["Tuberose", "Jasmine"], base: ["Musk", "Vanilla"] },
    description: "Peach and bergamot open onto tuberose and jasmine, softened by musk and vanilla for a warm, velvety finish.",
    images: ["/images/products/velvet-bloom-1.webp", "/images/products/velvet-bloom-2.webp", "/images/products/velvet-bloom-3.webp"],
    isFeatured: false, isBestseller: false, isNew: false, rating: 4.5, reviewCount: 0,
  },
  {
    name: "Terre d'Éloria", slug: "terre-deloria", category: "Eau de Parfum", gender: "Men", fragranceFamily: "Woody",
    price: 7890, discountPrice: null,
    sizes: [{ size: "75ml", stock: 15 }, { size: "100ml", stock: 9 }],
    notes: { top: ["Citrus", "Black Pepper"], heart: ["Vetiver"], base: ["Cedar", "Patchouli", "Amber"] },
    description: "Citrus and black pepper open into a heart of vetiver, resting on cedar, patchouli and amber. Grounded and refined.",
    images: ["/images/products/terre-deloria-1.webp", "/images/products/terre-deloria-2.webp", "/images/products/terre-deloria-3.webp"],
    isFeatured: false, isBestseller: false, isNew: false, rating: 4.6, reviewCount: 0,
  },
  {
    name: "Opale", slug: "opale", category: "Eau de Toilette", gender: "Women", fragranceFamily: "Citrus",
    price: 4990, discountPrice: null,
    sizes: [{ size: "50ml", stock: 30 }, { size: "75ml", stock: 26 }],
    notes: { top: ["Yuzu", "Mandarin"], heart: ["Freesia", "Muguet"], base: ["White Musk"] },
    description: "A sparkling citrus opening of yuzu and mandarin over a light floral heart — an everyday radiance.",
    images: ["/images/products/opale-1.webp", "/images/products/opale-2.webp", "/images/products/opale-3.webp"],
    isFeatured: false, isBestseller: false, isNew: true, rating: 4.3, reviewCount: 0,
  },
  {
    name: "Ambre Nuit", slug: "ambre-nuit", category: "Eau de Parfum", gender: "Unisex", fragranceFamily: "Amber",
    price: 8290, discountPrice: null,
    sizes: [{ size: "50ml", stock: 10 }, { size: "100ml", stock: 6 }],
    notes: { top: ["Cinnamon", "Orange"], heart: ["Labdanum", "Benzoin"], base: ["Amber", "Musk", "Tobacco"] },
    description: "A dense, resinous amber wrapped in dark spices and a whisper of smoke — worn best after sundown.",
    images: ["/images/products/ambre-nuit-1.webp", "/images/products/ambre-nuit-2.webp", "/images/products/ambre-nuit-3.webp"],
    isFeatured: false, isBestseller: false, isNew: false, rating: 4.7, reviewCount: 0,
  },
  {
    name: "Cèdre Blanc", slug: "cedre-blanc", category: "Eau de Parfum", gender: "Men", fragranceFamily: "Woody",
    price: 7590, discountPrice: null,
    sizes: [{ size: "50ml", stock: 2 }, { size: "100ml", stock: 13 }],
    notes: { top: ["Bergamot", "Cardamom"], heart: ["Cedar", "Iris"], base: ["Vetiver", "Musk"] },
    description: "Crisp cedar and iris over a base of vetiver and soft musk — clean, architectural, quietly confident.",
    images: ["/images/products/cedre-blanc-1.webp", "/images/products/cedre-blanc-2.webp", "/images/products/cedre-blanc-3.webp"],
    isFeatured: false, isBestseller: false, isNew: false, rating: 4.5, reviewCount: 0,
  },
  {
    name: "Jardin Secret", slug: "jardin-secret", category: "Eau de Parfum", gender: "Women", fragranceFamily: "Floral",
    price: 6990, discountPrice: 6290,
    sizes: [{ size: "50ml", stock: 17 }, { size: "75ml", stock: 24 }],
    notes: { top: ["Green Tea", "Bergamot"], heart: ["Lily of the Valley", "Jasmine"], base: ["White Musk", "Cedar"] },
    description: "A verdant floral bouquet of lily of the valley and green tea, softened by white musk. A hidden garden, bottled.",
    images: ["/images/products/jardin-secret-1.webp", "/images/products/jardin-secret-2.webp", "/images/products/jardin-secret-3.webp"],
    isFeatured: false, isBestseller: false, isNew: true, rating: 4.8, reviewCount: 0,
  },
];

const couponSeed = [
  { code: "ELORIA10", discountType: "percent", discountValue: 10, minOrder: 0 },
  { code: "WELCOME15", discountType: "percent", discountValue: 15, minOrder: 5000 },
  { code: "FIRSTORDER", discountType: "flat", discountValue: 500, minOrder: 4000 },
  { code: "OUD2000", discountType: "flat", discountValue: 2000, minOrder: 10000, isActive: false },
  { code: "SUMMER20", discountType: "percent", discountValue: 20, minOrder: 6000, isActive: false },
];

const demoReviewSeed = [
  { slug: "noir-elegance", rating: 5, title: "Absolutely beautiful.", comment: "Elegant, warm and incredibly long-lasting. This has quickly become my signature fragrance." },
  { slug: "noir-elegance", rating: 5, title: "Compliment magnet", comment: "I get stopped and asked what I'm wearing almost every time. Worth every rupee." },
  { slug: "eclat-dor", rating: 5, title: "Golden and radiant", comment: "The saffron opening is stunning and it settles into something so warm and comforting." },
  { slug: "eclat-dor", rating: 4, title: "Lovely, but strong", comment: "A little goes a long way — two sprays lasted me the whole day." },
  { slug: "midnight-oud", rating: 5, title: "My evening signature", comment: "Smoky, rich, and mysterious without being heavy. Perfect for dinners out." },
  { slug: "santal-24", rating: 5, title: "Creamy sandalwood perfection", comment: "Unisex, warm, and never overpowering. My partner wears it too." },
  { slug: "velours", rating: 4, title: "Soft and romantic", comment: "Beautiful rose-peony blend, great for daytime wear." },
  { slug: "oud-royal", rating: 5, title: "Worth the investment", comment: "This is as close to a bespoke oud as I've found off the shelf. Exceptional." },
];

async function seed() {
  await connectDB();
  console.log("Clearing existing demo data...");
  await Promise.all([
    Product.deleteMany({}),
    Coupon.deleteMany({}),
    Review.deleteMany({}),
    User.deleteMany({ email: { $in: ["admin@eloria.com", "demo@eloria.com"] } }),
  ]);

  console.log("Seeding users...");
  const admin = await User.create({
    name: "Éloria Admin", email: "admin@eloria.com", phone: "9999999999", password: "Admin@123", role: "admin",
  });
  const demoCustomer = await User.create({
    name: "Demo Customer", email: "demo@eloria.com", phone: "9876543210", password: "Demo@123", role: "customer",
  });
  // A handful of extra customers so the admin dashboard/customers list isn't empty.
  const extraNames = ["Ananya R.", "Karan M.", "Priya S.", "Aditya V.", "Ritika D.", "Simran K.", "Farhan A.", "Neha T.", "Rahul B.", "Divya P."];
  const extraUsers = await User.insertMany(
    extraNames.map((name, i) => ({
      name,
      email: `demo-user-${i + 1}@eloria.com`,
      phone: `90000000${10 + i}`,
      password: "Password@123",
      role: "customer",
    }))
  );

  console.log("Seeding products...");
  const products = await Product.insertMany(productSeed);

  console.log("Seeding coupons...");
  await Coupon.insertMany(couponSeed);

  console.log("Seeding reviews...");
  const slugToId = Object.fromEntries(products.map((p) => [p.slug, p._id]));
  const reviewers = [demoCustomer, ...extraUsers];
  const reviewDocs = demoReviewSeed.map((r, i) => ({
    user: reviewers[i % reviewers.length]._id,
    product: slugToId[r.slug],
    rating: r.rating,
    title: r.title,
    comment: r.comment,
    verifiedPurchase: true,
  }));
  await Review.insertMany(reviewDocs);

  // Recompute rating/reviewCount per product from seeded reviews.
  for (const slug of Object.keys(slugToId)) {
    const productReviews = await Review.find({ product: slugToId[slug] });
    if (productReviews.length) {
      const avg = productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length;
      await Product.findByIdAndUpdate(slugToId[slug], { rating: avg, reviewCount: productReviews.length });
    }
  }

  console.log("\nSeed complete.");
  console.log(`  Products: ${products.length}`);
  console.log(`  Coupons: ${couponSeed.length}`);
  console.log(`  Reviews: ${reviewDocs.length}`);
  console.log(`  Admin login: admin@eloria.com / Admin@123`);
  console.log(`  Customer login: demo@eloria.com / Demo@123`);

  await mongoose.connection.close();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
