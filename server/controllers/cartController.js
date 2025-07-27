// server/controllers/cartController.js
const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product'); // To check product availability

// Helper function to calculate total price
const calculateCartTotalPrice = (items) => {
    return items.reduce((acc, item) => acc + item.qty * item.price, 0);
};

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
const getUserCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product', 'name image price');
    if (cart) {
        res.json(cart);
    } else {
        // If no cart exists for the user, return an empty cart
        res.status(200).json({ user: req.user._id, items: [], totalPrice: 0 });
    }
});

// @desc    Add item to cart or update quantity
// @route   POST /api/cart
// @access  Private
const addItemToCart = asyncHandler(async (req, res) => {
    const { productId, qty } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Check if enough stock
    if (product.countInStock < qty) {
        res.status(400);
        throw new Error('Not enough stock available');
    }

    let cart = await Cart.findOne({ user: req.user._id });

    // If cart doesn't exist for the user, create a new one
    if (!cart) {
        cart = new Cart({
            user: req.user._id,
            items: [],
            totalPrice: 0,
        });
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
        // Item exists in cart, update quantity
        cart.items[itemIndex].qty += qty;
    } else {
        // Item does not exist, add new item
        cart.items.push({
            product: productId,
            name: product.name,
            image: product.image,
            price: product.price,
            qty,
        });
    }

    cart.totalPrice = calculateCartTotalPrice(cart.items);
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
});

// @desc    Remove item from cart or decrease quantity
// @route   PUT /api/cart/remove
// @access  Private
const removeItemFromCart = asyncHandler(async (req, res) => {
    const { productId, qtyToRemove } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        res.status(404);
        throw new Error('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
        // Item found in cart
        if (qtyToRemove && cart.items[itemIndex].qty > qtyToRemove) {
            cart.items[itemIndex].qty -= qtyToRemove;
        } else {
            // Remove item completely
            cart.items.splice(itemIndex, 1);
        }
        cart.totalPrice = calculateCartTotalPrice(cart.items);
        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } else {
        res.status(404);
        throw new Error('Item not found in cart');
    }
});

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id });

    if (cart) {
        cart.items = [];
        cart.totalPrice = 0;
        const clearedCart = await cart.save();
        res.status(200).json(clearedCart);
    } else {
        res.status(404);
        throw new Error('Cart not found for this user');
    }
});

module.exports = {
    getUserCart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
};