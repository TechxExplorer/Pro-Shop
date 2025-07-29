const express = require('express');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    // You might want a specific controller for admin products, or reuse getProducts
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Define routes for fetching/creating products
router.route('/')
    .get(getProducts) // Get all products (Public)
    .post(protect, admin, createProduct); // Create product (Admin only)

// IMPORTANT: Define more specific routes BEFORE generic ones with parameters
// For example, if you want a dedicated endpoint for admin product listing:
router.get('/admin', protect, admin, getProducts); // <--- ADD THIS LINE (or similar)
// This assumes `getProducts` is suitable for both public and admin lists.
// If admin list needs different logic (e.g., more details, drafts), create a `getAdminProducts` controller.

// Define routes for single product operations (with :id parameter)
router.route('/:id')
    .get(getProductById) // Get single product (Public)
    .put(protect, admin, updateProduct) // Update product (Admin only)
    .delete(protect, admin, deleteProduct); // Delete product (Admin only)

module.exports = router;