// client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Import pages
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';       // For product listings (e.g., /products)
import ProductDetailPage from './pages/ProductDetailPage.jsx'; // For individual product details (e.g., /product/123)
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CartPage from './pages/CartPage.jsx'; // Optional: For cart management

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Nested routes will render within the <Outlet> in App.jsx */}
      <Route index={true} element={<HomePage />} /> {/* default child route for "/" */}

      {/* Route for displaying a list of products (e.g., from "Shop All Products" or categories) */}
      <Route path="/products" element={<ProductsPage />} />

      {/* Route for displaying a single product's details */}
      <Route path="/product/:id" element={<ProductDetailPage />} />

      {/* Authentication Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* Optional: Route for managing the shopping cart */}
      <Route path="/cart" element={<CartPage />} />
      
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);