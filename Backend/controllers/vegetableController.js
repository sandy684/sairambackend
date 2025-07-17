// controllers/vegetableController.js
const Vegetable = require('../models/Vegetable');

// Add new vegetable
const addVegetable = async (req, res) => {
  try {
    const { name, pricePerKg, availableKg } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : ''; // ✅ Get image path if uploaded

    const vegetable = new Vegetable({ name, pricePerKg, availableKg, imageUrl });

    await vegetable.save();
    res.status(201).json(vegetable);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add vegetable", error: err.message });
  }
};

// Get all vegetables
const getVegetables = async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.json(vegetables);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch vegetables" });
  }
};

// Update vegetable
const updateVegetable = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Vegetable.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update vegetable", error: err.message });
  }
};

// Delete vegetable
const deleteVegetable = async (req, res) => {
  try {
    const { id } = req.params;
    await Vegetable.findByIdAndDelete(id);
    res.json({ message: "Vegetable deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete vegetable", error: err.message });
  }
};

module.exports = {
  addVegetable,
  getVegetables,
  updateVegetable,
  deleteVegetable
};
