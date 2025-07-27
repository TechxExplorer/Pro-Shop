// client/src/components/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-40 flex items-center justify-center p-4">
        <img
          src={product.image || '/assets/images/placeholder-product.png'}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>
      <div className="p-3">
        <p className="font-bold text-center">${product.price}</p>
        <p className="text-gray-500 text-sm text-center mb-2">{product.name}</p>
        <div className="flex items-center justify-center">
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-xs text-gray-500 ml-1">0 (0 reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;