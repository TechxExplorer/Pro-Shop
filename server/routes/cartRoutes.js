// server/routes/cartRoutes.js
const express = require('express');
const {
    getUserCart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All cart routes require protection (user must be logged in)
router.route('/')
    .get(protect, getUserCart)
    .post(protect, addItemToCart)
    .delete(protect, clearCart);

router.route('/remove') // Specific route for removing quantity or item
    .put(protect, removeItemFromCart);

module.exports = router;