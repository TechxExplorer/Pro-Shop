// client/src/pages/AdminDashboard.jsx (Example structure - update with your actual code)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Assuming you use react-icons

const AdminDashboard = () => {
    const [products, setProducts] = useState([]); // <--- FIX 1: Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo ? userInfo.token : null;

    useEffect(() => {
          console.log('Backend URL being used:', import.meta.env.VITE_BACKEND_URL); // Add this
    // ... rest of your fetchProducts function

        const fetchProducts = async () => {
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                // Assuming your backend has an endpoint like /api/products/admin for admin-specific product list
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/admin`, config);

                // <--- FIX 2: Ensure you're accessing the array correctly from the response
                // If your backend directly returns an array: setProducts(data);
                // If your backend returns { products: [...] }: setProducts(data.products);
                // If your backend returns { data: { products: [...] } }: setProducts(data.data.products);
                setProducts(data); // <-- ASSUMPTION: Backend returns direct array. Adjust if not.

            } catch (err) {
                console.error("Error fetching products:", err);
                const errorMessage = err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message;
                setError(errorMessage);
                toast.error(`Error loading products: ${errorMessage}`);
                setProducts([]); // <--- FIX 3: Ensure products is reset to an empty array on error
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchProducts();
        } else {
            setError('Not authorized. No token found.');
            setLoading(false);
        }
    }, [token]);

    const deleteProductHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`, config);
                toast.success('Product deleted successfully!');
                // Remove the deleted product from the state
                setProducts(products.filter((product) => product._id !== id));
            } catch (err) {
                console.error("Error deleting product:", err);
                const errorMessage = err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message;
                toast.error(`Error deleting product: ${errorMessage}`);
            }
        }
    };

    // --- YOUR ACTUAL RENDERING CODE WILL BE HERE ---
    // This is where line 185 likely is.
    return (
        <div className="admin-dashboard p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard - Products</h1>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading ? (
                <p>Loading products...</p>
            ) : (
                <>
                    <div className="flex justify-end mb-4">
                        <Link to="/admin/products/create" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                            <FaPlus className="mr-2" /> Add Product
                        </Link>
                    </div>
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* This is where the error 'products.map is not a function' occurs */}
                                {/* Ensure 'products' is an array before mapping */}
                                {products && products.length > 0 ? ( // <--- IMPORTANT: Add this check
                                    products.map((product) => ( // This is likely your line 185
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {product._id}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {product.name}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                ${product.price}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {product.category}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                                                <Link to={`/admin/products/edit/${product._id}`} className="text-blue-600 hover:text-blue-900 mr-3">
                                                    <FaEdit />
                                                </Link>
                                                <button
                                                    onClick={() => deleteProductHandler(product._id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-5 py-5 text-center text-gray-500">
                                            {loading ? 'Loading products...' : 'No products found.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminDashboard;