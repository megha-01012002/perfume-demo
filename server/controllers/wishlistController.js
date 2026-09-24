import Wishlist from "../models/Wishlist.js";

async function findOrCreateWishlist(userId) {
  let wishlist = await Wishlist.findOne({ user: userId }).populate("products");
  if (!wishlist) wishlist = await Wishlist.create({ user: userId, products: [] });
  return wishlist;
}

export async function getWishlist(req, res, next) {
  try {
    const wishlist = await findOrCreateWishlist(req.user._id);
    res.json({ wishlist });
  } catch (err) {
    next(err);
  }
}

export async function addToWishlist(req, res, next) {
  try {
    const { productId } = req.body;
    const wishlist = await findOrCreateWishlist(req.user._id);
    if (!wishlist.products.some((p) => p.equals(productId))) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
    res.status(201).json({ wishlist });
  } catch (err) {
    next(err);
  }
}

export async function removeFromWishlist(req, res, next) {
  try {
    const wishlist = await findOrCreateWishlist(req.user._id);
    wishlist.products = wishlist.products.filter((p) => p.toString() !== req.params.productId);
    await wishlist.save();
    res.json({ wishlist });
  } catch (err) {
    next(err);
  }
}
