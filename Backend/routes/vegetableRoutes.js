// routes/vegetableRoutes.js
const express = require('express');
const {
  addVegetable,
  getVegetables,
  updateVegetable,
  deleteVegetable
} = require('../controllers/vegetableController');
const upload = require('../middlewares/upload');

const { protectAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public route (for users to view vegetables)
router.get('/', getVegetables);

// Admin-only routes
 // ✅ multer config


router.post('/', protectAdmin,upload.single('image'), addVegetable);
router.put('/:id', protectAdmin, updateVegetable);
router.delete('/:id', protectAdmin, deleteVegetable);

module.exports = router;
