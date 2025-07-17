// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: {
        type: String,
        required: true,
        trim: true
      },
      phone: {
        type: String,
        required: true,
        trim: true
      },
      address: {
        type: String,
        required: true,
        trim: true
      }
    },
    items: [
      {
        vegetableId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Vegetable',
          required: true
        },
        quantityKg: {
          type: Number,
          required: true,
          min: 0.1
        }
      }
    ],
    status: {
      type: String,
      enum: ['Pending', 'Delivered'],
      default: 'Pending'
    },
    orderDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('Order', orderSchema);
