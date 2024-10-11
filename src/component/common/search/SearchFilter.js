"use client";
import { fetchProducts, setSearchItems } from "@/redux/cart";
import { Box } from "@mui/joy";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";

export default function SearchFilter() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);
  const allData = useSelector((state) => state.cart.products);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
  };

  const handleSearchHandle = () => {
    if (search == "") {
      // If the search input is empty, show all products
      dispatch(setSearchItems([]));
      dispatch(fetchProducts());
    } else {
      const FilterValue = allData.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      const itemData = JSON.stringify(FilterValue);
      const encodedData = encodeURIComponent(itemData);
      router.push(`/search?filter=${encodedData}`);
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
      <IconButton
        sx={{
          backgroundColor: "#2874f0",
          color: "white",
          ml: -7,
          zIndex: 10,
          borderRadius: "2px",
          p: "10px",
        }}
      >
        <SearchIcon onClick={handleSearchHandle} />
      </IconButton>
    </Box>
  );
}
