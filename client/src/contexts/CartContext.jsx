// src/contexts/CartContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// Create the Context with a default value (useful for autocompletion, but can be null)
export const CartContext = createContext(null);

// Create the CartProvider component
export const CartProvider = ({ children }) => {
  // Initialize cart items from localStorage, or an empty array if not found
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem('cartItems');
      return localCart ? JSON.parse(localCart) : [];
    } catch (e) {
      console.error("Failed to parse cart items from localStorage", e);
      return [];
    }
  });

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === productToAdd.id
      );

      if (existingItemIndex > -1) {
        // Product already in cart, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        // Product not in cart, add it with quantity 1
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ).filter(item => item.quantity > 0) // Remove if quantity drops to 0 or less
    );
  };

  // Calculate total items in cart (for a cart icon count)
  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price
  const totalCartPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);


  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalCartItems,
    totalCartPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};