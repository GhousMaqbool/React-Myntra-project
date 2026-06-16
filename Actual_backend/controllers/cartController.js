const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const asyncHandler = require("../middleware/asyncHandler");

const calculateTotal = (products) =>
  products.reduce((sum, item) => sum + item.price * item.quantity, 0);

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate({
    path: "products.productId",
    model: "Product",
  });

  if (!cart) {
    cart = await Cart.create({ userId, products: [], totalAmount: 0 });
    cart = await Cart.findById(cart._id).populate({
      path: "products.productId",
      model: "Product",
    });
  }

  return cart;
};

const getCart = asyncHandler(async (req, res) => {
  const cart = await getOrCreateCart(req.userId);
  return sendSuccess(res, 200, "Cart fetched successfully", cart);
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return sendError(res, 400, "productId is required");
  }

  const product = await Product.findById(productId);
  if (!product) {
    return sendError(res, 404, "Product not found");
  }

  const qty = Math.max(parseInt(quantity, 10) || 1, 1);
  let cart = await Cart.findOne({ userId: req.userId });

  if (!cart) {
    cart = new Cart({ userId: req.userId, products: [], totalAmount: 0 });
  }

  const existingIndex = cart.products.findIndex(
    (item) => item.productId.toString() === product._id.toString()
  );

  if (existingIndex > -1) {
    cart.products[existingIndex].quantity += qty;
    cart.products[existingIndex].price = product.price;
  } else {
    cart.products.push({
      productId: product._id,
      quantity: qty,
      price: product.price,
    });
  }

  cart.totalAmount = calculateTotal(cart.products);
  await cart.save();

  const populatedCart = await Cart.findById(cart._id).populate({
    path: "products.productId",
    model: "Product",
  });

  return sendSuccess(res, 200, "Product added to cart", populatedCart);
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return sendError(res, 400, "Quantity must be at least 1");
  }

  const cart = await Cart.findOne({ userId: req.userId });
  if (!cart) {
    return sendError(res, 404, "Cart not found");
  }

  const item = cart.products.find((p) => p.productId.toString() === productId);
  if (!item) {
    return sendError(res, 404, "Product not found in cart");
  }

  item.quantity = parseInt(quantity, 10);
  cart.totalAmount = calculateTotal(cart.products);
  await cart.save();

  const populatedCart = await Cart.findById(cart._id).populate({
    path: "products.productId",
    model: "Product",
  });

  return sendSuccess(res, 200, "Cart updated successfully", populatedCart);
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ userId: req.userId });

  if (!cart) {
    return sendError(res, 404, "Cart not found");
  }

  const initialLength = cart.products.length;
  cart.products = cart.products.filter(
    (item) => item.productId.toString() !== productId
  );

  if (cart.products.length === initialLength) {
    return sendError(res, 404, "Product not found in cart");
  }

  cart.totalAmount = calculateTotal(cart.products);
  await cart.save();

  const populatedCart = await Cart.findById(cart._id).populate({
    path: "products.productId",
    model: "Product",
  });

  return sendSuccess(res, 200, "Product removed from cart", populatedCart);
});

const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId });

  if (!cart) {
    return sendSuccess(res, 200, "Cart already empty", { products: [], totalAmount: 0 });
  }

  cart.products = [];
  cart.totalAmount = 0;
  await cart.save();

  return sendSuccess(res, 200, "Cart cleared successfully", cart);
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
