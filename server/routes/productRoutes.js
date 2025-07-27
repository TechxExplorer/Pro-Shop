// server/routes/productRoutes.js
const express = require('express');
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(getProducts) // Get all products (Public)
    .post(protect, admin, createProduct); // Create product (Admin only)

router.route('/:id')
    .get(getProductById) // Get single product (Public)
    .put(protect, admin, updateProduct) // Update product (Admin only)
    .delete(protect, admin, deleteProduct); // Delete product (Admin only)

module.exports = router;