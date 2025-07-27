import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'; // You'll create this
// import cartReducer from './features/cart/cartSlice'; // If you decide to manage cart state in Redux
// import productReducer from './features/product/productSlice'; // If you decide to manage product state in Redux

const store = configureStore({
  reducer: {
    // This is where your different slices/reducers will go
    userLogin: authReducer, // This matches the 'userLogin' state you're trying to select
    // cart: cartReducer, // Example
    // products: productReducer, // Example
  },
  // devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools only in development
});

export default store;