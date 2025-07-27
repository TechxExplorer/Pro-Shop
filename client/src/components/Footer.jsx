// client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white py-10 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Top Footer Section: Brand, Info Links, Get App */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          
          {/* Brand Info (col-span-3 or 4 for spacing) */}
          <div className="col-span-1 md:col-span-4 lg:col-span-3">
            <Link to="/" className="flex items-center mb-4">
              <img src="/assets/icons/site_logo.svg" alt="Brand Logo" className="h-8 w-auto mr-2" />
              {/* Corrected "Pro" in black and "Shop" in blue */}
              <span className="text-2xl font-bold text-gray-800">Pro<span className="text-blue-600">Shop</span></span>
            </Link>
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
              Best information about the company goes here but now lorem ipsum is
            </p>
            <div className="flex space-x-3">
              {/* Social Icons - Ensure these SVGs exist in public/assets/icons/ */}
              {/* Corrected Twitter icon URL */}
              {['facebook', 'twiitter', 'linkedin', 'instagram', 'youtube'].map((social) => (
                <a key={social} href="#" className="text-gray-500 hover:text-blue-600">
                  <img src={`/assets/icons/${social}.svg`} alt={social} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Grouped Information Links (About, Partnership, Information, For users) */}
          <div className="col-span-1 md:col-span-6 lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
            {/* About */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-base">About</h4>
              <ul className="space-y-2">
                {['About Us', 'Find store', 'Categories', 'Blogs'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Partnership */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-base">Partnership</h4>
              <ul className="space-y-2">
                {['About Us', 'Find store', 'Categories', 'Blogs'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-base">Information</h4>
              <ul className="space-y-2">
                {['Help Center', 'Money Refund', 'Shipping', 'Contact us'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* For users */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-3 text-base">For users</h4>
              <ul className="space-y-2">
                {['Login', 'Register', 'Settings', 'My Orders'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Get App Section (col-span-2 for spacing) - This is where "Get app" text belongs */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col items-start md:items-start"> {/* Aligned to start for "Get app" text and buttons */}
            <h4 className="font-semibold text-gray-800 mb-3 text-base">Get app</h4>
            <div className="flex flex-col space-y-3">
              <a href="#">
                <img src="/assets/icons/app_store.png" alt="App Store" className="h-10 w-auto" />
              </a>
              <a href="#">
                <img src="/assets/icons/google_play.png" alt="Google Play" className="h-10 w-auto" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Language/App Links */}
        <div className="pt-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-600 mb-4 md:mb-0">
            © ProShop .All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            {/* Language Dropdown */}
            <div className="relative">
              <select className="appearance-none bg-transparent text-gray-600 pr-6 cursor-pointer focus:outline-none text-sm">
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
              <i className="fas fa-chevron-up absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-500 text-xs pointer-events-none"></i>
            </div>
            {/* Country Flag */}
            <div className="flex items-center">
              <img src="/assets/images/usa.png" alt="USA Flag" className="w-5 h-auto mr-2" />
              <span className="text-gray-600 text-sm">USA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;