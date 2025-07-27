// client/src/components/Product.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover object-center" />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center text-gray-600 mb-2">
          {/* Star Rating Placeholder - you'll replace this with an actual rating component */}
          <span className="text-yellow-500 text-lg mr-1">★</span> {product.rating} ({product.numReviews} reviews)
        </div>
        <p className="text-2xl font-bold text-gray-900">${product.price}</p>
      </div>
    </div>
  );
};

export default Product;