import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema(
  {
    size: { type: String, required: true }, // "50ml" | "75ml" | "100ml"
    stock: { type: Number, required: true, default: 0, min: 0 },
  },
  { _id: false }
);

const notesSchema = new mongoose.Schema(
  {
    top: [String],
    heart: [String],
    base: [String],
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: null },
    category: { type: String, default: "Eau de Parfum" },
    gender: { type: String, enum: ["Women", "Men", "Unisex"], required: true },
    fragranceFamily: {
      type: String,
      enum: ["Floral", "Woody", "Oriental", "Fresh", "Citrus", "Musky", "Amber", "Oud"],
      required: true,
    },
    sizes: [sizeSchema],
    images: [{ type: String }],
    notes: notesSchema,
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isNew: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });

export default mongoose.model("Product", productSchema);
