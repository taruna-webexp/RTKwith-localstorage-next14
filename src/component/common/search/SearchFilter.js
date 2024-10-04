"use client";
import { fetchProducts, setSearchItems } from "@/redux/cart";
import { Box } from "@mui/joy";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SearchFilter() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const allData = useSelector((state) => state.cart.products);

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (searchValue == "") {
      // If the search input is empty, show all products
      dispatch(setSearchItems([]));
      dispatch(fetchProducts());
    } else {
      const FilterValue = allData.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
      );

      dispatch(setSearchItems(FilterValue));
    }
  };
  return (
    <Box sx={{ flexGrow: 1, mx: 4, display: "flex" }}>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search for products, brands and more"
        className="p-2 pl-8 rounded w-full border-none"
        style={{ backgroundColor: "black", borderRadius: "2px" }}
      />
    </Box>
  );
}
