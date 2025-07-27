// client/src/App.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'; // Import the Header component
import Footer from './components/Footer'; // Import the Footer component
import { CartProvider } from './contexts/CartContext'; // <--- ADD THIS LINE: Import the CartProvider

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Use the Header component here */}

      <main className="container mx-auto py-4 flex-grow">
        {/* <--- WRAP THE OUTLET WITH CartProvider HERE */}
        <CartProvider>
          <Outlet /> {/* This is where your specific page content (HomePage, ProductPage, etc.) will render */}
        </CartProvider>
      </main>

      <Footer /> {/* Render the Footer component here */}
    </div>
  );
}

export default App;