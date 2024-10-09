"use client";

import useCart from "@/component/hooks/useCart";
import { fetchProducts } from "@/redux/cart";
import { CheckBox } from "@mui/icons-material";
import { Checkbox, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "@mui/material/Slider";

export default function Category({ params }) {
  const productCategory = params.slug;
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

  useEffect(() => {
    // Dispatch the action to fetch products
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      // Filter categories based on URL
      const filteredCategory = categories.filter(
        (item) => item.category === filterUrl
      );
      setCategory(filteredCategory);
    }
  }, [categories, filterUrl]);

  useEffect(() => {
    const productsPriceRange = category.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    setFilteredCategory(productsPriceRange);
  }, [category, priceRange]);

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

  const handleAddToCart = (item) => {
    if (item) {
      addItemToCart(item);
    }
  };

  const marks = [
    { value: 0, label: "0" },
    { value: 100, label: "$100" },
    { value: 500, label: "$500" },
    { value: 1000, label: "$1000" },
  ];

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const ratings = [
    { value: 4, label: "4 & above" },
    { value: 3, label: "3 & above" },
  ];

  const handleRatingChange = (event) => {
    const selectedRating = parseInt(event.target.value);
    console.log("selected", selectedRating);
    setRatingRange(selectedRating);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Products in {filterUrl}
      </h1>
      <Grid container spacing={2} padding={2}>
        {/* First Column */}
        <Grid item xs={6} sm={6} md={2}>
          <div className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200">
            <ul>
              <li>
                Price
                <Slider
                  value={priceRange}
                  onChange={handlePriceChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                  marks={marks}
                />
              </li>
              <li>
                Top Rating
                {ratings.map((rate) => (
                  <div key={rate.value}>
                    <Checkbox
                      onChange={handleRatingChange}
                      value={rate.value}
                      checked={ratingRange === rate.value}
                    />
                    {rate.label}
                  </div>
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
