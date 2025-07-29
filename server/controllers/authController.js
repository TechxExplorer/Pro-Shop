const asyncHandler = require('express-async-handler');
const User = require('../models/User'); // Ensure this path is correct
const generateToken = require('../utils/generateToken'); // Ensure this path is correct

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    console.log('Register attempt for email:', email); // Debug: Log registration attempt

    const userExists = await User.findOne({ email });

    if (userExists) {
        console.log('Registration failed: User already exists for email:', email); // Debug: User exists
        res.status(400); // Bad request
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password, // Password will be hashed by pre-save middleware in User model
        isAdmin: false, // Default to false for new registrations
    });

    if (user) {
        console.log('User registered successfully:', user.email); // Debug: User created
        res.status(201).json({ // Created
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // Generate JWT
        });
    } else {
        console.log('Registration failed: Invalid user data received for email:', email); // Debug: Invalid data
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // --- DEBUGGING LOGS START ---
    console.log('--- LOGIN ATTEMPT ---');
    console.log('Received email:', email);
    console.log('Received password (raw):', password); // For debugging only! Do NOT log in production.
    // --- DEBUGGING LOGS END ---

    const user = await User.findOne({ email });

    if (user) {
        // --- DEBUGGING LOGS START ---
        console.log('User found in database:', user.email);
        console.log('User isAdmin status:', user.isAdmin);
        // --- DEBUGGING LOGS END ---

        // Attempt to match the password
        const passwordMatches = await user.matchPassword(password);

        // --- DEBUGGING LOGS START ---
        console.log('Password comparison result (user.matchPassword):', passwordMatches);
        // --- DEBUGGING LOGS END ---

        if (passwordMatches) {
            console.log('Login successful for user:', user.email); // Debug: Success
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id), // Generate JWT
            });
        } else {
            console.log('Login failed: Password did not match for user:', email); // Debug: Password mismatch
            res.status(401); // Unauthorized
            throw new Error('Invalid email or password');
        }
    } else {
        console.log('Login failed: User NOT found with email:', email); // Debug: User not found
        res.status(401); // Unauthorized
        throw new Error('Invalid email or password');
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    // req.user is available from the protect middleware (which is not provided here, but assumed)
    // console.log('Getting profile for user ID:', req.user._id); // Debug: Check user ID
    const user = await User.findById(req.user._id);

    if (user) {
        // console.log('User profile found:', user.email); // Debug: Profile found
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        console.log('User profile not found for ID:', req.user._id); // Debug: Profile not found
        res.status(404);
        throw new Error('User not found');
    }
});

module.exports = { registerUser, authUser, getUserProfile };