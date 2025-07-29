import React, { useState, useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import mockProducts from '../mockData/mockProducts';

const ProductsPage = () => {
  const { addToCart } = useContext(CartContext);

  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedCondition, setSelectedCondition] = useState('any');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);

  // --- Filtering Logic ---
  const filteredProducts = useMemo(() => {
    return mockProducts.filter(product => {
      // Price Range Filter
      if (product.price < priceRange.min || product.price > priceRange.max) {
        return false;
      }

      // Condition Filter
      if (selectedCondition !== 'any' && product.condition !== selectedCondition) {
        return false;
      }

      // Brands Filter
      if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
        return false;
      }

      // Features Filter (product must have ALL selected features)
      if (selectedFeatures.length > 0) {
        const productHasAllFeatures = selectedFeatures.every(selectedFeature =>
          product.features && product.features.includes(selectedFeature)
        );
        if (!productHasAllFeatures) {
          return false;
        }
      }

      // Ratings Filter (product must have AT LEAST the selected rating)
      if (selectedRatings.length > 0) {
        const productMeetsRating = selectedRatings.some(selectedRating =>
          product.rating >= selectedRating
        );
        if (!productMeetsRating) {
          return false;
        }
      }

      return true; // Product passes all filters
    });
  }, [priceRange, selectedCondition, selectedBrands, selectedFeatures, selectedRatings]);

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

  const toggleBrand = (brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleFeature = (feature) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const toggleRating = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedFeatures([]);
    setSelectedRatings([]);
    setPriceRange({ min: 0, max: 1000 });
    setSelectedCondition('any');
  };

  const handleAddToCartClick = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

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
            <span className="text-gray-500">Mobile Accessories</span>
          </nav>
        </div>
      </div>

      {/* Page Header */}
      <div
        className="py-16 text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/blue-bg.png')" }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">Electronics Items</h1>
          <p className="text-xl">Mobile Accessories - All products </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-blue-600 text-sm hover:underline"
              >
                Clear all
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-700">Category</h3>
              <ul className="space-y-2">
                {['Mobile accessories', 'Electronics', 'Smartphones', 'Modern tech'].map((category, index) => (
                  <li key={index}>
                    <a href="#" className="text-sm block py-1 text-gray-600 hover:text-blue-600">
                      {category}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-sm block py-1 text-blue-600 font-medium">
                    See all
                  </a>
                </li>
              </ul>
            </div>

            {/* Brands */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-700">Brands</h3>
              <ul className="space-y-2">
                {['Samsung', 'Apple', 'Huawei', 'Pocco', 'Lenovo', 'Canon', 'GoPro', 'Sony', 'Nikon', 'Fujifilm', 'Panasonic', 'Olympus'].map((brand, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`brand-${index}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <label htmlFor={`brand-${index}`} className="text-sm text-gray-600">
                      {brand}
                    </label>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-sm block py-1 text-blue-600 font-medium">
                    See all
                  </a>
                </li>
              </ul>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-700">Features</h3>
              <ul className="space-y-2">
                {['Metallic', 'Plastic cover', '8GB Ram', 'Super power', 'Large Memory', '10x zoom', 'Digital SLR', '4K Video', 'Waterproof', 'Full Frame', 'Image Stabilization', 'High Resolution', 'DSLR', 'Video Features', 'Compact', 'Micro Four Thirds', 'Video Focus', 'Weather Sealed', 'Portable', '8K Video'].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`feature-${index}`}
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <label htmlFor={`feature-${index}`} className="text-sm text-gray-600">
                      {feature}
                    </label>
                  </li>
                ))}
                <li>
                  <a href="#" className="text-sm block py-1 text-blue-600 font-medium">
                    See all
                  </a>
                </li>
              </ul>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-700">Price Range</h3>
              <div className="mb-4">
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: parseFloat(e.target.value)})}
                    className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span>Min: ${priceRange.min}</span>
                <span>Max: ${priceRange.max}</span>
              </div>
              <div className="flex gap-3">
                <input
                  type="number"
                  className="border rounded px-3 py-2 text-sm w-1/2"
                  value={priceRange.min}
                  onChange={e => setPriceRange({...priceRange, min: parseFloat(e.target.value)})}
                  placeholder="Min"
                />
                <input
                  type="number"
                  className="border rounded px-3 py-2 text-sm w-1/2"
                  value={priceRange.max}
                  onChange={e => setPriceRange({...priceRange, max: parseFloat(e.target.value)})}
                  placeholder="Max"
                />
              </div>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
                Apply
              </button>
            </div>

            {/* Condition */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-700">Condition</h3>
              <ul className="space-y-2">
                {['any', 'refurbished', 'new', 'old'].map((condition, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="radio"
                      name="condition"
                      id={condition}
                      checked={selectedCondition === condition}
                      onChange={() => setSelectedCondition(condition)}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <label htmlFor={condition} className="text-sm text-gray-600 capitalize">
                      {condition === 'any' ? 'Any' : condition === 'refurbished' ? 'Refurbished' : condition === 'new' ? 'Brand new' : 'Old items'}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ratings */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-gray-700">Ratings</h3>
              <ul className="space-y-2">
                {[5, 4, 3, 2].map((rating, index) => (
                  <li key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`rating-${rating}`}
                      checked={selectedRatings.includes(rating)}
                      onChange={() => toggleRating(rating)}
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <div className="flex items-center">
                      {renderStars(rating)}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Page Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <h1 className="text-lg font-bold text-gray-800">
                  {filteredProducts.length} items in <span className="text-blue-600">Mobile accessories</span>
                </h1>

                <div className="flex items-center mt-4 md:mt-0">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id="verified"
                      className="mr-2 h-4 w-4 text-blue-600"
                    />
                    <label htmlFor="verified" className="text-sm text-gray-600">Verified only</label>
                  </div>

                  <div className="mr-4">
                    <select className="border rounded px-3 py-2 text-sm w-40">
                      <option>Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Highest Rated</option>
                    </select>
                  </div>

                  <div className="flex border rounded overflow-hidden">
                    <button
                      className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-gray-200' : 'bg-white'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      className={`px-3 py-2 ${viewMode === 'list' ? 'bg-gray-200' : 'bg-white'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Filter Tags */}
              <div className="mt-4 flex flex-wrap items-center">
                <span className="text-sm mr-2 text-gray-600">Filters:</span>
                <div className="flex flex-wrap">
                  {selectedBrands.map((brand, index) => (
                    <div key={`brand-tag-${index}`} className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center mr-2 mb-2">
                      {brand}
                      <button
                        onClick={() => toggleBrand(brand)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {selectedFeatures.map((feature, index) => (
                    <div key={`feature-tag-${index}`} className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center mr-2 mb-2">
                      {feature}
                      <button
                        onClick={() => toggleFeature(feature)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {selectedRatings.map((rating, index) => (
                    <div key={`rating-tag-${index}`} className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center mr-2 mb-2">
                      {rating} Star
                      <button
                        onClick={() => toggleRating(rating)}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {selectedCondition !== 'any' && (
                    <div className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center mr-2 mb-2">
                      Condition: {selectedCondition === 'any' ? 'Any' : selectedCondition === 'refurbished' ? 'Refurbished' : selectedCondition === 'new' ? 'Brand new' : 'Old items'}
                      <button
                        onClick={() => setSelectedCondition('any')}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  {(priceRange.min !== 0 || priceRange.max !== 1000) && (
                    <div className="bg-gray-100 rounded-full px-3 py-1 text-xs flex items-center mr-2 mb-2">
                      Price: ${priceRange.min} - ${priceRange.max}
                      <button
                        onClick={() => setPriceRange({min: 0, max: 1000})}
                        className="ml-1 text-gray-500 hover:text-gray-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                {(selectedBrands.length > 0 || selectedFeatures.length > 0 || selectedRatings.length > 0 || selectedCondition !== 'any' || priceRange.min !== 0 || priceRange.max !== 1000) && (
                  <button
                    onClick={clearFilters}
                    className="text-blue-600 text-xs font-medium hover:underline ml-auto mb-2"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </div>

            {/* Product Grid */}
            <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6' : 'space-y-6'}`}>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-lg shadow-sm overflow-hidden ${viewMode === 'grid' ? '' : 'flex'}`}
                  >
                    <div
                      className={`${viewMode === 'grid' ? 'h-56 relative' : 'w-1/3'} flex items-center justify-center p-4 bg-gray-50 relative`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                      {product.isNew && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                          New
                        </span>
                      )}
                      {product.oldPrice && (
                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                          -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                        </span>
                      )}
                    </div>

                    <div className={`p-5 ${viewMode === 'list' ? 'w-2/3' : ''}`}>
                      <h3 className="font-semibold text-gray-800 mb-2">{product.name}</h3>

                      <div className="flex items-center mb-3">
                        <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        {product.oldPrice && (
                          <span className="text-gray-500 line-through ml-2">${product.oldPrice.toFixed(2)}</span>
                        )}
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="flex items-center mr-2">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-xs text-gray-500">{product.rating} ({product.reviews} reviews)</span>
                        {product.freeShipping && (
                          <span className="text-xs text-green-600 ml-2">Free Shipping</span>
                        )}
                      </div>

                      {viewMode === 'list' && (
                        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
                      )}

                      <div className="flex justify-between items-center">
                        <Link
                          to={`/product/${product.id}`}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                        >
                          View details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handleAddToCartClick(product)}
                                className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add to Cart
                            </button>
                            <button className="text-gray-500 hover:text-red-500 p-1 rounded-full hover:bg-gray-100 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="lg:col-span-3 text-center text-gray-600 py-10">
                  <p className="text-xl font-semibold mb-2">No products found matching your filters.</p>
                  <button onClick={clearFilters} className="text-blue-600 hover:underline">
                    Clear all filters to see more products
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-4 sm:mb-0">
                <select className="border rounded px-3 py-2 text-sm">
                  <option>Show 10</option>
                  <option>Show 20</option>
                  <option>Show 50</option>
                </select>
              </div>

              <div className="flex items-center">
                <button className="px-3 py-2 border rounded-l hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {[1, 2, 3, 4, 5].map(page => (
                  <button
                    key={page}
                    className={`px-4 py-2 border-t border-b ${page === 1 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-300'}`}
                  >
                    {page}
                  </button>
                ))}

                <button className="px-3 py-2 border rounded-r hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-semibold mb-2">Subscribe on our newsletter</h3>
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
                className="w-full pl-10 pr-4 py-3 rounded-l-lg border focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 text-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;