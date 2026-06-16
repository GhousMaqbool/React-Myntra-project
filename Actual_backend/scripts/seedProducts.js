require("dotenv").config();
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const CATEGORY_MAP = {
  "001": "women",
  "002": "men",
  "003": "kids",
  "004": "men",
  "005": "men",
  "006": "men",
  "007": "studio",
  "008": "beauty",
};

const transformLegacyItem = (item) => {
  const imagePath = item.image || "";
  const normalizedImage = imagePath.startsWith("/")
    ? imagePath
    : `/${imagePath.replace(/^images\//, "images/")}`;

  return {
    legacyId: item.id,
    title: item.item_name,
    brand: item.company,
    category: CATEGORY_MAP[item.id] || "studio",
    price: item.current_price,
    originalPrice: item.original_price,
    discount: item.discount_percentage || 0,
    rating: item.rating || { stars: 0, count: 0 },
    description: item.item_name,
    images: [
      normalizedImage,
      `https://picsum.photos/seed/myntra-${item.id}-1/400/500`,
      `https://picsum.photos/seed/myntra-${item.id}-2/400/500`,
    ],
    stock: 25,
    sizes: ["S", "M", "L", "XL"],
    returnPeriod: item.return_period || 14,
    deliveryDate: item.delivery_date || "3-5 business days",
  };
};

const loadLegacyProducts = () => {
  const filePath = path.join(__dirname, "..", "items.json");
  const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const nestedItems = raw.items || raw;

  if (Array.isArray(nestedItems[0])) {
    return nestedItems.flat();
  }

  return nestedItems;
};

const seedProducts = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    const legacyProducts = loadLegacyProducts();
    let inserted = 0;
    let skipped = 0;

    for (const legacyItem of legacyProducts) {
      const payload = transformLegacyItem(legacyItem);
      const existing = await Product.findOne({ legacyId: payload.legacyId });

      if (existing) {
        skipped += 1;
        continue;
      }

      await Product.create(payload);
      inserted += 1;
    }

    console.log(`Seed complete. Inserted: ${inserted}, Skipped (duplicates): ${skipped}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
};

seedProducts();
