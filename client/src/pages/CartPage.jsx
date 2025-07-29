import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity,
    clearCart
  } = useContext(CartContext);
  
  const [savedItems, setSavedItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const taxRate = 0.05;
  const calculatedTax = subtotal * taxRate;
  const total = subtotal - appliedDiscount + calculatedTax;

  const handleUpdateQuantity = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const moveToSaved = (id) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      handleRemoveItem(id);
      setSavedItems(prev => [...prev, { ...item, id: Date.now() }]);
    }
  };

  const moveToCart = (id) => {
    const item = savedItems.find(item => item.id === id);
    if (item) {
      updateQuantity(item.id, item.quantity || 1);
      setSavedItems(prev => prev.filter(savedItem => savedItem.id !== id));
    }
  };

  const removeSavedItem = (id) => {
    setSavedItems(prev => prev.filter(item => item.id !== id));
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE10') {
      setAppliedDiscount(10.00);
      alert('Coupon "SAVE10" applied successfully! $10 off.');
    } else if (couponCode.toUpperCase() === 'FIFTYOFF') {
      const maxDiscount = subtotal * 0.5;
      setAppliedDiscount(maxDiscount);
      alert('Coupon "FIFTYOFF" applied successfully! 50% off.');
    } else {
      setAppliedDiscount(0);
      alert('Invalid coupon code.');
    }
  };

  const paymentCardImages = [
    '/assets/images/card1.png',
    '/assets/images/card2.png',
    '/assets/images/card3.png',
    '/assets/images/card4.png',
    '/极简主义/images/card5.png',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="flex text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link to="/products" className="text-blue-600 hover:text-blue-800">Products</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-500">Cart</span>
          </nav>
        </div>
      </div>

      {/* Cart Section */}
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h2 className="text-2xl font-bold mb-6">My Cart ({cartItems.length})</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {cartItems.map(item => (
                <div key={item.id} className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
                  <div className="grid grid-cols-12 gap-4">
                    {/* Product Image */}
                    <div className="col-span-3">
                      <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="object-contain w-full h-full p-2"
                        />
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="col-span-6">
                      <h3 className="font-semibold text-gray-800 mb-2">{item.name}</h3>
                      
                      <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
                        <span>Size: {item.size || 'N/A'}</span>
                        <span>|</span>
                        <span>Color: {item.color || 'N/A'}</span>
                        <span>|</span>
                        <span>Material: {item.material || 'N/A'}</span>
                        <span>|</span>
                        <span>Seller: {item.seller || 'N/A'}</span>
                      </div>
                      
                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                        <button 
                          onClick={() => moveToSaved(item.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Save for later
                        </button>
                      </div>
                    </div>
                    
                    {/* Price and Quantity */}
                    <div className="col-span-3 flex flex-col items-end">
                      <p className="text-lg font-bold text-gray-900 mb-4">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                        <button 
                          className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between mt-8">
                <Link to="/products" className="flex items-center text-blue-600 hover:text-blue-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to shop
                </Link>
                <button 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Remove all
                </button>
              </div>
            </div>
            
            {/* Services */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white rounded-lg shadow-sm p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Secure payment</h4>
                  <p className="text-sm text-gray-600">No threat of losing money.</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Customer support</h4>
                  <p className="text-sm text-gray-600">24/7 support available on service area</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6 flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Free delivery</h4>
                  <p className="text-sm text-gray-600">Save you cash on item delivery.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>
              
              <div className="mb-6">
                <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">Have a coupon?</label>
                <div className="flex">
                  <input 
                    type="text" 
                    id="coupon" 
                    placeholder="Add coupon" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button 
                    onClick={handleApplyCoupon}
                    className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium text-red-600">-${appliedDiscount.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium text-green-600">+${calculatedTax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-green-600 text-white py-3 rounded-md font-medium hover:bg-green-700 mb-6">
                Checkout
              </button>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray极简主义-700 mb-3">We accept:</h4>
                <div className="flex gap-2 flex-wrap">
                  {paymentCardImages.map((src, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-2 flex items-center justify-center">
                      <img 
                        src={src} 
                        alt={`Payment Card ${index + 1}`} 
                        className="h-6 w-10 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Saved for Later Section */}
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-6">Saved for later</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {savedItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative">
                  <div className="bg-gray-100 aspect-square flex items-center justify-center p-4">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="object-contain w-full h-full"
                    />
                  </div>
                  
                  <div className="absolute top-2 right-2">
                    <button 
                      onClick={() => removeSavedItem(item.id)}
                      className="bg-red-100 text-red-600 p-1 rounded-full hover:bg-red-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                  <p className="text-lg font-bold text-gray-900 mb-4">${item.price.toFixed(2)}</p>
                  
                  <button 
                    onClick={() => moveToCart(item.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                  >
                    Move to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Banner Section */}
        <div className="mt-12 bg-blue-900 text-white rounded-lg p-8 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-700 to-blue-800"></div>
          <div className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-3">Super discount on more than 100 USD</h3>
                <p className="text-blue-100">Have you ever finally just write dummy info.</p>
              </div>
              <div className="flex justify-end">
                <button className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600">
                  Shop now
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-3">Subscribe on our newsletter</h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Get daily news on upcoming offers from many suppliers all over the world
          </p>
          
          <form className="max-w-md mx-auto flex">
            <div className="relative flex-grow">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 rounded-l-lg border focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 font-medium">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CartPage;