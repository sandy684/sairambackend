// routes/orderRoutes.js
const express = require('express');
const {
  placeOrder,
  getOrders,
  markDelivered
} = require('../controllers/orderController');

const { protectAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// User places order
router.post('/', placeOrder);

// Admin-only
router.get('/', protectAdmin, getOrders);
router.put('/:id/status', protectAdmin, markDelivered);

module.exports = router;
