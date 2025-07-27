// server/routes/authRoutes.js
const express = require('express');
const {
    authUser,       // <--- Changed from loginUser to authUser
    registerUser,
    getUserProfile,
} = require('../controllers/authController'); // Ensure this path is correct
const { protect } = require('../middleware/authMiddleware'); // Ensure this path is correct

const router = express.Router();

// Public routes
router.post('/login', authUser);    // <--- Changed from loginUser to authUser
router.post('/register', registerUser);

// Protected routes
router.get('/profile', protect, getUserProfile); // Requires authentication

module.exports = router;