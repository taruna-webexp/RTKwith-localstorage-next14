"use client";
import { Checkbox, Slider } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function Filters({ category, filterData }) {
  const [priceRange, setPriceRange] = useState([0, 1000]); // Default price range
  const [ratingRange, setRatingRange] = useState(0); // Default rating range

  useEffect(() => {
    const productsPriceRange = category.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );
    filterData(productsPriceRange);
  }, [category, priceRange]);

  useEffect(() => {
    if (ratingRange > 0) {
      const productsRatingRange = category.filter(
        (item) => item.rating.rate >= ratingRange
      );
      filterData(productsRatingRange);
    } else {
      filterData(category);
    }
  }, [category, ratingRange]);

  const marks = [
    { value: 0, label: "" },
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
  );
}
