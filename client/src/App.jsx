// client/src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Keep Outlet
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './contexts/CartContext'; // Ensure this context is correctly imported and wraps content

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            {/* Main content area. The matched route component will render here */}
            <main className="container mx-auto py-4 flex-grow px-4">
                {/* Wrap content that needs cart context with CartProvider */}
                <CartProvider>
                    <Outlet /> {/* This is where the content of the current route will be rendered */}
                </CartProvider>
            </main>

            <Footer />

            {/* ToastContainer for global notifications - placed here to be accessible throughout the app */}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
}

export default App;