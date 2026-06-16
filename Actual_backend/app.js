require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const contactRoutes = require("./routes/contactRoutes");

const Product = require("./models/Product");
const { sendSuccess, sendError } = require("./utils/apiResponse");
const asyncHandler = require("./middleware/asyncHandler");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    exposedHeaders: ["x-user-id"],
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/images", express.static(path.join(__dirname, "..", "Myntra_React_Clone", "public", "images")));
app.use("/FlipImages", express.static(path.join(__dirname, "..", "Myntra_React_Clone", "public", "FlipImages")));

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/contact", contactRoutes);

app.post("/contact", asyncHandler(async (req, res) => {
  const contactController = require("./controllers/contactController");
  return contactController.createContact(req, res);
}));

app.get("/items", asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  const legacyItems = products.map((product) => ({
    id: product.legacyId || product._id.toString(),
    _id: product._id,
    item_name: product.title,
    company: product.brand,
    current_price: product.price,
    original_price: product.originalPrice,
    discount_percentage: product.discount,
    rating: product.rating,
    image: product.images[0] || "",
    images: product.images,
    category: product.category,
    return_period: product.returnPeriod,
    delivery_date: product.deliveryDate,
    description: product.description,
    stock: product.stock,
    sizes: product.sizes,
  }));

  return sendSuccess(res, 200, "Items fetched successfully", { items: legacyItems });
}));

app.use((req, res) => {
  sendError(res, 404, `Route not found: ${req.method} ${req.originalUrl}`);
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Run `npm run seed` to populate products if the database is empty.");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
