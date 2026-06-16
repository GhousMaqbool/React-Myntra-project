const Product = require("../models/Product");
const { sendSuccess, sendError } = require("../utils/apiResponse");
const asyncHandler = require("../middleware/asyncHandler");

const sanitizeProductInput = (body) => {
  const {
    title,
    brand,
    category,
    price,
    originalPrice,
    discount,
    rating,
    description,
    images,
    stock,
    sizes,
    returnPeriod,
    deliveryDate,
    legacyId,
  } = body;

  return {
    ...(legacyId !== undefined && { legacyId: String(legacyId).trim() }),
    ...(title !== undefined && { title: String(title).trim() }),
    ...(brand !== undefined && { brand: String(brand).trim() }),
    ...(category !== undefined && { category: String(category).toLowerCase().trim() }),
    ...(price !== undefined && { price: Number(price) }),
    ...(originalPrice !== undefined && { originalPrice: Number(originalPrice) }),
    ...(discount !== undefined && { discount: Number(discount) }),
    ...(rating !== undefined && { rating }),
    ...(description !== undefined && { description: String(description).trim() }),
    ...(images !== undefined && { images: Array.isArray(images) ? images : [images] }),
    ...(stock !== undefined && { stock: Number(stock) }),
    ...(sizes !== undefined && { sizes: Array.isArray(sizes) ? sizes : [sizes] }),
    ...(returnPeriod !== undefined && { returnPeriod: Number(returnPeriod) }),
    ...(deliveryDate !== undefined && { deliveryDate: String(deliveryDate).trim() }),
  };
};

const buildProductQuery = (query) => {
  const filter = {};

  if (query.category) {
    filter.category = String(query.category).toLowerCase();
  }

  if (query.search) {
    const searchRegex = new RegExp(String(query.search).trim(), "i");
    filter.$or = [
      { title: searchRegex },
      { brand: searchRegex },
      { description: searchRegex },
    ];
  }

  return filter;
};

const getProducts = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 12, 1), 100);
  const skip = (page - 1) * limit;
  const filter = buildProductQuery(req.query);

  const [products, total] = await Promise.all([
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(filter),
  ]);

  return sendSuccess(res, 200, "Products fetched successfully", products, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let product = await Product.findById(id);
  if (!product) {
    product = await Product.findOne({ legacyId: id });
  }

  if (!product) {
    return sendError(res, 404, "Product not found");
  }

  return sendSuccess(res, 200, "Product fetched successfully", product);
});

const createProduct = asyncHandler(async (req, res) => {
  const payload = sanitizeProductInput(req.body);

  if (!payload.title || !payload.brand || !payload.category) {
    return sendError(res, 400, "Title, brand, and category are required");
  }

  if (payload.price === undefined || payload.originalPrice === undefined) {
    return sendError(res, 400, "Price and originalPrice are required");
  }

  const product = await Product.create(payload);
  return sendSuccess(res, 201, "Product created successfully", product);
});

const updateProduct = asyncHandler(async (req, res) => {
  const payload = sanitizeProductInput(req.body);
  const product = await Product.findByIdAndUpdate(req.params.id, payload, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return sendError(res, 404, "Product not found");
  }

  return sendSuccess(res, 200, "Product updated successfully", product);
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return sendError(res, 404, "Product not found");
  }

  return sendSuccess(res, 200, "Product deleted successfully", product);
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
