"use client";

import useCart from "@/component/hooks/useCart";
import { fetchProducts } from "@/redux/cart";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "@/component/filters/Filters";
import { Grid } from "@mui/joy";

export default function Category({ params }) {
  const productCategory = params.slug; // Extract category from params
  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]); //filtered products based on selected
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingRange, setRatingRange] = useState(0);

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.cart.products); // Get products from Redux store
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const filterUrl = decodeURIComponent(productCategory);

  const { addItemToCart } = useCart(); // Custom hook for adding items to cart

  // Fetch products from the Redux store when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products based on the category in the URL
  useEffect(() => {
    if (categories.length > 0) {
      const filteredCategory = categories.filter(
        (item) => item.category === filterUrl
      );
      setCategory(filteredCategory);
    }
  }, [categories, filterUrl]);

  // Filter products based on selected price range
  useEffect(() => {
    const productsPriceRange = category.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    setFilteredCategory(productsPriceRange);
  }, [category, priceRange]);

  // Filter products based on selected rating range
  useEffect(() => {
    if (ratingRange > 0) {
      const productsRatingRange = category.filter(
        (item) => item.rating.rate >= ratingRange
      );
      setFilteredCategory(productsRatingRange);
    } else {
      setFilteredCategory(category); // Reset to show all products if no rating is selected
    }
  }, [category, ratingRange]);

  // Display a loader if products are  loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div> {/* You can style this loader */}
      </div>
    );
  }

  // Display an error message if there is an error
  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  // Function to handle adding products to cart
  const handleAddToCart = (item) => {
    if (item) {
      addItemToCart(item); // Add product to cart using the custom hook
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Display the current category */}
      <h1 className="text-2xl font-bold mb-4 text-center">
        Products in {filterUrl}
      </h1>

      <Grid container spacing={2} padding={2}>
        {/* Filters Column */}
        <Grid item xs={6} sm={6} md={2}>
          <Filters category={category} filterData={setFilteredCategory} />
        </Grid>

        <Grid item xs={6} sm={6} md={10}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCategory.length > 0 ? (
              filteredCategory.map((item) => (
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

                  <p className="text-gray-700">*{item.rating.rate}</p>

                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200 ease-in-out"
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              // Display message if no products match the filters
              <p className="text-center col-span-full">
                No products found in this category within the selected filters.
              </p>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
