const Order = require('../models/Order');

// 📦 Place an order
const placeOrder = async (req, res) => {
  try {
    const { customer, items } = req.body;

    if (!customer || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing customer or order data" });
    }

    const newOrder = new Order({ customer, items });
    await newOrder.save();

    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

// 📅 Get all orders (with optional date filtering)
const getOrders = async (req, res) => {
  try {
    const { date } = req.query;

    let filter = {};
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1); // Include whole day

      filter.createdAt = {
        $gte: start,
        $lt: end,
      };
    }

    const orders = await Order.find(filter).populate('items.vegetableId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders", error: err.message });
  }
};

// ✅ Mark order as delivered
const markDelivered = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: 'Delivered' },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to update order", error: err.message });
  }
};

module.exports = {
  placeOrder,
  getOrders,
  markDelivered
};
