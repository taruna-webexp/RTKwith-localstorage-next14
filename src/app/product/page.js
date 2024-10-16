"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCart from "@/component/hooks/useCart";
import Link from "next/link";
import { fetchProducts, setWishList } from "@/redux/cartSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import { setAddCart } from "@/redux/checkOutSlice";

const Home = () => {
  const dispatch = useDispatch();
  const wishListItems = useSelector((state) => state.cart.wishList);

  const products = useSelector((state) => state.cart.products);
  const loading = useSelector((state) => state.cart.loading);
  const error = useSelector((state) => state.cart.error);

  // State to handle client-side rendering of wishlist
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts()); // Dispatching the thunk to fetch products
    setIsMounted(true); // Set mounted to true after the component has rendered
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }
  if (error) {
    return <div className="text-center mt-10">Error: {error}</div>;
  }

  const handleAddToCart = (product) => {
    dispatch(setAddCart(product));
  };

  const handleWishList = (item) => {
    // Check if the item is already in the wishlist
    const isInWishlist = wishListItems?.some(
      (wishItem) => wishItem.id === item.id
    );

    if (isInWishlist) {
      // If the item is already in the wishlist, remove it
      dispatch(setWishList(item));
    } else {
      // If not, add the item to the wishlist

      dispatch(setWishList(item));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Shop Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <div
            key={product.id}
            className="relative border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 bg-white"
          >
            {/* Product Image Container */}
            <div className="relative flex justify-center mb-4">
              <Link href={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-40 object-contain cursor-pointer"
                />
              </Link>

              {/* Heart Icon on Top-Right of the Image */}
              <div className="absolute top-0 right-0 m-2">
                {isMounted && ( // Only render this after the component is mounted
                  <IconButton onClick={() => handleWishList(product)}>
                    <FavoriteIcon
                      color={
                        wishListItems?.some(
                          (wishItem) => wishItem.id === product.id
                        )
                          ? "error"
                          : "inherit"
                      }
                    />
                  </IconButton>
                )}
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 ">${product.price}</p>
            <span className="text-sm text-gray-600 ">
              Rating: {product.rating.rate} ⭐ ({product.rating.count}
              reviews)
            </span>
            <Link href={`/product/${product.id}`}>
              <button className="bg-blue-500 hover:bg-blue-600 text-white mt-2 mb-2 font-semibold py-2 px-4 w-full rounded-md transition-colors duration-300">
                View Details
              </button>
            </Link>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 w-full rounded-md transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
