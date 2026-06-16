const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const asyncHandler = require("../middleware/asyncHandler");

const getOrCreateWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ userId }).populate({
    path: "products",
    model: "Product",
  });

  if (!wishlist) {
    wishlist = await Wishlist.create({ userId, products: [] });
    wishlist = await Wishlist.findById(wishlist._id).populate({
      path: "products",
      model: "Product",
    });
  }

  return wishlist;
};

const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await getOrCreateWishlist(req.userId);
  return sendSuccess(res, 200, "Wishlist fetched successfully", wishlist);
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return sendError(res, 400, "productId is required");
  }

  const product = await Product.findById(productId);
  if (!product) {
    return sendError(res, 404, "Product not found");
  }

  let wishlist = await Wishlist.findOne({ userId: req.userId });

  if (!wishlist) {
    wishlist = new Wishlist({ userId: req.userId, products: [] });
  }

  const exists = wishlist.products.some((id) => id.toString() === product._id.toString());
  if (exists) {
    return sendError(res, 409, "Product already in wishlist");
  }

  wishlist.products.push(product._id);
  await wishlist.save();

  const populatedWishlist = await Wishlist.findById(wishlist._id).populate({
    path: "products",
    model: "Product",
  });

  return sendSuccess(res, 200, "Product added to wishlist", populatedWishlist);
});

const removeFromWishlist = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const wishlist = await Wishlist.findOne({ userId: req.userId });

  if (!wishlist) {
    return sendError(res, 404, "Wishlist not found");
  }

  const initialLength = wishlist.products.length;
  wishlist.products = wishlist.products.filter((productId) => productId.toString() !== id);

  if (wishlist.products.length === initialLength) {
    return sendError(res, 404, "Product not found in wishlist");
  }

  await wishlist.save();

  const populatedWishlist = await Wishlist.findById(wishlist._id).populate({
    path: "products",
    model: "Product",
  });

  return sendSuccess(res, 200, "Product removed from wishlist", populatedWishlist);
});

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
