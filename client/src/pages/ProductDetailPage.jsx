import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import mockProducts from '../mockData/mockProducts';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [mainProductImage, setMainProductImage] = useState("");

  useEffect(() => {
    const productId = parseInt(id);
    const foundProduct = mockProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setMainProductImage(foundProduct.image);
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

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
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 极简主义 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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

  // Use the product thumbnails from the product data
  const productThumbnails = [
    product.image,
    ...(product.additionalImages || [])
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link to="/products" className="text-blue极简主义 600 hover:text-blue-800">Products</Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-500">{product.name}</span>
      </div>

      <div className="flex flex-wrap -mx-4">
        {/* Product Image Gallery */}
        <div className="w-full lg:w-1/3 px-4 mb-6 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md p-4">
            <img 
              src={mainProductImage} 
              alt={product.name} 
              className="w-full h-auto object-contain mb-4 rounded-md" 
            />
            <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
              {productThumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-contain p-1 rounded-md cursor-pointer border ${
                    mainProductImage === thumbnail ? 'border-2 border-blue-600' : 'border-gray-200'
                  }`}
                  onClick={() => setMainProductImage(thumbnail)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-green-600 font-semibold mb-2">In stock</p>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4 text-gray-600">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-yellow-500 ml-1">{product.rating}</span>
              <span className="mx-2">•</span>
              <span className="mr-1">{product.reviews} reviews</span>
              <span className="mx-2">•</span>
              <span>154 sold</span>
            </div>

            <div className="flex items-center mb-3">
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-gray-500 line-through ml-2">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>

            <table className="min-w-full bg-white mb-6">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-600">Price:</td>
                  <td className="py-2 px-2 text-gray-800">Negotiable</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-600">Type:</td>
                  <td className="py-2 px-2 text-gray-800">{product.category}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-600">Material:</td>
                  <td className="py-2 px-2 text-gray-800">Plastic material</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2 font-semibold text-gray-600">Design:</td>
                  <td className="py-2 px-2 text-gray-800">Modern nice</td>
                </tr>
              </tbody>
            </table>
            
            {/* Add to Cart Button */}
            <button 
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-medium"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Seller Information */}
        <div className="w-full lg:w-1/6 px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="font-bold text-gray-800 mb-2">Supplier</p>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-xl font-semibold mr-3">R</div>
              <div>
                <p className="font-semibold text-gray-800">GuanQi Trading LLC</p>
                <p className="text-sm text-gray-500">Germany, Berlin</p>
              </div>
            </div>
            <ul className="text-gray-700 text-sm mb-4">
              <li className="flex items-center mb-2">
                <img src="/assets/images/flag1.png" alt="Germany" className="w-5 h-5 mr-2" />
                Germany, Berlin
              </li>
              <li className="flex items-center mb-2">
                <img src="/assets/icons/verified.svg" alt="Verified" className="w-5 h-5 mr-2" />
                Verified Seller
              </li>
              <li className="flex items-center mb-2">
                <img src="/assets/icons/language.svg" alt="Worldwide" className="w-5 h-5 mr-2" />
                Worldwide shipping
              </li>
            </ul>
            <button className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 mb-2">
              Send inquiry
            </button>
            <button className="w-full bg-white text-blue-700 border border-blue-700 py-2 rounded-md hover:bg-blue-50">
              Seller's profile
            </button>
            <button className="w-full mt-4 flex items-center justify-center text-blue-600 hover:text-blue-800">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              Save for later
            </button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg shadow-md mt-8 p-6">
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-8">
            <a href="#" className="border-b-2 border-blue-600 text-blue-600 py-4 px-1 inline-flex items-center text-sm font-medium" aria-current="page">Description</a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 inline-flex items-center text-sm font-medium">Reviews</a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 inline-flex items-center text-sm font-medium">Shipping</a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 inline-flex items-center text-sm font-medium">About seller</a>
          </nav>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <table className="min-w-full bg-white mt-6 mb-4">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-2 font-semibold text-gray-600">Model</td>
                <td className="py-2 px-2 text-gray-800">#8786867</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-2 font-semibold text-gray-600">Style</td>
                <td className="py-2 px-2 text-gray-800">Classic style</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-2 font-semibold text-gray-600">Certificate</td>
                <td className="py-2 px-2 text-gray-800">ISO-898921212</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-2 px-2 font-semibold text-gray-600">Size</td>
                <td className="py-2 px-2 text-gray-800">34mm x 450mm x 19mm</td>
              </tr>
              <tr>
                <td className="py-2 px-2 font-semibold text-gray-600">Memory</td>
                <td className="py-2 px-2 text-gray-800">36GB RAM</td>
              </tr>
            </tbody>
          </table>

          <ul className="list-disc pl-5 text-gray-700">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockProducts.slice(0, 6).map(relatedProduct => (
            <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md p-4 text-center">
              <img 
                src={relatedProduct.image} 
                alt={relatedProduct.name} 
                className="w-full h-auto object-contain mb-2 rounded-md" 
              />
              <p className="text-gray-800 font-semibold text-sm">{relatedProduct.name}</p>
              <p className="text-gray-600 text-xs">${relatedProduct.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;