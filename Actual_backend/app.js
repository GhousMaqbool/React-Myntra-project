const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs'); // Added to read items.json
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connection with Auto-Seeding Logic
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB Atlas");
    await seedIfEmpty(); // Run check every time server starts
  })
  .catch(err => console.error("Database error:", err));

// 2. Define the Schema
const itemSchema = new mongoose.Schema({
  id: String,
  item_name: String,
  original_price: Number,
  current_price: Number,
  discount_percentage: Number,
  return_period: Number,
  delivery_date: String,
  rating: Object,
  image: String,
  company: String
});

const Item = mongoose.model('Item', itemSchema);
// Actual_backend/app.js

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);

// 3. The Auto-Seed Function
async function seedIfEmpty() {
  try {
    const count = await Item.countDocuments();
    if (count === 0) {
      console.log("Database is empty. Seeding data from items.json...");
      const data = JSON.parse(fs.readFileSync('./items.json', 'utf-8'));
      await Item.insertMany(data);
      console.log("Seeding complete!");
    } else {
      console.log("Database already has data. Skipping seed.");
    }
  } catch (err) {
    console.error("Seeding error:", err);
  }
}

// 4. The API Route your Frontend calls
app.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json({ items });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.listen(8080, () => console.log("Server running on port 8080"));
// Actual_backend/app.js

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save(); // This stores the message in MongoDB Atlas
    res.status(201).json({ message: "Contact message saved!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to save message" });
  }
});