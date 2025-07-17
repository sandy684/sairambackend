const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierModel');

// POST: Add Supplier
router.post('/', async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).json({ message: 'Supplier added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error adding supplier', error: err });
  }
});
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error });
  }
});

// GET: View Suppliers (optional)
router.get('/', async (req, res) => {
  const suppliers = await Supplier.find();
  res.json(suppliers);
});

module.exports = router;
