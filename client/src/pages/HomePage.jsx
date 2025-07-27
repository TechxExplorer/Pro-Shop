// client/src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Mock product data including the specific products you mentioned
    const mockProducts = [
      {
        id: 1,
        name: 'Xiaomi Redmi 8 Original',
        price: 35,
        image: '/assets/images/p16.png',
        reviews: 120, // Added reviews for consistency
        rating: 4.5 // Added rating for consistency
      },
      {
        id: 2,
        name: 'Brown Winter Coat',
        price: 75,
        image: '/assets/images/suggest3.jpg',
        reviews: 80,
        rating: 4.0
      },
      {
        id: 3,
        name: 'Wireless Bluetooth Headset',
        price: 45,
        image: '/assets/images/p11.png',
        reviews: 150,
        rating: 4.7
      },
      {
        id: 4,
        name: 'Modern Ergonomic Office Chair',
        price: 120,
        image: '/assets/images/p1.png',
        reviews: 200,
        rating: 4.8
      },
      // --- NEW PRODUCT ADDED HERE ---
      {
        id: 5, // Assign a unique ID
        name: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
        price: 25, // Assuming a price
        image: '/assets/images/pre_thumb1.jpg', // Using one of the provided image paths for clothes
        reviews: 32,
        rating: 3.5, // Using 3.5 to demonstrate half stars
        status: "In stock" // This status isn't used in rendering but included as per your request
      },
    ];

    setProducts(mockProducts);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  // Helper function to render stars (copied from ProductsPage for consistency)
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-6">
        {/* Categories, Banner, and User Offers Section - ADJUSTED GRID */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          {/* Categories - now spans 3 columns out of 12 */}
          <div className="bg-white p-4 rounded-lg shadow-sm md:col-span-3">
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              <Link
                to="/products?category=electronics"
                className="block py-2 px-3 hover:bg-gray-100 rounded text-sm"
              >
                Electronics
              </Link>
              {[
                'Clothes and wear',
                'Home interiors',
                'Computer and tech',
                'Tools, equipments',
                'Sports and outdoor',
                'Animal and pets',
                'Machinery tools',
                'More category'
              ].map((category) => (
                <Link
                  key={category}
                  to={`/products?category=${encodeURIComponent(category.toLowerCase().replace(/ /g, '-'))}`}
                  className="block py-2 px-3 hover:bg-gray-100 rounded text-sm"
                >
                  {category}
                </Link>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to="/products"
                className="bg-blue-600 text-white w-full flex justify-center px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Shop All Products
              </Link>
            </div>
          </div>

          {/* Main Banner - now spans 6 columns out of 12 */}
          <div className="relative rounded-lg overflow-hidden md:col-span-6">
            <img
              src="/assets/images/banner.png"
              alt="Latest trending"
              className="w-full h-full object-cover"
            />
            {/* Adjusted banner text styling for professionalism and size */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white font-semibold text-lg drop-shadow-sm">Latest trending</p>
              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-md">Electronic items</h2>
              <button className="bg-white text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100 text-lg font-medium self-start shadow-md">
                Learn more
              </button>
            </div>
          </div>

          {/* User Offers - now spans 3 columns out of 12 */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <div className="bg-blue-50 border border-gray-200 rounded-lg p-4 flex items-center h-full">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-3 flex-shrink-0">
                <img
                  src="/assets/icons/avatar.svg"
                  alt="User"
                  className="w-6 h-6"
                />
              </div>
              <div className="flex-grow">
                <p className="text-sm">
                  <span className="font-bold text-gray-800">Hi, user</span>
                  <br />
                  <span className="text-gray-600">let's get started</span>
                </p>
                <div className="flex space-x-3 mt-2">
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white text-xs px-3 py-2 rounded font-medium hover:bg-blue-700"
                  >
                    Join now
                  </Link>
                  <Link
                    to="/login"
                    className="border border-gray-300 text-xs px-3 py-2 rounded font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Log in
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-orange-500 text-white p-4 rounded-lg flex items-center h-full">
              <div className="mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">Get US $10 off</p>
                <p className="text-xs">with a new supplier</p>
              </div>
            </div>

            <div className="bg-teal-600 text-white p-4 rounded-lg flex items-center h-full">
              <div className="mr-3 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">Send quotes with</p>
                <p className="text-xs">supplier preferences</p>
              </div>
            </div>
          </div>
        </section>

        {/* Deals and Offers */}
        <section className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <h3 className="text-lg font-bold mb-1">Deals and offers</h3>
              <p className="text-gray-500 text-sm mb-4">Hygiene equipments</p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: '0.4', label: 'Days' },
                  { value: '1.8', label: 'Hour' },
                  { value: '3.4', label: 'Min' },
                  { value: '5.6', label: 'Sec' }
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="bg-gray-100 rounded p-2">
                      <span className="font-bold text-lg">{item.value}</span>
                    </div>
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:w-3/4 overflow-x-auto">
              <div className="flex space-x-4">
                {[
                  { name: 'Smart watches', discount: '-25%', image: '/assets/images/product-1.png' },
                  { name: 'Laptops', discount: '+15%', image: '/assets/images/product-2.png' },
                  { name: 'GoPro cameras', discount: '+10%', image: '/assets/images/product-5.png' },
                  { name: 'Headphones', discount: '-25%', image: '/assets/images/product-4.png' },
                  { name: 'Canon cameras', discount: '-25%', image: '/assets/images/p15.png' }
                ].map((product, index) => (
                  <div key={index} className="flex-shrink-0 w-32 text-center border-r border-gray-200 pr-4 last:border-r-0">
                    <div className="h-24 flex items-center justify-center mb-2">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full object-contain"
                      />
                    </div>
                    <p className="text-sm font-medium mb-1">{product.name}</p>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                      {product.discount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Home and outdoor */}
        <section className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 relative mb-4 md:mb-0">
              <img
                src="/assets/images/display-grid-one-img.jpg"
                alt="Home and outdoor"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-lg font-semibold text-white">Home and outdoor</h3>
                <button className="bg-white text-gray-800 px-3 py-1 rounded text-sm mt-2">
                  Source now
                </button>
              </div>
            </div>

            <div className="md:w-3/4 overflow-x-auto">
              <div className="flex space-x-4">
                {[
                  { name: 'Soft chairs', price: '19', image: '/assets/images/p1.png' },
                  { name: 'Kitchen mixer', price: '19', image: '/assets/images/p2.png' },
                  { name: 'Blenders', price: '19', image: '/assets/images/p4.png' },
                  { name: 'Home appliance', price: '19', image: '/assets/images/p6.jpg' },
                  { name: 'Coffee maker', price: '24', image: '/assets/images/p5.png' }
                ].map((product, index) => (
                  <div key={index} className="flex-shrink-0 w-48 border rounded-lg p-3">
                    <p className="font-medium mb-2 text-sm">{product.name}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-gray-500">From</p>
                        <p className="font-medium">USD {product.price}</p>
                      </div>
                      <div className="h-16 w-16">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Display (Featured Products) */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Featured Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="h-48 flex items-center justify-center mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-medium">{product.name}</h4>
                  <div className="flex items-center justify-center my-2">
                    <div className="flex">
                      {renderStars(product.rating)} {/* Use the helper function here */}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  <p className="font-bold">${product.price}</p>
                  {/* --- ADDED VIEW DETAILS LINK HERE --- */}
                  <Link
                    to={`/product/${product.id}`}
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Extra Services */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Our extra services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Source from Industry Hubs',
                image: '/assets/images/service-1.png',
                icon: '/assets/icons/search.svg'
              },
              {
                title: 'Customize Your Products',
                image: '/assets/images/service-2.png',
                icon: '/assets/icons/inventory.svg'
              },
              {
                title: 'Fast, reliable shipping by ocean or air',
                image: '/assets/images/service-3.png',
                icon: '/assets/icons/send.svg'
              },
              {
                title: 'Product monitoring and inspection',
                image: '/assets/images/service-4.png',
                icon: '/assets/icons/security.svg'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <img src={service.icon} alt="Icon" className="w-5 h-5" />
                  </div>
                  <p className="font-medium text-sm">{service.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Suppliers by Region */}
        <section className="mb-8">
          <h3 className="text-2xl font-bold mb-6">Suppliers by region</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { country: 'Arabic Emirates', domain: 'shopname.ae', flag: '/assets/images/arab_emirates.png' },
              { country: 'Australia', domain: 'shopname.au', flag: '/assets/images/australia.png' },
              { country: 'United States', domain: 'shopname.us', flag: '/assets/images/usa.png' },
              { country: 'Russia', domain: 'shopname.ru', flag: '/assets/images/russia.png' },
              { country: 'Italy', domain: 'shopname.it', flag: '/assets/images/italy.png' },
              { country: 'Denmark', domain: 'shopname.dk', flag: '/assets/images/denmark.png' },
              { country: 'France', domain: 'shopname.fr', flag: '/assets/images/france.png' },
              { country: 'China', domain: 'shopname.cn', flag: '/assets/images/china.png' },
              { country: 'Britain', domain: 'shopname.co.uk', flag: '/assets/images/britian.png' }
            ].map((supplier, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 flex items-center">
                <img
                  src={supplier.flag}
                  alt={supplier.country}
                  className="w-8 h-6 mr-3 object-cover"
                />
                <div>
                  <p className="font-medium text-sm">{supplier.country}</p>
                  <p className="text-xs text-gray-500">{supplier.domain}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gray-100 rounded-lg p-8 mb-8 text-center">
          <h4 className="text-lg font-semibold mb-2">Subscribe on our newsletter</h4>
          <p className="text-gray-700 mb-6">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex">
            <div className="relative flex-grow">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <img src="/assets/icons/email.svg" alt="Email" className="w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-l-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 text-sm"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default HomePage;