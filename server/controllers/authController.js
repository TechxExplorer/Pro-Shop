// server/controllers/authController.js
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken'); // Ensure this path is correct and generateToken exists
const User = require('../models/User'); // Ensure this path to your User model is correct

// @desc    Authenticate user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches (assuming matchPassword method on User model)
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin, // Include isAdmin status
            token: generateToken(user._id), // Generate and send JWT token
        });
    } else {
        res.status(401); // Unauthorized
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user with this email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400); // Bad Request
        throw new Error('User already exists');
    }

    // Create new user (password will be hashed by a pre-save hook in your User model)
    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({ // 201 Created
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private (requires authentication token)
const getUserProfile = asyncHandler(async (req, res) => {
    // req.user is populated by the 'protect' middleware (if used before this route)
    const user = await User.findById(req.user._id).select('-password'); // Exclude password

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Export the controller functions
module.exports = {
    authUser,      // This is your login function
    registerUser,
    getUserProfile,
};