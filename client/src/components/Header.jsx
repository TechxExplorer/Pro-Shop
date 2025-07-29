import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaTools, FaSignOutAlt } from 'react-icons/fa'; // Import FaTools for admin icon
import { toast } from 'react-toastify'; // For notifications

const Header = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);

    // Effect to load user info from localStorage on component mount
    // This will run once when the component mounts to get the initial user state.
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    // Function to handle logout
    const logoutHandler = () => {
        localStorage.removeItem('userInfo'); // Remove user data from local storage
        setUserInfo(null); // Clear user info from component state
        toast.info('Logged out successfully!'); // Show a success toast
        navigate('/login'); // Redirect to login page
    };

    // Function to handle category selection for search bar dropdown
    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory) {
            navigate(`/products?category=${selectedCategory}`);
        } else {
            navigate('/products'); // Navigate to just /products for "All category"
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
                            <select
                                className="appearance-none bg-white text-gray-700 px-2 py-2 cursor-pointer focus:outline-none flex-shrink-0 text-sm pr-7"
                                onChange={handleCategoryChange}
                                defaultValue=""
                            >
                                <option value="">All category</option>
                                <option value="automobiles">Automobiles</option>
                                <option value="clothes">Clothes and wear</option>
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

                    {/* Navigation Icons (Right side) - Adjusted for dynamic user state */}
                    <div className="flex items-center space-x-6 flex-shrink-0 text-sm">
                        {/* Admin Link (conditionally rendered) */}
                        {userInfo && userInfo.isAdmin && (
                            <Link to="/admin" className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors">
                                <FaTools className="text-xl" />
                                <span className="mt-1 text-xs">Admin</span>
                            </Link>
                        )}

                        {/* User / Sign In Dropdown */}
                        {userInfo ? (
                            <div className="relative group">
                                <button className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors focus:outline-none">
                                    <FaUser className="text-xl" />
                                    <span className="mt-1 text-xs">{userInfo.name}</span> {/* Display user's name */}
                                </button>
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out transform scale-95 group-hover:scale-100 origin-top-right z-20">
                                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-base">Profile</Link>
                                    <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100 text-base">Orders</Link> {/* Moved Orders here for logged-in users */}
                                    <button
                                        onClick={logoutHandler}
                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-base"
                                    >
                                        Logout <FaSignOutAlt className="inline-block ml-2 text-red-500" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Sign In Link if not logged in
                            <Link to="/login" className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors">
                                <FaUser className="text-xl" />
                                <span className="mt-1 text-xs">Sign In</span>
                            </Link>
                        )}

                        {/* Message and Cart icons (kept separate for clarity) */}
                        <Link to="/messages" className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors">
                            <i className="fas fa-comment-dots text-xl"></i>
                            <span className="mt-1 text-xs">Message</span>
                        </Link>
                        {/* Cart Link with a placeholder for item count */}
                        <Link to="/cart" className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors relative">
                            <i className="fas fa-shopping-cart text-xl"></i>
                            <span className="mt-1 text-xs">My Cart</span>
                            {/* Placeholder for cart item count - you'd integrate your CartContext here */}
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
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