"use client";
import React from "react";
import useCart from "@/component/hooks/useCart";
import Link from "next/link";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

export default function WishList() {
  //  wishlist items and remove items from the wishlist from the custom hook
  const { wishListItems, removeItemFromWishList } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Wishlist</h1>

      {wishListItems.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>Your wishlist is currently empty.</p>
          <Link href="/" className="text-blue-500 hover:underline">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {wishListItems.map((item) => (
            <div
              key={item.id}
              className="relative border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 bg-white"
            >
              {/* Product Image Container */}
              <div className="flex justify-center mb-4">
                <Link href={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-40 object-contain cursor-pointer"
                  />
                </Link>
              </div>

              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">${item.price}</p>

              <div className="flex justify-between">
                <Link href={`/product/${item.id}`}>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">
                    View Details
                  </button>
                </Link>

                {/* Remove from Wishlist Button */}
                <IconButton
                  onClick={() => removeItemFromWishList(item.id)}
                  color="error"
                >
                  <FavoriteIcon />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
