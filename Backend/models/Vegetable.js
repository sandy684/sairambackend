// models/Vegetable.js
const mongoose = require('mongoose');

const vegetableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  pricePerKg: {
    type: Number,
    required: true
  },
  availableKg: {
    type: Number,
    required: true
  },
  image: {
  type: String,
  required: false // or true if you want to enforce it
}
});

module.exports = mongoose.model("Vegetable", vegetableSchema);
