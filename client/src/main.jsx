// client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
    Navigate // Import Navigate for redirects
} from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { toast } from 'react-toastify'; // Import toast for PrivateRoute

// Import pages
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CartPage from './pages/CartPage.jsx';

// Import new admin pages
import AdminDashboard from './pages/AdminDashboard.jsx'; // Make sure this path is correct
import ProductForm from './pages/ProductForm.jsx';       // Make sure this path is correct

// --- PrivateRoute Component (Crucial for Admin Access) ---
// This component will protect your admin routes.
const PrivateRoute = ({ children, adminOnly = false }) => {
    // Retrieve user info from local storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // If no user info is found, redirect to login
    if (!userInfo) {
        toast.error('Please log in to access this page.'); // Inform user why they're redirected
        return <Navigate to="/login" replace />;
    }

    // If adminOnly is true and the user is NOT an admin, redirect to home or a forbidden page
    if (adminOnly && !userInfo.isAdmin) {
        toast.error('Unauthorized access. Please log in as an admin.');
        return <Navigate to="/" replace />; // Redirect non-admins to the home page
    }

    // If authorized, render the children (the protected component)
    return children;
};


const router = createBrowserRouter(
    createRoutesFromElements(
        // The root route element is <App />, meaning App.jsx will render Header, Footer, and Outlet
        <Route path="/" element={<App />}>
            {/* Public Routes - these will render within <Outlet> in App.jsx */}
            <Route index={true} element={<HomePage />} /> {/* default child route for "/" */}
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />

            {/* General User Protected Routes (e.g., Profile, Orders, Messages) */}
            {/* These routes require a user to be logged in, but not necessarily an admin */}
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <div>User Profile Page (Needs Implementation)</div>
                    </PrivateRoute>
                }
            />
            <Route
                path="/messages"
                element={
                    <PrivateRoute>
                        <div>Messages Page (Needs Implementation)</div>
                    </PrivateRoute>
                }
            />
            <Route
                path="/orders"
                element={
                    <PrivateRoute>
                        <div>Orders Page (Needs Implementation)</div>
                    </PrivateRoute>
                }
            />


            {/* Admin Protected Routes - these also render within <Outlet> but are protected by PrivateRoute */}
            <Route
                path="/admin"
                element={
                    <PrivateRoute adminOnly={true}>
                        <AdminDashboard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/products/create"
                element={
                    <PrivateRoute adminOnly={true}>
                        <ProductForm />
                    </PrivateRoute>
                }
            />
            <Route
                path="/admin/products/edit/:id"
                element={
                    <PrivateRoute adminOnly={true}>
                        <ProductForm />
                    </PrivateRoute>
                }
            />

            {/* Fallback for any unmatched routes - redirects to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);