"use client";

import useCart from "@/component/hooks/useCart";
import { fetchProducts } from "@/redux/cart";
import { Checkbox, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material/Slider";
import FormCheckbox from "@/component/form/FormCheckBox";
import FormSlider from "@/component/form/FormSlider";

export default function Category({ params }) {
  // Extract category from URL params
  const productCategory = params.slug;

  // State for category, filtered category, price range, and rating range
  const [category, setCategory] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [ratingRange, setRatingRange] = useState(0); // Default rating range

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.cart.products);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const filterUrl = decodeURIComponent(productCategory);
  const { addItemToCart } = useCart();

  // Fetch products when the component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter categories based on the product category slug from URL
  useEffect(() => {
    if (categories.length > 0) {
      const filteredCategory = categories.filter(
        (item) => item.category === filterUrl
      );
      setCategory(filteredCategory);
    }
  }, [categories, filterUrl]);

  // Filter products based on the selected price range
  useEffect(() => {
    const productsPriceRange = category.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    setFilteredCategory(productsPriceRange);
  }, [category, priceRange]);

  // Filter products based on the selected rating range
  useEffect(() => {
    if (ratingRange > 0) {
      const productsRatingRange = category.filter(
        (item) => item.rating.rate >= ratingRange
      );
      setFilteredCategory(productsRatingRange);
    } else {
      setFilteredCategory(category);
    }
  }, [category, ratingRange]);

  // Show  a loader if products are  loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  // Show error message if there was an error fetching products
  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  // Add product to the cart
  const handleAddToCart = (item) => {
    if (item) {
      addItemToCart(item);
    }
  };

  // Price range slider marks
  const marks = [
    { value: 0, label: "0" },
    { value: 100, label: "$100" },
    { value: 500, label: "$500" },
    { value: 1000, label: "$1000" },
  ];

  // Handle price range change
  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Available rating filter options
  const ratings = [
    { value: 4, label: "4 & above" },
    { value: 3, label: "3 & above" },
  ];

  // Handle rating range change
  const handleRatingChange = (event) => {
    const selectedRating = parseInt(event.target.value);
    setRatingRange(selectedRating);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Products in {filterUrl}
      </h1>
      <Grid container spacing={2} padding={2}>
        {/* Filters Column */}
        <Grid item xs={6} sm={6} md={2}>
          <div className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
            <ul>
              <li>
                Price
                <FormSlider
                  name="priceRange"
                  control={control}
                  label="Price"
                  defaultValue={[0, 1000]}
                  min={0}
                  max={1000}
                  step={10}
                  marks={priceMarks}
                />
                {/* Rating Checkbox */}
                {ratingMarks.map((rate) => (
                  <FormCheckbox
                    key={rate.value}
                    name="ratingRange"
                    control={control}
                    label={rate.label}
                    value={rate.value}
                    checkedValue={rate.value}
                    unCheckedValue={0}
                  />
                ))}
              </li>
            </ul>
          </div>
        </Grid>

        {/* Products Grid */}
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
