// server/seed.js
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs'); // For hashing admin password

dotenv.config(); // Load environment variables
connectDB(); // Connect to the database

const seedProducts = [
  {
    name: 'Xiaomi Redmi 8 Original',
    description: 'A great smartphone with good features and battery life.',
    price: 35.00,
    image: '/images/related-4.png',
    category: 'Electronics',
    countInStock: 10,
    rating: 0,
    numReviews: 0,
    brand: 'Xiaomi', // <--- ADDED THIS LINE
  },
  {
    name: 'Brown Winter Coat',
    description: 'Warm and stylish brown winter coat, perfect for cold weather.',
    price: 75.00,
    image: '/images/related-1.png',
    category: 'Apparel',
    countInStock: 5,
    rating: 0,
    numReviews: 0,
    brand: 'Fashion Apparel', // <--- ADDED THIS LINE
  },
  {
    name: 'Wireless Bluetooth Headset',
    description: 'High-quality sound with comfortable fit and long battery life.',
    price: 45.00,
    image: '/images/related-5.png',
    category: 'Electronics',
    countInStock: 15,
    rating: 0,
    numReviews: 0,
    brand: 'AudioTech', // <--- ADDED THIS LINE
  },
  {
    name: 'Modern Ergonomic Office Chair',
    description: 'Comfortable and supportive chair for long working hours.',
    price: 120.00,
    image: '/images/related-6.jpg',
    category: 'Furniture',
    countInStock: 3,
    rating: 0,
    numReviews: 0,
    brand: 'ErgoHome', // <--- ADDED THIS LINE
  },
  // Add more products as needed
];

// ... (rest of your code below this)

const seedUsers = async () => {
  const hashedPassword = await bcrypt.hash('password123', 10); // Hash a simple password

  return [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true,
    },
    {
      name: 'Test User',
      email: 'user@example.com',
      password: hashedPassword,
      isAdmin: false,
    }
  ];
};

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await User.deleteMany(); // Clear existing users

    const users = await User.insertMany(await seedUsers());

    // Assign the first user (Admin User) as the creator for all products
    const adminUser = users[0]._id; // Assuming admin is the first user in the array

    const productsWithUser = seedProducts.map(product => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(productsWithUser); // Insert products with user reference

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

// To run: node server/seed.js -d (to destroy) or node server/seed.js (to import)
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}