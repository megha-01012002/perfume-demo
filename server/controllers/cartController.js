import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

async function findOrCreateCart(userId) {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) cart = await Cart.create({ user: userId, items: [] });
  return cart;
}

export async function getCart(req, res, next) {
  try {
    const cart = await findOrCreateCart(req.user._id);
    res.json({ cart });
  } catch (err) {
    next(err);
  }
}

export async function addToCart(req, res, next) {
  try {
    const { productId, size, qty = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found." });

    const sizeEntry = product.sizes.find((s) => s.size === size);
    if (!sizeEntry || sizeEntry.stock < qty) {
      return res.status(400).json({ message: "Selected size is out of stock." });
    }

    const cart = await findOrCreateCart(req.user._id);
    const existing = cart.items.find((i) => i.product.equals(productId) && i.size === size);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.items.push({ product: productId, size, qty, price: product.discountPrice || product.price });
    }
    await cart.save();
    res.status(201).json({ cart });
  } catch (err) {
    next(err);
  }
}

export async function updateCartItem(req, res, next) {
  try {
    const { qty } = req.body;
    const cart = await findOrCreateCart(req.user._id);
    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found." });
    if (qty < 1) {
      item.deleteOne();
    } else {
      item.qty = qty;
    }
    await cart.save();
    res.json({ cart });
  } catch (err) {
    next(err);
  }
}

export async function removeCartItem(req, res, next) {
  try {
    const cart = await findOrCreateCart(req.user._id);
    cart.items = cart.items.filter((i) => i._id.toString() !== req.params.itemId);
    await cart.save();
    res.json({ cart });
  } catch (err) {
    next(err);
  }
}
