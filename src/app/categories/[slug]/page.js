"use client";

import useCart from "@/component/hooks/useCart";
import { fetchProducts } from "@/redux/cart";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Category({ params }) {
  const productCategory = params.slug;
  const [category, setCategory] = useState([]);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.cart.products);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const filterUrl = decodeURIComponent(productCategory);
  const { addItemToCart } = useCart();
  useEffect(() => {
    // Dispatch the action to fetch products
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      // Filter categories based on the decoded URL
      const filteredCategory = categories.filter(
        (item) => item.category === filterUrl
      );
      setCategory(filteredCategory);
    }
  }, [categories, filterUrl]); // Add categories and filterUrl to the dependency array

  //  loading, error,  category content
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* You can style this loader */}
      </div>
    );
  }
  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }
  const handleAddToCart = (items) => {
    if (items) {
      addItemToCart(items);
    }
  };
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Products in {filterUrl}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {category.length > 0 ? (
          category.map((item) => (
            <div
              key={item.id}
              className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-700">${item.price}</p>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
}
