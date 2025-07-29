import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; // For notifications
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Icons for actions

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Get user info from localStorage to retrieve token and check admin status
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token; // Optional chaining in case userInfo is null

    useEffect(() => {
        // Redirect if not an admin
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login'); // Or to home page, based on your preference
            toast.error('Unauthorized access. Please log in as an admin.');
            return; // Stop further execution
        }

        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Configure headers with authorization token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                // Make GET request to fetch all products
                const { data } = await axios.get('/api/products', config);
                setProducts(data);
                setLoading(false);
            } catch (err) {
                // Handle errors from the API
                const errorMessage = err.response?.data?.message || err.message;
                setError(errorMessage);
                setLoading(false);
                toast.error(errorMessage);
            }
        };

        fetchProducts();
    }, [userInfo, token, navigate]); // Depend on userInfo and token to re-fetch if they change

    // Handler for deleting a product
    const deleteProductHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                // Configure headers with authorization token
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                // Make DELETE request
                await axios.delete(`/api/products/${id}`, config);
                toast.success('Product deleted successfully!');
                // Update UI by filtering out the deleted product
                setProducts(products.filter(product => product._id !== id));
            } catch (err) {
                const errorMessage = err.response?.data?.message || err.message;
                toast.error(errorMessage);
            }
        }
    };

    if (loading) {
        return <div className="text-center py-10 text-xl text-gray-700">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-xl text-red-600">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Admin Dashboard</h1>

            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-semibold text-gray-700">Product Management</h2>
                <Link
                    to="/admin/products/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                >
                    <FaPlus className="mr-2" /> Add New Product
                </Link>
            </div>

            {products.length === 0 ? (
                <p className="text-center text-lg text-gray-600 mt-10">No products found. Click "Add New Product" to get started!</p>
            ) : (
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Image
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">
                                        {product._id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img
                                            src={product.image || '/images/sample.jpg'} // Fallback image
                                            alt={product.name}
                                            className="h-12 w-12 object-cover rounded-md border border-gray-200"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {product.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        ${product.price ? product.price.toFixed(2) : '0.00'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {product.countInStock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/admin/products/edit/${product._id}`}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4 inline-flex items-center"
                                            title="Edit Product"
                                        >
                                            <FaEdit className="mr-1" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteProductHandler(product._id)}
                                            className="text-red-600 hover:text-red-900 inline-flex items-center"
                                            title="Delete Product"
                                        >
                                            <FaTrash className="mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;