const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  orders: [
    {
      product: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  status: {
    type: String,
    enum: ['Pending', 'Done'],
    default: 'Pending'
  }
});


module.exports = mongoose.model('Supplier', supplierSchema);
