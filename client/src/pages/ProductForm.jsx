import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaSave, FaTimes } from 'react-icons/fa';

const ProductForm = () => {
    // Get product ID from URL params if in edit mode
    const { id } = useParams();
    const navigate = useNavigate();

    // State for form fields
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(''); // Stores URL or path
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');

    // State for UI feedback
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Determine if we are in edit mode or create mode
    const isEditMode = Boolean(id);

    // Get user info and token from local storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token;

    useEffect(() => {
        // Redirect if not an admin
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
            toast.error('Unauthorized access. Please log in as an admin.');
            return;
        }

        // If in edit mode, fetch product data to pre-fill the form
        if (isEditMode) {
            const fetchProduct = async () => {
                try {
                    setLoading(true);
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    };
                    const { data } = await axios.get(`/api/products/${id}`, config);
                    setName(data.name);
                    setDescription(data.description);
                    setPrice(data.price);
                    setImage(data.image);
                    setBrand(data.brand);
                    setCategory(data.category);
                    setCountInStock(data.countInStock);
                    setLoading(false);
                } catch (err) {
                    const errorMessage = err.response?.data?.message || err.message;
                    setError(errorMessage);
                    setLoading(false);
                    toast.error(errorMessage);
                    navigate('/admin'); // Redirect if product not found or error
                }
            };
            fetchProduct();
        }
    }, [id, isEditMode, userInfo, token, navigate]); // Dependencies for useEffect


    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Basic validation (you can add more robust validation)
        if (!name || !description || !price || !image || !brand || !category || countInStock === '') { // <--- ADD !image HERE
    toast.error('Please fill in all required fields.');
    setLoading(false);
    return;
}
        if (isNaN(price) || Number(price) < 0) {
            toast.error('Price must be a valid non-negative number.');
            setLoading(false);
            return;
        }
        if (isNaN(countInStock) || Number(countInStock) < 0) {
            toast.error('Count in Stock must be a valid non-negative integer.');
            setLoading(false);
            return;
        }


        // Prepare product data for API
        const productData = {
            name,
            description,
            price: Number(price), // Convert to number
            image,
            brand,
            category,
            countInStock: Number(countInStock), // Convert to number
            // No need to send rating/numReviews for create/update as they are handled on backend defaults
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            if (isEditMode) {
                // This is the line that sends the PUT request for updating a product:
                await axios.put(`/api/products/${id}`, productData, config); // <--- UPDATE CODE IS HERE
                toast.success('Product updated successfully!');
            } else {
                // This is the line that sends the POST request for creating a product:
                await axios.post('/api/products', productData, config);
                toast.success('Product created successfully!');
            }
            navigate('/admin'); // Redirect back to admin dashboard after success
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message;
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
                {isEditMode ? 'Edit Product' : 'Create Product'}
            </h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    {error}
                </div>
            )}

            <form onSubmit={submitHandler} className="bg-white shadow-xl rounded-lg p-8">
                <div className="mb-5">
                    <label htmlFor="name" className="block text-gray-700 text-base font-semibold mb-2">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block text-gray-700 text-base font-semibold mb-2">Description:</label>
                    <textarea
                        id="description"
                        className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="mb-5">
                    <label htmlFor="price" className="block text-gray-700 text-base font-semibold mb-2">Price ($):</label>
                    <input
                        type="number"
                        id="price"
                        className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="0"
                        step="0.01"
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="image" className="block text-gray-700 text-base font-semibold mb-2">Image URL:</label>
                    <input
                        type="text"
                        id="image"
                        className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="e.g., /images/product1.jpg or https://example.com/image.jpg"
                    />
                    {image && (
                        <div className="mt-4 border border-gray-200 rounded-md p-2 w-fit">
                            <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                            <img src={image} alt="Product Preview" className="h-24 w-24 object-cover rounded-md" />
                        </div>
                    )}
                </div>
                <div className="mb-5">
                    <label htmlFor="brand" className="block text-gray-700 text-base font-semibold mb-2">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="category" className="block text-gray-700 text-base font-semibold mb-2">Category:</label>
                    <input
                        type="text"
                        id="category"
                        className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="countInStock" className="block text-gray-700 text-base font-semibold mb-2">Count In Stock:</label>
                    <input
                        type="number"
                        id="countInStock"
                        className="shadow-sm appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        required
                        min="0"
                        step="1"
                    />
                </div>
                <div className="flex items-center justify-between mt-6">
                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-5 rounded-lg focus:outline-none focus:shadow-outline-green flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                        disabled={loading}
                    >
                        <FaSave className="mr-2" />
                        {loading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Product' : 'Create Product')}
                    </button>
                    <Link
                        to="/admin"
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-5 rounded-lg focus:outline-none focus:shadow-outline-gray flex items-center transition duration-300 ease-in-out transform hover:scale-105"
                    >
                        <FaTimes className="mr-2" /> Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;