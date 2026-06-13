const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  // add other fields present in your items.json
});

module.exports = mongoose.model('Item', itemSchema);