import Review from "../models/Review.js";
import Product from "../models/Product.js";

export async function getReviews(req, res, next) {
  try {
    const reviews = await Review.find({ product: req.params.id }).populate("user", "name").sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (err) {
    next(err);
  }
}

export async function createReview(req, res, next) {
  try {
    const { rating, title, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found." });

    const review = await Review.create({
      user: req.user._id,
      product: product._id,
      rating,
      title,
      comment,
    });

    const allReviews = await Review.find({ product: product._id });
    product.reviewCount = allReviews.length;
    product.rating = allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length;
    await product.save();

    res.status(201).json({ review });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: "You've already reviewed this product." });
    }
    next(err);
  }
}
