// server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler'); // Make sure you've run 'npm install express-async-handler'
const User = require('../models/User'); // Ensure this path to your User model is correct

// Middleware to protect routes (ensure user is logged in)
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for authorization header with 'Bearer' token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header (e.g., "Bearer TOKEN_STRING")
            token = req.headers.authorization.split(' ')[1];

            // Verify token using JWT_SECRET from your server's .env
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID from the token payload and attach to request object
            // .select('-password') excludes the password from the returned user object
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Not authorized, token failed:', error.message); // Log the specific error
            res.status(401); // Unauthorized status
            throw new Error('Not authorized, token failed');
        }
    }

    // If no token is found in the header
    if (!token) {
        res.status(401); // Unauthorized status
        throw new Error('Not authorized, no token');
    }
});

// Middleware to check if the user is an admin
const admin = (req, res, next) => {
    // Check if user is authenticated (req.user exists) and if they are an admin
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, proceed
    } else {
        res.status(403); // Forbidden status
        throw new Error('Not authorized as an admin');
    }
};

// Export the middleware functions
module.exports = { protect, admin };