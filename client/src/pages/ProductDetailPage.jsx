import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams(); // To get the product ID from the URL

  // State to manage the currently displayed main product image
  const [mainProductImage, setMainProductImage] = useState("/assets/images/preview-large.jpg");

  // Placeholder data based on the provided images
  const productData = {
    name: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
    status: "In stock", //
    rating: 9.3, //
    reviews: 32, //
    sold: 154, //
    priceRange: [
      { quantity: "50-100 pcs", price: "$59.00", isHighlighted: false }, //
      { quantity: "100-700 pcs", price: "$98.00", isHighlighted: false }, //
      { quantity: "700+ pcs", price: "$178.00", isHighlighted: true }, // Corrected price and added highlight
    ],
    detailsTable: [
      { label: "Price", value: "Negotiable" }, //
      { label: "Type", value: "Classic shoes" }, //
      { label: "Material", value: "Plastic material" }, //
      { label: "Design", value: "Modern nice" }, //
      { label: "Customization", value: "Customized logo and design custom packages" }, //
      { label: "Protection", value: "Refund Policy" }, //
      { label: "Warranty", value: "2 years full warranty" }, //
    ],
    supplier: "GuanQi Trading LLC", //
    supplierLocation: "Germany, Berlin", //
    supplierDetails: [
      { icon: '/assets/images/flag1.png', text: 'Germany, Berlin' }, // Icon path for flag
      { icon: '/assets/icons/verified.svg', text: 'Verified Seller' }, // Icon path for verified
      { icon: '/assets/icons/language.svg', text: 'Worldwide shipping' }, // Icon path for language
    ],
    descriptionContent: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", //
    descriptionTable: [
      { label: "Model", value: "#8786867" }, //
      { label: "Style", value: "Classic style" }, //
      { label: "Certificate", value: "ISO-898921212" }, //
      { label: "Size", value: "34mm x 450mm x 19mm" }, //
      { label: "Memory", value: "36GB RAM" }, //
    ],
    features: [
      "Some great feature name here", //
      "Lorem ipsum dolor sit amet, consectetur", //
      "Duis aute irure dolor in reprehenderit", //
      "Some great feature name here", //
    ],
    // Corrected related products with image paths and names based on 11.png
    relatedProducts: [
      { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/assets/images/recommend-4.png" }, // (Used image that looks like the product)
      { name: "Apple Watch Series 12", price: "$32.00-$40.00", image: "/assets/images/product-5.png" }, // (Using a watch image that matches the product name)
      { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/assets/images/recommend-7.png" }, // (Using headphones image)
      { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/assets/images/recommend-6.png" }, // (Using jeans image)
      { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/assets/images/p12.png" }, // (Using thermos image)
      { name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/assets/images/recommend-9.png" }, // (Using pot image)
    ],
    superDiscountBanner: {
      title: "Super discount on more than 100 USD", //
      subtitle: "Have you ever finally just write dummy info", //
      buttonText: "Shop now", //
    },
    // Updated "You may like" section based on image_b7e034.png
    youMayLike: [
      { name: "Men Blazers Sets Elegant Formal", price: "$7.00 - $99.50", image: "/assets/images/recommend-2.jpg" }, //
      { name: "Men Shirt Sleeve Polo Contrast", price: "$7.00 - $99.50", image: "/assets/images/recommend-3.png" }, //
      { name: "Apple Watch Series Space Gray", price: "$7.00 - $99.50", image: "/assets/images/recommend-5.png" }, //
      { name: "Basketball Crew Socks Long Stuff", price: "$7.00 - $99.50", image: "/assets/images/recommend-7.png" }, //
      { name: "New Summer Men's castrol T-Shirts", price: "$7.00 - $99.50", image: "/assets/images/recommend-9.png" }, //
    ],
    // Thumbnail images for the main product gallery
    productThumbnails: [
      "/assets/images/pre_thumb1.jpg", //
      "/assets/images/pre_thumb2.jpg", //
      "/assets/images/pre_thumb3.jpg", //
      "/assets/images/pre_thumb4.jpg", //
      
    ]
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating / 2); // Assuming a scale of 0-10, so divide by 2 for 5 stars
    const halfStar = rating % 2 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <div className="flex text-yellow-500">
        {Array(fullStars).fill('★').map((s, i) => <span key={`full-${i}`}>{s}</span>)}
        {halfStar && <span key="half">½</span>}
        {Array(emptyStars).fill('☆').map((s, i) => <span key={`empty-${i}`}>{s}</span>)}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs - based on 10.png */}
      <div className="text-sm text-gray-500 mb-4">
        Home &gt; Clothings &gt; Men's wear &gt; Summer clothing
      </div>

      <div className="flex flex-wrap -mx-4">
        {/* Product Image Gallery - Left Section */}
        <div className="w-full lg:w-1/3 px-4 mb-6 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md p-4">
            {/* Main Product Image */}
            <img src={mainProductImage} alt={productData.name} className="w-full h-auto object-contain mb-4 rounded-md" />
            {/* Thumbnail Images */}
            <div className="flex justify-center space-x-2 overflow-x-auto pb-2"> {/* Added overflow for scroll */}
              {productData.productThumbnails.map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-contain p-1 rounded-md cursor-pointer
                    ${mainProductImage === thumbnail ? 'border-2 border-blue-600' : 'border border-gray-200'}`}
                  onClick={() => setMainProductImage(thumbnail)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Product Details - Middle Section */}
        <div className="w-full lg:w-1/2 px-4 mb-6 lg:mb-0">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-green-600 font-semibold mb-2">{productData.status}</p>
            <h1 className="text-3xl font-bold mb-2">{productData.name}</h1>
            <div className="flex items-center mb-4 text-gray-600">
              {renderStars(productData.rating)}
              <span className="text-yellow-500 ml-1">{productData.rating}</span>
              <span className="mx-2">•</span>
              <span className="mr-1">{productData.reviews} reviews</span>
              <span className="mx-2">•</span>
              <span>{productData.sold} sold</span>
            </div>

            <div className="flex space-x-4 mb-4">
              {productData.priceRange.map((range, index) => (
                <div key={index} className="p-2 border border-gray-300 rounded text-center">
                  {/* Applied conditional red text for highlighted price */}
                  <p className={`font-semibold text-lg ${range.isHighlighted ? 'text-red-600' : ''}`}>
                    {range.price}
                  </p>
                  <p className="text-sm text-gray-500">{range.quantity}</p>
                </div>
              ))}
            </div>

            <table className="min-w-full bg-white mb-6">
              <tbody>
                {productData.detailsTable.map((row, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-b-0">
                    <td className="py-2 px-2 font-semibold text-gray-600">{row.label}:</td>
                    <td className="py-2 px-2 text-gray-800">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Seller Information - Right Section */}
        <div className="w-full lg:w-1/6 px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="font-bold text-gray-800 mb-2">Supplier</p> {/* Added "Supplier" text */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-blue-800 text-xl font-semibold mr-3">R</div>
              <div>
                <p className="font-semibold text-gray-800">{productData.supplier}</p>
                <p className="text-sm text-gray-500">{productData.supplierLocation}</p>
              </div>
            </div>
            <ul className="text-gray-700 text-sm mb-4">
              {productData.supplierDetails.map((detail, index) => (
                <li key={index} className="flex items-center mb-2">
                  {/* Conditionally render img for image icons or span for text icons */}
                  {detail.icon.endsWith('.png') || detail.icon.endsWith('.svg') ? (
                    <img src={detail.icon} alt={detail.text} className="w-5 h-5 mr-2" />
                  ) : (
                    <span className="mr-2">{detail.icon}</span>
                  )}
                  {detail.text}
                </li>
              ))}
            </ul>
            {/* Updated button styles for "Send inquiry" and "Seller's profile" */}
            <button className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mb-2 shadow-md">
              Send inquiry
            </button>
            <button className="w-full bg-white text-blue-700 border border-blue-700 py-2 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-sm">
              Seller's profile
            </button>
            <button className="w-full mt-4 flex items-center justify-center text-blue-600 hover:text-blue-800">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              Save for later
            </button>
          </div>
        </div>
      </div>

      {/* Description, Reviews, Shipping, About Seller Tabs */}
      <div className="bg-white rounded-lg shadow-md mt-8 p-6">
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <a href="#" className="border-b-2 border-blue-600 text-blue-600 py-4 px-1 inline-flex items-center text-sm font-medium" aria-current="page">Description</a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 inline-flex items-center text-sm font-medium">Reviews</a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 inline-flex items-center text-sm font-medium">Shipping</a>
            <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 inline-flex items-center text-sm font-medium">About seller</a>
          </nav>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed">{productData.descriptionContent}</p>

          <table className="min-w-full bg-white mt-6 mb-4">
            <tbody>
              {productData.descriptionTable.map((row, index) => (
                <tr key={index} className="border-b border-gray-200 last:border-b-0">
                  <td className="py-2 px-2 font-semibold text-gray-600">{row.label}</td>
                  <td className="py-2 px-2 text-gray-800">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <ul className="list-disc pl-5 text-gray-700">
            {productData.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* You may like section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">You may like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {productData.youMayLike.map((item, index) => (
            <div key={index} className="flex items-center bg-white rounded-lg shadow-md p-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-contain mr-3 rounded-md" />
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {productData.relatedProducts.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 text-center">
              <img src={product.image} alt={product.name} className="w-full h-auto object-contain mb-2 rounded-md" />
              <p className="text-gray-800 font-semibold text-sm">{product.name}</p>
              <p className="text-gray-600 text-xs">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Super discount banner - MOVED TO LAST */}
      <div className="mt-8 bg-blue-600 text-white p-6 rounded-lg flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-2xl font-bold">{productData.superDiscountBanner.title}</h2>
          <p className="text-sm">{productData.superDiscountBanner.subtitle}</p>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md">
          {productData.superDiscountBanner.buttonText}
        </button>
      </div>

    </div>
  );
};

export default ProductDetailPage;