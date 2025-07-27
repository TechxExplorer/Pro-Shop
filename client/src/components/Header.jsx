// client/src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // <--- Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // <--- Initialize useNavigate

  // Function to handle category selection
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      // Navigate to the products page with the selected category as a query parameter
      navigate(`/products?category=${selectedCategory}`);
    } else {
      // If "All category" is selected (empty value), navigate to just /products
      navigate('/products');
    }
  };

  return (
    <header className="bg-white text-gray-800 shadow-sm sticky top-0 z-50">
      {/* Top Header Row: Logo, Search Bar, User Icons */}
      <div className="py-3 border-b border-gray-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
          {/* Logo (site_logo.svg + ProShop text) */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/assets/icons/site_logo.svg" alt="Brand Logo" className="h-8 w-auto" />
            <span className="text-2xl font-bold ml-2">
              Pro<span className="text-blue-600">Shop</span>
            </span>
          </Link>

          {/* Search Bar: Input Field, All Category Dropdown, Search Button */}
          <div className="flex w-full md:w-3/5 lg:w-2/5 border border-blue-500 rounded-md overflow-hidden relative">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-grow p-2 text-gray-800 focus:outline-none placeholder-gray-400 pl-4 bg-white" 
            />
            
            <div className="relative border-l border-blue-500">
              {/* <--- ADD onChange HANDLER HERE */}
              <select 
                className="appearance-none bg-white text-gray-700 px-2 py-2 cursor-pointer focus:outline-none flex-shrink-0 text-sm pr-7"
                onChange={handleCategoryChange} // <--- Added onChange handler
                defaultValue="" // <--- Set default value to an empty string
              > 
                <option value="">All category</option> {/* <--- Value for "All category" */}
                <option value="automobiles">Automobiles</option>
                <option value="clothes">Clothes and wear</option> {/* <--- Use a consistent value like "clothes" */}
                <option value="home-interiors">Home interiors</option>
                <option value="computer-tech">Computer and tech</option>
                <option value="tools-equipments">Tools, equipments</option>
                <option value="sports-outdoor">Sports and outdoor</option>
                <option value="animal-pets">Animal and pets</option>
                <option value="machinery-tools">Machinery tools</option>
                <option value="more-category">More category</option>
              </select>
              <i className="fas fa-chevron-down absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs pointer-events-none"></i>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 flex items-center justify-center flex-shrink-0 hover:bg-blue-700 transition-colors border-l border-blue-500">
              <i className="fas fa-search text-base mr-2"></i> Search
            </button>
          </div>

          {/* Navigation Icons (Right side) */}
          <div className="flex items-center space-x-6 flex-shrink-0 text-sm">
            <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors">
              <i className="fas fa-user text-xl"></i>
              <span className="mt-1 text-xs">Profile</span>
            </Link>
            <Link to="/messages" className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors">
              <i className="fas fa-comment-dots text-xl"></i>
              <span className="mt-1 text-xs">Message</span>
            </Link>
            <Link to="/orders" className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors">
              <i className="fas fa-clipboard-list text-xl"></i>
              <span className="mt-1 text-xs">Orders</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors relative">
              <i className="fas fa-shopping-cart text-xl"></i>
              <span className="mt-1 text-xs">My Cart</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"></span> 
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="py-2 hidden md:block border-t border-gray-100">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <nav className="flex items-center space-x-6 lg:space-x-8 text-sm">
            <Link to="/categories" className="flex items-center text-gray-800 hover:text-blue-600 transition-colors font-medium">
              <i className="fas fa-bars mr-2"></i> All category
            </Link>
            <Link to="/hot-offers" className="text-gray-800 hover:text-blue-600 transition-colors font-medium">
              Hot offers
            </Link>
            <Link to="/gift-boxes" className="text-gray-800 hover:text-blue-600 transition-colors font-medium">
              Gift boxes
            </Link>
            <Link to="/projects" className="text-gray-800 hover:text-blue-600 transition-colors font-medium">
              Projects
            </Link>
            <Link to="/help" className="flex items-center text-gray-800 hover:text-blue-600 transition-colors font-medium">
              Help <i className="fas fa-chevron-down ml-2 text-xs"></i>
            </Link>
          </nav>

          <div className="flex items-center space-x-4 text-sm">
            <div className="relative">
              <select className="appearance-none bg-transparent pr-6 cursor-pointer focus:outline-none text-gray-800 hover:text-blue-600 transition-colors">
                <option value="en-usd">English, USD</option>
                <option value="es-eur">Español, EUR</option>
              </select>
              <i className="fas fa-chevron-down absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs pointer-events-none"></i>
            </div>
            
            <Link to="/shipping" className="flex items-center text-gray-800 hover:text-blue-600 transition-colors">
              <img src="/assets/images/flag1.png" alt="Flag" className="w-5 h-auto mr-2" />
              <span>Ship to</span>
              <i className="fas fa-chevron-down ml-2 text-gray-500 text-xs"></i>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;