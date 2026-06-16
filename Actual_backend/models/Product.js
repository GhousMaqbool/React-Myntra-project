const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    legacyId: {
      type: String,
      unique: true,
      sparse: true,
    },
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, "Brand is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["men", "women", "kids", "beauty", "studio"],
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Original price is required"],
      min: [0, "Original price cannot be negative"],
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    rating: {
      stars: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      default: 10,
      min: 0,
    },
    sizes: {
      type: [String],
      default: ["S", "M", "L", "XL"],
    },
    returnPeriod: { type: Number, default: 14 },
    deliveryDate: { type: String, default: "3-5 business days" },
  },
  { timestamps: true }
);

productSchema.index({ title: "text", brand: "text", description: "text" });
productSchema.index({ category: 1 });

module.exports = mongoose.model("Product", productSchema);
