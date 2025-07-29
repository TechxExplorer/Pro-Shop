const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path'); // Added for serving static files

// Import routes
const authRoutes = require('./routes/authRoutes'); // Your new auth routes
const productRoutes = require('./routes/productRoutes');
// const cartRoutes = require('./routes/cartRoutes'); // Uncomment if you have this file and need it

// Error handling middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins (adjust in production)
app.use(express.json()); // Body parser for JSON data

// Mount Routes
app.use('/api/auth', authRoutes); // Use the new auth routes
app.use('/api/products', productRoutes);
// app.use('/api/cart', cartRoutes); // Uncomment if you have this file and need it

// Serve static images (if you store images locally in a 'public/images' folder)
// Ensure you have a 'public' directory at the root of your server project
// and an 'images' folder inside it if you're using paths like '/images/sample.jpg'
app.use('/images', express.static(path.join(__dirname, 'public/images')));


// Basic route for testing
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Custom Error Handling Middleware (must be after all routes)
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});